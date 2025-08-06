import { Button } from './ui/button';
import { ArrowLeft, Download, Shield, Lock, Eye, Edit, Trash2, Download as DownloadIcon, Ban, UserX, Mail, Scale } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface GDPRCompliancePageProps {
  onBackToHome: () => void;
}

export function GDPRCompliancePage({ onBackToHome }: GDPRCompliancePageProps) {
  const { t, language } = useLanguage();

  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield': return Shield;
      case 'lock': return Lock;
      case 'eye': return Eye;
      case 'edit': return Edit;
      case 'trash': return Trash2;
      case 'download': return DownloadIcon;
      case 'ban': return Ban;
      case 'user-x': return UserX;
      case 'mail': return Mail;
      case 'scale': return Scale;
      default: return Shield;
    }
  };

  // GDPR sections data - structured like other legal pages
  const gdprSections = [
    {
      id: 'what-is-gdpr',
      title: language === 'it' ? '1. Cos\'è il GDPR?' : '1. What Is the GDPR?',
      icon: 'shield',
      content: language === 'it' 
        ? 'Il Regolamento Generale sulla Protezione dei Dati (GDPR) è un regolamento dell\'Unione Europea progettato per proteggere i dati personali e la privacy degli individui all\'interno dell\'UE, del SEE e della Svizzera. Garantisce agli individui diritti specifici su come i loro dati personali vengono raccolti, utilizzati e conservati.'
        : 'The General Data Protection Regulation (GDPR) is a European Union regulation designed to protect the personal data and privacy of individuals within the EU, EEA, and Switzerland. It grants individuals specific rights over how their personal data is collected, used, and stored.'
    },
    {
      id: 'data-collection',
      title: language === 'it' ? '2. Quali Dati Personali Raccogliamo?' : '2. What Personal Data Do We Collect?',
      icon: 'lock',
      content: language === 'it' 
        ? 'Raccogliamo solo i dati personali che ci fornisci volontariamente, inclusi il tuo indirizzo email (per aggiornamenti del prodotto o accesso alla prova) e dati opzionali forniti tramite moduli di contatto o supporto.'
        : 'We only collect personal data that you voluntarily provide to us, including your email address (for product updates or trial access) and optional data provided through contact or support forms.',
      additional: language === 'it'
        ? 'NON raccogliamo dati di pagamento, informazioni personali sensibili o ti tracciamo tramite cookie.'
        : 'We do NOT collect payment data, sensitive personal information, or track you via cookies.'
    },
    {
      id: 'legal-basis',
      title: language === 'it' ? '3. Base Legale per il Trattamento' : '3. Legal Basis for Processing',
      icon: 'scale',
      subtitle: language === 'it' 
        ? 'Trattiamo i tuoi dati personali sulla base di:'
        : 'We process your personal data on the basis of:',
      items: [
        language === 'it' 
          ? 'Consenso: Fornisci il consenso esplicito quando invii la tua email per ricevere aggiornamenti o richiedere l\'accesso alla prova.'
          : 'Consent: You provide explicit consent when you submit your email to receive updates or request trial access.',
        language === 'it'
          ? 'Interesse legittimo: Quando necessario per mantenere la funzionalità e la sicurezza della nostra piattaforma.'
          : 'Legitimate interest: When necessary for maintaining the functionality and security of our platform.'
      ],
      note: language === 'it'
        ? 'Puoi ritirare il tuo consenso in qualsiasi momento.'
        : 'You may withdraw your consent at any time.'
    },
    {
      id: 'gdpr-rights',
      title: language === 'it' ? '4. I Tuoi Diritti Secondo il GDPR' : '4. Your Rights Under GDPR',
      icon: 'eye',
      subtitle: language === 'it' 
        ? 'Come soggetto dei dati secondo il GDPR, hai i seguenti diritti:'
        : 'As a data subject under the GDPR, you have the following rights:',
      items: [
        language === 'it' 
          ? 'Diritto di Accesso: Puoi richiedere l\'accesso ai dati personali che deteniamo su di te.'
          : 'Right to Access: You may request access to the personal data we hold about you.',
        language === 'it'
          ? 'Diritto di Rettifica: Puoi richiedere la correzione di dati inesatti o incompleti.'
          : 'Right to Rectification: You may request correction of inaccurate or incomplete data.',
        language === 'it'
          ? 'Diritto alla Cancellazione ("Diritto all\'Oblio"): Puoi richiedere la cancellazione dei tuoi dati in determinate condizioni.'
          : 'Right to Erasure ("Right to be Forgotten"): You may request deletion of your data under certain conditions.',
        language === 'it'
          ? 'Diritto di Limitazione del Trattamento: Puoi richiedere un uso limitato dei tuoi dati in casi specifici.'
          : 'Right to Restrict Processing: You may request limited use of your data in specific cases.',
        language === 'it'
          ? 'Diritto alla Portabilità dei Dati: Puoi richiedere una copia dei tuoi dati in formato portatile.'
          : 'Right to Data Portability: You may request a copy of your data in a portable format.',
        language === 'it'
          ? 'Diritto di Opposizione: Puoi opporti al trattamento dei tuoi dati in determinati casi.'
          : 'Right to Object: You may object to the processing of your data in certain cases.',
        language === 'it'
          ? 'Diritto di Ritirare il Consenso: Puoi ritirare il consenso in qualsiasi momento senza influire sulla legalità del trattamento precedente.'
          : 'Right to Withdraw Consent: You may withdraw consent at any time without affecting the lawfulness of prior processing.'
      ]
    },
    {
      id: 'exercise-rights',
      title: language === 'it' ? '5. Come Esercitare i Tuoi Diritti' : '5. How to Exercise Your Rights',
      icon: 'mail',
      content: language === 'it' 
        ? 'Per fare una richiesta riguardo ai tuoi dati personali, contattaci all\'indirizzo: info@splinter.ch. Includi l\'oggetto: "Richiesta GDPR" e specifica il tipo di richiesta (es. accesso, cancellazione, rettifica).'
        : 'To make a request regarding your personal data, please contact us at: info@splinter.ch. Include the subject: "GDPR Request" and specify the type of request (e.g., access, delete, rectify).',
      additional: language === 'it'
        ? 'Risponderemo entro 30 giorni, come richiesto dal GDPR.'
        : 'We will respond within 30 days, as required by GDPR.'
    },
    {
      id: 'data-security',
      title: language === 'it' ? '6. Sicurezza dei Dati' : '6. Data Security',
      icon: 'shield',
      content: language === 'it' 
        ? 'Conserviamo i tuoi dati personali utilizzando un\'infrastruttura sicura che rispetta le migliori pratiche del settore. Solo il personale autorizzato ha accesso a questi dati.'
        : 'We store your personal data using secure infrastructure that complies with best industry practices. Only authorized personnel have access to this data.'
    },
    {
      id: 'data-transfers',
      title: language === 'it' ? '7. Trasferimenti Internazionali di Dati' : '7. International Data Transfers',
      icon: 'lock',
      content: language === 'it' 
        ? 'Attualmente, i tuoi dati sono conservati e trattati all\'interno della Svizzera o dell\'UE. Se i dati dovessero mai essere trasferiti al di fuori del SEE, garantiremo la conformità al GDPR attraverso adeguate garanzie.'
        : 'At present, your data is stored and processed within Switzerland or the EU. If data is ever transferred outside the EEA, we will ensure compliance with GDPR through appropriate safeguards.'
    },
    {
      id: 'learn-more',
      title: language === 'it' ? '8. Ulteriori Informazioni' : '8. Learn More',
      icon: 'eye',
      content: language === 'it' 
        ? 'Per dettagli completi su come gestiamo i tuoi dati, consulta la nostra Informativa sulla Privacy.'
        : 'For full details on how we handle your data, please refer to our Privacy Policy.'
    },
    {
      id: 'summary',
      title: language === 'it' ? '9. Riepilogo' : '9. Summary',
      icon: 'shield',
      subtitle: language === 'it' 
        ? 'In sintesi, la nostra conformità al GDPR:'
        : 'In summary, our GDPR compliance:',
      items: [
        language === 'it' 
          ? 'Raccogliamo solo dati personali essenziali con il tuo consenso'
          : 'We collect only essential personal data with your consent',
        language === 'it'
          ? 'Hai il pieno controllo sui tuoi dati e puoi richiedere accesso o cancellazione'
          : 'You have full control over your data and can request access or deletion',
        language === 'it'
          ? 'Non condividiamo o vendiamo i tuoi dati personali'
          : 'We do not share or sell your personal data',
        language === 'it'
          ? 'Siamo impegnati nella piena conformità al GDPR'
          : 'We are committed to full GDPR compliance'
      ]
    }
  ];

  const generatePDF = () => {
    // Use browser's native print functionality with CSS optimizations
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      // Fallback if popup is blocked
      window.print();
      return;
    }

    const content = document.getElementById('gdpr-content');
    if (!content) {
      window.print();
      return;
    }

    const printContent = `
      <!DOCTYPE html>
      <html lang="${language}">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>GDPR Compliance - Splinter.ch</title>
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
            
            @media print {
              body { print-color-adjust: exact; }
              .no-print { display: none !important; }
              .page-break { page-break-before: always; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🛡️ ${language === 'it' ? 'Conformità GDPR' : 'GDPR Compliance'} - ${language === 'it' ? 'I Tuoi Diritti sulla Protezione dei Dati' : 'Your Data Protection Rights'}</h1>
            <p><strong>${language === 'it' ? 'Ultimo aggiornamento' : 'Last updated'}: ${language === 'it' ? '5 agosto 2025' : 'August 5, 2025'}</strong></p>
            <p style="margin-top: 16px; font-style: italic;">${language === 'it' ? 'Da Splinter.ch, siamo impegnati a proteggere i tuoi dati personali e garantire trasparenza nel modo in cui li gestiamo.' : 'At Splinter.ch, we are committed to protecting your personal data and ensuring transparency in how we handle it.'}</p>
          </div>
          
          ${gdprSections.map((section, index) => `
            <div class="section">
              <h2>${section.title}</h2>
              
              ${section.content ? `
                <div class="content-box">
                  <p>${section.content}</p>
                  ${section.additional ? `<p style="margin-top: 12px;">${section.additional}</p>` : ''}
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
      {/* Hero Section - GDPR Compliance */}
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
                {language === 'it' ? 'Torna al sito' : 'Back to site'}
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
                {language === 'it' ? 'Scarica PDF' : 'Download PDF'}
              </Button>
            </div>

            {/* Title */}
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4">
                <h1 className="text-4xl lg:text-5xl leading-tight text-header text-gray-900">
                  🛡️ {language === 'it' ? 'Conformità' : 'GDPR'}{' '}
                  <span 
                    className="font-semibold"
                    style={{ 
                      color: 'hsl(158, 65%, 45%)'
                    }}
                  >
                    {language === 'it' ? 'GDPR' : 'Compliance'}
                  </span>
                </h1>
              </div>
              
              <div className="space-y-3">
                <p className="text-xl font-body font-semibold text-gray-700">
                  {language === 'it' ? 'I Tuoi Diritti sulla Protezione dei Dati' : 'Your Data Protection Rights'}
                </p>
                <p className="text-lg max-w-2xl mx-auto leading-relaxed text-gray-600">
                  **{language === 'it' ? 'Ultimo aggiornamento: 5 agosto 2025' : 'Last updated: August 5, 2025'}**
                </p>
              </div>
            </div>

            {/* Introduction */}
            <div className="w-full max-w-5xl mx-auto">
              <div 
                className="p-8 rounded-lg text-left border"
                style={{ 
                  backgroundColor: 'hsl(158, 30%, 95%)', // Verde leggero
                  borderColor: 'hsl(158, 65%, 45% / 0.2)'
                }}
              >
                <p className="text-base font-body leading-relaxed text-gray-700">
                  {language === 'it' 
                    ? 'Da Splinter.ch, siamo impegnati a proteggere i tuoi dati personali e garantire trasparenza nel modo in cui li gestiamo. Questa pagina delinea i tuoi diritti secondo il Regolamento Generale sulla Protezione dei Dati (UE) 2016/679 (GDPR) e come puoi esercitarli.'
                    : 'At Splinter.ch, we are committed to protecting your personal data and ensuring transparency in how we handle it. This page outlines your rights under the General Data Protection Regulation (EU) 2016/679 (GDPR) and how you can exercise them.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="px-6 py-16 bg-white">
        <div id="gdpr-content" className="max-w-5xl mx-auto w-full space-y-12">
          {gdprSections.map((section, index) => {
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
                  {/* Simple Content Sections */}
                  {section.content && !section.subtitle && (
                    <div className="space-y-4">
                      <p className="text-base font-body leading-relaxed text-gray-700">
                        {section.content}
                      </p>
                      {section.additional && (
                        <p className="text-base font-body leading-relaxed text-gray-700 mt-4">
                          {section.additional}
                        </p>
                      )}
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
                {language === 'it' ? 'Domande sulla nostra Conformità GDPR?' : 'Questions about our GDPR Compliance?'}
              </h3>
              <p className="text-sm font-body leading-relaxed mb-6 text-gray-700">
                {language === 'it' 
                  ? 'Siamo qui per aiutarti a chiarire qualsiasi domanda sui tuoi diritti GDPR. Contattaci in qualsiasi momento all\'indirizzo'
                  : 'We\'re here to help clarify any questions about your GDPR rights. Contact us anytime at'
                } <strong style={{ color: 'hsl(158, 65%, 45%)' }}>info@splinter.ch</strong>
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
                  {language === 'it' ? 'Torna al sito' : 'Back to Home'}
                  <ArrowLeft className="ml-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </Button>
                <Button 
                  onClick={generatePDF}
                  variant="outline"
                  className="group text-cta-secondary cursor-pointer border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700"
                >
                  <Download className="mr-2 w-4 h-4" />
                  {language === 'it' ? 'Scarica PDF' : 'Download PDF'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}