# 🚀 Deployment Guide

Guida completa per il deploy della Splinter Landing Page in produzione.

## 📋 Pre-Deployment Checklist

Prima del deploy, assicurati di aver completato:

- ✅ **Build senza errori** (`npm run build`)
- ✅ **TypeScript check** (`npm run type-check`)
- ✅ **ESLint check** (`npm run lint`)
- ✅ **Test in locale** (`npm run preview`)
- ✅ **Variabili d'ambiente** configurate
- ✅ **Video caricato** (se applicabile)
- ✅ **Meta tags SEO** verificati
- ✅ **Responsive design** testato

---

## 🌐 Hosting Platforms

### 1. Vercel (Raccomandato) ⭐

**Perché Vercel:**
- ✅ Ottimizzato per React/Vite
- ✅ Deploy automatico da Git
- ✅ Edge Functions support
- ✅ Automatic HTTPS
- ✅ Global CDN

#### Deploy con Vercel CLI

```bash
# Installa Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy in produzione
vercel --prod
```

#### Deploy con Git Integration

1. Vai su [vercel.com](https://vercel.com)
2. Connetti il repository GitHub
3. Configura le impostazioni:
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

#### Configurazione Vercel (`vercel.json`)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

---

### 2. Netlify

**Caratteristiche:**
- ✅ Deploy da Git automatico
- ✅ Form handling integrato
- ✅ Redirect rules
- ✅ Split testing

#### Deploy con Netlify CLI

```bash
# Installa Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
npm run build
netlify deploy --dir=dist

# Deploy in produzione
netlify deploy --prod --dir=dist
```

#### Configurazione Netlify (`netlify.toml`)

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

---

### 3. GitHub Pages

**Setup per GitHub Pages:**

1. **Installa gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Aggiungi script in package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Configura base URL in vite.config.ts**
   ```ts
   export default defineConfig({
     base: '/repository-name/',
     // altre configurazioni...
   });
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

---

### 4. Firebase Hosting

#### Setup Firebase

```bash
# Installa Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inizializza progetto
firebase init hosting
```

#### Configurazione Firebase (`firebase.json`)

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          }
        ]
      }
    ]
  }
}
```

#### Deploy

```bash
npm run build
firebase deploy
```

---

## 🔧 Environment Variables Setup

### Development vs Production

**Local Development (`.env.local`)**
```env
VITE_APP_URL=http://localhost:3000
VITE_DEMO_VIDEO_URL=/videos/splinter-demo.mp4
VITE_ENABLE_ANALYTICS=false
```

**Production**
```env
VITE_APP_URL=https://splinter.ch
VITE_DEMO_VIDEO_URL=https://cdn.splinter.ch/videos/demo.mp4
VITE_ENABLE_ANALYTICS=true
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### Platform-Specific Setup

#### Vercel
```bash
# Via CLI
vercel env add VITE_APP_URL production

# Via dashboard: Settings → Environment Variables
```

#### Netlify
```bash
# Via CLI
netlify env:set VITE_APP_URL https://splinter.ch

# Via dashboard: Site settings → Environment variables
```

---

## 🎬 Video Assets Management

### Video Hosting Options

#### 1. Self-Hosted (Simple)
```
public/
└── videos/
    └── splinter-demo.mp4
```

**Pros:** Semplice, controllo totale
**Cons:** Bandwidth, performance

#### 2. CDN Hosting (Raccomandato)
```javascript
// Configura URL CDN
const videoUrl = "https://cdn.splinter.ch/videos/demo.mp4";
```

**Providers:**
- AWS CloudFront
- Cloudflare
- Vercel Edge Network

#### 3. Video Platform Integration
```javascript
// YouTube/Vimeo embed
const videoUrl = "https://www.youtube.com/embed/VIDEO_ID";
```

### Video Optimization

```bash
# Ottimizza video per web
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -c:a aac -b:a 128k -movflags +faststart output.mp4

# Crea versioni multiple
ffmpeg -i input.mp4 -s 1920x1080 -c:v libx264 -crf 23 output-1080p.mp4
ffmpeg -i input.mp4 -s 1280x720 -c:v libx264 -crf 25 output-720p.mp4
```

---

## 🔒 Security Headers

### Recommended Headers

```javascript
// Esempio per Vercel/Netlify
{
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff", 
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains"
}
```

---

## 📊 Performance Optimization

### Build Optimization

```typescript
// vite.config.ts - ottimizzazioni produzione
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', '@radix-ui/react-dialog']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
```

### Image Optimization

```bash
# Ottimizza immagini prima del build
npm install -g imagemin-cli
imagemin public/images/* --out-dir=public/images/optimized
```

### Bundle Analysis

```bash
# Analizza bundle size
npm install -g bundle-analyzer
npm run build
npx vite-bundle-analyzer dist
```

---

## 🔍 SEO & Analytics Setup

### Google Analytics 4

```typescript
// In index.html o tramite environment variables
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### SEO Checklist

- ✅ **Meta title & description** ottimizzati
- ✅ **Open Graph tags** per social sharing
- ✅ **Structured data** (JSON-LD)
- ✅ **Sitemap.xml** generato
- ✅ **Robots.txt** configurato
- ✅ **Canonical URLs** impostati

### Robots.txt

```txt
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://splinter.ch/sitemap.xml
```

---

## 🚨 Error Monitoring

### Error Tracking Setup

#### Sentry Integration

```bash
npm install @sentry/react @sentry/tracing
```

```typescript
// main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.NODE_ENV,
});
```

### Health Checks

Crea endpoint per monitoring:

```typescript
// health-check endpoint
export function healthCheck() {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  };
}
```

---

## 📈 Post-Deployment

### 1. Testing in Production

```bash
# Test critical paths
- Homepage load
- Language switching
- Video modal
- Contact form
- Legal pages
- Mobile responsiveness
```

### 2. Performance Monitoring

**Tools:**
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Lighthouse CI

### 3. Uptime Monitoring

**Services:**
- UptimeRobot
- Pingdom
- StatusCake

### 4. SSL Certificate

Verifica che HTTPS sia attivo:
```bash
# Test SSL
curl -I https://splinter.ch
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run lint && npm run type-check
    
    - name: Build
      run: npm run build
      env:
        VITE_APP_URL: ${{ secrets.VITE_APP_URL }}
    
    - name: Deploy to Vercel
      uses: vercel/action@v1
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'
```

---

## 🆘 Troubleshooting

### Common Issues

#### 1. Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules dist .next
npm install
npm run build
```

#### 2. 404 on Refresh
Assicurati che il server sia configurato per SPA:
```nginx
# Nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

#### 3. Environment Variables Not Working
```bash
# Check prefix
VITE_APP_URL=... # ✅ Correct
APP_URL=...       # ❌ Won't work
```

#### 4. Video Not Loading
```bash
# Check MIME types
AddType video/mp4 .mp4
AddType video/webm .webm
```

---

## 📞 Support

Se incontri problemi durante il deployment:

1. **Check logs** della piattaforma di hosting
2. **Verifica environment variables**
3. **Test build locale** prima del deploy
4. **Consulta documentazione** della piattaforma
5. **Contatta support** se necessario

---

**🎯 Ricorda: Un deployment di successo richiede testing approfondito e monitoring continuo!**