import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  ShieldAlert,
  ShieldCheck,
  Plus,
  Minus,
  Trash2,
  DollarSign,
  MessageSquare,
  Users,
  LogOut,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
  Edit3,
} from 'lucide-react';
import { Donor, Language } from '../types';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  raisedAmount: number;
  goalAmount: number;
  donors: Donor[];
  onUpdateRaisedAmount: (newAmount: number) => void;
  onDeleteMessage: (donorId: string) => void;
  onAddManualDonation: (amount: number, name: string, message?: string) => void;
}

const ADMIN_EMAIL = 'jeremy.urpman@gocsps.com';
const ADMIN_PASS = 'Mariners17';

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  language,
  raisedAmount,
  goalAmount,
  donors,
  onUpdateRaisedAmount,
  onDeleteMessage,
  onAddManualDonation,
}) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('villagrana_admin_auth') === 'true';
  });
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Active sub-tab in admin panel
  const [adminTab, setAdminTab] = useState<'funds' | 'messages'>('funds');

  // Funds form states
  const [addAmount, setAddAmount] = useState<string>('');
  const [addName, setAddName] = useState<string>('');
  const [addNote, setAddNote] = useState<string>('');
  const [deductAmount, setDeductAmount] = useState<string>('');
  const [exactAmount, setExactAmount] = useState<string>('');

  // Confirmation state for deleting a message
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Success alert toast inside admin
  const [adminToast, setAdminToast] = useState<string | null>(null);

  useEffect(() => {
    if (adminToast) {
      const timer = setTimeout(() => setAdminToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [adminToast]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const cleanEmail = emailInput.trim().toLowerCase();
    if (cleanEmail === ADMIN_EMAIL && passwordInput === ADMIN_PASS) {
      setIsAuthenticated(true);
      sessionStorage.setItem('villagrana_admin_auth', 'true');
      setPasswordInput('');
    } else {
      setAuthError(
        cleanEmail !== ADMIN_EMAIL
          ? 'Unrecognized admin email address.'
          : 'Incorrect password. Please verify credentials.'
      );
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('villagrana_admin_auth');
    setEmailInput('');
    setPasswordInput('');
  };

  // Fund management handlers
  const handleAddFunds = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(addAmount);
    if (!val || val <= 0) return;

    if (addName.trim() || addNote.trim()) {
      onAddManualDonation(
        val,
        addName.trim() || 'Verified Supporter',
        addNote.trim() || undefined
      );
    } else {
      onUpdateRaisedAmount(raisedAmount + val);
    }

    setAdminToast(`Successfully added $${val.toLocaleString()} to the legal fund!`);
    setAddAmount('');
    setAddName('');
    setAddNote('');
  };

  const handleQuickAdd = (amt: number) => {
    onUpdateRaisedAmount(raisedAmount + amt);
    setAdminToast(`Added +$${amt.toLocaleString()} to total.`);
  };

  const handleDeductFunds = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(deductAmount);
    if (!val || val <= 0) return;

    const newTotal = Math.max(0, raisedAmount - val);
    onUpdateRaisedAmount(newTotal);
    setAdminToast(`Deducted -$${val.toLocaleString()} from the legal fund.`);
    setDeductAmount('');
  };

  const handleQuickDeduct = (amt: number) => {
    const newTotal = Math.max(0, raisedAmount - amt);
    onUpdateRaisedAmount(newTotal);
    setAdminToast(`Deducted -$${amt.toLocaleString()} from total.`);
  };

  const handleSetExact = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(exactAmount);
    if (isNaN(val) || val < 0) return;

    onUpdateRaisedAmount(val);
    setAdminToast(`Total goal raised set exactly to $${val.toLocaleString()}`);
    setExactAmount('');
  };

  const handleConfirmDeleteMessage = (donorId: string) => {
    onDeleteMessage(donorId);
    setDeletingId(null);
    setAdminToast('Message removed successfully from the community wall.');
  };

  const percentFunded = Math.min(100, Math.round((raisedAmount / goalAmount) * 100));

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 bg-black/85 backdrop-blur-sm overflow-hidden">
      <div className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[90vh] bg-stone-900 text-stone-100 rounded-t-3xl sm:rounded-2xl shadow-2xl border border-stone-800 flex flex-col overflow-hidden">
        {/* Modal Sticky Header */}
        <div className="shrink-0 bg-stone-950 p-4 sm:p-5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
              <Lock className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-serif font-bold text-base sm:text-lg text-white truncate flex items-center gap-2">
                <span>Campaign Admin Portal</span>
                {isAuthenticated && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-sans font-bold uppercase tracking-wider">
                    Authorized
                  </span>
                )}
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-400 truncate">
                {isAuthenticated
                  ? `Logged in as ${ADMIN_EMAIL}`
                  : 'Authorized campaign administrator access only'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer text-xs flex items-center gap-1"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Log out</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Admin Toast Notification */}
        {adminToast && (
          <div className="bg-emerald-950/90 border-b border-emerald-800/80 px-4 py-2.5 text-xs text-emerald-200 flex items-center gap-2 animate-fade-in shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">{adminToast}</span>
          </div>
        )}

        {/* Main Body */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col justify-center max-w-md mx-auto w-full">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-serif font-bold text-white mb-1">
                Admin Authentication
              </h4>
              <p className="text-xs text-stone-400">
                Please enter your credentials to manage campaign funds and moderate words of support.
              </p>
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Jeremy.urpman@gocsps.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-850 text-white placeholder-stone-500 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-850 text-white placeholder-stone-500 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-sm text-stone-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md cursor-pointer mt-2"
              >
                Sign In to Admin Portal
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col min-h-0">
            {/* Real-time Summary Card */}
            <div className="bg-stone-850 p-4 sm:p-5 border-b border-stone-800 shrink-0">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-stone-900 p-3 rounded-xl border border-stone-800">
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">Current Raised</span>
                  <span className="text-xl sm:text-2xl font-mono font-bold text-amber-400">
                    ${raisedAmount.toLocaleString()}
                  </span>
                </div>
                <div className="bg-stone-900 p-3 rounded-xl border border-stone-800">
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">Goal</span>
                  <span className="text-xl sm:text-2xl font-mono font-bold text-stone-200">
                    ${goalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="bg-stone-900 p-3 rounded-xl border border-stone-800">
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">Progress</span>
                  <span className="text-xl sm:text-2xl font-mono font-bold text-emerald-400">
                    {percentFunded}%
                  </span>
                </div>
                <div className="bg-stone-900 p-3 rounded-xl border border-stone-800">
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">Messages & Pledges</span>
                  <span className="text-xl sm:text-2xl font-mono font-bold text-sky-400">
                    {donors.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Admin Tabs */}
            <div className="flex border-b border-stone-800 bg-stone-900/60 shrink-0 px-4 pt-2">
              <button
                type="button"
                onClick={() => setAdminTab('funds')}
                className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                  adminTab === 'funds'
                    ? 'border-amber-400 text-amber-400 bg-stone-800/50 rounded-t-lg'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Adjust Goal Funds</span>
              </button>

              <button
                type="button"
                onClick={() => setAdminTab('messages')}
                className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                  adminTab === 'messages'
                    ? 'border-amber-400 text-amber-400 bg-stone-800/50 rounded-t-lg'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Manage Words of Support ({donors.filter(d => d.message).length})</span>
              </button>
            </div>

            {/* Tab Contents: Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {adminTab === 'funds' ? (
                /* Tab 1: Adjust Goal Funds */
                <div className="space-y-6">
                  {/* Section 1: Add Money to Goal */}
                  <div className="bg-stone-850 p-4 sm:p-5 rounded-2xl border border-emerald-900/40 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                          <Plus className="w-4 h-4" />
                        </div>
                        <h5 className="font-bold text-sm text-white">Add Money to Goal</h5>
                      </div>
                      <span className="text-[11px] text-emerald-400">Offline, Cash, Zelle or PayPal Gifts</span>
                    </div>

                    {/* Quick Add Presets */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-stone-400">Quick add:</span>
                      {[50, 100, 250, 500, 1000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => handleQuickAdd(amt)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 text-xs font-mono font-bold transition-colors cursor-pointer"
                        >
                          +${amt}
                        </button>
                      ))}
                    </div>

                    <form onSubmit={handleAddFunds} className="space-y-3 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-400 mb-1">
                            Amount to Add ($) *
                          </label>
                          <input
                            type="number"
                            min="1"
                            step="any"
                            required
                            placeholder="e.g. 500"
                            value={addAmount}
                            onChange={(e) => setAddAmount(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-stone-700 bg-stone-900 text-white font-mono text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-400 mb-1">
                            Donor Name (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. John Doe"
                            value={addName}
                            onChange={(e) => setAddName(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-stone-700 bg-stone-900 text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-400 mb-1">
                            Note / Message (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. In loving support"
                            value={addNote}
                            onChange={(e) => setAddNote(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-stone-700 bg-stone-900 text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Money to Campaign Total</span>
                      </button>
                    </form>
                  </div>

                  {/* Section 2: Deduct / Remove Money from Goal */}
                  <div className="bg-stone-850 p-4 sm:p-5 rounded-2xl border border-rose-900/40 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                          <Minus className="w-4 h-4" />
                        </div>
                        <h5 className="font-bold text-sm text-white">Remove Money from Goal</h5>
                      </div>
                      <span className="text-[11px] text-rose-400">Corrections or refunded pledges</span>
                    </div>

                    {/* Quick Deduct Presets */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-stone-400">Quick deduct:</span>
                      {[50, 100, 250, 500].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => handleQuickDeduct(amt)}
                          className="px-2.5 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 text-xs font-mono font-bold transition-colors cursor-pointer"
                        >
                          -${amt}
                        </button>
                      ))}
                    </div>

                    <form onSubmit={handleDeductFunds} className="flex flex-col sm:flex-row items-end gap-3 pt-1">
                      <div className="flex-1 w-full">
                        <label className="block text-[11px] font-semibold text-stone-400 mb-1">
                          Amount to Subtract ($) *
                        </label>
                        <input
                          type="number"
                          min="1"
                          step="any"
                          required
                          placeholder="e.g. 100"
                          value={deductAmount}
                          onChange={(e) => setDeductAmount(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-stone-700 bg-stone-900 text-white font-mono text-sm focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full sm:w-auto py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer h-10"
                      >
                        <Minus className="w-3.5 h-3.5" />
                        <span>Deduct Amount</span>
                      </button>
                    </form>
                  </div>

                  {/* Section 3: Directly Set Total */}
                  <div className="bg-stone-850 p-4 sm:p-5 rounded-2xl border border-stone-750 space-y-3">
                    <div className="flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-amber-400" />
                      <h5 className="font-bold text-sm text-white">Directly Set Total Raised Amount</h5>
                    </div>
                    <p className="text-xs text-stone-400">
                      Override the total raised to an exact figure:
                    </p>

                    <form onSubmit={handleSetExact} className="flex flex-col sm:flex-row items-end gap-3">
                      <div className="flex-1 w-full">
                        <label className="block text-[11px] font-semibold text-stone-400 mb-1">
                          Exact Total Raised ($)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="any"
                          required
                          placeholder={raisedAmount.toString()}
                          value={exactAmount}
                          onChange={(e) => setExactAmount(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-stone-700 bg-stone-900 text-white font-mono text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full sm:w-auto py-2 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer h-10"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Set Exact Total</span>
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                /* Tab 2: Manage Words of Support & Messages */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-sm text-white">
                        Community Prayers & Encouragement Messages
                      </h5>
                      <p className="text-xs text-stone-400">
                        Review and remove any inappropriate or unwanted messages from the words and support wall.
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400 bg-stone-800 px-2.5 py-1 rounded-lg">
                      {donors.length} total entries
                    </span>
                  </div>

                  {donors.length === 0 ? (
                    <div className="p-8 text-center bg-stone-850 rounded-2xl border border-stone-800">
                      <MessageSquare className="w-8 h-8 text-stone-600 mx-auto mb-2" />
                      <p className="text-sm text-stone-400 font-medium">
                        No community messages or pledges have been posted yet.
                      </p>
                      <p className="text-xs text-stone-500 mt-1">
                        Any messages left by donors on the site will appear here for moderation.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {donors.map((donor) => {
                        const isPendingDelete = deletingId === donor.id;

                        return (
                          <div
                            key={donor.id}
                            className={`p-4 rounded-xl border transition-all ${
                              isPendingDelete
                                ? 'bg-rose-950/40 border-rose-700 ring-1 ring-rose-600'
                                : 'bg-stone-850 border-stone-800 hover:border-stone-700'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                              <div className="space-y-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-sm text-stone-100">
                                    {donor.name}
                                  </span>
                                  {donor.amount > 0 && (
                                    <span className="px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 font-mono text-xs font-bold border border-amber-400/20">
                                      ${donor.amount.toLocaleString()}
                                    </span>
                                  )}
                                  <span className="text-[11px] text-stone-500">
                                    {donor.date}
                                  </span>
                                </div>

                                {donor.message ? (
                                  <p className="text-xs text-stone-300 font-serif italic bg-stone-900/60 p-2.5 rounded-lg border border-stone-800">
                                    "{donor.message}"
                                  </p>
                                ) : (
                                  <span className="text-[11px] text-stone-500 italic block">
                                    (No message attached)
                                  </span>
                                )}
                              </div>

                              {/* Delete Action */}
                              <div className="shrink-0 pt-1">
                                {isPendingDelete ? (
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => handleConfirmDeleteMessage(donor.id)}
                                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors cursor-pointer"
                                    >
                                      Confirm Delete
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setDeletingId(null)}
                                      className="px-2 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs transition-colors cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setDeletingId(donor.id)}
                                    className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-rose-900/40 text-stone-400 hover:text-rose-300 border border-stone-700 hover:border-rose-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                                    title="Remove this message"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Remove</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sticky Footer */}
            <div className="shrink-0 bg-stone-950 p-3.5 sm:p-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>All changes update the live site immediately.</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold transition-colors cursor-pointer"
              >
                Close Portal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
