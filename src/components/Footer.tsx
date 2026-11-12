import React from 'react';
import { Shield, Heart, ArrowUp, Languages, Lock } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onLanguageToggle: () => void;
  onOpenDonate: () => void;
  onOpenShare: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onLanguageToggle,
  onOpenDonate,
  onOpenShare,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-12 pb-20 sm:pb-16 border-t border-stone-800 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-stone-800">
          {/* Brand & Purpose */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-lg text-white">
                {language === 'en' ? 'Luis Villagrana Legal Defense Fund' : 'Fondo de Defensa Legal Luis Villagrana'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans max-w-sm">
              {language === 'en'
                ? 'An urgent community fundraising campaign organized by the Villagrana family to secure independent legal counsel and fight for justice before the December 4 sentencing hearing.'
                : 'Una campaña comunitaria y familiar urgente para asegurar representación legal independiente y luchar por justicia antes de la audiencia de sentencia del 4 de diciembre.'}
            </p>
            <div className="pt-2 text-xs text-amber-400 font-serif italic">
              {language === 'en' ? '“The Villagrana Family”' : '“La Familia Villagrana”'}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <div className="font-semibold uppercase tracking-wider text-stone-200 mb-3">
              {language === 'en' ? 'Navigation' : 'Navegación'}
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#story" className="text-stone-400 hover:text-amber-300 transition-colors">
                  {language === 'en' ? 'The Family Plea' : 'El Llamado Familiar'}
                </a>
              </li>
              <li>
                <a href="#story" className="text-stone-400 hover:text-amber-300 transition-colors">
                  {language === 'en' ? 'Letter & Story' : 'Carta e Historia'}
                </a>
              </li>
              <li>
                <a href="#timeline" className="text-stone-400 hover:text-amber-300 transition-colors">
                  {language === 'en' ? 'Key Dates & Timeline' : 'Fechas Clave y Plazos'}
                </a>
              </li>
              <li>
                <a href="#community" className="text-stone-400 hover:text-amber-300 transition-colors">
                  {language === 'en' ? 'Prayers & Messages' : 'Oraciones y Mensajes'}
                </a>
              </li>
              <li>
                <a href="#faq" className="text-stone-400 hover:text-amber-300 transition-colors">
                  {language === 'en' ? 'FAQ' : 'Preguntas Frecuentes'}
                </a>
              </li>
            </ul>
          </div>

          {/* Actions & Language Switch */}
          <div className="md:col-span-4 space-y-4">
            <div className="font-semibold uppercase tracking-wider text-stone-200 text-xs mb-3">
              {language === 'en' ? 'Help Us Reach $20,000' : 'Ayúdanos a Llegar a $20,000'}
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={onOpenDonate}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-stone-950" />
                <span>{language === 'en' ? 'Donate Now' : 'Donar Ahora'}</span>
              </button>

              <button
                type="button"
                onClick={onOpenShare}
                className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs transition-colors cursor-pointer"
              >
                {language === 'en' ? 'Share Campaign' : 'Compartir'}
              </button>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onLanguageToggle}
                className="text-xs text-stone-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Languages className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  {language === 'en'
                    ? 'Switch language to Español'
                    : 'Cambiar idioma a English'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            <span>© 2026 The Villagrana Family. </span>
            <span>
              {language === 'en'
                ? 'All rights reserved. Dedicated to justice and legal representation.'
                : 'Todos los derechos reservados. Dedicado a la justicia y representación legal.'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 text-stone-500 hover:text-amber-400 transition-colors cursor-pointer text-xs"
                title="Admin Portal - Manage Funds & Messages"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </button>
            )}

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-stone-300 transition-colors cursor-pointer"
            >
              <span>{language === 'en' ? 'Back to top' : 'Volver arriba'}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
