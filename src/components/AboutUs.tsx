import React from 'react';
import { 
  Shield, Award, Users, HardDrive, Target, CheckCircle, 
  MapPin, Phone, Mail, Building, Landmark, Zap, Sparkles 
} from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutUs() {
  const values = [
    {
      icon: <Shield className="w-5 h-5 text-orange-400" />,
      title: 'Structural Safety First',
      desc: 'All rooftop structures undergo meticulous 3D finite element wind load analyses to resist category-4 cyclone forces.'
    },
    {
      icon: <Users className="w-5 h-5 text-emerald-400" />,
      title: 'Pune Local Engineers',
      desc: 'Local Pune-based certified engineering specialists ensure fast, same-day site surveys and grid synchronizations.'
    },
    {
      icon: <Target className="w-5 h-5 text-blue-400" />,
      title: 'Grade-A Sourcing',
      desc: 'We exclusively select ALMM approved Tier-1 TOPCon cells, smart microinverters, and heavy hot-dip galvanized mounting structures.'
    }
  ];

  const team = [
    {
      name: 'Er. Rajesh K. Sharma',
      role: 'Chief EPC Director',
      background: 'Ex-MSEDCL Grid Planning Officer with 18+ years of grid synchronization & utility substation design expertise.'
    },
    {
      name: 'Dr. Vivek S. Gokhale',
      role: 'Solar Design Architect',
      background: 'PhD in Photovoltaics from IIT Bombay. Leads structural simulation profiles and 3D shadow ray tracing algorithms.'
    }
  ];

  return (
    <div id="about-us-portal" className="space-y-16 text-left">
      
      {/* Visual Identity Hero Section */}
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-12 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1e293b_1px,transparent_1px)] bg-[size:30px_30px] opacity-[0.05]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Main Copy (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-orange-400 text-xs font-bold px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Corporate Dossier
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none font-sans">
              About UVR <br />
              <span className="bg-gradient-to-r from-orange-400 to-emerald-400 bg-clip-text text-transparent">Green Energies</span>
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Founded on the pillars of absolute transparency and state-of-the-art structural safety, UVR Green Energies has quickly become Pune’s premier residential and industrial turnkey solar EPC. 
            </p>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
              We specialize in custom elevated racking systems that maximize bifacial albedo gain and integrate with utility-scale central SCADA monitoring hubs. We streamline the entire governmental PM Surya Ghar subsidies process to deliver hassle-free zero-electricity bills.
            </p>

            {/* Corporate Quick Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
              <div className="text-center sm:text-left">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-orange-400 font-mono block">15 MW+</span>
                <span className="text-[10px] text-slate-500 font-mono uppercase">Grid-Synced Capacity</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-emerald-400 font-mono block">2,400+</span>
                <span className="text-[10px] text-slate-500 font-mono uppercase">Residential Rooftops</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-blue-400 font-mono block">100%</span>
                <span className="text-[10px] text-slate-500 font-mono uppercase">Subsidy Approval rate</span>
              </div>
            </div>
          </div>

          {/* Graphical Blueprint Card (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
              <Building className="w-5 h-5 text-orange-400" />
              <div>
                <h4 className="text-sm font-bold text-white">Central Operations Center</h4>
                <span className="text-[9px] text-slate-500 font-mono block">PUNE, MH, INDIA</span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>HQ Address:</strong> <br />
                  UVR Plaza, Sector-18, Shivajinagar, Pune, Maharashtra 411005
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Liaison Support:</strong> <br />
                  +91 (020) 4920-4411 / +91 98230-55110
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Corporate Desk:</strong> <br />
                  epc@uvrgreenenergies.com
                </span>
              </div>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-850 text-[10px] text-slate-500 leading-normal flex gap-2">
              <Landmark className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>
                <strong>Certified Registrar:</strong> Registered as Grade-A solar developer under MEDA (Maharashtra Energy Development Agency).
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Core Engineering Philosophies */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-orange-400 text-xs font-mono font-bold uppercase tracking-widest">Our Engineering DNA</span>
          <h3 className="text-2xl font-black text-white font-sans">Core Architectural Principles</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            We don't cut corners. UVR uses standard high-durability zinc coatings, certified DC SPD surge fuses, and premium thermal breakers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div key={i} className="bg-slate-950/40 border border-slate-900 p-6 rounded-2xl space-y-3.5">
              <div className="p-3 bg-slate-900 rounded-xl w-fit border border-slate-800">
                {v.icon}
              </div>
              <h4 className="text-sm font-bold text-white font-sans">{v.title}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Executive Team Spotlight */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest">Engineering Leadership</span>
          <h3 className="text-2xl font-black text-white font-sans">Executive Officers</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Spearheaded by accredited grid experts who interface with local utilities to make your rooftop solar journey stress-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <div key={i} className="bg-gradient-to-br from-slate-900/40 to-slate-950/60 border border-slate-850 p-6 rounded-2xl flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] text-orange-400 font-mono uppercase tracking-wider block font-bold">{member.role}</span>
                <h4 className="text-base font-black text-white font-sans">{member.name}</h4>
                <p className="text-slate-400 text-xs leading-relaxed pt-2">
                  {member.background}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-900/80 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                <span>LICENSED PROFESSIONAL</span>
                <span className="text-emerald-400">ID: UVR-{100 + i * 24}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
