import React from 'react';
import { Shield, Heart, Lock } from 'lucide-react';
import { Language } from '../types';
import { CONTENT } from '../data/campaignData';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenDonate: () => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onOpenDonate,
  onOpenAdmin,
}) => {
  const content = CONTENT[language];

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md text-stone-100 border-b border-stone-800 transition-colors shadow-sm w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 h-16 sm:h-20 min-w-0">
          {/* Brand Zone */}
          <a
            href="#top"
            className="flex items-center gap-2 text-stone-100 hover:text-amber-300 transition-colors min-w-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif font-bold text-sm sm:text-lg tracking-wide text-white leading-tight truncate">
                {language === 'en' ? 'Villagrana Defense' : 'Defensa Villagrana'}
              </span>
              <span className="text-[10px] sm:text-[11px] text-stone-400 uppercase tracking-widest font-sans truncate">
                {language === 'en' ? 'Legal Fund' : 'Fondo Legal'}
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs lg:text-sm font-medium text-stone-300">
            <a
              href="#story"
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
            >
              {language === 'en' ? "Family Plea & Story" : "Historia y Llamado"}
            </a>
            <a
              href="#timeline"
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
            >
              {language === 'en' ? "Key Dates" : "Fechas Clave"}
            </a>
            <a
              href="#community"
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
            >
              {language === 'en' ? "Prayers & Support" : "Oraciones y Apoyo"}
            </a>
            <a
              href="#faq"
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
            >
              FAQ
            </a>
          </nav>

          {/* Action Zone: Language Selector & Donate CTA */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            {/* Bilingual Switcher */}
            <div className="flex items-center p-0.5 rounded-lg bg-stone-800 border border-stone-700 text-xs font-medium">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                  language === 'en'
                    ? 'bg-amber-600 text-white font-semibold shadow-sm'
                    : 'text-stone-300 hover:text-white'
                }`}
                title="Switch to English"
              >
                <span>EN</span>
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('es')}
                className={`px-2.5 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                  language === 'es'
                    ? 'bg-amber-600 text-white font-semibold shadow-sm'
                    : 'text-stone-300 hover:text-white'
                }`}
                title="Cambiar a Español"
              >
                <span>ES</span>
              </button>
            </div>

            {/* Admin Portal Entry */}
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="p-2 rounded-lg text-stone-400 hover:text-amber-400 hover:bg-stone-800 transition-colors cursor-pointer"
                title="Admin Portal (Jeremy Urpman)"
                aria-label="Admin Portal"
              >
                <Lock className="w-4 h-4" />
              </button>
            )}

            {/* Donate CTA */}
            <button
              type="button"
              onClick={onOpenDonate}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all rounded-lg shadow-sm flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-amber-900/30 text-amber-900" />
              <span>{content.donateNow}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
