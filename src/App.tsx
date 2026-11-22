/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Sun,
  BatteryCharging,
  Zap,
  TrendingUp,
  ShieldCheck,
  Globe,
  Moon,
  ArrowRight,
  Calculator,
  Bot,
  Building2,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  FileText,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Activity,
  BarChart3,
  Cpu,
  Layers,
  Send,
  Loader2,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  X,
  Award,
  Check,
  MessageCircle,
  FileSpreadsheet,
  Download
} from 'lucide-react';

interface CartItem {
  id: number;
  nameAr: string;
  nameEn: string;
  quantity: number;
  image: string;
}

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'calculator' | 'bom-generator' | 'shop' | 'ai-consultant' | 'projects' | 'contact'>('home');

  // Calculator State
  const [monthlyBill, setMonthlyBill] = useState<number>(15000);
  const [facilityType, setFacilityType] = useState<string>('industrial');
  const [location, setLocation] = useState<string>('Riyadh, KSA');

  // BOM Generator State
  const [bomSystemKw, setBomSystemKw] = useState<number>(30);
  const [selectedPanelWatt, setSelectedPanelWatt] = useState<number>(720);

  // AI Consultant State
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  // Quote Form State
  const [quoteForm, setQuoteForm] = useState({ name: '', company: '', email: '', phone: '', details: '' });
  const [quoteSubmitted, setQuoteSubmitted] = useState<boolean>(false);

  // Shop & Cart State (No prices)
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [shopCategory, setShopCategory] = useState<string>('all');
  const [checkoutSubmitted, setCheckoutSubmitted] = useState<boolean>(false);

  // WhatsApp Menu State
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState<boolean>(false);

  // Project Filter State
  const [projectFilter, setProjectFilter] = useState<'all' | 'solar' | 'bess' | 'smart-grid'>('all');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  const toggleLang = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', newLang);
  };

  // Calculator Math
  const estimatedSystemSize = Math.round(monthlyBill / 180); // kW
  const estimatedMonthlySavings = Math.round(monthlyBill * 0.72);
  const annualSavings = estimatedMonthlySavings * 12;
  const roiYears = Number(Math.max(2.5, (estimatedSystemSize * 850 / (annualSavings || 1))).toFixed(1));
  const co2Offset = Math.round(estimatedSystemSize * 1.4);

  // BOM Calculations
  const totalPanelsCount = Math.ceil((bomSystemKw * 1000) / selectedPanelWatt);
  const recommendedInverter = bomSystemKw <= 12 ? 'Deye 12kW 3-Phase Hybrid Inverter' : bomSystemKw <= 50 ? 'Deye 50kW Commercial Three-Phase Inverter' : 'Deye 100kW Industrial Grid-Tie Inverter System';
  const recommendedBatteryKwh = Math.round(bomSystemKw * 0.8);
  const estimatedDcCableMeters = bomSystemKw * 15;
  const mc4PairsCount = Math.round(totalPanelsCount * 0.5);
  const dcSpdCount = Math.ceil(bomSystemKw / 25);
  const acBreakerAmps = Math.round((bomSystemKw * 1000) / (380 * 1.732) * 1.25);

  // Partners & Global Brands
  const partnerBrands = [
    { name: 'Deye', desc: 'Authorized Distributor', logoText: 'DEYE' },
    { name: 'Sungrow', desc: 'Inverters & Storage', logoText: 'SUNGROW' },
    { name: 'Huawei Solar', desc: 'Smart String Inverters', logoText: 'HUAWEI' },
    { name: 'Canadian Solar', desc: 'High-Power PV Modules', logoText: 'CANADIAN SOLAR' },
    { name: 'Jinko Solar', desc: 'Tiger Neo 440W - 720W', logoText: 'JINKO SOLAR' },
    { name: 'Longi Solar', desc: 'Hi-MO Technology', logoText: 'LONGI' },
    { name: 'BYD Energy', desc: 'Lithium Battery Cells', logoText: 'BYD' },
    { name: 'Schneider Electric', desc: 'Switchgear & Protection', logoText: 'SCHNEIDER' }
  ];

  // Products Catalog (NO PRICES)
  const productsData = [
    // --- Deye Inverters & BESS ---
    {
      id: 101,
      nameAr: 'عاكس ديي هجين أحادي الطور 5 كيلوواط (Deye 5kW)',
      nameEn: 'Deye 5kW Single-Phase Hybrid Inverter (SUN-5K-SG03LP1)',
      category: 'deye',
      image: '/src/assets/images/deye_hybrid_inverter_1795377361793.jpg',
      descAr: 'عاكس ديي هجين مع دعم بطاريات 48 فولت ومراقبة واي فاي مدمجة.',
      descEn: 'Deye single-phase hybrid inverter with 48V battery support and built-in WiFi.'
    },
    {
      id: 102,
      nameAr: 'عاكس ديي هجين أحادي الطور 8 كيلوواط (Deye 8kW)',
      nameEn: 'Deye 8kW Hybrid Inverter (SUN-8K-SG04LP1)',
      category: 'deye',
      image: '/src/assets/images/deye_hybrid_inverter_1795377361793.jpg',
      descAr: 'قدرة عالية على التحمل، دعم تفريغ وشحن عالي وتيار مستمر كبير.',
      descEn: 'High capacity hybrid inverter with high charge/discharge current.'
    },
    {
      id: 103,
      nameAr: 'عاكس ديي هجين ثلاثي الطور 12 كيلوواط (Deye 12kW 3-Phase)',
      nameEn: 'Deye 12kW Three-Phase Hybrid Inverter (SUN-12K-SG04LP3)',
      category: 'deye',
      image: '/src/assets/images/deye_hybrid_inverter_1795377361793.jpg',
      descAr: 'انفيرتر ثلاثي الطور للمنازل الكبيرة والمنشآت التجارية مع كفاءة تحويل فائقة.',
      descEn: 'Three-phase hybrid inverter for large residential and commercial sites.'
    },
    {
      id: 104,
      nameAr: 'عاكس ديي ثلاثي الطور تجاري 50 كيلوواط (Deye 50kW)',
      nameEn: 'Deye 50kW Commercial Three-Phase Inverter',
      category: 'deye',
      image: '/src/assets/images/deye_hybrid_inverter_1795377361793.jpg',
      descAr: 'حل صناعي متكامل للمصانع والمشاريع التجارية الكبرى بمواصفات حماية متقدمة.',
      descEn: 'Commercial industrial grade inverter for large factories and utility scale.'
    },
    {
      id: 105,
      nameAr: 'خزان بطاريات ديي ليثيوم عالية الجهد (Deye BOS-G 61.4kWh)',
      nameEn: 'Deye BOS-G High Voltage Lithium Battery 61.4kWh',
      category: 'deye',
      image: '/src/assets/images/deye_bess_battery_1795377363514.jpg',
      descAr: 'نظام تخزين بطاريات ديي ليثيوم آيوني عالي الجهد للمشاريع الكبرى والتجارية.',
      descEn: 'High-voltage modular lithium battery storage system for commercial applications.'
    },

    // --- Jinko Solar Panels (All Sizes: 440W to 720W) ---
    {
      id: 201,
      nameAr: 'لوح شمسي جينكو تايغر نيو 440 واط (سكني)',
      nameEn: 'Jinko Tiger Neo N-Type 440W (Residential)',
      category: 'jinko',
      image: '/src/assets/images/jinko_solar_panel_1795377362014.jpg',
      descAr: 'مقاس مثالي للأسطح السكنية بمظهر أنيق وكفاءة عالية في الإضاءة المنخفضة.',
      descEn: 'Compact residential size with elegant black frame and low-light performance.'
    },
    {
      id: 202,
      nameAr: 'لوح شمسي جينكو تايغر نيو 580 واط (تجاري)',
      nameEn: 'Jinko Tiger Neo N-Type 580W (Commercial)',
      category: 'jinko',
      image: '/src/assets/images/jinko_solar_panel_1795377362014.jpg',
      descAr: 'المقاس الأكثر طلباً للمشاريع التجارية والأسطح الصناعية بكفاءة 22.5%.',
      descEn: 'Most popular commercial size delivering 22.5% high efficiency.'
    },
    {
      id: 203,
      nameAr: 'لوح شمسي جينكو تايغر نيو 620 واط (صناعي عالي القدرة)',
      nameEn: 'Jinko Tiger Neo N-Type 620W (Industrial)',
      category: 'jinko',
      image: '/src/assets/images/jinko_solar_panel_1795365670538.jpg',
      descAr: 'قدرة متقدمة 620 واط للمشاريع الصناعية الكبرى مع معامل درجة حرارة ممتاز.',
      descEn: 'Advanced 620W high power industrial module with excellent temperature coefficient.'
    },
    {
      id: 204,
      nameAr: 'لوح شمسي جينكو تايغر نيو 650 واط (محطات طاقة)',
      nameEn: 'Jinko Tiger Neo N-Type 650W (Utility)',
      category: 'jinko',
      image: '/src/assets/images/jinko_solar_panel_1795365670538.jpg',
      descAr: 'ألواح 650 واط عالية الإنتاجية لمشاريع الطاقة الشمسية الكبرى والمزارع الشمسية.',
      descEn: 'High-yield 650W panels designed for utility-scale solar farms.'
    },
    {
      id: 205,
      nameAr: 'لوح شمسي جينكو تايغر نيو 720 واط ألترا (الجيل الأحدث)',
      nameEn: 'Jinko Tiger Neo 720W Ultra Industrial',
      category: 'jinko',
      image: '/src/assets/images/jinko_solar_panel_1795365670538.jpg',
      descAr: 'القدرة الأضخم 720 واط تكنولوجيا ثنائية الوجه (Bifacial) للمحطات العملاقة وتوفير مساحة التركيب.',
      descEn: 'Massive 720W ultra high-power bifacial module for utility-scale giants.'
    },

    // --- Energy Accessories & Protection ---
    {
      id: 301,
      nameAr: 'هيكل تركيب معدني ألمنيوم مقاوم للصدأ (Mounting Rails Kit per kW)',
      nameEn: 'Aluminum Solar Mounting Structure Kit (Per kW)',
      category: 'accessories',
      image: '/src/assets/images/solar_accessories_1795377362509.jpg',
      descAr: 'قواعد ومشابك تثبيت ألمنيوم مقاومة للتآكل والأحمال الريحية الشديدة.',
      descEn: 'Corrosion-resistant aluminum mounting rails and clamps for secure roof fixing.'
    },
    {
      id: 302,
      nameAr: 'قواعد تثبيت مائلة للألواح على الأسطح المستوية (Triangle Brackets)',
      nameEn: 'Adjustable Flat Roof Triangle Mounting Brackets',
      category: 'accessories',
      image: '/src/assets/images/solar_accessories_1795377362509.jpg',
      descAr: 'قواعد مثلثية ألمنيوم لضبط زاوية ميل الألواح المثالية على الأسطح الخرسانية المستوية.',
      descEn: 'Adjustable aluminum triangle brackets for optimal tilt angle on flat concrete roofs.'
    },
    {
      id: 303,
      nameAr: 'سلاك طاقة شمسية DC نحاس خالص مقاس 4 مم² (لفة 100 متر)',
      nameEn: 'Solar DC Copper Cable 4mm² UV Resistant (100m Roll)',
      category: 'accessories',
      image: '/src/assets/images/solar_accessories_1795377362509.jpg',
      descAr: 'أسلاك توصيل معزولة مزدوجة مخصصة لربط الألواح الشمسية.',
      descEn: 'Dual insulated pure copper DC cable for solar panel string connection.'
    },
    {
      id: 304,
      nameAr: 'أسلاك طاقة شمسية DC نحاس خالص مقاس 6 مم² (لفة 100 متر)',
      nameEn: 'Solar DC Copper Cable 6mm² UV Resistant (100m Roll)',
      category: 'accessories',
      image: '/src/assets/images/solar_accessories_1795377362509.jpg',
      descAr: 'كابلات نحاسية معزولة مزدوجة مقاس 6 مم² مقاومة لأشعة الشمس المباشرة.',
      descEn: 'Heavy duty 6mm² copper cables resistant to UV rays and extreme temperatures.'
    },
    {
      id: 305,
      nameAr: 'موصلات طاقة شمسية MC4 أصلية (زوج ذكر وأنثى - 10 أزواج)',
      nameEn: 'Original MC4 Solar Connectors (10 Pairs Pack)',
      category: 'accessories',
      image: '/src/assets/images/solar_accessories_1795377362509.jpg',
      descAr: 'موصلات MC4 أصلية مقاومة للماء والغبار بمعيار IP68 لتوصيل آمن بدون فقد في الطاقة.',
      descEn: 'IP68 waterproof original MC4 connectors for secure low-loss PV connections.'
    },
    {
      id: 306,
      nameAr: 'جهاز حماية من الارتفاع المفاجئ والصواعق DC SPD 1000V',
      nameEn: 'DC Surge Protection Device SPD 1000V (2-Pole)',
      category: 'accessories',
      image: '/src/assets/images/solar_accessories_1795377362509.jpg',
      descAr: 'حماية متقدمة لمنظومة الألواح والانفيرتر ضد الصواعق وارتفاع الجهد المفاجئ.',
      descEn: 'Advanced DC surge protection device against lightning and voltage spikes.'
    },
    {
      id: 307,
      nameAr: 'قاطع حماية تيار مستمر DC Breaker 1000V 32A/63A',
      nameEn: 'DC Circuit Breaker 1000V (32A - 63A)',
      category: 'accessories',
      image: '/src/assets/images/solar_accessories_1795377362509.jpg',
      descAr: 'قاطع أمان مخصص لدوائر الألواح الشمسية بجهد عالي وتيار مستمر.',
      descEn: 'High voltage DC safety circuit breaker for solar strings.'
    },
    {
      id: 308,
      nameAr: 'قواطع حماية تيار متناوب AC MCCB / MCB 3-Phase',
      nameEn: 'AC Circuit Breaker 3-Phase MCCB / MCB',
      category: 'accessories',
      image: '/src/assets/images/solar_accessories_1795377362509.jpg',
      descAr: 'قواطع رئيسية ثلاثية الطور لحماية مخرج الانفيرتر واللوحة الرئيسية.',
      descEn: '3-phase AC main circuit breakers for inverter output and main panel protection.'
    },
    {
      id: 309,
      nameAr: 'أسلاك تأريض نحاسية مرنة للتأريض 16 مم² (لفة 50 متر)',
      nameEn: 'Flexible Grounding Earth Copper Wire 16mm² (50m)',
      category: 'accessories',
      image: '/src/assets/images/solar_accessories_1795377362509.jpg',
      descAr: 'سلك تأريض أخضر/أصفر معتمد لحماية الهياكل والألواح والانفيرتر من الصواعق وتفريغ الشحنات.',
      descEn: 'Certified green/yellow grounding earth wire for structural safety and lightning protection.'
    }
  ];

  const filteredProducts = shopCategory === 'all'
    ? productsData
    : shopCategory === 'deye'
    ? productsData.filter(p => p.category === 'deye')
    : shopCategory === 'jinko'
    ? productsData.filter(p => p.category === 'jinko')
    : shopCategory === 'accessories'
    ? productsData.filter(p => p.category === 'accessories')
    : productsData;

  const addToCart = (product: typeof productsData[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, {
        id: product.id,
        nameAr: product.nameAr,
        nameEn: product.nameEn,
        quantity: 1,
        image: product.image
      }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Handle AI Consultation
  const handleAIConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    try {
      const res = await fetch('/api/gemini/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt,
          facilityType,
          monthlyBill,
          location,
          language: lang
        })
      });
      const data = await res.json();
      if (data.success) {
        setAiResponse(data.text);
      } else {
        setAiResponse(lang === 'ar' ? 'عذراً، حدث خطأ في معالجة الاستشارة. يرجى المحاولة مرة أخرى.' : 'Sorry, an error occurred. Please try again.');
      }
    } catch (err) {
      setAiResponse(lang === 'ar' ? 'خطأ في الاتصال بالخادم.' : 'Server connection error.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
  };

  const projectsData = [
    {
      id: 1,
      titleAr: 'محطة الطاقة الشمسية الكهروضوئية الصناعية - مجمع الرياض',
      titleEn: 'Industrial Solar PV Plant - Riyadh Complex',
      category: 'solar',
      capacity: '45 MW',
      savings: '65% Reduction in Energy Cost',
      image: '/src/assets/images/hero_solar_farm_1795365670898.jpg',
      descAr: 'تركيب نظام شمسي متطور يغطي المصانع والمستودعات مع محولات مركزية وأنظمة تحكم ذكية.',
      descEn: 'Advanced utility-scale solar installation covering industrial complexes with centralized smart inverters.'
    },
    {
      id: 2,
      titleAr: 'مشروع الطاقة الشمسية على أسطح المصانع - دبي',
      titleEn: 'Commercial Rooftop PV Project - Dubai',
      category: 'solar',
      capacity: '12 MW',
      savings: '58% Bill Savings',
      image: '/src/assets/images/industrial_rooftop_solar_1795365670538.jpg',
      descAr: 'تجهيز أسطح المصانع بألواح شمسية عالية الكفاءة مقاومة لدرجات الحرارة العالية والغبار.',
      descEn: 'High-efficiency rooftop installation engineered for extreme desert climate resilience.'
    },
    {
      id: 3,
      titleAr: 'مركز تحكم الشبكات الذكية وإنترنت الأشياء - جدة',
      titleEn: 'Smart Grid IoT Control Center - Jeddah',
      category: 'smart-grid',
      capacity: '120 MW Grid Monitored',
      savings: 'Real-time Load Balancing',
      image: '/src/assets/images/smart_grid_control_1795365670666.jpg',
      descAr: 'غرفة تحكم مركزية متكاملة لتقارير تتبع إنتاج واستهلاك الطاقة والتحكم الآلي بالشبكة.',
      descEn: 'Centralized telemetry command center for real-time energy production and automated load balancing.'
    },
    {
      id: 4,
      titleAr: 'نظام تخزين طاقة البطاريات (BESS) - مشروع نيوم',
      titleEn: 'Battery Energy Storage System (BESS) - NEOM',
      category: 'bess',
      capacity: '30 MWh Storage',
      savings: '24/7 Uninterrupted Clean Power',
      image: '/src/assets/images/battery_storage_system_1795365671063.jpg',
      descAr: 'وحدات تخزين بطاريات الليثيوم المتقدمة لتأمين الأحمال الحرجة وإدارة ذروة الاستهلاك.',
      descEn: 'Containerized lithium BESS units ensuring critical power backup and peak shaving.'
    }
  ];

  const filteredProjects = projectFilter === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === projectFilter);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-300 relative`}>
      
      {/* Top Bar Contract (Strict 3 zones) */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/80 dark:border-slate-800/80 px-6 py-4 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark with Logo */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setActiveTab('home')}>
          <img
            src="/assets/aistudio/Rawafed_Renewable_Energy_Logo_614c1e0c.png"
            alt="Rawafid Energy Solutions Logo"
            className="w-12 h-12 object-contain rounded-xl"
            referrerPolicy="no-referrer"
          />
          <div>
            <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
              {lang === 'ar' ? 'شركة روافد لحلول الطاقة' : 'Rawafid Energy Solutions'}
            </h1>
            <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">
              {lang === 'ar' ? 'إدارة: م. مالك حريبات • م. عز الدين بدارين' : 'Managed by: Eng. Malek & Eng. Ezzaddin'}
            </p>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button onClick={() => setActiveTab('home')} className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap ${activeTab === 'home' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}>
            {lang === 'ar' ? 'الرئيسية' : 'Home'}
          </button>
          <button onClick={() => setActiveTab('services')} className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap ${activeTab === 'services' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}>
            {lang === 'ar' ? 'حلولنا وخدماتنا' : 'Services'}
          </button>
          <button onClick={() => setActiveTab('shop')} className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap ${activeTab === 'shop' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}>
            {lang === 'ar' ? 'معرض المنتجات' : 'Products Catalog'}
          </button>
          <button onClick={() => setActiveTab('bom-generator')} className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap ${activeTab === 'bom-generator' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}>
            {lang === 'ar' ? 'حاسبة المكونات (BOM)' : 'System BOM Calculator'}
          </button>
          <button onClick={() => setActiveTab('calculator')} className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap ${activeTab === 'calculator' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}>
            {lang === 'ar' ? 'حاسبة الوفورات' : 'Savings Calculator'}
          </button>
          <button onClick={() => setActiveTab('ai-consultant')} className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap ${activeTab === 'ai-consultant' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}>
            {lang === 'ar' ? 'المستشار الذكي' : 'AI Consultant'}
          </button>
          <button onClick={() => setActiveTab('projects')} className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap ${activeTab === 'projects' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}>
            {lang === 'ar' ? 'مشاريعنا' : 'Projects'}
          </button>
          <button onClick={() => setActiveTab('contact')} className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap ${activeTab === 'contact' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}>
            {lang === 'ar' ? 'اتصل بنا' : 'Contact'}
          </button>
        </nav>

        {/* Zone 3: Primary Action & Toggles */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Cart / Inquiry List Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors"
            title="Inquiry List"
          >
            <ShoppingCart className="w-4 h-4" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </button>

          <button
            onClick={toggleLang}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'EN' : 'العربية'}</span>
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors"
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className="px-4 py-2 text-xs font-semibold text-white energy-gradient rounded-lg shadow-md hover:opacity-95 transition-all whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>{lang === 'ar' ? 'اطلب استشارة' : 'Request Proposal'}</span>
            <ArrowRight className={`w-3.5 h-3.5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
          </button>
        </div>

      </header>

      {/* Main Content Sections */}
      {activeTab === 'home' && (
        <main>
          {/* Hero Section */}
          <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white px-6 py-20">
            <div className="absolute inset-0 z-0 opacity-40">
              <img
                src="/src/assets/images/hero_solar_farm_1795365670898.jpg"
                alt="Rawafid Solar Farm"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'جديدنا: حاسبة المكونات الهندسية (BOM) وألواح Jinko 720W' : 'New: System BOM Calculator & Jinko 720W'}</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
                {lang === 'ar'
                  ? 'منصة شركة روافد المتكاملة لحلول الطاقة المتجددة'
                  : 'Rawafid Energy Solutions Comprehensive Platform'}
              </h1>

              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
                {lang === 'ar'
                  ? 'اكتشف أحدث إضافاتنا: حاسبة حصر المكونات الهندسية (BOM)، معرض ألواح جينكو بكل المقاسات، أجهزة Deye، وتواصل فوري عبر واتساب.'
                  : 'Discover our new additions: Automated System BOM Calculator, Jinko panels catalog, Deye systems, and instant WhatsApp chat.'}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setActiveTab('bom-generator')}
                  className="px-6 py-3.5 text-sm font-bold text-white energy-gradient rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'حاسبة المكونات الهندسية (BOM)' : 'System BOM Calculator'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('shop')}
                  className="px-6 py-3.5 text-sm font-bold text-slate-100 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'ar' ? 'معرض المنتجات بدون أسعار' : 'Products Catalog'}</span>
                </button>
              </div>

              {/* Key Trust Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 max-w-4xl mx-auto border-t border-slate-800/80 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-amber-400 font-mono">450+ MW</div>
                  <div className="text-xs text-slate-400 mt-1">{lang === 'ar' ? 'مشاريع طاقة شمسية منفذة' : 'Solar Capacity Deployed'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-amber-400 font-mono">1.2M</div>
                  <div className="text-xs text-slate-400 mt-1">{lang === 'ar' ? 'طن تخفيض انبعاثات الكربون' : 'Tons CO2 Offset'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-amber-400 font-mono">99.8%</div>
                  <div className="text-xs text-slate-400 mt-1">{lang === 'ar' ? 'كفاءة تشغيل الأنظمة' : 'System Uptime Reliability'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-amber-400 font-mono">15+</div>
                  <div className="text-xs text-slate-400 mt-1">{lang === 'ar' ? 'عاماً من الريادة والخبرة' : 'Years of Industry Leadership'}</div>
                </div>
              </div>

            </div>
          </section>

          {/* Global Partner Brands Marquee / Grid Section */}
          <section className="py-16 px-6 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <h2 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                {lang === 'ar' ? 'شراكات عالمية مع كبرى شركات الطاقة' : 'Global Partnerships With Industry Leaders'}
              </h2>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                {lang === 'ar' ? 'العلامات التجارية المعتمدة التي نعتمد عليها' : 'Trusted Global Brands We Distribute & Install'}
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {partnerBrands.map((brand, idx) => (
                <div key={idx} className="glass-panel p-4 rounded-xl text-center flex flex-col items-center justify-center space-y-2 hover:border-amber-500/50 transition-all">
                  <Award className="w-6 h-6 text-amber-500" />
                  <span className="font-extrabold text-sm font-mono tracking-wider">{brand.logoText}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">{brand.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Engineering Leadership Section */}
          <section className="py-20 px-6 max-w-7xl mx-auto bg-slate-100/60 dark:bg-slate-900/40 rounded-3xl my-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                {lang === 'ar' ? 'القيادة والإدارة الهندسية' : 'Engineering Leadership'}
              </h2>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {lang === 'ar' ? 'فريق الهندسة والإشراف المباشر' : 'Direct Engineering & Management Team'}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {lang === 'ar'
                  ? 'تواصل مباشرة مع كبار المهندسين والاستشاريين لمناقشة متطلبات مشروعك وتوريد ألواح جينكو وأجهزة Deye.'
                  : 'Get in direct touch with our senior engineers and consultants to discuss Jinko panels and Deye systems.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Engineer 1 */}
              <div className="glass-panel p-8 rounded-2xl space-y-6 text-center hover:border-amber-500/50 transition-all">
                <div className="w-20 h-20 rounded-full energy-gradient text-white flex items-center justify-center text-2xl font-bold mx-auto shadow-lg shadow-amber-600/20">
                  م.م
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold">{lang === 'ar' ? 'المهندس مالك حريبات' : 'Eng. Malek Hraibat'}</h4>
                  <p className="text-sm text-amber-600 dark:text-amber-400 font-semibold">
                    {lang === 'ar' ? 'مدير مشاريع الطاقة المتجددة' : 'Renewable Energy Project Director'}
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-center gap-2 text-lg font-mono font-bold text-slate-800 dark:text-slate-200" dir="ltr">
                  <Phone className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span>0594345464</span>
                </div>
                <div className="pt-4 flex items-center gap-3">
                  <a
                    href="tel:0594345464"
                    className="flex-1 py-3 text-xs font-bold text-white energy-gradient rounded-xl shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'اتصال' : 'Call'}</span>
                  </a>
                  <a
                    href="https://wa.me/970594345464?text=%Dالسلام%20عليكم%2C%20أرغب%20بالاستفسار%20عن%20أنظمة%20الطاقة%20الشمسية"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>واتساب</span>
                  </a>
                </div>
              </div>

              {/* Engineer 2 */}
              <div className="glass-panel p-8 rounded-2xl space-y-6 text-center hover:border-amber-500/50 transition-all">
                <div className="w-20 h-20 rounded-full energy-gradient text-white flex items-center justify-center text-2xl font-bold mx-auto shadow-lg shadow-amber-600/20">
                  م.ع
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold">{lang === 'ar' ? 'المهندس عز الدين بدارين' : 'Eng. Ezzaddin Badarin'}</h4>
                  <p className="text-sm text-amber-600 dark:text-amber-400 font-semibold">
                    {lang === 'ar' ? 'استشاري الأنظمة الكهروضوئية والشبكات الذكية' : 'Solar PV & Smart Grid Consultant'}
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-center gap-2 text-lg font-mono font-bold text-slate-800 dark:text-slate-200" dir="ltr">
                  <Phone className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span>0599973304</span>
                </div>
                <div className="pt-4 flex items-center gap-3">
                  <a
                    href="tel:0599973304"
                    className="flex-1 py-3 text-xs font-bold text-white energy-gradient rounded-xl shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'اتصال' : 'Call'}</span>
                  </a>
                  <a
                    href="https://wa.me/970599973304?text=%Dالسلام%20عليكم%2C%20أرغب%20بالاستفسار%20عن%20أنظمة%20الطاقة%20الشمسية"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>واتساب</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Services Tab */}
      {activeTab === 'services' && (
        <main className="py-16 px-6 max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
              {lang === 'ar' ? 'خدماتنا الهندسية المتخصصة' : 'Specialized Engineering Services'}
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              {lang === 'ar' ? 'منظومة متكاملة لحلول الطاقة المستقبلية' : 'Comprehensive Ecosystem for Future Energy'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-8 rounded-2xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl energy-gradient flex items-center justify-center text-white">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">{lang === 'ar' ? 'ألواح جينكو بكل المقاسات (440W - 720W)' : 'Jinko Solar Panels (440W-720W)'}</h4>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Residential, Commercial & Industrial Giants</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {lang === 'ar'
                  ? 'نوفر ألواح جينكو تايغر نيو بكافة القدرات (440 واط، 580 واط، 620 واط، 650 واط، وحتى 720 واط الأحدث للمشاريع العملاقة).'
                  : 'We supply Jinko Tiger Neo modules across all capacities (440W, 580W, 620W, 650W, up to 720W ultra industrial).'}
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl energy-gradient flex items-center justify-center text-white">
                  <BatteryCharging className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">{lang === 'ar' ? 'أجهزة Deye الهجينة والبطاريات' : 'Deye Hybrid Inverters & BESS'}</h4>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Authorized Deye Distribution</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {lang === 'ar'
                  ? 'محولات ديي الهجينة من 5 كيلوواط وحتى 50 كيلوواط ثلاثية الطور وخزانات بطاريات الليثيوم عالية الجهد.'
                  : 'Deye hybrid inverters from 5kW to 50kW three-phase and high voltage lithium BESS storage units.'}
              </p>
            </div>
          </div>
        </main>
      )}

      {/* System BOM Generator Tab (NEW ADDITION) */}
      {activeTab === 'bom-generator' && (
        <main className="py-16 px-6 max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
              {lang === 'ar' ? 'أداة حصر وتوليد المكونات الهندسية (BOM)' : 'Automated System BOM Generator'}
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              {lang === 'ar' ? 'حاسبة جدول الكميات ومواصفات النظام الشمسى' : 'Solar System Bill of Materials & Sizing Calculator'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {lang === 'ar'
                ? 'حدد السعة المطلوبة لمشروعك وقدرة ألواح Jinko، وسيقوم النظام تلقائياً بحساب جدول الكميات والمكونات الهندسية الدقيقة لإرسالها للمهندسين.'
                : 'Select your target system capacity and Jinko panel wattage, and the system automatically computes exact BOM and hardware quantities.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Form */}
            <div className="lg:col-span-5 glass-panel p-8 rounded-2xl space-y-6">
              <h4 className="text-lg font-bold border-b border-slate-200 dark:border-slate-800 pb-4">
                {lang === 'ar' ? 'معلمات تصميم النظام الشمسي' : 'System Design Parameters'}
              </h4>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {lang === 'ar' ? 'سعة النظام المطلوبة (كيلوواط - kW)' : 'Target System Capacity (kW)'}
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="5"
                    max="200"
                    step="5"
                    value={bomSystemKw}
                    onChange={(e) => setBomSystemKw(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                  <span className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400 shrink-0">
                    {bomSystemKw} kW
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {lang === 'ar' ? 'قدرة لوح Jinko المفضل' : 'Preferred Jinko Panel Wattage'}
                </label>
                <select
                  value={selectedPanelWatt}
                  onChange={(e) => setSelectedPanelWatt(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value={440}>{lang === 'ar' ? '440 واط (سكني)' : '440W Residential'}</option>
                  <option value={580}>{lang === 'ar' ? '580 واط (تجاري)' : '580W Commercial'}</option>
                  <option value={620}>{lang === 'ar' ? '620 واط (صناعي)' : '620W Industrial'}</option>
                  <option value={650}>{lang === 'ar' ? '650 واط (محطات)' : '650W Utility'}</option>
                  <option value={720}>{lang === 'ar' ? '720 واط ألترا (الجيل الجديد)' : '720W Ultra Bifacial'}</option>
                </select>
              </div>

              <button
                onClick={() => setActiveTab('contact')}
                className="w-full py-3.5 text-xs font-bold text-white energy-gradient rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'ar' ? 'طلب عرض سعر لهذه القائمة (BOM)' : 'Request Quote for this BOM'}</span>
              </button>
            </div>

            {/* Computed BOM Output Table */}
            <div className="lg:col-span-7 glass-panel p-8 rounded-2xl space-y-6 bg-slate-900 text-white border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h4 className="text-lg font-bold text-amber-400">
                  {lang === 'ar' ? 'جدول الكميات والمكونات المقترحة (BOM)' : 'Generated Bill of Materials (BOM)'}
                </h4>
                <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full font-mono">
                  {bomSystemKw} kW SYSTEM
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span>{lang === 'ar' ? 'ألواح Jinko Solar الشمسية' : 'Jinko Solar Panels'}</span>
                  <span className="text-amber-400 font-bold">{totalPanelsCount} لوح ({selectedPanelWatt}W)</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span>{lang === 'ar' ? 'محفرات الطاقة (Inverter)' : 'Hybrid Inverter System'}</span>
                  <span className="text-amber-400 font-bold">{recommendedInverter}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span>{lang === 'ar' ? 'سعة بطاريات التخزين (BESS)' : 'Recommended BESS Storage'}</span>
                  <span className="text-amber-400 font-bold">~{recommendedBatteryKwh} kWh Lithium</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span>{lang === 'ar' ? 'هياكل التركيب (ألمنيوم)' : 'Aluminum Mounting Rails'}</span>
                  <span className="text-amber-400 font-bold">{bomSystemKw} kW Structure Kit</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span>{lang === 'ar' ? 'أسلاك DC (6 مم²)' : 'DC Copper Cables (6mm²)'}</span>
                  <span className="text-amber-400 font-bold">~{estimatedDcCableMeters} متر</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span>{lang === 'ar' ? 'موصلات MC4 أصلية' : 'MC4 Connectors Pairs'}</span>
                  <span className="text-amber-400 font-bold">{mc4PairsCount} زوج</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span>{lang === 'ar' ? 'حمايات الصواعق وقواطع DC/AC' : 'DC SPDs & Breakers'}</span>
                  <span className="text-amber-400 font-bold">{dcSpdCount} صندوق حماية ({acBreakerAmps}A AC)</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-800 pt-4">
                {lang === 'ar'
                  ? 'تم حساب هذه القائمة بدقة وفق المعايير الهندسية العالمية. يمكنك إرسال هذه القائمة مباشرة للمهندس مالك حريبات أو م. عز الدين بدارين عبر واتساب للحصول على عرض فني ومالي معتمد.'
                  : 'Computed according to international engineering standards. Send this BOM directly to Eng. Malek or Eng. Ezzaddin via WhatsApp.'}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Products Catalog Tab (NO PRICES) */}
      {activeTab === 'shop' && (
        <main className="py-16 px-6 max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
              {lang === 'ar' ? 'معرض المنتجات والأنظمة الرسمية' : 'Official Products & Systems Catalog'}
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              {lang === 'ar' ? 'استعرض أجهزة Deye، ألواح Jinko، واكسسوارات الطاقة' : 'Explore Deye Devices, Jinko Panels & Accessories'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {lang === 'ar'
                ? 'منتجات أصلية معتمدة مع صور رسمية من الشركات المصنعة. أضف المنتجات لقائمة الاستفسار واطلب عرض سعر مخصص من المهندس مالك حريبات والمهندس عز الدين بدارين.'
                : 'Official certified products with manufacturer imagery. Add items to your inquiry list and request a custom quote from Eng. Malek and Eng. Ezzaddin.'}
            </p>
          </div>

          {/* Catalog Categories Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setShopCategory('all')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${shopCategory === 'all' ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
            >
              {lang === 'ar' ? 'جميع المنتجات' : 'All Products'}
            </button>
            <button
              onClick={() => setShopCategory('jinko')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${shopCategory === 'jinko' ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
            >
              {lang === 'ar' ? 'ألواح Jinko (كل المقاسات 440-720W)' : 'Jinko Panels (440W-720W)'}
            </button>
            <button
              onClick={() => setShopCategory('deye')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${shopCategory === 'deye' ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
            >
              {lang === 'ar' ? 'أجهزة Deye الهجينة والبطاريات' : 'Deye Inverters & BESS'}
            </button>
            <button
              onClick={() => setShopCategory('accessories')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${shopCategory === 'accessories' ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
            >
              {lang === 'ar' ? 'اكسسوارات، قواطع وأسلاك' : 'Accessories, Breakers & Cables'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col group">
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <img
                    src={product.image}
                    alt={lang === 'ar' ? product.nameAr : product.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-bold text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {product.category}
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold">{lang === 'ar' ? product.nameAr : product.nameEn}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {lang === 'ar' ? product.descAr : product.descEn}
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full py-3 text-xs font-bold text-white energy-gradient rounded-xl shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'إضافة إلى قائمة الاستفسار وطلب السعر' : 'Add to Inquiry List'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Savings Calculator Tab */}
      {activeTab === 'calculator' && (
        <main className="py-16 px-6 max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
              {lang === 'ar' ? 'حاسبة وفورات الطاقة الذكية' : 'Smart Energy Savings Calculator'}
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {lang === 'ar' ? 'اكتشف حجم الوفر المالي لمنشأتك فوراً' : 'Discover Your Facility Financial Savings Instantly'}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls */}
            <div className="lg:col-span-6 glass-panel p-8 rounded-2xl space-y-6">
              <h4 className="text-lg font-bold border-b border-slate-200 dark:border-slate-800 pb-4">
                {lang === 'ar' ? 'بيانات المنشأة والاستهلاك' : 'Facility & Consumption Data'}
              </h4>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {lang === 'ar' ? 'قيمة الفاتورة الكهربائية الشهرية التقريبية ($)' : 'Approximate Monthly Electricity Bill ($)'}
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="2000"
                    max="100000"
                    step="1000"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                  <span className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400 shrink-0">
                    ${monthlyBill.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {lang === 'ar' ? 'نوع المنشأة' : 'Facility Type'}
                </label>
                <select
                  value={facilityType}
                  onChange={(e) => setFacilityType(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="industrial">{lang === 'ar' ? 'مصنع / منشأة صناعية ثقيلة' : 'Industrial Factory / Heavy Plant'}</option>
                  <option value="commercial">{lang === 'ar' ? 'مجمع تجاري / مول' : 'Commercial Mall / Complex'}</option>
                  <option value="agricultural">{lang === 'ar' ? 'مشروع زراعي / مضخات مياه' : 'Agricultural / Irrigation Project'}</option>
                  <option value="residential">{lang === 'ar' ? 'مجمع سكني / أبراج' : 'Residential Compound / Towers'}</option>
                </select>
              </div>

              <button
                onClick={() => setActiveTab('contact')}
                className="w-full py-3.5 text-sm font-bold text-white energy-gradient rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <span>{lang === 'ar' ? 'اطلب دراسة جدوى مفصلة لهذا النظام' : 'Request Detailed Feasibility Study'}</span>
                <ArrowRight className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Calculated Results Display */}
            <div className="lg:col-span-6 glass-panel p-8 rounded-2xl space-y-6 bg-slate-900 text-white border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h4 className="text-lg font-bold text-amber-400">
                  {lang === 'ar' ? 'النتائج المتوقعة للمنظومة المقترحة' : 'Estimated System Results'}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400">{lang === 'ar' ? 'السعة الشمسية المقترحة' : 'Recommended Solar Capacity'}</div>
                  <div className="text-3xl font-extrabold text-amber-400 font-mono mt-2">{estimatedSystemSize} kW</div>
                </div>

                <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400">{lang === 'ar' ? 'الوفر السنوي المتوقع' : 'Projected Annual Savings'}</div>
                  <div className="text-3xl font-extrabold text-amber-400 font-mono mt-2">${annualSavings.toLocaleString()}</div>
                </div>

                <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400">{lang === 'ar' ? 'فترة استرداد رأس المال' : 'ROI Payback Period'}</div>
                  <div className="text-3xl font-extrabold text-amber-400 font-mono mt-2">{roiYears} {lang === 'ar' ? 'سنوات' : 'Years'}</div>
                </div>

                <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400">{lang === 'ar' ? 'خفض انبعاثات الكربون السنوي' : 'Annual Carbon Offset'}</div>
                  <div className="text-3xl font-extrabold text-amber-400 font-mono mt-2">{co2Offset} {lang === 'ar' ? 'طن' : 'Tons'}</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* AI Energy Consultant Tab */}
      {activeTab === 'ai-consultant' && (
        <main className="py-16 px-6 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold">
              <Bot className="w-4 h-4" />
              <span>{lang === 'ar' ? 'مدعوم بنموذج الذكاء الاصطناعي المتقدم' : 'Powered by Advanced Gemini AI'}</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              {lang === 'ar' ? 'استشر مهندس الطاقة الذكي' : 'AI Energy Consultant & Proposal Generator'}
            </h2>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-6">
            <form onSubmit={handleAIConsult} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  {lang === 'ar' ? 'اكتب استفسارك الهندسي (عن أجهزة Deye وألواح Jinko):' : 'Enter your engineering inquiry:'}
                </label>
                <textarea
                  rows={4}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: ما هو عدد ألواح جينكو 720 واط المطلوبة لمشروع قدرته 100 كيلوواط مع انفيرتر Deye؟' : 'Example: How many Jinko 720W panels are needed for a 100kW project with Deye inverter?'}
                  className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={aiLoading || !aiPrompt.trim()}
                className="w-full py-3.5 text-sm font-bold text-white energy-gradient rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {aiLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{lang === 'ar' ? 'جاري تحليل الاستشارة الهندسية...' : 'Generating AI Consultation...'}</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'الحصول على الاستشارة الذكية' : 'Get AI Consultation'}</span>
                  </>
                )}
              </button>
            </form>

            {aiResponse && (
              <div className="bg-slate-900 text-slate-100 p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                    <Sparkles className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'رد استشاري الطاقة من روافد' : 'Rawafid Expert AI Response'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">GEMINI-4-HYDROGEN</span>
                </div>
                <div className="text-sm leading-relaxed whitespace-pre-wrap font-normal">
                  {aiResponse}
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {/* Projects Portfolio Tab */}
      {activeTab === 'projects' && (
        <main className="py-16 px-6 max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
              {lang === 'ar' ? 'سجل إنجازاتنا' : 'Our Track Record'}
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {lang === 'ar' ? 'مشاريع كبرى تنير مستقبل المنطقة' : 'Major Projects Powering the Region'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={lang === 'ar' ? project.titleAr : project.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md text-amber-400 font-mono text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-800">
                    {project.capacity}
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold">{lang === 'ar' ? project.titleAr : project.titleEn}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {lang === 'ar' ? project.descAr : project.descEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Contact & Quote Booking Tab */}
      {activeTab === 'contact' && (
        <main className="py-16 px-6 max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
              {lang === 'ar' ? 'تواصل معنا مباشرة' : 'Get In Touch Directly'}
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {lang === 'ar' ? 'ابدأ رحلة التحول نحو الطاقة النظيفة اليوم' : 'Start Your Clean Energy Transition Today'}
            </h3>
          </div>

          {/* Engineers Direct Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-6 rounded-2xl space-y-4 text-center">
              <div className="w-16 h-16 rounded-full energy-gradient text-white flex items-center justify-center text-xl font-bold mx-auto">
                م.م
              </div>
              <div>
                <h4 className="text-xl font-bold">{lang === 'ar' ? 'المهندس مالك حريبات' : 'Eng. Malek Hraibat'}</h4>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">{lang === 'ar' ? 'مدير مشاريع الطاقة المتجددة' : 'Project Director'}</p>
              </div>
              <div className="text-lg font-mono font-bold" dir="ltr">0594345464</div>
              <div className="flex items-center gap-2">
                <a href="tel:0594345464" className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white energy-gradient rounded-xl">
                  <Phone className="w-4 h-4" /> <span>{lang === 'ar' ? 'اتصال' : 'Call'}</span>
                </a>
                <a href="https://wa.me/970594345464?text=%Dالسلام%20عليكم%2C%20أرغب%20بالاستفسار%20عن%20أنظمة%20الطاقة%20الشمسية" target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl">
                  <MessageCircle className="w-4 h-4" /> <span>واتساب</span>
                </a>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl space-y-4 text-center">
              <div className="w-16 h-16 rounded-full energy-gradient text-white flex items-center justify-center text-xl font-bold mx-auto">
                م.ع
              </div>
              <div>
                <h4 className="text-xl font-bold">{lang === 'ar' ? 'المهندس عز الدين بدارين' : 'Eng. Ezzaddin Badarin'}</h4>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">{lang === 'ar' ? 'استشاري الأنظمة الكهروضوئية والشبكات الذكية' : 'Solar & Smart Grid Consultant'}</p>
              </div>
              <div className="text-lg font-mono font-bold" dir="ltr">0599973304</div>
              <div className="flex items-center gap-2">
                <a href="tel:0599973304" className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white energy-gradient rounded-xl">
                  <Phone className="w-4 h-4" /> <span>{lang === 'ar' ? 'اتصال' : 'Call'}</span>
                </a>
                <a href="https://wa.me/970599973304?text=%Dالسلام%20عليكم%2C%20أرغب%20بالاستفسار%20عن%20أنظمة%20الطاقة%20الشمسية" target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl">
                  <MessageCircle className="w-4 h-4" /> <span>واتساب</span>
                </a>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl">
            {quoteSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold">
                  {lang === 'ar' ? 'تم استلام طلبك بنجاح!' : 'Proposal Request Received Successfully!'}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  {lang === 'ar'
                    ? 'سيتواصل معك م. مالك حريبات أو م. عز الدين بدارين خلال 24 ساعة.'
                    : 'Eng. Malek or Eng. Ezzaddin will reach out within 24 hours.'}
                </p>
                <button
                  onClick={() => { setQuoteSubmitted(false); setActiveTab('home'); }}
                  className="px-6 py-2.5 text-xs font-bold text-white energy-gradient rounded-xl shadow-md"
                >
                  {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <h4 className="text-lg font-bold border-b border-slate-200 dark:border-slate-800 pb-4">
                  {lang === 'ar' ? 'نموذج طلب عرض سعر أو استشارة' : 'Request Proposal or Consultation'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold">{lang === 'ar' ? 'الاسم الكريم' : 'Full Name'}</label>
                    <input
                      required
                      type="text"
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold">{lang === 'ar' ? 'اسم الشركة / المنشأة' : 'Company Name'}</label>
                    <input
                      required
                      type="text"
                      value={quoteForm.company}
                      onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</label>
                    <input
                      required
                      type="email"
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold">{lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</label>
                    <input
                      required
                      type="tel"
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">{lang === 'ar' ? 'تفاصيل المشروع أو الاستفسار' : 'Project Details / Inquiry'}</label>
                  <textarea
                    rows={4}
                    value={quoteForm.details}
                    onChange={(e) => setQuoteForm({ ...quoteForm, details: e.target.value })}
                    placeholder={lang === 'ar' ? 'أذكر تفاصيل منشأتك واستهلاكك الشهري...' : 'Mention facility details and monthly consumption...'}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 text-sm font-bold text-white energy-gradient rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'إرسال طلب الاستشارة' : 'Submit Consultation Request'}</span>
                </button>
              </form>
            )}
          </div>
        </main>
      )}

      {/* Inquiry List Modal (No Prices) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-end p-4">
          <div className="w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col rounded-2xl overflow-hidden animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-lg">
                <ShoppingCart className="w-5 h-5 text-amber-500" />
                <span>{lang === 'ar' ? 'قائمة الاستفسار وطلب السعر' : 'Systems Inquiry List'}</span>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {checkoutSubmitted ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold">{lang === 'ar' ? 'تم إرسال قائمة الاستفسار بنجاح!' : 'Inquiry List Submitted!'}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {lang === 'ar'
                      ? 'سيتواصل معك م. مالك حريبات أو م. عز الدين بدارين لتزويدك بعرض السعر الفني المخصص للأنظمة المحددة.'
                      : 'Eng. Malek or Eng. Ezzaddin will contact you with a customized technical quotation.'}
                  </p>
                  <button
                    onClick={() => { setCart([]); setCheckoutSubmitted(false); setIsCartOpen(false); }}
                    className="px-5 py-2 text-xs font-bold text-white energy-gradient rounded-xl"
                  >
                    {lang === 'ar' ? 'إغلاق القائمة' : 'Close List'}
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="text-center py-20 space-y-3 text-slate-400">
                  <ShoppingBag className="w-12 h-12 mx-auto opacity-40" />
                  <p className="text-sm">{lang === 'ar' ? 'قائمة الاستفسار فارغة' : 'Your inquiry list is empty'}</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                        <div className="space-y-1">
                          <h5 className="text-xs font-bold">{lang === 'ar' ? item.nameAr : item.nameEn}</h5>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-300">
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-mono font-bold w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-300">
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-4">
                    <button
                      onClick={() => setCheckoutSubmitted(true)}
                      className="w-full py-3 text-xs font-bold text-white energy-gradient rounded-xl shadow-lg hover:opacity-95 transition-all"
                    >
                      {lang === 'ar' ? 'إرسال القائمة للمهندسين (طلب عرض سعر)' : 'Send List to Engineers (Request Quote)'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {isWhatsAppOpen && (
          <div className="absolute bottom-16 right-0 w-72 glass-panel rounded-2xl p-4 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-3 mb-2 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="font-bold text-xs text-emerald-600 dark:text-emerald-400">
                {lang === 'ar' ? 'تواصل مع فريق الهندسة عبر واتساب' : 'Chat with Engineers via WhatsApp'}
              </span>
              <button onClick={() => setIsWhatsAppOpen(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <a
                href="https://wa.me/970594345464?text=%Dالسلام%20عليكم%2C%20أرغب%20بالاستفسار%20عن%20أنظمة%20الطاقة%20الشمسية%20وأجهزة%20Deye"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
              >
                <div className="font-bold text-xs text-emerald-800 dark:text-emerald-300">
                  {lang === 'ar' ? 'م. مالك حريبات' : 'Eng. Malek Hraibat'}
                </div>
                <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400" dir="ltr">0594345464</div>
              </a>

              <a
                href="https://wa.me/970599973304?text=%Dالسلام%20عليكم%2C%20أرغب%20بالاستفسار%20عن%20أنظمة%20الطاقة%20الشمسية%20وأجهزة%20Deye"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
              >
                <div className="font-bold text-xs text-emerald-800 dark:text-emerald-300">
                  {lang === 'ar' ? 'م. عز الدين بدارين' : 'Eng. Ezzaddin Badarin'}
                </div>
                <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400" dir="ltr">0599973304</div>
              </a>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsWhatsAppOpen(!isWhatsAppOpen)}
          className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl flex items-center justify-center transition-all hover:scale-105 group relative"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
            2
          </span>
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/Rawafed_Renewable_Energy_Logo_614c1e0c.png"
                alt="Logo"
                className="w-8 h-8 object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
              <span className="font-bold text-base">
                {lang === 'ar' ? 'شركة روافد لحلول الطاقة' : 'Rawafid Energy Solutions'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {lang === 'ar'
                ? 'إدارة: م. مالك حريبات (0594345464) • م. عز الدين بدارين (0599973304)'
                : 'Managed by: Eng. Malek Hraibat (0594345464) • Eng. Ezzaddin Badarin (0599973304)'}
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="text-sm font-bold">{lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h5>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-amber-600">{lang === 'ar' ? 'الرئيسية' : 'Home'}</button></li>
              <li><button onClick={() => setActiveTab('shop')} className="hover:text-amber-600">{lang === 'ar' ? 'معرض المنتجات' : 'Products Catalog'}</button></li>
              <li><button onClick={() => setActiveTab('bom-generator')} className="hover:text-amber-600">{lang === 'ar' ? 'حاسبة المكونات (BOM)' : 'System BOM Calculator'}</button></li>
              <li><button onClick={() => setActiveTab('contact')} className="hover:text-amber-600">{lang === 'ar' ? 'اتصل بنا' : 'Contact'}</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-sm font-bold">{lang === 'ar' ? 'العلامات التجارية المعتمدة' : 'Authorized Brands'}</h5>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><span>Jinko Solar Panels (440W - 720W)</span></li>
              <li><span>Deye Inverters & BESS</span></li>
              <li><span>Sungrow & Huawei Solar</span></li>
              <li><span>Schneider Breakers & Accessories</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-sm font-bold">{lang === 'ar' ? 'الاعتمادات والمعايير' : 'Certifications & Compliance'}</h5>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-1 rounded">ISO 9001</span>
              <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-1 rounded">ISO 14001</span>
              <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-1 rounded">IEC Certified</span>
              <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-1 rounded">IEEE Standards</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} {lang === 'ar' ? 'شركة روافد لحلول الطاقة. جميع الحقوق محفوظة.' : 'Rawafid Energy Solutions. All rights reserved.'}</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span>{lang === 'ar' ? 'الخصوصية والأمان' : 'Privacy & Security'}</span>
            <span>·</span>
            <span>{lang === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
