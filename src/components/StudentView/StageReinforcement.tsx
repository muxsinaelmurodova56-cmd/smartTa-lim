import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  Bot,
  Lightbulb
} from 'lucide-react';
import { StageReinforcementData, ReinforcementQuestion } from '../../types/lesson';
import { sounds } from '../../utils/audio';

interface StageReinforcementProps {
  stageData: StageReinforcementData;
  onNext: () => void;
  onOpenAiTutor: () => void;
}

export const StageReinforcement: React.FC<StageReinforcementProps> = ({
  stageData,
  onNext,
  onOpenAiTutor,
}) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [revealedAiExplanations, setRevealedAiExplanations] = useState<Record<string, boolean>>({});
  const [weakTopics, setWeakTopics] = useState<string[]>([]);

  const currentQ: ReinforcementQuestion = stageData.questions[activeQuestionIndex] || stageData.questions[0];
  const targetCorrectIndex = currentQ?.correctAnswerIndex ?? currentQ?.correctIndex ?? 0;
  const isAnswered = userAnswers[currentQ?.id] !== undefined;
  const isCorrect = userAnswers[currentQ?.id] === targetCorrectIndex;

  const handleSelectOption = (q: ReinforcementQuestion, optIdx: number) => {
    if (userAnswers[q.id] !== undefined) return;

    setUserAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
    const expectedIdx = q.correctAnswerIndex ?? q.correctIndex ?? 0;
    const correct = optIdx === expectedIdx;

    if (correct) {
      sounds.playSuccess();
    } else {
      sounds.playWrong();
      // Add misconception to weak topics
      const reason = q.commonMisconception || q.whyIncorrect;
      if (reason && !weakTopics.includes(reason)) {
        setWeakTopics((prev) => [...prev, reason]);
      }
    }
  };

  const toggleAiExplanation = (qId: string) => {
    setRevealedAiExplanations((prev) => ({ ...prev, [qId]: !prev[qId] }));
    sounds.playClick();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 rounded-3xl p-6 sm:p-7 text-white shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-wider">
              5-bosqich: 30–38 daqiqa
            </span>
            <span className="text-purple-200 text-xs font-semibold">Mustahkamlash & Xatolar Tahlili</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Xatolarni Aniqlash va AI Yordami
          </h2>
          <p className="text-purple-200 text-xs sm:text-sm">
            Savollarga javob bering. Har bir xato bo‘yicha AI repetitor sizga to‘g‘ri yo‘lni tushuntiradi.
          </p>
        </div>

        <button
          onClick={onOpenAiTutor}
          className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/25 rounded-2xl text-xs sm:text-sm font-bold text-white transition active:scale-95 shrink-0"
        >
          <Bot className="w-4 h-4 text-amber-300" />
          <span>AI Repetitor bilan suhbat</span>
        </button>
      </div>

      {/* Weak Topics Warning Alert if any */}
      {weakTopics.length > 0 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-amber-900 text-xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-1">
              AI Tahlili: Takrorlash tavsiya etiladigan nozik nuqtalar:
            </span>
            <ul className="list-disc pl-4 space-y-0.5 text-amber-800">
              {weakTopics.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Question Stepper Indicator */}
      <div className="flex items-center gap-2 overflow-x-auto p-1 bg-white rounded-2xl border border-slate-200 shadow-2xs">
        {stageData.questions.map((q, idx) => {
          const answered = userAnswers[q.id] !== undefined;
          const qCorrectIdx = q.correctAnswerIndex ?? q.correctIndex ?? 0;
          const correct = userAnswers[q.id] === qCorrectIdx;
          const isCurrent = activeQuestionIndex === idx;

          return (
            <button
              key={q.id}
              onClick={() => {
                setActiveQuestionIndex(idx);
                sounds.playClick();
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                isCurrent
                  ? 'bg-purple-600 text-white shadow-xs'
                  : answered
                  ? correct
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{idx + 1}-savol</span>
              {answered && (
                correct ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Current Question Card */}
      {currentQ && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
              Tahliliy Savol #{activeQuestionIndex + 1}
            </span>
            <span className="text-xs text-slate-400">
              {stageData.questions.length} tadan {activeQuestionIndex + 1}-savol
            </span>
          </div>

          <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {currentQ.question}
          </p>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = userAnswers[currentQ.id] === optIdx;
              const isAnsweredThis = userAnswers[currentQ.id] !== undefined;
              const targetIdx = currentQ.correctAnswerIndex ?? currentQ.correctIndex ?? 0;
              const isOptCorrect = optIdx === targetIdx;

              let style = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
              if (isAnsweredThis) {
                if (isOptCorrect) {
                  style = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                } else if (isSelected && !isOptCorrect) {
                  style = 'bg-rose-100 border-rose-300 text-rose-800 line-through';
                }
              }

              return (
                <button
                  key={optIdx}
                  disabled={isAnsweredThis}
                  onClick={() => handleSelectOption(currentQ, optIdx)}
                  className={`w-full p-4 rounded-2xl border text-sm font-semibold text-left transition cursor-pointer flex items-center justify-between ${style}`}
                >
                  <span>{opt}</span>
                  {isAnsweredThis && isOptCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {isAnsweredThis && isSelected && !isOptCorrect && <XCircle className="w-4 h-4 text-rose-600" />}
                </button>
              );
            })}
          </div>

          {/* AI Explanation & Feedback */}
          {isAnswered && (
            <div className="p-4 sm:p-5 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  AI Repetitorning Individual Tushuntirishi:
                </span>
                <span className={`text-xs font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {isCorrect ? '✓ To‘g‘ri topdingiz!' : '✗ Xatoni to‘g‘rilaymiz:'}
                </span>
              </div>

              {!isCorrect && currentQ.commonMisconception && (
                <p className="text-xs text-amber-800 bg-amber-100/70 p-2.5 rounded-xl border border-amber-200">
                  <strong>Ehtiyot bo‘ling:</strong> {currentQ.commonMisconception}
                </p>
              )}

              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                {currentQ.aiExplanation}
              </p>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                if (activeQuestionIndex > 0) setActiveQuestionIndex(activeQuestionIndex - 1);
              }}
              disabled={activeQuestionIndex === 0}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 text-xs font-bold rounded-xl transition"
            >
              Oldingi savol
            </button>

            {activeQuestionIndex < stageData.questions.length - 1 ? (
              <button
                onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
              >
                Keyingi savol ({activeQuestionIndex + 2}/{stageData.questions.length})
              </button>
            ) : (
              <button
                onClick={onNext}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition active:scale-95"
              >
                <span>Yakuniy Baholash Testiga o‘tish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
