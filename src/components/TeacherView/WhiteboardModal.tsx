import React, { useRef, useState, useEffect } from 'react';
import { X, Eraser, Pen, Trash2, Undo2, Download, Plus } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface WhiteboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTopic: string;
}

const COLORS = ['#0f172a', '#2563eb', '#dc2626', '#16a34a', '#d97706', '#9333ea'];
const MATH_SYMBOLS = ['x', 'y', '=', '+', '-', '×', '÷', '√', '²', '≠', '≤', '≥', 'π', 'Δ', 'ax+b=0', 'F=ma'];

export const WhiteboardModal: React.FC<WhiteboardModalProps> = ({
  isOpen,
  onClose,
  lessonTopic,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#0f172a');
  const [lineWidth, setLineWidth] = useState(3);
  const [isEraser, setIsEraser] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to display size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Draw graph paper grid or clean white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Save initial state
    setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  }, [isOpen]);

  if (!isOpen) return null;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.strokeStyle = isEraser ? '#ffffff' : color;
    ctx.lineWidth = isEraser ? lineWidth * 3 : lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save to history
    setHistory((prev) => [...prev.slice(-15), ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  };

  const undo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop(); // Remove current
    const previousState = newHistory[newHistory.length - 1];
    ctx.putImageData(previousState, 0, 0);
    setHistory(newHistory);
    sounds.playClick();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-15), ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    sounds.playClick();
  };

  const addMathSymbol = (sym: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = isEraser ? '#0f172a' : color;
    // Draw symbol in center
    ctx.fillText(sym, canvas.width / 2 - 20, canvas.height / 2);
    setHistory((prev) => [...prev.slice(-15), ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    sounds.playSuccess();
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = image;
    a.download = `dars-doskasi-${Date.now()}.png`;
    a.click();
    sounds.playSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Toolbar Header */}
        <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📋</span>
            <div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                Interaktiv Sinf Doskasi (Whiteboard)
              </h3>
              <p className="text-xs text-slate-500 truncate max-w-xs sm:max-w-md">
                {lessonTopic}
              </p>
            </div>
          </div>

          {/* Tools */}
          <div className="flex items-center flex-wrap gap-2">
            
            {/* Color Pickers */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setColor(c);
                    setIsEraser(false);
                    sounds.playClick();
                  }}
                  style={{ backgroundColor: c }}
                  className={`w-6 h-6 rounded-lg transition-transform ${
                    color === c && !isEraser ? 'scale-110 ring-2 ring-blue-500 ring-offset-1' : 'hover:scale-105'
                  }`}
                />
              ))}
            </div>

            {/* Pen & Eraser */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
              <button
                onClick={() => {
                  setIsEraser(false);
                  sounds.playClick();
                }}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                  !isEraser ? 'bg-blue-100 text-blue-800' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Pen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Qalam</span>
              </button>
              <button
                onClick={() => {
                  setIsEraser(true);
                  sounds.playClick();
                }}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                  isEraser ? 'bg-amber-100 text-amber-800' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Eraser className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">O‘chirg‘ich</span>
              </button>
            </div>

            {/* Line Width */}
            <div className="hidden md:flex items-center gap-1 bg-white px-2 py-1.5 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-400">Qalinlik:</span>
              <input
                type="range"
                min="1"
                max="16"
                value={lineWidth}
                onChange={(e) => setLineWidth(Number(e.target.value))}
                className="w-16 h-1.5 accent-blue-600"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={undo}
                title="Ortga qaytarish"
                className="p-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 transition"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                onClick={clearCanvas}
                title="Doskani tozalash"
                className="p-1.5 bg-white hover:bg-rose-50 text-rose-600 rounded-lg border border-slate-200 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={downloadDrawing}
                title="Rasm sifatida yuklab olish"
                className="p-1.5 bg-white hover:bg-blue-50 text-blue-600 rounded-lg border border-slate-200 transition"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Math Symbols Bar */}
        <div className="bg-slate-100/90 px-4 py-1.5 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] shrink-0">
            Formulalar:
          </span>
          {MATH_SYMBOLS.map((sym) => (
            <button
              key={sym}
              onClick={() => addMathSymbol(sym)}
              className="px-2 py-0.5 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-md text-xs font-mono font-bold text-slate-800 transition active:scale-95 shrink-0"
            >
              {sym}
            </button>
          ))}
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-white relative overflow-hidden cursor-crosshair">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-full touch-none block"
          />
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>💡 Sichqoncha yoki sensorli ekran orqali erkin yozing va formulalarni chizing.</span>
          <span className="font-mono text-slate-400">45-daqiqa interaktiv doska</span>
        </div>

      </div>
    </div>
  );
};
