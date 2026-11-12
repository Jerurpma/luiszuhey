import React from 'react';
import { Heart, Share2, ZoomIn, ShieldCheck, Calendar, Users, Scale } from 'lucide-react';
import { Language } from '../types';
import { CONTENT, CAMPAIGN_IMAGES } from '../data/campaignData';

interface HeroSectionProps {
  language: Language;
  onOpenDonate: () => void;
  onOpenShare: () => void;
  onViewImage: (imageSrc: string, caption: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onOpenDonate,
  onOpenShare,
  onViewImage,
}) => {
  const content = CONTENT[language];

  const familyCaption =
    language === 'en'
      ? 'Luis Villagrana surrounded by his wife and children. A devoted family man facing a 20-year sentence following an unexpected court outcome.'
      : 'Luis Villagrana rodeado de su esposa e hijos. Un hombre de familia que enfrenta una posible condena de 20 años tras un resultado inesperado.';

  return (
    <section className="relative w-full max-w-full overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 bg-gradient-to-b from-stone-900 via-stone-900 to-stone-850 text-white border-b border-stone-800">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-xl h-80 bg-amber-600/30 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Verification and Trust Kicker */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-stone-300 mb-4 sm:mb-6">
          <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            {content.badge}
          </span>
          <span className="text-stone-600">·</span>
          <span>{language === 'en' ? 'Organized by The Villagrana Family' : 'Organizado por la Familia Villagrana'}</span>
          <span className="text-stone-600">·</span>
          <span className="text-amber-300 font-medium">
            {language === 'en' ? 'Urgent Deadline: Nov 13, 2026' : 'Plazo Urgente: 13 de Noviembre'}
          </span>
        </div>

        {/* Campaign Main Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white mb-3 sm:mb-4 text-balance">
            {content.title}
          </h1>
          <p className="text-lg sm:text-2xl font-serif italic text-amber-300/90 text-balance">
            {content.subtitle}
          </p>
        </div>

        {/* Hero Grid: Prominent Family Photo & Campaign Framing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Family Portrait Card */}
          <div className="lg:col-span-7">
            <div className="group relative rounded-2xl overflow-hidden bg-stone-800 border border-amber-900/40 shadow-2xl transition-all">
              {/* Picture Banner with Zoom Affordance */}
              <div
                className="relative aspect-[4/3] sm:aspect-[16/11] cursor-pointer overflow-hidden bg-stone-900"
                onClick={() => onViewImage(CAMPAIGN_IMAGES.family, familyCaption)}
                title={content.viewFamilyPhoto}
              >
                <img
                  src={CAMPAIGN_IMAGES.family}
                  alt={familyCaption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />

                {/* Subtle scrim at bottom for photo caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Click to Expand Overlay Badge */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 px-3 py-1.5 rounded-full bg-stone-900/80 backdrop-blur-md border border-stone-700/80 text-stone-200 text-xs font-medium flex items-center gap-1.5 shadow-md group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Click to Enlarge' : 'Clic para Ampliar'}</span>
                </div>

                {/* Caption on the Image */}
                <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 text-left">
                  <p className="text-xs sm:text-sm text-stone-200 leading-snug font-sans">
                    {familyCaption}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Caption Under Image */}
            <p className="mt-2.5 text-xs text-stone-400 text-center italic">
              {language === 'en'
                ? 'The Villagrana Family together — asking for your prayers, support, and help sharing our plea.'
                : 'La Familia Villagrana unida — pidiendo sus oraciones, apoyo y ayuda para compartir nuestro llamado.'}
            </p>
          </div>

          {/* Core Urgent Campaign Callout Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-stone-850 border border-stone-700/80 shadow-xl text-left">
            <div>
              {/* Goal Heading */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                <Scale className="w-4 h-4" />
                <span>{language === 'en' ? 'Urgent Legal Defense Appeal' : 'Llamado Urgente de Defensa Legal'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
                {language === 'en' ? '$20,000 For Legal Fees' : '$20,000 Para Gastos Legales'}
              </h2>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed mb-6">
                {language === 'en'
                  ? 'Luis is facing a potential 20-year sentence after an unexpected trial outcome. We urgently need an experienced, independent attorney to review his case and file critical motions before sentencing.'
                  : 'Luis enfrenta una posible condena de 20 años tras un juicio con resultado inesperado. Necesitamos urgentemente un abogado independiente y con experiencia que revise su caso antes de la sentencia.'}
              </p>

              {/* Crucial Dates Quick Glance */}
              <div className="space-y-3 mb-6 bg-stone-900/90 rounded-xl p-4 border border-stone-800">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-950/80 border border-red-800/80 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                      {content.targetDateLabel}
                    </div>
                    <div className="text-sm font-bold text-amber-300">
                      {content.targetDateValue}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 shrink-0 mt-0.5">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                      {content.sentencingLabel}
                    </div>
                    <div className="text-sm font-bold text-stone-200">
                      {content.sentencingValue}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={onOpenDonate}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-base text-stone-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-5 h-5 fill-amber-950" />
                <span>{content.donateNow}</span>
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={onOpenShare}
                  className="py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm text-stone-200 bg-stone-800 hover:bg-stone-700 active:scale-[0.99] transition-colors border border-stone-700 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-amber-400" />
                  <span>{content.shareCampaign}</span>
                </button>

                <a
                  href="#story"
                  className="py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 active:scale-[0.99] transition-colors border border-stone-800 flex items-center justify-center gap-1.5 text-center"
                >
                  <span>{language === 'en' ? 'Read Story' : 'Leer Historia'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
