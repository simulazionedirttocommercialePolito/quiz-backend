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
        
        // Se c'è un errore che non sia "non trovato", loggalo
        if (error && error.code !== 'PGRST116') {
             console.error("Errore Supabase in check-status:", error);
        }
        
        res.json({ status: data ? 'paid' : 'free' });
    } catch (err) {
        console.error("Errore database check-status:", err);
        res.json({ status: 'free' });
    }
});

// Endpoint per il pagamento
app.post('/create-payment', async (req, res) => {
    try {
        console.log("Creazione link pagamento richiesta...");
        const invoiceLink = await bot.telegram.createInvoiceLink({
            title: "Accesso Quiz",
            description: "Sblocca l'esame",
            payload: "unlock-quiz",
            currency: "XTR",
            prices: [{ label: "Accesso", amount: 1 }]
        });
        res.json({ url: invoiceLink });
    } catch (err) {
        console.error("ERRORE CREATE PAYMENT:", err);
        res.status(500).json({ error: "Errore nel creare il pagamento" });
    }
});

// LOGICA PAGAMENTO TELEGRAM
bot.on('pre_checkout_query', (ctx) => {
    console.log("Ricevuta pre-checkout query");
    ctx.answerPreCheckoutQuery(true);
});

bot.on('successful_payment', async (ctx) => {
    console.log("RICEVUTO EVENTO SUCCESSFUL_PAYMENT!");
    const userId = ctx.from.id.toString();
    
    // Tentativo di salvataggio
    const { data, error } = await supabase
        .from('utenti_paganti')
        .upsert({ 
            telegram_id: userId, 
            is_paid: true, 
            paid_at: new Date().toISOString() 
        }, { onConflict: 'telegram_id' });
        
    if (error) {
        console.error("ERRORE CRITICO SUPABASE:", error);
        ctx.reply("Errore interno nel confermare il pagamento. Contatta l'assistenza.");
    } else {
        console.log("Pagamento salvato con successo per:", userId);
        try {
            await ctx.reply("Pagamento confermato! Ora hai accesso completo al quiz.");
        } catch (e) {
            console.error("Impossibile inviare messaggio di conferma su Telegram:", e);
        }
    }
});

// Avvio
bot.launch().then(() => console.log("Bot avviato correttamente!"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server HTTP attivo su porta ${PORT}`));