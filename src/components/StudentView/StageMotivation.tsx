import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  Lightbulb, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  Volume2,
  MessageSquare
} from 'lucide-react';
import { StageMotivationData } from '../../types/lesson';
import { sounds, speakText } from '../../utils/audio';

interface StageMotivationProps {
  stageData: StageMotivationData;
  onNext: () => void;
}

export const StageMotivation: React.FC<StageMotivationProps> = ({
  stageData,
  onNext,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userHypothesis, setUserHypothesis] = useState<string>('');
  const [hypothesisSaved, setHypothesisSaved] = useState<boolean>(false);

  const handleSelectQuiz = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(index);
    setIsAnswerSubmitted(true);

    if (index === stageData.warmUpQuiz.answerIndex) {
      sounds.playSuccess();
    } else {
      sounds.playWrong();
    }
  };

  const handleSaveHypothesis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userHypothesis.trim()) return;
    setHypothesisSaved(true);
    sounds.playSuccess();
  };

  const handleSpeak = () => {
    speakText(`Qiziqarli savol: ${stageData.question}. ${stageData.realWorldScenario}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Hook / Problem Situation Card */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-wider">
              2-bosqich: 5–10 daqiqa
            </span>
            <span className="text-amber-100 text-xs font-semibold">Motivatsiya va muammoli vaziyat</span>
          </div>

          <button
            onClick={handleSpeak}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-amber-200" />
            <span>Tinglash</span>
          </button>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl shrink-0">
            🤔
          </div>
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-amber-200">
              Qiziqarli Jumboq Savol:
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold leading-snug">
              {stageData.question}
            </h2>
            <p className="text-amber-100 text-xs sm:text-sm leading-relaxed">
              {stageData.realWorldScenario}
            </p>
          </div>
        </div>

        {/* Visual prompt display */}
        <div className="mt-5 p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center gap-3">
          <span className="text-2xl">💡</span>
          <span className="text-xs sm:text-sm font-semibold text-white">
            {stageData.visualPrompt}
          </span>
        </div>
      </div>

      {/* Grid: Brainstorming Input & Warm-up Quiz */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Brainstorming User Hypothesis */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Miya Hujumi: Siz nima deb o‘ylaysiz?
              </h3>
              <p className="text-xs text-slate-500">O‘z taxminingizni yozib qoldiring</p>
            </div>
          </div>

          <form onSubmit={handleSaveHypothesis} className="space-y-3">
            <textarea
              value={userHypothesis}
              onChange={(e) => setUserHypothesis(e.target.value)}
              disabled={hypothesisSaved}
              placeholder="Masalan: Menimcha har bir quticha 5 kg bo‘lishi kerak, chunki..."
              rows={4}
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
            />

            <div className="flex items-center justify-between">
              {hypothesisSaved ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Fikringiz qabul qilindi!
                </span>
              ) : (
                <span className="text-[11px] text-slate-400">Har qanday taxmin qimmatli</span>
              )}

              {!hypothesisSaved && (
                <button
                  type="submit"
                  disabled={!userHypothesis.trim()}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-900 text-xs font-bold rounded-xl transition shadow-xs"
                >
                  Fikrni yuborish
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Warm-Up Quiz (Oldingi bilimlarni faollashtirish) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Oldingi Bilimlarni Sinov
              </h3>
              <p className="text-xs text-slate-500">Tezkor 1 daqiqalik blits-savol</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs sm:text-sm font-bold text-slate-800 p-3 bg-slate-50 rounded-xl border border-slate-100">
              {stageData.warmUpQuiz.question}
            </p>

            <div className="grid grid-cols-2 gap-2">
              {stageData.warmUpQuiz.options.map((option, idx) => {
                const isCorrect = idx === stageData.warmUpQuiz.answerIndex;
                const isSelected = selectedAnswer === idx;

                let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700';
                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-100 border-rose-300 text-rose-800 line-through';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectQuiz(idx)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-center transition cursor-pointer ${btnStyle}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation */}
            {isAnswerSubmitted && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1 animate-in fade-in">
                <span className="font-bold block">✓ To‘g‘ri tushuntirish:</span>
                <p>{stageData.warmUpQuiz.explanation}</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Next Step Action */}
      <div className="flex items-center justify-between bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
        <span className="text-xs text-slate-500">
          Motivatsiya bosqichi yakunlandi. Endi yangi mavzu bilan tanishamiz!
        </span>
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-orange-500/25 transition active:scale-95 cursor-pointer"
        >
          <span>Yangi mavzuni tushuntirishga o‘tish</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
