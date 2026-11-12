import React, { useState } from 'react';
import {
  Users,
  Clock,
  AlertTriangle,
  Heart,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Target,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  Smartphone,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { Language } from '../types';
import { CONTENT, CAMPAIGN_META } from '../data/campaignData';

interface DonationProgressCardProps {
  language: Language;
  raisedAmount: number;
  donorCount: number;
  onSelectAmount: (amount: number) => void;
  onOpenDonate: () => void;
  onOpenShare: () => void;
}

export const DonationProgressCard: React.FC<DonationProgressCardProps> = ({
  language,
  raisedAmount,
  donorCount,
  onSelectAmount,
  onOpenDonate,
  onOpenShare,
}) => {
  const content = CONTENT[language];
  const goal = CAMPAIGN_META.goalAmount;
  const remaining = Math.max(0, goal - raisedAmount);
  const percentage = Math.min(100, Math.round((raisedAmount / goal) * 100));

  // Interactive impact preview
  const [hoveredAmount, setHoveredAmount] = useState<number | null>(null);
  const [copiedQuick, setCopiedQuick] = useState<string | null>(null);

  const activeAmount = hoveredAmount !== null ? hoveredAmount : 100;
  const projectedAmount = Math.min(goal, raisedAmount + activeAmount);
  const projectedPercentage = Math.min(100, Math.round((projectedAmount / goal) * 100));

  const presetAmounts = [25, 50, 100, 250, 500];

  const milestones = [
    {
      amount: 5000,
      percent: 25,
      labelEn: 'Court Transcripts & Records',
      labelEs: 'Actas y Expedientes del Juicio',
    },
    {
      amount: 10000,
      percent: 50,
      labelEn: 'Case Review & Motion Drafts',
      labelEs: 'Revisión y Mociones Legales',
    },
    {
      amount: 15000,
      percent: 75,
      labelEn: 'Senior Defense Retainer',
      labelEs: 'Contratación de Abogado Experto',
    },
    {
      amount: 20000,
      percent: 100,
      labelEn: 'Full Sentencing Representation',
      labelEs: 'Defensa Completa en Sentencia',
    },
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuick(key);
    setTimeout(() => setCopiedQuick(null), 2000);
  };

  return (
    <section className="relative -mt-6 z-20 w-full max-w-5xl mx-auto px-3 sm:px-6">
      <div className="bg-white rounded-2xl shadow-xl border border-stone-200/90 p-4 sm:p-8 text-stone-900 w-full max-w-full overflow-hidden">
        {/* Dynamic Goal Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-stone-100">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-amber-800 mb-1">
              <Target className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{language === 'en' ? '$20,000 Legal Defense Goal' : 'Meta de $20,000 para Defensa Legal'}</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-950 font-sans tabular-nums">
                ${raisedAmount.toLocaleString()}
              </span>
              <span className="text-sm sm:text-lg text-stone-500 font-medium">
                {language === 'en' ? `raised of $${goal.toLocaleString()}` : `recaudados de $${goal.toLocaleString()}`}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs sm:text-sm tabular-nums ml-1">
                {percentage}% {language === 'en' ? 'funded' : 'alcanzado'}
              </span>
            </div>
          </div>

          {/* Quick Stat Pill Widgets */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
            {/* Donors */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200">
              <Users className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold text-stone-900 tabular-nums">{donorCount}</span>{' '}
                <span className="text-stone-600">{content.donationsCount}</span>
              </div>
            </div>

            {/* Remaining */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50/80 border border-amber-200">
              <TrendingUp className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <span className="text-xs text-amber-800 uppercase font-semibold">
                  {language === 'en' ? 'Remaining: ' : 'Faltan: '}
                </span>
                <span className="font-extrabold text-amber-950 tabular-nums">
                  ${remaining.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* DYNAMIC PROGRESS VISUALIZATION & GOAL METER */}
        <div className="mb-8 bg-stone-50/80 rounded-2xl p-4 sm:p-6 border border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                {language === 'en' ? 'Live Campaign Progress' : 'Progreso en Vivo de la Campaña'}
              </span>
              {hoveredAmount !== null && (
                <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md animate-pulse">
                  {language === 'en' ? `+ $${hoveredAmount} Impact Preview` : `+ $${hoveredAmount} Vista de Impacto`}
                </span>
              )}
            </div>

            <div className="text-xs font-semibold text-stone-600 flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                <span>{language === 'en' ? 'Raised' : 'Recaudado'}: ${raisedAmount.toLocaleString()}</span>
              </span>
              <span className="flex items-center gap-1.5 text-stone-500">
                <span className="w-2.5 h-2.5 rounded-full bg-stone-300 inline-block" />
                <span>{language === 'en' ? 'Needed' : 'Faltante'}: ${remaining.toLocaleString()}</span>
              </span>
            </div>
          </div>

          {/* Layered Progress Bar with Glowing Needle and Projected Impact */}
          <div className="relative w-full">
            <div className="w-full h-5 sm:h-6 bg-stone-200/90 rounded-full overflow-hidden p-0.5 border border-stone-300 relative shadow-inner">
              {/* Projected Advance (Hover State) */}
              {hoveredAmount !== null && (
                <div
                  className="absolute top-0.5 bottom-0.5 left-0.5 bg-amber-300 rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(1, projectedPercentage)}%` }}
                />
              )}

              {/* Current Raised Amount Fill */}
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 rounded-full transition-all duration-700 ease-out relative shadow-sm"
                style={{ width: percentage > 0 ? `${Math.max(2, percentage)}%` : '0%' }}
              >
                {/* Subtle shimmer animation */}
                {percentage > 0 && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
                )}
              </div>
            </div>

            {/* Needle Pin Marker for Current Position */}
            <div
              className="absolute -top-2 transition-all duration-700 ease-out flex flex-col items-center pointer-events-none -translate-x-1/2"
              style={{ left: `${percentage === 0 ? 2 : Math.min(98, Math.max(2, percentage))}%` }}
            >
              <div className="px-2 py-0.5 rounded-md bg-stone-900 text-amber-300 text-[10px] font-bold shadow-md whitespace-nowrap">
                ${raisedAmount.toLocaleString()}
              </div>
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-stone-900" />
            </div>
          </div>

          {/* Visual Milestone Track below bar */}
          <div className="mt-6 pt-4 border-t border-stone-200/80">
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-3">
              {language === 'en' ? 'Legal Defense Milestones' : 'Etapas del Fondo de Defensa'}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {milestones.map((m, idx) => {
                const reached = raisedAmount >= m.amount;
                const isNext = !reached && (idx === 0 || raisedAmount >= milestones[idx - 1].amount);

                return (
                  <div
                    key={m.amount}
                    className={`p-2.5 rounded-xl border transition-all text-left ${
                      reached
                        ? 'bg-amber-50/70 border-amber-300'
                        : isNext
                        ? 'bg-white border-stone-300 shadow-2xs ring-1 ring-amber-400/30'
                        : 'bg-stone-100/50 border-stone-200 opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono font-bold text-xs text-stone-900">
                        ${m.amount.toLocaleString()}
                      </span>
                      {reached ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      ) : isNext ? (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                          {language === 'en' ? 'Active' : 'Actual'}
                        </span>
                      ) : (
                        <span className="text-[10px] text-stone-400 font-semibold">{m.percent}%</span>
                      )}
                    </div>
                    <p className="text-[11px] text-stone-600 leading-tight">
                      {language === 'en' ? m.labelEn : m.labelEs}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Urgent Timeline Alert */}
        <div className="mb-6 p-3.5 sm:p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-stone-800 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed min-w-0">
            <strong className="font-semibold text-amber-950">
              {language === 'en' ? 'Urgent Deadline (Nov 13, 2026): ' : 'Plazo Urgente (13 de Noviembre): '}
            </strong>
            {language === 'en'
              ? 'Our target of November 13 is critical to retain an independent attorney in time to review case transcripts and formulate legal options before the December 4 sentencing hearing.'
              : 'Nuestra meta del 13 de noviembre es crucial para contratar a un abogado independiente a tiempo para revisar las actas del caso y formular opciones legales antes de la audiencia del 4 de diciembre.'}
          </div>
        </div>

        {/* Quick Direct Payment Bar (Zelle 623-800-9174, Venmo @Jeremy-Urpman, CashApp $JeremyUrpman) */}
        <div className="mb-6 p-3 sm:p-4 rounded-xl bg-stone-900 text-white border border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-stone-200">
                {language === 'en' ? 'Direct Fee-Free Transfer Options' : 'Opciones de Transferencia Directa'}
              </span>
            </div>
            <span className="text-[11px] text-amber-300 font-medium">
              {language === 'en' ? '0% platform deduction · 100% to legal defense' : 'Sin comisiones · 100% a la defensa'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {/* Zelle */}
            <div className="bg-stone-850 p-2.5 rounded-lg border border-stone-700 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="block text-[10px] text-purple-400 uppercase font-bold">Zelle</span>
                <span className="font-mono font-bold text-xs sm:text-sm text-white select-all">
                  {CAMPAIGN_META.zellePhone}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(CAMPAIGN_META.zellePhone, 'card_zelle')}
                className="px-2 py-1 rounded bg-stone-700 hover:bg-stone-600 text-stone-200 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shrink-0"
              >
                {copiedQuick === 'card_zelle' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedQuick === 'card_zelle' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Venmo */}
            <div className="bg-stone-850 p-2.5 rounded-lg border border-stone-700 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="block text-[10px] text-blue-400 uppercase font-bold">Venmo</span>
                <a
                  href={CAMPAIGN_META.venmoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono font-bold text-xs sm:text-sm text-white hover:text-blue-300 transition-colors truncate block"
                >
                  {CAMPAIGN_META.venmoHandle}
                </a>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopy(CAMPAIGN_META.venmoHandle, 'card_venmo')}
                  className="px-2 py-1 rounded bg-stone-700 hover:bg-stone-600 text-stone-200 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  title="Copy Venmo handle"
                >
                  {copiedQuick === 'card_venmo' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedQuick === 'card_venmo' ? 'Copied' : 'Copy'}</span>
                </button>
                <a
                  href={CAMPAIGN_META.venmoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 rounded bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 transition-colors"
                  title="Open Venmo"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* CashApp */}
            <div className="bg-stone-850 p-2.5 rounded-lg border border-stone-700 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="block text-[10px] text-emerald-400 uppercase font-bold">Cash App</span>
                <a
                  href={CAMPAIGN_META.cashAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono font-bold text-xs sm:text-sm text-white hover:text-emerald-300 transition-colors truncate block"
                >
                  {CAMPAIGN_META.cashAppHandle}
                </a>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopy(CAMPAIGN_META.cashAppHandle, 'card_cash')}
                  className="px-2 py-1 rounded bg-stone-700 hover:bg-stone-600 text-stone-200 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  title="Copy Cash App handle"
                >
                  {copiedQuick === 'card_cash' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedQuick === 'card_cash' ? 'Copied' : 'Copy'}</span>
                </button>
                <a
                  href={CAMPAIGN_META.cashAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 rounded bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 transition-colors"
                  title="Open Cash App"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* PayPal */}
            <div className="bg-stone-850 p-2.5 rounded-lg border border-stone-700 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="block text-[10px] text-sky-400 uppercase font-bold">PayPal</span>
                <a
                  href={CAMPAIGN_META.paypalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono font-bold text-xs sm:text-sm text-white hover:text-sky-300 transition-colors truncate block"
                >
                  paypal.me/{CAMPAIGN_META.paypalHandle}
                </a>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopy(CAMPAIGN_META.paypalUrl, 'card_paypal')}
                  className="px-2 py-1 rounded bg-stone-700 hover:bg-stone-600 text-stone-200 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  title="Copy PayPal link"
                >
                  {copiedQuick === 'card_paypal' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedQuick === 'card_paypal' ? 'Copied' : 'Copy'}</span>
                </button>
                <a
                  href={CAMPAIGN_META.paypalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 rounded bg-sky-600/30 hover:bg-sky-600/50 text-sky-300 transition-colors"
                  title="Open PayPal.me"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Donation Amounts & Action Row */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              {language === 'en' ? 'Select Amount & Preview Impact' : 'Selecciona Monto y Ver Impacto'}
            </span>
            <span className="text-xs text-amber-800 font-medium">
              {language === 'en' ? 'Every gift matters' : 'Cada aporte cuenta'}
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onMouseEnter={() => setHoveredAmount(amt)}
                onMouseLeave={() => setHoveredAmount(null)}
                onClick={() => onSelectAmount(amt)}
                className={`py-2.5 px-2 rounded-xl border font-bold text-base tabular-nums transition-all cursor-pointer text-center ${
                  hoveredAmount === amt
                    ? 'border-amber-600 bg-amber-100/70 text-amber-950 scale-105 shadow-sm'
                    : 'border-stone-200 hover:border-amber-500 hover:bg-amber-50 text-stone-800'
                }`}
              >
                ${amt}
              </button>
            ))}
            <button
              type="button"
              onClick={onOpenDonate}
              className="py-2.5 px-2 rounded-xl border border-stone-200 hover:border-amber-500 hover:bg-amber-50 font-semibold text-stone-600 text-xs sm:text-sm transition-all cursor-pointer text-center"
            >
              {language === 'en' ? 'Custom' : 'Otro'}
            </button>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={onOpenDonate}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-xl font-bold text-base text-stone-900 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-amber-900/30 text-amber-950 shrink-0" />
              <span>{content.donateNow}</span>
            </button>

            <button
              type="button"
              onClick={onOpenShare}
              className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-semibold text-sm text-stone-700 bg-stone-100 hover:bg-stone-200 active:scale-[0.99] transition-colors border border-stone-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{content.shareCampaign}</span>
              <ArrowRight className="w-4 h-4 text-stone-500 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
