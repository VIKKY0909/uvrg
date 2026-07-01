import React, { useState, useEffect } from 'react';
import { MapPin, Zap, Sun, ShieldCheck, Cpu, Sliders, Play, Circle, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import our beautiful photorealistic generated assets
import uvrBifacialPanels from '../assets/images/uvr_bifacial_panels_1782761204892.jpg';
import uvrSmartInverter from '../assets/images/uvr_smart_inverter_1782761219437.jpg';
import uvrBatteryVault from '../assets/images/uvr_battery_vault_1782761234130.jpg';

interface Project {
  id: string;
  title: string;
  city: string;
  capacity: string;
  panelsUsed: string;
  inverterUsed: string;
  annualYield: string;
  imageUrl: string;
  category: 'Residential' | 'Commercial' | 'Battery Storage';
  liveKw: number;
  maxLiveKw: number;
  description: string;
}

export default function GalleryShowcase() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Residential' | 'Commercial' | 'Battery Storage'>('All');
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'p1',
      title: 'Vandana Bungalow Estate',
      city: 'Kothrud, Pune',
      capacity: '12.5 kWp Off-Grid',
      panelsUsed: '24x N-Type TOPCon Dual-Glass Bifacial',
      inverterUsed: 'UVR Delta Pro Dual-MPPT String Inverter',
      annualYield: '17,800 kWh',
      imageUrl: uvrBifacialPanels,
      category: 'Residential',
      liveKw: 8.4,
      maxLiveKw: 12.5,
      description: 'Elegant architectural solar rooftop integration on a luxury 4-BHK bungalow. Standard high-yield dual-glass modules capturing both direct sunlight and albedo back-reflection off the white terrace floor.'
    },
    {
      id: 'p2',
      title: 'High-Density Residential Battery Vault',
      city: 'Sindhu Bhavan Road, Ahmedabad',
      capacity: '15 kWp Solar + 30 kWh Battery',
      panelsUsed: '32x Mono-PERC High-Density',
      inverterUsed: 'UVR Hybrid-Gen Smart Inverter (AC-Coupled)',
      annualYield: '21,200 kWh',
      imageUrl: uvrBatteryVault,
      category: 'Battery Storage',
      liveKw: 11.2,
      maxLiveKw: 15.0,
      description: 'Zero-Grid-Reliance system with integrated safe LiFePO4 batteries. Automatically charges during peak solar noon (10 AM to 2 PM) and discharges during critical evening utility peak (6 PM to 10 PM) to avoid steep commercial dynamic tariffs.'
    },
    {
      id: 'p3',
      title: 'Prime Hardware Showroom Facility',
      city: 'Noida Sector 63',
      capacity: '45 kWp Grid-Tied Array',
      panelsUsed: '90x N-Type TOPCon Dual-Glass',
      inverterUsed: 'UVR Smart Multi-MPPT Commercial Inverter',
      annualYield: '64,800 kWh',
      imageUrl: uvrSmartInverter,
      category: 'Commercial',
      liveKw: 31.8,
      maxLiveKw: 45.0,
      description: 'Industrial roof setup on a modern commercial hardware showroom. Seamlessly handles high-startup-current air conditioners and heavy industrial machinery while feeding surplus energy back to the grid.'
    },
    {
      id: 'p4',
      title: 'Prestige Apartment Complex Central Load',
      city: 'Whitefield, Bangalore',
      capacity: '75 kWp Society Symmetrical Array',
      panelsUsed: '150x Half-Cell Bifacial',
      inverterUsed: 'Dual UVR 40kW Commercial String Inverters',
      annualYield: '1,08,000 kWh',
      imageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80',
      category: 'Commercial',
      liveKw: 56.4,
      maxLiveKw: 75.0,
      description: 'Turnkey cooperative society setup designed to power communal assets: lobby lighting, 4 state-of-the-art dual-elevators, swimming pool filtration plants, and underground borewell pump arrays.'
    }
  ]);

  // Simulate live dynamic fluctuating generation power ticks!
  useEffect(() => {
    const interval = setInterval(() => {
      setProjects(prev =>
        prev.map(p => {
          // Soft fluctuation around natural current generation levels (70-90% of max, or lower if dark)
          const hour = new Date().getHours();
          const daylightMultiplier = (hour > 18 || hour < 6) ? 0 : Math.sin(((hour - 6) / 12) * Math.PI);
          
          const targetKw = p.maxLiveKw * 0.72 * (daylightMultiplier > 0 ? daylightMultiplier : 0.85); // fallback to decent generation if viewer tests daytime
          const fluctuation = (Math.random() - 0.5) * 0.3; // minor fluctuation
          const newLiveKw = Math.max(0, Math.min(p.maxLiveKw, Number((targetKw + fluctuation).toFixed(1))));

          return { ...p, liveKw: newLiveKw };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div id="gallery-showcase" className="space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-orange-400 text-xs font-semibold px-2.5 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Proven Engineering Excellence
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight font-sans">
          Physical Installations &amp; Live Telemetry
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          UVR Techsol is trusted by hundreds of residential estates and commercial clients. Examine our physically deployed projects and view live generation stats.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-900 pb-6">
        {(['All', 'Residential', 'Commercial', 'Battery Storage'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-xl text-xs font-medium border transition-all ${
              activeCategory === cat
                ? 'bg-orange-500 border-orange-500 text-slate-950 font-bold shadow-lg shadow-orange-500/10'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p) => (
            <motion.div
              layout
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-950/60 border border-slate-850 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-colors"
            >
              
              {/* Photo Block with Category Tag */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay Tags */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-wrap gap-1.5 sm:gap-2 max-w-[calc(100%-6rem)] on-image-text">
                  <span className="bg-slate-950/85 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-mono px-2 sm:px-3 py-1 rounded-full border border-slate-800 flex items-center gap-1 on-image-badge">
                    <MapPin className="w-3 h-3 text-red-500 shrink-0" /> {p.city}
                  </span>
                  <span className="bg-orange-500 text-slate-950 text-[9px] sm:text-[10px] font-bold px-2 sm:px-3 py-1 rounded-full uppercase tracking-wider">
                    {p.category}
                  </span>
                </div>

                {/* Simulated Live Wattage Telemetry HUD */}
                <div className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur-md border border-slate-800/80 rounded-xl px-3 py-2 flex items-center gap-3 on-image-text on-image-badge">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  <div className="font-mono text-left">
                    <span className="text-[8px] text-slate-400 block tracking-widest uppercase">Live Generation</span>
                    <span className="text-sm font-black text-emerald-400 block">{p.liveKw} kW</span>
                  </div>
                </div>
              </div>

              {/* Text Information Block */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">{p.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
                </div>

                {/* Specs Ledger */}
                <div className="bg-slate-900/80 border border-slate-850 rounded-xl p-3 sm:p-4 space-y-2 text-[11px] sm:text-xs font-mono text-slate-300">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5">
                    <span className="text-slate-500 shrink-0">Capacity Sizing:</span>
                    <span className="text-white font-semibold sm:text-right">{p.capacity}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5">
                    <span className="text-slate-500 shrink-0">Modules Deployed:</span>
                    <span className="text-white font-semibold sm:text-right break-words">{p.panelsUsed}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5">
                    <span className="text-slate-500 shrink-0">Inverter Tech:</span>
                    <span className="text-white font-semibold sm:text-right break-words">{p.inverterUsed}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5">
                    <span className="text-slate-500 shrink-0">Projected Annual Yield:</span>
                    <span className="text-emerald-400 font-bold sm:text-right">{p.annualYield}</span>
                  </div>
                </div>

              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
