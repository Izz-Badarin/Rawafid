/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini AI client server-side
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // API endpoint for AI Energy Consultant & Proposal Generator
  app.post('/api/gemini/consult', async (req, res) => {
    try {
      const { prompt, facilityType, monthlyBill, location, language } = req.body;

      const systemInstruction = language === 'ar'
        ? `أنت خبير استشاري هندسي ومستشار طاقة متجددة في شركة "روافد لحلول الطاقة" (Rawafid Energy Solutions). مهمتك هي تقديم استشارات احترافية دقيقة حول أنظمة الطاقة الشمسية الكهروضوئية، تخزين البطاريات (BESS)، والشبكات الذكية للمنشآت السكنية والتجارية والصناعية. قدم إجابات واضحة، مهنية، ومقترحات أولية مبنية على البيانات المدخلة.`
        : `You are an expert renewable energy consultant and lead engineer at "Rawafid Energy Solutions". Your mission is to provide professional, precise consulting on solar PV systems, battery energy storage (BESS), and smart grid solutions for residential, commercial, and industrial facilities. Provide professional insights and tailored proposal outlines based on user inputs.`;

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

  // Vite development middleware or static serving
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
