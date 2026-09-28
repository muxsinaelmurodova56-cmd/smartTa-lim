import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  BarChart3, 
  Trophy,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { StageAssessmentData, AssessmentQuestion, QuizQuestion } from '../../types/lesson';
import { sounds } from '../../utils/audio';

interface StageAssessmentProps {
  stageData: StageAssessmentData;
  onNext: () => void;
  onAssessmentCompleted: (score: number) => void;
}

export const StageAssessment: React.FC<StageAssessmentProps> = ({
  stageData,
  onNext,
  onAssessmentCompleted,
}) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<number>(0);

  const questionsList: AssessmentQuestion[] = stageData.quiz || stageData.questions || [];

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    sounds.playClick();
  };

  const calculateResults = () => {
    let earnedPoints = 0;
    questionsList.forEach((q) => {
      if (answers[q.id] === q.correctAnswerIndex) {
        earnedPoints += (q.points || 25);
      }
    });

    setFinalScore(earnedPoints);
    setSubmitted(true);
    onAssessmentCompleted(earnedPoints);

    if (earnedPoints >= 70) {
      sounds.playSuccess();
    } else {
      sounds.playWrong();
    }
  };

  const getGradeDetails = (score: number) => {
    if (score >= 85) {
      return { grade: '5 (A’lo)', color: 'text-emerald-700 bg-emerald-100 border-emerald-300', icon: '🏆', text: 'Mukammal natija! Dars mavzusini to‘liq o‘zlashtirdingiz.' };
    } else if (score >= 70) {
      return { grade: '4 (Yaxshi)', color: 'text-blue-700 bg-blue-100 border-blue-300', icon: '⭐', text: 'Yaxshi natija! Asosiy qoidalarni to‘g‘ri qo‘lladingiz.' };
    } else if (score >= 50) {
      return { grade: '3 (Qoniqarli)', color: 'text-amber-700 bg-amber-100 border-amber-300', icon: '👍', text: 'Qoniqarli. Mavzuning ayrim joylarini yana bir bor takrorlash foydali bo‘ladi.' };
    } else {
      return { grade: '2 (Qayta ishlash)', color: 'text-rose-700 bg-rose-100 border-rose-300', icon: '📚', text: 'Mavzuni o‘qituvchi yoki AI repetitor bilan qayta ko‘rib chiqishingizni tavsiya qilamiz.' };
    }
  };

  const gradeInfo = getGradeDetails(finalScore);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Banner */}
      <div className="bg-gradient-to-br from-rose-600 via-pink-600 to-indigo-700 rounded-3xl p-6 sm:p-7 text-white shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-wider">
              6-bosqich: 38–42 daqiqa
            </span>
            <span className="text-pink-200 text-xs font-semibold">Yakuniy nazorat va baholash</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Mustaqil Test Sinovi (100 ball)
          </h2>
          <p className="text-pink-100 text-xs sm:text-sm">
            Barcha savollarga javob bering va o‘z bilimingizni baholang
          </p>
        </div>

        <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-4 text-center shrink-0">
          <span className="text-[11px] uppercase font-bold text-pink-200 block">Savollar soni</span>
          <span className="font-mono text-3xl font-extrabold text-white">{questionsList.length} ta</span>
          <span className="text-[10px] text-pink-200 block">4 daqiqa me’yor</span>
        </div>
      </div>

      {/* Results Card if Submitted */}
      {submitted && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 animate-in zoom-in-95">
          <div className="text-center space-y-3">
            <span className="text-5xl block animate-bounce">{gradeInfo.icon}</span>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Yakuniy Test Natijangiz
            </h3>
            
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl border font-bold text-base sm:text-lg shadow-xs">
              <span className="font-mono text-2xl text-blue-700">{finalScore} / 100 ball</span>
              <span>•</span>
              <span className={`px-3 py-1 rounded-xl ${gradeInfo.color}`}>
                Baho: {gradeInfo.grade}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              {gradeInfo.text}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Natija o‘qituvchi elektron jurnaliga muvaffaqiyatli saqlandi.
            </span>
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg transition active:scale-95 cursor-pointer"
            >
              <span>Refleksiya va Yakunga o‘tish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Quiz Questions List */}
      <div className="space-y-4">
        {questionsList.map((q, idx) => {
          const selected = answers[q.id];
          const isCorrect = selected === q.correctAnswerIndex;

          return (
            <div
              key={q.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  {idx + 1}-savol
                </span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  {q.points} ball
                </span>
              </div>

              <p className="font-bold text-slate-900 text-sm sm:text-base">
                {q.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt: string, optIdx: number) => {
                  const isThisSelected = selected === optIdx;
                  let style = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                  if (submitted) {
                    if (optIdx === q.correctAnswerIndex) {
                      style = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                    } else if (isThisSelected && optIdx !== q.correctAnswerIndex) {
                      style = 'bg-rose-100 border-rose-300 text-rose-800 line-through';
                    }
                  } else if (isThisSelected) {
                    style = 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`p-3.5 rounded-xl border text-xs sm:text-sm font-medium text-left transition cursor-pointer flex items-center justify-between ${style}`}
                    >
                      <span>{opt}</span>
                      {submitted && optIdx === q.correctAnswerIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                      {submitted && isThisSelected && optIdx !== q.correctAnswerIndex && (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Action */}
      {!submitted && (
        <div className="flex items-center justify-between bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500">
            Javob berilgan savollar: {Object.keys(answers).length} / {questionsList.length}
          </span>
          <button
            onClick={calculateResults}
            disabled={Object.keys(answers).length === 0}
            className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 disabled:opacity-50 text-white font-bold text-sm rounded-2xl shadow-lg shadow-rose-500/25 transition active:scale-95 cursor-pointer"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Testni yakunlash va bahoni ko‘rish</span>
          </button>
        </div>
      )}

    </div>
  );
};
