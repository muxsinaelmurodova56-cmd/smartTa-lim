import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  Bell, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Award, 
  MessageSquare, 
  PenTool, 
  FileText,
  Plus,
  Trash2,
  Sparkles,
  TrendingUp,
  UserCheck,
  UserX,
  UserMinus,
  Star,
  Printer,
  Copy,
  Download,
  Edit3,
  FileSpreadsheet,
  Check
} from 'lucide-react';
import { Lesson, StageId, AttendanceRecord, StudentSubmission } from '../../types/lesson';
import { sounds } from '../../utils/audio';
import { StudentCertificateModal } from '../StudentView/StudentCertificateModal';

interface TeacherDashboardProps {
  lesson: Lesson;
  currentStageId: StageId;
  setCurrentStageId: (id: StageId) => void;
  timerSeconds: number;
  isTimerRunning: boolean;
  toggleTimer: () => void;
  resetTimer: () => void;
  onOpenWhiteboard: () => void;
  onOpenExportModal: () => void;
  attendance: AttendanceRecord[];
  setAttendance: React.Dispatch<React.SetStateAction<AttendanceRecord[]>>;
  submissions: StudentSubmission[];
  setSubmissions?: React.Dispatch<React.SetStateAction<StudentSubmission[]>>;
}

const STAGE_ORDER: StageId[] = ['org', 'mot', 'exp', 'prac', 'reinf', 'eval', 'refl'];

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  lesson,
  currentStageId,
  setCurrentStageId,
  timerSeconds,
  isTimerRunning,
  toggleTimer,
  resetTimer,
  onOpenWhiteboard,
  onOpenExportModal,
  attendance,
  setAttendance,
  submissions,
  setSubmissions,
}) => {
  const [activeTab, setActiveTab] = useState<'control' | 'attendance' | 'results' | 'methodology'>('control');
  const [newStudentName, setNewStudentName] = useState('');
  const [selectedStudentForCert, setSelectedStudentForCert] = useState<StudentSubmission | null>(null);
  const [editingStudentName, setEditingStudentName] = useState<string | null>(null);
  const [editingGrade, setEditingGrade] = useState<number>(5);
  const [copiedEMaktab, setCopiedEMaktab] = useState(false);

  const currentStageIndex = STAGE_ORDER.indexOf(currentStageId);
  const currentStageData = lesson.stages[currentStageIndex] || lesson.stages[0];

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

  const ringStageBell = () => {
    sounds.playStageBell();
  };

  // Attendance handlers
  const updateStudentStatus = (id: string, status: AttendanceRecord['status']) => {
    setAttendance((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
    sounds.playClick();
  };

  const markAllPresent = () => {
    setAttendance((prev) => prev.map((s) => ({ ...s, status: 'present' })));
    sounds.playSuccess();
  };

  const addStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    const newStudent: AttendanceRecord = {
      id: `std-${Date.now()}`,
      studentName: newStudentName.trim(),
      status: 'present',
    };
    setAttendance((prev) => [...prev, newStudent]);
    setNewStudentName('');
    sounds.playSuccess();
  };

  const removeStudent = (id: string) => {
    setAttendance((prev) => prev.filter((s) => s.id !== id));
    sounds.playClick();
  };

  // Stats calculation
  const presentCount = attendance.filter((a) => a.status === 'present').length;
  const lateCount = attendance.filter((a) => a.status === 'late').length;
  const absentCount = attendance.filter((a) => a.status === 'absent' || a.status === 'excused').length;

  // Grade stats
  const getEffectiveGrade = (sub: StudentSubmission): number => {
    return sub.teacherOverrideGrade || sub.finalGrade || (sub.totalScore >= 85 ? 5 : sub.totalScore >= 70 ? 4 : 3);
  };

  const grade5Count = submissions.filter((s) => getEffectiveGrade(s) === 5).length;
  const grade4Count = submissions.filter((s) => getEffectiveGrade(s) === 4).length;
  const grade3Count = submissions.filter((s) => getEffectiveGrade(s) === 3).length;
  const grade2Count = submissions.filter((s) => getEffectiveGrade(s) === 2).length;

  const totalEvaluated = submissions.length || 1;
  const qualityRate = Math.round(((grade5Count + grade4Count) / totalEvaluated) * 100);
  const masteryRate = 100;

  const averageScore = submissions.length > 0
    ? Math.round(submissions.reduce((acc, curr) => acc + curr.totalScore, 0) / submissions.length)
    : 85;

  const averageGradeNum = submissions.length > 0
    ? (submissions.reduce((acc, curr) => acc + getEffectiveGrade(curr), 0) / submissions.length).toFixed(1)
    : '4.8';

  const handleCopyEMaktabTable = () => {
    sounds.playClick();
    let text = `[eMaktab / Kundalik.com - 5-SINF ELEKTRON JURNALI]\nFan: ${lesson.subject}\nMavzu: ${lesson.topic}\nSana: ${new Date().toLocaleDateString('uz-UZ')}\n\n`;
    text += `№ | O‘quvchi F.I.Sh | Jami Ball | Yakuniy Baho\n`;
    text += `------------------------------------------------\n`;
    submissions.forEach((s, idx) => {
      const g = getEffectiveGrade(s);
      text += `${idx + 1}. ${s.studentName.padEnd(20)} | ${s.totalScore}/100 | ${g} (${g === 5 ? 'A’lo' : g === 4 ? 'Yaxshi' : 'Qoniqarli'})\n`;
    });
    text += `\nSifat ko‘rsatkichi: ${qualityRate}%\nO‘zlashtirish: ${masteryRate}%\nO‘rtacha baho: ${averageGradeNum}`;
    
    navigator.clipboard.writeText(text);
    setCopiedEMaktab(true);
    sounds.playSuccess();
    setTimeout(() => setCopiedEMaktab(false), 2500);
  };

  const handleDownloadCSV = () => {
    sounds.playClick();
    let csv = `№,O'quvchi F.I.Sh,Davomat,Motivatsiya,Nazariya,Amaliyot,Mustahkamlash,Yakuniy Test,Refleksiya,Jami Ball,Yakuniy Baho\n`;
    submissions.forEach((s, idx) => {
      const g = getEffectiveGrade(s);
      const b = s.breakdown;
      csv += `"${idx + 1}","${s.studentName}","${b?.attendance?.score || 10}","${b?.motivation?.score || 10}","${b?.theory?.score || 10}","${b?.practice?.score || s.practiceScore}","${b?.reinforcement?.score || 18}","${b?.assessment?.score || s.assessmentScore}","${b?.reflection?.score || 10}","${s.totalScore}","${g}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `5-sinf_${lesson.subject.replace(/\\s+/g, '_')}_baholar.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    sounds.playSuccess();
  };

  const handleOverrideGrade = (studentName: string, newGrade: 5 | 4 | 3 | 2) => {
    if (setSubmissions) {
      setSubmissions((prev) =>
        prev.map((s) =>
          s.studentName === studentName
            ? { ...s, teacherOverrideGrade: newGrade, finalGrade: newGrade, gradeLabel: `${newGrade} (${newGrade === 5 ? 'A’lo' : newGrade === 4 ? 'Yaxshi' : 'Qoniqarli'})` }
            : s
        )
      );
      sounds.playSuccess();
      setEditingStudentName(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Active Lesson Info & Master Stage Controller */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide uppercase">
                O‘qituvchi Boshqaruv Markazi
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                ● Jonli dars
              </span>
              <span className="text-slate-400 text-xs font-mono">
                {lesson.subject} | {lesson.grade} | {lesson.level}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {lesson.topic}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl line-clamp-2">
              {lesson.overview.objectives[0]}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center flex-wrap gap-2.5">
            <button
              onClick={onOpenWhiteboard}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs sm:text-sm font-bold text-white transition active:scale-95 shadow-xs"
            >
              <PenTool className="w-4 h-4 text-amber-300" />
              <span>Sinf Doskasi</span>
            </button>
            <button
              onClick={ringStageBell}
              title="Qo‘ng‘iroq chalish (O‘quvchilarni ogohlantirish)"
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 rounded-xl text-xs sm:text-sm font-bold text-slate-900 transition active:scale-95 shadow-md shadow-amber-500/20"
            >
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Qo‘ng‘iroq</span>
            </button>
            <button
              onClick={onOpenExportModal}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-xs sm:text-sm font-bold text-white transition active:scale-95 shadow-md shadow-blue-500/20"
            >
              <FileText className="w-4 h-4" />
              <span>Dars Konspekti</span>
            </button>
          </div>
        </div>

        {/* 7-Stage Pedagogical Timeline Slider */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-bold text-slate-300 uppercase tracking-wider">
              45 Daqiqalik Dars Bosqichlari ({currentStageIndex + 1}/7)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevStage}
                disabled={currentStageIndex === 0}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={handleNextStage}
                disabled={currentStageIndex === STAGE_ORDER.length - 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 font-bold text-xs text-white disabled:opacity-30 disabled:pointer-events-none transition"
              >
                <span>Keyingi bosqich</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {lesson.stages.map((st, idx) => {
              const isActive = st.stageId === currentStageId;
              const isPassed = idx < currentStageIndex;

              return (
                <button
                  key={st.stageId}
                  onClick={() => {
                    setCurrentStageId(st.stageId);
                    sounds.playClick();
                  }}
                  className={`p-3 rounded-2xl text-left border transition cursor-pointer relative overflow-hidden ${
                    isActive
                      ? 'bg-blue-600 border-blue-400 text-white shadow-lg ring-2 ring-blue-300/40'
                      : isPassed
                      ? 'bg-white/10 border-white/10 text-slate-300 hover:bg-white/15'
                      : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-mono font-bold">{st.timeRange}</span>
                    {isPassed && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <h4 className="font-bold text-xs truncate">{st.name}</h4>
                  <span className="text-[10px] text-white/70 block mt-0.5 font-mono">
                    {st.durationMinutes} daqiqa
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Tabs Menu */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-sm">
        <button
          onClick={() => setActiveTab('control')}
          className={`flex items-center gap-2 px-4 py-2 font-bold rounded-xl transition ${
            activeTab === 'control'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Hozirgi Bosqich Boshqaruvi</span>
        </button>

        <button
          onClick={() => setActiveTab('attendance')}
          className={`flex items-center gap-2 px-4 py-2 font-bold rounded-xl transition ${
            activeTab === 'attendance'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Davomat ({presentCount}/{attendance.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('results')}
          className={`flex items-center gap-2 px-4 py-2 font-bold rounded-xl transition ${
            activeTab === 'results'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Natijalar & Baholar ({averageScore} ball)</span>
        </button>

        <button
          onClick={() => setActiveTab('methodology')}
          className={`flex items-center gap-2 px-4 py-2 font-bold rounded-xl transition ${
            activeTab === 'methodology'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Metodik Tavsiyalar</span>
        </button>
      </div>

      {/* TAB CONTENT 1: Current Stage Controller */}
      {activeTab === 'control' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Stage Card */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center text-lg">
                  {currentStageIndex + 1}
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                    {currentStageData.name}
                  </h3>
                  <span className="text-xs font-semibold text-blue-600">
                    Belgilangan vaqt: {currentStageData.timeRange} ({currentStageData.durationMinutes} daqiqa)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevStage}
                  disabled={currentStageIndex === 0}
                  className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200 disabled:opacity-40"
                >
                  Oldingi
                </button>
                <button
                  onClick={handleNextStage}
                  disabled={currentStageIndex === STAGE_ORDER.length - 1}
                  className="px-3.5 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs disabled:opacity-40"
                >
                  Keyingi
                </button>
              </div>
            </div>

            {/* Dynamic Stage Details preview for Teacher */}
            {currentStageId === 'org' && (
              <div className="space-y-4 text-sm text-slate-700">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    O‘qituvchi salomlashishi:
                  </span>
                  <p className="font-medium text-emerald-950">
                    {(currentStageData as any).greeting}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Dars maqsadi va qoidalari:
                  </h4>
                  <p className="text-slate-600">
                    {(currentStageData as any).goalsExplanation}
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                    {(currentStageData as any).rules?.map((rule: string, i: number) => (
                      <li key={i}>{rule}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {currentStageId === 'mot' && (
              <div className="space-y-4 text-sm">
                <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Boshlang‘ich muammoli jumboq:
                  </span>
                  <p className="font-bold text-slate-900 text-base">
                    {(currentStageData as any).question}
                  </p>
                  <p className="text-xs text-amber-900 bg-white/70 p-3 rounded-xl border border-amber-200/60">
                    <strong>Ko‘rgazmali tushuntirish:</strong> {(currentStageData as any).visualPrompt}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <span className="text-xs font-bold text-slate-700 block mb-1">
                    Faollashtiruvchi savol:
                  </span>
                  <p className="font-medium text-slate-800 mb-2">
                    {(currentStageData as any).warmUpQuiz?.question}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {(currentStageData as any).warmUpQuiz?.options.map((opt: string, i: number) => (
                      <div
                        key={i}
                        className={`p-2 rounded-lg border font-medium ${
                          i === (currentStageData as any).warmUpQuiz?.answerIndex
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        {opt} {i === (currentStageData as any).warmUpQuiz?.answerIndex && '✓ To‘g‘ri'}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStageId === 'exp' && (
              <div className="space-y-4 text-sm">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-800 block mb-1">
                    Nazariy konspekt:
                  </span>
                  <p className="text-slate-800 font-medium">
                    {(currentStageData as any).theorySummary}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(currentStageData as any).keyConcepts?.map((k: any, i: number) => (
                    <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <span className="text-lg">{k.icon || '📌'}</span>
                      <h5 className="font-bold text-xs text-slate-900">{k.term}</h5>
                      <p className="text-[11px] text-slate-600 leading-tight">{k.definition}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Namunaviy misollar yechimi:
                  </span>
                  {(currentStageData as any).examples?.map((ex: any, i: number) => (
                    <div key={i} className="p-3 border border-slate-200 rounded-xl bg-slate-50/50">
                      <h5 className="font-bold text-xs text-blue-700">{ex.title}: {ex.problem}</h5>
                      <p className="font-mono text-xs font-bold text-emerald-700 mt-1">{ex.solution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStageId === 'prac' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {(currentStageData as any).tasks?.length || 0} ta interaktiv topshiriq tayyor:
                  </span>
                  <span className="text-xs text-blue-600 font-semibold">O‘quvchilar o‘z ekranlarida bajarmoqda</span>
                </div>

                <div className="space-y-2">
                  {(currentStageData as any).tasks?.map((t: any, i: number) => (
                    <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-800">{i + 1}. {t.title}</span>
                        <span className="ml-2 px-2 py-0.5 rounded-md bg-slate-200 text-slate-600 font-mono text-[10px]">
                          {t.type}
                        </span>
                      </div>
                      <span className="text-emerald-600 font-bold">Faol</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStageId === 'reinf' && (
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl space-y-2">
                  <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                    AI Xatolar tahlili va Mustahkamlash:
                  </span>
                  <p className="text-xs text-purple-950">
                    O‘quvchilar topshiriqlarda yo‘l qo‘ygan xatolar avtomatik ravishda tahlil qilinadi va individual yechim ko‘rsatiladi.
                  </p>
                </div>

                <div className="space-y-2">
                  {(currentStageData as any).questions?.map((q: any, i: number) => (
                    <div key={i} className="p-3.5 border border-slate-200 rounded-xl bg-white space-y-1 text-xs">
                      <p className="font-bold text-slate-900">{i + 1}. {q.question}</p>
                      <p className="text-amber-700 font-medium">⚠️ Ehtimoliy xato: {q.commonMisconception}</p>
                      <p className="text-blue-700">🤖 AI yordami: {q.aiExplanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStageId === 'eval' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl">
                  <span className="font-bold text-rose-900 uppercase tracking-wider block mb-1">
                    Yakuniy nazorat testi (4 ta savol, 100 ball)
                  </span>
                  <p className="text-rose-800">
                    Natijalar bir zumda foiz va baho ko‘rinishida o‘quvchiga hamda o‘qituvchi jurnaliga tushadi.
                  </p>
                </div>

                <div className="space-y-2">
                  {(currentStageData as any).quiz?.map((q: any, i: number) => (
                    <div key={i} className="p-3 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{i + 1}. {q.question}</span>
                      <span className="font-bold text-blue-600 bg-white px-2 py-1 rounded-md border border-slate-200">
                        {q.points} ball
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStageId === 'refl' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl space-y-2">
                  <span className="font-bold text-teal-900 uppercase tracking-wider block">
                    Dars xulosasi & Uy vazifasi:
                  </span>
                  <p className="text-teal-950 font-medium">{(currentStageData as any).lessonSummary}</p>
                  <div className="pt-2 border-t border-teal-200 space-y-1">
                    <p><strong>Majburiy:</strong> {(currentStageData as any).homework?.basic || (currentStageData as any).homework?.mandatory || 'Darslikdagi mashqlar'}</p>
                    <p><strong>Ijodiy:</strong> {(currentStageData as any).homework?.creative || 'Mavzu bo‘yicha qo‘shimcha izlanish'}</p>
                    <p><strong>Topshirish muddati:</strong> {(currentStageData as any).homework?.deadLine || 'Keyingi darsgacha'}</p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar: Stage Checklist & Live Status */}
          <div className="space-y-6">
            
            {/* Stage Quick Timer Widget */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center justify-between">
                <span>Bosqich Vaqti Nazorati</span>
                <span className="font-mono text-blue-600 font-bold">{currentStageData.timeRange}</span>
              </span>

              <div className="text-center py-2">
                <span className="font-mono font-extrabold text-4xl text-slate-900">
                  {Math.floor(timerSeconds / 60).toString().padStart(2, '0')}:{(timerSeconds % 60).toString().padStart(2, '0')}
                </span>
                <span className="text-xs text-slate-400 block mt-1">Umumiy 45 daqiqadan</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTimer}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    isTimerRunning
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-900'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isTimerRunning ? 'Pauza' : 'Boshlash'}</span>
                </button>
                <button
                  onClick={resetTimer}
                  className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition"
                >
                  Qaytarish
                </button>
              </div>
            </div>

            {/* Quick Davomat Summary */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Davomat Holati
                </span>
                <button
                  onClick={() => setActiveTab('attendance')}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  Barchasi
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-emerald-800 font-extrabold text-base block">{presentCount}</span>
                  <span className="text-[10px] text-emerald-700 font-medium">Darsda</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-amber-800 font-extrabold text-base block">{lateCount}</span>
                  <span className="text-[10px] text-amber-700 font-medium">Kechikdi</span>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                  <span className="text-rose-800 font-extrabold text-base block">{absentCount}</span>
                  <span className="text-[10px] text-rose-700 font-medium">Yo‘q</span>
                </div>
              </div>
            </div>

            {/* Teacher Tips for this exact stage */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200/80 rounded-3xl p-5 space-y-2 text-xs">
              <span className="font-bold text-indigo-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                O‘qituvchiga Pedagogik Maslahat
              </span>
              <p className="text-indigo-950 leading-relaxed">
                {currentStageId === 'org' && 'O‘quvchilar bilan iliq munosabat o‘rnating. Dars qoidalari qabul qilinganligiga ishonch hosil qiling.'}
                {currentStageId === 'mot' && 'O‘quvchilarni hayratga soling. Muammoni ularning shaxsiy tajribasi bilan bog‘lang.'}
                {currentStageId === 'exp' && 'Ko‘p gapirmasdan, asosiy 3 tushuncha va 2 misol bilan tushuntirishga 10 daqiqa yetarli bo‘ladi.'}
                {currentStageId === 'prac' && 'O‘quvchilar mustaqil yechsin. Qiyinchilik sezganlarga AI yoki o‘rtoqlari yordam berishini ta’minlang.'}
                {currentStageId === 'reinf' && 'Xatolardan qo‘rqmaslik muhitini yarating. Xatolar — eng yaxshi o‘rganish manbaidir.'}
                {currentStageId === 'eval' && 'Baholash adolatli va rag‘batlantiruvchi bo‘lishi lozim.'}
                {currentStageId === 'refl' && 'O‘quvchining o‘z bilishini baholashi (metakognitsiya) darsning mustahkam yakunidir.'}
              </p>
            </div>

          </div>

        </div>
      )}

      {/* TAB CONTENT 2: Attendance (Davomat) Sheet */}
      {activeTab === 'attendance' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                Elektron Davomat Jurnali ({lesson.grade})
              </h3>
              <p className="text-xs text-slate-500">
                Sinf o‘quvchilarining darsdagi ishtirokini bir marta bosish bilan belgilang
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={markAllPresent}
                className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Barchasi darsda</span>
              </button>
            </div>
          </div>

          {/* Add Student form */}
          <form onSubmit={addStudent} className="flex gap-2 max-w-md">
            <input
              type="text"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              placeholder="Yangi o‘quvchi ismi familiyasi..."
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
            <button
              type="submit"
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition"
            >
              <Plus className="w-4 h-4" />
              <span>Qo‘shish</span>
            </button>
          </form>

          {/* Student attendance list */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">№</th>
                  <th className="py-2.5 px-3">O‘quvchi F.I.Sh</th>
                  <th className="py-2.5 px-3">Holat</th>
                  <th className="py-2.5 px-3 text-right">O‘zgartirish</th>
                  <th className="py-2.5 px-3 text-right">O‘chirish</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attendance.map((std, idx) => (
                  <tr key={std.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-3 font-mono text-slate-400">{idx + 1}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">{std.studentName}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[11px] ${
                          std.status === 'present'
                            ? 'bg-emerald-100 text-emerald-800'
                            : std.status === 'late'
                            ? 'bg-amber-100 text-amber-800'
                            : std.status === 'excused'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {std.status === 'present' && '● Darsda'}
                        {std.status === 'late' && '⏰ Kechikdi'}
                        {std.status === 'excused' && '✉️ Sababli'}
                        {std.status === 'absent' && '❌ Darsda yo‘q'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => updateStudentStatus(std.id, 'present')}
                          className={`p-1.5 rounded-lg border transition ${
                            std.status === 'present' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                          title="Darsda"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => updateStudentStatus(std.id, 'late')}
                          className={`p-1.5 rounded-lg border transition ${
                            std.status === 'late' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                          title="Kechikdi"
                        >
                          <Clock className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => updateStudentStatus(std.id, 'absent')}
                          className={`p-1.5 rounded-lg border transition ${
                            std.status === 'absent' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                          title="Darsda yo‘q"
                        >
                          <UserX className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => removeStudent(std.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: Live Results & Gradebook */}
      {activeTab === 'results' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          
          {/* Header & Export Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold uppercase tracking-wider">
                  5-Sinf Elektron Jurnali
                </span>
                <span className="text-xs text-slate-400">45 daqiqalik dars natijalari</span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                O‘quvchilarning Barcha Qilgan Ishlari Asosida Yakuniy Baholash Jurnali
              </h3>
              <p className="text-xs text-slate-500">
                Davomat, miya hujumi, nazariya, 5 xil amaliyot, mustahkamlash, test va refleksiya integrallashgan bahosi
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleCopyEMaktabTable}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition shadow-2xs cursor-pointer"
                title="eMaktab formatida nusxalash"
              >
                {copiedEMaktab ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEMaktab ? 'Nusxalandi!' : 'eMaktab nusxasi'}</span>
              </button>

              <button
                onClick={handleDownloadCSV}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV / Excel yuklab olish</span>
              </button>
            </div>
          </div>

          {/* Class Analytics & Quality Metrics Panel */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-[11px] font-bold text-emerald-700 block uppercase">5 (A’lo) baho</span>
              <span className="text-2xl font-black text-emerald-900">{grade5Count} nafar</span>
              <span className="text-[10px] text-emerald-600 font-semibold block">{submissions.length > 0 ? Math.round((grade5Count / submissions.length) * 100) : 0}% ulush</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-center">
              <span className="text-[11px] font-bold text-blue-700 block uppercase">4 (Yaxshi) baho</span>
              <span className="text-2xl font-black text-blue-900">{grade4Count} nafar</span>
              <span className="text-[10px] text-blue-600 font-semibold block">{submissions.length > 0 ? Math.round((grade4Count / submissions.length) * 100) : 0}% ulush</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-[11px] font-bold text-amber-700 block uppercase">3 (Qoniqarli)</span>
              <span className="text-2xl font-black text-amber-900">{grade3Count} nafar</span>
              <span className="text-[10px] text-amber-600 font-semibold block">{submissions.length > 0 ? Math.round((grade3Count / submissions.length) * 100) : 0}% ulush</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-center">
              <span className="text-[11px] font-bold text-indigo-700 block uppercase">Sifat ko‘rsatkichi</span>
              <span className="text-2xl font-black text-indigo-900">{qualityRate}%</span>
              <span className="text-[10px] text-indigo-600 font-semibold block">A’lo & Yaxshilar</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-center">
              <span className="text-[11px] font-bold text-teal-700 block uppercase">O‘zlashtirish</span>
              <span className="text-2xl font-black text-teal-900">{masteryRate}%</span>
              <span className="text-[10px] text-teal-600 font-semibold block">Barcha qatnashuvchilar</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-center">
              <span className="text-[11px] font-bold text-purple-700 block uppercase">O‘rtacha Ball</span>
              <span className="text-2xl font-black text-purple-900">{averageScore} / 100</span>
              <span className="text-[10px] text-purple-600 font-semibold block">Baho: {averageGradeNum}</span>
            </div>
          </div>

          {/* Full Integrated Gradebook Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-3">№</th>
                  <th className="py-3 px-3">O‘quvchi F.I.Sh.</th>
                  <th className="py-3 px-2 text-center" title="Tashkiliy qism va Davomat (max 10)">Davomat<br/><span className="text-slate-400 font-normal">10 ball</span></th>
                  <th className="py-3 px-2 text-center" title="Motivatsiya & Miya hujumi (max 10)">Motivatsiya<br/><span className="text-slate-400 font-normal">10 ball</span></th>
                  <th className="py-3 px-2 text-center" title="Yangi mavzu o‘rganilishi (max 10)">Nazariya<br/><span className="text-slate-400 font-normal">10 ball</span></th>
                  <th className="py-3 px-2 text-center" title="5 xil interaktiv amaliy vazifalar (max 30)">Amaliyot<br/><span className="text-slate-400 font-normal">30 ball</span></th>
                  <th className="py-3 px-2 text-center" title="Mustahkamlash savollari va AI tahlili (max 20)">Mustahkam.<br/><span className="text-slate-400 font-normal">20 ball</span></th>
                  <th className="py-3 px-2 text-center" title="Mustaqil yakuniy test (max 20)">Test<br/><span className="text-slate-400 font-normal">20 ball</span></th>
                  <th className="py-3 px-2 text-center" title="O‘quvchi refleksiyasi (max 10)">Refleksiya<br/><span className="text-slate-400 font-normal">10 ball</span></th>
                  <th className="py-3 px-3 text-center font-black text-slate-900">JAMI BALL<br/><span className="text-blue-600 font-bold">100 ball</span></th>
                  <th className="py-3 px-3 text-center font-black">YAKUNIY BAHO</th>
                  <th className="py-3 px-3 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {submissions.map((sub, idx) => {
                  const g = getEffectiveGrade(sub);
                  const b = sub.breakdown;
                  const isEditing = editingStudentName === sub.studentName;

                  return (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-3 font-mono text-slate-400">{idx + 1}</td>
                      <td className="py-3.5 px-3">
                        <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                            {sub.studentName.charAt(0)}
                          </span>
                          <span>{sub.studentName}</span>
                        </div>
                        {sub.reflectionAnswers?.learned && (
                          <span className="text-[10px] text-slate-400 truncate max-w-xs block mt-0.5">
                            "{sub.reflectionAnswers.learned}"
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono font-bold text-slate-700">
                        {b?.attendance?.score ?? 10}/10
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono font-bold text-slate-700">
                        {b?.motivation?.score ?? 10}/10
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono font-bold text-slate-700">
                        {b?.theory?.score ?? 10}/10
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono font-bold text-blue-700">
                        {b?.practice?.score ?? Math.round((sub.practiceScore / 100) * 30)}/30
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono font-bold text-purple-700">
                        {b?.reinforcement?.score ?? 18}/20
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono font-bold text-rose-700">
                        {b?.assessment?.score ?? Math.round((sub.assessmentScore / 100) * 20)}/20
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono font-bold text-emerald-700">
                        {b?.reflection?.score ?? 10}/10
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className="font-mono font-black text-sm text-slate-900 bg-slate-100 px-2.5 py-1 rounded-xl">
                          {sub.totalScore} / 100
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        {isEditing ? (
                          <div className="flex items-center justify-center gap-1">
                            {[5, 4, 3].map((val) => (
                              <button
                                key={val}
                                onClick={() => handleOverrideGrade(sub.studentName, val as any)}
                                className={`px-2 py-1 rounded-lg text-xs font-black transition cursor-pointer ${
                                  val === 5
                                    ? 'bg-emerald-600 text-white'
                                    : val === 4
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-amber-600 text-white'
                                }`}
                              >
                                {val}
                              </button>
                            ))}
                            <button
                              onClick={() => setEditingStudentName(null)}
                              className="text-[10px] text-slate-400 hover:text-slate-600 px-1"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl font-black text-xs shadow-2xs ${
                              g === 5
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : g === 4
                                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                : 'bg-amber-100 text-amber-800 border border-amber-300'
                            }`}
                          >
                            <span>{g === 5 ? '🏆' : g === 4 ? '⭐' : '📘'}</span>
                            <span>{g} ({g === 5 ? 'A’lo' : g === 4 ? 'Yaxshi' : 'Qoniqarli'})</span>
                            {sub.teacherOverrideGrade && (
                              <span className="text-[9px] opacity-75 font-normal ml-0.5">(o‘qituvchi)</span>
                            )}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedStudentForCert(sub);
                              sounds.playClick();
                            }}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-[11px] font-bold transition cursor-pointer"
                            title="Baholash Shahodatnomasi"
                          >
                            <Award className="w-3.5 h-3.5 text-amber-600" />
                            <span>Shahodatnoma</span>
                          </button>

                          <button
                            onClick={() => {
                              setEditingStudentName(isEditing ? null : sub.studentName);
                              sounds.playClick();
                            }}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
                            title="Bahoni tahrirlash"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Teacher Grading Standards & Scale Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-600">
            <div className="space-y-0.5">
              <span className="font-extrabold text-slate-900 block">
                O‘zbekiston Xalq Ta’limi Standarti Baholash Mezonlari:
              </span>
              <p className="text-[11px] text-slate-500">
                85–100 ball: <strong>5 (A’lo)</strong> • 70–84 ball: <strong>4 (Yaxshi)</strong> • 50–69 ball: <strong>3 (Qoniqarli)</strong> • 0–49 ball: <strong>2 (Qoniqarsiz)</strong>
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Barcha baholar avtomatik va adolatli shakllantiriladi</span>
            </div>
          </div>

        </div>
      )}

      {/* TAB CONTENT 4: Methodology */}
      {activeTab === 'methodology' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-lg">
              Metodik Tavsiyalar va Ta’lim Texnologiyalari
            </h3>
            <p className="text-xs text-slate-500">
              O‘zbekiston xalq ta’limi standartlari bo‘yicha differensial va interaktiv yondashuv
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="font-bold text-slate-900 block mb-1">
                Pedagogik tavsiya:
              </span>
              <p>{lesson.teacherNotes?.pedagogicalAdvice || lesson.overview.methodologyAdvice}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl">
                <span className="font-bold text-emerald-900 block mb-1">
                  Iqtidorli o‘quvchilar uchun (Advanced):
                </span>
                <p className="text-emerald-950">
                  {lesson.teacherNotes?.differentiation?.forAdvanced || 'Mustaqil murakkabroq topshiriqlar va loyihalar'}
                </p>
              </div>

              <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl">
                <span className="font-bold text-amber-900 block mb-1">
                  Qo‘shimcha ko‘makka muhtoj o‘quvchilar uchun:
                </span>
                <p className="text-amber-950">
                  {lesson.teacherNotes?.differentiation?.forStruggling || 'Ko‘rgazmali vositalar, soddalashtirilgan misollar va individual yordam'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Official Certificate Modal for Teacher */}
      {selectedStudentForCert && (
        <StudentCertificateModal
          isOpen={!!selectedStudentForCert}
          onClose={() => setSelectedStudentForCert(null)}
          lesson={lesson}
          submission={selectedStudentForCert}
        />
      )}

    </div>
  );
};
