# SEO Article Optimizer 4.1

<div align="center">

![Version](https://img.shields.io/badge/version-4.1-blue.svg)
![License](https://img.shields.io/badge/license-Apache%202.0-green.svg)
![Platform](https://img.shields.io/badge/platform-Windows-lightgrey.svg)
![AI](https://img.shields.io/badge/AI-Groq%20Llama%203-orange.svg)

**Un potente strumento desktop per ottimizzare i tuoi contenuti SEO con l'intelligenza artificiale**

[Download](https://github.com/CosmoNetinfo/seo-article-optimizer/releases/tag/4.1) • [Documentazione](#-guida-rapida) • [Report Bug](https://github.com/CosmoNetinfo/seo-article-optimizer/issues)

</div>

---

## 📋 Indice

- [Panoramica](#-panoramica)
- [Funzionalità](#-funzionalità-principali)
- [Tecnologie](#-tecnologie)
- [Installazione](#-installazione)
- [Configurazione](#-configurazione)
- [Guida Rapida](#-guida-rapida)
- [FAQ](#-faq)
- [Roadmap](#-roadmap)
- [Contribuire](#-contribuire)
- [Licenza](#-licenza)

---

## 🎯 Panoramica

**SEO Article Optimizer** è un'applicazione desktop progettata per copywriter, blogger e specialisti SEO che desiderano massimizzare il posizionamento dei loro contenuti sui motori di ricerca. Sfruttando l'intelligenza artificiale avanzata di Groq (Llama 3), l'applicazione analizza e ottimizza i tuoi testi in tempo reale, generando automaticamente meta tag perfetti e suggerimenti SEO professionali.

### 🎬 Demo

<img width="1216" height="859" alt="Screenshot 2025-12-03 234125" src="https://github.com/user-attachments/assets/66ebd8e8-a339-415f-9843-20121f5ad7d5" />
<img width="1201" height="823" alt="Screenshot 2025-12-04 000118" src="https://github.com/user-attachments/assets/b7912745-8baf-4201-a64f-eb26773e586f" />
<img width="1196" height="834" alt="Screenshot 2025-12-04 000151" src="https://github.com/user-attachments/assets/507ed63f-a913-4a68-8cce-ff27bc9f35f6" />

---

## 🚀 Funzionalità Principali

### ✨ Ottimizzazione AI Istantanea
- Analisi completa del testo con suggerimenti di miglioramento
- Riscrittura intelligente per massimizzare la densità delle parole chiave
- Miglioramento della leggibilità e struttura del contenuto

### 🏷️ Generazione Meta Tag Automatica
- **Meta Title** ottimizzato (con lunghezza ideale 50-60 caratteri)
- **Meta Description** persuasiva (150-160 caratteri)
- **URL Slug** SEO-friendly generato automaticamente
- Preview in tempo reale dell'aspetto su Google

### ✅ Checklist SEO Completa
- ✓ Verifica presenza parole chiave nel titolo
- ✓ Controllo densità keyword nel testo
- ✓ Analisi struttura heading (H1, H2, H3)
- ✓ Calcolo lunghezza ottimale del contenuto
- ✓ Score di leggibilità
- ✓ Suggerimenti per migliorare il posizionamento

### 📱 Social Media Ready
- Generazione automatica di post ottimizzati per:
  - Facebook
  - Twitter/X
  - LinkedIn
  - Instagram
- Hashtag suggeriti automaticamente
- Copy pronto per essere condiviso

### 🎨 Interfaccia Moderna
- Design elegante in **Dark Mode**
- Interfaccia intuitiva e reattiva
- Nessuna curva di apprendimento
- Risultati immediati

### 💼 Portable
- **Nessuna installazione richiesta**
- Scarica, estrai ed esegui
- Funziona su qualsiasi PC Windows
- Non lascia tracce nel registro di sistema

---

## 🛠 Tecnologie

Costruito con le migliori tecnologie web moderne:

| Tecnologia | Descrizione |
|-----------|-------------|
| **Electron** | Framework per applicazioni desktop native |
| **React 18** | Libreria UI moderna e reattiva |
| **Vite** | Build tool ultra-veloce |
| **Groq SDK** | Integrazione con modelli AI Llama 3 |
| **Tailwind CSS** | Framework CSS per design responsivo |
| **JavaScript ES6+** | Linguaggio di programmazione moderno |

---

## 📦 Installazione

### Requisiti di Sistema

- **Sistema Operativo**: Windows 10/11 (64-bit)
- **RAM**: Minimo 4GB (consigliati 8GB)
- **Spazio su disco**: 200MB
- **Connessione Internet**: Richiesta per l'API Groq

### Download

#### Opzione 1: Release Precompilata (Consigliata)

1. Vai alla sezione [Releases](https://github.com/CosmoNetinfo/seo-article-optimizer/releases)
2. Scarica l'ultima versione: `SEO-Article-Optimizer-v4.1-win-portable.zip`
3. Estrai il file ZIP in una cartella di tua scelta
4. Segui la [Configurazione](#-configurazione) qui sotto

#### Opzione 2: Compilazione da Sorgente

Se preferisci compilare l'applicazione tu stesso:

```bash
# Clona il repository
git clone https://github.com/TUOUSERNAME/seo-article-optimizer.git
cd seo-article-optimizer

# Installa le dipendenze
npm install

# Copia il file di esempio delle variabili d'ambiente
copy .env.example .env.local

# Configura la tua API Key in .env.local (vedi sotto)

# Avvia in modalità sviluppo
npm run dev

# Oppure compila l'applicazione
npm run build
```

---

## 🔧 Configurazione

### 1. Ottieni una API Key di Groq

L'applicazione richiede una chiave API gratuita di Groq per funzionare:

1. Visita [console.groq.com](https://console.groq.com)
2. Crea un account gratuito (se non l'hai già)
3. Vai su **API Keys** nel menu
4. Clicca su **Create API Key**
5. Copia la chiave generata

> **Nota**: L'account gratuito di Groq offre 14,400 richieste al giorno, più che sufficienti per uso personale e professionale.

### 2. Configura l'Applicazione

#### Per la versione portable:

1. Naviga nella cartella estratta
2. Apri il file `.env.local` con un editor di testo (Notepad, Notepad++, etc.)
3. Incolla la tua API Key:

```env
VITE_GROQ_API_KEY=gsk_tua_chiave_api_qui
```

4. Salva il file
5. Avvia `SEO Article Optimizer.exe`

#### Per la versione compilata da sorgente:

```bash
# Crea il file .env.local dalla radice del progetto
echo VITE_GROQ_API_KEY=gsk_tua_chiave_api_qui > .env.local
```

---

## 📖 Guida Rapida

### Passo 1: Inserisci il Tuo Contenuto

1. Apri SEO Article Optimizer
2. Incolla o scrivi il tuo articolo nella textarea principale
3. Inserisci la parola chiave principale che vuoi ottimizzare

### Passo 2: Ottimizza con l'AI

1. Clicca su **"Ottimizza con AI"**
2. Attendi qualche secondo mentre l'AI analizza il contenuto
3. Ricevi il testo ottimizzato con suggerimenti SEO

### Passo 3: Genera i Meta Tag

1. Clicca su **"Genera Meta Tag"**
2. Ottieni automaticamente:
   - Meta Title ottimizzato
   - Meta Description persuasiva
   - URL Slug SEO-friendly

### Passo 4: Verifica la Checklist SEO

1. Controlla la checklist nella sidebar destra
2. Segui i suggerimenti per migliorare il tuo score
3. Modifica il contenuto finché tutti i check sono verdi ✓

### Passo 5: Genera Post Social

1. Clicca su **"Genera Post Social"**
2. Ottieni post pronti per Facebook, Twitter, LinkedIn e Instagram
3. Copia e incolla direttamente sui tuoi social

---

## ❓ FAQ

### L'API Key è gratuita?

Sì! Groq offre un piano gratuito generoso con 14,400 richieste al giorno. Perfetto per uso personale e piccole agenzie.

### L'applicazione funziona offline?

No, è richiesta una connessione Internet attiva per comunicare con l'API di Groq e ottenere le ottimizzazioni AI.

### Posso usarlo per più siti web?

Assolutamente sì! Non ci sono limiti al numero di articoli o siti che puoi ottimizzare.

### I miei dati sono al sicuro?

I tuoi contenuti vengono inviati all'API di Groq per l'elaborazione ma non vengono salvati sui loro server. Consulta la [Privacy Policy di Groq](https://groq.com/privacy-policy/) per maggiori dettagli.

### Supporta altre lingue oltre l'italiano?

Sì! L'AI di Groq supporta oltre 100 lingue. Puoi scrivere e ottimizzare contenuti in qualsiasi lingua.

### Posso personalizzare i prompt dell'AI?

Nella versione attuale i prompt sono ottimizzati per la SEO. Versioni future includeranno la personalizzazione avanzata.

### Come aggiorno l'applicazione?

Scarica semplicemente l'ultima versione dalla sezione Releases e sostituisci i file. Il tuo `.env.local` rimarrà intatto.

---

## 🗺️ Roadmap

### Versione 4.2 (Q1 2025)
- [ ] Supporto per macOS e Linux
- [ ] Analisi competitor integrata
- [ ] Keyword research tool
- [ ] Export in formato WordPress/HTML

### Versione 5.0 (Q2 2025)
- [ ] Supporto multi-lingua nell'interfaccia
- [ ] Dashboard con statistiche e storico
- [ ] Integrazione diretta con CMS (WordPress, Joomla)
- [ ] API REST per integrazioni esterne

### Funzionalità Future
- [ ] Analisi backlink
- [ ] Monitoraggio posizionamento SERP
- [ ] A/B testing per titoli e meta description
- [ ] Generazione immagini AI per articoli
- [ ] Plugin per browser

---

## 🤝 Contribuire

I contributi sono sempre benvenuti! Ecco come puoi aiutare:

### 🐛 Segnala Bug

Hai trovato un bug? [Apri una issue](https://github.com/CosmoNetinfo/seo-article-optimizer/issues/new) descrivendo:
- Cosa ti aspettavi che succedesse
- Cosa è successo invece
- Passi per riprodurre il problema
- Screenshot se possibile

### 💡 Suggerisci Nuove Funzionalità

Hai un'idea per migliorare l'app? [Apri una feature request](https://github.com/CosmoNetinfo/seo-article-optimizer/issues/new) e discutiamone!

### 🔧 Contribuisci al Codice

1. Fai un Fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Committa le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Pusha il branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

### 📝 Migliora la Documentazione

Anche miglioramenti alla documentazione sono preziosi! Sentiti libero di:
- Correggere errori di battitura
- Aggiungere esempi
- Tradurre in altre lingue
- Migliorare le spiegazioni

---

## 🌟 Supporta il Progetto

Se SEO Article Optimizer ti è stato utile:

- ⭐ Metti una stella su GitHub
- 🐦 Condividi sui social media
- 💬 Lascia una recensione
- 🔗 Linka il progetto sul tuo blog

---

## 📄 Licenza

Questo progetto è rilasciato sotto licenza **Apache License 2.0**.

Vedi il file [LICENSE](LICENSE) per i dettagli completi.

```
Copyright 2025 Cosmonet.info

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0
```

---

## 👤 Autore

**Cosmonet.info**

- Website: [https://www.cosmonet.info](https://www.cosmonet.info)
- GitHub: [@CosmoNetinfo](https://github.com/CosmoNetinfo)

---

## 🙏 Ringraziamenti

- [Groq](https://groq.com) per l'incredibile API AI
- [Electron](https://www.electronjs.org/) per il framework desktop
- [React](https://react.dev/) per la libreria UI
- [Tailwind CSS](https://tailwindcss.com/) per il design system
- La community open source per l'ispirazione

---

<div align="center">

**Se questo progetto ti è stato utile, considera di supportarlo con una ⭐ su GitHub!**

Made with ❤️ by [Cosmonet.info](https://www.cosmonet.info)

</div>
