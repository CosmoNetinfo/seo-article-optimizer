# Comandi Git per Caricare su GitHub

# IMPORTANTE: Prima di eseguire questi comandi, assicurati di:
# 1. Aver creato un repository su GitHub (https://github.com/new)
# 2. Sostituire "CosmoNetInfo" con il TUO username GitHub se diverso
# 3. Verificare che .env.local NON sia nel repository (è protetto da .gitignore)

# ============================================
# PASSO 1: Inizializza il Repository Git
# ============================================
cd m:/Download/seo-article-optimizer-4.1
git init

# ============================================
# PASSO 2: Verifica Cosa Verrà Caricato
# ============================================
git status

# Dovresti vedere:
# - README.md, package.json, components/, services/, ecc.
# NON dovresti vedere:
# - .env.local (chiavi API)
# - node_modules/ (troppo grande)
# - *.zip (troppo grande)
# - dist*/ directories

# Se vedi file che NON dovrebbero esserci, FERMATI e controlla .gitignore

# ============================================
# PASSO 3: Aggiungi TUTTI i File al Staging
# ============================================
git add .

# Verifica di nuovo
git status

# ============================================
# PASSO 4: Crea il Primo Commit
# ============================================
git commit -m "feat: Initial commit - SEO Article Optimizer v4.1

- Desktop app (Electron + Vite + React)
- Web app (Next.js + PostgreSQL)  
- AI-powered SEO optimization with Groq
- Strict length preservation (±10%)
- Minimum 3 images, 2 internal links
- Customizable AI prompt editor
- Monaco HTML editor
- Local storage (desktop) and DB (web)
- Complete documentation (README, PROMPT docs, tests)
- Italian language support"

# ============================================
# PASSO 5: Collega a GitHub Remote
# ============================================
# Sostituisci "CosmoNetInfo" con il TUO username se diverso
git remote add origin https://github.com/CosmoNetInfo/seo-article-optimizer.git

# Verifica il remote
git remote -v

# ============================================
# PASSO 6: Carica su GitHub (Prima Push)
# ============================================
git branch -M main
git push -u origin main

# Ti verrà chiesto username e password
# Username: Il tuo username GitHub
# Password: Personal Access Token (NON la password account)
#   - Genera token su: https://github.com/settings/tokens
#   - Permessi necessari: "repo" (full control)

# ============================================
# FATTO! 🎉
# ============================================

# Il tuo repository è ora su GitHub!
# Visita: https://github.com/CosmoNetInfo/seo-article-optimizer

# ============================================
# COMANDI UTILI PER IL FUTURO
# ============================================

# Aggiungere modifiche future:
# git add .
# git commit -m "Descrizione delle modifiche"
# git push

# Vedere lo stato:
# git status

# Vedere la history:
# git log --oneline

# Creare un branch per nuove feature:
# git checkout -b feature/nome-feature

# Tornare al branch main:
# git checkout main

# ============================================
# AGGIUNGERE TOPICS SU GITHUB (Consigliato)
# ============================================

# Vai su: https://github.com/CosmoNetInfo/seo-article-optimizer
# Clicca su "Add topics" sotto la descrizione
# Aggiungi: seo, ai, groq, electron, nextjs, typescript, react, optimization, wordpress

# ============================================
# CREARE UNA RELEASE PER LE VERSIONI PORTABLE
# ============================================

# 1. Vai su: https://github.com/CosmoNetInfo/seo-article-optimizer/releases/new
# 2. Tag: v4.1.0
# 3. Title: SEO Article Optimizer v4.1
# 4. Description: Vedi PROMPT-CHANGELOG.md
# 5. Carica come assets:
#    - SEO-Article-Optimizer-4.1-Portable.zip
#    - SEO-Article-Optimizer-4.2-Portable.zip
# 6. Pubblica

# NON caricare i file .zip nel repository (sono troppo grandi)!
# Usa GitHub Releases per i binari

# ============================================
# CONFIGURARE LA DESCRIZIONE DEL REPOSITORY
# ============================================

# Vai su: https://github.com/CosmoNetInfo/seo-article-optimizer
# Clicca su ⚙️ (Settings) in alto
# Aggiungi:
#   Description: 🚀 Ottimizza articoli per SEO con AI senza riscriverli o accorciarli
#   Website: https://cosmonet.info
#   Topics: seo, ai, groq, electron, nextjs, typescript, optimization

# ============================================
# PROTEGGERE IL BRANCH MAIN (Opzionale)
# ============================================

# Settings → Branches → Add rule
# Nome: main
# ✓ Require pull request reviews before merging
# ✓ Require status checks to pass before merging

# ============================================
# TROUBLESHOOTING
# ============================================

# Errore: "remote origin already exists"
# git remote remove origin
# git remote add origin https://github.com/CosmoNetInfo/seo-article-optimizer.git

# Errore: "file too large"
# Verifica .gitignore includa *.zip e *-Portable/
# git rm --cached <nome-file-grande>
# git commit --amend
# git push --force

# Errore: ".env.local in staging area"
# git reset .env.local
# Verifica sia in .gitignore

# ============================================
# VERIFICA FINALE
# ============================================

# Clona il repository in un'altra cartella per testare:
# cd D:/test
# git clone https://github.com/CosmoNetInfo/seo-article-optimizer.git
# cd seo-article-optimizer
# npm install
# cp .env.example .env.local
# # Aggiungi GROQ_API_KEY in .env.local
# npm run dev

# Se funziona, tutto OK! ✅
