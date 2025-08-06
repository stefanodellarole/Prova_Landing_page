import { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Play, Activity, Shield, Users, Image } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { VideoModal } from './VideoModal';

interface HeroSectionProps {
  videoUrl?: string; // Optional video URL for the modal
}

export function HeroSection({ videoUrl }: HeroSectionProps) {
  const { t } = useLanguage();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeVideoModal = () => setIsVideoModalOpen(false);

  return (
    <>
      <section 
        id="hero" 
        className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(0 0% 100%) 85%, hsl(150 60% 99%) 95%, hsl(150 60% 97%) 100%)',
          color: 'hsl(160 15% 15%)' 
        }}
      >
        {/* Green pattern background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-10 left-10 w-64 h-64 border rounded-full" style={{ borderColor: 'hsl(158, 65%, 45%)' }}></div>
          <div className="absolute top-32 right-20 w-32 h-32 border rounded-full" style={{ borderColor: 'hsl(158, 65%, 45%)' }}></div>
          <div className="absolute bottom-20 left-1/3 w-48 h-48 border rounded-full" style={{ borderColor: 'hsl(158, 65%, 45% / 0.5)' }}></div>
        </div>
        
        <div className="container mx-auto relative w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 
                  className="text-4xl lg:text-6xl leading-tight text-header"
                  style={{ 
                    color: 'hsl(160 15% 15%)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {t('hero.title')}{' '}
                  <span 
                    className="font-semibold"
                    style={{ 
                      background: 'linear-gradient(135deg, hsl(158, 65%, 45%), hsl(158, 65%, 55%))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {t('hero.titleHighlight')}
                  </span>
                </h1>
                
                <p 
                  className="text-xl max-w-lg leading-relaxed text-descriptive"
                  style={{ 
                    color: 'hsl(160 10% 45%)',
                    lineHeight: '1.6'
                  }}
                >
                  {t('hero.subtitle')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="group shadow-lg hover:shadow-xl transition-all duration-300 text-cta-primary cursor-pointer"
                  style={{
                    backgroundColor: 'hsl(158, 65%, 45%)',
                    color: 'hsl(0 0% 100%)',
                    letterSpacing: '-0.005em'
                  }}
                >
                  {t('hero.ctaPrimary')}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="group text-cta-secondary cursor-pointer hover:bg-teal-50 hover:border-teal-600 transition-all duration-300"
                  style={{
                    borderColor: 'hsl(158, 65%, 45%)',
                    color: 'hsl(158, 65%, 45%)',
                    letterSpacing: '-0.005em'
                  }}
                  onClick={openVideoModal}
                >
                  <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                  {t('hero.ctaSecondary')}
                </Button>
              </div>

              {/* Medical Trust Indicators */}

              {/* Stats with green styling */}
              <div className="pt-8">
                <div 
                  className="p-6 rounded-lg border"
                  style={{ 
                    backgroundColor: 'hsl(158, 30%, 95%)', /* Secondary Light dalla palette */
                    borderColor: 'hsl(158, 65%, 45% / 0.2)'
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'hsl(158, 65%, 45%)' }}
                    >
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <h3 
                      className="font-heading font-semibold text-lg"
                      style={{ color: 'hsl(158, 65%, 45%)' }}
                    >
                      {t('hero.challenge.title')}
                    </h3>
                  </div>
                  <p 
                    className="text-base font-body leading-relaxed"
                    style={{ 
                      color: 'hsl(158, 65%, 35%)',
                      lineHeight: '1.6'
                    }}
                  >
                    {t('hero.challenge.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Image Placeholder with green styling */}
            <div className="relative">
              <div className="relative z-10">
                <div className="p-8 rounded-3xl"
                  style={{
                    background: 'linear-gradient(135deg, hsl(158, 65%, 45% / 0.05), hsl(158, 65%, 45% / 0.08))'
                  }}
                >
                  {/* Image Placeholder 1 */}
                  <div 
                    className="rounded-2xl shadow-2xl w-full h-[500px] flex flex-col items-center justify-center"
                    style={{ 
                      border: '2px dashed hsl(150 35% 90%)',
                      backgroundColor: 'hsl(150 40% 94%)'
                    }}
                  >
                    <Image 
                      className="w-16 h-16 mb-4" 
                      style={{ color: 'hsl(160 10% 60%)' }} 
                    />
                    <div 
                      className="text-4xl text-header mb-2"
                      style={{ 
                        color: 'hsl(158, 65%, 45%)',
                        letterSpacing: '-0.01em',
                        fontWeight: 'var(--font-weight-bold)'
                      }}
                    >
                      1
                    </div>
                    <div 
                      className="text-sm text-center px-4 text-tooltip"
                      style={{ color: 'hsl(160 10% 60%)' }}
                    >
                      Hero Image Placeholder
                      <br />
                      (Smart physiotherapy platform)
                    </div>
                  </div>
                </div>
              </div>
              {/* Green-inspired decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border -z-10"
                style={{
                  backgroundColor: 'hsl(158, 65%, 45% / 0.1)',
                  borderColor: 'hsl(158, 65%, 45% / 0.2)'
                }}
              ></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border -z-10"
                style={{
                  backgroundColor: 'hsl(158, 65%, 45% / 0.1)',
                  borderColor: 'hsl(158, 65%, 45% / 0.2)'
                }}
              ></div>
              <div className="absolute top-1/2 -right-12 w-16 h-16 rounded-full -z-10"
                style={{
                  backgroundColor: 'hsl(158, 65%, 45% / 0.2)'
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={closeVideoModal} 
        videoUrl={videoUrl}
      />
    </>
  );
}