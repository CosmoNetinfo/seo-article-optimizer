# Guida al Caricamento su GitHub

## 🎯 Preparazione Prima del Caricamento

### ✅ Checklist di Sicurezza

Prima di caricare su GitHub, verifica che:

- [x] ❌ File `.env.local` NON è incluso (contiene API key)
- [x] ✅ File `.env.example` È incluso (template senza chiavi)
- [x] ❌ File `.zip` NON sono inclusi (troppo grandi: ~1.3 GB totali)
- [x] ❌ Cartelle `node_modules/` NON sono incluse
- [x] ❌ Cartelle `dist*/` NON sono incluse
- [x] ❌ Cartelle `*-Portable/` NON sono incluse
- [x] ✅ File `.gitignore` È aggiornato e completo

### 📂 File che DEVONO essere su GitHub

✅ **Codice Sorgente:**
- `components/` - Componenti React
- `services/` - Logica business (AI, prompt)
- `electron/` - Main process Electron
- `seo-article-optimizer-web/` - App Next.js completa
- `App.tsx`, `index.tsx` - Entry points
- `types.ts` - TypeScript definitions

✅ **Configurazione:**
- `package.json` - Dipendenze e scripts
- `tsconfig.json` - TypeScript config
- `vite.config.ts` - Vite config
- `tailwind.config.js` - Tailwind CSS config
- `.env.example` - Template per variabili ambiente

✅ **Documentazione:**
- `README.md` - Documentazione principale
- `PROMPT-README.md` - Docs prompt AI
- `PROMPT-TEST.md` - Test cases
- `PROMPT-CHANGELOG.md` - Storico modifiche

✅ **Assets:**
- `icon.png` - Icona app
- `SeoOptimizer 4.1.ico` - Icona Windows

### 🚫 File che NON DEVONO essere su GitHub

❌ **File Sensibili:**
- `.env.local` - Contiene `GROQ_API_KEY` (protetto da `.gitignore`)
- `.env` - Qualsiasi file ambiente con chiavi reali

❌ **Build Artifacts:**
- `dist/`, `dist-electron/`, `dist-packager/` - Build outputs
- `.next/`, `out/` - Next.js builds
- `build/` - Generic builds

❌ **Dipendenze:**
- `node_modules/` - NPM packages (troppo grande)

❌ **File Grandi:**
- `SEO-Article-Optimizer-4.1-Portable.zip` (~488 MB)
- `SEO-Article-Optimizer-4.2-Portable.zip` (~855 MB)
- `SEO-Article-Optimizer-4.1-Portable/` - Directory portable

❌ **File Temporanei:**
- `.cache/` - Cache Vite/Electron
- `build_log.txt` - Log build
- `index-backup.tsx` - Backup files

---

## 🚀 Procedura di Caricamento

### 1. **Inizializza il Repository Git (se non già fatto)**

```bash
cd m:/Download/seo-article-optimizer-4.1
git init
```

### 2. **Verifica cosa verrà caricato**

```bash
# Controlla lo status
git status

# Dovresti vedere SOLO i file sicuri
# Se vedi .env.local, .zip o node_modules, FERMATI!
```

### 3. **Aggiungi i file**

```bash
# Aggiungi tutti i file (esclusi quelli in .gitignore)
git add .

# Verifica cosa è stato aggiunto
git status
```

### 4. **Crea il primo commit**

```bash
git commit -m "feat: Initial commit - SEO Article Optimizer v4.1

- Desktop app (Electron + Vite + React)
- Web app (Next.js + PostgreSQL)
- AI-powered SEO optimization with Groq
- Strict length preservation (±10%)
- Minimum 3 images, 2 internal links
- Complete documentation"
```

### 5. **Crea il repository su GitHub**

1. Vai su https://github.com/new
2. Nome: `seo-article-optimizer`
3. Descrizione: `🚀 Ottimizza articoli per SEO con AI senza riscriverli o accorciarli`
4. Visibilità: **Public** o **Private** (scegli tu)
5. **NON** selezionare "Add README" (ce l'hai già)
6. **NON** selezionare ".gitignore" (ce l'hai già)
7. Clicca **"Create repository"**

### 6. **Collega il repository locale a GitHub**

```bash
# Sostituisci TUOUSERNAME con il tuo username GitHub
git remote add origin https://github.com/TUOUSERNAME/seo-article-optimizer.git

# Verifica
git remote -v
```

### 7. **Carica su GitHub**

```bash
# Prima push (crea branch main)
git push -u origin main
```

Se chiede username/password:
- **Username**: Il tuo username GitHub
- **Password**: Usa un **Personal Access Token** (non la password)
  - Vai su: https://github.com/settings/tokens
  - Genera un nuovo token con scope `repo`

---

## 🔐 Configurazione Secrets per GitHub Actions (Opzionale)

Se vuoi configurare CI/CD:

1. Vai su: `https://github.com/TUOUSERNAME/seo-article-optimizer/settings/secrets/actions`
2. Aggiungi questi secrets:
   - `GROQ_API_KEY` - La tua chiave API Groq
   - `DATABASE_URL` - URL database PostgreSQL (per web app)

---

## 📝 README.md per GitHub

Il file `README.md` già presente è ottimizzato per GitHub e include:

- ✅ Banner con immagine
- ✅ Badges (Groq, License, Version)
- ✅ Caratteristiche principali
- ✅ Istruzioni installazione
- ✅ Guida utilizzo
- ✅ Documentazione collegamenti
- ✅ Tecnologie utilizzate
- ✅ Autore e contatti

---

## 🌐 Deploy Versione Web su Vercel (Opzionale)

### 1. **Collega Vercel a GitHub**

1. Vai su https://vercel.com
2. Clicca "New Project"
3. Importa il tuo repository GitHub
4. Seleziona la cartella `seo-article-optimizer-web/`

### 2. **Configura Environment Variables**

Aggiungi su Vercel Dashboard:
- `GROQ_API_KEY` - La tua chiave API Groq
- `DATABASE_URL` - URL database PostgreSQL Neon
- `BASIC_AUTH_USER` - Username per basic auth (opzionale)
- `BASIC_AUTH_PASSWORD` - Password per basic auth (opzionale)

### 3. **Deploy**

Vercel farà il deploy automaticamente!

---

## 🎁 Release Portabili (Opzionale)

Se vuoi includere le versioni portable nelle releases:

### **NON caricarle nel repository!**

Invece:

1. Vai su: `https://github.com/TUOUSERNAME/seo-article-optimizer/releases/new`
2. Tag version: `v4.1.0`
3. Release title: `SEO Article Optimizer v4.1`
4. Descrizione: Copia da `PROMPT-CHANGELOG.md`
5. **Carica i file .zip come assets della release**
   - `SEO-Article-Optimizer-4.1-Portable.zip`
   - `SEO-Article-Optimizer-4.2-Portable.zip`
6. Pubblica la release

In questo modo i file grandi sono disponibili per il download ma non nel repository!

---

## 📋 Checklist Finale

Prima di rendere pubblico il repository:

- [ ] Verificato che `.env.local` NON sia nel repo
- [ ] Verificato che `.gitignore` escluda tutti i file sensibili
- [ ] README.md è completo e chiaro
- [ ] Documentazione (PROMPT-*.md) è inclusa
- [ ] `.env.example` ha template senza chiavi reali
- [ ] Testato clone + `npm install` + `npm run dev` funziona
- [ ] Aggiunto LICENSE file (MIT suggested)
- [ ] Aggiornato package.json con info repository

---

## 🆘 Risoluzione Problemi

### "Git dice che .env.local sta per essere committato!"

```bash
# Rimuovilo immediatamente dal staging
git reset .env.local

# Verificalo è in .gitignore
cat .gitignore | grep "*.local"
```

### "File troppo grande per GitHub"

GitHub ha un limite di 100MB per file. I file .zip sono troppo grandi!

**Soluzione:** Usa GitHub Releases (vedi sezione sopra)

### "Chiave API esposta pubblicamente!"

1. **Revoca immediatamente** la chiave su Groq
2. Rimuovi il file dal git history:
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env.local" \
     --prune-empty --tag-name-filter cat -- --all
   ```
3. Genera una nuova chiave API
4. Aggiorna `.env.local` localmente
5. Force push:
   ```bash
   git push origin --force --all
   ```

---

## ✅ Comando Rapido - Tutto in Uno

Se tutto è pronto:

```bash
cd m:/Download/seo-article-optimizer-4.1
git init
git add .
git commit -m "feat: Initial commit - SEO Article Optimizer v4.1"
git remote add origin https://github.com/TUOUSERNAME/seo-article-optimizer.git
git push -u origin main
```

Sostituisci `TUOUSERNAME` con il tuo username GitHub!

---

## 📞 Supporto

Se hai problemi durante il caricamento:
- Verifica `.gitignore` con `git check-ignore -v <file>`
- Controlla file da committare con `git status`
- Usa `git diff --cached` per vedere i cambiamenti

---

**🎉 Fatto! Il tuo progetto è ora su GitHub!** 🚀

Ricorda di:
1. Aggiungere una stella ⭐ al tuo repository
2. Scrivere una bella descrizione
3. Aggiungere topics: `seo`, `ai`, `groq`, `electron`, `nextjs`, `typescript`
4. Condividere il link su [CosmoNet.info](https://cosmonet.info)!
