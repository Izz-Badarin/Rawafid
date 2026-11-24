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
  Download,
  Lock,
  Unlock,
  Settings,
  Printer
} from 'lucide-react';

interface CartItem {
  id: number;
  nameAr: string;
  nameEn: string;
  quantity: number;
  image: string;
  price?: number;
}

interface Product {
  id: number;
  nameAr: string;
  nameEn: string;
  category: string;
  image: string;
  descAr: string;
  descEn: string;
  price: number;
}

interface CustomItem {
  id: number;
  name: string;
  warranty: string;
  qty: number;
  price: number;
}

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'calculator' | 'bom-generator' | 'shop' | 'ai-consultant' | 'projects' | 'contact' | 'admin' | 'quotation-builder' | 'special-offers'>('home');

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [adminUsername, setAdminUsername] = useState<string>('');
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [showPricesPublic, setShowPricesPublic] = useState<boolean>(false);

  // Quotation Builder State (Including Terms & Warranties from Bit Power PDF)
  const [quotation, setQuotation] = useState({
    clientName: 'شركة النور الصناعية',
    clientPhone: '0590000000',
    clientAddress: 'الخليل، رابود - دورا',
    projectName: 'عرض سعر نظام طاقة شمسية متكامل',
    issueDate: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 10*86400000).toISOString().split('T')[0],
    
    // Currency & Visibility options
    currency: 'USD',
    showLinePrices: true,
    showTerms: true, // Show or hide terms & conditions in PDF proposal

    // Inverter
    inverterName: 'انفيرتر (Inverter): ماركة Deye بقدرة 50 كيلوواط 3 فاز',
    inverterWarranty: '2 سنة على الانفيرتر',
    inverterQty: 1,
    inverterPrice: 6800,

    // Battery / BESS
    batteryName: 'بطارية تخزين (Lithium Battery): ماركة Deye BOS-G بسعة تخزين عالية',
    batteryWarranty: '10 سنوات للبطارية',
    batteryQty: 1,
    batteryPrice: 14500,

    // Solar Panels
    panelName: 'الواح شمسية: ماركة JINKO بقدرة 720 واط ذات كفاءة وعمر تشغيلي عالي',
    panelWarranty: '12 سنة مصنعية + 25 سنة كفالة إنتاج',
    panelQty: 70,
    panelPrice: 275,

    // Accessories & Structure
    structureName: 'هياكل تركيب معدني ألمنيوم مقاوم للصدأ والعوامل الجوية',
    structureWarranty: '15 سنة ضد التآكل',
    structureQty: 1,
    structurePrice: 2500,

    // Breakers & Protection
    protectionName: 'قواطع حماية DC/AC، موصلات MC4 وحماية صواعق DC SPD',
    protectionWarranty: '5 سنوات استبدال',
    protectionQty: 1,
    protectionPrice: 950,

    // Labor & Engineering Wages
    laborName: 'أجور التركيب وفريق المهندسين والفحص والتشغيل',
    laborWarranty: 'كفالة تركيب وتشغيل',
    laborQty: 1,
    laborPrice: 1500,

    // Financials & Terms from PDF
    discount: 500,
    paymentTerms: 'الدفع نقدا / حسب الاتفاق',
    notes: 'يشمل التركيب والفحص والتشغيل وبرمجة نظام المراقبة عبر الواي فاي.',
    
    // Detailed Terms (Editable)
    termsText: `1. تكون جميع الكفاالت المذكورة اعلاه خاضعة ومقيدة بالكامل، وفقا لشروط واحكام الشركات المصنعة للأجهزة والمعدات.
2. ان الانتاجية المتوقعة للنظام المذكور تم حسابها ضمن الظروف والمقاييس المعيارية العالمية وقد تتأثر كفاءة هذا الانتاج صعودا او هبوطا تبعا لتغير الظروف الجوية والبيئية المحيطة.
3. تكون حسابات الطاقة والانتجاية المتوقعة للنظام مرتبطة ومقيدة بحد وكفاءة الاجهزة والبطاريات والالواح المذكورة في ورقة البيانات الفنية (DATA SHEET) الخاصة بكل منها.
4. تنحصر مسؤولية الشركة الفنية والقانونية في تحقيق الانتاجية المتوقعة للنظام، ولا تتحمل الشركة اي مسؤولية تجاه قيمة او كمية استهلاك الزبون الفعلي للكهرباء.
5. تخل الشركة مسؤوليتها تماما ولا تتحمل اي تبعات ناتجة عن وجود اخطاء او مشاكل كهربائية مسبقة او خاصة بالمبنى نفسه.
6. السعر المعروض نهائي وشامل ضريبة القيمة المضافة.
7. يعتبر هذا العرض ساري المفعول لمدة 10 أيام من تاريخ اصدار العرض وبعد ذلك يمكن أن تطرأ تغيرات على الأسعار بناء على الظروف السوقية.
8. لا تتحمل الشركة مسؤولية اي اعمال تخريب او تكسير او حوادث طبيعية او اي عبث وتعديل في اعدادات النظام من قبل اي أطراف خارجية خارج الطاقم الفني المعتمد للشركة.
9. تزامنا مع حرصنا على جودة واستدامة الاداء، تتعهد الشركة بالمتابعة والمراقبة الحثيثة للنظام لمدة ثلاثة (3) شهور كاملة من تاريخ التشغيل الفعلي، للتأكد من عمل النظام بأقصى كفاءة انتاجية، ومراقبة مستويات الاستقرار، وحل اي مشاكل تقنية قد تظهر فوراً لضمان تشغيل آمن ومستدام.`
  });

  // Custom Extra Items (e.g. ATS Breakers)
  const [customItems, setCustomItems] = useState<CustomItem[]>([
    { id: 1, name: 'قواطع تحويل آلي ATS Panel 3-Phase 100A', warranty: '3 Years Warranty', qty: 1, price: 1200 }
  ]);
  const [newCustomName, setNewCustomName] = useState<string>('');
  const [newCustomWarranty, setNewCustomWarranty] = useState<string>('1 Year Warranty');
  const [newCustomQty, setNewCustomQty] = useState<number>(1);
  const [newCustomPrice, setNewCustomPrice] = useState<number>(300);

  const addCustomItem = () => {
    if (!newCustomName.trim()) return;
    setCustomItems(prev => [
      ...prev,
      {
        id: Date.now(),
        name: newCustomName,
        warranty: newCustomWarranty,
        qty: newCustomQty,
        price: newCustomPrice
      }
    ]);
    setNewCustomName('');
  };

  const removeCustomItem = (id: number) => {
    setCustomItems(prev => prev.filter(item => item.id !== id));
  };

  // Saved Quotation Templates State
  const [savedTemplates, setSavedTemplates] = useState<any[]>([
    {
      id: 1,
      name: 'نظام 50 كيلوواط صناعي (Deye + Jinko)',
      quotation: { ...quotation },
      customItems: [...customItems]
    }
  ]);
  const [templateNameInput, setTemplateNameInput] = useState<string>('');

  const saveCurrentTemplate = () => {
    if (!templateNameInput.trim()) return;
    setSavedTemplates(prev => [
      ...prev,
      {
        id: Date.now(),
        name: templateNameInput,
        quotation: JSON.parse(JSON.stringify(quotation)),
        customItems: JSON.parse(JSON.stringify(customItems))
      }
    ]);
    setTemplateNameInput('');
  };

  const loadTemplate = (tmpl: any) => {
    setQuotation(JSON.parse(JSON.stringify(tmpl.quotation)));
    setCustomItems(JSON.parse(JSON.stringify(tmpl.customItems || [])));
  };

  const deleteTemplate = (id: number) => {
    setSavedTemplates(prev => prev.filter(t => t.id !== id));
  };

  const sendQuotationWhatsApp = () => {
    const text = encodeURIComponent(
      `☀️ *شركة روافد لحلول الطاقة* ☀️\n` +
      `📌 *عرض سعر رسمي: ${quotation.projectName}*\n` +
      `👤 *الزبون:* ${quotation.clientName}\n` +
      `📞 *هاتف:* ${quotation.clientPhone}\n` +
      `📍 *العنوان:* ${quotation.clientAddress}\n` +
      `📅 *التاريخ:* ${quotation.issueDate}\n\n` +
      `⚙️ *المكونات الرئيسية:*\n` +
      `• ${quotation.inverterName} (العدد: ${quotation.inverterQty})\n` +
      `• ${quotation.batteryName} (العدد: ${quotation.batteryQty})\n` +
      `• ${quotation.panelName} (العدد: ${quotation.panelQty})\n` +
      `• ${quotation.structureName}\n` +
      `• ${quotation.protectionName}\n` +
      `• ${quotation.laborName}\n\n` +
      `💰 *المجموع النهائي:* ${totalQuotationAmount.toLocaleString()} ${currencySymbol}\n\n` +
      `إدارة: م. مالك حريبات (0594345464) • م. عز الدين بدارين (0599973304)`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

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

  // Quote & Site Survey Form State
  const [quoteForm, setQuoteForm] = useState({ name: '', company: '', email: '', phone: '', details: '', surveyDate: '' });
  const [quoteSubmitted, setQuoteSubmitted] = useState<boolean>(false);
  const [inquiriesList, setInquiriesList] = useState<any[]>([]);

  // Special Solar System Offers State & Handlers
  interface SpecialOffer {
    id: number;
    titleAr: string;
    titleEn: string;
    systemKw: number;
    inverter: string;
    batteries: string;
    panels: string;
    price: number;
    currency: string;
    descAr: string;
    descEn: string;
  }

  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>([
    {
      id: 1,
      titleAr: 'عروض نظام تجاري هجين 50 كيلوواط (Deye + Jinko)',
      titleEn: '50kW Commercial Hybrid System Offer',
      systemKw: 50,
      inverter: 'Deye 50kW 3-Phase Hybrid Inverter',
      batteries: 'Deye BOS-G High Voltage Lithium Battery BESS',
      panels: '70x Jinko Tiger Neo 720W Monofacial PV Modules',
      price: 24500,
      currency: 'USD',
      descAr: 'عرض خاص ومميز للمصانع والمنشآت التجارية. يشمل التركيب، الفحص، التشغيل، وبرمجة نظام المراقبة الذكي عبر الواي فاي.',
      descEn: 'Special commercial package including installation, testing, and smart Wi-Fi monitoring.',
    },
    {
      id: 2,
      titleAr: 'عرض نظام منزلي متكامل 10 كيلوواط',
      titleEn: '10kW Residential Complete System Offer',
      systemKw: 10,
      inverter: 'Deye 10kW Single Phase Hybrid Inverter',
      batteries: 'Deye 10kWh Wall-Mounted Lithium Battery',
      panels: '16x Jinko 620W High Efficiency Panels',
      price: 6800,
      currency: 'USD',
      descAr: 'النظام المثالي للمنازل، يضمن تغطية كاملة وتخزين ليلي آمن وكفالة معتمدة.',
      descEn: 'Ideal home solar system with reliable night backup and full warranty.',
    }
  ]);

  const [newOfferTitleAr, setNewOfferTitleAr] = useState('');
  const [newOfferTitleEn, setNewOfferTitleEn] = useState('');
  const [newOfferKw, setNewOfferKw] = useState(30);
  const [newOfferInverter, setNewOfferInverter] = useState('Deye 30kW Hybrid');
  const [newOfferBatteries, setNewOfferBatteries] = useState('Deye Lithium BESS');
  const [newOfferPanels, setNewOfferPanels] = useState('42x Jinko 720W Panels');
  const [newOfferPrice, setNewOfferPrice] = useState(15000);
  const [newOfferCurrency, setNewOfferCurrency] = useState('USD');
  const [newOfferDescAr, setNewOfferDescAr] = useState('');
  const [newOfferDescEn, setNewOfferDescEn] = useState('');
  const [editingOfferId, setEditingOfferId] = useState<number | null>(null);

  const handleSaveOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOfferTitleAr.trim()) return;

    if (editingOfferId !== null) {
      setSpecialOffers(prev => prev.map(o => o.id === editingOfferId ? {
        ...o,
        titleAr: newOfferTitleAr,
        titleEn: newOfferTitleEn || newOfferTitleAr,
        systemKw: newOfferKw,
        inverter: newOfferInverter,
        batteries: newOfferBatteries,
        panels: newOfferPanels,
        price: newOfferPrice,
        currency: newOfferCurrency,
        descAr: newOfferDescAr,
        descEn: newOfferDescEn || newOfferDescAr
      } : o));
      setEditingOfferId(null);
    } else {
      setSpecialOffers(prev => [
        ...prev,
        {
          id: Date.now(),
          titleAr: newOfferTitleAr,
          titleEn: newOfferTitleEn || newOfferTitleAr,
          systemKw: newOfferKw,
          inverter: newOfferInverter,
          batteries: newOfferBatteries,
          panels: newOfferPanels,
          price: newOfferPrice,
          currency: newOfferCurrency,
          descAr: newOfferDescAr,
          descEn: newOfferDescEn || newOfferDescAr
        }
      ]);
    }
    setNewOfferTitleAr('');
    setNewOfferTitleEn('');
    setNewOfferDescAr('');
    setNewOfferDescEn('');
  };

  const handleEditOffer = (offer: SpecialOffer) => {
    setEditingOfferId(offer.id);
    setNewOfferTitleAr(offer.titleAr);
    setNewOfferTitleEn(offer.titleEn);
    setNewOfferKw(offer.systemKw);
    setNewOfferInverter(offer.inverter);
    setNewOfferBatteries(offer.batteries);
    setNewOfferPanels(offer.panels);
    setNewOfferPrice(offer.price);
    setNewOfferCurrency(offer.currency);
    setNewOfferDescAr(offer.descAr);
    setNewOfferDescEn(offer.descEn);
  };

  const handleDeleteOffer = (id: number) => {
    setSpecialOffers(prev => prev.filter(o => o.id !== id));
  };

  // Shop & Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [shopCategory, setShopCategory] = useState<string>('all');
  const [checkoutSubmitted, setCheckoutSubmitted] = useState<boolean>(false);

  // Editable Products Catalog State
  const [products, setProducts] = useState<Product[]>([
    {
      id: 101,
      nameAr: 'عاكس ديي هجين أحادي الطور 5 كيلوواط (Deye 5kW)',
      nameEn: 'Deye 5kW Single-Phase Hybrid Inverter (SUN-5K-SG03LP1)',
      category: 'deye',
      image: '/src/assets/images/deye_hybrid_inverter_1795377361793.jpg',
      descAr: 'عاكس ديي هجين مع دعم بطاريات 48 فولت ومراقبة واي فاي مدمجة.',
      descEn: 'Deye single-phase hybrid inverter with 48V battery support and built-in WiFi.',
      price: 1250
    },
    {
      id: 102,
      nameAr: 'عاكس ديي هجين أحادي الطور 8 كيلوواط (Deye 8kW)',
      nameEn: 'Deye 8kW Hybrid Inverter (SUN-8K-SG04LP1)',
      category: 'deye',
      image: '/src/assets/images/deye_hybrid_inverter_1795377361793.jpg',
      descAr: 'قدرة عالية على التحمل، دعم تفريغ وشحن عالي وتيار مستمر كبير.',
      descEn: 'High capacity hybrid inverter with high charge/discharge current.',
      price: 1850
    },
    {
      id: 103,
      nameAr: 'عاكس ديي هجين ثلاثي الطور 12 كيلوواط (Deye 12kW 3-Phase)',
      nameEn: 'Deye 12kW Three-Phase Hybrid Inverter (SUN-12K-SG04LP3)',
      category: 'deye',
      image: '/src/assets/images/deye_hybrid_inverter_1795377361793.jpg',
      descAr: 'انفيرتر ثلاثي الطور للمنازل الكبيرة والمنشآت التجارية مع كفاءة تحويل فائقة.',
      descEn: 'Three-phase hybrid inverter for large residential and commercial sites.',
      price: 2450
    },
    {
      id: 104,
      nameAr: 'عاكس ديي ثلاثي الطور تجاري 50 كيلوواط (Deye 50kW)',
      nameEn: 'Deye 50kW Commercial Three-Phase Inverter',
      category: 'deye',
      image: '/src/assets/images/deye_hybrid_inverter_1795377361793.jpg',
      descAr: 'حل صناعي متكامل للمصانع والمشاريع التجارية الكبرى بمواصفات حماية متقدمة.',
      descEn: 'Commercial industrial grade inverter for large factories and utility scale.',
      price: 6800
    },
    {
      id: 105,
      nameAr: 'خزان بطاريات ديي ليثيوم عالية الجهد (Deye BOS-G 61.4kWh)',
      nameEn: 'Deye BOS-G High Voltage Lithium Battery 61.4kWh',
      category: 'deye',
      image: '/src/assets/images/deye_bess_battery_1795377363514.jpg',
      descAr: 'نظام تخزين بطاريات ديي ليثيوم آيوني عالي الجهد للمشاريع الكبرى والتجارية.',
      descEn: 'High-voltage modular lithium battery storage system for commercial applications.',
      price: 14500
    },
    {
      id: 201,
      nameAr: 'لوح شمسي جينكو تايغر نيو 440 واط (سكني)',
      nameEn: 'Jinko Tiger Neo N-Type 440W (Residential)',
      category: 'jinko',
      image: '/src/assets/images/jinko_solar_panel_1795377362014.jpg',
      descAr: 'مقاس مثالي للأسطح السكنية بمظهر أنيق وكفاءة عالية في الإضاءة المنخفضة.',
      descEn: 'Compact residential size with elegant black frame and low-light performance.',
      price: 145
    },
    {
      id: 202,
      nameAr: 'لوح شمسي جينكو تايغر نيو 580 واط (تجاري)',
      nameEn: 'Jinko Tiger Neo N-Type 580W (Commercial)',
      category: 'jinko',
      image: '/src/assets/images/jinko_solar_panel_1795377362014.jpg',
      descAr: 'المقاس الأكثر طلباً للمشاريع التجارية والأسطح الصناعية بكفاءة 22.5%.',
      descEn: 'Most popular commercial size delivering 22.5% high efficiency.',
      price: 185
    },
    {
      id: 203,
      nameAr: 'لوح شمسي جينكو تايغر نيو 620 واط (صناعي عالي القدرة)',
      nameEn: 'Jinko Tiger Neo N-Type 620W (Industrial)',
      category: 'jinko',
      image: '/src/assets/images/jinko_solar_panel_1795365670538.jpg',
      descAr: 'قدرة متقدمة 620 واط للمشاريع الصناعية الكبرى مع معامل درجة حرارة ممتاز.',
      descEn: 'Advanced 620W high power industrial module with excellent temperature coefficient.',
      price: 210
    },
    {
      id: 204,
      nameAr: 'لوح شمسي جينكو تايغر نيو 650 واط (محطات طاقة)',
      nameEn: 'Jinko Tiger Neo N-Type 650W (Utility)',
      category: 'jinko',
      image: '/src/assets/images/jinko_solar_panel_1795365670538.jpg',
      descAr: 'ألواح 650 واط عالية الإنتاجية لمشاريع الطاقة الشمسية الكبرى والمزارع الشمسية.',
      descEn: 'High-yield 650W panels designed for utility-scale solar farms.',
      price: 235
    },
    {
      id: 205,
      nameAr: 'لوح شمسي جينكو تايغر نيو 720 واط ألترا (الجيل الأحدث)',
      nameEn: 'Jinko Tiger Neo 720W Ultra Industrial',
      category: 'jinko',
      image: '/src/assets/images/jinko_solar_panel_1795365670538.jpg',
      descAr: 'القدرة الأضخم 720 واط تكنولوجيا ثنائية الوجه (Bifacial) للمحطات العملاقة وتوفير مساحة التركيب.',
      descEn: 'Massive 720W ultra high-power bifacial module for utility-scale giants.',
      price: 275
    },
    {
      id: 301,
      nameAr: 'هيكل تركيب معدني ألمنيوم مقاوم للصدأ (Mounting Rails Kit per kW)',
      nameEn: 'Aluminum Solar Mounting Structure Kit (Per kW)',
      category: 'accessories',
      image: '/src/assets/images/solar_accessories_1795377362509.jpg',
      descAr: 'قواعد ومشابك تثبيت ألمنيوم مقاومة للتآكل والأحمال الريحية الشديدة.',
      descEn: 'Corrosion-resistant aluminum mounting rails and clamps for secure roof fixing.',
      price: 45
    },
    {
      id: 302,
      nameAr: 'قواعد تثبيت مائلة للألواح على الأسطح المستوية (Triangle Brackets)',
      nameEn: 'Adjustable Flat Roof Triangle Mounting Brackets',
      category: 'accessories',
      image: '/src/assets/images/solar_accessories_1795377362509.jpg',
      descAr: 'قواعد مثلثية ألمنيوم لضبط زاوية ميل الألواح المثالية على الأسطح الخرسانية المستوية.',
      descEn: 'Adjustable aluminum triangle brackets for optimal tilt angle on flat concrete roofs.',
      price: 35
    },
    {
      id: 303,
      nameAr: 'أسلاك طاقة شمسية DC نحاس خالص مقاس 4 مم² (لفة 100 متر)',
      nameEn: 'Solar DC Copper Cable 4mm² UV Resistant (100m Roll)',
      category: 'accessories',
      image: '/src/assets/images/solar_accessories_1795377362509.jpg',
      descAr: 'أسلاك توصيل معزولة مزدوجة مخصصة لربط الألواح الشمسية.',
      descEn: 'Dual insulated pure copper DC cable for solar panel string connection.',
      price: 85
    },
    {
      id: 304,
      nameAr: 'أسلاك طاقة شمسية DC نحاس خالص مقاس 6 مم² (لفة 100 متر)',
      nameEn: 'Solar DC Copper Cable 6mm² UV Resistant (100m Roll)',
      category: 'accessories',
      image: '/src/assets/images/solar_accessories_1795377362509.jpg',
      descAr: 'كابلات نحاسية معزولة مزدوجة مقاس 6 مم² مقاومة لأشعة الشمس المباشرة.',
      descEn: 'Heavy duty 6mm² copper cables resistant to UV rays and extreme temperatures.',
      price: 110
    },
    {
      id: 305,
      nameAr: 'موصلات طاقة شمسية MC4 أصلية (زوج ذكر وأنثى - 10 أزواج)',
      nameEn: 'Original MC4 Solar Connectors (10 Pairs Pack)',
      category: 'accessories',
      image: '/src/assets/images/solar_accessories_1795377362509.jpg',
      descAr: 'موصلات MC4 أصلية مقاومة للماء والغبار بمعيار IP68 لتوصيل آمن بدون فقد في الطاقة.',
      descEn: 'IP68 waterproof original MC4 connectors for secure low-loss PV connections.',
      price: 25
    },
    {
      id: 306,
      nameAr: 'جهاز حماية من الارتفاع المفاجئ والصواعق DC SPD 1000V',
      nameEn: 'DC Surge Protection Device SPD 1000V (2-Pole)',
      category: 'accessories',
      image: '/src/assets/images/solar_accessories_1795377362509.jpg',
      descAr: 'حماية متقدمة لمنظومة الألواح والانفيرتر ضد الصواعق وارتفاع الجهد المفاجئ.',
      descEn: 'Advanced DC surge protection device against lightning and voltage spikes.',
      price: 60
    },
    {
      id: 307,
      nameAr: 'قاطع حماية تيار مستمر DC Breaker 1000V 32A/63A',
      nameEn: 'DC Circuit Breaker 1000V (32A - 63A)',
      category: 'accessories',
      image: '/src/assets/images/solar_accessories_1795377362509.jpg',
      descAr: 'قاطع أمان مخصص لدوائر الألواح الشمسية بجهد عالي وتيار مستمر.',
      descEn: 'High voltage DC safety circuit breaker for solar strings.',
      price: 40
    },
    {
      id: 308,
      nameAr: 'قواطع حماية تيار متناوب AC MCCB / MCB 3-Phase',
      nameEn: 'AC Circuit Breaker 3-Phase MCCB / MCB',
      category: 'accessories',
      image: '/src/assets/images/solar_accessories_1795377362509.jpg',
      descAr: 'قواطع رئيسية ثلاثية الطور لحماية مخرج الانفيرتر واللوحة الرئيسية.',
      descEn: '3-phase AC main circuit breakers for inverter output and main panel protection.',
      price: 95
    },
    {
      id: 309,
      nameAr: 'أسلاك تأريض نحاسية مرنة للتأريض 16 مم² (لفة 50 متر)',
      nameEn: 'Flexible Grounding Earth Copper Wire 16mm² (50m)',
      category: 'accessories',
      image: '/src/assets/images/solar_accessories_1795377362509.jpg',
      descAr: 'سلك تأريض أخضر/أصفر معتمد لحماية الهياكل والألواح والانفيرتر من الصواعق وتفريغ الشحنات.',
      descEn: 'Certified green/yellow grounding earth wire for structural safety and lightning protection.',
      price: 130
    }
  ]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if ((adminUsername === 'malek' || adminUsername === 'ezzaddin' || adminUsername === 'admin') && adminPassword === 'rawafid2026') {
      setIsAdminLoggedIn(true);
      setShowLoginModal(false);
      setAdminPassword('');
      setLoginError('');
      setActiveTab('admin');
    } else {
      setLoginError(lang === 'ar' ? 'اسم المستخدم أو كلمة المرور غير صحيحة. (كلمة المرور الافتراضية: rawafid2026)' : 'Invalid credentials. (Default password: rawafid2026)');
    }
  };

  const handlePriceUpdate = (id: number, newPrice: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, price: newPrice } : p));
  };

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

  // Currency multiplier & symbol
  const currencySymbol = 
    quotation.currency === 'USD' ? '$' :
    quotation.currency === 'ILS' ? '₪' :
    quotation.currency === 'JOD' ? 'JD' : '€';

  const currencyMultiplier = 1;

  // Quotation Calculations with Currency & Custom Items
  const baseStandardItemsTotal = 
    (quotation.inverterQty * quotation.inverterPrice) +
    (quotation.batteryQty * quotation.batteryPrice) +
    (quotation.panelQty * quotation.panelPrice) +
    (quotation.structureQty * quotation.structurePrice) +
    (quotation.protectionQty * quotation.protectionPrice) +
    (quotation.laborQty * quotation.laborPrice);

  const customItemsTotal = customItems.reduce((sum, item) => sum + (item.qty * item.price), 0);

  const subtotalQuotation = baseStandardItemsTotal + customItemsTotal;
  const totalQuotationAmount = Math.max(0, subtotalQuotation - quotation.discount);

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

  const filteredProducts = shopCategory === 'all'
    ? products
    : products.filter(p => p.category === shopCategory);

  const addToCart = (product: Product) => {
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
        image: product.image,
        price: product.price
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
        setAiResponse(lang === 'ar' ? 'عذراً، حدث خطأ في معالجة الاستشارة.' : 'Sorry, an error occurred.');
      }
    } catch (err) {
      setAiResponse(lang === 'ar' ? 'خطأ في الاتصال بالخادم.' : 'Server connection error.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInquiry = {
      id: Date.now(),
      ...quoteForm,
      date: new Date().toLocaleDateString()
    };
    setInquiriesList(prev => [newInquiry, ...prev]);
    setQuoteSubmitted(true);
  };

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

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-300 relative`}>
      
      {/* Top Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/80 dark:border-slate-800/80 px-6 py-4 flex items-center justify-between gap-8 print:hidden">
        
        {/* Zone 1: Logo & Brand */}
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
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button onClick={() => setActiveTab('home')} className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap ${activeTab === 'home' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}>
            {lang === 'ar' ? 'الرئيسية' : 'Home'}
          </button>
          <button onClick={() => setActiveTab('special-offers')} className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap flex items-center gap-1 ${activeTab === 'special-offers' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}>
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{lang === 'ar' ? 'عروض الأنظمة الخاصة' : 'Special Offers'}</span>
          </button>
          {isAdminLoggedIn && (
            <button onClick={() => setActiveTab('quotation-builder')} className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap flex items-center gap-1 ${activeTab === 'quotation-builder' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}>
              <FileText className="w-4 h-4 text-amber-500" />
              <span>{lang === 'ar' ? 'منشئ عروض الأسعار (PDF)' : 'Quotation Builder'}</span>
            </button>
          )}
          <button onClick={() => setActiveTab('shop')} className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap ${activeTab === 'shop' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}>
            {lang === 'ar' ? 'معرض المنتجات' : 'Products Catalog'}
          </button>
          <button onClick={() => setActiveTab('bom-generator')} className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap ${activeTab === 'bom-generator' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}>
            {lang === 'ar' ? 'حاسبة المكونات' : 'BOM Calculator'}
          </button>
          <button onClick={() => setActiveTab('ai-consultant')} className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap ${activeTab === 'ai-consultant' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}>
            {lang === 'ar' ? 'المستشار الذكي' : 'AI Consultant'}
          </button>
          <button onClick={() => setActiveTab('contact')} className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap ${activeTab === 'contact' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}`}>
            {lang === 'ar' ? 'اتصل بنا' : 'Contact'}
          </button>
          {isAdminLoggedIn && (
            <button onClick={() => setActiveTab('admin')} className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap text-amber-500 font-bold flex items-center gap-1 ${activeTab === 'admin' ? 'border-b-2 border-amber-500' : ''}`}>
              <Settings className="w-4 h-4" />
              <span>{lang === 'ar' ? 'لوحة تحكم المشرف' : 'Admin'}</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Actions & Admin Login */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors"
            title="Inquiry Cart"
          >
            <ShoppingCart className="w-4 h-4" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </button>

          {!isAdminLoggedIn ? (
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-all flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'دخول المهندسين' : 'Admin Login'}</span>
            </button>
          ) : (
            <button
              onClick={() => { setIsAdminLoggedIn(false); setActiveTab('home'); }}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-500/10 text-rose-600 border border-rose-500/30 hover:bg-rose-500/20 transition-all"
            >
              {lang === 'ar' ? 'خروج' : 'Logout'}
            </button>
          )}

          <button
            onClick={toggleLang}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'EN' : 'العربية'}</span>
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>

      </header>

      {/* Admin Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2 font-bold text-lg">
                <Lock className="w-5 h-5 text-amber-500" />
                <span>{lang === 'ar' ? 'دخول المشرفين (م. مالك أو م. عز الدين)' : 'Admin Portal Login'}</span>
              </div>
              <button onClick={() => setShowLoginModal(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold">{lang === 'ar' ? 'اسم المستخدم' : 'Username'}</label>
                <input
                  required
                  type="text"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder=""
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">{lang === 'ar' ? 'كلمة المرور' : 'Password'}</label>
                <input
                  required
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {loginError && (
                <p className="text-xs text-rose-500 font-semibold">{loginError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold text-white energy-gradient rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>{lang === 'ar' ? 'تسجيل الدخول للوحة التحكم' : 'Login to Admin Dashboard'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Content Tabs */}
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
                <span>{lang === 'ar' ? 'تحديث: دمج الشروط والأحكام الرسمية المعتمدة مع خيارات التعديل والإخفاء' : 'New: Official Terms & Conditions Integration'}</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
                {lang === 'ar'
                  ? 'شركة روافد لحلول الطاقة المتجددة والأنظمة الكهروضوئية'
                  : 'Rawafid Energy Solutions & Solar Systems'}
              </h1>

              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
                {lang === 'ar'
                  ? 'بقيادة م. مالك حريبات وم. عز الدين بدارين. وكلاء وموزعون لألواح Jinko (440W-720W)، أجهزة Deye، واكسسوارات التركيب والوقاية.'
                  : 'Led by Eng. Malek Hraibat & Eng. Ezzaddin Badarin. Authorized distributors for Jinko panels, Deye inverters, and accessories.'}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setActiveTab('quotation-builder')}
                  className="px-6 py-3.5 text-sm font-bold text-white energy-gradient rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'صياغة وطباعة عرض سعر للزبون' : 'Create Client Quotation'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('shop')}
                  className="px-6 py-3.5 text-sm font-bold text-slate-100 bg-slate-800/85 hover:bg-slate-800 border border-slate-700 rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'ar' ? 'معرض المنتجات' : 'Products Catalog'}</span>
                </button>
              </div>

              {/* Metrics */}
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

          {/* Partner Brands */}
          <section className="py-16 px-6 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <h2 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                {lang === 'ar' ? 'شركاؤنا العالميون' : 'Global Partners'}
              </h2>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                {lang === 'ar' ? 'العلامات التجارية المعتمدة التي نعتمد عليها' : 'Trusted Global Brands We Distribute'}
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

          {/* Engineers Contact Section */}
          <section className="py-20 px-6 max-w-7xl mx-auto bg-slate-100/60 dark:bg-slate-900/40 rounded-3xl my-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                {lang === 'ar' ? 'القيادة والإدارة الهندسية' : 'Engineering Leadership'}
              </h2>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {lang === 'ar' ? 'فريق الهندسة والإشراف المباشر' : 'Direct Engineering Team'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="glass-panel p-8 rounded-2xl space-y-6 text-center hover:border-amber-500/50 transition-all">
                <div className="w-20 h-20 rounded-full energy-gradient text-white flex items-center justify-center text-2xl font-bold mx-auto shadow-lg shadow-amber-600/20">
                  م.م
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold">{lang === 'ar' ? 'المهندس مالك حريبات' : 'Eng. Malek Hraibat'}</h4>
                  <p className="text-sm text-amber-600 dark:text-amber-400 font-semibold">
                    {lang === 'ar' ? 'مدير مشاريع الطاقة المتجددة' : 'Project Director'}
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-center gap-2 text-lg font-mono font-bold text-slate-800 dark:text-slate-200" dir="ltr">
                  <Phone className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span>0594345464</span>
                </div>
                <div className="pt-4 flex items-center gap-3">
                  <a href="tel:0594345464" className="flex-1 py-3 text-xs font-bold text-white energy-gradient rounded-xl shadow-md flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" /> <span>{lang === 'ar' ? 'اتصال' : 'Call'}</span>
                  </a>
                  <a href="https://wa.me/970594345464?text=%Dالسلام%20عليكم" target="_blank" rel="noopener noreferrer" className="flex-1 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" /> <span>واتساب</span>
                  </a>
                </div>
              </div>

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
                  <a href="tel:0599973304" className="flex-1 py-3 text-xs font-bold text-white energy-gradient rounded-xl shadow-md flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" /> <span>{lang === 'ar' ? 'اتصال' : 'Call'}</span>
                  </a>
                  <a href="https://wa.me/970599973304?text=%Dالسلام%20عليكم" target="_blank" rel="noopener noreferrer" className="flex-1 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" /> <span>واتساب</span>
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

      {/* Quotation Builder & Printable Receipt Page (Admin Only) */}
      {isAdminLoggedIn && activeTab === 'quotation-builder' && (
        <main className="py-12 px-6 max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3 print:hidden">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold">
              <FileText className="w-4 h-4" />
              <span>{lang === 'ar' ? 'أداة رسمية معتمدة للزبائن' : 'Official Client Quotation Generator'}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {lang === 'ar' ? 'إنشاء وطباعة عرض سعر رسمي للزبون' : 'Create & Print Official Customer Quotation'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {lang === 'ar'
                ? 'إدارة الشروط والأحكام الرسمية المأخوذة من عروض الشركة مع إمكانية تعديلها أو إخفائها فورياً عند طباعة العرض.'
                : 'Manage and customize official terms and conditions.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls Form (Hidden on Print) */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-2xl space-y-6 print:hidden">
              <h4 className="text-base font-bold border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
                <span>{lang === 'ar' ? 'إعدادات عرض السعر والشروط' : 'Quotation & Terms Settings'}</span>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 text-xs font-bold text-white energy-gradient rounded-lg shadow flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'طباعة العرض' : 'Print Proposal'}</span>
                </button>
              </h4>

              <div className="space-y-4 text-xs">
                {/* Saved Templates Management */}
                <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/30 space-y-3">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    {lang === 'ar' ? 'حفظ واسترجاع العروض الجاهزة:' : 'Saved Quotation Templates:'}
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={templateNameInput}
                      onChange={(e) => setTemplateNameInput(e.target.value)}
                      placeholder={lang === 'ar' ? 'اسم العرض (مثل: نظام 50 كيلو صناعي)' : 'Template name'}
                      className="flex-1 p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                    />
                    <button
                      onClick={saveCurrentTemplate}
                      className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors shrink-0"
                    >
                      {lang === 'ar' ? 'حفظ العرض' : 'Save'}
                    </button>
                  </div>

                  {savedTemplates.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-emerald-500/20 max-h-36 overflow-y-auto">
                      {savedTemplates.map((tmpl) => (
                        <div key={tmpl.id} className="flex items-center justify-between bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800 text-[11px]">
                          <span className="font-bold truncate max-w-[180px]">{tmpl.name}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => loadTemplate(tmpl)}
                              className="px-2 py-1 bg-amber-500 text-white rounded font-bold hover:bg-amber-600"
                            >
                              {lang === 'ar' ? 'تحميل' : 'Load'}
                            </button>
                            <button
                              onClick={() => deleteTemplate(tmpl.id)}
                              className="text-rose-500 hover:text-rose-700"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Currency, Line Prices & Terms Toggles */}
                <div className="grid grid-cols-3 gap-2 bg-amber-500/10 p-3 rounded-xl border border-amber-500/30">
                  <div className="space-y-1">
                    <label className="font-bold">{lang === 'ar' ? 'العملة:' : 'Currency:'}</label>
                    <select
                      value={quotation.currency}
                      onChange={(e) => setQuotation({ ...quotation, currency: e.target.value })}
                      className="w-full p-2 rounded-lg border border-amber-500 bg-white dark:bg-slate-900 font-bold text-xs"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="ILS">ILS (₪)</option>
                      <option value="JOD">JOD (JD)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>

                  <div className="space-y-1 flex flex-col justify-between">
                    <label className="font-bold">{lang === 'ar' ? 'أسعار القطع:' : 'Line Prices:'}</label>
                    <button
                      onClick={() => setQuotation({ ...quotation, showLinePrices: !quotation.showLinePrices })}
                      className={`w-full py-2 px-2 rounded-lg font-bold text-[11px] transition-colors ${quotation.showLinePrices ? 'bg-amber-500 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200'}`}
                    >
                      {quotation.showLinePrices ? (lang === 'ar' ? 'إظهار' : 'Show') : (lang === 'ar' ? 'إخفاء' : 'Hide')}
                    </button>
                  </div>

                  <div className="space-y-1 flex flex-col justify-between">
                    <label className="font-bold">{lang === 'ar' ? 'الشروط:' : 'Terms:'}</label>
                    <button
                      onClick={() => setQuotation({ ...quotation, showTerms: !quotation.showTerms })}
                      className={`w-full py-2 px-2 rounded-lg font-bold text-[11px] transition-colors ${quotation.showTerms ? 'bg-emerald-600 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200'}`}
                    >
                      {quotation.showTerms ? (lang === 'ar' ? 'إظهار الشروط' : 'Show Terms') : (lang === 'ar' ? 'إخفاء الشروط' : 'Hide Terms')}
                    </button>
                  </div>
                </div>

                {/* Client Info */}
                <div className="space-y-2">
                  <label className="font-semibold">{lang === 'ar' ? 'اسم الزبون / المنشأة:' : 'Client Name:'}</label>
                  <input
                    type="text"
                    value={quotation.clientName}
                    onChange={(e) => setQuotation({ ...quotation, clientName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold">{lang === 'ar' ? 'رقم الهاتف:' : 'Phone:'}</label>
                    <input
                      type="text"
                      value={quotation.clientPhone}
                      onChange={(e) => setQuotation({ ...quotation, clientPhone: e.target.value })}
                      className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold">{lang === 'ar' ? 'العنوان:' : 'Address:'}</label>
                    <input
                      type="text"
                      value={quotation.clientAddress}
                      onChange={(e) => setQuotation({ ...quotation, clientAddress: e.target.value })}
                      className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                    />
                  </div>
                </div>

                {/* Inverter Specs */}
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 space-y-2 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-amber-600 dark:text-amber-400">{lang === 'ar' ? '1. جهاز العاكس (Inverter):' : '1. Inverter:'}</span>
                  <input
                    type="text"
                    value={quotation.inverterName}
                    onChange={(e) => setQuotation({ ...quotation, inverterName: e.target.value })}
                    placeholder="اسم الجهاز والمواصفات"
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" value={quotation.inverterWarranty} onChange={(e) => setQuotation({ ...quotation, inverterWarranty: e.target.value })} placeholder="الكفالة" className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[11px]" />
                    <input type="number" value={quotation.inverterQty} onChange={(e) => setQuotation({ ...quotation, inverterQty: Number(e.target.value) })} placeholder="العدد" className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[11px] font-mono" />
                    <input type="number" value={quotation.inverterPrice} onChange={(e) => setQuotation({ ...quotation, inverterPrice: Number(e.target.value) })} placeholder="السعر" className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[11px] font-mono" />
                  </div>
                </div>

                {/* Battery Specs */}
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 space-y-2 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-amber-600 dark:text-amber-400">{lang === 'ar' ? '2. البطاريات ونظام التخزين (BESS):' : '2. Batteries:'}</span>
                  <input
                    type="text"
                    value={quotation.batteryName}
                    onChange={(e) => setQuotation({ ...quotation, batteryName: e.target.value })}
                    placeholder="نوع ومواصفات البطارية"
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" value={quotation.batteryWarranty} onChange={(e) => setQuotation({ ...quotation, batteryWarranty: e.target.value })} placeholder="الكفالة" className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[11px]" />
                    <input type="number" value={quotation.batteryQty} onChange={(e) => setQuotation({ ...quotation, batteryQty: Number(e.target.value) })} placeholder="العدد" className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[11px] font-mono" />
                    <input type="number" value={quotation.batteryPrice} onChange={(e) => setQuotation({ ...quotation, batteryPrice: Number(e.target.value) })} placeholder="السعر" className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[11px] font-mono" />
                  </div>
                </div>

                {/* Solar Panels Specs */}
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 space-y-2 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-amber-600 dark:text-amber-400">{lang === 'ar' ? '3. الألواح الشمسية (Jinko Solar):' : '3. Solar Panels:'}</span>
                  <input
                    type="text"
                    value={quotation.panelName}
                    onChange={(e) => setQuotation({ ...quotation, panelName: e.target.value })}
                    placeholder="نوع ومواصفات اللوح"
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" value={quotation.panelWarranty} onChange={(e) => setQuotation({ ...quotation, panelWarranty: e.target.value })} placeholder="الكفالة" className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[11px]" />
                    <input type="number" value={quotation.panelQty} onChange={(e) => setQuotation({ ...quotation, panelQty: Number(e.target.value) })} placeholder="العدد" className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[11px] font-mono" />
                    <input type="number" value={quotation.panelPrice} onChange={(e) => setQuotation({ ...quotation, panelPrice: Number(e.target.value) })} placeholder="سعر القطعة" className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[11px] font-mono" />
                  </div>
                </div>

                {/* Mounting Structure */}
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 space-y-2 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-amber-600 dark:text-amber-400">{lang === 'ar' ? '4. الهياكل والحديد (Mounting):' : '4. Structures:'}</span>
                  <input
                    type="text"
                    value={quotation.structureName}
                    onChange={(e) => setQuotation({ ...quotation, structureName: e.target.value })}
                    placeholder="مواصفات الحديد والهياكل"
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" value={quotation.structureWarranty} onChange={(e) => setQuotation({ ...quotation, structureWarranty: e.target.value })} placeholder="الكفالة" className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[11px]" />
                    <input type="number" value={quotation.structureQty} onChange={(e) => setQuotation({ ...quotation, structureQty: Number(e.target.value) })} placeholder="العدد/طقم" className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[11px] font-mono" />
                    <input type="number" value={quotation.structurePrice} onChange={(e) => setQuotation({ ...quotation, structurePrice: Number(e.target.value) })} placeholder="السعر" className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[11px] font-mono" />
                  </div>
                </div>

                {/* Protection & Breakers */}
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 space-y-2 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-amber-600 dark:text-amber-400">{lang === 'ar' ? '5. القواطع والأسلاك والحماية:' : '5. Protection:'}</span>
                  <input
                    type="text"
                    value={quotation.protectionName}
                    onChange={(e) => setQuotation({ ...quotation, protectionName: e.target.value })}
                    placeholder="مواصفات القواطع والأسلاك"
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" value={quotation.protectionWarranty} onChange={(e) => setQuotation({ ...quotation, protectionWarranty: e.target.value })} placeholder="الكفالة" className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[11px]" />
                    <input type="number" value={quotation.protectionQty} onChange={(e) => setQuotation({ ...quotation, protectionQty: Number(e.target.value) })} placeholder="العدد" className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[11px] font-mono" />
                    <input type="number" value={quotation.protectionPrice} onChange={(e) => setQuotation({ ...quotation, protectionPrice: Number(e.target.value) })} placeholder="السعر" className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[11px] font-mono" />
                  </div>
                </div>

                {/* Labor & Engineering Wages */}
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 space-y-2 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-amber-600 dark:text-amber-400">{lang === 'ar' ? '6. أجور العمال والمهندسين والتركيب:' : '6. Labor & Engineering:'}</span>
                  <input
                    type="text"
                    value={quotation.laborName}
                    onChange={(e) => setQuotation({ ...quotation, laborName: e.target.value })}
                    placeholder="مواصفات وتفاصيل الأجور"
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" value={quotation.laborWarranty} onChange={(e) => setQuotation({ ...quotation, laborWarranty: e.target.value })} placeholder="الكفالة" className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[11px]" />
                    <input type="number" value={quotation.laborQty} onChange={(e) => setQuotation({ ...quotation, laborQty: Number(e.target.value) })} placeholder="العدد" className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[11px] font-mono" />
                    <input type="number" value={quotation.laborPrice} onChange={(e) => setQuotation({ ...quotation, laborPrice: Number(e.target.value) })} placeholder="السعر" className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[11px] font-mono" />
                  </div>
                </div>

                {/* ADD CUSTOM ITEM SECTION (e.g. ATS Breakers) */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    {lang === 'ar' ? 'إضافة عنصر جديد (مثل قواطع ATS):' : 'Add Custom Item (e.g. ATS):'}
                  </span>
                  <input
                    type="text"
                    value={newCustomName}
                    onChange={(e) => setNewCustomName(e.target.value)}
                    placeholder={lang === 'ar' ? 'اسم العنصر (مثال: قواطع ATS 100A)' : 'Item name'}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" value={newCustomWarranty} onChange={(e) => setNewCustomWarranty(e.target.value)} placeholder="الكفالة" className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[11px]" />
                    <input type="number" value={newCustomQty} onChange={(e) => setNewCustomQty(Number(e.target.value))} placeholder="العدد" className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[11px] font-mono" />
                    <input type="number" value={newCustomPrice} onChange={(e) => setNewCustomPrice(Number(e.target.value))} placeholder="السعر" className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-[11px] font-mono" />
                  </div>
                  <button
                    onClick={addCustomItem}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'إضافة لعرض السعر' : 'Add Item'}</span>
                  </button>

                  {customItems.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-emerald-500/20">
                      {customItems.map((ci) => (
                        <div key={ci.id} className="flex items-center justify-between bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800 text-[11px]">
                          <span>{ci.name} ({ci.qty})</span>
                          <button onClick={() => removeCustomItem(ci.id)} className="text-rose-500 hover:text-rose-700">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Terms and Conditions Editor */}
                <div className="space-y-2">
                  <label className="font-semibold">{lang === 'ar' ? 'نص الشروط والأحكام الرسمية:' : 'Terms & Conditions Text:'}</label>
                  <textarea
                    rows={6}
                    value={quotation.termsText}
                    onChange={(e) => setQuotation({ ...quotation, termsText: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[11px] leading-relaxed resize-y font-normal"
                  />
                </div>

                {/* Discount & Total */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{lang === 'ar' ? 'قيمة الخصم:' : 'Discount:'}</span>
                    <input
                      type="number"
                      value={quotation.discount}
                      onChange={(e) => setQuotation({ ...quotation, discount: Number(e.target.value) })}
                      className="w-24 p-1.5 rounded border border-amber-500 bg-white dark:bg-slate-950 font-mono font-bold text-center text-xs"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Official Printable Quotation Document View */}
            <div className="lg:col-span-7 bg-white text-slate-900 p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-300 print:shadow-none print:border-none print:w-full relative overflow-hidden" id="printable-quotation">
              
              {/* Background Watermark Logo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <img
                  src="/assets/aistudio/Rawafed_Renewable_Energy_Logo_614c1e0c.png"
                  alt="Watermark Logo"
                  className="w-[420px] h-[420px] object-contain opacity-[0.07]"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="relative z-10 space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-6">
                <div className="flex items-center gap-4">
                  <img
                    src="/assets/aistudio/Rawafed_Renewable_Energy_Logo_614c1e0c.png"
                    alt="Logo"
                    className="w-16 h-16 object-contain rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight">
                      {lang === 'ar' ? 'شركة روافد لحلول الطاقة' : 'Rawafid Energy Solutions'}
                    </h3>
                    <p className="text-xs text-slate-600">
                      {lang === 'ar' ? 'أنظمة الطاقة الكهروضوئية وتخزين الطاقة • وكلاء Deye & Jinko' : 'Solar & BESS Systems • Authorized Distributors'}
                    </p>
                    <p className="text-[11px] font-mono font-bold text-amber-700 mt-1">
                      {lang === 'ar' ? 'إدارة: م. مالك حريبات (0594345464) • م. عز الدين بدارين (0599973304)' : 'Eng. Malek (0594345464) • Eng. Ezzaddin (0599973304)'}
                    </p>
                  </div>
                </div>

                <div className="text-left font-mono text-xs space-y-1">
                  <div className="text-sm font-extrabold text-amber-700">{lang === 'ar' ? 'عرض سعر رسمي' : 'OFFICIAL QUOTATION'}</div>
                  <div>{lang === 'ar' ? 'التاريخ:' : 'Date:'} {quotation.issueDate}</div>
                  <div>{lang === 'ar' ? 'صالح لغاية:' : 'Valid Until:'} {quotation.validUntil}</div>
                  <div className="text-emerald-700 font-bold">{lang === 'ar' ? 'العملة:' : 'Currency:'} {quotation.currency}</div>
                </div>
              </div>

              {/* Client Details */}
              <div className="grid grid-cols-2 gap-4 bg-slate-100 p-4 rounded-xl text-xs">
                <div>
                  <span className="font-bold text-slate-500">{lang === 'ar' ? 'إلى السادة / الزبون:' : 'Client:'}</span>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">{quotation.clientName}</div>
                </div>
                <div>
                  <span className="font-bold text-slate-500">{lang === 'ar' ? 'رقم الهاتف / العنوان:' : 'Phone / Address:'}</span>
                  <div className="text-sm font-bold text-slate-900 mt-0.5 font-mono">{quotation.clientPhone} — {quotation.clientAddress}</div>
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-900 text-slate-700">
                      <th className="py-3 px-2">{lang === 'ar' ? 'البند / المكون' : 'Item Description'}</th>
                      <th className="py-3 px-2">{lang === 'ar' ? 'الكفالة' : 'Warranty'}</th>
                      <th className="py-3 px-2 text-center">{lang === 'ar' ? 'الكمية' : 'Qty'}</th>
                      {quotation.showLinePrices && (
                        <th className="py-3 px-2 text-center">{lang === 'ar' ? 'السعر الإجمالي' : 'Total'}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="py-3 px-2 font-bold">
                        <div>{lang === 'ar' ? '1. العاكس (Inverter):' : '1. Inverter:'}</div>
                        <div className="text-slate-600 font-normal text-[11px]">{quotation.inverterName}</div>
                      </td>
                      <td className="py-3 px-2 font-semibold text-emerald-700">{quotation.inverterWarranty}</td>
                      <td className="py-3 px-2 text-center font-mono">{quotation.inverterQty}</td>
                      {quotation.showLinePrices && (
                        <td className="py-3 px-2 text-center font-mono font-bold">
                          {(quotation.inverterQty * quotation.inverterPrice * currencyMultiplier).toLocaleString()} {currencySymbol}
                        </td>
                      )}
                    </tr>

                    <tr>
                      <td className="py-3 px-2 font-bold">
                        <div>{lang === 'ar' ? '2. البطاريات (BESS):' : '2. Batteries:'}</div>
                        <div className="text-slate-600 font-normal text-[11px]">{quotation.batteryName}</div>
                      </td>
                      <td className="py-3 px-2 font-semibold text-emerald-700">{quotation.batteryWarranty}</td>
                      <td className="py-3 px-2 text-center font-mono">{quotation.batteryQty}</td>
                      {quotation.showLinePrices && (
                        <td className="py-3 px-2 text-center font-mono font-bold">
                          {(quotation.batteryQty * quotation.batteryPrice * currencyMultiplier).toLocaleString()} {currencySymbol}
                        </td>
                      )}
                    </tr>

                    <tr>
                      <td className="py-3 px-2 font-bold">
                        <div>{lang === 'ar' ? '3. الألواح الشمسية (Jinko):' : '3. Solar Panels:'}</div>
                        <div className="text-slate-600 font-normal text-[11px]">{quotation.panelName}</div>
                      </td>
                      <td className="py-3 px-2 font-semibold text-emerald-700">{quotation.panelWarranty}</td>
                      <td className="py-3 px-2 text-center font-mono">{quotation.panelQty}</td>
                      {quotation.showLinePrices && (
                        <td className="py-3 px-2 text-center font-mono font-bold">
                          {(quotation.panelQty * quotation.panelPrice * currencyMultiplier).toLocaleString()} {currencySymbol}
                        </td>
                      )}
                    </tr>

                    <tr>
                      <td className="py-3 px-2 font-bold">
                        <div>{lang === 'ar' ? '4. الهياكل والحديد:' : '4. Structure:'}</div>
                        <div className="text-slate-600 font-normal text-[11px]">{quotation.structureName}</div>
                      </td>
                      <td className="py-3 px-2 font-semibold text-emerald-700">{quotation.structureWarranty}</td>
                      <td className="py-3 px-2 text-center font-mono">{quotation.structureQty}</td>
                      {quotation.showLinePrices && (
                        <td className="py-3 px-2 text-center font-mono font-bold">
                          {(quotation.structureQty * quotation.structurePrice * currencyMultiplier).toLocaleString()} {currencySymbol}
                        </td>
                      )}
                    </tr>

                    <tr>
                      <td className="py-3 px-2 font-bold">
                        <div>{lang === 'ar' ? '5. القواطع والحماية:' : '5. Protection:'}</div>
                        <div className="text-slate-600 font-normal text-[11px]">{quotation.protectionName}</div>
                      </td>
                      <td className="py-3 px-2 font-semibold text-emerald-700">{quotation.protectionWarranty}</td>
                      <td className="py-3 px-2 text-center font-mono">{quotation.protectionQty}</td>
                      {quotation.showLinePrices && (
                        <td className="py-3 px-2 text-center font-mono font-bold">
                          {(quotation.protectionQty * quotation.protectionPrice).toLocaleString()} {currencySymbol}
                        </td>
                      )}
                    </tr>

                    <tr>
                      <td className="py-3 px-2 font-bold">
                        <div>{lang === 'ar' ? '6. أجور العمال والمهندسين والتركيب:' : '6. Labor & Engineering:'}</div>
                        <div className="text-slate-600 font-normal text-[11px]">{quotation.laborName}</div>
                      </td>
                      <td className="py-3 px-2 font-semibold text-emerald-700">{quotation.laborWarranty}</td>
                      <td className="py-3 px-2 text-center font-mono">{quotation.laborQty}</td>
                      {quotation.showLinePrices && (
                        <td className="py-3 px-2 text-center font-mono font-bold">
                          {(quotation.laborQty * quotation.laborPrice).toLocaleString()} {currencySymbol}
                        </td>
                      )}
                    </tr>

                    {/* Custom Extra Items (e.g. ATS) */}
                    {customItems.map((ci, idx) => (
                      <tr key={ci.id}>
                        <td className="py-3 px-2 font-bold">
                          <div>7.{idx + 1}. {ci.name}</div>
                        </td>
                        <td className="py-3 px-2 font-semibold text-emerald-700">{ci.warranty}</td>
                        <td className="py-3 px-2 text-center font-mono">{ci.qty}</td>
                        {quotation.showLinePrices && (
                          <td className="py-3 px-2 text-center font-mono font-bold">
                            {(ci.qty * ci.price).toLocaleString()} {currencySymbol}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Financial Totals */}
              <div className="border-t-2 border-slate-900 pt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="font-bold">{lang === 'ar' ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                  <span className="font-mono font-bold">{subtotalQuotation.toLocaleString()} {currencySymbol}</span>
                </div>
                {quotation.discount > 0 && (
                  <div className="flex justify-between text-rose-600">
                    <span className="font-bold">{lang === 'ar' ? 'الخصم الخاص:' : 'Special Discount:'}</span>
                    <span className="font-mono font-bold">-{(quotation.discount * currencyMultiplier).toLocaleString()} {currencySymbol}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold border-t border-slate-300 pt-3 text-amber-700">
                  <span>{lang === 'ar' ? 'المجموع النهائي المطلوب:' : 'Final Total:'}</span>
                  <span className="font-mono">{totalQuotationAmount.toLocaleString()} {currencySymbol}</span>
                </div>
              </div>

              {/* Terms and Conditions (Shown / Hidden or Edited) */}
              {quotation.showTerms && (
                <div className="bg-slate-50 p-4 rounded-xl text-[10px] space-y-2 text-slate-700 border border-slate-200">
                  <span className="font-bold text-slate-900">{lang === 'ar' ? 'الشروط العامة والمحددات القانونية للفحص والتشغيل:' : 'Terms & Conditions:'}</span>
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {quotation.termsText}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="p-3 rounded-lg bg-amber-500/10 text-[11px] text-amber-900 border border-amber-500/30">
                <span className="font-bold">{lang === 'ar' ? 'آلية الدفع وملاحظات:' : 'Payment & Notes:'}</span> {quotation.paymentTerms} — {quotation.notes}
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-8 pt-8 text-center text-xs">
                <div className="space-y-8">
                  <div className="font-bold">{lang === 'ar' ? 'توقيع وختم الشركة' : 'Company Stamp & Signature'}</div>
                  <div className="border-t border-dashed border-slate-400 pt-2 text-[11px] text-slate-500">
                    {lang === 'ar' ? 'شركة روافد لحلول الطاقة' : 'Rawafid Energy Solutions'}
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="font-bold">{lang === 'ar' ? 'توقيع الزبون' : 'Client Signature'}</div>
                  <div className="border-t border-dashed border-slate-400 pt-2 text-[11px] text-slate-500">
                    {quotation.clientName}
                  </div>
                </div>
              </div>

              {/* Print & WhatsApp Buttons at Bottom */}
              <div className="pt-4 print:hidden flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3.5 text-sm font-bold text-white energy-gradient rounded-xl shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  <Printer className="w-5 h-5" />
                  <span>{lang === 'ar' ? 'طباعة عرض السعر (PDF)' : 'Print Official PDF'}</span>
                </button>
                <button
                  onClick={sendQuotationWhatsApp}
                  className="px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{lang === 'ar' ? 'إرسال تفاصيل العرض عبر واتساب' : 'Send via WhatsApp'}</span>
                </button>
              </div>

              </div>
            </div>
          </div>
        </main>
      )}

      {/* Special Solar System Offers Page */}
      {activeTab === 'special-offers' && (
        <main className="py-16 px-6 max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'ar' ? 'عروض الأنظمة والطاقة الحصرية' : 'Exclusive Solar System Offers'}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              {lang === 'ar' ? 'باقات وعروض أنظمة الطاقة الشمسية المعتمدة' : 'Certified Solar Package Offers'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {lang === 'ar'
                ? 'استعرض عروضنا الهندسية المخصصة للمنازل والمنشآت التجارية والصناعية، مع كفالات معتمدة ومواصفات دقيقة.'
                : 'Browse our specialized engineering packages for residential, commercial and industrial sectors.'}
            </p>
          </div>

          {/* Admin Management Form for Special Offers */}
          {isAdminLoggedIn && (
            <div className="glass-panel p-8 rounded-3xl border-2 border-amber-500/30 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-lg font-bold flex items-center gap-2 text-amber-600">
                  <Settings className="w-5 h-5" />
                  <span>{editingOfferId !== null ? (lang === 'ar' ? 'تعديل عرض نظام طاقة' : 'Edit Solar Offer') : (lang === 'ar' ? 'إضافة عرض نظام طاقة جديد' : 'Add New Solar Offer')}</span>
                </h3>
                {editingOfferId !== null && (
                  <button
                    onClick={() => { setEditingOfferId(null); setNewOfferTitleAr(''); setNewOfferTitleEn(''); setNewOfferDescAr(''); }}
                    className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-800"
                  >
                    {lang === 'ar' ? 'إلغاء التعديل' : 'Cancel Edit'}
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveOffer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold">{lang === 'ar' ? 'عنوان العرض (عربي):' : 'Offer Title (AR):'}</label>
                  <input
                    required
                    type="text"
                    value={newOfferTitleAr}
                    onChange={(e) => setNewOfferTitleAr(e.target.value)}
                    placeholder="مثال: عرض نظام 30 كيلوواط"
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold">{lang === 'ar' ? 'عنوان العرض (إنجليزي):' : 'Offer Title (EN):'}</label>
                  <input
                    type="text"
                    value={newOfferTitleEn}
                    onChange={(e) => setNewOfferTitleEn(e.target.value)}
                    placeholder="30kW Solar System Package"
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold">{lang === 'ar' ? 'قدرة النظام (كيلوواط):' : 'System Capacity (kW):'}</label>
                  <input
                    type="number"
                    value={newOfferKw}
                    onChange={(e) => setNewOfferKw(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold">{lang === 'ar' ? 'جهاز الانفيرتر:' : 'Inverter Spec:'}</label>
                  <input
                    type="text"
                    value={newOfferInverter}
                    onChange={(e) => setNewOfferInverter(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold">{lang === 'ar' ? 'البطاريات ونظام التخزين:' : 'Batteries Spec:'}</label>
                  <input
                    type="text"
                    value={newOfferBatteries}
                    onChange={(e) => setNewOfferBatteries(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold">{lang === 'ar' ? 'الألواح الشمسية:' : 'Panels Spec:'}</label>
                  <input
                    type="text"
                    value={newOfferPanels}
                    onChange={(e) => setNewOfferPanels(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold">{lang === 'ar' ? 'السعر الإجمالي:' : 'Total Price:'}</label>
                  <input
                    type="number"
                    value={newOfferPrice}
                    onChange={(e) => setNewOfferPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold">{lang === 'ar' ? 'العملة:' : 'Currency:'}</label>
                  <select
                    value={newOfferCurrency}
                    onChange={(e) => setNewOfferCurrency(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-bold"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="ILS">ILS (₪)</option>
                    <option value="JOD">JOD (JD)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>

                <div className="md:col-span-2 lg:col-span-3 space-y-1">
                  <label className="font-semibold">{lang === 'ar' ? 'تفاصيل ومميزات العرض:' : 'Offer Description & Details:'}</label>
                  <textarea
                    rows={2}
                    value={newOfferDescAr}
                    onChange={(e) => setNewOfferDescAr(e.target.value)}
                    placeholder="اكتب المواصفات والضمانات المشمولة في العرض..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 text-xs font-bold text-white energy-gradient rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingOfferId !== null ? (lang === 'ar' ? 'حفظ التعديلات' : 'Save Changes') : (lang === 'ar' ? 'نشر عرض النظام الجديد' : 'Publish New Offer')}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Offers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specialOffers.map((offer) => (
              <div key={offer.id} className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6 flex flex-col justify-between group hover:border-amber-500/50 transition-all duration-300 shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold">
                      {offer.systemKw} kW System
                    </div>
                    {isAdminLoggedIn && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditOffer(offer)}
                          className="px-2.5 py-1 text-xs bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600"
                        >
                          {lang === 'ar' ? 'تعديل' : 'Edit'}
                        </button>
                        <button
                          onClick={() => handleDeleteOffer(offer.id)}
                          className="p-1 text-rose-500 hover:text-rose-700 rounded-lg bg-rose-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-extrabold tracking-tight">
                    {lang === 'ar' ? offer.titleAr : offer.titleEn}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {lang === 'ar' ? offer.descAr : offer.descEn}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{offer.inverter}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BatteryCharging className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{offer.batteries}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{offer.panels}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">{lang === 'ar' ? 'السعر الشامل' : 'Total Package Price'}</div>
                    <div className="text-xl font-extrabold font-mono text-amber-600 dark:text-amber-400">
                      {offer.price.toLocaleString()} {offer.currency === 'USD' ? '$' : offer.currency === 'ILS' ? '₪' : offer.currency === 'JOD' ? 'JD' : '€'}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const text = encodeURIComponent(
                        `☀️ *شركة روافد لحلول الطاقة* ☀️\n` +
                        `📌 استفسار عن عرض خاص: *${offer.titleAr}*\n` +
                        `⚡ قدرة النظام: ${offer.systemKw} كيلوواط\n` +
                        `💰 السعر: ${offer.price.toLocaleString()} ${offer.currency}\n` +
                        `يرجى التواصل معنا لتفاصيل الحجز والتركيب.`
                      );
                      window.open(`https://wa.me/?text=${text}`, '_blank');
                    }}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'احجز العرض عبر واتساب' : 'Inquire via WhatsApp'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Shop Catalog Tab */}
      {activeTab === 'shop' && (
        <main className="py-16 px-6 max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
              {lang === 'ar' ? 'المتجر ومعرض المنتجات والأنظمة' : 'Products Catalog & Shop'}
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              {lang === 'ar' ? 'أجهزة Deye، ألواح Jinko، واكسسوارات التركيب' : 'Deye, Jinko Panels & Accessories'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {isAdminLoggedIn
                ? (lang === 'ar' ? 'أنت مسجل الدخول كمشرف. يمكنك مشاهدة وتعديل الأسعار مباشرة.' : 'Logged in as Admin. You can view and edit prices.')
                : (lang === 'ar' ? 'استعرض المنتجات وأضفها لقائمة الاستفسار، أو سجل دخول المهندسين لمشاهدة وتعديل الأسعار.' : 'Browse products and add to inquiry list, or login as admin to edit prices.')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShopCategory('all')}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${shopCategory === 'all' ? 'energy-gradient text-white shadow-md' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}`}
              >
                {lang === 'ar' ? 'جميع المنتجات' : 'All Products'}
              </button>
              <button
                onClick={() => setShopCategory('deye')}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${shopCategory === 'deye' ? 'energy-gradient text-white shadow-md' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}`}
              >
                {lang === 'ar' ? 'أجهزة Deye والبطاريات' : 'Deye Inverters & BESS'}
              </button>
              <button
                onClick={() => setShopCategory('jinko')}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${shopCategory === 'jinko' ? 'energy-gradient text-white shadow-md' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}`}
              >
                {lang === 'ar' ? 'ألواح Jinko (كل المقاسات)' : 'Jinko Solar Panels'}
              </button>
              <button
                onClick={() => setShopCategory('accessories')}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${shopCategory === 'accessories' ? 'energy-gradient text-white shadow-md' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}`}
              >
                {lang === 'ar' ? 'اكسسوارات وقواطع وأسلاك' : 'Accessories & Breakers'}
              </button>
            </div>

            {isAdminLoggedIn && (
              <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-xl">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  {lang === 'ar' ? 'عرض الأسعار للعامة:' : 'Show Prices Publicly:'}
                </span>
                <button
                  onClick={() => setShowPricesPublic(!showPricesPublic)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${showPricesPublic ? 'bg-amber-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
                >
                  {showPricesPublic ? (lang === 'ar' ? 'مفعل (مرئي)' : 'Enabled') : (lang === 'ar' ? 'معطل (مخفي)' : 'Hidden')}
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col justify-between group">
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={product.image}
                      alt={lang === 'ar' ? product.nameAr : product.nameEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-amber-400 font-mono text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-800">
                      {product.category.toUpperCase()}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h4 className="text-base font-bold line-clamp-2">
                      {lang === 'ar' ? product.nameAr : product.nameEn}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {lang === 'ar' ? product.descAr : product.descEn}
                    </p>

                    {(isAdminLoggedIn || showPricesPublic) && (
                      <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                        <span className="text-xs text-slate-500">{lang === 'ar' ? 'السعر التقديري:' : 'Est. Price:'}</span>
                        {isAdminLoggedIn ? (
                          <div className="flex items-center gap-1">
                            <span className="text-amber-500 font-bold">$</span>
                            <input
                              type="number"
                              value={product.price}
                              onChange={(e) => handlePriceUpdate(product.id, Number(e.target.value))}
                              className="w-24 p-1 text-xs font-mono font-bold rounded border border-amber-500 bg-slate-100 dark:bg-slate-900 text-center"
                            />
                          </div>
                        ) : (
                          <span className="text-base font-extrabold text-amber-500 font-mono">${product.price}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full py-3 text-xs font-bold text-white energy-gradient rounded-xl shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'إضافة لقائمة الاستفسار وطلب السعر' : 'Add to Inquiry List'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* System BOM Generator Tab */}
      {activeTab === 'bom-generator' && (
        <main className="py-16 px-6 max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
              {lang === 'ar' ? 'أداة حصر وتوليد المكونات الهندسية (BOM)' : 'Automated System BOM Generator'}
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              {lang === 'ar' ? 'حاسبة جدول الكميات ومواصفات النظام الشمسى' : 'Solar System Bill of Materials & Sizing Calculator'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {lang === 'ar'
                ? 'حدد السعة المطلوبة لمشروعك وقدرة ألواح Jinko، وسيقوم النظام تلقائياً بحساب جدول الكميات والمكونات الهندسية الدقيقة لإرسالها للمهندسين.'
                : 'Select your target system capacity and Jinko panel wattage, and the system automatically computes exact BOM quantities.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 glass-panel p-8 rounded-2xl space-y-6">
              <h4 className="text-lg font-bold border-b border-slate-200 dark:border-slate-800 pb-4">
                {lang === 'ar' ? 'معلمات تصميم النظام الشمسي' : 'System Design Parameters'}
              </h4>

              <div className="space-y-2">
                <label className="text-sm font-semibold">
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
                  <span className="text-xl font-bold font-mono text-amber-600 shrink-0">
                    {bomSystemKw} kW
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  {lang === 'ar' ? 'قدرة لوح Jinko المفضل' : 'Preferred Jinko Panel Wattage'}
                </label>
                <select
                  value={selectedPanelWatt}
                  onChange={(e) => setSelectedPanelWatt(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value={440}>Jinko Tiger Neo 440W (Residential)</option>
                  <option value={580}>Jinko Tiger Neo 580W (Commercial)</option>
                  <option value={620}>Jinko Tiger Neo 620W (Industrial)</option>
                  <option value={650}>Jinko Tiger Neo 650W (Utility)</option>
                  <option value={720}>Jinko Tiger Neo 720W Ultra (Latest)</option>
                </select>
              </div>

              <button
                onClick={() => setActiveTab('contact')}
                className="w-full py-3.5 text-sm font-bold text-white energy-gradient rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <span>{lang === 'ar' ? 'اطلب اعتماد جدول الكميات (BOM) من المهندسين' : 'Request BOM Approval from Engineers'}</span>
                <ArrowRight className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className="lg:col-span-7 glass-panel p-8 rounded-2xl space-y-6 bg-slate-900 text-white border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h4 className="text-lg font-bold text-amber-400">
                  {lang === 'ar' ? 'جدول المكونات الهندسية (BOM Output)' : 'Engineering BOM Output'}
                </h4>
                <span className="text-xs font-mono bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded border border-amber-500/30">
                  RAWAFID VERIFIED
                </span>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span>{lang === 'ar' ? 'عدد ألواح Jinko الشمسية المطلوبة:' : 'Required Jinko Solar Panels:'}</span>
                  <span className="font-mono font-bold text-amber-400 text-base">{totalPanelsCount} {lang === 'ar' ? 'لوح' : 'Panels'} ({selectedPanelWatt}W)</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span>{lang === 'ar' ? 'الانفيرتر المقترح (Deye Inverter):' : 'Recommended Deye Inverter:'}</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">{recommendedInverter}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span>{lang === 'ar' ? 'سعة تخزين البطاريات المقترحة (BESS):' : 'Recommended BESS Capacity:'}</span>
                  <span className="font-mono font-bold text-amber-400 text-base">{recommendedBatteryKwh} kWh (Deye High Voltage)</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span>{lang === 'ar' ? 'طول أسلاك DC الشمسية المقدر:' : 'Estimated DC Solar Cable Length:'}</span>
                  <span className="font-mono font-bold text-amber-400 text-base">{estimatedDcCableMeters} Meters (6mm²)</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span>{lang === 'ar' ? 'عدد أزواج موصلات MC4:' : 'MC4 Connectors Pairs:'}</span>
                  <span className="font-mono font-bold text-amber-400 text-base">{mc4PairsCount} Pairs (IP68)</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span>{lang === 'ar' ? 'أجهزة حماية الصواعق DC SPDs والقواطع:' : 'DC SPDs & Circuit Breakers:'}</span>
                  <span className="font-mono font-bold text-amber-400 text-base">{dcSpdCount} Units (1000V) & {acBreakerAmps}A AC Breaker</span>
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
              {lang === 'ar' ? 'استشر مهندس الطاقة الذكي' : 'AI Energy Consultant'}
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

      {/* Admin Panel Tab */}
      {activeTab === 'admin' && isAdminLoggedIn && (
        <main className="py-16 px-6 max-w-6xl mx-auto space-y-12">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                {lang === 'ar' ? 'لوحة تحكم المهندسين المشرفين' : 'Engineers Admin Dashboard'}
              </h2>
              <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1">
                {lang === 'ar' ? 'إدارة الأسعار، المنتجات، وطلبات العملاء الواردة' : 'Manage pricing, products, and customer quote requests'}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('home')}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl space-y-2">
              <div className="text-xs text-slate-500">{lang === 'ar' ? 'إجمالي المنتجات في الكتالوج' : 'Total Products'}</div>
              <div className="text-3xl font-extrabold text-amber-500 font-mono">{products.length}</div>
            </div>
            <div className="glass-panel p-6 rounded-2xl space-y-2">
              <div className="text-xs text-slate-500">{lang === 'ar' ? 'طلبات الاستشارات الواردة' : 'Inquiries & Leads'}</div>
              <div className="text-3xl font-extrabold text-amber-500 font-mono">{inquiriesList.length}</div>
            </div>
            <div className="glass-panel p-6 rounded-2xl space-y-2">
              <div className="text-xs text-slate-500">{lang === 'ar' ? 'المشرف الحالي' : 'Active Admin'}</div>
              <div className="text-lg font-bold text-emerald-500">Eng. Malek & Ezzaddin</div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl space-y-6">
            <h4 className="text-lg font-bold border-b border-slate-200 dark:border-slate-800 pb-4">
              {lang === 'ar' ? 'سجل طلبات وعروض الأسعار الواردة من العملاء' : 'Customer Quote Requests & Inquiries'}
            </h4>

            {inquiriesList.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-8">
                {lang === 'ar' ? 'لا توجد طلبات جديدة حتى الآن.' : 'No inquiry requests submitted yet.'}
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                    <tr>
                      <th className="p-3">{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
                      <th className="p-3">{lang === 'ar' ? 'اسم العميل' : 'Client Name'}</th>
                      <th className="p-3">{lang === 'ar' ? 'الشركة' : 'Company'}</th>
                      <th className="p-3">{lang === 'ar' ? 'الهاتف' : 'Phone'}</th>
                      <th className="p-3">{lang === 'ar' ? 'البريد' : 'Email'}</th>
                      <th className="p-3">{lang === 'ar' ? 'التفاصيل' : 'Details'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {inquiriesList.map((inq) => (
                      <tr key={inq.id}>
                        <td className="p-3 font-mono">{inq.date}</td>
                        <td className="p-3 font-bold">{inq.name}</td>
                        <td className="p-3">{inq.company}</td>
                        <td className="p-3 font-mono">{inq.phone}</td>
                        <td className="p-3">{inq.email}</td>
                        <td className="p-3 text-slate-600 dark:text-slate-400">{inq.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      )}

      {/* Contact Tab */}
      {activeTab === 'contact' && (
        <main className="py-16 px-6 max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
              {lang === 'ar' ? 'تواصل معنا مباشرة' : 'Get In Touch Directly'}
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {lang === 'ar' ? 'ابدأ رحلة التحول نحو الطاقة النظيفة اليوم' : 'Start Your Clean Energy Transition'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-6 rounded-2xl space-y-4 text-center">
              <div className="w-16 h-16 rounded-full energy-gradient text-white flex items-center justify-center text-xl font-bold mx-auto">
                م.م
              </div>
              <div>
                <h4 className="text-xl font-bold">{lang === 'ar' ? 'المهندس مالك حريبات' : 'Eng. Malek Hraibat'}</h4>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">0594345464</p>
              </div>
              <div className="flex items-center gap-2">
                <a href="tel:0594345464" className="flex-1 py-2.5 text-xs font-bold text-white energy-gradient rounded-xl flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> <span>{lang === 'ar' ? 'اتصال' : 'Call'}</span>
                </a>
                <a href="https://wa.me/970594345464?text=%Dالسلام%20عليكم" target="_blank" rel="noopener noreferrer" className="flex-1 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center justify-center gap-2">
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
                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">0599973304</p>
              </div>
              <div className="flex items-center gap-2">
                <a href="tel:0599973304" className="flex-1 py-2.5 text-xs font-bold text-white energy-gradient rounded-xl flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> <span>{lang === 'ar' ? 'اتصال' : 'Call'}</span>
                </a>
                <a href="https://wa.me/970599973304?text=%Dالسلام%20عليكم" target="_blank" rel="noopener noreferrer" className="flex-1 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" /> <span>واتساب</span>
                </a>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl">
            {quoteSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold">{lang === 'ar' ? 'تم إرسال طلبك وتسجيله بنجاح!' : 'Request Submitted Successfully!'}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  {lang === 'ar' ? 'سيتواصل معك م. مالك أو م. عز الدين في أقرب وقت.' : 'Eng. Malek or Eng. Ezzaddin will reach out shortly.'}
                </p>
                <button onClick={() => { setQuoteSubmitted(false); setActiveTab('home'); }} className="px-6 py-2.5 text-xs font-bold text-white energy-gradient rounded-xl">
                  {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <h4 className="text-lg font-bold border-b border-slate-200 dark:border-slate-800 pb-4">
                  {lang === 'ar' ? 'نموذج طلب عرض سعر أو استشارة أو حجز زيارة ميدانية' : 'Request Proposal or Site Survey'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold">{lang === 'ar' ? 'الاسم الكريم' : 'Full Name'}</label>
                    <input required type="text" value={quoteForm.name} onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })} className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold">{lang === 'ar' ? 'اسم الشركة / المنشأة' : 'Company'}</label>
                    <input required type="text" value={quoteForm.company} onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })} className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                    <input required type="email" value={quoteForm.email} onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })} className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold">{lang === 'ar' ? 'رقم الهاتف' : 'Phone'}</label>
                    <input required type="tel" value={quoteForm.phone} onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })} className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold">{lang === 'ar' ? 'تفاصيل المشروع أو نوع النظام المطللوب' : 'Project Details'}</label>
                  <textarea rows={4} value={quoteForm.details} onChange={(e) => setQuoteForm({ ...quoteForm, details: e.target.value })} placeholder="Jinko panels 720W & Deye inverter..." className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm resize-none" />
                </div>

                <button type="submit" className="w-full py-3.5 text-sm font-bold text-white energy-gradient rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'إرسال الطلب للمهندسين' : 'Submit Request'}</span>
                </button>
              </form>
            )}
          </div>
        </main>
      )}

      {/* Inquiry List Modal */}
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
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold">{lang === 'ar' ? 'تم إرسال قائمة الاستفسار بنجاح!' : 'Inquiry List Submitted!'}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {lang === 'ar' ? 'سيتواصل معك م. مالك أو م. عز الدين لتزويدك بعرض السعر.' : 'Eng. Malek or Eng. Ezzaddin will contact you.'}
                  </p>
                  <button onClick={() => { setCart([]); setCheckoutSubmitted(false); setIsCartOpen(false); }} className="px-5 py-2 text-xs font-bold text-white energy-gradient rounded-xl">
                    {lang === 'ar' ? 'إغلاق' : 'Close'}
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
                          {isAdminLoggedIn && item.price && (
                            <span className="text-xs font-mono text-amber-500 font-bold">${item.price * item.quantity}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded bg-slate-200 dark:bg-slate-800">
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-mono font-bold w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded bg-slate-200 dark:bg-slate-800">
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-4">
                    <button
                      onClick={() => setCheckoutSubmitted(true)}
                      className="w-full py-3 text-xs font-bold text-white energy-gradient rounded-xl shadow-lg"
                    >
                      {lang === 'ar' ? 'إرسال القائمة للمهندسين' : 'Send List to Engineers'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 print:hidden">
        <button
          onClick={() => window.open('https://wa.me/970594345464?text=%Dالسلام%20عليكم', '_blank')}
          className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl flex items-center justify-center transition-all hover:scale-105"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 px-6 mt-20 print:hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/assets/aistudio/Rawafed_Renewable_Energy_Logo_614c1e0c.png" alt="Logo" className="w-8 h-8 object-contain rounded-lg" referrerPolicy="no-referrer" />
              <span className="font-bold text-base">{lang === 'ar' ? 'شركة روافد لحلول الطاقة' : 'Rawafid Energy Solutions'}</span>
            </div>
            <p className="text-xs text-slate-500">
              {lang === 'ar' ? 'إدارة: م. مالك حريبات (0594345464) • م. عز الدين بدارين (0599973304)' : 'Managed by: Eng. Malek & Eng. Ezzaddin'}
            </p>
          </div>
          <div className="space-y-3">
            <h5 className="text-sm font-bold">{lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h5>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-amber-600">{lang === 'ar' ? 'الرئيسية' : 'Home'}</button></li>
              <li><button onClick={() => setActiveTab('quotation-builder')} className="hover:text-amber-600">{lang === 'ar' ? 'منشئ عروض الأسعار' : 'Quotation Builder'}</button></li>
              <li><button onClick={() => setActiveTab('shop')} className="hover:text-amber-600">{lang === 'ar' ? 'معرض المنتجات' : 'Products'}</button></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="text-sm font-bold">{lang === 'ar' ? 'الاعتمادات' : 'Certifications'}</h5>
            <p className="text-xs text-slate-500">Jinko Tiger Neo • Deye Hybrid Inverters • ISO 9001</p>
          </div>
          <div className="space-y-3">
            <h5 className="text-sm font-bold">{lang === 'ar' ? 'تواصل معنا' : 'Contact'}</h5>
            <p className="text-xs text-slate-500 font-mono">0594345464 / 0599973304</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
