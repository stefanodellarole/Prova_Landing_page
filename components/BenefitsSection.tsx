import { Card, CardContent } from './ui/card';
import { CheckCircle, Clock, FileText, Users, Shield, BarChart3 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function BenefitsSection() {
  const { t } = useLanguage();

  return (
    <section 
      id="benefits" 
      className="min-h-screen flex items-center justify-center px-6 py-24"
      style={{ 
        background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(0 0% 100%) 85%, hsl(150 60% 99%) 95%, hsl(150 60% 97%) 100%)',
        color: 'hsl(210, 15%, 20%)' /* Foreground Light from new teal system */
      }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div 
          className="rounded-3xl p-8 lg:p-12"
          style={{ 
            backgroundColor: 'hsl(158, 65%, 45%, 0.05)', /* Primary teal with low opacity */
            border: '1px solid hsl(158, 65%, 45%, 0.1)'
          }}
        >
          <div className="text-center mb-12">
            <h2 
              className="text-2xl lg:text-3xl text-header mb-4" 
              style={{ 
                color: 'hsl(210, 15%, 20%)', /* Updated to new foreground color */
                letterSpacing: '-0.005em'
              }}
            >
              {t('whySplinterWorks.title')} <span style={{ color: 'hsl(158, 65%, 45%)' }}>{t('whySplinterWorks.titleHighlight')}</span>
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto text-descriptive"
              style={{ 
                color: 'hsl(210, 10%, 60%)', /* Updated to new muted foreground */
                lineHeight: '1.6'
              }}
            >
              {t('whySplinterWorks.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              { icon: BarChart3, key: 'optimizedOnboarding' },
              { icon: Shield, key: 'reliability' },
              { icon: CheckCircle, key: 'accuracy' },
              { icon: Clock, key: 'speed' },
              { icon: Users, key: 'experience' },
              { icon: FileText, key: 'compliance' }
            ].map(({ icon: Icon, key }, index) => (
              <div key={index} className="text-center space-y-4">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
                  style={{
                    backgroundColor: 'hsl(158, 65%, 45%, 0.1)', /* Primary teal with opacity */
                    border: '2px solid hsl(158, 65%, 45%, 0.2)'
                  }}
                >
                  <Icon 
                    className="w-8 h-8" 
                    style={{ color: 'hsl(158, 65%, 45%)' }} /* Primary teal */
                  />
                </div>
                <h4 
                  className="text-tooltip" 
                  style={{ color: 'hsl(210, 15%, 20%)' }} /* Updated foreground */
                >
                  {t(`whySplinterWorks.benefits.${key}.title`)}
                </h4>
                <p 
                  className="text-sm text-descriptive"
                  style={{ 
                    color: 'hsl(210, 10%, 60%)', /* Updated muted foreground */
                    lineHeight: '1.5'
                  }}
                >
                  {t(`whySplinterWorks.benefits.${key}.description`)}
                </p>
              </div>
            ))}
          </div>


        </div>
      </div>
    </section>
  );
}