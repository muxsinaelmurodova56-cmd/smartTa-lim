import React, { useState } from 'react';
import { 
  Sparkles, 
  Smile, 
  CheckCircle2, 
  BookOpen, 
  Volume2, 
  ArrowRight,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';
import { StageOrganizationalData, Lesson } from '../../types/lesson';
import { sounds, speakText } from '../../utils/audio';

interface StageOrganizationalProps {
  stageData: StageOrganizationalData;
  lesson: Lesson;
  studentName: string;
  setStudentName: (name: string) => void;
  onNext: () => void;
}

const MOODS = [
  { emoji: '🤩', label: 'Juda qiziqmoqdaman', score: 5 },
  { emoji: '😊', label: 'Darsga tayyorman', score: 4 },
  { emoji: '😐', label: 'O‘rtacha', score: 3 },
  { emoji: '🥱', label: 'Biroz charchaganman', score: 2 },
];

export const StageOrganizational: React.FC<StageOrganizationalProps> = ({
  stageData,
  lesson,
  studentName,
  setStudentName,
  onNext,
}) => {
  const [selectedMood, setSelectedMood] = useState<number>(4);
  const [confirmedReady, setConfirmedReady] = useState<boolean>(false);

  const handleConfirmReady = () => {
    setConfirmedReady(true);
    sounds.playSuccess();
  };

  const handleSpeakGreeting = () => {
    speakText(`${stageData.greeting}. Bugungi mavzuyimiz: ${stageData.topicDisplay}. ${stageData.goalsExplanation}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Welcome Card */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-blue-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-wider">
              1-bosqich: 0–5 daqiqa
            </span>
            <span className="text-emerald-200 text-xs font-semibold">Tashkiliy qism</span>
          </div>

          <button
            onClick={handleSpeakGreeting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-emerald-300" />
            <span>Ovozli eshitish</span>
          </button>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          {stageData.greeting}
        </h2>
        <p className="text-teal-100 text-sm sm:text-base leading-relaxed max-w-2xl">
          {stageData.goalsExplanation}
        </p>

        {/* Student name confirmation */}
        <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center gap-3">
          <label className="text-xs font-bold text-teal-200 uppercase tracking-wider">
            Sizning ismingiz:
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Ismingizni kiriting..."
            className="bg-white/10 border border-white/30 rounded-xl px-3.5 py-1.5 text-sm text-white placeholder-teal-200/60 focus:bg-white focus:text-slate-900 focus:outline-hidden transition"
          />
          <span className="text-xs text-teal-200">
            ✓ Davomat tizimiga darsda deb kiritildi
          </span>
        </div>
      </div>

      {/* Grid: Lesson Goals & Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Objectives Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Bugungi Dars Maqsadi</h3>
              <p className="text-xs text-slate-500">45 daqiqa davomida nimalarga erishamiz?</p>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            {lesson.overview.objectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lesson Rules */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Dars Qoidalari</h3>
              <p className="text-xs text-slate-500">Samarali va interaktiv ishlash uchun</p>
            </div>
          </div>

          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            {stageData.rules.map((rule, idx) => (
              <li key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-indigo-50/50 border border-indigo-100/60">
                <span className="w-5 h-5 rounded-full bg-indigo-200 text-indigo-800 text-[11px] font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Mood Check & Ready Confirmation */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Smile className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
              Hozirgi kayfiyatingiz va darsga tayyorgarligingiz qanday?
            </h3>
          </div>
          <span className="text-xs text-slate-400">Tanlang:</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MOODS.map((m) => (
            <button
              key={m.score}
              onClick={() => {
                setSelectedMood(m.score);
                sounds.playClick();
              }}
              className={`p-3.5 rounded-2xl border text-center transition cursor-pointer ${
                selectedMood === m.score
                  ? 'bg-blue-50 border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <span className="text-2xl block mb-1">{m.emoji}</span>
              <span className="text-xs font-bold text-slate-800">{m.label}</span>
            </button>
          ))}
        </div>

        {/* Ready Action */}
        <div className="pt-3 flex items-center justify-end">
          <button
            onClick={() => {
              handleConfirmReady();
              onNext();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-500/25 transition active:scale-95 cursor-pointer"
          >
            <span>Darsga tayyorman, boshlaymiz!</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
