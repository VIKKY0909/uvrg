import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Leaf, Flame, Sparkles, Send, Home, Zap, IndianRupee, ChevronLeft, MapPin, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QuoteInput, QuoteResult } from '../types';
import SavingsProjectorChart from './SavingsProjectorChart';

interface QuoteCalculatorProps {
  initialPanelCount: number | null;
}

const INDIAN_STATES = [
  { name: 'Maharashtra', stateSubsidyPerKw: 0, maxStateSubsidy: 0 },
  { name: 'Gujarat', stateSubsidyPerKw: 5000, maxStateSubsidy: 20000 },
  { name: 'Uttar Pradesh', stateSubsidyPerKw: 15000, maxStateSubsidy: 30000 },
  { name: 'Delhi', stateSubsidyPerKw: 3000, maxStateSubsidy: 15000 },
  { name: 'Karnataka', stateSubsidyPerKw: 0, maxStateSubsidy: 0 },
  { name: 'Rajasthan', stateSubsidyPerKw: 0, maxStateSubsidy: 0 },
  { name: 'Tamil Nadu', stateSubsidyPerKw: 0, maxStateSubsidy: 0 },
  { name: 'Telangana', stateSubsidyPerKw: 0, maxStateSubsidy: 0 },
  { name: 'West Bengal', stateSubsidyPerKw: 0, maxStateSubsidy: 0 },
  { name: 'Other State', stateSubsidyPerKw: 0, maxStateSubsidy: 0 },
];

const STEPS = [
  { id: 1, label: 'Your Profile', short: 'Profile' },
  { id: 2, label: 'Your Property', short: 'Property' },
] as const;

const SUBSIDY_TIERS = [
  { kw: '1 kW', amount: '₹30,000', minKw: 1, maxKw: 1.9 },
  { kw: '2 kW', amount: '₹60,000', minKw: 2, maxKw: 2.9 },
  { kw: '3 kW+', amount: '₹78,000', minKw: 3, maxKw: 99 },
];

function getActiveSubsidyTier(kw: number) {
  if (kw >= 3) return SUBSIDY_TIERS[2];
  if (kw >= 2) return SUBSIDY_TIERS[1];
  return SUBSIDY_TIERS[0];
}

export default function QuoteCalculator({ initialPanelCount }: QuoteCalculatorProps) {
  const [step, setStep] = useState(1);

  const [inputs, setInputs] = useState<QuoteInput>({
    roofArea: 350,
    monthlyBill: 4500,
    state: 'Maharashtra',
    customerType: 'Residential',
    connectionType: '1-Phase',
  });

  const [result, setResult] = useState<QuoteResult | null>(null);

  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    agreed: true,
    submitted: false,
  });

  useEffect(() => {
    if (initialPanelCount) {
      const estimatedKw = initialPanelCount * 0.45;
      const estimatedRoofArea = Math.round(estimatedKw * 100);
      const estimatedBill = Math.round(estimatedKw * 120 * 8 * 1.15);

      setInputs(prev => ({
        ...prev,
        roofArea: estimatedRoofArea,
        monthlyBill: estimatedBill,
      }));
      setStep(2);
    }
  }, [initialPanelCount]);

  const calculateQuote = () => {
    const { roofArea, monthlyBill, state, customerType } = inputs;

    const unitRate = 8.5;
    const monthlyUnits = monthlyBill / unitRate;
    const requiredKwByBill = monthlyUnits / 120;
    const maxKwByRoof = roofArea / 100;

    let recommendedKw = Math.min(requiredKwByBill, maxKwByRoof);

    if (customerType === 'Residential') {
      recommendedKw = Math.max(1.0, Math.min(20.0, recommendedKw));
    } else {
      recommendedKw = Math.max(5.0, Math.min(100.0, recommendedKw));
    }

    recommendedKw = Math.round(recommendedKw * 2) / 2;

    const panelsCount = Math.ceil(recommendedKw / 0.54);
    const ratePerKw = 60000;
    const totalCost = recommendedKw * ratePerKw;

    let centralSubsidy = 0;
    if (customerType === 'Residential') {
      if (recommendedKw >= 3.0) centralSubsidy = 78000;
      else if (recommendedKw >= 2.0) centralSubsidy = 60000;
      else centralSubsidy = 30000;
    } else if (customerType === 'Housing Society') {
      centralSubsidy = Math.min(recommendedKw * 18000, 900000);
    }

    const selectedStateConfig = INDIAN_STATES.find(s => s.name === state);
    let stateSubsidy = 0;
    if (selectedStateConfig && customerType === 'Residential') {
      stateSubsidy = Math.min(
        recommendedKw * selectedStateConfig.stateSubsidyPerKw,
        selectedStateConfig.maxStateSubsidy
      );
    }

    const netCost = totalCost - centralSubsidy - stateSubsidy;
    const monthlyGenUnits = recommendedKw * 120;
    const monthlySavings = monthlyGenUnits * unitRate;
    const annualSavings = monthlySavings * 12;
    const paybackYears = Number((netCost / annualSavings).toFixed(1));

    let lifetimeSavings = 0;
    let currentYearSavings = annualSavings;
    for (let year = 1; year <= 25; year++) {
      lifetimeSavings += currentYearSavings;
      currentYearSavings *= 1.04;
    }

    const annualUnits = recommendedKw * 120 * 12;
    const co2SavedTons = Number(((annualUnits * 0.82) / 1000).toFixed(1));
    const treesEquivalent = Math.round(co2SavedTons * 45);

    setResult({
      recommendedCapacityKw: recommendedKw,
      panelsCount,
      totalCost,
      centralSubsidy,
      stateSubsidy,
      netCost,
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      paybackYears: paybackYears < 2 ? 2.5 : paybackYears,
      lifetimeSavings25Yrs: Math.round(lifetimeSavings),
      co2SavedTonsPerYear: co2SavedTons,
      equivalentTreesPlanted: treesEquivalent,
    });
  };

  useEffect(() => {
    calculateQuote();
  }, [inputs]);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;
    setLeadForm(prev => ({ ...prev, submitted: true }));
  };

  const totalSubsidy = result ? result.centralSubsidy + result.stateSubsidy : 0;
  const activeTier = result ? getActiveSubsidyTier(result.recommendedCapacityKw) : SUBSIDY_TIERS[0];

  return (
    <div id="solar-calculator" className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl my-8 sm:my-12 relative">
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* ── Header ── */}
      <div className="relative z-10 border-b border-slate-800 bg-slate-900/80 px-4 sm:px-6 md:px-8 pt-6 pb-5 sm:pt-8 sm:pb-6">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/25 rounded-full text-orange-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            PM Surya Ghar — Govt. Subsidy Eligible
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
            Solar Savings &amp; Subsidy Calculator
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xl mx-auto">
            Answer a few quick questions to see your system size, government subsidy, and payback — updated live as you adjust.
          </p>

          {/* Subsidy tier reference */}
          {inputs.customerType === 'Residential' && (
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {SUBSIDY_TIERS.map((tier) => {
                const isActive = result && tier.kw === activeTier.kw;
                return (
                  <div
                    key={tier.kw}
                    className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                      isActive
                        ? 'bg-orange-500/15 border-orange-500/40 text-orange-400 font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-500'
                    }`}
                  >
                    <span className="font-mono">{tier.kw}</span>
                    <span className="mx-1.5 text-slate-600">→</span>
                    <span className="font-bold">{tier.amount}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* ── LEFT: Input wizard ── */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Step navigation */}
            <div className="flex gap-2">
              {STEPS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStep(s.id)}
                  className={`flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-all ${
                    step === s.id
                      ? 'bg-blue-600/10 border-blue-500/50 text-blue-400'
                      : step > s.id
                        ? 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                        : 'bg-slate-950/40 border-slate-800 text-slate-500 hover:border-slate-700'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    step === s.id ? 'bg-blue-600 text-white' : step > s.id ? 'bg-emerald-600/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {step > s.id ? '✓' : s.id}
                  </span>
                  <span className="text-xs font-semibold hidden sm:block">{s.label}</span>
                  <span className="text-xs font-semibold sm:hidden">{s.short}</span>
                </button>
              ))}
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col flex-1">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="text-base font-bold text-white">Who is this system for?</h3>
                      <p className="text-xs text-slate-500 mt-1">Subsidy rules differ by customer type.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-slate-300 font-medium">Customer type</label>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { type: 'Residential', icon: Home, desc: 'Home rooftop — PM Surya Ghar subsidy applies' },
                          { type: 'Commercial', icon: Building2, desc: 'Factory / office — 40% tax depreciation benefit' },
                          { type: 'Housing Society', icon: Building2, desc: 'Apartment complex — group subsidy up to ₹9L' },
                        ].map(({ type, icon: Icon, desc }) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setInputs(prev => ({ ...prev, customerType: type as QuoteInput['customerType'] }))}
                            className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                              inputs.customerType === type
                                ? 'bg-blue-500/10 border-blue-500/60 ring-1 ring-blue-500/20'
                                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${inputs.customerType === type ? 'text-blue-400' : 'text-slate-500'}`} />
                            <div>
                              <span className={`text-sm font-semibold block ${inputs.customerType === type ? 'text-blue-400' : 'text-slate-200'}`}>{type}</span>
                              <span className="text-[11px] text-slate-500 leading-snug">{desc}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-slate-300 font-medium">Meter connection</label>
                      <div className="grid grid-cols-2 gap-2">
                        {(['1-Phase', '3-Phase'] as const).map((phase) => (
                          <button
                            key={phase}
                            type="button"
                            onClick={() => setInputs(prev => ({ ...prev, connectionType: phase }))}
                            className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                              inputs.connectionType === phase
                                ? 'bg-blue-500/10 border-blue-500 text-blue-400 font-bold'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            {phase}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="state-select" className="text-sm text-slate-300 font-medium flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" /> Installation state
                      </label>
                      <select
                        id="state-select"
                        value={inputs.state}
                        onChange={(e) => setInputs(prev => ({ ...prev, state: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      >
                        {INDIAN_STATES.map(s => (
                          <option key={s.name} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                      <p className="text-[11px] text-slate-500">Some states offer additional rooftop solar subsidies on top of central benefits.</p>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="text-base font-bold text-white">Tell us about your property</h3>
                      <p className="text-xs text-slate-500 mt-1">Drag the sliders — your estimate updates instantly.</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-baseline">
                        <label className="text-sm text-slate-300 font-medium">Roof area available</label>
                        <span className="text-lg font-bold text-blue-400 font-mono">{inputs.roofArea} <span className="text-xs text-slate-500 font-sans">sq ft</span></span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="3000"
                        step="50"
                        value={inputs.roofArea}
                        onChange={(e) => setInputs(prev => ({ ...prev, roofArea: parseInt(e.target.value) }))}
                        className="range-slider range-slider-blue w-full"
                        aria-label="Roof area in square feet"
                      />
                      <div className="flex justify-between text-[11px] text-slate-500">
                        <span>100 sq ft</span>
                        <span>~1 kW per 100 sq ft</span>
                        <span>3,000 sq ft</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-baseline">
                        <label className="text-sm text-slate-300 font-medium">Monthly electricity bill</label>
                        <span className="text-lg font-bold text-cyan-400 font-mono">₹{inputs.monthlyBill.toLocaleString('en-IN')}</span>
                      </div>
                      <input
                        type="range"
                        min="1000"
                        max="30000"
                        step="500"
                        value={inputs.monthlyBill}
                        onChange={(e) => setInputs(prev => ({ ...prev, monthlyBill: parseInt(e.target.value) }))}
                        className="range-slider range-slider-cyan w-full"
                        aria-label="Monthly electricity bill in rupees"
                      />
                      <div className="flex justify-between text-[11px] text-slate-500">
                        <span>₹1,000</span>
                        <span>₹15,000</span>
                        <span>₹30,000+</span>
                      </div>
                    </div>

                    {/* Live mini summary */}
                    {result && (
                      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 grid grid-cols-2 gap-2 text-center">
                        <div>
                          <span className="text-[10px] text-slate-500 block">Suggested size</span>
                          <span className="text-sm font-bold text-white font-mono">{result.recommendedCapacityKw} kW</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">After subsidy</span>
                          <span className="text-sm font-bold text-emerald-400 font-mono">₹{(result.netCost / 100000).toFixed(1)}L</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Wizard nav */}
              <div className="flex justify-between gap-3 mt-6 pt-4 border-t border-slate-800">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(prev => prev - 1)}
                    className="flex items-center gap-1.5 px-4 py-2.5 text-sm text-slate-400 hover:text-white border border-slate-800 rounded-xl hover:bg-slate-900 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                ) : <div />}

                {step < 2 ? (
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setInputs({ roofArea: 350, monthlyBill: 4500, state: 'Maharashtra', customerType: 'Residential', connectionType: '1-Phase' });
                      setStep(1);
                    }}
                    className="px-4 py-2.5 text-sm text-slate-400 hover:text-white border border-slate-800 rounded-xl hover:bg-slate-900 transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Live results ── */}
          <div className="lg:col-span-7 space-y-4">
            {result && (
              <>
                {/* Hero numbers */}
                <div className="bg-gradient-to-br from-blue-600/15 via-slate-950/60 to-orange-500/10 border border-slate-800 rounded-2xl p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Your live estimate</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="col-span-2 sm:col-span-1 bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-center">
                      <span className="text-[11px] text-slate-500 block mb-1">System size</span>
                      <span className="text-2xl sm:text-3xl font-black text-white font-mono">{result.recommendedCapacityKw}</span>
                      <span className="text-xs text-slate-400 block">kW · {result.panelsCount} panels</span>
                    </div>
                    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-center">
                      <span className="text-[11px] text-slate-500 block mb-1">You pay</span>
                      <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">₹{(result.netCost / 100000).toFixed(1)}L</span>
                      <span className="text-[10px] text-slate-500 block">after subsidy</span>
                    </div>
                    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-center">
                      <span className="text-[11px] text-slate-500 block mb-1">Govt. saves you</span>
                      <span className="text-xl sm:text-2xl font-black text-orange-400 font-mono">₹{(totalSubsidy / 1000).toFixed(0)}K</span>
                      <span className="text-[10px] text-slate-500 block">total subsidy</span>
                    </div>
                    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-center">
                      <span className="text-[11px] text-slate-500 block mb-1">Payback</span>
                      <span className="text-xl sm:text-2xl font-black text-blue-400 font-mono">~{result.paybackYears} yr</span>
                      <span className="text-[10px] text-slate-500 block">break-even</span>
                    </div>
                  </div>
                </div>

                {/* Cost breakdown */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-orange-400" /> Cost breakdown
                  </h4>

                  <div className="space-y-0 divide-y divide-slate-800/80">
                    <div className="flex justify-between items-center py-3 text-sm">
                      <span className="text-slate-400">Total system cost</span>
                      <span className="font-semibold text-white font-mono">₹{result.totalCost.toLocaleString('en-IN')}</span>
                    </div>
                    {result.centralSubsidy > 0 && (
                      <div className="flex justify-between items-center py-3 text-sm">
                        <span className="text-orange-400 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                          PM Surya Ghar subsidy
                        </span>
                        <span className="font-bold text-orange-400 font-mono">− ₹{result.centralSubsidy.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {result.stateSubsidy > 0 && (
                      <div className="flex justify-between items-center py-3 text-sm">
                        <span className="text-cyan-400">{inputs.state} state subsidy</span>
                        <span className="font-bold text-cyan-400 font-mono">− ₹{result.stateSubsidy.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-3">
                      <span className="text-sm font-bold text-white">Your net investment</span>
                      <span className="text-xl font-black text-emerald-400 font-mono">₹{result.netCost.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {inputs.customerType === 'Residential' && result.centralSubsidy > 0 && (
                    <div className="flex items-start gap-2.5 bg-orange-500/8 border border-orange-500/20 rounded-xl p-3 text-xs text-orange-300/90 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <span>
                        Your <strong>{result.recommendedCapacityKw} kW</strong> system qualifies for the{' '}
                        <strong>{activeTier.amount}</strong> PM Surya Ghar central subsidy tier. UVR handles the full DISCOM &amp; portal paperwork.
                      </span>
                    </div>
                  )}
                </div>

                {/* Savings row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                    <span className="text-[11px] text-slate-500 block">Monthly bill saved</span>
                    <span className="text-lg font-bold text-white font-mono mt-1">₹{result.monthlySavings.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">New bill ~₹{Math.max(0, inputs.monthlyBill - result.monthlySavings).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                    <span className="text-[11px] text-slate-500 block">Annual savings</span>
                    <span className="text-lg font-bold text-cyan-400 font-mono mt-1">₹{result.annualSavings.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                    <span className="text-[11px] text-slate-500 block">25-year savings</span>
                    <span className="text-lg font-bold text-blue-400 font-mono mt-1">₹{(result.lifetimeSavings25Yrs / 100000).toFixed(1)}L</span>
                  </div>
                </div>

                {/* Eco impact */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <Leaf className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white">{result.equivalentTreesPlanted} trees</span>
                      <span className="text-[10px] text-slate-500 block">CO₂ offset equivalent / yr</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                    <div className="p-2 bg-red-500/10 rounded-lg">
                      <Flame className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white">{result.co2SavedTonsPerYear} tons</span>
                      <span className="text-[10px] text-slate-500 block">CO₂ avoided / yr</span>
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <SavingsProjectorChart
                  capacityKw={result.recommendedCapacityKw}
                  initialAnnualSavings={result.annualSavings}
                  netInvestment={result.netCost}
                  paybackYears={result.paybackYears}
                />

                {/* Lead capture */}
                <div className="bg-gradient-to-r from-blue-600/10 to-cyan-500/5 border border-blue-500/20 rounded-2xl p-5 sm:p-6">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                    Lock your subsidy slot — free site survey
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 mb-4">
                    Get your personalised sizing report and reserve PM Surya Ghar eligibility with UVR engineers.
                  </p>

                  <AnimatePresence mode="wait">
                    {!leadForm.submitted ? (
                      <motion.form
                        onSubmit={handleLeadSubmit}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            required
                            placeholder="Your name"
                            value={leadForm.name}
                            onChange={e => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                          />
                          <input
                            type="tel"
                            required
                            placeholder="Mobile number"
                            value={leadForm.phone}
                            onChange={e => setLeadForm(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors"
                        >
                          <Send className="w-4 h-4" /> Get my subsidy report
                        </button>
                        <label className="flex items-start gap-2 text-[11px] text-slate-500 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={leadForm.agreed}
                            onChange={e => setLeadForm(prev => ({ ...prev, agreed: e.target.checked }))}
                            className="accent-blue-500 mt-0.5 shrink-0"
                          />
                          I agree to receive a feasibility call from UVR certified engineers.
                        </label>
                      </motion.form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-4"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-white">Subsidy slot reserved!</p>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            Thanks, {leadForm.name}! Your {result.recommendedCapacityKw} kW estimate is saved. Our team will call you within 24 hours to schedule a free LIDAR roof survey.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
