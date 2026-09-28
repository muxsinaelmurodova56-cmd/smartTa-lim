import { Lesson } from '../types/lesson';

export const DEFAULT_LESSONS: Lesson[] = [
  // 1. MATEMATIKA (5-sinf)
  {
    id: 'lesson-5-matematika-kasrlar',
    subject: 'Matematika',
    grade: '5-sinf',
    topic: 'Oddiy kasrlar va ularni taqqoslash',
    duration: 45,
    level: 'O‘rta',
    overview: {
      title: '5-sinf Matematika: Oddiy kasrlar va ularni taqqoslash sirlari',
      objectives: [
        'Oddiy kasr tushunchasi, surati va maxrajining ma’nosini to‘liq anglash',
        'Bir xil maxrajli va bir xil suratli kasrlarni taqqoslash qoidalarini amalda qo‘llash',
        'Kasrlarni hayotiy pissa, shokolad va olma bo‘laklari misolida vizual tasavvur qilish'
      ],
      expectedOutcomes: [
        'O‘quvchi kasr chizig‘i, surat va maxrajni aniq ajrata oladi',
        'Bir xil maxrajli kasrlarda surati kattasi katta bo‘lishini tushunadi va > , < , = belgilarini to‘g‘ri qo‘yadi',
        'Kasrlarni sonlar o‘qida joylashtirishni biladi'
      ],
      methodologyAdvice: '5-sinf o‘quvchilarining yosh xususiyatini inobatga olgan holda ko‘rgazmali shakllar (pissa doirasi, shokolad plitkalari) va qiziqarli blits-savollardan foydalanish tavsiya etiladi.'
    },
    stages: [
      {
        stageId: 'org',
        name: 'Tashkiliy qism',
        timeRange: '0–5 daqiqa',
        durationMinutes: 5,
        greeting: 'Assalomu alaykum, bilimdon 5-sinf o‘quvchilari! Matematika darsimizga xush kelibsiz.',
        topicDisplay: 'Mavzu: Oddiy kasrlar va ularni taqqoslash (5-sinf)',
        goalsExplanation: 'Bugun sizlar bilan bir butun narsani teng bo‘laklarga bo‘lishni, kasrlar nima ekanini va qaysi kasr katta ekanini aniqlashni o‘rganamiz!',
        rules: [
          'Darsda diqqat bilan qatnashish va daftarga chiroyli qayd etish',
          'Interaktiv topshiriqlarni tez va to‘g‘ri yechishga harakat qilish',
          'Savol tug‘ilganda erkin berish'
        ],
        attendancePrompt: '5-sinf o‘quvchilari davomati va dars qurollari (chizg‘ich, qalam, daftar) tayyorgarligi tekshiriladi.'
      },
      {
        stageId: 'mot',
        name: 'Motivatsiya va muammoli vaziyat',
        timeRange: '5–10 daqiqa',
        durationMinutes: 5,
        question: 'Tug‘ilgan kunda katta pissa 8 ta teng bo‘lakka bo‘lindi. Ahmad 3 bo‘lak yedi, Karim esa 2 bo‘lak yedi. Kim ko‘proq pissa yedi va ularning yegan qismini qanday son bilan yozamiz?',
        realWorldScenario: 'Hayotda har doim butun narsalar bo‘lavermaydi: yarimta non, chorak soat, yarim litr sut — bularning barchasi KASR sonlardir!',
        visualPrompt: '🍕 8 bo‘lakli pissa: Ahmad 3/8 qismini, Karim esa 2/8 qismini yedi. 3/8 > 2/8 !',
        warmUpQuiz: {
          question: 'Agar bitta qovun 4 ta teng bo‘lakka bo‘linsa, bitta bo‘lak qanday yoziladi?',
          options: ['1/2', '1/4', '4/1', '2/4'],
          answerIndex: 1,
          explanation: 'Butun 4 ga bo‘lingani uchun maxrajda 4, 1 ta bo‘lak olingani uchun suratda 1 bo‘ladi: 1/4 (chorak).'
        }
      },
      {
        stageId: 'exp',
        name: 'Yangi mavzuni tushuntirish',
        timeRange: '10–20 daqiqa',
        durationMinutes: 10,
        theorySummary: 'm/n ko‘rinishidagi songa oddiy kasr deyiladi. Bunda n — kasrning maxraji (butun nechta teng qismga bo‘linganini), m — kasrning surati (nechta qism olinganini) bildiradi. O‘rtadagi chiziq bo‘lish amalini anglatadi.',
        keyConcepts: [
          { term: 'Kasr surati', definition: 'Kasr chizig‘i ustidagi son — olingan bo‘laklar soni.', icon: '⬆️' },
          { term: 'Kasr maxraji', definition: 'Kasr chizig‘i ostidagi son — butun nechta teng qismga bo‘lingani.', icon: '⬇️' },
          { term: 'Bir xil maxrajli kasrlar', definition: 'Maxrajlari teng bo‘lsa, surati kattasi KATTA, surati kichigi KICHIK bo‘ladi.', icon: '⚖️' },
          { term: 'Bir xil suratli kasrlar', definition: 'Suratlari teng bo‘lsa, maxraji KICHIGI KATTA bo‘ladi (chunki kamroq bo‘lakka bo‘lingan).', icon: '🍰' }
        ],
        examples: [
          {
            title: '1-misol: Bir xil maxrajli kasrlarni taqqoslash',
            problem: '5/9 va 7/9 kasrlarini taqqoslang.',
            solution: '5/9 < 7/9 chunki maxrajlar teng (9=9), suratda 7 > 5.',
            stepByStep: [
              '1-qadam: Maxrajlarni tekshiramiz: ikkalasi ham 9 ga teng.',
              '2-qadam: Suratlarni taqqoslaymiz: 7 soni 5 dan katta.',
              '3-qadam: Demak, 7/9 kasri 5/9 dan katta: 5/9 < 7/9.'
            ]
          },
          {
            title: '2-misol: Bir xil suratli kasrlarni taqqoslash',
            problem: '3/4 va 3/8 kasrlarini taqqoslang.',
            solution: '3/4 > 3/8 chunki 4 ta teng bo‘lak 8 ta teng bo‘lakdan kattaroq bo‘ladi.',
            stepByStep: [
              '1-qadam: Suratlarga qaraymiz: ikkalasida ham 3 ta bo‘lak olingan.',
              '2-qadam: Maxrajlarni taqqoslaymiz: 4 va 8. Butun 4 ga bo‘linsa har bir bo‘lak kattaroq bo‘ladi.',
              '3-qadam: Shuning uchun 3/4 > 3/8.'
            ]
          }
        ],
        formulasOrRules: [
          'Maxrajlari bir xil bo‘lsa: a/c > b/c (agar a > b bo‘lsa)',
          'Suratlari bir xil bo‘lsa: a/b > a/c (agar b < c bo‘lsa)',
          'To‘g‘ri kasr: Surati maxrajidan kichik (masalan, 3/5 < 1)'
        ],
        aiVisualExplanation: 'O‘ylab ko‘ring: 1 ta shokoladni 2 kishi bo‘lishsa (1/2) ko‘p tegadimi yoki 10 kishi bo‘lishsa (1/10) ko‘p tegadimi? Albatta, 2 kishiga ko‘p tegadi! Shuning uchun 1/2 > 1/10.'
      },
      {
        stageId: 'prac',
        name: 'Interaktiv amaliy mashg‘ulot',
        timeRange: '20–30 daqiqa',
        durationMinutes: 10,
        tasks: [
          {
            id: 'task-mat-1',
            type: 'multiple_choice',
            title: '1-topshiriq: Kasr qismini aniqlash',
            instructions: 'Savolga to‘g‘ri javobni tanlang.',
            question: 'Sinfdagi 25 nafar o‘quvchidan 14 nafari qizlar. Qizlar butun sinfning qanday qismini tashkil qiladi?',
            options: ['11/25', '14/25', '25/14', '14/11'],
            correctAnswerIndex: 1,
            explanation: 'Butun sinf 25 nafar (maxraj), qizlar esa 14 nafar (surat). Javob: 14/25.'
          },
          {
            id: 'task-mat-2',
            type: 'true_false',
            title: '2-topshiriq: Rost yoki Yolg‘on?',
            instructions: 'Quyidagi mulohazaning to‘g‘ri yoki noto‘g‘riligini belgilang.',
            statement: 'Bir xil maxrajli ikkita kasrdan surati kichigi har doim katta bo‘ladi.',
            isTrue: false,
            explanation: 'Noto‘g‘ri! Bir xil maxrajli kasrlarda qaysi birining surati KATTA bo‘lsa, o‘sha kasr katta bo‘ladi.'
          },
          {
            id: 'task-mat-3',
            type: 'matching',
            title: '3-topshiriq: Moslikni toping',
            instructions: 'Kasrlarning taqqoslash natijasini moslang.',
            pairs: [
              { left: '4/7 va 6/7', right: '4/7 < 6/7' },
              { left: '5/8 va 5/12', right: '5/8 > 5/12' },
              { left: '9/9 va 1 butun', right: '9/9 = 1' }
            ]
          },
          {
            id: 'task-mat-4',
            type: 'drag_order',
            title: '4-topshiriq: O‘sish tartibida joylashtiring',
            instructions: 'Kasrlarni eng kichigidan boshlab eng kattasiga qarab tartiblang.',
            correctOrder: ['1/9', '3/9', '5/9', '8/9'],
            scrambledItems: ['5/9', '1/9', '8/9', '3/9'],
            explanation: 'Maxrajlari bir xil (9) bo‘lgani uchun suratlarning o‘sish tartibi: 1 < 3 < 5 < 8.'
          },
          {
            id: 'task-mat-5',
            type: 'fill_blanks',
            title: '5-topshiriq: Bo‘sh o‘rinni to‘ldiring',
            instructions: 'Matndagi bo‘sh joyga mos so‘zni yozing.',
            templateText: 'Kasr chizig‘ining ostidagi son kasrning {blank} deb ataladi.',
            blankAnswers: ['maxraji'],
            acceptableAlternatives: { 'maxraji': ['maxraj', 'maxraji'] },
            explanation: 'Kasr chizig‘i ostidagi son maxraj bo‘lib, butun nechta qismga bo‘linganini ko‘rsatadi.'
          }
        ]
      },
      {
        stageId: 'reinf',
        name: 'Mustahkamlash va xatolar ustida ishlash',
        timeRange: '30–38 daqiqa',
        durationMinutes: 8,
        questions: [
          {
            id: 'reinf-mat-1',
            question: 'Daftardagi 12 ta katakdan 7 tasi bo‘yalgan. Bo‘yalmagan qismi qanday kasr bo‘ladi?',
            options: ['7/12', '5/12', '12/5', '5/7'],
            correctIndex: 1,
            whyIncorrect: 'Diqqat: savolda bo‘yalmagan kataklar so‘ralgan! 12 - 7 = 5 ta, demak 5/12.',
            aiExplanation: 'Butun kataklar soni 12 ta. Bo‘yalgani 7 ta bo‘lsa, bo‘yalmagani 12 - 7 = 5 ta bo‘ladi. Kasr: 5/12.'
          },
          {
            id: 'reinf-mat-2',
            question: 'Qaysi belgi to‘g‘ri: 4/15 ... 4/11 ?',
            options: ['>', '<', '=', 'aniqlab bo‘lmaydi'],
            correctIndex: 1,
            whyIncorrect: 'Suratlari bir xil (4). Maxraji kichigi kattaroq bo‘ladi, ya’ni 4/11 katta. Demak, 4/15 < 4/11.',
            aiExplanation: 'Suratlari teng bo‘lgan kasrlarda maxraji kichik bo‘lgan kasr kattaroq bo‘ladi. 11 < 15 bo‘lgani uchun 4/15 < 4/11.'
          },
          {
            id: 'reinf-mat-3',
            question: '1 butun soni quyidagi qaysi kasrga teng?',
            options: ['3/4', '7/8', '10/10', '5/2'],
            correctIndex: 2,
            whyIncorrect: 'Kasr surati va maxraji teng bo‘lsa, u 1 butunga teng bo‘ladi (10 / 10 = 1).',
            aiExplanation: 'Kasr chizig‘i bo‘lish amali: 10 : 10 = 1. Surat va maxraj bir xil bo‘lsa, natija 1 bo‘ladi.'
          }
        ],
        weakTopicAnalysisPrompt: 'Agar o‘quvchi kasrlarni taqqoslashda adashsa: pissa yoki shokolad rasmini chizib, bo‘laklarni ko‘z bilan solishtirish tavsiya etiladi.'
      },
      {
        stageId: 'eval',
        name: 'Yakuniy baholash',
        timeRange: '38–42 daqiqa',
        durationMinutes: 4,
        questions: [
          {
            id: 'eval-mat-1',
            question: '3/7 va 5/7 kasrlaridan qaysi biri katta?',
            options: ['3/7', '5/7', 'Ikkalasi teng', 'Taqqoslab bo‘lmaydi'],
            correctAnswerIndex: 1,
            points: 25
          },
          {
            id: 'eval-mat-2',
            question: 'Bir sutkaning 7 soati sutkaning qanday qismini tashkil qiladi?',
            options: ['7/12', '7/24', '7/60', '24/7'],
            correctAnswerIndex: 1,
            points: 25
          },
          {
            id: 'eval-mat-3',
            question: 'To‘g‘ri tengsizlikni toping:',
            options: ['1/5 > 1/3', '2/9 > 7/9', '6/11 > 4/11', '8/10 < 3/10'],
            correctAnswerIndex: 2,
            points: 25
          },
          {
            id: 'eval-mat-4',
            question: 'Kasrning maxraji nimani bildiradi?',
            options: ['Olingan qismlar sonini', 'Butun nechta teng bo‘lakka bo‘linganini', 'Kasrning faqat nomini', 'Bo‘lish qoldig‘ini'],
            correctAnswerIndex: 1,
            points: 25
          }
        ],
        gradingScale: {
          excellent: 85,
          good: 70,
          satisfactory: 55
        }
      },
      {
        stageId: 'refl',
        name: 'Refleksiya va uy vazifasi',
        timeRange: '42–45 daqiqa',
        durationMinutes: 3,
        reflectionQuestions: [
          'Bugungi darsda kasrlar haqida qanday yangi qoidani o‘rgandingiz?',
          'Qaysi kasrlarni taqqoslash sizga qiyinroq tuyuldi (bir xil maxrajlimi yoki bir xil suratli)?',
          'Mavzuni 1 dan 5 gacha baholang: qanchalik tushundingiz?',
          'Keyingi darsda yana qaysi misollarni takrorlashimizni xohlaysiz?'
        ],
        lessonSummary: 'Bugungi 45 daqiqalik darsda biz oddiy kasrlar nima ekanini, ularning surati va maxrajini hamda bir xil maxrajli/suratli kasrlarni taqqoslash qoidalarini mukammal o‘rgandik.',
        homework: {
          mandatory: 'Darslikdagi 145-, 146-mashqlarni daftarda yechish (kasrlarni taqqoslash).',
          creative: 'Uyda o‘zingiz xush ko‘rgan meva yoki pishiriqni teng bo‘laklarga bo‘lib, oilangiz a’zolariga tarqating va kimga qanday kasr to‘g‘ri kelganini rasmi bilan chizing!'
        }
      }
    ]
  },

  // 2. ONA TILI (5-sinf)
  {
    id: 'lesson-5-onatili-ot',
    subject: 'Ona tili',
    grade: '5-sinf',
    topic: 'Ot so‘z turkumi: Turdosh va atoqli otlar',
    duration: 45,
    level: 'O‘rta',
    overview: {
      title: '5-sinf Ona tili: Ot so‘z turkumi va uning turlari',
      objectives: [
        'Ot so‘z turkumi, uning so‘roqlari (Kim? Nima? Qayer?) va ma’no turlarini o‘rganish',
        'Atoqli va turdosh otlarni bir-biridan farqlash hamda ularning bosh harf bilan yozilish qoidasini o‘zlashtirish',
        'Og‘zaki va yozma nutqda otlardan to‘g‘ri va o‘rinli foydalanish'
      ],
      expectedOutcomes: [
        'O‘quvchi matndan otlarni topa oladi va so‘rog‘ini beradi',
        'Atoqli otlarni doimo bosh harf bilan yozish imlo qoidasiga qat’iy rioya qiladi',
        'Turdosh otlar qanday qilib atoqli otga aylanishini misollar bilan tushuntira oladi'
      ],
      methodologyAdvice: '«Kim chaqqon?», «Klaster» va interaktiv kartochkalar usuli orqali o‘quvchilar lug‘at boyligini oshirish va imlo ziyrakligini rivojlantirish.'
    },
    stages: [
      {
        stageId: 'org',
        name: 'Tashkiliy qism',
        timeRange: '0–5 daqiqa',
        durationMinutes: 5,
        greeting: 'Assalomu alaykum, aziz 5-sinf o‘quvchilari! Go‘zal ona tili darsimizga xush kelibsiz.',
        topicDisplay: 'Mavzu: Ot so‘z turkumi. Turdosh va atoqli otlar',
        goalsExplanation: 'Bugun atrofimizdagi narsa-buyumlar, insonlar va shahar-qishloqlarning nomlarini bildiruvchi so‘zlarni hamda ularning imlosini o‘rganamiz.',
        rules: [
          'Nutqimizni toza va adabiy tilda olib borish',
          'Har bir so‘zning imlosiga va tinish belgilariga e’tibor berish',
          'Savollarga faol javob qaytarish'
        ],
        attendancePrompt: '5-sinf o‘quvchilari davomati va husnixat daftarlari tekshiriladi.'
      },
      {
        stageId: 'mot',
        name: 'Motivatsiya va muammoli vaziyat',
        timeRange: '5–10 daqiqa',
        durationMinutes: 5,
        question: '«Lola do‘kondan chiroyli lola gulini sotib oldi» jumlasi yozilgan. Nima uchun birinchi «Lola» bosh harf bilan, ikkinchi «lola» esa kichik harf bilan yozilgan?',
        realWorldScenario: 'Tasavvur qiling, barcha shahar, daryo va inson ismlari kichik harf bilan yozilsa, matnni o‘qish va tushunish qanchalik chalkash bo‘lar edi!',
        visualPrompt: '🌸 Lola (qiz bola ismi — Atoqli ot) va lola (gul turi — Turdosh ot). Qoidasi juda oddiy!',
        warmUpQuiz: {
          question: 'Quyidagi so‘zlardan qaysi biri «Kim?» so‘rog‘iga javob bo‘ladi?',
          options: ['Kitob', 'O‘qituvchi', 'Maktab', 'Qalam'],
          answerIndex: 1,
          explanation: 'O‘zbek tilida faqat insonlarga nisbatan «Kim?», qolgan barcha narsa va jonzotlarga «Nima?» so‘rog‘i beriladi.'
        }
      },
      {
        stageId: 'exp',
        name: 'Yangi mavzuni tushuntirish',
        timeRange: '10–20 daqiqa',
        durationMinutes: 10,
        theorySummary: 'Shaxs, narsa-buyum, o‘rin-joy va tushunchalarning nomini bildirib, Kim? Nima? Qayer? so‘roqlariga javob bo‘lgan mustaqil so‘z turkumi OT deyiladi. Otlar ma’nosiga ko‘ra atoqli va turdosh otlarga bo‘linadi.',
        keyConcepts: [
          { term: 'Atoqli ot', definition: 'Bir turdagi narsa-buyum yoki shaxslarning faqat bittasiga xos bo‘lgan yakka nomlar. Doimo BOSH HARF bilan yoziladi (Samarqand, Navoiy, O‘zbekiston).', icon: '🌟' },
          { term: 'Turdosh ot', definition: 'Bir xil narsa-buyum, hodisa yoki shaxslarning umumiy nomi. Odatda kichik harf bilan yoziladi (shahar, daryo, bola, daraxt).', icon: '📦' },
          { term: 'O‘zbek tilidagi qoida', definition: 'Faqat insonlarga «Kim?», qolgan jonzotlar (hayvon, qush) va narsalarga «Nima?» so‘rog‘i beriladi.', icon: '💡' }
        ],
        examples: [
          {
            title: '1-namuna: Turdosh va atoqli otlar juftligi',
            problem: 'Turdosh ot: «daryo», Atoqli ot: «Sirdaryo».',
            solution: '«daryo» — har qanday oqar suv (kichik harf), «Sirdaryo» — aynan bitta daryoning maxsus nomi (bosh harf).',
            stepByStep: [
              'shahar ➔ Toshkent, Buxoro',
              'shoir ➔ Erkin Vohidov, Abdulla Oripov',
              'tog‘ ➔ Chimyon, Tyan-Shan'
            ]
          }
        ],
        formulasOrRules: [
          'Kishilarning ismi, familiyasi, taxallusi — Atoqli ot (bosh harf)',
          'Geografik nomlar (davlat, shahar, ko‘l, daryo) — Atoqli ot',
          'Kitob, gazeta, film nomlari — qo‘shtirnoq ichida va bosh harf bilan yoziladi: «Shum bola» qissasi'
        ],
        aiVisualExplanation: 'Eslab qoling: Agar nom bittagina o‘ziga xos bo‘lsa — bosh harf bilan bezatiladi (Atoqli ot)! Agar barcha o‘xshash narsalarning umumiy nomi bo‘lsa — turdosh ot.'
      },
      {
        stageId: 'prac',
        name: 'Interaktiv amaliy mashg‘ulot',
        timeRange: '20–30 daqiqa',
        durationMinutes: 10,
        tasks: [
          {
            id: 'task-ona-1',
            type: 'multiple_choice',
            title: '1-topshiriq: Atoqli otni aniqlang',
            instructions: 'Quyidagi qatordan atoqli otni toping.',
            question: 'Quyidagi so‘zlardan qaysi biri atoqli ot hisoblanadi va doim bosh harf bilan yoziladi?',
            options: ['Daftar', 'Samarqand', 'O‘quvchi', 'Daryo'],
            correctAnswerIndex: 1,
            explanation: 'Samarqand — qadimiy va muayyan shahar nomi bo‘lgani uchun atoqli otdir.'
          },
          {
            id: 'task-ona-2',
            type: 'true_false',
            title: '2-topshiriq: Qoidani tekshirish',
            instructions: 'To‘g‘ri yoki noto‘g‘ri ekanini belgilang.',
            statement: 'O‘zbek tilida barcha hayvonlarga (ot, it, mushuk, sher) «Kim?» so‘rog‘i beriladi.',
            isTrue: false,
            explanation: 'Noto‘g‘ri! O‘zbek tilida «Kim?» so‘rog‘i faqat insonlarga beriladi. Hayvonlarga «Nima?» so‘rog‘i beriladi.'
          },
          {
            id: 'task-ona-3',
            type: 'matching',
            title: '3-topshiriq: Turdosh va atoqli otlarni juftlang',
            instructions: 'Umumiy nomni uning aniq atoqli nomi bilan moslang.',
            pairs: [
              { left: 'Shoir', right: 'Alisher Navoiy' },
              { left: 'Daryo', right: 'Amudaryo' },
              { left: 'Sayyora', right: 'Mars' },
              { left: 'Ertak qahramoni', right: 'Zulmat podshosi' }
            ]
          },
          {
            id: 'task-ona-4',
            type: 'drag_order',
            title: '4-topshiriq: Gap tuzish tartibi',
            instructions: 'So‘zlarni to‘g‘ri mantiqiy tartibda joylashtiring.',
            correctOrder: ['O‘quvchilar', 'keng', 'kutubxonada', 'kitob', 'o‘qidilar'],
            scrambledItems: ['kitob', 'o‘qidilar', 'O‘quvchilar', 'keng', 'kutubxonada'],
            explanation: 'To‘g‘ri sintaktik tartib: Ega (O‘quvchilar) + hol/aniqlovchi (keng kutubxonada) + to‘ldiruvchi (kitob) + kesim (o‘qidilar).'
          },
          {
            id: 'task-ona-5',
            type: 'fill_blanks',
            title: '5-topshiriq: Imlo qoidasi',
            instructions: 'Bo‘sh joyga to‘g‘ri javobni yozing.',
            templateText: 'Atoqli otlar har doim {blank} harf bilan yoziladi.',
            blankAnswers: ['bosh'],
            acceptableAlternatives: { 'bosh': ['katta', 'bosh harf'] },
            explanation: 'Imlo qoidasiga ko‘ra barcha atoqli otlar birinchi harfi bosh (katta) harf bilan yoziladi.'
          }
        ]
      },
      {
        stageId: 'reinf',
        name: 'Mustahkamlash va xatolar ustida ishlash',
        timeRange: '30–38 daqiqa',
        durationMinutes: 8,
        questions: [
          {
            id: 'reinf-ona-1',
            question: 'Qaysi qatordagi so‘z atoqli ot emas?',
            options: ['O‘zbekiston', 'Toshkent', 'Poytaxt', 'Zarafshon'],
            correctIndex: 2,
            whyIncorrect: '«Poytaxt» — umumiy turdosh ot (dunyoning istalgan davlatida poytaxt bor). Toshkent esa poytaxtning aniq atoqli nomi.',
            aiExplanation: 'Poytaxt — barcha bosh shaharlar uchun umumiy tushuncha (turdosh ot). Qolganlari esa maxsus geografik nomlar (atoqli ot).'
          },
          {
            id: 'reinf-ona-2',
            question: '«Qoravoy» laqabli kuchuk matnda qanday yoziladi?',
            options: ['qoravoy (kichik harf)', '«Qoravoy» (bosh harf bilan)', 'qora voy (ajratib)', 'ixtiyoriy'],
            correctIndex: 1,
            whyIncorrect: 'Hayvonlarga berilgan maxsus laqablar atoqli ot hisoblanadi va bosh harf bilan yoziladi.',
            aiExplanation: 'Hayvon laqablari (Qoravoy, Olapar, Yulduz) ularning shaxsiy nomi bo‘lib, atoqli ot sanaladi va katta harf bilan yoziladi.'
          }
        ],
        weakTopicAnalysisPrompt: 'Agar o‘quvchi atoqli ot imlosida yanglishsa: o‘z ismi va o‘zi yashaydigan mahalla nomini daftarga yozdirish orqali mustahkamlash.'
      },
      {
        stageId: 'eval',
        name: 'Yakuniy baholash',
        timeRange: '38–42 daqiqa',
        durationMinutes: 4,
        questions: [
          {
            id: 'eval-ona-1',
            question: 'Ot so‘z turkumi nimani bildiradi?',
            options: ['Harakatni', 'Belgini', 'Shaxs va narsaning nomini', 'Harakat miqdorini'],
            correctAnswerIndex: 2,
            points: 25
          },
          {
            id: 'eval-ona-2',
            question: 'Faqat atoqli otlar berilgan qatorni toping:',
            options: ['kitob, qalam, daftar', 'Navoiy, Zomin, Toshkent', 'shahar, qishloq, viloyat', 'o‘quvchi, muallim, shifokor'],
            correctAnswerIndex: 1,
            points: 25
          },
          {
            id: 'eval-ona-3',
            question: '«Burgut» so‘ziga qaysi so‘roq beriladi?',
            options: ['Kim?', 'Nima?', 'Qanday?', 'Qancha?'],
            correctAnswerIndex: 1,
            points: 25
          },
          {
            id: 'eval-ona-4',
            question: 'Qaysi jumla imlo jihatdan to‘g‘ri yozilgan?',
            options: [
              'Biz buxoroga poyezdda bordik.',
              'Biz Buxoroga poyezdda bordik.',
              'Biz buxoroga Poyezdda bordik.',
              'Biz Buxoroga Poyezdda bordik.'
            ],
            correctAnswerIndex: 1,
            points: 25
          }
        ],
        gradingScale: {
          excellent: 85,
          good: 70,
          satisfactory: 55
        }
      },
      {
        stageId: 'refl',
        name: 'Refleksiya va uy vazifasi',
        timeRange: '42–45 daqiqa',
        durationMinutes: 3,
        reflectionQuestions: [
          'Bugun atoqli otlar haqida qanday muhim qoidani bilib oldingiz?',
          'Turdosh ot bilan atoqli otni ajratishda qiyinchilik bo‘ldimi?',
          'O‘z bilimingizni 5 ballik tizimda qanday baholaysiz?',
          'Uyda qaysi mavzuni takrorlashni rejalashtirasiz?'
        ],
        lessonSummary: 'Dars davomida ot so‘z turkumining ta’rifi, so‘roqlari, atoqli va turdosh otlarning farqi hamda ularning bosh harf bilan yozilish imlo qoidalari amaliy topshiriqlar bilan mustahkamlandi.',
        homework: {
          mandatory: 'Darslikdagi 82-mashq: Matndan atoqli otlarni topib, tagiga to‘g‘ri chizish va imlosini izohlash.',
          creative: 'O‘zingiz yashayotgan viloyat, tuman, ko‘cha va maktabingiz nomini qatnashtirib, 5 ta gapdan iborat «Mening vatanim» mavzusida kichik matn yozing.'
        }
      }
    ]
  },

  // 3. TABIIY FAN (SCIENCE) (5-sinf)
  {
    id: 'lesson-5-science-quyosh',
    subject: 'Tabiiy fan (Science)',
    grade: '5-sinf',
    topic: 'Quyosh sistemasi va sayyoralar oilasi',
    duration: 45,
    level: 'O‘rta',
    overview: {
      title: '5-sinf Tabiiy fan: Koinot sirlari — Quyosh sistemasi',
      objectives: [
        'Quyosh sistemasi, markaziy yulduz — Quyosh va uning atrofida aylanuvchi 8 ta asosiy sayyorani o‘rganish',
        'Yer guruhi sayyoralari va gigant gaz sayyoralari o‘rtasidagi farqlarni tushunish',
        'Yer sayyorasining hayot uchun qulay noyob sharoitlarini tahlil qilish'
      ],
      expectedOutcomes: [
        'O‘quvchi Quyoshdan uzoqlashish tartibida 8 ta sayyorani ketma-ket aytib bera oladi',
        'Yulduz va sayyora o‘rtasidagi farqni (o‘zidan nur sochish/sochmaslik) izohlaydi',
        'Sayyoralarning xarakterli xususiyatlarini (Mars — qizil sayyora, Saturn — halqali sayyora) biladi'
      ],
      methodologyAdvice: 'Interaktiv koinot modeli, 3D animatsiyalar va yodlashga oson mnemonik qoidalar orqali sayyoralarning fazodagi harakatini ko‘rsatish.'
    },
    stages: [
      {
        stageId: 'org',
        name: 'Tashkiliy qism',
        timeRange: '0–5 daqiqa',
        durationMinutes: 5,
        greeting: 'Salom, yosh kashfiyotchilar! Bugun biz ajoyib koinot bo‘ylab sayohatga chiqamiz.',
        topicDisplay: 'Mavzu: Quyosh sistemasi va 8 ta buyuk sayyora',
        goalsExplanation: 'Koinotda Quyosh nima uchun markazda turishi va biz yashayotgan Yer qaysi o‘rinda joylashganini bilib olamiz.',
        rules: [
          'Koinot xaritasini diqqat bilan kuzatish',
          'Sayyoralar nomini to‘g‘ri talaffuz qilish',
          'Savollarda tezkor bo‘lish'
        ],
        attendancePrompt: 'Koinot sayohatchilari davomati va darsga qiziqishi tekshiriladi.'
      },
      {
        stageId: 'mot',
        name: 'Motivatsiya va muammoli vaziyat',
        timeRange: '5–10 daqiqa',
        durationMinutes: 5,
        question: 'Kecha osmonga qaraganingizda ko‘rgan yulduzlar bilan biz yashayotgan Yer sayyorasi o‘rtasida qanday farq bor? Nega Quyosh kechasi ko‘rinmaydi?',
        realWorldScenario: 'Yer Quyosh atrofida soatiga 107 000 km tezlikda uchadi, lekin biz buni nega sezmaymiz?',
        visualPrompt: '🪐 Quyosh ➔ Merkuriy, Venera, Yer, Mars, Yupiter, Saturn, Uran, Neptun!',
        warmUpQuiz: {
          question: 'Quyoshga eng yaqin joylashgan sayyora qaysi?',
          options: ['Yer', 'Mars', 'Merkuriy', 'Venera'],
          answerIndex: 2,
          explanation: 'Merkuriy Quyoshga eng yaqin kichik sayyora bo‘lib, kunduzi juda issiq, kechasi esa muzdek sovuq bo‘ladi.'
        }
      },
      {
        stageId: 'exp',
        name: 'Yangi mavzuni tushuntirish',
        timeRange: '10–20 daqiqa',
        durationMinutes: 10,
        theorySummary: 'Quyosh sistemasi — markazida Quyosh yulduzi joylashgan va uning tortishish kuchi ta’sirida harakatlanuvchi 8 ta sayyora, ularning yo‘ldoshlari, asteroidlar va kometalardan iborat koinot tizimidir.',
        keyConcepts: [
          { term: 'Quyosh', definition: 'Qizigan ulkan gaz shari, o‘zidan yorug‘lik va issiqlik taratuvchi sariq mitti yulduz.', icon: '☀️' },
          { term: 'Yer guruhi sayyoralari', definition: 'Qattiq sirtga ega bo‘lgan 4 ta ichki sayyora: Merkuriy, Venera, Yer, Mars.', icon: '🪨' },
          { term: 'Gigant gaz sayyoralari', definition: 'Gazlardan tashkil topgan ulkan sayyoralar: Yupiter, Saturn, Uran, Neptun.', icon: '🌀' },
          { term: 'Yer — hayot beshigi', definition: 'Quyoshdan uchinchi o‘rinda joylashgan, suyuq suv va kislorodga ega yagona sayyora.', icon: '🌍' }
        ],
        examples: [
          {
            title: 'Sayyoralarni eslab qolish formulasi (Tartib bo‘yicha)',
            problem: 'Quyoshdan boshlab 8 ta sayyoraning ketma-ketligi:',
            solution: 'Merkuriy ➔ Venera ➔ Yer ➔ Mars ➔ Yupiter ➔ Saturn ➔ Uran ➔ Neptun',
            stepByStep: [
              '1. Merkuriy — eng yaqin va eng kichik',
              '2. Venera — eng yorug‘ va eng qaynoq (Tong yulduzi)',
              '3. Yer — bizning uyimiz, moviy sayyora',
              '4. Mars — qizil rangli temirga boy sayyora',
              '5. Yupiter — eng ulkan dev sayyora',
              '6. Saturn — go‘zal muz va tosh halqalari bor',
              '7. Uran — yoni bilan aylanuvchi muz dev',
              '8. Neptun — eng chetdagi kuchli shamollar esuvchi ko‘k sayyora'
            ]
          }
        ],
        formulasOrRules: [
          'Sayyoralar o‘zidan nur taratmaydi, Quyosh nurini aks ettiradi',
          'Yulduzlar esa ichki yadro reaksiyasi hisobiga o‘zidan nur va issiqlik sochadi'
        ],
        aiVisualExplanation: 'Agar Quyoshni katta tarvuz deb tasavvur qilsak, Yupiter olma, Yer esa kichkinagina no‘xatdek bo‘ladi!'
      },
      {
        stageId: 'prac',
        name: 'Interaktiv amaliy mashg‘ulot',
        timeRange: '20–30 daqiqa',
        durationMinutes: 10,
        tasks: [
          {
            id: 'task-sci-1',
            type: 'multiple_choice',
            title: '1-topshiriq: Eng ulkan sayyorani toping',
            instructions: 'Quyidagi sayyoralardan eng kattasini tanlang.',
            question: 'Quyosh sistemasidagi eng katta sayyora qaysi?',
            options: ['Yer', 'Saturn', 'Yupiter', 'Neptun'],
            correctAnswerIndex: 2,
            explanation: 'Yupiter — butun Quyosh sistemasidagi eng ulkan gigant sayyoradir.'
          },
          {
            id: 'task-sci-2',
            type: 'true_false',
            title: '2-topshiriq: Quyosh haqida mulohaza',
            instructions: 'Mulohazaning to‘g‘ri yoki noto‘g‘riligini aniqlang.',
            statement: 'Quyosh bu sayyora bo‘lib, u Yer atrofida aylanadi.',
            isTrue: false,
            explanation: 'Noto‘g‘ri! Quyosh — yulduz. Aksincha, Yer Quyosh atrofida aylanadi.'
          },
          {
            id: 'task-sci-3',
            type: 'matching',
            title: '3-topshiriq: Sayyora va uning laqabi',
            instructions: 'Sayyoralarni ularning o‘ziga xos ta’rifi bilan moslang.',
            pairs: [
              { left: 'Mars', right: 'Qizil sayyora' },
              { left: 'Yer', right: 'Moviy sayyora (hayot bor)' },
              { left: 'Saturn', right: 'Halqali sayyora' },
              { left: 'Venera', right: 'Eng issiq sayyora' }
            ]
          },
          {
            id: 'task-sci-4',
            type: 'drag_order',
            title: '4-topshiriq: Quyoshdan uzoqlashish tartibi',
            instructions: 'Sayyoralarni Quyoshga yaqinidan boshlab to‘g‘ri joylashtiring.',
            correctOrder: ['Merkuriy', 'Venera', 'Yer', 'Mars'],
            scrambledItems: ['Mars', 'Merkuriy', 'Yer', 'Venera'],
            explanation: 'Ichki sayyoralarning to‘g‘ri tartibi: Merkuriy ➔ Venera ➔ Yer ➔ Mars.'
          },
          {
            id: 'task-sci-5',
            type: 'fill_blanks',
            title: '5-topshiriq: Koinot atamasi',
            instructions: 'Bo‘sh joyni to‘ldiring.',
            templateText: 'Yer Quyoshdan hisoblaganda {blank} o‘rinda joylashgan sayyoradir.',
            blankAnswers: ['uchinchi'],
            acceptableAlternatives: { 'uchinchi': ['3', '3-', '3-o‘rinda'] },
            explanation: 'Yer Merkuriy va Veneradan keyin 3-o‘rinda turadi.'
          }
        ]
      },
      {
        stageId: 'reinf',
        name: 'Mustahkamlash va xatolar ustida ishlash',
        timeRange: '30–38 daqiqa',
        durationMinutes: 8,
        questions: [
          {
            id: 'reinf-sci-1',
            question: 'Nima uchun Venera Merkuriydan ko‘ra issiqroq?',
            options: [
              'Quyoshga eng yaqin bo‘lgani uchun',
              'Qalin karbonat angidrid atmosferasi issiqlikni ushlab qolgani (issiqxona effekti) uchun',
              'Unda doim olov yonib turgani uchun',
              'U Quyoshdan nur olmaydi'
            ],
            correctIndex: 1,
            whyIncorrect: 'Venerada juda qalin karbonat angidrid qatlami bor. U Quyosh issiqligini kiritadi, lekin qaytarib chiqarmaydi.',
            aiExplanation: 'Veneraning qalin atmosferasi issiqxona effektini yuzaga keltiradi, shuning uchun uning sirti 460°C gacha qiziydi.'
          }
        ],
        weakTopicAnalysisPrompt: 'Agar sayyoralarning tartibida chalkashlik bo‘lsa: «M-V-Y-M-Y-S-U-N» bosh harflari orqali eslab qolish taklif etiladi.'
      },
      {
        stageId: 'eval',
        name: 'Yakuniy baholash',
        timeRange: '38–42 daqiqa',
        durationMinutes: 4,
        questions: [
          {
            id: 'eval-sci-1',
            question: 'Quyosh sistemasida nechta asosiy sayyora bor?',
            options: ['7 ta', '8 ta', '9 ta', '10 ta'],
            correctAnswerIndex: 1,
            points: 25
          },
          {
            id: 'eval-sci-2',
            question: 'Quyidagi qaysi jism o‘zidan yorug‘lik sochadi?',
            options: ['Oy', 'Quyosh', 'Mars', 'Yer'],
            correctAnswerIndex: 1,
            points: 25
          },
          {
            id: 'eval-sci-3',
            question: 'Yerning tabiiy yo‘ldoshi nima?',
            options: ['Quyosh', 'Mars', 'Oy', 'Yupiter'],
            correctAnswerIndex: 2,
            points: 25
          },
          {
            id: 'eval-sci-4',
            question: 'Muzli ulkan halqalari bilan mashhur sayyora qaysi?',
            options: ['Saturn', 'Merkuriy', 'Venera', 'Mars'],
            correctAnswerIndex: 0,
            points: 25
          }
        ],
        gradingScale: {
          excellent: 85,
          good: 70,
          satisfactory: 55
        }
      },
      {
        stageId: 'refl',
        name: 'Refleksiya va uy vazifasi',
        timeRange: '42–45 daqiqa',
        durationMinutes: 3,
        reflectionQuestions: [
          'Bugun Quyosh sistemasi haqida sizni eng hayratga solgan fakt nima bo‘ldi?',
          'Qaysi sayyorani ko‘proq o‘rganishni xohlaysiz?',
          'O‘z tushunishingizni yulduzchalar (1-5) bilan baholang.',
          'Keyingi darsda o‘rganmoqchi bo‘lgan savolingiz bormi?'
        ],
        lessonSummary: 'Bugungi qiziqarli darsimizda Quyosh sistemasidagi 8 ta sayyora, ularning o‘ziga xos xususiyatlari va Yer sayyorasining o‘rni har tomonlama tahlil qilindi.',
        homework: {
          mandatory: 'Darslikdagi mavzuni o‘qish va daftarga 8 ta sayyoraning nomini tartib bilan chizib yozish.',
          creative: 'Rangli qog‘oz yoki plastilindan foydalanib o‘zingiz yoqtirgan sayyoraning maketini yasang.'
        }
      }
    ]
  },

  // 4. INFORMATIKA (5-sinf)
  {
    id: 'lesson-5-informatika-kompyuter',
    subject: 'Informatika',
    grade: '5-sinf',
    topic: 'Axborot va uning xillari. Kompyuter qurilmalari',
    duration: 45,
    level: 'O‘rta',
    overview: {
      title: '5-sinf Informatika: Axborot dunyosi va zamonaviy kompyuter',
      objectives: [
        'Axborot tushunchasi, axborotni qabul qilish a’zolari (ko‘rish, eshitish, hid, ta’m, sezgi) bilan tanishish',
        'Kompyuterning asosiy (tizimli blok, monitor, klaviatura, sichqoncha) va qo‘shimcha qurilmalarini o‘rganish',
        'Kompyuter xonasida texnika xavfsizligi va to‘g‘ri o‘tirish qoidalariga amal qilish'
      ],
      expectedOutcomes: [
        'O‘quvchi axborot turlarini (matnli, grafik, audio, video, sonli) farqlaydi',
        'Kiritish va chiqarish qurilmalarini to‘g‘ri tasniflaydi',
        'Klaviatura va sichqonchadan to‘g‘ri foydalanish ko‘nikmasini namoyish etadi'
      ],
      methodologyAdvice: 'Amaliy kompyuter xonasida vizual qurilmalarni ko‘rsatish va «Qaysi qurilma nimaga javob beradi?» blits-savol o‘yini orqali tushuntirish.'
    },
    stages: [
      {
        stageId: 'org',
        name: 'Tashkiliy qism',
        timeRange: '0–5 daqiqa',
        durationMinutes: 5,
        greeting: 'Assalomu alaykum, kelajak dasturchilari va axborot texnologiyalari ixlosmandlari!',
        topicDisplay: 'Mavzu: Axborot nima? Kompyuterning asosiy va qo‘shimcha qurilmalari',
        goalsExplanation: 'Bugun kompyuter bizning buyruqlarimizni qanday tushunishi va uning asosiy a’zolarini bilib olamiz.',
        rules: [
          'Kompyuter monitoriga juda yaqin o‘tirmaslik (kamida 50-60 sm)',
          'Simlar va rozetkalarga ruxsatsiz tegmaslik',
          'Klaviatura tugmachalarini ehtiyotkorlik bilan bosish'
        ],
        attendancePrompt: '5-sinf o‘quvchilari davomati va xavfsizlik qoidalariga tayyorgarligi tekshiriladi.'
      },
      {
        stageId: 'mot',
        name: 'Motivatsiya va muammoli vaziyat',
        timeRange: '5–10 daqiqa',
        durationMinutes: 5,
        question: 'Inson axborotni ko‘zi, qulog‘i va qo‘li bilan qabul qiladi. Xo‘sh, kompyuter axborotni qaysi «a’zolari» orqali qabul qiladi?',
        realWorldScenario: 'Siz har kuni smartfon, planshet yoki kompyuterda multfilm ko‘rasiz va o‘yin o‘ynaysiz. Bu barcha jarayonlar axborot almashinuvidir!',
        visualPrompt: '🖥️ Monitor (ko‘rsatadi), ⌨️ Klaviatura (yozadi), 🖱️ Sichqoncha (boshqaradi), 🖲️ Tizimli blok (o‘ylaydi)!',
        warmUpQuiz: {
          question: 'Kompyuterga matn va buyruqlarni kiritish uchun qaysi qurilma xizmat qiladi?',
          options: ['Monitor', 'Printer', 'Klaviatura', 'Kalonka'],
          answerIndex: 2,
          explanation: 'Klaviatura harflar, raqamlar va belgilarni kompyuterga kiritish qurilmasidir.'
        }
      },
      {
        stageId: 'exp',
        name: 'Yangi mavzuni tushuntirish',
        timeRange: '10–20 daqiqa',
        durationMinutes: 10,
        theorySummary: 'Axborot — atrofimizdagi olam, hodisalar va buyumlar haqidagi har qanday xabar va ma’lumotdir. Kompyuter — axborotni qayta ishlovchi, saqlovchi va uzatuvchi universal elektron qurilmadir.',
        keyConcepts: [
          { term: 'Axborot turlari', definition: 'Matnli (kitob), grafik (rasm), audio (musiqa), video (kino) va sonli (hisob-kitob).', icon: '📁' },
          { term: 'Tizimli blok', definition: 'Kompyuterning «miyasi» va yuragi joylashgan asosiy bloki (protsessor, xotira).', icon: '🧠' },
          { term: 'Kiritish qurilmalari', definition: 'Axborotni kompyuter ichiga kirituvchi vositalar: klaviatura, sichqoncha, mikrofon, skaner.', icon: '📥' },
          { term: 'Chiqarish qurilmalari', definition: 'Natijani insonga ko‘rsatuvchi vositalar: monitor, printer, karnay (kalonka).', icon: '📤' }
        ],
        examples: [
          {
            title: 'Kiritish va Chiqarish farqi',
            problem: 'Printer va Skaner o‘rtasidagi farq nima?',
            solution: 'Skaner — qog‘ozdagi rasmni kompyuterga kiritadi (kiritish). Printer — kompyuterdagi hujjatni qog‘ozga chiqaradi (chiqarish).',
            stepByStep: [
              'Kiritish ➔ Klaviatura, Sichqoncha, Mikrofon, Veb-kamera',
              'Chiqarish ➔ Monitor, Printer, Quloqchin (naushnik), Proyektor'
            ]
          }
        ],
        formulasOrRules: [
          'Kompyuter = Tizimli blok + Monitor + Klaviatura + Sichqoncha (asosiy 4 lik)',
          'Qo‘shimcha qurilmalar: Printer, skaner, veb-kamera, kalonka'
        ],
        aiVisualExplanation: 'Kompyuterni insonga o‘xshatish mumkin: Tizimli blok — miya, Monitor — yuz, Klaviatura va sichqoncha — qo‘llar!'
      },
      {
        stageId: 'prac',
        name: 'Interaktiv amaliy mashg‘ulot',
        timeRange: '20–30 daqiqa',
        durationMinutes: 10,
        tasks: [
          {
            id: 'task-inf-1',
            type: 'multiple_choice',
            title: '1-topshiriq: Chiqarish qurilmasi',
            instructions: 'Quyidagilardan faqat axborotni chiqarish qurilmasini toping.',
            question: 'Matn va tasvirlarni qog‘ozga chop etib chiqaruvchi qurilma qaysi?',
            options: ['Skaner', 'Printer', 'Mikrofon', 'Sichqoncha'],
            correctAnswerIndex: 1,
            explanation: 'Printer kompyuterdagi axborotni qog‘ozga chiqaradi.'
          },
          {
            id: 'task-inf-2',
            type: 'true_false',
            title: '2-topshiriq: Xavfsizlik qoidasi',
            instructions: 'To‘g‘ri yoki noto‘g‘ri ekanini belgilang.',
            statement: 'Kompyuter oldida ovqat yeyish va choy ichish mumkin.',
            isTrue: false,
            explanation: 'Noto‘g‘ri! Suyuqlik klaviaturaga to‘kilsa, kompyuter ishdan chiqishi va qisqa tutashuv sodir bo‘lishi mumkin.'
          },
          {
            id: 'task-inf-3',
            type: 'matching',
            title: '3-topshiriq: Qurilmalar va ularning vazifasi',
            instructions: 'Har bir qurilmani uning asosiy vazifasiga moslang.',
            pairs: [
              { left: 'Monitor', right: 'Tasvir va videoni ko‘rsatish' },
              { left: 'Klaviatura', right: 'Matn va sonlarni kiritish' },
              { left: 'Mikrofon', right: 'Ovozni kompyuterga yozish' },
              { left: 'Karnay (kalonka)', right: 'Musiqa va tovushni eshittirish' }
            ]
          },
          {
            id: 'task-inf-4',
            type: 'drag_order',
            title: '4-topshiriq: Kompyuterni yoqish ketma-ketligi',
            instructions: 'Kompyuterni to‘g‘ri ishga tushirish qadamlarini tartiblang.',
            correctOrder: [
              'Elektr tarmog‘ini tekshirish',
              'Tizimli blokdagi Power tugmasini bosish',
              'Monitor tugmasini yoqish',
              'Operatsion tizim yuklanishini kutish'
            ],
            scrambledItems: [
              'Monitor tugmasini yoqish',
              'Elektr tarmog‘ini tekshirish',
              'Operatsion tizim yuklanishini kutish',
              'Tizimli blokdagi Power tugmasini bosish'
            ],
            explanation: 'Avval tok borligini tekshiramiz, keyin blokni yoqamiz, monitorni yoqib tizim ochilishini kutamiz.'
          },
          {
            id: 'task-inf-5',
            type: 'fill_blanks',
            title: '5-topshiriq: Asosiy qurilma',
            instructions: 'Bo‘sh o‘rinni to‘ldiring.',
            templateText: 'Kompyuterning barcha hisob-kitoblarini bajaruvchi «miyasi» bu {blank} hisoblanadi.',
            blankAnswers: ['protsessor'],
            acceptableAlternatives: { 'protsessor': ['protsessor', 'processor', 'tizimli blok'] },
            explanation: 'Protsessor (CPU) kompyuterning barcha amallarini bajaruvchi markaziy miyasidir.'
          }
        ]
      },
      {
        stageId: 'reinf',
        name: 'Mustahkamlash va xatolar ustida ishlash',
        timeRange: '30–38 daqiqa',
        durationMinutes: 8,
        questions: [
          {
            id: 'reinf-inf-1',
            question: 'Skaner kiritish qurilmasimi yoki chiqarish qurilmasimi?',
            options: ['Kiritish qurilmasi', 'Chiqarish qurilmasi', 'Ikkalasi ham', 'Hech biri'],
            correctIndex: 0,
            whyIncorrect: 'Skaner qog‘ozdagi ma’lumotni kompyuter xotirasiga kiritadi, shuning uchun u kiritish qurilmasidir.',
            aiExplanation: 'Axborot kompyuter ichiga kirsa — kiritish (input), kompyuterdan tashqariga chiqsa — chiqarish (output) bo‘ladi.'
          }
        ],
        weakTopicAnalysisPrompt: 'Kiritish va chiqarishni chalkashtiruvchi o‘quvchilar uchun «Axborot qayerga qarab harakatlanyapti?» savolini berish.'
      },
      {
        stageId: 'eval',
        name: 'Yakuniy baholash',
        timeRange: '38–42 daqiqa',
        durationMinutes: 4,
        questions: [
          {
            id: 'eval-inf-1',
            question: 'Kompyuterning asosiy 4 ta qurilmasiga nimalar kiradi?',
            options: [
              'Tizimli blok, monitor, klaviatura, sichqoncha',
              'Printer, skaner, fleshka, naushnik',
              'Klaviatura, printer, disk, proyektor',
              'Monitor, veb-kamera, telefon, modem'
            ],
            correctAnswerIndex: 0,
            points: 25
          },
          {
            id: 'eval-inf-2',
            question: 'Ovozli axborotni kiritish uchun qaysi qurilma ishlatiladi?',
            options: ['Karnay', 'Mikrofon', 'Monitor', 'Skaner'],
            correctAnswerIndex: 1,
            points: 25
          },
          {
            id: 'eval-inf-3',
            question: 'Ko‘z bilan monitor orasidagi xavfsiz masofa qancha bo‘lishi kerak?',
            options: ['10-15 sm', '20-30 sm', '50-60 sm', '2 metr'],
            correctAnswerIndex: 2,
            points: 25
          },
          {
            id: 'eval-inf-4',
            question: 'Quyidagilardan qaysi biri axborot turi emas?',
            options: ['Matnli', 'Grafik', 'Plastmassa', 'Video'],
            correctAnswerIndex: 2,
            points: 25
          }
        ],
        gradingScale: {
          excellent: 85,
          good: 70,
          satisfactory: 55
        }
      },
      {
        stageId: 'refl',
        name: 'Refleksiya va uy vazifasi',
        timeRange: '42–45 daqiqa',
        durationMinutes: 3,
        reflectionQuestions: [
          'Bugungi darsda kompyuter qurilmalari haqida nimani birinchi marta bildingiz?',
          'Kiritish va chiqarish qurilmalarini ajratish qiyin bo‘lmadimi?',
          'Darsdan olgan taassurotingiz qanday?',
          'Kelgusi darsda qaysi dasturni o‘rganishni istaysiz?'
        ],
        lessonSummary: 'Informatika darsida axborot tushunchasi, inson va kompyuter axborot almashinuvi, kompyuterning 4 ta asosiy qurilmasi hamda xavfsizlik qoidalari amalda o‘rganildi.',
        homework: {
          mandatory: 'Daftarga kompyuterning asosiy va qo‘shimcha qurilmalarini 2 ustunga ajratib yozish.',
          creative: 'O‘z uyingizdagi yoki orzuingizdagi kompyuter xonasining rasmini chizing va qurilmalarni belgilang.'
        }
      }
    ]
  },

  // 5. INGLIZ TILI (5-sinf)
  {
    id: 'lesson-5-ingliz-daily-routine',
    subject: 'Ingliz tili',
    grade: '5-sinf',
    topic: 'My Daily Routine & Present Simple',
    duration: 45,
    level: 'O‘rta',
    overview: {
      title: '5th Grade English: My Daily Routine and Time Expressions',
      objectives: [
        'Learn vocabulary for daily habits (wake up, brush teeth, have breakfast, go to school)',
        'Master the Present Simple tense with I, You, We, They and He, She, It (+s/es)',
        'Practice asking and answering questions about daily schedules using «What time do you...?»'
      ],
      expectedOutcomes: [
        'Students can describe their own morning and evening routines in simple English sentences',
        'Students use correct verb forms (I get up vs He gets up)',
        'Students can tell the time (at 7 o’clock, at half past 7)'
      ],
      methodologyAdvice: 'Total Physical Response (harakatlar bilan ko‘rsatish), flashcardlar va juftlikda savol-javob muloqoti orqali jonli nutqni shakllantirish.'
    },
    stages: [
      {
        stageId: 'org',
        name: 'Tashkiliy qism',
        timeRange: '0–5 daqiqa',
        durationMinutes: 5,
        greeting: 'Good morning, dear 5th grade students! Welcome to our English lesson.',
        topicDisplay: 'Topic: My Daily Routine (Kun tartibim)',
        goalsExplanation: 'Today we will learn how to talk about what we do every day from morning till evening!',
        rules: [
          'Speak English as much as possible!',
          'Listen carefully and repeat after the teacher',
          'Be active and have fun!'
        ],
        attendancePrompt: 'Check student attendance and ensure English notebooks and vocabulary books are ready.'
      },
      {
        stageId: 'mot',
        name: 'Motivatsiya va muammoli vaziyat',
        timeRange: '5–10 daqiqa',
        durationMinutes: 5,
        question: 'Look at the picture: The boy is sleeping and the clock shows 7:00 AM. What does he do next? What time do you wake up?',
        realWorldScenario: 'When you meet a friend from London or America, the first thing you share is your school day and daily habits!',
        visualPrompt: '⏰ 07:00 Wake up ➔ 07:15 Wash face ➔ 07:30 Have breakfast ➔ 08:00 Go to school!',
        warmUpQuiz: {
          question: '«Ertalab turmoq» ingliz tilida qanday bo‘ladi?',
          options: ['Go to bed', 'Wake up / Get up', 'Have lunch', 'Do homework'],
          answerIndex: 1,
          explanation: '«Wake up» uyg‘onish, «Get up» esa o‘rindan turish ma’nosini bildiradi.'
        }
      },
      {
        stageId: 'exp',
        name: 'Yangi mavzuni tushuntirish',
        timeRange: '10–20 daqiqa',
        durationMinutes: 10,
        theorySummary: 'Har kuni takrorlanadigan odatiy harakatlar uchun Present Simple (Oddiy hozirgi zamon) ishlatiladi. Ega He, She, It bo‘lsa, fe’l oxiriga -s yoki -es qo‘shiladi.',
        keyConcepts: [
          { term: 'wake up / get up', definition: 'uyg‘onmoq / o‘rindan turmoq', icon: '🌅' },
          { term: 'have breakfast / lunch / dinner', definition: 'nonushta / tushlik / kechki ovqat qilmoq', icon: '🍳' },
          { term: 'brush teeth / wash face', definition: 'tishni yuvmoq / yuzni yuvmoq', icon: '🪥' },
          { term: 'He/She/It + verb(-s)', definition: 'I get up AT 7:00, lekin He gets up AT 7:00.', icon: '📌' }
        ],
        examples: [
          {
            title: 'Examples: Sentence patterns',
            problem: 'Gap tuzish namunasi:',
            solution: 'I wake up at 7 o’clock. My brother wakes up at 7 o’clock.',
            stepByStep: [
              'I / You / We / They + go to school',
              'He / She / It + goes to school',
              'Savol berish: What time do you have breakfast?'
            ]
          }
        ],
        formulasOrRules: [
          'Vaqtlar oldidan doimo «at» predlogi qo‘yiladi: at 7 o’clock, at 8:30',
          'He, She, It uchun: play ➔ plays, watch ➔ watches, do ➔ does'
        ],
        aiVisualExplanation: 'Remember: «He/She/It» loves the letter «S»! Always give them an «S» on the verb!'
      },
      {
        stageId: 'prac',
        name: 'Interaktiv amaliy mashg‘ulot',
        timeRange: '20–30 daqiqa',
        durationMinutes: 10,
        tasks: [
          {
            id: 'task-eng-1',
            type: 'multiple_choice',
            title: 'Task 1: Choose the correct verb form',
            instructions: 'Select the correct option to complete the sentence.',
            question: 'She _____ her teeth every morning.',
            options: ['brush', 'brushes', 'brushing', 'brushed'],
            correctAnswerIndex: 1,
            explanation: 'With «She», the verb takes -es: «brushes».'
          },
          {
            id: 'task-eng-2',
            type: 'true_false',
            title: 'Task 2: Preposition check',
            instructions: 'True or False?',
            statement: 'We say «in 8 o’clock» when telling exact time.',
            isTrue: false,
            explanation: 'False! We say «AT 8 o’clock», not «in».'
          },
          {
            id: 'task-eng-3',
            type: 'matching',
            title: 'Task 3: Match English and Uzbek',
            instructions: 'Match the phrases.',
            pairs: [
              { left: 'do homework', right: 'uy vazifasini bajarmoq' },
              { left: 'go to bed', right: 'uyquga yotmoq' },
              { left: 'have breakfast', right: 'nonushta qilmoq' },
              { left: 'wash hands', right: 'qo‘llarni yuvmoq' }
            ]
          },
          {
            id: 'task-eng-4',
            type: 'drag_order',
            title: 'Task 4: Order of morning routine',
            instructions: 'Put the morning activities in logical order.',
            correctOrder: [
              'I wake up',
              'I brush my teeth',
              'I have breakfast',
              'I go to school'
            ],
            scrambledItems: [
              'I go to school',
              'I wake up',
              'I have breakfast',
              'I brush my teeth'
            ],
            explanation: 'First wake up, then brush teeth, eat breakfast and go to school.'
          },
          {
            id: 'task-eng-5',
            type: 'fill_blanks',
            title: 'Task 5: Fill in the missing word',
            instructions: 'Type the missing preposition.',
            templateText: 'I always wake up {blank} 7 o’clock in the morning.',
            blankAnswers: ['at'],
            acceptableAlternatives: { 'at': ['at'] },
            explanation: 'We use the preposition «at» before specific clock times.'
          }
        ]
      },
      {
        stageId: 'reinf',
        name: 'Mustahkamlash va xatolar ustida ishlash',
        timeRange: '30–38 daqiqa',
        durationMinutes: 8,
        questions: [
          {
            id: 'reinf-eng-1',
            question: 'Tom _____ to school by bus every day.',
            options: ['go', 'goes', 'going', 'is go'],
            correctIndex: 1,
            whyIncorrect: 'Tom bu «He» (u). «Go» fe’li He bilan «goes» shakliga o‘zgaradi.',
            aiExplanation: 'In Present Simple, 3rd person singular (he/she/it) verbs ending in -o take -es: go ➔ goes, do ➔ does.'
          }
        ],
        weakTopicAnalysisPrompt: 'Review «-s» vs «-es» endings for students struggling with 3rd person singular.'
      },
      {
        stageId: 'eval',
        name: 'Yakuniy baholash',
        timeRange: '38–42 daqiqa',
        durationMinutes: 4,
        questions: [
          {
            id: 'eval-eng-1',
            question: 'What is the correct question to ask about time?',
            options: [
              'What time do you wake up?',
              'Where time you wake up?',
              'How time you wake up?',
              'Why time you wake up?'
            ],
            correctAnswerIndex: 0,
            points: 25
          },
          {
            id: 'eval-eng-2',
            question: '«They _____ dinner at 7 PM.»',
            options: ['has', 'have', 'having', 'haves'],
            correctAnswerIndex: 1,
            points: 25
          },
          {
            id: 'eval-eng-3',
            question: 'Which word means «uyquga yotmoq»?',
            options: ['Wake up', 'Get up', 'Go to bed', 'Leave home'],
            correctAnswerIndex: 2,
            points: 25
          },
          {
            id: 'eval-eng-4',
            question: '«He plays football on Sundays.» — Is this sentence grammatically correct?',
            options: ['Yes, completely correct', 'No, should be play', 'No, missing preposition', 'No'],
            correctAnswerIndex: 0,
            points: 25
          }
        ],
        gradingScale: {
          excellent: 85,
          good: 70,
          satisfactory: 55
        }
      },
      {
        stageId: 'refl',
        name: 'Refleksiya va uy vazifasi',
        timeRange: '42–45 daqiqa',
        durationMinutes: 3,
        reflectionQuestions: [
          'What new English words did you learn today?',
          'Was it easy or difficult to use «He/She + verb-s»?',
          'Rate your understanding from 1 to 5 stars.',
          'What part of your daily routine do you like most?'
        ],
        lessonSummary: 'Students practiced morning and evening routines, mastered Present Simple verb agreements, and learned how to tell the time accurately in English.',
        homework: {
          mandatory: 'Write 5 sentences about your own daily routine in your English notebook (e.g. I get up at...)',
          creative: 'Draw your daily schedule clock with small pictures showing each activity.'
        }
      }
    ]
  },

  // 6. TARIX (5-sinf)
  {
    id: 'lesson-5-tarix-fani',
    subject: 'Tarix',
    grade: '5-sinf',
    topic: 'Tarix fani nimani o‘rganadi? Qadimgi ajdodlarimiz',
    duration: 45,
    level: 'O‘rta',
    overview: {
      title: '5-sinf Tarixdan hikoyalar: Tarix fani va uning mo‘jizalari',
      objectives: [
        'Tarix so‘zining ma’nosi, tarix fani nimani o‘rganishi va uning insoniyat hayotidagi o‘rnini anglash',
        'Tarixiy manbalar turlari: Moddiy (arxeologik) va yozma manbalarni farqlash',
        'Ota-bobolarimiz hayoti, qadimgi manzilgohlar va yodgorliklarga hurmat bilan qarash'
      ],
      expectedOutcomes: [
        'O‘quvchi tarix fani o‘tmishni o‘rganishini tushuntira oladi',
        'Arxeologiya va muzeylarning ahamiyatini biladi',
        'Moddiy manbalarga misollar (sopol idishlar, tangalar, mehnat qurollari) keltira oladi'
      ],
      methodologyAdvice: 'Qadimgi buyumlar rasmlari, arxeologik qazishmalar tasvirlari va tarixiy ertaknamo hikoyalar orqali o‘quvchilarda qiziqish uyg‘otish.'
    },
    stages: [
      {
        stageId: 'org',
        name: 'Tashkiliy qism',
        timeRange: '0–5 daqiqa',
        durationMinutes: 5,
        greeting: 'Assalomu alaykum, aziz 5-sinf o‘quvchilari! Vaqt mashinasiga xush kelibsiz — bugun tarix sabog‘i.',
        topicDisplay: 'Mavzu: Tarix fani nimani o‘rganadi? Tarixiy manbalar',
        goalsExplanation: 'Bugun sizlar bilan yuzlab va minglab yillar oldin ajdodlarimiz qanday yashaganini o‘rganamiz.',
        rules: [
          'Tarixiy voqealarni diqqat bilan tinglash',
          'Sana va atamalarni daftarga belgilab borish',
          'Muzey eksponatlariga qiziqish bilan qarash'
        ],
        attendancePrompt: '5-sinf o‘quvchilari davomati va darsga tayyorgarligi tekshiriladi.'
      },
      {
        stageId: 'mot',
        name: 'Motivatsiya va muammoli vaziyat',
        timeRange: '5–10 daqiqa',
        durationMinutes: 5,
        question: 'Yer ostidan topilgan 2000 yillik qadimiy ko‘za yoki oltin tanga bizga nimalarni «so‘zlab berishi» mumkin?',
        realWorldScenario: 'O‘z ajdodlari tarixini bilmagan inson o‘z ildizidan uzilgan daraxtga o‘xshaydi!',
        visualPrompt: '🏺 Qadimiy sopol ko‘za, 🪙 kumush tanga va 📜 pergamentga yozilgan bitiklar.',
        warmUpQuiz: {
          question: '«Tarix» so‘zi arab tilidan tarjima qilinganda qanday ma’noni bildiradi?',
          options: ['Kelajak', 'Vaqt, o‘tmish voqealari bayoni', 'Kitob', 'Yer tuzilishi'],
          answerIndex: 1,
          explanation: 'Tarix arabcha so‘z bo‘lib, ma’lum vaqt va o‘tmishda yuz bergan voqealar haqidagi hikoyani bildiradi.'
        }
      },
      {
        stageId: 'exp',
        name: 'Yangi mavzuni tushuntirish',
        timeRange: '10–20 daqiqa',
        durationMinutes: 10,
        theorySummary: 'Tarix — insoniyat jamiyatining paydo bo‘lishi, o‘tmishdagi hayoti va rivojlanish bosqichlarini o‘rganuvchi fan. Tarixiy bilimlarni biz tarixiy manbalar (moddiy, yozma va og‘zaki) orqali bilib olamiz.',
        keyConcepts: [
          { term: 'Moddiy manbalar', definition: 'Qadimiy binolar, mehnat qurollari, qurol-yarog‘, taqinchoq va tangalar.', icon: '🏺' },
          { term: 'Yozma manbalar', definition: 'Tosh, suyak, teri (pergament) va qog‘ozga bitilgan qadimiy yozuvlar va kitoblar.', icon: '📜' },
          { term: 'Arxeologiya', definition: 'Qadimiy o‘tmishni yer ostidan qazib topilgan moddiy ashyolar orqali o‘rganuvchi fan.', icon: '⛏️' },
          { term: 'Tarix otasi', definition: 'Qadimgi yunon olimi Gerodot «Tarix otasi» deb e’tirof etilgan.', icon: '🏛️' }
        ],
        examples: [
          {
            title: 'Tarixiy manbalar tasnifi',
            problem: 'Topilgan ashyo qaysi manbaga kiradi?',
            solution: 'Qadimiy qabr ichidan topilgan bronza pichoq — moddiy manba; devordagi mixxat yozuvi — yozma manba.',
            stepByStep: [
              '1. Moddiy ➔ Qazilma buyumlar, kiyimlar, imorat qoldiqlari',
              '2. Yozma ➔ Bitiktoshlar, qo‘lyozma kitoblar, xatlar',
              '3. Og‘zaki ➔ Xalq afsonalari, dostonlar, ertaklar'
            ]
          }
        ],
        formulasOrRules: [
          'Tarix = Moddiy manbalar + Yozma manbalar + Og‘zaki meros',
          'Arxeolog olimlar — o‘tmish sirlarini ochuvchi yer osti izquvarlaridir'
        ],
        aiVisualExplanation: 'Tasavvur qiling, siz bir uyga kirdingiz. U yerdagi buyumlar, rasmlar va kundalik daftari orqali u yerda kim yashaganini bilib olasiz. Tarixchi olimlar ham xuddi shunday ish ko‘radi!'
      },
      {
        stageId: 'prac',
        name: 'Interaktiv amaliy mashg‘ulot',
        timeRange: '20–30 daqiqa',
        durationMinutes: 10,
        tasks: [
          {
            id: 'task-tar-1',
            type: 'multiple_choice',
            title: '1-topshiriq: Manba turini aniqlash',
            instructions: 'Quyidagilardan qaysi biri yozma manbaga kiradi?',
            question: 'Quyidagilardan qaysi biri yozma tarixiy manba hisoblanadi?',
            options: ['Mis ko‘za', 'Qadimgi pergament kitob', 'Tosh bolta', 'Kumush bilaguzuk'],
            correctAnswerIndex: 1,
            explanation: 'Kitob va yozuvlar yozma manbalarga kiradi.'
          },
          {
            id: 'task-tar-2',
            type: 'true_false',
            title: '2-topshiriq: Arxeologiya haqida',
            instructions: 'To‘g‘ri yoki noto‘g‘ri ekanini belgilang.',
            statement: 'Arxeologiya fani yulduzlar va sayyoralarni o‘rganadi.',
            isTrue: false,
            explanation: 'Noto‘g‘ri! Arxeologiya o‘tmish moddiy yodgorliklarini qazib o‘rganadi. Yulduzlarni esa astronomiya o‘rganadi.'
          },
          {
            id: 'task-tar-3',
            type: 'matching',
            title: '3-topshiriq: Manbalarni guruhlang',
            instructions: 'Har bir ashyoni o‘z manba turiga moslang.',
            pairs: [
              { left: 'Amir Temur tuzuklari kitobi', right: 'Yozma manba' },
              { left: 'Qadimiy Afrosiyob sopol idishi', right: 'Moddiy manba' },
              { left: '«Alpomish» dostoni', right: 'Og‘zaki manba' },
              { left: 'Oltin tangalar', right: 'Moddiy manba' }
            ]
          },
          {
            id: 'task-tar-4',
            type: 'drag_order',
            title: '4-topshiriq: Tarixiy davrlar ketma-ketligi',
            instructions: 'Insoniyat bosib o‘tgan davrlarni xronologik tartiblang.',
            correctOrder: ['Tosh davri', 'Bronza davri', 'Temir davri', 'O‘rta asrlar'],
            scrambledItems: ['Temir davri', 'Tosh davri', 'O‘rta asrlar', 'Bronza davri'],
            explanation: 'Insoniyat avval toshdan, so‘ngra bronzadan, keyin esa temirdan qurollar yasashni o‘rgangan.'
          },
          {
            id: 'task-tar-5',
            type: 'fill_blanks',
            title: '5-topshiriq: Mashhur shaxs',
            instructions: 'Bo‘sh o‘rinni to‘ldiring.',
            templateText: 'Tarix fanining otasi deb qadimgi yunon olimi {blank} e’tirof etiladi.',
            blankAnswers: ['gerodot'],
            acceptableAlternatives: { 'gerodot': ['Gerodot', 'gerodot'] },
            explanation: 'Gerodot eramizdan avvalgi V asrda yashab o‘tgan birinchi buyuk tarixchidir.'
          }
        ]
      },
      {
        stageId: 'reinf',
        name: 'Mustahkamlash va xatolar ustida ishlash',
        timeRange: '30–38 daqiqa',
        durationMinutes: 8,
        questions: [
          {
            id: 'reinf-tar-1',
            question: 'Nima uchun tangalar tarixchilar uchun juda qimmatli manba hisoblanadi?',
            options: [
              'Chunki ular faqat qimmatbaho metalldan yasalgani uchun',
              'Chunki tangalarda hukmdor ismi, yili va davlat ramzi tasvirlangani uchun',
              'Chunki ular yaltirab turadi',
              'Ular yozma manbaga kirmaydi'
            ],
            correctIndex: 1,
            whyIncorrect: 'Tangalar ustida o‘sha davr hukmdorining surati, zarb qilingan sana va davlat yozuvlari saqlanib qolgan bo‘ladi.',
            aiExplanation: 'Tangalarni o‘rganuvchi numizmatika fani hukmdorlar sulolasi va savdo aloqalari haqida aniq ma’lumot beradi.'
          }
        ],
        weakTopicAnalysisPrompt: 'Moddiy va yozma manbalar farqini aniqlashda qiynalganlarga qo‘l bilan ushlab bo‘ladigan ashyolar va o‘qish mumkin bo‘lgan yozuvlar misolida ko‘rsatish.'
      },
      {
        stageId: 'eval',
        name: 'Yakuniy baholash',
        timeRange: '38–42 daqiqa',
        durationMinutes: 4,
        questions: [
          {
            id: 'eval-tar-1',
            question: 'Tarix fani nimani o‘rganadi?',
            options: ['Kelajak texnologiyalarini', 'Insoniyatning o‘tmish hayotini', 'Faqat tabiat hodisalarini', 'Koinot jismlarini'],
            correctAnswerIndex: 1,
            points: 25
          },
          {
            id: 'eval-tar-2',
            question: 'Qadimiy buyumlarni saqlovchi va xalqqa ko‘rsatuvchi muassasa nima deb ataladi?',
            options: ['Kutubxona', 'Muzey', 'Teatr', 'Stadion'],
            correctAnswerIndex: 1,
            points: 25
          },
          {
            id: 'eval-eval-3',
            question: 'Quyidagilardan qaysi biri moddiy manba hisoblanadi?',
            options: ['Ajdodlarimiz yasagan sopol ko‘zacha', 'Ertak va afsonalar', 'Qadimiy xat', 'Tarix darsligi'],
            correctAnswerIndex: 0,
            points: 25
          },
          {
            id: 'eval-tar-4',
            question: 'Yer osti qazishmalari orqali o‘tmishni o‘rganuvchi fanning nomi nima?',
            options: ['Biologiya', 'Geografiya', 'Arxeologiya', 'Fizika'],
            correctAnswerIndex: 2,
            points: 25
          }
        ],
        gradingScale: {
          excellent: 85,
          good: 70,
          satisfactory: 55
        }
      },
      {
        stageId: 'refl',
        name: 'Refleksiya va uy vazifasi',
        timeRange: '42–45 daqiqa',
        durationMinutes: 3,
        reflectionQuestions: [
          'Bugungi darsda tarixdan qanday qiziqarli yangilik bildingiz?',
          'O‘zingizni bir kun arxeolog sifatida tasavvur qila olasizmi?',
          'Tarix fani sizga yoqdimi? 1 dan 5 gacha baholang.',
          'Uyingizda saqlanayotgan eng qadimgi buyum nima?'
        ],
        lessonSummary: '5-sinf o‘quvchilari bilan tarix fani nima ekani, tarixiy manbalar (moddiy, yozma, og‘zaki) va ularni saqlashning ahamiyati atroflicha o‘rganildi.',
        homework: {
          mandatory: 'Darslikdagi 1-mavzuni o‘qish va manbalar jadvalini daftarga chizish.',
          creative: 'O‘z xonadoningizdagi eng keksa buyum (masalan, bobongizning soati yoki buvingizning sandig‘i) haqida kichik hikoya yozing.'
        }
      }
    ]
  }
];

export const defaultLessons = DEFAULT_LESSONS;
