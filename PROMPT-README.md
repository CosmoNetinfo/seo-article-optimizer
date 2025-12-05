# SEO Article Optimizer - Prompt Configuration

## Panoramica

Il SEO Article Optimizer utilizza un prompt AI altamente ottimizzato che segue rigorosamente la **"Checklist SEO Cosmonet.info"**. Il prompt è progettato per ottimizzare articoli per SEO **senza riscriverli o riassumerli**, preservando il 100% del contenuto originale.

## Caratteristiche Principali del Prompt

### 🔒 Validazione Obbligatoria

Prima di generare qualsiasi output, l'AI esegue le seguenti validazioni:

1. **Conta parole**: Analizza la lunghezza dell'articolo originale
2. **Preservazione lunghezza**: L'output HTML deve avere ±10% della stessa lunghezza
3. **HTML pulito**: Usa solo tag semantici (h1, h2, h3, p, table, ol, ul)
4. **Controllo conformità**: Se non conforme, risponde con "ERRORE: LUNGHEZZA NON PRESERVATA"
5. **No annidamento**: Evita testo plain o JSON annidato nelle stringhe

### ✅ Cosa Fa l'AI

- **MANTIENE** tutto il contenuto originale - ogni paragrafo, concetto, dettaglio
- **AGGIUNGE** solo elementi SEO mancanti (meta, frase chiave, HTML, immagini)
- **MIGLIORA** la formattazione HTML e la struttura dei titoli (H1, H2, H3)
- **INSERISCE** la frase chiave naturalmente (massimo 10 volte)
- **PRESERVA** tono, stile e lunghezza originale

### ❌ Cosa NON Fa l'AI

- **NON taglia** paragrafi o sezioni
- **NON riassume** il contenuto
- **NON accorcia** frasi o omette dettagli
- **NON riscrive** completamente l'articolo
- **NON riduce** la lunghezza (2000 parole = ~2000 parole)

## Checklist SEO Cosmonet.info (Obbligatoria)

Il prompt implementa tutti i requisiti della checklist:

| Elemento | Requisito |
|----------|-----------|
| **Frase chiave** | Unica, mai usata prima, lunghezza appropriata |
| **Titolo SEO** | Inizia con frase chiave, 50-60 caratteri |
| **Introduzione** | Inizia con frase chiave |
| **Meta Description** | Include frase chiave, max 155 caratteri |
| **URL Slug** | Contiene frase chiave, semplice |
| **Densità** | Naturale, max 10 volte |
| **Immagini** | **MINIMO 3** segnaposto `<!-- IMAGE_PLACEHOLDER: alt con keyword -->` |
| **Parole** | Preserva lunghezza originale (+/-10%) |
| **Link interni** | **MINIMO 2** `<!-- INSERIRE LINK INTERNO: testo -->` |
| **Link esterni** | **MINIMO 1** autorevole |
| **Struttura** | 1 H1, H2/H3 gerarchici |

## Compiti dell'AI

1. **PRESERVA** 100% contenuto originale
2. **Preserva** citazioni `<blockquote>` parola per parola
3. **Ottimizza** SEO senza riscrivere
4. **MINIMO 3** `<!-- IMAGE_PLACEHOLDER: alt descrittivo -->`
5. **MINIMO 2** `<!-- INSERIRE LINK INTERNO: -->` + 1 link esterno
6. **Genera**: keyphrase, title, description, slug, tags
7. **Suggerisci** 3-5 categorie
8. **Post social** engaging con hashtag
9. **HTML pulito** (solo body tags: h1-h3 p table ol ul)
10. **Analisi checklist** con status

## Output JSON

L'AI risponde **SOLO** con un oggetto JSON valido:

```json
{
  "keyPhrase": "frase chiave primaria",
  "title": "Titolo SEO 50-60 char",
  "description": "Meta max 155 char",
  "slug": "url-slug-ottimizzato",
  "htmlContent": "HTML COMPLETO SEMANTICO",
  "tags": "tag1, tag2, tag3",
  "categories": "Cat1, Cat2, Cat3",
  "socialMediaPost": "Post social #hashtag",
  "seoChecklist": [
    {
      "item": "nome",
      "status": "pass/fail",
      "details": "spiegazione"
    }
  ]
}
```

## Personalizzazione del Prompt

### Versione Desktop (Electron)

Il prompt si trova in:
```
/services/prompt.ts
```

Viene salvato in `localStorage` quando personalizzato tramite l'editor integrato.

### Versione Web

Il prompt si trova in:
```
/seo-article-optimizer-web/lib/prompt.ts
```

Viene salvato nel database PostgreSQL quando personalizzato.

### Come Personalizzare

1. Clicca sull'icona **⚙️** nell'header dell'applicazione
2. Modifica il prompt nell'editor che si apre
3. Clicca **"Salva Modifiche"**
4. Il prompt personalizzato sarà evidenziato con un indicatore ambra

### Ripristinare il Default

1. Apri l'editor del prompt
2. Clicca **"Ripristina Default"**
3. Il prompt tornerà alla versione originale

## Best Practices

### Per Articoli Brevi (300-500 parole)
- L'output sarà ~300-500 parole
- 3 segnaposto immagine
- 2 link interni
- 1 link esterno

### Per Articoli Lunghi (2000+ parole)
- L'output sarà ~2000+ parole (±10%)
- 5-7 segnaposto immagine consigliati
- 3-4 link interni
- 2-3 link esterni

### Gestione Errori

Se l'AI risponde con `"ERRORE: LUNGHEZZA NON PRESERVATA"`:
- L'articolo è stato tagliato o riassunto troppo
- Riprova con un articolo più breve
- Oppure contatta il supporto

## Note Tecniche

### AI Provider
- **Groq AI** con modello `llama-3.3-70b-versatile`
- Temperature: 0.5
- Max tokens: 8000
- Response format: JSON object

### Placeholder Format

**Immagini:**
```html
<!-- IMAGE_PLACEHOLDER: descrizione alt ottimizzata SEO -->
```

**Link Interni:**
```html
<!-- INSERIRE LINK INTERNO: suggerimento su dove linkare -->
```

## Aggiornamenti

- **v4.1**: Prompt con validazione ±10% lunghezza
- **v4.0**: Prompt con regole DO/DON'T esplicite
- **v3.0**: Checklist SEO Cosmonet.info integrata

## Supporto

Per domande o problemi:
- **Sito**: [CosmoNet.info](https://cosmonet.info)
- **Autore**: Daniele Spalletti
- **Email**: info@cosmonet.info

---

*Ultimo aggiornamento: 2025-12-05*
