import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  MapPin, Phone, MessageCircle, Menu, X, ArrowRight, Download, 
  CheckCircle2, ShieldCheck, ChevronDown, FileText, 
  Ruler, Search, Plus, Minus, Mail, Navigation as NavIcon, 
  Landmark, Fingerprint, Leaf, ExternalLink, IndianRupee,
  Users, Building2, Map, FileSearch
} from 'lucide-react';

const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap');
    
    :root {
      --font-primary: 'Poppins', sans-serif;
      --bg-page: #f8f4e8;
      --bg-page-soft: #fbf8ef;
      --bg-card: #fffdf8;
      --bg-dark-green: #022c22;
      --bg-dark-charcoal: #1d1c19;
      --color-gold-accent: #f59e0b;

      /* Unified Header System */
      --header-height: 68px;

      /* Unified Spacing System */
      --section-space-mobile: 72px;
      --section-header-gap-mobile: 40px;

      /* Responsive Typography System */
      --text-display: clamp(2.5rem, 4.5vw, 4rem);
      --text-page-title: clamp(2.35rem, 4vw, 3.75rem);
      --text-section-title: clamp(2rem, 3vw, 3rem);
      --text-card-title: clamp(1.25rem, 1.7vw, 1.75rem);
      --text-body-large: clamp(1rem, 1.2vw, 1.125rem);
      --text-body: clamp(0.9375rem, 1vw, 1rem);
    }

    @media (min-width: 768px) {
      :root {
        --header-height: 76px;
        --section-space-tablet: 88px;
      }
    }

    @media (min-width: 1024px) {
      :root {
        --header-height: 80px;
        --section-space-desktop: 112px;
        --section-header-gap-desktop: 64px;
      }
    }
    
    *, *::before, *::after { box-sizing: border-box; }
    
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 24px);
    }

    body {
      font-family: var(--font-primary);
      background-color: var(--bg-page); 
      color: #1c1917; 
      overflow-x: hidden;
      width: 100vw;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    #root { background: var(--bg-page); }

    img, video, svg { max-width: 100%; height: auto; }
    
    h1, h2, h3, h4, h5, h6, p, a, span, li, button {
      overflow-wrap: break-word;
      word-break: normal;
    }

    .flex-child, .grid-child { min-width: 0; }

    /* Typography Classes */
    .display-title {
      font-size: var(--text-display);
      line-height: 1.04;
      letter-spacing: -0.035em;
      text-wrap: balance;
    }

    .page-title {
      font-size: var(--text-page-title);
      line-height: 1.08;
      letter-spacing: -0.03em;
      text-wrap: balance;
    }

    .section-title {
      font-size: var(--text-section-title);
      line-height: 1.12;
      letter-spacing: -0.025em;
      text-wrap: balance;
    }

    .card-title {
      font-size: var(--text-card-title);
      line-height: 1.25;
      text-wrap: balance;
    }
    
    .reading-width { max-width: 68ch; }
    .card-copy { max-width: 46ch; line-height: 1.7; }

    /* Universal Site Container & Spacing Classes */
    .site-container {
      width: 100%;
      max-width: 1440px;
      margin-inline: auto;
      padding-inline: max(3vw, 20px);
    }

    .content-panel {
      width: calc(100% - max(6vw, 40px));
      max-width: 1360px;
      margin-inline: auto;
      border-radius: clamp(24px, 3vw, 48px);
    }

    .section-spacing {
      padding-top: var(--section-space-mobile);
      padding-bottom: var(--section-space-mobile);
    }

    .section-header-spacing {
      margin-bottom: var(--section-header-gap-mobile);
    }

    @media (min-width: 768px) {
      .section-spacing {
        padding-top: var(--section-space-tablet);
        padding-bottom: var(--section-space-tablet);
      }
    }

    @media (min-width: 1024px) {
      .section-spacing {
        padding-top: var(--section-space-desktop);
        padding-bottom: var(--section-space-desktop);
      }
      .section-header-spacing {
        margin-bottom: var(--section-header-gap-desktop);
      }
    }

    /* Standard Card System */
    .card {
      border: 1px solid rgba(28, 25, 23, 0.1);
      border-radius: clamp(20px, 2vw, 30px);
      background: var(--bg-card);
      padding: clamp(24px, 3vw, 40px);
      min-width: 0;
      height: auto;
      display: flex;
      flex-direction: column;
    }

    .card-dark {
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: clamp(20px, 2vw, 30px);
      background: rgba(255, 255, 255, 0.045);
      padding: clamp(24px, 3vw, 40px);
      min-width: 0;
      height: auto;
      display: flex;
      flex-direction: column;
    }

    .card > * + *, .card-dark > * + * { margin-top: 16px; }
    
    /* Custom Scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: var(--bg-page); }
    ::-webkit-scrollbar-thumb { background: #022c22; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--color-gold-accent); }

    .no-scroll { overflow: hidden; }

    /* Floating WhatsApp */
    .floating-whatsapp {
      position: fixed;
      right: max(20px, env(safe-area-inset-right));
      bottom: max(20px, env(safe-area-inset-bottom));
      width: 56px;
      height: 56px;
      z-index: 40;
    }
    @media (max-width: 768px) {
      .floating-whatsapp { width: 50px; height: 50px; }
    }
  `}</style>
);

const ASSETS = {
  logo: "https://static.wixstatic.com/media/74639d_6785283b06234d209d8c73fe26ad680f~mv2.png",
  favicon: "https://static.wixstatic.com/media/74639d_6785283b06234d209d8c73fe26ad680f~mv2.png",
  heroVideo: "https://video.wixstatic.com/video/74639d_75c7c7f9044e4b6e9c60a4cd5a8bcbdf/1080p/mp4/file.mp4"
};

const SITE_DATA = {
  brand: "ABM Landmarks",
  legalEntity: "ABM Landmarks",
  phone: "+91 7498700069",
  altPhone: "+91 9607880008",
  whatsapp: "+91 7498700069",
  email: "info@abmlandmarks.com",
  salesEmail: "sales@abmlandmarks.com",
  address: "209, NV Business Centre, Somatane Phata, Old Mumbai–Pune Highway, Talegaon 410506",
  metrics: [
    { label: "Decades of Trust", value: 2, suffix: "+" },
    { label: "Acres Curated", value: 500, suffix: "+" },
    { label: "Flawless Titles", value: 25, suffix: "" },
    { label: "Families Secured", value: 1200, suffix: "+" }
  ]
};

const TRUST_PILLARS = [
  { label: "Thoughtfully Selected Locations", icon: MapPin },
  { label: "Documentation-Focused Approach", icon: FileText },
  { label: "Planned Infrastructure", icon: Ruler },
  { label: "Client Assistance", icon: Users }
];

const PROJECTS = [
  {
    id: "vintage-park-devale",
    title: "Vintage Park",
    location: "Devale, near Lonavala, Maharashtra",
    status: "Ongoing",
    type: "NA Bungalow Plots",
    surveyNumber: null,
    area: null,
    plotSizes: null,
    price: null,
    approvals: [
      "PMRDA-sanctioned NA bungalow plots"
    ],
    description: "Vintage Park is an ongoing plotted development at Devale near Lonavala, offering PMRDA-sanctioned NA bungalow plots in a peaceful natural setting.",
    mapUrl: null,
    images: [],
    documents: []
  },
  {
    id: "godumbre-plotted-development",
    title: "Godumbre Plotted Development",
    location: "Godumbre, Maval, Pune — Behind Lodha Belmondo",
    status: "Under Development",
    type: "Residential Plotted Development",
    surveyNumber: "Gat No. 386, Part",
    area: "9,200 sq. m",
    plotSizes: null,
    price: null,
    approvals: [
      "PMRDA Tentative Layout Approval",
      "NA Residential-Use Order"
    ],
    description: "Located at Godumbre in Maval, behind Lodha Belmondo, this residential plotted development covers approximately 9,200 sq. m. The site is currently under development, with internal concrete roads, boundary infrastructure and plot-development work visible on site. Supporting project documents include the NA residential-use order, PMRDA tentative layout approval and project layout plan.",
    mapUrl: "https://maps.app.goo.gl/maps/bH1V6Z9X2P3Y4Z5A6", 
    images: [
      { url: "https://static.wixstatic.com/media/548938_15720859359641b7bf10141c10ab9dbf~mv2.jpeg", caption: "Current internal-road development" },
      { url: "https://static.wixstatic.com/media/548938_ab8cdeab018e4cd0bf4dc2368ffadb57~mv2.jpeg", caption: "Boundary and site-development work" },
      { url: "https://static.wixstatic.com/media/548938_8234f151a2ad4908ac96e2a6e8fa9f65~mv2.jpeg", caption: "Current on-ground project condition" },
      { url: "https://static.wixstatic.com/media/548938_2671004f0374473194bd98c46be462b8~mv2.jpeg", caption: "Development progress at the Godumbre site" },
      { url: "https://static.wixstatic.com/media/548938_879ea6a4ebbd4c2ebb0e35aada6db57e~mv2.jpeg", caption: "Internal access-road construction" },
      { url: "https://static.wixstatic.com/media/548938_ca88b5340e1c43f3a09cc8c9b50b764b~mv2.jpeg", caption: "Site overview" }
    ],
    documents: [
      {
        title: "PMRDA Tentative Layout Approval",
        desc: "Tentative residential layout approval issued for the proposed development at Gat No. 386, Godumbre.",
        file: "https://5489382d-e5dd-44ec-a4eb-680874f5cf71.usrfiles.com/ugd/548938_4b0b0fdeefb64c529b167c5826dec8b2.pdf"
      },
      {
        title: "Project Layout Plan",
        desc: "Proposed residential plotting layout showing roads, plots, open spaces and development planning.",
        file: "https://5489382d-e5dd-44ec-a4eb-680874f5cf71.usrfiles.com/ugd/548938_96d1633c60b84a45905c003e3f267688.pdf"
      },
      {
        title: "NA Residential-Use Order",
        desc: "Order relating to the conversion and permitted residential use of the project land.",
        file: "https://5489382d-e5dd-44ec-a4eb-680874f5cf71.usrfiles.com/ugd/548938_707de30010d5406eaf1c4bbe8a6dbc4a.pdf"
      }
    ]
  },
  {
    id: "kasarsai-pawana-road",
    title: "Kasarsai – Pawana Road Development",
    location: "Kasarsai – Pawana Road",
    status: "Pre-Launch",
    type: "Clear Title NA Plots",
    surveyNumber: null,
    area: null,
    plotSizes: "1300 to 4000 sq.ft.",
    price: "Starting from ₹30 Lakhs (All Inclusive)*",
    approvals: [
      "Clear Title NA Plots"
    ],
    description: "An exclusive pre-launch opportunity featuring clear title NA plots in one of Pune's fastest-growing investment destinations. The development offers excellent appreciation potential, a range of plot sizes from 1,300 to 4,000 sq.ft., and is set amidst peaceful natural surroundings with great road connectivity.",
    mapUrl: null,
    images: [], 
    documents: []
  }
];

const FAQS = [
  { q: "What projects are currently available?", a: "ABM Landmarks currently presents Vintage Park at Devale and the Godumbre Plotted Development in Maval." },
  { q: "Can I visit the project sites?", a: "Yes. Interested buyers can contact the ABM Landmarks team to request a guided site visit." },
  { q: "What information is available for the Godumbre project?", a: "The project page includes current site photographs, the supplied map location, the PMRDA tentative layout document, the project layout plan and the NA residential-use order." },
  { q: "Is the Godumbre layout finally approved?", a: "The supplied PMRDA document is described as a tentative layout approval. It must not be presented as a final layout approval unless a separate final approval document is provided." },
  { q: "Are prices displayed online?", a: "Pricing and availability should be confirmed directly with the ABM Landmarks team." },
  { q: "Can buyers review documents before proceeding?", a: "Available project documents can be accessed from the relevant project page for general reference. Independent legal review is recommended before a purchase decision." }
];

const INSIGHTS = [
  { id: '1', title: 'What to Review in a 7/12 Extract', category: 'Educational', date: 'Coming Soon', image: 'https://static.wixstatic.com/media/74639d_0968ba7da89c4946bbc29448158e784f~mv2.jpeg', summary: 'Understanding the basic components of the 7/12 extract and why it is the fundamental document for any land transaction.' },
  { id: '2', title: 'Understanding NA Land-Use Orders', category: 'Compliance', date: 'Coming Soon', image: 'https://static.wixstatic.com/media/74639d_e89d2be00e5d452eae6c69a88fe3f2e4~mv2.jpeg', summary: 'A guide to Non-Agricultural (NA) orders, their significance, and how they define permitted use cases for acquired land.' },
  { id: '3', title: 'Tentative and Final Layout Approvals Explained', category: 'Planning', date: 'Coming Soon', image: 'https://static.wixstatic.com/media/74639d_b99afb0223014c35b4f98bbffa2eca32~mv2.jpeg', summary: 'Exploring the difference between tentative and final layouts issued by authorities like PMRDA and what it means for infrastructure development.' }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (idx) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: idx * 0.1, ease: "easeOut" } 
  })
};

const SectionHeader = ({ eyebrow, titleFirst, titleItalic, description, actionText, onAction, isDarkBg = false }) => (
  <div className="section-header-spacing w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-12 flex-child">
    <div className="w-full lg:w-3/5 flex-child">
      {eyebrow && (
        <div className="flex items-center gap-4 mb-4 md:mb-6">
          <div className="h-[2px] w-8 md:w-12 bg-amber-500"></div>
          <span className={`font-semibold tracking-widest text-[10px] md:text-xs uppercase font-poppins ${isDarkBg ? 'text-amber-500' : 'text-amber-600'}`}>{eyebrow}</span>
        </div>
      )}
      <h2 className={`section-title font-light font-poppins ${isDarkBg ? 'text-white' : 'text-stone-900'}`}>
        {titleFirst} <span className={`font-medium italic ${isDarkBg ? 'text-white/90' : 'text-[#022c22]'}`}>{titleItalic}</span>
      </h2>
    </div>
    <div className="flex flex-col lg:items-end gap-6 w-full lg:w-2/5 flex-child">
      {description && <p className={`text-base font-light leading-relaxed font-poppins lg:text-right ${isDarkBg ? 'text-white/80' : 'text-stone-600'}`}>{description}</p>}
      {actionText && (
        <button onClick={onAction} className={`group flex items-center gap-3 text-xs font-semibold uppercase tracking-widest transition-colors font-poppins mt-2 ${isDarkBg ? 'text-white hover:text-amber-500' : 'text-[#022c22] hover:text-amber-600'}`}>
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
    <div className="relative flex flex-col w-full h-full justify-center flex-child" ref={dropdownRef}>
      <span className="text-white/50 text-[10px] font-semibold mb-1 md:mb-2 uppercase tracking-widest font-poppins block">{label}</span>
      <div 
        className="flex justify-between items-center bg-transparent cursor-pointer group transition-colors text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-sm md:text-base truncate pr-4 font-poppins ${!value ? 'text-white/80' : 'text-white font-medium'}`}>
          {value ? options.find(o => o.value === value)?.label : placeholder}
        </span>
        <ChevronDown size={16} className={`transform transition-transform text-white/50 group-hover:text-amber-500 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.15 }}
            className="absolute top-[110%] left-0 w-full min-w-[200px] bg-[#041a15]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-[9999] mt-2"
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
          className="fixed inset-0 z-[100] bg-[#022c22]/95 flex flex-col px-[max(3vw,20px)] py-[max(3vw,20px)]"
        >
          <div className="flex justify-end pt-4">
            <button onClick={onClose} className="p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white border border-white/20">
              <X size={24} />
            </button>
          </div>
          <div className="max-w-4xl mx-auto w-full mt-10 lg:mt-20 flex-child">
            <div className="relative">
              <input 
                id="search-input" type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Search landmarks, insights..." 
                className="w-full bg-transparent border-b-2 border-white/30 text-3xl md:text-5xl lg:text-6xl font-light font-poppins text-white pb-4 md:pb-6 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-white/30"
              />
              <Search className="absolute right-0 top-2 text-white/50" size={32} />
            </div>
            <div className="mt-12 h-[50vh] overflow-y-auto pr-4 space-y-12 custom-scrollbar flex-child">
              {query && results.projects.length === 0 && results.insights.length === 0 && <p className="text-white/50 text-lg font-poppins font-light">No verified results found for your query.</p>}
              {results.projects.length > 0 && (
                <div>
                  <h3 className="text-amber-500 uppercase tracking-widest text-xs font-semibold mb-6 flex items-center gap-2 font-poppins"><MapPin size={14}/> Verified Landmarks</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.projects.map(p => (
                      <div key={p.id} onClick={() => { navigate(`project/${p.id}`); onClose(); }} className="cursor-pointer p-6 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all">
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('no-scroll');
      const handleEsc = (e) => { if (e.key === 'Escape') setMobileMenuOpen(false); };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.classList.remove('no-scroll');
        window.removeEventListener('keydown', handleEsc);
      };
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', route: 'home' },
    { name: 'Philosophy', route: 'about' },
    { name: 'How We Work', route: 'how-we-work' },
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
      <header className="fixed top-0 left-0 z-50 w-full pointer-events-none transition-all duration-300">
        <div className={`pointer-events-auto mx-auto transition-all duration-500 flex items-center justify-between
          ${scrolled 
            ? 'w-[calc(100%-2vw)] h-[var(--header-height)] mt-2 md:mt-4 bg-[#fbf8ef]/90 backdrop-blur-xl shadow-sm border border-stone-200/50 rounded-full px-[max(2vw,16px)]' 
            : 'w-full h-[var(--header-height)] px-[max(3vw,20px)] bg-transparent'}`}
        >
          <div className="flex justify-start items-center cursor-pointer shrink-0" onClick={() => handleNav('home')}>
            <img src={ASSETS.logo} alt="ABM Landmarks Logo" className="h-8 md:h-10 w-auto object-contain transition-transform duration-500 hover:scale-105" />
          </div>

          <div className="flex justify-end items-center gap-2 sm:gap-4 shrink-0">
             <button onClick={onOpenSearch} className="text-[#022c22] p-2 hover:bg-black/5 rounded-full transition-colors shrink-0">
               <Search size={20} />
             </button>
             <button 
               className="flex items-center justify-center w-[44px] h-[44px] text-[#022c22] rounded-full hover:bg-black/5 transition-colors shrink-0" 
               onClick={() => setMobileMenuOpen(true)}
               aria-label="Open Navigation Menu"
             >
               <Menu size={24} />
             </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-100%' }} transition={{ type: 'tween', duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-[#1d1c19] text-white overflow-y-auto overflow-x-hidden flex flex-col"
          >
            <div className="w-full h-[var(--header-height)] px-[max(3vw,20px)] flex items-center justify-between shrink-0">
              <div className="flex justify-start items-center cursor-pointer shrink-0" onClick={() => handleNav('home')}>
                <img src={ASSETS.logo} alt="ABM Landmarks Logo" className="h-8 md:h-10 w-auto object-contain brightness-0 invert" />
              </div>
              <button 
                className="flex items-center justify-center w-[44px] h-[44px] text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors shrink-0" 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Navigation Menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="site-container flex-grow flex flex-col lg:flex-row py-12 lg:py-24 h-full">
              <nav className="flex flex-col gap-6 lg:gap-8 lg:w-1/2 justify-center flex-child">
                {navLinks.map((item, idx) => (
                  <motion.button 
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 + 0.1 }}
                    key={item.name} onClick={() => handleNav(item.route)} 
                    className="text-left flex items-center group w-fit"
                  >
                    <span className={`text-[clamp(2.25rem,4vw,3rem)] font-light font-poppins transition-colors ${currentRoute === item.route ? 'text-amber-500' : 'text-white group-hover:text-amber-400'}`}>
                      {item.name}
                    </span>
                    <ArrowRight size={28} className={`ml-4 transition-transform duration-300 ${currentRoute === item.route ? 'text-amber-500 translate-x-2' : 'text-transparent -translate-x-4 group-hover:text-amber-400 group-hover:translate-x-0'}`} />
                  </motion.button>
                ))}
              </nav>

              <div className="flex flex-col justify-end lg:justify-center lg:items-start lg:w-1/2 lg:pl-24 mt-16 lg:mt-0 gap-10 lg:border-l border-white/10 pt-10 lg:pt-0 flex-child">
                <button 
                  onClick={() => { setMobileMenuOpen(false); setTimeout(onOpenSearch, 300); }} 
                  className="flex items-center gap-4 text-white/60 hover:text-amber-400 transition-colors w-fit group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-amber-400 shadow-sm transition-all shrink-0">
                    <Search size={20} className="text-current" />
                  </div>
                  <span className="text-lg font-medium font-poppins">Search Landmarks</span>
                </button>

                <div className="flex flex-col gap-4 w-full">
                   <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest font-poppins">Direct Contact</p>
                   <a href={`tel:${SITE_DATA.phone}`} className="text-xl md:text-2xl font-light text-white hover:text-amber-400 font-poppins inline-block">{SITE_DATA.phone}</a>
                   <a href={`mailto:${SITE_DATA.email}`} className="text-base text-white/60 hover:text-amber-400 font-poppins inline-block">{SITE_DATA.email}</a>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
                   <a href={`https://wa.me/${SITE_DATA.whatsapp}`} className="bg-[#25D366] text-white px-8 py-4 rounded-xl text-sm font-bold tracking-widest uppercase shadow-lg font-poppins flex items-center justify-center gap-3 hover:bg-green-600 transition-colors w-full sm:w-auto">
                     <MessageCircle size={18} /> Private Chat
                   </a>
                   <button onClick={() => handleNav('contact')} className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl text-sm font-bold tracking-widest uppercase shadow-lg font-poppins flex items-center justify-center gap-3 hover:bg-amber-500 hover:text-[#022c22] hover:border-amber-500 transition-colors w-full sm:w-auto">
                     Schedule Viewing
                   </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const HeroSection = () => {
  const [region, setRegion] = useState('');

  return (
    <section className="sticky top-0 z-0 w-full px-[max(2vw,16px)] pb-[max(2vw,16px)] flex flex-col" style={{ minHeight: '100svh', height: '100svh', paddingTop: 'calc(var(--header-height) + 12px)' }}>
      <div className="relative w-full h-full flex flex-col rounded-[2.5rem] bg-[#022c22] overflow-hidden shadow-2xl">
        <video src={ASSETS.heroVideo} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover object-center opacity-50 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#022c22]/90 via-[#022c22]/40 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#022c22]/95 via-[#022c22]/10 to-transparent opacity-90 pointer-events-none"></div>

        <div className="relative z-10 w-full h-full flex flex-col justify-end pb-12 lg:pb-16 px-[4vw] lg:px-[5vw]">
          <div className="w-full mb-8 lg:mb-12 mt-auto flex-child">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}>
              <h1 className="display-title text-white mb-6 font-poppins">
                Carefully Curated <br className="hidden lg:block" />
                <span className="italic font-medium text-white/90">Land Assets.</span>
              </h1>
              <p className="text-white/80 text-base md:text-lg leading-relaxed font-light max-w-2xl font-poppins">
                ABM Landmarks focuses on thoroughly vetted, legally cleared plotted developments across strategic locations in Maharashtra. We prioritize documentation, clarity, and foundational infrastructure.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-full flex flex-col lg:flex-row items-center justify-between p-2 md:p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-[1.25rem] shrink-0"
          >
            <div className="flex flex-col md:flex-row items-center w-full lg:w-[80%] flex-child">
              <div className="w-full px-6 py-4 lg:py-2 h-[70px] lg:h-[60px] flex items-center">
                <CustomDropdown label="Select Corridor" placeholder="Filter by Region" value={region} onChange={setRegion} options={[
                  {label: 'Devale / Lonavala', value: 'devale'}, 
                  {label: 'Godumbre / Maval', value: 'godumbre'},
                  {label: 'Kasarsai / Pawana', value: 'kasarsai'}
                ]} />
              </div>
            </div>
            
            <button onClick={() => document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth' })} className="w-full lg:w-[20%] mt-2 md:mt-0 lg:ml-2 bg-amber-500 hover:bg-amber-400 text-[#022c22] rounded-xl font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-3 shadow-lg font-poppins text-[11px] h-[56px] lg:h-[60px] shrink-0">
              <Search size={16} /> View Landmarks
            </button>
          </motion.div>
        </div>
      </div>
    </section>
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

const TrustSection = () => (
  <section className="py-12 lg:py-16">
    <div className="site-container grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8 text-center">
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
  <section className="section-spacing pt-4 lg:pt-8">
    <div className="site-container flex flex-col lg:flex-row gap-12 lg:gap-24 items-stretch w-full">
      <div className="lg:w-1/2 w-full flex flex-col justify-between py-2">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-amber-500"></div>
            <span className="font-semibold tracking-widest text-[10px] uppercase font-poppins text-amber-600">The ABM Promise</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-light font-poppins leading-[1.1] tracking-tight text-stone-900 mb-8">
            A Foundation of <br className="hidden md:block"/>
            <span className="font-medium italic text-[#022c22]">Clarity.</span>
          </h2>
          <p className="text-stone-600 text-base md:text-lg font-light leading-relaxed mb-6 font-poppins w-full">
            ABM Landmarks focuses on mitigating the common complexities associated with real estate acquisition. We carefully identify and develop land parcels in strategic corridors, emphasizing rigorous documentation and regulatory compliance.
          </p>
          <p className="text-stone-600 text-base md:text-lg font-light leading-relaxed mb-10 font-poppins w-full">
            Before a project is officially presented, we ensure the necessary title searches and approvals—such as PMRDA layouts and NA orders—are actively secured or in process. Our goal is to provide buyers with a secure, well-planned asset.
          </p>
        </div>
        <button onClick={() => { navigate('about'); window.scrollTo(0,0); }} className="text-[#022c22] font-semibold text-xs uppercase tracking-widest flex items-center gap-3 hover:text-amber-600 transition-colors font-poppins group mt-4 w-fit">
          Explore Our Philosophy <ArrowRight size={16} className="transform transition-transform group-hover:translate-x-1" />
        </button>
      </div>
      <div className="lg:w-1/2 w-full relative min-h-[400px]">
        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[2rem] shadow-xl">
          <div className="absolute inset-0 bg-[#022c22]/10 mix-blend-multiply z-10 pointer-events-none"></div>
          <motion.img animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} src="https://static.wixstatic.com/media/74639d_656298cd109b43c2b383f609a2175873~mv2.jpeg" alt="ABM Landmarks Architectural Philosophy" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </section>
);

const ProcessSection = ({ navigate }) => (
  <section className="section-spacing bg-[#022c22] text-white">
    <div className="site-container">
      <SectionHeader isDarkBg={true} eyebrow="How We Work" titleFirst="A Clearer Path to" titleItalic="Land Ownership." actionText="See How We Work" onAction={() => { navigate('how-we-work'); window.scrollTo(0,0); }} />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mt-12">
        {[
          { step: '01', title: 'Project Selection', desc: 'Locations and projects are assessed based on their setting, access, planning and available information.' },
          { step: '02', title: 'Documentation Review', desc: 'Available land-use, layout and approval records are reviewed and presented for buyer reference.' },
          { step: '03', title: 'Site Development', desc: 'Internal access, boundaries and planned infrastructure are developed according to the current project stage.' },
          { step: '04', title: 'Buyer Assistance', desc: 'The team assists with project information, site visits, documentation access and purchase coordination.' }
        ].map((item, idx) => (
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={idx} variants={cardVariants} key={idx} className="flex flex-col flex-child">
            <span className="text-amber-500 text-4xl lg:text-5xl font-light font-poppins mb-4 lg:mb-6 block">{item.step}</span>
            <h4 className="text-lg lg:text-xl font-medium mb-3 font-poppins">{item.title}</h4>
            <p className="text-white/70 text-sm lg:text-base font-light leading-relaxed font-poppins">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const FeaturedProjects = ({ navigate }) => (
  <section id="featured-projects" className="section-spacing">
    <div className="site-container">
      <SectionHeader eyebrow="Current Developments" titleFirst="Explore Our" titleItalic="Current Developments." description="Explore ABM Landmarks’ current plotted developments across Devale, Godumbre and Kasarsai." actionText="View All Landmarks" onAction={() => { navigate('projects'); window.scrollTo(0,0); }} />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12">
        {PROJECTS.slice(0, 2).map((project, idx) => (
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={idx} variants={cardVariants} key={project.id} 
                      onClick={() => { navigate(`project/${project.id}`); window.scrollTo(0,0); }}
                      className="group cursor-pointer bg-white rounded-[2rem] overflow-hidden shadow-sm border border-stone-200 hover:shadow-xl transition-shadow duration-500 flex flex-col h-full flex-child">
            <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden w-full shrink-0 bg-stone-100 flex items-center justify-center">
              <div className="absolute top-6 left-6 z-20 flex gap-2 flex-wrap pr-4">
                <span className="bg-[#022c22]/90 backdrop-blur-sm text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg uppercase tracking-widest font-poppins shadow-sm">{project.status}</span>
              </div>
              {project.images && project.images.length > 0 ? (
                <img src={project.images[0].url} alt={project.title} className="w-full h-full absolute inset-0 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
              ) : (
                <div className="w-full h-full bg-[#022c22]/5 flex items-center justify-center">
                   <Landmark size={48} className="text-[#022c22]/20" />
                </div>
              )}
            </div>
            <div className="p-8 lg:p-10 w-full flex flex-col flex-grow">
              <h3 className="card-title text-stone-900 mb-2 font-poppins">{project.title}</h3>
              <p className="text-stone-500 text-sm mb-6 flex items-start gap-2 font-poppins"><MapPin size={16} className="shrink-0 mt-0.5"/> <span className="leading-snug">{project.location}</span></p>
              <div className="flex flex-col border-t border-stone-100 pt-6 mt-auto">
                <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1 font-poppins">Approvals</p>
                <p className="text-sm font-medium text-stone-900 font-poppins">{project.approvals[0]}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ProjectProgressGallery = ({ navigate }) => {
  const photos = PROJECTS.find(p => p.id === "godumbre-plotted-development")?.images || [];
  
  return (
    <section className="section-spacing bg-stone-50">
      <div className="site-container">
        <SectionHeader eyebrow="Project Progress" titleFirst="Development" titleItalic="on Ground." description="Explore current on-ground photographs from ABM Landmarks’ active developments, including internal access, boundary work, plot conditions and infrastructure progress." actionText="View Project Galleries" onAction={() => { navigate('projects'); window.scrollTo(0,0); }}/>
        
        {photos && photos.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-12 w-full">
            <div className="w-full flex-child relative overflow-hidden rounded-2xl aspect-[4/3] lg:aspect-auto h-full">
               <img src={photos[0].url} alt={photos[0].caption} className="w-full h-full object-cover" />
            </div>
            <div className="w-full flex-child grid grid-cols-2 gap-4">
               {photos.slice(1, 5).map((img, idx) => (
                  <div key={idx} className="relative overflow-hidden rounded-2xl aspect-[4/3] w-full">
                    <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                  </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const DocumentationPreview = ({ navigate }) => (
  <section className="section-spacing">
    <div className="site-container">
       <SectionHeader eyebrow="Available Information" titleFirst="Review before" titleItalic="you decide." description="Each project page presents available location information, current site photographs and supporting project documents for buyer reference." actionText="Explore Project Documents" onAction={() => { navigate('projects'); window.scrollTo(0,0); }}/>
       
       <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { title: "Project Layouts", desc: "Review available plotting layouts and planning drawings connected with the respective development." },
            { title: "Approval Documents", desc: "Access available PMRDA, NA and related project records where supplied." },
            { title: "Current Site Condition", desc: "View recent on-ground photographs showing the present stage of development." }
          ].map((item, idx) => (
             <div key={idx} className="card flex-child h-full">
                <h3 className="card-title text-stone-900 mb-4 font-poppins shrink-0">{item.title}</h3>
                <p className="text-sm font-light text-stone-600 leading-relaxed font-poppins flex-grow">{item.desc}</p>
             </div>
          ))}
       </div>
    </div>
  </section>
);

const WhyChooseABMSection = () => (
  <section className="section-spacing bg-stone-50">
    <div className="site-container">
       <SectionHeader eyebrow="Buyer Experience" titleFirst="Clarity at" titleItalic="every step." />
       
       <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Direct Project Information", desc: "Buyers can review the location, current development stage and available project information before scheduling a visit." },
            { title: "Access to Available Documents", desc: "Relevant project documents can be reviewed to better understand planning and permitted land use." },
            { title: "Guided Site Visits", desc: "Interested buyers can arrange a project visit to assess the access, surroundings and current on-ground condition." }
          ].map((item, idx) => (
             <div key={idx} className="bg-white border border-stone-200 p-8 rounded-[2rem] shadow-sm flex flex-col h-full flex-child">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-6 shrink-0"><CheckCircle2 size={24} className="text-amber-600"/></div>
                <h3 className="text-lg font-medium text-stone-900 mb-4 font-poppins shrink-0">{item.title}</h3>
                <p className="text-sm font-light text-stone-600 leading-relaxed font-poppins flex-grow">{item.desc}</p>
             </div>
          ))}
       </div>
    </div>
  </section>
);

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="section-spacing">
      <div className="site-container flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        <div className="lg:w-2/5 w-full lg:sticky top-[100px] flex-child">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-amber-500"></div>
            <span className="text-amber-600 font-semibold tracking-widest text-[10px] uppercase font-poppins">Transparency</span>
          </div>
          <h2 className="section-title text-stone-900 mb-8 font-poppins">
            Questions Before <br className="hidden md:block"/>
            <span className="font-medium italic text-[#022c22]">a Site Visit.</span>
          </h2>
        </div>
        <div className="lg:w-3/5 w-full flex flex-col gap-4 flex-child">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-stone-200 overflow-hidden transition-all duration-300 w-full shadow-sm hover:shadow-md flex-child">
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)} 
                className="w-full px-8 py-6 flex justify-between items-center text-left focus:outline-none"
                aria-expanded={openIdx === idx}
              >
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

const InsightsPreview = ({ navigate }) => (
  <section className="section-spacing bg-stone-50">
     <div className="site-container">
        <SectionHeader eyebrow="Land Insights" titleFirst="Understand the" titleItalic="details that matter." actionText="Read All Articles" onAction={() => { navigate('insights'); window.scrollTo(0,0); }}/>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
           {INSIGHTS.map((insight, idx) => (
             <div key={idx} className="bg-white border border-stone-200 rounded-[2rem] overflow-hidden shadow-sm flex flex-col flex-child h-full">
                <div className="w-full h-48 bg-stone-100 relative shrink-0">
                   <img src={insight.image} alt={insight.title} className="w-full h-full object-cover" />
                   <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#022c22] text-[10px] font-semibold px-3 py-1.5 rounded-lg uppercase tracking-widest font-poppins shadow-sm">{insight.category}</div>
                </div>
                <div className="p-8 flex flex-col flex-grow w-full">
                   <span className="text-stone-400 text-[10px] font-semibold tracking-widest uppercase mb-3 block font-poppins">{insight.date}</span>
                   <h3 className="card-title text-stone-900 mb-4 font-poppins w-full">{insight.title}</h3>
                   <p className="text-stone-600 text-sm font-light leading-relaxed mb-6 flex-grow font-poppins w-full card-copy">{insight.summary}</p>
                   <button onClick={() => { navigate('insights'); window.scrollTo(0,0); }} className="text-[#022c22] font-semibold text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2 hover:text-amber-600 transition-colors font-poppins mt-auto w-fit">Read More <ArrowRight size={16} /></button>
                </div>
             </div>
           ))}
        </div>
     </div>
  </section>
);

const PreFooter = ({ navigate }) => (
  <section className="w-full bg-[var(--bg-page)]">
    <div className="w-full bg-[#022c22] rounded-t-[2.5rem] pt-[6vw] pb-[8vw] lg:pt-[4vw] lg:pb-[6vw] relative overflow-hidden flex flex-col items-center justify-center min-h-[40vh] text-center">
      <div className="absolute inset-0 bg-[#022c22] z-0"></div>
      <video src="https://video.wixstatic.com/video/74639d_44fe3cc55aa94df384f5461b2f7cfe57/1080p/mp4/file.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen grayscale z-10" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1d1c19] to-transparent z-20 pointer-events-none"></div>
      
      <div className="site-container relative z-30 flex flex-col items-center max-w-3xl mx-auto py-12">
        <h2 className="section-title text-white mb-6 font-poppins tracking-tight">Understand the project before <br className="hidden md:block"/><span className="font-medium italic text-amber-500">making the decision.</span></h2>
        <p className="text-white/80 font-light mb-10 max-w-xl text-base font-poppins leading-relaxed">Explore the location, current development and available documents, or speak with the ABM Landmarks team to schedule a site visit.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
          <button onClick={() => { navigate('projects'); window.scrollTo(0,0); }} className="bg-amber-500 hover:bg-amber-400 text-[#022c22] px-8 py-4 rounded-xl font-bold tracking-widest uppercase transition-colors text-xs flex items-center justify-center gap-3 font-poppins shadow-md w-full sm:w-auto"><FileText size={16} /> View Current Projects</button>
          <button onClick={() => { navigate('contact'); window.scrollTo(0,0); }} className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold tracking-widest uppercase transition-colors text-xs flex items-center justify-center gap-3 font-poppins w-full sm:w-auto"><Phone size={16} /> Schedule a Site Visit</button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = ({ navigate }) => (
  <footer className="w-full bg-[#1d1c19] pt-12 pb-12 text-white relative z-20">
    <div className="site-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
      <div className="col-span-1 lg:col-span-1 flex-child">
        <img src={ASSETS.logo} alt="ABM Landmarks" className="h-10 mb-6 brightness-0 invert" />
        <p className="text-white/60 text-sm font-light leading-relaxed font-poppins w-full max-w-xs">{SITE_DATA.brand} secures land assets through focused documentation and structured development.</p>
      </div>
      <div className="flex-child">
        <h4 className="text-white/90 font-semibold mb-6 uppercase tracking-widest text-[10px] font-poppins">Navigation</h4>
        <ul className="space-y-4">
          {['Home', 'Philosophy', 'How We Work', 'Landmarks', 'Insights', 'Contact'].map(link => {
            const routeMap = { 'Philosophy': 'about', 'How We Work': 'how-we-work', 'Landmarks': 'projects' };
            const route = routeMap[link] || link.toLowerCase();
            return (
              <li key={link}><button onClick={() => { navigate(route); window.scrollTo(0,0); }} className="text-white/60 hover:text-amber-500 transition-colors text-sm font-poppins">{link}</button></li>
            );
          })}
        </ul>
      </div>
      <div className="flex-child">
        <h4 className="text-white/90 font-semibold mb-6 uppercase tracking-widest text-[10px] font-poppins">Contact</h4>
        <ul className="space-y-4 text-sm text-white/60 font-poppins">
          <li className="leading-relaxed pr-4">{SITE_DATA.address}</li>
          <li><a href={`tel:${SITE_DATA.phone}`} className="hover:text-amber-500 transition-colors inline-block">{SITE_DATA.phone}</a></li>
          {SITE_DATA.altPhone && <li><a href={`tel:${SITE_DATA.altPhone}`} className="hover:text-amber-500 transition-colors inline-block">{SITE_DATA.altPhone}</a></li>}
          <li><a href={`mailto:${SITE_DATA.email}`} className="hover:text-amber-500 transition-colors inline-block">{SITE_DATA.email}</a></li>
        </ul>
      </div>
      <div className="flex-child">
        <h4 className="text-white/90 font-semibold mb-6 uppercase tracking-widest text-[10px] font-poppins">Legal</h4>
        <ul className="space-y-4">
          {['Privacy Policy', 'Terms of Service', 'Disclaimer'].map(link => (
            <li key={link}><button onClick={() => { navigate(link.split(' ')[0].toLowerCase()); window.scrollTo(0,0); }} className="text-white/60 hover:text-amber-500 transition-colors text-sm font-poppins">{link}</button></li>
          ))}
        </ul>
      </div>
    </div>
    <div className="site-container pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-white/40 text-xs font-poppins text-center md:text-left">© {new Date().getFullYear()} {SITE_DATA.legalEntity}. All rights reserved.</p>
    </div>
  </footer>
);

const PageHero = ({ eyebrow, titleFirst, titleItalic, description, image, video }) => (
  <section className="sticky top-0 z-0 w-full px-[max(2vw,16px)] pb-[max(2vw,16px)] flex flex-col" style={{ minHeight: '70svh', height: 'auto', paddingTop: 'calc(var(--header-height) + 12px)' }}>
    <div className="relative w-full flex-grow rounded-[2.5rem] bg-[#022c22] overflow-hidden flex flex-col justify-end pb-12 lg:pb-16 px-[4vw] lg:px-[5vw] shadow-2xl">
      {video ? (
        <video src={video} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen" />
      ) : (
        <motion.img 
          initial={{ scale: 1 }} animate={{ scale: 1.1 }} transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          src={image} alt={titleFirst} className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen" 
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-r from-[#022c22]/90 via-[#022c22]/30 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#022c22]/95 via-[#022c22]/10 to-transparent opacity-90 pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-4xl flex-child pt-12">
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}>
           <div className="flex items-center gap-4 mb-4 lg:mb-6">
             <div className="h-[2px] w-8 md:w-12 bg-amber-500"></div>
             <span className="text-amber-500 uppercase tracking-widest text-[10px] md:text-xs font-semibold font-poppins">{eyebrow}</span>
           </div>
           <h1 className="page-title text-white mb-6 font-poppins">
             {titleFirst} <br className="hidden md:block"/><span className="italic font-medium text-white/90">{titleItalic}</span>
           </h1>
           {description && <p className="text-base md:text-lg text-white/80 font-light leading-relaxed font-poppins">{description}</p>}
         </motion.div>
      </div>
    </div>
  </section>
);

const AboutView = ({ navigate }) => {
  const [activeValue, setActiveValue] = useState(0);
  const corporateValues = [
    { title: "Thorough Vetting", icon: Scale, subtitle: "DOCUMENTATION SHIELD", desc: "Our vetting protocol involves detailed checklists and tracing property records, verifying mutation entries, and working towards clean historical documentation." },
    { title: "Ecological Custodianship", icon: Leaf, subtitle: "CO-EXISTING WITH LANDSCAPE", desc: "We integrate with existing nature. Our structural alignments aim to preserve old trees, optimize topographical patterns, and mandate sensitive planning." },
    { title: "Clear Communication", icon: Eye, subtitle: "INVESTOR VISIBILITY", desc: "An investor is entitled to clear information. We provide access to available legal dossiers, zoning records, and approval timelines, demystifying the registration process." },
    { title: "Strategic Planning", icon: Shield, subtitle: "ENGINEERING VALUE", desc: "A carefully planned project aims for long-term relevance. We select micro-markets strictly in active infrastructure pathways to position the parcel as a stable asset." }
  ];

  return (
    <div className="w-full flex flex-col bg-[var(--bg-page)]">
      <PageHero 
        eyebrow="Our Philosophy"
        titleFirst="Architects of"
        titleItalic="Trust."
        description="We secure land assets through meticulous documentation clarity and well-planned, practical infrastructure."
        image="https://static.wixstatic.com/media/74639d_656298cd109b43c2b383f609a2175873~mv2.jpeg"
      />
      
      <div className="relative z-10 w-full bg-[var(--bg-page)]">
        <section className="section-spacing">
          <div className="site-container flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
             <div className="lg:w-1/2 w-full flex-child">
               <div className="flex items-center gap-4 mb-6">
                 <div className="h-[2px] w-12 bg-amber-500"></div>
                 <span className="text-amber-600 font-semibold tracking-widest text-[10px] uppercase font-poppins">The Origin</span>
               </div>
               <h2 className="section-title text-stone-900 font-poppins mb-8">
                 It begins with a <br/>
                 <span className="font-medium italic text-[#022c22]">Piece of Earth.</span>
               </h2>
               <div className="space-y-6 text-stone-600 font-light leading-relaxed text-base font-poppins w-full">
                  <p>ABM Landmarks emerged from a singular vision: to bring greater clarity and organization to land transactions. We recognize that purchasing a plot requires significant careful consideration and solid documentation.</p>
                  <p>Operating as acquisition and development specialists, we spend considerable time identifying specific corridors—currently focusing on areas like Devale, Godumbre and Kasarsai. Our priority is proper vetting before any project is brought to the public.</p>
               </div>
             </div>
             <div className="lg:w-1/2 w-full flex-child">
               <div className="aspect-[4/3] lg:aspect-square w-full overflow-hidden rounded-[2.5rem] shadow-lg relative">
                  <video src="https://video.wixstatic.com/video/74639d_44fe3cc55aa94df384f5461b2f7cfe57/1080p/mp4/file.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#022c22]/10 mix-blend-multiply pointer-events-none"></div>
               </div>
             </div>
          </div>
        </section>

        <section className="section-spacing pt-0">
           <div className="site-container">
             <div className="w-full bg-[#022c22] rounded-[2.5rem] p-12 lg:p-24 flex flex-col lg:flex-row gap-16 items-center shadow-2xl relative overflow-hidden flex-child">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><ShieldCheck size={400} /></div>
                
                <div className="w-full relative z-10 max-w-4xl flex-child">
                  <h2 className="section-title text-white mb-8 font-poppins tracking-tight">
                    Documentation <span className="font-medium italic text-amber-500">Review.</span>
                  </h2>
                  <p className="text-white/80 font-light text-base lg:text-lg leading-relaxed font-poppins mb-10 pr-0 lg:pr-8">
                    Understanding the available records. Our team prioritizes thorough search reports. We work to clear necessary encumbrances, secure Non-Agricultural (NA) orders, and coordinate with PMRDA for tentative or final layouts as required. Proper due diligence is the foundation of our developments.
                  </p>
                  <div className="border-l-2 border-amber-500 pl-6 py-2">
                    <p className="text-white font-medium italic text-lg lg:text-xl w-full">"The land must be properly documented on paper before it becomes a viable asset in person. That is the ABM standard."</p>
                  </div>
                </div>
             </div>
           </div>
        </section>

        <section className="section-spacing pt-0">
          <div className="site-container">
            <SectionHeader eyebrow="Corporate Values" titleFirst="Ethical" titleItalic="Framework." description="We operate within strict parameters, aiming to present land acquisitions as secure, well-documented opportunities. Tap on any value to understand our execution methods." />
            
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-child">
              {corporateValues.map((val, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => setActiveValue(idx)}
                  className={`relative rounded-[2rem] p-8 lg:p-10 transition-all duration-500 cursor-pointer border h-full flex flex-col justify-start flex-child
                    ${activeValue === idx 
                      ? 'bg-[#022c22] text-white border-[#022c22] shadow-2xl scale-105 z-10' 
                      : 'bg-white text-stone-900 border-stone-200 hover:border-amber-500'}`}
                >
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500 shrink-0 ${activeValue === idx ? 'bg-amber-500 text-[#022c22]' : 'bg-stone-50 text-[#022c22] border border-stone-100'}`}>
                     <val.icon size={24} />
                   </div>
                   <span className={`text-[9px] font-bold tracking-widest uppercase mb-4 block font-poppins shrink-0 ${activeValue === idx ? 'text-amber-500' : 'text-amber-600'}`}>
                     {val.subtitle}
                   </span>
                   <h3 className="card-title font-poppins mb-6 shrink-0">{val.title}</h3>
                   <p className={`font-light text-sm leading-relaxed font-poppins w-full flex-grow card-copy ${activeValue === idx ? 'text-white/80' : 'text-stone-500'}`}>
                     {val.desc}
                   </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing pt-0">
          <div className="site-container">
            <SectionHeader isDarkBg={false} eyebrow="Organizational Structure" titleFirst="Specialized Teams." titleItalic="Clear Processes." description="ABM Landmarks relies on an alignment of regulatory, logistical, and planning teams to execute projects. Meet the foundational teams." />
            
            <div className="w-full bg-[#1c1917] rounded-[3rem] p-8 md:p-16 lg:p-20 shadow-2xl border border-stone-800 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative overflow-hidden flex-child">
               {[
                 { icon: Users, role: "FORENSIC LEGAL COORDINATION", title: "Title Verification", desc: "Coordinating with real estate counsel and search experts to execute ancestral verification and compile clear records." },
                 { icon: Trees, role: "ECOLOGICAL PLANNING", title: "Topographical Analysis", desc: "Planning teams that balance necessary infrastructure with resource-sensitive land engineering and layout optimization." },
                 { icon: Shield, role: "LIAISON & STATUTORY OFFICERS", title: "Compliance Facilitation", desc: "Administrative teams dedicated to managing necessary authorizations, PMRDA clearances, and regulatory alignment." },
                 { icon: HeartHandshake, role: "LAND CONCIERGE", title: "Client Advisory", desc: "Portfolio advisors providing clear, factual communication from initial inquiry to final documentation execution." }
               ].map((team, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10 hover:bg-white/10 transition-colors duration-300 h-full flex flex-col justify-start flex-child">
                    <div className="w-12 h-12 rounded-xl bg-[#292524] flex items-center justify-center mb-8 border border-stone-700 shrink-0"><team.icon size={20} className="text-amber-500"/></div>
                    <span className="text-amber-500 text-[9px] font-bold uppercase tracking-widest mb-3 block font-poppins shrink-0">{team.role}</span>
                    <h4 className="card-title text-white mb-6 font-poppins shrink-0">{team.title}</h4>
                    <p className="text-stone-400 font-light text-sm leading-relaxed font-poppins w-full flex-grow card-copy">{team.desc}</p>
                  </div>
               ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const HowWeWorkView = ({ navigate }) => {
  return (
    <div className="w-full flex flex-col bg-[var(--bg-page)]">
      <PageHero 
        eyebrow="How We Work"
        titleFirst="A Clearer Path to"
        titleItalic="Land Ownership."
        description="From understanding the location to reviewing available project documents and arranging a site visit, ABM Landmarks helps buyers navigate each stage with greater clarity."
        image="https://static.wixstatic.com/media/548938_2671004f0374473194bd98c46be462b8~mv2.jpeg"
      />
      
      <div className="relative z-10 w-full bg-[var(--bg-page)]">
        
        <section className="section-spacing border-b border-stone-200/50">
          <div className="site-container grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <h2 className="section-title text-stone-900 font-poppins flex-child">
              Every project begins with <span className="italic font-medium text-[#022c22]">clarity.</span>
            </h2>
            <p className="text-stone-600 font-light leading-relaxed text-base font-poppins flex-child reading-width">
              Land purchases involve location, planning, documentation and on-ground development. Our approach is to present the available project information clearly and help buyers understand the next practical step.
            </p>
          </div>
        </section>

        <section className="section-spacing">
          <div className="site-container">
            <div className="flex items-center gap-4 mb-12 lg:mb-16">
              <div className="h-[2px] w-12 bg-amber-500"></div>
              <span className="text-amber-600 font-semibold tracking-widest text-[10px] uppercase font-poppins">Process Stages</span>
            </div>
            
            <div className="flex flex-col gap-12 lg:gap-16">
              {[
                { num: "01", title: "Project & Location Selection", desc: "We identify locations based on the project’s setting, access, proposed development and available planning information.", icon: MapPin },
                { num: "02", title: "Document Review", desc: "Buyers can review the available layout, land-use, planning and approval documents connected with the respective project.", icon: FileSearch },
                { num: "03", title: "Planning & Site Development", desc: "Project layouts, internal access, boundary work and other development activities are presented according to the current stage.", icon: Ruler },
                { num: "04", title: "Project Visit", desc: "Interested buyers can request a guided site visit to understand the location, access, plot setting and current on-ground condition.", icon: NavIcon },
                { num: "05", title: "Purchase Assistance", desc: "The ABM Landmarks team assists with project enquiries, available documentation and coordination during the purchase process.", icon: Users }
              ].map((step, idx) => (
                <div key={idx} className={`w-full flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center bg-white border border-stone-200/60 rounded-[2rem] p-8 lg:p-12 shadow-sm`}>
                   <div className="lg:w-1/3 flex flex-col justify-center items-center text-center lg:items-start lg:text-left flex-child">
                     <span className="text-amber-500 text-5xl md:text-6xl font-light font-poppins mb-4 block">{step.num}</span>
                     <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center border border-stone-100 mb-6 shrink-0"><step.icon size={20} className="text-[#022c22]"/></div>
                   </div>
                   <div className="lg:w-2/3 flex flex-col flex-child text-center lg:text-left">
                     <h3 className="text-xl md:text-2xl font-medium text-stone-900 mb-4 font-poppins">{step.title}</h3>
                     <p className="text-stone-600 font-light text-base leading-relaxed font-poppins max-w-xl">{step.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing pt-0">
          <div className="site-container">
            <SectionHeader eyebrow="Information Access" titleFirst="What buyers can" titleItalic="explore." description="We provide clear information categories to assist your evaluation." />
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 { title: "Project Location", desc: "Review map locations and surrounding infrastructure context." },
                 { title: "Current Site Progress", desc: "View actual photographs of internal roads and boundary development." },
                 { title: "Available Documents", desc: "Access tentative layout plans, NA orders and PMRDA documents." },
                 { title: "Site Visit Assistance", desc: "Schedule a physical visit accompanied by an ABM representative." }
               ].map((item, i) => (
                  <div key={i} className="card flex-child">
                     <h3 className="card-title text-stone-900 mb-3 font-poppins shrink-0">{item.title}</h3>
                     <p className="text-stone-600 font-light text-sm leading-relaxed font-poppins card-copy">{item.desc}</p>
                  </div>
               ))}
            </div>
          </div>
        </section>

        <FeaturedProjects navigate={navigate} />
      </div>
    </div>
  );
};

const ProjectsView = ({ navigate }) => {
  const [filter, setFilter] = useState('All Projects');

  const filteredProjects = PROJECTS.filter(p => {
    if (filter === 'All Projects') return true;
    if (filter === 'Devale') return p.location.toLowerCase().includes('devale');
    if (filter === 'Godumbre') return p.location.toLowerCase().includes('godumbre');
    if (filter === 'Kasarsai') return p.location.toLowerCase().includes('kasarsai');
    return true;
  });

  return (
    <div className="w-full flex flex-col bg-[var(--bg-page)]">
      <PageHero 
        eyebrow="Project Directory"
        titleFirst="Current"
        titleItalic="Developments."
        description="Explore ABM Landmarks’ active plotted developments across Devale, Godumbre and Kasarsai."
        video="https://video.wixstatic.com/video/74639d_07b5b3b911f34cb88667e4d05c71e87a/1080p/mp4/file.mp4"
      />
      
      <div className="relative z-10 w-full bg-[var(--bg-page)]">
        <section className="section-spacing">
          <div className="site-container flex flex-col gap-12 lg:gap-16">
            
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
              {['All Projects', 'Devale', 'Godumbre', 'Kasarsai'].map(f => (
                <button key={f} onClick={() => setFilter(f)} 
                  className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors font-poppins shrink-0
                  ${filter === f ? 'bg-[#022c22] text-white shadow-lg' : 'bg-white border border-stone-200 text-stone-600 hover:border-amber-500'}`}>
                  {f}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-12">
              {filteredProjects.map((project, idx) => (
                 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={idx} variants={cardVariants} key={project.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-stone-200 hover:shadow-xl transition-shadow duration-500 flex flex-col lg:flex-row w-full flex-child">
                  <div className="lg:w-1/2 relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] overflow-hidden w-full bg-stone-100 flex items-center justify-center cursor-pointer" onClick={() => { navigate(`project/${project.id}`); window.scrollTo(0,0); }}>
                     <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2 pr-6">
                        <span className="bg-[#022c22]/90 backdrop-blur-sm text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg uppercase tracking-widest font-poppins shadow-sm">{project.status}</span>
                        <span className="bg-white/90 backdrop-blur-sm text-[#022c22] text-[10px] font-semibold px-3 py-1.5 rounded-lg uppercase tracking-widest font-poppins shadow-sm">{project.type}</span>
                      </div>
                    {project.images && project.images.length > 0 ? (
                      <img src={project.images[0].url} alt={project.title} className="w-full h-full absolute inset-0 object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                    ) : (
                      <Landmark size={64} className="text-[#022c22]/20" />
                    )}
                  </div>
                  <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center w-full flex-child">
                    <div className="flex items-start gap-2 text-amber-600 font-semibold text-[10px] md:text-xs mb-4 uppercase tracking-widest font-poppins"><MapPin size={16} className="shrink-0 mt-0.5" /> <span className="leading-snug">{project.location}</span></div>
                    <h2 className="section-title text-stone-900 mb-6 font-poppins">{project.title}</h2>
                    <p className="text-stone-600 mb-10 font-light text-sm md:text-base leading-relaxed font-poppins w-full card-copy">{project.description}</p>
                    
                    <div className="flex flex-col border-y border-stone-100 py-6 mb-10 w-full gap-4">
                       {(project.area || project.plotSizes) && (
                         <div className="w-full">
                           <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-2 font-semibold font-poppins">Scale</p>
                           <p className="font-medium text-sm md:text-base text-stone-900 font-poppins flex items-center gap-2"><Ruler size={16} className="text-[#022c22]"/>{project.area || project.plotSizes}</p>
                         </div>
                       )}
                       <div className="w-full">
                         <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-2 font-semibold font-poppins">Status</p>
                         <p className="font-medium text-sm md:text-base text-stone-900 font-poppins flex items-center gap-2"><ShieldCheck size={16} className="text-[#022c22] shrink-0"/>{project.approvals[0]}</p>
                       </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                      <button onClick={() => { navigate(`project/${project.id}`); window.scrollTo(0,0); }} className="w-full bg-[#022c22] hover:bg-amber-500 text-white hover:text-[#022c22] py-4 rounded-xl font-bold tracking-widest uppercase transition-colors text-[10px] md:text-xs flex justify-center items-center gap-3 font-poppins shadow-md">View Details <ArrowRight size={16}/></button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredProjects.length === 0 && (
                <div className="w-full py-24 text-center flex-child">
                  <p className="text-stone-500 font-poppins text-lg">No current projects matching this selection.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ProjectDetailView = ({ projectId, navigate }) => {
  const project = PROJECTS.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[var(--bg-page)]">
        <div className="text-center">
          <h2 className="text-2xl font-poppins mb-4">Project Not Found</h2>
          <button onClick={() => navigate('projects')} className="text-amber-600 font-poppins hover:underline">Return to Directory</button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col bg-[var(--bg-page)]">
       <section className="relative w-full px-[max(2vw,16px)] pb-[max(2vw,16px)] flex flex-col" style={{ paddingTop: 'calc(var(--header-height) + 12px)' }}>
        <div className="relative w-full h-[50svh] lg:h-[60svh] rounded-[2.5rem] bg-[#022c22] overflow-hidden flex flex-col justify-end pb-12 lg:pb-16 px-[4vw] lg:px-[5vw] shadow-2xl">
          {project.images && project.images.length > 0 ? (
            <img src={project.images[0].url} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen" />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-[#022c22] flex items-center justify-center"><Landmark size={64} className="text-white/10"/></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#022c22]/95 via-[#022c22]/20 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 w-full max-w-4xl flex-child">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-amber-500 text-[#022c22] px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest font-poppins">{project.status}</span>
                <span className="bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest font-poppins border border-white/20">{project.type}</span>
              </div>
              <h1 className="page-title text-white mb-4 font-poppins">{project.title}</h1>
              <p className="text-white/80 font-light flex items-start gap-2 font-poppins text-sm md:text-base"><MapPin size={18} className="shrink-0 mt-0.5"/> <span className="leading-relaxed">{project.location}</span></p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-spacing pt-8 lg:pt-12">
        <div className="site-container flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="w-full lg:w-2/3 flex-child">
            <h3 className="card-title text-stone-900 mb-6 font-poppins">About the Development</h3>
            <p className="text-stone-600 font-light leading-relaxed text-sm md:text-base font-poppins mb-12 reading-width">{project.description}</p>
            
            {project.images && project.images.length > 1 && (
              <div className="mb-12">
                <h3 className="card-title text-stone-900 mb-6 font-poppins">Site Photographs</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.images.slice(1).map((img, i) => (
                    <div key={i} className="flex flex-col gap-3 flex-child">
                      <div className="w-full aspect-[4/3] bg-stone-100 rounded-2xl overflow-hidden border border-stone-200">
                         <img src={img.url} alt={img.caption} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                      <span className="text-[10px] text-stone-500 uppercase tracking-widest font-poppins leading-relaxed">{img.caption}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.documents && project.documents.length > 0 && (
              <div className="mb-12">
                <h3 className="card-title text-stone-900 mb-6 font-poppins flex items-center gap-3"><FileText size={24} className="text-amber-600"/> Project Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {project.documents.map((doc, i) => (
                    <div key={i} className="card p-6 flex flex-col h-full flex-child">
                       <h4 className="font-medium text-stone-900 font-poppins mb-3 text-sm md:text-base shrink-0">{doc.title}</h4>
                       <p className="text-xs text-stone-500 font-poppins leading-relaxed mb-6 flex-grow">{doc.desc}</p>
                       <a href={doc.file} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-amber-600 uppercase tracking-widest flex items-center gap-2 hover:text-[#022c22] transition-colors mt-auto w-fit">
                         View Document <ExternalLink size={14}/>
                       </a>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 md:p-6 bg-[#fbf8ef] border border-stone-200/50 rounded-2xl text-[10px] md:text-xs text-stone-500 font-poppins leading-relaxed">
                  <strong>Disclaimer:</strong> Documents are provided for general reference. Prospective purchasers should independently review all title, approval, planning and legal documentation before making a purchase decision.
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/3 flex-child">
            <div className="bg-white border border-stone-200 rounded-[2rem] p-6 md:p-8 shadow-sm sticky top-[calc(var(--header-height)+24px)] flex flex-col gap-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-900 font-poppins border-b border-stone-100 pb-4">Fact File</h4>
              <ul className="space-y-6 flex-grow">
                {project.price && (
                  <li>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-poppins mb-1 flex items-center gap-1"><IndianRupee size={12}/> Pricing</span>
                    <span className="block text-sm font-medium text-stone-900 font-poppins">{project.price}</span>
                  </li>
                )}
                {project.surveyNumber && (
                  <li>
                    <span className="block text-[10px] uppercase tracking-widest text-stone-400 font-poppins mb-1">Survey / Gat No.</span>
                    <span className="block text-sm font-medium text-stone-900 font-poppins">{project.surveyNumber}</span>
                  </li>
                )}
                {project.area && (
                  <li>
                    <span className="block text-[10px] uppercase tracking-widest text-stone-400 font-poppins mb-1">Total Area</span>
                    <span className="block text-sm font-medium text-stone-900 font-poppins">{project.area}</span>
                  </li>
                )}
                {project.plotSizes && (
                  <li>
                    <span className="block text-[10px] uppercase tracking-widest text-stone-400 font-poppins mb-1">Plot Sizes</span>
                    <span className="block text-sm font-medium text-stone-900 font-poppins whitespace-pre-line leading-relaxed">{project.plotSizes}</span>
                  </li>
                )}
                <li>
                  <span className="block text-[10px] uppercase tracking-widest text-stone-400 font-poppins mb-2">Approvals & Status</span>
                  <ul className="space-y-2">
                    {project.approvals.map((app, i) => (
                       <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-stone-700 font-poppins">
                         <CheckCircle2 size={16} className="text-[#022c22] shrink-0 mt-0.5"/> <span className="leading-snug">{app}</span>
                       </li>
                    ))}
                  </ul>
                </li>
              </ul>

              <div className="flex flex-col gap-3 mt-6 border-t border-stone-100 pt-6">
                {project.mapUrl && (
                   <a href={project.mapUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-stone-50 hover:bg-stone-100 text-stone-900 border border-stone-200 py-4 rounded-xl font-bold tracking-widest uppercase transition-colors text-[10px] flex justify-center items-center gap-2 font-poppins">
                     <MapPin size={14}/> View on Google Maps
                   </a>
                )}
                <button onClick={() => navigate('contact')} className="w-full bg-[#022c22] hover:bg-amber-500 text-white hover:text-[#022c22] py-4 rounded-xl font-bold tracking-widest uppercase transition-colors text-[10px] flex justify-center items-center gap-2 font-poppins shadow-md">
                  Inquire About Project <ArrowRight size={14}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactView = () => (
  <div className="w-full flex flex-col bg-[var(--bg-page)]">
     <PageHero 
      eyebrow="Advisory"
      titleFirst="Command Your"
      titleItalic="Future."
      description="Connect directly with our team to request project documents, view layouts, or schedule a site visit."
      video="https://video.wixstatic.com/video/74639d_739f44c51be74491bc529ed7f97d44b4/720p/mp4/file.mp4"
    />
    
    <div className="relative z-10 w-full bg-[var(--bg-page)]">
      <section className="section-spacing">
        <div className="site-container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 w-full">
          
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 lg:p-14 shadow-sm border border-stone-200 h-fit w-full flex-child">
            <h3 className="section-title text-stone-900 mb-10 font-poppins">Request a <span className="font-medium italic">Consultation.</span></h3>
            <form className="flex flex-col gap-6 w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full flex-child">
                <input type="text" required className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 lg:py-5 px-6 text-sm md:text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-stone-400 font-poppins" placeholder="First Name" />
                <input type="text" required className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 lg:py-5 px-6 text-sm md:text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-stone-400 font-poppins" placeholder="Last Name" />
              </div>
              <input type="email" required className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 lg:py-5 px-6 text-sm md:text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-stone-400 font-poppins" placeholder="Email Address" />
              <input type="tel" required className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 lg:py-5 px-6 text-sm md:text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-stone-400 font-poppins" placeholder="Phone Number" />
              <select defaultValue="" required className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 lg:py-5 px-6 text-sm md:text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-stone-600 appearance-none cursor-pointer font-poppins">
                <option value="" disabled>Subject of Inquiry...</option>
                {PROJECTS.map(p => <option key={p.id} value={p.id}>Project: {p.title}</option>)}
                <option value="general">General Advisory</option>
              </select>
              <textarea required rows="4" className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 lg:py-5 px-6 text-sm md:text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-stone-400 font-poppins resize-none" placeholder="Share your inquiry with us..."></textarea>
              <button type="submit" className="w-full bg-[#022c22] hover:bg-amber-500 hover:text-[#022c22] text-white py-4 lg:py-5 text-xs font-bold tracking-widest uppercase rounded-xl transition-colors shadow-md flex justify-center items-center gap-3 mt-2 font-poppins">Submit Inquiry <ArrowRight size={18} /></button>
            </form>
          </div>

          <div className="flex flex-col gap-6 md:gap-8 h-full w-full flex-child">
            <div className="w-full bg-[#022c22] text-white rounded-[2.5rem] p-8 md:p-12 lg:p-14 flex flex-col justify-center shadow-xl relative overflow-hidden flex-grow flex-child">
              <div className="absolute top-0 right-0 p-8 lg:p-12 opacity-5 pointer-events-none"><Landmark size={200} className="text-white"/></div>
              <h4 className="text-amber-500 font-bold mb-8 lg:mb-12 uppercase tracking-widest text-[10px] md:text-xs font-poppins relative z-10 flex items-center gap-3"><div className="w-6 h-[2px] bg-amber-500"></div> Office Location</h4>
              <div className="space-y-10 relative z-10 w-full flex-child">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 w-full flex-child">
                  <div className="p-4 bg-white/5 rounded-2xl shrink-0 border border-white/10 hidden sm:block"><NavIcon size={20} className="text-amber-500"/></div>
                  <div className="w-full flex-child">
                    <p className="text-[10px] font-bold mb-2 uppercase tracking-wider font-poppins text-white/50">Address</p>
                    <p className="text-sm md:text-base font-light leading-relaxed font-poppins text-white/90 w-full">{SITE_DATA.address}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 w-full flex-child">
                  <div className="p-4 bg-white/5 rounded-2xl shrink-0 border border-white/10 hidden sm:block"><Phone size={20} className="text-amber-500"/></div>
                  <div className="w-full flex-child">
                    <p className="text-[10px] font-bold mb-2 uppercase tracking-wider font-poppins text-white/50">Contact Numbers</p>
                    <a href={`tel:${SITE_DATA.phone}`} className="block text-base md:text-lg font-light hover:text-amber-500 transition-colors font-poppins text-white/90 w-fit mb-1">{SITE_DATA.phone}</a>
                    <a href={`tel:${SITE_DATA.altPhone}`} className="block text-base md:text-lg font-light hover:text-amber-500 transition-colors font-poppins text-white/90 w-fit">{SITE_DATA.altPhone}</a>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 w-full flex-child">
                  <div className="p-4 bg-white/5 rounded-2xl shrink-0 border border-white/10 hidden sm:block"><Mail size={20} className="text-amber-500"/></div>
                  <div className="w-full flex-child">
                    <p className="text-[10px] font-bold mb-2 uppercase tracking-wider font-poppins text-white/50">Email Address</p>
                    <a href={`mailto:${SITE_DATA.email}`} className="block text-sm md:text-base font-light hover:text-amber-500 transition-colors font-poppins text-white/90 w-fit mb-1">{SITE_DATA.email}</a>
                    <a href={`mailto:${SITE_DATA.salesEmail}`} className="block text-sm md:text-base font-light hover:text-amber-500 transition-colors font-poppins text-white/90 w-fit">{SITE_DATA.salesEmail}</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full bg-white border border-stone-200 rounded-[2rem] p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow shrink-0 flex-child">
               <div className="text-center sm:text-left w-full flex-child">
                 <h4 className="text-stone-900 font-medium font-poppins mb-2 text-lg md:text-xl">Direct Assistance</h4>
                 <p className="text-stone-500 text-xs md:text-sm font-light font-poppins">Our team is available to assist with inquiries.</p>
               </div>
               <a href={`https://wa.me/${SITE_DATA.whatsapp}`} className="bg-[#25D366] hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-[10px] md:text-xs tracking-widest uppercase flex items-center justify-center gap-3 transition-colors font-poppins shadow-md w-full sm:w-auto shrink-0">
                 <MessageCircle size={18} /> WhatsApp
               </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
);

const LegalView = ({ title }) => (
  <div className="pt-32 pb-32 w-full bg-[var(--bg-page)]">
    <SEOHead title={title} description={`${title} for ABM Landmarks.`} />
    <div className="site-container">
      <div className="bg-white p-8 md:p-12 lg:p-20 rounded-[2.5rem] shadow-sm border border-stone-200">
        <h1 className="page-title text-stone-900 mb-8 font-poppins">{title}</h1>
        <div className="font-light text-stone-600 leading-relaxed font-poppins text-sm md:text-base w-full reading-width space-y-6 flex-child">
          <p>This is a placeholder for the official {title.toLowerCase()} of {SITE_DATA.legalEntity}. In a production environment, this content will be populated directly from the headless CMS to ensure legal compliance and easy updates.</p>
          <h3 className="text-lg font-medium text-stone-900 mt-8 mb-4">1. General Information</h3>
          <p>The information provided on this website is for representational and informational purposes only. Layouts, specifications, and amenities are subject to approvals from respective authorities.</p>
          <h3 className="text-lg font-medium text-stone-900 mt-8 mb-4">2. Independent Verification</h3>
          <p>Buyers are advised to independently verify all legal and financial details prior to making investment decisions.</p>
        </div>
      </div>
    </div>
  </div>
);

const LandingView = () => {
  return (
    <div className="w-full flex flex-col min-h-screen bg-[var(--bg-page)]">
      <SEOHead title="Project Dossier Access" description="Register to request verified project dossiers and layouts from ABM Landmarks." />
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        
        <div className="w-full lg:w-1/2 p-[max(3vw,20px)] flex flex-col justify-center flex-child">
          <div className="max-w-xl mx-auto w-full pt-24 lg:pt-0 flex-child">
            <h1 className="display-title text-[#022c22] mb-6 font-poppins">
              Request Project <br/> <span className="font-medium italic text-amber-500">Documentation.</span>
            </h1>
            <p className="text-stone-600 font-light text-base md:text-lg leading-relaxed mb-10 font-poppins reading-width">
              Submit your details to receive available layouts, NA orders, and project documents for review.
            </p>
            
            <form className="flex flex-col gap-5 w-full flex-child" onSubmit={(e) => e.preventDefault()}>
              <input type="text" required className="w-full bg-white border border-stone-200 rounded-xl py-4 lg:py-5 px-6 text-sm md:text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-poppins shadow-sm" placeholder="Full Name" />
              <input type="email" required className="w-full bg-white border border-stone-200 rounded-xl py-4 lg:py-5 px-6 text-sm md:text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-poppins shadow-sm" placeholder="Email Address" />
              <input type="tel" required className="w-full bg-white border border-stone-200 rounded-xl py-4 lg:py-5 px-6 text-sm md:text-base focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-poppins shadow-sm" placeholder="Mobile Number" />
              <button type="submit" className="w-full bg-[#022c22] hover:bg-amber-500 hover:text-[#022c22] text-white py-4 lg:py-5 text-xs font-bold tracking-widest uppercase rounded-xl transition-colors shadow-md flex justify-center items-center gap-3 mt-2 font-poppins">
                Request Information <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 p-[max(2vw,16px)] h-[50vh] lg:h-screen shrink-0 flex-child">
          <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative shadow-2xl">
            <video src="https://video.wixstatic.com/video/74639d_739f44c51be74491bc529ed7f97d44b4/720p/mp4/file.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#022c22]/40 mix-blend-multiply pointer-events-none"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [menuOrSearchOpen, setMenuOrSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'L') {
        setCurrentRoute('landing');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const checkOverlay = () => {
      const isBodyLocked = document.body.classList.contains('no-scroll');
      setMenuOrSearchOpen(isBodyLocked);
    };
    const observer = new MutationObserver(checkOverlay);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

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
      "streetAddress": "209, NV Business Centre, Somatane Phata, Old Mumbai–Pune Highway",
      "addressLocality": "Talegaon",
      "addressRegion": "Maharashtra",
      "postalCode": "410506",
      "addressCountry": "IN"
    }
  };

  const getPageMeta = (route) => {
    if (route.startsWith('project/')) {
       const projectId = route.split('/')[1];
       if (projectId === 'vintage-park-devale') {
          return { title: "Vintage Park NA Bungalow Plots, Devale", desc: "Vintage Park is an ongoing plotted development at Devale near Lonavala, offering PMRDA-sanctioned NA bungalow plots." };
       }
       if (projectId === 'godumbre-plotted-development') {
          return { title: "Godumbre Residential Plots, Maval", desc: "Explore ABM Landmarks’ residential plotted development at Godumbre, Maval, behind Lodha Belmondo. View the location, development progress, layout and available project documents." };
       }
       if (projectId === 'kasarsai-pawana-road') {
          return { title: "Kasarsai – Pawana Road Plots", desc: "An exclusive pre-launch opportunity featuring clear title NA plots in one of Pune's fastest-growing investment destinations on Kasarsai – Pawana Road." };
       }
    }

    switch(route) {
      case 'home': return { title: "Carefully Curated Land Assets", desc: "ABM Landmarks focuses on thoroughly vetted, legally cleared plotted developments across strategic locations in Maharashtra." };
      case 'about': return { title: "A Foundation of Clarity", desc: "ABM Landmarks focuses on mitigating the common complexities associated with real estate acquisition through rigorous documentation." };
      case 'how-we-work': return { title: "A Clearer Path to Land Ownership", desc: "From understanding the location to reviewing available project documents and arranging a site visit, ABM Landmarks helps buyers navigate each stage." };
      case 'projects': return { title: "Current Developments", desc: "Explore ABM Landmarks’ active plotted developments across Devale, Godumbre and Kasarsai." };
      case 'insights': return { title: "The Landowner's Journal", desc: "Factual perspectives on land acquisition, document verification, and planning processes." };
      case 'contact': return { title: "Command Your Future", desc: "Connect directly with our team to request project documents, view layouts, or schedule a site visit." };
      case 'landing': return { title: "Request Documentation", desc: "Request verified project documents and layouts." };
      default: return { title: "ABM Landmarks", desc: "Curated Land Assets" };
    }
  };

  const meta = getPageMeta(currentRoute);

  const renderView = () => {
    if (currentRoute === 'landing') return <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-child"><LandingView /></motion.div>;
    
    if (currentRoute.startsWith('project/')) {
       const projectId = currentRoute.split('/')[1];
       return <motion.div key="project" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="w-full flex flex-col flex-child"><ProjectDetailView projectId={projectId} navigate={setCurrentRoute} /><PreFooter navigate={setCurrentRoute} /></motion.div>;
    }

    switch(currentRoute) {
      case 'home':
        return (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="w-full flex flex-col flex-child">
            <HeroSection />
            <main className="relative z-10 w-full bg-[var(--bg-page)]">
              <TrustSection />
              <AboutSection navigate={setCurrentRoute} />
              <ProcessSection navigate={setCurrentRoute} />
              <FeaturedProjects navigate={setCurrentRoute} />
              <ProjectProgressGallery navigate={setCurrentRoute} />
              <DocumentationPreview navigate={setCurrentRoute} />
              <WhyChooseABMSection />
              <FAQSection />
              <InsightsPreview navigate={setCurrentRoute} />
              <PreFooter navigate={setCurrentRoute} />
            </main>
          </motion.div>
        );
      case 'about':
        return <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="w-full flex flex-col flex-child"><AboutView navigate={setCurrentRoute} /><PreFooter navigate={setCurrentRoute} /></motion.div>;
      case 'how-we-work':
        return <motion.div key="how-we-work" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="w-full flex flex-col flex-child"><HowWeWorkView navigate={setCurrentRoute} /><PreFooter navigate={setCurrentRoute} /></motion.div>;
      case 'projects':
        return <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="w-full flex flex-col flex-child"><ProjectsView navigate={setCurrentRoute} /><PreFooter navigate={setCurrentRoute} /></motion.div>;
      case 'insights':
        return <motion.div key="insights" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="w-full flex flex-col flex-child"><InsightsPreview navigate={setCurrentRoute} /><PreFooter navigate={setCurrentRoute} /></motion.div>;
      case 'contact':
        return <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="w-full flex flex-col flex-child"><ContactView /></motion.div>;
      case 'privacy':
        return <motion.div key="privacy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col flex-child"><LegalView title="Privacy Policy" /></motion.div>;
      case 'terms':
        return <motion.div key="terms" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col flex-child"><LegalView title="Terms of Service" /></motion.div>;
      case 'disclaimer':
        return <motion.div key="disclaimer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col flex-child"><LegalView title="Legal Disclaimer" /></motion.div>;
      default:
        return <HeroSection />;
    }
  };

  return (
    <>
      <FontStyles />
      <SEOHead title={meta.title} description={meta.desc} schemaData={globalSchema} />
      
      <div className="min-h-[100svh] relative flex flex-col w-full bg-[var(--bg-page)]">
        
        <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} navigate={setCurrentRoute} />
        
        {currentRoute !== 'landing' && (
          <Navigation currentRoute={currentRoute} navigate={setCurrentRoute} onOpenSearch={() => setIsSearchOpen(true)} />
        )}
        
        <AnimatePresence mode="wait">
          <main className="flex-grow w-full flex flex-col overflow-x-hidden relative flex-child">
            {renderView()}
          </main>
        </AnimatePresence>

        {currentRoute !== 'landing' && <Footer navigate={setCurrentRoute} />}
        
        {!menuOrSearchOpen && (
          <div className="floating-whatsapp">
            <a href={`https://wa.me/${SITE_DATA.whatsapp}`} target="_blank" rel="noopener noreferrer" className="relative group flex items-center justify-center w-full h-full bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
               <MessageCircle size={28} className="md:w-8 md:h-8" />
            </a>
          </div>
        )}
      </div>
    </>
  );
}
