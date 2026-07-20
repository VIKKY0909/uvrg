import React, { useState } from 'react';
import { Sun, Moon, ArrowRight, BookOpen, Layers, Settings, HelpCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InfoNode {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techSpecs: string[];
  role: string;
  savingTips: string;
}

const ECOSYSTEM_NODES: InfoNode[] = [
  {
    id: 'panels',
    title: 'N-Type Dual Glass Solar Panels',
    subtitle: 'The Photovoltaic Energy Harvester',
    description: 'High-performance TOPCon Bifacial panels absorb sunlight from both sides, capturing reflected light from your roof floor. This increases daily electricity yield by up to 15% compared to standard monocrystalline panels.',
    techSpecs: [
      'Peak Cell Efficiency: 22.8%+',
      'Output Power Tolerance: 0 ~ +5W',
      'Dual-glass encapsulation for extreme humidity resistance',
      '12-Year Product + 30-Year Performance Warranty',
    ],
    role: 'Converts solar photons into High-Voltage Direct Current (DC) electricity.',
    savingTips: 'Periodic cleaning with water removes dust build-ups and fully maintains peak photon transmission.',
  },
  {
    id: 'inverter',
    title: 'Smart MPPT String Inverter',
    subtitle: 'The Energy Brain & CPU',
    description: 'UVR Smart Inverters feature dual Maximum Power Point Tracking (MPPT) channels to optimize energy capture even under partial roof shadows. Embedded Wi-Fi uploads generation data to your mobile phone app every 60 seconds.',
    techSpecs: [
      'Max Efficiency: 98.6%',
      'Integrated DC Switch & Surge Protection (Type II)',
      'Real-time IoT cloud telemetry tracking',
      '10-Year Comprehensive Warranty',
    ],
    role: 'Safely converts raw DC power into stabilized 230V Single/Three-Phase AC electricity matching the grid.',
    savingTips: 'Must be installed in a well-ventilated, shaded wall space to optimize heat dispersion and conversion speed.',
  },
  {
    id: 'meter',
    title: 'Bi-Directional Net Meter',
    subtitle: 'The Grid Accounting Ledger',
    description: 'A DISCOM-approved bi-directional smart meter records both the power you import from the grid and the surplus solar energy you export back to it. Under net metering, the exported units are adjusted against the units you consume, reducing your monthly bill. Net metering is governed by your state DISCOM (in Gujarat, GERC).',
    techSpecs: [
      'Class 1.0 Accuracy Standard',
      'Tamper-proof optical sealing',
      'Bi-directional totalizers (KWh & KVARh)',
      'Certified and approved across major DISCOMs in India',
    ],
    role: 'Measures import and export so exported solar is adjusted against your consumption on the monthly DISCOM bill.',
    savingTips: 'Surplus daytime generation is exported and adjusted against your consumption, lowering your monthly electricity bill.',
  },
  {
    id: 'home',
    title: 'Home Distribution Panel',
    subtitle: 'The Local Appliance Circuit',
    description: 'Bridges solar inverter output directly to your household appliances. The power flows on the path of least resistance, meaning solar energy is automatically consumed first, avoiding grid utility costs completely.',
    techSpecs: [
      'Automatic solar-first routing topology',
      'Phase isolation safety circuit',
      'Residual Current Circuit Breaker (RCCB) safety limits',
      'Supports high-surge startup loads (ACs, Pumps, EV Chargers)',
    ],
    role: 'Distributes clean, free electricity to light up your appliances, lights, and appliances.',
    savingTips: 'Running energy-intensive appliances (heavy washing machines, pumps) during peak solar hours (10 AM - 2 PM) maximizes direct solar consumption.',
  },
  {
    id: 'grid',
    title: 'DISCOM Utility Power Grid',
    subtitle: 'The Endless Energy Battery',
    description: 'Your local DISCOM grid acts as a virtual battery. Under net metering, you export excess solar during the day and draw power at night or on cloudy days, with exports adjusted against imports on your bill.',
    techSpecs: [
      'Stabilized 50Hz grid alignment',
      'Zero backup fuel/diesel needed on-site',
      'Bill adjustment via state net-metering regulations (e.g. GERC in Gujarat)',
      'Bi-directional grid stability handshake',
    ],
    role: 'Supplies electricity when solar generation is low, at night, or during cloudy weather — no on-site battery required.',
    savingTips: 'Completing net-metering approval early lets you start exporting surplus solar and reducing your bills sooner.',
  },
];

export default function EducationalHub() {
  const [activeTab, setActiveTab] = useState<'day' | 'night'>('day');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('panels');

  const selectedNode = ECOSYSTEM_NODES.find(n => n.id === selectedNodeId) || ECOSYSTEM_NODES[0];

  return (
    <div id="educational-hub" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl my-12 relative overflow-hidden">
      
      {/* Grid: Overview Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-blue-400 text-xs font-semibold px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <BookOpen className="w-3.5 h-3.5" /> Interactive Learning Portal
          </span>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-sans">
            How Net-Metered Solar Systems Work
          </h3>
          <p className="text-slate-400 text-sm">
            Learn how the various engineering components harmonize to convert raw sunlight into utility-reducing financial credits.
          </p>
        </div>

        {/* Day/Night Scenario Toggle */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('day')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'day'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sun className="w-4 h-4 shrink-0" /> Day Cycle
          </button>
          <button
            onClick={() => setActiveTab('night')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'night'
                ? 'bg-blue-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Moon className="w-4 h-4 shrink-0" /> Night Cycle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COLUMN: INTERACTIVE VISUAL SCHEMATIC (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950/40 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden min-h-[320px] sm:min-h-[360px]">
          
          {/* Subtle grid backing */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:30px_30px] opacity-[0.05]" />

          {/* Symmetrical Diagram Block */}
          <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center py-6">
            
            {/* Ambient solar beams in day mode */}
            {activeTab === 'day' && (
              <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-amber-500/10 to-transparent blur-xl pointer-events-none" />
            )}

            {/* Nodes Layout Grid */}
            <div className="w-full max-w-lg grid grid-cols-3 gap-y-8 sm:gap-y-12 gap-x-2 sm:gap-x-4 text-center relative">
              
              {/* Central Connection Lines (glowing paths) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Horizontal flow line */}
                <div className={`h-1 w-[80%] transition-all duration-500 ${activeTab === 'day' ? 'bg-gradient-to-r from-amber-500/40 via-green-500/40 to-blue-500/40' : 'bg-gradient-to-l from-blue-500/40 via-blue-700/20 to-slate-800'}`} />
              </div>

              {/* 1. SOLAR PANELS */}
              <div className="flex flex-col items-center z-10">
                <button
                  onClick={() => setSelectedNodeId('panels')}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${
                    selectedNodeId === 'panels'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-400 scale-110 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Sun className={`w-6 h-6 ${activeTab === 'day' ? 'animate-spin-slow text-amber-400' : 'text-slate-600'}`} />
                </button>
                <span className="text-[9px] sm:text-[10px] font-mono mt-2 uppercase tracking-wider block text-slate-300 leading-tight">1. Solar Panels</span>
                {activeTab === 'day' && <span className="text-[8px] bg-amber-500/15 text-amber-400 font-bold px-1.5 py-0.5 rounded-full mt-1">Generating</span>}
              </div>

              {/* 2. INVERTER */}
              <div className="flex flex-col items-center z-10">
                <button
                  onClick={() => setSelectedNodeId('inverter')}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${
                    selectedNodeId === 'inverter'
                      ? 'bg-orange-500/10 border-orange-500 text-orange-400 scale-110 shadow-lg shadow-orange-500/10'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Layers className={`w-6 h-6 ${activeTab === 'day' ? 'text-orange-400' : 'text-slate-500'}`} />
                </button>
                <span className="text-[9px] sm:text-[10px] font-mono mt-2 uppercase tracking-wider block text-slate-300 leading-tight">2. Inverter</span>
                {activeTab === 'day' && <span className="text-[8px] bg-green-500/15 text-green-400 font-bold px-1.5 py-0.5 rounded-full mt-1">Converting</span>}
              </div>

              {/* 3. HOME distribution */}
              <div className="flex flex-col items-center z-10">
                <button
                  onClick={() => setSelectedNodeId('home')}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${
                    selectedNodeId === 'home'
                      ? 'bg-sky-500/10 border-sky-500 text-sky-400 scale-110 shadow-lg shadow-sky-500/10'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Settings className={`w-6 h-6 ${activeTab === 'day' ? 'text-sky-400' : 'text-blue-500'}`} />
                </button>
                <span className="text-[9px] sm:text-[10px] font-mono mt-2 uppercase tracking-wider block text-slate-300 leading-tight">3. Home Load</span>
                <span className="text-[8px] bg-blue-500/15 text-blue-400 font-bold px-1.5 py-0.5 rounded-full mt-1">Powered</span>
              </div>

              {/* 4. NET METER (Bottom Left) */}
              <div className="flex flex-col items-center z-10 mt-4">
                <button
                  onClick={() => setSelectedNodeId('meter')}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${
                    selectedNodeId === 'meter'
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 scale-110 shadow-lg shadow-emerald-500/10'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-mono text-xs font-black">KW/h</div>
                </button>
                <span className="text-[9px] sm:text-[10px] font-mono mt-2 uppercase tracking-wider block text-slate-300 leading-tight">4. Net Meter</span>
                {activeTab === 'day' ? (
                  <span className="text-[8px] bg-emerald-500/15 text-emerald-400 font-bold px-1.5 py-0.5 rounded-full mt-1">Exporting (-)</span>
                ) : (
                  <span className="text-[8px] bg-red-500/15 text-red-400 font-bold px-1.5 py-0.5 rounded-full mt-1">Importing (+)</span>
                )}
              </div>

              {/* 5. POWER GRID (Bottom Right) */}
              <div className="flex flex-col items-center z-10 mt-4">
                <button
                  onClick={() => setSelectedNodeId('grid')}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${
                    selectedNodeId === 'grid'
                      ? 'bg-blue-600/15 border-blue-500 text-blue-400 scale-110 shadow-lg shadow-blue-500/10'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="font-mono text-xs font-extrabold text-blue-400">DISCOM</span>
                </button>
                <span className="text-[9px] sm:text-[10px] font-mono mt-2 uppercase tracking-wider block text-slate-300 leading-tight">5. Power Grid</span>
                <span className="text-[8px] bg-slate-800 text-slate-500 font-bold px-1.5 py-0.5 rounded-full mt-1">Backup</span>
              </div>

            </div>

          </div>

          {/* Visual State HUD Summary description */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 relative z-10">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 mb-1">
              {activeTab === 'day' ? (
                <>
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
                  Active Symmetrical Power Cycle (Sunny Day)
                </>
              ) : (
                <>
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Smart Nocturnal Discharge Sequence (Night)
                </>
              )}
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              {activeTab === 'day'
                ? 'Solar panels capture DC power from sunlight. The inverter converts it into usable AC. Your home loads consume it first, and any surplus is exported to the DISCOM grid through your net meter and adjusted against your consumption to reduce your monthly bill.'
                : 'Solar panels stop generating after dark. Your home draws power from the DISCOM grid, offset by the net-metering credits earned from surplus solar exported during the day. Battery backup is available on request via hybrid systems.'
              }
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: DETAIL SPECS DISPLAY CARD (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between h-full space-y-5"
            >
              {/* Header */}
              <div>
                <span className="text-[9px] text-orange-400 font-mono uppercase tracking-widest bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-md inline-block mb-3">
                  {selectedNode.subtitle}
                </span>
                <h4 className="text-xl font-bold text-white tracking-tight">{selectedNode.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed mt-2">{selectedNode.description}</p>
              </div>

              {/* Core Role */}
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850/80 text-xs">
                <span className="font-bold text-white block mb-0.5">Primary System Role:</span>
                <span className="text-slate-300 font-sans">{selectedNode.role}</span>
              </div>

              {/* Specs bullet list */}
              <div>
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block mb-2">Technical Specifications</span>
                <ul className="space-y-1.5">
                  {selectedNode.techSpecs.map((spec, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs font-sans text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Savings Tips / Maintenance */}
              <div className="bg-blue-500/5 p-3 rounded-xl border border-blue-500/10 text-xs">
                <span className="font-bold text-blue-400 flex items-center gap-1.5 mb-1">
                  <Layers className="w-3.5 h-3.5" /> UVR Maintenance Protocol
                </span>
                <span className="text-slate-400 leading-normal block">{selectedNode.savingTips}</span>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
