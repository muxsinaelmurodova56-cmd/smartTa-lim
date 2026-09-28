import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Star, 
  CheckCircle2, 
  BookMarked, 
  Calendar, 
  Award,
  Download,
  Share2,
  Trophy
} from 'lucide-react';
import { StageReflectionData, Lesson } from '../../types/lesson';
import { sounds } from '../../utils/audio';

interface StageReflectionProps {
  stageData: StageReflectionData;
  lesson: Lesson;
  studentName: string;
  totalScore: number;
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
  totalScore,
  onSubmitReflection,
}) => {
  const [learned, setLearned] = useState('');
  const [difficult, setDifficult] = useState('');
  const [understandingLevel, setUnderstandingLevel] = useState<number>(5);
  const [toReview, setToReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
    sounds.playSuccess();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-wider">
            7-bosqich: 42–45 daqiqa
          </span>
          <span className="text-teal-200 text-xs font-semibold">Refleksiya & Dars Yakuni</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Darsni Yakunlash va Shaxsiy Xulosa
        </h2>
        <p className="text-teal-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
          45 daqiqalik dars muvaffaqiyatli yakunlandi! Bugungi olgan bilimlaringizni sarhisob qiling.
        </p>
      </div>

      {/* Lesson Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-teal-700 font-bold text-sm uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Darsning Qisqa Xulosasi</span>
        </div>
        <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
          {stageData.lessonSummary}
        </p>
      </div>

      {/* 4 Mandatory Reflection Prompts Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="pb-3 border-b border-slate-100">
          <h3 className="font-extrabold text-slate-900 text-lg">
            O‘quvchi Refleksiyasi
          </h3>
          <p className="text-xs text-slate-500">
            Quyidagi 4 ta savolga samimiy javob yozing:
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2 animate-in zoom-in-95">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-extrabold text-slate-900 text-base">
              Rahmat, {studentName || 'o‘quvchi'}! Refleksiyangiz qabul qilindi!
            </h4>
            <p className="text-xs text-emerald-800">
              O‘qituvchi sizning javoblaringizni ko‘radi va keyingi darsda shularga e’tibor qaratadi.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Question 1 */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                1. Bugun nimani o‘rgandingiz? *
              </label>
              <textarea
                value={learned}
                onChange={(e) => setLearned(e.target.value)}
                placeholder="Masalan: Chiziqli tenglamada hadlar tenglikdan narigi tomonga qarama-qarshi ishora bilan o‘tishini o‘rgandim..."
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
                placeholder="Masalan: Manfiy songa bo‘lganda ishorani adashtirdim (yoki: hech qaysi qism qiyin bo‘lmadi)..."
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
                placeholder="Masalan: Qavslarni ochish va umumiy maxraj berishni yana bir bor..."
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg transition active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Refleksiya javoblarini topshirish</span>
              </button>
            </div>
          </form>
        )}
      </div>

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
            <span>Muddat: {stageData.homework.deadLine}</span>
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
            🎉 Tabriklaymiz! 45 daqiqalik raqamli darsni muvaffaqiyatli yakunladingiz!
          </span>
        </div>
      </div>

    </div>
  );
};
