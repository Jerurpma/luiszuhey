import React, { useState } from 'react';
import { Heart, MessageSquare, Send, User, ShieldCheck, Sparkles, Filter } from 'lucide-react';
import { Donor, Language } from '../types';
import { CONTENT } from '../data/campaignData';

interface DonorWallProps {
  language: Language;
  donors: Donor[];
  onAddMessageOnly: (name: string, message: string) => void;
  onOpenDonate: () => void;
}

export const DonorWall: React.FC<DonorWallProps> = ({
  language,
  donors,
  onAddMessageOnly,
  onOpenDonate,
}) => {
  const content = CONTENT[language];
  const [filter, setFilter] = useState<'all' | 'with_messages' | 'top'>('all');
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [msgInput, setMsgInput] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const handlePostMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgInput.trim()) return;

    onAddMessageOnly(nameInput.trim() || (language === 'en' ? 'Community Friend' : 'Amigo de la Comunidad'), msgInput.trim());
    setMsgInput('');
    setNameInput('');
    setSubmittedFeedback(true);
    setShowMessageForm(false);
    setTimeout(() => setSubmittedFeedback(false), 4000);
  };

  const filteredDonors = donors.filter((d) => {
    if (filter === 'with_messages') return !!d.message;
    if (filter === 'top') return d.amount >= 200;
    return true;
  });

  return (
    <section id="community" className="py-12 sm:py-20 bg-stone-50 border-b border-stone-200 w-full max-w-full overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
              <Heart className="w-4 h-4 fill-amber-700/20 text-amber-700" />
              <span>{language === 'en' ? 'Community Solidarity' : 'Solidaridad Comunitaria'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              {content.wordsOfSupport}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-serif mt-1">
              {language === 'en'
                ? 'Heartfelt messages, prayers, and contributions from those standing with Luis.'
                : 'Mensajes de corazón, oraciones y aportes de quienes acompañan a Luis en esta lucha.'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowMessageForm(!showMessageForm)}
              className="px-3.5 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-xs font-semibold text-stone-700 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
              <span>{showMessageForm ? (language === 'en' ? 'Close Form' : 'Cerrar') : (language === 'en' ? 'Leave a Prayer' : 'Dejar una Oración')}</span>
            </button>

            <button
              type="button"
              onClick={onOpenDonate}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-stone-900" />
              <span>{content.donateNow}</span>
            </button>
          </div>
        </div>

        {/* Success alert when message is submitted */}
        {submittedFeedback && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>
              {language === 'en'
                ? 'Your prayer & encouraging message has been shared with the Villagrana family! Thank you.'
                : '¡Tu oración y mensaje de aliento ha sido compartido con la familia Villagrana! Muchas gracias.'}
            </span>
          </div>
        )}

        {/* Optional Form to Leave a Message/Prayer Without Donating */}
        {showMessageForm && (
          <form
            onSubmit={handlePostMessage}
            className="mb-8 p-5 sm:p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-stone-900">
                {language === 'en' ? 'Send a Message of Prayer or Support' : 'Enviar un Mensaje de Oración o Aliento'}
              </h3>
              <span className="text-xs text-stone-500">
                {language === 'en' ? 'Free to post' : 'Publicación libre'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-stone-600 mb-1">
                  {content.yourName}
                </label>
                <input
                  type="text"
                  placeholder={content.namePlaceholder}
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-stone-600 mb-1">
                {language === 'en' ? 'Your Message / Prayer' : 'Tu Mensaje / Oración'}
              </label>
              <textarea
                rows={3}
                required
                placeholder={content.messagePlaceholder}
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowMessageForm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                {language === 'en' ? 'Cancel' : 'Cancelar'}
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Post to Community Wall' : 'Publicar en el Muro'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Filter Bar */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl max-w-fit mb-6 text-xs font-medium text-stone-700">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === 'all' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'hover:text-stone-900'
            }`}
          >
            {language === 'en' ? `All (${donors.length})` : `Todos (${donors.length})`}
          </button>
          <button
            type="button"
            onClick={() => setFilter('with_messages')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === 'with_messages' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'hover:text-stone-900'
            }`}
          >
            {language === 'en' ? 'With Messages' : 'Con Mensajes'}
          </button>
          <button
            type="button"
            onClick={() => setFilter('top')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === 'top' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'hover:text-stone-900'
            }`}
          >
            {language === 'en' ? 'Top Contributions ($200+)' : 'Mayores Aportes ($200+)'}
          </button>
        </div>

        {/* Messages / Donors List or Empty State */}
        {filteredDonors.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-stone-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              {language === 'en'
                ? 'No contributions or messages yet'
                : 'Aún no hay aportes ni mensajes'}
            </h3>
            <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed font-sans">
              {language === 'en'
                ? 'Be the first to donate or leave a message of encouragement and prayer for Luis and the Villagrana family. Every contribution will appear right here.'
                : 'Sé el primero en donar o dejar un mensaje de aliento y oración para Luis y la familia Villagrana. Cada aporte aparecerá aquí mismo.'}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onOpenDonate}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 font-bold text-xs text-stone-900 shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 fill-stone-900" />
                <span>{content.donateNow}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowMessageForm(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 font-semibold text-xs text-stone-700 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
                <span>{language === 'en' ? 'Leave a Message or Prayer' : 'Dejar Mensaje u Oración'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDonors.map((donor) => (
              <div
                key={donor.id}
                className="bg-white rounded-xl p-5 border border-stone-200/90 shadow-2xs hover:border-amber-400 transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-600 shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-stone-900 leading-tight truncate">
                          {donor.name}
                        </div>
                        <div className="text-[11px] text-stone-500">
                          {donor.date}
                        </div>
                      </div>
                    </div>

                    {donor.amount > 0 && (
                      <div className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-bold text-xs tabular-nums shrink-0">
                        ${donor.amount.toLocaleString()}
                      </div>
                    )}
                  </div>

                  {donor.message && (
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif italic mt-2.5 pl-2 border-l-2 border-amber-300">
                      "{donor.message}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Family Appreciation Note */}
        <div className="mt-10 p-6 rounded-2xl bg-stone-900 text-white text-center border border-stone-800">
          <Heart className="w-6 h-6 fill-amber-400 text-amber-400 mx-auto mb-2" />
          <p className="text-base sm:text-lg font-serif italic max-w-2xl mx-auto text-stone-200">
            "{content.thankYouMessage}"
          </p>
          <div className="mt-3 text-xs tracking-widest uppercase font-semibold text-amber-400">
            — {content.familySignature}
          </div>
        </div>
      </div>
    </section>
  );
};
