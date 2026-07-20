import React, { useState } from 'react';
import { MapPin, Sparkles, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import existing generated hardware assets (real project photos pending — reuse generic panel imagery for now)
import uvrBifacialPanels from '../assets/images/uvr_bifacial_panels_1782761204892.jpg';
import uvrSmartInverter from '../assets/images/uvr_smart_inverter_1782761219437.jpg';

interface Project {
  id: string;
  title: string;
  city: string;
  capacity: string;
  panelsUsed: string;
  inverterUsed: string;
  annualYield: string;
  completed: string;
  imageUrl: string;
  category: 'Residential';
  description: string;
}

export default function GalleryShowcase() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Residential'>('All');

  // Founder-verified real projects only. Do NOT add fabricated names, capacities, or cities here.
  const projects: Project[] = [
    {
      id: 'p1',
      title: 'Milan Bharatkumar Vora — Residence',
      city: 'Anand, Gujarat',
      capacity: '5.53 kWp Rooftop',
      panelsUsed: '9x Adani Elan Shine TOPCon 615 Wp',
      inverterUsed: 'Solaryaan SYS 5.5 kW',
      annualYield: '~8,361 kWh/yr',
      completed: '09 Jun 2026',
      imageUrl: uvrBifacialPanels,
      category: 'Residential',
      description: "This 5.53 kWp residential solar project in Anand demonstrates UVR's commitment to high-quality rooftop solar. Featuring premium Adani TOPCon modules and a Solaryaan inverter, the system generates ~8,361 kWh annually — reliable clean energy and lower bills for the homeowner."
    },
    {
      id: 'p2',
      title: 'Shri Sujal Pareshbhai Shah — Residence',
      city: 'Vadodara, Gujarat',
      capacity: '25 kWp Rooftop',
      panelsUsed: '40x Adani Elan Shine TOPCon 625 Wp',
      inverterUsed: 'Solaryaan SYS 20 kW',
      annualYield: '~37,800 kWh/yr',
      completed: '28 May 2026',
      imageUrl: uvrSmartInverter,
      category: 'Residential',
      description: 'This 25 kWp rooftop system in Vadodara uses premium Adani Elan Shine TOPCon modules and a Solaryaan inverter for superior performance. Generating ~37,800 kWh annually, it lowers bills, cuts carbon, and creates lasting value.'
    }
  ];

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
          Completed Solar Installations
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          A look at real rooftop solar systems delivered by UVR Green Energies across Gujarat — with the modules, inverters, and verified annual generation for each site.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-900 pb-6">
        {(['All', 'Residential'] as const).map((cat) => (
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

                {/* Completion date badge (static — no live telemetry feed exists) */}
                <div className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur-md border border-slate-800/80 rounded-xl px-3 py-2 flex items-center gap-2 on-image-text on-image-badge">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <div className="font-mono text-left">
                    <span className="text-[8px] text-slate-400 block tracking-widest uppercase">Commissioned</span>
                    <span className="text-xs font-black text-emerald-400 block">{p.completed}</span>
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
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 sm:p-4 space-y-2.5 text-[11px] sm:text-xs">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5">
                    <span className="text-slate-500 shrink-0">Capacity</span>
                    <span className="text-slate-100 font-semibold sm:text-right">{p.capacity}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5">
                    <span className="text-slate-500 shrink-0">Modules</span>
                    <span className="text-slate-100 font-semibold sm:text-right break-words">{p.panelsUsed}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5">
                    <span className="text-slate-500 shrink-0">Inverter</span>
                    <span className="text-slate-100 font-semibold sm:text-right break-words">{p.inverterUsed}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5">
                    <span className="text-slate-500 shrink-0">Annual generation</span>
                    <span className="text-emerald-400 font-bold sm:text-right">{p.annualYield}</span>
                  </div>
                </div>

              </div>

            </motion.div>
          ))}

          {/* Placeholder for upcoming projects — no fabricated details */}
          <motion.div
            layout
            key="coming-soon"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-950/40 border border-dashed border-slate-800 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center p-10 min-h-[280px]"
          >
            <Sparkles className="w-6 h-6 text-orange-400/70 mb-3" />
            <h3 className="text-base font-bold text-white">More projects coming soon</h3>
            <p className="text-xs text-slate-400 leading-relaxed mt-2 max-w-xs">
              Additional residential and commercial case studies are being documented and will be published here shortly.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
