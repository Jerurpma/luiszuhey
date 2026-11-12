import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface TransparencyFAQProps {
  language: Language;
}

export const TransparencyFAQ: React.FC<TransparencyFAQProps> = ({ language }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      qEn: 'Who is organizing this campaign and where do the donations go?',
      qEs: '¿Quién organiza esta campaña y a dónde van los fondos donados?',
      aEn: 'This legal defense campaign is organized directly by The Villagrana Family. 100% of all contributions are held exclusively to pay for retainer fees, legal transcripts, court records, and defense representation for Luis Villagrana with an experienced, independent attorney.',
      aEs: 'Esta campaña de defensa legal está organizada directamente por La Familia Villagrana. El 100% de los fondos se destina exclusivamente a honorarios legales, copias certificadas de expedientes, transcripciones del juicio y la contratación de un abogado independiente.',
    },
    {
      qEn: 'What happened during the incident that led to this situation?',
      qEs: '¿Qué sucedió durante el incidente que originó esta situación?',
      aEn: 'What started as a normal trip home to Arizona turned into a frightening confrontation with another driver. Luis and his family found themselves in a terrifying situation where they feared for their physical safety. While the family received encouraging reports throughout the court process, the trial concluded with an unexpected guilty verdict carrying a possible 20-year sentence.',
      aEs: 'Lo que comenzó como un viaje normal de regreso a casa, en Arizona, se convirtió en una confrontación preocupante con otro conductor. Luis y su familia se vieron en una situación en la que temieron por su seguridad. Pese a comentarios alentadores del abogado anterior, el juicio terminó con un veredicto de culpabilidad con una posible sentencia de 20 años.',
    },
    {
      qEn: 'Why is the November 13, 2026 date marked as an urgent fundraising target?',
      qEs: '¿Por qué la fecha del 13 de noviembre de 2026 es una meta urgente?',
      aEn: 'With the sentencing hearing scheduled for December 4, 2026, an independent attorney requires adequate preparation time to review thousands of pages of court records, evaluate unexamined circumstances, and draft timely legal motions. The November 13 target ensures counsel has the necessary lead time.',
      aEs: 'Dado que la audiencia de sentencia está programada para el 4 de diciembre de 2026, un nuevo abogado necesita tiempo suficiente para revisar el expediente, evaluar circunstancias no profundizadas y redactar mociones legales oportunas. La fecha del 13 de noviembre garantiza ese margen de maniobra indispensable.',
    },
    {
      qEn: 'Will donations continue to be accepted after November 13?',
      qEs: '¿Se seguirán recibiendo donaciones después del 13 de noviembre?',
      aEn: 'Yes! Donations will continue to be welcomed and needed after November 13. The $20,000 goal covers the comprehensive legal defense, and every dollar received before or after November 13 directly supports Luis’s fight for justice.',
      aEs: '¡Sí! Las donaciones seguirán siendo bienvenidas y necesarias después del 13 de noviembre. La meta de $20,000 cubre la defensa legal integral, y cada aporte antes o después del 13 de noviembre apoya directamente a Luis en su lucha.',
    },
    {
      qEn: 'How else can I help if I cannot afford to donate right now?',
      qEs: '¿De qué otra forma puedo ayudar si no puedo donar en este momento?',
      aEn: 'Sharing our campaign link on WhatsApp, Facebook, social media, and with your local church or community groups makes an enormous difference. You can also leave a message of prayer and encouragement on our community wall — knowing people care brings immense comfort to Luis and our family.',
      aEs: 'Compartir el enlace de la campaña por WhatsApp, Facebook, redes sociales y en grupos comunitarios o parroquiales es de enorme ayuda. También puedes dejar una oración o mensaje de aliento en nuestro muro comunitario; saber que no estamos solos conforta mucho a Luis y a toda la familia.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-12 sm:py-20 bg-white border-b border-stone-200 w-full max-w-full overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
            <HelpCircle className="w-4 h-4 text-amber-700" />
            <span>{language === 'en' ? 'Transparency & Details' : 'Transparencia y Preguntas'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            {language === 'en' ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-serif mt-1">
            {language === 'en'
              ? 'Clear answers regarding the defense fund, timeline, and how your contribution helps.'
              : 'Respuestas claras sobre el fondo de defensa, los plazos y el destino de su ayuda.'}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-stone-200 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left bg-stone-50 hover:bg-stone-100 flex items-center justify-between gap-4 transition-colors cursor-pointer"
                >
                  <span className="font-serif font-semibold text-stone-900 text-base sm:text-lg">
                    {language === 'en' ? faq.qEn : faq.qEs}
                  </span>
                  <span className="text-stone-500 shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 bg-white text-stone-700 text-sm sm:text-base leading-relaxed border-t border-stone-200">
                    {language === 'en' ? faq.aEn : faq.aEs}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
