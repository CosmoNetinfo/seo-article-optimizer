<div align="center">

</div>

# SEO Article Optimizer

> **Ottimizza i tuoi articoli per SEO senza riscriverli o accorciarli**

Un'applicazione desktop (Electron) e web (Next.js) che utilizza l'intelligenza artificiale per ottimizzare articoli seguendo rigorosamente la **Checklist SEO Cosmonet.info**.

[![Powered by Groq](https://img.shields.io/badge/Powered%20by-Groq%20AI-blue)](https://groq.com)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Version](https://img.shields.io/badge/version-4.1-orange)](CHANGELOG.md)

---

## ✨ Caratteristiche Principali

### 🔒 **Validazione Rigorosa della Lunghezza**
- L'AI **DEVE** preservare ±10% della lunghezza originale
- Se l'articolo originale è 1000 parole, l'output sarà 900-1100 parole
- Previene tagli, riassunti eccessivi e perdita di contenuto

### ✅ **Cosa Fa l'AI**
- ✅ MANTIENE tutto il contenuto originale - ogni paragrafo, concetto, dettaglio
- ✅ AGGIUNGE elementi SEO mancanti (meta, keyword, HTML semantico, immagini)
- ✅ MIGLIORA formattazione HTML e struttura titoli (H1, H2, H3)
- ✅ INSERISCE la frase chiave naturalmente (max 10 volte)
- ✅ PRESERVA tono, stile e lunghezza originale

### ❌ **Cosa NON Fa l'AI**
- ❌ NON taglia paragrafi o sezioni
- ❌ NON riassume il contenuto
- ❌ NON accorcia frasi o omette dettagli
- ❌ NON riscrive completamente l'articolo
- ❌ NON riduce la lunghezza

### 📋 **Checklist SEO Cosmonet.info**

L'applicazione garantisce che ogni articolo ottimizzato rispetti:

| Elemento | Requisito |
|----------|-----------|
| **Frase chiave** | Unica, mai usata prima, lunghezza appropriata |
| **Titolo SEO** | Inizia con frase chiave, 50-60 caratteri |
| **Meta Description** | Include frase chiave, max 155 caratteri |
| **URL Slug** | Contiene frase chiave, semplice e descrittivo |
| **Immagini** | **MINIMO 3** segnaposto con ALT ottimizzato |
| **Link interni** | **MINIMO 2** segnaposto |
| **Link esterni** | **MINIMO 1** verso fonti autorevoli |
| **Struttura** | 1 solo H1, H2/H3 gerarchici |
| **Lunghezza** | Preserva ±10% dell'originale |
| **Densità keyword** | Naturale, max 10 occorrenze |

### 🎨 **Output Generato**

Per ogni articolo ottimizzato ricevi:

- ✅ **Frase chiave** primaria SEO-ottimizzata
- ✅ **Titolo SEO** (50-60 caratteri)
- ✅ **Meta description** (max 155 caratteri)
- ✅ **URL slug** ottimizzato
- ✅ **HTML pulito** pronto per WordPress
- ✅ **Tag SEO** pertinenti
- ✅ **Categorie** suggerite (3-5)
- ✅ **Post social media** con hashtag
- ✅ **Analisi checklist** completa (pass/fail/manual_action)

---

## 🚀 Installazione e Avvio

### Versione Desktop (Electron)

**Requisiti:** Node.js (versione 16 o superiore)

1. **Installa le dipendenze:**
   ```bash
   npm install
   ```

2. **Configura la chiave API Groq:**
   - Copia `.env.example` in `.env.local`
   - Inserisci la tua `GROQ_API_KEY`:
     ```env
     GROQ_API_KEY=gsk_your_api_key_here
     ```

3. **Avvia in modalità sviluppo:**
   ```bash
   npm run dev
   ```

4. **Compila per produzione:**
   ```bash
   npm run build
   ```

### Versione Web (Next.js)

La versione web è disponibile nella cartella `seo-article-optimizer-web/`

**Vedi:** [seo-article-optimizer-web/README.md](seo-article-optimizer-web/README.md) per istruzioni dettagliate.

---

## 📖 Utilizzo

### 1. **Incolla il Tuo Articolo**
Copia e incolla l'articolo che vuoi ottimizzare nella textarea di input.

### 2. **Clicca "Ottimizza per SEO"**
L'AI analizzerà l'articolo e genererà l'output ottimizzato.

### 3. **Rivedi i Risultati**
- Frase chiave, titolo, description e slug
- HTML ottimizzato con segnaposto per immagini e link
- Analisi della checklist SEO
- Post social media

### 4. **Modifica (Opzionale)**
Puoi modificare l'HTML direttamente nell'editor integrato.

### 5. **Salva l'Articolo**
Salva localmente per un accesso futuro (desktop) o nel database (web).

### 6. **Copia in WordPress**
Copia l'HTML e incollalo direttamente in WordPress.

---

## ⚙️ Personalizzazione del Prompt

### Come Personalizzare

1. **Clicca sull'icona ⚙️** nell'header dell'applicazione
2. **Modifica il prompt** nell'editor che si apre
3. Il segnaposto `{articleText}` verrà sostituito con l'articolo
4. **Salva le modifiche**

Il prompt personalizzato viene salvato:
- **Desktop:** `localStorage` del browser
- **Web:** Database PostgreSQL

### Ripristinare il Default

1. Apri l'editor del prompt
2. Clicca **"Ripristina Default"**
3. Conferma

---

## 📚 Documentazione Aggiuntiva

### Prompt Configuration
- **[PROMPT-README.md](PROMPT-README.md)** - Documentazione completa del prompt AI
  - Validazione obbligatoria
  - Checklist SEO dettagliata
  - Personalizzazione e best practices

### Test Cases
- **[PROMPT-TEST.md](PROMPT-TEST.md)** - Casi di test per validare il prompt
  - 3 articoli test (breve, medio, lungo)
  - Procedure di validazione
  - Esempi di errori da prevenire

### Changelog
- **[PROMPT-CHANGELOG.md](PROMPT-CHANGELOG.md)** - Storico delle modifiche
  - Modifiche al prompt
  - Nuove funzionalità
  - Confronti prima/dopo

---

## 🛠️ Tecnologie Utilizzate

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool (Desktop)
- **Next.js** - Framework (Web)

### Backend
- **Electron** - Desktop app framework
- **Groq AI** - AI provider (llama-3.3-70b-versatile)
- **Prisma** - ORM (Web version)
- **PostgreSQL** - Database (Web version)

### Editor
- **Monaco Editor** - HTML editor con syntax highlighting

---

## 📁 Struttura del Progetto

```
seo-article-optimizer-4.1/
├── components/              # React components
│   ├── ArticleInput.tsx
│   ├── SeoOutput.tsx
│   ├── PromptEditor.tsx
│   └── LoadModal.tsx
├── services/                # Business logic
│   ├── geminiService.ts     # AI service (Groq)
│   └── prompt.ts            # SEO prompt template
├── electron/                # Electron main process
│   └── main.cjs
├── seo-article-optimizer-web/  # Next.js web version
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── prisma/
├── App.tsx                  # Main React component
├── types.ts                 # TypeScript types
├── PROMPT-README.md         # Prompt documentation
├── PROMPT-TEST.md           # Test cases
└── PROMPT-CHANGELOG.md      # Changelog
```

---

## 🧪 Testing

### Test Rapido

1. Copia uno dei test cases da `PROMPT-TEST.md`
2. Incolla nell'applicazione
3. Clicca "Ottimizza per SEO"
4. Verifica:
   - Lunghezza ±10% dell'originale
   - Minimo 3 segnaposto immagine
   - Minimo 2 link interni
   - 1 link esterno
   - HTML pulito (solo h1-h3, p, blockquote, ol, ul)

### Test Completo

Vedi **[PROMPT-TEST.md](PROMPT-TEST.md)** per procedure dettagliate.

---

## 🤝 Contribuire

I contributi sono benvenuti! Per favore:

1. Fork il repository
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

---

## 📝 License

Questo progetto è rilasciato sotto licenza MIT. Vedi il file `LICENSE` per dettagli.

---

## 👤 Autore

**Daniele Spalletti**

- Website: [CosmoNet.info](https://cosmonet.info)
- GitHub: [@CosmoNetInfo](https://github.com/CosmoNetInfo)

---

## 🙏 Ringraziamenti

- **Groq AI** per l'infrastruttura AI veloce e affidabile
- **Google AI Studio** per il supporto allo sviluppo
- Community open-source per gli strumenti utilizzati

---

## 📞 Supporto

Per domande, bug o richieste di funzionalità:

- Apri un **[Issue](https://github.com/CosmoNetInfo/seo-article-optimizer/issues)** su GitHub
- Visita **[CosmoNet.info](https://cosmonet.info)** per articoli e tutorial
- Email: **info@cosmonet.info**

---

<div align="center">

**Creato con ❤️ da [Daniele Spalletti](https://cosmonet.info)**

*Ottimizza i tuoi contenuti, non comprometterli*

</div>

