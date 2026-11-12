import React from 'react';
import { Calendar, Clock, AlertCircle, Scale, ShieldAlert, CheckCircle } from 'lucide-react';
import { Language } from '../types';

interface KeyDatesTimelineProps {
  language: Language;
  onOpenDonate: () => void;
}

export const KeyDatesTimeline: React.FC<KeyDatesTimelineProps> = ({
  language,
  onOpenDonate,
}) => {
  return (
    <section id="timeline" className="py-12 sm:py-20 bg-stone-100/70 border-b border-stone-200 w-full max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
            <Clock className="w-4 h-4 text-amber-700" />
            <span>{language === 'en' ? 'Critical Legal Timeline' : 'Cronología Legal Crítica'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            {language === 'en' ? 'Why Time Is Of The Essence' : 'Por Qué El Tiempo Es Crucial'}
          </h2>
          <p className="text-base sm:text-lg text-stone-600 mt-2 font-serif">
            {language === 'en'
              ? 'Our target of November 13 gives an independent attorney the minimum necessary time to review the court record before the sentencing hearing.'
              : 'Nuestra meta del 13 de noviembre brinda al nuevo abogado el tiempo indispensable para revisar el expediente antes de la audiencia de sentencia.'}
          </p>
        </div>

        {/* 3 Step Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mb-12">
          {/* Card 1: Urgent Target */}
          <div className="relative bg-white rounded-2xl p-6 sm:p-7 border-2 border-amber-500 shadow-md flex flex-col justify-between">
            <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-amber-600 text-white text-[11px] font-bold uppercase tracking-wider">
              {language === 'en' ? 'Phase 1 · Immediate Priority' : 'Fase 1 · Prioridad Inmediata'}
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>{language === 'en' ? 'Urgent Deadline' : 'Plazo Urgente'}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-1">
                {language === 'en' ? 'November 13, 2026' : '13 de Noviembre, 2026'}
              </h3>
              <div className="text-sm font-semibold text-amber-800 mb-4">
                {language === 'en' ? '$20,000 Legal Fee Target' : 'Meta de $20,000 para Honorarios'}
              </div>

              <p className="text-sm text-stone-600 leading-relaxed">
                {language === 'en'
                  ? 'Retainer needed to officially engage an experienced, independent attorney. This allows counsel to immediately request all trial transcripts and evidence from the road confrontation.'
                  : 'Se requiere el anticipo para contratar oficialmente a un abogado independiente y experimentado. Esto le permite solicitar de inmediato las actas del juicio y las pruebas de la confrontación.'}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500 italic">
              {language === 'en'
                ? '*Donations continue to be welcomed after Nov 13.'
                : '*Las donaciones seguirán siendo bienvenidas después del 13 de nov.'}
            </div>
          </div>

          {/* Card 2: Legal Review & Strategy Window */}
          <div className="relative bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-stone-700 text-white text-[11px] font-bold uppercase tracking-wider">
              {language === 'en' ? 'Phase 2 · Case Review' : 'Fase 2 · Revisión del Caso'}
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-2 text-stone-500 font-bold text-xs uppercase tracking-wider mb-2">
                <Scale className="w-4 h-4" />
                <span>{language === 'en' ? 'Motion Preparation' : 'Preparación Legal'}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-1">
                {language === 'en' ? 'Nov 14 – Dec 3, 2026' : '14 Nov – 3 Dic, 2026'}
              </h3>
              <div className="text-sm font-semibold text-stone-700 mb-4">
                {language === 'en' ? 'Examination of Circumstances' : 'Examen Profundo de Circunstancias'}
              </div>

              <p className="text-sm text-stone-600 leading-relaxed">
                {language === 'en'
                  ? 'The independent attorney reviews trial discrepancies, examines how the confrontation unfolded, and files post-trial motions or mitigation documents before the judge.'
                  : 'El abogado independiente examinará las discrepancias del juicio, cómo se desató la confrontación y presentará mociones posteriores al juicio y atenuantes ante el juez.'}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500">
              {language === 'en' ? 'Crucial window before sentencing' : 'Ventana crucial antes de la sentencia'}
            </div>
          </div>

          {/* Card 3: Sentencing Hearing */}
          <div className="relative bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-stone-850 text-white text-[11px] font-bold uppercase tracking-wider">
              {language === 'en' ? 'Phase 3 · Court Appearance' : 'Fase 3 · Comparecencia'}
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
                <Calendar className="w-4 h-4" />
                <span>{language === 'en' ? 'Sentencing Hearing' : 'Audiencia de Sentencia'}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-1">
                {language === 'en' ? 'December 4, 2026' : '4 de Diciembre, 2026'}
              </h3>
              <div className="text-sm font-semibold text-stone-700 mb-4">
                {language === 'en' ? 'Facing Up To 20 Years' : 'Enfrenta Hasta 20 Años'}
              </div>

              <p className="text-sm text-stone-600 leading-relaxed">
                {language === 'en'
                  ? 'Luis appears before the court. Having strong independent counsel present to advocate for justice, challenge prior deficiencies, and protect his constitutional rights is imperative.'
                  : 'Luis comparece ante la corte. Contar con un abogado independiente firme que defienda la justicia, señale deficiencias previas y proteja sus derechos es indispensable.'}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500">
              {language === 'en' ? 'Protecting Luis and his family' : 'Protegiendo a Luis y su familia'}
            </div>
          </div>
        </div>

        {/* Bottom Reassurance Banner */}
        <div className="bg-white rounded-xl p-6 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                {language === 'en' ? '100% Dedicated Legal Defense Fund' : 'Fondo 100% Destinado a la Defensa Legal'}
              </h4>
              <p className="text-xs text-stone-600">
                {language === 'en'
                  ? 'All funds will be directly applied toward retainer and necessary legal expenses for Luis Villagrana.'
                  : 'Todos los fondos se destinarán íntegramente al anticipo y gastos legales necesarios para Luis Villagrana.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenDonate}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-stone-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer shrink-0"
          >
            {language === 'en' ? 'Support This Fight' : 'Apoyar Esta Causa'}
          </button>
        </div>
      </div>
    </section>
  );
};
