# Guida al Deploy su Vercel

Questa guida ti aiuterà a pubblicare la versione web di **SEO Article Optimizer** su Vercel.

## 1. Preparazione su GitHub

Assicurati di aver caricato l'ultima versione del codice su GitHub (lo abbiamo appena fatto).

## 2. Configurazione Vercel

1. Vai su [Vercel Dashboard](https://vercel.com/dashboard)
2. Clicca su **"Add New..."** -> **"Project"**
3. Importa il repository `seo-article-optimizer`
4. **IMPORTANTE**: Nella schermata di configurazione:

   ### Framework Preset
   Vercel dovrebbe rilevare automaticamente **Next.js**.

   ### Root Directory
   Clicca su "Edit" accanto a Root Directory e seleziona:
   `seo-article-optimizer-web`

   ### Environment Variables
   Espandi la sezione e aggiungi le seguenti variabili:

   | Nome | Valore | Descrizione |
   |------|--------|-------------|
   | `GROQ_API_KEY` | `gsk_...` | La tua chiave API di Groq |
   | `DATABASE_URL` | `postgres://...` | URL di connessione al database (es. Neon Tech) |
   | `BASIC_AUTH_USER` | `admin` | (Opzionale) Username per proteggere l'accesso |
   | `BASIC_AUTH_PASSWORD` | `password` | (Opzionale) Password per proteggere l'accesso |

## 3. Database (PostgreSQL)

Se non hai ancora un database:

1. Vai su [Neon.tech](https://neon.tech) (gratuito)
2. Crea un nuovo progetto
3. Copia la **Connection String** (scegli "Pooled connection" se disponibile)
4. Incollala come `DATABASE_URL` su Vercel

## 4. Deploy

1. Clicca **"Deploy"**
2. Vercel installerà le dipendenze, genererà il client Prisma e compilerà l'app.
3. Se tutto va bene, vedrai i coriandoli! 🎉

## 5. Risoluzione Problemi Comuni

### Errore: `Prisma Client could not be located`
- Assicurati che nel `package.json` ci sia `"postinstall": "prisma generate"`
- Assicurati che in `vercel.json` ci sia `"installCommand": "npm install && npx prisma generate"`

### Errore: `Invalid DATABASE_URL`
- Controlla di aver copiato l'URL intero, incluso `postgres://` e la password.
- Se usi Neon, assicurati di usare l'endpoint corretto.

### Errore 500 in produzione
- Controlla i Logs su Vercel (tab "Logs")
- Spesso è un problema di connessione al DB o chiave API mancante.

---

## Aggiornamenti Futuri

Ogni volta che fai `git push` sul branch `main`, Vercel aggiornerà automaticamente il sito!
