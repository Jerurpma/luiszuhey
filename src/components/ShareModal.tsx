import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageCircle, MessageSquare, Download, Heart } from 'lucide-react';
import { Language } from '../types';
import { CAMPAIGN_IMAGES } from '../data/campaignData';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://help-luis-villagrana.com';

  const shareText =
    language === 'en'
      ? `Please help support Luis Villagrana and his family. Goal: $20,000 for legal fees to fight for justice before his December sentencing hearing. Every donation and share helps: ${currentUrl}`
      : `Por favor apoya a Luis Villagrana y a su familia. Meta: $20,000 para gastos legales y luchar por justicia antes de su sentencia en diciembre. Cada donación y compartir cuenta: ${currentUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(shareText);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank');
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleMessages = () => {
    // Direct SMS / iMessage URL scheme for mobile and desktop messages
    const smsUrl = `sms:?&body=${encodeURIComponent(shareText)}`;
    window.location.href = smsUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 bg-black/80 backdrop-blur-xs overflow-hidden">
      <div className="relative w-full sm:max-w-lg max-h-[92vh] sm:max-h-[88vh] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 bg-stone-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <Share2 className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif font-bold text-lg">
              {language === 'en' ? 'Share This Campaign' : 'Compartir Esta Campaña'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          <p className="text-sm text-stone-600 leading-relaxed">
            {language === 'en'
              ? 'If you are unable to donate at this time, sharing our message with friends, family, church groups, and coworkers makes an immense difference in reaching our $20,000 goal.'
              : 'Si no puedes donar en este momento, compartir nuestro mensaje con amigos, familiares, grupos de iglesia y compañeros de trabajo hace una inmensa diferencia para alcanzar la meta de $20,000.'}
          </p>

          {/* Social Share Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* WhatsApp */}
            <button
              type="button"
              onClick={handleWhatsApp}
              className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 flex flex-col items-center gap-2 transition-all cursor-pointer text-xs font-semibold"
            >
              <MessageCircle className="w-6 h-6 text-emerald-600" />
              <span>WhatsApp</span>
            </button>

            {/* Facebook */}
            <button
              type="button"
              onClick={handleFacebook}
              className="p-3 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-900 flex flex-col items-center gap-2 transition-all cursor-pointer text-xs font-semibold"
            >
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">f</span>
              <span>Facebook</span>
            </button>

            {/* X / Twitter */}
            <button
              type="button"
              onClick={handleTwitter}
              className="p-3 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-900 flex flex-col items-center gap-2 transition-all cursor-pointer text-xs font-semibold"
            >
              <span className="w-6 h-6 rounded-full bg-black text-white font-bold flex items-center justify-center text-xs">𝕏</span>
              <span>X (Twitter)</span>
            </button>

            {/* Messages (SMS / Text) */}
            <button
              type="button"
              onClick={handleMessages}
              className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 flex flex-col items-center gap-2 transition-all cursor-pointer text-xs font-semibold"
            >
              <MessageSquare className="w-6 h-6 text-emerald-600" />
              <span>{language === 'en' ? 'Messages' : 'Mensajes'}</span>
            </button>
          </div>

          {/* Copy Link Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
              {language === 'en' ? 'Direct Campaign Link' : 'Enlace Directo de la Campaña'}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 rounded-xl border border-stone-300 font-mono text-stone-700 select-all"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 text-xs font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-800" />
                    <span>{language === 'en' ? 'Copied!' : '¡Copiado!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{language === 'en' ? 'Copy' : 'Copiar'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Pre-written Message copy box */}
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-900">
                {language === 'en' ? 'Copy pre-written message for group chats:' : 'Mensaje listo para enviar por chat:'}
              </span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="text-amber-800 hover:text-amber-900 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copiedMessage ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMessage ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>
            <p className="italic text-stone-600 bg-white p-2.5 rounded-lg border border-stone-200">
              "{shareText}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
