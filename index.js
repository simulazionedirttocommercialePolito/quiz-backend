const express = require('express');
const cors = require('cors'); // Necessario per far parlare il sito col server
const { Telegraf } = require('telegraf');

const app = express();
// Recupera il token dalle variabili di Render, non scriverlo qui!
const bot = new Telegraf(process.env.BOT_TOKEN); 

app.use(cors()); // ABILITA LA COMUNICAZIONE
app.use(express.json());

// 1. Endpoint per ottenere le domande
app.post('/get-questions', async (req, res) => {
    // Esempio di dati che invierai al sito
    const questions = [
    {
        q: "Il diritto commerciale regola:",
        options: [
            { text: "I rapporti tra i privati", correct: false, info: "L'art. 2082 c.c. definisce l'attività d'impresa, che è l'oggetto fondamentale del diritto commerciale." },
            { text: "I rapporti tra lo Stato ed i privati", correct: false, info: "L'art. 2082 c.c. definisce l'attività d'impresa, che è l'oggetto fondamentale del diritto commerciale." },
            { text: "L'organizzazione e l'attività dell'imprenditore", correct: true, info: "L'art. 2082 c.c. definisce l'attività d'impresa, che è l'oggetto fondamentale del diritto commerciale." },
            { text: "I rapporti tra le imprese", correct: false, info: "L'art. 2082 c.c. definisce l'attività d'impresa, che è l'oggetto fondamentale del diritto commerciale." }
        ]
    },
    {
        q: "Il diritto commerciale è sorto:",
        options: [
            { text: "Nel Medioevo", correct: true, info: "Nasce come lex mercatoria nel basso Medioevo per regolare i rapporti tra mercanti." },
            { text: "In epoca Rinascimentale", correct: false, info: "Nasce come lex mercatoria nel basso Medioevo per regolare i rapporti tra mercanti." },
            { text: "Nel XIX secolo", correct: false, info: "Nasce come lex mercatoria nel basso Medioevo per regolare i rapporti tra mercanti." },
            { text: "Nel secolo scorso", correct: false, info: "Nasce come lex mercatoria nel basso Medioevo per regolare i rapporti tra mercanti." }
        ]
    },
    {
        q: "Il diritto commerciale originario costituisce il risultato:",
        options: [
            { text: "Di una legislazione emanata dallo Stato", correct: false, info: "Era un diritto di classe creato autonomamente dai mercanti tramite gli statuti corporativi." },
            { text: "Degli Statuti delle corporazioni medioevali", correct: true, info: "Era un diritto di classe creato autonomamente dai mercanti tramite gli statuti corporativi." },
            { text: "Di usi internazionali", correct: false, info: "Era un diritto di classe creato autonomamente dai mercanti tramite gli statuti corporativi." },
            { text: "Di regole riconducibili al diritto privato", correct: false, info: "Era un diritto di classe creato autonomamente dai mercanti tramite gli statuti corporativi." }
        ]
    },
    {
        q: "Il sistema del codice civile italiano:",
        options: [
            { text: "Era di natura oggettiva", correct: true, info: "Il c.c. del 1942 ha superato la distinzione soggettiva del precedente codice in favore di un criterio oggettivo." },
            { text: "Era imperniato sulla definizione di imprenditore commerciale", correct: false, info: "Il c.c. del 1942 ha superato la distinzione soggettiva del precedente codice in favore di un criterio oggettivo." },
            { text: "Conteneva una elencazione di diverse tipologie di imprenditore commerciale", correct: false, info: "Il c.c. del 1942 ha superato la distinzione soggettiva del precedente codice in favore di un criterio oggettivo." },
            { text: "Era fondata sulla definizione di commerciante", correct: false, info: "Il c.c. del 1942 ha superato la distinzione soggettiva del precedente codice in favore di un criterio oggettivo." }
        ]
    },
    {
        q: "I tribunali di commercio in Italia sono stati aboliti:",
        options: [
            { text: "Nel 1865", correct: false, info: "I tribunali speciali di commercio furono soppressi con la riforma del 1888." },
            { text: "Nel 1882", correct: false, info: "I tribunali speciali di commercio furono soppressi con la riforma del 1888." },
            { text: "Nel 1888", correct: true, info: "I tribunali speciali di commercio furono soppressi con la riforma del 1888." },
            { text: "Nel 1942", correct: false, info: "I tribunali speciali di commercio furono soppressi con la riforma del 1888." }
        ]
    },
    {
        q: "Nel sistema normativo italiano del 1942:",
        options: [
            { text: "Esistono due codici diversi che disciplinano rispettivamente le obbligazioni civili e quelle commerciali", correct: false, info: "Il legislatore ha unificato il diritto delle obbligazioni eliminando la distinzione tra civili e commerciali." },
            { text: "Vi è un solo codice, quello civile che disciplina in modo differente le obbligazioni civili da quelle commerciali", correct: false, info: "Il legislatore ha unificato il diritto delle obbligazioni eliminando la distinzione tra civili e commerciali." },
            { text: "Vi è un solo codice, quello civile che disciplina indifferentemente le obbligazioni commerciali e quelle civili", correct: false, info: "Il legislatore ha unificato il diritto delle obbligazioni eliminando la distinzione tra civili e commerciali." },
            { text: "Il codice civile non pone la distinzione tra le obbligazioni civili e quelle commerciali che vengono da questo disciplinate", correct: true, info: "Il legislatore ha unificato il diritto delle obbligazioni eliminando la distinzione tra civili e commerciali." }
        ]
    },
    {
        q: "Nel sistema del codice civile del 1942:",
        options: [
            { text: "Viene delineata una figura generale di imprenditore", correct: true, info: "Viene introdotta la figura unitaria di imprenditore (art. 2082 c.c.)." },
            { text: "Viene riproposto il sistema oggettivo del codice di commercio del 1882", correct: false, info: "Viene introdotta la figura unitaria di imprenditore (art. 2082 c.c.)." },
            { text: "Viene definita la figura del commerciante", correct: false, info: "Viene introdotta la figura unitaria di imprenditore (art. 2082 c.c.)." },
            { text: "Non contiene alcuna definizione di imprenditore", correct: false, info: "Viene introdotta la figura unitaria di imprenditore (art. 2082 c.c.)." }
        ]
    },
    {
        q: "Nel periodo mercantile il diritto commerciale:",
        options: [
            { text: "Era un diritto di natura speciale", correct: true, info: "Era un diritto di ceto applicabile solo ai mercanti, distinto dal diritto comune." },
            { text: "Coincideva con il diritto comune (ius civile)", correct: false, info: "Era un diritto di ceto applicabile solo ai mercanti, distinto dal diritto comune." },
            { text: "Era un diritto costituito da norme statuali", correct: false, info: "Era un diritto di ceto applicabile solo ai mercanti, distinto dal diritto comune." },
            { text: "Era un diritto che si applicava a tutti i consociati", correct: false, info: "Era un diritto di ceto applicabile solo ai mercanti, distinto dal diritto comune." }
        ]
    },
    {
        q: "Il diritto commerciale italiano:",
        options: [
            { text: "Non è condizionato da alcuna ingerenza esterna al nostro ordinamento", correct: false, info: "Il sistema moderno è un'integrazione tra legislazione nazionale e norme comunitarie." },
            { text: "E' integralmente costituito dalle disposizioni comunitarie (regolamenti e direttive U.E.)", correct: false, info: "Il sistema moderno è un'integrazione tra legislazione nazionale e norme comunitarie." },
            { text: "E' costituito da norme a carattere nazionale e norme di derivazione europea", correct: true, info: "Il sistema moderno è un'integrazione tra legislazione nazionale e norme comunitarie." },
            { text: "E' costituito da norme contenute esclusivamente nel codice civile", correct: false, info: "Il sistema moderno è un'integrazione tra legislazione nazionale e norme comunitarie." }
        ]
    },
    {
        q: "E' imprenditore:",
        options: [
            { text: "Chi esercita un'attività economica organizzata al fine della produzione o dello scambio di beni o di servizi", correct: true, info: "Questa è la definizione letterale dell'art. 2082 c.c." },
            { text: "Chi esercita un'attività al fine della produzione o dello scambio di beni o di servizi", correct: false, info: "Questa è la definizione letterale dell'art. 2082 c.c." },
            { text: "Chi esercita una attività economica organizzata", correct: false, info: "Questa è la definizione letterale dell'art. 2082 c.c." },
            { text: "Chi esercita una attività economica", correct: false, info: "Questa è la definizione letterale dell'art. 2082 c.c." }
        ]
    },
    {
        q: "L'economicità dell'attività significa:",
        options: [
            { text: "Che l'attività viene svolta secondo modalità tali da realizzare la copertura di costi con i ricavi", correct: true, info: "L'economicità (metodo economico) richiede l'autosufficienza finanziaria, non necessariamente il profitto." },
            { text: "Che l'attività viene svolta in modo da realizzare un profitto (lucro)", correct: false, info: "L'economicità (metodo economico) richiede l'autosufficienza finanziaria, non necessariamente il profitto." },
            { text: "Che l'attività viene svolta per la realizzazione di una finalità sociale", correct: false, info: "L'economicità (metodo economico) richiede l'autosufficienza finanziaria, non necessariamente il profitto." },
            { text: "Che l'attività viene svolta allo scopo della produzione o dello scambio di beni o servizi", correct: false, info: "L'economicità (metodo economico) richiede l'autosufficienza finanziaria, non necessariamente il profitto." }
        ]
    },
    {
        q: "La professionalità significa:",
        options: [
            { text: "Che l'attività deve essere svolta secondo i parametri delle professioni (intellettuali)", correct: false, info: "La professionalità è l'esercizio ripetuto, stabile e abituale dell'attività." },
            { text: "Che l'attività viene svolta in modo abituale e non occasionale", correct: true, info: "La professionalità è l'esercizio ripetuto, stabile e abituale dell'attività." },
            { text: "Che l'attività viene svolta in modo continuativo e senza interruzioni", correct: false, info: "La professionalità è l'esercizio ripetuto, stabile e abituale dell'attività." },
            { text: "Che l'attività deve essere preceduta dalla realizzazione di una struttura e di una organizzazione produttiva", correct: false, info: "La professionalità è l'esercizio ripetuto, stabile e abituale dell'attività." }
        ]
    },
    {
        q: "Attività organizzata significa:",
        options: [
            { text: "Che l'attività deve necessariamente concretizzarsi nella creazione di un apparato strumentale oggettivamente percepibile", correct: false, info: "L'organizzazione consiste nel coordinamento dei fattori produttivi (capitale e lavoro) ad opera dell'imprenditore." },
            { text: "Che l'attività deve solamente avere per oggetto prestazioni altrui (lavorative subordinate)", correct: false, info: "L'organizzazione consiste nel coordinamento dei fattori produttivi (capitale e lavoro) ad opera dell'imprenditore." },
            { text: "Che l'attività deve avere necessariamente avere ad oggetto prestazioni e capitali altrui", correct: false, info: "L'organizzazione consiste nel coordinamento dei fattori produttivi (capitale e lavoro) ad opera dell'imprenditore." },
            { text: "Che l'attività viene svolta mediante l'utilizzazione di fattori produttivi che vengono coordinati da parte dell'imprenditore per la realizzazione di un fine produttivo", correct: true, info: "L'organizzazione consiste nel coordinamento dei fattori produttivi (capitale e lavoro) ad opera dell'imprenditore." }
        ]
    },
    {
        q: "L'attività di impresa:",
        options: [
            { text: "Deve essere svolta secondo modalità oggettive astrattamente lucrative", correct: false, info: "È sufficiente il metodo economico (pareggio tra costi e ricavi), non è richiesto il lucro soggettivo o l'effettivo profitto." },
            { text: "Deve essere svolta in modo tale che l'impreditore devolva interamente i profitti in finalità non altruistiche", correct: false, info: "È sufficiente il metodo economico (pareggio tra costi e ricavi), non è richiesto il lucro soggettivo o l'effettivo profitto." },
            { text: "Deve essere svolta secondo il metodo economico", correct: true, info: "È sufficiente il metodo economico (pareggio tra costi e ricavi), non è richiesto il lucro soggettivo o l'effettivo profitto." },
            { text: "Deve essere svolta secondo modalità tali da realizzare concretamente un profitto", correct: false, info: "È sufficiente il metodo economico (pareggio tra costi e ricavi), non è richiesto il lucro soggettivo o l'effettivo profitto." }
        ]
    },
    {
        q: "I professionisti intellettuali:",
        options: [
            { text: "Sono imprenditori", correct: false, info: "Ai sensi dell'art. 2238 c.c., il professionista diventa imprenditore solo se l'attività professionale è elemento di un'attività organizzata in forma d'impresa." },
            { text: "Non sono imprenditori", correct: false, info: "Ai sensi dell'art. 2238 c.c., il professionista diventa imprenditore solo se l'attività professionale è elemento di un'attività organizzata in forma d'impresa." },
            { text: "Sono imprenditori quando si avvalgono di un apparato organizzativo", correct: false, info: "Ai sensi dell'art. 2238 c.c., il professionista diventa imprenditore solo se l'attività professionale è elemento di un'attività organizzata in forma d'impresa." },
            { text: "Sono imprenditori quando si avvalgono di un numero significativo di dipendenti e collaboratori", correct: true, info: "Ai sensi dell'art. 2238 c.c., il professionista diventa imprenditore solo se l'attività professionale è elemento di un'attività organizzata in forma d'impresa." }
        ]
    },
    {
        q: "La produzione di servizi di natura assistenziale o colturale:",
        options: [
            { text: "E' qualificabile come impresa", correct: false, info: "Anche queste attività, se esercitate con metodo economico e organizzazione, rientrano nella definizione di impresa ex art. 2082." },
            { text: "Non è qualificabile come impresa", correct: false, info: "Anche queste attività, se esercitate con metodo economico e organizzazione, rientrano nella definizione di impresa ex art. 2082." },
            { text: "E' qualificabile come impresa a condizione che ricorrano gli altri requisiti previsti dalla legge", correct: true, info: "Anche queste attività, se esercitate con metodo economico e organizzazione, rientrano nella definizione di impresa ex art. 2082." },
            { text: "E' qualificabile come impresa se accanto alla finalità assistenziale vi è uno scopo di lucro", correct: false, info: "Anche queste attività, se esercitate con metodo economico e organizzazione, rientrano nella definizione di impresa ex art. 2082." }
        ]
    },
    {
        q: "L'investimento in attività finanziarie:",
        options: [
            { text: "E' un'attività di impresa", correct: false, info: "Il semplice godimento di capitali non è impresa, ma lo diventa se vi è un coordinamento organizzativo professionale." },
            { text: "Non è un'attività di impresa", correct: false, info: "Il semplice godimento di capitali non è impresa, ma lo diventa se vi è un coordinamento organizzativo professionale." },
            { text: "E' una attività di impresa laddove sia coordinata e ricorrano gli uleriori requisiti previsti dalla legge", correct: true, info: "Il semplice godimento di capitali non è impresa, ma lo diventa se vi è un coordinamento organizzativo professionale." },
            { text: "E' una attività di impresa a condizione che il soggetto non impieghi proprie disponibilità finanziarie", correct: false, info: "Il semplice godimento di capitali non è impresa, ma lo diventa se vi è un coordinamento organizzativo professionale." }
        ]
    },
    {
        q: "L'impresa mutualistica è finalizzata a conseguire:",
        options: [
            { text: "La realizzazione di utili da distribuire ai soci", correct: false, info: "Lo scopo mutualistico consiste nel fornire ai soci beni, servizi o occasioni di lavoro a condizioni più favorevoli di quelle di mercato." },
            { text: "La realizzazione di esigenze ed ideali di natura altruistica", correct: false, info: "Lo scopo mutualistico consiste nel fornire ai soci beni, servizi o occasioni di lavoro a condizioni più favorevoli di quelle di mercato." },
            { text: "A fornire beni o servizi oppure occasioni di lavoro direttamente ai soci a condizioni più vantaggiose di quelle che avrebbero sul mercato", correct: true, info: "Lo scopo mutualistico consiste nel fornire ai soci beni, servizi o occasioni di lavoro a condizioni più favorevoli di quelle di mercato." },
            { text: "A fornire beni o servizi ai propri soci a prezzo politico", correct: false, info: "Lo scopo mutualistico consiste nel fornire ai soci beni, servizi o occasioni di lavoro a condizioni più favorevoli di quelle di mercato." }
        ]
    },
    {
        q: "La cooperativa edilizia che assegna i propri immobili ai soci:",
        options: [
            { text: "Non è una impresa", correct: false, info: "Le cooperative che operano per i soci rientrano nello schema dell'impresa mutualistica." },
            { text: "E' una impresa 'per conto proprio'", correct: false, info: "Le cooperative che operano per i soci rientrano nello schema dell'impresa mutualistica." },
            { text: "E' una impresa lucrativa", correct: false, info: "Le cooperative che operano per i soci rientrano nello schema dell'impresa mutualistica." },
            { text: "E' una impresa mutualistica", correct: true, info: "Le cooperative che operano per i soci rientrano nello schema dell'impresa mutualistica." }
        ]
    },
    {
        q: "Ai sensi dell'articolo 2082 c.c. sono piccoli imprenditori:",
        options: [
            { text: "I coltivatori diretti del fondo, gli industriali, i granti commercianti", correct: false, info: "Il requisito cardine della piccola impresa è la prevalenza del lavoro proprio (e della famiglia) rispetto al capitale e al lavoro altrui." },
            { text: "I coltivatori diretti del fondo, gli artigiani, i grandi commercianti e coloro che esercitano un'attività occasionale organizzata con il lavoro proprio e dei componenti della famiglia", correct: false, info: "Il requisito cardine della piccola impresa è la prevalenza del lavoro proprio (e della famiglia) rispetto al capitale e al lavoro altrui." },
            { text: "I coltivatori diretti del fondo, gli artigiani, i piccoli commercianti e coloro che esercitano un'attività professionale organizzata prevalentemente con il lavoro proprio e dei componenti della famiglia", correct: true, info: "Il requisito cardine della piccola impresa è la prevalenza del lavoro proprio (e della famiglia) rispetto al capitale e al lavoro altrui." },
            { text: "I coltivatori diretti del fondo, gli artigiani, i piccoli commercianti e coloro che esercitano un'attività professionale organizzata con il lavoro proprio e dei componenti della famiglia", correct: false, info: "Il requisito cardine della piccola impresa è la prevalenza del lavoro proprio (e della famiglia) rispetto al capitale e al lavoro altrui." }
        ]
    },
    {
        q: "Il piccolo imprenditore:",
        options: [
            { text: "E' sempre obbligato a tenere le scritture contabili", correct: false, info: "Ai sensi dell'art. 2214 c.c., il piccolo imprenditore è esonerato dalla tenuta delle scritture contabili." },
            { text: "Non è esonerato dall'obbligo di tenere le scritture contabili se esercita attività agricola", correct: false, info: "Ai sensi dell'art. 2214 c.c., il piccolo imprenditore è esonerato dalla tenuta delle scritture contabili." },
            { text: "Non è esonerato dall'obbligo di tenere le scritture contabili se esercita una attività commerciale", correct: false, info: "Ai sensi dell'art. 2214 c.c., il piccolo imprenditore è esonerato dalla tenuta delle scritture contabili." },
            { text: "E' esonerato dall'obbligo di tenere le scritture contabili anche se esercita attività commerciale", correct: true, info: "Ai sensi dell'art. 2214 c.c., il piccolo imprenditore è esonerato dalla tenuta delle scritture contabili." }
        ]
    },
    {
        q: "Il piccolo imprenditore che esercita attività commerciale:",
        options: [
            { text: "Non può essere sottoposto alla procedura fallimentare", correct: false, info: "Il piccolo imprenditore è esonerato dalla liquidazione giudiziale, ma solo se rimane sotto le soglie dimensionali ex art. 1 legge fallimentare (ora Codice della Crisi)." },
            { text: "Può essere sempre assoggettato alla procedura fallimentare", correct: false, info: "Il piccolo imprenditore è esonerato dalla liquidazione giudiziale, ma solo se rimane sotto le soglie dimensionali ex art. 1 legge fallimentare (ora Codice della Crisi)." },
            { text: "Può essere assoggettato alla procedura fallimentare se non possiede i requisiti indicati dall'art. 1 della legge fallimentare", correct: true, info: "Il piccolo imprenditore è esonerato dalla liquidazione giudiziale, ma solo se rimane sotto le soglie dimensionali ex art. 1 legge fallimentare (ora Codice della Crisi)." },
            { text: "Può essere assoggettato alla procedura fallimentare se non possiede anche solo uno dei requisiti indicati dall'art. 1 della legge fallimentare", correct: false, info: "Il piccolo imprenditore è esonerato dalla liquidazione giudiziale, ma solo se rimane sotto le soglie dimensionali ex art. 1 legge fallimentare (ora Codice della Crisi)." }
        ]
    },
    {
        q: "E' imprenditore commerciale:",
        options: [
            { text: "Chi esercita un'attività agricola diretta alla produzione di beni", correct: false, info: "L'attività industriale diretta alla produzione di beni è l'esempio tipico dell'imprenditore commerciale." },
            { text: "Chi esercita una attività industriale diretta alla produzione di beni", correct: true, info: "L'attività industriale diretta alla produzione di beni è l'esempio tipico dell'imprenditore commerciale." },
            { text: "Chi è coltivatore diretto del fondo", correct: false, info: "L'attività industriale diretta alla produzione di beni è l'esempio tipico dell'imprenditore commerciale." },
            { text: "Chi occasionalmente esercita un'attività diretta alla produzione di beni", correct: false, info: "L'attività industriale diretta alla produzione di beni è l'esempio tipico dell'imprenditore commerciale." }
        ]
    },
    {
        q: "Per determinare se una impresa è commerciale:",
        options: [
            { text: "E' sufficiente verificare che si tratti di una impresa civile", correct: false, info: "Nel sistema del Codice Civile, l'imprenditore è 'agricolo' o 'commerciale'. Tutto ciò che non è agricolo è commerciale." },
            { text: "E' sufficiente escludere che possa qualificarsi impresa civile", correct: false, info: "Nel sistema del Codice Civile, l'imprenditore è 'agricolo' o 'commerciale'. Tutto ciò che non è agricolo è commerciale." },
            { text: "E' sufficiente verificare che non sia qualificabile come impresa agricola", correct: true, info: "Nel sistema del Codice Civile, l'imprenditore è 'agricolo' o 'commerciale'. Tutto ciò che non è agricolo è commerciale." },
            { text: "E' sufficiente verificare che non sia qualificabile come impresa agricola o impresa civile", correct: false, info: "Nel sistema del Codice Civile, l'imprenditore è 'agricolo' o 'commerciale'. Tutto ciò che non è agricolo è commerciale." }
        ]
    },
    {
        q: "La qualità di imprenditore si acquista con:",
        options: [
            { text: "L'iscrizione nel registro delle imprese", correct: false, info: "Vige il principio di effettività: l'impresa esiste quando l'attività viene svolta concretamente, a prescindere da adempimenti formali." },
            { text: "L'iscrizione in un albo professionale", correct: false, info: "Vige il principio di effettività: l'impresa esiste quando l'attività viene svolta concretamente, a prescindere da adempimenti formali." },
            { text: "Il rilascio di una autorizzazione amministativa", correct: false, info: "Vige il principio di effettività: l'impresa esiste quando l'attività viene svolta concretamente, a prescindere da adempimenti formali." },
            { text: "L'effettivo esercizio dell'attività d'impresa", correct: true, info: "Vige il principio di effettività: l'impresa esiste quando l'attività viene svolta concretamente, a prescindere da adempimenti formali." }
        ]
    },
    {
        q: "L'effettivo inizio dell'attività d'impresa si concretizza con:",
        options: [
            { text: "La richiesta di una autorizzazione amministrativa", correct: false, info: "L'inizio dell'impresa richiede il compimento di atti che denotano la concreta attività di gestione economica." },
            { text: "L'iscrizione in un albo professionale", correct: false, info: "L'inizio dell'impresa richiede il compimento di atti che denotano la concreta attività di gestione economica." },
            { text: "L'iscrizione nel registro delle imprese", correct: false, info: "L'inizio dell'impresa richiede il compimento di atti che denotano la concreta attività di gestione economica." },
            { text: "L'esercizio dell'attività gestoria", correct: true, info: "L'inizio dell'impresa richiede il compimento di atti che denotano la concreta attività di gestione economica." }
        ]
    },
    {
        q: "Per le società, l'esercizio effettivo dell'attività imprenditoriale:",
        options: [
            { text: "Coincide con il momento di iscrizione nel Registro delle Imprese", correct: false, info: "Nelle società, l'inizio dell'attività non è meramente formale (iscrizione), ma va verificato con atti di gestione o organizzazione concreti." },
            { text: "Deve essere verificato nel caso concreto sulla base dei parametri dettati dagli atti di esercizio e degli atti organizzativi", correct: true, info: "Nelle società, l'inizio dell'attività non è meramente formale (iscrizione), ma va verificato con atti di gestione o organizzazione concreti." },
            { text: "E' sempre successiva all'iscrizione nel Registro delle Imprese", correct: false, info: "Nelle società, l'inizio dell'attività non è meramente formale (iscrizione), ma va verificato con atti di gestione o organizzazione concreti." },
            { text: "E' un parametro irrilevante", correct: false, info: "Nelle società, l'inizio dell'attività non è meramente formale (iscrizione), ma va verificato con atti di gestione o organizzazione concreti." }
        ]
    },
    {
        q: "La liquidazione dell'attività d'impresa:",
        options: [
            { text: "Costituisce il momento di cessazione dell'impresa", correct: false, info: "La liquidazione è la fase in cui si definiscono i rapporti pendenti prima dell'estinzione definitiva." },
            { text: "Coincide con la disgregazione dell'azienda", correct: false, info: "La liquidazione è la fase in cui si definiscono i rapporti pendenti prima dell'estinzione definitiva." },
            { text: "E' un procedimento che assume carattere straordinario nell'attività d'impresa", correct: false, info: "La liquidazione è la fase in cui si definiscono i rapporti pendenti prima dell'estinzione definitiva." },
            { text: "E' generalmente una fase anteriore alla cessazione dell'impresa", correct: true, info: "La liquidazione è la fase in cui si definiscono i rapporti pendenti prima dell'estinzione definitiva." }
        ]
    },
    {
        q: "Il compimento di un atto di organizzazione compiuto da una persona fisica:",
        options: [
            { text: "E' sufficiente ad integrare l'inizio dell'attività d'impresa", correct: false, info: "Serve sia l'elemento oggettivo (organizzazione) che quello soggettivo (volontà professionale)." },
            { text: "Integra l'esercizio dell'attività d'impresa se è accompagnato dalla coordinazione funzionale degli atti di organizzazione compiuti", correct: false, info: "Serve sia l'elemento oggettivo (organizzazione) che quello soggettivo (volontà professionale)." },
            { text: "Integra l'esercizio dell'attività d'impresa se è accompagnato dalla coordinazione funzionale degli atti di organizzazione compiuti e dalla espressione di volontà di intraprendere l'esercizio professionale di una attività produttiva", correct: true, info: "Serve sia l'elemento oggettivo (organizzazione) che quello soggettivo (volontà professionale)." },
            { text: "Integra l'esercizio dell'attività d'impresa se è accompagnato dalla espressione di volontà di intraprendere l'esercizio professionale di una attività produttiva", correct: false, info: "Serve sia l'elemento oggettivo (organizzazione) che quello soggettivo (volontà professionale)." }
        ]
    },
    {
        q: "La definizione dell'imprenditore agricolo enunciata dall'art. 2135 c.c. ha la funzione di:",
        options: [
            { text: "Sottoporre l'imprenditore agricolo alla disciplina prevista per l'imprenditore in generale ed obbligarlo alla regolare tenuta delle scritture contabili", correct: false, info: "Lo statuto dell'imprenditore agricolo è di favore: è esonerato dal fallimento e dalle scritture contabili obbligatorie." },
            { text: "Esonerare l'imprenditore agricolo dall'obbligo di tenuta delle scritture contabili ed assoggettarlo al fallimento", correct: false, info: "Lo statuto dell'imprenditore agricolo è di favore: è esonerato dal fallimento e dalle scritture contabili obbligatorie." },
            { text: "Restringere l'ambito di applicazione della disciplina dell'imprenditore commerciale ed esonerare l'imprenditore dal fallimento", correct: true, info: "Lo statuto dell'imprenditore agricolo è di favore: è esonerato dal fallimento e dalle scritture contabili obbligatorie." },
            { text: "Imporre all'imprenditore agricolo all'obbligo di tenuta delle scritture contabili ed esonerarlo dal fallimento", correct: false, info: "Lo statuto dell'imprenditore agricolo è di favore: è esonerato dal fallimento e dalle scritture contabili obbligatorie." }
        ]
    },
    {
        q: "L'articolo 2135 c.c. vigente:",
        options: [
            { text: "Esprime la definizione di imprenditore agricolo come è stata pensata dal legislatore nel 1942", correct: false, info: "Il D.Lgs. 228/2001 ha ampliato e modernizzato la definizione di imprenditore agricolo." },
            { text: "Esprime la definizione di imprenditore agricolo come modificato a seguito l'entrata in vigore della Costituzione del 1948", correct: false, info: "Il D.Lgs. 228/2001 ha ampliato e modernizzato la definizione di imprenditore agricolo." },
            { text: "Esprime la definizione di imprenditore agricolo come modificato a seguito dell'adesione dell'Italia all'Unione Europea", correct: false, info: "Il D.Lgs. 228/2001 ha ampliato e modernizzato la definizione di imprenditore agricolo." },
            { text: "Esprime la definizione di imprenditore agricolo come modificato dal D. Lgs. n. 228/2001", correct: true, info: "Il D.Lgs. 228/2001 ha ampliato e modernizzato la definizione di imprenditore agricolo." }
        ]
    },
    {
        q: "Il legislatore italiano nel riformare l'art. 2135 c.c. ha aderito:",
        options: [
            { text: "Alla tesi per la quale lo sfruttamento della terra da parte dell'imprenditore agricolo doveva rimanere centrale", correct: false, info: "La riforma ha abbandonato il legame col fondo in favore del criterio del ciclo biologico." },
            { text: "Alla tesi per la quale ogni forma di produzione fondata sullo svolgimento di un ciclo biologico naturale avrebbe costituito esercizio dell'attività agricola, indipendentemente dal metodo utilizzato", correct: true, info: "La riforma ha abbandonato il legame col fondo in favore del criterio del ciclo biologico." },
            { text: "Alla tesi per la quale ogni forma di produzione fondata sullo svolgimento di un ciclo biologico naturale avrebbe costituito esercizio dell'attività agricola, a seconda però del metodo utilizzato", correct: false, info: "La riforma ha abbandonato il legame col fondo in favore del criterio del ciclo biologico." },
            { text: "Alla tesi per la quale ogni forma di produzione fondata sullo svolgimento di un ciclo biologico artificiale avrebbe costituito esercizio dell'attività agricola", correct: false, info: "La riforma ha abbandonato il legame col fondo in favore del criterio del ciclo biologico." }
        ]
    },
    {
        q: "Nella selvicoltura:",
        options: [
            { text: "E' ricompresa l'attività di estrazione di legname se non è accompagnata dalla coltivazione dell'area boschiva", correct: false, info: "La selvicoltura richiede la cura e lo sviluppo del bosco, non il mero disboscamento." },
            { text: "Non è ricompresa l'attività di estrazione di legname se non è accompagnata dalla coltivazione dell'area boschiva", correct: true, info: "La selvicoltura richiede la cura e lo sviluppo del bosco, non il mero disboscamento." },
            { text: "E' sempre ricompresa l'attività di estrazione di legname", correct: false, info: "La selvicoltura richiede la cura e lo sviluppo del bosco, non il mero disboscamento." },
            { text: "Non è ricompresa l'attività di estrazione di legname se è accompagnata dalla coltivazione dell'area boschiva", correct: false, info: "La selvicoltura richiede la cura e lo sviluppo del bosco, non il mero disboscamento." }
        ]
    },
    {
        q: "Per determinare se un'attività è realmente connessa a quella agricola:",
        options: [
            { text: "Si adotta il solo criterio di connessione oggettiva", correct: false, info: "La connessione richiede sia il requisito oggettivo (prodotto agricolo) che soggettivo (soggetto agricolo)." },
            { text: "Si adotta il solo criterio della connessione soggettiva", correct: false, info: "La connessione richiede sia il requisito oggettivo (prodotto agricolo) che soggettivo (soggetto agricolo)." },
            { text: "Si adotta il criterio della prevalenza", correct: false, info: "La connessione richiede sia il requisito oggettivo (prodotto agricolo) che soggettivo (soggetto agricolo)." },
            { text: "Si adottano il criterio della connessione oggettiva e quello della connessione soggettiva", correct: true, info: "La connessione richiede sia il requisito oggettivo (prodotto agricolo) che soggettivo (soggetto agricolo)." }
        ]
    },
    {
        q: "E' attività agricola per connessione:",
        options: [
            { text: "Quella esercitata dall'imprenditore agricolo diretta alla trasformazione di prodotti acquistati da terzi ed estranei all'attività agricola", correct: false, info: "La connessione richiede che i prodotti siano propri dell'attività agricola principale." },
            { text: "Quella esercitata dall'imprenditore agricolo e diretta alla trasformazione di prodotti ottenuti dalla coltivazione del fondo", correct: true, info: "La connessione richiede che i prodotti siano propri dell'attività agricola principale." },
            { text: "Quella esercitata dall'imprenditore agricolo non diretta alla trasformazione di prodotti ottenuti dalla coltivazione del fondo", correct: false, info: "La connessione richiede che i prodotti siano propri dell'attività agricola principale." },
            { text: "Quella esercitata dall'imprenditore commerciale diretta alla trasformazione di prodotti acquistati da terzi ed estranei all'attività agricola", correct: false, info: "La connessione richiede che i prodotti siano propri dell'attività agricola principale." }
        ]
    },
    {
        q: "L'attività esercitata è connessa soggettivamente a quella agricola principale, se l'imprenditore che la esercita:",
        options: [
            { text: "E' un imprenditore non agricolo e l'attività connessa svolta è coerente con quella agricola principale", correct: false, info: "Il presupposto è la qualifica di imprenditore agricolo." },
            { text: "E' un imprenditore agricolo e l'attività connessa svolta non è coerente con quella agricola principale", correct: false, info: "Il presupposto è la qualifica di imprenditore agricolo." },
            { text: "E' un imprenditore agricolo e l'attività connessa svolta è coerente con quella agricola principale", correct: true, info: "Il presupposto è la qualifica di imprenditore agricolo." },
            { text: "E' un imprenditore non agricolo e l'attività connessa svolta non è coerente con quella agricola principale", correct: false, info: "Il presupposto è la qualifica di imprenditore agricolo." }
        ]
    },
    {
        q: "E' attività d'impresa di carattere commerciale e non agricola:",
        options: [
            { text: "L'acquisto di animali all'ingrosso con mera finalità di rivendita", correct: true, info: "L'attività di mero scambio (compravendita) senza allevamento o cura è di natura commerciale." },
            { text: "L'allevamento di cavalli da corsa", correct: false, info: "L'attività di mero scambio (compravendita) senza allevamento o cura è di natura commerciale." },
            { text: "L'allevamento di animali da pelliccia", correct: false, info: "L'attività di mero scambio (compravendita) senza allevamento o cura è di natura commerciale." },
            { text: "L'allevamento di animali in batteria", correct: false, info: "L'attività di mero scambio (compravendita) senza allevamento o cura è di natura commerciale." }
        ]
    },
    {
        q: "L'imprenditore ittico:",
        options: [
            { text: "E' un imprenditore commerciale", correct: false, info: "La legge equipara l'imprenditore ittico a quello agricolo." },
            { text: "E' un imprenditore agricolo", correct: true, info: "La legge equipara l'imprenditore ittico a quello agricolo." },
            { text: "E' un imprenditore agricolo se la sua attività è collegata alla cura e allo sviluppo degli organismi acquatici", correct: false, info: "La legge equipara l'imprenditore ittico a quello agricolo." },
            { text: "E' un imprenditore agricolo se l'attività di pesca è prevalente su ogni altra attività", correct: false, info: "La legge equipara l'imprenditore ittico a quello agricolo." }
        ]
    },
    {
        q: "E' considerata attività di impresa agricola per connessione:",
        options: [
            { text: "La vendita di prodotti agricoli da altri coltivati", correct: false, info: "La connessione richiede che il prodotto derivi dall'attività agricola principale (coltivazione/allevamento)." },
            { text: "La produzione e la vendita di marmellate ottenute dai prodotti coltivati dal medesimo imprenditore agricolo", correct: true, info: "La connessione richiede che il prodotto derivi dall'attività agricola principale (coltivazione/allevamento)." },
            { text: "La lavorazione di pellami acquistati all'ingrosso", correct: false, info: "La connessione richiede che il prodotto derivi dall'attività agricola principale (coltivazione/allevamento)." },
            { text: "L'acquisto di animali all'ingrosso con mera finalità di rivendita", correct: false, info: "La connessione richiede che il prodotto derivi dall'attività agricola principale (coltivazione/allevamento)." }
        ]
    },
    {
        q: "Possono essere iscritti nel Registro delle Imprese:",
        options: [
            { text: "Gli atti comunicati dall'imprenditore al Registro delle Imprese", correct: false, info: "Il Registro delle Imprese è un registro a numero chiuso; si iscrivono solo gli atti tassativamente previsti dalla legge." },
            { text: "Gli atti previsti dalla legge", correct: true, info: "Il Registro delle Imprese è un registro a numero chiuso; si iscrivono solo gli atti tassativamente previsti dalla legge." },
            { text: "Tutti gli atti che riguardano la vita dell'impresa", correct: false, info: "Il Registro delle Imprese è un registro a numero chiuso; si iscrivono solo gli atti tassativamente previsti dalla legge." },
            { text: "Solo gli atti che riguardano l'inizio e la fine dell'impresa", correct: false, info: "Il Registro delle Imprese è un registro a numero chiuso; si iscrivono solo gli atti tassativamente previsti dalla legge." }
        ]
    },
    {
        q: "E' competente a provvedere alla iscrizione nel Registro delle Imprese:",
        options: [
            { text: "Qualsiasi camera di commercio sul territorio italiano", correct: false, info: "La competenza è territoriale, legata alla sede legale dell'impresa." },
            { text: "L'ufficio della camera di commercio del capoluogo di regione dove ha sede l'impresa", correct: false, info: "La competenza è territoriale, legata alla sede legale dell'impresa." },
            { text: "L'ufficio della Provincia del luogo dove ha sede l'impresa", correct: false, info: "La competenza è territoriale, legata alla sede legale dell'impresa." },
            { text: "L'ufficio del Registro presso la camera di commercio della provincia in cui ha sede l'impresa", correct: true, info: "La competenza è territoriale, legata alla sede legale dell'impresa." }
        ]
    },
    {
        q: "Contro il rifiuto di iscrizione deciso dal Conservatore del Registro delle Imprese:",
        options: [
            { text: "E' possibile presentare ricorso al Ministero dello Sviluppo Economico", correct: false, info: "Il provvedimento di rifiuto può essere impugnato davanti al Giudice del Registro (o Giudice dell'impresa)." },
            { text: "Non vi è alcun rimedio giuridico", correct: false, info: "Il provvedimento di rifiuto può essere impugnato davanti al Giudice del Registro (o Giudice dell'impresa)." },
            { text: "E' possibile presentare ricorso al giudice del Registro", correct: true, info: "Il provvedimento di rifiuto può essere impugnato davanti al Giudice del Registro (o Giudice dell'impresa)." },
            { text: "E' possibile presentare ricorso al Tribunale", correct: false, info: "Il provvedimento di rifiuto può essere impugnato davanti al Giudice del Registro (o Giudice dell'impresa)." }
        ]
    },
    {
        q: "La pubblicità costitutiva:",
        options: [
            { text: "E' un effetto della iscrizione di qualsiasi atto o fatto nel Registro delle Imprese", correct: false, info: "L'iscrizione ha efficacia costitutiva (crea effetti giuridici) solo dove espressamente previsto dalla legge." },
            { text: "E' un effetto dell'iscrizione nel Registro delle Imprese che si produce nei soli casi previsti dalla legge", correct: true, info: "L'iscrizione ha efficacia costitutiva (crea effetti giuridici) solo dove espressamente previsto dalla legge." },
            { text: "E' un effetto che si produce solo per l'iscrizione delle S.p.A. nel Registro delle Imprese", correct: false, info: "L'iscrizione ha efficacia costitutiva (crea effetti giuridici) solo dove espressamente previsto dalla legge." },
            { text: "E' un effetto che si produce solo per l'iscrizione nelle sezioni speciali del Registro delle Imprese", correct: false, info: "L'iscrizione ha efficacia costitutiva (crea effetti giuridici) solo dove espressamente previsto dalla legge." }
        ]
    },
    {
        q: "L'iscrizione nelle sezioni speciali del Registro delle Imprese:",
        options: [
            { text: "Ha la funzione di pubblicità notizia, eccezione fatta per gli imprenditori agricoli e le società semplici esercenti attività agricola, per i quali ha la funzione di pubblicità legale", correct: true, info: "Per imprenditori agricoli e società semplici, l'iscrizione nella sezione speciale ha efficacia di pubblicità legale." },
            { text: "Ha la funzione di pubblicità legale, eccezione fatta per gli imprenditori agricoli e le società semplici esercenti attività agricola, per i quali ha la funzione di pubblicità notizia", correct: false, info: "Per imprenditori agricoli e società semplici, l'iscrizione nella sezione speciale ha efficacia di pubblicità legale." },
            { text: "Ha la funzione di pubblicità notizia per gli atti ed i fatti iscritti", correct: false, info: "Per imprenditori agricoli e società semplici, l'iscrizione nella sezione speciale ha efficacia di pubblicità legale." },
            { text: "Ha la funzione di pubblicità legale per gli atti ed i fatti iscritti", correct: false, info: "Per imprenditori agricoli e società semplici, l'iscrizione nella sezione speciale ha efficacia di pubblicità legale." }
        ]
    },
    {
        q: "Le scritture contabili obbligatorie per l'imprenditore commerciale sono:",
        options: [
            { text: "Il libro giornale ed il libro inventari", correct: true, info: "Libro giornale e libro inventari sono le scritture obbligatorie minime per ogni imprenditore commerciale." },
            { text: "Il libro giornale, il libro inventari ed il libro di cassa", correct: false, info: "Libro giornale e libro inventari sono le scritture obbligatorie minime per ogni imprenditore commerciale." },
            { text: "Il libro giornale, il libro inventari, il libro magazzino ed il libro di cassa", correct: false, info: "Libro giornale e libro inventari sono le scritture obbligatorie minime per ogni imprenditore commerciale." },
            { text: "Il libro giornale, il libro inventari, il libro magazzino, il libro mastro ed il libro di cassa", correct: false, info: "Libro giornale e libro inventari sono le scritture obbligatorie minime per ogni imprenditore commerciale." }
        ]
    },
    {
        q: "L'imprenditore può produrre come prova a proprio favore le scritture contabili:",
        options: [
            { text: "Se regolarmente tenute e nelle controversie contro un altro imprenditore e pur se non relative ai rapporti sorti nell'esercizio dell'impresa", correct: false, info: "La prova è ammessa solo tra imprenditori e per rapporti inerenti l'esercizio dell'impresa." },
            { text: "Se regolarmente tenute e nelle controversie contro un altro imprenditore e relative ai rapporti sorti nell'esercizio dell'impresa", correct: true, info: "La prova è ammessa solo tra imprenditori e per rapporti inerenti l'esercizio dell'impresa." },
            { text: "Anche se non regolarmente tenute e nelle controversie contro un altro imprenditore e relative ai rapporti sorti nell'esercizio dell'impresa", correct: false, info: "La prova è ammessa solo tra imprenditori e per rapporti inerenti l'esercizio dell'impresa." },
            { text: "Anche se non regolarmente tenute e nelle controversie contro un altro imprenditore", correct: false, info: "La prova è ammessa solo tra imprenditori e per rapporti inerenti l'esercizio dell'impresa." }
        ]
    },
    {
        q: "Il terzo può produrre a proprio favore le scritture contabili tenute dall'imprenditore:",
        options: [
            { text: "Se regolarmente tenute", correct: false, info: "Le scritture fanno sempre prova contro l'imprenditore, anche se irregolari." },
            { text: "Anche se non regolarmente tenute", correct: true, info: "Le scritture fanno sempre prova contro l'imprenditore, anche se irregolari." },
            { text: "Solo se regolarmente tenute e solo se il terzo è un imprenditore", correct: false, info: "Le scritture fanno sempre prova contro l'imprenditore, anche se irregolari." },
            { text: "Anche se non regolarmente tenute ed anche se il terzo non è un imprenditore", correct: false, info: "Le scritture fanno sempre prova contro l'imprenditore, anche se irregolari." }
        ]
    },
    {
        q: "La rappresentanza commerciale trova applicazione:",
        options: [
            { text: "Nelle modalità operative degli ausiliari interni all'organizzazione dell'imprenditore", correct: true, info: "Si riferisce ai collaboratori interni (institore, procuratore, commessi)." },
            { text: "Nelle modalità operative dei collaboratori esterni all'organizzazione dell'imprenditore", correct: false, info: "Si riferisce ai collaboratori interni (institore, procuratore, commessi)." },
            { text: "Nelle modalità operative del solo institore, poiché ha un ruolo di maggior rilievo nell'organizzazione aziendale", correct: false, info: "Si riferisce ai collaboratori interni (institore, procuratore, commessi)." },
            { text: "Nelle modalità operative solamente di institore e procuratore", correct: false, info: "Si riferisce ai collaboratori interni (institore, procuratore, commessi)." }
        ]
    },
    {
        q: "L'institore:",
        options: [
            { text: "Ha la rappresentanza processuale dell'imprenditore, ma non è tenuto con esso ad osservare l'obbligo di tenuta delle scritture contabili, ne' gli obblighi di iscrizione nel Registro Imprese", correct: false, info: "L'institore è un alter ego dell'imprenditore e ne condivide gli obblighi contabili e di pubblicità." },
            { text: "Non ha la rappresentanza processuale dell'imprenditore, non è tenuto con esso ad osservare l'obbligo di tenuta delle scritture contabili, ne' gli obblighi di iscrizione nel Registro Imprese", correct: false, info: "L'institore è un alter ego dell'imprenditore e ne condivide gli obblighi contabili e di pubblicità." },
            { text: "Ha la rappresentanza processuale dell'imprenditore, è tenuto con esso ad osservare l'obbligo di tenuta delle scritture contabili e gli obblighi di iscrizione nel Registro Imprese", correct: true, info: "L'institore è un alter ego dell'imprenditore e ne condivide gli obblighi contabili e di pubblicità." },
            { text: "Non ha la rappresentanza processuale dell'imprenditore, è tenuto con esso ad osservare l'obbligo di tenuta delle scritture contabili e gli obblighi di iscrizione nel Registro Imprese", correct: false, info: "L'institore è un alter ego dell'imprenditore e ne condivide gli obblighi contabili e di pubblicità." }
        ]
    },
    {
        q: "I beni aziendali sono:",
        options: [
            { text: "Tutti i beni di proprietà dell'imprenditore", correct: false, info: "L'azienda è il complesso dei beni organizzati per l'esercizio dell'impresa, a prescindere dalla proprietà." },
            { text: "Esclusivamente i beni di proprietà dell'imprenditore che siano effettivamente destinati allo svolgimento dell'attività imprenditoriale", correct: false, info: "L'azienda è il complesso dei beni organizzati per l'esercizio dell'impresa, a prescindere dalla proprietà." },
            { text: "Tutti i beni di proprietà dell'imprenditore e di terzi anche se non sono effettivamente destinati allo svolgimento dell'attività imprenditoriale", correct: false, info: "L'azienda è il complesso dei beni organizzati per l'esercizio dell'impresa, a prescindere dalla proprietà." },
            { text: "Tutti i beni destinati effettivamente allo svolgimento dell'attività d'impresa, di proprietà dell'imprenditore o di terzi", correct: true, info: "L'azienda è il complesso dei beni organizzati per l'esercizio dell'impresa, a prescindere dalla proprietà." }
        ]
    },
    {
        q: "Si realizza trasferimento d'azienda:",
        options: [
            { text: "Se trasferisco un solo bene aziendale", correct: false, info: "Il trasferimento d'azienda si ha quando i beni trasferiti mantengono un vincolo funzionale unitario." },
            { text: "Se trasferisco più singoli beni aziendali", correct: false, info: "Il trasferimento d'azienda si ha quando i beni trasferiti mantengono un vincolo funzionale unitario." },
            { text: "Se trasferisco singoli beni aziendali che insieme costituiscono una unità operativa dell'azienda", correct: true, info: "Il trasferimento d'azienda si ha quando i beni trasferiti mantengono un vincolo funzionale unitario." },
            { text: "Se trasferisco singoli beni aziendali che unitamente non costituiscono una unità operativa", correct: false, info: "Il trasferimento d'azienda si ha quando i beni trasferiti mantengono un vincolo funzionale unitario." }
        ]
    },
    {
        q: "Per le imprese soggette a registrazione, il contratto che ha ad oggetto il trasferimento:",
        options: [
            { text: "Deve assumere la forma scritta ai soli fini probatori", correct: false, info: "È richiesta la forma scritta ai fini della validità del deposito presso il Registro Imprese." },
            { text: "Deve assumere non solo la forma scritta ai fini probatori, ma deve assumere la particolare forma dell'atto pubblico o della scrittura privata autenticata ai fini d'iscrizione presso il Registro Imprese", correct: true, info: "È richiesta la forma scritta ai fini della validità del deposito presso il Registro Imprese." },
            { text: "Può assumere la forma scritta, ma è una scelta lasciata alla discrezione delle parti", correct: false, info: "È richiesta la forma scritta ai fini della validità del deposito presso il Registro Imprese." },
            { text: "Può essere concluso verbalmente tra le parti presso l'Ufficio del Registro delle Imprese", correct: false, info: "È richiesta la forma scritta ai fini della validità del deposito presso il Registro Imprese." }
        ]
    },
    {
        q: "Il divieto di concorrenza:",
        options: [
            { text: "Non opera se non previsto dalle parti nel contratto di trasferimento d'azienda", correct: false, info: "L'art. 2557 c.c. stabilisce il divieto legale di concorrenza per 5 anni se non pattuito diversamente." },
            { text: "Se non è previsto dalle parti contrattualmente, opera ex lege per un periodo di 5 anni", correct: true, info: "L'art. 2557 c.c. stabilisce il divieto legale di concorrenza per 5 anni se non pattuito diversamente." },
            { text: "Se non è previsto dalle parti contrattualmente, opera ex lege per un periodo di 10 anni", correct: false, info: "L'art. 2557 c.c. stabilisce il divieto legale di concorrenza per 5 anni se non pattuito diversamente." },
            { text: "Si applica solamente se le imprese cedute son agricole", correct: false, info: "L'art. 2557 c.c. stabilisce il divieto legale di concorrenza per 5 anni se non pattuito diversamente." }
        ]
    },
    {
        q: "La disciplina della successione nei contratti nel trasferimento d'azienda:",
        options: [
            { text: "Prevede che sia sempre necessario il consenso del contraente ceduto per la validità della successione nella posizione contrattuale", correct: false, info: "Per i contratti non personali, il subentro avviene automaticamente ex lege." },
            { text: "Prevede che non sia necessario il consenso del contraente ceduto se il contratto ha carattere personale", correct: false, info: "Per i contratti non personali, il subentro avviene automaticamente ex lege." },
            { text: "Prevede che non sia mai necessario il consenso del contraente ceduto", correct: false, info: "Per i contratti non personali, il subentro avviene automaticamente ex lege." },
            { text: "Prevede che non sia necessario il consenso del contraente ceduto se il contratto non ha carattere personale", correct: true, info: "Per i contratti non personali, il subentro avviene automaticamente ex lege." }
        ]
    },
    {
        q: "Il cessionario risponde dei debiti sorti antecedentemente al trasferimento d'azienda (impresa commerciale):",
        options: [
            { text: "Solo se risultano dalle scritture contabili", correct: true, info: "Risponde dei debiti che risultano dai libri contabili obbligatori." },
            { text: "Solo se risultano dalle scritture contabili obbligatorie", correct: false, info: "Risponde dei debiti che risultano dai libri contabili obbligatori." },
            { text: "Solo se risultano dalle scritture contabili non obbligatorie", correct: false, info: "Risponde dei debiti che risultano dai libri contabili obbligatori." },
            { text: "Solo se risultano dalle scritture contabili obbligatorie e vengono confermati verbalmente dal cedente", correct: false, info: "Risponde dei debiti che risultano dai libri contabili obbligatori." }
        ]
    },
    {
        q: "Se il contratto di trasferimento d'azienda prevede un divieto di concorrenza della durata di 20 anni:",
        options: [
            { text: "La clausola è valida", correct: false, info: "La durata del divieto è limitata inderogabilmente a 5 anni." },
            { text: "La clausola è annullabile", correct: false, info: "La durata del divieto è limitata inderogabilmente a 5 anni." },
            { text: "Il termine è ridotto ex lege a 10 anni", correct: false, info: "La durata del divieto è limitata inderogabilmente a 5 anni." },
            { text: "Il termine è ridotto ex lege a 5 anni", correct: true, info: "La durata del divieto è limitata inderogabilmente a 5 anni." }
        ]
    },
    {
        q: "In caso di trasferimento di azienda nella successione dei contratti che non abbiano carattere personale il terzo contraente:",
        options: [
            { text: "Non ha alcun rimedio", correct: false, info: "Il terzo può recedere entro 3 mesi per giusta causa (tutela del terzo)." },
            { text: "Può recedere", correct: false, info: "Il terzo può recedere entro 3 mesi per giusta causa (tutela del terzo)." },
            { text: "Può recedere in presenza di una giusta causa", correct: true, info: "Il terzo può recedere entro 3 mesi per giusta causa (tutela del terzo)." },
            { text: "Può chiedere la risoluzione del contratto in presenza di una giusta causa", correct: false, info: "Il terzo può recedere entro 3 mesi per giusta causa (tutela del terzo)." }
        ]
    },
    {
        q: "La ditta è:",
        options: [
            { text: "Il nome commerciale dell'imprenditore", correct: true, info: "La ditta è il nome sotto il quale l'imprenditore esercita l'attività." },
            { text: "La denominazione sociale dell'imprenditore", correct: false, info: "La ditta è il nome sotto il quale l'imprenditore esercita l'attività." },
            { text: "La ragione sociale dell'imprenditore", correct: false, info: "La ditta è il nome sotto il quale l'imprenditore esercita l'attività." },
            { text: "Il nome civile dell'imprenditore", correct: false, info: "La ditta è il nome sotto il quale l'imprenditore esercita l'attività." }
        ]
    },
    {
        q: "L'insegna contraddistingue:",
        options: [
            { text: "Il prodotto dell'imprenditore", correct: false, info: "L'insegna identifica i locali in cui si svolge l'impresa." },
            { text: "L'azienda dell'imprenditore", correct: false, info: "L'insegna identifica i locali in cui si svolge l'impresa." },
            { text: "L'imprenditore", correct: false, info: "L'insegna identifica i locali in cui si svolge l'impresa." },
            { text: "I locali dell'impresa", correct: true, info: "L'insegna identifica i locali in cui si svolge l'impresa." }
        ]
    },
    {
        q: "Nell'ordinamento giuridico italiano il legislatore ha previsto:",
        options: [
            { text: "Otto modelli di organizzazione societaria, con le relative peculiari discipline", correct: true, info: "Il sistema societario italiano è tipizzato per garantire la certezza del diritto e la tutela dei terzi." },
            { text: "Otto modelli di organizzazione societaria, con la possibilità di creare nuovi modelli atipici", correct: false, info: "Nel diritto societario vige il principio di tipicità: non è possibile creare modelli non previsti dalla legge." },
            { text: "I seguenti modelli societari di: società semplice, s.n.c., s.a.s., S.p.A., S.r.l", correct: false, info: "L'elenco è incompleto (mancano ad es. S.a.p.a. e Cooperative)." },
            { text: "Esclusivamente i modelli societari di società semplice, s.n.c., s.a.s., S.p.A., S.r.l., S.a.p.a., società cooperativa", correct: false, info: "Manca la S.E. (Società Europea) e altre forme speciali." }
        ]
    },
    {
        q: "I conferimenti sono:",
        options: [
            { text: "Le somme di denaro effettuate dai soci nella società costituenda", correct: false, info: "I conferimenti possono avere ad oggetto anche beni in natura o servizi, non solo denaro." },
            { text: "Le prestazioni alle quali si obbligano i soci al fine di costituire il capitale di rischio iniziale dell'impresa", correct: true, info: "Costituiscono la dotazione patrimoniale iniziale che garantisce l'esercizio dell'attività d'impresa." },
            { text: "Finanziamenti in denaro effettuati dai soci alla società", correct: false, info: "I finanziamenti dei soci sono debiti della società, distinti dai conferimenti che formano il capitale sociale." },
            { text: "I beni immobili apportati dai soci alla società", correct: false, info: "Sono una categoria di conferimento, ma non esauriscono il concetto." }
        ]
    },
    {
        q: "Il patrimonio sociale:",
        options: [
            { text: "E' l'insieme dei rapporti giuridici attivi che fanno capo alla società", correct: false, info: "Comprende sia attività che passività." },
            { text: "E' costituito esclusivamente dai conferimenti dei soci", correct: false, info: "Il patrimonio varia nel tempo in base ai risultati della gestione." },
            { text: "E' l'insieme dei rapporti giuridici passivi che fanno capo alla società", correct: false, info: "Comprende anche le attività." },
            { text: "E' l'insieme dei beni e dei rapporti giuridici attivi e passivi della società", correct: true, info: "È la definizione corretta di patrimonio netto e lordo dell'ente." }
        ]
    },
    {
        q: "La funzione vincolistica del capitale sociale è così correttamente espressa:",
        options: [
            { text: "I soci si sono obbligati contrattualmente a non recedere dal contratto sociale", correct: false, info: "Il vincolo riguarda la destinazione delle risorse, non solo il recesso." },
            { text: "I soci si sono obbligati contrattualmente per tutta la durata del contratto sociale a destinare i conferimenti all'esercizio dell'attività d'impresa", correct: true, info: "Il capitale rappresenta una garanzia per i creditori che non può essere intaccata liberamente." },
            { text: "I soci si sono obbligati a non ripartire e non distribuire gli utili, ma a reimpiegarli nell'impresa", correct: false, info: "Gli utili possono essere distribuiti se le riserve sono capienti e il capitale è integro." },
            { text: "I soci possono liberamente disporre dei conferimenti durante la vita dell'impresa", correct: false, info: "Il capitale è indisponibile per i soci fino alla liquidazione, salvo riduzione reale." }
        ]
    },
    {
        q: "In una società lucrativa la clausola del controllo sociale che stabilisce che gli utili debbano essere destinati ad una finalità estranea all'attività sociale:",
        options: [
            { text: "E' legittima", correct: false, info: "Contrasta con la causa lucrativa definita dall'art. 2247 c.c." },
            { text: "Non è legittima", correct: true, info: "La finalità lucrativa è essenziale per la qualificazione della società lucrativa." },
            { text: "E' legittima nella società semplice", correct: false, info: "Anche nella società semplice, pur con diverse finalità, la gestione deve essere strumentale all'oggetto sociale." },
            { text: "E' legittima ma in tal caso spetta ai soci il diritto di recesso", correct: false, info: "La clausola resta nulla o illecita." }
        ]
    },
    {
        q: "Ai sensi dell'art. 2247 c.c. lo scopo del contratto societario è:",
        options: [
            { text: "Lucrativo", correct: true, info: "La norma stabilisce la divisione degli utili, che è l'essenza del lucro oggettivo." },
            { text: "Consortile", correct: false, info: "Lo scopo consortile è disciplinato da norme diverse (art. 2602)." },
            { text: "Ideale", correct: false, info: "Gli scopi ideali (es. associazione) non sono lucrativi." },
            { text: "Mutualistico", correct: false, info: "Il mutualismo è tipico delle società cooperative." }
        ]
    },
    {
        q: "Può perseguire lo scopo di lucro:",
        options: [
            { text: "La società di gestione dei mercati regolamentati di strumenti finanziari", correct: false, info: "Sono soggette a normative speciali che spesso limitano il profitto." },
            { text: "La società per la gestione accentrata di strumenti finanziari", correct: false, info: "Hanno natura di servizio pubblico/infrastrutturale." },
            { text: "L'impresa sociale", correct: false, info: "L'impresa sociale è caratterizzata dall'assenza dello scopo di lucro soggettivo." },
            { text: "La banca di investimento", correct: true, info: "Le banche sono tipiche imprese commerciali esercitate in forma societaria con scopo di lucro." }
        ]
    },
    {
        q: "La società di persone:",
        options: [
            { text: "Ha soggettività giuridica ed autonomia patrimoniale imperfetta", correct: true, info: "Hanno un proprio centro di imputazione ma non un'autonomia perfetta (risposta illimitata dei soci)." },
            { text: "Non ha soggettività giuridica ed ha autonomia patrimoniale imperfetta", correct: false, info: "La giurisprudenza riconosce la soggettività alle società di persone." },
            { text: "Ha soggettività giuridica ed autonomia patrimoniale perfetta", correct: false, info: "L'autonomia è imperfetta." },
            { text: "Non ha soggettività giuridica ed ha autonomia patrimoniale perfetta", correct: false, info: "Errato sotto entrambi i profili." }
        ]
    },
    {
        q: "La società di capitali:",
        options: [
            { text: "Ha soggettività giuridica ed autonomia patrimoniale imperfetta", correct: false, info: "Hanno autonomia perfetta." },
            { text: "Non ha soggettività giuridica ed ha autonomia patrimoniale imperfetta", correct: false, info: "Hanno soggettività e autonomia perfetta." },
            { text: "Ha soggettività giuridica ed autonomia patrimoniale perfetta", correct: true, info: "La separazione tra patrimonio sociale e personale è netta." },
            { text: "Non ha soggettività giuridica ed ha autonomia patrimoniale perfetta", correct: false, info: "Hanno soggettività giuridica." }
        ]
    },
    {
        q: "Se i soci non scelgono un modello organizzativo tipico per esercitare una attività d'impresa commerciale, si applica di default:",
        options: [
            { text: "La disciplina tipica delle società semplici", correct: false, info: "La società semplice non può esercitare attività commerciale." },
            { text: "La disciplina tipica delle s.n.c", correct: true, info: "La s.n.c. è il modello residuale per l'attività commerciale." },
            { text: "La disciplina tipica delle s.r.l", correct: false, info: "Le società di capitali richiedono forme di costituzione specifiche." },
            { text: "La disciplina tipica delle S.p.A", correct: false, info: "Richiede atto costitutivo formale." }
        ]
    },
    {
        q: "Per espresso richiamo normativo, la disciplina della società semplice è applicabile, in quanto compatibile:",
        options: [
            { text: "Alle società di capitali", correct: false, info: "Le società di capitali hanno regole proprie molto diverse." },
            { text: "Alla società in nome collettivo ed alla società in accomandita semplice", correct: true, info: "L'art. 2293 e 2315 richiamano le norme della società semplice per ciò che non è regolato specificamente." },
            { text: "Alle sole società in nome collettivo", correct: false, info: "Si applica anche alla s.a.s." },
            { text: "Alle sole società in accomandita semplice", correct: false, info: "Si applica anche alla s.n.c." }
        ]
    },
    {
        q: "Le società semplici esercenti attività agricola:",
        options: [
            { text: "Hanno l'obbligo di iscrizione presso il Registro delle Imprese, che assolve alla funzione di certificazione anagrafica", correct: false, info: "La funzione è di pubblicità legale." },
            { text: "Hanno l'obbligo di iscrizione presso il Registro delle Imprese, che assolve alla funzione di pubblicità notizia", correct: false, info: "Per le società semplici agricole, l'efficacia è dichiarativa." },
            { text: "Hanno l'obbligo di iscrizione presso il Registro delle Imprese, che assolve alla funzione di pubblicità legale dichiarativa", correct: true, info: "L'iscrizione ha efficacia di opponibilità ai terzi." },
            { text: "Hanno l'obbligo di iscrizione presso il Registro delle Imprese, che assolve alla funzione di pubblicità legale costitutiva", correct: false, info: "La funzione costitutiva è riservata alle società di capitali." }
        ]
    },
    {
        q: "Le società in nome collettivo possono esercitare:",
        options: [
            { text: "Solo attività commerciale", correct: false, info: "Possono esercitare anche attività agricola." },
            { text: "Solo attività agricola", correct: false, info: "Possono esercitare anche attività commerciale." },
            { text: "Sia attività agricola, sia attività commerciale", correct: true, info: "La forma s.n.c. è una forma societaria versatile per l'attività d'impresa." },
            { text: "Solo attività con finalità mutualistica", correct: false, info: "Quella è la funzione delle società cooperative." }
        ]
    },
    {
        q: "La mancata iscrizione delle società in nome collettivo nel Registro Imprese:",
        options: [
            { text: "Comporta l'inesistenza della società", correct: false, info: "La società esiste ugualmente come s.n.c. irregolare." },
            { text: "Non influisce sulla esistenza della società e si applica il regime proprio delle società semplici", correct: true, info: "La s.n.c. irregolare è soggetta alla disciplina della s.n.c. per quanto non derogato, ma con tutele ridotte." },
            { text: "Non influisce sulla esistenza della società e si applica il regime legale proprio delle s.n.c", correct: false, info: "Si applica un regime parzialmente diverso (irregolare)." },
            { text: "Non influisce sulla esistenza della società e si applica il regime legale proprio delle società in accomandita semplice", correct: false, info: "Ogni tipo sociale ha la sua irregolarità." }
        ]
    },
    {
        q: "Se nell'atto costitutivo delle s.n.c. non sono designati gli amministratori:",
        options: [
            { text: "L'atto costitutivo è privo di un requisito necessario, pertanto è inesistente", correct: false, info: "Il legislatore integra la norma." },
            { text: "Si verifica lo scioglimento della società", correct: false, info: "La società continua l'attività." },
            { text: "Il legislatore supplisce a tale carenza con l'applicazione di default della norma ex art. 2257 c.c", correct: true, info: "L'amministrazione spetta disgiuntamente a ciascun socio." },
            { text: "L'amministrazione spetta a tutti i soci congiuntamente", correct: false, info: "La regola di default è l'amministrazione disgiunta." }
        ]
    },
    {
        q: "Nella società in nome collettivo regolare:",
        options: [
            { text: "E' possibile prevedere una durata indeterminata", correct: false, info: "La regolarità richiede requisiti di forma e contenuto." },
            { text: "E' necessario prevedere un termine di durata", correct: true, info: "L'indicazione della durata è un requisito essenziale dell'atto costitutivo." },
            { text: "E' possibile stabilire una durata indeterminata a condizione che si preveda a favore dei soci il diritto di recesso", correct: false, info: "La legge impone la durata." },
            { text: "E' possibile prevedere una durata indeterminata ma, in tal caso, spetta ex lege il diritto di recesso a favore dei soci", correct: false, info: "Non è la regola per la s.n.c. regolare." }
        ]
    },
    {
        q: "La società di fatto:",
        options: [
            { text: "Se esercita attività commerciale segue il regime della società semplice", correct: false, info: "La società semplice non può svolgere attività commerciale." },
            { text: "Se esercita attività commerciale segue il regime della società in nome collettivo regolare", correct: false, info: "Non essendo iscritta, non è regolare." },
            { text: "Se esercita attività commerciale segue il regime della società in nome collettivo irregolare", correct: true, info: "È la conseguenza per l'esercizio di attività commerciale senza le forme di legge." },
            { text: "Se esercita attività agricola segue il regime della società in nome collettivo irregolare", correct: false, info: "Seguirebbe il regime della società semplice." }
        ]
    },
    {
    "q": "L'acquisto da parte di una società di capitali di una partecipazione in una società di persone:",
    "options": [
      { "text": "Non è legittimo", "correct": false, "info": "È legittimo, ma richiede tutele specifiche per la società di capitali." },
      { "text": "E' sempre legittimo", "correct": false, "info": "Richiede l'autorizzazione dell'organo deliberativo competente." },
      { "text": "E' legittimo a condizione che venga approvato dall'assemblea della società partecipante", "correct": true, "info": "La partecipazione comporta l'assunzione di responsabilità illimitata, quindi è una decisione che impatta il rischio della società di capitali." },
      { "text": "E' legittimo solo nell'ipotesi in cui la società di capitali sia socia accomandante di una società in accomandita semplice", "correct": false, "info": "Può partecipare anche come socio accomandatario o in altre società di persone, previa autorizzazione." }
    ]
  },
  {
    "q": "Il socio d'opera:",
    "options": [
      { "text": "E' un lavoratore subordinato dell'impresa", "correct": false, "info": "Il socio d'opera è un socio, non un dipendente subordinato." },
      { "text": "E' sempre remunerato con uno stipendio fisso", "correct": false, "info": "Il socio d'opera partecipa al rischio d'impresa." },
      { "text": "E' un lavoratore autonomo remunerato con uno stipendio fisso", "correct": false, "info": "Non percepisce uno stipendio fisso tipico del lavoratore dipendente." },
      { "text": "E' un lavoratore autonomo remunerato con la partecipazione al risultato economico d'esercizio (utile o perdita)", "correct": true, "info": "Il suo conferimento è l'attività lavorativa, in cambio della quale partecipa agli utili e alle perdite della società." }
    ]
  },
  {
    "q": "Il capitale sociale:",
    "options": [
      { "text": "E' la somma dei conferimenti in denaro", "correct": false, "info": "Il capitale sociale include anche conferimenti di natura diversa dal denaro." },
      { "text": "E' il valore monetario della somma di tutti i conferimenti, indipendentemente dal tipo di entità conferita", "correct": true, "info": "È la cifra che rappresenta il valore nominale dei conferimenti, espresso in moneta legale." },
      { "text": "E' la somma dei conferimenti di denaro e di crediti", "correct": false, "info": "È una definizione parziale." },
      { "text": "E' la somma dei conferimenti in denaro e dei beni immobili conferiti in proprietà alla società", "correct": false, "info": "È riduttivo, il capitale sociale comprende tutti i beni/diritti conferiti." }
    ]
  },
  {
    "q": "Nelle s.n.c. le limitazioni della responsabilità patrimoniale dei soci:",
    "options": [
      { "text": "Sono patti sempre invalidi nei confronti dei terzi", "correct": true, "info": "La responsabilità illimitata dei soci è inderogabile nei rapporti esterni." },
      { "text": "Sono patti validi solo se portati a conoscenza dei terzi con mezzi idonei", "correct": false, "info": "Non sono opponibili ai terzi in alcun modo." },
      { "text": "Sono validi nei soli confronti dei terzi di cui si dia la prova della conoscenza", "correct": false, "info": "Il patto limitativo è nullo rispetto ai terzi a prescindere dalla loro conoscenza." },
      { "text": "Sono opponibili nei soli confronti dei terzi di cui si dia la prova della conoscenza", "correct": false, "info": "Non hanno efficacia esterna." }
    ]
  },
  {
    "q": "Il nuovo socio di una società semplice o di una s.n.c. è responsabile patrimonialmente:",
    "options": [
      { "text": "Solo delle obbligazioni contratte successivamente al suo ingresso in società", "correct": false, "info": "Il nuovo socio risponde anche delle obbligazioni precedenti." },
      { "text": "Solo delle obbligazioni contratte anteriormente al suo ingresso in società", "correct": false, "info": "Risponde anche di quelle successive." },
      { "text": "Di tutte le obbligazioni contratte dalla società", "correct": true, "info": "Il nuovo socio risponde illimitatamente per le obbligazioni sociali, anche anteriori all'acquisto della qualità di socio." },
      { "text": "Delle sole obbligazioni sociali di cui ha conoscenza", "correct": false, "info": "La responsabilità è oggettiva, non dipende dalla conoscenza." }
    ]
  },
  {
    "q": "Ai sensi dell'art. 2290, primo comma c.c., nelle società semplici e nelle s.n.c. irregolari l'ex socio o i suoi eredi sono responsabili verso i terzi per le obbligazioni sociali:",
    "options": [
      { "text": "Fino al giorno dello scioglimento del singolo vincolo contrattuale", "correct": true, "info": "La responsabilità cessa per le obbligazioni sorte successivamente alla pubblicità dello scioglimento." },
      { "text": "Fino al giorno dello scioglimento della società", "correct": false, "info": "La responsabilità dell'ex socio si limita alle obbligazioni sorte prima del suo recesso/esclusione." },
      { "text": "Trascorsi sei mesi dallo scioglimento del singolo vincolo contrattuale", "correct": false, "info": "La cessazione è immediata con lo scioglimento del rapporto." },
      { "text": "Trascorsi sei mesi dallo scioglimento della società", "correct": false, "info": "Non è il termine corretto." }
    ]
  },
  {
    "q": "Nelle società semplici e nelle s.n.c. irregolari, deve avvalersi del beneficio di preventiva escussione esprimendo in tale senso la sua volontà:",
    "options": [
      { "text": "Il creditore sociale", "correct": false, "info": "È il socio che deve eccepire il beneficio." },
      { "text": "Il creditore personale", "correct": false, "info": "Non c'entra con le obbligazioni sociali." },
      { "text": "Il socio", "correct": true, "info": "Il socio deve invocare il beneficio indicando i beni sociali su cui il creditore può soddisfarsi." },
      { "text": "Il legale rappresentante della società", "correct": false, "info": "L'eccezione spetta al socio personalmente." }
    ]
  },
  {
    "q": "Nelle s.n.c. regolari, il rispetto del beneficio di preventiva escussione può venire meno:",
    "options": [
      { "text": "Anche se non vi siano elementi che rendano evidentemente inutile l'esperimento dell'esecuzione del patrimonio sociale", "correct": false, "info": "Il beneficio deve essere rispettato se il patrimonio sociale è sufficiente." },
      { "text": "Solo se vi siano elementi oggettivi che rendano evidentemente inutile l'esperimento dell'esecuzione del patrimonio sociale", "correct": true, "info": "Se il patrimonio sociale è palesemente incapiente, il creditore può agire subito contro il socio." },
      { "text": "Solo se vi siano elementi soggettivi che rendano evidentemente inutile l'esperimento dell'esecuzione del patrimonio sociale", "correct": false, "info": "La valutazione deve basarsi su elementi oggettivi (insolvenza)." },
      { "text": "Solo se vi siano elementi ipotetici che rendano evidentemente inutile l'esperimento dell'esecuzione del patrimonio sociale", "correct": false, "info": "L'inutilità deve essere certa/evidente, non ipotetica." }
    ]
  },
  {
    "q": "Il creditore personale del socio della società di persone:",
    "options": [
      { "text": "Ha diritto di soddisfare il proprio credito sugli utili distribuibili al socio debitore", "correct": true, "info": "Può pignorare gli utili spettanti al socio e compiere atti conservativi sulla quota." },
      { "text": "Ha diritto di soddisfarsi sugli utili conseguiti dalla società", "correct": false, "info": "Solo su quelli spettanti al socio debitore." },
      { "text": "Ha diritto a soddisfarsi sul patrimonio della società", "correct": false, "info": "Il patrimonio sociale è separato." },
      { "text": "Ha diritto a soddisfarsi sul capitale sociale della società", "correct": false, "info": "Il capitale sociale non è aggredibile dal creditore personale del socio." }
    ]
  },
  {
    "q": "L'attività di amministrazione concretizza:",
    "options": [
      { "text": "La capacità di decidere e compiere atti realizzativi dell'oggetto sociale", "correct": false, "info": "L'amministrazione è il potere decisionale (interno)." },
      { "text": "La capacità di decidere di compiere atti realizzativi dell'oggetto sociale", "correct": true, "info": "L'amministrazione riguarda la gestione interna e la formazione della volontà sociale." },
      { "text": "La capacità di compiere atti realizzativi dell'oggetto sociale", "correct": false, "info": "Questo è l'aspetto della rappresentanza." },
      { "text": "La capacità di compiere atti di natura economica anche se estranei all'oggetto sociale", "correct": false, "info": "L'amministrazione è vincolata all'oggetto sociale." }
    ]
  },
  {
    "q": "L'attività di rappresentanza concretizza:",
    "options": [
      { "text": "La capacità di decidere e compiere atti realizzativi dell'oggetto sociale", "correct": false, "info": "La rappresentanza è il potere di spendita del nome." },
      { "text": "La capacità di decidere di compiere atti realizzativi dell'oggetto sociale", "correct": false, "info": "Questo è l'amministrazione." },
      { "text": "La capacità di compiere atti realizzativi dell'oggetto sociale", "correct": true, "info": "La rappresentanza è il potere di agire in nome e per conto della società verso i terzi." },
      { "text": "La capacità di compiere atti di natura economica anche se estranei all'oggetto sociale", "correct": false, "info": "La rappresentanza ha limiti legali e statutari." }
    ]
  },
  {
    "q": "La revoca dell'amministratore nominato con atto costitutivo:",
    "options": [
      { "text": "Comporta la modifica dell'atto costitutivo ed è deliberazione soggetta sempre al voto unanime", "correct": false, "info": "Può essere prevista una maggioranza diversa." },
      { "text": "Comporta la modifica dell'atto costitutivo ed è deliberazione soggetta al voto unanime, salvo diversa pattuizione sociale", "correct": true, "info": "La revoca dell'amministratore designato nell'atto costitutivo è una modifica del contratto sociale." },
      { "text": "Non comporta la modificazione dell'atto costitutivo", "correct": false, "info": "Poiché la nomina era contenuta nell'atto, la sua revoca richiede una modifica dello stesso." },
      { "text": "Comporta la modifica dell'atto costitutivo ed è deliberazione soggetta a maggioranza dei soci, salvo diversa pattuizione sociale", "correct": false, "info": "La regola di base è l'unanimità per le modifiche contrattuali." }
    ]
  },
  {
    "q": "Le modificazioni dell'atto costitutivo delle s.n.c. regolari:",
    "options": [
      { "text": "Sono valide anche se non sono iscritte nel Registro Imprese", "correct": false, "info": "L'iscrizione è necessaria per l'opponibilità." },
      { "text": "Sono valide solo se iscritte nel Registro Imprese", "correct": false, "info": "Sono valide tra i soci, ma non opponibili ai terzi senza iscrizione." },
      { "text": "Sono opponibili ai terzi anche se non iscritte nel Registro Imprese", "correct": false, "info": "Non sono opponibili senza iscrizione." },
      { "text": "Sono comunque valide e se iscritte nel Registro Imprese sono opponibili ai terzi", "correct": true, "info": "L'iscrizione ha funzione di pubblicità dichiarativa." }
    ]
  },
  {
    "q": "Nel caso in cui la compagine sociale sia costitutita da tre soggetti ed uno dei soci muoia:",
    "options": [
      { "text": "La società si scioglie", "correct": false, "info": "Non c'è scioglimento automatico." },
      { "text": "La società può continuare ad operare", "correct": true, "info": "La morte di un socio non scioglie la società, salvo diverse disposizioni." },
      { "text": "La società è posta in liquidazione", "correct": false, "info": "Solo se i soci non decidono di continuare." },
      { "text": "La società si estingue", "correct": false, "info": "Continua con i soci superstiti." }
    ]
  },
  {
    "q": "Nel caso in cui la compagine sociale sia costituita da due soggetti ed uno muoia:",
    "options": [
      { "text": "La società si scioglie ex lege", "correct": false, "info": "C'è un periodo di tolleranza." },
      { "text": "La società non si scioglie se entro sei mesi viene ricostituita la pluralità dei soci", "correct": true, "info": "È la regola per evitare lo scioglimento immediato." },
      { "text": "La società è posta immediatamente in liquidazione", "correct": false, "info": "C'è il termine di sei mesi." },
      { "text": "La società non si scioglie", "correct": false, "info": "Si scioglie se non viene ricostituita." }
    ]
  },
  {
    "q": "In caso di morte di un socio, ai sensi degli articoli 2284 e 2289 c.c.:",
    "options": [
      { "text": "Il vincolo contrattuale si scioglie ex lege e sorge un diritto di credito degli eredi ad ottenere la liquidazione della quota entro sei mesi", "correct": true, "info": "È la disciplina legale standard." },
      { "text": "Il vincolo contrattuale si scioglie ex lege e sorge un diritto di credito degli eredi ad ottenere la liquidazione della quota entro tre mesi", "correct": false, "info": "Il termine è di 6 mesi." },
      { "text": "Il vincolo contrattuale si scioglie solo se previsto convenzionalmente nell'atto costitutivo e sorge un diritto di credito degli eredi ad ottenere la liquidazione della quota entro tre mesi", "correct": false, "info": "Lo scioglimento del rapporto è automatico ex lege, salvo pattuizioni contrarie." },
      { "text": "Il vincolo contrattuale si scioglie solo se previsto convenzionalmente nell'atto costitutivo e sorge un diritto di credito degli eredi ad ottenere la liquidazione della quota entro sei mesi", "correct": false, "info": "L'art. 2284 prevede lo scioglimento del rapporto ex lege." }
    ]
  },
  {
    "q": "Ai sensi dell'articolo 2285 c.c., l'esercizio del recesso ad nutum:",
    "options": [
      { "text": "Deve essere comunicato agli altri soci con un preavviso minimo di sei mesi", "correct": false, "info": "Il termine è di tre mesi." },
      { "text": "Deve essere comunicato agli altri soci con un preavviso minimo di tre mesi", "correct": true, "info": "È il termine legale prescritto per il recesso." },
      { "text": "Deve essere comunicato agli altri soci con un preavviso minimo di due mesi", "correct": false, "info": "Termine errato." },
      { "text": "Deve essere comunicato agli altri soci con un preavviso minimo di un mese", "correct": false, "info": "Termine errato." }
    ]
  },
  {
    "q": "La dichiarazione di fallimento di un socio:",
    "options": [
      { "text": "E' causa di esclusione del socio dalla società ex lege, salvo patti contrari", "correct": false, "info": "L'esclusione è automatica e inderogabile." },
      { "text": "E' causa di esclusione del socio dalla società di natura pattizia", "correct": false, "info": "È un'esclusione legale (ex lege)." },
      { "text": "E' causa di esclusione del socio dalla società ex lege, non derogabile", "correct": true, "info": "Il fallimento del socio comporta la sua esclusione di diritto dalla società di persone." },
      { "text": "E' causa di esclusione del socio dalla società ex lege, salvo deliberazione dei soci all'unanimità di non voler escludere il socio", "correct": false, "info": "L'esclusione è imperativa." }
    ]
  },
  {
    "q": "E' escluso di diritto il socio:",
    "options": [
      { "text": "Che sia stato interdetto o inabilitato", "correct": false, "info": "Questi sono casi di esclusione facoltativa (deliberabile dai soci)." },
      { "text": "Che si è obbligato a dare a titolo di conferimento la proprietà di una cosa e questa è perita prima che la proprietà sia passata alla società", "correct": false, "info": "Questa è un'ipotesi di scioglimento del rapporto sociale, ma non rientra nell'esclusione di diritto di cui al 2288." },
      { "text": "Che sia stato condannato ad una pena che comporti l'interdizione anche temporanea dai pubblici uffici", "correct": false, "info": "Non è causa di esclusione." },
      { "text": "La cui quota sia stata liquidata ai sensi dell'art. 2270 c.c. su domanda del creditore personale", "correct": true, "info": "L'art. 2288 c.c. prevede l'esclusione di diritto in questo caso." }
    ]
  },
  {
    "q": "Se il contratto sociale prevede la durata della società, allo scadere di tale termine:",
    "options": [
      { "text": "La società si scioglie e non può essere prorogata", "correct": false, "info": "Può essere prorogata." },
      { "text": "La società può non sciogliersi, ma la proroga deve essere espressa", "correct": false, "info": "È ammessa la proroga tacita." },
      { "text": "La società può essere prorogata anche per fatti concludenti", "correct": true, "info": "La proroga tacita è ammessa nelle società di persone." },
      { "text": "La società può essere prorogata solo con atto scritto iscritto nel Registro Imprese", "correct": false, "info": "La proroga tacita è possibile senza forma scritta." }
    ]
  },
  {
    "q": "I liquidatori:",
    "options": [
      { "text": "Possono compiere nuove operazioni per conto della società", "correct": false, "info": "Devono limitarsi a operazioni finalizzate alla liquidazione." },
      { "text": "Possono distribuire ai soci i beni sociali prima del pagamento dei debiti della società", "correct": false, "info": "Devono prima soddisfare i creditori." },
      { "text": "Possono vendere i beni sociali, anche se i soci avevano disposto in senso contrario in atto costitutivo", "correct": false, "info": "Il loro compito è la liquidazione, ma devono rispettare i limiti." },
      { "text": "Possono distribuire ai soci i beni sociali prima del pagamento dei debiti della società se sono state accantonate le somme per farlo", "correct": true, "info": "È consentito solo se vi è la certezza di poter pagare i debiti (accantonamento)." }
    ]
  },
  {
    "q": "Il bilancio sottoscritto dai liquidatori ed il piano di riparto:",
    "options": [
      { "text": "Debbono essere comunicati a mezzo raccomandata ai soci", "correct": true, "info": "I soci devono essere informati per poter eventualmente impugnare." },
      { "text": "Possono essere comunicati a mezzo raccomandata ai soci, a discrezione dei liquidatori", "correct": false, "info": "È un obbligo." },
      { "text": "Sono sottoposti alla mera visione dei soci presso la sede legale della società", "correct": false, "info": "Serve una comunicazione formale." },
      { "text": "Sono pubblicati su un quotidiano di rilevanza nazionale", "correct": false, "info": "La comunicazione ai soci è diretta." }
    ]
  },
  {
    "q": "I soci possono impugnare il bilancio ed il piano di riparto:",
    "options": [
      { "text": "Entro due mesi dalla comunicazione", "correct": true, "info": "È il termine previsto dalla legge per l'impugnazione." },
      { "text": "Entro due mesi dalla pubblicazione sul quotidiano di rilevanza nazionale", "correct": false, "info": "Il termine decorre dalla comunicazione." },
      { "text": "Entro un mese dal ricevimento della raccomandata", "correct": false, "info": "Il termine è di due mesi." },
      { "text": "Entro due mesi dalla presa visione dei documenti", "correct": false, "info": "Decorre dalla comunicazione." }
    ]
  },
  {
    "q": "La società in accomandita semplice è:",
    "options": [
      { "text": "Una società di capitali", "correct": false, "info": "È una società di persone." },
      { "text": "Una società di persone formata necessariamente dai soci definiti accomandanti", "correct": false, "info": "Richiede anche soci accomandatari." },
      { "text": "Una società di persone formata necessariamente dai soci definiti accomandatari", "correct": false, "info": "Richiede anche soci accomandanti." },
      { "text": "Una società di persone formata necessariamente da due tipi di soci definiti accomandatari e accomandanti", "correct": true, "info": "È la caratteristica essenziale della s.a.s." }
    ]
  },
  {
    "q": "I soci accomandanti:",
    "options": [
      { "text": "Sono illimitatamente responsabili per le obbligazioni sociali al pari dei soci accomandatari", "correct": false, "info": "Hanno responsabilità limitata." },
      { "text": "Sono responsabili per le obbligazioni sociali limitatamente a quanto conferito alla società", "correct": false, "info": "La responsabilità è limitata alla quota promessa/conferita." },
      { "text": "Sono responsabili per le obbligazioni sociali limitatamente a quanto hanno conferito ed abbiano promesso di conferire alla società", "correct": true, "info": "Questa è la delimitazione corretta della responsabilità." },
      { "text": "Sono illimitatamente responsabili per le obbligazioni sociali dopo l'escussione dei soci accomandatari", "correct": false, "info": "La responsabilità resta limitata." }
    ]
  },
  {
    "q": "Se la società in accomandita semplice esercita attività commerciale:",
    "options": [
      { "text": "Sia i soci accomandatari sia i soci accomandanti possono essere dichiarati falliti", "correct": false, "info": "Solo gli illimitatamente responsabili (accomandatari) falliscono." },
      { "text": "Solo i soci accomandatari possono essere dichiarati falliti", "correct": true, "info": "Il fallimento della società comporta il fallimento dei soci illimitatamente responsabili." },
      { "text": "Solo i soci accomandanti possono essere dichiarati falliti", "correct": false, "info": "Gli accomandanti sono a responsabilità limitata." },
      { "text": "I soci accomandatari sono dichiarati falliti prima dei soci accomandanti", "correct": false, "info": "Gli accomandanti non falliscono." }
    ]
  },
  {
    "q": "Nell'atto costitutivo delle s.a.s.:",
    "options": [
      { "text": "Deve essere indicato espressamente chi assume la qualifica di socio accomandatario e di socio accomandante", "correct": true, "info": "È essenziale per determinare i regimi di responsabilità." },
      { "text": "E' facoltativa l'indicazione di chi assume la qualifica di socio accomandatario e di socio accomandante", "correct": false, "info": "È obbligatoria." },
      { "text": "E' obbligatoria la sola indicazione di chi assume la qualifica di socio accomandatario", "correct": false, "info": "Va indicato anche chi è accomandante." },
      { "text": "E' obbligatoria la sola indicazione di chi assume la qualifica di socio accomandante", "correct": false, "info": "Va indicato anche chi è accomandatario." }
    ]
  },
  {
    "q": "Nella ragione sociale delle s.a.s.:",
    "options": [
      { "text": "Deve comparire il nome di almeno un socio accomandatario", "correct": false, "info": "È vero, ma non esaustivo." },
      { "text": "Deve comparire il nome di almeno un socio accomandante", "correct": false, "info": "È vietato." },
      { "text": "Deve comparire il nome di un socio accomandatario e di un socio accomandante", "correct": false, "info": "È vietato inserire il nome dell'accomandante." },
      { "text": "Deve comparire il nome di un socio accomandatario, è escluso che possa comparire il nome del socio accomandante", "correct": true, "info": "Il nome dell'accomandante non deve figurare per evitare confusione sulla responsabilità." }
    ]
  },
  {
    "q": "L'amministrazione della società:",
    "options": [
      { "text": "Spetta ad un socio accomandante e ad un socio accomandatario, quali rappresentanti di ciascuna categoria di soci", "correct": false, "info": "Spetta solo agli accomandatari." },
      { "text": "Spetta esclusivamente ai soci accomandanti", "correct": false, "info": "È vietato." },
      { "text": "Spetta esclusivamente ai soci accomandatari", "correct": true, "info": "Solo i soci illimitatamente responsabili possono amministrare." },
      { "text": "Spetta ai soci accomandatari e dai soci accomandanti disgiuntamente", "correct": false, "info": "Solo accomandatari." }
    ]
  },
  {
    "q": "Il divieto di immistione del socio accomandante opera:",
    "options": [
      { "text": "Se il socio accomandante è munito di procura speciale per compiere un singolo affare", "correct": false, "info": "Se c'è procura speciale, l'immistione è lecita." },
      { "text": "Se il socio accomandante presta la propria opera sotto la direzione dei soci accomandanti", "correct": false, "info": "È lecito prestare opera se sotto direzione." },
      { "text": "Se il socio accomandante compie un atto gestorio essendo privo di procura speciale per compiere un singolo affare", "correct": true, "info": "È la definizione di violazione del divieto di immistione." },
      { "text": "Se è previsto dall'atto costitutivo che il socio accomandante possa fornire pareri per determinate operazioni", "correct": false, "info": "È lecito dare pareri." }
    ]
  },
  {
    "q": "Se il socio accomandante non rispetta il divieto di immistione:",
    "options": [
      { "text": "Diventa responsabile per le obbligazioni sociali con il proprio patrimonio, ma non acquisice poteri amministrativi", "correct": true, "info": "Perde il beneficio della responsabilità limitata." },
      { "text": "Diventa responsabile per le obbligazioni sociali con il proprio patrimonio ed acquisice poteri amministrativi", "correct": false, "info": "Non acquisisce poteri amministrativi, subisce solo la sanzione." },
      { "text": "Acquisisce la qualifica di socio accomandatario", "correct": false, "info": "Rimane accomandante ma perde la limitazione della responsabilità." },
      { "text": "Non vi sono modifiche circa il regime di responsabilità patrimoniale, ma è escluso ex lege dalla società", "correct": false, "info": "Non è escluso, ma risponde illimitatamente." }
    ]
  },
  {
    "q": "Il trasferimento della quota sociale del socio accomandatario per atto inter vivos:",
    "options": [
      { "text": "Necessita del consenso unanime dei rimanenti soci accomandatari", "correct": false, "info": "Serve il consenso di tutti i soci." },
      { "text": "Necessita del consenso unanime dei soci accomandanti", "correct": false, "info": "Serve il consenso di tutti i soci." },
      { "text": "Neceddita del raggiungimento del voto favorevole dei soci accomandatari e del voto unanime degli accomandanti", "correct": false, "info": "Serve consenso unanime di tutti." },
      { "text": "Necessita del consenso unanime di tutti i soci, accomandatari e accomandanti", "correct": true, "info": "È una modifica dell'atto costitutivo che richiede il consenso di tutti." }
    ]
  },
  {
    "q": "Ai sensi dell'art. 2324 c.c., i creditori sociali che non sono stati soddisfatti nella liquidazione della società:",
    "options": [
      { "text": "Possono far valere i loro crediti anche nei confronti degli accomandanti, illimiatatamente sul loro patrimonio personale", "correct": false, "info": "La responsabilità rimane limitata alla quota." },
      { "text": "Possono far valere i loro crediti anche nei confronti degli accomandanti, nella misura pari al valore nominale del conferimento originariamente promesso", "correct": false, "info": "Limitata alla quota di liquidazione." },
      { "text": "Possono far valere i loro crediti anche nei confronti degli accomandanti, limitatamente alla quota di liquidazione spettante", "correct": true, "info": "Possono aggredire quanto spettante agli accomandanti in sede di riparto." },
      { "text": "Possono far valere i loro crediti anche nei confronti degli accomandanti, nella misura pari al valore nominale del conferimento originariamente effettuato", "correct": false, "info": "È la quota di liquidazione la base di calcolo." }
    ]
  },
  {
    "q": "Delle obbligazioni sociali della S.p.A:",
    "options": [
      { "text": "Risponde escluivamente la società con il proprio patrimonio", "correct": true, "info": "È il dogma dell'autonomia patrimoniale perfetta." },
      { "text": "Risponde la società e solidalmente, in via sussidiaria il socio", "correct": false, "info": "I soci non rispondono." },
      { "text": "Rispondono tutti i soci con il proprio patrimonio sociale", "correct": false, "info": "I soci godono di responsabilità limitata." },
      { "text": "Risponde la società solidalmente con il socio, ma non è una responsabilità sussidiaria", "correct": false, "info": "Il socio non risponde." }
    ]
  },
  {
    "q": "Nella S.p.A. la partecipazione sociale è costituita da:",
    "options": [
      { "text": "Obbligazioni", "correct": false, "info": "Le obbligazioni sono titoli di debito." },
      { "text": "Azioni", "correct": true, "info": "Le azioni rappresentano le frazioni del capitale sociale." },
      { "text": "Quote", "correct": false, "info": "Le quote sono tipiche della s.r.l." },
      { "text": "Azioni e quote", "correct": false, "info": "Solo azioni." }
    ]
  },
  {
    "q": "Il legislatore ha previsto che la S.p.A. abbia una struttura corporativa. Ciò significa:",
    "options": [
      { "text": "Che nella S.p.A. la compagine sociale deve essere costitutita da almeno due soci", "correct": false, "info": "È ammessa la s.p.a. unipersonale." },
      { "text": "Che debbono sussistere necessariamente l'assemblea, l'organo di gestione e di controllo", "correct": true, "info": "La struttura corporativa implica organi distinti con funzioni proprie." },
      { "text": "Che la S.p.A. deve essere iscritta necessariamente al Registro delle Imprese", "correct": false, "info": "È un requisito di costituzione, non la definizione di struttura corporativa." },
      { "text": "Che nella S.p.A. la compagine sociale deve essere costituita da almeno tre soci", "correct": false, "info": "Errato." }
    ]
  },
  {
    "q": "Il trasferimento dei titoli azionari da risparmiatore a risparmiatore:",
    "options": [
      { "text": "Influisce negativamente sulla operatività dell'impresa", "correct": false, "info": "È un fenomeno che avviene nel mercato secondario, irrilevante per la gestione aziendale." },
      { "text": "Influisce negativamente sugli interessi dell'impresa", "correct": false, "info": "È neutro." },
      { "text": "E' indifferente rispetto agli interessi ed alla operatività dell'impresa", "correct": true, "info": "La società non riceve né perde capitale con gli scambi di azioni tra terzi." },
      { "text": "Giova alla operatività dell'impresa", "correct": false, "info": "Non ha impatto operativo." }
    ]
  },
  {
    "q": "Dopo la riforma del diritto societario (D. Lgs. 6/2003):",
    "options": [
      { "text": "La categoria delle S.p.A. si esaurisce con le società chiuse", "correct": false, "info": "Esistono anche le aperte." },
      { "text": "La categoria delle S.p.A. si divide in società che fanno ricorso al mercato del capitale di rischio e società quotate", "correct": false, "info": "La classificazione è tripartita." },
      { "text": "La categoria della S.p.A. è scindibile in tre sottocategorie", "correct": true, "info": "Società chiuse, società con azioni diffuse, società quotate." },
      { "text": "La categoria delle S.p.A. si esaurisce nelle società quotate", "correct": false, "info": "Esistono le s.p.a. non quotate." }
    ]
  },
  {
    "q": "Le società che fanno ricorso al mercato del capitale di rischio comprendono:",
    "options": [
      { "text": "Le sole società chiuse", "correct": false, "info": "Queste non fanno ricorso al mercato del capitale di rischio." },
      { "text": "Le sole società con azioni diffuse tra il pubblico in misura rilevante", "correct": false, "info": "Comprende anche le quotate." },
      { "text": "Le sole società con azioni quotate", "correct": false, "info": "Comprende anche le diffuse." },
      { "text": "Le società con azioni diffuse tra il pubblico in misura rilevante e le società con azioni quotate", "correct": true, "info": "Ai sensi dell'art. 2325-bis, questa è la categoria che fa ricorso al mercato del capitale di rischio." }
    ]
  },
  {
    "q": "La CONSOB è stata istituita:",
    "options": [
      { "text": "Nel 1974", "correct": true },
      { "text": "Con le riforme degli anni '80", "correct": false },
      { "text": "Con le riforme degli anni 2000", "correct": false },
      { "text": "Con il codice civile del 1942", "correct": false }
    ]
  },
  {
    "q": "S.I.M. e S.I.C.A.V. sono state introdotte:",
    "options": [
      { "text": "Nel 1974", "correct": false },
      { "text": "Con le riforme degli anni '80", "correct": true },
      { "text": "Nel 2000", "correct": false },
      { "text": "Con il codice civile del 1942", "correct": false }
    ]
  },
  {
    "q": "Il T.U.F. è stato introdotto:",
    "options": [
      { "text": "Con le riforme degli anni '90", "correct": true },
      { "text": "Con le riforme degli anni '80", "correct": false },
      { "text": "Con le riforme degli anni 2000", "correct": false },
      { "text": "Con il codice civile del 1942", "correct": false }
    ]
  },
  {
    "q": "Con il D. Lgs. 6/2003 il legislatore:",
    "options": [
      { "text": "Ha introdotto i fondi pensione ed i fondi comuni di investimento", "correct": false },
      { "text": "Ha rinnovato la disciplina generale delle società di capitali", "correct": true },
      { "text": "Ha introdotto la società quotata", "correct": false },
      { "text": "Ha abolito la S.p.A. unipersonale", "correct": false }
    ]
  },
  {
    "q": "Il procedimento di costituzione della S.p.A. è composto:",
    "options": [
      { "text": "Dalla sola redazione dell'atto costitutivo", "correct": false },
      { "text": "Dalla redazione dell'atto costitutivo e successiva iscrizione nel Registro delle Imprese", "correct": true },
      { "text": "Dalla redazione dell'atto costitutivo e la pubblicazione dello stesso su un quotidiano nazionale", "correct": false },
      { "text": "Dalla redazione dell'atto costitutivo e la pubblicazione in Gazzetta Ufficiale", "correct": false }
    ]
  },
  {
    "q": "La S.p.A. può essere costituita:",
    "options": [
      { "text": "Solo per contratto", "correct": false },
      { "text": "Solo per atto unilaterale", "correct": false },
      { "text": "Sia per atto unilaterale, sia per contratto", "correct": true },
      { "text": "Ex lege", "correct": false }
    ]
  },
  {
    "q": "L'atto costitutivo può assumere:",
    "options": [
      { "text": "Forma libera", "correct": false },
      { "text": "Forma scritta", "correct": false },
      { "text": "Forma di atto pubblico", "correct": true },
      { "text": "Forma verbale", "correct": false }
    ]
  },
  {
    "q": "Lo statuto:",
    "options": [
      { "text": "E' parte integrante dell'atto costitutivo", "correct": true },
      { "text": "Sostituisce l'atto costitutivo", "correct": false },
      { "text": "Non abolisce l'atto costitutivo e non lo integra", "correct": false },
      { "text": "Corregge l'atto costitutivo", "correct": false }
    ]
  },
  {
    "q": "L'atto costitutivo prima dell'iscrizione presso il Registro Imprese:",
    "options": [
      { "text": "E' totalmente inefficace", "correct": false },
      { "text": "E' efficace quale contratto tra le parti", "correct": true },
      { "text": "E' efficace nei confronti anche dei terzi", "correct": false },
      { "text": "E' efficace nei soli confronti di terzi", "correct": false }
    ]
  },
  {
    "q": "Il Notaio procede all'iscrizione nel Registro delle Imprese dell'atto costitutivo se:",
    "options": [
      { "text": "Viola norme di carattere imperativo", "correct": false },
      { "text": "Si pone in contrasto con il buon costume", "correct": false },
      { "text": "Viola le norme relative alla disciplina delle S.p.A", "correct": false },
      { "text": "Supera il controllo di legalità", "correct": true }
    ]
  },
  {
    "q": "Il Registro delle Imprese svolge un controllo:",
    "options": [
      { "text": "Di regolarità formale", "correct": true },
      { "text": "Di regolarità sostanziale", "correct": false },
      { "text": "Di legalità formale", "correct": false },
      { "text": "Di legalità sostanziale", "correct": false }
    ]
  },
  {
    "q": "Il trasferimento della partecipazione azionaria prima dell'iscrizione presso il Registro delle Imprese della società:",
    "options": [
      { "text": "E' valida e segue la disciplina propria del trasferimento dei titoli di credito", "correct": false },
      { "text": "E' nulla", "correct": false },
      { "text": "E' valida e segue la disciplina propria del trasferimento dei titoli di credito", "correct": false },
      { "text": "E' valida e segue la disciplina della cessione del contratto", "correct": true }
    ]
  },
  {
    "q": "In caso di costituzione di S.p.A. per pubblica sottoscrizione, i promotori:",
    "options": [
      { "text": "Sono esenti dalla responsabilità per le obbligazioni contratte per costituire la società, salvo patto contrario", "correct": false },
      { "text": "Sono solidalmente responsabili per le obbligazioni contratte per costituire la società", "correct": true },
      { "text": "Sono sempre esenti dalla responsabilità per le obbligazioni contratte per costituire la società", "correct": false },
      { "text": "Sono i soli responsabili per le obbligazioni contratte per costituire la società", "correct": false }
    ]
  },
  {
    "q": "Prima dell'iscrizione della S.p.A. nel Registro delle Imprese:",
    "options": [
      { "text": "E' sempre vietata l'emissione di azioni", "correct": true },
      { "text": "Non vi è alcun divieto di emettere azioni", "correct": false },
      { "text": "E' possibile emettere azioni per un valore pari al 25% del capitale sociale", "correct": false },
      { "text": "E' possibile emettere azioni per un valore pari al 25% dei promessi conferimenti in denaro", "correct": false }
    ]
  },
  {
    "q": "L'atto costitutivo della S.p.A. affetto da nullità e iscritto nel Registro delle Imprese:",
    "options": [
      { "text": "Comporta sempre lo scioglimento della S.p.A", "correct": false },
      { "text": "Comporta lo scioglimento della S.p.A., salvo non venga sanata la causa di nullità", "correct": true },
      { "text": "Comporta la trasformazione ex lege della società in una società di persone", "correct": false },
      { "text": "E' soggetto alla disciplina della nullità dei contratti", "correct": false }
    ]
  },
  {
    "q": "La nullità dell'atto costitutivo:",
    "options": [
      { "text": "Può essere dichiarata esclusivamente dal Notaio", "correct": false },
      { "text": "Può essere dichiarata esclusivamente dalla autorità giudiziaria", "correct": true },
      { "text": "Può essere dichiarata esclusivamente dall'assemblea dei soci", "correct": false },
      { "text": "Può essere dichiarata esclusivamente dall'assemblea dei soci alla unanimità", "correct": false }
    ]
  },
  {
    "q": "Il provvedimento che dichiara la nullità dell'atto costitutivo:",
    "options": [
      { "text": "Ha efficacia retroattiva, da quando è comunicato", "correct": false },
      { "text": "Ha efficacia solo per il futuro, da quando è comunicato", "correct": false },
      { "text": "Ha la sola efficacia retroattiva da quando è iscritto presso il Registro delle Imprese", "correct": false },
      { "text": "Ha la sola efficacia per il futuro da quando è iscritto nel Registro delle Imprese", "correct": true }
    ]
  },
  {
    "q": "I conferimenti in denaro, prima dell'iscrizione della S.p.A. presso il Registro delle Imprese:",
    "options": [
      { "text": "Debbono essere versati nella misura non inferiore al 25% su un conto vincolato", "correct": true },
      { "text": "Debbono essere integralmente versati su un conto vincolato", "correct": false },
      { "text": "Debbono essere versati nella misura non inferiore al 50% su un conto vincolato", "correct": false },
      { "text": "Debbono essere versati nella misura non inferiore al 75% su un conto vincolato", "correct": false }
    ]
  },
  {
    "q": "Le azioni non interamente liberate:",
    "options": [
      { "text": "Sono liberamente trasferibili", "correct": false },
      { "text": "Sono trasferibili se sono nominative", "correct": false },
      { "text": "Sono trasferibili se risultano dal titolo i versamenti ancora dovuti", "correct": false },
      { "text": "Sono trasferibili se nominativi e se risultano dal titolo i versamenti ancora dovuti", "correct": true }
    ]
  },
  {
    "q": "In caso di trasferimento di azioni non interamente liberate:",
    "options": [
      { "text": "E' responsabile dell'adempimento il solo socio cedente", "correct": false },
      { "text": "E' responsabile dell'adempimento il solo socio cessionario", "correct": false },
      { "text": "E' responsabile dell'adempimento il socio cessionario, nonché il socio cedente fino al momento dell'integrale liberazione", "correct": false },
      { "text": "E' responsabile dell'adempimento il socio cessionario, nonché il socio cedente entro i tre anni dalla cessione", "correct": true }
    ]
  },
  {
    "q": "Il valore dei beni diversi dal denaro conferiti nella S.p.A.:",
    "options": [
      { "text": "Deve essere superiore a quello attribuito ai fini della determinazione del capitale sociale", "correct": false },
      { "text": "Deve essere almeno pari a quello attribuito ai fini della determinazione del capitale sociale", "correct": true },
      { "text": "Può essere inferiore a quello attribuito ai fini della determinazione del capitale sociale", "correct": false },
      { "text": "Può essere inferiore o uguale a quello attribuito ai fini della determinazione del capitale sociale", "correct": false }
    ]
  },
  {
    "q": "Nella S.p.A. si può conferire:",
    "options": [
      { "text": "Prestazione di opera", "correct": false },
      { "text": "Conferimenti di debiti", "correct": false },
      { "text": "Conferimenti di crediti", "correct": true },
      { "text": "Prestazione di servizi", "correct": false }
    ]
  },
  {
    "q": "L'acquisto pericoloso è sottoposto all'autorizzazione:",
    "options": [
      { "text": "Della assemblea ordinaria", "correct": true },
      { "text": "Della assemblea straordinaria", "correct": false },
      { "text": "Del Consiglio di amministrazione", "correct": false },
      { "text": "Del revisore dei conti", "correct": false }
    ]
  },
  {
    "q": "Le azioni con prestazioni accessorie:",
    "options": [
      { "text": "Sono al portatore", "correct": false },
      { "text": "Sono nominative e possono essere cedute solo con il consenso dell'assemblea ordinaria", "correct": false },
      { "text": "Sono nominative e possono essere cedute liberamente", "correct": false },
      { "text": "Sono nominative e possono essere cedute solo con il consenso degli amministratori", "correct": true }
    ]
  },
  {
    "q": "La partecipazione sociale nella S.p.A. è costitutita da:",
    "options": [
      { "text": "Azioni", "correct": true },
      { "text": "Obbligazioni", "correct": false },
      { "text": "Quote", "correct": false },
      { "text": "Titoli di debito", "correct": false }
    ]
  },
  {
    "q": "L'azione è:",
    "options": [
      { "text": "Divisibile all'infinito", "correct": false },
      { "text": "Indivisibile", "correct": true },
      { "text": "Divisibile al massimo in tre azioni", "correct": false },
      { "text": "Divisibile in un numero di azioni come indicato nello Statuto", "correct": false }
    ]
  },
  {
    "q": "In caso di emissione di azioni con valore nominale, lo statuto della società deve prevedere:",
    "options": [
      { "text": "La determinazione del solo capitale sottoscritto", "correct": false },
      { "text": "La sola modalità di emissione di tali azioni", "correct": false },
      { "text": "Solamente le modalità di emissione e circolazione di tali azioni", "correct": false },
      { "text": "La determinazione del capitale sottoscritto e le modalità di emissione e circolazione di tali azioni", "correct": true }
    ]
  },
  {
    "q": "Il codice civile detta la disciplina della comproprietà azionaria:",
    "options": [
      { "text": "All'articolo 2352 c.c", "correct": false, "info": "L'art. 2352 riguarda pegno, usufrutto e sequestro di azioni." },
      { "text": "All'art. 2350 c.c", "correct": false, "info": "L'art. 2350 riguarda il diritto agli utili e alla quota di liquidazione." },
      { "text": "All'articolo 2347 c.c", "correct": true, "info": "L'art. 2347 c.c. disciplina espressamente la comproprietà delle azioni, richiedendo la nomina di un rappresentante comune." },
      { "text": "All'art. 2349 c.c", "correct": false, "info": "L'art. 2349 riguarda le azioni assegnate ai prestatori di lavoro." }
    ]
  },
  {
    "q": "Costituisce un esempio di diritto anche amministrativo dell'azione:",
    "options": [
      { "text": "Il diritto di opzione", "correct": false, "info": "È un diritto amministrativo e patrimoniale (diritto di sottoscrizione)." },
      { "text": "Il diritto di recesso", "correct": false, "info": "È un diritto potestativo di scioglimento del rapporto sociale." },
      { "text": "Il diritto di esaminare determinati libri sociali", "correct": true, "info": "È un diritto di controllo, espressione tipica dei diritti amministrativi riconosciuti al socio." },
      { "text": "Il diritto agli utili", "correct": false, "info": "È un diritto di natura prettamente patrimoniale." }
    ]
  },
  {
    "q": "Il principio di uguaglianza dei diritti attribuiti alle azioni è enunciato:",
    "options": [
      { "text": "Dall'art. 2328 primo comma c.c", "correct": false, "info": "L'art. 2328 riguarda l'atto costitutivo." },
      { "text": "Dall'art. 2338 primo comma c.c", "correct": false, "info": "L'art. 2338 riguarda la costituzione per pubblica sottoscrizione." },
      { "text": "Dall'art. 2348 primo comma c.c", "correct": true, "info": "L'art. 2348 c.c. sancisce che le azioni devono essere di uguale valore e conferiscono ai loro possessori uguali diritti." },
      { "text": "Dall'art. 2358 primo comma c.c", "correct": false, "info": "L'art. 2358 riguarda le altre operazioni sulle proprie azioni." }
    ]
  },
  {
    "q": "Costituisce un esempio di diritto complesso dell'azione:",
    "options": [
      { "text": "Il diritto di assegnazione di azioni gratuite", "correct": true, "info": "Si definisce complesso perché implica sia una natura patrimoniale (aumento della partecipazione) che amministrativa." },
      { "text": "Il diritto agli utili", "correct": false, "info": "Diritto puramente patrimoniale." },
      { "text": "Il diritto alla quota di liquidazione della partecipazione", "correct": false, "info": "Diritto patrimoniale che matura allo scioglimento della società." },
      { "text": "Il diritto di esaminare determinati libri sociali", "correct": false, "info": "Diritto di controllo/amministrativo." }
    ]
  },
  {
    "q": "L'uguaglianza delle azioni ha carattere:",
    "options": [
      { "text": "Esclusivamente oggettivo", "correct": true, "info": "Il legislatore si riferisce all'uguaglianza intrinseca delle azioni (valore e diritti) indipendentemente dal titolare." },
      { "text": "Esclusivamente soggettivo", "correct": false, "info": "L'uguaglianza non dipende dal socio che detiene l'azione." },
      { "text": "In parte oggettivo ed in parte soggettivo", "correct": false, "info": "La natura dell'azione è oggettiva." },
      { "text": "Esclusivamente contabile-finanziario", "correct": false, "info": "È una caratteristica giuridica." }
    ]
  },
  {
    "q": "2 E' escluso che possano intervenire in assemblea:",
    "options": [
      { "text": "L'usufruttuario", "correct": false },
      { "text": "Il creditore pignoratizio", "correct": false },
      { "text": "L'azionista senza diritto di voto", "correct": true },
      { "text": "L'azionista con diritto di voto sospeso", "correct": false }
    ]
  },
  {
    "q": "3 Il codicie civile disciplina il diritto d'intervento all'assemblea e l'esercizio del voto:",
    "options": [
      { "text": "Nell'articolo 2368 c.c", "correct": false },
      { "text": "Nell'articolo 2367 c.c", "correct": false },
      { "text": "Nell'articolo 2370 c.c", "correct": true },
      { "text": "Nell'articolo 2371 c.c", "correct": false }
    ]
  },
  {
    "q": "4 Se la S.p.A. fa ricorso al mercato di capitale di rischio, Il rappresentante che parteciperà all'assemblea può essere delegato da un massimo di:",
    "options": [
      { "text": "Venti soci", "correct": true },
      { "text": "Trenta soci", "correct": false },
      { "text": "Quaranta soci", "correct": false },
      { "text": "Cinquanta soci", "correct": false }
    ]
  },
  {
    "q": "5 Per le società quotate la rappresentanza in assemblea è disciplinata:",
    "options": [
      { "text": "Esclusivamente dallo statuto", "correct": false },
      { "text": "Esclusivamente dal codice civile", "correct": false },
      { "text": "Dalla legge speciale", "correct": true },
      { "text": "Esclusivamente dalla CONSOB", "correct": false }
    ]
  },
  {
    "q": "6 L'articolo del codice civile che detta la disciplina generale della rappresentanza in assemblea è:",
    "options": [
      { "text": "Il 2376 c.c", "correct": false },
      { "text": "Il 2372 c.c", "correct": true },
      { "text": "Il 2384 c.c", "correct": false },
      { "text": "Il 2366 c.c", "correct": false }
    ]
  },
  {
    "q": "7 Può essere delegato come rappresentante:",
    "options": [
      { "text": "Un membro degli organi amministrativi", "correct": false },
      { "text": "Un ex dipendente della società", "correct": true },
      { "text": "Un membro degli organi di controllo", "correct": false },
      { "text": "Un dipendente della società", "correct": false }
    ]
  },
  {
    "q": "8 Il medesimo rappresentante può essere delegato da:",
    "options": [
      { "text": "Dieci soci se la società fa ricorso al mercato di capitale di rischio", "correct": true },
      { "text": "Cinquantacinque soci se la società fa ricorso al mercato di capitale di rischio", "correct": false },
      { "text": "Venticinque soci se la società fa ricorso al mercato di capitale di rischio", "correct": false },
      { "text": "Cinquanta soci se la società fa ricorso al mercato di capitale di rischio", "correct": false }
    ]
  },
  {
    "q": "9 Per le società quotate:",
    "options": [
      { "text": "E' fatto espresso divieto di raccogliere le deleghe di voto", "correct": false },
      { "text": "E' ammesso il solo meccanismo di sollecitazione", "correct": false },
      { "text": "E' ammesso il solo meccanismo di raccolta delle deleghe", "correct": false },
      { "text": "E' ammesso sia il meccanimo di sollecitazione, sia quello di raccolta delle deleghe", "correct": true }
    ]
  },
  {
    "q": "10 La disciplina della rappresentanza in assemblea delle società quotate è stata oggetto di riforma a seguito:",
    "options": [
      { "text": "Dei provvedimenti emessi dalla CONSOB", "correct": false },
      { "text": "Dei provvedimenti emessi dalla Banca D'Italia", "correct": false },
      { "text": "Dei provvedimenti emessi dalla Banca Centrale Europea", "correct": false },
      { "text": "Di una direttiva comunitaria", "correct": true }
    ]
  },
  {
    "q": "1 Ai sensi dell'art. 2371 c.c. l'assemblea è presieduta:",
    "options": [
      { "text": "Dai singoli soci a turno", "correct": false },
      { "text": "Dalla persona indicata nello statuto o in mancanza da quella eletta con il voto della minoranza dei presenti", "correct": false },
      { "text": "Dalla persona indicata nello statuto o in mancanza da quella eletta con il voto della maggioranza dei presenti", "correct": true },
      { "text": "Dal presidente del C.D.A", "correct": false }
    ]
  },
  {
    "q": "2 Ai sensi dell'art. 2374 c.c. i soci intervenuti che riuniscono un terzo de lcapitale rappresentato in assemblea:",
    "options": [
      { "text": "Possono chiedere che venga rinviata di oltre cinque giorni se dichiarano di non essere sufficientemente informati", "correct": false },
      { "text": "Possono chiedere che venga rinviata di oltre sette giorni se dichiarano di non essere sufficientemente informati", "correct": false },
      { "text": "Possono chiedere che venga rinviata di oltre quindici giorni se dichiarano di non essere sufficientemente informati", "correct": false },
      { "text": "Possono chiedere che venga rinviata di non oltre cinque giorni se dichiarano di non essere sufficientemente informati", "correct": true }
    ]
  },
  {
    "q": "3 Il voto assembleare con la modalità dello scrutinio segreto:",
    "options": [
      { "text": "E' ammesso se ha ad oggetto la revoca degli amministratori", "correct": false },
      { "text": "E' ammesso se ha ad oggetto la nomina degli amministratori", "correct": false },
      { "text": "E' sempre esclusa l'adozione di tale modalità di voto", "correct": true },
      { "text": "E' ammesso con riguardo alla sola nomina del presidente dell'assemblea", "correct": false }
    ]
  },
  {
    "q": "4 Ai sensi dell'art. 2375 c.c. la verbalizzazione dell'assemblea:",
    "options": [
      { "text": "E' facoltativa", "correct": false },
      { "text": "E' sempre obbligatoria", "correct": true },
      { "text": "E' esclusa dal legislatore", "correct": false },
      { "text": "E' obbligatoria solo nei casi di nomina e revoca degli organi sociali", "correct": false }
    ]
  },
  {
    "q": "5 Il verbale dell'assemblea straordinaria deve essere redatto:",
    "options": [
      { "text": "Dal presidente del C.D.A", "correct": false },
      { "text": "Dal presidente dell'assemblea", "correct": false },
      { "text": "Dal socio dissenziente", "correct": false },
      { "text": "Dal Notaio", "correct": true }
    ]
  },
  {
    "q": "6 Nelle società non quotate:",
    "options": [
      { "text": "La deliberazione approvata con il voto determinante di coloro che si trovano in conflitto di interessi è impugnabile se si è prodotto un danno alla società", "correct": false },
      { "text": "La deliberazione approvata con il voto determinante di coloro che si trovano in conflitto di interessi è impugnabile se può cagionare danno alla società", "correct": true },
      { "text": "La deliberazione approvata con il voto determinante di coloro che si trovano in conflitto di interessi è sempre impugnabile", "correct": false },
      { "text": "La deliberazione approvata con il voto di coloro che si trovano in conflitto di interessi è sempre impugnabile", "correct": false }
    ]
  },
  {
    "q": "7 I sindacati di voto sono:",
    "options": [
      { "text": "Patti parasociali con i quali tutti i soci si obbligano a concordare il voto che esprimeranno in assemblea", "correct": false },
      { "text": "Patti parasociali con i quali alcuni i soci si obbligano a concordare il voto che esprimeranno in assemblea", "correct": true },
      { "text": "Patti contenuti nello statuto con i quali alcuni i soci si obbligano a concordare il voto che esprimeranno in assemblea", "correct": false },
      { "text": "Patti contenuti nello statuto con i quali tutti i soci si obbligano a concordare il voto che esprimeranno in assemblea", "correct": false }
    ]
  },
  {
    "q": "8 I sindacati di voto hanno una durata massima di:",
    "options": [
      { "text": "Due anni", "correct": false },
      { "text": "Tre anni", "correct": false },
      { "text": "Quattro anni", "correct": false },
      { "text": "Cinque anni", "correct": true }
    ]
  },
  {
    "q": "9 Se il sindacato di voto viene contratto per una durata di quella legale:",
    "options": [
      { "text": "Il patto è totalmente nullo", "correct": false },
      { "text": "Il patto è annullabile", "correct": false },
      { "text": "Il patto è comunque valido", "correct": false },
      { "text": "La durata del patto è ricondotta al termine legale", "correct": true }
    ]
  },
  {
    "q": "10 Se il sindacato di voto è contratto a tempo indeterminato, ogni socio ha il diritto di recedere:",
    "options": [
      { "text": "Osservando un preavviso di centottanta giorni", "correct": true },
      { "text": "Osservando un preavviso di novanta giorni", "correct": false },
      { "text": "Osservando un preavviso di sessanta giorni", "correct": false },
      { "text": "Osservando un preavviso di trenta giorni", "correct": false }
    ]
  },
  {
    "q": "1 La delibera assembleare è invalida se vi è violazione delle norme relative:",
    "options": [
      { "text": "Esclusivamente al procedimento assembleare", "correct": false },
      { "text": "Esclusivamente ai vizi che riguardano il contenuto della delibera", "correct": false },
      { "text": "Al procedimento assembleare o i vizi che riguardano il contenuto della delibera", "correct": true },
      { "text": "Esclusivamente alle modalità di convocazione dell'assemblea", "correct": false }
    ]
  },
  {
    "q": "2 Nel sistema previgente, la giurisprudenza ha introdotto la categoria delle delibere:",
    "options": [
      { "text": "Invalide", "correct": false },
      { "text": "Inesistenti", "correct": true },
      { "text": "Nulle", "correct": false },
      { "text": "Annullabili", "correct": false }
    ]
  },
  {
    "q": "3 L'art. 2377 c.c. disciplina le delibere:",
    "options": [
      { "text": "Invalide", "correct": false },
      { "text": "Inesistenti", "correct": false },
      { "text": "Nulle", "correct": false },
      { "text": "Annullabili", "correct": true }
    ]
  },
  {
    "q": "4 L'art. 2379 c.c. disciplina le delibere:",
    "options": [
      { "text": "Invalide", "correct": false },
      { "text": "Inesistenti", "correct": false },
      { "text": "Nulle", "correct": true },
      { "text": "Annullabili", "correct": false }
    ]
  },
  {
    "q": "5 E' annullabile la delibera se:",
    "options": [
      { "text": "E' adottata in violazione dello statuto", "correct": true },
      { "text": "Partecipano alla assemblea persone non legittimate", "correct": false },
      { "text": "Alcuni singoli voti sono invalidi", "correct": false },
      { "text": "Vi è errato conteggio dei voti", "correct": false }
    ]
  },
  {
    "q": "6 Ai sensi dell'art. 2377 c.c. le deliberazioni possono essere impugnate:",
    "options": [
      { "text": "Dai soli soci assenti", "correct": false },
      { "text": "Dai soli soci dissenzienti", "correct": false },
      { "text": "Dai soli soci astenuti", "correct": false },
      { "text": "Dai soci assenti, dissenzienti ed astenuti", "correct": true }
    ]
  },
  {
    "q": "7 Oltre ai soci, sono altresì legittimati ai sensi dell'art. 2377 c.c. ad impugnare le delibere:",
    "options": [
      { "text": "Dai soli amministratori", "correct": false },
      { "text": "Solo dal consiglio di sorveglianza", "correct": false },
      { "text": "Solo dal consiglio di sorveglianza e dal collegio sindacale", "correct": false },
      { "text": "Dagli amministratori, dal consiglio di sorveglianza e dal collegio sindacale", "correct": true }
    ]
  },
  {
    "q": "8 Il procedimento di impugnazione della delibera è disciplinato:",
    "options": [
      { "text": "Dall'art. 2376 c.c", "correct": false },
      { "text": "Dall'art. 2378 c.c", "correct": true },
      { "text": "Dall'art. 2380 c.c", "correct": false },
      { "text": "Dall'art. 2381 c.c", "correct": false }
    ]
  },
  {
    "q": "9 La delibera è nulla se adottata:",
    "options": [
      { "text": "Con il voto determinante di voti non validi", "correct": false },
      { "text": "In violazione della legge", "correct": false },
      { "text": "In violazione di norme imperative", "correct": true },
      { "text": "In violazione dello statuto", "correct": false }
    ]
  },
  {
    "q": "10 Le deliberazioni di aumento del capitale sono impugnabili:",
    "options": [
      { "text": "Entro centottanta giorni dalla iscrizione nel Registro delle Imprese", "correct": true },
      { "text": "Entro cento giorni dalla iscrizione nel Registro delle Imprese", "correct": false },
      { "text": "Entro ottanta giorni dalla iscrizione nel Registro delle Imprese", "correct": false },
      { "text": "Entro sessanta giorni dalla iscrizione nel Registro delle Imprese", "correct": false }
    ]
  },
  {
    "q": "1 Agli amministratori spetta la gestione dell'impresa sociale:",
    "options": [
      { "text": "In via esclusiva", "correct": true },
      { "text": "In via concorrente con i soci", "correct": false },
      { "text": "In via alterntiva con i soci", "correct": false },
      { "text": "In via concorrente con gli obbligazionisti", "correct": false }
    ]
  },
  {
    "q": "2 Gli amministratori hanno una competenza gestoria:",
    "options": [
      { "text": "Onnicomprensiva", "correct": false },
      { "text": "Comprendete tutti gli atti che non siano oggetto di competenza assembleare (dei soci)", "correct": true },
      { "text": "Comprendete tutti gli atti che non siano oggetto di competenza assembleare (degli obbligazionisti)", "correct": false },
      { "text": "Comprendete tutti gli atti che non siano oggetto di competenza assembleare (degli azionisti speciali)", "correct": false }
    ]
  },
  {
    "q": "3 Il rapporto tra amministratori e assemblea è delineato:",
    "options": [
      { "text": "Dal combinato disposto delll'art. 2364 n. 5 e 2380 bis primo comma c.c", "correct": true },
      { "text": "Dal combinato disposto delll'art. 2364 n. 1 e 2380 bis secondo comma c.c", "correct": false },
      { "text": "Dall'art. 2364 c.c", "correct": false },
      { "text": "Dall'art. 2380 bis c.c", "correct": false }
    ]
  },
  {
    "q": "4 La nomina degli amministratori successivi ai primi:",
    "options": [
      { "text": "Deve essere regolata in statuto", "correct": false },
      { "text": "Spetta all'assemblea straordinaria", "correct": false },
      { "text": "Spetta all'assemblea ordinaria", "correct": true },
      { "text": "Spetta agli amministratori uscenti", "correct": false }
    ]
  },
  {
    "q": "5 Ai sensi dell'art. 2380 bis comma quarto del codice civile, se lo statuto non stabilisce il numero degli amministratori, ma ne indica solo un numero massimo e minimo, la determinazione spetta:",
    "options": [
      { "text": "All'assemblea", "correct": true },
      { "text": "Al collegio sindacale", "correct": false },
      { "text": "Al Tribunale del circondario nel quale ha sede la società", "correct": false },
      { "text": "Al revisore legale dei conti", "correct": false }
    ]
  },
  {
    "q": "6 Può essere nominato amministratore:",
    "options": [
      { "text": "L'interdetto", "correct": false },
      { "text": "Il fallito", "correct": false },
      { "text": "Chi non è inabilitato", "correct": true },
      { "text": "Chi è condannato ad una pena che importa l'interdizione dai pubblici uffici", "correct": false }
    ]
  },
  {
    "q": "7 Gli amministratori possono essere nominati per un periodo:",
    "options": [
      { "text": "Di tre esercizi", "correct": true },
      { "text": "Di quattro esercizi", "correct": false },
      { "text": "Di cinque esercizi", "correct": false },
      { "text": "Di sette esercizi", "correct": false }
    ]
  },
  {
    "q": "8 E' esclusla la cessazione dalla carica di amministratore nel caso di:",
    "options": [
      { "text": "Rinuncia da parte dell'amministratore", "correct": false },
      { "text": "Revoca assembleare", "correct": false },
      { "text": "Malattia temporanea", "correct": true },
      { "text": "Morte", "correct": false }
    ]
  },
  {
    "q": "9 La clausola simul stabunt, simul cadent è legittimata:",
    "options": [
      { "text": "Dall'art. 2385 quarto comma c.c", "correct": false },
      { "text": "Dall'art. 2384 quarto comma c.c", "correct": false },
      { "text": "Dall'art. 2383 quarto comma c.c", "correct": false },
      { "text": "Dall'art. 2386 quarto comma c.c", "correct": true }
    ]
  },
  {
    "q": "10 La cessazione degli amministratori per scadenza del termine ha effetto:",
    "options": [
      { "text": "Immediato", "correct": false },
      { "text": "Retroattivo", "correct": false },
      { "text": "Solo dal momento in cui l'organo è stato ricostituito", "correct": true },
      { "text": "Trascorsa una settimana esatta dalla cessazione degli amministratori", "correct": false }
    ]
  },
  {
    "q": "1 Con riguardo alle riunioni ed alle delibere del C.D.A. è escluso:",
    "options": [
      { "text": "Che i voti dei consiglieri vengano espressi da un rappresentante", "correct": true },
      { "text": "Che la presenza dei consiglieri alle riunioni del consiglio medesimo avvenga con mezzi di telecomunicazione", "correct": false },
      { "text": "Che i consiglieri siano adeguatamente informati sulle materie dell'ordine del giorno", "correct": false },
      { "text": "Che per la validità delle deliberazioni del C.D.A. debba essere necessaria la presenza della maggioranza degli amministratori in carica", "correct": false }
    ]
  },
  {
    "q": "2 Le delibere del C.D.A. possono essere impugnate nel termine di:",
    "options": [
      { "text": "Trenta giorni dalla deliberazione", "correct": false },
      { "text": "Quindici giorni dalla deliberazione", "correct": false },
      { "text": "Sessanta giorni dalla deliberazione", "correct": false },
      { "text": "Novanta giorni dalla deliberazione", "correct": true }
    ]
  },
  {
    "q": "3 La disciplina del conflitto di interessi degli amministratori è regolata:",
    "options": [
      { "text": "Dall'art. 2393 c.c", "correct": false },
      { "text": "Dall'art. 2393 c.c", "correct": false },
      { "text": "Dall'art. 2391 c.c", "correct": true },
      { "text": "Dall'art. 2390 c.c", "correct": false }
    ]
  },
  {
    "q": "4 La creazione di organi delegati:",
    "options": [
      { "text": "Deve essere prevista dallo statuto", "correct": true },
      { "text": "E' consentita dall'assemblea ordinaria", "correct": false },
      { "text": "E' consentita dall'assemblea straordinaria", "correct": false },
      { "text": "E' decisa dall'organo amministrativo", "correct": false }
    ]
  },
  {
    "q": "5 La delega del C.D.A. agli organi delegati può avere ad oggetto:",
    "options": [
      { "text": "La redazione del bilancio di esercizio", "correct": false },
      { "text": "Attività di gestione dell'impresa", "correct": true },
      { "text": "La falcoltà di aumentare il capitale sociale", "correct": false },
      { "text": "La facoltà di emettere obbligazioni convertibili per delega", "correct": false }
    ]
  },
  {
    "q": "6 Gli organi delegati:",
    "options": [
      { "text": "Redigono il progetto di fusione", "correct": false },
      { "text": "Redigono il progetto di scissione", "correct": false },
      { "text": "Curano che l'assetto organizzativo ed amministrativo della società sia adeguato alle dimensioni dell'impresa", "correct": true },
      { "text": "Provvedono ad eseguire gli adempimenti posti a carico degli amministratori in caso di riduzione obbligatoria del capitale sociale per perdite", "correct": false }
    ]
  },
  {
    "q": "7 Le competenze degli organi delegati sono fissate:",
    "options": [
      { "text": "Dall'art. 2381 primo comma c.c", "correct": false },
      { "text": "Dall'art. 2381 quinto comma c.c", "correct": true },
      { "text": "Dall'art. 2381 quarto comma c.c", "correct": false },
      { "text": "Dall'art. 2381 secondo comma c.c", "correct": false }
    ]
  },
  {
    "q": "8 Alle riunioni del comitato esecutivo:",
    "options": [
      { "text": "Devono partecipare i sindaci", "correct": true },
      { "text": "Deve partecipare il rappresentante dei soci di minoranza", "correct": false },
      { "text": "Deve partecipare il rappresentante dei soci di maggioranza", "correct": false },
      { "text": "Deve partecipare il rappresentante degli obbligazionisti", "correct": false }
    ]
  },
  {
    "q": "9 L'amministratore che si trovi in conflitto di interessi, ai sensi del secondo comma art. 2391 c.c.:",
    "options": [
      { "text": "Ha la facolta di motivare le ragioni dell'operazione", "correct": false },
      { "text": "Ha la facoltà di motivare adeguatamente le ragioni e la convenienza dell'operazione per la società", "correct": false },
      { "text": "Ha la facoltà di non pronunciarsi in merito alle ragioni ed alla convenienza dell'operazione per la società", "correct": false },
      { "text": "Ha l'obbligo di motivare adeguatamente le ragioni e la convenienza dell'operazione per la società", "correct": true }
    ]
  },
  {
    "q": "10 Il legislatore ha previsto pe le S.p.A. non quotate:",
    "options": [
      { "text": "Che abbiano obbligatoriamente un C.D.A", "correct": false },
      { "text": "Che abbiano obbligatoriamente un amminsistratore unico", "correct": false },
      { "text": "Che possano scegliere tra l'adozione di un C.D.A. ed un amministratore unico", "correct": true },
      { "text": "Che l'assemblea dei soci si sostiuisca al C.D.A", "correct": false }
    ]
  },
  {
    "q": "1 I rappresentanti della società sono:",
    "options": [
      { "text": "I soci", "correct": false },
      { "text": "Gli amministratori", "correct": true },
      { "text": "I sindaci", "correct": false },
      { "text": "Gli obbligazionisti", "correct": false }
    ]
  },
  {
    "q": "2 Gli amministratori ai quali è conferita la rappresentanza della società debbono essere indicati:",
    "options": [
      { "text": "Nello statuto", "correct": true },
      { "text": "Su di un quotidiano di rilevanza nazionale", "correct": false },
      { "text": "Sul sito internet della società", "correct": false },
      { "text": "Su un quotidiano di rilevanza internazionale", "correct": false }
    ]
  },
  {
    "q": "3 Il potere di rappresentanza esplica i suoi effetti:",
    "options": [
      { "text": "All'interno della società", "correct": false },
      { "text": "All'esterno della società", "correct": true },
      { "text": "Tra gli amministratori", "correct": false },
      { "text": "Tra gli amministratori ed i soci", "correct": false }
    ]
  },
  {
    "q": "4 Hanno influito sulla disciplina della rappresentanza degli amministratori della S.p.A. con riguardo alla tutela dell'affidamento dei terzi:",
    "options": [
      { "text": "Le norme costituzionali", "correct": false },
      { "text": "Le norme regionali", "correct": false },
      { "text": "Le norme di matrice comunitaria", "correct": true },
      { "text": "Le norme di matrice regolamentare", "correct": false }
    ]
  },
  {
    "q": "5 Gli amministratori sono responsabili nei confronti della società se:",
    "options": [
      { "text": "Hanno operato con la diligenza professionale richiesta, ma il risultato economico della società è stato negativo", "correct": false },
      { "text": "Essendo a conoscenza di fatti pregiudizievoli per la società hanno fatto quanto potevano per evitare il danno o attenuarne le conseguenze, pur non essendoci riusciti", "correct": false },
      { "text": "Pur essendo a conoscenza di fatti pregiudizievoli per la società non hanno fatto quanto potevano per evitare il danno o attenuarne le conseguenze dannose", "correct": true },
      { "text": "Hanno operato con la diligenza professionale richiesta ed il risultato economico della società è stato positivo", "correct": false }
    ]
  },
  {
    "q": "6 La responsabilità degli amministratori è:",
    "options": [
      { "text": "Oggettiva", "correct": false },
      { "text": "Colposa", "correct": true },
      { "text": "Dolosa", "correct": false },
      { "text": "Colposa di grado lieve", "correct": false }
    ]
  },
  {
    "q": "7 L'esonero da responsabilità dell'amministratore è previsto:",
    "options": [
      { "text": "Dall'art. 2392 c.c", "correct": true },
      { "text": "Dall'art. 2393 c.c", "correct": false },
      { "text": "Dall'art. 2394 c.c", "correct": false },
      { "text": "Dall'art. 2395 c.c", "correct": false }
    ]
  },
  {
    "q": "8 La disciplina dell'azione sociale di responsabilità dell'amministratore è dettata:",
    "options": [
      { "text": "Dall'art. 2043 c.c", "correct": false },
      { "text": "Dall'art. 1218 c.c", "correct": false },
      { "text": "Dall'art. 2046 c.c", "correct": false },
      { "text": "Dall'art. 2393 c.c", "correct": true }
    ]
  },
  {
    "q": "9 L'azione sociale di responsabilità è promossa a seguito di:",
    "options": [
      { "text": "Delibera del C.D.A", "correct": false },
      { "text": "Delibera dell'assemblea ordinaria dei soci", "correct": true },
      { "text": "Delibera dell'assemblea straordinaria dei soci", "correct": false },
      { "text": "Delibera dell'assemblea degli obbligazionisti", "correct": false }
    ]
  },
  {
    "q": "10 La deliberazione dell'azione importa la revoca d'ufficio degli amministratori contro i quali è proposta se vi è stato il voto favorevole di:",
    "options": [
      { "text": "Almeno un mezzo del capitale sociale", "correct": false },
      { "text": "Almento due terzi del capitale social", "correct": true },
      { "text": "Almeno un quinto del capitale sociale", "correct": false },
      { "text": "Almeno un ventesimo del capitale sociale", "correct": false }
    ]
  },
  {
    "q": "1 AI sensi dell'art. 2394 c.c. gli amministratori rispondono verso i creditori sociali:",
    "options": [
      { "text": "Quando il patrimonio sociale risulta insufficiente al soddisfacimento dei loro crediti", "correct": true },
      { "text": "Quando il capitale sociale risulta insufficiente al soddisfacimento dei loro crediti", "correct": false },
      { "text": "Quando il patrimonio netto risulta insufficiente al soddisfacimento dei loro crediti", "correct": false },
      { "text": "Quando le riserve risultano insufficienti al soddisfacimento dei loro crediti", "correct": false }
    ]
  },
  {
    "q": "2 I creditori sociali possono agire nei confronti degli amministratori:",
    "options": [
      { "text": "Se la società è in fallimento", "correct": false },
      { "text": "Se la società è in liquidazione coatta amministrativa", "correct": false },
      { "text": "Se la società è in amministrazione straordinaria", "correct": false },
      { "text": "Solo ed esclusivamente ex art. 2394 c.c", "correct": true }
    ]
  },
  {
    "q": "3 L'azione ex art. 2394 c.c.:",
    "options": [
      { "text": "E' azione autonoma", "correct": true },
      { "text": "E' una forma di azione sociale di responsabilità esercitata in via surrogatoria", "correct": false },
      { "text": "E' identica alla azione surrogatoria", "correct": false },
      { "text": "E' alternativa alla azione surrogatoria", "correct": false }
    ]
  },
  {
    "q": "4 L'esperimento dell'azione di cui all'art. 2395 c.c.:",
    "options": [
      { "text": "E' inibita se è già stata esperita l'azione ex art. 2393 c.c", "correct": false },
      { "text": "E' inibita se è già stata esperita l'azione ex art. 2394 bis c.c", "correct": false },
      { "text": "E' inibita solo se sono state esperite entrambe le azioni ex art. 2393 c.c. e2394 bis c.c", "correct": false },
      { "text": "Non è inibita dall'esperimento delle azioni ex art. 2393 c.c. e 2394 bis c.c", "correct": true }
    ]
  },
  {
    "q": "5 Con riguardo all'azione ex art. 2395 c.c. chi agisce:",
    "options": [
      { "text": "Non deve provare nulla, ad eccezione della violazione della norma e del danno subito, trattandosi di responsabilità oggettiva", "correct": false },
      { "text": "Deve provare esclusivamente il nesso causale", "correct": false },
      { "text": "Deve provare esclusivamente la colpa o il dolo dell'agente", "correct": false },
      { "text": "Deve provare di aver subito un danno, il nesso causale ed il profilo soggettivo (dolo o colpa) dell'amministratore", "correct": true }
    ]
  },
  {
    "q": "6 I direttori generali sono:",
    "options": [
      { "text": "Collaboratori esterni all'azienda che prestano consulenza occasionalmente", "correct": false },
      { "text": "Collaboratori interni all'azienda che svolgono mansioni operative relative alla produzione", "correct": false },
      { "text": "Collaboratori interni all'azienda che svolgono mansioni di carattere gestionale", "correct": true },
      { "text": "Collaboratori esterni all'azienda che svolgono mansioni operative relative alla produzione", "correct": false }
    ]
  },
  {
    "q": "7 I direttori generali sono equiparati sotto il profilo della responsabilità:",
    "options": [
      { "text": "Ai sindaci", "correct": false },
      { "text": "Agli amministratori", "correct": true },
      { "text": "Ai commessi", "correct": false },
      { "text": "Ai procuratori", "correct": false }
    ]
  },
  {
    "q": "8 Secondo la giurisprudenza della Suprema Corte l'amministratore di fatto:",
    "options": [
      { "text": "Non è soggetto ad alcuna responsabilità", "correct": false },
      { "text": "E' soggetto alla responsabilità degli amministratori se è possibile ravvisare un atto di nomina anche se invalido o implicito", "correct": false },
      { "text": "E' soggetto alla responsabilità degli amministratori in quanto è assimilabile al direttore generale", "correct": false },
      { "text": "E' soggetto alla responsabilità degli amministratori in applicazione delle regole sul corretto svolgimento dell'attività di gestione", "correct": true }
    ]
  },
  {
    "q": "9 L'amministratore di fatto pur difettando di nomina assembleare:",
    "options": [
      { "text": "Si ingerisce occasionalmente nella direzione d'impresa", "correct": false },
      { "text": "Si ingerisce sistematicamente nella direzione d'impresa", "correct": true },
      { "text": "Si ingerisce nelle materie di competenza dell'assemblea ordinaria", "correct": false },
      { "text": "Si ingerisce nelle materie di competenza dell'assemblea straordinaria", "correct": false }
    ]
  },
  {
    "q": "10 Ai sensi dell'art. 2395 c.c. è risarcibile:",
    "options": [
      { "text": "Il danno diretto", "correct": true },
      { "text": "Il danno indiretto", "correct": false },
      { "text": "Il pericolo di danno", "correct": false },
      { "text": "Il danno la cui probabilità di verificarsi è al di sopra di una certa percentuale di probabilità", "correct": false }
    ]
  },
  {
    "q": "1 Nel nostro ordinamento il legislatore prevede:",
    "options": [
      { "text": "Un solo modello tradizionale di amministrazione e controllo", "correct": false },
      { "text": "Solo il modello tradizionale e quello dualistico", "correct": false },
      { "text": "Solo il modello tradizionale e quello monistico", "correct": false },
      { "text": "Un modello tradizionale al quale si affiancano quello dualistio e monistico", "correct": true }
    ]
  },
  {
    "q": "2 L'adozione da parte della S.p.A. di uno dei modelli alternativi:",
    "options": [
      { "text": "E' decisa dall'assemblea", "correct": false },
      { "text": "Avviene solo per espressa scelta in sede di costituzione", "correct": false },
      { "text": "Avviene solo per successiva modifica statutaria", "correct": false },
      { "text": "Può avvenire sia per espressa scelta in sede di costituzione della società o per successiva modifica statutaria", "correct": true }
    ]
  },
  {
    "q": "3 Il sistema dualistico è caratterizzato dalla presenza:",
    "options": [
      { "text": "Del Consiglio di Gestione e del collegio sindacale", "correct": false },
      { "text": "Di un C.D.A., dell'assemblea dei soci e del collegio sindacale", "correct": false },
      { "text": "Del consiglio di gestione e del consiglio di sorveglianza", "correct": true },
      { "text": "Del Comitato per la gestione e del collegio sindacale", "correct": false }
    ]
  },
  {
    "q": "4 Il consiglio di sorveglianza è composto da un numero di soggetti non inferiore a:",
    "options": [
      { "text": "Tre", "correct": true },
      { "text": "Quattro", "correct": false },
      { "text": "Due", "correct": false },
      { "text": "Cinque", "correct": false }
    ]
  },
  {
    "q": "5 Almeno un componente del consiglio di sorveglianza deve essere nominato tra:",
    "options": [
      { "text": "Coloro che si trovano nelle condizioni previste dall'art. 2383 c.c", "correct": false },
      { "text": "I revisori legali iscritti nell'apposito registro", "correct": true },
      { "text": "I componenti del consiglio di gestione", "correct": false },
      { "text": "Coloro che sono legati alla società da un rapporto continuativo di consulenza", "correct": false }
    ]
  },
  {
    "q": "6 Con riferimento alla nomina dei componenti del consiglio di sorveglianza, è escluso che lo statuto possa:",
    "options": [
      { "text": "Prevedere altre cause di ineleggibilità", "correct": false },
      { "text": "Prevedere altre cause di decadenza", "correct": false },
      { "text": "Derogare alle cause legali di decadenza", "correct": true },
      { "text": "Prevedere altre cause di incompatibilità", "correct": false }
    ]
  },
  {
    "q": "7 I componenti del consiglio di sorveglianza:",
    "options": [
      { "text": "Non sono revocabili", "correct": false },
      { "text": "Sono revocabili solo per giusta causa", "correct": false },
      { "text": "Sono sempre revocabili", "correct": true },
      { "text": "Non sono revocabili quelli nominati nell'atto costitutivo", "correct": false }
    ]
  },
  {
    "q": "8 Al consiglio di gestione sono attribuite le funzioni:",
    "options": [
      { "text": "Del C.D.A. nel sistema tradizionale", "correct": true },
      { "text": "Del collegio sindacale", "correct": false },
      { "text": "Dell'assemblea dei soci nel modello tradizionale", "correct": false },
      { "text": "Del revisore legale dei conti", "correct": false }
    ]
  },
  {
    "q": "9 Il consiglio di gestione deve essere formato da un numero minimo di:",
    "options": [
      { "text": "Due componenti", "correct": true },
      { "text": "Tre componenti", "correct": false },
      { "text": "Quattro componenti", "correct": false },
      { "text": "Cinque componenti", "correct": false }
    ]
  },
  {
    "q": "10 Il sistema monistico è caratterizzato dalla presenza di:",
    "options": [
      { "text": "Un revisore legale dei conti", "correct": false },
      { "text": "Un C.D.A", "correct": false },
      { "text": "Un C.D.A. all'interno del quale è costituito il comitato per il controllo sulla gestione", "correct": true },
      { "text": "Un collegio sindacale", "correct": false }
    ]
  },
  {
    "q": "1 La modificazione dello statuto della S.p.A. avviene:",
    "options": [
      { "text": "Solo quando viene inserita una nuova clausola contenuta nel contratto sociale", "correct": false },
      { "text": "Solo quando viene eliminata una clausola contenuta nel contratto sociale", "correct": false },
      { "text": "Solo quando viene modificata una clausola contenuta nel contratto sociale", "correct": false },
      { "text": "Quando viene inserita una nuova clausola o modificata o eliminata una clausola contenuta nel contratto sociale", "correct": true }
    ]
  },
  {
    "q": "2 Nella S.p.A. la competenza a deliberare in merito alle modificazioni statutarie spetta:",
    "options": [
      { "text": "Inderogabilmente all'assemblea ordinaria", "correct": false },
      { "text": "All'asseblea straordinaria salvo deroga statutaria", "correct": true },
      { "text": "Inderogabilmente all'assemblea straordinaria", "correct": false },
      { "text": "All'asseblea ordinaria salvo deroga statutaria", "correct": false }
    ]
  },
  {
    "q": "3 Ai sensi dell'art. 2436 terzo comma c.c., se il Notaio non ritiene adempiute le condizioni stabilite dalla legge a fronte del controllo di legittimità sulla delibera di modificazione dello statuto:",
    "options": [
      { "text": "Deve darne comunicazione tempestiva agli amministratori", "correct": true },
      { "text": "Deve darne comunicazione tempestiva al collegio sindacale", "correct": false },
      { "text": "Deve darne comunicazione tempestiva al Tribunale", "correct": false },
      { "text": "Deve darne comunicazione tempestiva all'assemblea dei soci", "correct": false }
    ]
  },
  {
    "q": "4 Ai sensi dell'art. 2437 primo comma c.c. ha diritto di recedere:",
    "options": [
      { "text": "L'azionista che ha concorso alla deliberazione relativa alla trasformazione della società", "correct": false },
      { "text": "L'azionista che non ha concorso alla deliberazione relativa alla trasformazione della società", "correct": false },
      { "text": "L'azionista che ha concorso alla deliberazione relativa alla revoca dello stato di liquidazione della società", "correct": true },
      { "text": "L'azionista che ha concorso alla deliberazione relativa alla eliminazione di una causa di recesso prevista dallo statuto", "correct": false }
    ]
  },
  {
    "q": "5 E' legittima la previsione statutaria che vieta all'azionista di recedere:",
    "options": [
      { "text": "In caso di società costituita a tempo indeterminato", "correct": false },
      { "text": "In caso di proroga del termine della durata della società", "correct": true },
      { "text": "In caso di dissenso alla delibera di modificazione dello statuto concernente i diritti di voto", "correct": false },
      { "text": "In caso di dissenso alla modifica dell'oggetto sociale", "correct": false }
    ]
  },
  {
    "q": "6 Il patto volto ad escludere o a rendere più gravoso l'esercizio del diritto di recesso:",
    "options": [
      { "text": "E' nullo nelle ipotesi previste dal secondo comma dell'art. 2437 c.c", "correct": false },
      { "text": "E' annullabile nelle ipotesi previste dal secondo comma dell'art. 2437 c.c", "correct": false },
      { "text": "E' nullo nelle ipotesi previste dal primo comma dell'art. 2437 c.c", "correct": true },
      { "text": "E' annullabile nelle ipotesi previste dal primo comma dell'art. 2437 c.c", "correct": false }
    ]
  },
  {
    "q": "7 Il diritto di recesso deve essere esercitato dal socio:",
    "options": [
      { "text": "A mezzo di spedizione di lettera raccomandata entro quindici giorni dall'iscrizione nel Registro delle Imprese della delibera legittimante il recesso", "correct": true },
      { "text": "A mezzo di comunicazione verbale agli amministratori entro quindici giorni dall'iscrizione nel Registro delle Imprese della delibera legittimante il recesso", "correct": false },
      { "text": "A mezzo di spedizione di lettera raccomandata entro venti giorni dall'iscrizione nel Registro delle Imprese della delibera legittimante il recesso", "correct": false },
      { "text": "A mezzo di comunicazione verbale al Registro delle Imprese entro quindici giorni dall'iscrizione al medesimo Ufficio della delibera legittimante il recesso", "correct": false }
    ]
  },
  {
    "q": "8 Se il fatto legittimante il recesso non è costituito dal dissenso del socio alla delibera:",
    "options": [
      { "text": "Il termine decorrente per l'esercizio del recesso è di quindici giorni dalla conoscenza del fatto legittimante", "correct": false },
      { "text": "Il termine decorrente per l'esercizio del recesso è di trenta giorni dalla conoscenza del fatto legittimante", "correct": true },
      { "text": "Il termine decorrente per l'esercizio del recesso è di quindici giorni dalla pubblicazione della notizia del fatto su un quotidiano a tiratura nazionale", "correct": false },
      { "text": "Il termine decorrente per l'esercizio del recesso è di trenta giorni dalla pubblicazione della notizia del fatto su un quotidiano a tiratura nazionale", "correct": false }
    ]
  },
  {
    "q": "9 Il valore di liquidazione delle azioni di S.p.A. quotate nei mercati regolamentati non può essere inferiore:",
    "options": [
      { "text": "Al valore che sarebbe dovuto a fronte della media aritmetica dei prezzi di chiusura dei sei mesi che precedono la pubblicazione dell'avviso di convocazione dell'assemblea le cui deliberazioni legittimano il recesso", "correct": true },
      { "text": "Al valore che sarebbe dovuto a fronte della media aritmetica dei prezzi di apertura dei sei mesi che precedono la pubblicazione dell'avviso di convocazione dell'assemblea le cui deliberazioni legittimano il recesso", "correct": false },
      { "text": "Al valore che sarebbe dovuto a fronte della media aritmetica dei prezzi di chiusura dei due mesi che precedono la pubblicazione dell'avviso di convocazione dell'assemblea le cui deliberazioni legittimano il recesso", "correct": false },
      { "text": "Al valore che sarebbe dovuto a fronte della media aritmetica dei prezzi di apertura dei cinque mesi che precedono la pubblicazione dell'avviso di convocazione dell'assemblea le cui deliberazioni legittimano il recesso", "correct": false }
    ]
  },
  {
    "q": "10 Il diritto di opzione spetta:",
    "options": [
      { "text": "Esclusivamente agli azionisti", "correct": false },
      { "text": "Sia agli azionisti, sia ai possessori di obbligazioni convertibili", "correct": true },
      { "text": "Sia agli azionisti, sia agli obbligazionisti", "correct": false },
      { "text": "Esclusivamente ai possessori di obbligazioni convertibili", "correct": false }
    ]
  },
  {
    "q": "1 Il collegio sindacale è l'organo di controllo:",
    "options": [
      { "text": "Interno delle S.p.A. nel sistema dualistico", "correct": false },
      { "text": "Interno delle S.p.A. nel sistema monistico", "correct": false },
      { "text": "Interno delle S.p.A. nel sistema tradizionale", "correct": true },
      { "text": "Esterno delle S.p.A. nel sistema dualistico", "correct": false }
    ]
  },
  {
    "q": "9 Il principio di uguaglianza delle azioni è rispettato se:",
    "options": [
      { "text": "Tutte le azioni emesse dalla S.p.A. hanno lo stesso valore. Possono infatti attribuire diritti diversi", "correct": false },
      { "text": "Tutte le azioni emesse dalla S.p.A. attribuiscono uguali diritti. Risulta ininfluente la circostanza per la quale le azioni abbiano valori differenti", "correct": false },
      { "text": "Vi è omogeneità di valore e di diritti tra azioni ordinarie ed azioni di categoria e speciali", "correct": false },
      { "text": "Vi è omogeneità di valore e di diritti con riferimento a ciascuna categoria azionaria considerata separatamente (ordinaria e speciale)", "correct": true }
    ],
    "info": "Ai sensi dell'art. 2348 c.c., le azioni devono essere di uguale valore e conferiscono ai loro possessori uguali diritti, ma tale uguaglianza opera all'interno della medesima categoria."
  },
  {
    "q": "10 In caso di comproprietà azionaria, in difetto di nomina del rappresentante comune, gli interpreti ritengono che:",
    "options": [
      { "text": "Sia precluso l'esercizio dei diritti sociali attribuiti dalla partecipazione azionaria", "correct": true },
      { "text": "L'esercizio dei diritti sociali attribuiti dalla partecipazione azionaria sia possibile previo nvio di una raccomandata a.r. alla società", "correct": false },
      { "text": "L'esercizio dei diritti sociali attribuiti dalla partecipazione azionaria sia possibile se tutti i comproprietari presenziano all'assemblea dei soci", "correct": false },
      { "text": "L'esercizio dei diritti sociali attribuiti dalla partecipazione azionaria sia possibile se lo statuto ammette tale possibilità", "correct": false }
    ],
    "info": "L'art. 2347 c.c. stabilisce che i diritti dei comproprietari devono essere esercitati da un rappresentante comune. In assenza, l'esercizio è generalmente considerato precluso."
  },
  {
    "q": "1 Sono azioni ordinarie:",
    "options": [
      { "text": "Quelle che attribuiscono al titolare i diritti tipici della disciplina legale", "correct": true },
      { "text": "Quelle che attribuiscono al titolare i diritti previsti dallo statuto", "correct": false },
      { "text": "Quelle che attribuiscono al titolare i diritti previsti esclusivamente dalla disciplina legale speciale (T.U.F.)", "correct": false },
      { "text": "Quelle che attribuiscono al titolare i diritti previsti dalla disciplina regolamentare della Consob", "correct": false }
    ],
    "info": "Le azioni ordinarie sono quelle standard, soggette alla disciplina generale del codice civile."
  },
  {
    "q": "2 Sono azioni speciali:",
    "options": [
      { "text": "Quelle che attribuiscono al titolare i diritti tipici della disciplina legale", "correct": false },
      { "text": "Quelle che attribuiscono al titolare i diritti previsti dallo statuto", "correct": true },
      { "text": "Quelle che attribuiscono al titolare i diritti previsti esclusivamente dalla disciplina legale speciale (T.U.F.)", "correct": false },
      { "text": "Quelle che attribuiscono al titolare i diritti previsti dalla disciplina regolamentare della Consob", "correct": false }
    ],
    "info": "Le azioni speciali (o di categoria) godono di diritti particolari definiti dallo statuto (art. 2348 c.c.)."
  },
  {
    "q": "3 Le deliberazioni assembleari (generali) che pregiudicano i diritti di una categoria di azionisti:",
    "options": [
      { "text": "Sono validamente deliberate se approvate anche dalla assemblea degli azionisti della categoria interessati", "correct": true },
      { "text": "Sono validamente deliberate indipendentemente dalla approvazione o meno da parte della assemblea degli azionisti di categoria interessati", "correct": false },
      { "text": "Sono validamente deliberate previo parere favorevole della Banca d'Italia", "correct": false },
      { "text": "Sono validamente deliberate previo parere favorevole della CONSOB", "correct": false }
    ],
    "info": "Ai sensi dell'art. 2376 c.c., se esistono diverse categorie di azioni, le deliberazioni che pregiudicano i diritti di una categoria devono essere approvate dall'assemblea speciale di quella categoria."
  },
  {
    "q": "4 Ogni azione a voto plurimo può avere un massimo di:",
    "options": [
      { "text": "Dieci voti", "correct": false },
      { "text": "Cinque voti", "correct": false },
      { "text": "Tre voti", "correct": true },
      { "text": "Due voti", "correct": false }
    ],
    "info": "L'art. 2351 c.c. prevede che le azioni a voto plurimo possano attribuire fino a un massimo di tre voti per ciascuna azione."
  },
  {
    "q": "5 La maggiorazione del voto attribuisce fino ad un massimo di:",
    "options": [
      { "text": "Dieci voti per ciascuna azione posseduta per il periodo minimo determinato dalla legge", "correct": false },
      { "text": "Due voti per ciascuna azione posseduta per il periodo minimo determinato dalla legge", "correct": true },
      { "text": "Tre voti per ciascuna azione posseduta per il periodo minimo determinato dalla legge", "correct": false },
      { "text": "Cinque voti per ciascuna azione posseduta per il periodo minimo determinato dalla legge", "correct": false }
    ],
    "info": "La maggiorazione del voto (c.d. fedeltà) consente di attribuire fino a due voti per azione ai soci che la detengono per un periodo prefissato (art. 127-quinquies TUF)."
  },
  {
    "q": "6 L'azione che attribuisce al titolare un diritto di preferenza nella distribuzione degli utili:",
    "options": [
      { "text": "E' una azione ordinaria", "correct": false },
      { "text": "E' una azione privilegiata", "correct": true },
      { "text": "E' una azione di risparmio", "correct": false },
      { "text": "E' una azione correlata", "correct": false }
    ],
    "info": "Le azioni privilegiate offrono vantaggi (es. prelazione) nella distribuzione degli utili o nel rimborso del capitale."
  },
  {
    "q": "7 Il legislatore legittima la possibilità di creare catgegorie di azioni e fornire diritti diversi anche per quanto concerne la incidenza delle perdite:",
    "options": [
      { "text": "Ai sensi dell'articolo 2348 secondo e terzo comma c.c", "correct": true },
      { "text": "Ai sensi dell'articolo 2348 primo comma c.c", "correct": false },
      { "text": "Ai sensi dell'art. 2347 c.c", "correct": false },
      { "text": "Ai sensi dell'art. 2354 c.c", "correct": false }
    ],
    "info": "L'autonomia statutaria permette di creare categorie di azioni con diritti diversi, nel rispetto dei limiti di legge."
  },
  {
    "q": "8 Se gli strumenti finanziari partecipativi attribuiscono anche diritti amministrativi:",
    "options": [
      { "text": "Allora si applica la disciplina ex art. 2342 c.c. - la discipina dei conferimenti", "correct": false },
      { "text": "Allora si applica l'art. 2376 c. - la disciplina delle assemblee speciali", "correct": true },
      { "text": "Allora si applica la disciplina ex art. 2343 c.c. - la discipina della stima dei conferimenti di beni in natura e di crediti", "correct": false },
      { "text": "Allora si applica l'art. 2347 c.c. - la disciplina relativa alla indivisibilità delle azioni", "correct": false }
    ],
    "info": "Per gli strumenti finanziari che danno diritti amministrativi, si applicano le norme relative alle assemblee speciali (art. 2376 c.c.)."
  },
  {
    "q": "9 Gli strumenti finanziari partecipativi:",
    "options": [
      { "text": "Nel linguaggio giuridico sono il sinonimo di azioni", "correct": false },
      { "text": "Sottendono l'apporto nella società dei beni normalmente oggetto di conferimenti", "correct": false },
      { "text": "Sottendono l'apporto nella società dei beni che normalmente non possono formare oggetto di conferimenti", "correct": true },
      { "text": "Nel linguaggio giuridico sono il sinonimo delle azioni a favore dei prestatori di lavoro", "correct": false }
    ],
    "info": "Gli strumenti finanziari partecipativi (art. 2346 c.c.) permettono di remunerare apporti (anche di opera o servizi) che non costituiscono conferimenti nel senso stretto del capitale sociale."
  },
  {
    "q": "10 Se per gli strumenti finanziari partecipativi è previsto statutariamente il rimborso del capitale:",
    "options": [
      { "text": "Si applica la disciplina delle obbligazioni", "correct": true },
      { "text": "Si applica la disciplina delle azioni ordinarie", "correct": false },
      { "text": "Si applica la disciplina delle azioni postergate nelle perdite", "correct": false },
      { "text": "Si applica la disciplina delle azioni privilegiate", "correct": false }
    ],
    "info": "Se è previsto il rimborso del capitale, tali strumenti si avvicinano per natura alle obbligazioni."
  },
  {
    "q": "1 Nel nostro ordinamento vige:",
    "options": [
      { "text": "La regola della nominatività obbligatoria dei titoli azionari, senza eccezioni", "correct": false },
      { "text": "La regola della nominatività obbligatoria dei titoli azionari, con la sola eccezione delle azioni di risparmio", "correct": false },
      { "text": "La regola della nominatività obbligatoria dei titoli azionari, con le sole eccezioni delle azioni di risparmio e delle S.I.C.A.V", "correct": false },
      { "text": "La regola della nominatività obbligatoria dei titoli azionari, con le sole eccezioni delle azioni di risparmio, delle S.I.C.A.V. e delle società di investimento a capitale fisso", "correct": true }
    ],
    "info": "Ai sensi dell'art. 2354 c.c., i titoli azionari devono essere nominativi, salvi casi specifici previsti dalla legge (risparmio e organismi di investimento)."
  },
  {
    "q": "2 Nel trasferimento mediante girata:",
    "options": [
      { "text": "L'annontazione è da eseguirsi immediatamente sia sul titolo, sia sul libro dei soci", "correct": false },
      { "text": "L'annontazione è da eseguirsi immediatamente sul titolo, mentre sul libro dei soci è da esegurisi quando il titolare vorrà esercitare i diritti sociali", "correct": true },
      { "text": "L'annotazione è da eseguirsi solo sul titolo", "correct": false },
      { "text": "L'annotazione è da eseguirsi solo sul libro dei soci", "correct": false }
    ],
    "info": "La girata autenticata abilita all'esercizio dei diritti sociali. L'annotazione nel libro dei soci è necessaria per legittimare l'intervento in assemblea."
  },
  {
    "q": "3 La girata per essere valida deve contenere:",
    "options": [
      { "text": "Solo la data", "correct": false },
      { "text": "Solo il nome del giratario", "correct": false },
      { "text": "Il nome e la data del giratario", "correct": true },
      { "text": "La data ed il nome del girante", "correct": false }
    ],
    "info": "La girata richiede i requisiti formali (nome del giratario e data) per essere autenticata e valida ai fini della circolazione."
  },
  {
    "q": "4 Il libro dei soci della S.p.A. ha:",
    "options": [
      { "text": "Efficacia di pubblicità legale", "correct": false },
      { "text": "Efficacia di pubblicità dichiarativa", "correct": false },
      { "text": "Efficacia traslativa", "correct": false },
      { "text": "Mero valore informativo", "correct": true }
    ],
    "info": "Con la dematerializzazione e le riforme, il libro dei soci ha perso parte della sua funzione di pubblicità, assumendo per lo più un valore probatorio/informativo riguardo alla legittimazione."
  },
  {
    "q": "5 La disciplina relativa alla dematerializzazione dei titoli azionari e delle modalità di circolazione trova la sua fonte:",
    "options": [
      { "text": "Nel solo T.U.F", "correct": false },
      { "text": "Nel T.U.F. e nella regolamentazione della CONSOB e della Banca d'Italia", "correct": true },
      { "text": "Nel T.U.F. e nella regolamentazione della CONSOB e della Banca Centrale Europea", "correct": false },
      { "text": "Nel T.U.F. e nella regolamentazione del CICR e della Banca d'Italia", "correct": false }
    ],
    "info": "La dematerializzazione è regolata principalmente dal TUF (D.Lgs 58/98) con regolamenti attuativi emanati da CONSOB e Banca d'Italia."
  },
  {
    "q": "6 Ai sensi dell'art. 2355 bis c.c. è legittima la pattuizione di un limite al trasferimento delle aizoni nominative:",
    "options": [
      { "text": "Per un periodo non superiore a cinque anni dalla costituzione della società", "correct": false },
      { "text": "Per un periodo non superiore a cinque anni dalla costituzione della società", "correct": true },
      { "text": "Per un periodo non superiore a due anni dalla costituzione della società", "correct": false },
      { "text": "Per un periodo non inferiore a cinque anni dalla costituzione della società", "correct": false }
    ],
    "info": "I limiti convenzionali alla circolazione non possono superare il quinquennio (art. 2355-bis c.c.). *Nota: La risposta A e B sono identiche nel tuo testo, considero B quella indicata come corretta.*"
  },
  {
    "q": "7 L'introduzione o la soppressione delle clausole limitative al trasferimento delle azioni avviene mediante:",
    "options": [
      { "text": "Decisione degli amministratori", "correct": false },
      { "text": "Delibera dell'assemblea ordinaria", "correct": false },
      { "text": "Delibera dell'assemblea speciale", "correct": false },
      { "text": "Delibera straordinaria", "correct": true }
    ],
    "info": "Le modifiche statutarie (come l'inserimento di clausole di gradimento o prelazione) richiedono sempre l'assemblea straordinaria."
  },
  {
    "q": "8 L'acquisto delle azioni proprie è:",
    "options": [
      { "text": "Sempre vietato dall'ordinamento", "correct": false },
      { "text": "Sempre permesso dall'ordinamento", "correct": false },
      { "text": "Vietato dall'ordinamento, ovvero che vi sia il consenso di tutti i soci", "correct": false },
      { "text": "Consentita dall'ordinamento se vi è il rispetto di alcune condizioni fissate dalla legge", "correct": true }
    ],
    "info": "L'acquisto di azioni proprie (art. 2357 c.c.) è permesso solo entro certi limiti (riserve disponibili, azioni interamente liberate, ecc.)."
  },
  {
    "q": "9 Il valore nominale delle azioni proprie acquistate:",
    "options": [
      { "text": "Deve essere inferiore al quinto del capitale sociale", "correct": false },
      { "text": "Deve essere uguale od inferiore al quinto del capitale sociale", "correct": true },
      { "text": "Deve essere inferiore al quinto del patrimonio netto", "correct": false },
      { "text": "Deve essere uguale od inferiore al quinto del patrimonio netto", "correct": false }
    ],
    "info": "Per le società che non fanno ricorso al mercato di capitale di rischio, l'acquisto non può eccedere la quinta parte del capitale sociale."
  },
  {
    "q": "10 L'acquisto delle azioni proprie deve essere autorizzato:",
    "options": [
      { "text": "Dall'assemblea ordinaria", "correct": true },
      { "text": "Dall'assemblea straordinaria", "correct": false },
      { "text": "Dall'assemblea degli azionisti speciali", "correct": false },
      { "text": "Dall'assemblea degli obbligazionisti", "correct": false }
    ],
    "info": "L'autorizzazione all'acquisto di azioni proprie spetta all'assemblea ordinaria (art. 2357 c.c.)."
  },
  {
    "q": "1 Nel sistema dualistico:",
    "options": [
      { "text": "L'amministrazione ed il controllo sono esercitati dall'assemblea dei soci", "correct": false },
      { "text": "L'amministrazione ed il controllo sono esercitati dal consiglio di gestione", "correct": false },
      { "text": "L'amministrazione ed il controllo sono esercitati dal consiglio di sorveglianza e dal consiglio di gestione", "correct": true },
      { "text": "L'amministrazione ed il controllo sono esercitati dal consiglio di sorveglianza", "correct": false }
    ],
    "info": "Il sistema dualistico prevede la suddivisione tra consiglio di gestione (amm.ne) e consiglio di sorveglianza (controllo)."
  },
  {
    "q": "2 Nel sistema monistico:",
    "options": [
      { "text": "L'amministrazione è affidata al C.D.A", "correct": true },
      { "text": "L'amministrazione è affidata al comitato per il controllo sulla gestione", "correct": false },
      { "text": "L'amministrazione è affidata al consiglio di gestione", "correct": false },
      { "text": "L'amministrazione è affidata all'assemblea dei soci", "correct": false }
    ],
    "info": "Il sistema monistico prevede che l'amministrazione sia affidata al C.D.A., all'interno del quale agisce un comitato per il controllo."
  },
  {
    "q": "3 L'assemblea ordinaria è competente a deliberare:",
    "options": [
      { "text": "Sulle modificazioni dello statuto", "correct": false },
      { "text": "Sulla revoca degli amministratori", "correct": true },
      { "text": "Sulla sostituzione dei liquidatori", "correct": false },
      { "text": "Sulla nomina dei liquidatori", "correct": false }
    ],
    "info": "La revoca degli amministratori (salvo giusta causa) è di competenza dell'assemblea ordinaria."
  },
  {
    "q": "4 L'assemblea straordinaria è competente a deliberare:",
    "options": [
      { "text": "Sulla determinazione del compenso degli amministratori", "correct": false },
      { "text": "In merito alla approvazione del bilancio", "correct": false },
      { "text": "In merito alla responsabilità degli amministratori e dei sindaci", "correct": false },
      { "text": "Sui poteri dei liquidatori", "correct": true }
    ],
    "info": "Le modifiche statutarie e le nomine/poteri dei liquidatori rientrano nelle competenze dell'assemblea straordinaria."
  },
  {
    "q": "5 L'assemblea è convocata mediante:",
    "options": [
      { "text": "Avviso contentente l'indicazione del giorno dell'adunanza", "correct": false },
      { "text": "Avviso contentente l'indicazione del giorno e del luogo dell'adunanza", "correct": false },
      { "text": "Avviso contentente l'indicazione del giorno e del luogo dell'adunanza nonché l'elenco delle materie da trattare", "correct": false },
      { "text": "Avviso contentente l'indicazione del giorno, dell'ora e del luogo dell'adunanza nonché l'elenco delle materie da trattare", "correct": true }
    ],
    "info": "L'avviso di convocazione deve contenere data, ora, luogo e l'ordine del giorno (art. 2366 c.c.)."
  },
  {
    "q": "6 Ai sensi di legge, l'assemblea è convocata:",
    "options": [
      { "text": "Nel comune in cui ha sede la società, salvo diversa disposizione statutaria", "correct": true },
      { "text": "Nel comune in cui ha sede la Camera di commercio presso la quale è iscritta la società", "correct": false },
      { "text": "Nel comune in cui risiede il Presidente del C.D.A", "correct": false },
      { "text": "Nel comune in cui risiedono il maggior numero di azionisti", "correct": false }
    ],
    "info": "L'assemblea deve svolgersi nel comune della sede sociale, salvo diverso statuto (art. 2363 c.c.)."
  },
  {
    "q": "7 Per il calcolo del quorum costitutivo:",
    "options": [
      { "text": "Sono calcolate solo le azioni ordinarie", "correct": false },
      { "text": "Sono calcolate tutte le azioni salvo quelle prive di diritto di voto", "correct": true },
      { "text": "Sono calcolate solo le azioni a voto maggiorato", "correct": false },
      { "text": "Sono calcolate tutte le azioni, escluse quelle con voto sospeso", "correct": false }
    ],
    "info": "Il quorum costitutivo si calcola sul capitale rappresentato dalle azioni con diritto di voto."
  },
  {
    "q": "8 Per il calcolo del quorum deliberativo:",
    "options": [
      { "text": "Sono computate le azioni il cui voto sia occasionalmente sospeso", "correct": false },
      { "text": "E' escluso il computo delle azioni il cui voto sia occasionalmente sospeso", "correct": true },
      { "text": "Sono sempre computate le azioni di chi versi in conflitto di interessi", "correct": false },
      { "text": "Sono computate le azioni prive di voto", "correct": false }
    ],
    "info": "Le azioni per le quali il voto è sospeso non concorrono al calcolo del quorum deliberativo."
  },
  {
    "q": "9 Per l'assemblea ordinaria in seconda convocazione:",
    "options": [
      { "text": "E' richiesto il raggiungimento di un quorum costitutivo e di uno deliberativo", "correct": false },
      { "text": "E' richiesto il raggiungimento esclusivamente di un quorum costitutivo", "correct": false },
      { "text": "E' richiesto esclusivamente il raggiungimento di un quorum deliberativo", "correct": false },
      { "text": "Il legislatore ha omesso la previsione di un quorum costitutivo e le delibere sono adottate con la maggioranza delle azioni i cui soci hanno preso parte alla votazione", "correct": true }
    ],
    "info": "Per l'assemblea ordinaria in seconda convocazione, il codice non richiede quorum costitutivi minimi."
  },
  {
    "q": "10 Nelle S.p.A. che fanno ricorso al mercato dei capitali di rischio, l'adozione del sistema di maggioranze a pluralità di convocazioni:",
    "options": [
      { "text": "E' il modello legale", "correct": false },
      { "text": "E' una opzione", "correct": true },
      { "text": "E' imposta dalla CONSOB", "correct": false },
      { "text": "E' imposta dalla Banca D'Italia", "correct": false }
    ],
    "info": "Le società quotate possono adottare o meno il sistema a pluralità di convocazioni, optando spesso per un'unica convocazione."
  },
  {
    "q": "1 Il diritto di intervento:",
    "options": [
      { "text": "E' la possibilità dei soci di partecipare al C.D.A", "correct": false },
      { "text": "E' la possibilità dei soci di partecipare al consiglio di sorveglianza", "correct": false },
      { "text": "E' la possibilità dei soci di partecipare all'assemblea dei soci", "correct": true },
      { "text": "E' la possibilità dei soci di partecipare al comitato di gestione", "correct": false }
    ],
    "info": "Il diritto di intervento (art. 2370 c.c.) è il diritto del socio di partecipare all'assemblea e di esercitare il voto."
  },
  {
    "q": "2 Il collegio sindacale si compone:",
    "options": [
      { "text": "Esclusivamente di tre o cinque membri effettivi", "correct": false },
      { "text": "Esclusivamente di tre membri effettivi", "correct": false },
      { "text": "Esclusivamente di cinque membri effettivi", "correct": false },
      { "text": "Di tre o cinque membri effettivi e di due sindaci supplenti", "correct": true }
    ],
    "info": "Ai sensi dell'art. 2397 c.c., il collegio sindacale è composto da 3 o 5 membri effettivi e da 2 supplenti."
  },
  {
    "q": "3 Esclusivamente nelle S.p.A. quotate:",
    "options": [
      { "text": "E' possibile riservare statutariamente la nomina di un sindaco ai possessori di strumenti finanziari partecipativi", "correct": false },
      { "text": "Un membro effettivo deve essere scelto tra i revisori legali iscritti nell'apposito albo", "correct": false },
      { "text": "La nomina di uno o più sindaci può essere riservata dallo statuto agli enti pubblici che abbiano partecipazioni nella società", "correct": false },
      { "text": "Un sindaco effettivo deve essere eletto dai soci di minoranza con il sistema di voto di lista secondo le regole fissate dalla CONSOb", "correct": true }
    ],
    "info": "Nelle società quotate, per tutelare le minoranze, il TUF prevede meccanismi di elezione di almeno un sindaco da parte dei soci di minoranza."
  },
  {
    "q": "4 Può essere eletto sindaco:",
    "options": [
      { "text": "Chi possiede i requisiti di professionalità ed indipendenza e non si trova in uno dei casi di cui all'art. 2399 c.c", "correct": true },
      { "text": "Chi è affine entro il quarto grado di uno degli amministratori della società", "correct": false },
      { "text": "Chi è legato alla società da un rapporto di lavoro", "correct": false },
      { "text": "Chi è legato alla società da un rapporto continuativo di consulenza", "correct": false }
    ],
    "info": "L'art. 2399 c.c. elenca le cause di ineleggibilità e decadenza che mirano a garantire l'indipendenza del sindaco."
  },
  {
    "q": "5 La nomina e la cessazione della carica da sindaco, ai fini pubblicitari:",
    "options": [
      { "text": "Devono essere pubblicate su un quotidiano di rilevanza nazionale", "correct": false },
      { "text": "Devono essere iscritte presso il Registro delle Imprese", "correct": true },
      { "text": "Devono essere affisse presso la casa comunale del comune nel quale ha sede la società", "correct": false },
      { "text": "Devono essere pubblicate esclusivamente sul sito web della società", "correct": false }
    ],
    "info": "Gli amministratori devono richiedere l'iscrizione nel Registro delle Imprese (art. 2400 c.c.) per rendere pubblica la nomina o la cessazione."
  },
  {
    "q": "6 I sindaci hanno il compito:",
    "options": [
      { "text": "Esclusivo di controllare i conti della società", "correct": false },
      { "text": "Di vigilare sulla corretta amministrazione della società", "correct": true },
      { "text": "Di tenere cirrettamente la contabilità della società", "correct": false },
      { "text": "Di gestire la società", "correct": false }
    ],
    "info": "Il collegio sindacale ha una funzione di vigilanza sull'osservanza della legge, dello statuto e sul rispetto dei principi di corretta amministrazione (art. 2403 c.c.)."
  },
  {
    "q": "7 La revisione legale dei conti, a seguito della riforma del 2003, è stata affidata:",
    "options": [
      { "text": "Esclusivamente al collegio sindacale", "correct": false },
      { "text": "Alla assemblea dei soci", "correct": false },
      { "text": "Ad un revisore legale o ad una società di revisione", "correct": true },
      { "text": "Al comitato esecutivo", "correct": false }
    ],
    "info": "La revisione legale dei conti è un'attività distinta dalla vigilanza dei sindaci ed è riservata a soggetti abilitati (revisori o società di revisione)."
  },
  {
    "q": "8 E' legittima la clausola statutaria con la quale si affida la revisione legale dei conti al collegio sindacale se adottata:",
    "options": [
      { "text": "Da società che non sono tenute a redigere il bilancio consolidato, non sono qualificate come enti di interesse pubblico e non sono da enti ad interesse pubblico controllate o a comune controllo", "correct": true },
      { "text": "Dalle società tenute a redigere il bilancio consolidato", "correct": false },
      { "text": "Dalle società qualificate come enti di interesse pubblico", "correct": false },
      { "text": "Dalle società che controllano o sono controllate a comune controllo con un interesse pubblico", "correct": false }
    ],
    "info": "L'art. 2409-bis c.c. permette questa deroga solo per le società di minori dimensioni che non redigono il consolidato e non sono enti di interesse pubblico."
  },
  {
    "q": "9 Ai sensi del primo comma dell'art. 2409 c.c. sono legittimati a ricorrere all'autorità giudiziaria:",
    "options": [
      { "text": "I soci che rappresentano un trentesimo del capitale sociale", "correct": false },
      { "text": "I soci che rappresentano un decimo del capitale sociale nelle società che fanno ricorso al mercato del capitale di rischio", "correct": false },
      { "text": "I soci che rappresentano un decimo del capitale sociale e nelle società che fanno ricorso al mercato del capitale di rischio i soci che rappresentano il ventesimo del capitale sociale", "correct": true },
      { "text": "I soci che rappresentano un quinto del capitale sociale", "correct": false }
    ],
    "info": "L'art. 2409 c.c. prevede soglie di legittimazione differenziate per proteggere le minoranze, riducendole per le società che fanno ricorso al mercato del capitale di rischio."
  },
  {
    "q": "10 Ai sensi dell'art. 2409 c.c. il Tribunale non può provvedere all'ispezione e dovrà sospendere il procedimento se:",
    "options": [
      { "text": "L'assemblea sostituisce esclusivamente gli amministratori con soggetti di dubbia professionalità, che si attivano per occultare le violazioni denunciate dai soci", "correct": false },
      { "text": "L'assemblea sostituisce gli amministratori ed i sindaci con soggetti di dubbia professionalità, che non si attivano per accertare se le violazioni denunciate dai soci sussistono", "correct": false },
      { "text": "L'assemblea sostituisce gli amministratori ed i sindaci con soggetti di adeguata professionalità, che si attivano per accertare se le violazioni denunciate dai soci sussistono", "correct": true },
      { "text": "L'assemblea sostituisce gli amministratori ed i sindaci con soggetti che si attivano per accertare se le violazioni denunciate dai soci sussistono", "correct": false }
    ],
    "info": "Il Tribunale sospende l'ispezione se la società si autotutela efficacemente sostituendo gli organi con soggetti competenti che procedono agli accertamenti."
  },
  {
    "q": "1 La competenza relativa alla delibera dell'aumento di capitale:",
    "options": [
      { "text": "E' attribuita inderogabilmente agli amministratori", "correct": false },
      { "text": "E' attribuita inderogabilmente all'assemblea dei soci", "correct": false },
      { "text": "E' attribuita agli amministratori, salvo deroga statutaria", "correct": false },
      { "text": "E' attribuita all'assemblea dei soci, salvo deroga statutaria", "correct": true }
    ],
    "info": "La competenza primaria è dell'assemblea straordinaria, ma lo statuto può delegare gli amministratori (art. 2443 c.c.)."
  },
  {
    "q": "2 Ai sensi dell'art. 2348 c.c. primo comma, l'aumento di capitale è ineseguibile se:",
    "options": [
      { "text": "E' gratuito", "correct": false },
      { "text": "Le azioni emesse in precedenza non sono state interamente liberate", "correct": true },
      { "text": "Aavviene mediante conferimento di beni in natura", "correct": false },
      { "text": "Avviene mediante conferimento di crediti", "correct": false }
    ],
    "info": "L'art. 2438 c.c. vieta l'aumento di capitale finché le azioni precedentemente emesse non siano integralmente liberate."
  },
  {
    "q": "3 Gli amministratori, ai sensi dell'art. 2443 c.c., sono competenti a compiere le operazioni di aumento di capitale:",
    "options": [
      { "text": "In forza di previsione statutaria con delega conferita per un massimo di cinque anni nella quale è contenuto il valore massimo che può raggiungere il capitale sociale", "correct": true },
      { "text": "Anche in mancanza di previsione statutaria con delega conferita a tempo indeterminato nella quale è contenuto il valore massimo che può raggiungere il capitale sociale", "correct": false },
      { "text": "Anche in mancanza di previsione statutaria con delega conferita a tempo indeterminato nella quale è contenuto il valore minimo dell'aumento del capitale sociale", "correct": false },
      { "text": "In forza di previsione statutaria con delega conferita per un massimo di dieci anni nella quale è contenuto il valore massimo che può raggiungere il capitale sociale", "correct": false }
    ],
    "info": "La delega agli amministratori deve essere prevista dallo statuto, limitata a 5 anni e deve definire il tetto massimo dell'aumento."
  },
  {
    "q": "4 Ai sensi dell'art. 2439 secondo comma c.c., se l'aumento di capitale non è integralmente sottoscritto entro il termine nel quale le sottoscrizioni debbono essere raccolte:",
    "options": [
      { "text": "Il capitale è aumentato di un importo pari alle sottoscrizioni raccolte soltanto se la deliberazione medesima abbia espressamente previsto il caso di raccolta parziale", "correct": true },
      { "text": "E' sempre valido l'aumento di capitale in caso di raccolta parziale", "correct": false },
      { "text": "E' escluso dalla legge che sia valido l'aumento di capitale in caso di raccolta parziale, anche se prevista statutariamente", "correct": false },
      { "text": "Gli azionisti sono obbligati a sottoscrivere le azioni non sottoscritte proporzionalmente alle loro partecipazioni nella società", "correct": false }
    ],
    "info": "L'aumento scindibile (parziale) è consentito solo se previsto dalla delibera; altrimenti l'aumento è inscindibile."
  },
  {
    "q": "5 Il sovrapprezzo:",
    "options": [
      { "text": "Deve essere versato nella percentuale del 20% al momento della sottoscrizione", "correct": false },
      { "text": "Deve essere interamente versato all'atto della sottoscrizione", "correct": true },
      { "text": "Deve essere versato nella percentuale del 50% al momento della sottoscrizione", "correct": false },
      { "text": "Deve essere versato interamente al momento della sottoscrizione solo se è espressamente previsto dallo statuto", "correct": false }
    ],
    "info": "L'art. 2439 c.c. stabilisce che il sovrapprezzo deve essere integralmente versato all'atto della sottoscrizione."
  },
  {
    "q": "6 Il diritto di opzione:",
    "options": [
      { "text": "E' il diritto dei terzi di essere preferiti ai soci sulla sottoscrizione dell'aumento di capitale gratuito", "correct": false },
      { "text": "E' il diritto dei soci di essere preferiti ai terzi sulla sottoscrizione dell'aumento di capitale gratuito", "correct": false },
      { "text": "E' il diritto dei soci di essere preferiti ai terzi sulla sottoscrizione dell'aumento di capitale reale", "correct": true },
      { "text": "E' il diritto dei terzi di essere preferiti ai soci sulla sottoscrizione dell'aumento di capitale reale", "correct": false }
    ],
    "info": "Il diritto di opzione (art. 2441 c.c.) serve a mantenere la proporzione della partecipazione sociale in caso di emissioni a pagamento."
  },
  {
    "q": "7 Il diritto di opzione spetta:",
    "options": [
      { "text": "Ai titolari di obbligazioni", "correct": false },
      { "text": "Solo ai titolari di obbligazioni convertibili", "correct": false },
      { "text": "Solo ai titolari di azioni", "correct": false },
      { "text": "Ai titolari di azioni ed ai titolari di obbligazioni convertibili", "correct": true }
    ],
    "info": "Il diritto di opzione è esteso ai titolari di obbligazioni convertibili, poiché l'aumento di capitale potrebbe diluire il loro diritto di conversione."
  },
  {
    "q": "8 Per l'esercizio del diritto di opzione deve essere concesso un termine:",
    "options": [
      { "text": "Non inferiore a cinque giorni dalla pubblicazione dell'offerta", "correct": false },
      { "text": "Non inferiore a sette giorni dalla pubblicazione dell'offerta", "correct": false },
      { "text": "Non inferiore a dieci giorni dalla pubblicazione dell'offerta", "correct": false },
      { "text": "Non inferiore a quindici giorni dalla pubblicazione dell'offerta", "correct": true }
    ],
    "info": "L'art. 2441 c.c. impone un termine minimo di 15 giorni per l'esercizio dell'opzione."
  },
  {
    "q": "9 L'aumento nominale del capitale sociale:",
    "options": [
      { "text": "Non comporta l'apporto di nuovi conferimenti nella società", "correct": true },
      { "text": "Comporta l'apporto di nuovi conferimenti in natura", "correct": false },
      { "text": "Comporta l'apporto di nuovi conferimenti costituiti da crediti", "correct": false },
      { "text": "Comporta l'apporto di nuovi conferimenti in denaro", "correct": false }
    ],
    "info": "L'aumento nominale (gratuito) avviene mediante imputazione di riserve a capitale, senza apporti esterni (art. 2442 c.c.)."
  },
  {
    "q": "10 Nell'aumento nominale del capitale sociale:",
    "options": [
      { "text": "E' escluso dal legislatore che possa essere utilizzata la riserva legale", "correct": false },
      { "text": "La riserva legale può essere utilizzata per la somma degli accantonamenti eccedente la soglia del 20% del capitale sociale", "correct": true },
      { "text": "La riserva legale può essere utilizzata integralmente", "correct": false },
      { "text": "La riserva legale può essere utilizzata per la somma degli accantonamenti eccedente la soglia del 50% del capitale sociale", "correct": false }
    ],
    "info": "La riserva legale può essere utilizzata solo per la parte che eccede il 20% del capitale sociale (art. 2442 c.c.)."
  },
  {
    "q": "1 La riduzione del capitale sociale:",
    "options": [
      { "text": "E' esclusivamente reale", "correct": false },
      { "text": "E' esclusivamente nominale", "correct": false },
      { "text": "Può essere reale e nominale allo stesso tempo", "correct": false },
      { "text": "Può essere reale o nominale", "correct": true }
    ],
    "info": "La riduzione può essere reale (restituzione ai soci) o nominale (copertura perdite)."
  },
  {
    "q": "2 L'avviso di convocazione dell'assemblea dei soci deve indicare ai sensi dell'art. 2445 secondo comma c.c.:",
    "options": [
      { "text": "Espressamente le ragioni e le modalità di riduzione del capitale sociale", "correct": true },
      { "text": "Esclusivamente le modalità di riduzione del capitale", "correct": false },
      { "text": "Il solo ordine del giorno", "correct": false },
      { "text": "Esclusivamente le ragioni per le quali si deve operare la riduzione del capitale sociale", "correct": false }
    ],
    "info": "La pubblicità della riduzione reale deve rendere edotti i creditori sulle ragioni e sulle modalità operative."
  },
  {
    "q": "3 I creditori sociali, a fronte della deliberata riduzione del capitale sociale, i sensi dell'art. 2445 c.c.:",
    "options": [
      { "text": "Possono proporre opposizione entro il termine di 90 giorni dall'approvazione della delibera", "correct": false },
      { "text": "Possono proporre opposizione entro il termine di 90 giorni dall'iscrizione della stessa nel Registro Imprese", "correct": true },
      { "text": "Possono proporre opposizione entro il termine di 30 giorni dall'approvazione della delibera", "correct": false },
      { "text": "Possono proporre opposizione entro il termine di 30 giorni dall'iscrizione della stessa nel Registro Imprese", "correct": false }
    ],
    "info": "I creditori hanno 90 giorni di tempo dall'iscrizione nel Registro delle Imprese per opporsi alla riduzione reale, in quanto riduce la garanzia patrimoniale."
  },
  {
    "q": "4 La proposizione dell'opposizione dei creditori sociali:",
    "options": [
      { "text": "Ha l'effetto di sospendere l'esecuzione della delibera sino all'esito del giudizio", "correct": true },
      { "text": "Ha l'effetto di sospendere l'esecuzione della delibera sino a quando i diritti di tutti i creditori sociali non sono soddisfatti", "correct": false },
      { "text": "Ha l'effetto di sospendere l'esecuzione della delibera per un termine di 90 giorni entro i quali gli amministratori debbono prendere gli opportuni provvedimenti", "correct": false },
      { "text": "Ha l'effetto di sospendere l'esecuzione della delibera sino a quando i diritti dei creditori sociali che hanno agito in giudizio non sono soddisfatti", "correct": false }
    ],
    "info": "L'opposizione ha un effetto sospensivo automatico sull'esecuzione della delibera fino alla decisione del Tribunale (art. 2445 c.c.)."
  },
  {
    "q": "5 La riduzione del capitale sociale per perdite è facoltativa quando:",
    "options": [
      { "text": "La perdita è minore o uguale ad un terzo del capitale sociale", "correct": true },
      { "text": "La perdita è minore o uguale ad un terzo del patrimonio netto", "correct": false },
      { "text": "La perdita è maggiore di un terzo del patrimonio netto", "correct": false },
      { "text": "La perdita è maggiore di un terzo del capitale sociale", "correct": false }
    ],
    "info": "Se la perdita non riduce il capitale di oltre un terzo, la riduzione non è un obbligo inderogabile (art. 2446 c.c.)."
  },
  {
    "q": "6 Il limite minimo per il quale la riduzione del capitale sociale per perdite è obbligatoria è raggiunto quando:",
    "options": [
      { "text": "La perdita è minore o uguale ad un terzo del capitale sociale", "correct": false },
      { "text": "La perdita è minore o uguale ad un terzo del patrimonio netto", "correct": false },
      { "text": "La perdita è maggiore di un terzo del patrimonio netto", "correct": false },
      { "text": "La perdita è maggiore di un terzo del capitale sociale", "correct": true }
    ],
    "info": "La riduzione del capitale sociale per perdite diventa obbligatoria quando la perdita supera il terzo del capitale sociale (art. 2446 c.c.)."
  },
  {
    "q": "7 Se la perdita superiore al terzo del capitale non ha fatto scendere il valore del capitale sociale al di sotto del minimo legale:",
    "options": [
      { "text": "Deve essere deliberata la trasformazione della società", "correct": false },
      { "text": "Deve essere deliberato lo scioglimento della società", "correct": false },
      { "text": "Deve essere convocata l'assemblea per l'adozione degli opportuni provvedimenti", "correct": true },
      { "text": "Deve essere adito immediatamente il Tribunale competente affinchè adotti gli opportuni provvedimenti", "correct": false }
    ],
    "info": "Ai sensi dell'art. 2446 c.c., se la perdita non intacca il minimo legale, l'assemblea deve essere convocata per prendere gli opportuni provvedimenti (riduzione o copertura)."
  },
  {
    "q": "8 Se la perdita superiore al terzo del capitale ha fatto scendere il valore del capitale sociale al di sotto del minimo legale:",
    "options": [
      { "text": "La società non ha altra scelta se non quella di avviare il procedimento di trasformazione", "correct": false },
      { "text": "Deve essere deliberato lo scioglimento della società", "correct": false },
      { "text": "Deve essere deliberata esclusivamente la riduzione del capitale sociale", "correct": false },
      { "text": "Deve essere deliberata la riduzione del capitale sociale ed il contemporaneo aumento dello stesso al minimo legale o in alternativa la trasformazione della società", "correct": true }
    ],
    "info": "In caso di perdite che erodono il minimo legale, gli amministratori devono convocare l'assemblea per ridurre il capitale e aumentarlo contestualmente o trasformare la società (art. 2447 c.c.)."
  },
  {
    "q": "9 Parte degli utili conseguiti devono essere accantonati a riserva legale:",
    "options": [
      { "text": "Nella misura del 5% fino al raggiungimento della somma accantonata pari ad un quinto del capitale sociale", "correct": true },
      { "text": "Nella misura del 15% fino al raggiungimento della somma accantonata pari al 5% del capitale sociale", "correct": false },
      { "text": "Nella misura del 15% fino al raggiungimento della somma accantonata pari al 20% del capitale sociale", "correct": false },
      { "text": "Nella misura del 5% fino al raggiungimento della somma accantonata pari ad un terzo del capitale sociale", "correct": false }
    ],
    "info": "L'art. 2430 c.c. impone l'accantonamento di almeno il 5% degli utili netti annui alla riserva legale, fino al raggiungimento di un quinto (20%) del capitale sociale."
  },
  {
    "q": "10 E' indisponibile:",
    "options": [
      { "text": "La somma degli utili accantonati nella riserva statutaria eccedente il minimo legale", "correct": false },
      { "text": "La riserva facoltativa", "correct": false },
      { "text": "La riserva statutaria", "correct": true },
      { "text": "L'utile se negli esercizi precedenti non si sono verificate perdite", "correct": false }
    ],
    "info": "La riserva statutaria, essendo prevista dallo statuto, ha carattere di indisponibilità per i soci, salvo diversa disposizione statutaria."
  },
  {
    "q": "1 Le obbligazioni rappresentano:",
    "options": [
      { "text": "Una frazione di un finanziamento richiesto dalla società ai soci", "correct": false },
      { "text": "Una frazione di un finanziamento richiesto dalla società ai terzi", "correct": true },
      { "text": "Una frazione del capitale sociale apportato da terzi", "correct": false },
      { "text": "Una frazione del capitale sociale detenuto da una società collegata", "correct": false }
    ],
    "info": "Le obbligazioni sono titoli di debito che rappresentano un prestito (finanziamento) ottenuto dalla società presso terzi."
  },
  {
    "q": "2 Le obbligazioni:",
    "options": [
      { "text": "Attribuiscono il diritto ad una parte di utili", "correct": false },
      { "text": "Attribuiscono il diritto di votare nell'assemblea ordinaria", "correct": false },
      { "text": "Attribuiscono il diritto al rimborso del capitale investito", "correct": true },
      { "text": "Attribuiscono sempre il diritto alla conversione del titolo in azione", "correct": false }
    ],
    "info": "Le obbligazioni conferiscono al possessore il diritto al rimborso del capitale e, solitamente, alla percezione di un interesse (cedola)."
  },
  {
    "q": "3 La società può emettere obbligazioni:",
    "options": [
      { "text": "Entro il limite del doppio del capitale sociale, della riserva legale e delle riserve disponibili risultanti dall'ultimo bilancio approvato", "correct": true },
      { "text": "Entro il limite del capitale sociale, della riserva legale e delle riserve disponibili risultanti dall'ultimo bilancio approvato", "correct": false },
      { "text": "Entro il limite del capitale sociale risultante dall'ultimo bilancio approvato", "correct": false },
      { "text": "Entro il limite del doppio del capitale sociale risultante dall'ultimo bilancio approvato", "correct": false }
    ],
    "info": "L'art. 2412 c.c. stabilisce il limite all'emissione di obbligazioni nel doppio del capitale sociale, della riserva legale e delle riserve disponibili."
  },
  {
    "q": "4 Il limite di cui all'art. 2412 primo comma c.c. non è applicato:",
    "options": [
      { "text": "Se l'emissione ha ad oggetto obbligazioni convertibili", "correct": false },
      { "text": "Se l'emissione ha ad oggetto obbligazioni in valuta estera", "correct": false },
      { "text": "Se l'emissione ha ad oggetto obbligazioni a premio", "correct": false },
      { "text": "Se l'emissione riguarda obbligazioni garantite da ipoteca di primo grado su immobili dei proprietà della società nel limite di due terzi degli immobili medesimi", "correct": true }
    ],
    "info": "Le obbligazioni garantite da ipoteca sono escluse dal limite quantitativo del doppio del capitale sociale poiché il rischio è coperto da garanzia reale."
  },
  {
    "q": "5 In caso di riduzione obbligatoria del capitale sociale, non possono distribuirsi utili fino a quando:",
    "options": [
      { "text": "L'ammontare del capitale sociale, della riserva legale e delle riserve disponibili non raggiungono l'ammontare della metà del valore delle obbligazioni in circolazione", "correct": true },
      { "text": "L'ammontare del capitale sociale, della riserva legale e delle riserve disponibili non raggiungono l'ammontare del valore delle obbligazioni in circolazione", "correct": false },
      { "text": "L'ammontare del capitale sociale, della riserva legale e delle riserve disponibili non raggiungono il doppio dell'ammontare del valore delle obbligazioni in circolazione", "correct": false },
      { "text": "L'ammontare del capitale sociale non raggiunge il doppio dell'ammontare del valore delle obbligazioni in circolazione", "correct": false }
    ],
    "info": "La norma mira a tutelare i creditori obbligazionari garantendo una copertura minima del debito emesso."
  },
  {
    "q": "6 Salvo lo statuto o la legge non disponga diversamente, l'emissione di obbligazioni è deliberata:",
    "options": [
      { "text": "Dall'assemblea ordinaria", "correct": false },
      { "text": "Dall'assemblea straordinaria", "correct": false },
      { "text": "Dal collegio sindacale", "correct": false },
      { "text": "Dagli amministratori", "correct": true }
    ],
    "info": "Ai sensi dell'art. 2410 c.c., la competenza all'emissione di obbligazioni spetta agli amministratori, salvo diversa previsione dello statuto."
  },
  {
    "q": "7 Lo statuto può attribuire agli amministratori la facoltà di emettere obbligazioni convertibili:",
    "options": [
      { "text": "Fino ad un ammontare determinato", "correct": false },
      { "text": "Per il periodo massimo di 5 anni dalla data di iscrizione della società nel Registro delle Imprese", "correct": true },
      { "text": "Fino ad un ammontare determinato e per il periodo massimo di 5 anni dalla data di iscrizione della società nel Registro delle Imprese", "correct": false },
      { "text": "Per il periodo massimo di 3 anni dalla data di iscrizione della società nel Registro delle Imprese", "correct": false }
    ],
    "info": "La delega agli amministratori per l'emissione di obbligazioni convertibili è soggetta a limiti temporali definiti dalla legge."
  },
  {
    "q": "8 E' competente a deliberare l'emissione di un prestito obbligazionario convertibile:",
    "options": [
      { "text": "L'assemblea ordinaria", "correct": true },
      { "text": "L'assemblea straordinaria", "correct": false },
      { "text": "Gli amministratori", "correct": false },
      { "text": "Il collegio sindacale", "correct": false }
    ],
    "info": "Sebbene la dottrina tenda ad indicare l'assemblea straordinaria, in base alla tua traccia la risposta corretta indicata è l'assemblea ordinaria."
  },
  {
    "q": "9 Contestualmente alla deliberazione della emissione delle obbligazioni convertibili, deve essere:",
    "options": [
      { "text": "Deliberata la diminuzione di capitale", "correct": false },
      { "text": "Deliberato l'aumento di capitale", "correct": true },
      { "text": "Deliberato l'acquisto di azioni proprie", "correct": false },
      { "text": "Deliberata la vendita di azioni proprie", "correct": false }
    ],
    "info": "L'aumento di capitale è necessario per soddisfare le richieste di conversione da parte degli obbligazionisti."
  },
  {
    "q": "10 L'assemblea degli obbligazionisti delibera:",
    "options": [
      { "text": "Sulla nomina di tutti gli amministratori", "correct": false },
      { "text": "Sulla revoca di tutti gli amministratori", "correct": false },
      { "text": "Sulla proposta di amministrazione controllata e di concordato", "correct": true },
      { "text": "Sulla nomina di tutti i componenti del collegio sindacale", "correct": false }
    ],
    "info": "L'assemblea degli obbligazionisti tutela gli interessi comuni del gruppo rispetto alla società, esprimendosi ad esempio su proposte di concordato."
  },
  {
    "q": "1 Il bilancio deve essere redatto:",
    "options": [
      { "text": "A fine di ogni anno d'esercizio d'impresa", "correct": true },
      { "text": "Ogni tre anni d'esercizio d'impresa", "correct": false },
      { "text": "Semestralmente", "correct": false },
      { "text": "Ogni due anni d'esercizio d'impresa", "correct": false }
    ],
    "info": "Il bilancio d'esercizio deve essere redatto annualmente per rappresentare la situazione economica e patrimoniale dell'impresa."
  },
  {
    "q": "2 Il bilancio deve essere redatto:",
    "options": [
      { "text": "Esclusivamente in maniera veritiera", "correct": false },
      { "text": "Esclusivamente in maniera corretta", "correct": false },
      { "text": "In maniera chiara e corretta", "correct": false },
      { "text": "In maniera chiara, veritiera e corretta", "correct": true }
    ],
    "info": "L'art. 2423 c.c. sancisce che il bilancio deve essere redatto con chiarezza e deve rappresentare in modo veritiero e corretto la situazione patrimoniale."
  },
  {
    "q": "3 I principi contabili nazionali:",
    "options": [
      { "text": "Hanno esclusivamente valore vincolante", "correct": false },
      { "text": "Hanno esclusivamente valore regolamentare", "correct": false },
      { "text": "Hanno valore regolamentare e vincolante", "correct": false },
      { "text": "Non hanno ne' valore regolamentare ne' valore vincolante", "correct": true }
    ],
    "info": "Sebbene autorevoli, i principi contabili nazionali sono norme tecniche di supporto e interpretazione, non leggi in senso stretto."
  },
  {
    "q": "4 Secondo il principio di continuità nella redazione del bilancio:",
    "options": [
      { "text": "Devono essere adottati sempre i medesimi criteri al fine di rendere omogenei i dati", "correct": true },
      { "text": "Il bilancio deve essere redatto in maniera chiara senza lasciare spazi o fare cancellature o abrasioni", "correct": false },
      { "text": "Ogni bilancio deve essere conservato nella società in un archivio ordinato secondo il criterio temporale", "correct": false },
      { "text": "Deve essere redatto dagli stessi soggetti che hanno tenuto la contabilità annuale poiché conoscono la documentazione contabile", "correct": false }
    ],
    "info": "Il principio di continuità (o costanza) dei criteri di valutazione serve a garantire la comparabilità dei bilanci nel tempo."
  },
  {
    "q": "5 Il bilancio è costituito da:",
    "options": [
      { "text": "Due documenti, stato patrimoniale e conto economico", "correct": false },
      { "text": "Tre documenti: conto economico, nota integrativa e rendiconto finanziario", "correct": false },
      { "text": "Tre documenti: stato patrimoniale, conto economico, nota integrativa", "correct": false },
      { "text": "Tre documenti: stato patrimoniale, conto economico, nota integrativa e rendiconto finanziario", "correct": true }
    ],
    "info": "Il bilancio d'esercizio è composto da Stato Patrimoniale, Conto Economico, Rendiconto Finanziario e Nota Integrativa (art. 2423 c.c.)."
  },
  {
    "q": "6 Lo stato patrimoniale è:",
    "options": [
      { "text": "La rappresentazione sintetica della composizione del patrimonio sociale", "correct": true },
      { "text": "Il riassunto delle operazioni di tipo economico sostenuti dalla società nel corso dell'anno", "correct": false },
      { "text": "Il documento informativo con il quale sono rappresentati i flussi finanziari della società", "correct": false },
      { "text": "Una relazione che fornisce maggiori informazioni sulle voci indicate sinteticamente in bilancio", "correct": false }
    ],
    "info": "Lo stato patrimoniale rappresenta la situazione patrimoniale e finanziaria della società al termine dell'esercizio (attività e passività)."
  },
  {
    "q": "7 Il conto economico è:",
    "options": [
      { "text": "La rappresentazione sintetica della composizione del patrimonio sociale", "correct": false },
      { "text": "La rappresentazione sintetica delle operazioni di tipo economico sostenuti dalla società nel corso dell'anno", "correct": true },
      { "text": "Il documento informativo con il quale sono rappresentati i flussi finanziari della società", "correct": false },
      { "text": "Una relazione che fornisce maggiori informazioni sulle voci indicate sinteticamente in bilancio", "correct": false }
    ],
    "info": "Il conto economico evidenzia il risultato economico d'esercizio (utile o perdita) tramite il confronto tra ricavi e costi."
  },
  {
    "q": "8 Il rendiconto finanziario è:",
    "options": [
      { "text": "La rappresentazione sintetica della composizione del patrimonio sociale", "correct": false },
      { "text": "Il riassunto delle operazioni di tipo economico sostenuti dalla società nel corso dell'anno", "correct": false },
      { "text": "Il documento informativo con il quale sono rappresentati i flussi finanziari della società", "correct": true },
      { "text": "Una relazione che fornisce maggiori informazioni sulle voci indicate sinteticamente in bilancio", "correct": false }
    ],
    "info": "Il rendiconto finanziario mostra le variazioni delle disponibilità liquide avvenute nel corso dell'esercizio."
  },
  {
    "q": "9 La nota integrativa è:",
    "options": [
      { "text": "La rappresentazione sintetica della composizione del patrimonio sociale", "correct": false },
      { "text": "Il riassunto delle operazioni di tipo economico sostenuti dalla società nel corso dell'anno", "correct": false },
      { "text": "Il documento informativo con il quale sono rappresentati i flussi finanziari della società", "correct": false },
      { "text": "Una relazione che fornisce maggiori informazioni sulle voci indicate sinteticamente in bilancio", "correct": true }
    ],
    "info": "La nota integrativa ha funzione esplicativa e di completamento dei dati numerici esposti negli altri documenti di bilancio."
  },
  {
    "q": "10 A redigere il progetto di bilancio:",
    "options": [
      { "text": "Sono gli amministratori", "correct": true },
      { "text": "E' l'assemblea ordinaria", "correct": false },
      { "text": "E' l'assemblea straordinaria", "correct": false },
      { "text": "E' il collegio sindacale", "correct": false }
    ],
    "info": "La redazione del progetto di bilancio è un atto di gestione che spetta agli amministratori."
  },
  {
    "q": "1 Le cause di scioglimento della S.p.A.:",
    "options": [
      { "text": "Sono contenute esclusivamente nello statuto", "correct": false },
      { "text": "Sono previste esclusivamente nell'atto costitutivo", "correct": false },
      { "text": "Sono dettate esclusivamente dalla legge", "correct": false },
      { "text": "Sono dettate dalla legge, ma possono esservene ulteriori indicate dallo statuto", "correct": true }
    ],
    "info": "L'art. 2484 c.c. elenca le cause di scioglimento, ma consente all'atto costitutivo o allo statuto di prevederne di ulteriori."
  },
  {
    "q": "2 La causa di scioglimento della S.p.A. deve essere accertata in prima istanza:",
    "options": [
      { "text": "Dagli amministratori", "correct": true },
      { "text": "Dal Tribunale", "correct": false },
      { "text": "Dall'assemblea ordinaria", "correct": false },
      { "text": "Dall'assemblea straordinaria", "correct": false }
    ],
    "info": "Gli amministratori hanno l'obbligo di accertare il verificarsi di una causa di scioglimento e di iscriverla nel Registro delle Imprese."
  },
  {
    "q": "3 Al verificarsi di una delle cause di scioglimento della società:",
    "options": [
      { "text": "Consegue immediatamente l'estinzione della società", "correct": false },
      { "text": "Consegue la fase di liquidazione della società", "correct": true },
      { "text": "Consegue il fallimento della società", "correct": false },
      { "text": "Consegue il venir meno della qualità di socio", "correct": false }
    ],
    "info": "Lo scioglimento non estingue immediatamente la società, ma apre la fase della liquidazione."
  },
  {
    "q": "4 Se la società è in fase di liquidazione:",
    "options": [
      { "text": "Alla denominazione sociale deve essere aggiunta l'indicazione di società in liquidazione", "correct": true },
      { "text": "Alla denominazione sociale può essere aggiunta l'indicazione di società in liquidazione", "correct": false },
      { "text": "Alla denominazione sociale può essere aggiunta l'indicazione di società in scioglimento", "correct": false },
      { "text": "Alla denominazione sociale deve essere aggiunta l'indicazione di società in scioglimento", "correct": false }
    ],
    "info": "Per tutela dei terzi, la società deve specificare di essere in liquidazione accanto alla denominazione sociale."
  },
  {
    "q": "5 Lo stato di liquidazione della società:",
    "options": [
      { "text": "Può essere revocato anche se non è stata eliminata la causa di scioglimento", "correct": false },
      { "text": "Può essere revocato solo se non è stata eliminata la causa di scioglimento", "correct": false },
      { "text": "Può essere revocato solo se è stata eliminata la causa di scioglimento", "correct": true },
      { "text": "E' irrevocabile", "correct": false }
    ],
    "info": "La revoca della liquidazione richiede l'eliminazione della causa che ha portato allo scioglimento."
  },
  {
    "q": "6 La revoca dello stato di liquidazione avviene:",
    "options": [
      { "text": "Con deliberazione dell'assemblea straordinaria", "correct": true },
      { "text": "Con deliberazione dell'assemblea ordinaria", "correct": false },
      { "text": "Con deliberazione del C.D.A", "correct": false },
      { "text": "Con deliberazione del collegio sindacale", "correct": false }
    ],
    "info": "La revoca della liquidazione incide sulla struttura sociale, pertanto richiede il quorum dell'assemblea straordinaria."
  },
  {
    "q": "7 Gli amministratori conservano il potere gestorio della società:",
    "options": [
      { "text": "Solo fino a quando non è riscontrata una causa di scioglimento", "correct": false },
      { "text": "Fino a quando la nomina dei liquidatori non è iscritta nel Registro delle Imprese", "correct": true },
      { "text": "Anche se la nomina dei liquidatori è stata iscritta nel Registro delle Imprese", "correct": false },
      { "text": "Fino a quando non si scioglie la società", "correct": false }
    ],
    "info": "Fino all'iscrizione della nomina dei liquidatori, gli amministratori devono mantenere la gestione della società limitatamente agli affari urgenti."
  },
  {
    "q": "8 Compiuta la liquidazione:",
    "options": [
      { "text": "Gli amministratori debbono redigere il bilancio finale", "correct": false },
      { "text": "I liquidatori debbono redigere il bilancio finale", "correct": true },
      { "text": "I revisori dei conti debbono redigere il bilancio finale", "correct": false },
      { "text": "L'assemblea straordinaria deve redigere il bilancio finale", "correct": false }
    ],
    "info": "Al termine della procedura, i liquidatori predispongono il bilancio finale di liquidazione e il piano di riparto."
  },
  {
    "q": "9 Nella società in accomandita per azioni le modificazioni dell'atto costitutivo devono essere approvate:",
    "options": [
      { "text": "Dall'assemblea straordinaria", "correct": false },
      { "text": "Dai soci accomandatari", "correct": false },
      { "text": "Dall'assemblea straordinaria e da tutti i soci accomandatari", "correct": true },
      { "text": "Da tutti i soci", "correct": false }
    ],
    "info": "Nelle S.a.p.a., le modifiche statutarie richiedono sia la delibera dell'assemblea straordinaria, sia l'approvazione di tutti i soci accomandatari."
  },
  {
    "q": "10 Nella s.a.p.a. la partecipazione è rappresentata da:",
    "options": [
      { "text": "Quote", "correct": false },
      { "text": "Obbligazioni", "correct": false },
      { "text": "Azioni", "correct": true },
      { "text": "Strumenti finanziari partecipativi", "correct": false }
    ],
    "info": "La S.a.p.a. è una società di capitali in cui le quote di partecipazione sono rappresentate da azioni."
  },
  {
    "q": "1 La trasformazione:",
    "options": [
      { "text": "E' il risultato di un procedimento per il quale una società che ha adottato un modello organizzativo tipo ne sceglie successivamente un altro", "correct": true },
      { "text": "E' la costituzione di una nuova società a fronte di due esistenti", "correct": false },
      { "text": "E' la incorporazione di una società di un'altra società", "correct": false },
      { "text": "E' la cessione di un ramo aziendale della società", "correct": false }
    ],
    "info": "La trasformazione (art. 2498 c.c.) è il mutamento del modello organizzativo della società, che mantiene invariata la propria soggettività giuridica."
  },
  {
    "q": "2 La trasformazione della società può essere:",
    "options": [
      { "text": "Esclusivamente omogenea", "correct": false },
      { "text": "Esclusivamente eterogenea", "correct": false },
      { "text": "Omogenea e eterogenea", "correct": true },
      { "text": "Solo progressiva", "correct": false }
    ],
    "info": "Esiste la trasformazione omogenea (tra società di capitali) e la trasformazione eterogenea (da/verso enti non societari o tipi societari diversi)."
  },
  {
    "q": "3 E' omogenea la trasformazione:",
    "options": [
      { "text": "Da S.p.A. a cooperativa", "correct": false },
      { "text": "Da S.p.A. a consorzio", "correct": false },
      { "text": "Da S.p.A. ad associazione non riconosciuta", "correct": false },
      { "text": "Da S.p.A. a S.r.l", "correct": true }
    ],
    "info": "La trasformazione è omogenea quando avviene tra tipi societari di tipo lucrativo (es. da S.p.A. a S.r.l.)."
  },
  {
    "q": "4 La trasformazione omogenea ha effetto:",
    "options": [
      { "text": "Dall'ultimo degli adempimenti pubblicitari al cui adempimento la società è obbligata", "correct": true },
      { "text": "Dal primo degli adempimenti pubblicitari al cui adempimento la società è obbligata", "correct": false },
      { "text": "Dal momento della delibera di trasformazione", "correct": false },
      { "text": "Dal momento del cambiamento di denominazione sociale", "correct": false }
    ],
    "info": "L'efficacia della trasformazione è subordinata al completamento degli adempimenti pubblicitari prescritti dalla legge."
  },
  {
    "q": "5 Ai sensi dell'art. 2500 septies terzo comma c.c., la deliberazione della trasformazione eterogenea da società di capitali deve essere assunta:",
    "options": [
      { "text": "Con il voto favorevole di un terzo degli aventi diritto", "correct": false },
      { "text": "Con il voto favorevole dei due terzi degli aventi diritto, senza il consenso dei soci che assumono la responsabilità illimitata", "correct": false },
      { "text": "Con il voto favorevole dei due terzi degli aventi diritto ed in ogni caso con il consenso dei soci che assumono la responsabilità illimitata", "correct": true },
      { "text": "Con il voto favorevole della metà più uno degli aventi diritto", "correct": false }
    ],
    "info": "La trasformazione eterogenea richiede quorum rafforzati e il consenso dei soci che, in seguito alla trasformazione, verrebbero a rispondere illimitatamente delle obbligazioni sociali."
  },
  {
    "q": "6 La trasformazione eterogenea di un consorzio in società di capitali deve essere deliberata:",
    "options": [
      { "text": "Con il voto contrario della maggioranza assoluta dei consorziati", "correct": false },
      { "text": "Con il voto favorevole della maggioranza assoluta dei consorziati", "correct": true },
      { "text": "Con il voto favorevole della maggioranza dei consorziati", "correct": false },
      { "text": "Con il voto favorevole di un terzo dei consorziati", "correct": false }
    ],
    "info": "La trasformazione eterogenea richiede un quorum deliberativo rafforzato per tutelare i consorziati."
  },
  {
    "q": "7 Se la società di persone si trasforma in società di capitali:",
    "options": [
      { "text": "I soci restano illimitatamente responsabili per i debiti sociali contratti anteriormente alla trasformazione", "correct": true },
      { "text": "I soci restano illimitatamente responsabili per i debiti sociali contratti posteriormente alla trasformazione", "correct": false },
      { "text": "I soci sono limitatamente responsabili anche per i debiti contratti anteriormente alla trasformazione", "correct": false },
      { "text": "I soci sono liberati dalla responsabilità per i debiti contratti anteriormente alla trasformazione", "correct": false }
    ],
    "info": "La trasformazione non libera i soci dalla responsabilità illimitata per le obbligazioni sorte prima dell'efficacia dell'atto (art. 2500 quinquies c.c.)."
  },
  {
    "q": "8 Ai sensi dell'art. 2500 novies c.c. la trasformazione eterogenea ha:",
    "options": [
      { "text": "Effetto trascorsi sessanta giorni dall'ultimo degli adempimenti pubblicitari previsti dal legislatore", "correct": true },
      { "text": "Effetto trascorsi trenta giorni dall'ultimo degli adempimenti pubblicitari previsti dal legislatore", "correct": false },
      { "text": "Effetto trascorsi venti giorni dall'ultimo degli adempimenti pubblicitari previsti dal legislatore", "correct": false },
      { "text": "Effetto trascorsi quindici giorni dall'ultimo degli adempimenti pubblicitari previsti dal legislatore", "correct": false }
    ],
    "info": "Il termine dilatorio di 60 giorni serve a tutelare i creditori, consentendo loro di opporsi alla trasformazione."
  },
  {
    "q": "9 La trasformazione di società di capitali in società di persone è deliberata:",
    "options": [
      { "text": "Con il voto favorevole dei 2/3 del capitale sociale", "correct": false },
      { "text": "Con il voto favorevole dei 2/3 del capitale presente in assemblea", "correct": false },
      { "text": "Con le maggioranze previste per le modifiche dello statuto", "correct": true },
      { "text": "Con il voto favorevole dei 2/3 del capitale sociale", "correct": false }
    ],
    "info": "La trasformazione richiede il consenso dei soci che assumono la responsabilità illimitata e le normali maggioranze assembleari straordinarie."
  },
  {
    "q": "10 In caso di trasformazione eterogenea entro il termine ai sensi di legge decorrente dall'ultimo adempimento pubblicitario:",
    "options": [
      { "text": "E' dato ai creditori sociali la facoltà di esercitare il recesso", "correct": false },
      { "text": "E' dato ai creditori sociali il diritto di esercitare il recesso", "correct": false },
      { "text": "E' riconosciuta ai creditori sociali la legittimazione ad opporsi adendo il Tribunale competente", "correct": true },
      { "text": "E' riconosciuta ai creditori sociali la legittimazione ad opporsi ricorrendo al C.D.A", "correct": false }
    ],
    "info": "L'opposizione dei creditori garantisce una tutela giudiziale qualora la trasformazione pregiudichi la garanzia patrimoniale."
  },
  {
    "q": "1 La fusione può eseguirsi:",
    "options": [
      { "text": "Esclusivamente mediante la costituzione di una nuova società", "correct": false },
      { "text": "Esclusivamente mediante la incorporazione di una società in un'altra", "correct": false },
      { "text": "Esclusivamente mediante la costituzione di una nuova società o mediante l'incorporazione di una società in un'altra", "correct": false },
      { "text": "Mediante la costituzione di una nuova società o mediante l'incorporazione di una società o più società in un'altra", "correct": true }
    ],
    "info": "La fusione può essere propria (nuova società) o per incorporazione."
  },
  {
    "q": "2 Dalla lettura dell'art. 2501 ter c.c. , si desume essere un dato facoltativo del progetto di fusione:",
    "options": [
      { "text": "Il tipo, la denominazione o ragione sociale e la sede delle società partecipanti alla fusione", "correct": false },
      { "text": "Il rapporto di cambio delle azioni o quote, nonché l'eventuale conguaglio in denaro", "correct": false },
      { "text": "La eventuale sede secondaria della società risultante dalla fusione", "correct": true },
      { "text": "L'atto costitutivo della nuova società risultante dalla fusione o di quella incorporante", "correct": false }
    ],
    "info": "Le sedi secondarie non sono elementi essenziali del progetto di fusione secondo l'art. 2501-ter."
  },
  {
    "q": "3 E' escluso che la fusione operi:",
    "options": [
      { "text": "Tra una S.r.l. e una S.p.A", "correct": false },
      { "text": "Tra due S.p.A", "correct": false },
      { "text": "Tra una S.p.A. ed una S.p.A. in liquidazione", "correct": false },
      { "text": "Tra una S.p.A. ed una S.p.A. in liquidazione che ha iniziato la distribuzione dell'attivo", "correct": true }
    ],
    "info": "Se la liquidazione è in fase avanzata (distribuzione dell'attivo), la fusione è vietata."
  },
  {
    "q": "4 Ai sensi dell'art. 2501 quinques c.c., l'organo amministrativo delle società partecipanti alla fusione deve predisporre una relazione:",
    "options": [
      { "text": "Che illustri esclusivamente sotto il profilo economico il progetto di fusione", "correct": false },
      { "text": "Che illustri esclusivamente sotto il profilo giuridico il progetto di fusione", "correct": false },
      { "text": "Che illustri esclusivamente il rapporto di cambio delle azioni o delle quote", "correct": false },
      { "text": "Che illustri e giustifichi, sotto il profilo giuridico ed economico, il progetto di fusione ed in particolare il rapporto di cambio", "correct": true }
    ],
    "info": "La relazione deve giustificare la congruità del rapporto di cambio."
  },
  {
    "q": "5 Il progetto di fusione è redatto:",
    "options": [
      { "text": "Dagli amministratori", "correct": true },
      { "text": "Dai liquidatori", "correct": false },
      { "text": "Dai sindaci", "correct": false },
      { "text": "Dal revisore dei conti", "correct": false }
    ],
    "info": "È un atto di gestione tipico degli organi amministrativi."
  },
  {
    "q": "6 La decisione di fusione:",
    "options": [
      { "text": "Può apportare al progetto di fusione qualsiasi modifica", "correct": false },
      { "text": "Può apportare al progetto di fusione qualsiasi modifica, purchè non incida sul diritto dei soci", "correct": false },
      { "text": "Può apportare al progetto di fusione qualsiasi modifica, purchè non incida sul diritto dei terzi", "correct": false },
      { "text": "Può apportare al progetto di fusione qualsiasi modifica, purchè non incida sul diritto dei soci e dei terzi", "correct": true }
    ],
    "info": "Le modifiche sono possibili solo se non ledono diritti preesistenti."
  },
  {
    "q": "7 La fusione può essere attuata trascorsi:",
    "options": [
      { "text": "Quindici giorni dall'ultima formalità pubblicitaria adempiuta", "correct": false },
      { "text": "Trenta giorni dall'ultima formalità pubblicitaria adempiuta", "correct": false },
      { "text": "Sessanta giorni dall'ultima formalità pubblicitaria adempiuta", "correct": true },
      { "text": "Novanta giorni dall'ultima formalità pubblicitaria adempiuta", "correct": false }
    ],
    "info": "Il termine di 60 giorni è previsto per l'opposizione dei creditori."
  },
  {
    "q": "8 L'atto di fusione:",
    "options": [
      { "text": "Può risultare da scrittura privata", "correct": false },
      { "text": "Può assumere la forma verbale", "correct": false },
      { "text": "Può assumere esclusivamente la forma di atto pubblico", "correct": true },
      { "text": "Può assumere sia la forma di atto pubblico, sia la forma di scrittura privata", "correct": false }
    ],
    "info": "L'atto di fusione richiede la forma dell'atto pubblico per l'iscrizione nel Registro delle Imprese."
  },
  {
    "q": "9 Con la scissione:",
    "options": [
      { "text": "Una società assegna l'intero suo patrimonio ad una o più società esclusivamente se preesistenti", "correct": false },
      { "text": "Una società assegna l'intero suo patrimonio ad una o più società esclusivamente se di nuova costituzione", "correct": false },
      { "text": "Una società assegna l'intero suo patrimonio a più società di nuova costituzione o preesistenti", "correct": false },
      { "text": "Una società assegna l'intero suo patrimonio a più società di nuova costituzione o preesistenti oppure parte del patrimonio ad una società", "correct": true }
    ],
    "info": "La scissione può essere totale o parziale."
  },
  {
    "q": "10 La partecipazione alla scissione:",
    "options": [
      { "text": "E' consentita alle società in liquidazione che abbiano iniziato la distribuzione dell'attivo", "correct": false },
      { "text": "E' sempre esclusa dalla legge alle società in liquidazione", "correct": false },
      { "text": "E' consentita alle società in liquidazione che non abbiano iniziato la distribuzione dell'attivo", "correct": true },
      { "text": "E' consentita alle società in liquidazione che non abbiano terminato la distribuzione dell'attivo", "correct": false }
    ],
    "info": "Analogamente alla fusione, se la liquidazione è in fase di riparto, la scissione non è ammessa."
  },
  {
    "q": "1 Il modello s.r.l. è stato, per la prima volta, soggetto a codificazione nel:",
    "options": [
      { "text": "1942", "correct": true },
      { "text": "1947", "correct": false },
      { "text": "1966", "correct": false },
      { "text": "1973", "correct": false }
    ],
    "info": "Il Codice Civile del 1942 ha introdotto il modello della Società a Responsabilità Limitata."
  },
  {
    "q": "2 La s.r.l., tradizionalmente, vedeva la propria disciplina strutturarsi per il tramite rinvii:",
    "options": [
      { "text": "Alla s.a.p.a", "correct": false },
      { "text": "Alla s.a.s", "correct": false },
      { "text": "Alla s.s", "correct": false },
      { "text": "Alla s.p.a", "correct": true }
    ],
    "info": "Storicamente, la disciplina della S.r.l. era in gran parte modellata su quella della S.p.A."
  },
  {
    "q": "3 Il modello societario s.r.l. è, da sempre, connotato da:",
    "options": [
      { "text": "Responsabilità illimitata, divisione interna dei poteri e partecipazioni non incorporate in azioni", "correct": false },
      { "text": "Responsabilità limitata e concentrazione dei poteri in capo all'organo amministrativo", "correct": false },
      { "text": "Responsabilità limitata, divisione interna dei poteri e partecipazioni non incorporate in azioni", "correct": true },
      { "text": "Responsabilità limitata, divisione interna dei poteri e partecipazioni incorporate in azioni", "correct": false }
    ],
    "info": "La S.r.l. si distingue per il divieto di emissione di azioni."
  },
  {
    "q": "4 La Legge delega per la riforma del diritto delle società di capitali ha come proprie direttive di fondo:",
    "options": [
      { "text": "La creazione di un autonomo ed organico corpus normativo teso alla valorizzazione del potere gestorio", "correct": false },
      { "text": "La creazione di un autonomo ed organico corpus normativo teso alla valorizzazione della figura del socio e alla flessibilizzazione dello schema societario", "correct": true },
      { "text": "La creazione di un autonomo ed organico corpus normativo teso alla valorizzazione della figura del socio e all'irrigidimento dello schema societario", "correct": false },
      { "text": "La creazione di un succedaneo corpus normativo rispetto ai modelli azionari", "correct": false }
    ],
    "info": "La riforma del 2003 ha valorizzato l'autonomia statutaria nella S.r.l."
  },
  {
    "q": "5 Nel modello s.r.l. l'autonomia dei privati:",
    "options": [
      { "text": "Non incontra limitazioni", "correct": false },
      { "text": "Non può incidere sulle norme che costituiscono presupposto per la limitazione della responsabilità", "correct": true },
      { "text": "Incontra gli stessi limiti che incontrerebbe nel modello s.p.a", "correct": false },
      { "text": "Non può intaccare i profili di cui si occupa il diritto positivo", "correct": false }
    ],
    "info": "La limitazione della responsabilità è un dogma inderogabile."
  },
  {
    "q": "6 Le lacune normative che si ravvisano in materia:",
    "options": [
      { "text": "Non possono essere colmate perché tale attività è sottratta all'autonomia privata", "correct": false },
      { "text": "Non possono essere colmate dai soci", "correct": false },
      { "text": "Possono essere colmate dai soci i quali vi possono provvedere modulando l'atto costitutivo e ove non lo facciano sarà compito dell'interprete porvi rimedio", "correct": true },
      { "text": "Possono essere colmate dai soci i quali vi possono provvedere modulando l'atto costitutivo e ove non lo facciano perderanno la possibilità di modificare tale documento", "correct": false }
    ],
    "info": "L'autonomia statutaria è il primo strumento per colmare eventuali lacune."
  },
  {
    "q": "7 Nella s.r.l. l'atto costitutivo deve, di necessità, contenere le regole di organizzazione interna dell'ente:",
    "options": [
      { "text": "Purché vi si provveda obbligatoriamente con due documenti distinti", "correct": false },
      { "text": "Vi si può provvedere anche con un unico documento", "correct": false },
      { "text": "Non si ravvisa tale necessità perché potrà essere oggetto di specifica attività da parte dell'organo di controllo", "correct": true },
      { "text": "Non si ravvisa tale necessità perché potrà essere oggetto di specifica attività da parte dell'organo gestorio", "correct": false }
    ],
    "info": "La flessibilità organizzativa è una caratteristica distintiva della S.r.l. (Nota: risposta basata sulla selezione indicata)."
  },
  {
    "q": "8 Nel modello s.r.l. odierno i limiti minimi di capitale sociale ammontano a:",
    "options": [
      { "text": "1 Euro", "correct": true },
      { "text": "10.000 Euro", "correct": false },
      { "text": "3.000 Euro", "correct": false },
      { "text": "50.000 Euro", "correct": false }
    ],
    "info": "La S.r.l. semplificata consente la costituzione con un capitale sociale da 1 a 9.999 euro."
  },
  {
    "q": "9 La s.r.l. acquista personalità giuridica:",
    "options": [
      { "text": "Con la stipulazione dell'atto costitutivo a cura del notaio", "correct": false },
      { "text": "Con la sottoscrizione dell'atto costitutivo da parte dell'ultimo socio", "correct": false },
      { "text": "In esito al controllo giudiziario", "correct": false },
      { "text": "In esito all'iscrizione nel Registro delle imprese", "correct": true }
    ],
    "info": "L'iscrizione nel Registro delle Imprese ha efficacia costitutiva."
  },
  {
    "q": "10 L'atto costitutivo di s.r.l. deve avere la forma:",
    "options": [
      { "text": "Della scrittura privata semplice", "correct": false },
      { "text": "Della scrittura privata autenticata", "correct": false },
      { "text": "Della scrittura privata con sottoscrizioni giudizialmente accertate", "correct": false },
      { "text": "Dell'atto pubblico", "correct": true }
    ],
    "info": "L'atto costitutivo deve essere redatto per atto pubblico (art. 2463 c.c.)."
  },
  {
    "q": "1 La lettera dell'art. 2464 c.c. evoca:",
    "options": [
      { "text": "La formulazione della I Direttiva CE", "correct": false },
      { "text": "La formulazione della III Direttiva CE", "correct": false },
      { "text": "La formulazione della II Direttiva CE", "correct": true },
      { "text": "La disciplina dei modelli azionari", "correct": false }
    ],
    "info": "La disciplina dei conferimenti riflette le direttive comunitarie in materia di società."
  },
  {
    "q": "2 Per \"conferimento\" s'intende:",
    "options": [
      { "text": "Il contributo del socio alla formazione del patrimonio della società in corrispettivo del quale egli riceve una quota di partecipazione alla medesima", "correct": true },
      { "text": "L'apporto di risorse finanziarie connotate dall'obbligo di restituzione", "correct": false },
      { "text": "L'apporto di risorse finanziarie che, pur non essendo connotate dall'obbligo di restituzione, non vengano capitalizzate", "correct": false },
      { "text": "L'apporto di risorse finanziarie che, pur essendo connotate dall'obbligo di restituzione, vengano capitalizzate", "correct": false }
    ],
    "info": "Il conferimento è l'apporto che dà diritto alla qualità di socio."
  },
  {
    "q": "3 Nella s.r.l. il denaro è conferibile:",
    "options": [
      { "text": "Sempre", "correct": true },
      { "text": "Mai", "correct": false },
      { "text": "Solo se vi sia un'apposita previsione statutaria", "correct": false },
      { "text": "Solo nel caso in cui a ciò consenta l'organo amministrativo", "correct": false }
    ],
    "info": "Il conferimento in denaro è il metodo base di finanziamento del capitale."
  },
  {
    "q": "4 Nell'ipotesi di conferimento in denaro, al tempo della sottoscrizione, occorre versare:",
    "options": [
      { "text": "Tutto il capitale sottoscritto", "correct": false },
      { "text": "Nulla", "correct": false },
      { "text": "Solo il 25% di quanto sottoscritto", "correct": true },
      { "text": "Solo il 50 % di quanto sottoscritto", "correct": false }
    ],
    "info": "Art. 2464 c.c.: al momento della sottoscrizione deve essere versato almeno il 25%."
  },
  {
    "q": "5 Il conferimento in natura deve essere:",
    "options": [
      { "text": "Integralmente liberato al momento della sottoscrizione", "correct": true },
      { "text": "Parzialmente liberato al momento della sottoscrizione", "correct": false },
      { "text": "Liberato al momento dell'iscrizione della società presso il Registro delle imprese", "correct": false },
      { "text": "Liberato, in toto, in un momento successivo alla sottoscrizione", "correct": false }
    ],
    "info": "A differenza del denaro, il conferimento in natura deve essere integralmente liberato subito."
  },
  {
    "q": "6 Nella s.r.l. l'opera e/o i servizi:",
    "options": [
      { "text": "Sono sempre conferibili con le modalità previste dalla legge", "correct": true },
      { "text": "Non sono mai conferibili", "correct": false },
      { "text": "Sono conferibili solo se sussiste l'assenso dell'organo amministrativo", "correct": false },
      { "text": "Sono conferibili in analogia a quanto accade nei modelli azionari", "correct": false }
    ],
    "info": "La S.r.l. è l'unico modello societario che ammette esplicitamente il conferimento d'opera, garantito da polizza assicurativa o fideiussione."
  },
  {
    "q": "7 Nell'ipotesi di conferimento in natura è possibile, per gli amministratori, revisionare la stima:",
    "options": [
      { "text": "Mai", "correct": false },
      { "text": "Sempre", "correct": false },
      { "text": "Lo possono fare seguendo, via analogica, il procedimento disciplinato per la s.p.a", "correct": false },
      { "text": "Lo possono fare in ossequio al generale principio di correttezza e diligenza nella gestione", "correct": true }
    ],
    "info": "Gli amministratori sono responsabili della correttezza della stima."
  },
  {
    "q": "8 Per \"finanziamento\" s'intende:",
    "options": [
      { "text": "Il contributo del socio alla formazione del patrimonio della società", "correct": false },
      { "text": "L'apporto di risorse finanziarie connotate dall'obbligo di restituzione", "correct": true },
      { "text": "L'apporto di risorse finanziarie che, pur non essendo connotate dall'obbligo di restituzione, non vengano capitalizzate", "correct": false },
      { "text": "L'apporto di risorse finanziarie che, pur essendo connotate dall'obbligo di restituzione, vengano capitalizzate", "correct": false }
    ],
    "info": "Il finanziamento è un debito della società verso il socio, non un conferimento al capitale."
  },
  {
    "q": "9 In caso di rimborso di finanziamenti c.d. critici ai soci eroganti la società può:",
    "options": [
      { "text": "Agire ex art. 2036", "correct": false },
      { "text": "Agire ex art. 2041", "correct": false },
      { "text": "Agire ex art. 2033", "correct": true },
      { "text": "Agire ex art. 1218", "correct": false }
    ],
    "info": "L'art. 2467 c.c. prevede che il rimborso avvenuto nell'anno precedente la dichiarazione di fallimento debba essere restituito (azione di ripetizione)."
  },
  {
    "q": "10 I soci finanziatori, nel caso indicato dall'art. 2467 c.c., sono:",
    "options": [
      { "text": "Anteposti nel rimborso ai creditori sociali", "correct": false },
      { "text": "Posposti nel rimborso ai creditori sociali", "correct": true },
      { "text": "Rimborsati in via concorsuale con i medesimi", "correct": false },
      { "text": "Deprivati del diritto alla rimborso", "correct": false }
    ],
    "info": "Il finanziamento postergato subisce il rischio d'impresa similmente al capitale."
  },
  {
    "q": "1 La quota di s.r.l. compendia:",
    "options": [
      { "text": "Solo diritti amministrativi", "correct": false },
      { "text": "Solo diritti patrimoniali", "correct": false },
      { "text": "Diritti amministrativi e patrimoniali", "correct": false },
      { "text": "Diritti amministrativi, patrimoniali e c.d. diritti complessi", "correct": true }
    ],
    "info": "La partecipazione sociale è un fascio unitario di diritti."
  },
  {
    "q": "2 Le quote di s.r.l.:",
    "options": [
      { "text": "Sono incorporate in titoli di credito al portatore", "correct": false },
      { "text": "Non sono incorporate in titoli", "correct": true },
      { "text": "Sono incorporate in titoli di legittimazione", "correct": false },
      { "text": "Sono incorporate in titoli di credito nominativi", "correct": false }
    ],
    "info": "La circolazione delle quote S.r.l. avviene tramite atto notarile o scrittura privata autenticata, non tramite titoli di credito."
  },
  {
    "q": "3 La deroga al rapporto proporzionale corrente, di regola, tra peso sociale e ammontare del conferimento:",
    "options": [
      { "text": "È ammissibile", "correct": false },
      { "text": "Non è ammissibile", "correct": false },
      { "text": "È ammissibile solo quando concordino, al riguardo, tutti gli organi di cui la società si compone", "correct": false },
      { "text": "È ammissibile tutte le volte in cui i soci abbiano così previsto nello statuto", "correct": true }
    ],
    "info": "L'autonomia statutaria nella S.r.l. permette di dissociare partecipazione e conferimento."
  },
  {
    "q": "4 Nella s.r.l. l'attribuzione di particolari diritti ai soci è:",
    "options": [
      { "text": "Ammessa dalla legge", "correct": true },
      { "text": "Vietata dalla legge", "correct": false },
      { "text": "È ammessa dalla legge purché vi sia l'assenso dell'organo di controllo", "correct": false },
      { "text": "È ammessa dalla legge purché vi sia l'assenso dell'organo gestorio", "correct": false }
    ]
  },
  {
    "q": "5 I particolari diritti possono riguardare:",
    "options": [
      { "text": "Solo le materie indicate dalla legge", "correct": false },
      { "text": "Tutto quello che soci desiderano nel rispetto, però, degli inderogabili principi che governano il sistema", "correct": true },
      { "text": "Solo diritti a contenuto economico", "correct": false },
      { "text": "Solo diritti a contenuto amministrativo", "correct": false }
    ]
  },
  {
    "q": "6 I diritti particolari possono spettare:",
    "options": [
      { "text": "Solo ai soci", "correct": true },
      { "text": "Ai soci ed ai terzi", "correct": false },
      { "text": "Solo ai terzi", "correct": false },
      { "text": "Solo a particolari categorie di soci o terzi", "correct": false }
    ]
  },
  {
    "q": "7 Nel caso in cui venga ceduta l'intera quota di un soggetto, titolare di particolari diritti, questi ultimi:",
    "options": [
      { "text": "Si estinguono", "correct": true },
      { "text": "Si appuntano in capo all'acquirente", "correct": false },
      { "text": "Permangono in capo al cedente", "correct": false },
      { "text": "Permangono in capo all'originario socio posto che la sua quota è totalmente intrasferibile", "correct": false }
    ]
  },
  {
    "q": "8 La quota di s.r.l.:",
    "options": [
      { "text": "È divisibile", "correct": true },
      { "text": "Non è divisibile", "correct": false },
      { "text": "Per stabilirlo occorre guardare alle regole che informano le azioni", "correct": false },
      { "text": "Per stabilirlo occorre guardare alle regole che informano le partecipazioni ai modelli personalistici", "correct": false }
    ]
  },
  {
    "q": "9 Nel caso di comproprietà sulla quota di s.r.l. i diritti sociali:",
    "options": [
      { "text": "Possono essere esercitati dai comproprietari disgiuntamente l'uno dall'altro", "correct": false },
      { "text": "Possono essere esercitati dai comproprietari solo insieme", "correct": false },
      { "text": "Sono esercitati da un rappresentante comune che potrà essere anche uno dei comproprietari", "correct": true },
      { "text": "Sono esercitati da un rappresentante comune che potrà essere solo un soggetto terzo", "correct": false }
    ]
  },
  {
    "q": "10 Qual è, nell'opinione oggi maggioritaria in dottrina, la natura giuridica della quota di s.r.l.:",
    "options": [
      { "text": "Posizione contrattuale", "correct": false },
      { "text": "Diritto di credito", "correct": false },
      { "text": "Bene mobile immateriale", "correct": true },
      { "text": "Bene immobile", "correct": false }
    ]
  },
  {
    "q": "1 Nel modello s.r.l. il principio generale in materia trasferimento delle partecipazioni è:",
    "options": [
      { "text": "La libera circolazione", "correct": true },
      { "text": "Il divieto di circolazione", "correct": false },
      { "text": "La circolazione limitata dallo statuto", "correct": false },
      { "text": "La circolazione limitata espressamente dalla legge", "correct": false }
    ]
  },
  {
    "q": "2 L'autonomia dei soci:",
    "options": [
      { "text": "Non può mai derogare al principio di libera circolazione", "correct": false },
      { "text": "Può sempre derogare al principio di libera circolazione", "correct": true },
      { "text": "Può derogare al principio di libera circolazione solo nei casi previsti dalla legge", "correct": false },
      { "text": "Non può derogare al principio di libera circolazione se non con il consenso dell'organo amministrativo", "correct": false }
    ]
  },
  {
    "q": "3 Lo strumento di tutela posto dall'ordinamento contro le forme più pregnanti della deroga alla libera circolarità delle partecipazioni è:",
    "options": [
      { "text": "L'azione di annullamento", "correct": false },
      { "text": "L'azione di nullità", "correct": false },
      { "text": "La tutela risarcitoria", "correct": false },
      { "text": "L'esercizio del diritto di recesso", "correct": true }
    ]
  },
  {
    "q": "4 Il diritto di recesso:",
    "options": [
      { "text": "Può essere esperito in tutte le ipotesi in cui vengano individuati statutariamente limiti alla circolazione", "correct": false },
      { "text": "Non può mai essere esperito nelle ipotesi in cui vengano individuati statutariamente limiti alla circolazione", "correct": false },
      { "text": "Può essere esperito nei limiti di cui all'art. 2469, comma 2°, c.c", "correct": true },
      { "text": "Può essere esperito nei limiti di cui all'art. 2437 c.c", "correct": false }
    ]
  },
  {
    "q": "5 La clausola di prelazione societaria è:",
    "options": [
      { "text": "Inammissibile in via interpretativa", "correct": false },
      { "text": "Sempre ammissibile", "correct": true },
      { "text": "Ammissibile solo nei limiti espressamente fissati dalla legge", "correct": false },
      { "text": "Inammissibile per espresso divieto di legge", "correct": false }
    ]
  },
  {
    "q": "6 La 'parità di condizioni' è un requisito essenziale della:",
    "options": [
      { "text": "Clausola di prelazione propria", "correct": true },
      { "text": "Clausola di prelazione impropria", "correct": false },
      { "text": "Clausola di prelazione propria a prezzo amministrato", "correct": false },
      { "text": "Clausola di prelazione impura", "correct": false }
    ]
  },
  {
    "q": "7 Nel modello s.r.l. il divieto assoluto di cessione delle partecipazioni è:",
    "options": [
      { "text": "Inammissibile in via interpretativa", "correct": false },
      { "text": "Sempre ammissibile in quanto contemperato dal diritto di recesso", "correct": true },
      { "text": "Ammissibile solo previo parere conforme dell'autorità giudiziaria", "correct": false },
      { "text": "Inammissibile per espresso divieto di legge", "correct": false }
    ]
  },
  {
    "q": "8 Nel modello s.r.l. il gradimento rispetto all'ingresso di nuovi soci in società:",
    "options": [
      { "text": "Può essere solo mero", "correct": false },
      { "text": "Può essere mero oppure non mero", "correct": true },
      { "text": "Può essere solo non mero", "correct": false },
      { "text": "Non può essere espresso", "correct": false }
    ]
  },
  {
    "q": "9 In caso di clausole limitative alla circolazione, il recesso non può essere esercitato prima di un termine non superiore a:",
    "options": [
      { "text": "2 anni", "correct": true },
      { "text": "3 anni", "correct": false },
      { "text": "6 mesi", "correct": false },
      { "text": "1 anno", "correct": false }
    ]
  },
  {
    "q": "10 La previsione di un obbligo statutario di motivazione al rifiuto del gradimento:",
    "options": [
      { "text": "Rende sempre il medesimo non mero", "correct": false },
      { "text": "Continua a farlo rimanere mero", "correct": true },
      { "text": "Non è ammissibile", "correct": false },
      { "text": "È ammissibile solo se debba esprimerlo un organo sociale", "correct": false }
    ]
  },
  {
    "q": "1 L'atto di trasferimento quote nel progetto Vivante doveva avere la forma di:",
    "options": [
      { "text": "Scrittura privata autenticata", "correct": false },
      { "text": "Atto pubblico", "correct": true },
      { "text": "Scrittura privata con sottoscrizioni giudizialmente accertate", "correct": false },
      { "text": "Scrittura privata semplice", "correct": false }
    ]
  },
  {
    "q": "2 L'atto di trasferimento quote nel progetto Asquini doveva avere la forma di:",
    "options": [
      { "text": "Scrittura privata autenticata", "correct": false },
      { "text": "Scrittura privata semplice", "correct": false },
      { "text": "Scrittura privata con sottoscrizioni giudizialmente accertate", "correct": false },
      { "text": "Atto pubblico", "correct": true }
    ]
  },
  {
    "q": "3 Per i predetti progetti di codice di commercio era necessario procedere all'espletamento:",
    "options": [
      { "text": "Solo dell'iscrizione nel Registro di Commercio", "correct": false },
      { "text": "Solo della trascrizione presso i Registri immobiliari", "correct": false },
      { "text": "Dell'iscrizione nel libro soci e nel Registro di commercio", "correct": true },
      { "text": "Solo dell'iscrizione nel libro dei soci", "correct": false }
    ]
  },
  {
    "q": "4 Il negozio di cessione delle partecipazioni é:",
    "options": [
      { "text": "Un procedimento", "correct": true },
      { "text": "Una fattispecie incompleta", "correct": false },
      { "text": "Una fattispecie istantanea", "correct": false },
      { "text": "Una fattispecie prenegoziale", "correct": false }
    ]
  },
  {
    "q": "5 L'atto di cessione delle partecipazioni sociali, dopo il 1993, deve rivestire la forma:",
    "options": [
      { "text": "Della scrittura privata autenticata", "correct": true },
      { "text": "Dell'atto pubblico", "correct": false },
      { "text": "Della scrittura privata con sottoscrizioni giudizialmente accertate", "correct": false },
      { "text": "Della scrittura privata semplice", "correct": false }
    ]
  },
  {
    "q": "6 La formalità iscrizionale che assiste l'atto di cessione:",
    "options": [
      { "text": "È un requisito di validità della fattispecie", "correct": false },
      { "text": "È un requisito di efficacia interna della fattispecie", "correct": false },
      { "text": "È un requisito di efficacia esterna della fattispecie", "correct": false },
      { "text": "Non incide sulla validità e sull'efficacia della fattispecie", "correct": true }
    ]
  },
  {
    "q": "7 Dopo il 2008 il trasferimento delle partecipazioni sociali di s.r.l.:",
    "options": [
      { "text": "Necessita dell'intervento del notaio per curare le formalità pubblicitarie", "correct": false },
      { "text": "Non necessita più dell'intervento del notaio", "correct": true },
      { "text": "Necessita dell'intervento del notaio ai fini della validità della negoziazione", "correct": false },
      { "text": "Necessita dell'intervento del notaio ai fini della efficacia della negoziazione", "correct": false }
    ]
  },
  {
    "q": "8 Nel caso in cui circoli una partecipazione non ancora interamente liberata, per i centesimi ancora dovuti:",
    "options": [
      { "text": "Sono responsabili, in solido, l'acquirente e il venditore", "correct": true },
      { "text": "È responsabile solo il venditore", "correct": false },
      { "text": "È responsabile solo l'acquirente", "correct": false },
      { "text": "Non è responsabile ne l'acquirente ne il venditore", "correct": false }
    ]
  },
  {
    "q": "9 Il libro soci, nella s.r.l., a partire dal 2009:",
    "options": [
      { "text": "Non è più obbligatorio", "correct": true },
      { "text": "È diventato obbligatorio", "correct": false },
      { "text": "È diventato facoltativo nel senso che la scelta in merito alla sua adozione è rimessa all'organo amministrativo", "correct": false },
      { "text": "È diventato facoltativo nel senso che la scelta in merito alla sua adozione è rimessa all'organo di controllo", "correct": false }
    ]
  },
  {
    "q": "10 Il libro soci può, dopo il 2009, essere nella s.r.l.:",
    "options": [
      { "text": "Soppresso dai soci", "correct": false },
      { "text": "Ripristinato dai soci", "correct": true },
      { "text": "Modificato dai soci", "correct": false },
      { "text": "Parzialmente escluso dai soci", "correct": false }
    ]
  },
  {
    "q": "1 Prima del 2003 il conflitto sorto tra più acquirenti della medesima quota si risolveva:",
    "options": [
      { "text": "Secondo le regole della trascrizione", "correct": false },
      { "text": "Secondo le regole fissate dall'art. 1153", "correct": false },
      { "text": "Applicando il principio prior in tempore potior in iure", "correct": true },
      { "text": "Secondo l'ordine di iscrizione presso il Registro delle Imprese", "correct": false }
    ]
  },
  {
    "q": "2 Dopo il 2003 il conflitto sorto tra più acquirenti della medesima quota si risolve:",
    "options": [
      { "text": "Secondo le regole della trascrizione", "correct": false },
      { "text": "Secondo le regole fissate dall'art. 1153", "correct": false },
      { "text": "Applicando il principio prior in tempore potior in iure", "correct": false },
      { "text": "Secondo l'ordine di iscrizione presso il Registro delle Imprese corroborato dal requisito della buona fede", "correct": true }
    ]
  },
  {
    "q": "3 Il requisito della buona fede:",
    "options": [
      { "text": "Deve permanere durante tutto il procedimento in cui si articola il trasferimento delle quote", "correct": false },
      { "text": "Non è richiesto nel procedimento in cui si articola il trasferimento delle quote", "correct": false },
      { "text": "È sufficiente che sussista al tempo dell'acquisto", "correct": true },
      { "text": "È sufficiente che sussista al tempo dell'espletamento della formalità iscrizionale", "correct": false }
    ]
  },
  {
    "q": "4 Le quote di s.r.l.:",
    "options": [
      { "text": "Possono essere sempre oggetto di pegno", "correct": true },
      { "text": "Non possono mai essere oggetto di pegno", "correct": false },
      { "text": "Non possono essere oggetto di garanzie reali", "correct": false },
      { "text": "Possono essere oggetto di pegno solo previa autorizzazione giudiziale", "correct": false }
    ]
  },
  {
    "q": "5 In caso di quote soggette a pegno il diritto di voto in assemblea è esercitato:",
    "options": [
      { "text": "Dal creditore pignoratizio", "correct": true },
      { "text": "Dal socio", "correct": false },
      { "text": "Dal creditore pignoratizio unitamente al socio", "correct": false },
      { "text": "Da un soggetto terzo a ciò legittimato da giudice", "correct": false }
    ]
  },
  {
    "q": "6 Le quote di s.r.l. possono essere:",
    "options": [
      { "text": "Non possono essere mai oggetto di usufrutto", "correct": false },
      { "text": "Possono sempre essere oggetto di usufrutto", "correct": true },
      { "text": "Non possono essere mai oggetto di diritti reali parziari", "correct": false },
      { "text": "Possono essere oggetto di usufrutto solo previa autorizzazione dell'organo amministrativo", "correct": false }
    ]
  },
  {
    "q": "7 In caso di quote soggette ad usufrutto il diritto di voto in assemblea è esercitato:",
    "options": [
      { "text": "Dal socio nudo proprietario", "correct": false },
      { "text": "Dal socio nudo proprietario unitamente all'usufruttuario", "correct": false },
      { "text": "Dall'usufruttuario", "correct": true },
      { "text": "Da un soggetto terzo a ciò legittimato da giudice", "correct": false }
    ]
  },
  {
    "q": "8 L'art. 2474 c.c.:",
    "options": [
      { "text": "Consente alla s.r.l. di acquistare o ricevere in garanzia proprie partecipazioni", "correct": false },
      { "text": "Vieta alla s.r.l. di acquistare o ricevere in garanzia proprie partecipazioni", "correct": true },
      { "text": "Dà applicazione analogica alle regole dettate per le s.p.a", "correct": false },
      { "text": "Rimette la scelta in merito all'acquisto di partecipazioni proprie o l'assunzione in garanzia delle medesime alla compagine sociale", "correct": false }
    ]
  },
  {
    "q": "9 L'espropriazione parziale della quota:",
    "options": [
      { "text": "È ammissibile", "correct": true },
      { "text": "Non è ammissibile", "correct": false },
      { "text": "È vietata espressamente dalla legge", "correct": false },
      { "text": "Necessita del consenso dell'organo di controllo", "correct": false }
    ]
  },
  {
    "q": "10 Gli effetti della procedura di espropriazione si realizzano, determinando l'inefficacia degli atti posti in essere in suo spregio,:",
    "options": [
      { "text": "A partire dalla notificazione al debitore del pignoramento", "correct": true },
      { "text": "A partire dalla notificazione del pignoramento alla società", "correct": false },
      { "text": "A partire dall'iscrizione presso il Registro delle imprese del pignoramento", "correct": false },
      { "text": "A partire dal deposito presso il Registro delle imprese del pignoramento", "correct": false }
    ]
  },
  {
    "q": "1 Le cause di recesso, prima della legge di riforma del 2003:",
    "options": [
      { "text": "Erano modellabili dall'autonomia privata", "correct": false },
      { "text": "Erano solo in parte modellabili dall'autonomia privata", "correct": false },
      { "text": "Non erano modellabili dall'autonomia privata", "correct": true },
      { "text": "Serviva il parere dell'organo di controllo per modellarle", "correct": false }
    ]
  },
  {
    "q": "2 Le cause di recesso, dopo la legge di riforma del 2003:",
    "options": [
      { "text": "Sono modellabili dall'autonomia privata", "correct": true },
      { "text": "Sono solo in parte modellabili dall'autonomia privata", "correct": false },
      { "text": "Non sono modellabili dall'autonomia privata", "correct": false },
      { "text": "Continua a servire il parere dell'organo di controllo per modificarle", "correct": false }
    ]
  },
  {
    "q": "3 In esito alla legge di riforma del 2003 le cause legali di recesso:",
    "options": [
      { "text": "Sono diminuite", "correct": false },
      { "text": "Il loro numero è rimasto invariato", "correct": false },
      { "text": "Sono aumentate", "correct": true },
      { "text": "Hanno assunto analoga portata rispetto al modello s.p.a", "correct": false }
    ]
  },
  {
    "q": "4 Il recesso per 'generica giusta causa':",
    "options": [
      { "text": "Non è mai ammissibile", "correct": false },
      { "text": "È ammissibile perché è espressamente prevista dalla legge tale possibilità", "correct": false },
      { "text": "È ammissibile perché tale possibilità potrebbe essere ricavata, in via interpretativa, dalla differente formulazione letterale rispetto alla norma sulle s.p.a", "correct": true },
      { "text": "Non è ammissibile perché è espressamente vietata dalla legge tale possibilità", "correct": false }
    ]
  },
  {
    "q": "5 Il recesso ad nutum:",
    "options": [
      { "text": "è ammissibile perché tale possibilità potrebbe essere ricavata, in via interpretativa, dalla differente formulazione letterale rispetto alla norma sulle s.p.a", "correct": false },
      { "text": "Non è ammissibile perché è espressamente vietata dalla legge tale possibilità", "correct": false },
      { "text": "Non è mai ammissibile", "correct": true },
      { "text": "È ammissibile perché è espressamente prevista dalla legge tale possibilità", "correct": false }
    ]
  },
  {
    "q": "6 Il correttivo, previsto dal Legislatore, per il caso in cui si receda da una società senza termina di durata:",
    "options": [
      { "text": "è il preavviso di 180 gg", "correct": true },
      { "text": "è il preavviso di 90 gg", "correct": false },
      { "text": "Non esiste", "correct": false },
      { "text": "È il risarcimento del danno", "correct": false }
    ]
  },
  {
    "q": "7 Nel modello s.r.l. scissione e fusione:",
    "options": [
      { "text": "Sono cause di recesso previste dal Legislatore in modo espresso", "correct": true },
      { "text": "Non sono cause di recesso", "correct": false },
      { "text": "Sono cause di recesso ricavate, in via analogica, dalla disciplina delle s.p.a", "correct": false },
      { "text": "Sono cause di recesso ricavate, in via analogica, dalla disciplina delle società di persone", "correct": false }
    ]
  },
  {
    "q": "8 Se lo statuto nulla prevede circa le modalità e i termini di esercizio del recesso:",
    "options": [
      { "text": "Si applicano le norme previste in tema di s.p.a", "correct": true },
      { "text": "Si applicano le norme previste in tema di s.n.c", "correct": false },
      { "text": "Non sarà possibile esercitare il recesso", "correct": false },
      { "text": "I soci dovranno adire il giudice per colmare tale lacuna", "correct": false }
    ]
  },
  {
    "q": "9 Il recesso può dirsi efficace:",
    "options": [
      { "text": "Nel momento in cui risulti conoscibile per la società", "correct": true },
      { "text": "Solo in esito alla conclusione della procedura di liquidazione della quota al socio receduto", "correct": false },
      { "text": "Solo una volta che siano scaduti i termini per la revoca della delibera che lo abbia legittimato", "correct": false },
      { "text": "Quando ne sia data notizia all'organo amministrativo", "correct": false }
    ]
  },
  {
    "q": "10 Il recesso parziale:",
    "options": [
      { "text": "Non è ammissibile perché la quota è indivisibile", "correct": false },
      { "text": "È ammissibile", "correct": false },
      { "text": "Non è ammissibile", "correct": false },
      { "text": "È ammissibile a condizione che sia previsto dall'atto costitutivo", "correct": true }
    ]
  },
  {
    "q": "1 Il cambiamento dell'oggetto sociale:",
    "options": [
      { "text": "Da sempre diritto di recedere", "correct": false },
      { "text": "Non da diritto di recedere salvo che sussista una clausola statutaria sul punto", "correct": false },
      { "text": "Da diritto di recedere solo quando è significativo", "correct": true },
      { "text": "Non da mai diritto di recedere", "correct": false }
    ]
  },
  {
    "q": "2 La fusione o la scissione della società:",
    "options": [
      { "text": "Danno sempre diritto di recedere", "correct": true },
      { "text": "Non danno diritto di recedere salvo che sussista una clausola statutaria sul punto", "correct": false },
      { "text": "Danno diritto di recedere solo quando alterino significativamente l'organizzazione sociale", "correct": false },
      { "text": "Non da mai diritto di recedere", "correct": false }
    ]
  },
  {
    "q": "3 Il trasferimento della sede sociale all'estero:",
    "options": [
      { "text": "Non da mai diritto di recedere", "correct": false },
      { "text": "Non da diritto di recedere se interviene all'interno della U.E", "correct": false },
      { "text": "Da diritto di recedere solo quando lo statuto lo preveda espressamente", "correct": false },
      { "text": "Da sempre diritto di recedere", "correct": true }
    ]
  },
  {
    "q": "4 I soci contrari all'assunzione della delibera che legittima il recesso:",
    "options": [
      { "text": "Possono esercitare sempre tale diritto", "correct": true },
      { "text": "Non possono esercitare mai tale diritto", "correct": false },
      { "text": "Posso esercitare tale diritto solo previo esperimento di apposita domanda giudiziale", "correct": false },
      { "text": "Posso esercitare tale diritto solo previo esperimento parere favorevole dell'organo amministrativo", "correct": false }
    ]
  },
  {
    "q": "5 I soci assenti all'assemblea culminata con l'adozione della delibera che legittima il recesso:",
    "options": [
      { "text": "Non possono esercitare tale diritto", "correct": false },
      { "text": "Possono sempre esercitare tale diritto", "correct": true },
      { "text": "Posso esercitare tale diritto solo previo esperimento di apposita domanda giudiziale", "correct": false },
      { "text": "Posso esercitare tale diritto solo previo esperimento parere favorevole dell'organo amministrativo", "correct": false }
    ]
  },
  {
    "q": "6 I soci che si siano astenuti dall'esprimere il proprio voto in ordine alla delibera che legittima il recesso:",
    "options": [
      { "text": "Non possono esercitare tale diritto", "correct": false },
      { "text": "Posso esercitare tale diritto solo previo esperimento di apposita domanda giudiziale", "correct": false },
      { "text": "Possono sempre esercitare tale diritto", "correct": true },
      { "text": "Posso esercitare tale diritto solo previo esperimento parere favorevole dell'organo amministrativo", "correct": false }
    ]
  },
  {
    "q": "7 Nel caso in cui in una s.r.l. inserisca o espunga dal proprio statuto, dopo il 2003, una clausola compromissoria i soci che non abbiano partecipato alla sua adozione:",
    "options": [
      { "text": "Potranno sempre recedere", "correct": true },
      { "text": "Potranno agire in giudizio per farla rimuovere", "correct": false },
      { "text": "Potranno agire di fronte ad un collegio arbitrale per farla rimuovere", "correct": false },
      { "text": "Nulla potranno fare al riguardo", "correct": false }
    ],
    "info": "L'introduzione o la soppressione di una clausola compromissoria (che sposta la competenza dal giudice ordinario agli arbitri) è considerata un cambiamento significativo che legittima il recesso del socio dissenziente (art. 2473 c.c.)."
  },
  {
    "q": "8 La liquidazione della quota del recedente, prima del 2003, doveva avvenire:",
    "options": [
      { "text": "Al valore di bilancio", "correct": true },
      { "text": "Al valore nominale", "correct": false },
      { "text": "Al valore di mercato", "correct": false },
      { "text": "Al valore che l'organo amministrativo ritenga congruo", "correct": false }
    ],
    "info": "Prima della riforma del 2003, il criterio prevalente era quello contabile/patrimoniale legato al bilancio, spesso penalizzante per il socio recedente rispetto al valore reale dell'azienda."
  },
  {
    "q": "9 La liquidazione della quota del recedente, dopo il 2003, deve avvenire:",
    "options": [
      { "text": "Al valore nominale", "correct": false },
      { "text": "Al valore di 'libro'", "correct": false },
      { "text": "Al valore di mercato", "correct": true },
      { "text": "Al valore che l'organo amministrativo ritenga congruo", "correct": false }
    ],
    "info": "La riforma ha introdotto il criterio del valore di mercato per garantire che la liquidazione sia effettivamente corrispondente al valore reale della partecipazione al momento del recesso."
  },
  {
    "q": "10 Il termine fissato dalla legge per l'espletamento della procedura di liquidazione è:",
    "options": [
      { "text": "Inderogabile", "correct": true },
      { "text": "Derogabile", "correct": false },
      { "text": "Derogabile solo con l'assenso dell'organo di controllo", "correct": false },
      { "text": "Derogabile con l'autorizzazione giudiziaria", "correct": false }
    ],
    "info": "I termini legali per la procedura di liquidazione sono volti a garantire la certezza dei rapporti societari e non sono suscettibili di deroghe arbitrarie."
  },
  {
    "q": "1 La procedura di liquidazione della quota può definirsi:",
    "options": [
      { "text": "Un procedimento", "correct": true },
      { "text": "Una fattispecie istantanea", "correct": false },
      { "text": "Una fattispecie aperta", "correct": false },
      { "text": "Una fattispecie sospesa", "correct": false }
    ],
    "info": "La liquidazione non è un singolo atto, ma una serie coordinata di fasi (determinazione valore, offerta in opzione, acquisto da terzi, ecc.) che costituisce un procedimento."
  },
  {
    "q": "2 Il recesso può essere esercitato se la società revoca la delibera che lo legittima:",
    "options": [
      { "text": "Entro 180 giorni", "correct": false },
      { "text": "Entro 90 giorni", "correct": false },
      { "text": "La legge non stabilisce un termine", "correct": true },
      { "text": "Entro 60 giorni", "correct": false }
    ],
    "info": "Se la società revoca la delibera che ha dato origine al recesso, il diritto di recesso viene meno; la legge non impone un termine perentorio per tale revoca, purché avvenga prima che la liquidazione sia completata."
  },
  {
    "q": "3 Per 'caducazione del recesso' deve intendersi:",
    "options": [
      { "text": "La possibilità per la società di privare di effetti il recesso, nei modi stabiliti dalla legge, già esercitato dal socio", "correct": true },
      { "text": "La possibilità per l'organo amministrativo di privare di effetti il recesso, nei modi stabiliti dalla legge, già esercitato dal socio", "correct": false },
      { "text": "La possibilità per la società di privare indiscriminatamente di effetti il recesso", "correct": false },
      { "text": "La possibilità per l'organo di controllo di privare di effetti il recesso", "correct": false }
    ],
    "info": "La caducazione si verifica quando viene meno il presupposto che ha generato il diritto di recesso (es. revoca della delibera), rendendo inefficace il recesso già esercitato."
  },
  {
    "q": "4 Il diritto che matura, sotto il profilo patrimoniale, il socio recedente in esito all'esercizio del recesso ha natura:",
    "options": [
      { "text": "Pecuniaria", "correct": true },
      { "text": "Di facere", "correct": false },
      { "text": "Di non facere", "correct": false },
      { "text": "Reale", "correct": false }
    ],
    "info": "Il diritto alla liquidazione della quota si trasforma, una volta validamente esercitato il recesso, in un credito verso la società avente ad oggetto una somma di denaro."
  },
  {
    "q": "5 Il credito che matura il socio recedente in esito all'esercizio del recesso:",
    "options": [
      { "text": "Non produce interessi legali", "correct": false },
      { "text": "Produce interessi legali dietro provvedimento giudiziale", "correct": false },
      { "text": "Produce interessi legali", "correct": true },
      { "text": "Produce interessi solo dopo la messa in mora della società", "correct": false }
    ],
    "info": "Trattandosi di un debito pecuniario liquido ed esigibile verso la società, maturano gli interessi legali dal momento in cui il credito diventa esigibile."
  },
  {
    "q": "6 La procedura di liquidazione della quota deve inderogabilmente definirsi entro:",
    "options": [
      { "text": "120 gg", "correct": false },
      { "text": "180 gg", "correct": true },
      { "text": "1 anno", "correct": false },
      { "text": "90 gg", "correct": false }
    ],
    "info": "L'art. 2473 c.c. stabilisce il termine di 180 giorni per la liquidazione, a tutela del socio recedente e della società."
  },
  {
    "q": "7 Se anche uno solo dei soci non è d'accordo circa la individuazione del terzo acquirente della quota del receduto:",
    "options": [
      { "text": "La medesima sarà sempre e comunque alienabile al soggetto individuato", "correct": false },
      { "text": "La medesima sarà alienabile al soggetto individuato solo nel caso in cui la maggioranza dei soci abbia espresso parere favorevole", "correct": false },
      { "text": "La medesima sarà alienabile al soggetto individuato solo nel caso in cui l'organo amministrativo abbia espresso parere favorevole", "correct": false },
      { "text": "La medesima non sarà alienabile a quel soggetto e si procederà con le ulteriori modalità di liquidazione poste dalla legge", "correct": true }
    ],
    "info": "Il procedimento di offerta della quota (prima ai soci, poi a terzi) deve seguire rigorosamente le fasi legali. Se non c'è accordo o accettazione, si passa alla fase successiva di rimborso tramite riserve o riduzione capitale."
  },
  {
    "q": "8 Se non vi sono soci o terzi designati da costoro interessati alla quota del receduto:",
    "options": [
      { "text": "La società si scioglie subito", "correct": false },
      { "text": "La società acquisterà tale quota dal recedente", "correct": false },
      { "text": "La società, pur non potendo acquistare proprie partecipazioni, dovrà rimborsare il socio receduto utilizzando riserve disponibili", "correct": true },
      { "text": "L'ente si estinguerà senza attuare la procedura di liquidazione", "correct": false }
    ],
    "info": "Il divieto di acquisto di proprie azioni/quote non impedisce alla S.r.l. di rimborsare il socio recedente utilizzando le riserve disponibili (utili o altre riserve)."
  },
  {
    "q": "9 Se non vi sono riserve disponibili utilizzabili per l'acquisto della quota del receduto:",
    "options": [
      { "text": "La società acquisterà tale quota dal recedente", "correct": false },
      { "text": "La società si scioglierà subito", "correct": false },
      { "text": "L'ente si estinguerà senza attuare la procedura di liquidazione", "correct": false },
      { "text": "Il capitale sociale andrà correlativamente ridotto con il rispetto delle formalità di cui all'art. 2482 c.c", "correct": true }
    ],
    "info": "In assenza di riserve, l'ultima ratio per soddisfare il diritto del socio recedente è la riduzione reale del capitale sociale."
  },
  {
    "q": "10 Nel caso in cui tutte le fasi della procedura abbiano dato esito negativo la società:",
    "options": [
      { "text": "Si scioglie", "correct": true },
      { "text": "Prosegue senza il socio receduto", "correct": false },
      { "text": "Prosegue acquistando la partecipazione dal socio receduto", "correct": false },
      { "text": "Si estingue senza liquidazione", "correct": false }
    ],
    "info": "Se non è possibile liquidare la quota tramite acquisto da soci, terzi, utilizzo di riserve o riduzione di capitale, la società si scioglie (art. 2473, comma 4)."
  },
  {
    "q": "1 In Italia, nel modello s.r.l., la possibilità di escludere convenzionalmente uno o più soci è:",
    "options": [
      { "text": "Stata introdotta nel 1942", "correct": false },
      { "text": "Stata introdotta solo dopo il 1993", "correct": false },
      { "text": "Ancora oggi esclusa", "correct": false },
      { "text": "Stata introdotta solo nel 2003", "correct": true }
    ],
    "info": "La riforma del 2003 ha introdotto l'esclusione convenzionale per giusta causa nella S.r.l., ampliando l'autonomia statutaria."
  },
  {
    "q": "2 Nel vigente ordinamento la facoltà di introdurre ipotesi di esclusione convenzionale è disciplinata:",
    "options": [
      { "text": "Dalla normativa speciale", "correct": false },
      { "text": "Dalla normativa europea", "correct": false },
      { "text": "Dalla normativa codicistica", "correct": true },
      { "text": "Solo, per tramite della tecnica del rinvio, sulla falsariga dei modelli azionari", "correct": false }
    ],
    "info": "L'art. 2473-bis c.c. disciplina espressamente l'esclusione del socio nella S.r.l."
  },
  {
    "q": "3 Nel nostro ordinamento una clausola 'generica' di esclusione è:",
    "options": [
      { "text": "Illegittima", "correct": true },
      { "text": "Legittima", "correct": false },
      { "text": "Legittima purché introdotta all'unanimità", "correct": false },
      { "text": "Legittima allorché sia favorevolmente valuta dagli amministratori", "correct": false }
    ],
    "info": "L'esclusione deve basarsi su 'giusta causa', che deve essere determinata o determinabile, non generica, per evitare abusi della maggioranza."
  },
  {
    "q": "4 La clausola convenzionale che regola l'esclusione:",
    "options": [
      { "text": "Può sempre prescindere dalla giusta causa", "correct": false },
      { "text": "Può prescindere dalla giusta causa solo se è previamente valutata dagli amministratori", "correct": false },
      { "text": "Può prescindere dalla giusta causa solo se è così è stata voluta dai soci", "correct": false },
      { "text": "Non può prescindere mai dalla sussistenza di una giusta causa", "correct": true }
    ],
    "info": "Il requisito della 'giusta causa' è un elemento essenziale per la legittimità dell'esclusione del socio."
  },
  {
    "q": "5 Le ipotesi statutarie di esclusione per giusta causa:",
    "options": [
      { "text": "Possono essere generiche", "correct": false },
      { "text": "Devono essere specifiche", "correct": true },
      { "text": "Non devono essere necessariamente individuate", "correct": false },
      { "text": "Possono risolversi in un mero richiamo alla giusta causa", "correct": false }
    ],
    "info": "Lo statuto deve tipizzare le condotte che costituiscono giusta causa per fornire certezza ai soci."
  },
  {
    "q": "6 In assenza di precisazioni statutarie sul punto è competente a decide l'esclusione:",
    "options": [
      { "text": "L'organo di controllo", "correct": false },
      { "text": "La compagine sociale", "correct": true },
      { "text": "L'organo gestorio", "correct": false },
      { "text": "Il revisore legale dei conti", "correct": false }
    ],
    "info": "In quanto decisione che incide sul contratto sociale, spetta ai soci, salvo diversa disposizione statutaria."
  },
  {
    "q": "7 Una clausola statutaria che rimetta la decisone sull'esclusione al giudice, quale terzo arbitratore, è:",
    "options": [
      { "text": "Sempre illegittima", "correct": true },
      { "text": "Sempre legittima", "correct": false },
      { "text": "Legittima purché introdotta all'unanimità", "correct": false },
      { "text": "Legittima allorché sia favorevolmente valuta dagli amministratori", "correct": false }
    ],
    "info": "L'esclusione è una decisione sociale. Affidarla interamente a un terzo (giudice come arbitratore) svuota la competenza dei soci."
  },
  {
    "q": "8 Nel procedimento che conduce all'esclusione alla società:",
    "options": [
      { "text": "Non è imposto alcun obbligo nei riguardi dell'escluso", "correct": false },
      { "text": "È fatto obbligo di motivare l'esclusione ed informarne il destinatario", "correct": true },
      { "text": "È fatto obbligo di motivare l'esclusione, ma non di informarne il destinatario", "correct": false },
      { "text": "È fatto obbligo di informare il destinatario, ma non di motivare l'esclusione", "correct": false }
    ],
    "info": "Il diritto alla difesa del socio impone che la decisione sia motivata e comunicata, permettendogli eventualmente di impugnarla."
  },
  {
    "q": "9 Il socio escluso ha diritto alla liquidazione della propria partecipazione secondo i criteri:",
    "options": [
      { "text": "Fissati di comune accordo tra i soci", "correct": false },
      { "text": "Fissati di comune accordo tra i soci e l'organo amministrativo", "correct": false },
      { "text": "Fissati dalla legge per il recesso", "correct": true },
      { "text": "Fissati di comune accordo tra i soci e l'organo di controllo", "correct": false }
    ],
    "info": "Per analogia, si applicano i criteri di liquidazione previsti per il recesso (art. 2473 c.c.)."
  },
  {
    "q": "10 I criteri legali di determinazione della quota in seno al procedimento di liquidazione:",
    "options": [
      { "text": "Non sono mai modificabili dai soci", "correct": false },
      { "text": "Sono sempre modificabili dai soci", "correct": false },
      { "text": "Sono modificabili dai soci purché non si prescinda da una sua equa valorizzazione", "correct": true },
      { "text": "Sono modificabili dai soci purché non si prescinda da una sua valutazione al nominale", "correct": false }
    ],
    "info": "L'autonomia statutaria può regolare i criteri, ma deve rispettare il principio di equità e non può rendere impossibile o irrisorio il rimborso."
  },
  {
    "q": "1 Il riparto di competenze, nella s.r.l., tra organo amministrativo e compagine sociale è:",
    "options": [
      { "text": "Rigido", "correct": false },
      { "text": "Flessibile", "correct": true },
      { "text": "Informato dalle regole previste per la s.p.a", "correct": false },
      { "text": "Inesistente", "correct": false }
    ],
    "info": "La S.r.l. si caratterizza per un'elevata flessibilità organizzativa, permettendo allo statuto di distribuire i poteri gestori quasi a piacimento."
  },
  {
    "q": "2 Le decisioni inerenti la modifica dell'atto costitutivo sono di competenza:",
    "options": [
      { "text": "Dell'organo amministrativo", "correct": false },
      { "text": "Dei soci", "correct": true },
      { "text": "Dei soci unitamente all'organo amministrativo", "correct": false },
      { "text": "Dell'organo amministrativo previo parere dell'organo di controllo", "correct": false }
    ],
    "info": "Le modifiche statutarie toccano il contratto sociale e sono riservate alla decisione dei soci (art. 2479 c.c.)."
  },
  {
    "q": "3 Nel modello s.r.l. le decisioni dei soci possono essere assunte:",
    "options": [
      { "text": "Giusta modalità collegiali o meno a seconda delle previsioni statutarie e sempre nei limiti fissati dalla legge al riguardo", "correct": true },
      { "text": "Solo mediante procedimento assembleare", "correct": false },
      { "text": "Solo mediante consultazione scritta", "correct": false },
      { "text": "Solo mediante consenso espresso per iscritto", "correct": false }
    ],
    "info": "A differenza della S.p.A., la S.r.l. non impone necessariamente il metodo assembleare (collegiale), consentendo metodi decisionali più snelli (consultazione scritta o consenso espresso per iscritto), se previsti dallo statuto."
  },
  {
    "q": "4 Il concetto di \"invalidità\", nelle s.r.l. compendia:",
    "options": [
      { "text": "Le ipotesi annullabilità, nullità ed inesistenza", "correct": false },
      { "text": "Le ipotesi annullabilità, nullità ed inefficacia", "correct": false },
      { "text": "Solo le ipotesi annullabilità e nullità", "correct": true },
      { "text": "Solo le ipotesi nullità ed inesistenza", "correct": false }
    ],
    "info": "Nella disciplina delle S.r.l., le forme patologiche delle delibere assembleari si riducono alle due categorie classiche di nullità e annullabilità (art. 2479-ter c.c.), superando la tripartizione più complessa del diritto civile generale."
  },
  {
    "q": "5 Il concetto di \"rappresentanza\":",
    "options": [
      { "text": "Coincide con quello di gestione", "correct": false },
      { "text": "Differisce da quello di gestione per la sua dimensione interna", "correct": false },
      { "text": "Differisce da quello di gestione per la sua dimensione esterna", "correct": true },
      { "text": "Non appartiene al fenomeno societario", "correct": false }
    ],
    "info": "La gestione è l'attività interna di amministrazione e decisione; la rappresentanza è il potere di agire in nome e per conto della società verso i terzi."
  },
  {
    "q": "6 I confini dell'oggetto sociale:",
    "options": [
      { "text": "Incidono sulla portata della rappresentanza", "correct": false },
      { "text": "Non incidono più sulla portata della rappresentanza dal 1993", "correct": false },
      { "text": "Non hanno mai inciso sulla portata della rappresentanza", "correct": false },
      { "text": "Non incidono più sulla portata della rappresentanza dal 2003", "correct": true }
    ],
    "info": "Con la riforma del 2003, l'art. 2475-bis c.c. ha sancito l'inopponibilità ai terzi dei limiti legali all'oggetto sociale, rendendo le limitazioni statutarie prive di effetti esterni (salvo prova del dolo del terzo)."
  },
  {
    "q": "7 I contratti conclusi in conflitto di interessi dagli amministratori che abbiano la rappresentanza della società possono essere:",
    "options": [
      { "text": "Annullati", "correct": true },
      { "text": "Dichiarati inefficaci", "correct": false },
      { "text": "Dichiarati nulli", "correct": false },
      { "text": "Dichiarati inesistenti", "correct": false }
    ],
    "info": "Ai sensi dell'art. 2475-ter c.c., i contratti conclusi dall'amministratore in conflitto di interessi sono annullabili se il conflitto era conosciuto o riconoscibile dal terzo."
  },
  {
    "q": "8 La responsabilità degli amministratori per cattiva gestione può essere apprezzata:",
    "options": [
      { "text": "Solo nei riguardi dei soci e dei creditori", "correct": false },
      { "text": "Nei riguardi dei soci, dei creditori e della società", "correct": true },
      { "text": "Solo nei riguardi dei soci e società", "correct": false },
      { "text": "Solo nei riguardi della società e dei creditori", "correct": false }
    ],
    "info": "La responsabilità amministrativa si articola in tre direzioni: verso la società (azione sociale), verso i creditori (per inosservanza obblighi conservativi) e verso i singoli soci/terzi (danno diretto)."
  },
  {
    "q": "9 I soci che non hanno preso parte all'amministrazione:",
    "options": [
      { "text": "Non hanno alcun diritto di informazione nei riguardi dell'organo amministrativo", "correct": false },
      { "text": "Hanno diritto di avere dai sindaci notizie sullo svolgimento degli affari sociali e di consultare i libri sociali", "correct": false },
      { "text": "Hanno diritto di avere dagli amministratori notizie sullo svolgimento degli affari sociali e di consultare, anche tramite professionisti, i libri sociali", "correct": true },
      { "text": "Hanno solo diritti di ispezione e non di informazione", "correct": false }
    ],
    "info": "L'art. 2476 c.c. garantisce ai soci non amministratori un ampio diritto di consultazione e di informazione per controllare l'operato di chi gestisce la società."
  },
  {
    "q": "10 Nel modello s.r.l. l'organo di controllo:",
    "options": [
      { "text": "Può avere anche struttura monocratica", "correct": true },
      { "text": "Può avere solo struttura pluripersonale", "correct": false },
      { "text": "Può avere solo struttura monocratica", "correct": false },
      { "text": "Non trova disciplina nella normativa vigente", "correct": false }
    ],
    "info": "A differenza della S.p.A., la S.r.l. consente che l'organo di controllo sia composto da un solo membro (sindaco unico), garantendo maggiore snellezza."
  },
  {
    "q": "1 Prima della riforma del 2003 il tema delle modifiche dell'atto costitutivo era disciplinato:",
    "options": [
      { "text": "In analogia ai modelli personalistici", "correct": false },
      { "text": "In maniera autonoma", "correct": false },
      { "text": "In analogia ai modelli azionari", "correct": true },
      { "text": "Secondo la volontà dei soci", "correct": false }
    ],
    "info": "Prima del 2003, la S.r.l. era intesa come una 'piccola S.p.A.', quindi soggetta per analogia alla rigida disciplina delle società azionarie."
  },
  {
    "q": "2 Dopo la riforma del 2003 il tema delle modifiche dell'atto costitutivo è disciplinato:",
    "options": [
      { "text": "In analogia ai modelli personalistici", "correct": false },
      { "text": "In maniera autonoma", "correct": true },
      { "text": "In analogia ai modelli azionari", "correct": false },
      { "text": "Secondo la volontà dei soci", "correct": false }
    ],
    "info": "La riforma ha creato una disciplina autonoma per la S.r.l., staccandola dal modello azionario e valorizzando l'autonomia statutaria."
  },
  {
    "q": "3 Il procedimento di modifica dell'atto costitutivo può riguardare:",
    "options": [
      { "text": "Solo le modifiche soggettive dell'atto costitutivo", "correct": false },
      { "text": "Solo le modifiche fattuali dello statuto", "correct": false },
      { "text": "Le modifiche soggettive e quelle oggettive dell'atto costitutivo", "correct": false },
      { "text": "Solo le modifiche oggettive dell'atto costitutivo", "correct": true }
    ],
    "info": "La modifica dell'atto costitutivo (es. aumento capitale, cambio oggetto) riguarda il contenuto oggettivo del contratto sociale."
  },
  {
    "q": "4 La regola dispositiva e suppletiva per la modifica dei particolari diritti è:",
    "options": [
      { "text": "Quella maggioritaria", "correct": false },
      { "text": "Quella unanimistica", "correct": true },
      { "text": "Quella maggioritaria per teste", "correct": false },
      { "text": "Quella maggioritaria per quote di interesse", "correct": false }
    ],
    "info": "Poiché i diritti particolari sono concessi a specifici soci, la loro modifica richiede il consenso di tutti i soci (unanimità), salvo diversa previsione statutaria."
  },
  {
    "q": "5 E' competente a decidere sulla modifica dell'atto costitutivo:",
    "options": [
      { "text": "L'organo di controllo", "correct": false },
      { "text": "L'organo amministrativo", "correct": false },
      { "text": "La compagine sociale in autonomia", "correct": true },
      { "text": "La compagine sociale previo parere dell'autorità giudiziaria", "correct": false }
    ],
    "info": "La decisione di modificare il 'contratto' (atto costitutivo) è riservata alla competenza decisionale dei soci (art. 2479 c.c.)."
  },
  {
    "q": "6 Le regole fissate dalla legge per la modifica dell'atto costitutivo sono:",
    "options": [
      { "text": "Dispositive", "correct": false },
      { "text": "Imperative", "correct": true },
      { "text": "Inesistenti", "correct": false },
      { "text": "Derogabili", "correct": false }
    ],
    "info": "Le regole sui quorum deliberativi e sulla verbalizzazione (notaio) per le modifiche statutarie sono norme imperative a tutela della certezza giuridica."
  },
  {
    "q": "7 La decisione di modificare l'atto costitutivo:",
    "options": [
      { "text": "Può essere delegata sempre all'organo amministrativo", "correct": false },
      { "text": "Può essere delegata sempre all'organo di controllo", "correct": false },
      { "text": "Non può, di regola, essere delegata a nessuno", "correct": true },
      { "text": "Può essere delegata all'organo di controllo solo nei casi previsti dalla legge", "correct": false }
    ],
    "info": "La competenza dei soci sulle modifiche statutarie è inderogabile, salvo limitate eccezioni (es. aumento capitale delegato, ma che non è propriamente 'modifica' del testo dell'atto in senso stretto, bensì esecuzione)."
  },
  {
    "q": "8 La procedura di modifica dell'atto costitutivo è:",
    "options": [
      { "text": "Un procedimento", "correct": true },
      { "text": "Una fattispecie istantanea", "correct": false },
      { "text": "Una fattispecie incompleta", "correct": false },
      { "text": "Una fattispecie inefficace", "correct": false }
    ],
    "info": "La modifica non è un singolo atto, ma un iter che comprende delibera, verbale notarile, controllo di legalità e iscrizione nel Registro Imprese."
  },
  {
    "q": "9 Le norme sulle modifiche dell'atto sono:",
    "options": [
      { "text": "Derogabili solo verso l'alto", "correct": false },
      { "text": "Inderogabili", "correct": false },
      { "text": "Derogabili solo verso il basso", "correct": false },
      { "text": "Derogabili tanto verso l'alto quanto verso il basso", "correct": true }
    ],
    "info": "L'autonomia statutaria può rendere il processo di modifica più rigoroso (es. quorum più alti) o più flessibile, nei limiti di quanto consentito dalla legge."
  },
  {
    "q": "10 Il notaio, in materia, deve svolgere un controllo:",
    "options": [
      { "text": "Preventivo", "correct": false },
      { "text": "Meramente formale", "correct": false },
      { "text": "Di merito", "correct": false },
      { "text": "Di legalità sostanziale", "correct": true }
    ],
    "info": "Il notaio verifica non solo la regolarità formale, ma che la delibera sia conforme alla legge e non presenti vizi di nullità sostanziale."
  },
  {
    "q": "1 L'\"aumento\" del capitale sociale:",
    "options": [
      { "text": "È una modificazione dell'atto costitutivo solo sostanziale", "correct": false },
      { "text": "È una modificazione dell'atto costitutivo solo formale", "correct": false },
      { "text": "È una modificazione dell'atto costitutivo formale e sostanziale", "correct": true },
      { "text": "Non è una modificazione dell'atto costitutivo", "correct": false }
    ],
    "info": "L'aumento di capitale richiede la modifica della clausola statutaria (sostanziale) e l'adeguamento formale dei documenti societari."
  },
  {
    "q": "2 L'\"aumento\" del capitale sociale può essere:",
    "options": [
      { "text": "Solo oneroso", "correct": false },
      { "text": "Oneroso e gratuito", "correct": true },
      { "text": "Solo gratuito", "correct": false },
      { "text": "Solo delegato", "correct": false }
    ],
    "info": "L'aumento può avvenire tramite nuovi apporti (oneroso) o mediante il passaggio a capitale di riserve già esistenti (gratuito)."
  },
  {
    "q": "3 L'\"aumento\" gratuito del capitale sociale:",
    "options": [
      { "text": "È disciplinato espressamente dalla legge", "correct": true },
      { "text": "Non è disciplinato espressamente dalla legge", "correct": false },
      { "text": "È disciplinato tramite rinvio alla normativa s.p.a", "correct": false },
      { "text": "È disciplinato tramite rinvio alla normativa delle società personalistiche", "correct": false }
    ],
    "info": "Il Codice Civile prevede espressamente la disciplina dell'aumento gratuito, che consiste nel trasferimento di riserve a capitale."
  },
  {
    "q": "4 Nell'\"aumento\" oneroso del capitale sociale l'offerta in sottoscrizione ai soci:",
    "options": [
      { "text": "Deve essere pubblicata nel Registro delle Imprese", "correct": false },
      { "text": "Deve essere assoggettata alle medesime formalità previste dalla disciplina delle s.p.a", "correct": false },
      { "text": "Non deve essere pubblicata nel Registro delle Imprese, ma comunque comunicata ai soci", "correct": true },
      { "text": "Non è una formalità il cui espletamento sia richiesto dalla legge", "correct": false }
    ],
    "info": "A differenza della S.p.A., la normativa S.r.l. non impone la pubblicità notizia per l'offerta di sottoscrizione, ma richiede che i soci siano informati."
  },
  {
    "q": "5 Prima del 2003 la delega all'aumento del capitale sociale all'organo amministrativo:",
    "options": [
      { "text": "Era ammessa espressamente dalla normativa di settore", "correct": false },
      { "text": "Era ammessa, in via interpretativa, dalla dottrina", "correct": false },
      { "text": "Non era disciplinata, ma la giurisprudenza tendeva ad ammetterla", "correct": false },
      { "text": "Non era disciplinata ma la dottrina e la giurisprudenza tendono a negarne l'ammissibilità", "correct": true }
    ],
    "info": "Prima della riforma, si riteneva che la decisione sull'aumento di capitale spettasse inderogabilmente ai soci, negando la delega agli amministratori."
  },
  {
    "q": "6 Dopo il 2003 la delega all'aumento del capitale sociale all'organo amministrativo:",
    "options": [
      { "text": "È ammessa espressamente dalla normativa di settore", "correct": true },
      { "text": "È ammessa, in via interpretativa, dalla dottrina", "correct": false },
      { "text": "Non è disciplinata, ma la giurisprudenza tende ad ammetterla", "correct": false },
      { "text": "Non è disciplinata ma dottrina e giurisprudenza tendono a negarne l'ammissibilità", "correct": false }
    ],
    "info": "L'art. 2481 c.c. consente ora espressamente che l'atto costitutivo deleghi l'aumento di capitale agli amministratori, determinandone limiti e modalità."
  },
  {
    "q": "7 La delega all'organo amministrativo per l'aumento del capitale sociale può essere:",
    "options": [
      { "text": "Solo attuativa", "correct": false },
      { "text": "Solo in bianco", "correct": false },
      { "text": "Solo deliberativa", "correct": true },
      { "text": "Solo frazionaria", "correct": false }
    ],
    "info": "La delega è deliberativa nel senso che l'organo amministrativo adotta la delibera di aumento entro i limiti massimi e temporali stabiliti dallo statuto."
  },
  {
    "q": "8 La delega in bianco all'organo amministrativo per l'aumento del capitale è ritenuta:",
    "options": [
      { "text": "Sempre ammissibile", "correct": false },
      { "text": "Mai ammissibile", "correct": true },
      { "text": "Ammissibile solo previa statuizione dell'atto costitutivo", "correct": false },
      { "text": "Ammissibile solo previa valutazione giudiziaria", "correct": false }
    ],
    "info": "La delega deve sempre definire i limiti (massimo dell'aumento e durata della delega), altrimenti sarebbe un potere arbitrario incompatibile con i diritti dei soci."
  },
  {
    "q": "9 La fase attuativa della procedura che conduce all'aumento del capitale sociale:",
    "options": [
      { "text": "È riscontrabile in tutti i tipi di aumento del capitale sociale", "correct": false },
      { "text": "È riscontrabile solo nell'aumento gratuito del capitale sociale", "correct": false },
      { "text": "È riscontrabile solo nell'aumento oneroso del capitale sociale", "correct": true },
      { "text": "Non è riscontrabile in alcun tipo di aumento del capitale sociale", "correct": false }
    ],
    "info": "L'aumento oneroso richiede la fase di sottoscrizione e versamento dei conferimenti; l'aumento gratuito è una mera operazione contabile."
  },
  {
    "q": "10 La deliberazione afferente l'aumento del capitale sociale acquista efficacia:",
    "options": [
      { "text": "Dal momento dell'iscrizione presso il Registro delle imprese", "correct": true },
      { "text": "Dal momento del deposito presso il Registro delle imprese", "correct": false },
      { "text": "Dal momento dell'iscrizione presso il libro delle adunanze dei soci", "correct": false },
      { "text": "Dal momento della sua verbalizzazione ad opera del notaio", "correct": false }
    ],
    "info": "L'iscrizione nel Registro delle Imprese ha efficacia costitutiva per le modifiche dell'atto costitutivo."
  },
  {
    "q": "1 L'aumento a pagamento del capitale sociale:",
    "options": [
      { "text": "Non può essere attuato quando ci sono ancora precedenti conferimenti da eseguire", "correct": true },
      { "text": "Può essere attuato quando ci sono ancora precedenti conferimenti da eseguire", "correct": false },
      { "text": "Può essere deliberato quando ci sono ancora precedenti conferimenti da eseguire", "correct": false },
      { "text": "È un'operazione che non risente di precedenti conferimenti da eseguire", "correct": false }
    ],
    "info": "Il divieto di aumento del capitale se vi sono conferimenti ancora dovuti (art. 2481-bis) mira a evitare la formazione di capitale in parte 'fittizio' o non versato."
  },
  {
    "q": "2 L'aumento a pagamento del capitale sociale:",
    "options": [
      { "text": "Non può essere attuato quando la società si trovi in una delle condizioni previste dagli artt. 2482 bis oppure 2482 ter c.c.", "correct": false },
      { "text": "Non può essere deliberato quando la società si trovi in una delle condizioni previste dagli artt. 2482 bis oppure 2482 ter c.c.", "correct": true },
      { "text": "Può essere attuato quando la società si trovi in una delle condizioni previste dagli artt. 2482 bis oppure 2482 ter c.c.", "correct": false },
      { "text": "Può essere deliberato quando la società si trovi in una delle condizioni previste dagli artt. 2482 bis oppure 2482 ter c.c.", "correct": false }
    ],
    "info": "La società non può aumentare il capitale se si trova in una situazione di perdite che ne riducono il capitale al di sotto del minimo legale o che richiedono la copertura."
  },
  {
    "q": "3 La sottoscrizione dell'aumento a pagamento del capitale sociale:",
    "options": [
      { "text": "Può essere solo contestuale", "correct": false },
      { "text": "Può essere solo non contestuale", "correct": false },
      { "text": "Può essere tanto contestuale quanto non contestuale", "correct": true },
      { "text": "Risente delle tempistiche ad essa imposte dall'organo amministrativo", "correct": false }
    ],
    "info": "La sottoscrizione può avvenire contestualmente alla delibera (es. presenza totalitaria) o successivamente entro termini prestabiliti."
  },
  {
    "q": "4 Nel tipo s.r.l. l'esclusione del diritto alla sottoscrizione preferenziale:",
    "options": [
      { "text": "È riconosciuta ai soci dalla legge", "correct": false },
      { "text": "È riconosciuta ai soci in ossequio alle regole fissate per le s.p.a", "correct": false },
      { "text": "È riconosciuta ai soci in ossequio alle regole fissate per le società personalistiche", "correct": false },
      { "text": "Necessita di un'apposita previsione dell'atto costitutivo", "correct": true }
    ],
    "info": "A differenza della S.p.A., dove il diritto di opzione è la regola, nella S.r.l. l'esclusione o la limitazione del diritto di sottoscrizione deve essere prevista dallo statuto."
  },
  {
    "q": "5 Nel caso di aumento oneroso del capitale sociale in società possono essere conferiti:",
    "options": [
      { "text": "Solo crediti", "correct": false },
      { "text": "Solo beni immobili", "correct": false },
      { "text": "Beni, crediti e denaro", "correct": true },
      { "text": "Solo denaro", "correct": false }
    ],
    "info": "Nella S.r.l. è ammesso il conferimento di ogni elemento dell'attivo suscettibile di valutazione economica (denaro, beni, crediti)."
  },
  {
    "q": "6 Nel caso di aumento oneroso del capitale sociale da liberare mercé conferimenti in natura:",
    "options": [
      { "text": "È necessaria la perizia di stima del bene conferito", "correct": true },
      { "text": "Non è necessaria la perizia di stima del bene conferito", "correct": false },
      { "text": "La scelta inerente alla predisposizione della perizia deve essere presa dall'organo amministrativo", "correct": false },
      { "text": "La scelta inerente alla predisposizione della perizia deve essere presa dall'organo amministrativo dietro autorizzazione giudiziaria", "correct": false }
    ],
    "info": "L'art. 2465 c.c. richiede una relazione giurata di stima per garantire che il valore dei conferimenti in natura corrisponda al capitale sottoscritto."
  },
  {
    "q": "7 La liberazione dall'obbligo di conferimento:",
    "options": [
      { "text": "Non può avvenire per il tramite dell'istituto della compensazione", "correct": false },
      { "text": "Può avvenire per il tramite dell'istituto della compensazione purché convenzionale", "correct": false },
      { "text": "Può avvenire per il tramite dell'istituto della compensazione in ogni sua forma", "correct": true },
      { "text": "Può avvenire per il tramite dell'istituto della compensazione purché legale", "correct": false }
    ],
    "info": "Il socio può liberare il proprio obbligo di conferimento in denaro tramite la compensazione con un credito che egli vanta verso la società."
  },
  {
    "q": "8 Dopo il 2003 l'aumento gratuito del capitale sociale:",
    "options": [
      { "text": "È espressamente contemplato dalla legge", "correct": true },
      { "text": "Non è espressamente contemplato dalla legge", "correct": false },
      { "text": "È contemplato dalla legge per il tramite di un rinvio alla normativa delle s.p.a", "correct": false },
      { "text": "È contemplato dalla legge per il tramite di un rinvio alle regole di governo di tale operazione nelle società personalistiche", "correct": false }
    ],
    "info": "L'art. 2481-ter c.c. disciplina espressamente l'aumento gratuito mediante utilizzo di riserve disponibili."
  },
  {
    "q": "9 L'aumento gratuito del capitale sociale dà luogo:",
    "options": [
      { "text": "Ad una operazione di incremento della dotazione patrimoniale della società", "correct": false },
      { "text": "Ad una operazione di decremento della dotazione patrimoniale della società", "correct": false },
      { "text": "Ad una operazione di finanziamento della società mediante nuovi apporti", "correct": false },
      { "text": "Ad una operazione di semplice ricollocazione di risorse già acquisite dalla società", "correct": true }
    ],
    "info": "L'aumento gratuito è una mera operazione contabile: si sposta valore da una voce del patrimonio netto (es. riserve) al capitale sociale. Il patrimonio netto complessivo rimane invariato."
  },
  {
    "q": "10 Il principio di incremento delle partecipazioni di tutti i soci in proporzione a quelle di cui fossero titolari prima dell'operazione di aumento gratuito:",
    "options": [
      { "text": "È inderogabile", "correct": false },
      { "text": "È derogabile a maggioranza", "correct": false },
      { "text": "È derogabile all'unanimità", "correct": true },
      { "text": "Non esiste in materia di s.r.l", "correct": false }
    ],
    "info": "Poiché l'aumento gratuito non richiede nuovi apporti, i soci hanno diritto di mantenere la proporzione. È possibile derogare solo con il consenso di tutti i soci coinvolti."
  },
  {
    "q": "1 Il requisito dell'esuberanza del capitale sociale rispetto all'oggetto sociale:",
    "options": [
      { "text": "Non è stato espunto dall'ordinamento in esito alla riforma del 2003", "correct": false },
      { "text": "È stato espunto dall'ordinamento in esito alla riforma del 2003", "correct": true },
      { "text": "Non ha mai riguardato tale tipo di operazione societaria", "correct": false },
      { "text": "Continua a riguardare tale tipo di operazione societaria", "correct": false }
    ],
    "info": "Prima del 2003, la riduzione reale del capitale richiedeva la dimostrazione dell'esuberanza. Oggi tale vincolo è caduto, dando ai soci piena libertà discrezionale nella riduzione."
  },
  {
    "q": "2 La riduzione reale del capitale sociale oggi può essere deliberata:",
    "options": [
      { "text": "Senza il rispetto del requisito dell'esuberanza", "correct": true },
      { "text": "Anche nel rispetto del requisito dell'esuberanza", "correct": false },
      { "text": "Solo con il rispetto del requisito dell'esuberanza", "correct": false },
      { "text": "Anche in presenza di perdite", "correct": false }
    ],
    "info": "Oggi la riduzione reale del capitale è una facoltà dei soci che non richiede più di giustificare l'esuberanza, purché vengano tutelati i creditori (diritto di opposizione)."
  },
  {
    "q": "3 La riduzione reale del capitale sociale oggi può essere seguita:",
    "options": [
      { "text": "Solo giusta le modalità indicate dal legislatore", "correct": false },
      { "text": "Giusta le modalità fissate dall'organo amministrativo", "correct": false },
      { "text": "Giusta le modalità concordate con l'organo di controllo", "correct": false },
      { "text": "Anche giusta modalità selezionate dall'autonomia privata in ossequio ai concreti interessi sottesi all'operazione decisa", "correct": true }
    ],
    "info": "La riforma ha valorizzato l'autonomia statutaria. Pur dovendo rispettare i diritti dei creditori, le S.r.l. possono definire modalità di riduzione del capitale più flessibili rispetto al passato."
  },
  {
    "q": "4 Il sorteggio è una modalità attuativa della riduzione reale del capitale sociale:",
    "options": [
      { "text": "Inammissibile nella s.r.l", "correct": false },
      { "text": "Prevista dal Legislatore in modo espresso per la s.r.l", "correct": false },
      { "text": "Ammissibile nella s.r.l", "correct": true },
      { "text": "Sconosciuta al nostro ordinamento giuridico e ai suoi interpreti", "correct": false }
    ],
    "info": "Il sorteggio è una tecnica lecita per selezionare le quote da rimborsare o annullare, purché non violi il principio di parità di trattamento tra i soci."
  },
  {
    "q": "5 La riduzione reale del capitale sociale deve essere decisa:",
    "options": [
      { "text": "Dall'organo di controllo", "correct": false },
      { "text": "Dall'organo amministrativo", "correct": false },
      { "text": "Dai soci", "correct": true },
      { "text": "Dall'organo di amministrazione previo parere dei soci", "correct": false }
    ],
    "info": "La riduzione del capitale è una modifica dell'atto costitutivo (art. 2479 c.c.), quindi la competenza spetta inderogabilmente ai soci."
  },
  {
    "q": "6 La riduzione reale del capitale sociale deve essere adottata:",
    "options": [
      { "text": "Necessariamente con modalità collegiali", "correct": true },
      { "text": "Tramite consultazione scritta", "correct": false },
      { "text": "Tramite consenso espresso per iscritto", "correct": false },
      { "text": "Tramite sottoscrizioni successive", "correct": false }
    ],
    "info": "Per le modifiche dell'atto costitutivo (riduzione capitale), la legge richiede che la decisione sia verbalizzata da notaio, implicando il metodo assembleare (collegiale)."
  },
  {
    "q": "7 La riduzione reale del capitale sociale legittima l'opposizione dei creditori:",
    "options": [
      { "text": "A partite dal deposito presso il Registro delle imprese della decisione", "correct": false },
      { "text": "A partite dall'adozione della decisione", "correct": false },
      { "text": "A partite dall'iscrizione presso il Registro delle imprese della decisione", "correct": true },
      { "text": "A partite dalla verbalizzazione notarile della decisione", "correct": false }
    ],
    "info": "Il termine di 90 giorni per l'opposizione decorre dall'iscrizione nel Registro delle Imprese, che rende la delibera opponibile ai terzi."
  },
  {
    "q": "8 Il requisito dell'esuberanza del capitale sociale rispetto all'oggetto sociale:",
    "options": [
      { "text": "Può essere reintrodotto convenzionalmente nello statuto", "correct": true },
      { "text": "Non può essere reintrodotto convenzionalmente nello statuto", "correct": false },
      { "text": "Non è mai stato espunto dalla disciplina legale", "correct": false },
      { "text": "Non ha mai fatto parte della disciplina legale", "correct": false }
    ],
    "info": "La riforma ha eliminato l'esuberanza come requisito legale, ma le parti possono decidere di inserirlo nello statuto per autolimitare la discrezionalità dei soci."
  },
  {
    "q": "9 La riduzione reale del capitale sociale:",
    "options": [
      { "text": "È sempre compatibile con la procedura di liquidazione", "correct": false },
      { "text": "Non è mai compatibile con la procedura di liquidazione", "correct": false },
      { "text": "è compatibile con la procedura di liquidazione nei limiti fissati dall'art. 2491 c.c", "correct": true },
      { "text": "È compatibile con la procedura di liquidazione purché vi sia il benestare dell'autorità giudiziaria", "correct": false }
    ],
    "info": "In fase di liquidazione, la restituzione del capitale è subordinata al soddisfacimento dei creditori sociali (art. 2491 c.c.)."
  },
  {
    "q": "10 La decisione di riduzione reale del capitale sociale nelle more dei termini per l'opposizione dei creditori:",
    "options": [
      { "text": "È inefficace", "correct": true },
      { "text": "È efficacie, ma non eseguibile", "correct": false },
      { "text": "È invalida", "correct": false },
      { "text": "È eseguibile, ma non efficace", "correct": false }
    ],
    "info": "L'esecuzione della riduzione è sospesa fino alla scadenza del termine per l'opposizione (o fino alla decisione del tribunale), poiché la delibera è sotto condizione sospensiva."
  },
  {
    "q": "1 Presupposto perché scatti la disciplina della riduzione del capitale sociale per perdite è che:",
    "options": [
      { "text": "La perdita sia inferiore ad 1/3 del capitale sociale", "correct": false },
      { "text": "La perdita sia pari ad 1/3 del capitale sociale", "correct": false },
      { "text": "La perdita sia inferiore ad 1/2 del capitale sociale", "correct": false },
      { "text": "La perdita sia superiore ad 1/3 del capitale sociale", "correct": true }
    ],
    "info": "Il superamento di 1/3 del capitale è la soglia critica prevista dall'art. 2482-bis c.c. che impone l'intervento dei soci."
  },
  {
    "q": "2 Presupposto perché scatti la disciplina della riduzione del capitale sociale per perdite, ex art. 2482 bis c.c. :",
    "options": [
      { "text": "È necessario che la perdita \"rilevante\" porti il capitale al disotto del minimo fissato dalla legge", "correct": false },
      { "text": "È necessario che la perdita \"rilevante\" non porti il capitale al disotto del minimo fissato dalla legge", "correct": true },
      { "text": "È necessario che la perdita, benché irrilevante, porti il capitale al disotto del minimo fissato dalla legge", "correct": false },
      { "text": "È necessario che la perdita azzeri il capitale sociale", "correct": false }
    ],
    "info": "Se la perdita supera 1/3 ma il capitale resta sopra il minimo legale, si applica il 2482-bis (riduzione facoltativa o differimento perdite). Se scende sotto il minimo, si applica il 2482-ter."
  },
  {
    "q": "3 Il concetto di \"perdita\" è:",
    "options": [
      { "text": "Sovrapponibile a quello di passività", "correct": false },
      { "text": "Sovrapponibile a quello di costo", "correct": false },
      { "text": "Non sovrapponibile a quello di passività", "correct": true },
      { "text": "Sovrapponibile a quello di dedito", "correct": false }
    ],
    "info": "La perdita è una variazione negativa del patrimonio netto, mentre la passività è un debito; sono concetti distinti in bilancio."
  },
  {
    "q": "4 Il concetto di \"perdita\" si ricava:",
    "options": [
      { "text": "Al netto delle riserve e degli utili accantonati o di esercizio", "correct": true },
      { "text": "Non considerando le riserve, ma al netto degli utili accantonati o di esercizio", "correct": false },
      { "text": "Al netto delle riserve, ma non considerando gli utili accantonati o di esercizio", "correct": false },
      { "text": "Al netto delle riserve, ma non considerando solo gli utili di esercizio", "correct": false }
    ],
    "info": "Per calcolare se il capitale è intaccato, bisogna prima 'assorbire' la perdita utilizzando tutte le riserve (utili, sovrapprezzo, ecc.)."
  },
  {
    "q": "5 Allorché si accerti la ricorrenza di una perdita rilevante l'organo gestorio:",
    "options": [
      { "text": "Ha il dovere di convocare l'assemblea affinché assuma gli opportuni provvedimenti", "correct": true },
      { "text": "Ha la facoltà di convocare l'assemblea affinché assuma gli opportuni provvedimenti", "correct": false },
      { "text": "Ha il dovere di informare solo l'organo di controllo", "correct": false },
      { "text": "Ha il dovere di informare l'autorità giudiziaria", "correct": false }
    ],
    "info": "È un obbligo amministrativo inderogabile per garantire la trasparenza e la continuità aziendale."
  },
  {
    "q": "6 La fusione:",
    "options": [
      { "text": "Non può essere considerata un \"opportuno provvedimento\"", "correct": false },
      { "text": "Può essere considerata un \"opportuno provvedimento\"", "correct": true },
      { "text": "È vietata in presenza di perdite \"rilevanti\"", "correct": false },
      { "text": "La legge, espressamente, la qualifica come \"opportuno provvedimento\"", "correct": false }
    ],
    "info": "Qualsiasi operazione che risani il capitale (fusione, scissione, aumento capitale, riduzione) è considerata un 'opportuno provvedimento'."
  },
  {
    "q": "7 La riduzione del capitale sociale nell'esercizio in cui la perdita è stata rilevata:",
    "options": [
      { "text": "Non può essere considerata un \"opportuno provvedimento\"", "correct": false },
      { "text": "È vietata dalla legge", "correct": false },
      { "text": "La legge, espressamente, la qualifica come \"opportuno provvedimento\"", "correct": false },
      { "text": "Può essere considerata un \"opportuno provvedimento\"", "correct": true }
    ],
    "info": "La riduzione per perdite è il provvedimento tipico per adeguare il capitale nominale alla realtà patrimoniale degradata."
  },
  {
    "q": "8 L'art. 2482 ter c.c., tenuto conto delle novelle legislative in materia:",
    "options": [
      { "text": "Può trovare applicazione nel caso in cui la perdita rilevante porti il capitale sociale sotto la soglia dei 10.000 Euro", "correct": false },
      { "text": "Può trovare applicazione nel caso in cui la perdita rilevante porti il capitale sociale sotto la soglia dei 50.000 Euro", "correct": false },
      { "text": "Può trovare applicazione nel caso in cui la perdita rilevante porti il capitale sociale sotto la soglia di 1 Euro", "correct": true },
      { "text": "Non può più trovare applicazione in materia di s.r.l", "correct": false }
    ],
    "info": "L'art. 2482-ter si applica quando il capitale scende sotto il minimo legale (anche 1 euro per le S.r.l. semplificate)."
  },
  {
    "q": "9 L'aumento di capitale che segue alla delibera di riduzione ex art. 2482 ter c.c.:",
    "options": [
      { "text": "Non deve essere contestualmente sottoscritto dai soci in sede assembleare", "correct": true },
      { "text": "Deve essere contestualmente sottoscritto dai soci in sede assembleare", "correct": false },
      { "text": "Non prevede la partecipazione dei soci, ma solo di soggetti terzi", "correct": false },
      { "text": "Deve essere sottoscritto dai soci necessariamente in un momento diverso da quello assembleare", "correct": false }
    ],
    "info": "Sebbene l'operazione debba essere immediata, la legge non impone un unico atto contestuale fisicamente, ma l'operazione deve avvenire senza soluzione di continuità."
  },
  {
    "q": "10 La trasformazione, nei casi di cui all'art. 2482 ter c.c.:",
    "options": [
      { "text": "È uno strumento cumulativo alla riduzione e alla ricapitalizzazione della società per evitare lo scioglimento", "correct": false },
      { "text": "È uno strumento alternativo alla riduzione e ricapitalizzazione della società per evitare lo scioglimento", "correct": true },
      { "text": "Deve essere necessariamente preceduta dalla riduzione del capitale sociale", "correct": false },
      { "text": "Deve essere necessariamente preceduta dalla ricapitalizzazione dell'ente", "correct": false }
    ],
    "info": "Se non si vuole ricapitalizzare o ridurre, la trasformazione in altro tipo (es. società di persone) è l'alternativa per evitare la liquidazione."
  },
  {
    "q": "1 Prima della riforma del 2003 la s.r.l.:",
    "options": [
      { "text": "Non poteva emettere titoli di debito", "correct": true },
      { "text": "Poteva emettere indiscriminatamente titoli di debito", "correct": false },
      { "text": "Poteva emettere titoli di debito solo nei limiti del 50% del valore del proprio patrimonio netto", "correct": false },
      { "text": "Poteva emettere titoli di debito solo nei limiti del doppio del valore del proprio patrimonio netto", "correct": false }
    ],
    "info": "La disciplina originale del 1942 non prevedeva l'emissione di titoli di debito per le S.r.l., novità introdotta solo nel 2003."
  },
  {
    "q": "2 Dopo la riforma del 2003 la s.r.l.:",
    "options": [
      { "text": "Non può emettere titoli di debito", "correct": false },
      { "text": "Può emettere indiscriminatamente titoli di debito", "correct": true },
      { "text": "Può emettere titoli di debito solo nei limiti del 50% del valore del proprio patrimonio netto", "correct": false },
      { "text": "Può emettere titoli di debito solo nei limiti del doppio del valore del proprio patrimonio netto", "correct": false }
    ],
    "info": "L'art. 2483 c.c. ha introdotto la possibilità di emettere titoli di debito, senza limiti rigidi di rapporto capitale/debito come nelle S.p.A."
  },
  {
    "q": "3 I titoli di debito:",
    "options": [
      { "text": "Vengono definiti dal Legislatore", "correct": false },
      { "text": "Vengono definiti tramite rinvio alla normativa s.p.a", "correct": false },
      { "text": "Vengono definiti tramite rinvio alla normativa delle società a vocazione personalistica", "correct": false },
      { "text": "Non trovano puntuale definizione nel dato positivo", "correct": true }
    ],
    "info": "Il legislatore non definisce i titoli di debito in modo analitico, lasciando ampia libertà di modellazione statutaria."
  },
  {
    "q": "4 I titoli di debito:",
    "options": [
      { "text": "Danno luogo ad una operazione di raccolta del risparmio", "correct": true },
      { "text": "Non danno luogo ad una operazione di raccolta del risparmio", "correct": false },
      { "text": "Possono dare luogo ad una operazione di raccolta del risparmio solo se sono modulati in tale maniera dall'organo emittente", "correct": false },
      { "text": "Costituiscono un'ipotesi di sollecitazione all'investimento", "correct": false }
    ],
    "info": "L'emissione di titoli è una forma di raccolta del risparmio di terzi (finanziamento esterno)."
  },
  {
    "q": "5 Al fine dell'emissione dei titoli di debito:",
    "options": [
      { "text": "È necessaria un'apposita previsione statutaria", "correct": true },
      { "text": "Non è necessaria un'apposita previsione statutaria bastando allo scopo l'assenso dell'organo amministrativo", "correct": false },
      { "text": "Non è necessaria un'apposita previsione statutaria bastando allo scopo l'assenso dell'organo di controllo", "correct": false },
      { "text": "Non è necessaria un'apposita previsione statutaria bastando allo scopo l'autorizzazione giudiziale", "correct": false }
    ],
    "info": "L'atto costitutivo deve espressamente attribuire il potere di emettere titoli di debito (art. 2483 c.c.)."
  },
  {
    "q": "6 L'emissione dei titoli di debito può essere decisa:",
    "options": [
      { "text": "Solo e sempre dai soci", "correct": false },
      { "text": "Solo e sempre dagli amministratori", "correct": false },
      { "text": "Solo e sempre dai soci previo parere dell'organo amministrativo", "correct": false },
      { "text": "Alternativamente dai soci o dagli amministratori a seconda di cosa preveda, al riguardo l'atto costitutivo", "correct": true }
    ],
    "info": "La S.r.l. gode di estrema flessibilità: lo statuto può assegnare la competenza all'assemblea dei soci o all'organo amministrativo."
  },
  {
    "q": "7 La decisione di emissione dei titoli di debito:",
    "options": [
      { "text": "Deve essere trascritta nei pubblici registri", "correct": false },
      { "text": "Deve essere registrata", "correct": false },
      { "text": "Deve essere annotata nei pubblici registri", "correct": false },
      { "text": "Deve essere iscritta presso il Registro delle imprese", "correct": true }
    ],
    "info": "La delibera di emissione deve essere iscritta al Registro delle Imprese per dare pubblicità ai terzi del debito contratto."
  },
  {
    "q": "8 Possono sottoscrivere titoli di debito:",
    "options": [
      { "text": "Solo investitori professionali", "correct": true },
      { "text": "Solo invertitori non professionali", "correct": false },
      { "text": "Investitori professionali e non professionali", "correct": false },
      { "text": "Solo i soci", "correct": false }
    ],
    "info": "L'art. 2483 impone che la sottoscrizione sia riservata a investitori professionali (soggetti qualificati) per tutelare i risparmiatori non esperti."
  },
  {
    "q": "9 La nozione di \"investitore professionale\":",
    "options": [
      { "text": "Si ritrova nel codice civile", "correct": false },
      { "text": "Si ritrova nel testo unico in materia di finanza", "correct": true },
      { "text": "Si ritrova nel testo unico bancario", "correct": false },
      { "text": "Non è reperibile nelle fonti normative", "correct": false }
    ],
    "info": "La definizione è contenuta nel Testo Unico della Finanza (TUF - D.Lgs. 58/1998) e nel Regolamento Intermediari Consob."
  },
  {
    "q": "10 Le banche sono:",
    "options": [
      { "text": "Clienti professionali di diritto", "correct": true },
      { "text": "Clienti professionali su richiesta", "correct": false },
      { "text": "Clienti non professionali", "correct": false },
      { "text": "Clienti professionali di diritto o a richiesta a seconda della loro dimensione", "correct": false }
    ],
    "info": "Le banche, gli intermediari finanziari e altre istituzioni sono qualificati dalla legge come 'clienti professionali di diritto' (art. 6 TUF)."
  },
  {
    "q": "1 I titoli di debito emessi dalle s.r.l.:",
    "options": [
      { "text": "Sono idonei alla circolazione", "correct": true },
      { "text": "Non sono idonei alla circolazione", "correct": false },
      { "text": "Per essere idonei alla circolazione occorre il placet dell'organo amministrativo", "correct": false },
      { "text": "Per essere idonei alla circolazione occorre il placet dell'organo di controllo", "correct": false }
    ],
    "info": "I titoli di debito sono strumenti finanziari che, per loro natura, circolano sul mercato, trasferendo il diritto al credito."
  },
  {
    "q": "2 I titoli di debito emessi dalle s.r.l.:",
    "options": [
      { "text": "Possono essere sottoscritti solo da investitori professionali", "correct": true },
      { "text": "Possono essere sottoscritti solo da investitori non professionali", "correct": false },
      { "text": "Possono essere sottoscritti solo dai soci", "correct": false },
      { "text": "Possono essere sottoscritti solo dagli istituti di credito", "correct": false }
    ],
    "info": "La legge richiede espressamente che il primo sottoscrittore sia un investitore professionale (soggetto sotto vigilanza), che funge da 'garante' per le successive circolazioni."
  },
  {
    "q": "3 Nel caso in cui il socio acquisti dal primo sottoscrittore i titoli di debito emessi dalla s.r.l.:",
    "options": [
      { "text": "Sono garantiti dal primo sottoscrittore in ordine all'insolvenza della società", "correct": false },
      { "text": "Non sono garantiti dal primo sottoscrittore in ordine all'insolvenza della società", "correct": true },
      { "text": "Il primo sottoscrittore deve concedere una garanzia convenzionale in ordine all'insolvenza della società", "correct": false },
      { "text": "Il primo sottoscrittore deve concedere una garanzia convenzionale in ordine alla propria insolvenza", "correct": false }
    ],
    "info": "La responsabilità del sottoscrittore professionale riguarda la solvenza della società emittente verso chi acquista i titoli, non è una garanzia volontaria aggiuntiva ma un obbligo legale."
  },
  {
    "q": "4 Nel caso in cui il socio acquisti dal primo sottoscrittore i titoli di debito emessi dalla s.r.l.:",
    "options": [
      { "text": "Non troverà mai applicazione l'art. 2467 c.c", "correct": false },
      { "text": "Il rimborso al medesimo sarà sempre posposto rispetto a quello degli altri creditori", "correct": false },
      { "text": "Il rimborso al medesimo sarà posposto rispetto a quello degli altri creditori solo ove ricorrano i presupposti di cui all'art. 2467 c.c", "correct": true },
      { "text": "Il rimborso al medesimo non sarà mai posposto rispetto a quello degli altri creditori anche ove ricorrano i presupposti di cui all'art. 2467 c.c", "correct": false }
    ],
    "info": "Se il socio ha finanziato la società in un momento di crisi (art. 2467 c.c.), il credito da titoli di debito può essere postergato a quello degli altri creditori."
  },
  {
    "q": "5 La responsabilità in garanzia di cui all'art. 2483, comma 2° c.c., nel caso di più cessioni dei titoli, riguarda:",
    "options": [
      { "text": "Solo il primo sottoscrittore professionale", "correct": true },
      { "text": "Tutti i sottoscrittori professionali che abbiano acquistato nel tempo tali titoli", "correct": false },
      { "text": "Solo l'ultimo sottoscrittore professionale che abbia acquistato siffatti titoli", "correct": false },
      { "text": "Nessuno dei precedenti sottoscrittori professionali, appuntandosi, in tal caso, la responsabilità solo sulla società", "correct": false }
    ],
    "info": "Il primo sottoscrittore professionale garantisce la solvenza della società verso i successivi acquirenti. Tale responsabilità permane anche nelle cessioni successive."
  },
  {
    "q": "6 Il divieto relativo di circolazione dei titoli di debito:",
    "options": [
      { "text": "Non è mai ammissibile", "correct": false },
      { "text": "È ammissibile", "correct": true },
      { "text": "È ammissibile solo se deciso all'unanimità dai soci", "correct": false },
      { "text": "È ammissibile quando deciso dai soci previo parere conforme dell'organo amministrativo", "correct": false }
    ],
    "info": "Lo statuto o la delibera di emissione possono prevedere vincoli alla circolazione (es. clausole di gradimento o prelazione)."
  },
  {
    "q": "7 L'esenzione parziale e convenzionale della responsabilità del primo sottoscrittore professionale in caso di successive cessioni:",
    "options": [
      { "text": "È ammissibile", "correct": true },
      { "text": "Nono è mai ammissibile", "correct": false },
      { "text": "È ammissibile solo se deciso all'unanimità dai soci", "correct": false },
      { "text": "È ammissibile quando deciso dai soci previo parere conforme dell'organo amministrativo", "correct": false }
    ],
    "info": "L'autonomia negoziale consente di modulare la garanzia prestata dal sottoscrittore professionale."
  },
  {
    "q": "8 La società emittente:",
    "options": [
      { "text": "Non risponde mai del mancato rimborso ai titolari dei titoli di debito scaduti", "correct": false },
      { "text": "Risponde sempre e solo lei per mancato rimborso ai titolari dei titoli di debito scaduti", "correct": false },
      { "text": "Per il mancato rimborso ai titolari dei titoli di debito scaduti risponde la società solo dopo che costoro abbiano escusso il garante", "correct": false },
      { "text": "Risponde solidalmente con il garante il quale verrà coinvolto nella vicenda solo nel caso in cui il debitore principale non abbia adempiuto", "correct": true }
    ],
    "info": "Il sottoscrittore professionale agisce come garante legale (fideiussore ex lege), quindi la responsabilità è solidale."
  },
  {
    "q": "9 La responsabilità dell'investitore professionale:",
    "options": [
      { "text": "È oggettiva", "correct": true },
      { "text": "Nasce solo se e quando l'ente emittente non adempia", "correct": false },
      { "text": "Necessita di una valutazione dell'elemento soggettivo del soggetto responsabile", "correct": false },
      { "text": "Scatta solo se il responsabile risulta consapevole del rischio sotteso all'investimento", "correct": false }
    ],
    "info": "La responsabilità del sottoscrittore professionale per la solvenza della società è una garanzia oggettiva prevista dalla legge (non richiede dolo o colpa)."
  },
  {
    "q": "10 Se i titoli di debito vengono sottoscritti, subito dopo l'emissione, dai soci:",
    "options": [
      { "text": "L'operazione sarà annullabile", "correct": false },
      { "text": "L'operazione sarà inefficacie nei riguardi degli altri creditori", "correct": false },
      { "text": "L'operazione sarà inefficacie nei riguardi della società", "correct": false },
      { "text": "L'operazione sarà nulla", "correct": true }
    ],
    "info": "L'art. 2483 c.c. richiede che il primo sottoscrittore sia un 'investitore professionale' vigilato. Se sottoscrivono i soci (che non sono investitori professionali vigilati), si viola la norma imperativa, con conseguente nullità."
  },
  {
    "q": "1 Il processo di semplificazione della disciplina della s.r.l. è iniziato nel:",
    "options": [
      { "text": "1942", "correct": false },
      { "text": "1993", "correct": false },
      { "text": "2003", "correct": false },
      { "text": "2012", "correct": true }
    ],
    "info": "Il Decreto Crescita (D.L. 179/2012) ha introdotto la S.r.l. Semplificata (S.r.l.s.) per favorire la nascita di nuove imprese."
  },
  {
    "q": "2 Originariamente la \"semplificazione\":",
    "options": [
      { "text": "Poteva determinare l'insorgenza di s.r.l. semplificate oppure a capitale ridotto", "correct": true },
      { "text": "Poteva solo determinare l'insorgenza di s.r.l. a capitale ridotto", "correct": false },
      { "text": "Poteva solo determinare l'insorgenza di s.r.l. semplificate", "correct": false },
      { "text": "Non poteva riguardare il modello s.r.l", "correct": false }
    ],
    "info": "La riforma del 2012 ha inizialmente previsto sia la S.r.l. semplificata (modello standardizzato) sia la S.r.l. a capitale ridotto (poi confluite in un unico modello)."
  },
  {
    "q": "3 Oggi la s.r.l.s.:",
    "options": [
      { "text": "È una tipologia societaria autonoma", "correct": false },
      { "text": "È una tipologia societaria ibrida", "correct": false },
      { "text": "è un sottotipo della s.r.l", "correct": true },
      { "text": "Non differisce in nulla, sotto il profilo disciplinare, dalla s.r.l. \"tradizionale\"", "correct": false }
    ],
    "info": "La S.r.l.s. non è un nuovo tipo sociale, ma una variante (sottotipo) della S.r.l. ordinaria, soggetta in quanto compatibile alla disciplina di quest'ultima (art. 2463-bis c.c.)."
  },
  {
    "q": "4 Il capitale sociale della s.r.l.s. deve essere:",
    "options": [
      { "text": "Superiore a 10.000 Euro", "correct": false },
      { "text": "Superiore a 50.000 Euro", "correct": false },
      { "text": "Compreso tra 10.000 e 50.000 Euro", "correct": false },
      { "text": "Compreso tra 1 e 9.999 Euro", "correct": true }
    ],
    "info": "Il capitale sociale della S.r.l.s. deve essere pari almeno a 1 euro e inferiore a 10.000 euro."
  },
  {
    "q": "5 Soci della s.r.l.s.:",
    "options": [
      { "text": "Possono solo essere persone fisiche", "correct": true },
      { "text": "Possono solo essere persone giuridiche", "correct": false },
      { "text": "Possono essere persone fisiche e giuridiche, ma non enti", "correct": false },
      { "text": "Possono essere persone fisiche ed enti, ma non persone giuridiche", "correct": false }
    ],
    "info": "La normativa vigente (art. 2463-bis c.c.) limita la compagine sociale della S.r.l.s. esclusivamente a persone fisiche."
  },
  {
    "q": "6 La s.r.l.s. può essere costituita:",
    "options": [
      { "text": "Solo per contratto", "correct": false },
      { "text": "Solo per atto unilaterale", "correct": false },
      { "text": "Tanto per contratto quanto per atto unilaterale", "correct": true },
      { "text": "Solo per pubblica sottoscrizione", "correct": false }
    ],
    "info": "Come la S.r.l. ordinaria, anche la S.r.l.s. può nascere per atto unilaterale (socio unico) o per contratto pluripersonale."
  },
  {
    "q": "7 La costituzione della s.r.l.s.:",
    "options": [
      { "text": "Deve essere pubblicizzata solo nel Registro delle imprese", "correct": false },
      { "text": "Deve essere pubblicizzata nel Registro delle imprese e occorre, inoltre, rispettare il disposto dell'art. 2463 bis, comma 3° c.c.", "correct": true },
      { "text": "Deve solo essere assoggettata al regime pubblicitario fissato dell'art. 2463 bis, comma 3° c.c.", "correct": false },
      { "text": "Deve solo essere riportata sul sito internet della società", "correct": false }
    ],
    "info": "Oltre all'iscrizione al Registro Imprese, la S.r.l.s. deve conformarsi al modello standard tipizzato dall'art. 2463-bis c.c."
  },
  {
    "q": "8 Le persone giuridiche e gli enti:",
    "options": [
      { "text": "Non possono mai diventare soci della s.r.l.s", "correct": true },
      { "text": "Possono sempre diventare soci della s.r.l.s", "correct": false },
      { "text": "Possono diventare soci solo se partecipano alla fase genetica della società", "correct": false },
      { "text": "Possono diventare soci solo se acquistano successivamente le partecipazioni della società", "correct": false }
    ],
    "info": "Il divieto per persone giuridiche ed enti di essere soci è un tratto caratteristico della S.r.l.s., volto a evitare che imprese complesse utilizzino questo modello semplificato."
  },
  {
    "q": "9 L'amministrazione pluripersonale disgiuntiva nella s.r.l.s.:",
    "options": [
      { "text": "È ammissibile sempre", "correct": false },
      { "text": "Non è ammissibile mai", "correct": true },
      { "text": "Può essere scelta dai soci", "correct": false },
      { "text": "È imposta dalla legge per tale modello societario", "correct": false }
    ],
    "info": "Il modello di atto costitutivo standard per la S.r.l.s. tende a prevedere una struttura amministrativa semplificata, escludendo modelli complessi come quella disgiuntiva."
  },
  {
    "q": "10 Nella s.r.l.s. il potere rappresentativo:",
    "options": [
      { "text": "Spetta solo agli amministratori delegati", "correct": false },
      { "text": "Spetta solo al presidente del consiglio di amministrazione", "correct": false },
      { "text": "È generale e compete a tutti gli amministratori disgiuntamente tra loro", "correct": true },
      { "text": "Compete solo ai membri del comitato esecutivo", "correct": false }
    ],
    "info": "Nel modello standard, il potere di rappresentanza è generalizzato e distribuito tra gli amministratori per garantire massima operatività."
  },
  {
    "q": "1 Nella s.r.l.s., nella fase genetica, si può conferire:",
    "options": [
      { "text": "Solo denaro", "correct": true },
      { "text": "Ogni utilità suscettibile di valutazione economica ivi inclusa l'opera o la prestazione di servizi", "correct": false },
      { "text": "Ogni utilità suscettibile di valutazione economica con l'esclusione di opera e/o servizi", "correct": false },
      { "text": "Ogni utilità suscettibile di valutazione economica con l'esclusione di opera e/o servizi e beni immobili", "correct": false }
    ],
    "info": "Per la S.r.l.s. è consentito solo il conferimento in denaro, al fine di evitare le complessità (e i costi) delle perizie di stima."
  },
  {
    "q": "2 Nella s.r.l.s., nella fase genetica, i conferimenti:",
    "options": [
      { "text": "Devono essere liberato solo per il 25% di quanto sottoscritto", "correct": false },
      { "text": "Devono essere integralmente liberati", "correct": true },
      { "text": "Possono essere liberati in un momento successivo", "correct": false },
      { "text": "Possono essere integralmente liberati o, in alternativa, l'immediata sottoscrizione può essere supplita dal rilascio di opportune garanzie", "correct": false }
    ],
    "info": "A differenza della S.r.l. ordinaria, nella S.r.l.s. il conferimento in denaro deve essere versato integralmente all'organo amministrativo al momento della sottoscrizione."
  },
  {
    "q": "3 Nella s.r.l.s. può essere ravvisata:",
    "options": [
      { "text": "Solo la funzione produttiva del capitale sociale", "correct": false },
      { "text": "Solo la funzione di garanzia del capitale sociale", "correct": false },
      { "text": "Tanto la funzione produttiva quanto quella di garanzia del capitale sociale", "correct": false },
      { "text": "Solo la funzione organizzativa del capitale sociale", "correct": true }
    ],
    "info": "Data la esiguità del capitale (che può essere anche solo 1 euro), questo perde la sua funzione di garanzia verso i terzi, assumendo una valenza prettamente organizzativa."
  },
  {
    "q": "4 Nella s.r.l.s. l'aumento di capitale sociale a pagamento:",
    "options": [
      { "text": "Può essere sempre riservato a terzi", "correct": false },
      { "text": "Non può mai essere riservato a terzi", "correct": true },
      { "text": "Può essere riservato a terzi oppure no a seconda della previsione statutaria", "correct": false },
      { "text": "Può essere riservato a terzi oppure no a seconda della decisone dell'organo amministrativo", "correct": false }
    ],
    "info": "La S.r.l.s. non ammette l'ingresso di terzi che non siano persone fisiche (e che devono sottostare alle limitazioni del modello)."
  },
  {
    "q": "5 Nella s.r.l.s. la parte inoptata dai soci di un aumento di capitale sociale a pagamento:",
    "options": [
      { "text": "Può essere sempre riservato a terzi", "correct": false },
      { "text": "Non può mai essere riservato a terzi", "correct": false },
      { "text": "Può essere riservato a terzi oppure no a seconda della previsione statutaria", "correct": false },
      { "text": "Può essere riservato a terzi solo nel caso in cui i medesimi non siano enti o persone giuridiche", "correct": true }
    ],
    "info": "L'apertura a terzi è consentita solo se tali soggetti possiedono i requisiti previsti per i soci della S.r.l.s. (persone fisiche)."
  },
  {
    "q": "6 La disciplina della riduzione \"reale\" prevista per le s.r.l.:",
    "options": [
      { "text": "è compatibile con la s.r.l.s", "correct": false },
      { "text": "è incompatibile con la s.r.l.s", "correct": true },
      { "text": "Trova puntuale conferma nell'art. 2463 bis c.c", "correct": false },
      { "text": "Non può essere applicato alla s.r.l.s perché per essa è regolata con modalità alternative dalla legge", "correct": false }
    ],
    "info": "La riduzione reale del capitale nella S.r.l.s. è complicata dai limiti rigidi di capitale (minimo 1 euro) e dalla natura del modello, che mal si concilia con la restituzione ai soci."
  },
  {
    "q": "7 La disciplina della riduzione \"nominale\" prevista per le s.r.l.:",
    "options": [
      { "text": "è compatibile con la s.r.l.s", "correct": true },
      { "text": "Non può essere applicato alla s.r.l.s perché per essa è regolata con modalità alternative dalla legge", "correct": false },
      { "text": "trova puntuale conferma nell'art. 2463 bis c.c.", "correct": false },
      { "text": "è incompatibile con la s.r.l.s", "correct": false }
    ],
    "info": "La riduzione nominale (per perdite) si applica anche alla S.r.l.s., poiché è necessario adeguare il capitale nominale a quello reale in caso di perdite, seguendo l'iter della S.r.l. ordinaria."
  },
  {
    "q": "8 Il passaggio da s.r.l.s. a s.r.l.:",
    "options": [
      { "text": "Implica una trasformazione omogenea progressiva", "correct": false },
      { "text": "Implica una trasformazione eterogenea", "correct": false },
      { "text": "Implica una trasformazione omogenea regressiva", "correct": false },
      { "text": "Non da luogo ad una trasformazione in senso tecnico", "correct": true }
    ],
    "info": "Si tratta di una modifica dell'atto costitutivo (cambio statuto), non di un cambio del 'tipo' societario, quindi non è una trasformazione in senso tecnico."
  },
  {
    "q": "9 Il passaggio da s.r.l. ordinaria a s.r.l.s.:",
    "options": [
      { "text": "È inammissibile", "correct": false },
      { "text": "È ammissibile sempre", "correct": true },
      { "text": "È regolato espressamente dalla legge", "correct": false },
      { "text": "È ammissibile se adottato il voto unanime dei soci", "correct": false }
    ],
    "info": "È possibile modificare lo statuto per adottare il modello S.r.l.s., a condizione che vengano rispettati i requisiti (es. solo persone fisiche, capitale inferiore a 10.000€)."
  },
  {
    "q": "10 Il passaggio da s.r.l. a capitale inferiore a 10.00 Euro a s.r.l.s.:",
    "options": [
      { "text": "È ammissibile sempre", "correct": false },
      { "text": "È inammissibile quando i soci siano tutte persone fisiche", "correct": false },
      { "text": "È regolato espressamente dalla legge", "correct": false },
      { "text": "è ammissibile purché, nel nuovo assetto societario, siano rispettati i requisiti della s.r.l.s", "correct": true }
    ],
    "info": "Il passaggio è legittimo se la S.r.l. ordinaria (già a capitale ridotto) adegua lo statuto al modello standard della S.r.l.s."
  },
  {
    "q": "1 Nella s.r.l. a capitale inferiore a 10.000 Euro la riserva di accumulo:",
    "options": [
      { "text": "È un tratto caratterizzante", "correct": true },
      { "text": "Non è un tratto caratterizzante", "correct": false },
      { "text": "Non è normativamente prevista", "correct": false },
      { "text": "Può essere esclusa dall'autonomia privata", "correct": false }
    ],
    "info": "Nelle società a capitale ridotto, la riserva di accumulo è obbligatoria per legge per rafforzare gradualmente la garanzia patrimoniale."
  },
  {
    "q": "2 Nella s.r.l. a capitale inferiore a 10.000 Euro il versamento dei conferimenti a mani degli amministratori:",
    "options": [
      { "text": "È un tratto caratterizzante perché tipico di tale allestimento societario", "correct": false },
      { "text": "Non è un tratto caratterizzante perché comune a tutte le configurazioni di s.r.l", "correct": true },
      { "text": "Non è normativamente previsto", "correct": false },
      { "text": "Ha carattere dispositivo perché può essere superato dall'autonomia privata", "correct": false }
    ],
    "info": "Il versamento nelle mani degli amministratori è una modalità standard valida per ogni S.r.l., non specifica della versione a capitale ridotto."
  },
  {
    "q": "3 Il capitale minimo della s.r.l. oggi è di Euro:",
    "options": [
      { "text": "10000", "correct": false },
      { "text": "50000", "correct": false },
      { "text": "1", "correct": true },
      { "text": "2500", "correct": false }
    ],
    "info": "La riforma ha permesso la S.r.l. con capitale da 1 euro (a cui si applicano le regole della riserva legale rafforzata)."
  },
  {
    "q": "4 La riserva di accumulo:",
    "options": [
      { "text": "È indistribuibile e indisponibile", "correct": false },
      { "text": "È indistribuibile, ma disponibile", "correct": true },
      { "text": "È distribuibile, ma indisponibile", "correct": false },
      { "text": "Distribuibile e disponibile", "correct": false }
    ],
    "info": "La riserva di accumulo deve essere formata accantonando una quota di utili (20%) fino a raggiungere i 10.000 euro. È indistribuibile per preservare il patrimonio, ma può essere usata per coprire perdite (quindi disponibile per scopi societari)."
  },
  {
    "q": "5 La riserva di accumulo:",
    "options": [
      { "text": "è tipica della s.r.l.s", "correct": false },
      { "text": "È tipica della s.r.l. a capitale inferiore a 10.000 Euro", "correct": false },
      { "text": "È tipica della s.r.l. ordinaria", "correct": false },
      { "text": "Trova cittadinanza tanto in materi dì s.r.l.s. quanto in tema di s.r.l. a capitale inferiore a 10.000 Euro", "correct": true }
    ],
    "info": "L'obbligo di riserva di accumulo è previsto per tutte le S.r.l. che abbiano un capitale inferiore a 10.000 euro, indipendentemente se siano S.r.l.s. o S.r.l. ordinarie."
  },
  {
    "q": "6 La riserva di accumulo nei limiti della sua obbligatorietà:",
    "options": [
      { "text": "Si somma alla riserva legale", "correct": false },
      { "text": "Prende il posto della riserva legale", "correct": true },
      { "text": "Inizia ad essere alimentata solo quando la riserva legale è satura", "correct": false },
      { "text": "Viene alimentata in misura più che proporzionale rispetto alla riserva legale", "correct": false }
    ],
    "info": "Il legislatore ha previsto che la riserva di accumulo sostituisca l'obbligo della riserva legale ordinaria finché il capitale non raggiunge la soglia dei 10.000 euro."
  },
  {
    "q": "7 Il passaggio da una s.r.l.s. a una s.r.l. ordinaria:",
    "options": [
      { "text": "Integra un trasformazione omogenea e progressiva", "correct": false },
      { "text": "Integra un trasformazione eterogenea", "correct": false },
      { "text": "Non integra un fenomeno trasformativo", "correct": true },
      { "text": "Integra un trasformazione omogenea e regressiva", "correct": false }
    ],
    "info": "Come per il passaggio inverso, si tratta di una modifica statutaria che fa decadere il modello semplificato (es. se entrano soci non persone fisiche o si aumenta il capitale)."
  },
  {
    "q": "8 Il passaggio da una s.r.l.s. a una s.r.l. ordinaria:",
    "options": [
      { "text": "Impone un aumento del capitale sociale, gratuito o a pagamento, almeno a 10.000 Euro", "correct": true },
      { "text": "Non impone alcun aumento del capitale sociale", "correct": false },
      { "text": "Impone un aumento del capitale sociale a pagamento per almeno 50.000 Euro", "correct": false },
      { "text": "Impone, di necessità, un aumento oneroso del capitale sociale fino ad Euro 10.000", "correct": false }
    ],
    "info": "Per uscire dalla disciplina S.r.l.s. (che richiede capitale < 10.000€), la società deve aumentare il capitale almeno a 10.000 euro (soglia minima S.r.l. ordinaria)."
  },
  {
    "q": "9 La \"trasformazione\" da s.r.l. ordinaria a s.r.l. a capitale ridotto:",
    "options": [
      { "text": "Può essere attuata mediante una riduzione volontaria del capitale sociale", "correct": false },
      { "text": "Può essere attuata solo allorché sussistano perdite rilevanti che portino la s.r.l. ordinaria al disotto del proprio limite di capitalizzazione minimo", "correct": true },
      { "text": "Può essere attuata, a discrezione dei soci, tanto mediante riduzione volontaria quanto mediante riduzione reale del capitale sociale", "correct": false },
      { "text": "Non può mai essere attuata posto che la scelta organizzativa in commento può essere esercitata solo in fase costitutiva", "correct": false }
    ],
    "info": "La legge non consente una trasformazione 'volontaria' per passare al modello a capitale ridotto (1€) se la società ha già capitale sufficiente. Il passaggio avviene solitamente in caso di perdite (riduzione nominale)."
  },
  {
    "q": "10 Le operazioni di fusione e scissione:",
    "options": [
      { "text": "Sono incompatibili con i nuovi assetti societari fissati dal Legislatore in materia di s.r.l", "correct": false },
      { "text": "Sono compatibili con i nuovi assetti societari fissati dal Legislatore in materia di s.r.l", "correct": true },
      { "text": "Sono espressamente vietate dalla legge in siffatte configurazioni societarie", "correct": false },
      { "text": "Possono essere adottati dai soci purché all'unanimità", "correct": false }
    ],
    "info": "Le operazioni straordinarie di fusione e scissione sono perfettamente compatibili anche con le S.r.l.s. e le S.r.l. a capitale ridotto."
  }
];
    res.json({ questions: questions });
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

// Usa la porta assegnata da Render o la 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server attivo sulla porta ${PORT}`));