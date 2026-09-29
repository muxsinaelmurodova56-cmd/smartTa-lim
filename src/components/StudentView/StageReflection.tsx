import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Star, 
  CheckCircle2, 
  BookMarked, 
  Calendar, 
  Award,
  Printer,
  Copy,
  Trophy,
  ArrowRight,
  ChevronDown,
  Layers,
  Flame,
  Check
} from 'lucide-react';
import { StageReflectionData, Lesson, StudentSubmission } from '../../types/lesson';
import { CalculatedGrade } from '../../utils/grading';
import { sounds } from '../../utils/audio';

interface StageReflectionProps {
  stageData: StageReflectionData;
  lesson: Lesson;
  studentName: string;
  calculatedGrade: CalculatedGrade;
  submissionResult: StudentSubmission | null;
  onOpenCertificate: () => void;
  onSubmitReflection: (data: {
    learned: string;
    difficult: string;
    understandingLevel: number;
    toReview: string;
  }) => void;
}

export const StageReflection: React.FC<StageReflectionProps> = ({
  stageData,
  lesson,
  studentName,
  calculatedGrade,
  submissionResult,
  onOpenCertificate,
  onSubmitReflection,
}) => {
  const [learned, setLearned] = useState('');
  const [difficult, setDifficult] = useState('');
  const [understandingLevel, setUnderstandingLevel] = useState<number>(5);
  const [toReview, setToReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!learned.trim()) return;

    onSubmitReflection({
      learned,
      difficult,
      understandingLevel,
      toReview,
    });

    setSubmitted(true);
    sounds.playFanfare();
  };

  const handleCopyRecord = () => {
    sounds.playClick();
    const finalGradeText = submissionResult?.gradeLabel || calculatedGrade.gradeLabel;
    const finalTotal = submissionResult?.totalScore ?? calculatedGrade.totalScore;
    const textToCopy = `[eMaktab / Kundalik.com]\nO‘quvchi: ${studentName}\nSinf: 5-sinf\nFan: ${lesson.subject}\nMavzu: ${lesson.topic}\nJami ball: ${finalTotal}/100\nYakuniy Baho: ${finalGradeText}\nSana: ${new Date().toLocaleDateString('uz-UZ')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    sounds.playSuccess();
    setTimeout(() => setCopied(false), 2500);
  };

  const activeGrade = submissionResult?.finalGrade || calculatedGrade.finalGrade;
  const activeLabel = submissionResult?.gradeLabel || calculatedGrade.gradeLabel;
  const activeScore = submissionResult?.totalScore ?? calculatedGrade.totalScore;
  const activeBreakdown = submissionResult?.breakdown || calculatedGrade.breakdown;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-wider">
            7-bosqich: 42–45 daqiqa
          </span>
          <span className="text-teal-200 text-xs font-semibold">Refleksiya & Yakuniy Baholash</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Darsni Yakunlash va Yakuniy Bahoni Olish
        </h2>
        <p className="text-teal-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
          45 daqiqalik dars muvaffaqiyatli yakunlandi! Bugungi olgan bilimlaringiz, bajargan barcha amaliyotlaringiz va testingiz asosida yakuniy bahongizni hisoblang.
        </p>
      </div>

      {/* Lesson Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-teal-700 font-bold text-sm uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Bugungi Darsning Qisqa Xulosasi</span>
        </div>
        <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
          {stageData.lessonSummary}
        </p>
      </div>

      {/* REVEALED FINAL GRADE CARD IF SUBMITTED */}
      {submitted ? (
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-9 shadow-2xl border border-blue-500/30 space-y-7 animate-in zoom-in-95">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-400/20 text-amber-300 text-4xl mb-1 animate-bounce">
              {activeGrade === 5 ? '🏆' : activeGrade === 4 ? '⭐' : '📘'}
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
                Dars Yakuni Tahlili
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
                ● Baholandi
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Tabriklaymiz, {studentName}!
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Sizning 45 daqiqalik darsdagi barcha ishlaringiz (davomat, motivatsiya, nazariya, interaktiv amaliyot, mustahkamlash, yakuniy test va refleksiya) bo‘yicha hisoblangan rasmiy bahongiz:
            </p>

            {/* Giant Grade Display */}
            <div className="py-4">
              <div className="inline-block p-1 rounded-3xl bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400 shadow-2xl">
                <div className="px-8 py-5 rounded-[22px] bg-slate-950/95 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-amber-300">
                    {Array.from({ length: activeGrade }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 block">
                    QO‘YILGAN YAKUNIY BAHO
                  </span>
                  <span className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-cyan-300 block tracking-tight">
                    {activeLabel}
                  </span>
                  <div className="pt-1 flex items-center justify-center gap-2 font-mono text-xs sm:text-sm font-bold text-slate-300">
                    <span>To‘plangan reyting:</span>
                    <span className="text-amber-400 text-base">{activeScore} / 100 ball</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Pedagogical Feedback Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-left space-y-2 max-w-2xl mx-auto">
              <span className="font-extrabold text-xs uppercase tracking-wider text-amber-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                O‘qituvchi va AI Repetitorning Shaxsiy Xulosasi:
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                "{calculatedGrade.aiPedagogicalFeedback}"
              </p>
            </div>
          </div>

          {/* Detailed 7-Stage Work Breakdown Cards */}
          <div className="space-y-3 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider">
                Barcha Qilingan Ishlar Natijasi:
              </span>
              <span className="text-amber-300 font-mono font-bold">
                Jami: {activeScore} / 100 ball
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
              {Object.entries(activeBreakdown).map(([key, item]) => {
                const percentage = Math.round((item.score / item.max) * 100);
                return (
                  <div key={key} className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 truncate">{item.label}</span>
                      <span className="font-mono font-extrabold text-amber-300">
                        {item.score}/{item.max}
                      </span>
                    </div>
                    {/* Progress line */}
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {item.statusText}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons: Certificate Modal & eMaktab copy */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenCertificate}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-500 hover:from-amber-600 hover:to-teal-600 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl transition active:scale-95 cursor-pointer"
            >
              <Award className="w-4 h-4 text-slate-950" />
              <span>Rasmiy Baholash Shahodatnomasini Ko‘rish & Chop Etish</span>
            </button>

            <button
              onClick={handleCopyRecord}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl transition active:scale-95 cursor-pointer"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Nusxalandi!' : 'eMaktab uchun nusxalash'}</span>
            </button>
          </div>

        </div>
      ) : (
        /* Reflection Form with Live Provisional Score Preview */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          
          {/* Live Work Status Bar */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="font-extrabold text-slate-800 uppercase tracking-wider block">
                Dars Davomidagi Qilingan Ishlaringiz Tahlili
              </span>
              <p className="text-slate-500 text-[11px]">
                Refleksiya javoblarini topshirsangiz, yakuniy 10 ball qo‘shilib rasmiy bahoingiz belgilanadi.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Hozirgi ball:</span>
                <span className="font-mono text-lg font-black text-blue-600">
                  {calculatedGrade.totalScore} / 100 ball
                </span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-blue-100 text-blue-800 font-extrabold text-xs">
                Kutilayotgan: {calculatedGrade.gradeLabel}
              </div>
            </div>
          </div>

          <div className="pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-lg">
              O‘quvchi Refleksiyasi
            </h3>
            <p className="text-xs text-slate-500">
              Darsni muvaffaqiyatli yakunlash uchun quyidagi 4 ta savolga javob bering:
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Question 1 */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                1. Bugun darsda nimani o‘rgandingiz? *
              </label>
              <textarea
                value={learned}
                onChange={(e) => setLearned(e.target.value)}
                placeholder="Masalan: Bir xil maxrajli kasrlarni taqqoslashda faqat suratlarni solishtirish kifoya ekanini o‘rgandim..."
                rows={2}
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-3 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
                required
              />
            </div>

            {/* Question 2 */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                2. Qaysi qism sizga qiyin bo‘ldi?
              </label>
              <input
                type="text"
                value={difficult}
                onChange={(e) => setDifficult(e.target.value)}
                placeholder="Masalan: Maxraji har xil bo‘lganda qaysi biri kattaligini aniqlash..."
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
              />
            </div>

            {/* Question 3: Rating 1-5 */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                3. Mavzuni qanchalik tushundingiz? (1 dan 5 yulduzgacha)
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      setUnderstandingLevel(lvl);
                      sounds.playClick();
                    }}
                    className={`p-2 rounded-xl border transition cursor-pointer flex items-center gap-1 ${
                      understandingLevel >= lvl
                        ? 'bg-amber-50 border-amber-300 text-amber-500'
                        : 'bg-slate-50 border-slate-200 text-slate-300'
                    }`}
                  >
                    <Star className="w-5 h-5 fill-current" />
                  </button>
                ))}
                <span className="text-xs font-bold text-slate-700 ml-2">
                  {understandingLevel === 5 && '⭐️⭐️⭐️⭐️⭐️ A’lo darajada'}
                  {understandingLevel === 4 && '⭐️⭐️⭐️⭐️ Yaxshi tushundim'}
                  {understandingLevel === 3 && '⭐️⭐️⭐️ O‘rtacha'}
                  {understandingLevel <= 2 && '⭐️⭐️ Yana takrorlashim kerak'}
                </span>
              </div>
            </div>

            {/* Question 4 */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                4. Keyingi darsda nimani takrorlash kerak?
              </label>
              <input
                type="text"
                value={toReview}
                onChange={(e) => setToReview(e.target.value)}
                placeholder="Masalan: Kasrlarni sonlar o‘qida joylashtirishni yana bir bor..."
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 hover:from-teal-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-xl transition active:scale-95 cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-amber-300" />
                <span>Darsni Yakunlash va Yakuniy Bahoni Chiqarish</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Homework Card (Tabaqalashtirilgan Uy Vazifasi) */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <BookMarked className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">Keyingi Darsga Uy Vazifasi</h3>
              <p className="text-xs text-slate-400">Mustaqil amaliyot uchun vazifalar</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 text-xs font-mono text-blue-300">
            <Calendar className="w-3.5 h-3.5" />
            <span>Muddat: {stageData.homework?.deadLine || 'Keyingi darsgacha'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block">
              1. Majburiy (Asosiy) Vazifa:
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {stageData.homework?.basic || stageData.homework?.mandatory || 'Darslikdagi tegishli mashqlarni daftarda bajarish.'}
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
              2. Ijodiy / Izlanish Vazifasi:
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {stageData.homework?.creative || 'Mavzuga oid ko‘rgazmali chizma yoki qisqa misollar to‘plamini tayyorlash.'}
            </p>
          </div>
        </div>

        <div className="pt-2 text-center">
          <span className="text-xs text-slate-400">
            🎉 45 daqiqalik raqamli dars to‘liq bajarildi! Baho va natijalar elektron jurnalga qayd etildi.
          </span>
        </div>
      </div>

    </div>
  );
};
