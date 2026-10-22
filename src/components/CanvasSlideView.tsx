import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, ArrowRight, Lightbulb, Sparkles, BookOpen, Clock, Award } from 'lucide-react';
import { Question } from '../data/quizData';
import { soundEngine } from '../utils/soundEffects';

interface CanvasSlideViewProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onNext: () => void;
  onAnswerSelected: (selectedIndex: number, isCorrect: boolean) => void;
  selectedAnswer: number | null;
  timerEnabled: boolean;
  timeLeft: number;
}

export const CanvasSlideView: React.FC<CanvasSlideViewProps> = ({
  question,
  currentIndex,
  totalQuestions,
  onNext,
  onAnswerSelected,
  selectedAnswer,
  timerEnabled,
  timeLeft,
}) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const isAnswered = selectedAnswer !== null;

  // Reset explanation state when question changes
  useEffect(() => {
    setShowExplanation(false);
  }, [question.id]);

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    const isCorrect = index === question.correct;
    
    if (isCorrect) {
      soundEngine.playCorrect();
      // Burst celebratory confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#fce881', '#d4af37', '#e11d48', '#ffffff'],
      });
    } else {
      soundEngine.playWrong();
    }

    onAnswerSelected(index, isCorrect);
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 sm:p-4">
      {/* Outer 16:9 Stage Container */}
      <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden border-2 border-amber-600/60 shadow-[0_20px_60px_rgba(0,0,0,0.85)] bg-[#120809]">
        
        {/* Background Image: Dignified Marx-Lenin Presentation Canvas */}
        <div className="relative w-full aspect-[16/9] min-h-[460px] sm:min-h-[540px] md:min-h-[580px] overflow-hidden select-none">
          <img
            src="/src/assets/images/marx_lenin_canvas_1792637992483.jpg"
            alt="Mác - Lênin Canvas Triết học"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Subtle atmospheric vignette and warmth overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40 pointer-events-none" />

          {/* Top Header / Progress Ribbon */}
          <div className="absolute top-3 sm:top-5 left-0 right-0 z-10 flex items-center justify-between px-4 sm:px-8 pointer-events-auto">
            {/* Topic pill */}
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/40 text-amber-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{question.topic}</span>
              <span className="text-[11px] text-amber-200/80 bg-red-950/80 px-1.5 py-0.2 rounded border border-red-800">
                {question.difficulty || 'Chuẩn'}
              </span>
            </div>

            {/* Central Progress Title matching user's "CÂU HỎI 1/8" */}
            <div className="text-center">
              <div className="inline-block px-5 py-1.5 rounded-full bg-gradient-to-r from-red-950 via-amber-950 to-red-950 border border-amber-500/70 shadow-lg shadow-black/80">
                <span className="font-cinzel text-amber-200 font-extrabold text-sm sm:text-lg tracking-widest drop-shadow-md">
                  CÂU HỎI {currentIndex + 1} / {totalQuestions}
                </span>
              </div>
            </div>

            {/* Timer or Next Action */}
            <div className="flex items-center gap-2">
              {timerEnabled && !isAnswered && (
                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono font-bold text-xs border ${
                    timeLeft <= 5
                      ? 'bg-red-950 text-red-200 border-red-500 animate-pulse'
                      : 'bg-black/60 text-amber-300 border-amber-500/40'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{timeLeft}s</span>
                </div>
              )}

              {isAnswered && (
                <button
                  onClick={onNext}
                  className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold px-4 py-1.5 rounded-full shadow-lg shadow-amber-950/80 hover:shadow-amber-500/30 transition transform hover:scale-105 active:scale-95 text-xs sm:text-sm font-sans"
                >
                  <span>Tiếp theo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Central Question Display (Placed directly on the antique parchment scroll area) */}
          <div className="absolute top-[18%] sm:top-[20%] left-[24%] sm:left-[27%] right-[4%] sm:right-[6%] bottom-[42%] sm:bottom-[38%] flex flex-col justify-center items-center text-center px-4 sm:px-6 overflow-y-auto">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="max-w-2xl"
            >
              <h2 className="font-serif-vintage font-bold text-base sm:text-xl md:text-2xl lg:text-[25px] leading-relaxed tracking-wide text-[#5c0e12] drop-shadow-sm select-text">
                {question.q}
              </h2>
            </motion.div>
          </div>

          {/* Bottom Grid for the 4 Options (A, B, C, D) */}
          <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-[8%] right-3 sm:right-[8%] z-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3.5">
              {question.a.map((optionText, oIdx) => {
                const isSelected = selectedAnswer === oIdx;
                const isCorrectOption = oIdx === question.correct;
                let btnStyle = 'bg-stone-900/85 hover:bg-stone-800/90 text-stone-100 border-amber-600/40 hover:border-amber-400 shadow-lg';
                let badgeStyle = 'bg-amber-600/20 text-amber-300 border-amber-500/60';

                if (isAnswered) {
                  if (isCorrectOption) {
                    btnStyle = 'bg-emerald-900/95 text-emerald-100 border-emerald-400 ring-2 ring-emerald-400/50 shadow-emerald-950/80 animate-pulse';
                    badgeStyle = 'bg-emerald-500 text-stone-950 border-emerald-300 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950/95 text-rose-200 border-rose-500 line-through opacity-85';
                    badgeStyle = 'bg-rose-600 text-white border-rose-400';
                  } else {
                    btnStyle = 'bg-stone-950/60 text-stone-400 border-stone-800/60 opacity-60';
                    badgeStyle = 'bg-stone-800 text-stone-400 border-stone-700';
                  }
                }

                return (
                  <motion.button
                    key={oIdx}
                    whileHover={!isAnswered ? { scale: 1.015, y: -2 } : {}}
                    whileTap={!isAnswered ? { scale: 0.985 } : {}}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`group w-full relative flex items-center text-left py-2.5 sm:py-3.5 px-3 sm:px-4 rounded-xl border backdrop-blur-md transition-all duration-200 cursor-pointer disabled:cursor-default ${btnStyle}`}
                  >
                    {/* Option Letter Badge (A, B, C, D) */}
                    <div
                      className={`flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center font-cinzel font-extrabold text-xs sm:text-sm mr-2.5 sm:mr-3 transition-colors ${badgeStyle}`}
                    >
                      {optionLetters[oIdx]}
                    </div>

                    {/* Option text */}
                    <span className="flex-1 text-xs sm:text-sm md:text-[15px] font-medium leading-snug line-clamp-2 select-text">
                      {optionText}
                    </span>

                    {/* Result indicator icon */}
                    {isAnswered && isCorrectOption && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 ml-2" />
                    )}
                    {isAnswered && isSelected && !isCorrectOption && (
                      <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 ml-2" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Post-answer Quick Bar (Explanation toggle & Next button) */}
            {isAnswered && (
              <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 bg-stone-950/80 backdrop-blur-md border border-amber-700/50 rounded-xl px-3 py-1.5">
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-medium transition"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>{showExplanation ? 'Ẩn lời giải lý luận' : '💡 Xem giải thích lý luận Mác - Lênin'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-stone-400 hidden sm:inline">
                    {selectedAnswer === question.correct ? '🎉 Chính xác!' : '⚡ Chưa chính xác!'}
                  </span>
                  <button
                    onClick={onNext}
                    className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold px-3 py-1 rounded-lg text-xs transition shadow"
                  >
                    <span>{currentIndex + 1 === totalQuestions ? 'Xem kết quả' : 'Câu tiếp theo'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Explanation Drawer / Panel below canvas */}
      <AnimatePresence>
        {isAnswered && showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-5xl mt-3 overflow-hidden"
          >
            <div className="bg-gradient-to-br from-[#2a1316] via-[#1f0d0f] to-[#160809] border border-amber-600/50 rounded-2xl p-4 sm:p-5 shadow-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-serif-vintage font-bold text-amber-200 text-base flex items-center gap-2">
                    <span>Giải thích lý luận & Cơ sở khoa học</span>
                    <span className="text-xs font-sans font-normal text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                      Đáp án đúng: {optionLetters[question.correct]}. {question.a[question.correct]}
                    </span>
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    {question.explanation}
                  </p>
                  {question.quote && (
                    <blockquote className="border-l-2 border-amber-500/80 pl-3 py-1 text-xs text-amber-300/90 font-spectral italic bg-black/30 rounded-r-lg">
                      «{question.quote}»
                    </blockquote>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
