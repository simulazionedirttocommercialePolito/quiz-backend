const express = require('express');
const cors = require('cors');
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

// 2. Endpoint: Il server invia tutto il database
app.post('/get-questions', (req, res) => {
    try {
        res.json({ questions: databaseCompleto });
    } catch (err) {
        console.error("Errore nel recupero dati:", err);
        res.status(500).json({ error: "Errore nel server" });
    }
});

// Endpoint per controllare lo stato dell'utente
app.post('/check-status', async (req, res) => {
    const { userId } = req.body;
    try {
        const { data, error } = await supabase
            .from('utenti_paganti')
            .select('*')
            .eq('telegram_id', userId.toString()) 
            .eq('is_paid', true)
            .single();
        
        res.json({ status: data ? 'paid' : 'free' });
    } catch (err) {
        console.error("Errore database check-status:", err);
        res.json({ status: 'free' });
    }
});

// Endpoint per il pagamento
app.post('/create-payment', async (req, res) => {
    try {
        const invoiceLink = await bot.telegram.createInvoiceLink({
            title: "Accesso Quiz",
            description: "Sblocca l'esame",
            payload: "unlock-quiz",
            currency: "XTR",
            prices: [{ label: "Accesso", amount: 1 }]
        });
        res.json({ url: invoiceLink });
    } catch (err) {
        console.error("Errore creazione pagamento:", err);
        res.status(500).json({ error: "Errore nel creare il pagamento" });
    }
});

// LOGICA PAGAMENTO TELEGRAM
bot.on('pre_checkout_query', (ctx) => ctx.answerPreCheckoutQuery(true));

bot.on('successful_payment', async (ctx) => {
    const userId = ctx.from.id.toString();
    
    // CORREZIONE FONDAMENTALE: Aggiunto { onConflict: 'telegram_id' }
    // Questo dice a Supabase: "Se esiste già un telegram_id uguale, aggiorna, non creare doppioni"
    const { error } = await supabase
        .from('utenti_paganti')
        .upsert({ 
            telegram_id: userId, 
            is_paid: true, 
            paid_at: new Date().toISOString() 
        }, { onConflict: 'telegram_id' });
        
    if (error) {
        console.error("Errore salvataggio DB:", error);
    } else {
        try {
            await ctx.reply("Pagamento confermato! Ora hai accesso completo al quiz.");
        } catch (e) {
            console.error("Impossibile inviare messaggio di conferma:", e);
        }
    }
});

// Avvia il bot e il server
bot.launch();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server attivo su porta ${PORT}`));