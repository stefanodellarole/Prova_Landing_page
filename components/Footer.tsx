import { Button } from './ui/button';
import { Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  onNavigateToPrivacy?: () => void;
  onNavigateToTerms?: () => void;
  onNavigateToGDPR?: () => void;
}

export function Footer({ onNavigateToPrivacy, onNavigateToTerms, onNavigateToGDPR }: FooterProps) {
  const { t } = useLanguage();

  return (
    <footer className="px-6 py-12 border-t" style={{ 
      backgroundColor: 'hsl(0 0% 100%)',
      borderColor: 'hsl(210 15% 92%)'
    }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'hsl(158, 65%, 45%)' }}
              >
                <span 
                  className="text-white font-heading font-semibold text-lg"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  S
                </span>
              </div>
              <span 
                className="text-xl font-heading font-semibold"
                style={{ 
                  background: 'linear-gradient(135deg, hsl(158, 65%, 45%), hsl(158, 65%, 55%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Splinter
              </span>
            </div>
            <p 
              className="text-sm font-body leading-relaxed"
              style={{ 
                color: 'hsl(210, 10%, 60%)',
                lineHeight: '1.6'
              }}
            >
              {t('footer.description')}
            </p>
          </div>

          {/* Product Column */}
          <div className="space-y-4">
            <h4 
              className="font-heading font-medium"
              style={{ color: 'hsl(210, 15%, 20%)' }}
            >
              {t('footer.product')}
            </h4>
            <ul className="space-y-3">
              {['features', 'pricing', 'demo', 'api', 'integrations'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-sm font-body hover:text-primary transition-colors"
                    style={{ 
                      color: 'hsl(210, 10%, 60%)',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'hsl(158, 65%, 45%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'hsl(210, 10%, 60%)';
                    }}
                  >
                    {t(`footer.links.${item}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-4">
            <h4 
              className="font-heading font-medium"
              style={{ color: 'hsl(210, 15%, 20%)' }}
            >
              {t('footer.support')}
            </h4>
            <ul className="space-y-3">
              {['helpCenter', 'documentation', 'tutorials', 'contacts', 'status'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-sm font-body hover:text-primary transition-colors"
                    style={{ 
                      color: 'hsl(210, 10%, 60%)',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'hsl(158, 65%, 45%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'hsl(210, 10%, 60%)';
                    }}
                  >
                    {t(`footer.links.${item}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h4 
              className="font-heading font-medium"
              style={{ color: 'hsl(210, 15%, 20%)' }}
            >
              {t('footer.legal')}
            </h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={onNavigateToPrivacy}
                  className="text-sm font-body hover:text-primary transition-colors text-left"
                  style={{ 
                    color: 'hsl(210, 10%, 60%)',
                    background: 'none',
                    border: 'none',
                    padding: '0',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'hsl(158, 65%, 45%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'hsl(210, 10%, 60%)';
                  }}
                >
                  {t('footer.links.privacy')}
                </button>
              </li>
              <li>
                <button 
                  onClick={onNavigateToTerms}
                  className="text-sm font-body hover:text-primary transition-colors text-left"
                  style={{ 
                    color: 'hsl(210, 10%, 60%)',
                    background: 'none',
                    border: 'none',
                    padding: '0',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'hsl(158, 65%, 45%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'hsl(210, 10%, 60%)';
                  }}
                >
                  {t('footer.links.terms')}
                </button>
              </li>
              <li>
                <button 
                  onClick={onNavigateToGDPR}
                  className="text-sm font-body hover:text-primary transition-colors text-left"
                  style={{ 
                    color: 'hsl(210, 10%, 60%)',
                    background: 'none',
                    border: 'none',
                    padding: '0',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'hsl(158, 65%, 45%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'hsl(210, 10%, 60%)';
                  }}
                >
                  {t('footer.links.gdpr')}
                </button>
              </li>
              {['cookies', 'licenses'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-sm font-body hover:text-primary transition-colors"
                    style={{ 
                      color: 'hsl(210, 10%, 60%)',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'hsl(158, 65%, 45%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'hsl(210, 10%, 60%)';
                    }}
                  >
                    {t(`footer.links.${item}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t pt-8 mb-8" style={{ borderColor: 'hsl(210 15% 92%)' }}>
          <div className="max-w-md mx-auto text-center space-y-4">
            <h4 
              className="font-heading font-medium"
              style={{ color: 'hsl(210, 15%, 20%)' }}
            >
              {t('footer.newsletter.title')}
            </h4>
            <p 
              className="text-sm font-body"
              style={{ 
                color: 'hsl(210, 10%, 60%)',
                lineHeight: '1.5'
              }}
            >
              {t('footer.newsletter.subtitle')}
            </p>
            <div className="flex gap-2 max-w-sm mx-auto">
              <input 
                type="email" 
                placeholder={t('footer.newsletter.placeholder')}
                className="flex-1 px-4 py-2 rounded-lg border text-sm font-body"
                style={{
                  borderColor: 'hsl(210 15% 92%)',
                  backgroundColor: 'hsl(0 0% 100%)',
                  color: 'hsl(210, 15%, 20%)'
                }}
              />
              <Button 
                size="sm"
                className="text-cta-primary cursor-pointer"
                style={{
                  backgroundColor: 'hsl(158, 65%, 45%)',
                  color: 'hsl(0 0% 100%)',
                  letterSpacing: '-0.005em'
                }}
              >
                {t('footer.newsletter.subscribe')}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'hsl(210 15% 92%)' }}>
          <p 
            className="text-sm font-body"
            style={{ 
              color: 'hsl(210, 10%, 60%)',
              lineHeight: '1.5'
            }}
          >
            {t('footer.copyright')}
          </p>
          <p 
            className="text-sm font-body"
            style={{ 
              color: 'hsl(210, 10%, 60%)',
              lineHeight: '1.5'
            }}
          >
            {t('footer.madeWith')}
          </p>
        </div>
      </div>
    </footer>
  );
}