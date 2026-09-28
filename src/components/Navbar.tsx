import React from 'react';
import { 
  Sparkles, 
  GraduationCap, 
  UserCheck, 
  Volume2, 
  VolumeX, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  FileText,
  Maximize2
} from 'lucide-react';
import { Lesson, StageId, GRADE_5_SUBJECTS } from '../types/lesson';
import { sounds } from '../utils/audio';

interface NavbarProps {
  role: 'teacher' | 'student';
  setRole: (role: 'teacher' | 'student') => void;
  lessons: Lesson[];
  activeLesson: Lesson;
  setActiveLessonId: (id: string) => void;
  onOpenGenerator: () => void;
  onOpenExportModal: () => void;
  // Timer state
  timerSeconds: number;
  isTimerRunning: boolean;
  toggleTimer: () => void;
  resetTimer: () => void;
  currentStageId: StageId;
}

const STAGE_LABELS: Record<StageId, { name: string; range: string; color: string }> = {
  org: { name: 'Tashkiliy qism', range: '0–5 daq', color: 'bg-emerald-500' },
  mot: { name: 'Motivatsiya', range: '5–10 daq', color: 'bg-amber-500' },
  exp: { name: 'Tushuntirish', range: '10–20 daq', color: 'bg-blue-500' },
  prac: { name: 'Amaliy mashg‘ulot', range: '20–30 daq', color: 'bg-indigo-500' },
  reinf: { name: 'Mustahkamlash', range: '30–38 daq', color: 'bg-purple-500' },
  eval: { name: 'Yakuniy baholash', range: '38–42 daq', color: 'bg-rose-500' },
  refl: { name: 'Refleksiya', range: '42–45 daq', color: 'bg-teal-500' },
};

export const Navbar: React.FC<NavbarProps> = ({
  role,
  setRole,
  lessons,
  activeLesson,
  setActiveLessonId,
  onOpenGenerator,
  onOpenExportModal,
  timerSeconds,
  isTimerRunning,
  toggleTimer,
  resetTimer,
  currentStageId,
}) => {
  const [soundOn, setSoundOn] = React.useState(sounds.isEnabled());

  const handleToggleSound = () => {
    const newState = sounds.toggleSound();
    setSoundOn(newState);
  };

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const stageInfo = STAGE_LABELS[currentStageId] || STAGE_LABELS.org;
  const currentSubjectMeta = GRADE_5_SUBJECTS.find((s) => s.name === activeLesson.subject);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand & 5-Sinf Badge */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 bg-clip-text text-transparent">
                    Dars45
                  </span>
                  <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    5-SINF
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 -mt-0.5 hidden sm:block truncate max-w-[200px]">
                  Barcha fanlar uchun 45 daqiqa
                </p>
              </div>
            </div>

            {/* Quick Lesson Selector dropdown */}
            <div className="hidden lg:flex items-center pl-3 border-l border-slate-200">
              <span className="text-base mr-1.5">{currentSubjectMeta?.icon || '📖'}</span>
              <select
                value={activeLesson.id}
                onChange={(e) => setActiveLessonId(e.target.value)}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs rounded-lg px-2.5 py-1.5 font-semibold transition cursor-pointer max-w-[240px] truncate focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                {lessons.map((les) => (
                  <option key={les.id} value={les.id}>
                    {les.subject}: {les.topic}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Master 45-Minute Timer & Stage Indicator */}
          <div className="flex items-center gap-2 bg-slate-100/90 border border-slate-200 rounded-xl px-2.5 py-1">
            <Clock className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-mono font-bold text-sm sm:text-base text-slate-800">
              {formatTimer(timerSeconds)}
              <span className="text-slate-400 text-xs font-normal"> / 45:00</span>
            </span>

            {/* Stage Pill */}
            <div className="hidden md:flex items-center gap-1.5 pl-2 border-l border-slate-300 text-xs">
              <span className={`w-2 h-2 rounded-full ${stageInfo.color} animate-pulse`} />
              <span className="font-semibold text-slate-700 truncate max-w-[120px]">
                {stageInfo.name}
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                ({stageInfo.range})
              </span>
            </div>

            {/* Timer controls */}
            <div className="flex items-center gap-1 pl-1">
              <button
                onClick={toggleTimer}
                title={isTimerRunning ? 'Pauza' : 'Boshlash'}
                className="p-1 rounded-md text-slate-600 hover:text-blue-600 hover:bg-white transition cursor-pointer"
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={resetTimer}
                title="Qayta boshlash"
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-white transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Actions & Role Switcher */}
          <div className="flex items-center gap-2">
            
            {/* AI Generator Button */}
            <button
              onClick={onOpenGenerator}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-xs shadow-blue-500/20 transition active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span className="hidden sm:inline">AI Dars Generatori</span>
              <span className="sm:hidden">AI Dars</span>
            </button>

            {/* Dars ishlanmasi (PDF/Export) */}
            {role === 'teacher' && (
              <button
                onClick={onOpenExportModal}
                title="Dars ishlanmasini ko‘rish va yuklab olish"
                className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium transition cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Konspekt</span>
              </button>
            )}

            {/* Role Switcher Pill */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => {
                  setRole('teacher');
                  sounds.playClick();
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
                  role === 'teacher'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">O‘qituvchi</span>
              </button>
              <button
                onClick={() => {
                  setRole('student');
                  sounds.playClick();
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
                  role === 'student'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">O‘quvchi</span>
              </button>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              title={soundOn ? 'Ovozni o‘chirish' : 'Ovozni yoqish'}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition cursor-pointer"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Fullscreen */}
            <button
              onClick={handleFullscreen}
              title="To‘liq ekran"
              className="hidden sm:block p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
