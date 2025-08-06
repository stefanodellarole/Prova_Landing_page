# 📦 Component Documentation

Documentazione dettagliata dei componenti principali di Splinter Landing Page.

## 🏗️ Architettura Componenti

### Layout Components

#### `App.tsx`
**Componente principale** che gestisce il routing e lo stato globale.

```tsx
interface AppProps {}

// Gestisce:
- Routing tra pagine (home, privacy, terms, gdpr)
- Passaggio videoUrl a HeroSection
- Scroll to top su cambio pagina
```

#### `Header.tsx`
**Header principale** con navigazione e selezione lingua.

```tsx
interface HeaderProps {}

// Features:
- Logo Splinter
- Navigazione smooth scroll
- Language selector
- Login link
- CTA button "Start Now"
- Responsive mobile menu
```

#### `Footer.tsx`
**Footer** con link legali e informazioni aziendali.

```tsx
interface FooterProps {
  onNavigateToPrivacy: () => void;
  onNavigateToTerms: () => void;
  onNavigateToGDPR: () => void;
}

// Features:
- Company info
- Legal links
- Social media placeholders
- Multi-column responsive layout
```

---

### Content Sections

#### `HeroSection.tsx`
**Sezione hero principale** con CTA e video modal.

```tsx
interface HeroSectionProps {
  videoUrl?: string; // Optional video URL for modal
}

// Features:
- Hero title con gradient text
- Subtitle descrittivo
- Due CTA buttons (primary + video)
- Challenge card con icona
- Image placeholder
- Decorative elements
- VideoModal integration
```

#### `FeaturesSection.tsx`
**Sezione caratteristiche** del prodotto.

```tsx
interface FeaturesSectionProps {}

// Features:
- Grid layout responsive
- Feature cards con icone
- Hover effects
- Icon integration (Lucide React)
- Multi-lingua support
```

#### `BenefitsSection.tsx`
**Sezione benefici** per gli utenti.

```tsx
interface BenefitsSectionProps {}

// Features:
- Benefits grid
- Icon + title + description
- Responsive layout
- Consistent styling
```

#### `ContactSection.tsx`
**Sezione contatti** con form e informazioni.

```tsx
interface ContactSectionProps {}

// Features:
- Contact form (React Hook Form + Zod)
- Contact information
- Form validation
- Success/error states
- Responsive layout
```

---

### UI Components

#### `VideoModal.tsx`
**Modal video personalizzato** con controlli avanzati.

```tsx
interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string; // Falls back to placeholder if not provided
}

// Features:
- HTML5 video player
- Custom controls (play, pause, mute, fullscreen)
- Progress bar interattiva
- Loading states
- Keyboard support (ESC)
- Responsive design
- Fallback placeholder
- Multi-format support (MP4, WebM, OGG)
```

#### `LanguageSelector.tsx`
**Selettore lingua** per switching IT/EN.

```tsx
interface LanguageSelectorProps {}

// Features:
- Dropdown with flags
- Language persistence
- Smooth transitions
- Context integration
```

---

### Legal Pages

#### `PrivacyPolicyPage.tsx`
**Pagina Privacy Policy** completa e conforme GDPR.

```tsx
interface PrivacyPolicyPageProps {
  onBackToHome: () => void;
}

// Features:
- 10 sezioni dettagliate
- PDF generation (window.print)
- Professional layout
- Multi-lingua
- Clean reading experience (no header/footer)
- Responsive design
```

#### `TermsOfServicePage.tsx`
**Pagina Terms of Service** con struttura legale standard.

```tsx
interface TermsOfServicePageProps {
  onBackToHome: () => void;
}

// Features:
- 10 sezioni complete
- Structured content with icons
- PDF download
- Legal compliance
- Consistent styling con PrivacyPolicy
```

#### `GDPRCompliancePage.tsx`
**Pagina GDPR Compliance** per diritti utente.

```tsx
interface GDPRCompliancePageProps {
  onBackToHome: () => void;
}

// Features:
- 9 sezioni sui diritti GDPR
- Rights explanation
- Contact information
- Multi-lingua completo
- Uniform design con altre legal pages
```

---

### ShadCN UI Components

La landing page utilizza una serie completa di componenti ShadCN:

#### Core Components
- `Button` - Primary, secondary, outline variants
- `Card` - Content containers
- `Dialog` - Modal overlays
- `Input` - Form inputs
- `Label` - Form labels

#### Advanced Components
- `Accordion` - Collapsible content
- `Dropdown Menu` - Navigation menus
- `Tooltip` - Informational overlays
- `Tabs` - Tabbed content
- `Form` - Form management con React Hook Form

#### Data Display
- `Table` - Data tables
- `Badge` - Status indicators
- `Avatar` - User avatars
- `Separator` - Visual dividers

---

## 🎨 Design System Integration

### Color Usage
Tutti i componenti utilizzano il sistema di colori teal uniforme:

```tsx
// Primary actions
style={{ backgroundColor: 'hsl(158, 65%, 45%)' }}

// Secondary backgrounds
style={{ backgroundColor: 'hsl(158, 30%, 95%)' }}

// Accent elements
style={{ color: 'hsl(158, 65%, 45%)' }}
```

### Typography
Sistema di typography consistente:

```tsx
// Headings
className="text-header font-heading"

// Body text
className="text-descriptive font-body"

// CTA buttons
className="text-cta-primary font-heading"

// Secondary actions
className="text-cta-secondary font-body"
```

### Spacing & Layout
Sistema di spacing uniforme basato su Tailwind:

```tsx
// Section spacing
className="px-6 py-16"

// Component spacing
className="space-y-8"

// Grid layouts
className="grid lg:grid-cols-2 gap-12"
```

---

## 🔄 State Management

### Language Context
Gestione stato lingua globale:

```tsx
// contexts/LanguageContext.tsx
const { language, setLanguage, t } = useLanguage();

// Usage in components
const title = t('hero.title');
```

### Local State
Ogni componente gestisce il proprio stato locale:

```tsx
// VideoModal
const [isPlaying, setIsPlaying] = useState(false);

// App routing
const [currentPage, setCurrentPage] = useState<CurrentPage>('home');
```

---

## 📱 Responsive Design

Tutti i componenti seguono il pattern responsive:

```tsx
// Mobile first approach
className="text-4xl lg:text-6xl"        // Typography
className="grid lg:grid-cols-2"         // Layout
className="px-6 py-16"                  // Spacing
className="flex flex-col sm:flex-row"   // Direction
```

### Breakpoints
- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+
- `xl:` - 1280px+

---

## 🎭 Animation System

### Hover Effects
```tsx
className="hover:shadow-xl transition-all duration-300"
className="group-hover:translate-x-1 transition-transform"
```

### Loading States
```tsx
<div className="animate-spin w-12 h-12 border-4 border-white/30 border-t-white rounded-full" />
```

### Page Transitions
```tsx
// Smooth scroll behaviors
scrollIntoView({ behavior: 'smooth', block: 'start' })
```

---

## 🧪 Component Testing

### Testing Strategy
1. **Unit Tests** - Component logic
2. **Integration Tests** - Component interactions
3. **Visual Tests** - UI consistency
4. **Accessibility Tests** - A11y compliance

### Test Examples
```tsx
// Button component test
test('renders button with correct styles', () => {
  render(<Button variant="primary">Click me</Button>);
  expect(screen.getByRole('button')).toHaveClass('bg-primary');
});

// Language context test
test('changes language when selector is used', () => {
  // Test language switching logic
});
```

---

## 🔧 Customization Guide

### Adding New Components

1. **Create component file**
   ```tsx
   // components/NewComponent.tsx
   interface NewComponentProps {
     title: string;
   }

   export function NewComponent({ title }: NewComponentProps) {
     return <div>{title}</div>;
   }
   ```

2. **Add translations**
   ```tsx
   // contexts/LanguageContext.tsx
   const translations = {
     it: { newComponent: { title: "Titolo" } },
     en: { newComponent: { title: "Title" } }
   };
   ```

3. **Import and use**
   ```tsx
   // App.tsx
   import { NewComponent } from './components/NewComponent';
   ```

### Modifying Existing Components

1. **Identify component** in `components/` folder
2. **Update interface** se necessario
3. **Test changes** in multiple viewports
4. **Update translations** if needed

---

## 📋 Component Checklist

Quando crei o modifichi componenti, assicurati di:

- ✅ **TypeScript interfaces** complete
- ✅ **Responsive design** implementato
- ✅ **Color system** utilizzato correttamente
- ✅ **Typography** classes applicate
- ✅ **Accessibility** considerations
- ✅ **Multi-lingua** support se applicabile
- ✅ **Consistent spacing** con design system
- ✅ **Hover/focus states** appropriati
- ✅ **Error handling** se necessario
- ✅ **Performance optimization** considerata

---

**📝 Questa documentazione è in continua evoluzione. Aggiorna quando aggiungi nuovi componenti o features.**