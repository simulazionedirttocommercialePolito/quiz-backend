const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { Telegraf } = require('telegraf');
const { createClient } = require('@supabase/supabase-js');

// 1. Configurazione
const databaseCompleto = require('./data.json');
const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

// Inizializza Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(cors());
app.use(express.json());

// Verifica che i dati arrivino davvero da Telegram WebApp.
function verifyTelegramInitData(initData) {
    if (!initData) return null;

    try {
        const params = new URLSearchParams(initData);
        const hash = params.get('hash');
        if (!hash) return null;

        params.delete('hash');

        const authDate = Number(params.get('auth_date'));
        const now = Math.floor(Date.now() / 1000);

        // Link Telegram valido massimo 5 minuti
        if (!authDate || now - authDate > 300) {
            return null;
        }

        const dataCheckString = [...params.entries()]
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, value]) => `${key}=${value}`)
            .join('\n');

        const secretKey = crypto
            .createHmac('sha256', 'WebAppData')
            .update(process.env.BOT_TOKEN)
            .digest();

        const calculatedHash = crypto
            .createHmac('sha256', secretKey)
            .update(dataCheckString)
            .digest('hex');

        const calculatedBuffer = Buffer.from(calculatedHash, 'hex');
        const hashBuffer = Buffer.from(hash, 'hex');

        if (calculatedBuffer.length !== hashBuffer.length) return null;
        if (!crypto.timingSafeEqual(calculatedBuffer, hashBuffer)) return null;

        const userParam = params.get('user');
        if (!userParam) return null;

        return JSON.parse(userParam);
    } catch (error) {
        console.error('Errore verifica initData Telegram:', error);
        return null;
    }
}

async function isUserPaid(telegramId) {
    const { data, error } = await supabase
        .from('utenti_paganti')
        .select('telegram_id,is_paid,paid_at')
        .eq('telegram_id', telegramId.toString())
        .eq('is_paid', true)
        .maybeSingle();

    if (error) {
        console.error('Errore Supabase isUserPaid:', error);
        return false;
    }

    return !!data;
}

app.post('/get-questions', async (req, res) => {
    const { initData } = req.body;

    const user = verifyTelegramInitData(initData);
    if (!user) {
        return res.status(403).json({ error: 'Accesso non autorizzato. Apri il quiz da Telegram.' });
    }

    try {
        const paid = await isUserPaid(user.id);

        if (!paid) {
            return res.status(403).json({ error: 'Pagamento richiesto' });
        }

        return res.json({ questions: databaseCompleto });
    } catch (err) {
        console.error('Errore nel recupero dati:', err);
        return res.status(500).json({ error: 'Errore nel server' });
    }
});

app.post('/check-status', async (req, res) => {
    const { initData } = req.body;

    const user = verifyTelegramInitData(initData);
    if (!user) {
        return res.status(403).json({ status: 'free', error: 'Accesso non autorizzato' });
    }

    try {
        const paid = await isUserPaid(user.id);
        return res.json({ status: paid ? 'paid' : 'free' });
    } catch (err) {
        console.error('Errore database check-status:', err);
        return res.json({ status: 'free' });
    }
});

app.post('/create-payment', async (req, res) => {
    try {
        console.log('Creazione link pagamento richiesta...');

        const invoiceLink = await bot.telegram.createInvoiceLink({
            title: 'Accesso Quiz',
            description: "Sblocca l'esame",
            payload: 'unlock-quiz',
            currency: 'XTR',
            prices: [{ label: 'Accesso', amount: 1 }]
        });

        return res.json({ url: invoiceLink });
    } catch (err) {
        console.error('ERRORE CREATE PAYMENT:', err);
        return res.status(500).json({ error: 'Errore nel creare il pagamento' });
    }
});

bot.on('pre_checkout_query', async (ctx) => {
    console.log('Ricevuta pre-checkout query');
    await ctx.answerPreCheckoutQuery(true);
});

bot.on('successful_payment', async (ctx) => {
    console.log('RICEVUTO EVENTO SUCCESSFUL_PAYMENT!');
    const userId = ctx.from.id.toString();

    const { error } = await supabase
        .from('utenti_paganti')
        .upsert({
            telegram_id: userId,
            is_paid: true,
            paid_at: new Date().toISOString()
        }, { onConflict: 'telegram_id' });

    if (error) {
        console.error('ERRORE CRITICO SUPABASE:', error);
        try {
            await ctx.reply("Errore interno nel confermare il pagamento. Contatta l'assistenza.");
        } catch (replyError) {
            console.error('Impossibile inviare messaggio errore su Telegram:', replyError);
        }
        return;
    }

    console.log('Pagamento salvato con successo per:', userId);

    try {
        await ctx.reply('Pagamento confermato! Ora hai accesso completo al quiz.');
    } catch (e) {
        console.error('Impossibile inviare messaggio di conferma su Telegram:', e);
    }
});

bot.launch()
    .then(() => console.log('Bot avviato correttamente!'))
    .catch((err) => console.error('Errore avvio bot:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server HTTP attivo su porta ${PORT}`));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
