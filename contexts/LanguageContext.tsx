'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'it';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any; // Changed from string to any to support arrays and objects
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en'); // Default to English

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'it')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const t = (key: string): any => { // Changed return type to any
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return value !== undefined ? value : key; // Return the value (string, array, or object)
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Translation objects
const translations = {
  en: {
    header: {
      home: 'Home',
      features: 'Solution',
      benefits: 'Benefits',
      contact: 'Contact',
      startNow: 'Start Now'
    },
    hero: {
      badge: 'AI-Powered Physiotherapy Assistant',
      title: 'Physiotherapy meets',
      titleHighlight: 'artificial intelligence',
      subtitle: 'Splinter is the AI-powered assistant that support patient onboarding and speed up your medical investigation. Save time, enhance care, and focus on what matters most - your patients.',
      ctaPrimary: 'Start Free 30-Day Trial',
      ctaSecondary: 'Watch Video',
      stats: {
        physiotherapists: 'Physiotherapists',
        patients: 'Patients',
        satisfaction: 'Satisfaction'
      },
      challenge: {
        title: 'Current Challenge',
        description: 'Patient onboarding is complex and time-consuming, from reviewing medical literature to building a full recovery plan. Splinter streamlines the evaluation process and boosts communication with your patients.'
      }
    },
    features: {
      title: 'Splinter automates patient evaluation',
      titleHighlight: 'and treatment proposal using AI',
      subtitle: 'Focus on delivering exceptional care while our AI supports your clinical decision-making. Save time and boost effectiveness.',
      items: [
        {
          title: 'Digital Documents',
          description: 'Eliminate paper and digitize all onboarding forms. Patients can complete everything online before their visit.'
        },
        {
          title: 'Time Reduction',
          description: 'Reduce waiting times by 70%. Patients arrive already prepared with all documentation completed.'
        },
        {
          title: 'Guided Process',
          description: 'An intuitive step-by-step process that guides the patient through every phase of onboarding.'
        },
        {
          title: 'Centralized Management',
          description: 'View and manage all your patients from a single centralized and organized dashboard.'
        },
        {
          title: 'GDPR Security',
          description: 'Complete protection of sensitive data with end-to-end encryption and guaranteed GDPR compliance.'
        },
        {
          title: 'Advanced Analytics',
          description: 'Monitor your practice performance with detailed reports and real-time analytics.'
        }
      ]
    },
    howItWorks: {
      title: 'How',
      titleHighlight: 'It Works',
      subtitle: 'A simple and linear process that transforms the onboarding experience for both you and your patients.',
      steps: [
        {
          title: 'Smart Data Collection and Analysis',
          description: 'AI-powered forms help you processing data and responses. Intelligent algorithms automatically extract key insights from patient information, reducing manual data entry and improving accuracy.'
        },
        {
          title: 'Treatment Proposals',
          description: 'Get AI-powered treatment recommendations based on evidence-based protocols and patient-specific conditions, streamlining your clinical decision-making process.'
        },
        {
          title: 'Automatic Document Generation',
          description: 'Generate professional medical reports, treatment plans, and patient communication materials automatically, saving hours of administrative work.'
        },
        {
          title: 'End-to-end CRM',
          description: 'Complete patient relationship management system that tracks progress, schedules appointments, and maintains comprehensive medical records in one platform.'
        }
      ],
      processTitle: 'The Complete Process in',
      processHighlight: '4 Simple Steps'
    },
    whySplinterWorks: {
      title: 'Why',
      titleHighlight: 'Splinter Works',
      subtitle: 'Designed with physiotherapists, Splinter leverages machine learning to support decision making, not replace it. Our AI enhances your expertise while you maintain full control over patient care.',
      benefits: {
        optimizedOnboarding: {
          title: 'Optimized Onboarding',
          description: 'AI-driven smart forms that assist physiotherapists step by step suggesting questions and tests and reducing patient intake time.'
        },
        reliability: {
          title: 'Clinical Reliability',
          description: 'Get evidence-based treatment recommendations instantly with therapeutic progression, bibliographic references and risks evaluation.'
        },
        accuracy: {
          title: 'Diagnostic Accuracy',
          description: 'Advanced pattern recognition helps identify conditions and treatment options with precision, offering to professionals the ideal support.'
        },
        speed: {
          title: 'Faster Workflows',
          description: 'Reduce administrative time by up to 75% with intelligent automation and smart documentation.'
        },
        experience: {
          title: 'Better Patient Experience',
          description: 'Providing the patient with tailored documentation and progression tracker means a deeper understanding of the rehabilitation process.'
        },
        compliance: {
          title: 'Automatized Documentation',
          description: 'Meet all medical documentation requirements with automatically generated reports and records.'
        }
      },
      stats: {
        timeReduction: 'Time Reduction',
        accuracy: 'AI Accuracy Rate',
        satisfaction: 'User Satisfaction'
      }
    },
    contact: {
      title: 'Ready to',
      titleHighlight: 'Get Started',
      subtitle: 'Join our community who have already transformed their daily operations with Splinter.',
      ctaPrimary: 'Start Free 30-Day Trial',
      ctaSecondary: 'Request a Demo',
      benefits: '✓ No credit card required • ✓ 5-minute setup • ✓ 24/7 support',
      badge: 'Our Contacts',
      form: {
        title: 'Have Questions?',
        subtitle: 'Fill out the form and we\'ll respond within 24 hours.',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        reason: 'Reason of Contact',
        practice: 'Practice/Clinic',
        message: 'Message',
        firstNamePlaceholder: 'Your first name',
        lastNamePlaceholder: 'Your last name',
        emailPlaceholder: 'your-email@example.com',
        reasonPlaceholder: 'Select your reason...',
        practicePlaceholder: 'Select practice type...',
        messagePlaceholder: 'Tell us about your needs...',
        submit: 'Send Message',
        reasonOptions: [
          'More information about the project',
          'I would like to start a free 30-day trial',
          'I am not a physiotherapist, how can I use Splinter app?',
          'Other'
        ],
        practiceOptions: [
          'Private Practice',
          'Hospital',
          'Rehabilitation Center',
          'Sports Clinic',
          'Home Care Service',
          'Nursing Home',
          'University Clinic',
          'Insurance Company',
          'Other'
        ]
      },
      info: {
        title: 'Contact Us Directly',
        email: 'Email',
        phone: 'Phone',
        offices: 'Offices',
        locations: 'Milan, Rome, Turin',
        supportHours: 'Support Hours',
        mondayFriday: 'Monday - Friday',
        saturday: 'Saturday',
        sunday: 'Sunday',
        closed: 'Closed',
        emergencySupport: 'Emergency Support',
        emergencyText: 'Available 24/7 for Premium customers'
      }
    },
    footer: {
      description: 'The platform that simplifies patient onboarding for modern physiotherapists.',
      product: 'Product',
      support: 'Support',
      legal: 'Legal',
      newsletter: {
        title: 'Stay Updated',
        subtitle: 'Get the latest news and tips for your physiotherapy practice.',
        placeholder: 'Your email',
        subscribe: 'Subscribe'
      },
      links: {
        features: 'Features',
        pricing: 'Pricing',
        demo: 'Demo',
        api: 'API',
        integrations: 'Integrations',
        helpCenter: 'Help Center',
        documentation: 'Documentation',
        tutorials: 'Tutorials',
        contacts: 'Contacts',
        status: 'Status',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        gdpr: 'GDPR',
        cookies: 'Cookie Policy',
        licenses: 'Licenses'
      },
      copyright: '© 2024 Splinter. All rights reserved.',
      madeWith: 'Made with ❤️ in Italy'
    },
    privacy: {
      title: 'Privacy',
      titleHighlight: 'Policy',
      subtitle: 'Splinter.ch',
      lastUpdated: 'Last updated: August 5, 2025',
      backToHome: 'Back to Home',
      downloadPdf: 'Download PDF',
      intro: 'This privacy notice describes how personal data is processed through the website www.splinter.ch (hereinafter referred to as the "Site") in accordance with the Swiss Federal Act on Data Protection (FADP) and the EU General Data Protection Regulation (GDPR), applicable to users residing in the European Economic Area (EEA).',
      sections: [
        {
          id: 'data-controller',
          title: '1. Data Controller',
          icon: 'building',
          content: {
            company: 'Splinter.ch',
            controller: 'Data Controller: [Name / Legal Entity Name]',
            address: 'Address: [Street, ZIP code, City, Switzerland]',
            email: 'Contact email: info@splinter.ch'
          }
        },
        {
          id: 'types-of-data',
          title: '2. Types of Data Collected',
          icon: 'database',
          subtitle: 'While visiting or interacting with the Site, we may collect the following types of data:',
          items: [
            'Identification data (e.g., first name, last name)',
            'Contact details (e.g., email address, phone number)',
            'Professional information (if requested via forms)',
            'Technical and usage data (e.g., IP address, browser type, device, operating system)',
            'Any other data voluntarily provided via forms, surveys, or newsletter sign-ups'
          ],
          note: 'Note: We currently do not use external tracking tools (e.g., Google Analytics).'
        },
        {
          id: 'purposes',
          title: '3. Purposes of Data Processing',
          icon: 'target',
          subtitle: 'Personal data may be processed for the following purposes:',
          items: [
            'To provide information about our products and services',
            'To respond to inquiries submitted via forms or email',
            'To carry out internal statistics and performance analysis (anonymized or pseudonymized)',
            'To prevent fraud or misuse of the Site',
            'To comply with legal or regulatory obligations'
          ]
        },
        {
          id: 'legal-basis',
          title: '4. Legal Basis for Processing',
          icon: 'scale',
          subtitle: 'According to the GDPR and FADP, processing may be based on:',
          items: [
            'The explicit consent of the user (e.g., for newsletter subscription)',
            'The performance of pre-contractual measures (e.g., responding to contact forms)',
            'The legitimate interest of the data controller in improving services',
            'Legal obligations to which we are subject'
          ]
        },
        {
          id: 'processing-methods',
          title: '5. Data Processing Methods',
          icon: 'settings',
          content: 'Data is processed lawfully, fairly, and transparently using both electronic and manual tools, and appropriate security measures are in place to prevent unauthorized access, loss, or disclosure.'
        },
        {
          id: 'retention',
          title: '6. Data Retention',
          icon: 'clock',
          subtitle: 'Personal data will be retained only for as long as necessary to fulfill the purposes described above, and in any case for no longer than:',
          items: [
            '24 months for data collected for commercial or analytical purposes',
            '10 years in cases involving legal or accounting obligations (if applicable)'
          ]
        },
        {
          id: 'sharing',
          title: '7. Data Sharing and Transfers',
          icon: 'share',
          subtitle: 'Data may be shared with:',
          items: [
            'Authorized collaborators or consultants',
            'Technical or infrastructure service providers (e.g., hosting providers)',
            'Judicial or regulatory authorities, as required by law'
          ],
          note: 'Data will not be transferred outside of Switzerland or the EEA, unless to countries providing an adequate level of protection or based on appropriate safeguards (e.g., EU Standard Contractual Clauses).'
        },
        {
          id: 'rights',
          title: '8. Data Subject Rights',
          icon: 'shield-check',
          subtitle: 'Under the GDPR and FADP, users have the right to:',
          items: [
            'Obtain confirmation of whether their data is being processed',
            'Request access, correction, or update of their data',
            'Request deletion of their data ("right to be forgotten")',
            'Restrict or object to data processing',
            'Withdraw consent at any time (without affecting prior processing)',
            'Receive their data in a structured, machine-readable format (data portability)'
          ],
          requestInfo: 'Requests can be sent to: info@splinter.ch',
          authorities: {
            switzerland: 'Users residing in Switzerland may contact the Federal Data Protection and Information Commissioner (FDPIC).',
            eea: 'Users in the EEA may contact their national data protection authority.'
          }
        },
        {
          id: 'changes',
          title: '9. Changes to This Privacy Policy',
          icon: 'refresh',
          content: 'Splinter.ch reserves the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with the updated date. You are encouraged to review this notice regularly.'
        },
        {
          id: 'contact',
          title: '10. Contact',
          icon: 'mail',
          content: 'For any questions or concerns regarding data protection, please contact us.',
          contact: '📩 info@splinter.ch'
        }
      ]
    },
    terms: {
      title: 'Terms',
      titleHighlight: 'of Service',
      subtitle: 'Splinter.ch',
      lastUpdated: 'Last updated: August 5, 2025',
      backToHome: 'Back to Home',
      downloadPdf: 'Download PDF',
      intro: 'These Terms of Service ("Terms") govern your access to and use of the website splinter.ch (the "Site") and any related services, including access to our software-as-a-service (SaaS) platform provided as a free trial ("Service"). By accessing or using the Site or Service, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Site or the Service.',
      sections: [
        {
          id: 'eligibility',
          title: '1. Eligibility',
          icon: 'user-check',
          content: 'The Service is intended for individuals aged 12 and over. By using the Service, you confirm that you meet this age requirement and that you have the legal capacity to enter into a binding agreement.'
        },
        {
          id: 'service-description',
          title: '2. Description of the Service',
          icon: 'computer',
          subtitle: 'Splinter.ch is an informational website presenting a SaaS product. Users may optionally register to:',
          items: [
            'Receive updates or communications about the product',
            'Access a limited free trial of the Service (30 days)'
          ],
          note: 'At this time, the Service is provided free of charge and no payment is required.'
        },
        {
          id: 'account-registration',
          title: '3. Account Registration',
          icon: 'user-plus',
          content: 'To access certain features (such as the free trial or newsletters), users must provide accurate and complete information during registration. You are responsible for maintaining the confidentiality of your credentials and for all activities under your account.',
          additional: 'We reserve the right to suspend or terminate your access to the Service if you provide false information or violate these Terms.'
        },
        {
          id: 'acceptable-use',
          title: '4. Acceptable Use',
          icon: 'shield-check',
          subtitle: 'You agree not to use the Site or Service in any manner that:',
          items: [
            'Violates any applicable law or regulation',
            'Infringes on the rights of others',
            'Harms or attempts to harm others',
            'Disrupts or interferes with the Site\'s normal operations, security, or network infrastructure'
          ],
          note: 'Unauthorized access, scraping, reverse engineering, or exploitation of the Service is strictly prohibited.'
        },
        {
          id: 'intellectual-property',
          title: '5. Intellectual Property',
          icon: 'copyright',
          content: 'All content on the Site, including text, graphics, logos, icons, software, and trademarks, is the property of Splinter or its contributors and is protected under applicable intellectual property laws. You may not use, reproduce, or distribute any content without prior written permission.'
        },
        {
          id: 'free-trial-disclaimer',
          title: '6. Free Trial Disclaimer',
          icon: 'clock',
          content: 'The Service may be provided on a trial basis for evaluation purposes only. We make no guarantees regarding its performance, accuracy, or fitness for any particular purpose.',
          additional: 'We reserve the right to modify, suspend, or discontinue the free trial at any time without notice.'
        },
        {
          id: 'limitation-liability',
          title: '7. Limitation of Liability',
          icon: 'alert-triangle',
          content: 'The Site and Service are provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the Service, including but not limited to merchantability, fitness for a particular purpose, or non-infringement.',
          additional: 'To the fullest extent permitted by law, we disclaim all liability for any damages, losses, or claims arising out of your use of the Site or Service.'
        },
        {
          id: 'modifications',
          title: '8. Modifications to Terms',
          icon: 'refresh',
          content: 'We may update or modify these Terms at any time. If we do, the revised version will be posted on this page with the date of the latest revision. Your continued use of the Site or Service after any changes constitutes acceptance of the new Terms.'
        },
        {
          id: 'governing-law',
          title: '9. Governing Law',
          icon: 'scale',
          content: 'As Splinter is not currently operated as a registered legal entity, these Terms are governed by general principles of good faith and fair dealing. In the future, once a legal entity is established, we may update this section with applicable jurisdiction and dispute resolution procedures.'
        },
        {
          id: 'contact',
          title: '10. Contact',
          icon: 'mail',
          content: 'If you have any questions about these Terms, please contact us at:',
          contact: '📧 info@splinter.ch'
        }
      ]
    }
  },
  it: {
    header: {
      home: 'Home',
      features: 'Soluzione',
      benefits: 'Benefici',
      contact: 'Contatti',
      startNow: 'Inizia Ora'
    },
    hero: {
      badge: 'Assistente Fisioterapico AI-Powered',
      title: 'La fisioterapia incontra',
      titleHighlight: 'l\'intelligenza artificiale',
      subtitle: 'Splinter è l\'assistente AI che supporta l\'onboarding dei pazienti e accelera le tue indagini mediche. Risparmia tempo, migliora le cure e concentrati su ciò che conta di più - i tuoi pazienti.',
      ctaPrimary: 'Inizia la Prova Gratuita di 30 Giorni',
      ctaSecondary: 'Guarda il Video',
      stats: {
        physiotherapists: 'Fisioterapisti',
        patients: 'Pazienti',
        satisfaction: 'Soddisfazione'
      },
      challenge: {
        title: 'Sfida Attuale',
        description: 'L\'onboarding dei pazienti è complesso e richiede tempo, dalla revisione della letteratura medica alla costruzione di un piano di recupero completo. Splinter semplifica il processo di valutazione e migliora la comunicazione con i tuoi pazienti.'
      }
    },
    features: {
      title: 'Splinter automatizza la valutazione dei pazienti',
      titleHighlight: 'e la proposta di trattamento usando l\'AI',
      subtitle: 'Concentrati sulla fornitura di cure eccezionali mentre la nostra AI supporta le tue decisioni cliniche. Risparmia tempo e aumenta l\'efficacia.',
      items: [
        {
          title: 'Documenti Digitali',
          description: 'Elimina la carta e digitalizza tutti i moduli di onboarding. I pazienti possono compilare tutto online prima della visita.'
        },
        {
          title: 'Riduzione Tempi',
          description: 'Riduci i tempi di attesa del 70%. I pazienti arrivano già preparati con tutta la documentazione completata.'
        },
        {
          title: 'Processo Guidato',
          description: 'Un processo step-by-step intuitivo che guida il paziente attraverso ogni fase dell\'onboarding.'
        },
        {
          title: 'Gestione Centralizzata',
          description: 'Visualizza e gestisce tutti i tuoi pazienti da un\'unica dashboard centralizzata e organizzata.'
        },
        {
          title: 'Sicurezza GDPR',
          description: 'Protezione completa dei dati sensibili con crittografia end-to-end e conformità GDPR garantita.'
        },
        {
          title: 'Analytics Avanzate',
          description: 'Monitora le performance del tuo studio con report dettagliati e analytics in tempo reale.'
        }
      ]
    },
    howItWorks: {
      title: 'Come',
      titleHighlight: 'Funziona',
      subtitle: 'Un processo semplice e lineare che trasforma l\'esperienza di onboarding sia per te che per i tuoi pazienti.',
      steps: [
        {
          title: 'Raccolta e Analisi Intelligente dei Dati',
          description: 'I moduli potenziati dall\'AI ti aiutano nell\'elaborazione di dati e risposte. Algoritmi intelligenti estraggono automaticamente informazioni chiave dalle informazioni dei pazienti, riducendo l\'inserimento manuale e migliorando la precisione.'
        },
        {
          title: 'Proposte di Trattamento',
          description: 'Ottieni raccomandazioni di trattamento basate su AI e protocolli evidence-based specifici per le condizioni del paziente, semplificando il processo decisionale clinico.'
        },
        {
          title: 'Generazione Automatica di Documenti',
          description: 'Genera automaticamente report medici professionali, piani di trattamento e materiali di comunicazione per i pazienti, risparmiando ore di lavoro amministrativo.'
        },
        {
          title: 'CRM End-to-end',
          description: 'Sistema completo di gestione delle relazioni con i pazienti che traccia i progressi, programma appuntamenti e mantiene cartelle cliniche complete in un\'unica piattaforma.'
        }
      ],
      processTitle: 'Il Processo Completo in',
      processHighlight: '4 Semplici Passi'
    },
    whySplinterWorks: {
      title: 'Perché',
      titleHighlight: 'Splinter Funziona',
      subtitle: 'Progettato con i fisioterapisti, Splinter sfrutta il machine learning per supportare le decisioni, non sostituirle. La nostra AI potenzia la tua esperienza mentre mantieni il controllo completo sulla cura del paziente.',
      benefits: {
        optimizedOnboarding: {
          title: 'Onboarding Ottimizzato',
          description: 'Moduli intelligenti guidati dall\'AI che assistono i fisioterapisti passo dopo passo suggerendo domande e test e riducendo i tempi di accoglienza del paziente.'
        },
        reliability: {
          title: 'Affidabilità Clinica',
          description: 'Ottieni raccomandazioni di trattamento basate su evidenze istantaneamente con progressione terapeutica, riferimenti bibliografici e valutazione dei rischi.'
        },
        accuracy: {
          title: 'Precisione Diagnostica',
          description: 'Il riconoscimento avanzato dei pattern aiuta a identificare condizioni e opzioni di trattamento con precisione, offrendo ai professionisti il supporto ideale.'
        },
        speed: {
          title: 'Flussi di Lavoro Più Veloci',
          description: 'Riduci il tempo amministrativo fino al 75% con automazione intelligente e documentazione smart.'
        },
        experience: {
          title: 'Migliore Esperienza Paziente',
          description: 'Fornire al paziente documentazione personalizzata e tracker di progressione significa una comprensione più profonda del processo di riabilitazione.'
        },
        compliance: {
          title: 'Documentazione Automatizzata',
          description: 'Soddisfa tutti i requisiti di documentazione medica con report e registrazioni generati automaticamente.'
        }
      },
      stats: {
        timeReduction: 'Riduzione del Tempo',
        accuracy: 'Tasso di Precisione AI',
        satisfaction: 'Soddisfazione Utenti'
      }
    },
    contact: {
      title: 'Pronto a',
      titleHighlight: 'Iniziare',
      subtitle: 'Unisciti alla nostra community che ha già trasformato le proprie operazioni quotidiane con Splinter.',
      ctaPrimary: 'Inizia la Prova Gratuita di 30 Giorni',
      ctaSecondary: 'Richiedi una Demo',
      benefits: '✓ Nessuna carta di credito richiesta • ✓ Setup in 5 minuti • ✓ Supporto 24/7',
      badge: 'I Nostri Contatti',
      form: {
        title: 'Hai delle Domande?',
        subtitle: 'Compila il form e ti risponderemo entro 24 ore.',
        firstName: 'Nome',
        lastName: 'Cognome',
        email: 'Email',
        reason: 'Motivo del Contatto',
        practice: 'Studio/Clinica',
        message: 'Messaggio',
        firstNamePlaceholder: 'Il tuo nome',
        lastNamePlaceholder: 'Il tuo cognome',
        emailPlaceholder: 'la-tua-email@esempio.com',
        reasonPlaceholder: 'Seleziona il motivo...',
        practicePlaceholder: 'Seleziona tipo di studio...',
        messagePlaceholder: 'Raccontaci le tue esigenze...',
        submit: 'Invia Messaggio',
        reasonOptions: [
          'Maggiori informazioni sul progetto',
          'Vorrei iniziare una prova gratuita di 30 giorni',
          'Non sono un fisioterapista, come posso usare Splinter?',
          'Altro'
        ],
        practiceOptions: [
          'Studio Privato',
          'Ospedale',
          'Centro di Riabilitazione',
          'Clinica Sportiva',
          'Servizio Domiciliare',
          'Casa di Cura',
          'Clinica Universitaria',
          'Compagnia Assicurativa',
          'Altro'
        ]
      },
      info: {
        title: 'Contattaci Direttamente',
        email: 'Email',
        phone: 'Telefono',
        offices: 'Uffici',
        locations: 'Milano, Roma, Torino',
        supportHours: 'Orari di Supporto',
        mondayFriday: 'Lunedì - Venerdì',
        saturday: 'Sabato',
        sunday: 'Domenica',
        closed: 'Chiuso',
        emergencySupport: 'Supporto di Emergenza',
        emergencyText: 'Disponibile 24/7 per clienti Premium'
      }
    },
    footer: {
      description: 'La piattaforma che semplifica l\'onboarding dei pazienti per fisioterapisti moderni.',
      product: 'Prodotto',
      support: 'Supporto',
      legal: 'Legale',
      newsletter: {
        title: 'Resta Aggiornato',
        subtitle: 'Ricevi le ultime novità e consigli per il tuo studio fisioterapico.',
        placeholder: 'La tua email',
        subscribe: 'Iscriviti'
      },
      links: {
        features: 'Caratteristiche',
        pricing: 'Prezzi',
        demo: 'Demo',
        api: 'API',
        integrations: 'Integrazioni',
        helpCenter: 'Centro Assistenza',
        documentation: 'Documentazione',
        tutorials: 'Tutorial',
        contacts: 'Contatti',
        status: 'Status',
        privacy: 'Privacy Policy',
        terms: 'Termini di Servizio',
        gdpr: 'GDPR',
        cookies: 'Cookie Policy',
        licenses: 'Licenze'
      },
      copyright: '© 2024 Splinter. Tutti i diritti riservati.',
      madeWith: 'Made with ❤️ in Italy'
    },
    privacy: {
      title: 'Privacy',
      titleHighlight: 'Policy',
      subtitle: 'Splinter.ch',
      lastUpdated: 'Ultimo aggiornamento: 5 agosto 2025',
      backToHome: 'Torna alla Home',
      downloadPdf: 'Scarica PDF',
      intro: 'Questa informativa sulla privacy descrive come i dati personali vengono elaborati attraverso il sito web www.splinter.ch (di seguito denominato "Sito") in conformità con la Legge Federale Svizzera sulla Protezione dei Dati (FADP) e il Regolamento Generale sulla Protezione dei Dati dell\'UE (GDPR), applicabile agli utenti residenti nell\'Area Economica Europea (SEE).',
      sections: [
        {
          id: 'data-controller',
          title: '1. Titolare del Trattamento',
          icon: 'building',
          content: {
            company: 'Splinter.ch',
            controller: 'Titolare del Trattamento: [Nome / Denominazione Società]',
            address: 'Indirizzo: [Via, CAP, Città, Svizzera]',
            email: 'Email di contatto: info@splinter.ch'
          }
        },
        {
          id: 'types-of-data',
          title: '2. Tipi di Dati Raccolti',
          icon: 'database',
          subtitle: 'Durante la visita o l\'interazione con il Sito, potremmo raccogliere i seguenti tipi di dati:',
          items: [
            'Dati identificativi (es. nome, cognome)',
            'Dati di contatto (es. indirizzo email, numero di telefono)',
            'Informazioni professionali (se richieste tramite moduli)',
            'Dati tecnici e di utilizzo (es. indirizzo IP, tipo di browser, dispositivo, sistema operativo)',
            'Qualsiasi altro dato fornito volontariamente tramite moduli, sondaggi o iscrizioni alla newsletter'
          ],
          note: 'Nota: Attualmente non utilizziamo strumenti di tracciamento esterni (es. Google Analytics).'
        },
        {
          id: 'purposes',
          title: '3. Finalità del Trattamento dei Dati',
          icon: 'target',
          subtitle: 'I dati personali possono essere trattati per le seguenti finalità:',
          items: [
            'Fornire informazioni sui nostri prodotti e servizi',
            'Rispondere a richieste inviate tramite moduli o email',
            'Effettuare statistiche interne e analisi delle performance (anonimizzate o pseudonimizzate)',
            'Prevenire frodi o abusi del Sito',
            'Rispettare obblighi legali o normativi'
          ]
        },
        {
          id: 'legal-basis',
          title: '4. Base Legale per il Trattamento',
          icon: 'scale',
          subtitle: 'Secondo il GDPR e la FADP, il trattamento può basarsi su:',
          items: [
            'Il consenso esplicito dell\'utente (es. per l\'iscrizione alla newsletter)',
            'L\'esecuzione di misure precontrattuali (es. risposta a moduli di contatto)',
            'L\'interesse legittimo del titolare del trattamento nel migliorare i servizi',
            'Obblighi legali a cui siamo soggetti'
          ]
        },
        {
          id: 'processing-methods',
          title: '5. Modalità di Trattamento dei Dati',
          icon: 'settings',
          content: 'I dati vengono trattati in modo lecito, equo e trasparente utilizzando strumenti sia elettronici che manuali, e sono implementate misure di sicurezza appropriate per prevenire accessi non autorizzati, perdite o divulgazioni.'
        },
        {
          id: 'retention',
          title: '6. Conservazione dei Dati',
          icon: 'clock',
          subtitle: 'I dati personali saranno conservati solo per il tempo necessario a soddisfare le finalità sopra descritte, e in ogni caso per non più di:',
          items: [
            '24 mesi per i dati raccolti per finalità commerciali o analitiche',
            '10 anni nei casi che coinvolgono obblighi legali o contabili (se applicabile)'
          ]
        },
        {
          id: 'sharing',
          title: '7. Condivisione e Trasferimenti di Dati',
          icon: 'share',
          subtitle: 'I dati possono essere condivisi con:',
          items: [
            'Collaboratori o consulenti autorizzati',
            'Fornitori di servizi tecnici o infrastrutturali (es. fornitori di hosting)',
            'Autorità giudiziarie o normative, come richiesto dalla legge'
          ],
          note: 'I dati non saranno trasferiti al di fuori della Svizzera o del SEE, a meno che non sia verso paesi che forniscono un livello adeguato di protezione o basandosi su garanzie appropriate (es. Clausole Contrattuali Standard UE).'
        },
        {
          id: 'rights',
          title: '8. Diritti degli Interessati',
          icon: 'shield-check',
          subtitle: 'Sotto il GDPR e la FADP, gli utenti hanno il diritto di:',
          items: [
            'Ottenere conferma se i loro dati vengono trattati',
            'Richiedere accesso, correzione o aggiornamento dei loro dati',
            'Richiedere la cancellazione dei loro dati ("diritto all\'oblio")',
            'Limitare o opporsi al trattamento dei dati',
            'Ritirare il consenso in qualsiasi momento (senza influire sul trattamento precedente)',
            'Ricevere i loro dati in formato strutturato e leggibile automaticamente (portabilità dei dati)'
          ],
          requestInfo: 'Le richieste possono essere inviate a: info@splinter.ch',
          authorities: {
            switzerland: 'Gli utenti residenti in Svizzera possono contattare il Commissario Federale per la Protezione dei Dati e l\'Informazione (FDPIC).',
            eea: 'Gli utenti nel SEE possono contattare la loro autorità nazionale per la protezione dei dati.'
          }
        },
        {
          id: 'changes',
          title: '9. Modifiche a Questa Privacy Policy',
          icon: 'refresh',
          content: 'Splinter.ch si riserva il diritto di aggiornare o modificare questa Privacy Policy in qualsiasi momento. Eventuali modifiche saranno pubblicate su questa pagina con la data aggiornata. Ti incoraggiamo a rivedere regolarmente questa informativa.'
        },
        {
          id: 'contact',
          title: '10. Contatti',
          icon: 'mail',
          content: 'Per qualsiasi domanda o preoccupazione riguardo la protezione dei dati, contattaci.',
          contact: '📩 info@splinter.ch'
        }
      ]
    },
    terms: {
      title: 'Termini',
      titleHighlight: 'di Servizio',
      subtitle: 'Splinter.ch',
      lastUpdated: 'Ultimo aggiornamento: 5 agosto 2025',
      backToHome: 'Torna alla Home',
      downloadPdf: 'Scarica PDF',
      intro: 'Questi Termini di Servizio ("Termini") regolano il tuo accesso e utilizzo del sito web splinter.ch (il "Sito") e qualsiasi servizio correlato, incluso l\'accesso alla nostra piattaforma software-as-a-service (SaaS) fornita come prova gratuita ("Servizio"). Accedendo o utilizzando il Sito o il Servizio, accetti di essere vincolato da questi Termini. Se non accetti questi Termini, ti preghiamo di non utilizzare il Sito o il Servizio.',
      sections: [
        {
          id: 'eligibility',
          title: '1. Idoneità',
          icon: 'user-check',
          content: 'Il Servizio è destinato a individui di età pari o superiore a 12 anni. Utilizzando il Servizio, confermi di soddisfare questo requisito di età e di avere la capacità legale per stipulare un accordo vincolante.'
        },
        {
          id: 'service-description',
          title: '2. Descrizione del Servizio',
          icon: 'computer',
          subtitle: 'Splinter.ch è un sito web informativo che presenta un prodotto SaaS. Gli utenti possono opzionalmente registrarsi per:',
          items: [
            'Ricevere aggiornamenti o comunicazioni sul prodotto',
            'Accedere a una prova gratuita limitata del Servizio (30 giorni)'
          ],
          note: 'Al momento, il Servizio è fornito gratuitamente e non è richiesto alcun pagamento.'
        },
        {
          id: 'account-registration',
          title: '3. Registrazione Account',
          icon: 'user-plus',
          content: 'Per accedere a determinate funzionalità (come la prova gratuita o le newsletter), gli utenti devono fornire informazioni accurate e complete durante la registrazione. Sei responsabile del mantenimento della riservatezza delle tue credenziali e di tutte le attività sotto il tuo account.',
          additional: 'Ci riserviamo il diritto di sospendere o terminare il tuo accesso al Servizio se fornisci informazioni false o violi questi Termini.'
        },
        {
          id: 'acceptable-use',
          title: '4. Uso Accettabile',
          icon: 'shield-check',
          subtitle: 'Accetti di non utilizzare il Sito o il Servizio in modo che:',
          items: [
            'Violi qualsiasi legge o regolamento applicabile',
            'Infranga i diritti di altri',
            'Danneggi o tenti di danneggiare altri',
            'Disturbi o interferisca con le normali operazioni, sicurezza o infrastruttura di rete del Sito'
          ],
          note: 'L\'accesso non autorizzato, scraping, reverse engineering o sfruttamento del Servizio è rigorosamente vietato.'
        },
        {
          id: 'intellectual-property',
          title: '5. Proprietà Intellettuale',
          icon: 'copyright',
          content: 'Tutto il contenuto del Sito, inclusi testo, grafica, loghi, icone, software e marchi, è proprietà di Splinter o dei suoi contributori ed è protetto dalle leggi applicabili sulla proprietà intellettuale. Non puoi utilizzare, riprodurre o distribuire alcun contenuto senza previa autorizzazione scritta.'
        },
        {
          id: 'free-trial-disclaimer',
          title: '6. Disclaimer Prova Gratuita',
          icon: 'clock',
          content: 'Il Servizio può essere fornito su base di prova solo a scopo di valutazione. Non forniamo garanzie riguardo alle sue prestazioni, accuratezza o idoneità per qualsiasi scopo particolare.',
          additional: 'Ci riserviamo il diritto di modificare, sospendere o interrompere la prova gratuita in qualsiasi momento senza preavviso.'
        },
        {
          id: 'limitation-liability',
          title: '7. Limitazione di Responsabilità',
          icon: 'alert-triangle',
          content: 'Il Sito e il Servizio sono forniti "così come sono" e "come disponibili". Non forniamo garanzie, espresse o implicite, riguardo al Servizio, incluse ma non limitate a commerciabilità, idoneità per uno scopo particolare o non violazione.',
          additional: 'Nella misura massima consentita dalla legge, decliniamo ogni responsabilità per danni, perdite o reclami derivanti dal tuo utilizzo del Sito o del Servizio.'
        },
        {
          id: 'modifications',
          title: '8. Modifiche ai Termini',
          icon: 'refresh',
          content: 'Possiamo aggiornare o modificare questi Termini in qualsiasi momento. Se lo facciamo, la versione rivista sarà pubblicata su questa pagina con la data dell\'ultima revisione. L\'uso continuato del Sito o del Servizio dopo eventuali modifiche costituisce accettazione dei nuovi Termini.'
        },
        {
          id: 'governing-law',
          title: '9. Legge Applicabile',
          icon: 'scale',
          content: 'Poiché Splinter non è attualmente gestito come entità legale registrata, questi Termini sono governati da principi generali di buona fede e correttezza. In futuro, una volta stabilita un\'entità legale, potremmo aggiornare questa sezione con giurisdizione applicabile e procedure di risoluzione delle controversie.'
        },
        {
          id: 'contact',
          title: '10. Contatti',
          icon: 'mail',
          content: 'Se hai domande su questi Termini, contattaci a:',
          contact: '📧 info@splinter.ch'
        }
      ]
    }
  }
};