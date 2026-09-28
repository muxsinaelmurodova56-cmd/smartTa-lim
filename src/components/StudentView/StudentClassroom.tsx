import React, { useState } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Bot, 
  CheckCircle, 
  Clock,
  Award
} from 'lucide-react';
import { Lesson, StageId, StudentSubmission } from '../../types/lesson';
import { StageOrganizational } from './StageOrganizational';
import { StageMotivation } from './StageMotivation';
import { StageExplanation } from './StageExplanation';
import { StagePractice } from './StagePractice';
import { StageReinforcement } from './StageReinforcement';
import { StageAssessment } from './StageAssessment';
import { StageReflection } from './StageReflection';
import { AiTutorChatModal } from './AiTutorChatModal';
import { sounds } from '../../utils/audio';

interface StudentClassroomProps {
  lesson: Lesson;
  currentStageId: StageId;
  setCurrentStageId: (id: StageId) => void;
  studentName: string;
  setStudentName: (name: string) => void;
  onAddSubmission: (submission: StudentSubmission) => void;
}

const STAGE_ORDER: StageId[] = ['org', 'mot', 'exp', 'prac', 'reinf', 'eval', 'refl'];

export const StudentClassroom: React.FC<StudentClassroomProps> = ({
  lesson,
  currentStageId,
  setCurrentStageId,
  studentName,
  setStudentName,
  onAddSubmission,
}) => {
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [assessmentScore, setAssessmentScore] = useState(0);

  const currentStageIndex = STAGE_ORDER.indexOf(currentStageId);

  const handleNextStage = () => {
    if (currentStageIndex < STAGE_ORDER.length - 1) {
      const nextId = STAGE_ORDER[currentStageIndex + 1];
      setCurrentStageId(nextId);
      sounds.playStageBell();
    }
  };

  const handlePrevStage = () => {
    if (currentStageIndex > 0) {
      const prevId = STAGE_ORDER[currentStageIndex - 1];
      setCurrentStageId(prevId);
      sounds.playClick();
    }
  };

  const handleUpdatePracticeScore = (pts: number) => {
    setPracticeScore((prev) => Math.min(100, prev + pts));
  };

  const handleAssessmentCompleted = (score: number) => {
    setAssessmentScore(score);
  };

  const handleReflectionSubmitted = (data: {
    learned: string;
    difficult: string;
    understandingLevel: number;
    toReview: string;
  }) => {
    const totalScore = Math.round((practiceScore + assessmentScore) / 2);
    const newSubmission: StudentSubmission = {
      studentName: studentName || 'Aziz O‘quvchi',
      practiceScore,
      assessmentScore,
      totalScore,
      reflectionAnswers: data,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onAddSubmission(newSubmission);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Stage Progression Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800">
              Dars Bosqichlari: {currentStageIndex + 1} / 7
            </span>
            <span className="text-slate-400 font-mono">
              ({lesson.stages[currentStageIndex]?.timeRange})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevStage}
              disabled={currentStageIndex === 0}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextStage}
              disabled={currentStageIndex === STAGE_ORDER.length - 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs disabled:opacity-30 disabled:pointer-events-none transition shadow-xs cursor-pointer"
            >
              <span>Keyingi</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 7-stage Pills */}
        <div className="grid grid-cols-7 gap-1.5">
          {lesson.stages.map((st, idx) => {
            const isActive = st.stageId === currentStageId;
            const isDone = idx < currentStageIndex;

            return (
              <button
                key={st.stageId}
                onClick={() => {
                  setCurrentStageId(st.stageId);
                  sounds.playClick();
                }}
                className={`p-2 rounded-xl text-left border transition cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md ring-2 ring-blue-400/30'
                    : isDone
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100'
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                  <span className="font-bold">{idx + 1}</span>
                  {isDone && <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />}
                </div>
                <h5 className="font-bold text-[11px] truncate hidden md:block">
                  {st.name}
                </h5>
                <span className="text-[9px] opacity-80 block truncate">
                  {st.timeRange}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Current Stage */}
      {currentStageId === 'org' && (
        <StageOrganizational
          stageData={lesson.stages[0] as any}
          lesson={lesson}
          studentName={studentName}
          setStudentName={setStudentName}
          onNext={handleNextStage}
        />
      )}

      {currentStageId === 'mot' && (
        <StageMotivation
          stageData={lesson.stages[1] as any}
          onNext={handleNextStage}
        />
      )}

      {currentStageId === 'exp' && (
        <StageExplanation
          stageData={lesson.stages[2] as any}
          onNext={handleNextStage}
          onOpenAiTutor={() => setIsAiTutorOpen(true)}
        />
      )}

      {currentStageId === 'prac' && (
        <StagePractice
          stageData={lesson.stages[3] as any}
          onNext={handleNextStage}
          onUpdateScore={handleUpdatePracticeScore}
          onOpenAiTutor={() => setIsAiTutorOpen(true)}
        />
      )}

      {currentStageId === 'reinf' && (
        <StageReinforcement
          stageData={lesson.stages[4] as any}
          onNext={handleNextStage}
          onOpenAiTutor={() => setIsAiTutorOpen(true)}
        />
      )}

      {currentStageId === 'eval' && (
        <StageAssessment
          stageData={lesson.stages[5] as any}
          onNext={handleNextStage}
          onAssessmentCompleted={handleAssessmentCompleted}
        />
      )}

      {currentStageId === 'refl' && (
        <StageReflection
          stageData={lesson.stages[6] as any}
          lesson={lesson}
          studentName={studentName}
          totalScore={Math.round((practiceScore + assessmentScore) / 2)}
          onSubmitReflection={handleReflectionSubmitted}
        />
      )}

      {/* Floating AI Tutor Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => {
            setIsAiTutorOpen(true);
            sounds.playClick();
          }}
          className="flex items-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white rounded-full shadow-2xl shadow-blue-600/40 hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold text-sm"
        >
          <Bot className="w-5 h-5 text-amber-300 animate-bounce" />
          <span>AI Repetitor</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>

      {/* AI Tutor Chat Modal */}
      <AiTutorChatModal
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        lesson={lesson}
        studentName={studentName}
      />

    </div>
  );
};
