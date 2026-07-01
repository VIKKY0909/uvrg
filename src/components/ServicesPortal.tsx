import React, { useState, useEffect } from 'react';
import { 
  Home, Building2, Sun, Zap, ShieldCheck, ArrowRight, CheckCircle2, 
  Settings, Award, TrendingUp, Sparkles, AlertCircle, Play, Landmark, 
  MapPin, HelpCircle, HardDrive, Layout, Scale, Video, Activity,
  Sliders, Eye, CheckCircle, Database, ChevronRight, BarChart3, Radio, ArrowLeft
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
  seoKeywords: string[];
  regionalPolicies: { state: string; rule: string; advantage: string }[];
  videoTitle: string;
  videoDuration: string;
  videoResolution: string;
}

const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'residential',
    route: 'services/residential-solar-rooftop',
    icon: <Home className="w-6 h-6 text-orange-400" />,
    title: 'Residential Solar Rooftop Solutions',
    badge: 'PM Surya Ghar Yojana Compliant',
    shortDesc: 'Complete residential rooftop solar solutions featuring sleek glass-on-glass N-Type panels and automated net-metering liasons to wipe out household utility bills entirely.',
    tagline: 'Join India\'s Clean Energy Revolution & Save up to ₹78,000 in Central Subsidies',
    longDesc: 'Our residential systems are meticulously engineered to maximize roof space. We employ ultra-high efficiency TOPCon Dual-Glass Bifacial modules that generate power from both sides, catching secondary light reflecting from your roof tiles. Our engineers handle everything from LIDAR 3D shadow assessment, structural load analyses, civil foundation casting, to structural DISCOM clearances. This ensures you receive the maximum cash subsidy credited directly to your bank account under the PM Surya Ghar program.',
    keySpecs: [
      { label: 'Avg Sizing Range', value: '3 kWp to 15 kWp' },
      { label: 'Subsidy Support', value: '₹30k/kW (Up to ₹78,000)' },
      { label: 'ROI Payback Sla', value: '3.1 to 4.2 Years' },
      { label: 'Warranty Cover', value: '25 Yrs Performance' }
    ],
    process: [
      { phase: '01', title: 'LIDAR Feasibility Map', desc: 'Contactless drone scan evaluates physical roof shapes, tree shadows, and coordinates.' },
      { phase: '02', title: 'DISCOM NOC Clearance', desc: 'We submit digital load expansion approvals to your local utility board.' },
      { phase: '03', title: 'Monocrystalline Mounting', desc: 'Galvanized structure with structural anchoring is securely fixed on your roof.' },
      { phase: '04', title: 'Net-Meter Sync', desc: 'DISCOM installs bi-directional meter to credit exported excess units.' }
    ],
    faqs: [
      { q: 'Can I run central home air conditioners on residential solar?', a: 'Absolutely! A standard 5 kWp to 8 kWp residential array handles multiple heavy inverter AC units, water pumps, refrigerators, and modular home induction hubs with ease.' },
      { q: 'How long does the subsidy approval take?', a: 'Under the simplified PM Surya Ghar system, our team uploads compliance documents. The cash credit is disbursed within 30 to 45 working days post net-meter commissioning.' }
    ],
    seoKeywords: ['Surya Ghar solar subsidy Pune', 'residential solar net metering Noida', 'home rooftop solar systems Ahmedabad', 'rooftop solar panel installation cost India'],
    regionalPolicies: [
      { state: 'Maharashtra (MSEDCL)', rule: 'MERC Net Metering Guidelines 2024', advantage: 'Unused units are carried forward monthly and settled at average power purchase cost in March.' },
      { state: 'Gujarat (UGVCL/DGVCL)', rule: 'Surya Gujarat Scheme Integration', advantage: 'Fast-tracked net-metering dispatch cycles with central billing offsets completed in 20 days.' },
      { state: 'Uttar Pradesh (UPPCL)', rule: 'Rooftop Solar Portal 2.0 Policy', advantage: 'Simplified state-level single-window login with immediate structural feasibility clearances.' }
    ],
    videoTitle: 'LiDAR Drone Scanning & Panel Mount Assembly Walkthrough',
    videoDuration: '4 mins 12 secs',
    videoResolution: '1080p Full HD'
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
      { label: 'Array Capacities', value: '50 kWp to 2,000 kWp+' },
      { label: 'Tax Incentive', value: '40% Year 1 Depreciation' },
      { label: 'Tariff Reduction', value: 'Up to 65% Instant Savings' },
      { label: 'Financial Models', value: 'CAPEX / OPEX (RESCO)' }
    ],
    process: [
      { phase: '01', title: 'Load Profile Logging', desc: 'We capture active machinery startup transients and peak power factors.' },
      { phase: '02', title: 'Structural Lift Review', desc: 'Detailed structural test ensures safety loads under extreme wind shear.' },
      { phase: '03', title: 'CEIG Inspector NOC', desc: 'Liaisoning with electrical inspectors to permit heavy industrial syncing.' },
      { phase: '04', title: 'SCADA Remote Telemetry', desc: 'Live cloud dashboards monitor real-time string diagnostics and offsets.' }
    ],
    faqs: [
      { q: 'What is the RESCO / OPEX solar model?', a: 'Under RESCO, UVR installs, owns, and maintains the solar system on your roof at no cost to you. You simply purchase the generated electricity at a guaranteed cheap rate (e.g., ₹4.5/unit) for 15-25 years.' },
      { q: 'Does commercial solar qualify for tax benefits?', a: 'Yes! Commercial users can utilize the 40% Accelerated Depreciation tax shield, writing off a massive portion of the asset value in Year 1 to reduce corporate tax liabilities.' }
    ],
    seoKeywords: ['Industrial solar installer India', 'commercial solar EPC Pune', 'RESCO model factory solar Noida', 'Accelerated Depreciation solar benefit India'],
    regionalPolicies: [
      { state: 'Maharashtra (MSEDCL)', rule: 'Industrial Feed-in Tariff & Open Access', advantage: 'Allows offset of high industrial tariffs using behind-the-meter custom synchronization systems.' },
      { state: 'Gujarat (GEDA)', rule: 'Gujarat Solar Policy 2021 (C&I Section)', advantage: 'Zero electricity duty on solar power consumption for industrial units up to contracted load capacity.' },
      { state: 'NCR Region', rule: 'HARYANA & UP C&I Net Metering Laws', advantage: 'Virtual net metering allowed for corporate offices with decentralized warehouse assets.' }
    ],
    videoTitle: 'SCADA Telemetry System & Active Peak Shaving Case Study',
    videoDuration: '6 mins 45 secs',
    videoResolution: '4K Ultra HD'
  },
  {
    id: 'ground_mounted',
    route: 'services/ground-mounted-solar',
    icon: <Sun className="w-6 h-6 text-emerald-400" />,
    title: 'Ground-Mounted Solar Power Plants',
    badge: 'Turnkey IPP & Open Access Models',
    shortDesc: 'Engineered for developers, government organizations, and private investors. Utilizing automated mechanical trackers and advanced high-density soil anchoring.',
    tagline: 'High-Volume Energy Harvesting via Custom Engineered Open Ground Arrays',
    longDesc: 'Ground-mounted installations require sophisticated civil engineering and topographical analysis. From contour mapping, pull-out testing for concrete pile foundations, to solar tracking engineering, UVR provides a unified turnkey solution. We implement open-access models allowing heavy power users to set up solar farms in remote rural regions and wheel the generated electricity over the state DISCOM grid directly to their urban assets.',
    keySpecs: [
      { label: 'Minimum Scaling', value: '500 kWp to 50 MWp+' },
      { label: 'Foundation Tech', value: 'Rammed Pile / Cast Concrete' },
      { label: 'Tracking Options', value: 'Single-Axis Active Tracking' },
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
      { q: 'Are your ground mounting structures corrosion proof?', a: 'We exclusively use Hot-Dip Galvanized Iron (HDGI) or anodized structural aluminum with a zinc coating thickness exceeding 80 microns, guaranteeing zero rust for 30 years.' }
    ],
    seoKeywords: ['Ground mounted solar plant developers', 'solar open access MW scale', 'solar farm EPC India', 'open access solar Maharashtra wheeling charges'],
    regionalPolicies: [
      { state: 'Maharashtra', rule: 'MERC Open Access Regulations 2024', advantage: 'Favorable cross-subsidy surcharge waivers for green power developers setting up solar farms in Vidarbha.' },
      { state: 'Karnataka', rule: 'KERC Green Energy Open Access Policy', advantage: 'Zero wheeling charges for developers wheeling energy within the same state distribution zone.' },
      { state: 'Rajasthan', rule: 'RVUNL Grid Synchronization Portal', advantage: 'Fast-tracked land acquisition pathways with custom grid allocation codes in Jodhpur and Barmer.' }
    ],
    videoTitle: 'Single-Axis Tracker Calibration & High-Pressure Piling Operations',
    videoDuration: '8 mins 15 secs',
    videoResolution: '1080p Full HD'
  },
  {
    id: 'utility_scale',
    route: 'services/utility-scale-solar',
    icon: <Zap className="w-6 h-6 text-purple-400" />,
    title: 'Utility-Scale Solar EPC',
    badge: 'MW-Scale Substations & O&M',
    shortDesc: 'Comprehensive EPC contracting for massive MW-scale national grid arrays. Includes substation setups, high-voltage transmission lines, and automated diagnostic SCADA centers.',
    tagline: 'Unified National Grid Syncing with Grade-A High Voltage Transmission Systems',
    longDesc: 'At the utility scale, minor engineering efficiencies dictate millions in annual returns. UVR Green Energies coordinates massive multi-megawatt projects with clinical execution. Our scope encompasses grid feasibility calculations, substation construction (up to 132kV), string-level IoT analytics, and high-frequency inverter duty transformer syncing. We combine advanced hardware with proactive Operation & Maintenance (O&M) programs featuring robotic, waterless cleaning systems.',
    keySpecs: [
      { label: 'Execution Scope', value: 'Complete Turnkey EPC' },
      { label: 'Substation Spec', value: '11kV / 33kV / 132kV Setups' },
      { label: 'Module Density', value: '650Wp+ TOPCon Bifacial' },
      { label: 'Active Support', value: '24/7 SCADA Telemetry Control' }
    ],
    process: [
      { phase: '01', title: 'Grid Connectivity NOC', desc: 'Acquiring absolute grid feed clearances from State Transmission Utilities.' },
      { phase: '02', title: 'Megawatt Procurement', desc: 'Global Tier-1 module, tracker, and central inverter supply chain alignment.' },
      { phase: '03', title: 'Substation Building', desc: 'High-voltage transformer installation, vacuum circuit breakers, and isolators.' },
      { phase: '04', title: 'Automation Center', desc: 'Robotic cleaning integration and string-level fault-finding SCADA deployment.' }
    ],
    faqs: [
      { q: 'What O&M protocols are followed for MW plants?', a: 'We deploy localized maintenance squads, aerial thermal drone scans to identify micro-cracks or hot spots, and waterless robotic cleaners that clean arrays nightly with zero scratch risk.' },
      { q: 'How is reactive power compensation handled?', a: 'Our systems use advanced central smart inverters coupled with dynamic shunt capacitor banks to maintain power factors close to unity, preventing utility fines.' }
    ],
    seoKeywords: ['Utility scale solar EPC India', 'MW solar project contractor', 'solar substation liaisoning', 'waterless robotic solar panel cleaning'],
    regionalPolicies: [
      { state: 'Central Govt (CERC)', rule: 'National Grid Connectivity Regulations', advantage: 'Inter-State Transmission System (ISTS) charge waiver for projects commissioned before Dec 2025.' },
      { state: 'SEC / NTPC', rule: 'National Clean Energy PPA Tenders', advantage: 'Standardized sovereign contracts providing 25-year risk-free energy purchase backing.' },
      { state: 'State-wide Grids', rule: 'Dynamic ABT (Availability Based Tariff)', advantage: 'Real-time frequency balancing software synchronizes output values automatically to avoid penalties.' }
    ],
    videoTitle: '132kV Substation Commissioning & Robotic Waterless Cleaning Systems',
    videoDuration: '9 mins 50 secs',
    videoResolution: '4K Ultra HD'
  }
];

interface ServicesPortalProps {
  activeSubPage?: string;
}

export default function ServicesPortal({ activeSubPage }: ServicesPortalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'engineering' | 'policy' | 'interactive'>('overview');
  const [isDemoPlaying, setIsDemoPlaying] = useState<boolean>(true);

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

  // Telemetry logs generator based on the active service
  const getTelemetryLog = (id: string) => {
    switch (id) {
      case 'residential':
        return [
          { time: '13:30:12', msg: 'Drone 3D LiDAR feed synchronized at Pune HQ', type: 'info' },
          { time: '13:30:15', msg: 'Roof clearance boundary mapped: 840 sq ft', type: 'success' },
          { time: '13:30:19', msg: 'Calculated annual solar irradiance index: 1,842 kWh/m²', type: 'info' },
          { time: '13:30:22', msg: 'Surya Ghar subsidy approval pipeline initialized', type: 'success' },
        ];
      case 'commercial':
        return [
          { time: '13:30:12', msg: 'SCADA Node 18 active at GIDC Engineering Wing', type: 'info' },
          { time: '13:30:16', msg: 'Factory load profile analyzed: peak transients at 450A', type: 'info' },
          { time: '13:30:20', msg: 'Year 1 Accelerated Depreciation calculations validated', type: 'success' },
          { time: '13:30:24', msg: 'Inverter harmonic distortion reading: 1.8% (OK)', type: 'success' },
        ];
      case 'ground_mounted':
        return [
          { time: '13:30:12', msg: 'Soil compaction pull-out test complete at site B7', type: 'success' },
          { time: '13:30:17', msg: 'Single-axis tracker tracking angle adjusted: +34.2°', type: 'info' },
          { time: '13:30:21', msg: 'Hydrological runoff model computed (100-year rain SLA)', type: 'success' },
          { time: '13:30:25', msg: 'Grid wheeling loss index calibrated at 2.45%', type: 'info' },
        ];
      default:
        return [
          { time: '13:30:12', msg: 'Substation 132kV SF6 circuit breaker pressure: 5.2 bar', type: 'success' },
          { time: '13:30:16', msg: 'Robotic cleaning array 4 initiated: waterless mode', type: 'info' },
          { time: '13:30:21', msg: 'Central SCADA system syncing 35,000 panel segments', type: 'info' },
          { time: '13:30:26', msg: 'Dynamic frequency response within tolerance (+/- 0.02 Hz)', type: 'success' },
        ];
    }
  };

  // If no specific sub-route is requested, display the majestic, SEO-rich Services directory landing
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
              UVR Green Energies provides end-to-end feasibility, grid integration, structural engineering, and regulatory clearance across residential, industrial, ground-mounted, and utility power distribution scales. Click any service to enter its standalone dedicated page.
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

              <div className="pt-4 border-t border-slate-900/60 flex items-center justify-between">
                {/* SEO Rich keywords tag line inside card */}
                <span className="text-[9px] font-mono text-slate-600 truncate max-w-[180px]">
                  SEO: {srv.seoKeywords[0]}
                </span>
                <button 
                  onClick={() => { window.location.hash = `#${srv.route}`; }}
                  className="px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold flex items-center gap-1.5 group-hover:bg-orange-500 group-hover:text-slate-950 transition-all duration-300"
                >
                  Enter Subpage <ArrowRight className="w-3.5 h-3.5" />
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
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> MNRE ALMM Grade-A
            </span>
            <p className="text-[11px] text-slate-500">
              Only using top-ranked Tier 1 modules listed on the Government's Approved List of Models and Manufacturers.
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

  // --- STANDALONE TOTALLY DIFFERENT SUBPAGE VIEW ---
  const activeLogFeed = getTelemetryLog(matchedService.id);

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
        <span className="hidden sm:inline text-[10px] font-mono text-slate-500 bg-slate-950 border border-slate-900 px-3 py-1 rounded-md truncate max-w-xs">
          ROUTE: /{matchedService.route}
        </span>
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
                { id: 'interactive' as const, label: '04. Video Feed', short: 'Video' },
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
                          <span className="text-sm font-black text-white font-mono block mt-1">₹{(residentialKw * 65000).toLocaleString('en-IN')}</span>
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
                            ₹{((residentialKw * 65000) - (residentialKw <= 2 ? residentialKw * 30000 : (residentialKw === 3 ? 78000 : 78000))).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-500 leading-normal bg-slate-950 p-3 rounded-lg border border-slate-900">
                        *Calculated using standardized Pune domestic utility pricing index (₹65,000 per kW). The PM Surya Ghar subsidy provides ₹30,000 per kW for up to 2kW, and ₹18,000 for the 3rd kW.
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
                          We manage the entire liasion workflow with state DISCOMs (MSEDCL, UGVCL, UPPCL, etc.). Includes the application, test report filings, and the ultimate bi-directional net-meter swapping.
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Step phase tracker */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">Our Operational Lifecycle</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {matchedService.process.map((step, idx) => (
                        <div key={idx} className="bg-slate-900/50 border border-slate-900 p-4 rounded-xl relative space-y-2">
                          <span className="absolute top-3 right-3 text-2xl font-black font-mono text-slate-800/80 leading-none select-none">{step.phase}</span>
                          <h5 className="text-xs font-bold text-slate-200 relative z-10">{step.title}</h5>
                          <p className="text-[10px] text-slate-500 leading-relaxed relative z-10">{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: REGIONAL POLICIES & HIGH-VOLTAGE SEO CONTENT */}
              {activeTab === 'policy' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
                      <Landmark className="w-5 h-5 text-orange-400" /> Regional Subsidy Frameworks &amp; SEO Guides
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

                  {/* Informational SEO text content */}
                  <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-900 text-xs text-slate-300 space-y-3 leading-relaxed">
                    <span className="font-bold text-white text-sm block">Accredited Net-Meter Optimization &amp; Yield Calculations</span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      By analyzing regional solar indices (such as Pune's average 5.2 peak sun hours per day), our systems are calibrated specifically to align with DISCOM billing buckets. Under the MERC (Maharashtra Electricity Regulatory Commission) and CERC guidelines, installing modern high-yield N-Type solar cell modules guarantees up to 15% more power over the standard 25-year performance SLA, allowing users to achieve complete self-sustainability quickly.
                    </p>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      For industrial players under C&amp;I structures, our engineering models leverage the corporate accelerated depreciation guidelines (Section 32 of Income Tax Act), providing immediate capital expenditure offsets that speed up the internal payback cycles from 5 years to less than 3.5 years.
                    </p>
                  </div>

                  {/* SEO Metadata indexing visualization */}
                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-900 text-[9px] font-mono text-slate-600">
                    <span>SEO INDEX TAGS:</span>
                    {matchedService.seoKeywords.map((tag, idx) => (
                      <span key={idx} className="bg-slate-900 px-2 py-0.5 rounded border border-slate-850 uppercase text-[8px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: MOCK VIDEO WALKTHROUGH & ACTIVE SCADA PANEL */}
              {activeTab === 'interactive' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
                      <Video className="w-5 h-5 text-orange-400" /> Live Installation Drone Footage &amp; Telemetry
                    </h3>
                    <p className="text-xs text-slate-400">
                      Watch our automated engineering squads in action. From contactless 3D LiDAR drone scanning to substation synchronizations.
                    </p>
                  </div>

                  {/* Interactive Video Player Mockup with running coordinates and telemetry overlays */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                    
                    {/* Visual Player (8 Cols) */}
                    <div className="md:col-span-8 bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden relative min-h-[220px] flex flex-col justify-between">
                      {/* Grid lines to make it look technical */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,41,59,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,0.2)_1px,transparent_1px)] bg-[size:25px_25px]" />
                      
                      {/* Interactive Scan Line Effect */}
                      {isDemoPlaying && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50 shadow-[0_0_10px_#10b981] animate-bounce" />
                      )}

                      {/* Video Player Header Overlay */}
                      <div className="relative z-10 p-4 flex justify-between items-center bg-gradient-to-b from-slate-950/80 to-transparent image-scrim-soft on-image-text">
                        <div className="flex items-center gap-2">
                          <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                          <span className="text-[10px] font-mono text-white uppercase tracking-wider">{matchedService.videoTitle}</span>
                        </div>
                        <span className="text-[9px] font-mono bg-slate-950 px-2 py-0.5 border border-slate-800 text-slate-400 rounded">
                          {matchedService.videoResolution}
                        </span>
                      </div>

                      {/* Video Central Play Button or Animated Graphic */}
                      <div className="relative z-10 flex flex-col items-center justify-center py-10">
                        {isDemoPlaying ? (
                          <div className="space-y-3 text-center">
                            <div className="w-16 h-16 rounded-full border border-emerald-500/30 flex items-center justify-center mx-auto relative">
                              <div className="absolute inset-0 rounded-full border border-emerald-500/60 animate-ping" />
                              <Eye className="w-6 h-6 text-emerald-400" />
                            </div>
                            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block animate-pulse">Scanning Active Field...</span>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setIsDemoPlaying(true)}
                            className="w-14 h-14 rounded-full bg-orange-500 text-slate-950 flex items-center justify-center hover:scale-105 transition-all shadow-xl shadow-orange-500/20"
                          >
                            <Play className="w-6 h-6 fill-slate-950 pl-0.5" />
                          </button>
                        )}
                      </div>

                      {/* Video Player Bottom Controls Overlay */}
                      <div className="relative z-10 p-4 bg-gradient-to-t from-slate-950/90 to-transparent image-scrim-soft on-image-text flex justify-between items-center text-[10px] font-mono text-slate-400">
                        <button
                          onClick={() => setIsDemoPlaying(!isDemoPlaying)}
                          className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
                        >
                          {isDemoPlaying ? 'Pause Video' : 'Stream Live Footage'}
                        </button>
                        <span>Time remaining: {matchedService.videoDuration}</span>
                      </div>
                    </div>

                    {/* Telemetry Logs Panel (4 Cols) */}
                    <div className="md:col-span-4 bg-slate-900/40 border border-slate-850 p-4.5 rounded-2xl flex flex-col justify-between">
                      <div className="space-y-3.5">
                        <div className="flex items-center gap-1.5 border-b border-slate-800/80 pb-2.5">
                          <Activity className="w-4 h-4 text-emerald-400" />
                          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider font-mono">SCADA Log Feed</span>
                        </div>

                        {/* Running logs list */}
                        <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                          {activeLogFeed.map((log, idx) => (
                            <div key={idx} className="text-[9px] font-mono border-b border-slate-950/20 pb-1.5 leading-normal">
                              <span className="text-slate-500 mr-1.5">[{log.time}]</span>
                              <span className={log.type === 'success' ? 'text-emerald-400' : 'text-slate-300'}>
                                {log.msg}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Active system details */}
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-850/80 space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-mono">
                          <span className="text-slate-500">Node Status:</span>
                          <span className="text-emerald-400 font-bold uppercase">Online &amp; Sync</span>
                        </div>
                        <div className="flex justify-between items-center text-[9px] font-mono">
                          <span className="text-slate-500">Latency Link:</span>
                          <span className="text-slate-300 font-bold">14.2 ms</span>
                        </div>
                      </div>
                    </div>

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
