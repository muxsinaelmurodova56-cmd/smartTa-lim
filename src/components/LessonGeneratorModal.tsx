import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  BookOpen, 
  Layers, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { Lesson, SubjectName, StudentLevel, GRADE_5_SUBJECTS } from '../types/lesson';
import { sounds } from '../utils/audio';

interface LessonGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLessonCreated: (newLesson: Lesson) => void;
}

const GENERATION_STEPS = [
  '1. 5-sinf dars maqsadlari va kutilayotgan natijalar shakllanmoqda...',
  '2. 45 daqiqalik 7 bosqichli pedagogik ssenariy rejalashtirilmoqda...',
  '3. 5-sinf darajasiga mos nazariy materiallar va namunaviy misollar yozilmoqda...',
  '4. Interaktiv topshiriqlar (test, matching, drag-order) tuzilmoqda...',
  '5. Mustahkamlash savollari va AI repetitor tushuntirishlari tayyorlanmoqda...',
  '6. Yakuniy baholash testi, rubrika va uy vazifasi yaratilmoqda...'
];

export const LessonGeneratorModal: React.FC<LessonGeneratorModalProps> = ({
  isOpen,
  onClose,
  onLessonCreated,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectName>('Matematika');
  const [grade] = useState<string>('5-sinf'); // Fixed to 5-sinf
  const [topic, setTopic] = useState<string>('Oddiy kasrlar va ularni taqqoslash');
  const [duration] = useState<number>(45); // strictly 45 minutes
  const [level, setLevel] = useState<StudentLevel>('O‘rta');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentSubjectMeta = GRADE_5_SUBJECTS.find((s) => s.name === selectedSubject) || GRADE_5_SUBJECTS[0];

  const handleSelectSubject = (sub: SubjectName) => {
    setSelectedSubject(sub);
    const meta = GRADE_5_SUBJECTS.find((s) => s.name === sub);
    if (meta) {
      setTopic(meta.defaultTopic);
    }
    sounds.playClick();
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setErrorMessage('Iltimos, dars mavzusini kiriting.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    sounds.playClick();

    // Progress animation
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % GENERATION_STEPS.length;
      setCurrentStepIndex(step);
    }, 1800);

    try {
      const response = await fetch('/api/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: selectedSubject,
          grade: '5-sinf',
          topic,
          duration,
          level,
          additionalNotes,
        }),
      });

      clearInterval(interval);

      if (!response.ok) {
        throw new Error('Dars yaratishda server xatoligi yuz berdi.');
      }

      const data = await response.json();
      if (!data.lesson) {
        throw new Error('Serverdan yaroqli dars ma’lumotlari kelmadi.');
      }

      sounds.playSuccess();
      onLessonCreated(data.lesson);
      onClose();
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      setErrorMessage(err.message || 'Xatolik yuz berdi. Iltimos qaytadan urinib ko‘ring.');
      sounds.playWrong();
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (presetTopic: string) => {
    setTopic(presetTopic);
    sounds.playClick();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 relative">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
              <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight">5-Sinf AI Dars Generatori</h2>
                <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-xs">
                  5-sinf barcha fanlari
                </span>
              </div>
              <p className="text-blue-100 text-xs mt-0.5">
                5-sinf o‘quvchilarining yosh xususiyatiga mos 45 daqiqalik 7 bosqichli to‘liq dars rejasi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="absolute top-5 right-5 text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {loading ? (
          <div className="p-10 text-center space-y-6">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
              <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
              <Sparkles className="w-8 h-8 text-amber-500 absolute inset-0 m-auto animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-800">
                5-sinf uchun 45 daqiqalik dars shakllanmoqda...
              </h3>
              <p className="text-sm font-medium text-blue-600 animate-pulse min-h-[24px]">
                {GENERATION_STEPS[currentStepIndex]}
              </p>
              <p className="text-xs text-slate-400">
                10 ta pedagogik element (maqsad, motivatsiya, nazariya, interaktiv mashqlar, mustahkamlash, test, uy ishi)
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleGenerate} className="p-6 space-y-5">
            {errorMessage && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-rose-800 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 1. Subject selector for 5th grade */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  1. 5-sinf fanini tanlang
                </label>
                <span className="text-[11px] font-semibold text-slate-500">
                  {GRADE_5_SUBJECTS.length} ta darslik fani mavjud
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {GRADE_5_SUBJECTS.map((s) => {
                  const isSelected = selectedSubject === s.name;
                  return (
                    <button
                      type="button"
                      key={s.name}
                      onClick={() => handleSelectSubject(s.name)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-500/20 shadow-xs font-bold'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 font-medium'
                      }`}
                    >
                      <span className="text-lg shrink-0">{s.icon}</span>
                      <span className="text-xs truncate">{s.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Topic Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  2. 5-sinf dars mavzusi
                </label>
                <span className="text-[11px] text-blue-600 font-medium">5-sinf o‘quv dasturiga mos</span>
              </div>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Masalan: Oddiy kasrlar va ularni taqqoslash"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                required
              />

              {/* Topic quick presets for 5th grade */}
              {currentSubjectMeta && (
                <div className="mt-2.5">
                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 mb-1.5">
                    <Lightbulb className="w-3 h-3 text-amber-500" />
                    5-sinf {currentSubjectMeta.name} fani uchun namunaviy mavzular:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentSubjectMeta.sampleTopics.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => handleSelectPreset(t)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                          topic === t
                            ? 'bg-blue-100 text-blue-800 border-blue-300 font-semibold'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Grid 2: Davomiylik & O'quvchilar darajasi */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Sinf
                </label>
                <div className="flex items-center gap-2 bg-blue-50/70 border border-blue-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-blue-900">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>5-sinf (10-11 yosh)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Dars Davomiyligi
                </label>
                <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>45 daqiqa (Standard)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  O‘quvchilar darajasi
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {(['Boshlang‘ich', 'O‘rta', 'Yuqori'] as StudentLevel[]).map((lvl) => (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => setLevel(lvl)}
                      className={`py-2 text-[11px] font-bold rounded-xl border transition cursor-pointer ${
                        level === lvl
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Extra instructions */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                5-sinf uchun qo‘shimcha pedagogik talablar (ixtiyoriy)
              </label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Masalan: Ko‘proq rasmlar, sodda misollar, o‘yin elementlari va hayotiy misollar qo‘shilsin..."
                rows={2}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
            </div>

            {/* 10 Items Promise Preview */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5">
              <span className="text-xs font-bold text-blue-900 block mb-2">
                5-sinf darsi uchun 10 ta to‘liq pedagogik komponent yaratiladi:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px] text-blue-800 font-medium">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> 1. Dars maqsadi (SMART)</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> 2. Kutilayotgan natijalar</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> 3. 45 min 7-bosqichli reja</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> 4. 5-sinf nazariy materiali</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> 5. Namunaviy misollar</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> 6. Interaktiv topshiriqlar</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> 7. 5 xil formatdagi test</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> 8. Baholash mezonlari</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> 9. Tabaqalashgan uy ishi</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> 10. Metodik tavsiyalar</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white text-sm font-bold rounded-xl shadow-md shadow-blue-500/25 transition active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>5-sinf darsini yaratish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
