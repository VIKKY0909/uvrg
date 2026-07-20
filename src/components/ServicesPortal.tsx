import React, { useState, useEffect } from 'react';
import { 
  Home, Building2, Sun, Zap, ShieldCheck, ArrowRight, CheckCircle2, 
  Settings, Award, Landmark, HelpCircle, Sliders, ChevronRight, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServiceDetail {
  id: string;
  route: string;
  icon: React.ReactNode;
  title: string;
  badge: string;
  shortDesc: string;
  tagline: string;
  longDesc: string;
  keySpecs: { label: string; value: string }[];
  process: { phase: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  regionalPolicies: { state: string; rule: string; advantage: string }[];
}

const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'residential',
    route: 'services/residential-solar-rooftop',
    icon: <Home className="w-6 h-6 text-orange-400" />,
    title: 'Residential Solar Rooftop Solutions',
    badge: 'PM Surya Ghar Yojana Compliant',
    shortDesc: 'Complete residential rooftop solar solutions featuring Mono PERC and N-Type TOPCon bifacial panels with end-to-end net-metering support to cut down household utility bills.',
    tagline: 'Join India\'s Clean Energy Revolution & Save up to ₹78,000 in Central Subsidies',
    longDesc: 'Our residential systems are engineered to maximise roof space using Mono PERC and high-efficiency N-Type TOPCon bifacial modules (540–620 Wp) that generate power from both sides. Every project begins with a free professional site survey — a manual visit by our engineers to assess roof area, shading and structural readiness. From there we handle structural load analysis, mounting, and DISCOM clearances, ensuring you receive the maximum cash subsidy credited directly to your bank account under the PM Surya Ghar program.',
    keySpecs: [
      { label: 'System Size Range', value: '1 kW to 500 kW' },
      { label: 'Subsidy Support', value: '₹30k/kW (Up to ₹78,000)' },
      { label: 'ROI Payback', value: '3 to 5 Years (CAPEX)' },
      { label: 'Install Timeline', value: '2 to 4 Weeks' }
    ],
    process: [
      { phase: '01', title: 'Free Professional Site Survey', desc: 'Our engineers visit your site to assess roof area, shading, and structural readiness — a thorough manual survey at no cost.' },
      { phase: '02', title: 'DISCOM NOC Clearance', desc: 'We submit digital load expansion approvals to your local utility board.' },
      { phase: '03', title: 'Structure & Panel Mounting', desc: 'HDGI / anodised-aluminium structure with secure anchoring is fixed on your roof.' },
      { phase: '04', title: 'Net-Meter Sync', desc: 'DISCOM installs bi-directional meter to credit exported excess units.' }
    ],
    faqs: [
      { q: 'Can I run central home air conditioners on residential solar?', a: 'Absolutely! A standard 5 kWp to 8 kWp residential array handles multiple heavy inverter AC units, water pumps, refrigerators, and modular home induction hubs with ease.' },
      { q: 'How long does the subsidy approval take?', a: 'Under the simplified PM Surya Ghar system, our team uploads compliance documents. The cash credit is disbursed within 30 to 45 working days post net-meter commissioning.' }
    ],
    regionalPolicies: [
      { state: 'Gujarat (MGVCL/UGVCL/DGVCL)', rule: 'GERC Net Metering Regulations', advantage: 'Excess solar units are exported to the grid and adjusted against consumption; state top-up subsidy up to ₹20,000.' },
      { state: 'Uttar Pradesh (UPPCL)', rule: 'UPERC Rooftop Solar Policy', advantage: 'Simplified state-level single-window process with a state subsidy top-up of up to ₹30,000.' },
      { state: 'Delhi (BSES / Tata-DDL)', rule: 'DERC Net Metering Regulations', advantage: 'Net-metering with a state top-up subsidy of up to ₹15,000 for residential rooftop consumers.' }
    ],
  },
  {
    id: 'commercial',
    route: 'services/commercial-industrial-solar',
    icon: <Building2 className="w-6 h-6 text-blue-400" />,
    title: 'Commercial & Industrial (C&I) Solar Rooftop',
    badge: '40% Accelerated Depreciation Shield',
    shortDesc: 'Turn vacant factory roofs into profitable, zero-tax financial generators. Designed for heavy-load engineering facilities, warehouses, hospitals, and educational campuses.',
    tagline: 'Optimize Corporate OpEx & Lock Symmetrical Zero-Tariff Power for 25 Years',
    longDesc: 'Industrial and commercial assets bear some of the highest power tariffs in India (reaching ₹11.5/unit in some zones). UVR C&I systems provide immediate bottom-line relief. Utilizing either the CAPEX model (immediate asset ownership) or OPEX/RESCO model (zero upfront investment, simply pay cheap tariffs to UVR), we integrate smart multi-MPPT string inverters with safety rapid-shutdown nodes to power central HVAC, machinery motors, and data hubs.',
    keySpecs: [
      { label: 'System Size Range', value: '1 kW to 1.2 MW' },
      { label: 'Tax Incentive', value: '40% Year 1 Depreciation' },
      { label: 'ROI Payback', value: '4 to 6 Years' },
      { label: 'Financial Models', value: 'CAPEX / RESCO / PPA / OPEX' }
    ],
    process: [
      { phase: '01', title: 'Load Profile Logging', desc: 'We capture active machinery startup transients and peak power factors.' },
      { phase: '02', title: 'Structural Lift Review', desc: 'Detailed structural test ensures safety loads under extreme wind shear.' },
      { phase: '03', title: 'CEIG Inspector NOC', desc: 'Liaisoning with electrical inspectors to permit heavy industrial syncing.' },
      { phase: '04', title: 'SCADA Remote Telemetry', desc: 'Live cloud dashboards monitor real-time string diagnostics and offsets.' }
    ],
    faqs: [
      { q: 'What is the RESCO / OPEX / PPA solar model?', a: 'Under RESCO/PPA, UVR installs, owns, and maintains the solar system on your roof. You simply purchase the generated electricity at an agreed tariff — RESCO rates start from around ₹4.50/unit and vary by state and system size. CAPEX (you own the asset) and OPEX models are also offered.' },
      { q: 'Does commercial solar qualify for tax benefits?', a: 'Yes. Commercial users can utilise the 40% Accelerated Depreciation tax shield, writing off a significant portion of the asset value in Year 1 to reduce corporate tax liabilities.' }
    ],
    regionalPolicies: [
      { state: 'Gujarat (GEDA)', rule: 'Gujarat Solar Policy 2021 (C&I Section)', advantage: 'Zero electricity duty on solar power consumption for industrial units up to contracted load capacity.' },
      { state: 'Uttar Pradesh (UPPCL)', rule: 'UPERC C&I Net Metering Regulations', advantage: 'Net metering and open access available for commercial and industrial consumers under UPERC norms.' },
      { state: 'NCR Region', rule: 'Haryana & UP C&I Net Metering Laws', advantage: 'Virtual net metering allowed for corporate offices with decentralized warehouse assets.' }
    ],
  },
  {
    id: 'ground_mounted',
    route: 'services/ground-mounted-solar',
    icon: <Sun className="w-6 h-6 text-emerald-400" />,
    title: 'Ground-Mounted Solar Power Plants',
    badge: 'Turnkey EPC & Open Access Models',
    shortDesc: 'Engineered for developers, institutions, and private investors. Utilizing structural soil anchoring and, where suitable, single-axis tracking for large open-ground arrays.',
    tagline: 'High-Volume Energy Harvesting via Custom Engineered Open Ground Arrays',
    longDesc: 'Ground-mounted installations require sophisticated civil engineering and topographical analysis. From contour mapping, pull-out testing for concrete pile foundations, to solar tracking engineering, UVR provides a unified turnkey solution. We implement open-access models allowing heavy power users to set up solar farms in remote rural regions and wheel the generated electricity over the state DISCOM grid directly to their urban assets.',
    keySpecs: [
      { label: 'System Size Range', value: '100 kW to 10 MW+' },
      { label: 'ROI Payback', value: '5 to 7 Years' },
      { label: 'Foundation Tech', value: 'Rammed Pile / Cast Concrete' },
      { label: 'Grid Feed-in', value: '11kV / 33kV Substation Sync' }
    ],
    process: [
      { phase: '01', title: 'Topographical Survey', desc: 'Soil composition, pull-out tests, and hydrology analysis to prevent water logging.' },
      { phase: '02', title: 'Structural Engineering', desc: 'Aerodynamic computational tests ensure structures resist up to 150 km/h winds.' },
      { phase: '03', title: 'Rammed Pile Civil Works', desc: 'Heavy high-tension ramming machines drive structures into ground layers securely.' },
      { phase: '04', title: 'Liaison & PPA Contracts', desc: 'Securing Power Purchase Agreements and grid interconnection line permissions.' }
    ],
    faqs: [
      { q: 'What is solar open-access wheeling?', a: 'Open-access allows large energy consumers to purchase solar power generated at a distant ground-mounted facility, using state transmission lines to feed power to their urban factories.' },
      { q: 'Are your ground mounting structures corrosion resistant?', a: 'We use Hot-Dip Galvanized Iron (HDGI) or anodised structural aluminium for long-term corrosion resistance, backed by a 5-year structure warranty.' }
    ],
    regionalPolicies: [
      { state: 'Gujarat', rule: 'GERC Open Access Regulations', advantage: 'Cross-subsidy surcharge and wheeling framework for green-power developers setting up solar farms in Gujarat.' },
      { state: 'Karnataka', rule: 'KERC Green Energy Open Access Policy', advantage: 'Zero wheeling charges for developers wheeling energy within the same state distribution zone.' },
      { state: 'Rajasthan', rule: 'RERC Grid Synchronization Norms', advantage: 'Fast-tracked land pathways with custom grid allocation in the Jodhpur and Barmer solar zones.' }
    ],
  },
  {
    id: 'utility_scale',
    route: 'services/utility-scale-solar',
    icon: <Zap className="w-6 h-6 text-purple-400" />,
    title: 'Large Ground-Mounted & EPC (up to 10 MW+)',
    badge: 'Large-Scale EPC & O&M',
    shortDesc: 'Turnkey EPC contracting for large ground-mounted solar arrays up to 10 MW and beyond. Includes substation setups, high-voltage lines, and diagnostic monitoring — delivered as EPC services, not standalone utility ownership.',
    tagline: 'Large-Scale Solar EPC Execution with Grid Integration and O&M',
    longDesc: 'For large ground-mounted and EPC projects up to 10 MW and beyond, UVR Green Energies delivers turnkey execution as a solar EPC partner. Our scope covers grid feasibility, substation construction (up to 132kV), string-level monitoring, and inverter/transformer integration, complemented by proactive Operation & Maintenance (O&M) programs. UVR delivers these as EPC services and does not operate standalone utility-scale power plants.',
    keySpecs: [
      { label: 'Execution Scope', value: 'Turnkey EPC (up to 10 MW+)' },
      { label: 'Substation Spec', value: '11kV / 33kV / 132kV Setups' },
      { label: 'Module Type', value: '540–620 Wp TOPCon Bifacial' },
      { label: 'Active Support', value: 'Monitoring & O&M Support' }
    ],
    process: [
      { phase: '01', title: 'Grid Connectivity NOC', desc: 'Acquiring absolute grid feed clearances from State Transmission Utilities.' },
      { phase: '02', title: 'Megawatt Procurement', desc: 'Global Tier-1 module, tracker, and central inverter supply chain alignment.' },
      { phase: '03', title: 'Substation Building', desc: 'High-voltage transformer installation, vacuum circuit breakers, and isolators.' },
      { phase: '04', title: 'Automation Center', desc: 'Robotic cleaning integration and string-level fault-finding SCADA deployment.' }
    ],
    faqs: [
      { q: 'What O&M protocols are followed for large plants?', a: 'We deploy localised maintenance teams, thermal inspection to identify micro-cracks or hot spots, and scheduled module cleaning with preventive maintenance to sustain plant performance.' },
      { q: 'How is reactive power compensation handled?', a: 'Our systems use advanced central smart inverters coupled with dynamic shunt capacitor banks to maintain power factors close to unity, preventing utility fines.' }
    ],
    regionalPolicies: [
      { state: 'Central Govt (CERC)', rule: 'National Grid Connectivity Regulations', advantage: 'Inter-State Transmission System (ISTS) charge waiver for projects commissioned before Dec 2025.' },
      { state: 'SEC / NTPC', rule: 'National Clean Energy PPA Tenders', advantage: 'Standardized sovereign contracts providing 25-year risk-free energy purchase backing.' },
      { state: 'State-wide Grids', rule: 'Dynamic ABT (Availability Based Tariff)', advantage: 'Real-time frequency balancing software synchronizes output values automatically to avoid penalties.' }
    ],
  }
];

interface ServicesPortalProps {
  activeSubPage?: string;
}

export default function ServicesPortal({ activeSubPage }: ServicesPortalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'engineering' | 'policy'>('overview');

  // Micro-calculator state
  const [residentialKw, setResidentialKw] = useState<number>(5);
  const [ciInvestment, setCiInvestment] = useState<number>(3500000);
  const [ciTaxBracket, setCiTaxBracket] = useState<number>(30);
  const [groundAcres, setGroundAcres] = useState<number>(12);
  const [utilityDistance, setUtilityDistance] = useState<number>(15);
  const [utilityVoltage, setUtilityVoltage] = useState<number>(33);

  // Find if a specific sub-route was requested
  const matchedService = SERVICES_DATA.find(s => activeSubPage === s.route);

  // Reset internal tab whenever the page router shifts
  useEffect(() => {
    setActiveTab('overview');
  }, [activeSubPage]);

  // If no specific sub-route is requested, display the Services directory landing
  if (!matchedService) {
    return (
      <div className="space-y-12 text-left">
        {/* Hub Header */}
        <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-12 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.06]" />
          <div className="absolute top-0 right-0 w-[500px] h-full bg-gradient-to-l from-orange-500/10 to-transparent blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-5">
            <span className="text-orange-400 text-xs font-bold px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> Turnkey Solar EPC Engineers
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none font-sans">
              Solar Engineering <br />
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Professional Services</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              UVR Green Energies provides end-to-end feasibility, grid integration, structural engineering, and regulatory clearance across residential, commercial and industrial, and large ground-mounted / EPC scales. Click any service to enter its standalone dedicated page.
            </p>
          </div>
        </div>

        {/* Big Directory Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_DATA.map((srv) => (
            <div 
              key={srv.id}
              className="bg-slate-950/80 border border-slate-900 rounded-3xl p-6 md:p-8 hover:border-slate-800 hover:bg-slate-900/30 transition-all flex flex-col justify-between group space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/[0.02] rounded-full blur-2xl pointer-events-none group-hover:bg-orange-500/5 transition-all duration-500" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-orange-400 group-hover:scale-105 transition-transform duration-300">
                    {srv.icon}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider bg-slate-900/60 px-2.5 py-1 rounded-md border border-slate-850">
                    {srv.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors font-sans">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {srv.shortDesc}
                  </p>
                </div>

                {/* Micro-bullet stats */}
                <div className="grid grid-cols-2 gap-3 pt-3">
                  {srv.keySpecs.slice(0, 2).map((s, idx) => (
                    <div key={idx} className="bg-slate-900/40 p-2.5 rounded-xl border border-slate-900">
                      <span className="text-[8px] font-mono text-slate-500 uppercase block">{s.label}</span>
                      <span className="text-xs font-bold text-slate-300 font-mono block mt-0.5">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-900/60 flex items-center justify-end">
                <button 
                  onClick={() => { window.location.hash = `#${srv.route}`; }}
                  className="btn-primary px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  Explore service <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* General Accreditation section */}
        <div className="bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-wider">Certified Delivery Standards</span>
            <h4 className="text-lg font-bold text-white font-sans">Engineering Compliances</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our installations are certified by state electrical inspectorates and MNRE channel partners.
            </p>
          </div>
          <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-900 pt-4 md:pt-0 md:pl-6">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> MNRE ALMM Listed Modules
            </span>
            <p className="text-[11px] text-slate-500">
              We use modules listed on the Government's Approved List of Models and Manufacturers (ALMM List-II).
            </p>
          </div>
          <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-900 pt-4 md:pt-0 md:pl-6">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-orange-400" /> Structure wind SLA
            </span>
            <p className="text-[11px] text-slate-500">
              Galvanized structures engineered with structural certifications to survive up to 150 km/h cyclone pressure loads.
            </p>
          </div>
        </div>

      </div>
    );
  }

  // --- STANDALONE SUBPAGE VIEW ---
  return (
    <div className="space-y-8 text-left">
      
      {/* Return Navigation Anchor */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <button
          onClick={() => { window.location.hash = '#services'; }}
          className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-mono font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-850 rounded-xl transition-all w-fit"
        >
          <ArrowLeft className="w-4 h-4 text-orange-400 shrink-0" /> Back to Services
        </button>
      </div>

      {/* Standalone Subpage SEO Landing Hero */}
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-12 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1e293b_1px,transparent_1px)] bg-[size:35px_35px] opacity-[0.06]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/5 blur-3xl pointer-events-none animate-pulse" />
        
        <div className="relative z-10 max-w-4xl space-y-5">
          <span className="bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-mono font-bold px-3 py-1 rounded-md uppercase tracking-wider inline-block">
            {matchedService.badge}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none font-sans">
            {matchedService.title}
          </h1>
          <p className="text-sm md:text-base font-semibold text-slate-200 italic font-sans leading-relaxed border-l-2 border-orange-500 pl-4 py-1.5">
            "{matchedService.tagline}"
          </p>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            {matchedService.longDesc}
          </p>
        </div>
      </div>

      {/* MULTI-TAB SUBPAGE WORK DESK */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Side Navigation Desk (3 Cols) — horizontal scroll on mobile */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-950 border border-slate-900 p-3 sm:p-4 rounded-2xl">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block pl-1 mb-2 hidden lg:block">Page Sections</span>
            <div className="flex lg:flex-col gap-2 overflow-x-auto scroll-tabs pb-1 lg:pb-0 -mx-1 px-1 lg:mx-0 lg:px-0">
              {[
                { id: 'overview' as const, label: '01. Overview', short: 'Overview' },
                { id: 'engineering' as const, label: '02. Engineering', short: 'Engineering' },
                { id: 'policy' as const, label: '03. Policies', short: 'Policies' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 lg:w-full p-2.5 sm:p-3 rounded-xl text-xs font-mono font-bold text-left transition-all flex justify-between items-center gap-2 ${
                    activeTab === tab.id ? 'bg-orange-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="lg:hidden">{tab.short}</span>
                  <span className="hidden lg:inline">{tab.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0 hidden lg:block" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Specifications list box */}
          <div className="bg-slate-950 border border-slate-900 p-5 rounded-2xl space-y-4">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Technical Specs Sheet</span>
            <div className="space-y-3">
              {matchedService.keySpecs.map((spec, idx) => (
                <div key={idx} className="border-b border-slate-900 pb-2.5 last:border-0 last:pb-0">
                  <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">{spec.label}</span>
                  <span className="text-xs font-bold text-white font-mono mt-0.5 block">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Main Subpage Detail Content Desk (9 Cols) */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-950/60 border border-slate-850 rounded-3xl p-6 md:p-8 space-y-8"
            >
              
              {/* TAB 1: OVERVIEW & INTERACTIVE SANDBOX CALCULATOR */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h2 className="text-xl font-bold text-white font-sans flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-orange-400" /> Interactive Discipline Sandbox
                    </h2>
                    <p className="text-xs text-slate-400">
                      We build highly technical calculators to help you optimize systems directly from this page. Adjust the inputs below to calculate structural yields and immediate returns.
                    </p>
                  </div>

                  {/* CUSTOM DYNAMIC ESTIMATORS PER SERVICE DISCIPLINES */}
                  {matchedService.id === 'residential' && (
                    <div className="bg-slate-900/50 border border-slate-850 p-5 rounded-2xl space-y-5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-orange-400 font-mono uppercase">PM Surya Ghar Subsidy Calculator</span>
                        <span className="text-[9px] font-mono text-slate-500">UP TO 3KW MAXIMUM BENEFIT</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-slate-300 font-mono">
                          <span>Target Household Solar System Size:</span>
                          <span className="text-orange-400 font-bold">{residentialKw} kWp</span>
                        </div>
                        <input 
                          type="range" 
                          min="1" 
                          max="10" 
                          value={residentialKw} 
                          onChange={(e) => setResidentialKw(Number(e.target.value))}
                          className="range-slider range-slider-orange w-full"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
                        <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl">
                          <span className="text-[8px] text-slate-500 font-mono block">ESTIMATED SYSTEM COST</span>
                          <span className="text-sm font-black text-white font-mono block mt-1">₹{(residentialKw * 54750).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl">
                          <span className="text-[8px] text-emerald-400 font-mono block">GOVERNMENT CASH SUBSIDY</span>
                          <span className="text-sm font-black text-emerald-400 font-mono block mt-1">
                            ₹{(residentialKw <= 2 ? residentialKw * 30000 : (residentialKw === 3 ? 78000 : 78000)).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl">
                          <span className="text-[8px] text-orange-400 font-mono block">YOUR NET EFFECTIVE OUTLAY</span>
                          <span className="text-sm font-black text-orange-400 font-mono block mt-1">
                            ₹{((residentialKw * 54750) - (residentialKw <= 2 ? residentialKw * 30000 : (residentialKw === 3 ? 78000 : 78000))).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-500 leading-normal bg-slate-950 p-3 rounded-lg border border-slate-900">
                        *Indicative cost using an approximate ₹54,750 per kW residential benchmark (varies by brand and site; resets periodically). The PM Surya Ghar subsidy provides ₹30,000 per kW for up to 2kW, and ₹18,000 for the 3rd kW (capped at ₹78,000).
                      </p>
                    </div>
                  )}

                  {matchedService.id === 'commercial' && (
                    <div className="bg-slate-900/50 border border-slate-850 p-5 rounded-2xl space-y-5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-blue-400 font-mono uppercase">Corporate Tax Shield &amp; Accelerated Depreciation Simulator</span>
                        <span className="text-[9px] font-mono text-slate-500">40% YEAR 1 WRITE-OFF</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-slate-300 font-mono">
                            <span>Project CAPEX Investment:</span>
                            <span className="text-blue-400 font-bold">₹{(ciInvestment / 100000).toFixed(1)} Lakhs</span>
                          </div>
                          <input 
                            type="range" 
                            min="1000000" 
                            max="20000000" 
                            step="500000"
                            value={ciInvestment} 
                            onChange={(e) => setCiInvestment(Number(e.target.value))}
                            className="range-slider range-slider-blue w-full"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-slate-300 font-mono">
                            <span>Corporate Tax Bracket:</span>
                            <span className="text-blue-400 font-bold">{ciTaxBracket}%</span>
                          </div>
                          <input 
                            type="range" 
                            min="22" 
                            max="35" 
                            value={ciTaxBracket} 
                            onChange={(e) => setCiTaxBracket(Number(e.target.value))}
                            className="range-slider range-slider-blue w-full"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
                        <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl">
                          <span className="text-[8px] text-slate-500 font-mono block">YEAR 1 TAX DEPRECIATION VALUE</span>
                          <span className="text-sm font-black text-white font-mono block mt-1">₹{(ciInvestment * 0.4).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl">
                          <span className="text-[8px] text-emerald-400 font-mono block">DIRECT CORPORATE TAX SHIELD CASH SAVINGS</span>
                          <span className="text-sm font-black text-emerald-400 font-mono block mt-1">₹{(ciInvestment * 0.4 * (ciTaxBracket / 100)).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl">
                          <span className="text-[8px] text-blue-400 font-mono block">NET EFFECTIVE ASSET VALUE COST</span>
                          <span className="text-sm font-black text-blue-400 font-mono block mt-1">₹{(ciInvestment - (ciInvestment * 0.4 * (ciTaxBracket / 100))).toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-500 leading-normal bg-slate-950 p-3 rounded-lg border border-slate-900">
                        *Under section 32 of the Income Tax Act, commercial solar plants are authorized a massive 40% Accelerated Depreciation within their initial year of operation, lowering taxable profits immediately.
                      </p>
                    </div>
                  )}

                  {matchedService.id === 'ground_mounted' && (
                    <div className="bg-slate-900/50 border border-slate-850 p-5 rounded-2xl space-y-5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-emerald-400 font-mono uppercase">Topography Land-to-Energy Megawatt Calculator</span>
                        <span className="text-[9px] font-mono text-slate-500">N-TYPE DOUBLE-GLASS MULTIPLIERS</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-slate-300 font-mono">
                          <span>Available Flat/Hilly Land Area:</span>
                          <span className="text-emerald-400 font-bold">{groundAcres} Acres</span>
                        </div>
                        <input 
                          type="range" 
                          min="4" 
                          max="150" 
                          value={groundAcres} 
                          onChange={(e) => setGroundAcres(Number(e.target.value))}
                          className="range-slider range-slider-emerald w-full"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-3">
                        <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl">
                          <span className="text-[8px] text-slate-500 font-mono block">GENERATION PLANT CAPACITY</span>
                          <span className="text-sm font-black text-white font-mono block mt-1">{(groundAcres / 4).toFixed(1)} MWp</span>
                        </div>
                        <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl">
                          <span className="text-[8px] text-slate-500 font-mono block">REQUIRED BIFACIAL MODULES</span>
                          <span className="text-sm font-black text-white font-mono block mt-1">{Math.floor((groundAcres / 4) * 1538).toLocaleString()} units</span>
                        </div>
                        <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl">
                          <span className="text-[8px] text-emerald-400 font-mono block">ESTIMATED CO2 OFFSET / YR</span>
                          <span className="text-sm font-black text-emerald-400 font-mono block mt-1">{Math.floor((groundAcres / 4) * 1280).toLocaleString()} Tons</span>
                        </div>
                        <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl">
                          <span className="text-[8px] text-orange-400 font-mono block">AVG MONTHLY POWER GENERATED</span>
                          <span className="text-sm font-black text-orange-400 font-mono block mt-1">{Math.floor((groundAcres / 4) * 135).toLocaleString()} MWh</span>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-500 leading-normal bg-slate-950 p-3 rounded-lg border border-slate-900">
                        *Modern bifacial N-Type TOPCon panels require an average footprint of 4 Acres per Megawatt of direct solar capacity, allowing optimized spacing to mitigate shading deficits.
                      </p>
                    </div>
                  )}

                  {matchedService.id === 'utility_scale' && (
                    <div className="bg-slate-900/50 border border-slate-850 p-5 rounded-2xl space-y-5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-purple-400 font-mono uppercase">Substation Transmission Loss &amp; Wheeling Estimator</span>
                        <span className="text-[9px] font-mono text-slate-500">GRID SYNC EFFICIENCY MODEL</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-slate-300 font-mono">
                            <span>Transmission Line Distance:</span>
                            <span className="text-purple-400 font-bold">{utilityDistance} km</span>
                          </div>
                          <input 
                            type="range" 
                            min="2" 
                            max="60" 
                            value={utilityDistance} 
                            onChange={(e) => setUtilityDistance(Number(e.target.value))}
                            className="range-slider range-slider-purple w-full"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-slate-300 font-mono">
                            <span>Interconnection Feeder Voltage:</span>
                            <span className="text-purple-400 font-bold">{utilityVoltage} kV</span>
                          </div>
                          <div className="flex gap-2 pt-1">
                            {[11, 33, 132].map((v) => (
                              <button
                                key={v}
                                onClick={() => setUtilityVoltage(v)}
                                className={`flex-1 py-1 rounded text-xs font-mono font-bold border transition-colors ${
                                  utilityVoltage === v ? 'bg-purple-500 text-slate-950 border-purple-500' : 'bg-slate-950 text-slate-400 border-slate-850 hover:text-white'
                                }`}
                              >
                                {v} kV
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
                        <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl">
                          <span className="text-[8px] text-slate-500 font-mono block">LINE LOSS ATTENUATIONS</span>
                          <span className="text-sm font-black text-rose-400 font-mono block mt-1">
                            {((utilityDistance * 0.08) / (utilityVoltage === 11 ? 1 : (utilityVoltage === 33 ? 3 : 12))).toFixed(2)} %
                          </span>
                        </div>
                        <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl">
                          <span className="text-[8px] text-slate-500 font-mono block">REQUIRED TRANSFORMER SPEC</span>
                          <span className="text-sm font-black text-white font-mono block mt-1">
                            {utilityVoltage === 11 ? '1.5 MVA' : (utilityVoltage === 33 ? '5.0 MVA' : '15 MVA STEP-UP')}
                          </span>
                        </div>
                        <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl">
                          <span className="text-[8px] text-emerald-400 font-mono block">PEAK GRID DELIVERY RELIABILITY</span>
                          <span className="text-sm font-black text-emerald-400 font-mono block mt-1">
                            {(99.8 - ((utilityDistance * 0.05) / (utilityVoltage === 11 ? 1 : 4))).toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-500 leading-normal bg-slate-950 p-3 rounded-lg border border-slate-900">
                        *Higher feed-in voltages mitigate thermal line resistance, keeping grid transport wheeling losses minimal even over extensive transmission feeder loops.
                      </p>
                    </div>
                  )}

                  {/* Frequently Asked Questions */}
                  <div className="space-y-4 pt-4 border-t border-slate-900">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">Service-specific Frequently Asked Questions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {matchedService.faqs.map((faq, idx) => (
                        <div key={idx} className="bg-slate-900/30 border border-slate-900 p-4.5 rounded-xl space-y-1.5">
                          <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5 font-sans">
                            <HelpCircle className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" /> {faq.q}
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-sans pl-5">
                            {faq.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CIVIL & ELECTRICAL DETAILED BLUEPRINTS */}
              {activeTab === 'engineering' && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
                      <Settings className="w-5 h-5 text-orange-400" /> Civil Anchoring &amp; Electrical Interconnection Blueprints
                    </h3>
                    <p className="text-xs text-slate-400">
                      Our structural teams manage rigid civil casting, load-balancing arrays, and electrical synchronizations to guarantee uninterrupted power dispatch.
                    </p>
                  </div>

                  {/* Structural Schematics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    
                    <div className="bg-slate-900/80 border border-slate-850 p-5 rounded-2xl flex flex-col justify-between">
                      <div className="space-y-3">
                        <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">Structural Schematic Blueprint</span>
                        <div className="h-28 bg-slate-950 border border-slate-850 rounded-xl relative overflow-hidden flex items-center justify-center">
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,#020617_1px,transparent_1px),linear-gradient(to_bottom,#020617_1px,transparent_1px)] bg-[size:15px_15px] opacity-40" />
                          <svg className="w-full h-full p-4 relative z-10" viewBox="0 0 200 80">
                            <line x1="20" y1="65" x2="180" y2="65" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1.5" />
                            <line x1="40" y1="65" x2="60" y2="35" stroke="#10B981" strokeWidth="1.5" />
                            <line x1="80" y1="65" x2="100" y2="35" stroke="#10B981" strokeWidth="1.5" />
                            <line x1="120" y1="65" x2="140" y2="35" stroke="#10B981" strokeWidth="1.5" />
                            <line x1="160" y1="65" x2="180" y2="35" stroke="#10B981" strokeWidth="1.5" />
                            <rect x="50" y="25" width="130" height="8" rx="2" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="1" transform="rotate(-10 50 25)" />
                            <path d="M100,5 L100,20" stroke="#F59E0B" strokeWidth="1" markerEnd="arrow" />
                            <text x="105" y="15" fill="#F59E0B" fontSize="6" fontFamily="monospace">WIND LOAD: 150 km/h</text>
                          </svg>
                        </div>
                        <h5 className="text-xs font-bold text-white mt-2">Wind Load Deflection Standards</h5>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          We execute mechanical testing using hot-dip galvanized structural brackets to resist up to 150 km/h gusts. Structural columns are securely anchored with heavy expansion fasteners.
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-850 p-5 rounded-2xl flex flex-col justify-between">
                      <div className="space-y-3">
                        <span className="text-[9px] font-mono text-blue-400 uppercase tracking-wider block font-bold">Electrical Grid Liaison Schematic</span>
                        <div className="h-28 bg-slate-950 border border-slate-850 rounded-xl relative overflow-hidden flex items-center justify-center">
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,#020617_1px,transparent_1px),linear-gradient(to_bottom,#020617_1px,transparent_1px)] bg-[size:15px_15px] opacity-40" />
                          <svg className="w-full h-full p-4 relative z-10" viewBox="0 0 200 80">
                            <rect x="15" y="25" width="35" height="20" rx="3" fill="#1E293B" stroke="#38BDF8" strokeWidth="1" />
                            <text x="20" y="37" fill="#38BDF8" fontSize="6" fontFamily="monospace">SOLAR PANEL</text>
                            <line x1="50" y1="35" x2="80" y2="35" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" />
                            <rect x="80" y="25" width="35" height="20" rx="3" fill="#1E293B" stroke="#10B981" strokeWidth="1" />
                            <text x="85" y="37" fill="#10B981" fontSize="6" fontFamily="monospace">INVERTER</text>
                            <line x1="115" y1="35" x2="145" y2="35" stroke="#10B981" strokeWidth="1.5" />
                            <circle cx="155" cy="35" r="12" fill="#1F2937" stroke="#F59E0B" strokeWidth="1.5" />
                            <text x="149" y="38" fill="#F59E0B" fontSize="6" fontFamily="monospace">METER</text>
                            <path d="M60,31 L70,31" stroke="#38BDF8" strokeWidth="1" />
                            <path d="M125,31 L135,31" stroke="#10B981" strokeWidth="1" />
                          </svg>
                        </div>
                        <h5 className="text-xs font-bold text-white mt-2">Bi-Directional Net-Meter Clearance</h5>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          We manage the entire liaison workflow with state DISCOMs (MGVCL, UGVCL, DGVCL, PGVCL, UPPCL, etc.). Includes the application, test report filings, and the ultimate bi-directional net-meter swapping.
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Step phase tracker */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-white">Our process</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {matchedService.process.map((step, idx) => (
                        <div key={idx} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl space-y-2">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold font-mono">{step.phase}</span>
                          <h5 className="text-sm font-bold text-slate-100 leading-snug pr-0">{step.title}</h5>
                          <p className="text-[11px] text-slate-400 leading-relaxed">{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: REGIONAL POLICIES */}
              {activeTab === 'policy' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
                      <Landmark className="w-5 h-5 text-orange-400" /> Regional Subsidy Frameworks
                    </h3>
                    <p className="text-xs text-slate-400">
                      Understand localized policies, net-meter rules, and direct state-level advantages to maximize return rates.
                    </p>
                  </div>

                  {/* Policy cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {matchedService.regionalPolicies.map((p, idx) => (
                      <div key={idx} className="bg-slate-900 border border-slate-850 p-4 rounded-2xl space-y-3 text-left">
                        <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-wider block bg-orange-500/5 px-2.5 py-1 border border-orange-500/10 rounded-md w-fit">
                          {p.state}
                        </span>
                        <h5 className="text-xs font-bold text-slate-200">{p.rule}</h5>
                        <p className="text-[10px] text-slate-400 leading-relaxed">{p.advantage}</p>
                      </div>
                    ))}
                  </div>

                  {/* Informational text content */}
                  <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-900 text-xs text-slate-300 space-y-3 leading-relaxed">
                    <span className="font-bold text-white text-sm block">Accredited Net-Meter Optimization &amp; Yield Calculations</span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      By analyzing regional solar indices (such as Gujarat's strong average peak sun hours), our systems are calibrated to align with DISCOM billing buckets. Under GERC (Gujarat Electricity Regulatory Commission) and CERC guidelines, installing modern high-yield N-Type TOPCon bifacial modules delivers strong long-term generation over the 30-year performance warranty, helping users approach energy self-sufficiency.
                    </p>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      For industrial players under C&amp;I structures, our engineering models leverage the corporate accelerated depreciation guidelines (Section 32 of Income Tax Act), providing capital expenditure offsets that bring the internal payback cycle to roughly 4 to 6 years.
                    </p>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Call To Action Box */}
      <div className="bg-gradient-to-r from-orange-600/10 via-amber-500/10 to-transparent border border-orange-500/20 rounded-3xl p-6 md:p-8 relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-6">
        <div className="space-y-1 max-w-xl">
          <span className="text-orange-400 text-xs font-mono font-black uppercase tracking-wider block">Ready for immediate clean energy?</span>
          <h4 className="text-lg font-bold text-white">Unlock savings under {matchedService.badge}</h4>
          <p className="text-slate-400 text-xs md:text-sm">
            Input your monthly consumption metrics inside our custom Savings Estimator workspace to instantly size your PV layout.
          </p>
        </div>
        <a
          href="#estimator"
          className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-black font-sans text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-orange-500/15"
        >
          Configure My System <ArrowRight className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
}
