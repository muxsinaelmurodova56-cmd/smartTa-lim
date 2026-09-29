import { StudentSubmission, WorkBreakdown } from '../types/lesson';

export interface StudentWorkProgress {
  studentName: string;
  attendanceStatus: 'present' | 'late' | 'excused' | 'absent';
  hasHypothesis: boolean;
  warmUpQuizCorrect: boolean;
  theoryReviewed: boolean;
  practiceScore: number; // 0 - 100
  reinforcementCorrectCount: number;
  reinforcementTotalCount: number;
  assessmentScore: number; // 0 - 100
  reflectionSubmitted: boolean;
  reflectionAnswers?: {
    learned: string;
    difficult: string;
    understandingLevel: number;
    toReview: string;
  };
}

export interface CalculatedGrade {
  totalScore: number; // 0 - 100
  finalGrade: 5 | 4 | 3 | 2;
  gradeLabel: string; // "5 (A’lo)", etc.
  gradeColor: string;
  gradeBadge: string;
  badgeEmoji: string;
  verdict: string;
  aiPedagogicalFeedback: string;
  breakdown: WorkBreakdown;
}

export function calculateGradingFromWork(
  progress: StudentWorkProgress,
  subject: string = 'Matematika',
  topic: string = 'Dars mavzusi'
): CalculatedGrade {
  // 1. Attendance & Readiness: 10 pts
  let attendanceScore = 0;
  let attendanceText = 'Darsda ishtirok etmadi';
  if (progress.attendanceStatus === 'present') {
    attendanceScore = 10;
    attendanceText = 'Darsga o‘z vaqtida kirdi va faol qatnashdi (10/10)';
  } else if (progress.attendanceStatus === 'late') {
    attendanceScore = 7;
    attendanceText = 'Darsga biroz kechikib kirdi (7/10)';
  } else if (progress.attendanceStatus === 'excused') {
    attendanceScore = 5;
    attendanceText = 'Sababli qatnashdi (5/10)';
  }

  // 2. Motivation & Brainstorming: 10 pts
  let motivationScore = 0;
  if (progress.hasHypothesis) motivationScore += 5;
  if (progress.warmUpQuizCorrect) motivationScore += 5;
  const motivationText =
    motivationScore === 10
      ? 'Faraz yozildi va kirish jumboq savoli to‘g‘ri topildi (10/10)'
      : motivationScore === 5
      ? 'Miya hujumida faol fikr bildirildi (5/10)'
      : 'Kirish bosqichi qisman bajarildi (0/10)';

  // 3. Theory & Concepts: 10 pts
  const theoryScore = progress.theoryReviewed ? 10 : 6;
  const theoryText = progress.theoryReviewed
    ? 'Yangi mavzu qoidalari va namunali misollar to‘liq o‘rganildi (10/10)'
    : 'Nazariy material ko‘rib chiqildi (6/10)';

  // 4. Interactive Practice: 30 pts (mapped from 0-100)
  const practicePoints = Math.round((Math.max(0, Math.min(100, progress.practiceScore)) / 100) * 30);
  const practiceText = `${progress.practiceScore}% natija — interaktiv amaliy mashqlar mustaqil bajarildi (${practicePoints}/30)`;

  // 5. Reinforcement & Error Analysis: 20 pts
  const reinfRatio =
    progress.reinforcementTotalCount > 0
      ? progress.reinforcementCorrectCount / progress.reinforcementTotalCount
      : 0.8;
  const reinforcementScore = Math.round(reinfRatio * 20);
  const reinforcementText = `${progress.reinforcementCorrectCount}/${progress.reinforcementTotalCount || 5} ta savol to‘g‘ri topildi va AI tahlili ko‘rildi (${reinforcementScore}/20)`;

  // 6. Final Assessment Quiz: 20 pts (mapped from 0-100)
  const assessmentPoints = Math.round((Math.max(0, Math.min(100, progress.assessmentScore)) / 100) * 20);
  const assessmentText = `${progress.assessmentScore}% ball — mustaqil yakuniy nazorat testi topshirildi (${assessmentPoints}/20)`;

  // 7. Reflection & Homework: 10 pts
  const reflectionScore = progress.reflectionSubmitted ? 10 : 5;
  const reflectionText = progress.reflectionSubmitted
    ? '4 ta savolga batafsil javob berildi, uy vazifasi qabul qilindi (10/10)'
    : 'Refleksiya qisman to‘ldirildi (5/10)';

  // Total Score (0 - 100)
  const totalScore = Math.min(
    100,
    attendanceScore +
      motivationScore +
      theoryScore +
      practicePoints +
      reinforcementScore +
      assessmentPoints +
      reflectionScore
  );

  // Determine official grade in Uzbekistan's 5-point school grading scale
  let finalGrade: 5 | 4 | 3 | 2 = 5;
  let gradeLabel = '5 (A’lo)';
  let gradeColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
  let gradeBadge = 'bg-emerald-600 text-white';
  let badgeEmoji = '🏆';
  let verdict = 'A’lo darajadagi bilim va yuksak faollik';
  let aiPedagogicalFeedback = '';

  if (totalScore >= 85) {
    finalGrade = 5;
    gradeLabel = '5 (A’lo)';
    gradeColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
    gradeBadge = 'bg-emerald-600 text-white';
    badgeEmoji = '🏆';
    verdict = 'A’lo darajada o‘zlashtirildi!';
    aiPedagogicalFeedback = `Barakalla, ${progress.studentName}! Siz bugungi 5-sinf «${subject}» fanidan «${topic}» mavzusidagi 45 daqiqalik darsda barcha bosqichlarni a’lo darajada bajardingiz. Nazariyani chuqur tushunganingiz amaliy topshiriqlar va testdagi yuksak natijangizda yaqqol namoyon bo‘ldi. Shu zaylda davom eting!`;
  } else if (totalScore >= 70) {
    finalGrade = 4;
    gradeLabel = '4 (Yaxshi)';
    gradeColor = 'text-blue-700 bg-blue-50 border-blue-300';
    gradeBadge = 'bg-blue-600 text-white';
    badgeEmoji = '⭐';
    verdict = 'Yaxshi natija va faol ishtirok!';
    aiPedagogicalFeedback = `Ofarin, ${progress.studentName}! Mavzuning asosiy mazmunini juda yaxshi o‘zlashtirdingiz. Amaliy mashqlar va test savollariga to‘g‘ri yondashdingiz. Kichik xatoliklarni mustahkamlash qismida qayta ko‘rib chiqdingiz. Keyingi darsda o‘zlashtirishni a’lo darajaga ko‘tarishingizga ishonamiz!`;
  } else if (totalScore >= 50) {
    finalGrade = 3;
    gradeLabel = '3 (Qoniqarli)';
    gradeColor = 'text-amber-700 bg-amber-50 border-amber-300';
    gradeBadge = 'bg-amber-600 text-white';
    badgeEmoji = '📘';
    verdict = 'Qoniqarli, qo‘shimcha mashq zarur';
    aiPedagogicalFeedback = `Harakatlaringiz tahsinga loyiq, ${progress.studentName}. Mavzuning umumiy mazmunini tushundingiz, biroq ayrim amaliy mashqlarda va hisob-kitoblarda qo‘shimcha mustahkamlash lozim. Berilgan uy vazifasini puxta bajarish va darslikdagi qoidalarni qayta o‘qib chiqishni tavsiya qilamiz.`;
  } else {
    finalGrade = 2;
    gradeLabel = '2 (Qayta ishlash)';
    gradeColor = 'text-rose-700 bg-rose-50 border-rose-300';
    gradeBadge = 'bg-rose-600 text-white';
    badgeEmoji = '⚠️';
    verdict = 'Mavzuni qayta o‘rganish tavsiya etiladi';
    aiPedagogicalFeedback = `${progress.studentName}, mavzuni o‘zlashtirishda qiyinchiliklar kuzatildi. Dars qoidalarini AI repetitor yoki o‘qituvchingiz bilan qayta ko‘rib chiqishingiz va amaliy mashqlarni noldan boshlab takrorlashingiz zarur.`;
  }

  const breakdown: WorkBreakdown = {
    attendance: {
      score: attendanceScore,
      max: 10,
      label: 'Tashkiliy qism va Davomat',
      statusText: attendanceText,
    },
    motivation: {
      score: motivationScore,
      max: 10,
      label: 'Motivatsiya va Miya hujumi',
      statusText: motivationText,
    },
    theory: {
      score: theoryScore,
      max: 10,
      label: 'Yangi mavzuni o‘zlashtirish',
      statusText: theoryText,
    },
    practice: {
      score: practicePoints,
      max: 30,
      label: 'Interaktiv amaliy mashg‘ulot',
      statusText: practiceText,
    },
    reinforcement: {
      score: reinforcementScore,
      max: 20,
      label: 'Mustahkamlash va Xatolar tahlili',
      statusText: reinforcementText,
    },
    assessment: {
      score: assessmentPoints,
      max: 20,
      label: 'Mustaqil nazorat testi',
      statusText: assessmentText,
    },
    reflection: {
      score: reflectionScore,
      max: 10,
      label: 'Refleksiya va Uy vazifasi',
      statusText: reflectionText,
    },
  };

  return {
    totalScore,
    finalGrade,
    gradeLabel,
    gradeColor,
    gradeBadge,
    badgeEmoji,
    verdict,
    aiPedagogicalFeedback,
    breakdown,
  };
}

// 5-Grade Sample Class Submissions for rich Gradebook experience
export const INITIAL_CLASS_SUBMISSIONS: StudentSubmission[] = [
  {
    id: 'sub-1',
    studentName: 'Madina Karimova',
    practiceScore: 95,
    assessmentScore: 100,
    totalScore: 98,
    finalGrade: 5,
    gradeLabel: '5 (A’lo)',
    gradeColor: 'text-emerald-700 bg-emerald-50 border-emerald-300',
    gradeBadge: 'bg-emerald-600 text-white',
    completedAt: '10:42',
    submittedAt: '10:42',
    breakdown: {
      attendance: { score: 10, max: 10, label: 'Tashkiliy qism va Davomat', statusText: 'Darsga o‘z vaqtida kirdi va faol qatnashdi (10/10)' },
      motivation: { score: 10, max: 10, label: 'Motivatsiya va Miya hujumi', statusText: 'Faraz yozildi va kirish jumboq savoli to‘g‘ri topildi (10/10)' },
      theory: { score: 10, max: 10, label: 'Yangi mavzuni o‘zlashtirish', statusText: 'Yangi mavzu qoidalari to‘liq o‘rganildi (10/10)' },
      practice: { score: 29, max: 30, label: 'Interaktiv amaliy mashg‘ulot', statusText: '95% natija — barcha amaliy topshiriqlar to‘liq bajarildi (29/30)' },
      reinforcement: { score: 19, max: 20, label: 'Mustahkamlash va Xatolar tahlili', statusText: '5/5 ta savol to‘g‘ri yechildi va AI tahlili ko‘rildi (19/20)' },
      assessment: { score: 20, max: 20, label: 'Mustaqil nazorat testi', statusText: '100% ball — barcha test savollari to‘g‘ri topildi (20/20)' },
      reflection: { score: 10, max: 10, label: 'Refleksiya va Uy vazifasi', statusText: 'Refleksiya savollariga to‘liq javob berildi (10/10)' }
    },
    aiFeedback: 'Madina, bugungi darsda juda yuqori faollik ko‘rsatdingiz! Oddiy kasrlar mavzusini mustahkam o‘zlashtirib, barcha amaliyot va testlarni a’lo darajada bajardingiz.',
    reflectionAnswers: {
      learned: 'Bir xil maxrajli kasrlarda surati kattasi katta bo‘lishini pissa misolida juda yaxshi tushundim.',
      difficult: 'Suratlari bir xil bo‘lganda maxraji kichigini tanlash biroz o‘ylantirdi.',
      understandingLevel: 5,
      toReview: 'Bir xil suratli kasrlarni taqqoslash'
    }
  },
  {
    id: 'sub-2',
    studentName: 'Jasur Aliyev',
    practiceScore: 85,
    assessmentScore: 90,
    totalScore: 88,
    finalGrade: 5,
    gradeLabel: '5 (A’lo)',
    gradeColor: 'text-emerald-700 bg-emerald-50 border-emerald-300',
    gradeBadge: 'bg-emerald-600 text-white',
    completedAt: '10:43',
    submittedAt: '10:43',
    breakdown: {
      attendance: { score: 10, max: 10, label: 'Tashkiliy qism va Davomat', statusText: 'Darsga o‘z vaqtida kirdi va faol qatnashdi (10/10)' },
      motivation: { score: 10, max: 10, label: 'Motivatsiya va Miya hujumi', statusText: 'Kirish jumboq savoli to‘g‘ri topildi (10/10)' },
      theory: { score: 10, max: 10, label: 'Yangi mavzuni o‘zlashtirish', statusText: 'Nazariya va misollar o‘rganildi (10/10)' },
      practice: { score: 26, max: 30, label: 'Interaktiv amaliy mashg‘ulot', statusText: '85% natija — amaliy mashqlar muvaffaqiyatli bajarildi (26/30)' },
      reinforcement: { score: 17, max: 20, label: 'Mustahkamlash va Xatolar tahlili', statusText: 'Savollar yechildi va xatolar tuzatildi (17/20)' },
      assessment: { score: 18, max: 20, label: 'Mustaqil nazorat testi', statusText: '90% ball — testdan muvaffaqiyatli o‘tdi (18/20)' },
      reflection: { score: 10, max: 10, label: 'Refleksiya va Uy vazifasi', statusText: 'Refleksiya yozildi (10/10)' }
    },
    aiFeedback: 'Jasur, a’lo natija! Amaliy topshiriqlarni mustaqil bajardingiz. Kasrlarni sonlar o‘qida tasvirlash qoidasini takrorlab borsangiz, yanada mukammal bo‘ladi.',
    reflectionAnswers: {
      learned: 'Kasr chizig‘i bo‘lish amalini anglatishi va maxraj qismlar soni ekanini o‘rgandim.',
      difficult: 'Sonlar o‘qida belgilash.',
      understandingLevel: 5,
      toReview: 'To‘g‘ri va noto‘g‘ri kasrlar'
    }
  },
  {
    id: 'sub-3',
    studentName: 'Nilufar Shokirova',
    practiceScore: 78,
    assessmentScore: 82,
    totalScore: 80,
    finalGrade: 4,
    gradeLabel: '4 (Yaxshi)',
    gradeColor: 'text-blue-700 bg-blue-50 border-blue-300',
    gradeBadge: 'bg-blue-600 text-white',
    completedAt: '10:44',
    submittedAt: '10:44',
    breakdown: {
      attendance: { score: 10, max: 10, label: 'Tashkiliy qism va Davomat', statusText: 'Darsga o‘z vaqtida kirdi (10/10)' },
      motivation: { score: 10, max: 10, label: 'Motivatsiya va Miya hujumi', statusText: 'Miya hujumi faol o‘tdi (10/10)' },
      theory: { score: 10, max: 10, label: 'Yangi mavzuni o‘zlashtirish', statusText: 'Nazariy qoidalar ko‘rib chiqildi (10/10)' },
      practice: { score: 23, max: 30, label: 'Interaktiv amaliy mashg‘ulot', statusText: '78% natija — ko‘p topshiriqlar to‘g‘ri (23/30)' },
      reinforcement: { score: 15, max: 20, label: 'Mustahkamlash va Xatolar tahlili', statusText: 'Xatolar ustida AI bilan ishlandi (15/20)' },
      assessment: { score: 16, max: 20, label: 'Mustaqil nazorat testi', statusText: '82% ball (16/20)' },
      reflection: { score: 10, max: 10, label: 'Refleksiya va Uy vazifasi', statusText: 'Refleksiya to‘ldirildi (10/10)' }
    },
    aiFeedback: 'Nilufar, juda yaxshi harakat qildingiz! Darsdagi qoidalarni to‘g‘ri qo‘lladingiz. Kasrlar ustida amallarni mustahkamlash uchun uy vazifasini puxta bajaring.',
    reflectionAnswers: {
      learned: 'Maxrajlari teng kasrlarni qo‘shishda faqat suratlar qo‘shilishini o‘rgandim.',
      difficult: 'Qisqartirish amali biroz qiyinroq tuyuldi.',
      understandingLevel: 4,
      toReview: 'Kasrlarni qisqartirish'
    }
  },
  {
    id: 'sub-4',
    studentName: 'Bekzod Usmonov',
    practiceScore: 68,
    assessmentScore: 72,
    totalScore: 71,
    finalGrade: 4,
    gradeLabel: '4 (Yaxshi)',
    gradeColor: 'text-blue-700 bg-blue-50 border-blue-300',
    gradeBadge: 'bg-blue-600 text-white',
    completedAt: '10:44',
    submittedAt: '10:44',
    breakdown: {
      attendance: { score: 7, max: 10, label: 'Tashkiliy qism va Davomat', statusText: 'Darsga kechikib kirdi (7/10)' },
      motivation: { score: 5, max: 10, label: 'Motivatsiya va Miya hujumi', statusText: 'Miya hujumi qisman bajarildi (5/10)' },
      theory: { score: 10, max: 10, label: 'Yangi mavzuni o‘zlashtirish', statusText: 'Nazariya o‘rganildi (10/10)' },
      practice: { score: 20, max: 30, label: 'Interaktiv amaliy mashg‘ulot', statusText: '68% natija — amaliy mashqlar yechildi (20/30)' },
      reinforcement: { score: 14, max: 20, label: 'Mustahkamlash va Xatolar tahlili', statusText: 'AI ko‘magida xatolar tahlil qilindi (14/20)' },
      assessment: { score: 14, max: 20, label: 'Mustaqil nazorat testi', statusText: '72% ball (14/20)' },
      reflection: { score: 10, max: 10, label: 'Refleksiya va Uy vazifasi', statusText: 'Xulosa berildi (10/10)' }
    },
    aiFeedback: 'Bekzod, darsga kechikkan bo‘lsangiz ham, jarayonga tez qo‘shilib yaxshi natija ko‘rsatdingiz. Keyingi safar vaqtida qatnashsangiz, 5 baho olishingiz aniq!',
    reflectionAnswers: {
      learned: 'To‘g‘ri kasr birga nisbatan kichik bo‘lishini bildim.',
      difficult: 'Maxrajlarni taqqoslash.',
      understandingLevel: 4,
      toReview: 'Kasrlarni umumiy maxrajga keltirish'
    }
  },
  {
    id: 'sub-5',
    studentName: 'Diyorbek Qodirov',
    practiceScore: 60,
    assessmentScore: 65,
    totalScore: 63,
    finalGrade: 3,
    gradeLabel: '3 (Qoniqarli)',
    gradeColor: 'text-amber-700 bg-amber-50 border-amber-300',
    gradeBadge: 'bg-amber-600 text-white',
    completedAt: '10:45',
    submittedAt: '10:45',
    breakdown: {
      attendance: { score: 10, max: 10, label: 'Tashkiliy qism va Davomat', statusText: 'Darsda qatnashdi (10/10)' },
      motivation: { score: 5, max: 10, label: 'Motivatsiya va Miya hujumi', statusText: 'Kirish qismida ishtirok etdi (5/10)' },
      theory: { score: 8, max: 10, label: 'Yangi mavzuni o‘zlashtirish', statusText: 'Nazariya o‘rganildi (8/10)' },
      practice: { score: 18, max: 30, label: 'Interaktiv amaliy mashg‘ulot', statusText: '60% natija — qo‘shimcha mashq zarur (18/30)' },
      reinforcement: { score: 12, max: 20, label: 'Mustahkamlash va Xatolar tahlili', statusText: 'Xatolar ustida ishlandi (12/20)' },
      assessment: { score: 13, max: 20, label: 'Mustaqil nazorat testi', statusText: '65% ball (13/20)' },
      reflection: { score: 8, max: 10, label: 'Refleksiya va Uy vazifasi', statusText: 'Qisqa javob berildi (8/10)' }
    },
    aiFeedback: 'Diyorbek, mavzuning umumiy mohiyatini tushundingiz, lekin amaliy hisoblashlarda biroz shoshildingiz. Uy vazifasini erinmasdan yechib, takrorlash tavsiya etiladi.',
    reflectionAnswers: {
      learned: 'Kasrning surati va maxraji nima ekanligini yaxshi bildim.',
      difficult: 'Bir nechta kasrlarni o‘sish tartibida joylashtirish.',
      understandingLevel: 3,
      toReview: 'Kasrlarni taqqoslash mashqlari'
    }
  },
  {
    id: 'sub-6',
    studentName: 'Zilola Ergasheva',
    practiceScore: 92,
    assessmentScore: 95,
    totalScore: 94,
    finalGrade: 5,
    gradeLabel: '5 (A’lo)',
    gradeColor: 'text-emerald-700 bg-emerald-50 border-emerald-300',
    gradeBadge: 'bg-emerald-600 text-white',
    completedAt: '10:45',
    submittedAt: '10:45',
    breakdown: {
      attendance: { score: 10, max: 10, label: 'Tashkiliy qism va Davomat', statusText: 'Darsga o‘z vaqtida kirdi va faol qatnashdi (10/10)' },
      motivation: { score: 10, max: 10, label: 'Motivatsiya va Miya hujumi', statusText: 'Faraz kiritildi, warm-up to‘g‘ri yechildi (10/10)' },
      theory: { score: 10, max: 10, label: 'Yangi mavzuni o‘zlashtirish', statusText: 'Qoidalar va namunalar o‘rganildi (10/10)' },
      practice: { score: 28, max: 30, label: 'Interaktiv amaliy mashg‘ulot', statusText: '92% natija — barcha topshiriqlar to‘liq (28/30)' },
      reinforcement: { score: 19, max: 20, label: 'Mustahkamlash va Xatolar tahlili', statusText: 'Savollar to‘g‘ri yechildi (19/20)' },
      assessment: { score: 19, max: 20, label: 'Mustaqil nazorat testi', statusText: '95% ball (19/20)' },
      reflection: { score: 10, max: 10, label: 'Refleksiya va Uy vazifasi', statusText: 'To‘liq refleksiya (10/10)' }
    },
    aiFeedback: 'Zilola, qoyilmaqom natija! Darsning barcha 7 bosqichida namunali faollik ko‘rsatdingiz. Test va amaliyotdagi puxta bilimingiz uchun 5 (A’lo) bahoga loyiqsiz!',
    reflectionAnswers: {
      learned: 'Kasrlarni pissa va shokolad bo‘laklari orqali vizual tushunish juda yoqdi.',
      difficult: 'Hech qanday qiyinchilik bo‘lmadi.',
      understandingLevel: 5,
      toReview: 'Keyingi mavzu: kasrlarni ko‘paytirish'
    }
  }
];
