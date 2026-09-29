import React, { useState } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Bot, 
  CheckCircle, 
  Clock,
  Award,
  Star,
  FileCheck
} from 'lucide-react';
import { Lesson, StageId, StudentSubmission } from '../../types/lesson';
import { calculateGradingFromWork, StudentWorkProgress } from '../../utils/grading';
import { StageOrganizational } from './StageOrganizational';
import { StageMotivation } from './StageMotivation';
import { StageExplanation } from './StageExplanation';
import { StagePractice } from './StagePractice';
import { StageReinforcement } from './StageReinforcement';
import { StageAssessment } from './StageAssessment';
import { StageReflection } from './StageReflection';
import { AiTutorChatModal } from './AiTutorChatModal';
import { StudentCertificateModal } from './StudentCertificateModal';
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
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // Student progress across all 7 stages
  const [hasHypothesis, setHasHypothesis] = useState<boolean>(true);
  const [warmUpQuizCorrect, setWarmUpQuizCorrect] = useState<boolean>(true);
  const [theoryReviewed, setTheoryReviewed] = useState<boolean>(true);
  const [practiceScore, setPracticeScore] = useState<number>(85);
  const [reinforcementCorrectCount, setReinforcementCorrectCount] = useState<number>(4);
  const [reinforcementTotalCount, setReinforcementTotalCount] = useState<number>(5);
  const [assessmentScore, setAssessmentScore] = useState<number>(90);
  const [reflectionSubmitted, setReflectionSubmitted] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<StudentSubmission | null>(null);

  const currentStageIndex = STAGE_ORDER.indexOf(currentStageId);

  // Construct current progress object
  const currentProgress: StudentWorkProgress = {
    studentName: studentName || '5-sinf o‘quvchisi',
    attendanceStatus: 'present',
    hasHypothesis,
    warmUpQuizCorrect,
    theoryReviewed,
    practiceScore,
    reinforcementCorrectCount,
    reinforcementTotalCount,
    assessmentScore,
    reflectionSubmitted,
  };

  // Live Calculated Grade
  const liveGrade = calculateGradingFromWork(
    currentProgress,
    lesson.subject,
    lesson.topic
  );

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

  const handleReinforcementScoreUpdate = (correct: number, total: number) => {
    setReinforcementCorrectCount(correct);
    setReinforcementTotalCount(total);
  };

  const handleReflectionSubmitted = (data: {
    learned: string;
    difficult: string;
    understandingLevel: number;
    toReview: string;
  }) => {
    setReflectionSubmitted(true);

    const updatedProgress: StudentWorkProgress = {
      ...currentProgress,
      reflectionSubmitted: true,
      reflectionAnswers: data,
    };

    const finalCalculated = calculateGradingFromWork(
      updatedProgress,
      lesson.subject,
      lesson.topic
    );

    const newSubmission: StudentSubmission = {
      id: `sub-${Date.now()}`,
      studentName: studentName || 'Azizbek Rashidov',
      practiceScore,
      assessmentScore,
      totalScore: finalCalculated.totalScore,
      finalGrade: finalCalculated.finalGrade,
      gradeLabel: finalCalculated.gradeLabel,
      gradeColor: finalCalculated.gradeColor,
      gradeBadge: finalCalculated.gradeBadge,
      breakdown: finalCalculated.breakdown,
      aiFeedback: finalCalculated.aiPedagogicalFeedback,
      reflectionAnswers: data,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setSubmissionResult(newSubmission);
    onAddSubmission(newSubmission);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner: Stage Progression & Live Grade Indicator */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-800 text-sm">
                {currentStageIndex + 1}-bosqich: {lesson.stages[currentStageIndex]?.name}
              </span>
              <span className="text-slate-400 font-mono text-xs">
                ({lesson.stages[currentStageIndex]?.timeRange})
              </span>
            </div>
          </div>

          {/* Real-time Grade & Work Score Badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 font-semibold">Qilingan ishlar balli:</span>
              <span className="font-mono font-black text-blue-600 text-sm">
                {liveGrade.totalScore} / 100
              </span>
            </div>

            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-black text-xs shadow-2xs ${liveGrade.gradeColor}`}>
              <span>{liveGrade.badgeEmoji}</span>
              <span>Baho: {liveGrade.gradeLabel}</span>
            </div>

            {submissionResult && (
              <button
                onClick={() => {
                  setIsCertificateOpen(true);
                  sounds.playClick();
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-xs transition active:scale-95 cursor-pointer"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Shahodatnoma</span>
              </button>
            )}

            <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
              <button
                onClick={handlePrevStage}
                disabled={currentStageIndex === 0}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
                title="Oldingi bosqich"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextStage}
                disabled={currentStageIndex === STAGE_ORDER.length - 1}
                className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs disabled:opacity-30 disabled:pointer-events-none transition shadow-xs cursor-pointer"
              >
                <span>Keyingi</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
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
                className={`p-2 rounded-2xl text-left border transition cursor-pointer relative overflow-hidden ${
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
          onHypothesisSaved={() => setHasHypothesis(true)}
          onWarmUpAnswered={(correct) => setWarmUpQuizCorrect(correct)}
        />
      )}

      {currentStageId === 'exp' && (
        <StageExplanation
          stageData={lesson.stages[2] as any}
          onNext={() => {
            setTheoryReviewed(true);
            handleNextStage();
          }}
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
          onUpdateScore={handleReinforcementScoreUpdate}
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
          calculatedGrade={liveGrade}
          submissionResult={submissionResult}
          onOpenCertificate={() => setIsCertificateOpen(true)}
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

      {/* Student Official Certificate Modal */}
      {submissionResult && (
        <StudentCertificateModal
          isOpen={isCertificateOpen}
          onClose={() => setIsCertificateOpen(false)}
          lesson={lesson}
          submission={submissionResult}
        />
      )}

    </div>
  );
};
