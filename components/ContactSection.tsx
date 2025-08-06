import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import splinterLogo from 'figma:asset/64bef5ec469a1db741d3a735f3fa95a4f771f716.png';

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section 
      id="contact" 
      className="min-h-screen px-6 py-20 relative flex flex-col justify-center"
      style={{ 
        backgroundColor: 'hsl(150 60% 97%)', /* Verde chiaro solido - sezione finale */
        paddingTop: '6rem' /* Extra padding to account for fixed header */
      }}
    >
      
      <div className="container mx-auto relative w-full max-w-6xl flex-1 flex flex-col justify-center">
        {/* CTA Section with medical styling */}
        <div className="text-center space-y-6 mb-12">
          <h2 
            className="text-3xl lg:text-4xl text-header"
            style={{ 
              color: 'hsl(160 15% 15%)',
              letterSpacing: '-0.01em'
            }}
          >
            {t('contact.title')} <span style={{ color: 'hsl(158, 65%, 45%)' }}>{t('contact.titleHighlight')}</span>?
          </h2>
          
          <p 
            className="text-lg max-w-2xl mx-auto leading-relaxed text-descriptive"
            style={{ 
              color: 'hsl(160 10% 45%)',
              lineHeight: '1.6'
            }}
          >
            {(() => {
              const text = t('contact.subtitle');
              const splinterIndex = text.toLowerCase().indexOf('splinter');
              
              if (splinterIndex === -1) return text;
              
              const beforeSplinter = text.substring(0, splinterIndex);
              const splinterWord = text.substring(splinterIndex, splinterIndex + 8); // "Splinter"
              const afterSplinter = text.substring(splinterIndex + 8);
              
              return (
                <>
                  {beforeSplinter}
                  <span className="inline-flex items-center gap-2">
                    <img 
                      src={splinterLogo} 
                      alt="Splinter Logo" 
                      className="w-6 h-6 inline-block"
                      style={{
                        filter: 'brightness(1.05) saturate(1.1) drop-shadow(0 0 8px hsl(158, 65%, 58%, 0.3))',
                        animation: 'shimmer 3s ease-in-out infinite'
                      }}
                    />
                    <span 
                      className="font-heading font-semibold relative"
                      style={{
                        background: 'linear-gradient(135deg, hsl(158, 65%, 45%), hsl(158, 65%, 60%), hsl(158, 55%, 50%))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textShadow: '0 0 20px hsl(158, 65%, 58%, 0.4)',
                        filter: 'drop-shadow(0 0 8px hsl(158, 65%, 58%, 0.3))',
                        animation: 'shimmer 3s ease-in-out infinite',
                        backgroundSize: '200% 100%'
                      }}
                    >
                      {splinterWord}
                    </span>
                  </span>
                  {afterSplinter}
                </>
              );
            })()}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              size="default" 
              className="group shadow-lg hover:shadow-xl transition-all duration-300 text-cta-primary cursor-pointer"
              style={{
                backgroundColor: 'hsl(158, 65%, 45%)',
                color: 'hsl(0 0% 100%)',
                letterSpacing: '-0.005em'
              }}
            >
              {t('contact.ctaPrimary')}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="default"
              className="text-cta-secondary cursor-pointer"
              style={{
                borderColor: 'hsl(158, 65%, 45%)',
                color: 'hsl(158, 65%, 45%)',
                letterSpacing: '-0.005em'
              }}
            >
              {t('contact.ctaSecondary')}
            </Button>
          </div>


        </div>

        {/* Contact Form - Centered */}
        <div className="flex justify-center">
          <Card className="border border-border/50 shadow-lg w-full max-w-2xl mx-auto">
            <CardContent className="p-6 lg:p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl lg:text-2xl font-semibold text-foreground">{t('contact.form.title')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('contact.form.subtitle')}
                  </p>
                </div>
                
                <form className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{t('contact.form.firstName')}</label>
                      <Input 
                        placeholder={t('contact.form.firstNamePlaceholder')} 
                        className="border-border focus:border-primary focus:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{t('contact.form.lastName')}</label>
                      <Input 
                        placeholder={t('contact.form.lastNamePlaceholder')}
                        className="border-border focus:border-primary focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t('contact.form.email')}</label>
                    <Input 
                      type="email" 
                      placeholder={t('contact.form.emailPlaceholder')}
                      className="border-border focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t('contact.form.reason')}</label>
                    <Select>
                      <SelectTrigger className="border-border focus:border-primary focus:ring-primary/20">
                        <SelectValue placeholder={t('contact.form.reasonPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {t('contact.form.reasonOptions').map((option: string, index: number) => (
                          <SelectItem key={index} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t('contact.form.practice')}</label>
                    <Select>
                      <SelectTrigger className="border-border focus:border-primary focus:ring-primary/20">
                        <SelectValue placeholder={t('contact.form.practicePlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        {t('contact.form.practiceOptions').map((option: string, index: number) => (
                          <SelectItem key={index} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t('contact.form.message')}</label>
                    <Textarea 
                      placeholder={t('contact.form.messagePlaceholder')}
                      className="min-h-[100px] border-border focus:border-primary focus:ring-primary/20 resize-none"
                    />
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer">
                    {t('contact.form.submit')}
                  </Button>
                  
                  <div className="text-xs text-center text-muted-foreground leading-relaxed">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}