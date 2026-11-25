import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun, Battery, Cpu, Zap, Phone, Mail, MapPin, ChevronDown,
  Menu, X, ArrowRight, ArrowLeft, CheckCircle2, Send, Loader2,
  Shield, Wrench, BarChart3, Building2, Factory, Home, Sparkles,
  FileText, Calculator
} from 'lucide-react';

import heroImg from './assets/images/hero_solar_farm_1795365670898.jpg';
import industrialImg from './assets/images/industrial_rooftop_solar_1795365670538.jpg';
import batteryImg from './assets/images/battery_storage_system_1795365671063.jpg';
import smartGridImg from './assets/images/smart_grid_control_1795365670666.jpg';
import jinkoPanel from './assets/images/jinko_solar_panel_1795377362014.jpg';
import deyeInverter from './assets/images/deye_hybrid_inverter_1795377361793.jpg';
import deyeBattery from './assets/images/deye_bess_battery_1795377363514.jpg';
import accessories from './assets/images/solar_accessories_1795377362509.jpg';

type Lang = 'ar' | 'en';

const content = {
  ar: {
    dir: 'rtl' as const,
    brand: 'روافد لحلول الطاقة',
    brandEn: 'Rawafid Energy Solutions',
    nav: ['الرئيسية', 'خدماتنا', 'المنتجات', 'المستشار الذكي', 'عرض سعر', 'تواصل معنا'],
    heroTag: 'حلول طاقة متجددة متكاملة',
    heroTitle: 'نحوّل طاقتك إلى',
    heroTitleAccent: 'استثمار مستدام',
    heroDesc: 'نقدّم في روافد حلول الطاقة الشمسية الكهروضوئية، أنظمة تخزين الطاقة، والشبكات الذكية للقطاع السكني والتجاري والصناعي — بتصميم هندسي دقيق وتنفيذ احترافي.',
    heroCta: 'احصل على استشارة مجانية',
    heroCta2: 'استكشف خدماتنا',
    stats: [
      { value: '+500', label: 'مشروع منفذ' },
      { value: '+120', label: 'ميجاواط مركبة' },
      { value: '+98%', label: 'رضا العملاء' },
      { value: '24/7', label: 'دعم فني' },
    ],
    servicesTag: 'ماذا نقدم',
    servicesTitle: 'حلول هندسية متكاملة',
    servicesDesc: 'من الدراسة والتصميم إلى التركيب والتشغيل والصيانة، نوفر منظومة طاقة كاملة تناسب احتياجك.',
    services: [
      { icon: Sun, title: 'الطاقة الشمسية الكهروضوئية', desc: 'تصميم وتنفيذ أنظمة شمسية على الأسطح والأراضي بكفاءة عالية وعمر تشغيلي طويل.', img: industrialImg },
      { icon: Battery, title: 'أنظمة تخزين الطاقة (BESS)', desc: 'حلول بطاريات ليثيوم متقدمة لضمان استمرارية الطاقة وتقليل الاعتماد على الشبكة.', img: batteryImg },
      { icon: Cpu, title: 'الشبكات الذكية وإدارة الطاقة', desc: 'مراقبة وتحكم ذكي في استهلاك الطاقة لرفع الكفاءة وتقليل التكاليف التشغيلية.', img: smartGridImg },
    ],
    productsTag: 'منتجاتنا',
    productsTitle: 'معدات موثوقة من أفضل العلامات',
    products: [
      { img: jinkoPanel, name: 'ألواح جينكو الشمسية', spec: 'ألواح عالية الكفاءة بقدرة تصل إلى 720 واط، كفالة إنتاج 25 سنة.' },
      { img: deyeInverter, name: 'انفيرتر ديي الهجين', spec: 'انفيرترات هجينة ذكية بإدارة متقدمة للطاقة ودعم للشبكة والبطاريات.' },
      { img: deyeBattery, name: 'بطارية ديي BOS-G', spec: 'نظام تخزين ليثيوم آمن وقابل للتوسع مع ضمان طويل الأمد.' },
      { img: accessories, name: 'ملحقات الحماية والتركيب', spec: 'قواطع حماية، موصلات MC4، هياكل تركيب، وأنظمة حماية من الصواعق.' },
    ],
    whyTag: 'لماذا روافد',
    whyTitle: 'شريكك الموثوق في تحول الطاقة',
    why: [
      { icon: Shield, title: 'جودة مضمونة', desc: 'منتجات معتمدة وكفالات مصنعية طويلة الأمد.' },
      { icon: Wrench, title: 'تنفيذ احترافي', desc: 'فريق هندسي متخصص في التصميم والتركيب والتشغيل.' },
      { icon: BarChart3, title: 'عائد استثماري واضح', desc: 'دراسة جدوى دقيقة توضح التوفير وفترة الاسترداد.' },
      { icon: Sparkles, title: 'حلول مخصصة', desc: 'نصمم النظام حسب استهلاكك وميزانيتك وأهدافك.' },
    ],
    aiTag: 'المستشار الذكي',
    aiTitle: 'استشارة طاقة فورية بالذكاء الاصطناعي',
    aiDesc: 'أدخل بيانات منشأتك واحصل على توصية أولية من مستشار الطاقة الذكي الخاص بروافد.',
    aiForm: {
      facility: 'نوع المنشأة',
      facilityOptions: ['سكني', 'تجاري', 'صناعي', 'زراعي', 'أخرى'],
      bill: 'الفاتورة الشهرية التقريبية ($)',
      location: 'الموقع / المدينة',
      prompt: 'تفاصيل إضافية أو استفسارك',
      promptPlaceholder: 'مثال: أريد نظاماً شمسياً مع بطاريات لتغطية استهلاك منزلي...',
      submit: 'احصل على الاستشارة',
      loading: 'جارٍ تحليل طلبك...',
    },
    quoteTag: 'عرض سعر مبدئي',
    quoteTitle: 'ابنِ عرض السعر الخاص بك',
    quoteDesc: 'عدّل الكميات والأسعار لتحصل على تقدير مبدئي سريع. الأسعار قابلة للتعديل حسب المشروع.',
    quote: {
      customer: 'اسم العميل / المشروع',
      customerPh: 'مثال: مشروع مصنع الأمل',
      item: 'البند',
      spec: 'المواصفات',
      warranty: 'الكفالة',
      qty: 'الكمية',
      unit: 'سعر الوحدة ($)',
      total: 'الإجمالي ($)',
      grand: 'الإجمالي التقديري',
      currency: 'دولار أمريكي',
      note: '* هذا عرض تقديري مبدئي. السعر النهائي يعتمد على المعاينة الفنية والتصميم التفصيلي.',
      inverterName: 'انفيرتر (Inverter): ماركة ديي',
      inverterWarranty: '2 سنة ضمان',
      batteryName: 'بطارية تخزين (BESS): ماركة ديي',
      batteryWarranty: '10 سنوات ضمان',
      panelName: 'ألواح شمسية: ماركة جينكو',
      panelWarranty: '12 سنة مصنعية + 25 سنة كفالة إنتاج',
      structureName: 'هيكل تركيب (Structure)',
      structureWarranty: '15 سنة',
      protectionName: 'قواطع حماية DC/AC، موصلات MC4 وحماية صواعق DC SPD',
      protectionWarranty: '5 سنوات استبدال',
      laborName: 'أجور التركيب وفريق المهندسين والفحص والتشغيل',
      laborWarranty: 'كفالة تركيب وتشغيل',
    },
    contactTag: 'تواصل معنا',
    contactTitle: 'لنبدأ مشروع الطاقة الخاص بك',
    contactDesc: 'فريقنا الهندسي جاهز لدراسة احتياجك وتقديم الحل الأنسب.',
    contactInfo: [
      { icon: Phone, label: 'الهاتف', value: '+970 59 000 0000', href: 'tel:+970590000000' },
      { icon: Mail, label: 'البريد الإلكتروني', value: 'info@rawafid.ps', href: 'mailto:info@rawafid.ps' },
      { icon: MapPin, label: 'الموقع', value: 'فلسطين', href: 'https://www.google.com/maps/search/?api=1&query=Palestine' },
    ],
    footer: '© 2026 شركة روافد لحلول الطاقة. جميع الحقوق محفوظة.',
  },
  en: {
    dir: 'ltr' as const,
    brand: 'Rawafid Energy Solutions',
    brandEn: 'روافد لحلول الطاقة',
    nav: ['Home', 'Services', 'Products', 'AI Consultant', 'Quotation', 'Contact'],
    heroTag: 'Integrated Renewable Energy Solutions',
    heroTitle: 'Turn Your Energy Into a',
    heroTitleAccent: 'Sustainable Investment',
    heroDesc: 'Rawafid delivers solar PV systems, battery energy storage, and smart grid solutions for residential, commercial, and industrial sectors — engineered with precision and executed professionally.',
    heroCta: 'Get a Free Consultation',
    heroCta2: 'Explore Services',
    stats: [
      { value: '500+', label: 'Projects Delivered' },
      { value: '120+ MW', label: 'Installed Capacity' },
      { value: '98%+', label: 'Client Satisfaction' },
      { value: '24/7', label: 'Technical Support' },
    ],
    servicesTag: 'What We Do',
    servicesTitle: 'Integrated Engineering Solutions',
    servicesDesc: 'From feasibility study and design to installation, commissioning, and maintenance — we deliver a complete energy system tailored to your needs.',
    services: [
      { icon: Sun, title: 'Solar PV Systems', desc: 'High-efficiency rooftop and ground-mount solar systems designed for long-term performance.', img: industrialImg },
      { icon: Battery, title: 'Battery Energy Storage (BESS)', desc: 'Advanced lithium storage solutions for energy continuity and reduced grid dependence.', img: batteryImg },
      { icon: Cpu, title: 'Smart Grid & Energy Management', desc: 'Intelligent monitoring and control to maximize efficiency and reduce operating costs.', img: smartGridImg },
    ],
    productsTag: 'Our Products',
    productsTitle: 'Trusted Equipment from Leading Brands',
    products: [
      { img: jinkoPanel, name: 'Jinko Solar Panels', spec: 'High-efficiency modules up to 720W with a 25-year production warranty.' },
      { img: deyeInverter, name: 'Deye Hybrid Inverter', spec: 'Smart hybrid inverters with advanced energy management for grid and battery support.' },
      { img: deyeBattery, name: 'Deye BOS-G Battery', spec: 'Safe, scalable lithium storage system with long-term warranty coverage.' },
      { img: accessories, name: 'Protection & Mounting Accessories', spec: 'DC/AC protection, MC4 connectors, mounting structures, and surge protection.' },
    ],
    whyTag: 'Why Rawafid',
    whyTitle: 'Your Trusted Partner in Energy Transition',
    why: [
      { icon: Shield, title: 'Guaranteed Quality', desc: 'Certified products backed by long manufacturer warranties.' },
      { icon: Wrench, title: 'Professional Execution', desc: 'Specialized engineering team for design, installation, and commissioning.' },
      { icon: BarChart3, title: 'Clear ROI', desc: 'Accurate feasibility studies showing savings and payback period.' },
      { icon: Sparkles, title: 'Tailored Solutions', desc: 'Systems designed around your consumption, budget, and goals.' },
    ],
    aiTag: 'AI Consultant',
    aiTitle: 'Instant Energy Consultation with AI',
    aiDesc: 'Enter your facility details and get an initial recommendation from Rawafid\'s AI energy consultant.',
    aiForm: {
      facility: 'Facility Type',
      facilityOptions: ['Residential', 'Commercial', 'Industrial', 'Agricultural', 'Other'],
      bill: 'Approx. Monthly Bill ($)',
      location: 'Location / City',
      prompt: 'Additional details or question',
      promptPlaceholder: 'e.g. I want a solar system with batteries to cover my home consumption...',
      submit: 'Get Consultation',
      loading: 'Analyzing your request...',
    },
    quoteTag: 'Quick Quotation',
    quoteTitle: 'Build Your Preliminary Quote',
    quoteDesc: 'Adjust quantities and unit prices for a quick preliminary estimate. Prices are editable per project.',
    quote: {
      customer: 'Client / Project Name',
      customerPh: 'e.g. Al-Amal Factory Project',
      item: 'Item',
      spec: 'Specification',
      warranty: 'Warranty',
      qty: 'Qty',
      unit: 'Unit Price ($)',
      total: 'Total ($)',
      grand: 'Estimated Total',
      currency: 'USD',
      note: '* This is a preliminary estimate. Final pricing depends on site survey and detailed engineering design.',
      inverterName: 'Inverter: Deye',
      inverterWarranty: '2 Years Warranty',
      batteryName: 'Battery Storage (BESS): Deye',
      batteryWarranty: '10 Years Warranty',
      panelName: 'Solar Panels: Jinko',
      panelWarranty: '12 Years Product + 25 Years Performance Warranty',
      structureName: 'Mounting Structure',
      structureWarranty: '15 Years',
      protectionName: 'DC/AC Protection, MC4 Connectors, DC SPD Surge Protection',
      protectionWarranty: '5 Years Replacement',
      laborName: 'Installation, Engineering, Testing & Commissioning',
      laborWarranty: 'Installation & Commissioning Warranty',
    },
    contactTag: 'Contact Us',
    contactTitle: 'Let\'s Start Your Energy Project',
    contactDesc: 'Our engineering team is ready to assess your needs and deliver the right solution.',
    contactInfo: [
      { icon: Phone, label: 'Phone', value: '+970 59 000 0000', href: 'tel:+970590000000' },
      { icon: Mail, label: 'Email', value: 'info@rawafid.ps', href: 'mailto:info@rawafid.ps' },
      { icon: MapPin, label: 'Location', value: 'Palestine', href: 'https://www.google.com/maps/search/?api=1&query=Palestine' },
    ],
    footer: '© 2026 Rawafid Energy Solutions. All rights reserved.',
  },
};

interface QuoteRow {
  id: string;
  name: string;
  warranty: string;
  qty: number;
  unit: number;
}

function makeRows(lang: Lang): QuoteRow[] {
  const q = content[lang].quote;
  return [
    { id: 'inv', name: q.inverterName, warranty: q.inverterWarranty, qty: 1, unit: 0 },
    { id: 'bat', name: q.batteryName, warranty: q.batteryWarranty, qty: 1, unit: 0 },
    { id: 'panel', name: q.panelName, warranty: q.panelWarranty, qty: 20, unit: 180 },
    { id: 'struct', name: q.structureName, warranty: q.structureWarranty, qty: 1, unit: 2500 },
    { id: 'prot', name: q.protectionName, warranty: q.protectionWarranty, qty: 1, unit: 950 },
    { id: 'labor', name: q.laborName, warranty: q.laborWarranty, qty: 1, unit: 1500 },
  ];
}

export default function App() {
  const [lang, setLang] = useState<Lang>('ar');
  const t = content[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // AI consultant state
  const [facility, setFacility] = useState('');
  const [bill, setBill] = useState('');
  const [location, setLocation] = useState('');
  const [prompt, setPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState('');
  const [aiError, setAiError] = useState('');

  // Quotation state
  const [customer, setCustomer] = useState('');
  const [rows, setRows] = useState<QuoteRow[]>(() => makeRows('ar'));

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reset rows when language changes, preserving numeric values
  const prevLang = useRef(lang);
  useEffect(() => {
    if (prevLang.current !== lang) {
      prevLang.current = lang;
      setRows((old) => {
        const fresh = makeRows(lang);
        return fresh.map((r, i) => ({ ...r, qty: old[i]?.qty ?? r.qty, unit: old[i]?.unit ?? r.unit }));
      });
      setFacility('');
    }
  }, [lang]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navIds = ['home', 'services', 'products', 'ai', 'quote', 'contact'];

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    setAiLoading(true);
    setAiResult('');
    setAiError('');
    try {
      const res = await fetch('/api/gemini/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, facilityType: facility, monthlyBill: bill, location, language: lang }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Request failed');
      setAiResult(data.text || '');
    } catch (err: any) {
      setAiError(err.message || 'Something went wrong');
    } finally {
      setAiLoading(false);
    }
  };

  const updateRow = (id: string, field: 'qty' | 'unit', value: number) => {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const grandTotal = rows.reduce((s, r) => s + r.qty * r.unit, 0);
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/70' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => scrollTo('home')} className="flex items-center gap-3 shrink-0">
              <img src="/assets/aistudio/Rawafed_Renewable_Energy_Logo_614c1e0c.png" alt="Rawafid" className="h-12 w-auto object-contain" />
              <div className={`hidden sm:block ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className="font-extrabold text-[#0b2545] text-lg leading-tight">{t.brand}</div>
                <div className="text-[11px] text-slate-500 tracking-wide">{t.brandEn}</div>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {t.nav.map((label, i) => (
                <button key={label} onClick={() => scrollTo(navIds[i])} className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-[#0b2545] hover:bg-slate-100 rounded-lg transition-colors">
                  {label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang((l) => (l === 'ar' ? 'en' : 'ar'))}
                className="px-3 py-2 text-sm font-bold rounded-lg border border-slate-200 hover:border-amber-400 hover:text-amber-600 bg-white transition-colors"
              >
                {lang === 'ar' ? 'EN' : 'عربي'}
              </button>
              <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-700">
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-t border-slate-100 overflow-hidden">
              <div className="px-4 py-4 flex flex-col gap-1">
                {t.nav.map((label, i) => (
                  <button key={label} onClick={() => scrollTo(navIds[i])} className="px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg text-start">
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-[92vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
          <div className={`absolute inset-0 ${lang === 'ar' ? 'bg-gradient-to-l from-[#0b2545]/92 via-[#0b2545]/75 to-[#0b2545]/35' : 'bg-gradient-to-r from-[#0b2545]/92 via-[#0b2545]/75 to-[#0b2545]/35'}`} />
          <div className="absolute inset-0 hero-glow" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-sm font-semibold mb-6">
              <Zap size={16} /> {t.heroTag}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] mb-6">
              {t.heroTitle}{' '}
              <span className="text-amber-400">{t.heroTitleAccent}</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-200/90 leading-relaxed mb-10 max-w-2xl">
              {t.heroDesc}
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo('ai')} className="inline-flex items-center gap-2 px-7 py-4 bg-amber-500 hover:bg-amber-400 text-[#0b2545] font-bold rounded-xl transition-colors shadow-lg shadow-amber-500/25">
                {t.heroCta} <Arrow size={18} />
              </button>
              <button onClick={() => scrollTo('services')} className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-colors backdrop-blur-sm">
                {t.heroCta2}
              </button>
            </div>
          </motion.div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
            {t.stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-5 text-center">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">{s.value}</div>
                <div className="text-sm text-slate-200 mt-1 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-amber-600 font-bold text-sm tracking-wide mb-3">{t.servicesTag}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b2545] mb-4">{t.servicesTitle}</h2>
            <p className="text-slate-600 text-lg">{t.servicesDesc}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300">
                  <div className="h-52 overflow-hidden">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-7">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-[#0b2545] mb-3">{s.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-amber-600 font-bold text-sm tracking-wide mb-3">{t.whyTag}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b2545]">{t.whyTitle}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.why.map((w, i) => {
              const Icon = w.icon;
              return (
                <motion.div key={w.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="w-11 h-11 rounded-xl bg-[#0b2545] text-amber-400 flex items-center justify-center mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-bold text-[#0b2545] mb-2">{w.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{w.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-amber-600 font-bold text-sm tracking-wide mb-3">{t.productsTag}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b2545]">{t.productsTitle}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.products.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="h-48 bg-white flex items-center justify-center p-4 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-contain" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#0b2545] mb-2">{p.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{p.spec}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI CONSULTANT */}
      <section id="ai" className="py-24 bg-[#0b2545] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 80% 20%, #38bdf8 0%, transparent 40%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-flex items-center gap-2 text-amber-400 font-bold text-sm tracking-wide mb-3"><Sparkles size={16} /> {t.aiTag}</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{t.aiTitle}</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">{t.aiDesc}</p>
              <div className="space-y-4">
                {[
                  { icon: Building2, text: lang === 'ar' ? 'تحليل أولي حسب نوع المنشأة والاستهلاك' : 'Initial analysis based on facility type and consumption' },
                  { icon: BarChart3, text: lang === 'ar' ? 'توصيات تقنية مناسبة لاحتياجك' : 'Technical recommendations tailored to your needs' },
                  { icon: Shield, text: lang === 'ar' ? 'مقترح مبدئي من فريق روافد الهندسي' : 'Preliminary proposal by Rawafid engineering team' },
                ].map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.text} className="flex items-center gap-3 text-slate-200">
                      <span className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-amber-400 shrink-0"><Icon size={20} /></span>
                      <span>{b.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl">
              <form onSubmit={handleConsult} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.aiForm.facility}</label>
                  <div className="relative">
                    <select value={facility} onChange={(e) => setFacility(e.target.value)} className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400">
                      <option value="">{lang === 'ar' ? 'اختر نوع المنشأة' : 'Select facility type'}</option>
                      {t.aiForm.facilityOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <ChevronDown size={18} className={`absolute top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none ${lang === 'ar' ? 'left-3' : 'right-3'}`} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.aiForm.bill}</label>
                    <input value={bill} onChange={(e) => setBill(e.target.value)} type="text" inputMode="numeric" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.aiForm.location}</label>
                    <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder={lang === 'ar' ? 'الخليل' : 'Hebron'} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.aiForm.prompt}</label>
                  <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none" placeholder={t.aiForm.promptPlaceholder} />
                </div>
                <button type="submit" disabled={aiLoading} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-[#0b2545] font-bold rounded-xl transition-colors">
                  {aiLoading ? <><Loader2 size={18} className="animate-spin" /> {t.aiForm.loading}</> : <><Send size={18} /> {t.aiForm.submit}</>}
                </button>
              </form>

              {aiError && (
                <div className="mt-4 p-4 rounded-xl bg-red-50 text-red-700 text-sm border border-red-100">
                  {aiError}
                </div>
              )}
              {aiResult && (
                <div className="mt-4 p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-[#0b2545] font-bold mb-3">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    {lang === 'ar' ? 'توصية المستشار' : 'Consultant Recommendation'}
                  </div>
                  <div className="text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">{aiResult}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* QUOTATION */}
      <section id="quote" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 text-amber-600 font-bold text-sm tracking-wide mb-3"><Calculator size={16} /> {t.quoteTag}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b2545] mb-4">{t.quoteTitle}</h2>
            <p className="text-slate-600 text-lg">{t.quoteDesc}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 sm:items-end sm:justify-between">
              <div className="flex-1 max-w-md">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5"><FileText size={14} className="inline me-1" />{t.quote.customer}</label>
                <input value={customer} onChange={(e) => setCustomer(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder={t.quote.customerPh} />
              </div>
              <div className="text-sm text-slate-500">
                {new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="bg-[#0b2545] text-white">
                    <th className="text-start px-4 py-4 font-semibold">{t.quote.item}</th>
                    <th className="text-start px-4 py-4 font-semibold">{t.quote.warranty}</th>
                    <th className="text-center px-4 py-4 font-semibold w-28">{t.quote.qty}</th>
                    <th className="text-center px-4 py-4 font-semibold w-36">{t.quote.unit}</th>
                    <th className="text-center px-4 py-4 font-semibold w-32">{t.quote.total}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                      <td className="px-4 py-4 text-slate-800 font-medium">{r.name}</td>
                      <td className="px-4 py-4 text-slate-500">{r.warranty}</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min={0}
                          value={r.qty}
                          onChange={(e) => updateRow(r.id, 'qty', Math.max(0, Number(e.target.value)))}
                          className="w-20 mx-auto block text-center rounded-lg border border-slate-200 bg-white px-2 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min={0}
                          value={r.unit}
                          onChange={(e) => updateRow(r.id, 'unit', Math.max(0, Number(e.target.value)))}
                          className="w-28 mx-auto block text-center rounded-lg border border-slate-200 bg-white px-2 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </td>
                      <td className="px-4 py-4 text-center font-bold text-[#0b2545]">{(r.qty * r.unit).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-amber-50 border-t border-amber-100">
                    <td colSpan={4} className="px-4 py-5 font-bold text-[#0b2545] text-base">{t.quote.grand} ({t.quote.currency})</td>
                    <td className="px-4 py-5 text-center font-black text-xl text-amber-600">{grandTotal.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-sm text-slate-500">
              {t.quote.note}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-amber-600 font-bold text-sm tracking-wide mb-3">{t.contactTag}</span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0b2545] mb-4">{t.contactTitle}</h2>
              <p className="text-slate-600 text-lg mb-8">{t.contactDesc}</p>
              <div className="space-y-4">
                {t.contactInfo.map((c) => {
                  const Icon = c.icon;
                  return (
                    <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/30 transition-colors group">
                      <span className="w-12 h-12 rounded-xl bg-[#0b2545] text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"><Icon size={22} /></span>
                      <div>
                        <div className="text-sm text-slate-500">{c.label}</div>
                        <div className="font-semibold text-slate-800" dir="ltr">{c.value}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-amber-100 rounded-3xl -z-10 rotate-2" />
              <img src={industrialImg} alt="Rawafid Energy Project" className="rounded-2xl shadow-xl w-full h-[420px] object-cover" />
              <div className="absolute bottom-6 start-6 end-6 bg-white/95 backdrop-blur rounded-xl p-5 shadow-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0"><Sun size={24} /></div>
                  <div>
                    <div className="font-bold text-[#0b2545]">{lang === 'ar' ? 'حلول طاقة مصممة لمستقبلك' : 'Energy Solutions Built for Your Future'}</div>
                    <div className="text-sm text-slate-500">{lang === 'ar' ? 'سكني • تجاري • صناعي' : 'Residential • Commercial • Industrial'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0b2545] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/assets/aistudio/Rawafed_Renewable_Energy_Logo_614c1e0c.png" alt="Rawafid" className="h-11 w-auto bg-white/95 rounded-lg p-1" />
            <div>
              <div className="font-bold">{t.brand}</div>
              <div className="text-xs text-slate-300">{t.brandEn}</div>
            </div>
          </div>
          <p className="text-sm text-slate-300 text-center">{t.footer}</p>
        </div>
      </footer>
    </div>
  );
}
