import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  ArrowUp, 
  ArrowDown, 
  RotateCcw,
  Check,
  Award,
  Layers
} from 'lucide-react';
import { 
  StagePracticeData, 
  InteractiveTask, 
  MultipleChoiceTask, 
  TrueFalseTask, 
  MatchingTask, 
  DragOrderTask, 
  FillBlanksTask, 
  ShortAnswerTask 
} from '../../types/lesson';
import { sounds } from '../../utils/audio';

interface StagePracticeProps {
  stageData: StagePracticeData;
  onNext: () => void;
  onUpdateScore: (points: number) => void;
  onOpenAiTutor: () => void;
}

export const StagePractice: React.FC<StagePracticeProps> = ({
  stageData,
  onNext,
  onUpdateScore,
  onOpenAiTutor,
}) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0);
  const [taskAnswers, setTaskAnswers] = useState<Record<string, any>>({});
  const [taskCompleted, setTaskCompleted] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState<number>(0);

  const currentTask: InteractiveTask = stageData.tasks[currentTaskIndex] || stageData.tasks[0];
  const isFinished = Object.keys(taskCompleted).length === stageData.tasks.length;

  // Handlers for Multiple Choice
  const handleMultipleChoice = (task: MultipleChoiceTask, optionIndex: number) => {
    if (taskCompleted[task.id]) return;
    const isCorrect = optionIndex === task.correctAnswerIndex;
    setTaskAnswers((prev) => ({ ...prev, [task.id]: optionIndex }));
    setTaskCompleted((prev) => ({ ...prev, [task.id]: true }));

    if (isCorrect) {
      sounds.playSuccess();
      const points = 20;
      setScore((s) => s + points);
      onUpdateScore(points);
    } else {
      sounds.playWrong();
    }
  };

  // Handlers for True / False
  const handleTrueFalse = (task: TrueFalseTask, chosenBool: boolean) => {
    if (taskCompleted[task.id]) return;
    const isCorrect = chosenBool === task.isTrue;
    setTaskAnswers((prev) => ({ ...prev, [task.id]: chosenBool }));
    setTaskCompleted((prev) => ({ ...prev, [task.id]: true }));

    if (isCorrect) {
      sounds.playSuccess();
      const points = 20;
      setScore((s) => s + points);
      onUpdateScore(points);
    } else {
      sounds.playWrong();
    }
  };

  // Handlers for Matching
  const [matchingSelectedLeft, setMatchingSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});

  const handleMatchingLeft = (leftItem: string) => {
    if (matchedPairs[leftItem]) return;
    setMatchingSelectedLeft(leftItem);
    sounds.playClick();
  };

  const handleMatchingRight = (task: MatchingTask, rightItem: string) => {
    if (!matchingSelectedLeft) return;

    // Check if this rightItem matches the selected leftItem
    const correctPair = task.pairs.find((p) => p.left === matchingSelectedLeft);
    if (correctPair && correctPair.right === rightItem) {
      // Correct match!
      sounds.playSuccess();
      const newMatches = { ...matchedPairs, [matchingSelectedLeft]: rightItem };
      setMatchedPairs(newMatches);
      setMatchingSelectedLeft(null);

      // Check if all pairs matched
      if (Object.keys(newMatches).length === task.pairs.length) {
        setTaskCompleted((prev) => ({ ...prev, [task.id]: true }));
        const points = 20;
        setScore((s) => s + points);
        onUpdateScore(points);
      }
    } else {
      sounds.playWrong();
      setMatchingSelectedLeft(null);
    }
  };

  // Handlers for Drag Order (Up/Down sorting)
  const [orderItems, setOrderItems] = useState<string[]>(() => {
    const orderTask = stageData.tasks.find((t) => t.type === 'drag_order') as DragOrderTask;
    if (orderTask) {
      if (orderTask.scrambledItems && orderTask.scrambledItems.length > 0) {
        return [...orderTask.scrambledItems];
      }
      if (orderTask.items && orderTask.items.length > 0) {
        return [...orderTask.items].reverse();
      }
      return [...orderTask.correctOrder].reverse();
    }
    return [];
  });

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...orderItems];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;
    setOrderItems(newItems);
    sounds.playClick();
  };

  const verifyOrder = (task: DragOrderTask) => {
    const isCorrect = orderItems.every((item, idx) => item === task.correctOrder[idx]);
    setTaskCompleted((prev) => ({ ...prev, [task.id]: true }));
    setTaskAnswers((prev) => ({ ...prev, [task.id]: isCorrect }));

    if (isCorrect) {
      sounds.playSuccess();
      const points = 20;
      setScore((s) => s + points);
      onUpdateScore(points);
    } else {
      sounds.playWrong();
    }
  };

  // Handlers for Fill Blanks
  const [blankInput, setBlankInput] = useState('');
  const handleVerifyBlank = (task: FillBlanksTask) => {
    const cleaned = blankInput.trim().toLowerCase();
    const acceptable = [
      ...(task.acceptableAnswers || []),
      ...(task.blankAnswers || []),
      ...(task.acceptableAlternatives ? Object.values(task.acceptableAlternatives).flat() : [])
    ];

    const isCorrect = acceptable.some((ans) => ans.trim().toLowerCase() === cleaned);
    setTaskCompleted((prev) => ({ ...prev, [task.id]: true }));
    setTaskAnswers((prev) => ({ ...prev, [task.id]: isCorrect }));

    if (isCorrect) {
      sounds.playSuccess();
      const points = 20;
      setScore((s) => s + points);
      onUpdateScore(points);
    } else {
      sounds.playWrong();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 sm:p-7 text-white shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-wider">
              4-bosqich: 20–30 daqiqa
            </span>
            <span className="text-purple-200 text-xs font-semibold">Interaktiv amaliy mashg‘ulot</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Amaliy Mashqlar & Masalalar
          </h2>
          <p className="text-purple-100 text-xs sm:text-sm">
            Topshiriqlarni ketma-ket bajaring va ball to‘plang
          </p>
        </div>

        {/* Score Badge */}
        <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-4 text-center shrink-0">
          <span className="text-[11px] uppercase font-bold text-purple-200 block">Amaliyot Balli</span>
          <span className="font-mono text-3xl font-extrabold text-white">{score}</span>
          <span className="text-[10px] text-purple-200 block">/ 100 ball</span>
        </div>
      </div>

      {/* Task Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto p-1 bg-white rounded-2xl border border-slate-200 shadow-2xs">
        {stageData.tasks.map((task, idx) => {
          const isDone = taskCompleted[task.id];
          const isCurrent = currentTaskIndex === idx;

          return (
            <button
              key={task.id}
              onClick={() => {
                setCurrentTaskIndex(idx);
                sounds.playClick();
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                isCurrent
                  ? 'bg-blue-600 text-white shadow-xs'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{idx + 1}-topshiriq</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
            </button>
          );
        })}
      </div>

      {/* ACTIVE TASK CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        
        {/* Task Title & Type */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block mb-0.5">
              {currentTask.type.replace('_', ' ')} topshirig‘i
            </span>
            <h3 className="font-extrabold text-slate-900 text-lg">
              {currentTask.title}
            </h3>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-mono text-xs font-bold">
            +{20} ball
          </span>
        </div>

        {/* 1. Multiple Choice */}
        {currentTask.type === 'multiple_choice' && (
          <div className="space-y-4">
            <p className="text-sm sm:text-base font-bold text-slate-900 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              {currentTask.question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentTask.options.map((option, optIdx) => {
                const isSelected = taskAnswers[currentTask.id] === optIdx;
                const isCompleted = taskCompleted[currentTask.id];
                const isCorrect = optIdx === currentTask.correctAnswerIndex;

                let style = 'bg-slate-50 hover:bg-blue-50 border-slate-200 text-slate-800';
                if (isCompleted) {
                  if (isCorrect) {
                    style = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                  } else if (isSelected && !isCorrect) {
                    style = 'bg-rose-100 border-rose-300 text-rose-800 line-through';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={isCompleted}
                    onClick={() => handleMultipleChoice(currentTask, optIdx)}
                    className={`p-4 rounded-2xl border text-sm font-semibold text-left transition cursor-pointer flex items-center justify-between ${style}`}
                  >
                    <span>{option}</span>
                    {isCompleted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {isCompleted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600" />}
                  </button>
                );
              })}
            </div>

            {taskCompleted[currentTask.id] && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-emerald-900 animate-in fade-in">
                <strong>Izoh:</strong> {currentTask.explanation}
              </div>
            )}
          </div>
        )}

        {/* 2. True / False */}
        {currentTask.type === 'true_false' && (
          <div className="space-y-5">
            <p className="text-sm sm:text-base font-bold text-slate-900 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              "{currentTask.statement}"
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[true, false].map((val) => {
                const isSelected = taskAnswers[currentTask.id] === val;
                const isCompleted = taskCompleted[currentTask.id];
                const isCorrect = val === currentTask.isTrue;

                let style = val
                  ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800'
                  : 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-800';

                if (isCompleted) {
                  if (isCorrect) {
                    style = 'bg-emerald-500 text-white font-bold border-emerald-600';
                  } else if (isSelected && !isCorrect) {
                    style = 'bg-rose-500 text-white font-bold border-rose-600';
                  }
                }

                return (
                  <button
                    key={String(val)}
                    disabled={isCompleted}
                    onClick={() => handleTrueFalse(currentTask, val)}
                    className={`p-5 rounded-2xl border text-center font-extrabold text-base transition cursor-pointer ${style}`}
                  >
                    {val ? 'ROST (To‘g‘ri)' : 'YOLG‘ON (Noto‘g‘ri)'}
                  </button>
                );
              })}
            </div>

            {taskCompleted[currentTask.id] && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs sm:text-sm text-blue-900 animate-in fade-in">
                <strong>Izoh:</strong> {currentTask.explanation}
              </div>
            )}
          </div>
        )}

        {/* 3. Matching (Moslashtirish) */}
        {currentTask.type === 'matching' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              Chap tomondan birini tanlang, so‘ng unga mos keluvchi o‘ng tomondagi juftlikni bosing:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Savol / Ifoda:
                </span>
                {currentTask.pairs.map((pair, pIdx) => {
                  const isMatched = !!matchedPairs[pair.left];
                  const isSelected = matchingSelectedLeft === pair.left;

                  return (
                    <button
                      key={pIdx}
                      disabled={isMatched}
                      onClick={() => handleMatchingLeft(pair.left)}
                      className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm font-mono font-bold text-left transition ${
                        isMatched
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-900 cursor-default'
                          : isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-300'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      {pair.left} {isMatched && '✓'}
                    </button>
                  );
                })}
              </div>

              {/* Right Column */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Javob / Ildiz:
                </span>
                {currentTask.pairs.map((pair, pIdx) => {
                  const isMatched = Object.values(matchedPairs).includes(pair.right);

                  return (
                    <button
                      key={pIdx}
                      disabled={isMatched || !matchingSelectedLeft}
                      onClick={() => handleMatchingRight(currentTask, pair.right)}
                      className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm font-mono font-bold text-left transition ${
                        isMatched
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-900 cursor-default'
                          : matchingSelectedLeft
                          ? 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-900 cursor-pointer animate-pulse'
                          : 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {pair.right} {isMatched && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>

            {taskCompleted[currentTask.id] && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Barcha juftliklar to‘g‘ri moslashtirildi! Barakalla!</span>
              </div>
            )}
          </div>
        )}

        {/* 4. Drag Order (Tartiblash) */}
        {currentTask.type === 'drag_order' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              {currentTask.instructions || 'Qadamlarni to‘g‘ri mantiqiy ketma-ketlikda joylashtiring (Yuqoriga/Pastga surish orqali):'}
            </p>

            <div className="space-y-2">
              {orderItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-slate-800">{item}</span>
                  </div>

                  {!taskCompleted[currentTask.id] && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => moveItem(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-600 disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveItem(idx, 'down')}
                        disabled={idx === orderItems.length - 1}
                        className="p-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-600 disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!taskCompleted[currentTask.id] ? (
              <button
                onClick={() => verifyOrder(currentTask)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
              >
                Ketma-ketlikni tekshirish
              </button>
            ) : (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-bold">
                ✓ Algoritm tartibi tasdiqlandi!
              </div>
            )}
          </div>
        )}

        {/* 5. Fill Blanks (Bo'sh joyni to'ldirish) */}
        {currentTask.type === 'fill_blanks' && (
          <div className="space-y-4">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
              {(currentTask.textWithBlanks || (currentTask.templateText ? currentTask.templateText.replace('{blank}', '[javob]') : '...'))
                .split('[javob]')
                .map((part, pIdx, arr) => (
                  <React.Fragment key={pIdx}>
                    <span>{part}</span>
                    {pIdx < arr.length - 1 && (
                      <span className="inline-block mx-1.5 px-3 py-1 bg-white border-2 border-dashed border-blue-500 rounded-lg font-mono font-bold text-blue-700">
                        {taskCompleted[currentTask.id]
                          ? (currentTask.blankPlaceholder || currentTask.blankAnswers?.[0] || '...')
                          : (blankInput || '...')}
                      </span>
                    )}
                  </React.Fragment>
                ))}
            </div>

            <p className="text-xs text-slate-500">
              💡 Maslahat: {currentTask.hint || currentTask.explanation || 'Javobingizni quyidagi maydonga yozing'}
            </p>

            {!taskCompleted[currentTask.id] ? (
              <div className="flex gap-2 max-w-sm">
                <input
                  type="text"
                  value={blankInput}
                  onChange={(e) => setBlankInput(e.target.value)}
                  placeholder="Javobingizni yozing..."
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 font-mono focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
                <button
                  onClick={() => handleVerifyBlank(currentTask)}
                  disabled={!blankInput.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  Tekshirish
                </button>
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-bold">
                ✓ To‘g‘ri javob qabul qilindi!
              </div>
            )}
          </div>
        )}

        {/* Task navigation buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              if (currentTaskIndex > 0) setCurrentTaskIndex(currentTaskIndex - 1);
            }}
            disabled={currentTaskIndex === 0}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 text-xs font-bold rounded-xl transition"
          >
            Oldingi topshiriq
          </button>

          {currentTaskIndex < stageData.tasks.length - 1 ? (
            <button
              onClick={() => setCurrentTaskIndex(currentTaskIndex + 1)}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
            >
              Keyingi topshiriq ({currentTaskIndex + 2}/{stageData.tasks.length})
            </button>
          ) : (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition active:scale-95"
            >
              <span>Mustahkamlash bosqichiga o‘tish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
