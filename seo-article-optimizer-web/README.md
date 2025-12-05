# SEO Article Optimizer - Web App

Applicazione web Next.js per ottimizzare articoli secondo la Checklist SEO di Cosmonet.info, utilizzando l'intelligenza artificiale di Groq.

## 🚀 Caratteristiche

- ✅ Ottimizzazione SEO automatica con AI (Groq LLaMA 3.3)
- ✅ Analisi completa secondo checklist SEO
- ✅ Generazione HTML pulito pronto per WordPress
- ✅ Salvataggio articoli su database PostgreSQL (Neon)
- ✅ Storico articoli con ricerca e paginazione
- ✅ Generazione immagini AI opzionale (Google Gemini)
- ✅ Interfaccia moderna e responsive

## 📋 Requisiti

- Node.js 18+ 
- Account Groq (per API key gratuita)
- Database PostgreSQL (consigliato: Neon - gratuito)
- (Opzionale) Google Gemini API key per generare immagini

## 🔧 Installazione

1. **Clona il repository e installa le dipendenze:**

```bash
cd seo-article-optimizer-web
npm install
```

2. **Configura le variabili d'ambiente:**

Copia `.env.example` in `.env.local` e compila con le tue API keys:

```bash
cp .env.example .env.local
```

Modifica `.env.local`:

```env
# OBBLIGATORIO - Ottieni la chiave gratuita su https://console.groq.com
GROQ_API_KEY=gsk_...

# OBBLIGATORIO - Crea database gratuito su https://neon.tech
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# OPZIONALE - Per generare immagini con AI
GOOGLE_GEMINI_API_KEY=AIza...
```

3. **Inizializza il database:**

```bash
npx prisma generate
npx prisma db push
```

4. **Avvia il server di sviluppo:**

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

## 🎯 Come ottenere le API Keys

### Groq API Key (OBBLIGATORIA)
1. Vai su [console.groq.com](https://console.groq.com)
2. Crea un account gratuito
3. Vai su "API Keys" e genera una nuova chiave
4. Copia la chiave in `.env.local`

### Neon Database (OBBLIGATORIO)
1. Vai su [neon.tech](https://neon.tech)
2. Crea un account gratuito
3. Crea un nuovo progetto/database
4. Copia la connection string in `.env.local`

### Google Gemini (OPZIONALE)
1. Vai su [aistudio.google.com](https://aistudio.google.com)
2. Genera una API key
3. Copia la chiave in `.env.local`

## 📖 Utilizzo

1. **Incolla il tuo articolo** nella textarea a sinistra
2. **Clicca "Ottimizza con IA"** per l'analisi SEO
3. **Visualizza i risultati:**
   - Meta title, description, slug
   - Frase chiave identificata
   - Analisi checklist SEO
   - HTML ottimizzato
4. **(Opzionale) Genera immagini** con AI
5. **Salva l'articolo** nel database
6. **Visualizza lo storico** degli articoli ottimizzati

## ⚠️ IMPORTANTE: L'AI NON Taglia il Contenuto

Il prompt è stato ottimizzato per garantire che l'AI:
- ✅ **MANTIENE** tutto il contenuto originale
- ✅ **AGGIUNGE** solo elementi SEO mancanti
- ✅ **MIGLIORA** la struttura HTML
- ❌ **NON TAGLIA** paragrafi o sezioni
- ❌ **NON RIASSUME** il contenuto

Se l'articolo è lungo 2000 parole, l'output sarà ~2000 parole con ottimizzazioni SEO.

## 🏗️ Stack Tecnologico

- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL (Neon) + Prisma ORM
- **AI:** Groq (LLaMA 3.3) + Google Gemini (immagini)
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript

## 📦 Build per Produzione

```bash
npm run build
npm start
```

## 🚀 Deploy

### Vercel (consigliato)
1. Push il codice su GitHub
2. Importa il progetto su Vercel
3. Configura le variabili d'ambiente
4. Deploy automatico! 🎉

### Altre piattaforme
Compatibile con qualsiasi hosting che supporti Next.js (Railway, Render, ecc.)

## 📝 License

MIT

## 🤝 Supporto

Per problemi o domande, apri una issue su GitHub.
