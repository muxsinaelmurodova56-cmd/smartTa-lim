import React, { useRef } from 'react';
import { 
  Award, 
  X, 
  Printer, 
  Share2, 
  CheckCircle2, 
  Star, 
  Sparkles, 
  Download, 
  Copy, 
  Calendar, 
  BookOpen, 
  GraduationCap 
} from 'lucide-react';
import { Lesson, StudentSubmission } from '../../types/lesson';
import { sounds } from '../../utils/audio';

interface StudentCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson;
  submission: StudentSubmission;
}

export const StudentCertificateModal: React.FC<StudentCertificateModalProps> = ({
  isOpen,
  onClose,
  lesson,
  submission,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const finalGrade = submission.teacherOverrideGrade || submission.finalGrade || 5;
  const gradeText =
    finalGrade === 5
      ? '5 (A’LO)'
      : finalGrade === 4
      ? '4 (YAXSHI)'
      : finalGrade === 3
      ? '3 (QONIQARLI)'
      : '2 (QAYTA ISHLASH)';

  const gradeBadgeBg =
    finalGrade === 5
      ? 'from-emerald-500 to-teal-600 text-white shadow-emerald-500/30'
      : finalGrade === 4
      ? 'from-blue-600 to-indigo-600 text-white shadow-blue-500/30'
      : finalGrade === 3
      ? 'from-amber-500 to-orange-600 text-white shadow-amber-500/30'
      : 'from-rose-500 to-red-600 text-white shadow-rose-500/30';

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  const handleCopyRecord = () => {
    sounds.playClick();
    const textToCopy = `[eMaktab / Kundalik.com]\nO‘quvchi: ${submission.studentName}\nSinf: 5-sinf\nFan: ${lesson.subject}\nMavzu: ${lesson.topic}\nJami ball: ${submission.totalScore}/100\nYakuniy Baho: ${gradeText}\nSana: ${new Date().toLocaleDateString('uz-UZ')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    sounds.playSuccess();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Modal Top Actions */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base">
                Raqamli Baholash Shahodatnomasi
              </h3>
              <p className="text-[11px] text-slate-400">
                O‘quvchining 45 daqiqalik darsdagi ishlari tahlili asosida
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyRecord}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition text-slate-200 cursor-pointer"
              title="eMaktab formatida nusxalash"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Nusxalandi!' : 'eMaktab nusxasi'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold transition text-white shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Chop etish</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Body (Styled for high aesthetic & printability) */}
        <div ref={certificateRef} className="p-6 sm:p-10 bg-gradient-to-b from-amber-50/40 via-white to-sky-50/40 space-y-6">
          
          {/* Certificate Border Frame */}
          <div className="border-4 border-double border-amber-600/40 rounded-3xl p-6 sm:p-8 bg-white/95 relative shadow-inner space-y-6">
            
            {/* Header Emblems & Seal */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center gap-3">
                <span className="text-3xl">🇺🇿</span>
                <span className="text-2xl">🏛️</span>
                <span className="text-3xl">⭐</span>
              </div>
              <p className="text-[11px] uppercase tracking-widest font-extrabold text-slate-600">
                O‘zbekiston Respublikasi Maktabgacha va Maktab Ta’limi Tizimi
              </p>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 uppercase">
                Dars Yakuni Baholash Shahodatnomasi
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-500 mx-auto rounded-full" />
            </div>

            {/* Recipient Details */}
            <div className="text-center space-y-2 py-2">
              <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
                Mazkur shahodatnoma 5-sinf o‘quvchisi
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 tracking-tight underline decoration-amber-400 decoration-wavy underline-offset-8">
                {submission.studentName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto pt-2">
                ga 45 daqiqalik raqamlashtirilgan ochiq darsda faol ishtirok etib, barcha interaktiv amaliyot, mustahkamlash va test sinovlarini muvaffaqiyatli topshirgani uchun berildi.
              </p>
            </div>

            {/* Lesson Info Pill */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Fan:</span>
                <span className="font-extrabold text-slate-800 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  {lesson.subject} (5-sinf)
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Mavzu:</span>
                <span className="font-bold text-slate-800 truncate block">
                  {lesson.topic}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">Sana va Davomiylik:</span>
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  {new Date().toLocaleDateString('uz-UZ')} (45 daqiqa)
                </span>
              </div>
            </div>

            {/* Big Awarded Grade Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-amber-300 font-extrabold text-xs uppercase tracking-wider block flex items-center justify-center sm:justify-start gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> O‘quvchining Barcha Ishlari Asosida:
                </span>
                <h3 className="text-xl sm:text-2xl font-black">
                  RASMIY YAKUNIY BAHO
                </h3>
                <p className="text-xs text-slate-300">
                  Umumiy to‘plangan reyting balli: <strong className="text-amber-400 font-mono text-base">{submission.totalScore} / 100 ball</strong>
                </p>
              </div>

              <div className={`px-6 py-3.5 rounded-2xl bg-gradient-to-r ${gradeBadgeBg} text-center shadow-xl shrink-0 border border-white/20`}>
                <div className="flex items-center justify-center gap-1 text-amber-300 mb-0.5">
                  {Array.from({ length: finalGrade }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-2xl sm:text-3xl font-black block tracking-tight">
                  {gradeText}
                </span>
              </div>
            </div>

            {/* Work Breakdown Table */}
            {submission.breakdown && (
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
                  7 Bosqich Bo‘yicha Qilingan Ishlar Hisoboti:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 text-[10px] block font-semibold">1. Tashkiliy qism</span>
                    <span className="font-extrabold text-slate-800">{submission.breakdown.attendance.score}/10 ball</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 text-[10px] block font-semibold">2. Motivatsiya</span>
                    <span className="font-extrabold text-slate-800">{submission.breakdown.motivation.score}/10 ball</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 text-[10px] block font-semibold">3. Nazariya</span>
                    <span className="font-extrabold text-slate-800">{submission.breakdown.theory.score}/10 ball</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 text-[10px] block font-semibold">4. Interaktiv amaliyot</span>
                    <span className="font-extrabold text-blue-700">{submission.breakdown.practice.score}/30 ball</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 text-[10px] block font-semibold">5. Mustahkamlash</span>
                    <span className="font-extrabold text-purple-700">{submission.breakdown.reinforcement.score}/20 ball</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 text-[10px] block font-semibold">6. Yakuniy test</span>
                    <span className="font-extrabold text-rose-700">{submission.breakdown.assessment.score}/20 ball</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 text-[10px] block font-semibold">7. Refleksiya</span>
                    <span className="font-extrabold text-emerald-700">{submission.breakdown.reflection.score}/10 ball</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                    <span className="text-amber-700 text-[10px] block font-bold">JAMI REYTINQ</span>
                    <span className="font-black text-amber-900 text-sm">{submission.totalScore}/100 ball</span>
                  </div>
                </div>
              </div>
            )}

            {/* AI Pedagogical Feedback Note */}
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs space-y-1">
              <span className="font-bold text-blue-900 uppercase text-[10px] tracking-wider block">
                O‘qituvchi va AI Repetitor Xulosasi:
              </span>
              <p className="text-blue-950 font-medium leading-relaxed italic">
                "{submission.aiFeedback || 'Darsdagi barcha talablarni to‘liq bajardingiz. Barakalla!'}"
              </p>
            </div>

            {/* Footer Signatures and Stamp */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="text-center sm:text-left space-y-0.5">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Fan O‘qituvchisi:</span>
                <span className="font-extrabold text-slate-900">5-Sinf Fani O‘qituvchisi (Tasdiqlangan)</span>
                <span className="font-mono text-[10px] text-slate-400 block">Elektron imzo: #ED-5A-2026-{submission.totalScore}</span>
              </div>

              {/* Virtual School Seal Stamp */}
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-blue-700 text-blue-800 flex flex-col items-center justify-center text-center p-1 font-bold rotate-[-12deg] bg-blue-50/50">
                <span className="text-[8px] uppercase tracking-tighter block">O‘ZBEKISTON</span>
                <span className="text-xs">★ MAKTAB ★</span>
                <span className="text-[8px] uppercase tracking-tighter block">TASDIQLANDI</span>
              </div>
            </div>

          </div>
        </div>

        {/* Footer info bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Ushbu shahodatnoma eMaktab va elektron jurnal tizimiga avtomatik integratsiya qilinadi.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition cursor-pointer"
          >
            Yopish
          </button>
        </div>

      </div>
    </div>
  );
};
