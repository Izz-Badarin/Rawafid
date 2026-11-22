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

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: fullPrompt,
      config: {
        systemInstruction,
      },
    });

    res.json({ success: true, text: response.text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate AI consultation response.',
    });
  }
});

export default app;
