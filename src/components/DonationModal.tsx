import React, { useState } from 'react';
import {
  X,
  Heart,
  CreditCard,
  CheckCircle,
  Copy,
  Check,
  ShieldCheck,
  Smartphone,
  Lock,
  Sparkles,
  FileCheck2,
  ExternalLink,
} from 'lucide-react';
import { Language, Donor } from '../types';
import { CONTENT, CAMPAIGN_META } from '../data/campaignData';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialAmount?: number;
  onDonationSuccess: (donor: Donor) => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  language,
  initialAmount = 100,
  onDonationSuccess,
}) => {
  const content = CONTENT[language];
  const [selectedAmount, setSelectedAmount] = useState<number>(initialAmount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [donorName, setDonorName] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [encouragementMessage, setEncouragementMessage] = useState<string>('');
  const [paymentTab, setPaymentTab] = useState<'card' | 'zelle' | 'venmo_cashapp'>('card');
  const [submittedPaymentTab, setSubmittedPaymentTab] = useState<'card' | 'zelle' | 'venmo_cashapp'>('card');

  // Card fields
  const [nameOnCard, setNameOnCard] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvv, setCardCvv] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [lastDonationAmount, setLastDonationAmount] = useState<number>(100);

  // Copy helpers
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const effectiveAmount = isCustom ? parseFloat(customAmount) || 0 : selectedAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (effectiveAmount <= 0) return;

    setIsSubmitting(true);
    setSubmittedPaymentTab(paymentTab);

    // If donating via Card, redirect/open directly to PayPal.me with the amount
    if (paymentTab === 'card') {
      const paypalUrl = effectiveAmount > 0
        ? `${CAMPAIGN_META.paypalUrl}/${effectiveAmount}`
        : CAMPAIGN_META.paypalUrl;
      try {
        const link = document.createElement('a');
        link.href = paypalUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch {
        // Fallback handled in success screen
      }
    }

    setTimeout(() => {
      const displayName = isAnonymous
        ? 'Anonymous Supporter'
        : donorName.trim() || nameOnCard.trim() || 'Generous Friend';

      const newDonor: Donor = {
        id: `donor-${Date.now()}`,
        name: displayName,
        amount: effectiveAmount,
        date: language === 'en' ? 'Just now' : 'Hace un momento',
        isAnonymous: isAnonymous,
        message: encouragementMessage.trim() || undefined,
      };

      setLastDonationAmount(effectiveAmount);
      setIsSubmitting(false);
      setIsSuccess(true);
      onDonationSuccess(newDonor);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 bg-black/80 backdrop-blur-xs overflow-hidden">
      <div className="relative w-full sm:max-w-xl max-h-[92vh] sm:max-h-[88vh] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden">
        {/* Sticky Header - NEVER SCROLLS OFF */}
        <div className="shrink-0 bg-stone-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 fill-amber-400" />
            </div>
            <div className="min-w-0">
              <h3 className="font-serif font-bold text-base sm:text-lg text-white truncate">
                {language === 'en' ? 'Support Luis Villagrana' : 'Apoyar a Luis Villagrana'}
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-400 truncate">
                {language === 'en' ? 'Legal Defense Fund · $20,000 Goal' : 'Fondo de Defensa Legal · Meta $20,000'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable */}
        {isSuccess ? (
          /* Success Screen */
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2 animate-bounce">
              <CheckCircle className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-serif font-bold text-stone-900">
              {language === 'en' ? 'Thank You For Your Support!' : '¡Muchas Gracias Por Tu Apoyo!'}
            </h3>

            <p className="text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
              {language === 'en'
                ? `Your contribution of $${lastDonationAmount.toLocaleString()} has been added to Luis Villagrana's legal defense fund. The Villagrana family is deeply grateful for your solidarity and prayers.`
                : `Tu contribución de $${lastDonationAmount.toLocaleString()} ha sido sumada al fondo de defensa legal de Luis Villagrana. La familia Villagrana agradece de corazón tu solidaridad y oraciones.`}
            </p>

            {encouragementMessage && (
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm italic text-stone-700 text-left max-w-md mx-auto">
                <span className="font-bold text-stone-900 not-italic block mb-1">
                  {language === 'en' ? 'Your message of encouragement:' : 'Tu mensaje de apoyo:'}
                </span>
                "{encouragementMessage}"
              </div>
            )}

            {/* If paid with card, ensure PayPal window opened & provide direct button */}
            {submittedPaymentTab === 'card' && (
              <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-left max-w-md mx-auto space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sky-950 font-bold text-xs sm:text-sm">
                    <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs">P</span>
                    <span>{language === 'en' ? 'PayPal Card Transfer' : 'Transferencia con Tarjeta en PayPal'}</span>
                  </div>
                  <span className="text-[11px] text-sky-700 font-semibold font-mono">paypal.me/{CAMPAIGN_META.paypalHandle}</span>
                </div>
                <p className="text-xs text-sky-900 leading-relaxed">
                  {language === 'en'
                    ? `Your pledge of $${lastDonationAmount.toLocaleString()} is recorded on our community wall and directed to PayPal. If your PayPal window did not open automatically, click below to complete your payment:`
                    : `Tu aporte de $${lastDonationAmount.toLocaleString()} fue registrado en nuestro muro y dirigido a PayPal. Si no se abrió la ventana de PayPal, pulsa el botón abajo para completar el pago:`}
                </p>
                <a
                  href={lastDonationAmount > 0 ? `${CAMPAIGN_META.paypalUrl}/${lastDonationAmount}` : CAMPAIGN_META.paypalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <span>{language === 'en' ? `Open PayPal to Pay $${lastDonationAmount.toLocaleString()}` : `Abrir PayPal para Pagar $${lastDonationAmount.toLocaleString()}`}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm text-stone-900 bg-amber-400 hover:bg-amber-300 transition-all cursor-pointer shadow-xs"
              >
                {language === 'en' ? 'Return to Campaign' : 'Volver a la Campaña'}
              </button>
            </div>
          </div>
        ) : (
          /* Donation Form with Scrollable Content & Sticky Footer */
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4">
              {/* Amount Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                  {content.selectAmount}
                </label>
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-2">
                  {[25, 50, 100, 250, 500].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amt);
                        setIsCustom(false);
                      }}
                      className={`py-2 px-1 sm:px-2 rounded-xl border text-xs sm:text-sm font-bold tabular-nums transition-all cursor-pointer ${
                        !isCustom && selectedAmount === amt
                          ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20'
                          : 'border-stone-200 hover:border-stone-400 text-stone-700'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-bold text-sm">$</span>
                  <input
                    type="number"
                    min="5"
                    step="1"
                    placeholder={language === 'en' ? 'Enter other amount' : 'Ingresa otra cantidad'}
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setIsCustom(true);
                    }}
                    onFocus={() => setIsCustom(true)}
                    className={`w-full pl-8 pr-3 py-2 text-sm rounded-xl border font-sans focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                      isCustom
                        ? 'border-amber-600 bg-amber-50/30'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  />
                </div>
              </div>

              {/* Payment Method Tabs */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                  {content.paymentMethod}
                </label>

                <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-100 rounded-xl text-xs font-semibold mb-3">
                  <button
                    type="button"
                    onClick={() => setPaymentTab('card')}
                    className={`py-2 px-1 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer truncate ${
                      paymentTab === 'card'
                        ? 'bg-white text-stone-900 shadow-xs ring-1 ring-stone-200'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{language === 'en' ? 'Card / PayPal' : 'Tarjeta / PayPal'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentTab('zelle')}
                    className={`py-2 px-1 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer truncate ${
                      paymentTab === 'zelle'
                        ? 'bg-white text-stone-900 shadow-xs ring-1 ring-stone-200'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>Zelle</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentTab('venmo_cashapp')}
                    className={`py-2 px-1 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer truncate ${
                      paymentTab === 'venmo_cashapp'
                        ? 'bg-white text-stone-900 shadow-xs ring-1 ring-stone-200'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">Venmo/Cash</span>
                  </button>
                </div>

                {/* Tab 1: Credit / Debit Card (Directly linked to PayPal.me) */}
                {paymentTab === 'card' && (
                  <div className="p-3.5 sm:p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-3">
                    {/* PayPal Processing Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-stone-200/80">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                        <span className="w-4 h-4 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px] font-bold">P</span>
                        <span>{language === 'en' ? 'Card Payment via PayPal' : 'Pago con Tarjeta por PayPal'}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-stone-200 text-stone-700 text-[10px] font-semibold">
                        Visa · MC · Amex · Discover
                      </span>
                    </div>

                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      {language === 'en'
                        ? 'Enter your card information below. When you submit, you will be seamlessly directed to PayPal (paypal.me/villagranafamily) to complete payment safely with zero risk.'
                        : 'Ingresa los datos de tu tarjeta. Al enviar, serás dirigido a PayPal (paypal.me/villagranafamily) para procesar el pago de forma 100% segura.'}
                    </p>

                    {/* Cardholder Name */}
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        {language === 'en' ? 'Name on Card' : 'Nombre en la Tarjeta'}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Maria Sanchez"
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    {/* Card Number */}
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        {content.cardNumber}
                      </label>
                      <input
                        type="text"
                        placeholder="4000 1234 5678 9010"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-mono text-stone-900"
                      />
                    </div>

                    {/* Expiration and CVV */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          {content.expiration}
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          {content.cvv}
                        </label>
                        <input
                          type="text"
                          placeholder="CVC"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-mono"
                        />
                      </div>
                    </div>

                    {/* Direct PayPal Link Option */}
                    <div className="p-2.5 rounded-lg bg-sky-50/80 border border-sky-200 flex items-center justify-between gap-2 text-xs">
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-sky-800 block">PayPal Official Destination</span>
                        <span className="font-mono text-sky-950 font-bold text-[11px] truncate block select-all">
                          paypal.me/{CAMPAIGN_META.paypalHandle}
                        </span>
                      </div>
                      <a
                        href={effectiveAmount > 0 ? `${CAMPAIGN_META.paypalUrl}/${effectiveAmount}` : CAMPAIGN_META.paypalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-md bg-sky-600 hover:bg-sky-500 text-white font-semibold text-[11px] flex items-center gap-1 shrink-0 transition-colors"
                      >
                        <span>{language === 'en' ? 'Open PayPal' : 'Abrir PayPal'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500 pt-0.5">
                      <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{language === 'en' ? 'Secure end-to-end checkout via PayPal.me/villagranafamily' : 'Pago protegido a través de PayPal.me/villagranafamily'}</span>
                    </div>
                  </div>
                )}

                {/* Tab 2: Zelle Instructions (UPDATED WITH 623-800-9174) */}
                {paymentTab === 'zelle' && (
                  <div className="p-3.5 sm:p-4 rounded-xl border border-purple-200 bg-purple-50/60 space-y-3 text-xs text-stone-800">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-purple-900 text-sm flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-purple-700" />
                        <span>{language === 'en' ? 'Direct Zelle Transfer' : 'Transferencia Directa por Zelle'}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-purple-200 text-purple-900 text-[10px] font-bold uppercase tracking-wider">
                        0% Fees
                      </span>
                    </div>

                    <p className="text-stone-600 leading-relaxed text-[11px] sm:text-xs">
                      {language === 'en'
                        ? '100% goes directly to Luis\'s defense. Use your banking app (Chase, Wells Fargo, BofA, etc.) to send to:'
                        : 'El 100% va directo a la defensa de Luis. Usa la app de tu banco para transferir a:'}
                    </p>

                    <div className="bg-white p-3 rounded-xl border border-purple-200 space-y-2.5 shadow-2xs">
                      {/* Phone Number */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-stone-500 text-[11px] font-semibold">
                          {language === 'en' ? 'Zelle Phone Number' : 'Teléfono para Zelle'}:
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-extrabold text-purple-950 text-sm sm:text-base select-all">
                            {CAMPAIGN_META.zellePhone}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(CAMPAIGN_META.zellePhone, 'zelle_phone')}
                            className="px-2 py-1 rounded-md bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            {copiedField === 'zelle_phone' ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span>{language === 'en' ? 'Copied' : 'Copiado'}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>{language === 'en' ? 'Copy' : 'Copiar'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Recipient Name */}
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-purple-100">
                        <span className="text-stone-500 text-[11px] font-semibold">
                          {language === 'en' ? 'Recipient Name' : 'Nombre Destinatario'}:
                        </span>
                        <span className="font-bold text-stone-900 text-xs">
                          {CAMPAIGN_META.zelleRecipient}
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] text-stone-500 italic leading-snug">
                      {language === 'en'
                        ? 'Tip: Add "Luis Villagrana Defense" in the memo. Submit below to add your prayer or pledge to the wall.'
                        : 'Nota: Añade "Defensa Luis" en el concepto. Envía el formulario para registrar tu oración y apoyo.'}
                    </div>
                  </div>
                )}

                {/* Tab 3: Venmo & Cash App (UPDATED WITH @Jeremy-Urpman and $JeremyUrpman) */}
                {paymentTab === 'venmo_cashapp' && (
                  <div className="p-3.5 sm:p-4 rounded-xl border border-blue-200 bg-blue-50/60 space-y-3 text-xs text-stone-800">
                    <div className="font-bold text-blue-900 text-sm flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>Venmo & Cash App</span>
                    </div>

                    <p className="text-stone-600 text-[11px] sm:text-xs">
                      {language === 'en'
                        ? 'Send directly through either app using the verified handles below:'
                        : 'Transfiere directamente por cualquiera de las aplicaciones usando los usuarios:'}
                    </p>

                    <div className="space-y-2">
                      {/* Venmo */}
                      <div className="bg-white p-3 rounded-xl border border-blue-200 flex items-center justify-between gap-2 shadow-2xs">
                        <div className="min-w-0">
                          <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Venmo</div>
                          <a
                            href={CAMPAIGN_META.venmoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono font-extrabold text-blue-900 text-sm sm:text-base truncate block hover:underline"
                          >
                            {CAMPAIGN_META.venmoHandle}
                          </a>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleCopy(CAMPAIGN_META.venmoHandle, 'venmo')}
                            className="px-2 py-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            {copiedField === 'venmo' ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{language === 'en' ? 'Copied' : 'Copiado'}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>{language === 'en' ? 'Copy' : 'Copiar'}</span>
                              </>
                            )}
                          </button>
                          <a
                            href={CAMPAIGN_META.venmoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                            title="Open Venmo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                      {/* Cash App */}
                      <div className="bg-white p-3 rounded-xl border border-emerald-200 flex items-center justify-between gap-2 shadow-2xs">
                        <div className="min-w-0">
                          <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Cash App</div>
                          <a
                            href={CAMPAIGN_META.cashAppUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono font-extrabold text-emerald-800 text-sm sm:text-base truncate block hover:underline"
                          >
                            {CAMPAIGN_META.cashAppHandle}
                          </a>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleCopy(CAMPAIGN_META.cashAppHandle, 'cashapp')}
                            className="px-2 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-semibold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            {copiedField === 'cashapp' ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{language === 'en' ? 'Copied' : 'Copiado'}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>{language === 'en' ? 'Copy' : 'Copiar'}</span>
                              </>
                            )}
                          </button>
                          <a
                            href={CAMPAIGN_META.cashAppUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                            title="Open Cash App"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Check / Bank Check option just in case */}
                    <div className="p-2.5 rounded-lg bg-stone-100 border border-stone-200 flex items-start gap-2 text-[11px] text-stone-600">
                      <FileCheck2 className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-stone-800 font-semibold">
                          {language === 'en' ? 'Prefer check or cash?' : '¿Prefieres cheque o efectivo?'}
                        </strong>{' '}
                        {language === 'en'
                          ? 'Checks can be written to Jeremy Urpman with memo "Luis Villagrana Defense".'
                          : 'Los cheques pueden expedirse a nombre de Jeremy Urpman con concepto "Defensa Luis Villagrana".'}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Name & Anonymous */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  {content.yourName}
                </label>
                <input
                  type="text"
                  placeholder={content.namePlaceholder}
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  disabled={isAnonymous}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 disabled:bg-stone-100 disabled:text-stone-400"
                />

                <label className="flex items-center gap-2 mt-1.5 cursor-pointer text-xs text-stone-600">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>{content.keepAnonymous}</span>
                </label>
              </div>

              {/* Words of Encouragement */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  {content.encouragementMessage}
                </label>
                <textarea
                  rows={2}
                  placeholder={content.messagePlaceholder}
                  value={encouragementMessage}
                  onChange={(e) => setEncouragementMessage(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* STICKY FOOTER - NEVER CUTS OFF ON MOBILE */}
            <div className="shrink-0 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 border-t border-stone-200 shadow-md">
              <button
                type="submit"
                disabled={isSubmitting || effectiveAmount <= 0}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base text-stone-900 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{language === 'en' ? 'Recording Contribution...' : 'Registrando...'}</span>
                ) : (
                  <>
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-900/30 text-amber-950 shrink-0" />
                    <span>
                      {paymentTab === 'card'
                        ? (language === 'en'
                            ? `Pay $${effectiveAmount.toLocaleString()} with Card via PayPal`
                            : `Pagar $${effectiveAmount.toLocaleString()} con Tarjeta en PayPal`)
                        : (language === 'en'
                            ? `Confirm Pledge $${effectiveAmount.toLocaleString()}`
                            : `Registrar Donación $${effectiveAmount.toLocaleString()}`)}
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
