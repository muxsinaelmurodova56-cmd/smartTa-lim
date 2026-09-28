import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  HelpCircle,
  Lightbulb,
  Maximize2
} from 'lucide-react';
import { StageExplanationData } from '../../types/lesson';
import { sounds, speakText } from '../../utils/audio';

interface StageExplanationProps {
  stageData: StageExplanationData;
  onNext: () => void;
  onOpenAiTutor: () => void;
}

export const StageExplanation: React.FC<StageExplanationProps> = ({
  stageData,
  onNext,
  onOpenAiTutor,
}) => {
  const [activeExampleIndex, setActiveExampleIndex] = useState<number>(0);
  const [scratchNotes, setScratchNotes] = useState<string>('');
  const [showScratchpad, setShowScratchpad] = useState<boolean>(false);

  const handleSpeakTheory = () => {
    speakText(`${stageData.theorySummary}. Asosiy qoidalar: ${stageData.formulasOrRules.join('. ')}`);
  };

  const activeExample = stageData.examples[activeExampleIndex] || stageData.examples[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-wider">
              3-bosqich: 10–20 daqiqa
            </span>
            <span className="text-blue-100 text-xs font-semibold">Yangi mavzuni tushuntirish</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeakTheory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-blue-200" />
              <span>Ovozli o‘qish</span>
            </button>
            <button
              onClick={() => setShowScratchpad(!showScratchpad)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-md transition cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>{showScratchpad ? 'Daftarni yopish' : 'Qoralama daftar'}</span>
            </button>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-3">
          Nazariy Asoslar va Qoidalar
        </h2>
        <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-3xl">
          {stageData.theorySummary}
        </p>

        {/* AI visual explanation box */}
        <div className="mt-5 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-blue-50">
            <strong className="text-amber-200 block mb-0.5">Vizual Tasavvur Qoidasi:</strong>
            {stageData.aiVisualExplanation}
          </div>
        </div>
      </div>

      {/* Optional Scratchpad (Qoralama Daftarcha) */}
      {showScratchpad && (
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 shadow-xs animate-in fade-in space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              📝 Shaxsiy Qoralama Daftarchangiz
            </span>
            <span className="text-[11px] text-amber-700">Dars davomida o‘z hisoblaringizni yozib boring</span>
          </div>
          <textarea
            value={scratchNotes}
            onChange={(e) => setScratchNotes(e.target.value)}
            placeholder="Misollarni bu yerda hisoblashingiz mumkin (masalan: 3x - 12 = 0 ➔ 3x = 12 ➔ x = 4)..."
            rows={3}
            className="w-full bg-white border border-amber-300 rounded-2xl p-3 text-xs sm:text-sm font-mono text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
          />
        </div>
      )}

      {/* Key Concepts Grid (3 ta asosiy tushuncha) */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
          <span>Asosiy Tushunchalar va Atamalar</span>
          <span className="text-xs font-normal text-slate-400">({stageData.keyConcepts.length} ta tushuncha)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stageData.keyConcepts.map((concept, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition space-y-2 group"
            >
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 text-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {concept.icon || '🔑'}
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{concept.term}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {concept.definition}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Formulas & Rules Cards */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-3 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-300" />
            Asosiy Qoidalar va Formulalar
          </span>
          <span className="text-[11px] text-slate-400">Yodda saqlang</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {stageData.formulasOrRules.map((rule, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-slate-800/90 rounded-2xl border border-slate-700 font-mono text-xs sm:text-sm text-emerald-300 font-bold flex items-center gap-2"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Worked Examples (Namunaviy misollar bosqichma-bosqich) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Namunaviy Misollar Yechimi</h3>
            <p className="text-xs text-slate-500">Bosqichma-bosqich yechim algoritmi bilan tanishing</p>
          </div>

          {/* Example Selector Tabs */}
          <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
            {stageData.examples.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveExampleIndex(idx);
                  sounds.playClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeExampleIndex === idx
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {ex.title}
              </button>
            ))}
          </div>
        </div>

        {activeExample && (
          <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-blue-200/60 pb-3">
              <div>
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                  Masala sharti:
                </span>
                <span className="font-mono font-bold text-slate-900 text-base">
                  {activeExample.problem}
                </span>
              </div>
              <div className="bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-xl text-emerald-900 text-xs font-mono font-bold">
                Javob: {activeExample.solution}
              </div>
            </div>

            {/* Steps list */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Yechish bosqichlari:
              </span>
              {activeExample.stepByStep.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-blue-200/60 text-xs sm:text-sm text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Helper trigger */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            onClick={onOpenAiTutor}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 p-1"
          >
            <Sparkles className="w-4 h-4" />
            <span>Mavzuni tushunmadingizmi? AI Repetitordan so‘rang</span>
          </button>

          <button
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/25 transition active:scale-95 cursor-pointer"
          >
            <span>Interaktiv Amaliy Mashg‘ulotga o‘tish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
