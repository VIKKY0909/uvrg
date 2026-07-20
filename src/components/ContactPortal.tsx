import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, HelpCircle, Calendar, Clock, Star, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Site-survey visual (professional on-site roof assessment)
import uvrSiteSurvey from '../assets/images/uvr_drone_survey_1782761249090.jpg';

interface BranchOffice {
  city: string;
  role: string;
  address: string;
  phone: string;
  email: string;
  mapUrl?: string;
}

// Head Office (Vadodara) + real branch network — founder-verified (FACTS §3)
const BRANCH_OFFICES: BranchOffice[] = [
  {
    city: 'Vadodara (Head Office)',
    role: 'Registered Office · Turnkey EPC & Engineering',
    address: '423, Vihav Trade Center, B/s Waves Clube, Vasna–Bhayli Canal Road, Bhayli, Vadodara, Gujarat – 391410',
    phone: '+91 95375 66799',
    email: 'info@uvrgreenenergies.com',
    mapUrl: 'https://maps.app.goo.gl/Lkd9TPZJzVYYF1bm7'
  },
  {
    city: 'Kosamba Branch',
    role: 'Surat Region Operations',
    address: '1st Floor, Near Mahavir Society, At-Po: Tarsadi, Village: Tarsadi, Taluka: Mangrol, Dist: Surat, Gujarat – 394120',
    phone: '+91 97141 66799',
    email: 'epc@uvrgreenenergies.com'
  },
  {
    city: 'Nadiad Branch',
    role: 'Kheda Region Operations',
    address: 'F-20, Rudraksh-1 Complex, Adinar Chokdi, Nadiad–Dakor Road, Village: Alindra, Taluka: Nadiad, Dist: Kheda, Gujarat',
    phone: '+91 97141 46799',
    email: 'epc@uvrgreenenergies.com'
  },
  {
    city: 'Noida Branch',
    role: 'North India (UP) Operations',
    address: 'T3A-301, NX One, Plot No. 17, Sector Techzone-4, Greater Noida (West), UP – 201306',
    phone: '+91 97148 66799',
    email: 'epc@uvrgreenenergies.com'
  },
  {
    city: 'Halol Branch',
    role: 'Panchmahal Region Operations',
    address: 'Address coming soon',
    phone: '+91 95375 66799',
    email: 'epc@uvrgreenenergies.com'
  },
  {
    city: 'Indore Branch',
    role: 'Madhya Pradesh Operations',
    address: 'Address coming soon',
    phone: '+91 97141 26799',
    email: 'epc@uvrgreenenergies.com'
  }
];

export default function ContactPortal() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    roofType: 'Flat RCC Concrete',
    preferredDate: '',
    preferredTime: 'Morning (10 AM - 1 PM)',
    comments: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) return;
    setSubmitted(true);
  };

  return (
    <div id="contact-portal" className="space-y-12">
      
      {/* Banner */}
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 overflow-hidden shadow-xl text-left">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:35px_35px] opacity-[0.05]" />
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-orange-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-orange-400 text-xs font-semibold px-2.5 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Zero-Error Site Feasibility
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none font-sans">
            Let's Engineer Your <br />
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Solar Freedom</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Ready to cut down your electricity bills? Book your slot for a comprehensive free professional on-site survey — our engineers assess your roof, shading and load to size the ideal system.
          </p>
        </div>
      </div>

      {/* Main Grid: Form vs Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950/60 border border-slate-850 p-6 md:p-8 rounded-2xl text-left">
          <div className="flex items-center gap-2.5 mb-2">
            <Calendar className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-bold text-white font-sans">Request Your Free Site Survey</h3>
          </div>
          <p className="text-xs text-slate-400 mb-6">
            Fill in the details below. Our operations team will coordinate a convenient time and send a qualified engineer to survey your roof, shading and electrical load.
          </p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1.5 font-mono">YOUR FULL NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amit Patel"
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1.5 font-mono">MOBILE NUMBER</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1.5 font-mono">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rajesh@gmail.com"
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1.5 font-mono">ROOFTOP STRUCTURE TYPE</label>
                    <select
                      value={formData.roofType}
                      onChange={e => setFormData(prev => ({ ...prev, roofType: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
                    >
                      <option value="Flat RCC Concrete">Flat RCC Concrete</option>
                      <option value="Metal Sheet Roof">Metal Sheet Roof</option>
                      <option value="Tiled Roof">Tiled Roof</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1.5 font-mono">INSTALLATION SITE ADDRESS</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Provide full location/society address for satellite coordinates mapping"
                    value={formData.address}
                    onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1.5 font-mono">PREFERRED SURVEY DATE</label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={e => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1.5 font-mono">PREFERRED TIME SLOT</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Morning (10 AM - 1 PM)', 'Afternoon (2 PM - 5 PM)'].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, preferredTime: slot }))}
                          className={`py-2 rounded-lg text-[10px] font-medium border transition-all ${
                            formData.preferredTime === slot
                              ? 'bg-orange-500/10 border-orange-500 text-orange-400 font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {slot.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1.5 font-mono">SPECIAL COMMENTS OR CONSTRAINTS (Optional)</label>
                  <textarea
                    rows={1}
                    placeholder="e.g., heavily shaded by coconut trees on west side, high-voltage lines, etc."
                    value={formData.comments}
                    onChange={e => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-orange-500/10 transition-transform hover:scale-[1.01]"
                >
                  <Send className="w-3.5 h-3.5" /> Confirm Survey Schedule Spot
                </button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-white">Survey Request Acknowledged!</h4>
                  <p className="text-xs text-emerald-400/90 leading-relaxed max-w-lg mx-auto">
                    Excellent, <strong>{formData.name}</strong>! We have locked your free site survey booking slot for <strong>{formData.preferredDate} ({formData.preferredTime})</strong> at your address: <em>{formData.address}</em>.
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-850 text-[11px] text-slate-400 leading-normal text-left space-y-1.5 max-w-md mx-auto">
                  <span className="font-bold text-slate-200 block">Next Steps Checklist:</span>
                  <span className="block">● Our survey engineer will call you to confirm the appointment details.</span>
                  <span className="block">● The on-site visit assesses roof structure, orientation, shading and your electrical load — typically completed within 30–45 minutes.</span>
                  <span className="block">● Sizing proposal and DISCOM feasibility guidance will be shared within 24 hours.</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Info Panel with survey image (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 text-left">

          {/* Site Survey Image Card */}
          <div className="bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden shadow-lg">
            <div className="relative aspect-[16/10] bg-slate-900">
              <img
                src={uvrSiteSurvey}
                alt="UVR engineer conducting an on-site rooftop solar survey"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-lg px-2 py-1 text-[9px] font-mono text-emerald-400 flex items-center gap-1 on-image-badge">
                <Circle className="w-1.5 h-1.5 fill-emerald-400 animate-pulse" /> Free Survey
              </div>
            </div>

            <div className="p-5 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Star className="w-4 h-4 text-orange-400 fill-orange-400" /> Professional Shadow &amp; Site Analysis
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                A quick, careful on-site survey captures roof orientation, tilt, nearby tree and chimney shading, and your sanctioned load — so your system is sized accurately for maximum generation over its 25+ year life.
              </p>
            </div>
          </div>

          {/* Quick Contacts */}
          <div className="bg-slate-950/40 border border-slate-850 p-6 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Active Channels</h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 text-slate-400">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="flex flex-col gap-0.5">
                  <a href="tel:+919537566799" className="hover:text-orange-400">+91 95375 66799</a>
                  <a href="tel:+919737366799" className="hover:text-orange-400">+91 97373 66799</a>
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Send className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="https://wa.me/919537566799" target="_blank" rel="noreferrer" className="hover:text-emerald-400">
                  WhatsApp: +91 95375 66799
                </a>
              </div>
              <div className="flex items-start gap-3 text-slate-400">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="flex flex-col gap-0.5">
                  <a href="mailto:info@uvrgreenenergies.com" className="hover:text-orange-400">info@uvrgreenenergies.com</a>
                  <a href="mailto:epc@uvrgreenenergies.com" className="hover:text-orange-400">epc@uvrgreenenergies.com (Sales)</a>
                  <a href="mailto:healthcheck@uvrgreenenergies.com" className="hover:text-orange-400">healthcheck@uvrgreenenergies.com (Service)</a>
                </span>
              </div>
              <div className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <a href="https://maps.app.goo.gl/Lkd9TPZJzVYYF1bm7" target="_blank" rel="noreferrer" className="hover:text-orange-400">
                  423, Vihav Trade Center, Bhayli, Vadodara, Gujarat – 391410
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Clock className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>Mon – Sat, 9:30 AM – 6:30 PM</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Branch office list */}
      <div className="space-y-6 text-left">
        <h3 className="text-lg font-bold text-white tracking-tight">Our Operational Offices</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BRANCH_OFFICES.map((b, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-850 rounded-2xl p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-white">{b.city}</h4>
                <span className="text-[10px] text-slate-500 font-mono block leading-none">{b.role}</span>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-2">{b.address}</p>
              </div>

              <div className="pt-3 border-t border-slate-900 space-y-1.5 text-[10px] sm:text-[11px] font-mono text-slate-500">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
                  <span>PHONE:</span>
                  <a href={`tel:${b.phone.replace(/\s/g, '')}`} className="text-slate-300 hover:text-orange-400 break-all">{b.phone}</a>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
                  <span>EMAIL:</span>
                  <a href={`mailto:${b.email}`} className="text-slate-300 hover:text-orange-400 break-all">{b.email}</a>
                </div>
                {b.mapUrl && (
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
                    <span>MAP:</span>
                    <a href={b.mapUrl} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-orange-400 break-all">View on Google Maps</a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
