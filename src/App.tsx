import React, { useState, useEffect } from 'react';
import { defaultLessons } from './data/defaultLessons';
import { Lesson, StageId, AttendanceRecord, StudentSubmission } from './types/lesson';
import { INITIAL_CLASS_SUBMISSIONS } from './utils/grading';
import { Navbar } from './components/Navbar';
import { Grade5SubjectBar } from './components/Grade5SubjectBar';
import { LessonGeneratorModal } from './components/LessonGeneratorModal';
import { TeacherDashboard } from './components/TeacherView/TeacherDashboard';
import { WhiteboardModal } from './components/TeacherView/WhiteboardModal';
import { LessonPlanExportModal } from './components/TeacherView/LessonPlanExportModal';
import { StudentClassroom } from './components/StudentView/StudentClassroom';
import { sounds } from './utils/audio';

const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: '1', studentName: 'Jasur Aliyev', status: 'present' },
  { id: '2', studentName: 'Madina Karimova', status: 'present' },
  { id: '3', studentName: 'Bekzod Usmonov', status: 'late' },
  { id: '4', studentName: 'Nilufar Shokirova', status: 'present' },
  { id: '5', studentName: 'Azizbek Rashidov', status: 'present' },
  { id: '6', studentName: 'Gulnoza Rustamova', status: 'excused' },
  { id: '7', studentName: 'Diyorbek Qodirov', status: 'present' },
  { id: '8', studentName: 'Zilola Ergasheva', status: 'present' },
];

export default function App() {
  const [role, setRole] = useState<'teacher' | 'student'>('teacher');
  const [lessons, setLessons] = useState<Lesson[]>(defaultLessons);
  const [activeLessonId, setActiveLessonId] = useState<string>(defaultLessons[0].id);
  const [currentStageId, setCurrentStageId] = useState<StageId>('org');

  // Master 45-minute lesson timer
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Modals
  const [isGeneratorOpen, setIsGeneratorOpen] = useState<boolean>(false);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Classroom data
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [submissions, setSubmissions] = useState<StudentSubmission[]>(INITIAL_CLASS_SUBMISSIONS);
  const [studentName, setStudentName] = useState<string>('Azizbek Rashidov');

  const activeLesson = lessons.find((l) => l.id === activeLessonId) || lessons[0];

  // Timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev >= 2700) {
            // 45 minutes completed!
            setIsTimerRunning(false);
            sounds.playStageBell();
            return 2700;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  const toggleTimer = () => {
    setIsTimerRunning((prev) => !prev);
    sounds.playClick();
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
    sounds.playClick();
  };

  const handleLessonCreated = (newLesson: Lesson) => {
    setLessons((prev) => [newLesson, ...prev]);
    setActiveLessonId(newLesson.id);
    setCurrentStageId('org');
    setTimerSeconds(0);
  };

  const handleAddSubmission = (submission: StudentSubmission) => {
    setSubmissions((prev) => {
      const idx = prev.findIndex(
        (s) => s.studentName.trim().toLowerCase() === submission.studentName.trim().toLowerCase()
      );
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = submission;
        return copy;
      }
      return [submission, ...prev];
    });
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        role={role}
        setRole={setRole}
        lessons={lessons}
        activeLesson={activeLesson}
        setActiveLessonId={(id) => {
          setActiveLessonId(id);
          setCurrentStageId('org');
        }}
        onOpenGenerator={() => setIsGeneratorOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        timerSeconds={timerSeconds}
        isTimerRunning={isTimerRunning}
        toggleTimer={toggleTimer}
        resetTimer={resetTimer}
        currentStageId={currentStageId}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* 5th Grade Curriculum Navigation Bar */}
        <Grade5SubjectBar
          lessons={lessons}
          activeLessonId={activeLessonId}
          onSelectLesson={(id) => {
            setActiveLessonId(id);
            setCurrentStageId('org');
          }}
          onOpenGenerator={() => setIsGeneratorOpen(true)}
        />

        {role === 'teacher' ? (
          <TeacherDashboard
            lesson={activeLesson}
            currentStageId={currentStageId}
            setCurrentStageId={setCurrentStageId}
            timerSeconds={timerSeconds}
            isTimerRunning={isTimerRunning}
            toggleTimer={toggleTimer}
            resetTimer={resetTimer}
            onOpenWhiteboard={() => setIsWhiteboardOpen(true)}
            onOpenExportModal={() => setIsExportModalOpen(true)}
            attendance={attendance}
            setAttendance={setAttendance}
            submissions={submissions}
            setSubmissions={setSubmissions}
          />
        ) : (
          <StudentClassroom
            lesson={activeLesson}
            currentStageId={currentStageId}
            setCurrentStageId={setCurrentStageId}
            studentName={studentName}
            setStudentName={setStudentName}
            onAddSubmission={handleAddSubmission}
          />
        )}
      </main>

      {/* AI Lesson Generator Modal */}
      <LessonGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        onLessonCreated={handleLessonCreated}
      />

      {/* Whiteboard Modal */}
      <WhiteboardModal
        isOpen={isWhiteboardOpen}
        onClose={() => setIsWhiteboardOpen(false)}
        lessonTopic={activeLesson.topic}
      />

      {/* Lesson Plan PDF Export Modal */}
      <LessonPlanExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        lesson={activeLesson}
      />

    </div>
  );
}
