import React from 'react';
import {
  FileText,
  ZoomIn,
  AlertCircle,
  Share2,
  Languages,
} from 'lucide-react';
import { Language } from '../types';
import { CONTENT, CAMPAIGN_IMAGES } from '../data/campaignData';

interface StoryAndLetterSectionProps {
  language: Language;
  onLanguageToggle: () => void;
  onViewImage: (imageSrc: string, caption: string) => void;
  onOpenDonate: () => void;
  onOpenShare: () => void;
}

export const StoryAndLetterSection: React.FC<StoryAndLetterSectionProps> = ({
  language,
  onLanguageToggle,
  onViewImage,
  onOpenDonate,
  onOpenShare,
}) => {
  const content = CONTENT[language];

  return (
    <section id="story" className="py-12 sm:py-20 bg-stone-50 border-b border-stone-200 w-full max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header & Language Synchronizer */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12 pb-6 border-b border-stone-200">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">
              <FileText className="w-4 h-4 shrink-0" />
              <span>{language === 'en' ? "The Villagrana Family's Statement" : 'Declaración de la Familia Villagrana'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight break-words">
              {content.title}
            </h2>
            <p className="text-base sm:text-lg font-serif italic text-stone-600 mt-1">
              {content.subtitle}
            </p>
          </div>

          {/* Language Switch Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onLanguageToggle}
              className="px-3.5 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-xs font-medium text-stone-800 flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer shrink-0"
              title={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
            >
              <Languages className="w-4 h-4 text-amber-600" />
              <span className="font-semibold">{language === 'en' ? 'Cambiar a Español' : 'Switch to English'}</span>
            </button>
          </div>
        </div>

        {/* Story Reading View + Embedded Flyer Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Letter Reading Column */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 border border-stone-200/90 shadow-sm text-stone-800">
              {/* Formal Letterhead Ornament */}
              <div className="text-center pb-6 mb-6 border-b border-stone-100">
                <div className="inline-block text-[11px] tracking-widest uppercase font-serif text-amber-800 font-semibold border-b border-amber-600/40 pb-1 mb-2">
                  {content.badge}
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  {content.title}
                </h3>
                <p className="text-sm font-serif italic text-amber-900/80 mt-1">
                  {content.subtitle}
                </p>
              </div>

              {/* Salutation */}
              <p className="text-lg font-serif font-semibold text-stone-900 mb-5">
                {content.salutation}
              </p>

              {/* Letter Paragraphs with refined editorial cadence */}
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-stone-700 font-serif">
                {/* Paragraph 1: Luis the family man */}
                <p className="first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:text-amber-700">
                  {content.storyP1}
                </p>

                {/* Paragraph 2: Reaching out */}
                <p className="font-semibold text-stone-900">
                  {content.storyP2}
                </p>

                {/* Paragraph 3: The highway confrontation */}
                <p>
                  {content.storyP3}
                </p>

                {/* Paragraph 4: Attorney encouraging feedback & unexpected trial outcome */}
                <p>
                  {content.storyP4}
                </p>

                {/* Highlight Callout Box: 20-Year Sentence Shock */}
                <div className="my-6 p-4 sm:p-5 rounded-xl bg-amber-50/70 border-l-4 border-amber-600 text-stone-900 not-italic font-sans">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-base sm:text-lg font-bold text-amber-950 mb-1">
                        {content.storyP5}
                      </strong>
                      <p className="text-xs sm:text-sm text-stone-700 leading-normal">
                        {language === 'en'
                          ? 'This devastating outcome threatens to separate a father from his wife and children for two decades without a complete examination of the facts.'
                          : 'Este devastador veredicto amenaza con separar a un padre de su esposa e hijos por dos décadas sin que se hayan examinado a fondo los hechos.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Paragraph 6: Seeking an independent attorney */}
                <p>
                  {content.storyP6}
                </p>

                {/* Paragraph 7: Financial plea */}
                <p>
                  {content.storyP7}
                </p>
              </div>

              {/* Prominent Goal Banner within the letter (as presented on flyer) */}
              <div className="my-8 p-5 sm:p-6 rounded-xl bg-stone-900 text-white text-center shadow-md border border-stone-800">
                <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
                  {language === 'en' ? 'Fundraising Appeal' : 'Llamado de Recaudación'}
                </div>
                <div className="text-xl sm:text-2xl font-serif font-bold text-white mb-4">
                  {content.goalHeading}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-lg mx-auto bg-stone-850 p-4 rounded-lg border border-stone-700/60">
                  <div>
                    <span className="block text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
                      {content.targetDateLabel}
                    </span>
                    <span className="text-sm font-bold text-amber-300">
                      {content.targetDateValue}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
                      {content.sentencingLabel}
                    </span>
                    <span className="text-sm font-bold text-stone-200">
                      {content.sentencingValue}
                    </span>
                  </div>
                </div>
              </div>

              {/* Appeal Closing & Gratitude */}
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-stone-700 font-serif mb-8">
                <p>{content.appealClosing}</p>
                <p className="italic text-stone-800">{content.gratitudeClosing}</p>
              </div>

              {/* Formal Family Sign-off */}
              <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-stone-500 font-sans font-medium">
                    {content.signoffTitle}
                  </div>
                  <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                    {content.familySignature}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenDonate}
                  className="px-5 py-2.5 rounded-xl font-bold text-sm text-stone-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-xs cursor-pointer"
                >
                  {content.donateNow}
                </button>
              </div>
            </div>

            {/* Side Column: Family Connection & Quick Overview */}
            <div className="lg:col-span-5 space-y-6">
              {/* Family Portrait Card */}
              <div className="bg-stone-900 rounded-2xl p-6 text-white border border-stone-800 shadow-lg">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                    {language === 'en' ? 'The Villagrana Family' : 'La Familia Villagrana'}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onViewImage(
                        CAMPAIGN_IMAGES.family,
                        language === 'en'
                          ? 'The Villagrana Family together.'
                          : 'La Familia Villagrana unida.'
                      )
                    }
                    className="text-xs text-stone-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'View Photo' : 'Ver Foto'}</span>
                  </button>
                </div>

                <div
                  className="relative aspect-4/3 rounded-xl overflow-hidden cursor-pointer group mb-4 border border-stone-800 shadow-md"
                  onClick={() =>
                    onViewImage(
                      CAMPAIGN_IMAGES.family,
                      language === 'en'
                        ? 'The Villagrana Family together.'
                        : 'La Familia Villagrana unida.'
                    )
                  }
                  title={language === 'en' ? 'Click to inspect full family photo' : 'Clic para ver foto familiar'}
                >
                  <img
                    src={CAMPAIGN_IMAGES.family}
                    alt="The Villagrana Family"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-2.5 right-2.5 bg-stone-950/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                    <ZoomIn className="w-3 h-3 text-amber-400" />
                    <span>{language === 'en' ? 'Enlarge' : 'Ampliar'}</span>
                  </div>
                </div>

                <blockquote className="text-sm text-stone-300 leading-relaxed italic border-l-2 border-amber-500/60 pl-3 mb-4">
                  {language === 'en'
                    ? '"Luis is a family man who loves bringing people together. Every donation brings us closer to securing the experienced defense he needs."'
                    : '"Luis siempre ha valorado estar rodeado de sus seres queridos. Cada donación nos acerca a asegurar la defensa experimentada que él necesita."'}
                </blockquote>

                <div className="space-y-2 pt-3 border-t border-stone-800 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">{language === 'en' ? 'Legal Defense Goal' : 'Meta de Defensa'}:</span>
                    <span className="font-mono font-bold text-amber-400">$20,000 USD</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">{language === 'en' ? 'Urgent Target Date' : 'Fecha Límite'}:</span>
                    <span className="font-semibold text-stone-200">Nov 13, 2026</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">{language === 'en' ? 'Sentencing Hearing' : 'Audiencia de Sentencia'}:</span>
                    <span className="font-semibold text-stone-200">Dec 4, 2026</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-800 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onOpenDonate}
                    className="flex-1 py-2.5 rounded-xl font-bold text-xs text-stone-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm cursor-pointer text-center"
                  >
                    {content.donateNow}
                  </button>
                  <button
                    type="button"
                    onClick={onOpenShare}
                    className="py-2.5 px-3 rounded-xl font-semibold text-xs text-stone-200 bg-stone-800 hover:bg-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>{language === 'en' ? 'Share' : 'Compartir'}</span>
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};
