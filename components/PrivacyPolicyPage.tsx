import { Button } from './ui/button';
import { ArrowLeft, Download, Building, Database, Target, Scale, Settings, Clock, Share, ShieldCheck, RefreshCw, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PrivacyPolicyPageProps {
  onBackToHome: () => void;
}

export function PrivacyPolicyPage({ onBackToHome }: PrivacyPolicyPageProps) {
  const { t } = useLanguage();

  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'building': return Building;
      case 'database': return Database;
      case 'target': return Target;
      case 'scale': return Scale;
      case 'settings': return Settings;
      case 'clock': return Clock;
      case 'share': return Share;
      case 'shield-check': return ShieldCheck;
      case 'refresh': return RefreshCw;
      case 'mail': return Mail;
      default: return ShieldCheck;
    }
  };

  const generatePDF = () => {
    // Use browser's native print functionality with CSS optimizations
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      // Fallback if popup is blocked
      window.print();
      return;
    }

    const content = document.getElementById('privacy-content');
    if (!content) {
      window.print();
      return;
    }

    const printContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Privacy Policy - Splinter.ch</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap');
            
            * { margin: 0; padding: 0; box-sizing: border-box; }
            
            body {
              font-family: 'DM Sans', sans-serif;
              line-height: 1.6;
              color: #2B333D;
              max-width: 210mm;
              margin: 0 auto;
              padding: 20mm;
              font-size: 12pt;
              background-color: white;
            }
            
            h1, h2, h3, h4, h5, h6 {
              font-family: 'Manrope', sans-serif;
              color: #1D8B6B;
              margin-bottom: 16px;
              page-break-after: avoid;
            }
            
            h1 { font-size: 24pt; margin-bottom: 24px; }
            h2 { font-size: 18pt; margin-top: 24px; }
            h3 { font-size: 14pt; margin-top: 16px; }
            
            p { margin-bottom: 12px; color: #2B333D; }
            
            ul { margin: 12px 0 12px 20px; }
            li { margin-bottom: 6px; color: #2B333D; }
            
            .header {
              text-align: center;
              margin-bottom: 32px;
              border-bottom: 2px solid #1D8B6B;
              padding-bottom: 16px;
            }
            
            .section {
              margin-bottom: 24px;
              page-break-inside: avoid;
            }
            
            .icon-section {
              display: flex;
              align-items: center;
              margin-bottom: 16px;
            }
            
            .section-number {
              font-weight: 600;
              color: #1D8B6B;
              margin-right: 8px;
            }
            
            .content-box {
              background-color: #F0F7F5;
              padding: 16px;
              border-radius: 8px;
              margin: 12px 0;
              border-left: 4px solid #1D8B6B;
            }
            
            .note {
              background-color: #F0F7F5;
              padding: 12px;
              border-radius: 6px;
              border-left: 3px solid #1D8B6B;
              margin: 12px 0;
              font-style: italic;
            }
            
            .contact-info {
              font-weight: 600;
              color: #1D8B6B;
            }
            
            @media print {
              body { print-color-adjust: exact; }
              .no-print { display: none !important; }
              .page-break { page-break-before: always; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📄 ${t('privacy.title')} ${t('privacy.titleHighlight')} - ${t('privacy.subtitle')}</h1>
            <p><strong>${t('privacy.lastUpdated')}</strong></p>
            <p style="margin-top: 16px; font-style: italic;">${t('privacy.intro')}</p>
          </div>
          
          ${t('privacy.sections').map((section: any, index: number) => `
            <div class="section">
              <div class="icon-section">
                <h2>${section.title}</h2>
              </div>
              
              ${section.id === 'data-controller' ? `
                <div class="content-box">
                  <p><strong>Company:</strong> ${section.content.company}</p>
                  <p><strong>Controller:</strong> ${section.content.controller}</p>
                  <p><strong>Address:</strong> ${section.content.address}</p>
                  <p class="contact-info"><strong>Contact email:</strong> info@splinter.ch</p>
                </div>
              ` : ''}
              
              ${(section.id === 'processing-methods' || section.id === 'changes') ? `
                <div class="content-box">
                  <p>${section.content}</p>
                </div>
              ` : ''}
              
              ${section.id === 'contact' ? `
                <div class="content-box">
                  <p>${section.content}</p>
                  <p class="contact-info">${section.contact}</p>
                </div>
              ` : ''}
              
              ${section.subtitle ? `
                <p><strong>${section.subtitle}</strong></p>
                ${section.items ? `
                  <ul>
                    ${section.items.map((item: string) => `<li>${item}</li>`).join('')}
                  </ul>
                ` : ''}
                
                ${section.note ? `
                  <div class="note">
                    <strong>Note:</strong> ${section.note}
                  </div>
                ` : ''}
                
                ${section.id === 'rights' ? `
                  <div class="content-box">
                    <p><strong>${section.requestInfo}</strong></p>
                    <p>${section.authorities.switzerland}</p>
                    <p>${section.authorities.eea}</p>
                  </div>
                ` : ''}
              ` : ''}
            </div>
          `).join('')}
          
          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #E4E8EC; text-align: center; font-size: 10pt; color: #91969B;">
            <p>This document was generated from www.splinter.ch on ${new Date().toLocaleDateString()}</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Privacy Policy */}
      <section className="px-6 py-16 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center space-y-8">
            {/* Back Button and PDF Download */}
            <div className="flex justify-between items-center mb-8 no-print">
              <Button 
                variant="outline" 
                onClick={onBackToHome}
                className="group text-cta-secondary cursor-pointer border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700"
              >
                <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                {t('privacy.backToHome')}
              </Button>

              <Button 
                onClick={generatePDF}
                className="group shadow-sm hover:shadow-md transition-all duration-300 text-cta-primary cursor-pointer"
                style={{
                  backgroundColor: 'hsl(158, 65%, 45%)',
                  color: 'white',
                  letterSpacing: '-0.005em'
                }}
              >
                <Download className="mr-2 w-4 h-4" />
                {t('privacy.downloadPdf')}
              </Button>
            </div>

            {/* Title */}
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4">
                <h1 className="text-4xl lg:text-5xl leading-tight text-header text-gray-900">
                  📄 {t('privacy.title')}{' '}
                  <span 
                    className="font-semibold"
                    style={{ 
                      color: 'hsl(158, 65%, 45%)'
                    }}
                  >
                    {t('privacy.titleHighlight')}
                  </span>
                </h1>
              </div>
              
              <div className="space-y-3">
                <p className="text-xl font-body font-semibold text-gray-700">
                  {t('privacy.subtitle')}
                </p>
                <p className="text-lg max-w-2xl mx-auto leading-relaxed text-gray-600">
                  **{t('privacy.lastUpdated')}**
                </p>
              </div>
            </div>

            {/* Introduction - Back in hero section but with same width as content sections */}
            <div className="w-full max-w-5xl mx-auto">
              <div 
                className="p-8 rounded-lg text-left border"
                style={{ 
                  backgroundColor: 'hsl(158, 30%, 95%)', // Verde leggero
                  borderColor: 'hsl(158, 65%, 45% / 0.2)'
                }}
              >
                <p className="text-base font-body leading-relaxed text-gray-700">
                  {t('privacy.intro')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="px-6 py-16 bg-white">
        <div id="privacy-content" className="max-w-5xl mx-auto w-full space-y-12">
          {t('privacy.sections').map((section: any, index: number) => {
            const IconComponent = getSectionIcon(section.icon);
            
            return (
              <div key={section.id} className="space-y-6">
                {/* Section Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 no-print"
                    style={{ backgroundColor: 'hsl(158, 65%, 45%)' }}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 
                      className="text-2xl lg:text-3xl text-header mb-3"
                      style={{ 
                        color: 'hsl(158, 65%, 45%)',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      {section.title}
                    </h2>
                  </div>
                </div>
                
                <div 
                  className="p-8 rounded-lg shadow-sm border"
                  style={{ 
                    backgroundColor: 'hsl(158, 30%, 95%)', // Verde leggero per tutti i riquadri
                    borderColor: 'hsl(158, 65%, 45% / 0.2)'
                  }}
                >
                  {/* Data Controller Special Layout */}
                  {section.id === 'data-controller' && (
                    <div className="space-y-4">
                      {Object.entries(section.content).map(([key, value]: [string, any]) => (
                        <p 
                          key={key}
                          className="text-base font-body leading-relaxed text-gray-700"
                        >
                          {key === 'email' ? (
                            <>
                              Contact email: <strong style={{ color: 'hsl(158, 65%, 45%)' }}>info@splinter.ch</strong>
                            </>
                          ) : (
                            value
                          )}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Processing Methods and Changes - Simple Content */}
                  {(section.id === 'processing-methods' || section.id === 'changes') && (
                    <p className="text-base font-body leading-relaxed text-gray-700">
                      {section.content}
                    </p>
                  )}

                  {/* Contact Section */}
                  {section.id === 'contact' && (
                    <div className="space-y-4">
                      <p className="text-base font-body leading-relaxed text-gray-700">
                        {section.content}
                      </p>
                      <div 
                        className="text-lg font-body font-semibold"
                        style={{ color: 'hsl(158, 65%, 45%)' }}
                      >
                        {section.contact}
                      </div>
                    </div>
                  )}

                  {/* Sections with Subtitle and Items */}
                  {section.subtitle && (
                    <>
                      <p className="text-base font-body leading-relaxed mb-6 text-gray-700">
                        {section.subtitle}
                      </p>

                      {section.items && (
                        <ul className="space-y-3 mb-6">
                          {section.items.map((item: string, itemIndex: number) => (
                            <li 
                              key={itemIndex}
                              className="text-sm font-body leading-relaxed flex items-start gap-3 text-gray-600"
                            >
                              <div 
                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                style={{ backgroundColor: 'hsl(158, 65%, 45%)' }}
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Special sections with additional info */}
                      {section.note && (
                        <div 
                          className="p-4 rounded-lg mt-4 border"
                          style={{ 
                            backgroundColor: 'hsl(158, 40%, 90%)', // Verde leggermente più scuro per le note
                            borderColor: 'hsl(158, 65%, 45% / 0.3)'
                          }}
                        >
                          <p className="text-sm font-body leading-relaxed font-medium text-gray-700">
                            <strong>Note:</strong> {section.note}
                          </p>
                        </div>
                      )}

                      {/* Data Subject Rights - Special Content */}
                      {section.id === 'rights' && (
                        <div className="space-y-4 mt-6">
                          <p className="text-sm font-body leading-relaxed font-medium text-gray-700">
                            {section.requestInfo}
                          </p>
                          <div className="space-y-2">
                            <p className="text-sm font-body leading-relaxed text-gray-600">
                              {section.authorities.switzerland}
                            </p>
                            <p className="text-sm font-body leading-relaxed text-gray-600">
                              {section.authorities.eea}
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {/* Divider */}
          <div className="w-full h-px bg-gray-200" />

          {/* Call to Action */}
          <div className="text-center pt-12 no-print">
            <div 
              className="p-8 rounded-lg border"
              style={{ 
                backgroundColor: 'hsl(158, 30%, 95%)', // Verde leggero anche per il CTA
                borderColor: 'hsl(158, 65%, 45% / 0.2)'
              }}
            >
              <h3 
                className="text-xl font-heading font-semibold mb-4"
                style={{ color: 'hsl(158, 65%, 45%)' }}
              >
                Questions about our Privacy Policy?
              </h3>
              <p className="text-sm font-body leading-relaxed mb-6 text-gray-700">
                We're committed to transparency and protecting your privacy. Contact us anytime at <strong style={{ color: 'hsl(158, 65%, 45%)' }}>info@splinter.ch</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={onBackToHome}
                  className="group shadow-sm hover:shadow-md transition-all duration-300 text-cta-primary cursor-pointer"
                  style={{
                    backgroundColor: 'hsl(158, 65%, 45%)',
                    color: 'white',
                    letterSpacing: '-0.005em'
                  }}
                >
                  Back to Home
                  <ArrowLeft className="ml-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </Button>
                <Button 
                  onClick={generatePDF}
                  variant="outline"
                  className="group text-cta-secondary cursor-pointer border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700"
                >
                  <Download className="mr-2 w-4 h-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}