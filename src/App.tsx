import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Ruler, 
  MapPin, 
  Sliders, 
  CheckCircle2, 
  ChevronDown, 
  PhoneCall, 
  MessageSquare, 
  Award, 
  Users, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  Menu, 
  X, 
  ShieldCheck, 
  Hammer, 
  Quote 
} from 'lucide-react';
import { FurnitureType } from './types';
import { PREMIUM_MATERIALS, HARDWARE_STYLES, CUSTOMIZATION_RANGES, SURAT_AREAS, FAQS, TESTIMONIALS } from './data';
import FurnitureVisualizer3D from './components/FurnitureVisualizer3D';

export default function App() {
  // Navigation active anchors
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Customizer active states
  const [currType, setCurrType] = useState<FurnitureType>(FurnitureType.WARDROBE);
  const [currMaterialId, setCurrMaterialId] = useState('walnut');
  const [currHardwareId, setCurrHardwareId] = useState('handless');
  const [width, setWidth] = useState(6);
  const [height, setHeight] = useState(8);
  const [depth, setDepth] = useState(2);
  const [hasLights, setHasLights] = useState(true);
  const [extraStorage, setExtraStorage] = useState(true);

  // State counters
  const [buildingsCount, setBuildingsCount] = useState(0);
  const [experienceCount, setExperienceCount] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  const [familiesCount, setFamiliesCount] = useState(0);

  // Active FAQ filter
  const [faqCategory, setFaqCategory] = useState<'all' | 'customization' | 'service' | 'pricing' | 'timeline'>('all');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Active design showcase categories
  const [showcaseFilter, setShowcaseFilter] = useState<'all' | 'beds' | 'wardrobes' | 'kitchens' | 'gates'>('all');

  // Lead Form state
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadProjectType, setLeadProjectType] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Reset sliders when user changes active furniture types
  const handleTypeChange = (type: FurnitureType) => {
    setCurrType(type);
    const defaults = CUSTOMIZATION_RANGES[type];
    setWidth(defaults.width.default);
    setHeight(defaults.height.default);
    setDepth(defaults.depth.default);
  };

  // Find object details
  const activeMaterial = PREMIUM_MATERIALS.find(m => m.id === currMaterialId) || PREMIUM_MATERIALS[0];
  const activeHardware = HARDWARE_STYLES.find(h => h.id === currHardwareId) || HARDWARE_STYLES[0];

  // Calculate live estimate
  const rangeInfo = CUSTOMIZATION_RANGES[currType];
  const volumeSquareFeet = width * height; // face area
  const depthFactor = depth / rangeInfo.depth.default;
  
  // Premium multipliers
  const baseRatePerSqFt = rangeInfo.basePrice / (rangeInfo.width.default * rangeInfo.height.default);
  const baseCost = baseRatePerSqFt * volumeSquareFeet * depthFactor;
  const materialCost = baseCost * (activeMaterial.priceFactor - 1);
  const hardwareCost = activeHardware.price;
  const lightsCost = hasLights ? 4500 : 0;
  const storageCost = extraStorage ? 7500 : 0;
  const totalCost = Math.round(baseCost + materialCost + hardwareCost + lightsCost + storageCost);

  // Stats incremental ticker trigger
  useEffect(() => {
    const handleScroll = () => {
      const statsSection = document.getElementById('stats-bar');
      if (statsSection) {
        const top = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight - 50) {
          // Trigger smooth incremental progression
          animateCount(12, setBuildingsCount);
          animateCount(16, setExperienceCount);
          animateCount(16, setTeamCount);
          animateCount(500, setFamiliesCount, 12);
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const animateCount = (target: number, setter: React.Dispatch<React.SetStateAction<number>>, speed = 40) => {
    let current = 0;
    const increment = Math.ceil(target / speed);
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setter(target);
        clearInterval(interval);
      } else {
        setter(current);
      }
    }, 25);
  };

  // Dynamic Navigation highlighting
  useEffect(() => {
    const handleNavHighlight = () => {
      const sections = ['hero', 'customizer', 'services', 'areas', 'why', 'faq', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleNavHighlight);
    return () => window.removeEventListener('scroll', handleNavHighlight);
  }, []);

  // WhatsApp dispatch payload compiler
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    const messagePayload = `Hi Virat Furniture Surat! My name is ${leadName}. Phone: ${leadPhone}.${leadProjectType ? ' I am interested in: ' + leadProjectType + '.' : ''}${leadMessage ? ' Details: ' + leadMessage : ''}`;
    
    setFormSubmitted(true);
    setTimeout(() => {
      const waLink = `https://wa.me/919725713944?text=${encodeURIComponent(messagePayload)}`;
      window.open(waLink, '_blank', 'noopener,noreferrer');
      setFormSubmitted(false);
    }, 1000);
  };

  // Send interactive customizer estimate quote to WhatsApp
  const handleSendCustomizedQuoteUrl = () => {
    const messagePayload = `Hi Virat Furniture! I configured a customized ${currType.toLowerCase()} on your online planner. Dimensions: ${width}ft W x ${height}ft H x ${depth}ft D. Material: ${activeMaterial.name}. Hardware: ${activeHardware.name}.${hasLights ? ' With LED spot lighting.' : ''}${extraStorage ? ' With added interior cabinet drawer vaults.' : ''} Estimated Cost online: ₹${totalCost.toLocaleString('en-IN')}. Could we schedule a free site measurement in Surat to verify?`;
    const waLink = `https://wa.me/919725713944?text=${encodeURIComponent(messagePayload)}`;
    window.open(waLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#FAF8F5] text-[#2D221C] font-sans antialiased selection:bg-amber-100 selection:text-amber-900 min-h-screen">
      
      {/* LOCAL SURAT TOP BANNER METRICS */}
      <div className="bg-[#3E2C23] text-[#EDE8DF] text-[11px] font-medium py-1.5 px-5 tracking-widest text-center flex flex-wrap justify-center items-center gap-x-6 gap-y-1 border-b border-amber-950/20">
        <span className="flex items-center gap-1.5 uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          ESTD. 2008 &bull; Premium Surat Modular Carpentry
        </span>
        <span className="hidden sm:inline w-1 h-1 rounded-full bg-amber-400/50" />
        <span className="uppercase">Workshop: Adajan Gam, Surat, Gujarat</span>
        <span className="hidden md:inline w-1 h-1 rounded-full bg-amber-400/50" />
        <span className="flex items-center gap-1">
          📍 Servicing: Vesu, Pal, Adajan &amp; Gaurav Path
        </span>
      </div>

      {/* HEADER NAVIGATIONBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-amber-900/5">
        <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-20 flex items-center justify-between" aria-label="Main navigation">
          
          {/* Elegant display serif typography */}
          <a href="#hero" className="flex items-baseline gap-1 group">
            <span className="font-serif text-2xl lg:text-3xl font-extrabold tracking-tight text-[#3E2C23]">
              Virat<span className="text-[#B8860B] font-sans font-light">Furniture</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] group-hover:scale-125 transition-transform" />
          </a>

          {/* Nav Links */}
          <ul className="hidden lg:flex items-center gap-8 text-[13px] font-semibold tracking-wider uppercase text-[#5A4B41]">
            <li>
              <a href="#customizer" className={`hover:text-[#3E2C23] transition-colors pb-1 border-b-2 ${activeSection === 'customizer' ? 'border-[#B8860B] text-[#3E2C23]' : 'border-transparent'}`}>
                3D Customizer
              </a>
            </li>
            <li>
              <a href="#services" className={`hover:text-[#3E2C23] transition-colors pb-1 border-b-2 ${activeSection === 'services' ? 'border-[#B8860B] text-[#3E2C23]' : 'border-transparent'}`}>
                Interior Catalog
              </a>
            </li>
            <li>
              <a href="#areas" className={`hover:text-[#3E2C23] transition-colors pb-1 border-b-2 ${activeSection === 'areas' ? 'border-[#B8860B] text-[#3E2C23]' : 'border-transparent'}`}>
                Surat Hotspots
              </a>
            </li>
            <li>
              <a href="#why" className={`hover:text-[#3E2C23] transition-colors pb-1 border-b-2 ${activeSection === 'why' ? 'border-[#B8860B] text-[#3E2C23]' : 'border-transparent'}`}>
                Why Us
              </a>
            </li>
            <li>
              <a href="#faq" className={`hover:text-[#3E2C23] transition-colors pb-1 border-b-2 ${activeSection === 'faq' ? 'border-[#B8860B] text-[#3E2C23]' : 'border-transparent'}`}>
                FAQ
              </a>
            </li>
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:+919725713944" 
              className="bg-[#3E2C23] text-white hover:bg-[#B8860B] transition-all px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-md flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              097257 13944
            </a>
          </div>

          {/* Drawer trigger */}
          <button 
            className="lg:hidden p-2 text-[#3E2C23] hover:text-[#B8860B] transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* MOBILE FULL-SCREEN NAVIGATION DROPDOWN */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-[#F9F6F0] p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-10">
                <span className="font-serif text-2xl font-black text-[#3E2C23]">Virat<span className="font-sans text-[#B8860B] font-light">Furniture</span></span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-white/80 border border-amber-900/10 cursor-pointer text-[#3E2C23]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <ul className="flex flex-col gap-6 text-lg font-bold text-[#3E2C23] font-serif">
                <li>
                  <a href="#customizer" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#B8860B] transition-colors">
                    3D Configurator
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#B8860B] transition-colors">
                    Commercial Catalog
                  </a>
                </li>
                <li>
                  <a href="#areas" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#B8860B] transition-colors">
                    Serviceable Areas
                  </a>
                </li>
                <li>
                  <a href="#why" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#B8860B] transition-colors">
                    Our Quality Promise
                  </a>
                </li>
                <li>
                  <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#B8860B] transition-colors">
                    F.A.Q.
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <a 
                href="tel:+919725713944"
                className="w-full text-center bg-[#3E2C23] text-white py-4 rounded-xl font-bold tracking-widest text-sm uppercase flex items-center justify-center gap-2 shadow-lg"
              >
                <PhoneCall className="w-4 h-4" />
                Call Contractor Directly
              </a>
              <a 
                href="https://wa.me/919725713944?text=Hi%20Virat%20Furniture%2C%20I'd%20like%20to%20quote%3A"
                target="_blank"
                rel="noopener"
                className="w-full text-center bg-emerald-600 text-white py-4 rounded-xl font-bold tracking-widest text-sm uppercase flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content">

        {/* HERO SECTION WITH STATEMENT TYPOGRAPHY AND MULTIDIMENSIONAL ACCENTS */}
        <section id="hero" className="relative pt-12 pb-24 lg:pt-20 lg:pb-36 overflow-hidden">
          {/* Subtle radial backdrop patterns to emulate studio photography ambient drop-shadow */}
          <div className="absolute top-0 right-0 w-[45vw] h-[45vw] bg-radial from-amber-100/30 to-transparent rounded-full -translate-y-1/4 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[35vw] h-[35vw] bg-radial from-amber-200/10 to-transparent rounded-full translate-y-1/4 -translate-x-1/4 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="grid lg:grid-template-columns grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left text introduction */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                
                {/* Micro badge header */}
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-950/5 to-amber-950/10 border border-amber-950/10 px-4 py-1.5 rounded-full text-xs font-bold text-[#B8860B] tracking-widest uppercase mb-6 shadow-sm">
                  <Award className="w-4 h-4" />
                  Premium Carpentry Contractor
                </span>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-[#2A1E17] leading-[1.08] tracking-tight mb-6">
                  Experience Modular Furniture in <span className="text-[#B8860B] relative italic font-normal">
                    Interactive 3D
                    <svg className="absolute left-0 -bottom-2 w-full h-3 text-amber-500/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none" />
                    </svg>
                  </span>
                </h1>

                <p className="text-[#5A4B41] text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
                  Construct your ideal bed, customized sliding wardrobe (almari), modular kitchen, or solid teak gate from the comfort of your home. Adjust dimensions, toggle premium materials, and request local on-site visits instantly. Handcrafted directly in Adajan Gam, Surat.
                </p>

                {/* Horizontal Action Bars */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <a 
                    href="#customizer" 
                    className="bg-[#3E2C23] text-white hover:bg-[#B8860B] hover:-translate-y-0.5 transition-all px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase text-center shadow-lg flex items-center justify-center gap-2"
                  >
                    <Sliders className="w-4 h-4" />
                    Configure in 3D now
                  </a>
                  <a 
                    href="#contact" 
                    className="border border-[#3E2C23] text-[#3E2C23] hover:bg-[#3E2C23] hover:text-white transition-all px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase text-center"
                  >
                    Request site visit
                  </a>
                </div>

                {/* Tiny proof row */}
                <div className="grid grid-cols-3 gap-6 sm:gap-8 mt-12 pt-8 border-t border-amber-900/5 w-full">
                  <div>
                    <span className="block font-serif text-2xl font-bold text-[#3E2C23]">16+ Yrs</span>
                    <span className="text-xs text-[#8A786E] tracking-wider uppercase font-medium">Bespoke Experience</span>
                  </div>
                  <div>
                    <span className="block font-serif text-2xl font-bold text-[#3E2C23]">500+</span>
                    <span className="text-xs text-[#8A786E] tracking-wider uppercase font-medium">Surat Families Served</span>
                  </div>
                  <div>
                    <span className="block font-serif text-2xl font-bold text-[#3E2C23]">100%</span>
                    <span className="text-xs text-[#8A786E] tracking-wider uppercase font-medium">Marine Plywood</span>
                  </div>
                </div>

              </div>

              {/* Right: Immersive 3D Customization Interface */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-amber-900/10 shadow-2xl relative">
                
                {/* 3D floating visual aids for premium look */}
                <div className="absolute -top-3 -left-3 bg-[#B8860B] text-white text-[9px] font-black tracking-widest px-3 py-1 rounded shadow-md uppercase">
                  60 FPS Live View
                </div>

                <div className="mb-4 flex justify-between items-center bg-amber-50/50 p-2.5 rounded-lg border border-amber-900/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B8860B]" />
                    <span className="text-xs font-bold text-[#3E2C23] uppercase tracking-wider">Preview Configurator</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#8A786E] uppercase font-bold">Rotatable</span>
                </div>

                {/* 3D Core Frame embedded inside Hero and synchronized to customizer */}
                <FurnitureVisualizer3D 
                  type={currType}
                  width={width}
                  height={height}
                  depth={depth}
                  selectedMaterial={activeMaterial}
                  selectedHardware={activeHardware}
                  hasLights={hasLights}
                  extraStorage={extraStorage}
                />

                <div className="mt-4 text-center">
                  <p className="text-[11px] text-[#8A786E] leading-relaxed">
                    Adjust material colors and size specifications inside the setup module below.
                  </p>
                  <a 
                    href="#customizer" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B8860B] hover:text-[#3E2C23] transition-colors mt-2"
                  >
                    Open advanced calculator tools 
                    <ChevronDown className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* INCREMENTAL LOCAL STATS BAR */}
        <section id="stats-bar" className="bg-white border-y border-amber-900/5 py-12">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
              
              <div className="text-center">
                <span className="block font-serif text-4xl lg:text-5xl font-black text-[#3E2C23]">
                  {buildingsCount}
                </span>
                <span className="block text-xs uppercase tracking-widest text-[#B8860B] mt-2 font-bold font-sans">
                  Surat Showrooms Serviced
                </span>
              </div>
              
              <div className="text-center">
                <span className="block font-serif text-4xl lg:text-5xl font-black text-[#3E2C23]">
                  {teamCount}
                </span>
                <span className="block text-xs uppercase tracking-widest text-[#B8860B] mt-2 font-bold font-sans">
                  Carpentry Specialists
                </span>
              </div>
              
              <div className="text-center">
                <span className="block font-serif text-4xl lg:text-5xl font-black text-[#3E2C23]">
                  {experienceCount}+
                </span>
                <span className="block text-xs uppercase tracking-widest text-[#B8860B] mt-2 font-bold font-sans">
                  Years Professional Craft
                </span>
              </div>
              
              <div className="text-center">
                <span className="block font-serif text-4xl lg:text-5xl font-black text-[#3E2C23]">
                  {familiesCount}+
                </span>
                <span className="block text-xs uppercase tracking-widest text-[#B8860B] mt-2 font-bold font-sans font-medium">
                  Homes Upgraded
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* INTERACTIVE 3D CUSTOMIZER CONFIGURATOR & ESTIMATOR PLATFORM */}
        <section id="customizer" className="py-24 bg-gradient-to-b from-[#FAF8F5] to-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-[#B8860B] tracking-widest uppercase mb-3 block">
                Digital Studio
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#3E2C23] mb-4">
                Personalized Design &amp; Fast Quote
              </h2>
              <div className="w-16 h-1 bg-[#B8860B] mx-auto rounded mb-5" />
              <p className="text-[#5A4B41] max-w-2xl mx-auto text-sm sm:text-base">
                Use our dynamic blueprint customizer to calculate furniture estimates. Choose materials, handles, and custom lofts. Final quotation links to our personal WhatsApp page.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-start">
              
              {/* Configurator Sliders Controls - Left 5 cols */}
              <div className="lg:col-span-5 bg-[#FAF8F5] border border-amber-900/10 p-6 md:p-8 rounded-2xl flex flex-col gap-6">
                
                {/* Step 1: Select Category */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#B8860B] font-bold mb-3.5">
                    1. Select Furniture Type
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { type: FurnitureType.WARDROBE, label: 'Almari / Wardrobe', emoji: '🚪' },
                      { type: FurnitureType.BED, label: 'Modular Bed', emoji: '🛏' },
                      { type: FurnitureType.KITCHEN, label: 'Modular Kitchen', emoji: '🍳' },
                      { type: FurnitureType.GATE, label: 'Main Entrance Gate', emoji: '🏡' }
                    ].map((btn) => (
                      <button
                        key={btn.type}
                        onClick={() => handleTypeChange(btn.type)}
                        className={`py-3 px-4 rounded-xl text-xs font-bold tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${currType === btn.type ? 'bg-[#3E2C23] text-white shadow-md' : 'bg-white text-[#5A4B41] border border-amber-900/5 hover:border-[#B8860B]'}`}
                      >
                        <span>{btn.emoji}</span>
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                <hr className="border-amber-900/5" aria-hidden="true" />

                {/* Step 2: Dimensions adjusting */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-xs uppercase tracking-widest text-[#B8860B] font-bold">
                      2. Scale Blueprint (Feet)
                    </label>
                    <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      Customizable
                    </span>
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* Width slider */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-[#5A4B41] mb-1.5">
                        <span>{rangeInfo.width.label}</span>
                        <span className="font-mono text-[#B8860B] font-extrabold">{width} ft</span>
                      </div>
                      <input 
                        type="range"
                        min={rangeInfo.width.min}
                        max={rangeInfo.width.max}
                        step={rangeInfo.width.step}
                        value={width}
                        onChange={(e) => setWidth(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-amber-950/10 rounded-lg appearance-none cursor-pointer accent-[#B8860B]"
                      />
                    </div>

                    {/* Height slider */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-[#5A4B41] mb-1.5">
                        <span>{rangeInfo.height.label}</span>
                        <span className="font-mono text-[#B8860B] font-extrabold">{height} ft</span>
                      </div>
                      <input 
                        type="range"
                        min={rangeInfo.height.min}
                        max={rangeInfo.height.max}
                        step={rangeInfo.height.step}
                        value={height}
                        onChange={(e) => setHeight(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-amber-950/10 rounded-lg appearance-none cursor-pointer accent-[#B8860B]"
                      />
                    </div>

                    {/* Depth slider */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-[#5A4B41] mb-1.5">
                        <span>{rangeInfo.depth.label}</span>
                        <span className="font-mono text-[#B8860B] font-extrabold">{depth} ft</span>
                      </div>
                      <input 
                        type="range"
                        min={rangeInfo.depth.min}
                        max={rangeInfo.depth.max}
                        step={rangeInfo.depth.step}
                        value={depth}
                        onChange={(e) => setDepth(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-amber-950/10 rounded-lg appearance-none cursor-pointer accent-[#B8860B]"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-amber-900/5" aria-hidden="true" />

                {/* Step 3: Material selection */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#B8860B] font-bold mb-3">
                    3. Wood Finish / Laminate Style
                  </label>
                  <div className="flex flex-col gap-2.5">
                    {PREMIUM_MATERIALS.map((mat) => (
                      <button
                        key={mat.id}
                        onClick={() => setCurrMaterialId(mat.id)}
                        className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${currMaterialId === mat.id ? 'border-[#B8860B] bg-amber-50/50' : 'border-amber-900/5 bg-white hover:border-amber-900/20'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span 
                            className="w-8 h-8 rounded-lg shadow-sm border border-black/10 flex-shrink-0" 
                            style={{ backgroundColor: mat.color }}
                          />
                          <div>
                            <span className="block text-xs font-bold text-[#3E2C23]">{mat.name}</span>
                            <span className="block text-[10px] text-[#8A786E]">{mat.textureLabel}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-[#B8860B] font-bold">
                          {mat.priceFactor === 1 ? 'Base Rate' : `+${Math.round((mat.priceFactor - 1) * 100)}%`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <hr className="border-amber-900/5" />

                {/* Step 4: Hardware Styles */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#B8860B] font-bold mb-3">
                    4. Handle Hardware Profile
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {HARDWARE_STYLES.map((hard) => (
                      <button
                        key={hard.id}
                        onClick={() => setCurrHardwareId(hard.id)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${currHardwareId === hard.id ? 'border-[#3E2C23] bg-white shadow-sm' : 'border-amber-900/5 bg-white/40 hover:border-amber-900/20'}`}
                      >
                        <span className="block text-xs font-bold text-[#3E2C23] leading-snug">{hard.name}</span>
                        <span className="block text-[10px] text-[#B8860B] mt-1 font-semibold">
                          ₹{hard.price.toLocaleString('en-IN')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <hr className="border-amber-900/5" />

                {/* Toggles extras */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#B8860B] font-bold mb-3">
                    5. Accessories &amp; Upgrades
                  </label>
                  <div className="flex flex-col gap-2.5">
                    <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-amber-900/5 cursor-pointer hover:bg-amber-50/20">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#3E2C23]">Integrated Ambient Lighting</span>
                        <span className="text-[10px] text-[#8A786E]">Under-cabinet / headboard LED profiles (+₹4,500)</span>
                      </div>
                      <input 
                        type="checkbox"
                        checked={hasLights}
                        onChange={(e) => setHasLights(e.target.checked)}
                        className="w-4 h-4 text-[#B8860B] border-amber-300 rounded focus:ring-0 accent-[#B8860B] cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-amber-900/5 cursor-pointer hover:bg-amber-50/20">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#3E2C23]">Premium Internal Accessories</span>
                        <span className="text-[10px] text-[#8A786E]">Double soft-drawers or extra lofts (+₹7,500)</span>
                      </div>
                      <input 
                        type="checkbox"
                        checked={extraStorage}
                        onChange={(e) => setExtraStorage(e.target.checked)}
                        className="w-4 h-4 text-[#B8860B] border-amber-300 rounded focus:ring-0 accent-[#B8860B] cursor-pointer"
                      />
                    </label>
                  </div>
                </div>

              </div>

              {/* Live Visualization Display & Live Price Quote Sheet - Right 7 cols */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                
                {/* 3D Canvas box */}
                <div className="bg-white border border-amber-900/10 p-6 rounded-2xl shadow-xl">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                    <div>
                      <h3 className="text-indigo-950 font-serif font-bold text-lg flex items-center gap-2">
                        <Compass className="w-5 h-5 text-[#B8860B]" />
                        Active 3D Digital Model
                      </h3>
                      <p className="text-xs text-[#8A786E]">
                        3D perspective updates live according to your measurements.
                      </p>
                    </div>
                    <span className="bg-[#B8860B] text-white text-[9px] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block">
                      Surat Spec: BWR Ply
                    </span>
                  </div>

                  <FurnitureVisualizer3D 
                    type={currType}
                    width={width}
                    height={height}
                    depth={depth}
                    selectedMaterial={activeMaterial}
                    selectedHardware={activeHardware}
                    hasLights={hasLights}
                    extraStorage={extraStorage}
                  />

                  {/* Blueprint label notes */}
                  <div className="grid grid-cols-3 gap-2 mt-4 text-center bg-[#FAF8F5] p-3 rounded-xl border border-amber-900/5">
                    <div>
                      <span className="block text-[10px] uppercase text-[#8A786E] tracking-wider">Width</span>
                      <span className="text-xs font-bold text-[#3E2C23] font-mono">{width} feet</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase text-[#8A786E] tracking-wider">Height</span>
                      <span className="text-xs font-bold text-[#3E2C23] font-mono">{height} feet</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase text-[#8A786E] tracking-wider">Depth</span>
                      <span className="text-xs font-bold text-[#3E2C23] font-mono">{depth} feet</span>
                    </div>
                  </div>
                </div>

                {/* Estimate Bill Sheet */}
                <div className="bg-[#3E2C23] text-[#EDE8DF] p-6 lg:p-8 rounded-2xl border border-amber-950/20 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full pointer-events-none translate-x-12 -translate-y-12" />
                  
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] tracking-widest font-bold text-[#D4A037] uppercase block mb-1">
                        Quotation Estimate
                      </span>
                      <h4 className="font-serif text-2xl font-bold">Virat Itemized Estimate</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] bg-white/10 text-white px-3 py-1 rounded-full uppercase font-bold tracking-wider">
                        Surat Local Rates
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3.5 text-sm mb-6 border-b border-white/15 pb-6">
                    <div className="flex justify-between">
                      <span className="text-white/70">Base {rangeInfo.unitName} Rate:</span>
                      <span className="font-mono text-white font-medium">₹{Math.round(baseCost).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Material Multiplier ({activeMaterial.name}):</span>
                      <span className="font-mono text-white font-medium">+₹{Math.round(materialCost).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Hardware Fittings Selection:</span>
                      <span className="font-mono text-white font-medium">₹{hardwareCost.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Spot LED Profiling &amp; Cabling:</span>
                      <span className="font-mono text-white font-medium">₹{lightsCost.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Cabinet Drawer Vault upgrades:</span>
                      <span className="font-mono text-white font-medium">₹{storageCost.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                      <span className="text-[11px] text-white/50 tracking-wider uppercase block">
                        Estimated Final Price
                      </span>
                      <strong className="text-[#D4A037] text-3xl lg:text-4xl font-black font-serif">
                        ₹{totalCost.toLocaleString('en-IN')}*
                      </strong>
                      <span className="block text-[10px] text-white/40 mt-1">
                        *Includes pure IS:710 Marine Ply, fabrication woodwork &amp; standard Surat local fitting.
                      </span>
                    </div>

                    <div className="w-full sm:w-auto">
                      <button
                        onClick={handleSendCustomizedQuoteUrl}
                        className="w-full bg-[#D4A037] text-[#3E2C23] hover:bg-[#FAF8F5] font-bold tracking-wider text-xs uppercase px-6 py-4 rounded-full shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        id="btn-whatsapp-customizer"
                      >
                        <MessageSquare className="w-4 h-4 fill-[#3E2C23]" />
                        Book Estimate on WhatsApp
                      </button>
                    </div>
                  </div>

                  {/* Important warning notice about fake pricing maps */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-start gap-2.5 text-[11px] text-white/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Surat Proximity offer:</strong> We guarantee the lowest price in Adajan-Vesu region because our workshop sits in Adajan Gam, meaning we bear zero transportation or intermediary agents cost.
                    </span>
                  </div>

                </div>

              </div>
              
            </div>

          </div>
        </section>

        {/* COMPREHENSIVE INTERIOR CATALOG SHOWCASE */}
        <section id="services" className="py-24 bg-white border-t border-amber-900/5">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
              <div>
                <span className="text-xs font-bold text-[#B8860B] tracking-widest uppercase mb-3 block">
                  Product Offerings
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#3E2C23]">
                  What We Manufacture
                </h2>
              </div>
              
              {/* Category selector filtering options */}
              <div className="flex flex-wrap gap-2 text-xs font-bold tracking-wider uppercase">
                {[
                  { id: 'all', label: 'All Catalog' },
                  { id: 'beds', label: 'Beds &amp; Cots' },
                  { id: 'wardrobes', label: 'Almari/Wardrobe' },
                  { id: 'kitchens', label: 'Kitchen Kits' },
                  { id: 'gates', label: 'Gates &amp; Doors' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setShowcaseFilter(tab.id as any)}
                    className={`px-4.5 py-2.5 rounded-full border transition-all cursor-pointer ${showcaseFilter === tab.id ? 'bg-[#3E2C23] text-white border-[#3E2C23] shadow-md' : 'bg-[#FAF8F5] text-[#5A4B41] border-amber-900/5 hover:border-amber-900/20'}`}
                  >
                    {tab.label === 'All Catalog' ? 'All Catalog' : tab.label.replace('amp;', '')}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Card 1: Custom Bed Frame */}
              {(showcaseFilter === 'all' || showcaseFilter === 'beds') && (
                <article className="bg-[#FAF8F5] rounded-2xl overflow-hidden border border-amber-900/5 hover:-translate-y-1 hover:shadow-xl transition-all flex flex-col justify-between">
                  <div>
                    <div className="relative">
                      <img 
                        src="https://picsum.photos/seed/suratbed/600/400" 
                        alt="Custom Teak Wood Queen Bed in Surat" 
                        referrerPolicy="no-referrer"
                        className="w-full h-56 object-cover"
                      />
                      <span className="absolute top-4 left-4 bg-[#3E2C23] text-white text-[10px] font-bold tracking-widest uppercase py-1 px-3.5 rounded shadow">
                        Beds &amp; Cots
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-[#3E2C23] mb-2 leading-tight">
                        Platform Storage Beds
                      </h3>
                      <p className="text-xs text-[#B8860B] font-bold mb-3 tracking-wide uppercase">
                        Teak plywood &bull; 1.5 inch solid padding
                      </p>
                      <p className="text-sm text-[#5A4B41] leading-relaxed">
                        Features under-bed heavy load hydraulics, soft cushioned backboard, and customized side drawers. Designed using water-resistant boiling commercial plywood.
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2 border-t border-amber-900/5 flex justify-between items-center">
                    <span className="text-xs text-[#8A786E] font-medium">Bespoke pricing:</span>
                    <strong className="text-[#3E2C23] font-serif text-lg">From ₹32,000*</strong>
                  </div>
                </article>
              )}

              {/* Card 2: Almari / Wardrobe */}
              {(showcaseFilter === 'all' || showcaseFilter === 'wardrobes') && (
                <article className="bg-[#FAF8F5] rounded-2xl overflow-hidden border border-amber-900/5 hover:-translate-y-1 hover:shadow-xl transition-all flex flex-col justify-between">
                  <div>
                    <div className="relative">
                      <img 
                        src="https://picsum.photos/seed/suratwardrobe/600/400" 
                        alt="Modular sliding glass wardrobe built in Surat" 
                        referrerPolicy="no-referrer"
                        className="w-full h-56 object-cover"
                      />
                      <span className="absolute top-4 left-4 bg-[#3E2C23] text-white text-[10px] font-bold tracking-widest uppercase py-1 px-3.5 rounded shadow">
                        Wardrobes
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-[#3E2C23] mb-2 leading-tight">
                        G-Profile Sliding Wardrobes
                      </h3>
                      <p className="text-xs text-[#B8860B] font-bold mb-3 tracking-wide uppercase">
                        Anti-fungal acrylic panels &bull; Hettich sliders
                      </p>
                      <p className="text-sm text-[#5A4B41] leading-relaxed">
                        High capacity cabinets with integrated double hanging rods, secret safety lockers, internal automatic sensor LEDs, and spacious top storage lofts to standard size.
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2 border-t border-amber-900/5 flex justify-between items-center">
                    <span className="text-xs text-[#8A786E] font-medium">Bespoke pricing:</span>
                    <strong className="text-[#3E2C23] font-serif text-lg">From ₹1,400 / sq.ft.*</strong>
                  </div>
                </article>
              )}

              {/* Card 3: Modular Kitchen */}
              {(showcaseFilter === 'all' || showcaseFilter === 'kitchens') && (
                <article className="bg-[#FAF8F5] rounded-2xl overflow-hidden border border-amber-900/5 hover:-translate-y-1 hover:shadow-xl transition-all flex flex-col justify-between">
                  <div>
                    <div className="relative">
                      <img 
                        src="https://picsum.photos/seed/suratkitchen/600/400" 
                        alt="High glaze white modular kitchen by Virat Furniture Surat" 
                        referrerPolicy="no-referrer"
                        className="w-full h-56 object-cover"
                      />
                      <span className="absolute top-4 left-4 bg-[#3E2C23] text-white text-[10px] font-bold tracking-widest uppercase py-1 px-3.5 rounded shadow">
                        Kitchen Sets
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-[#3E2C23] mb-2 leading-tight">
                        L-Shaped High-End Kitchens
                      </h3>
                      <p className="text-xs text-[#B8860B] font-bold mb-3 tracking-wide uppercase">
                        Anti-scratch materials &bull; Soft Close dampers
                      </p>
                      <p className="text-sm text-[#5A4B41] leading-relaxed">
                        Constructed using boiling-marine commercial ply. Rustproof steel hardware baskets, spice pull-out containers, separate chimney duct enclosures, and elegant gold trims.
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2 border-t border-amber-900/5 flex justify-between items-center">
                    <span className="text-xs text-[#8A786E] font-medium">Bespoke pricing:</span>
                    <strong className="text-[#3E2C23] font-serif text-lg">From ₹85,000*</strong>
                  </div>
                </article>
              )}

              {/* Card 4: Solid Main Gate */}
              {(showcaseFilter === 'all' || showcaseFilter === 'gates') && (
                <article className="bg-[#FAF8F5] rounded-2xl overflow-hidden border border-amber-900/5 hover:-translate-y-1 hover:shadow-xl transition-all flex flex-col justify-between">
                  <div>
                    <div className="relative">
                      <img 
                        src="https://picsum.photos/seed/suratgate/600/400" 
                        alt="Teakwood and steel designer entry gate" 
                        referrerPolicy="no-referrer"
                        className="w-full h-56 object-cover"
                      />
                      <span className="absolute top-4 left-4 bg-[#3E2C23] text-white text-[10px] font-bold tracking-widest uppercase py-1 px-3.5 rounded shadow">
                        Main Gates &amp; Doors
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-[#3E2C23] mb-2 leading-tight">
                        Wood-Steel Designer Gates
                      </h3>
                      <p className="text-xs text-[#B8860B] font-bold mb-3 tracking-wide uppercase">
                        Burmese Teak slats &bull; Outdoor Rustproof MS
                      </p>
                      <p className="text-sm text-[#5A4B41] leading-relaxed">
                        Secure architectural gates with solid seasoned wood slats. Durable against heavy Surat monsoon rains. Fitted with solid iron pivots and premium safety latches.
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2 border-t border-amber-900/5 flex justify-between items-center">
                    <span className="text-xs text-[#8A786E] font-medium">Bespoke pricing:</span>
                    <strong className="text-[#3E2C23] font-serif text-lg">From ₹28,000*</strong>
                  </div>
                </article>
              )}

              {/* Card 5: Wall Cabinets */}
              {(showcaseFilter === 'all' || showcaseFilter === 'wardrobes') && (
                <article className="bg-[#FAF8F5] rounded-2xl overflow-hidden border border-amber-900/5 hover:-translate-y-1 hover:shadow-xl transition-all flex flex-col justify-between">
                  <div>
                    <div className="relative">
                      <img 
                        src="https://picsum.photos/seed/suratcabinet/600/400" 
                        alt="Premium TV setup unit in Surat with matte graphite color" 
                        referrerPolicy="no-referrer"
                        className="w-full h-56 object-cover"
                      />
                      <span className="absolute top-4 left-4 bg-[#3E2C23] text-white text-[10px] font-bold tracking-widest uppercase py-1 px-3.5 rounded shadow">
                        TV Units
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-[#3E2C23] mb-2 leading-tight">
                        Bespoke Floating TV Units
                      </h3>
                      <p className="text-xs text-[#B8860B] font-bold mb-3 tracking-wide uppercase">
                        Matte grey &bull; concealed wire routes
                      </p>
                      <p className="text-sm text-[#5A4B41] leading-relaxed">
                        Wall-mounted high scale panels with warm ambient gold backlighting, storage space, drawer partitions, and clean minimalist borders.
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2 border-t border-amber-900/5 flex justify-between items-center">
                    <span className="text-xs text-[#8A786E] font-medium">Bespoke pricing:</span>
                    <strong className="text-[#3E2C23] font-serif text-lg">From ₹18,500*</strong>
                  </div>
                </article>
              )}

              {/* Card 6: Vanity Mirrors */}
              {(showcaseFilter === 'all' || showcaseFilter === 'kitchens') && (
                <article className="bg-[#FAF8F5] rounded-2xl overflow-hidden border border-amber-900/5 hover:-translate-y-1 hover:shadow-xl transition-all flex flex-col justify-between">
                  <div>
                    <div className="relative">
                      <img 
                        src="https://picsum.photos/seed/suratvanity/600/400" 
                        alt="Bespoke bathroom luxury vanity cabinet" 
                        referrerPolicy="no-referrer"
                        className="w-full h-56 object-cover"
                      />
                      <span className="absolute top-4 left-4 bg-[#3E2C23] text-white text-[10px] font-bold tracking-widest uppercase py-1 px-3.5 rounded shadow">
                        Bathroom Vanity
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-[#3E2C23] mb-2 leading-tight">
                        Moisture-Resistant Vanities
                      </h3>
                      <p className="text-xs text-[#B8860B] font-bold mb-3 tracking-wide uppercase">
                        Marine plywood &bull; High Gloss acrylic panels
                      </p>
                      <p className="text-sm text-[#5A4B41] leading-relaxed">
                        100% waterproof cabinets fitted with push-to-open door drawers. Sized specifically to fit your bathroom plumbing layouts easily.
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2 border-t border-amber-900/5 flex justify-between items-center">
                    <span className="text-xs text-[#8A786E] font-medium">Bespoke pricing:</span>
                    <strong className="text-[#3E2C23] font-serif text-lg">From ₹9,500*</strong>
                  </div>
                </article>
              )}

            </div>

            <div className="mt-12 text-center text-xs text-[#5A4B41]/70 leading-relaxed max-w-2xl mx-auto">
              *All catalog price bounds are indicative starting figures for IS:710 boiling waterproof grade ply backings with 1mm glossy laminate overlays. Final estimates vary upon actual on-site architectural measurements in Surat.
            </div>

          </div>
        </section>

        {/* LOCAL GEOGRAPHIC PROXIMITY ADVANTAGES ZONE */}
        <section id="areas" className="py-24 bg-[#FAF8F5] scroll-mt-20">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Left explanation info */}
              <div className="lg:col-span-5">
                <span className="text-xs font-bold text-[#B8860B] tracking-widest uppercase mb-3 block">
                  Local Proximity Benefits
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#3E2C23] mb-6">
                  Surat's Premium Neighborhood Specialists
                </h2>
                <p className="text-[#5A4B41] text-sm sm:text-base leading-relaxed mb-6">
                  Because our operational workshop and carpenter dispatch base is located right inside <strong>Adajan Gam, Surat</strong>, we provide lightning-fast site visits, zero transport fees to nearby sectors, and premium support for major residential builders.
                </p>

                <div className="flex flex-col gap-4">
                  {[
                    { title: 'Free Measurement Site Visits', desc: 'No-charge exact metric measurement at your flat in Surat within 24 hours of booking.' },
                    { title: 'No Transport/Delivery Surcharges', desc: 'Zero cargo or transit fees to Adajan, Pal, Vesu or Gaurav Path Road.' },
                    { title: 'Direct Workshop Accountability', desc: 'Visit our Adajan Gam studio anytime during working hours to check wood panels first-hand.' }
                  ].map((benefit, i) => (
                    <div key={i} className="flex gap-3 items-start bg-white p-4.5 rounded-xl border border-amber-900/5 shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-black text-[#3E2C23] uppercase tracking-wider mb-1">{benefit.title}</h4>
                        <p className="text-xs text-[#8A786E] leading-relaxed">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right clickable visual grid representing hot sectors */}
              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
                {SURAT_AREAS.map((area, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3.5">
                        <span className="font-serif text-xl font-bold text-[#3E2C23]">{area.name}</span>
                        <span className="bg-amber-100 text-[#B8860B] font-mono text-[9px] font-bold px-2.5 py-1 rounded">
                          {area.distance} away
                        </span>
                      </div>
                      <p className="text-xs text-[#8A786E] leading-relaxed mb-4">
                        {area.description}
                      </p>
                    </div>

                    <div className="bg-[#FAF8F5] border border-amber-900/5 p-3 rounded-xl mt-2">
                      <span className="text-[9px] uppercase text-[#B8860B] tracking-wider font-bold block mb-1">
                        Recent Landmark Fit-Out 
                      </span>
                      <p className="text-[11px] font-medium text-[#3E2C23] truncate">
                        🏢 {area.featuredProject}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </section>

        {/* WHY VIRAT FURNITURE - MASTER TEAM METRICS */}
        <section id="why" className="py-24 bg-white border-t border-amber-900/5 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-[#B8860B] tracking-widest uppercase mb-3 block">
                Premium Carpentry Standards
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#3E2C23] mb-4">
                The Virat Quality Assurance
              </h2>
              <div className="w-16 h-1 bg-[#B8860B] mx-auto rounded" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              <div className="bg-[#FAF8F5] p-6.5 rounded-2xl border border-amber-900/5 shadow-sm text-center">
                <div className="w-12 h-12 rounded-full bg-amber-100/70 border border-amber-200 flex items-center justify-center mx-auto mb-5 text-[#B8860B]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#3E2C23] mb-2">Lifetime BWR Warranty</h3>
                <p className="text-xs text-[#5A4B41] leading-relaxed">
                  We formulate high quality structural grids utilizing ISO certified BWR Boiling Water Ply that repels termites, bathroom humidity and base-bends.
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-6.5 rounded-2xl border border-amber-900/5 shadow-sm text-center">
                <div className="w-12 h-12 rounded-full bg-amber-100/70 border border-amber-200 flex items-center justify-center mx-auto mb-5 text-[#B8860B]">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#3E2C23] mb-2">Elite Branded Fasteners</h3>
                <p className="text-xs text-[#5A4B41] leading-relaxed">
                  Fitted using heavy-capacity silent runner drawers, magnetic locks and aluminum profile groove rails sourced from high premium Hafele &amp; Hettich catalogs.
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-6.5 rounded-2xl border border-amber-900/5 shadow-sm text-center">
                <div className="w-12 h-12 rounded-full bg-amber-100/70 border border-amber-200 flex items-center justify-center mx-auto mb-5 text-[#B8860B]">
                  <Hammer className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#3E2C23] mb-2">16 Carpenter Direct Force</h3>
                <p className="text-xs text-[#5A4B41] leading-relaxed">
                  No middle agents or outsourced contracting. Our direct dedicated workforce of 16 hand-selected carpenters handles complete fabrication and site assembly.
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-6.5 rounded-2xl border border-amber-900/5 shadow-sm text-center">
                <div className="w-12 h-12 rounded-full bg-amber-100/70 border border-amber-200 flex items-center justify-center mx-auto mb-5 text-[#B8860B]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#3E2C23] mb-2">High Polish Laminates</h3>
                <p className="text-xs text-[#5A4B41] leading-relaxed">
                  Stitched beautifully with dust-resistant high gloss anti-microbial acrylic backings or hand polished royal teak wood textures.
                </p>
              </div>

            </div>

            {/* Testimonials Quote Slider */}
            <div className="mt-20 bg-[#3E2C23] text-[#EDE8DF] p-8 lg:p-12 rounded-3xl relative overflow-hidden shadow-2xl">
              <div className="absolute top-6 left-6 text-white/5 font-serif text-[180px] leading-none pointer-events-none select-none">
                “
              </div>
              
              <div className="text-center mb-10 relative z-10">
                <span className="text-[#D4A037] text-[10px] uppercase font-black tracking-widest block mb-2">
                  Verified Surat Feedbacks
                </span>
                <h3 className="font-serif text-2xl lg:text-3xl font-bold">Trusted by Local Residents</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-8 relative z-10">
                {TESTIMONIALS.map((t, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
                    <div>
                      <div className="flex text-amber-400 gap-1 mb-4">
                        {[...Array(t.rating)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <p className="text-xs leading-relaxed text-[#EDE8DF]/80 italic mb-6">
                        "{t.content}"
                      </p>
                    </div>
                    <div>
                      <div className="w-8 h-0.5 bg-[#D4A037] mb-2" />
                      <strong className="block text-xs text-white font-bold">{t.name}</strong>
                      <span className="block text-[10px] text-[#EDE8DF]/60 uppercase tracking-widest">{t.role}</span>
                      <span className="inline-block mt-2 text-[9px] bg-white/10 text-white px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                        🛠 {t.project}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ACCORDION FAQ ENGINE */}
        <section id="faq" className="py-24 bg-[#FAF8F5] scroll-mt-20">
          <div className="max-w-4xl mx-auto px-5 lg:px-8">
            
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-[#B8860B] tracking-widest uppercase mb-3 block">
                Client Common Queries
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#3E2C23] mb-4">
                Frequently Answered FAQ
              </h2>
              <div className="w-16 h-1 bg-[#B8860B] mx-auto rounded mb-4" />
              <p className="text-[#5A4B41] text-xs sm:text-sm">
                Everything you need to know about purchasing, warranty protection and scheduling site visits in Surat.
              </p>

              {/* FAQ filters buttons */}
              <div className="flex flex-wrap justify-center gap-1.5 mt-6 text-[10px] font-bold tracking-wider uppercase">
                {[
                  { id: 'all', label: 'All Queries' },
                  { id: 'customization', label: 'Materials &amp; Design' },
                  { id: 'service', label: 'Local Support' },
                  { id: 'pricing', label: 'Costing' },
                  { id: 'timeline', label: 'Schedules' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setFaqCategory(cat.id as any);
                      setOpenFaqIdx(null); // collapse active
                    }}
                    className={`px-3.5 py-2.5 rounded-full border transition-all cursor-pointer ${faqCategory === cat.id ? 'bg-[#3E2C23] text-white border-[#3E2C23]' : 'bg-white text-[#5A4B41] border-amber-900/5 hover:border-amber-900/10'}`}
                  >
                    {cat.label.replace('amp;', '')}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {FAQS.filter(f => faqCategory === 'all' || f.category === faqCategory).map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div 
                    key={idx} 
                    className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full text-left p-6 flex justify-between items-center bg-white hover:bg-amber-50/10 transition-colors cursor-pointer"
                    >
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#3E2C23] pr-6 leading-snug">
                        {faq.question}
                      </h3>
                      <span className={`w-8 h-8 rounded-full bg-[#FAF8F5] flex items-center justify-center border border-amber-900/5 text-[#B8860B] font-bold transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#5A4B41] leading-relaxed border-t border-amber-900/5 bg-[#FAF8F5]/30">
                            <p>{faq.answer}</p>
                            <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] text-[#B8860B] font-bold uppercase tracking-wider">
                              <span className="w-2 h-2 rounded-full bg-emerald-500" />
                              Category: {faq.category} &bull; verified details
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* FREE ESTIMATE BOOKING & CONTACT ENQUIRY MODULE */}
        <section id="contact" className="py-24 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Direct office address details */}
              <div className="lg:col-span-5">
                <span className="text-xs font-bold text-[#B8860B] tracking-widest uppercase mb-3 block">
                  Get In Touch
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#3E2C23] mb-6">
                  Ready to Start Your Furniture Project?
                </h2>
                <p className="text-[#5A4B41] text-sm sm:text-base leading-relaxed mb-8">
                  Fill out our brief consultation request form. Shubham Sahani or our active workshop coordinator will phone you back inside 24 hours to arrange your <strong>free interior measurement layout blueprint</strong>.
                </p>

                <div className="flex flex-col gap-5">
                  
                  <div className="flex gap-4 items-start bg-[#FAF8F5] p-5 rounded-2xl border border-amber-900/5">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-[#B8860B] flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold tracking-widest text-[#B8860B] mb-1">Our Workshop &amp; Studio</span>
                      <strong className="block text-sm text-[#3E2C23]">Virat Furniture</strong>
                      <span className="text-xs text-[#5A4B41] leading-relaxed block mt-1">
                        Wood Square, 244, Subhash Chandra Bose Marg, TGB, Adajan Gam, Surat, Gujarat - 395009
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start bg-[#FAF8F5] p-5 rounded-2xl border border-amber-900/5">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-[#B8860B] flex-shrink-0">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold tracking-widest text-[#B8860B] mb-1">Direct Contractor Phone</span>
                      <a href="tel:+919725713944" className="text-sm font-bold text-[#3E2C23] hover:text-[#B8860B] transition-colors block">
                        097257 13944
                      </a>
                      <span className="text-xs text-[#5A4B41] block mt-1">Call Mon-Sat: 9:00 AM - 7:00 PM (Emergency Sunday appointment only)</span>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start bg-[#FAF8F5] p-5 rounded-2xl border border-amber-900/5">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-[#B8860B] flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold tracking-widest text-[#B8860B] mb-1">Expected Delivery SLA</span>
                      <span className="text-sm font-bold text-[#3E2C23]">7 to 14 Days max</span>
                      <span className="text-xs text-[#5A4B41] leading-relaxed block mt-1">
                        Pre-fabricated at our workshop and installed at Vesu, Pal, or Adajan homes inside 48 hours after delivery.
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Lead Capture Box */}
              <div className="lg:col-span-7 bg-[#FAF8F5] border border-amber-900/10 p-6 sm:p-8 rounded-3xl shadow-xl relative">
                
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3E2C23] mb-2 leading-snug">
                  Book Free Site Measurement Visit
                </h3>
                <p className="text-xs text-[#8A786E] mb-6 leading-relaxed">
                  We will dispatch our sizing manager with plywood wood laminate samples catalog directly to your home.
                </p>

                <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-[#5A4B41] mb-1.5">
                        Your Full Name
                      </label>
                      <input 
                        type="text"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="E.g. Rahul Shah"
                        className="w-full bg-white border border-amber-900/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] min-h-[48px]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-[#5A4B41] mb-1.5">
                        Surat Contact Number
                      </label>
                      <input 
                        type="tel"
                        required
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        placeholder="E.g. 98250 XXXXX"
                        className="w-full bg-white border border-amber-900/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] min-h-[48px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#5A4B41] mb-1.5">
                      Type of Custom Work
                    </label>
                    <select
                      value={leadProjectType}
                      onChange={(e) => setLeadProjectType(e.target.value)}
                      className="w-full bg-white border border-amber-900/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] min-h-[48px] cursor-pointer"
                    >
                      <option value="">-- Choose project category --</option>
                      <option value="Modular Beds &amp; Headboards">Modular Beds &amp; Headboards</option>
                      <option value="Sliding Almari / Wardrobes">Sliding Almari / Wardrobes</option>
                      <option value="L-Shape / Modular Kitchen">L-Shape / Modular Kitchen</option>
                      <option value="Solid Teakwood Main Gates">Solid Teakwood Main Gates</option>
                      <option value="Complete Home Fit-Out (3BHK/4BHK)">Complete Home Fit-Out (3BHK/4BHK)</option>
                      <option value="Under-stair Storage &amp; Study desks">Under-stair Storage &amp; Study desks</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#5A4B41] mb-1.5">
                      Tell us about your home space (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={leadMessage}
                      onChange={(e) => setLeadMessage(e.target.value)}
                      placeholder="E.g. I have a 3BHK flat in Sangkini Solitaire, VIP Road Vesu. Want modular wardrobes designed..."
                      className="w-full bg-white border border-amber-900/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] resize-none"
                    />
                  </div>

                  {/* Submission dispatch */}
                  <button
                    type="submit"
                    className="w-full bg-[#3E2C23] hover:bg-[#B8860B] text-white py-4 rounded-xl font-bold tracking-wider text-xs uppercase transition-colors shadow-lg flex items-center justify-center gap-2 mt-2 cursor-pointer"
                    id="btn-lead-submit"
                  >
                    {formSubmitted ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4.5 h-4.5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                        Routing to WhatsApp...
                      </span>
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4 fill-white" />
                        Send Dispatch to Contractor on WhatsApp
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-[#8A786E] text-center leading-relaxed">
                    By clicking submit, you'll be redirected to chat on whatsapp with pre-filled layout answers. We do not sell user data.
                  </p>

                </form>

              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER METADATA DESCRIPTIONS & COPYRIGHT */}
      <footer className="bg-[#3E2C23] text-[#EDE8DF] border-t border-amber-950/40 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            {/* Logo column & copy */}
            <div className="lg:col-span-1.5">
              <span className="font-serif text-2xl font-black text-white block mb-4">
                Virat<span className="text-[#D4A037] font-sans font-light">Furniture</span>
              </span>
              <p className="text-xs text-[#EDE8DF]/70 leading-relaxed mb-4">
                Virat Furniture by Shubham Sahani is Surat’s elite modular carpentry workshop. Designing contemporary homes since 2008 with solid marine water-proof materials.
              </p>
              <div className="flex gap-2">
                <span className="text-[10px] bg-white/10 text-white px-2.5 py-1 rounded uppercase font-bold tracking-wider">
                  Surat Local License
                </span>
                <span className="text-[10px] bg-white/10 text-white px-2.5 py-1 rounded uppercase font-bold tracking-wider">
                  BWR ply Certified
                </span>
              </div>
            </div>

            {/* Quick Links column */}
            <div>
              <h4 className="text-[#D4A037] text-xs uppercase tracking-widest font-bold mb-4">
                Our Capabilities
              </h4>
              <ul className="text-xs flex flex-col gap-2.5 text-[#EDE8DF]/70 font-semibold font-sans">
                <li><a href="#customizer" className="hover:text-white transition-colors">3D Bedroom Configurator</a></li>
                <li><a href="#customizer" className="hover:text-white transition-colors">Almari / Wardrobe Sizer</a></li>
                <li><a href="#customizer" className="hover:text-white transition-colors">L-Shape Kitchen Setup</a></li>
                <li><a href="#customizer" className="hover:text-white transition-colors">Wooden Gate Estimator</a></li>
              </ul>
            </div>

            {/* Neighborhood limits columns */}
            <div>
              <h4 className="text-[#D4A037] text-xs uppercase tracking-widest font-bold mb-4">
                Surat Hotspots Serviced
              </h4>
              <ul className="text-xs flex flex-col gap-2 text-[#EDE8DF]/70">
                <li>✅ Vesu &amp; VIP Road Highrises</li>
                <li>✅ Adajan Gam &amp; Star Bazaar</li>
                <li>✅ Pal Gam &amp; Gaurav Path</li>
                <li>✅ New Pal Townships</li>
              </ul>
            </div>

            {/* Disclaimer and safety */}
            <div>
              <h4 className="text-[#D4A037] text-xs uppercase tracking-widest font-bold mb-4">
                Carpentry Workshop
              </h4>
              <p className="text-xs text-[#EDE8DF]/70 leading-relaxed">
                Wood Square, 244, Subhash Chandra Bose Marg, TGB, Adajan Gam, Surat - 395009
              </p>
              <p className="text-xs text-[#EDE8DF]/70 mt-3 font-semibold">
                Direct phone: <a href="tel:+919725713944" className="text-[#D4A037] hover:underline">097257 13944</a>
              </p>
            </div>

          </div>

          <div className="border-t border-white/10 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4 text-[11px] text-[#EDE8DF]/50">
            <div>
              &copy; {new Date().getFullYear()} Virat Furniture. All rights reserved. Handcrafted by Shubham Sahani, Surat, Gujarat.
            </div>
            <div className="flex gap-4">
              <a href="#customizer" className="hover:text-white transition-colors">3D Configurator Tool</a>
              <span>&bull;</span>
              <a href="#services" className="hover:text-white transition-colors">Bespoke Catalog</a>
            </div>
          </div>

        </div>
      </footer>

      {/* MOBILE STICKY CALL DIRECT ACTION NAV BUTTONS */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden grid grid-cols-2 bg-white/95 backdrop-blur-md border-t border-amber-900/10 shadow-2xl overflow-hidden py-2 px-3 gap-2 pb-safe-bottom">
        <a 
          href="tel:+919725713944" 
          className="bg-[#3E2C23] text-white active:bg-amber-900 py-3.5 rounded-xl font-bold tracking-widest text-[11px] uppercase flex items-center justify-center gap-1.5 shadow"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          Call Contractor
        </a>
        
        <a 
          href="https://wa.me/919725713944?text=Hi%20Virat%20Furniture!%20Could%20we%20schedule%20a%20free%20site%20visit%20to%20measure%20my%20furniture%3F" 
          target="_blank"
          rel="noopener"
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold tracking-widest text-[11px] uppercase flex items-center justify-center gap-1.5 shadow"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-white" />
          WhatsApp Quote
        </a>
      </div>

    </div>
  );
}
