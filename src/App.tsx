import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Sun, Moon, Shield, ShieldCheck, BadgeCheck, Phone, Mail, MapPin, 
  ChevronDown, MessageSquare, Zap, Leaf, Award, Compass, 
  HelpCircle, Eye, Sparkles, Building2, UserCheck,
  Menu, X, Landmark, TrendingUp, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './components/Logo';
import SolarSimulator from './components/SolarSimulator';
import QuoteCalculator from './components/QuoteCalculator';
import EducationalHub from './components/EducationalHub';
import CommercialSegment from './components/CommercialSegment';
import GalleryShowcase from './components/GalleryShowcase';
import ContactPortal from './components/ContactPortal';
import WebGLSolarVisualizer from './components/WebGLSolarVisualizer';
import ServicesPortal from './components/ServicesPortal';
import AboutUs from './components/AboutUs';

// Import our beautiful photorealistic generated assets
import uvrBifacialPanels from './assets/images/uvr_bifacial_panels_1782761204892.jpg';
import uvrSmartInverter from './assets/images/uvr_smart_inverter_1782761219437.jpg';
import uvrBatteryVault from './assets/images/uvr_battery_vault_1782761234130.jpg';

const FAQS = [
  {
    question: "How does the PM Surya Ghar Muft Bijli Yojana subsidy system work?",
    answer: "The PM Surya Ghar: Muft Bijli Yojana provides Central Financial Assistance for eligible residential rooftop solar. The amount depends on installed capacity and MNRE guidelines (₹30,000 for the first kW, ₹60,000 at 2 kW, and a maximum of ₹78,000 for systems of 3 kW and above). UVR Green Energies manages the full process — application, documentation, installation and subsidy support.",
  },
  {
    question: "What is net metering and how does it reduce my bill?",
    answer: "Net metering lets the excess electricity your solar system generates be exported to the DISCOM grid and adjusted against what you consume, reducing your monthly bill. It is governed by your state DISCOM's regulations.",
  },
  {
    question: "How long does the entire solar installation and approval timeline take?",
    answer: "Once approvals and materials are ready, installation typically completes within 4–5 working days. The overall timeline, including approvals and net-metering, depends on DISCOM processing and site readiness. It begins with a free professional site survey by our engineers, followed by DISCOM approvals, mounting and commissioning.",
  },
  {
    question: "What makes UVR N-Type bifacial panels better than traditional ones?",
    answer: "Bifacial N-Type TOPCon panels offer higher efficiency, lower degradation, better temperature performance and more generation than conventional Mono PERC — delivering superior long-term performance and higher lifetime savings.",
  },
  {
    question: "How do I clean and maintain the solar system?",
    answer: "Solar systems need minimal maintenance — periodic cleaning, visual inspections and routine health checks. UVR provides comprehensive after-sales support and optional AMC services.",
  },
  {
    question: "What happens to my solar system during a power cut?",
    answer: "A standard grid-connected system automatically shuts down during an outage for safety (anti-islanding). Backup during outages needs a battery/hybrid system, which UVR can provide on request.",
  },
];

export default function App() {
  // Theme state (Dark/Light Mode)
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'light';
  });

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#f1f5f9');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#020617');
    }
  }, [isLightMode]);

  // Current Page Hash state
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'estimator') return 'home';
    const allowed = [
      'home', 'services', 
      'services/residential-solar-rooftop', 
      'services/commercial-industrial-solar', 
      'services/ground-mounted-solar', 
      'services/utility-scale-solar', 
      'simulator', 'academy', 'commercial', 'gallery', 'about', 'contact'
    ];
    return allowed.includes(hash) ? hash : 'home';
  });

  const [passedPanelCount, setPassedPanelCount] = useState<number | null>(null);
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);
  const [navHash, setNavHash] = useState(() => window.location.hash);
  const exploreRef = useRef<HTMLDivElement>(null);

  const scrollToEstimatorSection = useCallback(() => {
    const attempt = (retries = 0) => {
      const el = document.getElementById('estimator-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (retries < 20) {
        setTimeout(() => attempt(retries + 1), 50);
      }
    };
    attempt();
  }, []);

  const goToEstimator = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    setMobileMenuOpen(false);
    setExploreOpen(false);
    const onHome = currentPage === 'home';
    if (!onHome) {
      setCurrentPage('home');
    }
    if (window.location.hash !== '#estimator') {
      window.location.hash = '#estimator';
      setNavHash('#estimator');
    } else if (onHome) {
      scrollToEstimatorSection();
    }
  }, [currentPage, scrollToEstimatorSection]);

  // Scroll to calculator once home view is mounted
  useEffect(() => {
    if (currentPage !== 'home' || navHash !== '#estimator') return;
    scrollToEstimatorSection();
  }, [currentPage, navHash, scrollToEstimatorSection]);

  // Close Explore dropdown on outside click
  useEffect(() => {
    if (!exploreOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(e.target as Node)) {
        setExploreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [exploreOpen]);

  // Schedule floating modal shortcut
  const [bookingForm, setBookingForm] = useState({
    isOpen: false,
    name: '',
    phone: '',
    email: '',
    slot: 'Morning (9 AM - 12 PM)',
    success: false,
  });

  // Lock body scroll when mobile menu or booking modal is open
  useEffect(() => {
    const shouldLock = mobileMenuOpen || bookingForm.isOpen;
    document.body.classList.toggle('scroll-locked', shouldLock);
    return () => document.body.classList.remove('scroll-locked');
  }, [mobileMenuOpen, bookingForm.isOpen]);

  // Track Hash Change for Router
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setNavHash(window.location.hash);
      const allowed = [
        'home', 'services', 
        'services/residential-solar-rooftop', 
        'services/commercial-industrial-solar', 
        'services/ground-mounted-solar', 
        'services/utility-scale-solar', 
        'simulator', 'academy', 'commercial', 'gallery', 'about', 'contact'
      ];
      if (hash === 'estimator') {
        setCurrentPage('home');
        setMobileMenuOpen(false);
        setExploreOpen(false);
        return;
      }
      if (allowed.includes(hash)) {
        setCurrentPage(hash);
        setMobileMenuOpen(false);
        setExploreOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Escape closes mobile menu & explore dropdown
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExploreOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleApplySimulatorCount = (count: number) => {
    setPassedPanelCount(count);
    setCurrentPage('home');
    window.location.hash = '#estimator';
    setNavHash('#estimator');
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingForm(prev => ({ ...prev, success: true }));
  };

  const primaryNav = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'estimator', label: 'Subsidy Calculator' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const exploreNav = [
    { id: 'simulator', label: 'Solar Simulator' },
    { id: 'gallery', label: 'Project Gallery' },
    { id: 'academy', label: 'Solar Academy' },
    { id: 'commercial', label: 'Commercial Solar' },
  ];

  const isNavActive = (id: string) => {
    const hash = navHash;
    if (id === 'home') return currentPage === 'home' && hash !== '#estimator';
    if (id === 'estimator') return hash === '#estimator';
    if (id === 'services') return currentPage === 'services' || currentPage.startsWith('services/');
    return currentPage === id;
  };

  const isExploreActive = exploreNav.some((link) => isNavActive(link.id));

  const renderNavLink = (link: { id: string; label: string }, className: string) => {
    const active = isNavActive(link.id);
    if (link.id === 'estimator') {
      return (
        <a
          key={link.id}
          href="#estimator"
          onClick={goToEstimator}
          className={`${className} ${active ? 'nav-link-active text-white bg-slate-800/80' : ''}`}
        >
          {link.label}
        </a>
      );
    }
    return (
      <a
        key={link.id}
        href={`#${link.id}`}
        className={`${className} ${
          active ? 'nav-link-active text-white bg-slate-800/80' : ''
        }`}
      >
        {link.label}
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white font-sans overflow-x-hidden antialiased">
      
      {/* HEADER */}
      <header className="site-header sticky top-0 z-50 bg-slate-950/90 backdrop-blur-lg border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Logo */}
          <a
            href="#home"
            className="shrink-0 min-w-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
            aria-label="UVR Green Energies — Home"
          >
            <Logo size="sm" className="hover:opacity-90 transition-opacity max-w-[110px] sm:max-w-[140px]" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {primaryNav.slice(0, 2).map((link) =>
              renderNavLink(link, 'px-3 py-2 rounded-lg text-sm font-medium transition-colors text-slate-400 hover:text-white hover:bg-slate-800/40')
            )}

            {/* Explore dropdown */}
            <div className="relative" ref={exploreRef}>
              <button
                type="button"
                onClick={() => setExploreOpen((open) => !open)}
                aria-expanded={exploreOpen}
                aria-haspopup="menu"
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isExploreActive || exploreOpen
                    ? 'nav-link-active text-white bg-slate-800/80'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                Explore
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${exploreOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {exploreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    role="menu"
                    className="absolute top-full left-0 mt-1.5 min-w-[220px] py-1.5 bg-slate-900 border border-slate-800 rounded-xl shadow-xl shadow-black/30 z-50"
                  >
                    {exploreNav.map((link) => (
                      <a
                        key={link.id}
                        href={`#${link.id}`}
                        role="menuitem"
                        onClick={() => setExploreOpen(false)}
                        className={`block px-4 py-2.5 text-sm transition-colors ${
                          isNavActive(link.id)
                            ? 'text-blue-400 bg-blue-500/10 font-medium'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                        }`}
                      >
                        {link.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {primaryNav.slice(2).map((link) =>
              renderNavLink(link, 'px-3 py-2 rounded-lg text-sm font-medium transition-colors text-slate-400 hover:text-white hover:bg-slate-800/40')
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href="tel:+919537566799"
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
              aria-label="Call +91 95375 66799"
            >
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="hidden xl:inline font-mono">+91 95375 66799</span>
            </a>

            <button
              type="button"
              onClick={() => setIsLightMode(!isLightMode)}
              className="p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 transition-colors touch-target"
              aria-label={isLightMode ? 'Switch to dark mode' : 'Switch to light mode'}
              id="theme-toggle"
            >
              {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            <button
              type="button"
              onClick={() => setBookingForm(prev => ({ ...prev, isOpen: true, success: false }))}
              className="hidden sm:inline-flex px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
            >
              Book Free Survey
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors touch-target"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden
            />
            <motion.nav
              key="nav-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(100vw-2.5rem,300px)] bg-slate-950 border-l border-slate-800 flex flex-col lg:hidden shadow-2xl"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between px-4 h-14 border-b border-slate-800 shrink-0">
                <span className="text-sm font-semibold text-white">Menu</span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors touch-target"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
                {primaryNav.slice(0, 2).map((link) => {
                  const active = isNavActive(link.id);
                  return (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                        active
                          ? 'text-blue-400 bg-blue-600/15'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}

                {/* Mobile Explore accordion */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileExploreOpen((open) => !open)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isExploreActive
                        ? 'text-blue-400 bg-blue-600/15'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                    aria-expanded={mobileExploreOpen}
                  >
                    Explore
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExploreOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileExploreOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-3 pr-1 pb-1 space-y-0.5">
                          {exploreNav.map((link) => (
                            <a
                              key={link.id}
                              href={`#${link.id}`}
                              onClick={() => { setMobileMenuOpen(false); setMobileExploreOpen(false); }}
                              className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                                isNavActive(link.id)
                                  ? 'text-blue-400 bg-blue-500/10 font-medium'
                                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                              }`}
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {primaryNav.slice(2).map((link) => {
                  const active = isNavActive(link.id);
                  const baseClass = `block px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'text-blue-400 bg-blue-600/15'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`;
                  if (link.id === 'estimator') {
                    return (
                      <a
                        key={link.id}
                        href="#estimator"
                        onClick={goToEstimator}
                        className={baseClass}
                      >
                        {link.label}
                      </a>
                    );
                  }
                  return (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={baseClass}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>

              <div className="shrink-0 p-4 border-t border-slate-800 space-y-3">
                <a
                  href="tel:+919537566799"
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800/60 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                  +91 95375 66799
                </a>
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); setBookingForm(prev => ({ ...prev, isOpen: true, success: false })); }}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  Book Free Survey
                </button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* MAIN VIEWPORT WITH TRANSITIONS */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-6 sm:py-8 md:py-12 min-h-[60vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            
            {/* HOME VIEW */}
            {currentPage === 'home' && (
              <div className="space-y-16">
                
                {/* HERO BENTO */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
                  
                  {/* Headline content (7 Cols) */}
                  <div className="lg:col-span-7 space-y-6 relative z-10">
                    <span className="bg-slate-900 border border-slate-800 text-sky-400 text-xs font-semibold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 font-mono">
                      <Award className="w-4 h-4 text-blue-500" /> MNRE Approved Solar EPC &bull; Powered by UVR TECHSOL Pvt. Ltd.
                    </span>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] font-sans">
                      <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-400 bg-clip-text text-transparent hero-accent-gradient">
                        Powering a Greener Tomorrow
                      </span>
                    </h1>

                    <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl">
                      UVR Green Energies is a trusted Solar EPC company dedicated to delivering innovative, efficient, and sustainable energy solutions. By combining advanced technology, engineering expertise, and reliable execution, we empower our clients to reduce electricity costs while contributing to a cleaner and greener future.
                    </p>

                    {/* Quick Stats Bento */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
                      <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-3 sm:p-4">
                        <div className="text-xl sm:text-2xl md:text-3xl font-black text-white font-mono">1200+</div>
                        <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-1">Installations Completed</div>
                      </div>
                      <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-3 sm:p-4">
                        <div className="text-xl sm:text-2xl md:text-3xl font-black text-cyan-400 font-mono">7 MW+</div>
                        <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-1">Total Installed Capacity</div>
                      </div>
                      <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-3 sm:p-4">
                        <div className="text-xl sm:text-2xl md:text-3xl font-black text-indigo-400 font-mono">₹78K</div>
                        <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-1">Max Central Subsidy</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setBookingForm(prev => ({ ...prev, isOpen: true, success: false }))}
                        className="flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-500/10 hover:scale-[1.02]"
                      >
                        <Compass className="w-4 h-4" /> Book Free Survey
                      </button>
                      <a
                        href="#estimator"
                        onClick={goToEstimator}
                        className="flex items-center justify-center gap-2 py-3.5 px-6 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 rounded-xl font-bold text-sm transition-all"
                      >
                        Subsidy Calculator
                      </a>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-[10px] sm:text-[11px] text-slate-500 font-mono">
                      <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" /> ALMM-Listed Modules (List-II)</span>
                      <span className="flex items-center gap-1"><BadgeCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" /> DISCOM Net-Metering Included</span>
                    </div>
                  </div>

                  {/* Photo representation with generated assets (5 Cols) */}
                  <div className="lg:col-span-5 relative">
                    <div className="relative aspect-[10/11] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-6">
                      
                      {/* Real generated photo backdrop */}
                      <div className="absolute inset-0 z-0">
                        <img 
                          src={uvrBifacialPanels} 
                          alt="UVR Solar Rooftop" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent image-scrim" />
                      </div>

                      {/* HUD Overlays */}
                      <div className="relative z-10 flex justify-between items-start on-image-text">
                        <span className="bg-slate-950/85 text-white border border-slate-800 text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md on-image-badge">
                          Vadodara Rooftop Project
                        </span>
                        <div className="bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                          <Sun className="w-3.5 h-3.5" /> Grid-Connected
                        </div>
                      </div>

                      <div className="relative z-10 space-y-4 on-image-text">
                        <div className="text-left space-y-1">
                          <h3 className="text-xl font-bold text-white tracking-tight">Vadodara Residential Rooftop</h3>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            A 25 kWp grid-connected rooftop system in Vadodara using premium Adani Elan Shine TOPCon bifacial modules and a Solaryaan inverter for reliable, high-yield clean energy.
                          </p>
                        </div>

                        {/* Specs Panel — stays dark glass over photo in both themes */}
                        <div className="on-image-panel bg-slate-950/90 border border-white/10 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs font-mono">
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase tracking-wide">System size</span>
                            <span className="text-white font-bold">25 kWp Array</span>
                          </div>
                          <div className="sm:text-right">
                            <span className="text-slate-400 block text-[9px] uppercase tracking-wide">Annual generation</span>
                            <span className="text-cyan-400 font-bold">~37,800 kWh/yr</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </section>

                {/* VERIFIED IMPACT NUMBERS */}
                <section className="bg-slate-900/40 border border-slate-850 p-6 md:p-8 rounded-3xl space-y-6 text-left">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="text-orange-400 text-[10px] font-mono tracking-widest uppercase block">Our Impact So Far</span>
                      <h3 className="text-xl font-bold text-white tracking-tight font-sans mt-0.5">UVR Green Energies By the Numbers</h3>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 rounded-xl px-3 sm:px-4 py-2 font-mono text-[10px] sm:text-xs flex flex-wrap items-center gap-x-2 gap-y-1">
                      <Leaf className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="text-slate-400">EST. ANNUAL CO&#8322; OFFSET:</span>
                      <span className="text-emerald-400 font-extrabold">~7,400 Tonnes</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900">
                      <span className="text-[10px] text-slate-500 font-mono">INSTALLATIONS</span>
                      <div className="text-xl font-bold text-white font-mono mt-1">1200+</div>
                      <span className="text-[9px] text-slate-500 mt-1 block font-mono">1170+ residential, 30+ C&amp;I</span>
                    </div>
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900">
                      <span className="text-[10px] text-slate-500 font-mono">INSTALLED CAPACITY</span>
                      <div className="text-xl font-bold text-white font-mono mt-1">7 MW+</div>
                      <span className="text-[9px] text-slate-500 mt-1 block font-mono">across Gujarat &amp; beyond</span>
                    </div>
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900">
                      <span className="text-[10px] text-slate-500 font-mono">CLEAN ENERGY / YEAR</span>
                      <div className="text-xl font-bold text-white font-mono mt-1">1.05 Cr+ <span className="text-xs text-slate-500">units</span></div>
                      <span className="text-[9px] text-slate-500 mt-1 block font-mono">≈ 8.75 lakh units/month</span>
                    </div>
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900">
                      <span className="text-[10px] text-slate-500 font-mono">PANEL WARRANTY</span>
                      <div className="text-xl font-bold text-white font-mono mt-1">Up to 30 <span className="text-xs text-slate-500">yrs</span></div>
                      <span className="text-[9px] text-slate-500 mt-1 block font-mono">performance (12-yr product)</span>
                    </div>
                  </div>
                </section>

                {/* HIGH-ENGAGEMENT WEBGL RAY-TRACED SOLAR SIMULATOR */}
                <WebGLSolarVisualizer />

                {/* INTEGRATED PM SURYA GHAR SOLAR SAVINGS CALCULATOR */}
                <div id="estimator-section" className="scroll-mt-20 sm:scroll-mt-24">
                  <QuoteCalculator initialPanelCount={passedPanelCount} />
                </div>

                {/* PRODUCTS GALLERY GRID featuring generated hardware images */}
                <section className="space-y-8">
                  <div className="text-center max-w-xl mx-auto">
                    <span className="text-xs font-bold text-orange-400 uppercase tracking-widest font-mono">Premium Hardware Specifications</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1.5 font-sans">
                      Turnkey Component Engineering
                    </h2>
                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                      We never use budget components. Every UVR installation utilizes high-yield certified modules with dynamic IoT tracking systems.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {/* Product 1 */}
                    <div className="bg-slate-950/60 border border-slate-850 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-colors">
                      <div className="aspect-[4/3] bg-slate-900 overflow-hidden">
                        <img 
                          src={uvrBifacialPanels} 
                          alt="N-Type TOPCon Panels" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <h4 className="text-base font-bold text-white">N-Type TOPCon Bifacial Dual-Glass</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Dual-glass architecture captures secondary light reflecting off your terrace floor (albedo effect), delivering higher efficiency and lower degradation than conventional Mono PERC. Brands: Rayzon, Pahal, Adani, Waaree, Premier Energies.
                          </p>
                        </div>
                        <div className="border-t border-slate-900 pt-3 flex justify-between items-center text-[10px] font-mono">
                          <span className="text-slate-500">WARRANTY</span>
                          <span className="text-amber-400 font-bold">12-yr Product + 30-yr Performance</span>
                        </div>
                      </div>
                    </div>

                    {/* Product 2 */}
                    <div className="bg-slate-950/60 border border-slate-850 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-colors">
                      <div className="aspect-[4/3] bg-slate-900 overflow-hidden">
                        <img 
                          src={uvrSmartInverter} 
                          alt="Smart Inverter" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <h4 className="text-base font-bold text-white">Smart String / Hybrid Inverter</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Turn sunlight into grid-synchronized AC power. On-grid, optimizer, micro and hybrid options from Solaryaan, Solis, GoodWe, Sungrow, Polycab, Havells, SolarEdge and Enphase, with Wi-Fi diagnostics.
                          </p>
                        </div>
                        <div className="border-t border-slate-900 pt-3 flex justify-between items-center text-[10px] font-mono">
                          <span className="text-slate-500">WARRANTY</span>
                          <span className="text-blue-400 font-bold">7–10 Years</span>
                        </div>
                      </div>
                    </div>

                    {/* Product 3 */}
                    <div className="bg-slate-950/60 border border-slate-850 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-colors">
                      <div className="aspect-[4/3] bg-slate-900 overflow-hidden">
                        <img 
                          src={uvrBatteryVault} 
                          alt="Battery Storage Vault" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <h4 className="text-base font-bold text-white">Hybrid Backup &amp; Storage (On Request)</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Battery storage is not part of our standard rooftop offering, but for sites needing outage backup we can design a hybrid system with battery storage as an optional add-on.
                          </p>
                        </div>
                        <div className="border-t border-slate-900 pt-3 flex justify-between items-center text-[10px] font-mono">
                          <span className="text-slate-500">AVAILABILITY</span>
                          <span className="text-emerald-400 font-bold">Optional / On Request</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Survey CTA — replaces fake video walkthrough */}
                <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950/30 p-6 md:p-10">
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="space-y-3 max-w-xl text-left">
                      <span className="inline-flex text-orange-400 text-xs font-semibold tracking-wide uppercase">Free site survey</span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                        Ready for a professional roof assessment?
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Our Vadodara engineers visit your site, measure shading and structural readiness, then size a system that maximises subsidy and savings — at no cost.
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1 text-xs text-slate-300">
                        <span className="inline-flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-emerald-400" /> Free on-site survey</span>
                        <span className="inline-flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-emerald-400" /> DISCOM &amp; subsidy support</span>
                        <span className="inline-flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-emerald-400" /> MNRE-approved EPC</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setBookingForm(prev => ({ ...prev, isOpen: true, success: false }))}
                      className="btn-primary shrink-0 px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-orange-900/20"
                    >
                      Book Free Survey
                    </button>
                  </div>
                </section>

                {/* ACCORDION FAQ */}
                <section className="max-w-3xl mx-auto text-left py-4">
                  <div className="text-center mb-10">
                    <span className="text-xs font-bold text-orange-400 uppercase tracking-widest font-mono">Regulatory &amp; Logistics Guide</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1.5 font-sans">
                      Frequently Asked Questions
                    </h2>
                  </div>

                  <div className="space-y-3.5">
                    {FAQS.map((faq, idx) => {
                      const isExpanded = activeFaqIdx === idx;
                      return (
                        <div key={idx} className="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden">
                          <button
                            onClick={() => setActiveFaqIdx(isExpanded ? null : idx)}
                            className="w-full text-left px-5 py-4 flex justify-between items-center gap-4 hover:bg-slate-900/40 transition-colors"
                          >
                            <span className="text-sm font-bold text-slate-100 font-sans pr-2">{faq.question}</span>
                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                          
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.18 }}
                              >
                                <div className="px-5 pb-5 pt-1 text-xs text-slate-400 leading-relaxed font-sans border-t border-slate-900">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </section>

              </div>
            )}

            {/* SERVICES PORTAL VIEW */}
            {(currentPage === 'services' || currentPage.startsWith('services/')) && (
              <ServicesPortal activeSubPage={currentPage} />
            )}

            {/* SOLAR SANDBOX VIEW */}
            {currentPage === 'simulator' && (
              <SolarSimulator onApplyToCalculator={handleApplySimulatorCount} />
            )}

            {/* ENGINEERING ACADEMY (EDUCATIONAL HUB) */}
            {currentPage === 'academy' && (
              <EducationalHub />
            )}

            {/* COMMERCIAL SOLUTIONS PAGE */}
            {currentPage === 'commercial' && (
              <CommercialSegment />
            )}

            {/* PROJECT GALLERY */}
            {currentPage === 'gallery' && (
              <GalleryShowcase />
            )}

            {/* ABOUT US VIEW */}
            {currentPage === 'about' && (
              <AboutUs />
            )}

            {/* CONTACT */}
            {currentPage === 'contact' && (
              <ContactPortal />
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 px-4 md:px-8 py-12 text-slate-500">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          
          <div className="sm:col-span-2 lg:col-span-2 space-y-4 text-left">
            <Logo size="md" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mt-3">
              UVR Green Energies is a premier clean technology enterprise. We design, permit, finance, and monitor high-performance net-metered rooftop solar installations for residential, cooperative housing, and heavy-load industrial structures.
            </p>
          </div>

          <div className="space-y-3 text-xs font-semibold text-left">
            <h4 className="text-white uppercase font-mono tracking-wider text-[10px]">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-orange-400 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-orange-400 transition-colors">Services</a></li>
              <li><a href="#estimator" onClick={goToEstimator} className="hover:text-orange-400 transition-colors">Subsidy Calculator</a></li>
              <li><a href="#about" className="hover:text-orange-400 transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-orange-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-3 text-xs font-semibold text-left">
            <h4 className="text-white uppercase font-mono tracking-wider text-[10px]">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#simulator" className="hover:text-orange-400 transition-colors">Solar Simulator</a></li>
              <li><a href="#gallery" className="hover:text-orange-400 transition-colors">Project Gallery</a></li>
              <li><a href="#academy" className="hover:text-orange-400 transition-colors">Solar Academy</a></li>
              <li><a href="#commercial" className="hover:text-orange-400 transition-colors">Commercial Solar</a></li>
            </ul>
          </div>

          <div className="space-y-3 text-xs font-semibold text-left">
            <h4 className="text-white uppercase font-mono tracking-wider text-[10px]">Headquarters &amp; Support</h4>
            <ul className="space-y-2 text-slate-400 font-mono text-[11px] leading-normal">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>UVR TECHSOL Pvt. Ltd., 423, Vihav Trade Center, B/s Waves Clube, Vasna–Bhayli Canal Road, Bhayli, Vadodara, Gujarat – 391410, India</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>
                  <a href="tel:+919537566799" className="hover:underline">+91 95375 66799</a>,{' '}
                  <a href="tel:+919737366799" className="hover:underline">+91 97373 66799</a>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a href="mailto:info@uvrgreenenergies.com" className="hover:underline">info@uvrgreenenergies.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Info className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Mon–Sat, 9:30 AM – 6:30 PM</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-center sm:text-left">
          <span>&copy; {new Date().getFullYear()} UVR TECHSOL PRIVATE LIMITED. All Rights Reserved.</span>
          <span className="text-slate-400 max-w-md">UVR Green Energies &bull; Powered by UVR TECHSOL Pvt. Ltd.</span>
        </div>
      </footer>



      {/* LEAD BOOKING DIALOG MODAL */}
      <AnimatePresence>
        {bookingForm.isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingForm(prev => ({ ...prev, isOpen: false }))}
              className="absolute inset-0 bg-black"
              aria-hidden="true"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-dialog-title"
              className="bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl p-6 md:p-8 w-full max-w-md relative z-10 overflow-y-auto max-h-[90vh] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <h3 id="booking-dialog-title" className="text-lg font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-5 h-5 text-orange-500" /> Book Free Site Survey
                </h3>
                <button
                  onClick={() => setBookingForm(prev => ({ ...prev, isOpen: false }))}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors touch-target"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!bookingForm.success ? (
                <form onSubmit={handleBookingSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1 font-mono uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={bookingForm.name}
                      onChange={e => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1 font-mono uppercase">Contact Mobile</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={bookingForm.phone}
                      onChange={e => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1 font-mono uppercase">Email Address (For Report)</label>
                    <input
                      type="email"
                      placeholder="e.g. ramesh@gmail.com"
                      value={bookingForm.email}
                      onChange={e => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1 font-mono uppercase">Preferred Survey Slot</label>
                    <select
                      value={bookingForm.slot}
                      onChange={e => setBookingForm(prev => ({ ...prev, slot: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                    >
                      <option>Morning (10 AM - 1 PM)</option>
                      <option>Afternoon (2 PM - 5 PM)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black text-xs rounded-xl transition-all shadow-lg shadow-orange-500/10 mt-2 uppercase tracking-wide"
                  >
                    Confirm Appointment Slot
                  </button>
                  <p className="text-[10px] text-slate-500 text-center mt-2 leading-relaxed font-sans">
                    *Our site survey is a free professional visit. Our engineers assess your roof, shading and structure to design the right system for you.
                  </p>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Survey Slot Confirmed!</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2 max-w-xs mx-auto">
                      Congratulations, <strong>{bookingForm.name}</strong>! Your free site survey slot for <strong>{bookingForm.slot}</strong> is locked. Our team will call you shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setBookingForm(prev => ({ ...prev, isOpen: false }))}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all uppercase font-mono tracking-wider"
                  >
                    Close Dialog
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
