import React, { useState } from 'react';
import { Building2, Landmark, ShieldCheck, Scale, Award, ArrowRight, TrendingUp, CheckCircle2, Percent, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface CaseStudy {
  clientName: string;
  location: string;
  capacity: string;
  investment: string;
  payback: string;
  annualSavings: string;
  co2Offset: string;
  description: string;
}

const COMMERCIAL_CASES: CaseStudy[] = [
  {
    clientName: 'Techsol IT Park Block A',
    location: 'Hinjewadi, Pune',
    capacity: '150 kWp Grid-Tied System',
    investment: '₹ 82,50,000',
    payback: '3.4 Years',
    annualSavings: '₹ 24,15,000',
    co2Offset: '123 Tons/Yr',
    description: 'A massive high-load engineering center installation featuring 278 TOPCon Dual-Glass panels. Utilizes net-metering to offset central chiller conditioning loads, reducing daytime grid dependence from ₹11.5/unit to zero.'
  },
  {
    clientName: 'Greenfield Cooperative Housing Society',
    location: 'Sector 45, Noida',
    capacity: '85 kWp Symmetrical Array',
    investment: '₹ 49,30,000',
    payback: '4.1 Years',
    annualSavings: '₹ 11,90,000',
    co2Offset: '70 Tons/Yr',
    description: 'Shared rooftop deployment serving 120 residential apartments. Powers water pumping stations, elevators, street lighting, and clubhouse HVAC systems. Obtained ₹9,00,000 flat central capital subsidy under the cooperative apartment scheme.'
  }
];

export default function CommercialSegment() {
  const [loadKw, setLoadKw] = useState<number>(50);
  const [taxRate, setTaxRate] = useState<number>(25); // corporate tax percentage

  // 1kW commercial solar averages ₹55,000, generates 120 units/mo. Tariffs for commercial average ₹9.8/unit in India.
  const setupCost = loadKw * 55000;
  const yearlyGen = loadKw * 120 * 12;
  const annualSavings = yearlyGen * 9.8;
  
  // 40% Accelerated Depreciation tax shield:
  // First year tax write off = 40% of setup cost. Tax savings = write-off * taxRate%
  const firstYearWriteOff = setupCost * 0.4;
  const firstYearTaxSavings = firstYearWriteOff * (taxRate / 100);
  const effectiveFirstYearCost = setupCost - firstYearTaxSavings;
  const commercialPayback = Number((effectiveFirstYearCost / annualSavings).toFixed(1));

  return (
    <div id="commercial-segment" className="space-y-12">
      
      {/* Banner Hero */}
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:35px_35px] opacity-[0.05]" />
        <div className="absolute top-0 right-0 w-[500px] h-full bg-gradient-to-l from-emerald-500/10 to-transparent blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4 text-left">
          <span className="text-emerald-400 text-xs font-semibold px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" /> Commercial, Industrial &amp; Housing Cooperatives
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none font-sans">
            High-Yield Energy Infrastructure <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">for Industrial Assets</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Transition your enterprise to net-zero. UVR Green Energies provides turnkey EPC contracting, virtual net-metering liasons, and automated tax accounting optimization to turn vacant roofs into profitable, zero-tax financial generators.
          </p>
        </div>
      </div>

      {/* Grid: 40% Accelerated Depreciation Calculator + Tax Shield */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Interactive Calculator (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950/60 border border-slate-850 p-6 md:p-8 rounded-2xl flex flex-col justify-between text-left">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Landmark className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white font-sans">Corporate Tax Shield &amp; ROI Auditor</h3>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Unlike residential users, commercial enterprises in India do not receive direct cash subsidies. Instead, the Income Tax Act allows a **40% Accelerated Depreciation (AD)** write-off, significantly offsetting corporate tax slabs in Year 1.
            </p>

            <div className="space-y-6">
              {/* Load input */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-slate-400">PROPOSED ARRAY CAPACITY (kWp)</span>
                  <span className="text-emerald-400 font-bold">{loadKw} kWp System</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={loadKw}
                  onChange={(e) => setLoadKw(parseInt(e.target.value))}
                  className="range-slider range-slider-emerald w-full"
                />
                <div className="flex justify-between text-[10px] text-slate-600 font-mono mt-1">
                  <span>10 kWp</span>
                  <span>250 kWp</span>
                  <span>500 kWp+</span>
                </div>
              </div>

              {/* Tax Slab input */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-slate-400">CORPORATE INCOME TAX BRACKET (%)</span>
                  <span className="text-blue-400 font-bold">{taxRate}% Tax Rate</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[15, 22, 25].map((slab) => (
                    <button
                      key={slab}
                      onClick={() => setTaxRate(slab)}
                      className={`py-2 rounded-xl text-xs font-mono transition-all border ${
                        taxRate === slab
                          ? 'bg-blue-500/10 border-blue-500 text-blue-400 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
                      }`}
                    >
                      {slab}% {slab === 15 ? '(New Mfg)' : slab === 22 ? '(Base Rate)' : '(With Surcharges)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Readouts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-900">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-850">
              <span className="text-[10px] text-slate-500 font-mono block">ESTIMATED CAPEX OUTLAY</span>
              <span className="text-xl font-bold text-white font-mono block mt-1">₹ {setupCost.toLocaleString('en-IN')}</span>
              <span className="text-[9px] text-slate-500 mt-1 block">Full turnkey EPC installation &amp; permissions.</span>
            </div>
            
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-850">
              <span className="text-[10px] text-emerald-400 font-mono block flex items-center gap-1">
                <Percent className="w-3 h-3" /> FIRST-YEAR TAX SAVINGS (40% AD)
              </span>
              <span className="text-xl font-bold text-emerald-400 font-mono block mt-1">₹ {firstYearTaxSavings.toLocaleString('en-IN')}</span>
              <span className="text-[9px] text-slate-500 mt-1 block">Immediate cash flow credit via tax deductions.</span>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-850">
              <span className="text-[10px] text-slate-500 font-mono block">EFFECTIVE NET CAPEX</span>
              <span className="text-xl font-bold text-white font-mono block mt-1">₹ {effectiveFirstYearCost.toLocaleString('en-IN')}</span>
              <span className="text-[9px] text-slate-500 mt-1 block">Outlay factoring first-year AD depreciation write-off.</span>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-850">
              <span className="text-[10px] text-blue-400 font-mono block">PROJECTED ROI AMORTIZATION</span>
              <span className="text-xl font-bold text-blue-400 font-mono block mt-1">~{commercialPayback} Years</span>
              <span className="text-[9px] text-slate-500 mt-1 block">Calculated at flat commercial power of ₹9.8/kWh.</span>
            </div>
          </div>

        </div>

        {/* Right Financial and Policy benefits (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6 text-left">
          <div>
            <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2 mb-3">
              <Scale className="w-5 h-5 text-emerald-400" /> Commercial Mandates &amp; Credits
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Industrial facilities, cold storages, IT parks, and educational campuses benefit from specialized structural grid benefits under India's state solar frameworks.
            </p>
          </div>

          <div className="space-y-4">
            
            {/* Grid 1 */}
            <div className="flex gap-3.5 items-start">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl flex-shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">OPEX / RESCO Pricing Models</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Avoid capital investments completely. Under the RESCO model, UVR owns and operates the solar infrastructure. You simply buy clean power from your roof at a flat tariff starting at **₹4.5/unit** — up to 50% cheaper than the DISCOM commercial tariff!
                </p>
              </div>
            </div>

            {/* Grid 2 */}
            <div className="flex gap-3.5 items-start">
              <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl flex-shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Housing Cooperative Flat Subsidies</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Apartment housing complexes can offset heavy common loads (elevators, swimming pool filtration, boundary grid lights). Eligible for flat central subsidies of **₹18,000 per kW** up to a maximum cap of **₹9 Lakhs**.
                </p>
              </div>
            </div>

            {/* Grid 3 */}
            <div className="flex gap-3.5 items-start">
              <div className="p-2 bg-teal-500/10 text-teal-400 rounded-xl flex-shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Carbon Credit Allocation &amp; ESG</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  Each kWp installed translates to offset credits on international carbon markets. Earn verified environmental certificates (RECs) to bolster your corporate ESG ratings and qualify for export-compliances.
                </p>
              </div>
            </div>

          </div>

          <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10 text-xs">
            <span className="font-bold text-emerald-400 block mb-1 font-sans">Turnkey Liaison Services:</span>
            <span className="text-slate-400 block leading-relaxed">
              UVR Techsol manages all regulatory procedures, from CEIG safety inspector approvals, structural load reviews, custom substation enhancements, to DISCOM bi-directional net-meter synchronization.
            </span>
          </div>

        </div>

      </div>

      {/* Case Studies section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white tracking-tight text-left">Enterprise Case Studies</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {COMMERCIAL_CASES.map((c, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-850 rounded-2xl p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-white">{c.clientName}</h4>
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{c.location}</span>
                  </div>
                  <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono px-2.5 py-1 rounded-md font-bold">
                    {c.capacity}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{c.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 border-t border-slate-900 text-center font-mono">
                <div>
                  <span className="text-[9px] text-slate-500 block">CAPEX COST</span>
                  <span className="text-xs font-bold text-slate-200 mt-0.5 block">{c.investment}</span>
                </div>
                <div>
                  <span className="text-[9px] text-emerald-400 block">ANNUAL SAVINGS</span>
                  <span className="text-xs font-bold text-emerald-400 mt-0.5 block">{c.annualSavings}</span>
                </div>
                <div>
                  <span className="text-[9px] text-blue-400 block">PAYBACK TIMELINE</span>
                  <span className="text-xs font-bold text-blue-400 mt-0.5 block">{c.payback}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
