import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI server-side with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Sample curated full 45-minute lesson for instant offline or fallback use
const FALLBACK_LESSONS: Record<string, any> = {
  'chiziqli-tenglamalar': {
    id: 'lesson-matem-7-chiziqli',
    subject: 'Matematika',
    grade: '7-sinf',
    topic: 'Chiziqli tenglamalar va ularni yechish',
    duration: 45,
    level: 'O‘rta',
    overview: {
      title: '7-sinf: Chiziqli tenglamalar va ularni amaliy yechish usullari',
      objectives: [
        'Chiziqli tenglama tushunchasi va ax = b ko‘rinishidagi tenglamaning mohiyatini anglash',
        'Noma’lum hadni topish va qavslarni ochish orqali tenglamalarni yechish ko‘nikmasini egallash',
        'Kundalik hayotiy masalalarni chiziqli tenglama tuzish orqali modellashtirish'
      ],
      expectedOutcomes: [
        'O‘quvchi ax = b tenglamada x ni mustaqil topa oladi',
        'Qavsli va kasrli sodda chiziqli tenglamalarni bosqichma-bosqich yechadi',
        'Tenglama ildizini tekshirib ko‘rish odatiga ega bo‘ladi'
      ],
      methodologyAdvice: 'Interaktiv metodlar (Blits-savol, klaster, juftlikda ishlash) va vizual tarozi modeli yordamida tenglama tushunchasini mustahkamlash tavsiya etiladi.'
    },
    stages: [
      {
        stageId: 'org',
        name: 'Tashkiliy qism',
        timeRange: '0–5 daqiqa',
        durationMinutes: 5,
        greeting: 'Assalomu alaykum, aziz o‘quvchilar! Bugungi matematika darsimizga xush kelibsiz.',
        topicDisplay: 'Mavzu: Chiziqli tenglamalar (ax = b)',
        goalsExplanation: 'Bugun sizlar bilan tenglikning sehrli muvozanat qonunlarini hamda noma’lum x qiymatini topishning eng oson usullarini o‘rganamiz.',
        rules: [
          'Darsda faol ishtirok etish va mikrofon/chatdan o‘z vaqtida foydalanish',
          'Savollarga javob berishda ketma-ketlikka rioya qilish',
          'Har bir amaliy topshiriqni mustaqil bajarib ko‘rish'
        ],
        attendancePrompt: 'Davomatni tekshirish va darsga tayyorgarlik holatini aniqlash.'
      },
      {
        stageId: 'mot',
        name: 'Motivatsiya va muammoli vaziyat',
        timeRange: '5–10 daqiqa',
        durationMinutes: 5,
        question: 'Tasavvur qiling: ikkita palla tarozi bor. Chap pallada 2 ta bir xil sirli quticha va 6 kg tosh, o‘ng pallada esa 16 kg tosh bor. Qutichalarning har biri necha kilogramm?',
        realWorldScenario: 'Bu kundalik hayotdagi savdo-sotiq, qurilish yoki fizika o‘lchovlaridagi noma’lum miqdorlarni topishning eng sodda modeli — ya’ni TENGLAMA!',
        visualPrompt: '⚖️ Muvozanatdagi tarozi: 2x + 6 = 16 ➔ 2x = 10 ➔ x = 5 kg.',
        warmUpQuiz: {
          question: 'Agar x + 7 = 15 bo‘lsa, x ning qiymati nechaga teng?',
          options: ['6', '7', '8', '9'],
          answerIndex: 2,
          explanation: 'Tenglikning ikkala tomonidan 7 ni ayiramiz: x = 15 - 7 = 8.'
        }
      },
      {
        stageId: 'exp',
        name: 'Yangi mavzuni tushuntirish',
        timeRange: '10–20 daqiqa',
        durationMinutes: 10,
        theorySummary: 'ax = b (bunda a ≠ 0) ko‘rinishidagi tenglamaga bir noma’lumli chiziqli tenglama deyiladi. Tenglama yechish — bu tenglikni to‘g‘ri sonli tenglikka aylantiruvchi ildizni topishdir.',
        keyConcepts: [
          { term: 'Chiziqli tenglama', definition: 'Darajasi 1 bo‘lgan bir noma’lumli tenglama: ax + b = c.', icon: '📐' },
          { term: 'Tenglama ildizi', definition: 'Noma’lum harf o‘rniga qo‘yganda tenglikni to‘g‘ri qiluvchi son qiymati.', icon: '🔑' },
          { term: 'Hadlarni ko‘chirish qoidasi', definition: 'Had tenglikning bir tomonidan ikkinchisiga teskari ishora bilan o‘tadi (+ dan - ga, · dan ÷ ga).', icon: '🔄' }
        ],
        examples: [
          {
            title: '1-misol: Oddiy ko‘rinish',
            problem: '3x - 12 = 0 tenglamani yeching.',
            solution: '3x = 12 ➔ x = 12 / 3 ➔ x = 4.',
            stepByStep: [
              '1-qadam: Ozod son (-12) ni o‘ng tomonga teskari ishora bilan o‘tkazamiz: 3x = 12.',
              '2-qadam: Ikkala tomonni x oldidagi koeffitsient (3) ga bo‘lamiz: x = 4.',
              '3-qadam: Tekshiramiz: 3 · 4 - 12 = 12 - 12 = 0 (To‘g‘ri).'
            ]
          },
          {
            title: '2-misol: Qavsli tenglama',
            problem: '2(x + 4) = 18 tenglamani yeching.',
            solution: '2x + 8 = 18 ➔ 2x = 10 ➔ x = 5.',
            stepByStep: [
              '1-qadam: Qavsni ochamiz: 2 · x + 2 · 4 = 18 ➔ 2x + 8 = 18.',
              '2-qadam: 8 ni o‘ng tarafga o‘tkazamiz: 2x = 18 - 8 = 10.',
              '3-qadam: x ni topamiz: x = 10 / 2 = 5.'
            ]
          }
        ],
        formulasOrRules: [
          'Agar ax = b va a ≠ 0 bo‘lsa, yagona yechim: x = b / a',
          'Agar a = 0 va b = 0 bo‘lsa: 0 · x = 0 (cheksiz ko‘p yechim)',
          'Agar a = 0 va b ≠ 0 bo‘lsa: 0 · x = b (yechimga ega emas)'
        ],
        aiVisualExplanation: 'Vizual qoida: Tenglama bu muvozanatdagi tarozi. Bir pallasiga nima amal bajarsangiz (+, -, *, /), ikkinchi pallasiga ham xuddi shuni bajarishingiz shart!'
      },
      {
        stageId: 'prac',
        name: 'Interaktiv amaliy mashg‘ulot',
        timeRange: '20–30 daqiqa',
        durationMinutes: 10,
        tasks: [
          {
            id: 'task-1',
            type: 'multiple_choice',
            title: 'Test topshirig‘i',
            question: '5x - 15 = 10 tenglamaning ildizini toping:',
            options: ['x = 3', 'x = 5', 'x = 2', 'x = 25'],
            correctAnswerIndex: 1,
            explanation: '5x = 10 + 15 = 25. x = 25 / 5 = 5.'
          },
          {
            id: 'task-2',
            type: 'true_false',
            title: 'Rost / Yolg‘on mulohaza',
            statement: '0 · x = 7 tenglama yagona x = 0 yechimga ega.',
            isTrue: false,
            explanation: 'Nolga har qanday sonni ko‘paytirganda 0 chiqadi, 7 chiqishi mumkin emas. Shuning uchun bu tenglama yechimga ega emas!'
          },
          {
            id: 'task-3',
            type: 'matching',
            title: 'Tenglama va uning ildizini moslashtiring',
            pairs: [
              { left: '4x = 24', right: 'x = 6' },
              { left: '2x + 3 = 11', right: 'x = 4' },
              { left: '9 - x = 2', right: 'x = 7' },
              { left: '3x - 1 = 8', right: 'x = 3' }
            ]
          },
          {
            id: 'task-4',
            type: 'drag_order',
            title: 'Tenglama yechish algoritmi ketma-ketligi',
            instructions: 'Qavsli tenglamani yechish qadamlarini to‘g‘ri tartibda joylashtiring:',
            items: [
              'Qavslarni ko‘paytirish qoidasiga ko‘ra ochish',
              'Noma’lumli hadlarni chapga, ma’lumlarni o‘ngga ko‘chirish',
              'O‘xshash hadlarni ixchamlash',
              'Tenglikning ikkala qismini x oldidagi songa bo‘lish',
              'Topilgan natijani dastlabki tenglamaga qo‘yib tekshirish'
            ],
            correctOrder: [
              'Qavslarni ko‘paytirish qoidasiga ko‘ra ochish',
              'Noma’lumli hadlarni chapga, ma’lumlarni o‘ngga ko‘chirish',
              'O‘xshash hadlarni ixchamlash',
              'Tenglikning ikkala qismini x oldidagi songa bo‘lish',
              'Topilgan natijani dastlabki tenglamaga qo‘yib tekshirish'
            ]
          },
          {
            id: 'task-5',
            type: 'fill_blanks',
            title: 'Bo‘sh joyni to‘ldiring',
            textWithBlanks: 'Agar ax = b tenglamada a nolga teng bo‘lmasa, uning ildizi x = [javob] ifoda orqali topiladi.',
            blankPlaceholder: 'b / a',
            acceptableAnswers: ['b/a', 'b / a', 'b:a'],
            hint: 'Ozod hadni noma’lum oldidagi koeffitsientga bo‘lamiz.'
          }
        ]
      },
      {
        stageId: 'reinf',
        name: 'Mustahkamlash va xatolar tahlili',
        timeRange: '30–38 daqiqa',
        durationMinutes: 8,
        questions: [
          {
            id: 'reinf-1',
            question: '3(2x - 1) = 21 tenglamaning ildizi qaysi?',
            options: ['x = 4', 'x = 3.5', 'x = 5', 'x = 7'],
            correctAnswerIndex: 0,
            commonMisconception: 'Ko‘p o‘quvchilar qavs ochganda faqat 2x ni 3 ga ko‘paytirib, -1 ni esdan chiqarishadi.',
            aiExplanation: 'Avval ikkala tomonni 3 ga bo‘lamiz: 2x - 1 = 7. Keyin 2x = 8 va x = 4. Juda chiroyli va oson yechim!'
          },
          {
            id: 'reinf-2',
            question: '4x + 6 = 2x + 16 tenglamada x nimaga teng?',
            options: ['x = 2', 'x = 5', 'x = 8', 'x = 10'],
            correctAnswerIndex: 1,
            commonMisconception: 'Harfli ifodalarni ko‘chirganda ishorasini almashtirish unutilishi mumkin.',
            aiExplanation: '4x - 2x = 16 - 6 ➔ 2x = 10 ➔ x = 5. Barakalla!'
          },
          {
            id: 'reinf-3',
            question: 'Bir son ikkinchi sondan 5 ga katta. Ularning yig‘indisi 25 ga teng. Kichik sonni toping.',
            options: ['10', '15', '12', '8'],
            correctAnswerIndex: 0,
            commonMisconception: 'Tenglama tuzishda: x + (x + 5) = 25.',
            aiExplanation: '2x + 5 = 25 ➔ 2x = 20 ➔ x = 10 (kichik son). Katta son esa 15 bo‘ladi.'
          }
        ],
        teacherChecklist: [
          'Ishoralarni o‘zgartirish qoidasini barcha o‘quvchilar tushundimi?',
          'Tenglama ildizini tekshirish ko‘nikmasi shakllanganmi?',
          'Zaif o‘quvchilarga soddaroq sonlar bilan tarozi modeli ko‘rsatildimi?'
        ]
      },
      {
        stageId: 'eval',
        name: 'Yakuniy baholash',
        timeRange: '38–42 daqiqa',
        durationMinutes: 4,
        quiz: [
          {
            id: 'eval-1',
            question: '7x = 42 tenglamaning ildizi nechaga teng?',
            options: ['5', '6', '7', '8'],
            correctAnswerIndex: 1,
            points: 25
          },
          {
            id: 'eval-2',
            question: 'Qaysi tenglama chiziqli tenglamaga misol bo‘la oladi?',
            options: ['x² + 4 = 20', '3x - 8 = 10', '1/x = 5', 'x³ = 27'],
            correctAnswerIndex: 1,
            points: 25
          },
          {
            id: 'eval-3',
            question: '2x + 7 = 7 tenglamaning ildizini toping:',
            options: ['x = 1', 'x = 0', 'yechim yo‘q', 'x = 7'],
            correctAnswerIndex: 1,
            points: 25
          },
          {
            id: 'eval-4',
            question: 'Agar 5(x - 2) = 0 bo‘lsa, x nechaga teng?',
            options: ['0', '2', '-2', '5'],
            correctAnswerIndex: 1,
            points: 25
          }
        ],
        gradingScale: {
          excellent: '85 - 100 ball: A’lo daraja! Chiziqli tenglamalarni mukammal o‘zlashtirdingiz.',
          good: '70 - 84 ball: Yaxshi! Qavsli ifodalarda e’tiborliroq bo‘ling.',
          satisfactory: '50 - 69 ball: Qoniqarli. Formula va amallarni qayta takrorlang.'
        }
      },
      {
        stageId: 'refl',
        name: 'Refleksiya va uy vazifasi',
        timeRange: '42–45 daqiqa',
        durationMinutes: 3,
        reflectionPrompts: [
          'Bugun chiziqli tenglamalar haqida qanday yangi qoidani o‘rgandingiz?',
          'Tenglamalarni yechishda qaysi bosqich siz uchun eng murakkab tuyuldi?',
          'Darsdagi o‘z ishtirokingizni 1 dan 5 gacha baholang va sababini yozing.',
          'Keyingi darsda qaysi turdagi tenglamalarni ko‘proq mashq qilmoqchisiz?'
        ],
        lessonSummary: 'Bugungi darsda biz 45 daqiqa davomida ax = b chiziqli tenglamalarining tuzilishi, hadlarni ko‘chirish qoidalari, qavsli tenglamalarni yechish hamda muvozanat modelini to‘liq ko‘rib chiqdik.',
        homework: {
          basic: 'Darslikdagi 142-145-mashqlar (8 ta chiziqli tenglamani daftarga tekshirish bilan yechish).',
          creative: 'Kundalik turmushingizdan (do‘konga borish, masofa va vaqt) bitta chiziqli tenglama tuzing va uning yechimini ko‘rsating.',
          deadLine: 'Ertaga soat 08:30 gacha'
        }
      }
    ],
    teacherNotes: {
      pedagogicalAdvice: 'Tarozi modelini doskada vizual ko‘rsatish o‘quvchilar ongida tushunchaning mustahkam saqlanishiga 80% yordam beradi.',
      equipmentNeeded: 'Elektron doska, chizg‘ich, interaktiv test platformasi, ish daftari.',
      differentiation: {
        forAdvanced: 'Kasr chiziqli va modulli tenglamalarni (masalan, |2x - 3| = 7) qo‘shimcha berish.',
        forStruggling: 'ax = b oddiy bir bosqichli ko‘paytirish-bo‘lishga oid 5 ta sodda misol berish.'
      }
    }
  }
};

// API: Generate Lesson via Gemini 3.8 Flash
app.post('/api/generate-lesson', async (req: Request, res: Response) => {
  try {
    const { subject, grade, topic, duration = 45, level = 'O‘rta', additionalNotes } = req.body;

    if (!subject || !topic) {
      return res.status(400).json({ error: 'Fan va mavzu ko‘rsatilishi shart.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is not set. Returning rich pedagogical template.');
      const fallback = JSON.parse(JSON.stringify(FALLBACK_LESSONS['chiziqli-tenglamalar']));
      fallback.subject = subject;
      fallback.grade = grade || '7-sinf';
      fallback.topic = topic;
      fallback.level = level;
      fallback.overview.title = `${grade || ''} ${subject}: ${topic} bo‘yicha 45 daqiqalik raqamli dars`;
      return res.json({ lesson: fallback, isFallback: true });
    }

    const prompt = `Siz O‘zbekiston xalq ta’limi tizimining tajribali metodist o‘qituvchisisiz.
Quyidagi ma’lumotlar asosida 45 DAQIQALIK TO‘LIQ RAQAMLI INTERAKTIV DARS REJASINI yaratishingiz kerak:
- Fan: ${subject}
- Sinf / Yosh guruhi: ${grade}
- Dars mavzusi: ${topic}
- Dars davomiyligi: ${duration} daqiqa (qat’iy 45 daqiqa)
- O‘quvchilar darajasi: ${level}
- Qo‘shimcha tavsiya: ${additionalNotes || 'Eng zamonaviy, qiziqarli va interaktiv pedagogik texnologiyalardan foydalanilsin'}

Dars qat’iy ravishda quyidagi 7 ta pedagogik bosqichdan iborat bo‘lishi SHART:
1. 0–5 daqiqa — Tashkiliy qism (Salomlashish, davomat, mavzu taqdimoti, dars maqsadlari va qoidalari).
2. 5–10 daqiqa — Motivatsiya (Qiziqarli savol, muammoli vaziyat, real hayotiy misol, o‘quvchilar bilimini faollashtiruvchi mini-savol).
3. 10–20 daqiqa — Yangi mavzuni tushuntirish (Nazariy qisqa tushuntirish, 3 ta asosiy tushuncha, 2 ta batafsil tushuntirilgan misol/yechim, asosiy formulalar/qoidalar, vizual tushuntirish tavsiyasi).
4. 20–30 daqiqa — Interaktiv amaliy mashg‘ulot (Kamida 5 ta xilma-xil interaktiv topshiriq: 1 ta multiple_choice test, 1 ta true_false, 1 ta matching (moslashtirish - 4 ta juftlik), 1 ta drag_order (tartiblash - 4-5 bosqich), 1 ta fill_blanks (bo‘sh joyni to‘ldirish)).
5. 30–38 daqiqa — Mustahkamlash (Kamida 3 ta tahliliy savol, o‘quvchilar qilishi mumkin bo‘lgan odatiy xatolar va AI individual tushuntirishi).
6. 38–42 daqiqa — Yakuniy baholash (4 ta test savoli, ballar va baholash mezonlari).
7. 42–45 daqiqa — Refleksiya (4 ta asosiy savol: Bugun nimani o‘rgandingiz? Qaysi qism qiyin bo‘ldi? Mavzuni qanchalik tushundingiz? Keyingi darsda nimani takrorlash kerak? + dars xulosasi va tabaqalashtirilgan uy vazifasi).

Javobni FAQAT toza JSON formatida quyidagi struktura bo‘yicha qaytaring:
{
  "id": "lesson_...",
  "subject": "${subject}",
  "grade": "${grade}",
  "topic": "${topic}",
  "duration": 45,
  "level": "${level}",
  "overview": {
    "title": "Dars nomi",
    "objectives": ["1-maqsad", "2-maqsad", "3-maqsad"],
    "expectedOutcomes": ["1-natija", "2-natija", "3-natija"],
    "methodologyAdvice": "Metodik tavsiya"
  },
  "stages": [
    {
      "stageId": "org",
      "name": "Tashkiliy qism",
      "timeRange": "0–5 daqiqa",
      "durationMinutes": 5,
      "greeting": "Salomlashish matni",
      "topicDisplay": "Mavzu taqdimoti",
      "goalsExplanation": "Dars maqsadlarining o‘quvchilarga sodda tushuntirilishi",
      "rules": ["1-qoida", "2-qoida", "3-qoida"],
      "attendancePrompt": "Davomat tekshiruvi tavsiyasi"
    },
    {
      "stageId": "mot",
      "name": "Motivatsiya va muammoli vaziyat",
      "timeRange": "5–10 daqiqa",
      "durationMinutes": 5,
      "question": "O‘quvchini hayratga soluvchi qiziqarli savol",
      "realWorldScenario": "Hayotiy muammoli vaziyat",
      "visualPrompt": "Ko‘rsatiladigan tasvir yoki animatsiya tavsifi",
      "warmUpQuiz": {
        "question": "Tezkor faollashtiruvchi savol",
        "options": ["A", "B", "C", "D"],
        "answerIndex": 0,
        "explanation": "Qisqa izoh"
      }
    },
    {
      "stageId": "exp",
      "name": "Yangi mavzuni tushuntirish",
      "timeRange": "10–20 daqiqa",
      "durationMinutes": 10,
      "theorySummary": "Mavzuning ravon va tushunarli matni",
      "keyConcepts": [
        { "term": "Atama", "definition": "Ta'rif", "icon": "emoji" }
      ],
      "examples": [
        {
          "title": "1-misol",
          "problem": "Masala sharti",
          "solution": "Yakuniy yechim",
          "stepByStep": ["1-qadam", "2-qadam", "3-qadam"]
        }
      ],
      "formulasOrRules": ["Asosiy qoida 1", "Asosiy qoida 2"],
      "aiVisualExplanation": "Vizual yoki sxematik tushuntirish"
    },
    {
      "stageId": "prac",
      "name": "Interaktiv amaliy mashg‘ulot",
      "timeRange": "20–30 daqiqa",
      "durationMinutes": 10,
      "tasks": [
        {
          "id": "task-1",
          "type": "multiple_choice",
          "title": "Variantli test",
          "question": "Savol matni",
          "options": ["A", "B", "C", "D"],
          "correctAnswerIndex": 1,
          "explanation": "To‘g‘ri javob izohi"
        },
        {
          "id": "task-2",
          "type": "true_false",
          "title": "Rost / Yolg‘on",
          "statement": "Mulohaza matni",
          "isTrue": true,
          "explanation": "Izoh"
        },
        {
          "id": "task-3",
          "type": "matching",
          "title": "Moslashtirish",
          "pairs": [
            { "left": "Chap tomon 1", "right": "O‘ng tomon 1" },
            { "left": "Chap tomon 2", "right": "O‘ng tomon 2" },
            { "left": "Chap tomon 3", "right": "O‘ng tomon 3" },
            { "left": "Chap tomon 4", "right": "O‘ng tomon 4" }
          ]
        },
        {
          "id": "task-4",
          "type": "drag_order",
          "title": "Ketma-ketlikni joylashtirish",
          "instructions": "Ko‘rsatma",
          "items": ["Qadam 1", "Qadam 2", "Qadam 3", "Qadam 4"],
          "correctOrder": ["Qadam 1", "Qadam 2", "Qadam 3", "Qadam 4"]
        },
        {
          "id": "task-5",
          "type": "fill_blanks",
          "title": "Bo‘sh joyni to‘ldiring",
          "textWithBlanks": "Gap matni va [javob] joyi",
          "blankPlaceholder": "javob",
          "acceptableAnswers": ["javob", "javob1"],
          "hint": "Maslahat"
        }
      ]
    },
    {
      "stageId": "reinf",
      "name": "Mustahkamlash va xatolar tahlili",
      "timeRange": "30–38 daqiqa",
      "durationMinutes": 8,
      "questions": [
        {
          "id": "reinf-1",
          "question": "Mustahkamlovchi savol 1",
          "options": ["A", "B", "C", "D"],
          "correctAnswerIndex": 0,
          "commonMisconception": "O‘quvchilar nima uchun adashadi",
          "aiExplanation": "AI yordamchisining batafsil yechimi va tushuntirishi"
        }
      ],
      "teacherChecklist": ["Tekshiruv bandi 1", "Tekshiruv bandi 2"]
    },
    {
      "stageId": "eval",
      "name": "Yakuniy baholash",
      "timeRange": "38–42 daqiqa",
      "durationMinutes": 4,
      "quiz": [
        {
          "id": "eval-1",
          "question": "Nazorat savoli",
          "options": ["A", "B", "C", "D"],
          "correctAnswerIndex": 0,
          "points": 25
        }
      ],
      "gradingScale": {
        "excellent": "85-100 ball: A’lo",
        "good": "70-84 ball: Yaxshi",
        "satisfactory": "50-69 ball: Qoniqarli"
      }
    },
    {
      "stageId": "refl",
      "name": "Refleksiya va uy vazifasi",
      "timeRange": "42–45 daqiqa",
      "durationMinutes": 3,
      "reflectionPrompts": [
        "Bugun nimani o‘rgandingiz?",
        "Qaysi qism sizga qiyin bo‘ldi?",
        "Mavzuni qanchalik tushundingiz?",
        "Keyingi darsda nimani takrorlash kerak?"
      ],
      "lessonSummary": "Darsning 45 daqiqalik umumiy xulosasi",
      "homework": {
        "basic": "Majburiy uy vazifasi",
        "creative": "Ijodiy yoki tadqiqot vazifasi",
        "deadLine": "Keyingi darsgacha"
      }
    }
  ],
  "teacherNotes": {
    "pedagogicalAdvice": "O‘qituvchi uchun tavsiya",
    "equipmentNeeded": "Kerakli vositalar",
    "differentiation": {
      "forAdvanced": "Iqtidorli o‘quvchilar uchun",
      "forStruggling": "Qo‘llab-quvvatlashga muhtoj o‘quvchilar uchun"
    }
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const rawText = response.text || '{}';
    let cleanJson = rawText.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```/, '').replace(/```$/, '').trim();
    }

    const lessonData = JSON.parse(cleanJson);
    return res.json({ lesson: lessonData, isFallback: false });
  } catch (error: any) {
    console.error('Error generating lesson with Gemini:', error);
    // On error, return a rich fallback adapted to user inputs
    const fallback = JSON.parse(JSON.stringify(FALLBACK_LESSONS['chiziqli-tenglamalar']));
    if (req.body?.subject) fallback.subject = req.body.subject;
    if (req.body?.topic) fallback.topic = req.body.topic;
    if (req.body?.grade) fallback.grade = req.body.grade;
    return res.json({ lesson: fallback, isFallback: true, warning: error.message });
  }
});

// API: AI Student Tutor / Explainer
app.post('/api/ask-tutor', async (req: Request, res: Response) => {
  try {
    const { question, lessonContext, studentGrade, previousMistake } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Savol matni kiritilmadi.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        answer: `Salom! Men sizning AI dars yordamchingizman. Ushbu savol bo‘yicha asosiy tushuncha: berilgan misolni bosqichma-bosqich yechish lozim. Agar formulani eslasangiz, noma’lumni bir tarafga ajratib, amallarni to‘g‘ri tartibda bajarsangiz xato qilmaysiz! Harakat qilishda davom eting! 🌟`
      });
    }

    const prompt = `Siz maktab o‘quvchisiga mehr bilan, tushunarli, dalda beruvchi va aniq o‘zbek tilida yordam beruvchi AI repetitorsiz.
Dars konteksti:
- Fan/Mavzu: ${lessonContext?.subject || 'Dars'} - ${lessonContext?.topic || ''}
- Sinf darajasi: ${studentGrade || 'Maktab'}
${previousMistake ? `- O‘quvchi yaqinda yo‘l qo‘ygan xato: "${previousMistake}"` : ''}

O‘quvchining savoli yoki tushunmagan joyi:
"${question}"

Qoidalaringiz:
1. O‘quvchiga iliq salom bilan murojaat qiling va uni ruhlantiring.
2. Murakkab atamalarni juda sodda misollar (hayotiy voqealar, buyumlar, tarozi) bilan tushuntiring.
3. Agar o‘quvchi xato qilgan bo‘lsa, uni ayblamasdan: "Bu juda yaxshi urinish! Keling, buni mana bu burchakdan qarab ko‘raylik..." deb tushuntiring.
4. Javobingiz 3-4 ta xatboshidan oshmasin, o‘qilishi oson va formatlangan bo‘lsin.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        temperature: 0.8,
      },
    });

    return res.json({ answer: response.text });
  } catch (error: any) {
    console.error('Error asking tutor:', error);
    return res.json({
      answer: `Salom! Bu juda muhim savol. Dars materialini yana bir bor ko‘rib chiqishni va qoidadagi ketma-ketlikni daftarga yozib yechishni tavsiya qilaman. Siz buni albatta uddalaysiz!`
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Dars45 server running at http://localhost:${PORT}`);
  });
}

startServer();
