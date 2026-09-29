export type SubjectName =
  | 'Matematika'
  | 'Ona tili'
  | 'Adabiyot'
  | 'Tabiiy fan (Science)'
  | 'Informatika'
  | 'Tarix'
  | 'Ingliz tili'
  | 'Tasviriy san’at'
  | 'Musiqa'
  | 'Texnologiya'
  | 'Jismoniy tarbiya';

export interface SubjectMeta {
  name: SubjectName;
  icon: string;
  color: string;
  badgeColor: string;
  defaultTopic: string;
  sampleTopics: string[];
}

export const GRADE_5_SUBJECTS: SubjectMeta[] = [
  {
    name: 'Matematika',
    icon: '📐',
    color: 'from-blue-500 to-indigo-600',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    defaultTopic: 'Oddiy kasrlar va ularni taqqoslash',
    sampleTopics: [
      'Oddiy kasrlar va ularni taqqoslash',
      'Bir xil maxrajli kasrlarni qo‘shish va ayirish',
      'Natural sonlarni bo‘lish va qoldiqli bo‘lish',
      'To‘g‘ri to‘rtburchak va kvadratning yuzi hamda perimetri',
      'Burchaklar va ularni transportirda o‘lchash'
    ]
  },
  {
    name: 'Ona tili',
    icon: '📝',
    color: 'from-emerald-500 to-teal-600',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    defaultTopic: 'Ot so‘z turkumi: Turdosh va atoqli otlar',
    sampleTopics: [
      'Ot so‘z turkumi: Turdosh va atoqli otlar',
      'Egalik qo‘shimchalari va ularning imlosi',
      'Kelishik qo‘shimchalari va ularning qo‘llanilishi',
      'Sinonim, antonim va omonim so‘zlar',
      'Gapning bosh bo‘laklari: Ega va kesim'
    ]
  },
  {
    name: 'Adabiyot',
    icon: '📚',
    color: 'from-amber-500 to-orange-600',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    defaultTopic: 'O‘zbek xalq ertaklari: «Uch og‘a-ini botirlar»',
    sampleTopics: [
      'O‘zbek xalq ertaklari: «Uch og‘a-ini botirlar»',
      'Alisher Navoiy hayoti va ibratli hikmatlari',
      'G‘afur G‘ulom: «Shum bola» asaridan parchalar',
      'Masal janri va uning tarbiyaviy ahamiyati',
      'Maqollar va topishmoqlar badiiy tahlili'
    ]
  },
  {
    name: 'Tabiiy fan (Science)',
    icon: '🔬',
    color: 'from-cyan-500 to-blue-600',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    defaultTopic: 'Quyosh sistemasi va sayyoralar oilasi',
    sampleTopics: [
      'Quyosh sistemasi va sayyoralar oilasi',
      'Tirik tabiat: O‘simlik va hayvonot olami',
      'Moddalarning uch xil agregat holati: qattiq, suyuq, gaz',
      'Havo va suvning tabiatdagi ahamiyati',
      'Inson salomatligi va sog‘lom turmush tarzi'
    ]
  },
  {
    name: 'Informatika',
    icon: '💻',
    color: 'from-violet-500 to-purple-600',
    badgeColor: 'bg-violet-100 text-violet-800 border-violet-200',
    defaultTopic: 'Axborot va uning xillari. Kompyuter qurilmalari',
    sampleTopics: [
      'Axborot va uning xillari. Kompyuter qurilmalari',
      'Klaviatura bilan ishlash va matn terish qoidalari',
      'Paint grafik muharririda chizish va shakllar',
      'Internet xavfsizligi va axborotdan to‘g‘ri foydalanish',
      'Oddiy algoritmlar: Chiziqli va tarmoqlanuvchi'
    ]
  },
  {
    name: 'Tarix',
    icon: '🏛️',
    color: 'from-rose-500 to-red-600',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    defaultTopic: 'Tarix fani nimani o‘rganadi? Qadimgi ajdodlarimiz',
    sampleTopics: [
      'Tarix fani nimani o‘rganadi? Qadimgi ajdodlarimiz',
      'Buyuk Ipak yo‘li va uning madaniy ahamiyati',
      'Qadimgi Baqtriya, So‘g‘diyona va Xorazm davlatlari',
      'Tarixiy yodgorliklar va moddiy manbalar',
      'O‘zbekiston xalqlarining qadimiy urf-odatlari'
    ]
  },
  {
    name: 'Ingliz tili',
    icon: '🌍',
    color: 'from-sky-500 to-indigo-600',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    defaultTopic: 'My Daily Routine & Present Simple',
    sampleTopics: [
      'My Daily Routine & Present Simple',
      'My School, Classmates and Favorite Subjects',
      'Family Members and Professions',
      'Hobbies, Sports and Free Time Activities',
      'Food and Health: Countable and Uncountable Nouns'
    ]
  },
  {
    name: 'Tasviriy san’at',
    icon: '🎨',
    color: 'from-fuchsia-500 to-pink-600',
    badgeColor: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
    defaultTopic: 'Rangshunoslik: Asosiy va qo‘shimcha ranglar jilosi',
    sampleTopics: [
      'Rangshunoslik: Asosiy va qo‘shimcha ranglar jilosi',
      'Ona diyor manzarasi (Peyzaj chizish)',
      'Milliy naqshlar va naqqoshlik san’ati',
      'Natryumort chizish qoidalari va soya-yorug‘lik'
    ]
  },
  {
    name: 'Musiqa',
    icon: '🎵',
    color: 'from-pink-500 to-rose-600',
    badgeColor: 'bg-pink-100 text-pink-800 border-pink-200',
    defaultTopic: 'O‘zbek milliy cholg‘u asboblari: Dutor, doira, nay',
    sampleTopics: [
      'O‘zbek milliy cholg‘u asboblari: Dutor, doira, nay',
      'Musiqiy nota savodi: Cho‘zimlar va balandlik',
      'Xalq qo‘shiqlari va alla janri',
      'Musiqada xarakter, sur’at va dinamik belgilar'
    ]
  },
  {
    name: 'Texnologiya',
    icon: '🛠️',
    color: 'from-amber-600 to-yellow-600',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    defaultTopic: 'Qog‘oz, karton va tabiiy materiallar bilan ishlash',
    sampleTopics: [
      'Qog‘oz, karton va tabiiy materiallar bilan ishlash',
      'Mehnat xavfsizligi va asbob-uskunalardan foydalanish',
      'Oddiy modellashtirish va konstruksiyalash asoslari',
      'Uy-ro‘zg‘or madaniyati va tejamkorlik'
    ]
  },
  {
    name: 'Jismoniy tarbiya',
    icon: '⚽',
    color: 'from-green-500 to-emerald-600',
    badgeColor: 'bg-green-100 text-green-800 border-green-200',
    defaultTopic: 'Chaqqonlik, to‘g‘ri qad-qomat va saf mashqlari',
    sampleTopics: [
      'Chaqqonlik, to‘g‘ri qad-qomat va saf mashqlari',
      'Qisqa masofaga yugurish va estafeta o‘yinlari',
      'Mini-futbol va basketbol asosiy to‘p uzatishlari',
      'Gimnastika: Egiluvchanlik va muvozanat saqlash'
    ]
  }
];

export type StudentLevel = 'Boshlang‘ich' | 'O‘rta' | 'Yuqori';

export type StageId = 'org' | 'mot' | 'exp' | 'prac' | 'reinf' | 'eval' | 'refl';

export interface StageInfo {
  stageId: StageId;
  name: string;
  timeRange: string;
  durationMinutes: number;
}

export interface KeyConcept {
  term: string;
  definition: string;
  icon?: string;
}

export interface WorkedExample {
  title: string;
  problem: string;
  solution: string;
  stepByStep: string[];
}

export type TaskType =
  | 'multiple_choice'
  | 'true_false'
  | 'matching'
  | 'drag_order'
  | 'fill_blanks'
  | 'short_answer';

export interface BaseTask {
  id: string;
  type: TaskType;
  title: string;
  instructions?: string;
}

export interface MultipleChoiceTask extends BaseTask {
  type: 'multiple_choice';
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface TrueFalseTask extends BaseTask {
  type: 'true_false';
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export interface MatchingPair {
  left: string;
  right: string;
}

export interface MatchingTask extends BaseTask {
  type: 'matching';
  pairs: MatchingPair[];
}

export interface DragOrderTask extends BaseTask {
  type: 'drag_order';
  items?: string[];
  correctOrder: string[];
  scrambledItems?: string[];
  explanation?: string;
}

export interface FillBlanksTask extends BaseTask {
  type: 'fill_blanks';
  textWithBlanks?: string;
  blankPlaceholder?: string;
  acceptableAnswers?: string[];
  hint?: string;
  templateText?: string;
  blankAnswers?: string[];
  acceptableAlternatives?: Record<string, string[]>;
  explanation?: string;
}

export interface ShortAnswerTask extends BaseTask {
  type: 'short_answer';
  question: string;
  sampleCorrectAnswer: string;
  keywords: string[];
}

export type InteractiveTask =
  | MultipleChoiceTask
  | TrueFalseTask
  | MatchingTask
  | DragOrderTask
  | FillBlanksTask
  | ShortAnswerTask;

export interface ReinforcementQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex?: number;
  correctIndex?: number;
  commonMisconception?: string;
  whyIncorrect?: string;
  aiExplanation: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  points: number;
}

export type QuizQuestion = AssessmentQuestion;

export interface HomeworkInfo {
  basic?: string;
  creative?: string;
  deadLine?: string;
  mandatory?: string;
}

export interface LessonOverview {
  title: string;
  objectives: string[];
  expectedOutcomes: string[];
  methodologyAdvice: string;
}

export interface StageOrganizationalData {
  stageId: 'org';
  name: string;
  timeRange: string;
  durationMinutes: number;
  greeting: string;
  topicDisplay: string;
  goalsExplanation: string;
  rules: string[];
  attendancePrompt: string;
}

export interface StageMotivationData {
  stageId: 'mot';
  name: string;
  timeRange: string;
  durationMinutes: number;
  question: string;
  realWorldScenario: string;
  visualPrompt: string;
  warmUpQuiz: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  };
}

export interface StageExplanationData {
  stageId: 'exp';
  name: string;
  timeRange: string;
  durationMinutes: number;
  theorySummary: string;
  keyConcepts: KeyConcept[];
  examples: WorkedExample[];
  formulasOrRules: string[];
  aiVisualExplanation: string;
}

export interface StagePracticeData {
  stageId: 'prac';
  name: string;
  timeRange: string;
  durationMinutes: number;
  tasks: InteractiveTask[];
}

export interface StageReinforcementData {
  stageId: 'reinf';
  name: string;
  timeRange: string;
  durationMinutes: number;
  questions: ReinforcementQuestion[];
  teacherChecklist?: string[];
  weakTopicAnalysisPrompt?: string;
}

export interface StageAssessmentData {
  stageId: 'eval';
  name: string;
  timeRange: string;
  durationMinutes: number;
  quiz?: AssessmentQuestion[];
  questions?: AssessmentQuestion[];
  gradingScale?: {
    excellent: string | number;
    good: string | number;
    satisfactory: string | number;
  };
}

export interface StageReflectionData {
  stageId: 'refl';
  name: string;
  timeRange: string;
  durationMinutes: number;
  reflectionPrompts?: string[];
  reflectionQuestions?: string[];
  lessonSummary: string;
  homework: HomeworkInfo;
}

export interface TeacherNotes {
  pedagogicalAdvice?: string;
  equipmentNeeded?: string;
  differentiation?: {
    forAdvanced?: string;
    forStruggling?: string;
  };
}

export interface Lesson {
  id: string;
  subject: SubjectName | string;
  grade: string;
  topic: string;
  duration: number; // 45
  level: StudentLevel | string;
  overview: LessonOverview;
  stages: [
    StageOrganizationalData,
    StageMotivationData,
    StageExplanationData,
    StagePracticeData,
    StageReinforcementData,
    StageAssessmentData,
    StageReflectionData
  ];
  teacherNotes?: TeacherNotes;
  createdAt?: string;
}

export interface AttendanceRecord {
  id: string;
  studentName: string;
  status: 'present' | 'late' | 'excused' | 'absent';
  notes?: string;
}

export interface WorkBreakdownItem {
  score: number;
  max: number;
  label: string;
  statusText: string;
}

export interface WorkBreakdown {
  attendance: WorkBreakdownItem;
  motivation: WorkBreakdownItem;
  theory: WorkBreakdownItem;
  practice: WorkBreakdownItem;
  reinforcement: WorkBreakdownItem;
  assessment: WorkBreakdownItem;
  reflection: WorkBreakdownItem;
}

export interface StudentSubmission {
  id?: string;
  studentName: string;
  practiceScore: number;
  assessmentScore: number;
  totalScore: number;
  finalGrade?: 5 | 4 | 3 | 2;
  gradeLabel?: string;
  gradeColor?: string;
  gradeBadge?: string;
  completedAt?: string;
  submittedAt?: string;
  breakdown?: WorkBreakdown;
  aiFeedback?: string;
  teacherOverrideGrade?: 5 | 4 | 3 | 2;
  teacherNote?: string;
  reflectionAnswers: {
    learned: string;
    difficult: string;
    understandingLevel: number; // 1 - 5
    toReview: string;
  };
}
