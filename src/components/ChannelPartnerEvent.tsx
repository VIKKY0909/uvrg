import React, { useState } from 'react';
import {
  MapPin, Clock, Coffee, CheckCircle2, Users, Building2,
  ShieldCheck, Send, Loader2, AlertCircle, Sparkles, Handshake,
  ChevronDown, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import uvrBifacialPanels from '../assets/images/uvr_bifacial_panels_1782761204892.jpg';

/** Update when founder confirms the event date */
export const PARTNER_EVENT = {
  title: 'District Channel Partner Meet — Gujarat',
  dateLabel: 'Date to be confirmed',
  timeLabel: '10:00 AM – 8:00 PM',
  venueName: 'The Fern Residency Vadodara',
  venueAddress:
    'Alkapuri, RC Dutt Road, Behind Alkapuri Petrol Pump, Vishwas Colony, Alkapuri, Vadodara, 390007, Gujarat',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=The+Fern+Residency+Vadodara+Alkapuri+RC+Dutt+Road',
};

const EXPERIENCE_OPTIONS = [
  'Residential Solar',
  'Commercial & Industrial Solar',
  'Solar Sales & Marketing',
  'EPC Project Execution',
  'Channel Sales / Dealership Development',
] as const;

const HEAR_ABOUT_OPTIONS = [
  'Existing UVR Partner / Dealer',
  'UVR Team Invitation',
  'WhatsApp / SMS',
  'LinkedIn',
  'Facebook / Instagram',
  'Influencer (RJ Devan)',
  'Google Search',
  'Referral from colleague',
  'Industry event / association',
  'Other',
] as const;

const BENEFITS = [
  'District-wise Channel Partner Opportunity',
  'No Franchise Fee*',
  'Complete EPC Execution Support',
  'Sales, Technical & Marketing Assistance',
  'Premium Quality Products & Installations',
  'PM Surya Ghar & C&I Project Support',
  'Long-Term Business Growth Opportunity',
];

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  city: string;
  preferredDistrict: string;
  partnerType: 'new' | 'existing' | '';
  experienceAreas: string[];
  yearsExperience: string;
  hearAbout: string;
  hearAboutOther: string;
  notes: string;
  consent: boolean;
};

const initialForm: FormState = {
  fullName: '',
  phone: '',
  email: '',
  company: '',
  city: '',
  preferredDistrict: '',
  partnerType: '',
  experienceAreas: [],
  yearsExperience: '',
  hearAbout: '',
  hearAboutOther: '',
  notes: '',
  consent: false,
};

function fieldClass(error?: boolean) {
  return `w-full bg-slate-950/80 border ${
    error ? 'border-rose-500/60' : 'border-slate-700'
  } rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/40 transition-colors`;
}

export default function ChannelPartnerEvent() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [hearAboutOpen, setHearAboutOpen] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const toggleExperience = (area: string) => {
    setForm((prev) => {
      const has = prev.experienceAreas.includes(area);
      return {
        ...prev,
        experienceAreas: has
          ? prev.experienceAreas.filter((a) => a !== area)
          : [...prev.experienceAreas, area],
      };
    });
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = 'Required';
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s|-/g, ''))) {
      next.phone = 'Enter a valid 10-digit Indian mobile';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Enter a valid email';
    }
    if (!form.company.trim()) next.company = 'Required';
    if (!form.city.trim()) next.city = 'Required';
    if (!form.preferredDistrict.trim()) next.preferredDistrict = 'Required';
    if (!form.partnerType) next.partnerType = 'Select one';
    if (form.experienceAreas.length === 0) next.experienceAreas = 'Select at least one';
    if (!form.hearAbout) next.hearAbout = 'Required';
    if (form.hearAbout === 'Other' && !form.hearAboutOther.trim()) {
      next.hearAboutOther = 'Please specify';
    }
    if (!form.consent) next.consent = 'Please confirm attendance';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setErrorMessage('');

    const phone = form.phone.replace(/\s|-/g, '');
    const hearAbout =
      form.hearAbout === 'Other'
        ? `Other: ${form.hearAboutOther.trim()}`
        : form.hearAbout;

    try {
      const res = await fetch('/api/partner-event-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          phone,
          email: form.email.trim().toLowerCase(),
          company: form.company.trim(),
          city: form.city.trim(),
          preferredDistrict: form.preferredDistrict.trim(),
          partnerType: form.partnerType === 'new' ? 'New Channel Partner' : 'Existing Channel Partner',
          experienceAreas: form.experienceAreas.join('; '),
          yearsExperience: form.yearsExperience.trim() || '—',
          hearAbout,
          notes: form.notes.trim() || '—',
          eventTitle: PARTNER_EVENT.title,
          eventDate: PARTNER_EVENT.dateLabel,
          eventVenue: PARTNER_EVENT.venueName,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed. Please try again.');
      }

      setStatus('success');
      setForm(initialForm);
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <div id="partner-event" className="space-y-10 md:space-y-14 text-left">
      {/* Hero */}
      <section className="relative min-h-[min(72vh,640px)] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        <img
          src={uvrBifacialPanels}
          alt="UVR Green Energies solar installation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/88 to-slate-950/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

        <div className="relative z-10 flex flex-col justify-end h-full min-h-[min(72vh,640px)] p-6 md:p-10 lg:p-14 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="space-y-5"
          >
            <Logo size="md" className="mb-2" />
            <span className="inline-flex items-center gap-1.5 text-orange-300 text-[11px] font-semibold px-2.5 py-1 bg-orange-500/15 border border-orange-500/30 rounded-full uppercase tracking-wider">
              <Handshake className="w-3.5 h-3.5" />
              Channel Partner Onboarding
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.05] font-sans">
              Opportunity for Solar Industry Professionals —{' '}
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                Gujarat
              </span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
              UVR Green Energies invites experienced solar professionals to become District Channel Partners
              across Gujarat — with full EPC, sales, and marketing support from a trusted national brand.
            </p>
            <a
              href="#register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-transform hover:scale-[1.02]"
            >
              Register for the Event
            </a>
          </motion.div>
        </div>
      </section>

      {/* Event logistics + hospitality */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-4 h-4" /> When
          </div>
          <p className="text-white font-bold text-sm">{PARTNER_EVENT.dateLabel}</p>
          <p className="text-slate-400 text-sm">{PARTNER_EVENT.timeLabel}</p>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2 md:col-span-1">
          <div className="flex items-center gap-2 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-4 h-4" /> Where
          </div>
          <p className="text-white font-bold text-sm">{PARTNER_EVENT.venueName}</p>
          <a
            href={PARTNER_EVENT.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 text-xs leading-relaxed hover:text-orange-400 transition-colors block"
          >
            {PARTNER_EVENT.venueAddress}
          </a>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Coffee className="w-4 h-4" /> Hospitality
          </div>
          <p className="text-white font-bold text-sm">Included for all attendees</p>
          <p className="text-slate-400 text-xs leading-relaxed">
            Morning snack · Afternoon high tea · Evening high tea
          </p>
        </div>
      </motion.section>

      {/* Why join */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-5">
          <span className="text-orange-400 text-xs font-semibold px-2.5 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Why Join UVR
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Build your solar business with a trusted EPC brand
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Onboarding for new channel partners and dealers, plus a reconnect for existing partners.
            Limited district partner slots are available across Gujarat.
          </p>
          <ul className="space-y-2.5">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                {b}
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-slate-500">* Terms as communicated by UVR Green Energies.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Users className="w-4 h-4 text-orange-400" /> Ideal for professionals with experience in
          </div>
          <div className="flex flex-wrap gap-2">
            {EXPERIENCE_OPTIONS.map((area) => (
              <span
                key={area}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-300"
              >
                {area}
              </span>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-800 flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
            MNRE-approved Solar EPC partner · Powered by UVR TECHSOL Pvt. Ltd. · Expanding district-wise across Gujarat
          </div>
        </div>
      </section>

      {/* Registration form */}
      <section id="register" className="scroll-mt-24">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="px-6 md:px-10 py-6 border-b border-slate-800 bg-gradient-to-r from-orange-500/10 via-transparent to-emerald-500/5">
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Event Registration
            </h2>
            <p className="text-slate-400 text-sm mt-1.5">
              Reserve your seat. Our team will confirm your registration shortly.
            </p>
          </div>

          <div className="p-6 md:p-10">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-8 text-center space-y-4 max-w-lg mx-auto"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">You&apos;re registered</h3>
                  <p className="text-sm text-emerald-100/80 leading-relaxed">
                    Thank you for registering for the UVR Channel Partner Meet. We&apos;ll be in touch
                    with confirmation details. See you at The Fern Residency, Alkapuri.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    Register another attendee
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 max-w-3xl"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        Full Name *
                      </label>
                      <input
                        className={fieldClass(!!errors.fullName)}
                        value={form.fullName}
                        onChange={(e) => update('fullName', e.target.value)}
                        placeholder="As on your business card"
                        autoComplete="name"
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-rose-400">{errors.fullName}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        Mobile *
                      </label>
                      <input
                        className={fieldClass(!!errors.phone)}
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        placeholder="10-digit WhatsApp number"
                        inputMode="numeric"
                        autoComplete="tel"
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-rose-400">{errors.phone}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        Email *
                      </label>
                      <input
                        type="email"
                        className={fieldClass(!!errors.email)}
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        placeholder="you@company.com"
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-400">{errors.email}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        Company / Firm *
                      </label>
                      <input
                        className={fieldClass(!!errors.company)}
                        value={form.company}
                        onChange={(e) => update('company', e.target.value)}
                        placeholder="Your dealership or firm name"
                        autoComplete="organization"
                      />
                      {errors.company && (
                        <p className="text-[11px] text-rose-400">{errors.company}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        Current City *
                      </label>
                      <input
                        className={fieldClass(!!errors.city)}
                        value={form.city}
                        onChange={(e) => update('city', e.target.value)}
                        placeholder="e.g. Surat"
                        autoComplete="address-level2"
                      />
                      {errors.city && (
                        <p className="text-[11px] text-rose-400">{errors.city}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        Preferred District for Partnership *
                      </label>
                      <input
                        className={fieldClass(!!errors.preferredDistrict)}
                        value={form.preferredDistrict}
                        onChange={(e) => update('preferredDistrict', e.target.value)}
                        placeholder="e.g. Vadodara / Bharuch / Rajkot"
                      />
                      {errors.preferredDistrict && (
                        <p className="text-[11px] text-rose-400">{errors.preferredDistrict}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      I am registering as *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(
                        [
                          { id: 'new' as const, label: 'New Channel Partner / Dealer', icon: Building2 },
                          { id: 'existing' as const, label: 'Existing UVR Channel Partner', icon: Handshake },
                        ]
                      ).map(({ id, label, icon: Icon }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => update('partnerType', id)}
                          className={`flex items-center gap-3 text-left px-4 py-3 rounded-xl border text-sm transition-colors ${
                            form.partnerType === id
                              ? 'bg-orange-500/15 border-orange-500 text-orange-300 font-semibold'
                              : 'bg-slate-950/60 border-slate-700 text-slate-300 hover:border-slate-500'
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          {label}
                        </button>
                      ))}
                    </div>
                    {errors.partnerType && (
                      <p className="text-[11px] text-rose-400">{errors.partnerType}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      Experience areas *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {EXPERIENCE_OPTIONS.map((area) => {
                        const on = form.experienceAreas.includes(area);
                        return (
                          <button
                            key={area}
                            type="button"
                            onClick={() => toggleExperience(area)}
                            className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                              on
                                ? 'bg-orange-500/15 border-orange-500 text-orange-300 font-semibold'
                                : 'bg-slate-950/60 border-slate-700 text-slate-400 hover:border-slate-500'
                            }`}
                          >
                            {area}
                          </button>
                        );
                      })}
                    </div>
                    {errors.experienceAreas && (
                      <p className="text-[11px] text-rose-400">{errors.experienceAreas}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        Years in solar industry
                      </label>
                      <input
                        className={fieldClass()}
                        value={form.yearsExperience}
                        onChange={(e) => update('yearsExperience', e.target.value)}
                        placeholder="e.g. 5"
                        inputMode="numeric"
                      />
                    </div>
                    <div
                      className="relative space-y-1.5"
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                          setHearAboutOpen(false);
                        }
                      }}
                    >
                      <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        How did you hear about us? *
                      </label>
                      <button
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded={hearAboutOpen}
                        onClick={() => setHearAboutOpen((open) => !open)}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') setHearAboutOpen(false);
                        }}
                        className={`${fieldClass(!!errors.hearAbout)} flex items-center justify-between gap-3 text-left`}
                      >
                        <span className={form.hearAbout ? 'text-white' : 'text-slate-500'}>
                          {form.hearAbout || 'Select one'}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 text-orange-400 transition-transform ${
                            hearAboutOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {hearAboutOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -4, scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                            role="listbox"
                            aria-label="How did you hear about us?"
                            className="absolute z-30 left-0 right-0 top-full mt-2 max-h-64 overflow-y-auto rounded-xl border border-slate-700 bg-slate-950 p-1.5 shadow-2xl shadow-black/40"
                          >
                            {HEAR_ABOUT_OPTIONS.map((opt) => {
                              const selected = form.hearAbout === opt;
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  role="option"
                                  aria-selected={selected}
                                  onClick={() => {
                                    update('hearAbout', opt);
                                    setHearAboutOpen(false);
                                  }}
                                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                                    selected
                                      ? 'bg-orange-500/15 text-orange-300'
                                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                  }`}
                                >
                                  <span>{opt}</span>
                                  {selected && <Check className="w-4 h-4 shrink-0" />}
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {errors.hearAbout && (
                        <p className="text-[11px] text-rose-400">{errors.hearAbout}</p>
                      )}
                    </div>
                  </div>

                  {form.hearAbout === 'Other' && (
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        Please specify *
                      </label>
                      <input
                        className={fieldClass(!!errors.hearAboutOther)}
                        value={form.hearAboutOther}
                        onChange={(e) => update('hearAboutOther', e.target.value)}
                        placeholder="Where did you hear about this event?"
                      />
                      {errors.hearAboutOther && (
                        <p className="text-[11px] text-rose-400">{errors.hearAboutOther}</p>
                      )}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      Questions or notes (optional)
                    </label>
                    <textarea
                      className={`${fieldClass()} resize-none min-h-[88px]`}
                      value={form.notes}
                      onChange={(e) => update('notes', e.target.value)}
                      placeholder="Anything we should know before the meet?"
                      rows={3}
                    />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => update('consent', e.target.checked)}
                      className="mt-1 rounded border-slate-600 bg-slate-950 text-orange-500 focus:ring-orange-500/40"
                    />
                    <span className="text-xs text-slate-400 leading-relaxed">
                      I confirm I will attend the Channel Partner Meet at The Fern Residency, Vadodara
                      ({PARTNER_EVENT.timeLabel}). Morning snack, afternoon high tea and evening high tea
                      are included. UVR may contact me about partnership opportunities. *
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-[11px] text-rose-400">{errors.consent}</p>
                  )}

                  {status === 'error' && (
                    <div className="flex items-start gap-2 text-sm text-rose-300 bg-rose-500/10 border border-rose-500/25 rounded-xl px-4 py-3">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-60 disabled:pointer-events-none text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-orange-500/15 transition-transform hover:scale-[1.01]"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Confirm Registration
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
