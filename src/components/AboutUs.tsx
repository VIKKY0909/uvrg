import React from 'react';
import { 
  Shield, Award, Users, Target, 
  MapPin, Phone, Mail, Building, Landmark, Sparkles 
} from 'lucide-react';

export default function AboutUs() {
  const values = [
    {
      icon: <Shield className="w-5 h-5 text-orange-400" />,
      title: 'Reliable Execution',
      desc: 'As an MNRE-approved Solar EPC partner, we deliver engineered, safety-first rooftop and ground-mounted systems built for long-term performance.'
    },
    {
      icon: <Users className="w-5 h-5 text-emerald-400" />,
      title: 'Gujarat-Based Team',
      desc: 'Our Vadodara-based certified engineering and projects teams provide free professional site surveys and dependable on-ground execution across Gujarat and beyond.'
    },
    {
      icon: <Target className="w-5 h-5 text-blue-400" />,
      title: 'Quality Sourcing',
      desc: 'We use ALMM List-II approved modules, Mono PERC & N-Type TOPCon bifacial panels, and hot-dip galvanized / anodised aluminium mounting structures.'
    }
  ];

  // Role-only leadership cards. Founder-verified personal names were not provided,
  // so no individual names or photos are shown here (do not fabricate).
  const team = [
    {
      role: 'Founder & CEO',
      background: 'Leads the vision and overall strategy of UVR Green Energies, driving the company’s mission to make clean solar energy accessible and reliable.'
    },
    {
      role: 'Head — Engineering & Design',
      background: 'Oversees system design, module and inverter selection, and technical quality across residential, C&I and ground-mounted projects.'
    },
    {
      role: 'Head — Projects',
      background: 'Manages end-to-end project execution — site surveys, installation, net-metering coordination and after-sales support.'
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
              UVR Green Energies is a trusted, MNRE-approved Solar EPC company based in Vadodara, Gujarat. Founded on 28 July 2023, we deliver innovative, efficient and sustainable energy solutions for residential, commercial, industrial and ground-mounted projects.
            </p>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
              By combining advanced technology, engineering expertise and reliable execution, we empower our clients to reduce electricity costs while contributing to a cleaner, greener future. We provide end-to-end subsidy documentation support through the PM Surya Ghar: Muft Bijli Yojana. Powered by UVR TECHSOL Pvt. Ltd.
            </p>

            {/* Corporate Quick Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
              <div className="text-center sm:text-left">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-orange-400 font-mono block">7 MW+</span>
                <span className="text-[10px] text-slate-500 font-mono uppercase">Installed Capacity</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-emerald-400 font-mono block">1200+</span>
                <span className="text-[10px] text-slate-500 font-mono uppercase">Installations</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-blue-400 font-mono block">1.05 Cr+</span>
                <span className="text-[10px] text-slate-500 font-mono uppercase">Units / Year</span>
              </div>
            </div>
          </div>

          {/* Graphical Blueprint Card (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
              <Building className="w-5 h-5 text-orange-400" />
              <div>
                <h4 className="text-sm font-bold text-white">Head Office</h4>
                <span className="text-[9px] text-slate-500 font-mono block">VADODARA, GUJARAT, INDIA</span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>HQ Address:</strong> <br />
                  423, Vihav Trade Center, B/s Waves Clube, Vasna–Bhayli Canal Road, Bhayli, Vadodara, Gujarat 391410
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Phone:</strong> <br />
                  +91 95375 66799 / +91 97373 66799
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
                <strong>Legal Entity:</strong> UVR TECHSOL PRIVATE LIMITED · CIN U35105GJ2023PTC143414 · GSTIN 24AADCU3820C1ZV. MNRE empanelled; registered with GEDA (Gujarat Energy Development Agency).
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Core Engineering Philosophies */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-orange-400 text-xs font-mono font-bold uppercase tracking-widest">Our Engineering DNA</span>
          <h3 className="text-2xl font-black text-white font-sans">Core Principles</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            We don't cut corners. UVR is certified to ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018, uses ALMM List-II modules, and holds Electrical Contractor and Supervisor Licences.
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

      {/* Leadership — role cards only until founder provides named headshots */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">How we deliver</span>
          <h3 className="text-2xl font-black text-white font-sans">Leadership roles</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Dedicated ownership across strategy, engineering and on-site execution — so your project stays clear from survey to commissioning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {team.map((member, i) => (
            <div key={i} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6 flex flex-col gap-3">
              <span className="text-[11px] text-orange-400 font-semibold uppercase tracking-wider">UVR Green Energies</span>
              <h4 className="text-base font-bold text-white font-sans">{member.role}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{member.background}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications & Awards */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-orange-400 text-xs font-mono font-bold uppercase tracking-widest">Recognition</span>
          <h3 className="text-2xl font-black text-white font-sans">Certifications & Awards</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-slate-950/40 border border-slate-900 p-6 rounded-2xl space-y-3.5">
            <div className="p-3 bg-slate-900 rounded-xl w-fit border border-slate-800">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-white font-sans">Certifications & Registrations</h4>
            <ul className="text-slate-400 text-xs leading-relaxed space-y-1.5 list-disc pl-4">
              <li>ISO 9001:2015, ISO 14001:2015 & ISO 45001:2018</li>
              <li>MNRE empanelled Solar EPC · ALMM List-II modules</li>
              <li>GEDA registered (C&I) · PM Surya Ghar National Portal (Residential/RWA/GHS)</li>
              <li>Electrical Contractor & Supervisor Licences</li>
            </ul>
          </div>
          <div className="bg-slate-950/40 border border-slate-900 p-6 rounded-2xl space-y-3.5">
            <div className="p-3 bg-slate-900 rounded-xl w-fit border border-slate-800">
              <Award className="w-5 h-5 text-orange-400" />
            </div>
            <h4 className="text-sm font-bold text-white font-sans">Awards</h4>
            <ul className="text-slate-400 text-xs leading-relaxed space-y-1.5 list-disc pl-4">
              <li>Mirchi Business Class Awards — Excellence in Solar Rooftop Services</li>
              <li>TIME Icons of Vadodara 2025 — Excellence in Solar Rooftop Services</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
