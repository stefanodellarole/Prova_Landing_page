# 🚀 Splinter Landing Page

Una landing page moderna e responsive per **Splinter**, un'applicazione web che aiuta i fisioterapisti nel processo di onboarding dei pazienti. Sviluppata con React, TypeScript, Tailwind CSS v4 e Vite.

**🎯 Ottimizzato per Lovable** - Import perfetto garantito!

![Splinter Landing Page](./docs/splinter-preview.png)

## 🚀 Quick Import in Lovable

### Import Immediato
```bash
# 1. Verifica che il progetto sia pronto
npm run prepare-lovable

# 2. Push to GitHub  
git add .
git commit -m "feat: ready for Lovable import"
git push origin main

# 3. Import in Lovable
# - Vai su lovable.dev
# - Import from GitHub  
# - Seleziona questo repository
```

📋 **Per istruzioni dettagliate**: [LOVABLE_IMPORT.md](./LOVABLE_IMPORT.md)

## ✨ Caratteristiche

- 🎨 **Design System Professionale** - Palette colori teal/verde moderna e coerente
- 🌍 **Multi-lingua** - Supporto completo per Italiano e Inglese
- 📱 **Responsive Design** - Ottimizzata per desktop, tablet e mobile
- 🎬 **Video Modal** - Sistema video integrato con controlli personalizzati
- 📄 **Pagine Legali** - Privacy Policy, Terms of Service e GDPR Compliance complete
- ⚡ **Performance Ottimizzata** - Build ottimizzata con Vite e code splitting
- 🛡️ **TypeScript** - Type safety completa in tutto il codebase
- 🎯 **SEO Ready** - Meta tags ottimizzati e Open Graph
- 🏗️ **Componenti Modulari** - Architettura scalabile e mantenibile

## 🏗️ Struttura del Progetto

```
splinter-landing-page/
├── components/
│   ├── ui/                 # Componenti UI base (ShadCN)
│   ├── figma/             # Componenti Figma specifici
│   ├── Header.tsx         # Header con navigazione e lingua
│   ├── HeroSection.tsx    # Sezione hero principale
│   ├── FeaturesSection.tsx # Sezione caratteristiche
│   ├── BenefitsSection.tsx # Sezione benefici
│   ├── ContactSection.tsx  # Sezione contatti
│   ├── Footer.tsx         # Footer con link legali
│   ├── VideoModal.tsx     # Modal video personalizzato
│   ├── PrivacyPolicyPage.tsx     # Pagina Privacy Policy
│   ├── TermsOfServicePage.tsx    # Pagina Terms of Service
│   └── GDPRCompliancePage.tsx    # Pagina GDPR Compliance
├── contexts/
│   └── LanguageContext.tsx # Context per gestione lingua
├── styles/
│   └── globals.css        # Stili globali e design system
├── public/                # Assets statici
├── App.tsx               # Componente principale
├── main.tsx             # Entry point React
└── index.html           # Template HTML
```

## 🚀 Quick Start

### Prerequisiti

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 (o **yarn**/**pnpm**)

### Installazione

1. **Clona il repository**
   ```bash
   git clone <repository-url>
   cd splinter-landing-page
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Configura le variabili d'ambiente** (opzionale)
   ```bash
   cp .env.example .env.local
   # Modifica .env.local con i tuoi valori
   ```

4. **Avvia il server di sviluppo**
   ```bash
   npm run dev
   ```

5. **Apri il browser**
   
   L'applicazione sarà disponibile su `http://localhost:3000`

## 📜 Scripts Disponibili

```bash
# Sviluppo
npm run dev          # Avvia il server di sviluppo
npm run preview      # Preview della build di produzione

# Build
npm run build        # Build per produzione
npm run build:dev    # Build per sviluppo (required by Lovable)
npm run type-check   # Controllo TypeScript

# Qualità del codice
npm run lint         # ESLint check

# Lovable Integration
npm run prepare-lovable  # Verifica completa pre-import
npm run lovable:check    # Solo controlli senza output
```

## 🎨 Design System

### Palette Colori Teal/Verde

La landing page utilizza un sistema di colori professionale basato su tonalità teal e verde:

```css
/* Colori Primari */
--primary: 158 65% 45%;        /* Teal principale #1D8B6B */
--primary-glow: 158 65% 65%;   /* Teal luminoso #40C99A */

/* Colori Secondari */
--secondary: 158 30% 95%;      /* Verde chiaro #F0F7F5 */
--accent: 158 55% 50%;         /* Accent teal #1FAA7A */

/* Sfondi */
--background: 0 0% 99%;        /* Bianco puro #FCFCFC */
--card: 0 0% 100%;            /* Bianco card #FFFFFF */
```

### Typography

- **Headings & CTA**: Manrope (Google Fonts)
- **Body & UI**: DM Sans (Google Fonts)

### Componenti UI

Il progetto utilizza componenti UI basati su **ShadCN** e **Radix UI** per:
- Buttons, Cards, Dialogs
- Form elements
- Navigation components
- Accordions, Tabs, etc.

## 🎬 Video Integration

### Come Aggiungere il Tuo Video

1. **Carica il video** nella cartella `public/videos/`
   ```
   public/
   └── videos/
       └── splinter-demo.mp4
   ```

2. **Aggiorna App.tsx**
   ```tsx
   // In App.tsx, sostituisci:
   const videoUrl: string | undefined = undefined;
   
   // Con:
   const videoUrl = "/videos/splinter-demo.mp4";
   ```

3. **Formati Supportati**
   - MP4 (raccomandato)
   - WebM
   - OGG

### Caratteristiche Video Modal

- ✅ Controlli personalizzati
- ✅ Progress bar interattiva
- ✅ Fullscreen support
- ✅ Loading states
- ✅ Responsive design
- ✅ Keyboard shortcuts (ESC per chiudere)

## 🌍 Gestione Multi-lingua

Il progetto supporta **Italiano** e **Inglese** tramite il `LanguageContext`:

### Struttura delle Traduzioni

```tsx
// contexts/LanguageContext.tsx
const translations = {
  it: {
    hero: {
      title: "Trasforma il tuo",
      titleHighlight: "Onboarding Pazienti",
      subtitle: "Con l'intelligenza artificiale..."
    }
  },
  en: {
    hero: {
      title: "Transform your",
      titleHighlight: "Patient Onboarding",
      subtitle: "With artificial intelligence..."
    }
  }
};
```

### Aggiungere Nuove Traduzioni

1. Apri `contexts/LanguageContext.tsx`
2. Aggiungi le nuove chiavi nelle sezioni `it` e `en`
3. Usa `t('chiave.sottosciave')` nei componenti

## 📄 Pagine Legali

Il progetto include tre pagine legali complete:

### 1. Privacy Policy (`/components/PrivacyPolicyPage.tsx`)
- ✅ 10 sezioni dettagliate
- ✅ Conforme GDPR e FADP svizzera
- ✅ Design professionale

### 2. Terms of Service (`/components/TermsOfServicePage.tsx`)
- ✅ 10 sezioni complete
- ✅ Struttura legale standard
- ✅ PDF download integrato

### 3. GDPR Compliance (`/components/GDPRCompliancePage.tsx`)
- ✅ 9 sezioni sui diritti utente
- ✅ Tabella diritti GDPR
- ✅ Multi-lingua completo

### Caratteristiche Comuni
- 🎨 Design coerente con palette teal
- 📄 Generazione PDF nativa (window.print)
- 📱 Layout responsive
- 🌍 Traduzioni complete IT/EN
- 🚫 Visualizzazione senza Header/Footer per lettura pulita

## 🚀 Deploy in Produzione

### Build

```bash
npm run build
```

Questo genera i file ottimizzati nella cartella `dist/`.

### Hosting Raccomandati

- **Vercel** (raccomandato per React)
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**

### Configurazione Server

Per SPA (Single Page Application), configura il server per servire `index.html` per tutte le rotte.

**Esempio Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Esempio Apache (.htaccess):**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## 🔧 Personalizzazione

### Cambiare i Colori

Modifica le variabili CSS in `styles/globals.css`:

```css
:root {
  --primary: 200 100% 50%;  /* Cambia il colore primario */
  --secondary: 200 30% 95%; /* Cambia il colore secondario */
}
```

### Aggiungere Nuove Sezioni

1. Crea un nuovo componente in `components/`
2. Importalo e usalo in `App.tsx`
3. Aggiungi le traduzioni in `LanguageContext.tsx`

### Modificare il Layout

I componenti sono modulari e possono essere riorganizzati facilmente in `App.tsx`.

## 📊 Ottimizzazioni Performance

- ✅ **Code Splitting** automatico
- ✅ **Tree Shaking** per bundle size ridotto  
- ✅ **Image optimization** (se implementata)
- ✅ **CSS Purging** automatico con Tailwind
- ✅ **Preconnect** ai Google Fonts
- ✅ **Source Maps** per debug

## 🛠️ Tecnologie Utilizzate

### Core
- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS v4** - Styling Framework

### UI Components
- **ShadCN/ui** - Component Library
- **Radix UI** - Headless UI Primitives
- **Lucide React** - Icon Library
- **Class Variance Authority** - Component Variants

### Utilities
- **clsx** - Conditional Classes
- **tailwind-merge** - Class Merging
- **React Hook Form** - Form Management
- **Zod** - Schema Validation

## 🤝 Contribuire

1. Fork il progetto
2. Crea un branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📝 License

Questo progetto è distribuito sotto licenza MIT. Vedi `LICENSE` per maggiori informazioni.

## 🆘 Support & Help

### Problemi Comuni

**1. Errori di installazione dipendenze**
```bash
# Pulisci cache e reinstalla
rm -rf node_modules package-lock.json
npm install
```

**2. Problemi TypeScript**
```bash
# Controllo TypeScript
npm run type-check
```

**3. Build fallisce**
```bash
# Controlla ESLint
npm run lint
```

### Contatti

- 📧 **Email**: info@splinter.ch
- 🌐 **Website**: https://splinter.ch
- 📋 **Issues**: Utilizza GitHub Issues per bug reports

---

## 🎯 Roadmap

- [ ] 🌙 Dark mode toggle
- [ ] 📊 Analytics integration
- [ ] 🔍 Search functionality
- [ ] 📱 PWA support
- [ ] 🌐 CMS integration
- [ ] 🔐 Authentication system

---

**Sviluppato con ❤️ dal team Splinter**

*Trasforma il modo in cui i fisioterapisti gestiscono l'onboarding dei pazienti.*