import { Card, CardContent } from './ui/card';
import { CheckCircle, Clock, FileText, Users, Shield, BarChart3, Image } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function FeaturesSection() {
  const { t } = useLanguage();

  return (
    <section 
      id="features" 
      className="min-h-screen flex items-center justify-center px-6 py-24"
      style={{ 
        background: 'linear-gradient(180deg, hsl(150 60% 97%) 0%, hsl(150 60% 97%) 85%, hsl(0 0% 100%) 95%, hsl(0 0% 100%) 100%)',
        color: 'hsl(210, 15%, 20%)' /* Foreground Light from new teal system */
      }}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Main Features Section */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl lg:text-4xl text-header mb-6" 
            style={{ 
              color: 'hsl(210, 15%, 20%)', /* Updated foreground */
              letterSpacing: '-0.01em'
            }}
          >
            {t('features.title')} <span style={{ color: 'hsl(158, 65%, 45%)' }}>{t('features.titleHighlight')}</span>
          </h2>
          <p 
            className="text-lg lg:text-xl max-w-3xl mx-auto text-descriptive"
            style={{ 
              color: 'hsl(210, 10%, 60%)', /* Updated muted foreground */
              lineHeight: '1.6'
            }}
          >
            {t('features.subtitle')}
          </p>
        </div>



        {/* How It Works Section */}
        <div className="max-w-6xl mx-auto">


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t('howItWorks.steps').map((step: any, index: number) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Image Placeholder - Hero Style Adapted */}
                  <div 
                    className="rounded-2xl shadow-lg w-full h-48 flex flex-col items-center justify-center"
                    style={{ 
                      border: '2px dashed hsl(150 35% 90%)',
                      backgroundColor: 'hsl(150 40% 94%)'
                    }}
                  >
                    <Image 
                      className="w-10 h-10 mb-3" 
                      style={{ color: 'hsl(160 10% 60%)' }} 
                    />
                    <div 
                      className="text-2xl text-header mb-2"
                      style={{ 
                        color: 'hsl(158, 65%, 45%)',
                        letterSpacing: '-0.01em',
                        fontWeight: 'var(--font-weight-bold)'
                      }}
                    >
                      {index + 1}
                    </div>
                    <div 
                      className="text-xs text-center px-3 text-tooltip"
                      style={{ color: 'hsl(160 10% 60%)' }}
                    >
                      Step {index + 1} Image
                      <br />
                      Placeholder
                    </div>
                  </div>
                  
                  <h4 
                    className="text-tooltip font-medium" 
                    style={{ color: 'hsl(210, 15%, 20%)' }} /* Updated foreground */
                  >
                    {step.title}
                  </h4>
                  <p 
                    className="text-sm text-descriptive" 
                    style={{ 
                      color: 'hsl(210, 10%, 60%)', /* Updated muted foreground */
                      lineHeight: '1.5'
                    }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Connection line between steps */}
                {index < 3 && (
                  <div 
                    className="hidden lg:block absolute top-24 left-full w-full h-0.5 -translate-y-1/2"
                    style={{ 
                      backgroundColor: 'hsl(158, 65%, 45%, 0.3)', /* Primary teal with opacity */
                      zIndex: -1,
                      marginLeft: '1rem',
                      marginRight: '1rem'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}