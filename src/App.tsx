import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Sun, Moon, Shield, ShieldCheck, BadgeCheck, Phone, Mail, MapPin, 
  ChevronDown, MessageSquare, Zap, Leaf, Award, Compass, 
  HelpCircle, Eye, Star, Sparkles, Building2, UserCheck, Play,
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

// 1. DYNAMIC TESTIMONIALS & FAQS
const TESTIMONIALS = [
  {
    name: "Dr. Arvind Kulkarni",
    location: "Pune, Maharashtra",
    systemSize: "5.4 kW System",
    quote: "My monthly DISCOM bill went from ₹6,800 to just ₹320! The UVR net-metering approval was handled entirely by their team, and the physical installation is incredibly robust. Best decision for my retirement villa.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
  },
  {
    name: "Meera Singhal",
    location: "Ahmedabad, Gujarat",
    systemSize: "3.2 kW System",
    quote: "The 3D LIDAR drone survey they conducted on my roof was fascinating. It showed exactly how to avoid my water tank shadow. PM Surya Ghar subsidy of ₹60,000 was credited directly to my bank account within 35 days.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120",
  },
  {
    name: "Vikas & Ritu Sharma",
    location: "Noida, Uttar Pradesh",
    systemSize: "8.1 kW Hybrid",
    quote: "With the frequent power cuts in Noida, the smart LiFePO4 battery vault is a lifesaver. We run our heavy inverter ACs through the night entirely on solar backup. The team at UVR Techsol Pvt. Ltd. is deeply professional.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120",
  },
];

const FAQS = [
  {
    question: "How does the PM Surya Ghar Muft Bijli Yojana subsidy system work?",
    answer: "Launched by the Central Government, this scheme provides a direct capital subsidy for residential rooftop solar. You get ₹30,000 for 1kW, ₹60,000 for 2kW, and a maximum flat subsidy of ₹78,000 for any system size of 3kW to 10kW. Commercial or industrial customers do not receive direct cash subsidies but gain a 40% Accelerated Depreciation tax benefit.",
  },
  {
    question: "What is net metering and how does it reduce my bill?",
    answer: "Net metering is a billing arrangement with your local DISCOM utility. When your solar panels generate more electricity than your home consumes during the day, the excess is sent back into the utility grid, spinning your smart net-meter backward and earning unit credits. At night, you draw units back. Your monthly bill is calculated purely as: Net Units = [Units Imported] - [Units Exported].",
  },
  {
    question: "How long does the entire solar installation and approval timeline take?",
    answer: "Typically 3 to 5 weeks. This includes: (1) Technical LIDAR roof feasibility survey [1-2 days], (2) DISCOM feasibility approval [7-10 days], (3) Safe physical solar and inverter mounting by our certified engineers [2-3 days], and (4) Net-meter inspection, seal, and commissioning by the DISCOM inspector [10-15 days].",
  },
  {
    question: "What makes UVR N-Type dual glass panels better than traditional ones?",
    answer: "Traditional panels are monofacial (single-sided). UVR Green Energies uses next-generation N-Type TOPCon Dual-Glass Bifacial panels. These capture direct sunlight on the top face and secondary, ground-reflected sunlight (albedo) on the bottom face, yielding up to 15% more power per sq ft, especially in high-temperature environments.",
  },
  {
    question: "How do I clean and maintain the solar system?",
    answer: "Rooftop solar requires very low maintenance. Cleaning the glass surface with water and a soft wiper once every 10 to 14 days removes dust and bird droppings, maximizing photon capture. UVR string inverters feature automated self-diagnosis alerts, warning you on your mobile app if a particular panel string is experiencing dust or shading losses.",
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

  // Live generation counters across Indian cities
  const [cityStats, setCityStats] = useState({
    pune: 1845.2,
    ahmedabad: 1422.8,
    noida: 911.5,
    bengaluru: 2045.4,
    co2Cumulative: 18442.8,
  });

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

  // Soft fluctuations for active generation stats
  useEffect(() => {
    const timer = setInterval(() => {
      setCityStats(prev => ({
        pune: Number((prev.pune + (Math.random() - 0.4) * 0.4).toFixed(1)),
        ahmedabad: Number((prev.ahmedabad + (Math.random() - 0.45) * 0.35).toFixed(1)),
        noida: Number((prev.noida + (Math.random() - 0.5) * 0.2).toFixed(1)),
        bengaluru: Number((prev.bengaluru + (Math.random() - 0.4) * 0.5).toFixed(1)),
        co2Cumulative: Number((prev.co2Cumulative + 0.02).toFixed(2)),
      }));
    }, 3000);
    return () => clearInterval(timer);
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
              href="tel:+912067189900"
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
              aria-label="Call +91 20 6718 9900"
            >
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="hidden xl:inline font-mono">+91 20 6718 9900</span>
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
                  href="tel:+912067189900"
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800/60 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                  +91 20 6718 9900
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
                      <Award className="w-4 h-4 text-blue-500" /> Tier-1 Engineering &bull; Powered by UVR TECHSOL
                    </span>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] font-sans">
                      <span className="text-gradient-primary">Next-Gen Solar Power &bull;</span> <br />
                      <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-400 bg-clip-text text-transparent hero-accent-gradient">
                        Zero Electricity Bills.
                      </span>
                    </h1>

                    <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl">
                      UVR Green Energies engineers custom, high-yield rooftop solar systems across India. Using bi-directional net-metering and PM Surya Ghar subsidies, we slash residential, commercial, and housing society electric tariffs to zero.
                    </p>

                    {/* Quick Stats Bento */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
                      <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-3 sm:p-4">
                        <div className="text-xl sm:text-2xl md:text-3xl font-black text-white font-mono">15K+</div>
                        <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-1">Solar Rooftops Deployed</div>
                      </div>
                      <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-3 sm:p-4">
                        <div className="text-xl sm:text-2xl md:text-3xl font-black text-cyan-400 font-mono">₹78K</div>
                        <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-1">Max Central Subsidy</div>
                      </div>
                      <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-3 sm:p-4">
                        <div className="text-xl sm:text-2xl md:text-3xl font-black text-indigo-400 font-mono">25 Yrs</div>
                        <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-1">Sustained Guarantee</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <a
                        href="#simulator"
                        className="flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-500/10 hover:scale-[1.02]"
                      >
                        <Compass className="w-4 h-4" /> Open Solar Sandbox
                      </a>
                      <a
                        href="#estimator"
                        onClick={goToEstimator}
                        className="flex items-center justify-center gap-2 py-3.5 px-6 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 rounded-xl font-bold text-sm transition-all"
                      >
                        PM Surya Ghar Subsidy Estimator
                      </a>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-[10px] sm:text-[11px] text-slate-500 font-mono">
                      <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" /> ALMM-Approved Components</span>
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
                          Actual Pune Site Photo
                        </span>
                        <div className="bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md flex items-center gap-1 animate-pulse">
                          <Sun className="w-3.5 h-3.5" /> High-Performance Active
                        </div>
                      </div>

                      <div className="relative z-10 space-y-4 on-image-text">
                        <div className="text-left space-y-1">
                          <h3 className="text-xl font-bold text-white tracking-tight">Vandana Bungalow Estate</h3>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Completed 12.5 kWp off-grid solar infrastructure capturing direct photons on top and reflected back-reflection off the white terrace floor.
                          </p>
                        </div>

                        {/* Specs Panel */}
                        <div className="bg-slate-950/90 border border-slate-850 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs font-mono">
                          <div>
                            <span className="text-slate-500 block text-[9px]">SYSTEM SIZING</span>
                            <span className="text-white font-bold">12.5 kWp Array</span>
                          </div>
                          <div className="sm:text-right">
                            <span className="text-slate-500 block text-[9px]">ANNUAL CASH SAVINGS</span>
                            <span className="text-cyan-400 font-bold">₹ 1,51,000/yr</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </section>

                {/* REAL-TIME COUNTRYWIDE GENERATION GRID */}
                <section className="bg-slate-900/40 border border-slate-850 p-6 md:p-8 rounded-3xl space-y-6 text-left">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <span className="text-orange-400 text-[10px] font-mono tracking-widest uppercase block">Live Environmental Telemetry</span>
                      <h3 className="text-xl font-bold text-white tracking-tight font-sans mt-0.5">UVR Countrywide Generation Ledger</h3>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 rounded-xl px-3 sm:px-4 py-2 font-mono text-[10px] sm:text-xs flex flex-wrap items-center gap-x-2 gap-y-1">
                      <div className="relative flex h-2.5 w-2.5 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </div>
                      <span className="text-slate-400">TODAY'S CARBON OFFSET:</span>
                      <span className="text-emerald-400 font-extrabold">{cityStats.co2Cumulative} Tons</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Pune */}
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900 relative overflow-hidden">
                      <span className="text-[10px] text-slate-500 font-mono">PUNE PLANT GRID</span>
                      <div className="text-xl font-bold text-white font-mono mt-1">{cityStats.pune} <span className="text-xs text-slate-500">kW</span></div>
                      <span className="text-[9px] text-slate-500 mt-1 block font-mono">110 residential hubs</span>
                      <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    {/* Ahmedabad */}
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900 relative overflow-hidden">
                      <span className="text-[10px] text-slate-500 font-mono">AHMEDABAD LIAISON</span>
                      <div className="text-xl font-bold text-white font-mono mt-1">{cityStats.ahmedabad} <span className="text-xs text-slate-500">kW</span></div>
                      <span className="text-[9px] text-slate-500 mt-1 block font-mono">92 residential hubs</span>
                      <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    {/* Noida */}
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900 relative overflow-hidden">
                      <span className="text-[10px] text-slate-500 font-mono">NOIDA HUBS</span>
                      <div className="text-xl font-bold text-white font-mono mt-1">{cityStats.noida} <span className="text-xs text-slate-500">kW</span></div>
                      <span className="text-[9px] text-slate-500 mt-1 block font-mono">48 system complexes</span>
                      <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    {/* Bengaluru */}
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900 relative overflow-hidden">
                      <span className="text-[10px] text-slate-500 font-mono">BENGALURU COMMERCIAL</span>
                      <div className="text-xl font-bold text-white font-mono mt-1">{cityStats.bengaluru} <span className="text-xs text-slate-500">kW</span></div>
                      <span className="text-[9px] text-slate-500 mt-1 block font-mono">14 corporate sites</span>
                      <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
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
                          <h4 className="text-base font-bold text-white">TOPCon Bifacial Dual-Glass</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Dual-glass architecture captures secondary light reflecting off your terrace floor (albedo effect), giving an average **12-15% increase** in total raw energy output.
                          </p>
                        </div>
                        <div className="border-t border-slate-900 pt-3 flex justify-between items-center text-[10px] font-mono">
                          <span className="text-slate-500">GUARANTEE SLA</span>
                          <span className="text-amber-400 font-bold">25 Years 87.4% Output</span>
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
                          <h4 className="text-base font-bold text-white">Smart IoT String Inverter</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Turn sunlight into grid-synchronized AC power. Features dual Maximum Power Point Tracking (MPPT) channels to optimize shaded panel strings, and Wi-Fi telemetry diagnostics.
                          </p>
                        </div>
                        <div className="border-t border-slate-900 pt-3 flex justify-between items-center text-[10px] font-mono">
                          <span className="text-slate-500">CONVERSION PEAK</span>
                          <span className="text-blue-400 font-bold">98.6% Symmetrical</span>
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
                          <h4 className="text-base font-bold text-white">Modular LiFePO4 Battery Vault</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Zero reliance on blackouts. High-safety lithium-iron phosphate vaults that automatically charge during high solar generation to backup deep air conditioner loads.
                          </p>
                        </div>
                        <div className="border-t border-slate-900 pt-3 flex justify-between items-center text-[10px] font-mono">
                          <span className="text-slate-500">DEEP CYCLES SLA</span>
                          <span className="text-emerald-400 font-bold">10 Years 6000 Cycles</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* EXPANSIVE INTERACTIVE VIDEO TOUR WALKTHROUGH */}
                <section className="bg-slate-900 border border-slate-850 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center gap-8 text-left relative overflow-hidden shadow-xl">
                  {/* Decorative mesh */}
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.1]" />
                  <div className="absolute top-0 right-0 w-80 h-full bg-blue-500/5 blur-3xl pointer-events-none" />

                  {/* Left (6 Cols equivalent) */}
                  <div className="lg:col-span-6 space-y-4 flex-1 relative z-10">
                    <span className="bg-orange-500/10 text-orange-400 text-[10px] font-mono px-3 py-1 rounded-full border border-orange-500/20 uppercase tracking-wider inline-block">
                      Enterprise Video Tour
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
                      High-Precision LIDAR Drone Survey &bull; Operational Video Walkthrough
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Curious how our technicians perform a complete 3D shadow evaluation in under 15 minutes? Watch this enterprise walkthrough detailing flight paths, solar angle simulation, and DISCOM liasons.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[10px] sm:text-[11px] font-mono">
                      <div className="flex items-center gap-2 text-slate-300">
                        <BadgeCheck className="w-4 h-4 text-emerald-400" />
                        <span> contactless 3D Scan</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <BadgeCheck className="w-4 h-4 text-emerald-400" />
                        <span> DISCOM NOC Approved</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <BadgeCheck className="w-4 h-4 text-emerald-400" />
                        <span> Pune HQ Engineers</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <BadgeCheck className="w-4 h-4 text-emerald-400" />
                        <span> 4.9 Star Rating</span>
                      </div>
                    </div>
                  </div>

                  {/* Right (Visual video placeholder) */}
                  <div className="lg:col-span-6 flex-1 w-full relative z-10">
                    <div className="relative aspect-video bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center group shadow-2xl cursor-pointer">
                      
                      {/* Placeholder thumbnail backdrop */}
                      <img 
                        src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80" 
                        alt="Video Thumbnail" 
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-[1.02] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent image-scrim-soft" />

                      {/* Glowing Pulsing Play Button */}
                      <div className="relative z-10 p-5 bg-orange-500 hover:bg-orange-600 text-slate-950 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20 hover:scale-105 transition-all">
                        <Play className="w-8 h-8 fill-slate-950 translate-x-0.5" />
                      </div>

                      {/* Video Length Badge */}
                      <span className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono rounded text-slate-400">
                        HD 03:45 MINS
                      </span>
                    </div>
                  </div>

                </section>

                {/* TESTIMONIALS & REVIEWS SLIDER */}
                <section className="bg-slate-900/20 border-t border-b border-slate-900 py-16 text-left">
                  <div className="text-center max-w-xl mx-auto mb-12">
                    <span className="text-xs font-bold text-orange-400 uppercase tracking-widest font-mono">Verified Solar Testimonials</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1.5 font-sans">
                      Client Success Ledger
                    </h2>
                    <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                      Hear directly from homeowners who eliminated high DISCOM utility tariffs using UVR systems.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TESTIMONIALS.map((t, idx) => (
                      <div key={idx} className="bg-slate-950 border border-slate-850 p-6 rounded-3xl flex flex-col justify-between h-full relative">
                        <div className="text-4xl text-slate-800 font-black absolute top-2 right-4 leading-none select-none">“</div>
                        
                        <div className="space-y-4">
                          <div className="flex gap-1">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <p className="text-xs text-slate-300 italic leading-relaxed relative z-10">
                            "{t.quote}"
                          </p>
                        </div>

                        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-900">
                          <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border border-slate-850 object-cover" />
                          <div>
                            <h4 className="text-xs font-bold text-white">{t.name}</h4>
                            <span className="text-[10px] text-slate-500 font-mono block mt-0.5">{t.location} &bull; <strong className="text-orange-400">{t.systemSize}</strong></span>
                          </div>
                        </div>
                      </div>
                    ))}
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

            {/* DRONE SURVEY / CONTACT */}
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
                <span>UVR TECHSOL Pvt. Ltd., 3rd Floor, Shreenath Plaza, Dnyaneshwar Paduka Chowk, FC Road, Pune, MH, India - 411005</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a href="mailto:info@uvrtechsol.com" className="hover:underline">info@uvrtechsol.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-center sm:text-left">
          <span>&copy; {new Date().getFullYear()} UVR Green Energies. All Rights Reserved.</span>
          <span className="text-slate-400 max-w-md">Powered by UVR TECHSOL Pvt. Ltd.</span>
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
                  <Sparkles className="w-5 h-5 text-orange-500" /> Book Drone Roof Survey
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
                    *Our LIDAR drone survey is contactless. Our remote pilot scans your roof shape within 15 minutes, generating shadow-free CAD blueprints.
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
                      Congratulations, <strong>{bookingForm.name}</strong>! Your LIDAR mapping slot for <strong>{bookingForm.slot}</strong> is locked. Our dispatch team will call you shortly.
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
