import { Card } from './ui/card';
import { Image } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function HowItWorksSection() {
  const { t } = useLanguage();

  return (
    <section 
      id="how-it-works" 
      className="py-20"
      style={{ 
        background: 'linear-gradient(180deg, hsl(150 50% 95%) 0%, hsl(0 0% 100%) 50%, hsl(0 0% 100%) 100%)'
      }}
    >
      <div className="container mx-auto px-4">


        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={`flex ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
              {/* Content */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center font-heading font-semibold"
                    style={{
                      backgroundColor: 'hsl(145 55% 37%)',
                      color: 'hsl(0 0% 100%)',
                      letterSpacing: '-0.005em'
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 
                    className="text-2xl text-header" 
                    style={{ color: 'hsl(160 15% 15%)' }}
                  >
                    {t(`howItWorks.steps.${index}.title`)}
                  </h3>
                </div>
                <p 
                  className="text-lg leading-relaxed text-descriptive" 
                  style={{ 
                    color: 'hsl(160 10% 45%)',
                    lineHeight: '1.6'
                  }}
                >
                  {t(`howItWorks.steps.${index}.description`)}
                </p>
              </div>

              {/* Image Placeholder */}
              <div className="flex-1">
                <Card className="overflow-hidden border-0 shadow-lg">
                  <div 
                    className="w-full h-64 flex flex-col items-center justify-center"
                    style={{ 
                      border: '2px dashed hsl(150 35% 90%)',
                      backgroundColor: 'hsl(150 40% 94%)'
                    }}
                  >
                    <Image 
                      className="w-12 h-12 mb-3" 
                      style={{ color: 'hsl(160 10% 60%)' }} 
                    />
                    <div 
                      className="text-3xl text-header mb-2"
                      style={{ 
                        color: 'hsl(145 55% 37%)',
                        letterSpacing: '-0.01em',
                        fontWeight: 'var(--font-weight-bold)'
                      }}
                    >
                      {index + 2}
                    </div>
                    <div 
                      className="text-sm text-center px-4 text-tooltip"
                      style={{ color: 'hsl(160 10% 60%)' }}
                    >
                      Step {index + 1} Image
                      <br />
                      ({t(`howItWorks.steps.${index}.title`)})
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Process Flow */}
        <div className="mt-20">
          <div 
            className="rounded-3xl p-8 lg:p-12"
            style={{ backgroundColor: 'hsl(110 25% 33% / 0.1)' }}
          >
            <h3 
              className="text-2xl lg:text-3xl text-center mb-12 text-header" 
              style={{ 
                color: 'hsl(160 15% 15%)',
                letterSpacing: '-0.005em'
              }}
            >
              {t('howItWorks.processTitle')} <span style={{ color: 'hsl(145 55% 37%)' }}>{t('howItWorks.processHighlight')}</span>
            </h3>
            <div className="grid md:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="text-center space-y-4 relative">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center font-heading font-semibold text-xl mx-auto"
                    style={{
                      backgroundColor: 'hsl(145 55% 37%)',
                      color: 'hsl(0 0% 100%)',
                      letterSpacing: '-0.005em'
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h4 
                    className="text-tooltip" 
                    style={{ color: 'hsl(160 15% 15%)' }}
                  >
                    {t(`howItWorks.steps.${index}.title`)}
                  </h4>
                  {index < 3 && (
                    <div 
                      className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 transform translate-x-8"
                      style={{ backgroundColor: 'hsl(145 55% 37% / 0.3)' }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}