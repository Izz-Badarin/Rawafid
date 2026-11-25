/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

app.post('/api/gemini/consult', async (req, res) => {
  try {
    const { prompt, facilityType, monthlyBill, location, language } = req.body;

    const systemInstruction = language === 'ar'
      ? `أنت خبير استشاري هندسي ومستشار طاقة متجددة في شركة "روافد لحلول الطاقة" (Rawafid Energy Solutions). مهمتك هي تقديم استشارات احترافية دقيقة حول أنظمة الطاقة الشمسية الكهروضوئية، تخزين البطاريات (BESS)، والشبكات الذكية للمنشآت السكنية والتجارية والصناعية.`
      : `You are an expert renewable energy consultant and lead engineer at "Rawafid Energy Solutions". Your mission is to provide professional, precise consulting on solar PV systems, battery energy storage (BESS), and smart grid solutions.`;

    const fullPrompt = language === 'ar'
      ? `بيانات العميل أو الاستفسار:\nالنوع: ${facilityType || 'عام'}\nالفاتورة الشهرية التقريبية: ${monthlyBill || 'غير محدد'} دولار\nالموقع: ${location || 'غير محدد'}\nالاستفسار أو الطلب الإضافي: ${prompt || 'أرغب في استشارة حول تحويل منشأتي للطاقة المتجددة.'}`
      : `Client Inquiry Data:\nFacility Type: ${facilityType || 'General'}\nMonthly Electricity Bill: ${monthlyBill || 'N/A'}\nLocation: ${location || 'N/A'}\nInquiry / Request: ${prompt || 'I want consultation on transitioning my facility to renewable energy.'}`;

    if (!process.env.GEMINI_API_KEY) {
      const billNum = Number(String(monthlyBill || '').replace(/[^0-9.]/g, '')) || 0;
      const estimatedKw = billNum > 0 ? Math.max(3, Math.round((billNum / 20) * 10) / 10) : null;
      const demoText = language === 'ar'
        ? `【وضع تجريبي - لم يتم إعداد GEMINI_API_KEY】\n\nشكراً لتواصلك مع روافد لحلول الطاقة.\n\nبناءً على المعطيات الأولية:\n- نوع المنشأة: ${facilityType || 'غير محدد'}\n- الموقع: ${location || 'غير محدد'}\n- الفاتورة الشهرية التقريبية: ${monthlyBill ? monthlyBill + ' دولار' : 'غير محددة'}\n\nالتوصية الأولية:\n1) نظام PV شمسي ${estimatedKw ? `بقدرة تقريبية ${estimatedKw} كيلوواط` : 'بحجم يُحدد بعد مراجعة الاستهلاك'} مع انفيرتر هجين.\n2) خيار BESS (تخزين بطاريات) لتغطية الأحمال الأساسية أثناء الانقطاع ورفع نسبة الاستهلاك الذاتي.\n3) نظام مراقبة ذكي لمتابعة الإنتاج والاستهلاك.\n\nالخطوات التالية:\n- تزويدنا بفواتير كهرباء لآخر 6-12 شهر.\n- معاينة الموقع وتقييم مساحة التركيب والظل.\n- إعداد عرض فني ومالي مفصل.\n\nلتفعيل الاستشارة الذكية الحقيقية، أضف مفتاح GEMINI_API_KEY في إعدادات البيئة.`
        : `[Demo mode - GEMINI_API_KEY is not configured]\n\nThank you for contacting Rawafid Energy Solutions.\n\nBased on your initial inputs:\n- Facility type: ${facilityType || 'Not specified'}\n- Location: ${location || 'Not specified'}\n- Approx. monthly bill: ${monthlyBill ? '$' + monthlyBill : 'Not specified'}\n\nPreliminary recommendation:\n1) Solar PV system ${estimatedKw ? `around ${estimatedKw} kW` : 'sized after reviewing your consumption'} with a hybrid inverter.\n2) Optional BESS (battery storage) to cover critical loads during outages and increase self-consumption.\n3) Smart monitoring for production and energy management.\n\nNext steps:\n- Share 6-12 months of electricity bills.\n- Schedule a site survey for roof/ground area and shading.\n- Receive a detailed technical and financial proposal.\n\nTo enable real AI consultation, set GEMINI_API_KEY in your environment.`;
      return res.json({ success: true, text: demoText, demo: true });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        systemInstruction,
      },
    });

    res.json({ success: true, text: response.text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    const msg = String(error?.message || '');
    const isNetwork = /fetch failed|ECONN|ENOTFOUND|ETIMEDOUT|network|TLS/i.test(msg) || /fetch failed|network/i.test(String(error?.cause?.message || ''));
    if (isNetwork) {
      const billNum = Number(String(req.body?.monthlyBill || '').replace(/[^0-9.]/g, '')) || 0;
      const estimatedKw = billNum > 0 ? Math.max(3, Math.round((billNum / 20) * 10) / 10) : null;
      const language = req.body?.language;
      const facilityType = req.body?.facilityType;
      const location = req.body?.location;
      const monthlyBill = req.body?.monthlyBill;
      const demoText = language === 'ar'
        ? `【وضع تجريبي - تعذر الوصول إلى Gemini API من هذه البيئة】\n\nتم إعداد مفتاح API، لكن الاتصال بخدمة Gemini غير متاح من بيئة التشغيل الحالية.\n\nبناءً على المعطيات الأولية:\n- نوع المنشأة: ${facilityType || 'غير محدد'}\n- الموقع: ${location || 'غير محدد'}\n- الفاتورة الشهرية التقريبية: ${monthlyBill ? monthlyBill + ' دولار' : 'غير محددة'}\n\nالتوصية الأولية:\n1) نظام PV شمسي ${estimatedKw ? `بقدرة تقريبية ${estimatedKw} كيلوواط` : 'بحجم يُحدد بعد مراجعة الاستهلاك'} مع انفيرتر هجين.\n2) خيار BESS (تخزين بطاريات) لتغطية الأحمال الأساسية أثناء الانقطاع.\n3) نظام مراقبة ذكي لمتابعة الإنتاج والاستهلاك.\n\nعند نشر التطبيق في بيئة تملك وصولاً للإنترنت، سيعمل المفتاح تلقائياً.`
        : `[Demo mode - Gemini API unreachable from this environment]\n\nAn API key is configured, but the Gemini service is unreachable from the current runtime environment.\n\nBased on your initial inputs:\n- Facility type: ${facilityType || 'Not specified'}\n- Location: ${location || 'Not specified'}\n- Approx. monthly bill: ${monthlyBill ? '$' + monthlyBill : 'Not specified'}\n\nPreliminary recommendation:\n1) Solar PV system ${estimatedKw ? `around ${estimatedKw} kW` : 'sized after reviewing your consumption'} with a hybrid inverter.\n2) Optional BESS for critical loads and higher self-consumption.\n3) Smart monitoring for production and energy management.\n\nWhen deployed to an environment with internet access (e.g. Vercel), the configured key will work automatically.`;
      return res.json({ success: true, text: demoText, demo: true, warning: msg });
    }
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate AI consultation response.',
    });
  }
});

export default app;
