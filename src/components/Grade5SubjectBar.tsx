import React, { useState } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  Plus, 
  BookOpen, 
  Layers,
  GraduationCap
} from 'lucide-react';
import { Lesson, SubjectName, GRADE_5_SUBJECTS } from '../types/lesson';
import { sounds } from '../utils/audio';

interface Grade5SubjectBarProps {
  lessons: Lesson[];
  activeLessonId: string;
  onSelectLesson: (lessonId: string) => void;
  onOpenGenerator: () => void;
}

export const Grade5SubjectBar: React.FC<Grade5SubjectBarProps> = ({
  lessons,
  activeLessonId,
  onSelectLesson,
  onOpenGenerator,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const activeLesson = lessons.find((l) => l.id === activeLessonId) || lessons[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-sm">
            5
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900">
                5-Sinf O‘quv Dasturi va Fanlari
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                45 Daqiqalik Darslar
              </span>
            </div>
            <p className="text-xs text-slate-500">
              5-sinf uchun mo‘ljallangan fanlardan birini tanlang yoki yangi dars generatsiya qiling
            </p>
          </div>
        </div>

        <button
          onClick={onOpenGenerator}
          className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition active:scale-95 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Yangi 5-Sinf Darsini Yaratish</span>
        </button>
      </div>

      {/* Horizontal Scrollable Subject Cards */}
      <div className="pt-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {GRADE_5_SUBJECTS.map((subjectMeta) => {
            // Find existing lesson for this subject, if any
            const existingLesson = lessons.find((l) => l.subject === subjectMeta.name);
            const isCurrentActive = activeLesson.subject === subjectMeta.name;

            return (
              <button
                key={subjectMeta.name}
                onClick={() => {
                  if (existingLesson) {
                    onSelectLesson(existingLesson.id);
                  } else {
                    // Open generator preselected with this subject
                    onOpenGenerator();
                  }
                  sounds.playClick();
                }}
                className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border text-xs transition cursor-pointer ${
                  isCurrentActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-bold scale-[1.02]'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 font-medium'
                }`}
              >
                <span className="text-base">{subjectMeta.icon}</span>
                <span className="whitespace-nowrap">{subjectMeta.name}</span>
                {existingLesson ? (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isCurrentActive ? 'bg-blue-500/50 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    45m
                  </span>
                ) : (
                  <span className="text-[10px] text-amber-500 font-bold">
                    + AI
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Active Lesson Overview Banner */}
      <div className="mt-3 bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-xl p-3 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl shrink-0">
            {GRADE_5_SUBJECTS.find((s) => s.name === activeLesson.subject)?.icon || '📚'}
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                5-sinf {activeLesson.subject}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-semibold text-slate-800 truncate">
                {activeLesson.topic}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate">
              {activeLesson.overview.objectives[0]}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 text-xs">
          <span className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-slate-600 font-mono text-[11px]">
            ⏱️ 45 daqiqa (7 bosqich)
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg font-bold text-[11px]">
            Daraja: {activeLesson.level}
          </span>
        </div>
      </div>
    </div>
  );
};
