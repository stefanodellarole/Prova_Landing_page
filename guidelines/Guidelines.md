# 🎨 Splinter Design System Guidelines

## 🌊 Color System - Teal Brand Identity

### Primary Colors (Mandatory)
- **Primary Teal**: `hsl(158, 65%, 45%)` - #1D8B6B (Main brand color)
- **Primary Glow**: `hsl(158, 65%, 65%)` - #40C99A (Hover states, highlights)
- **Secondary Light**: `hsl(158, 30%, 95%)` - #F0F7F5 (Backgrounds, cards)
- **Accent Teal**: `hsl(158, 55%, 50%)` - #1FAA7A (Secondary actions)

### Text Colors
- **Foreground**: `hsl(210, 15%, 20%)` - #2B333D (Primary text)
- **Muted**: `hsl(210, 10%, 60%)` - #91969B (Secondary text)
- **Background**: `hsl(0, 0%, 99%)` - #FCFCFC (Page background)

### Usage Rules
- NEVER use colors outside the teal palette without explicit approval
- Primary teal for all CTAs and important actions
- Secondary light for card backgrounds and sections
- Consistent hover states using primary glow

## 📝 Typography System

### Font Families (Required)
- **Headings & CTAs**: Manrope (Google Fonts)
- **Body & UI Elements**: DM Sans (Google Fonts)

### Font Classes (Use These Exact Classes)
```css
.text-header          /* Manrope, Semibold, for H1-H6 */
.text-descriptive     /* DM Sans, Regular, for body text */
.text-cta-primary     /* Manrope, Bold, for primary buttons */
.text-cta-secondary   /* DM Sans, Regular, for secondary buttons */
.text-tooltip         /* DM Sans, Medium, for small text */
```

### Typography Rules
- NO manual font-size classes (text-xl, text-2xl) unless explicitly needed
- Use semantic HTML elements (h1, h2, p) for automatic styling
- Letter spacing: -0.02em for large headings, -0.005em for CTAs

## 🧩 Component Guidelines

### Button System
```tsx
// Primary CTA (Use for main actions)
<Button 
  size="lg"
  className="text-cta-primary cursor-pointer"
  style={{
    backgroundColor: 'hsl(158, 65%, 45%)',
    color: 'hsl(0 0% 100%)'
  }}
>

// Secondary CTA (Use for supporting actions)  
<Button
  variant="outline"
  size="lg"
  className="text-cta-secondary cursor-pointer"
  style={{
    borderColor: 'hsl(158, 65%, 45%)',
    color: 'hsl(158, 65%, 45%)'
  }}
>
```

### Spacing System
- Section padding: `px-6 py-16` (mobile) → `px-8 py-24` (desktop)
- Component spacing: `space-y-8` for sections, `space-y-6` for content
- Grid gaps: `gap-12` for main layouts, `gap-8` for cards

### Card Components
```tsx
<div 
  className="p-6 rounded-lg border"
  style={{
    backgroundColor: 'hsl(158, 30%, 95%)',
    borderColor: 'hsl(158, 65%, 45% / 0.2)'
  }}
>
```

## 📱 Responsive Design Rules

### Breakpoint Strategy (Mobile First)
```css
Base: 320px+     /* Mobile */
sm: 640px+       /* Large mobile */
md: 768px+       /* Tablet */  
lg: 1024px+      /* Desktop */
xl: 1280px+      /* Large desktop */
```

### Layout Patterns
- Grid: `grid lg:grid-cols-2 gap-12` for two-column layouts
- Flex: `flex flex-col sm:flex-row gap-4` for button groups
- Text: `text-4xl lg:text-6xl` for responsive typography

## 🎭 Animation & Interactions

### Hover Effects (Required)
```css
.hover:shadow-xl transition-all duration-300
.group-hover:translate-x-1 transition-transform
.hover:scale-110 transition-transform
```

### Loading States
```tsx
<div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
```

## 🌐 Multi-Language Support

### Language Context Usage
```tsx
// Always use translation keys
const { t } = useLanguage();
const title = t('hero.title');
const subtitle = t('hero.subtitle');
```

### New Translation Keys
When adding new content, always add both languages:
```tsx
// In LanguageContext.tsx
it: { newSection: { title: "Titolo", description: "Descrizione" } },
en: { newSection: { title: "Title", description: "Description" } }
```

## 🎬 Video & Media Guidelines

### Video Modal Integration
```tsx
// Always support both placeholder and real video
<VideoModal 
  isOpen={isOpen}
  onClose={onClose}
  videoUrl={videoUrl} // Optional - falls back to placeholder
/>
```

### Image Handling
```tsx
// Use ImageWithFallback for new images
import { ImageWithFallback } from './components/figma/ImageWithFallback';
<ImageWithFallback src="/path/to/image.jpg" alt="Description" />
```

## 📄 Legal Pages Standards

### Structure (Required for all legal pages)
1. Hero section with page title
2. Last updated date
3. Numbered sections in bordered boxes
4. "Back to Home" button
5. PDF generation support (window.print)
6. No header/footer for clean reading

### Styling Template
```tsx
<div 
  className="p-8 rounded-lg border mb-8"
  style={{
    backgroundColor: 'hsl(158, 30%, 98%)',
    borderColor: 'hsl(158, 65%, 45% / 0.2)'
  }}
>
```

## 🚫 Forbidden Practices

### Never Do
- Use colors outside the teal palette
- Override typography classes with manual sizes
- Use absolute positioning unless absolutely necessary
- Create buttons without hover states
- Skip responsive breakpoints
- Use images without alt text
- Create forms without validation

### Always Do  
- Use semantic HTML elements
- Include hover and focus states
- Test on mobile devices
- Add TypeScript interfaces
- Follow the file structure in components/
- Use consistent spacing classes
- Include loading states for async operations

## 🎯 Lovable-Specific Guidelines

### Component Structure
- Keep components in `/components/` folder
- Use relative imports: `import { Component } from './ComponentName'`
- Export default for main components
- Export named for utility components

### Performance Optimization
- Use React.memo for static components
- Implement proper key props in lists
- Lazy load heavy components when possible
- Optimize images and videos

### Code Quality
- TypeScript strict mode compliance
- ESLint rules enforcement
- Consistent naming conventions (PascalCase for components)
- Proper error boundaries where needed

---

**🎨 These guidelines ensure pixel-perfect design consistency and optimal Lovable compatibility.**

<!-- 
Some of the base components you are using may have styling(eg. gap/typography) baked in as defaults.
So make sure you explicitly set any styling information from the guidelines in the generated react to override the defaults.
-->