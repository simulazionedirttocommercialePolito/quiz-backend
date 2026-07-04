const express = require('express');
const cors = require('cors');
const { Telegraf } = require('telegraf');

// 1. Carichiamo il database (che deve essere un array valido)
const databaseCompleto = require('./data.json'); 

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN); 

app.use(cors());
app.use(express.json());

// 2. Endpoint: Quando il sito chiama '/get-questions', il server fa il lavoro sporco
app.post('/get-questions', (req, res) => {
    try {
        // Logica di randomizzazione (Shuffle)
        const shuffled = [...databaseCompleto].sort(() => 0.5 - Math.random());
        
        // Logica di limite: prendiamo solo le prime 30 domande
        const questions = shuffled.slice(0, 30);
        
        // Inviamo solo le 30 domande al sito
        res.json({ questions: questions });
    } catch (err) {
        console.error("Errore nel randomizzare:", err);
        res.status(500).json({ error: "Errore nel server" });
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
        console.error(err);
        res.status(500).json({ error: "Errore nel creare il pagamento" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server attivo su porta ${PORT}`));