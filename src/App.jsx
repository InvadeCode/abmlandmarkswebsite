import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  MapPin, Phone, MessageCircle, Menu, X, ArrowRight, Download, 
  CheckCircle2, ShieldCheck, ChevronDown, FileText, 
  Ruler, Search, TrendingUp, Plus, Minus, Quote,
  Mail, Navigation as NavIcon, Landmark, Fingerprint, Leaf,
  Scale, Eye, Shield, Users, Sprout, HardHat, HeartHandshake, Trees
} from 'lucide-react';

const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap');
    
    :root {
      --font-primary: 'Poppins', sans-serif;
      --color-emerald-base: #022c22;
      --color-emerald-light: #064033;
      --color-gold-accent: #f59e0b;
      --bg-warm-ivory: #faf8f2;
    }
    
    body {
      font-family: var(--font-primary);
      background-color: var(--bg-warm-ivory); 
      color: #1c1917; 
      overflow-x: hidden;
      width: 100vw;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: var(--bg-warm-ivory); }
    ::-webkit-scrollbar-thumb { background: #022c22; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--color-gold-accent); }

    .no-scroll { overflow: hidden; }
    
    .masonry-grid { column-count: 1; column-gap: 1.5rem; }
    @media (min-width: 768px) { .masonry-grid { column-count: 2; } }
    @media (min-width: 1024px) { .masonry-grid { column-count: 3; } }
    @media (min-width: 1536px) { .masonry-grid { column-count: 4; } }
    .masonry-item { break-inside: avoid; margin-bottom: 1.5rem; display: inline-block; width: 100%; height: auto; }
  `}</style>
);

const ASSETS = {
  logo: "https://static.wixstatic.com/media/74639d_6785283b06234d209d8c73fe26ad680f~mv2.png",
  favicon: "https://static.wixstatic.com/media/74639d_6785283b06234d209d8c73fe26ad680f~mv2.png",
  heroVideo: "https://video.wixstatic.com/video/74639d_75c7c7f9044e4b6e9c60a4cd5a8bcbdf/1080p/mp4/file.mp4"
};

const SITE_DATA = {
  brand: "ABM Landmarks",
  legalEntity: "Regal Era Landmarks & ABM Landmarks",
  phone: "+91 99679 15135",
  whatsapp: "+91 99679 15135",
  email: "info@abmlandmarks.com",
  address: "Platinum Tower, 4th Floor, Baner, Pune, Maharashtra, India 411045",
  metrics: [
    { label: "Decades of Trust", value: 2, suffix: "+" },
    { label: "Acres Curated", value: 500, suffix: "+" },
    { label: "Flawless Titles", value: 25, suffix: "" },
    { label: "Families Secured", value: 1200, suffix: "+" },
  ]
};

const PROJECTS = [
  {
    id: 'the-blue-oak', title: 'The Blue Oak', location: 'Chandkhed, Pune', status: 'Ongoing', type: 'Premium Residential Plots',
    plotSizes: '1250 - 4000 sq.ft', approvals: ['PMRDA Development Zone', 'MahaRERA Registered', 'Clear Title'],
    image: 'https://static.wixstatic.com/media/74639d_e89d2be00e5d452eae6c69a88fe3f2e4~mv2.jpeg',
    description: 'A sprawling 6-acre sanctuary located mere minutes from the Hinjawadi IT Hub and the serene Pawna Lake. The Blue Oak offers 62 exclusive residential plots with 30+ world-class amenities, designed for those who refuse to compromise between urban connectivity and natural tranquility.'
  },
  {
    id: 'abm-blue-bird', title: 'ABM Blue Bird', location: 'Kuran Budruk, Pune', status: 'Upcoming', type: 'Estate & Farmhouse Plots',
    plotSizes: '11000+ sq.ft', approvals: ['Title Clear', 'NA Process Initiated'],
    image: 'https://static.wixstatic.com/media/74639d_b99afb0223014c35b4f98bbffa2eca32~mv2.jpeg',
    description: 'Designed for the discerning few who seek absolute privacy and immense scale. Set across 6.5 pristine acres near the Panshet Dam, ABM Blue Bird offers massive 11,000 sq.ft estate plots. It is a strategic acquisition in Maharashtra’s most rapidly appreciating corridor.'
  }
];

const FAQS = [
  { q: "How do you guarantee the land is free of legal disputes?", a: "Trust is not given; it is proven. Before ABM Landmarks acquires a single acre, our legal consortium conducts an exhaustive 30-year search report. We clear every encumbrance, secure PMRDA/Collector sanctions, and ensure absolute compliance before a plot is ever presented to you." },
  { q: "Is bank financing available for plotted developments?", a: "Yes. Because our projects possess impeccable legal clarity, clear NA sanctions, and RERA registrations, they are pre-approved for plot loans by major nationalized and private financial institutions. Our concierge team assists you seamlessly through this process." },
  { q: "Can ABM handle the construction of my farmhouse?", a: "Absolutely. Through our bespoke architectural programs, we transition from land curators to master builders. We manage architectural design, local zoning compliance, and high-end construction, allowing you to enjoy the creative process." },
  { q: "Why focus exclusively on the Pune, Talegaon, and Hinjawadi corridors?", a: "We don't chase fleeting trends. This specific belt offers a rare, irreplaceable combination: pristine natural topography and aggressive government infrastructure spending. Its proximity to major IT hubs ensures that your sanctuary today becomes an incredibly valuable asset tomorrow." }
];

const TESTIMONIALS = [
  { name: "Rahul D.", role: "Tech Executive, Pune", quote: "Buying land in India always felt like walking through a minefield. ABM changed that. They sat with me, unraveled every legal document, and provided a level of transparency I didn't know existed in real estate. The peace of mind is priceless." },
  { name: "Priya & Sameer K.", role: "Entrepreneurs, Mumbai", quote: "We wanted a weekend sanctuary, but running a business left us no time to deal with contractors and zoning laws. ABM handled everything from the initial land deed to the final landscaping of our villa. A truly elevated experience." },
  { name: "Dr. Anil V.", role: "NRI Investor", quote: "Investing from 8,000 miles away requires absolute, blind trust. ABM earned it. Their digital updates, flawless title records, and proactive communication made building our generational home an absolute joy." }
];

const INSIGHTS = [
  { id: '1', title: 'The Anatomy of a Flawless Title: What Every Investor Must Know', category: 'Legal Security', date: 'Oct 12, 2026', image: 'https://static.wixstatic.com/media/74639d_0968ba7da89c4946bbc29448158e784f~mv2.jpeg', summary: 'Demystifying the 7/12 extract, the critical importance of a 30-year search report, and why a PMRDA sanction is the ultimate shield for your investment.' },
  { id: '2', title: 'Engineering Appreciation: The Hinjawadi-Chandkhed Corridor', category: 'Market Intelligence', date: 'Sep 28, 2026', image: 'https://static.wixstatic.com/media/74639d_e89d2be00e5d452eae6c69a88fe3f2e4~mv2.jpeg', summary: 'An exclusive analysis into how upcoming infrastructure projects and hyper-connectivity are transforming the fringes of Pune into Maharashtra’s most strategic land asset.' },
  { id: '3', title: 'Architecture that Breathes: The Modern Indian Farmhouse', category: 'Design & Living', date: 'Sep 15, 2026', image: 'https://static.wixstatic.com/media/74639d_b99afb0223014c35b4f98bbffa2eca32~mv2.jpeg', summary: 'How we blend vernacular wisdom with modern luxury. Exploring climate-responsive design, native forestry integration, and the creation of a true sanctuary.' }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (idx) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: idx * 0.1, ease: "easeOut" } })
};

const SectionHeader = ({ eyebrow, titleFirst, titleItalic, description, actionText, onAction, isDarkBg = false }) => (
  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 lg:mb-24 gap-8 lg:gap-12 w-full px-[3vw]">
    <div className="w-full lg:w-3/5">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-[2px] w-12 bg-amber-500"></div>
        <span className={`font-semibold tracking-widest text-[10px] uppercase font-poppins ${isDarkBg ? 'text-amber-500' : 'text-amber-600'}`}>{eyebrow}</span>
      </div>
      <h2 className={`text-4xl md:text-5xl lg:text-[4rem] font-light font-poppins leading-[1.1] tracking-tight ${isDarkBg ? 'text-white' : 'text-stone-900'}`}>
        {titleFirst} <br className="hidden md:block"/>
        <span className={`font-medium italic ${isDarkBg ? 'text-white/90' : 'text-[#022c22]'}`}>{titleItalic}</span>
      </h2>
    </div>
    <div className="flex flex-col lg:items-end gap-6 lg:gap-8 w-full lg:w-2/5">
      {description && <p className={`text-sm md:text-base font-light leading-relaxed font-poppins lg:text-right ${isDarkBg ? 'text-white/80' : 'text-stone-600'}`}>{description}</p>}
      {actionText && (
        <button onClick={onAction} className={`group flex items-center gap-3 text-xs font-semibold uppercase tracking-widest transition-colors font-poppins ${isDarkBg ? 'text-white hover:text-amber-500' : 'text-[#022c22] hover:text-amber-600'}`}>
          {actionText} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>
      )}
    </div>
  </div>
);

const SEOHead = ({ title, description, schemaData }) => {
  useEffect(() => {
    document.title = `${title} | ${SITE_DATA.brand}`;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = ASSETS.favicon;
  }, [title, description]);
  return null;
};

const CustomDropdown = ({ label, value, options, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex flex-col w-full h-full justify-center" ref={dropdownRef}>
      <span className="text-white/50 text-[10px] font-semibold mb-2 uppercase tracking-widest font-poppins block">{label}</span>
      <div 
        className="flex justify-between items-center bg-transparent cursor-pointer group transition-colors text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-sm md:text-base truncate pr-4 font-poppins ${!value ? 'text-white/80' : 'text-white font-medium'}`}>
          {value ? options.find(o => o.value === value)?.label : placeholder}
        </span>
        <ChevronDown size={16} className={`transform transition-transform text-white/50 group-hover:text-amber-500 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.15 }}
            className="absolute bottom-[110%] left-0 w-full min-w-[200px] bg-[#041a15]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-[9999] mb-2"
          >
            <div className="max-h-[250px] overflow-y-auto py-2 custom-scrollbar">
              {options.map(opt => (
                <div 
                  key={opt.value} 
                  className="px-4 py-3 text-sm text-stone-300 font-poppins hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
                  onClick={() => { onChange(opt.value); setIsOpen(false); }}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AnimatedCounter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      const duration = 2000;
      const increment = Math.ceil(end / (duration / 16)); 
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [value, isInView]);
  return <span ref={ref}>{count}{suffix}</span>;
};

const SearchOverlay = ({ isOpen, onClose, navigate }) => {
  const [query, setQuery] = useState('');
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
      setTimeout(() => document.getElementById('search-input')?.focus(), 100);
    } else {
      document.body.classList.remove('no-scroll');
      setQuery('');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return { projects: [], insights: [] };
    const q = query.toLowerCase();
    return {
      projects: PROJECTS.filter(p => p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)),
      insights: INSIGHTS.filter(i => i.title.toLowerCase().includes(q) || i.summary.toLowerCase().includes(q))
    };
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(24px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          className="fixed inset-0 z-[100] bg-[#022c22]/95 flex flex-col px-[3vw] py-[3vw]"
        >
          <div className="flex justify-end pt-4">
            <button onClick={onClose} className="p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white border border-white/20">
              <X size={24} />
            </button>
          </div>
          <div className="max-w-4xl mx-auto w-full mt-10 lg:mt-20">
            <div className="relative">
              <input 
                id="search-input" type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Search landmarks, insights..." 
                className="w-full bg-transparent border-b-2 border-white/30 text-3xl md:text-5xl lg:text-6xl font-light font-poppins text-white pb-4 md:pb-6 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-white/30"
              />
              <Search className="absolute right-0 top-2 text-white/50" size={40} />
            </div>
            <div className="mt-12 h-[50vh] overflow-y-auto pr-4 space-y-12 custom-scrollbar">
              {query && results.projects.length === 0 && results.insights.length === 0 && <p className="text-white/50 text-lg font-poppins font-light">No curated results found for your query.</p>}
              {results.projects.length > 0 && (
                <div>
                  <h3 className="text-amber-500 uppercase tracking-widest text-xs font-semibold mb-6 flex items-center gap-2 font-poppins"><MapPin size={14}/> Verified Landmarks</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.projects.map(p => (
                      <div key={p.id} onClick={() => { navigate('projects'); onClose(); }} className="cursor-pointer p-6 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all">
                        <h4 className="text-xl font-medium text-white mb-2 font-poppins">{p.title}</h4>
                        <p className="text-stone-400 text-xs font-poppins">{p.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navigation = ({ currentRoute, navigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', route: 'home' },
    { name: 'Philosophy', route: 'about' },
    { name: 'Services', route: 'services' },
    { name: 'Landmarks', route: 'projects' },
    { name: 'Insights', route: 'insights' },
    { name: 'Contact', route: 'contact' }
  ];

  const handleNav = (route) => {
    navigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full h-[90px] transition-colors duration-300 pointer-events-none">
        <div className={`absolute inset-0 transition-opacity duration-300 ${scrolled ? 'opacity-0' : 'opacity-100 bg-[#faf8f2]'}`} />
        <div className={`relative flex items-center justify-between transition-all duration-500 pointer-events-auto mx-auto
          ${scrolled ? 'mt-4 w-[99%] rounded-full bg-white/95 backdrop-blur-xl shadow-2xl border border-stone-200 h-[70px] px-[1vw]' : 'h-[90px] w-full px-[1vw] bg-transparent'}`}>
          
          <div className="flex justify-start items-center cursor-pointer shrink-0" onClick={() => handleNav('home')}>
            <img src={ASSETS.logo} alt="ABM Landmarks Logo" className="h-8 md:h-10 w-auto object-contain transition-transform duration-500 hover:scale-105" />
          </div>

          <nav className="hidden xl:flex justify-center items-center gap-8">
            {navLinks.map((item) => (
              <button 
                key={item.name} 
                onClick={() => handleNav(item.route)}
                className={`text-[11px] font-bold tracking-widest uppercase transition-all duration-300 relative group font-poppins text-[#022c22] ${currentRoute === item.route ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
              >
                {item.name}
                <span className={`absolute -bottom-2 left-0 h-[2px] bg-[#f59e0b] transition-all duration-300 ${currentRoute === item.route ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
          </nav>

          <div className="hidden xl:flex justify-end items-center gap-6 shrink-0">
            <button onClick={onOpenSearch} className="p-2 rounded-full transition-colors text-[#022c22] hover:bg-black/5">
              <Search size={18} />
            </button>
            <a href={`https://wa.me/${SITE_DATA.whatsapp}`} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide transition-colors font-poppins text-[#022c22] hover:text-green-700">
              <MessageCircle size={16} /> Private Chat
            </a>
            <button onClick={() => { navigate('contact'); window.scrollTo(0,0); }} className="bg-[#022c22] text-white hover:bg-[#064033] px-6 py-3 rounded-full text-[11px] font-bold tracking-widest uppercase transition-transform hover:-translate-y-0.5 shadow-lg font-poppins">
              Schedule Viewing
            </button>
          </div>

          <div className="flex xl:hidden justify-end items-center gap-4">
            <button onClick={onOpenSearch} className="text-[#022c22] p-2"><Search size={20} /></button>
            <button className="text-[#022c22] p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-100%' }} transition={{ type: 'tween', duration: 0.4, ease: 'easeOut' }}
            className="fixed inset-0 z-[40] bg-[#faf8f2] flex flex-col pt-24 px-6 pb-8"
          >
            <nav className="flex flex-col gap-6 text-3xl md:text-4xl font-light text-stone-900 mt-8 font-poppins">
              {navLinks.map((item, idx) => (
                <motion.button 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 + 0.1 }}
                  key={item.name} onClick={() => handleNav(item.route)} 
                  className="text-left border-b border-stone-200 pb-4 flex justify-between items-center group"
                >
                  {item.name} <ArrowRight size={24} className="text-amber-500" />
                </motion.button>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-4">
               <button onClick={() => handleNav('contact')} className="bg-[#022c22] text-white w-full py-4 rounded-xl text-sm font-semibold tracking-wide uppercase shadow-lg font-poppins">
                Schedule a Private Viewing
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const HeroSection = () => {
  const [type, setType] = useState('');
  const [region, setRegion] = useState('');
  const [area, setArea] = useState('');

  return (
    <section className="sticky top-0 z-0 w-full px-[1vw] pt-[100px] pb-[1vw] flex flex-col" style={{ height: '100vh' }}>
      <div className="relative w-full h-full flex flex-col rounded-[2.5rem] bg-[#022c22] overflow-hidden shadow-2xl">
        <video src={ASSETS.heroVideo} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover object-center opacity-60 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#022c22]/90 via-[#022c22]/30 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#022c22]/90 via-[#022c22]/10 to-transparent opacity-90 pointer-events-none"></div>

        <div className="relative z-10 w-full h-full flex flex-col justify-end pb-12 lg:pb-16 px-[4vw] lg:px-[5vw]">
          <div className="w-full mb-8 lg:mb-12 mt-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
              <h1 className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[5rem] text-white leading-[1.1] tracking-tight font-light mb-6 font-poppins max-w-none xl:max-w-7xl whitespace-normal lg:whitespace-nowrap">
                Land That Becomes <br className="hidden lg:block" />
                <span className="italic font-medium text-white/90">a Legacy.</span>
              </h1>
              <p className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed font-light max-w-2xl font-poppins">
                In a landscape clouded by uncertainty, we provide absolute clarity. ABM identifies, clears, and develops premium estates—securing your family's generational wealth with zero legal friction.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col lg:flex-row items-center justify-between p-2 md:p-3 bg-[#041a15]/90 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-[1.25rem] shrink-0"
          >
            <div className="flex flex-col md:flex-row items-center w-full lg:w-[80%]">
              <div className="w-full md:w-1/3 px-6 py-4 lg:py-2 border-b md:border-b-0 md:border-r border-white/10 h-[70px] lg:h-[60px] flex items-center">
                <CustomDropdown label="Asset Type" placeholder="Select Type" value={type} onChange={setType} options={[{label: 'Plotted Land', value: 'plot'}, {label: 'Farmhouse Estate', value: 'farmhouse'}]} />
              </div>
              <div className="w-full md:w-1/3 px-6 py-4 lg:py-2 border-b md:border-b-0 md:border-r border-white/10 h-[70px] lg:h-[60px] flex items-center">
                <CustomDropdown label="Location" placeholder="Select Region" value={region} onChange={setRegion} options={[{label: 'Chandkhed / Hinjawadi', value: 'chandkhed'}, {label: 'Kuran Budruk / Panshet', value: 'kuran'}]} />
              </div>
              <div className="w-full md:w-1/3 px-6 py-4 lg:py-2 h-[70px] lg:h-[60px] flex items-center">
                <CustomDropdown label="Area" placeholder="Select Size" value={area} onChange={setArea} options={[{label: '1250 - 4000 sq.ft', value: 'small'}, {label: '4000 - 11000 sq.ft', value: 'medium'}, {label: '11000+ sq.ft', value: 'large'}]} />
              </div>
            </div>
            
            <button onClick={() => document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth' })} className="w-full lg:w-[20%] mt-2 md:mt-0 lg:ml-2 bg-amber-500 hover:bg-amber-400 text-[#022c22] rounded-xl md:rounded-xl font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-3 shadow-lg font-poppins text-[11px] h-[56px] lg:h-[60px] shrink-0">
              <Search size={16} /> View Landmarks
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TrustSection = () => (
  <section className="w-full px-[3vw] py-12 lg:py-16">
    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 text-center border-b border-stone-200 pb-12 lg:pb-16">
      {SITE_DATA.metrics.map((metric, idx) => (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={idx} variants={cardVariants} key={idx} className="flex flex-col items-center">
          <span className="text-5xl md:text-6xl lg:text-[4rem] font-light text-[#022c22] mb-4 font-poppins tracking-tight"><AnimatedCounter value={metric.value} suffix={metric.suffix} /></span>
          <span className="text-stone-500 font-medium text-[10px] md:text-xs uppercase tracking-widest leading-relaxed font-poppins">{metric.label}</span>
        </motion.div>
      ))}
    </div>
  </section>
);

const AboutSection = ({ navigate }) => (
  <section className="w-full py-24 lg:py-32">
    <SectionHeader eyebrow="The ABM Promise" titleFirst="Protecting Your" titleItalic="Peace of Mind." />
    <div className="w-full px-[3vw] flex flex-col lg:flex-row justify-between gap-16 lg:gap-24 items-center">
      <div className="lg:w-1/2 w-full pr-0 lg:pr-8">
        <p className="text-stone-600 text-base md:text-lg font-light leading-relaxed mb-6 font-poppins w-full">Buying land in India shouldn't feel like a gamble. ABM Landmarks was founded with a singular, uncompromising mission: to remove the friction, opacity, and anxiety from real estate acquisition.</p>
        <p className="text-stone-600 text-base md:text-lg font-light leading-relaxed mb-10 font-poppins w-full">We are not brokers. We are acquisition specialists. Before a parcel is ever offered to you, our legal consortium has already executed a ruthless 30-year search report, cleared every title, and secured every government sanction. You aren't just buying land; you are buying certainty.</p>
        <button onClick={() => { navigate('about'); window.scrollTo(0,0); }} className="text-[#022c22] font-semibold text-xs uppercase tracking-widest flex items-center gap-3 hover:text-amber-600 transition-colors font-poppins group">Explore Our Philosophy <ArrowRight size={16} className="transform transition-transform group-hover:translate-x-1" /></button>
      </div>
      <div className="lg:w-1/2 w-full relative">
        <div className="aspect-[3/4] lg:aspect-[4/5] min-h-[500px] w-full overflow-hidden rounded-[2rem] relative shadow-2xl">
          <div className="absolute inset-0 bg-[#022c22]/40 mix-blend-multiply z-10 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#022c22]/90 via-transparent to-transparent z-10 pointer-events-none opacity-80"></div>
          <motion.img animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} src="https://static.wixstatic.com/media/74639d_656298cd109b43c2b383f609a2175873~mv2.jpeg" alt="ABM Landmarks Architectural Philosophy" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-10 -left-6 lg:-left-10 bg-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-[280px] md:max-w-[320px] border border-stone-100 z-20">
          <Quote size={28} className="text-[#022c22] mb-4" />
          <p className="text-stone-800 font-medium italic text-sm leading-relaxed font-poppins">"Our metric for success isn't acreage sold. It is the absolute, unquestionable security we deliver to our investors."</p>
        </div>
      </div>
    </div>
  </section>
);

const ProcessSection = ({ navigate }) => (
  <section className="w-full bg-[#022c22] py-24 lg:py-32 text-white relative overflow-hidden">
    <div className="relative z-10">
      <SectionHeader isDarkBg={true} eyebrow="The Acquisition Pathway" titleFirst="A Frictionless" titleItalic="Journey." actionText="View Full Services" onAction={() => { navigate('services'); window.scrollTo(0,0); }} />
      <div className="w-full px-[3vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mt-16">
        {[
          { step: '01', title: 'Forensic Vetting', desc: 'A rigorous 30-year title search and legal clearance before acquisition.' },
          { step: '02', title: 'Master Planning', desc: 'Ecological surveys, topography mapping, and architectural master planning.' },
          { step: '03', title: 'Sanctions & RERA', desc: 'Securing PMRDA approvals, NA status, and individual RERA registrations.' },
          { step: '04', title: 'Generational Transfer', desc: 'Flawless execution of the sale deed, handing over a pristine, secure asset.' }
        ].map((item, idx) => (
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={idx} variants={cardVariants} key={idx} className="flex flex-col relative group">
            <span className="text-amber-500 text-5xl font-light font-poppins mb-6">{item.step}</span>
            <h4 className="text-xl font-medium mb-4 font-poppins">{item.title}</h4>
            <p className="text-white/60 text-sm font-light leading-relaxed font-poppins pr-4">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const FeaturedProjects = ({ navigate }) => (
  <section id="featured-projects" className="w-full py-24 lg:py-32 bg-stone-50">
    <SectionHeader eyebrow="Curated Landmarks" titleFirst="Estates of" titleItalic="Distinction." actionText="View All Landmarks" onAction={() => { navigate('projects'); window.scrollTo(0,0); }} />
    <div className="w-full px-[3vw] grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12">
      {PROJECTS.map((project, idx) => (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={idx} variants={cardVariants} key={project.id} className="group cursor-pointer bg-white rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-700 border border-stone-200">
          <div className="relative h-[300px] lg:h-[400px] overflow-hidden w-full">
            <div className="absolute top-6 left-6 z-20 flex gap-3">
              <span className="bg-[#022c22]/95 backdrop-blur-md text-white text-[10px] font-semibold px-4 py-2 rounded-lg uppercase tracking-widest font-poppins">{project.status}</span>
              <span className="bg-white/95 backdrop-blur-md text-[#022c22] text-[10px] font-semibold px-4 py-2 rounded-lg uppercase tracking-widest font-poppins">{project.type}</span>
            </div>
            <img src={project.image} alt={project.title} className="w-full h-full absolute inset-0 object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
          </div>
          <div className="p-8 lg:p-10 w-full">
            <h3 className="text-2xl font-light text-stone-900 mb-2 font-poppins">{project.title}</h3>
            <p className="text-stone-500 text-sm mb-6 flex items-center gap-2 font-poppins"><MapPin size={14}/> {project.location}</p>
            <div className="flex flex-wrap gap-4 border-t border-stone-100 pt-6">
              <div className="w-full sm:w-auto"><p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1 font-poppins">Scale</p><p className="text-sm font-medium text-stone-900 font-poppins">{project.plotSizes}</p></div>
              <div className="w-full sm:w-auto"><p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1 font-poppins">Protection</p><p className="text-sm font-medium text-stone-900 font-poppins">{project.approvals[0]}</p></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const GallerySection = () => {
  const mediaList = [
    { type: 'image', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2940&auto=format&fit=crop' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=2940&auto=format&fit=crop' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2950&auto=format&fit=crop' },
    { type: 'image', url: 'https://static.wixstatic.com/media/74639d_b99afb0223014c35b4f98bbffa2eca32~mv2.jpeg' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2934&auto=format&fit=crop' },
    { type: 'video', url: 'https://video.wixstatic.com/video/74639d_07b5b3b911f34cb88667e4d05c71e87a/1080p/mp4/file.mp4' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop' },
    { type: 'video', url: 'https://video.wixstatic.com/video/74639d_86f960e089b94635ba6d8fd7d264a53f/1080p/mp4/file.mp4' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2893&auto=format&fit=crop' },
    { type: 'video', url: 'https://video.wixstatic.com/video/74639d_75c7c7f9044e4b6e9c60a4cd5a8bcbdf/1080p/mp4/file.mp4' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2940&auto=format&fit=crop' },
    { type: 'video', url: 'https://video.wixstatic.com/video/74639d_739f44c51be74491bc529ed7f97d44b4/720p/mp4/file.mp4' },
    { type: 'video', url: 'https://video.wixstatic.com/video/74639d_44fe3cc55aa94df384f5461b2f7cfe57/1080p/mp4/file.mp4' }
  ];

  return (
    <section className="w-full py-24 lg:py-32">
      <SectionHeader eyebrow="The Visual Archive" titleFirst="Curated" titleItalic="Landscapes." />
      <div className="w-full px-[3vw] mt-12">
        <div className="masonry-grid">
          {mediaList.map((item, idx) => (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: (idx % 4) * 0.1 }} key={idx} className="masonry-item rounded-2xl overflow-hidden shadow-lg group">
              {item.type === 'image' ? (
                <img src={item.url} alt={`ABM Landmark Estate ${idx}`} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
              ) : (
                <video src={item.url} autoPlay loop muted playsInline className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="w-full py-24 lg:py-32 bg-stone-50">
      <div className="w-full px-[3vw] flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        <div className="lg:w-2/5 w-full sticky top-32">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-amber-500"></div>
            <span className="text-amber-600 font-semibold tracking-widest text-[10px] uppercase font-poppins">Absolute Transparency</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-light text-stone-900 mb-8 font-poppins tracking-tight leading-[1.1]">
            Resolving Your <br className="hidden md:block"/>
            <span className="font-medium italic text-[#022c22]">Inquiries.</span>
          </h2>
          <p className="text-stone-600 font-light leading-relaxed font-poppins">We believe that a well-informed investor is our best partner. Explore our rigorous protocols for securing your legacy.</p>
        </div>
        <div className="lg:w-3/5 w-full flex flex-col gap-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-stone-200 overflow-hidden transition-all duration-300 w-full shadow-sm hover:shadow-md">
              <button onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)} className="w-full px-8 py-6 flex justify-between items-center text-left focus:outline-none">
                <span className={`font-medium pr-8 font-poppins text-sm md:text-base ${openIdx === idx ? 'text-[#022c22]' : 'text-stone-800'}`}>{faq.q}</span>
                <span className="shrink-0 text-amber-500">{openIdx === idx ? <Minus size={20}/> : <Plus size={20}/>}</span>
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-6 text-stone-600 font-light leading-relaxed font-poppins text-sm md:text-base">
                    <div className="pt-4 border-t border-stone-100">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = ({ navigate }) => (
  <section className="w-full py-24 lg:py-32">
    <SectionHeader eyebrow="Investor Sentiments" titleFirst="Voices of" titleItalic="Trust." actionText="Schedule a Consultation" onAction={() => { navigate('contact'); window.scrollTo(0,0); }} />
    <div className="w-full px-[3vw] grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-12">
      {TESTIMONIALS.map((t, idx) => (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={idx} variants={cardVariants} key={idx} className="bg-white p-10 rounded-[2rem] border border-stone-200 shadow-md hover:shadow-xl transition-shadow w-full flex flex-col h-full relative">
          <Quote size={40} className="text-[#022c22]/10 absolute top-8 right-8" />
          <p className="text-stone-700 font-light italic leading-relaxed mb-8 flex-grow font-poppins relative z-10 text-sm lg:text-base">"{t.quote}"</p>
          <div className="flex flex-col mt-auto relative z-10">
            <span className="font-semibold text-stone-900 font-poppins">{t.name}</span>
            <span className="text-[10px] text-amber-600 uppercase tracking-widest font-poppins mt-1">{t.role}</span>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const PreFooter = () => (
  <section className="w-full pt-[3%] relative z-20 bg-[#faf8f2]">
    <div className="w-full bg-[#022c22] rounded-t-[2.5rem] p-12 md:p-16 lg:p-24 relative overflow-hidden flex flex-col items-center justify-center min-h-[50vh] text-center">
      <div className="absolute inset-0 bg-[#022c22] z-0"></div>
      <video src="https://video.wixstatic.com/video/74639d_44fe3cc55aa94df384f5461b2f7cfe57/1080p/mp4/file.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen grayscale z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] to-transparent z-20 pointer-events-none"></div>
      
      <div className="relative z-30 flex flex-col items-center max-w-3xl w-full mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-light text-white mb-8 font-poppins tracking-tight leading-[1.1]">Ready to Secure <br className="hidden md:block"/><span className="font-medium italic">Your Legacy?</span></h2>
        <p className="text-white/80 font-light mb-12 max-w-xl text-base md:text-lg font-poppins leading-relaxed">Connect directly with our acquisition partners to request a verified legal dossier or schedule a private site viewing.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 w-full sm:w-auto">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-amber-500 hover:bg-amber-400 text-[#022c22] px-10 py-5 rounded-xl font-bold tracking-widest uppercase transition-colors text-xs flex items-center justify-center gap-3 font-poppins shadow-xl"><FileText size={18} /> Request Dossier</button>
          <a href={`tel:${SITE_DATA.phone}`} className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-xl font-bold tracking-widest uppercase transition-colors text-xs flex items-center justify-center gap-3 font-poppins"><Phone size={18} /> Call Advisor</a>
        </div>
      </div>
    </div>
  </section>
);

const Footer = ({ navigate }) => (
  <footer className="w-full bg-[#022c22] pt-12 pb-12 border-t-0 text-white relative z-20">
    <div className="w-full px-[3vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-16">
      <div className="col-span-1 lg:col-span-1">
        <img src={ASSETS.logo} alt="ABM Landmarks" className="h-12 mb-8 brightness-0 invert" />
        <p className="text-white/70 text-sm font-light leading-relaxed font-poppins w-full max-w-xs">{SITE_DATA.brand} secures generational wealth through legally flawless, nature-led estate acquisitions.</p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-6 uppercase tracking-widest text-[10px] font-poppins">Navigation</h4>
        <ul className="space-y-4">
          {['Home', 'Philosophy', 'Services', 'Landmarks', 'Insights', 'Contact'].map(link => {
            const routeMap = { 'Philosophy': 'about', 'Landmarks': 'projects' };
            const route = routeMap[link] || link.toLowerCase();
            return (
              <li key={link}><button onClick={() => { navigate(route); window.scrollTo(0,0); }} className="text-white/70 hover:text-amber-500 transition-colors text-sm font-poppins">{link}</button></li>
            );
          })}
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-6 uppercase tracking-widest text-[10px] font-poppins">Contact</h4>
        <ul className="space-y-4 text-sm text-white/70 font-poppins">
          <li>{SITE_DATA.address}</li>
          <li><a href={`tel:${SITE_DATA.phone}`} className="hover:text-amber-500 transition-colors">{SITE_DATA.phone}</a></li>
          <li><a href={`mailto:${SITE_DATA.email}`} className="hover:text-amber-500 transition-colors">{SITE_DATA.email}</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-6 uppercase tracking-widest text-[10px] font-poppins">Legal</h4>
        <ul className="space-y-4">
          {['Privacy Policy', 'Terms of Service', 'Disclaimer'].map(link => (
            <li key={link}><button onClick={() => { navigate(link.split(' ')[0].toLowerCase()); window.scrollTo(0,0); }} className="text-white/70 hover:text-amber-500 transition-colors text-sm font-poppins">{link}</button></li>
          ))}
        </ul>
      </div>
    </div>
    <div className="w-full px-[3vw] pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-white/50 text-xs font-poppins text-center md:text-left">© {new Date().getFullYear()} {SITE_DATA.legalEntity}. All rights reserved.</p>
      <p className="text-white/50 text-[10px] uppercase tracking-widest font-poppins text-center md:text-right">A Premium Estate Curator</p>
    </div>
  </footer>
);

const PageHero = ({ eyebrow, titleFirst, titleItalic, description, image, video }) => (
  <section className="sticky top-0 z-0 w-full px-[1vw] pt-[100px] pb-[1vw] flex flex-col" style={{ height: '100vh' }}>
    <div className="relative w-full h-full rounded-[2.5rem] bg-[#022c22] overflow-hidden flex flex-col justify-end pb-12 lg:pb-24 px-[4vw] lg:px-[5vw] shadow-2xl">
      {video ? (
        <video src={video} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen" />
      ) : (
        <motion.img 
          initial={{ scale: 1 }} animate={{ scale: 1.15 }} transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          src={image} alt={titleFirst} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen" 
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-r from-[#022c22]/90 via-[#022c22]/30 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#022c22]/90 via-[#022c22]/10 to-transparent opacity-90 pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-5xl">
         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
           <div className="flex items-center gap-4 mb-4 lg:mb-6">
             <div className="h-[2px] w-8 md:w-12 bg-amber-500"></div>
             <span className="text-amber-500 uppercase tracking-widest text-[10px] md:text-xs font-semibold font-poppins">{eyebrow}</span>
           </div>
           <h1 className="text-4xl md:text-5xl lg:text-[5rem] font-light text-white mb-6 leading-[1.1] tracking-tight font-poppins">
             {titleFirst} <br className="hidden md:block"/><span className="italic font-medium text-white/90">{titleItalic}</span>
           </h1>
           {description && <p className="text-base md:text-lg lg:text-xl text-white/80 font-light max-w-2xl leading-relaxed font-poppins">{description}</p>}
         </motion.div>
      </div>
    </div>
  </section>
);

const AboutView = ({ navigate }) => {
  const [activeValue, setActiveValue] = useState(0);

  const corporateValues = [
    {
      title: "Vigilant Forensics",
      icon: Scale,
      subtitle: "UNCOMPROMISED LEGAL SHIELD",
      desc: "Our vetting protocol goes beyond superficial checklists. We trace property lineage through three decades, untangling family tree anomalies, verifying mutation records, and compiling clean historical titles. A plot does not enter our portfolio until our legal consortium signs off unconditionally."
    },
    {
      title: "Ecological Custodianship",
      icon: Leaf,
      subtitle: "CO-EXISTING WITH LANDSCAPE",
      desc: "We don't conquer nature; we integrate with it. Our structural alignments preserve decades-old trees, optimize native topographical wind patterns, and mandate soil-enrichment pipelines to honor and nurture the earth."
    },
    {
      title: "Radical Transparency",
      icon: Eye,
      subtitle: "REAL-TIME INVESTOR VISIBILITY",
      desc: "An investor is entitled to absolute truth. We provide access to exhaustive legal dossiers, drone-charted zoning records, and clear RERA timelines. We completely demystify registration bureaucracy, leaving no room for assumptions."
    },
    {
      title: "Generational Longevity",
      icon: Shield,
      subtitle: "ENGINEERING FUTURE VALUE",
      desc: "A true legacy appreciates gracefully across eras. We select micro-markets strictly in premium infrastructure pathways (like the Hinjawadi-PMRDA corridor) to ensure your parcel serves as a powerful multi-generational financial instrument."
    }
  ];

  return (
    <div className="w-full flex flex-col bg-[#faf8f2]">
      <PageHero 
        eyebrow="Our Philosophy"
        titleFirst="Architects of"
        titleItalic="Trust."
        description="We don't just sell earth. We secure your legacy through absolute, uncompromising legal clarity and nature-first master planning."
        image="https://static.wixstatic.com/media/74639d_656298cd109b43c2b383f609a2175873~mv2.jpeg"
      />
      
      <div className="relative z-10 w-full bg-[#faf8f2]">
        <section className="w-full px-[3vw] py-24 lg:py-32">
          <div className="w-full flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
             <div className="lg:w-1/2 w-full">
               <div className="flex items-center gap-4 mb-8">
                 <div className="h-[2px] w-12 bg-amber-500"></div>
                 <span className="text-amber-600 font-semibold tracking-widest text-[10px] uppercase font-poppins">The Origin</span>
               </div>
               <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-light leading-[1.1] tracking-tight text-stone-900 font-poppins mb-10">
                 It begins with a <br/>
                 <span className="font-medium italic text-[#022c22]">Piece of Earth.</span>
               </h2>
               <div className="space-y-8 text-stone-600 font-light leading-relaxed text-base lg:text-lg font-poppins w-full">
                  <p>Operating from our headquarters at Platinum Tower in Pune, ABM Landmarks emerged from a singular, disruptive vision: to eliminate the anxiety and opacity traditionally associated with land transactions in India. We recognize that purchasing a plot is never just a transaction—it is the laying down of roots. It is the cornerstone of a family's legacy.</p>
                  <p>Unlike conventional brokerages that simply list unverified properties, we operate as deep-tier developers and acquisition specialists. We spend years identifying high-growth corridors—exclusively focusing on the Talegaon, Chandkhed, and Kuran Budruk belts.</p>
               </div>
             </div>
             <div className="lg:w-1/2 w-full">
               <div className="aspect-[3/4] w-full overflow-hidden rounded-[2.5rem] shadow-2xl relative">
                  <video src="https://video.wixstatic.com/video/74639d_44fe3cc55aa94df384f5461b2f7cfe57/1080p/mp4/file.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#022c22]/20 mix-blend-multiply pointer-events-none"></div>
               </div>
             </div>
          </div>
        </section>

        <section className="w-full px-[3vw] pb-24 lg:pb-32">
          <SectionHeader eyebrow="The Visionaries" titleFirst="Leadership &" titleItalic="Stewardship." />
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12">
            {[
              { name: 'Abhijit B. More', role: 'Founder & Managing Director', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2787&auto=format&fit=crop' },
              { name: 'Adv. Rajeev G. Shinde', role: 'Co-Founder & Head of Legal Consortium', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2787&auto=format&fit=crop' }
            ].map((founder, idx) => (
              <div key={idx} className="group relative w-full h-[500px] lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-stone-200">
                <img src={founder.img} alt={founder.name} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] via-[#022c22]/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-10 lg:p-12 flex flex-col justify-end">
                   <span className="text-amber-500 font-bold text-[10px] uppercase tracking-widest mb-3 font-poppins">{founder.role}</span>
                   <h3 className="text-3xl lg:text-4xl font-light text-white font-poppins">{founder.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full px-[1vw] py-24 lg:py-32">
           <div className="w-full bg-[#022c22] rounded-[2.5rem] p-12 lg:p-24 flex flex-col lg:flex-row gap-16 items-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><ShieldCheck size={400} /></div>
              
              <div className="lg:w-1/2 w-full relative z-10">
                <h2 className="text-3xl md:text-4xl lg:text-[4rem] font-light text-white mb-8 font-poppins tracking-tight leading-[1.25]">
                  The 30-Year <br/><span className="font-medium italic text-amber-500">Forensic Audit.</span>
                </h2>
                <p className="text-white/80 font-light text-base lg:text-lg leading-relaxed font-poppins mb-10 pr-0 lg:pr-8">
                  Before a single parcel is offered to the public, our legal consortium executes a ruthless 30-year search report. We clear every encumbrance, secure Non-Agricultural (NA) sanctions from the Collector, and register with MahaRERA. Your capital is protected by our unyielding due diligence.
                </p>
                <div className="border-l-2 border-amber-500 pl-6 py-2">
                  <p className="text-white font-medium italic text-lg lg:text-xl w-full">"The land must be as flawless on paper as it is beautiful in person. That is the ABM standard."</p>
                </div>
              </div>
              
              <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                {SITE_DATA.metrics.map((m, i) => (
                   <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                     <div className="text-4xl lg:text-5xl font-light text-amber-500 font-poppins mb-3">{m.value}{m.suffix}</div>
                     <div className="text-[10px] text-white/70 uppercase tracking-widest font-poppins font-medium">{m.label}</div>
                   </div>
                ))}
              </div>
           </div>
        </section>

        <section className="w-full px-[3vw] pb-24 lg:pb-32">
          <SectionHeader eyebrow="Corporate Values" titleFirst="Ethical" titleItalic="Framework." description="We operate within four strict parameters, ensuring our land acquisitions stand as secure, flawless financial instruments. Tap on any value to understand our rigorous execution methods." />
          
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {corporateValues.map((val, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => setActiveValue(idx)}
                className={`relative rounded-[2rem] p-8 lg:p-10 transition-all duration-500 cursor-pointer border min-h-[380px] h-full flex flex-col justify-start
                  ${activeValue === idx 
                    ? 'bg-[#022c22] text-white border-[#022c22] shadow-2xl scale-105 z-10' 
                    : 'bg-white text-stone-900 border-stone-200 hover:border-amber-500'}`}
              >
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500 ${activeValue === idx ? 'bg-amber-500 text-[#022c22]' : 'bg-stone-50 text-[#022c22] border border-stone-100'}`}>
                   <val.icon size={24} />
                 </div>
                 <span className={`text-[9px] font-bold tracking-widest uppercase mb-4 block font-poppins ${activeValue === idx ? 'text-amber-500' : 'text-amber-600'}`}>
                   {val.subtitle}
                 </span>
                 <h3 className="text-2xl font-light font-poppins mb-6 leading-tight">{val.title}</h3>
                 <p className={`font-light text-sm leading-relaxed font-poppins w-full ${activeValue === idx ? 'text-white/80' : 'text-stone-500'}`}>
                   {val.desc}
                 </p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full px-[3vw] pb-24 lg:pb-32">
          <SectionHeader isDarkBg={false} eyebrow="Organizational Structure" titleFirst="Specialized Teams." titleItalic="Absolute Clarity." description="ABM Landmarks is not a traditional brokerage; it is a highly specialized alignment of deep regulatory, logistical, and environmental experts. Meet the corporate pillars of ABM Landmarks." />
          
          <div className="w-full bg-[#1c1917] rounded-[3rem] p-8 md:p-16 lg:p-20 shadow-2xl border border-stone-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative overflow-hidden">
             
             {[
               { icon: Users, role: "FORENSIC LEGAL CONSORTIUM", title: "Title Custodians", desc: "Our elite tier of high-court real estate counsels and title search experts execute exhaustive ancestral verification pipelines, securing clear certifications." },
               { icon: Trees, role: "ECOLOGICAL MASTERPLANNERS", title: "Topographical Architects", desc: "A specialized guild of environmental specialists and architects who balance modern luxury infrastructure with zero-impact, resource-sensitive land engineering." },
               { icon: Shield, role: "LIAISON & STATUTORY OFFICERS", title: "Compliance Specialists", desc: "A highly networked administrative team managing Collector authorizations, PMRDA master-plan clearances, and seamless RERA regulatory integration." },
               { icon: HeartHandshake, role: "BESPOKE LAND CONCIERGE", title: "Investor Advisors", desc: "Dedicated personal portfolio advisors providing frictionless service, assisting from initial digital registration to turnkey villa handing-over." }
             ].map((team, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10 hover:bg-white/10 transition-colors duration-300 min-h-[380px] h-full flex flex-col justify-start">
                  <div className="w-12 h-12 rounded-xl bg-[#292524] flex items-center justify-center mb-8 border border-stone-700"><team.icon size={20} className="text-amber-500"/></div>
                  <span className="text-amber-500 text-[9px] font-bold uppercase tracking-widest mb-3 block font-poppins">{team.role}</span>
                  <h4 className="text-xl font-medium text-white mb-6 font-poppins">{team.title}</h4>
                  <p className="text-stone-400 font-light text-sm leading-relaxed font-poppins w-full">{team.desc}</p>
                </div>
             ))}
          </div>
        </section>

      </div>
    </div>
  );
};

const ServicesView = ({ navigate }) => {
  const PACKAGES = [
    { id: 'basic', name: 'The Curated Parcel', target: 'The Prudent Investor', desc: 'Secure a piece of the earth with absolute peace of mind. We provide you with a meticulously vetted, clear-title, NA-sanctioned plot complete with foundational infrastructure. It is a blank canvas for your future, protected by our legal rigor.', features: ['30-Year Search Report', 'Demarcated Boundaries', 'Internal Tar Roads', 'Water & Power Points'], image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop' },
    { id: 'custom', name: 'The Bespoke Retreat', target: 'The Visionary Creator', desc: 'You carry the vision; we handle the execution. Beyond land acquisition, our architectural partners and project managers work alongside you to design and construct a customized, climate-responsive farmhouse that honors the local landscape.', features: ['Architectural Mastery', 'End-to-End Construction', 'Native Landscaping', 'Regulatory Approvals'], image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop' },
    { id: 'luxury', name: 'The Turnkey Legacy', target: 'The Discerning Heir', desc: 'The ultimate, frictionless transition into estate ownership. We curate large-acreage parcels and deliver a fully realized luxury villa with premium amenities. Walk into a managed, pristine estate designed for generations to come.', features: ['Premium Large Acreage', 'Smart Home Integration', 'Private Pool & Pavilion', '5-Year Estate Management'], image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2950&auto=format&fit=crop' }
  ];

  return (
    <div className="w-full flex flex-col">
      <PageHero 
        eyebrow="Our Curations"
        titleFirst="From Earth to"
        titleItalic="Estate."
        description="We transition seamlessly from land acquisition curators to master builders. Explore our turnkey pathways to secure luxury ownership."
        image="https://static.wixstatic.com/media/74639d_b99afb0223014c35b4f98bbffa2eca32~mv2.jpeg"
      />
      
      <div className="relative z-10 w-full bg-[#faf8f2]">
        <section className="w-full px-[3vw] py-24 lg:py-32 bg-[#faf8f2] flex flex-col items-center text-center border-b border-stone-200">
          <div className="w-16 h-[2px] bg-amber-500 mb-10"></div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-light text-stone-900 max-w-5xl leading-tight md:leading-[1.25] font-poppins">
            We do not broker land. We engineer fully-sanctioned, <span className="font-medium italic text-[#022c22]">risk-free legacy assets</span> designed to appreciate across generations.
          </h2>
        </section>

        <section className="w-full px-[3vw] py-24 lg:py-32 space-y-24 lg:space-y-32">
          {PACKAGES.map((pkg, idx) => (
            <div key={pkg.id} className={`w-full flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center`}>
               <div className="lg:w-1/2 w-full">
                 <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl relative group w-full">
                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md text-[#022c22] font-bold text-3xl px-4 py-2 rounded-xl font-poppins shadow-lg">0{idx + 1}</div>
                 </div>
               </div>
               <div className="lg:w-1/2 w-full">
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-6 block font-poppins">{pkg.target}</span>
                  <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-light text-stone-900 mb-8 font-poppins tracking-tight leading-[1.1]">{pkg.name}</h2>
                  <p className="text-stone-600 font-light leading-relaxed mb-12 text-lg font-poppins w-full">{pkg.desc}</p>
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-stone-800 font-medium font-poppins bg-white p-5 rounded-xl border border-stone-100 shadow-sm w-full"><CheckCircle2 size={18} className="text-emerald-600 shrink-0"/> {feat}</div>
                    ))}
                  </div>
                  <button onClick={() => { navigate('contact'); window.scrollTo(0,0); }} className="bg-[#022c22] text-white px-8 py-5 rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-amber-500 hover:text-[#022c22] transition-colors font-poppins flex items-center gap-3 shadow-xl w-fit">Consult With Us <ArrowRight size={16} /></button>
               </div>
            </div>
          ))}
        </section>

        <section className="w-full px-[3vw] pb-24 lg:pb-32">
          <SectionHeader eyebrow="The Built Environment" titleFirst="Estate" titleItalic="Infrastructure." description="ABM Landmarks transforms raw topography into livable, highly-connected sanctuaries. Every project features premium foundational infrastructure executed to exacting standards." />
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12">
             {[
               { title: "Masterplanned Roadways", icon: Ruler, desc: "Wide, heavy-duty internal tar and concrete roads ensure smooth, all-weather connectivity throughout the entire estate footprint." },
               { title: "Integrated Utilities", icon: Sprout, desc: "Concealed underground electricity pipelines, dedicated water connections, and advanced drainage systems pre-installed for every plot." },
               { title: "Gated Security", icon: ShieldCheck, desc: "Imposing entrance pavilions, 24/7 CCTV surveillance grids, and robust perimeter compound walls securing the entire community." }
             ].map((item, i) => (
                <div key={i} className="bg-white p-10 lg:p-12 rounded-[2rem] shadow-md border border-stone-200 hover:shadow-xl transition-shadow w-full h-full flex flex-col">
                   <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center mb-8 border border-stone-100"><item.icon size={24} className="text-[#022c22]"/></div>
                   <h3 className="text-2xl font-medium text-stone-900 mb-4 font-poppins">{item.title}</h3>
                   <p className="text-stone-500 font-light text-sm leading-relaxed font-poppins w-full flex-grow">{item.desc}</p>
                </div>
             ))}
          </div>
        </section>

        <section className="w-full px-[1vw] pb-24 lg:pb-32">
           <div className="w-full bg-[#1c1917] rounded-[2.5rem] p-12 lg:p-24 shadow-2xl flex flex-col lg:flex-row gap-16 items-center relative overflow-hidden">
             <div className="absolute top-0 left-0 p-12 opacity-5 pointer-events-none"><HardHat size={300} className="text-white"/></div>
             
             <div className="lg:w-1/2 w-full relative z-10">
               <div className="flex items-center gap-4 mb-8">
                 <div className="h-[2px] w-12 bg-amber-500"></div>
                 <span className="text-amber-500 font-semibold tracking-widest text-[10px] uppercase font-poppins">The Architectural Studio</span>
               </div>
               <h2 className="text-4xl lg:text-[4rem] font-light tracking-tight leading-[1.1] text-white font-poppins mb-10">
                 Designing <span className="font-medium italic">Sanctuaries.</span>
               </h2>
               <p className="text-white/70 font-light leading-relaxed text-lg font-poppins w-full mb-10">
                 For clients seeking "The Bespoke Retreat" or "Turnkey Legacy" packages, ABM's internal architectural studio takes command. We design climate-responsive, luxury farmhouses that harmonize perfectly with the native Maharashtrian landscape, executing construction with zero friction to the buyer.
               </p>
               <button onClick={() => { navigate('projects'); window.scrollTo(0,0); }} className="text-amber-500 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors font-poppins flex items-center gap-3">View Completed Villas <ArrowRight size={16} /></button>
             </div>
             
             <div className="lg:w-1/2 w-full relative z-10 grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop" className="w-full h-48 lg:h-64 object-cover rounded-2xl shadow-lg" alt="Architecture 1"/>
                <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop" className="w-full h-48 lg:h-64 object-cover rounded-2xl shadow-lg mt-8" alt="Architecture 2"/>
             </div>
           </div>
        </section>

        <ProcessSection navigate={navigate} />
      </div>
    </div>
  );
};

const ProjectsView = ({ navigate }) => (
  <div className="w-full flex flex-col">
    <PageHero 
      eyebrow="Exclusive Access"
      titleFirst="Verified"
      titleItalic="Landmarks."
      description="Step into our private collection of cleared, vetted, and heavily sanctioned plotted developments in Maharashtra's finest corridors."
      video="https://video.wixstatic.com/video/74639d_07b5b3b911f34cb88667e4d05c71e87a/1080p/mp4/file.mp4"
    />
    
    <div className="relative z-10 w-full bg-[#faf8f2]">
      <section className="w-full px-[3vw] py-24 lg:py-32">
        <div className="w-full space-y-24 lg:space-y-32">
          {PROJECTS.map((project, idx) => (
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={idx} variants={cardVariants} key={project.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-stone-200 flex flex-col lg:flex-row w-full">
              <div className="lg:w-7/12 relative min-h-[400px] lg:min-h-[600px] overflow-hidden w-full">
                 <div className="absolute top-8 left-8 z-20 flex flex-wrap gap-3 pr-8">
                    <span className="bg-[#022c22]/95 backdrop-blur-md text-white text-[10px] font-semibold px-4 py-2 rounded-lg uppercase tracking-widest font-poppins shadow-lg">{project.status}</span>
                    <span className="bg-white/95 backdrop-blur-md text-[#022c22] text-[10px] font-semibold px-4 py-2 rounded-lg uppercase tracking-widest font-poppins shadow-lg">{project.type}</span>
                  </div>
                <img src={project.image} alt={project.title} className="w-full h-full absolute inset-0 object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
              </div>
              <div className="lg:w-5/12 p-10 lg:p-16 flex flex-col justify-center w-full">
                <div className="flex items-center gap-2 text-amber-600 font-semibold text-xs mb-6 uppercase tracking-widest font-poppins"><MapPin size={16} /> {project.location}</div>
                <h2 className="text-4xl lg:text-[3rem] font-light tracking-tight leading-[1.1] text-stone-900 mb-8 font-poppins">{project.title}</h2>
                <p className="text-stone-600 mb-12 font-light text-base lg:text-lg leading-relaxed font-poppins w-full">{project.description}</p>
                <div className="grid grid-cols-2 gap-8 border-y border-stone-100 py-8 mb-12 w-full">
                   <div className="w-full"><p className="text-[10px] text-stone-400 uppercase tracking-widest mb-3 font-semibold font-poppins">Scale</p><p className="font-medium text-base lg:text-lg text-stone-900 font-poppins flex items-center gap-2"><Ruler size={18} className="text-[#022c22]"/>{project.plotSizes}</p></div>
                   <div className="w-full"><p className="text-[10px] text-stone-400 uppercase tracking-widest mb-3 font-semibold font-poppins">Protection</p><p className="font-medium text-base lg:text-lg text-stone-900 font-poppins flex items-center gap-2"><ShieldCheck size={18} className="text-[#022c22]"/>{project.approvals[0]}</p></div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <button onClick={() => { navigate('contact'); window.scrollTo(0,0); }} className="w-full bg-[#022c22] hover:bg-amber-500 text-white hover:text-[#022c22] py-5 rounded-xl font-bold tracking-widest uppercase transition-colors text-xs flex justify-center items-center gap-3 font-poppins shadow-xl">Secure a Plot <ArrowRight size={16}/></button>
                  <button className="w-full bg-stone-50 border border-stone-200 hover:border-amber-500 hover:bg-white text-stone-900 py-5 rounded-xl font-bold tracking-widest uppercase transition-colors text-xs flex justify-center items-center gap-3 font-poppins shadow-sm"><Download size={16}/> Dossier</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

const InsightsView = () => (
  <div className="w-full flex flex-col">
    <PageHero 
      eyebrow="Market Intelligence"
      titleFirst="The Landowner's"
      titleItalic="Journal."
      description="Unfiltered expert perspectives on land acquisition, legal frameworks, and sustainable farmhouse architecture in Maharashtra."
      image="https://static.wixstatic.com/media/74639d_0968ba7da89c4946bbc29448158e784f~mv2.jpeg"
    />
    
    <div className="relative z-10 w-full bg-[#faf8f2]">
      <section className="w-full px-[3vw] py-24 lg:py-32">
        <div className="mb-24 w-full">
           <h3 className="text-xs font-bold tracking-widest text-amber-600 uppercase mb-8 font-poppins flex items-center gap-3"><div className="w-8 h-[2px] bg-amber-500"></div> Featured Report</h3>
           <motion.div initial="hidden" animate="visible" custom={0} variants={cardVariants} className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-stone-200 flex flex-col lg:flex-row w-full">
              <div className="lg:w-3/5 relative h-80 lg:h-auto overflow-hidden w-full">
                <img src={INSIGHTS[0].image} className="w-full h-full absolute inset-0 object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
              </div>
              <div className="lg:w-2/5 p-10 lg:p-16 flex flex-col justify-center w-full">
                <span className="text-stone-400 text-[10px] font-bold tracking-widest uppercase mb-6 block font-poppins">{INSIGHTS[0].category} • {INSIGHTS[0].date}</span>
                <h2 className="text-3xl lg:text-[2.5rem] font-light tracking-tight leading-[1.1] text-stone-900 mb-6 font-poppins group-hover:text-amber-700 transition-colors w-full">{INSIGHTS[0].title}</h2>
                <p className="text-stone-600 text-base font-light leading-relaxed mb-10 font-poppins w-full">{INSIGHTS[0].summary}</p>
                <button className="text-[#022c22] font-semibold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:text-amber-600 transition-colors font-poppins">Read Full Report <ArrowRight size={16} /></button>
              </div>
           </motion.div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 w-full">
          {INSIGHTS.slice(1).map((insight, idx) => (
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={idx + 1} variants={cardVariants} key={insight.id} className="group cursor-pointer bg-white rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-700 border border-stone-200 flex flex-col w-full h-full">
              <div className="relative h-72 overflow-hidden w-full shrink-0">
                <img src={insight.image} alt={insight.title} className="w-full h-full absolute inset-0 object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md text-[#022c22] text-[10px] font-semibold px-4 py-2 rounded-lg uppercase tracking-widest font-poppins shadow-md">{insight.category}</div>
              </div>
              <div className="p-10 flex flex-col flex-grow w-full">
                <span className="text-stone-400 text-[10px] font-semibold tracking-widest uppercase mb-4 block font-poppins">{insight.date}</span>
                <h2 className="text-2xl font-medium text-stone-900 mb-6 group-hover:text-amber-700 transition-colors font-poppins leading-snug w-full">{insight.title}</h2>
                <p className="text-stone-600 text-sm font-light leading-relaxed mb-10 flex-grow font-poppins w-full">{insight.summary}</p>
                <button className="text-[#022c22] font-semibold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:text-amber-600 transition-colors font-poppins mt-auto">Read Article <ArrowRight size={16} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

const ContactView = () => (
  <div className="w-full flex flex-col">
     <PageHero 
      eyebrow="Private Concierge"
      titleFirst="Command Your"
      titleItalic="Future."
      description="Connect directly with our acquisition partners to schedule a private viewing, request verified legal dossiers, or discuss bespoke estate development."
      video="https://video.wixstatic.com/video/74639d_739f44c51be74491bc529ed7f97d44b4/720p/mp4/file.mp4"
    />
    
    <div className="relative z-10 w-full bg-[#faf8f2]">
      <div className="w-full px-[3vw] py-24 lg:py-32">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 w-full">
          
          <div className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-2xl border border-stone-200 h-fit w-full">
            <h3 className="text-4xl md:text-5xl font-light tracking-tight leading-[1.1] text-stone-900 mb-10 font-poppins">Request a <span className="font-medium italic">Consultation.</span></h3>
            <form className="flex flex-col gap-6 w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <input type="text" required className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 lg:py-5 px-6 text-sm md:text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-stone-400 font-poppins" placeholder="First Name" />
                <input type="text" required className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 lg:py-5 px-6 text-sm md:text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-stone-400 font-poppins" placeholder="Last Name" />
              </div>
              <input type="email" required className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 lg:py-5 px-6 text-sm md:text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-stone-400 font-poppins" placeholder="Email Address" />
              <input type="tel" required className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 lg:py-5 px-6 text-sm md:text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-stone-400 font-poppins" placeholder="Phone Number" />
              <select defaultValue="" required className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 lg:py-5 px-6 text-sm md:text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-stone-600 appearance-none cursor-pointer font-poppins">
                <option value="" disabled>Subject of Inquiry...</option>
                {PROJECTS.map(p => <option key={p.id} value={p.id}>Landmark: {p.title}</option>)}
                <option value="custom">Bespoke Estate Services</option>
                <option value="general">General Advisory</option>
              </select>
              <textarea required rows="4" className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 lg:py-5 px-6 text-sm md:text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-stone-400 font-poppins resize-none" placeholder="Share your investment vision with us..."></textarea>
              <button type="submit" className="w-full bg-[#022c22] hover:bg-amber-500 hover:text-[#022c22] text-white py-5 text-sm font-bold tracking-widest uppercase rounded-xl transition-all duration-300 shadow-xl flex justify-center items-center gap-3 mt-4 font-poppins">Submit Inquiry <ArrowRight size={18} /></button>
            </form>
          </div>

          <div className="flex flex-col gap-8 h-full w-full">
            <div className="w-full bg-[#022c22] text-white rounded-[2.5rem] p-10 lg:p-14 flex flex-col justify-center shadow-2xl relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><Landmark size={250} /></div>
              <h4 className="text-amber-500 font-bold mb-12 uppercase tracking-widest text-xs font-poppins relative z-10 flex items-center gap-3"><div className="w-6 h-[2px] bg-amber-500"></div> Headquarters</h4>
              <div className="space-y-12 relative z-10 w-full">
                <div className="flex items-start gap-6 w-full">
                  <div className="p-4 bg-white/10 rounded-2xl shrink-0 backdrop-blur-md border border-white/10"><NavIcon size={24} className="text-white"/></div>
                  <div className="w-full">
                    <p className="text-[10px] font-bold mb-2 uppercase tracking-wider font-poppins text-amber-500">Visit the Firm</p>
                    <p className="text-base lg:text-lg font-light leading-relaxed font-poppins text-white/90 w-full">{SITE_DATA.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 w-full">
                  <div className="p-4 bg-white/10 rounded-2xl shrink-0 backdrop-blur-md border border-white/10"><Phone size={24} className="text-white"/></div>
                  <div className="w-full">
                    <p className="text-[10px] font-bold mb-2 uppercase tracking-wider font-poppins text-amber-500">Speak to an Advisor</p>
                    <a href={`tel:${SITE_DATA.phone}`} className="text-xl lg:text-2xl font-light hover:text-white transition-colors font-poppins text-white/90 w-full">{SITE_DATA.phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-6 w-full">
                  <div className="p-4 bg-white/10 rounded-2xl shrink-0 backdrop-blur-md border border-white/10"><Mail size={24} className="text-white"/></div>
                  <div className="w-full">
                    <p className="text-[10px] font-bold mb-2 uppercase tracking-wider font-poppins text-amber-500">Direct Contact</p>
                    <a href={`mailto:${SITE_DATA.email}`} className="text-xl lg:text-2xl font-light hover:text-white transition-colors font-poppins text-white/90 w-full">{SITE_DATA.email}</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full bg-white border border-stone-200 rounded-[2rem] p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-xl transition-shadow w-full">
               <div className="text-center sm:text-left w-full">
                 <h4 className="text-stone-900 font-medium font-poppins mb-2 text-xl">Immediate Assistance</h4>
                 <p className="text-stone-500 text-sm font-light font-poppins">Our acquisition team is available Mon-Sat, 9am - 7pm</p>
               </div>
               <a href={`https://wa.me/${SITE_DATA.whatsapp}`} className="bg-[#25D366] hover:bg-green-600 text-white px-8 py-5 rounded-xl font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-3 transition-colors font-poppins shadow-xl w-full sm:w-auto shrink-0">
                 <MessageCircle size={20} /> Private Chat
               </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LegalView = ({ title }) => (
  <div className="pt-32 pb-32 w-full px-[3vw]">
    <SEOHead title={title} description={`${title} for ABM Landmarks.`} />
    <div className="w-full bg-white p-10 lg:p-20 rounded-[2.5rem] shadow-2xl border border-stone-200">
      <h1 className="text-4xl md:text-5xl font-light text-[#022c22] mb-12 font-poppins tracking-tight">{title}</h1>
      <div className="prose prose-stone max-w-none font-light text-stone-600 leading-relaxed font-poppins text-sm md:text-base w-full">
        <p>This is a placeholder for the official {title.toLowerCase()} of {SITE_DATA.legalEntity}. In a production environment, this content will be populated directly from the headless CMS to ensure legal compliance and easy updates.</p>
        <h3 className="text-xl font-medium text-stone-900 mt-10 mb-4">1. General Information</h3>
        <p>The information provided on this website is for representational and informational purposes only. Layouts, specifications, and amenities are subject to approvals from respective authorities.</p>
        <h3 className="text-xl font-medium text-stone-900 mt-10 mb-4">2. Independent Verification</h3>
        <p>Buyers are advised to independently verify all legal and financial details prior to making investment decisions. RERA details are available on official state portals where applicable.</p>
      </div>
    </div>
  </div>
);

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const globalSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": SITE_DATA.brand,
    "legalName": SITE_DATA.legalEntity,
    "url": "https://www.abmlandmarks.com",
    "logo": ASSETS.logo,
    "image": ASSETS.logo,
    "telephone": SITE_DATA.phone,
    "email": SITE_DATA.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Platinum Tower, 4th Floor, Baner",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411045",
      "addressCountry": "IN"
    },
    "priceRange": "$$$"
  };

  const getPageMeta = (route) => {
    switch(route) {
      case 'home': return { title: "Land That Becomes a Legacy", desc: "ABM Landmarks secures your family's generational wealth through legally flawless, nature-led estate acquisitions in Pune's finest corridors." };
      case 'about': return { title: "Architects of Trust", desc: "Discover the ruthless transparency, meticulous vetting, and nature-first architectural vision driving ABM Landmarks." };
      case 'services': return { title: "From Earth to Estate", desc: "Explore our bespoke pathways to land ownership, from vetted parcels to fully managed luxury estate construction." };
      case 'projects': return { title: "Verified Landmarks", desc: "Step into our private collection of cleared, heavily sanctioned plotted developments in Talegaon, Chandkhed and Lonavala." };
      case 'insights': return { title: "The Landowner's Journal", desc: "Unfiltered expert perspectives on land acquisition, legal frameworks, and sustainable farmhouse architecture." };
      case 'contact': return { title: "Command Your Future", desc: "Connect directly with ABM's acquisition partners to schedule a private viewing and review verified legal dossiers." };
      default: return { title: "ABM Landmarks", desc: "Premium Estate Acquisitions" };
    }
  };

  const meta = getPageMeta(currentRoute);

  const renderView = () => {
    switch(currentRoute) {
      case 'home':
        return (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="w-full flex flex-col">
            <HeroSection />
            <div className="relative z-10 w-full bg-[#faf8f2]">
              <TrustSection />
              <AboutSection navigate={setCurrentRoute} />
              <ProcessSection navigate={setCurrentRoute} />
              <FeaturedProjects navigate={setCurrentRoute} />
              <GallerySection />
              <FAQSection />
              <TestimonialsSection navigate={setCurrentRoute} />
              <PreFooter />
            </div>
          </motion.div>
        );
      case 'about':
        return <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="w-full flex flex-col"><AboutView navigate={setCurrentRoute} /><PreFooter /></motion.div>;
      case 'services':
        return <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="w-full flex flex-col"><ServicesView navigate={setCurrentRoute} /><PreFooter /></motion.div>;
      case 'projects':
        return <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="w-full flex flex-col"><ProjectsView navigate={setCurrentRoute} /><PreFooter /></motion.div>;
      case 'insights':
        return <motion.div key="insights" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="w-full flex flex-col"><InsightsView /><PreFooter /></motion.div>;
      case 'contact':
        return <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="w-full flex flex-col"><ContactView /></motion.div>;
      case 'privacy':
        return <motion.div key="privacy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col"><LegalView title="Privacy Policy" /></motion.div>;
      case 'terms':
        return <motion.div key="terms" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col"><LegalView title="Terms of Service" /></motion.div>;
      case 'disclaimer':
        return <motion.div key="disclaimer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col"><LegalView title="Legal Disclaimer" /></motion.div>;
      default:
        return <HeroSection />;
    }
  };

  return (
    <>
      <FontStyles />
      <SEOHead title={meta.title} description={meta.desc} schemaData={globalSchema} />
      
      <div className="min-h-screen relative flex flex-col selection:bg-amber-500 selection:text-[#022c22] w-full bg-[#faf8f2]">
        
        <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} navigate={setCurrentRoute} />
        <Navigation currentRoute={currentRoute} navigate={setCurrentRoute} onOpenSearch={() => setIsSearchOpen(true)} />
        
        <AnimatePresence mode="wait">
          <main className="flex-grow w-full flex flex-col overflow-x-hidden">{renderView()}</main>
        </AnimatePresence>

        <Footer navigate={setCurrentRoute} />
        
        <div className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-40">
          <a href={`https://wa.me/${SITE_DATA.whatsapp}`} className="relative group flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300">
             <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20"></div>
             <MessageCircle size={28} className="lg:w-8 lg:h-8" />
          </a>
        </div>
      </div>
    </>
  );
}
