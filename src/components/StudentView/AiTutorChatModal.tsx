import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, Loader2, MessageCircle } from 'lucide-react';
import { Lesson } from '../../types/lesson';
import { sounds } from '../../utils/audio';

interface AiTutorChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson;
  studentName: string;
}

interface ChatMessage {
  id: string;
  sender: 'tutor' | 'student';
  text: string;
  timestamp: string;
}

export const AiTutorChatModal: React.FC<AiTutorChatModalProps> = ({
  isOpen,
  onClose,
  lesson,
  studentName,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'tutor',
      text: `Salom, ${studentName || 'aziz o‘quvchi'}! Men sizning AI dars repetitoringizman. Bugungi "${lesson.topic}" mavzusi bo‘yicha tushunmagan har qanday savolingizni so‘rashingiz mumkin. Sizga sodda va tushunarli qilib yordam beraman! 🌟`,
      timestamp: 'Hozir',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    sounds.playClick();

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'student',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await fetch('/api/ask-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userText,
          lessonContext: {
            subject: lesson.subject,
            topic: lesson.topic,
          },
          studentGrade: lesson.grade,
        }),
      });

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'tutor',
        text: data.answer || 'Kechirasiz, javob olishda muammo yuz berdi. Darsdagi qoidalarni yana bir bor ko‘rib chiqaylik!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      sounds.playSuccess();
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'tutor',
          text: 'Savolingiz juda ajoyib! Asosiy formulani daftarga yozib, hadlarni ishorasini almashtirib ko‘chiring.',
          timestamp: 'Hozir',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    'Buni soddaroq hayotiy misol bilan tushuntirib bering',
    'Hadlarni ko‘chirganda ishora nega o‘zgaradi?',
    'Menga yana 1 ta oson mashq bering',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-1.5">
                <span>AI Repetitor</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h3>
              <p className="text-[11px] text-blue-100 truncate max-w-xs">
                {lesson.subject}: {lesson.topic}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message history */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 max-w-[85%] ${
                m.sender === 'student' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  m.sender === 'student'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-indigo-100 text-indigo-700'
                }`}
              >
                {m.sender === 'student' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>
              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                  m.sender === 'student'
                    ? 'bg-blue-600 text-white rounded-tr-xs'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>
                <span
                  className={`text-[9px] block mt-1 ${
                    m.sender === 'student' ? 'text-blue-200 text-right' : 'text-slate-400'
                  }`}
                >
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200 max-w-xs">
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              <span>AI repetitor o‘ylab javob yozmoqda...</span>
            </div>
          )}
        </div>

        {/* Quick prompt suggestions */}
        <div className="p-2 bg-slate-100/90 border-t border-slate-200 overflow-x-auto flex gap-1.5">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setInput(q)}
              className="text-[11px] whitespace-nowrap bg-white hover:bg-blue-50 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full transition"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input box */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mavzu bo‘yicha savolingizni yozing..."
            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl transition shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
