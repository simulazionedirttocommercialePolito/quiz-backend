const express = require('express');
const cors = require('cors');
const { Telegraf } = require('telegraf');

// Importiamo il file JSON che hai creato
const databaseCompleto = require('./data.json');

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN); 

app.use(cors());
app.use(express.json());

// 1. Endpoint per ottenere 30 domande random
app.post('/get-questions', async (req, res) => {
    try {
        // Mischiamo l'array senza modificare l'originale
        const shuffled = [...databaseCompleto].sort(() => 0.5 - Math.random());
        
        // Prendiamo solo le prime 30
        const questions = shuffled.slice(0, 30);
        
        res.json({ questions: questions });
    } catch (err) {
        console.error("Errore nel caricamento domande:", err);
        res.status(500).json({ error: "Errore interno al server" });
    }
});

// 2. Endpoint per creare il pagamento
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
        console.error(err);
        res.status(500).json({ error: "Errore nel creare il pagamento" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server attivo sulla porta ${PORT}`));