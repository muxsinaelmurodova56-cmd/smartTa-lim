import React from 'react';
import { X, Printer, Copy, Check, FileText, CheckCircle2, Bookmark } from 'lucide-react';
import { Lesson } from '../../types/lesson';
import { sounds } from '../../utils/audio';

interface LessonPlanExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson;
}

export const LessonPlanExportModal: React.FC<LessonPlanExportModalProps> = ({
  isOpen,
  onClose,
  lesson,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  const handleCopy = () => {
    const textPlan = `
45 DAQIQALIK DARS ISHLANMASI (KONSEPKT)
-----------------------------------------------
Fan: ${lesson.subject}
Sinf: ${lesson.grade}
Mavzu: ${lesson.topic}
Davomiyligi: 45 daqiqa
Daraja: ${lesson.level}

1. DARS MAQSADLARI:
${lesson.overview.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}

2. KUTILAYOTGAN NATIJALAR:
${lesson.overview.expectedOutcomes.map((o, i) => `- ${o}`).join('\n')}

3. 45 DAQIQALIK BOSQICHLAR XRONOMETRAJI:
${lesson.stages.map((st) => `* [${st.timeRange}] ${st.name} (${st.durationMinutes} daqiqa)`).join('\n')}

4. NAZARIY TUSHUNCHALAR:
${lesson.stages[2].keyConcepts.map((k) => `* ${k.term}: ${k.definition}`).join('\n')}

5. NAMUNAVIY MISOLLAR:
${lesson.stages[2].examples.map((ex) => `* ${ex.title}: ${ex.problem} -> ${ex.solution}`).join('\n')}

6. BAHOLASH MEZONLARI:
A'lo: ${lesson.stages[5]?.gradingScale?.excellent || '85-100%'}
Yaxshi: ${lesson.stages[5]?.gradingScale?.good || '70-84%'}
Qoniqarli: ${lesson.stages[5]?.gradingScale?.satisfactory || '55-69%'}

7. UY VAZIFASI:
Majburiy: ${lesson.stages[6]?.homework?.basic || lesson.stages[6]?.homework?.mandatory || 'Darslikdagi mashqlar'}
Ijodiy: ${lesson.stages[6]?.homework?.creative || 'Mavzu bo‘yicha qo‘shimcha izlanish'}
Muddat: ${lesson.stages[6]?.homework?.deadLine || 'Keyingi dars'}

8. METODIK TAVSIYA:
${lesson.teacherNotes?.pedagogicalAdvice || lesson.overview.methodologyAdvice || 'Zamonaviy interaktiv metodlar qo‘llansin'}
-----------------------------------------------
Platforma: Dars45 Raqamli Ta'lim Tizimi (5-Sinf)
    `.trim();

    navigator.clipboard.writeText(textPlan);
    setCopied(true);
    sounds.playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">O‘qituvchi Dars Ishlanmasi (Konspekt)</h2>
              <p className="text-xs text-slate-300">
                {lesson.subject} | {lesson.grade} | 45 daqiqalik me’yoriy dars
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Nusxa olindi!' : 'Nusxa olish'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
            >
              <Printer className="w-4 h-4" />
              <span>Chop etish (PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Body */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-800 text-sm leading-relaxed" id="printable-lesson-plan">
          
          {/* Header Title block */}
          <div className="border-b-2 border-slate-900 pb-5 text-center space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-blue-700">
              O‘zbekiston Respublikasi Xalq Ta’limi Metodik Standarti
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">
              {lesson.overview.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-600 pt-1">
              <span><strong>Fan:</strong> {lesson.subject}</span>
              <span>•</span>
              <span><strong>Sinf:</strong> {lesson.grade}</span>
              <span>•</span>
              <span><strong>Mavzu:</strong> {lesson.topic}</span>
              <span>•</span>
              <span><strong>Davomiyligi:</strong> 45 daqiqa</span>
              <span>•</span>
              <span><strong>Daraja:</strong> {lesson.level}</span>
            </div>
          </div>

          {/* Section 1: Objectives & Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5 text-sm uppercase tracking-wider text-blue-800">
                <Bookmark className="w-4 h-4 text-blue-600" />
                1. Dars Maqsadlari (SMART)
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {lesson.overview.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="font-bold text-blue-600 shrink-0">{i + 1}.</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5 text-sm uppercase tracking-wider text-indigo-800">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                2. Kutilayotgan Natijalar
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {lesson.overview.expectedOutcomes.map((out, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-indigo-600 font-bold">✓</span>
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 2: 7 Pedagogic Stages */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 border-b border-slate-200 pb-1">
              3. 45 Daqiqalik Dars Ssenariysi va Bosqichlar Taqsimoti
            </h3>

            <div className="space-y-3">
              {lesson.stages.map((st, index) => (
                <div key={st.stageId} className="border border-slate-200 rounded-xl p-4 bg-white hover:bg-slate-50/50 transition">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">{st.name}</h4>
                    </div>
                    <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-700 border border-slate-200">
                      {st.timeRange} ({st.durationMinutes} min)
                    </span>
                  </div>

                  {/* Stage-specific details */}
                  {st.stageId === 'org' && (
                    <div className="text-xs text-slate-600 space-y-1">
                      <p><strong>Salomlashish:</strong> {st.greeting}</p>
                      <p><strong>Maqsad tushuntirishi:</strong> {st.goalsExplanation}</p>
                      <p><strong>Qoidalar:</strong> {st.rules.join(', ')}</p>
                    </div>
                  )}

                  {st.stageId === 'mot' && (
                    <div className="text-xs text-slate-600 space-y-1">
                      <p><strong>Qiziqarli savol:</strong> {st.question}</p>
                      <p><strong>Muammoli vaziyat:</strong> {st.realWorldScenario}</p>
                      <p><strong>Ko‘rgazmali tavsif:</strong> {st.visualPrompt}</p>
                    </div>
                  )}

                  {st.stageId === 'exp' && (
                    <div className="text-xs text-slate-600 space-y-1.5">
                      <p><strong>Nazariya:</strong> {st.theorySummary}</p>
                      <p><strong>Asosiy tushunchalar:</strong> {st.keyConcepts.map(c => `${c.term} (${c.definition})`).join('; ')}</p>
                      <p><strong>Qoidalar:</strong> {st.formulasOrRules.join(' | ')}</p>
                    </div>
                  )}

                  {st.stageId === 'prac' && (
                    <div className="text-xs text-slate-600 space-y-1">
                      <p><strong>Interaktiv topshiriqlar soni:</strong> {st.tasks.length} ta</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {st.tasks.map((t, idx) => (
                          <span key={idx} className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[11px]">
                            {idx + 1}. {t.title} ({t.type})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {st.stageId === 'reinf' && (
                    <div className="text-xs text-slate-600 space-y-1">
                      <p><strong>Savollar soni:</strong> {st.questions?.length || 0} ta chuqurlashtirilgan savol</p>
                      <p><strong>O‘qituvchi nazorat ro‘yxati:</strong> {(st.teacherChecklist || []).join('; ') || 'Mavzuni to‘liq o‘zlashtirish'}</p>
                    </div>
                  )}

                  {st.stageId === 'eval' && (
                    <div className="text-xs text-slate-600 space-y-1">
                      <p><strong>Test savollari:</strong> {(st.quiz || st.questions || []).length} ta (umumiy 100 ball)</p>
                      <p><strong>Mezonlar:</strong> {st.gradingScale?.excellent || '85-100%'}</p>
                    </div>
                  )}

                  {st.stageId === 'refl' && (
                    <div className="text-xs text-slate-600 space-y-1">
                      <p><strong>Refleksiya savollari:</strong> {(st.reflectionPrompts || st.reflectionQuestions || []).join(' | ')}</p>
                      <p><strong>Xulosa:</strong> {st.lessonSummary}</p>
                      <p><strong>Uy vazifasi:</strong> {st.homework?.basic || st.homework?.mandatory || 'Darslikdagi mashqlar'}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Differentiation & Equipment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-200/80 text-xs">
            <div>
              <span className="font-bold text-slate-900 block mb-1">Metodik tavsiyalar & Vositalar:</span>
              <p className="text-slate-700">{lesson.teacherNotes?.pedagogicalAdvice || lesson.overview.methodologyAdvice}</p>
              <p className="text-slate-500 mt-1"><strong>Jihozlar:</strong> {lesson.teacherNotes?.equipmentNeeded || 'Darslik, daftar, doska'}</p>
            </div>
            <div>
              <span className="font-bold text-slate-900 block mb-1">Tabaqalashtirilgan yondashuv:</span>
              <p className="text-slate-700"><strong>Iqtidorli o‘quvchilar uchun:</strong> {lesson.teacherNotes?.differentiation?.forAdvanced || 'Mustaqil murakkab misollar'}</p>
              <p className="text-slate-700 mt-1"><strong>Qo‘llab-quvvatlash uchun:</strong> {lesson.teacherNotes?.differentiation?.forStruggling || 'Ko‘rgazmali chizmalar va sodda mashqlar'}</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Dars45 Ta’lim Platformasi — 45 daqiqalik raqamli dars ishlanmasi</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-semibold transition"
          >
            Yopish
          </button>
        </div>

      </div>
    </div>
  );
};
