/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CORE_QUESTIONS, Question } from './data/quizData';
import { HeaderNavbar } from './components/HeaderNavbar';
import { CanvasSlideView } from './components/CanvasSlideView';
import { InfographicModal } from './components/InfographicModal';
import { StudyFlashcards } from './components/StudyFlashcards';
import { ResultModal } from './components/ResultModal';
import { soundEngine } from './utils/soundEffects';
import { Sparkles, HelpCircle, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState<string>('base_superstructure');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [timerEnabled, setTimerEnabled] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Filtered questions based on selected topic
  const activeQuestions = useMemo(() => {
    if (selectedTopic === 'base_superstructure') {
      return CORE_QUESTIONS.filter((q) => q.topic === 'Cơ sở hạ tầng & Kiến trúc thượng tầng');
    }
    if (selectedTopic === 'laws_materialism') {
      return CORE_QUESTIONS.filter((q) => q.topic === 'Quy luật biện chứng & Nhận thức luận');
    }
    return CORE_QUESTIONS;
  }, [selectedTopic]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: number]: number }>({});
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Modals
  const [showInfographic, setShowInfographic] = useState<boolean>(false);
  const [showFlashcards, setShowFlashcards] = useState<boolean>(false);

  const currentQuestion = activeQuestions[currentIndex] || activeQuestions[0];
  const selectedAnswer = userAnswers[currentQuestion?.id] ?? null;

  // Sound sync
  useEffect(() => {
    soundEngine.enabled = soundEnabled;
  }, [soundEnabled]);

  // Handle timer countdown
  useEffect(() => {
    if (!timerEnabled || selectedAnswer !== null || isCompleted) return;

    setTimeLeft(30);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Auto choose wrong if time expires
          handleAnswerSelected(-1, false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, timerEnabled, selectedAnswer, isCompleted]);

  // Answer selection handler
  const handleAnswerSelected = (selectedIndex: number, isCorrect: boolean) => {
    if (selectedAnswer !== null) return;

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: selectedIndex,
    }));

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  // Move to next question or show results
  const handleNext = useCallback(() => {
    soundEngine.playClick();
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(30);
    } else {
      setIsCompleted(true);
    }
  }, [currentIndex, activeQuestions.length]);

  // Restart quiz
  const handleRestart = () => {
    soundEngine.playClick();
    setCurrentIndex(0);
    setUserAnswers({});
    setScore(0);
    setIsCompleted(false);
    setTimeLeft(30);
  };

  // Change topic
  const handleSelectTopic = (topic: string) => {
    soundEngine.playClick();
    setSelectedTopic(topic);
    setCurrentIndex(0);
    setUserAnswers({});
    setScore(0);
    setIsCompleted(false);
    setTimeLeft(30);
  };

  // Fullscreen toggle
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === ' ' || e.key === 'Enter') {
        if (selectedAnswer !== null && !isCompleted) {
          e.preventDefault();
          handleNext();
        }
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (selectedAnswer === null && currentQuestion?.a[idx]) {
          handleAnswerSelected(idx, idx === currentQuestion.correct);
        }
      } else if (['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'].includes(e.key)) {
        const map: { [k: string]: number } = { a: 0, b: 1, c: 2, d: 3, A: 0, B: 1, C: 2, D: 3 };
        const idx = map[e.key];
        if (selectedAnswer === null && currentQuestion?.a[idx]) {
          handleAnswerSelected(idx, idx === currentQuestion.correct);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAnswer, isCompleted, currentQuestion, handleNext]);

  return (
    <div className="min-h-screen bg-[#0d0708] text-stone-100 flex flex-col font-sans selection:bg-red-800 selection:text-amber-100">
      {/* Top Navbar */}
      <HeaderNavbar
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        selectedTopic={selectedTopic}
        onSelectTopic={handleSelectTopic}
        onOpenInfographic={() => setShowInfographic(true)}
        onOpenFlashcards={() => setShowFlashcards(true)}
        onRestart={handleRestart}
        timerEnabled={timerEnabled}
        onToggleTimer={() => setTimerEnabled(!timerEnabled)}
      />

      {/* Main presentation canvas area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2 sm:px-4 py-4 flex flex-col items-center justify-center">
        {!isCompleted ? (
          <div className="w-full flex flex-col items-center">
            {/* Quick Question Navigator Dots / Pill Row */}
            <div className="w-full max-w-5xl mb-2 flex items-center justify-between px-2 text-xs text-stone-400">
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {activeQuestions.map((q, idx) => {
                  const answered = userAnswers[q.id] !== undefined;
                  const isCurrent = idx === currentIndex;
                  const isCorrect = userAnswers[q.id] === q.correct;

                  let dotStyle = 'bg-stone-800 text-stone-400 border-stone-700 hover:border-amber-500';
                  if (answered) {
                    dotStyle = isCorrect
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                      : 'bg-rose-950 text-rose-300 border-rose-600';
                  } else if (isCurrent) {
                    dotStyle = 'bg-amber-500 text-stone-950 font-bold border-amber-300 ring-2 ring-amber-500/50';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        soundEngine.playClick();
                        setCurrentIndex(idx);
                      }}
                      className={`w-7 h-7 rounded-lg border text-xs font-cinzel font-semibold flex items-center justify-center transition-all ${dotStyle}`}
                      title={`Câu hỏi ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="hidden md:flex items-center gap-2 text-stone-400 text-xs">
                <span>Điểm: <strong className="text-amber-400 font-cinzel">{score}</strong>/{currentIndex + (selectedAnswer !== null ? 1 : 0)}</span>
                <span className="text-stone-600">|</span>
                <span className="text-[11px] text-stone-500">Phím tắt: [1-4] hoặc [A-D], [Enter] tiếp theo</span>
              </div>
            </div>

            {/* The 16:9 Slide Canvas component */}
            <CanvasSlideView
              question={currentQuestion}
              currentIndex={currentIndex}
              totalQuestions={activeQuestions.length}
              onNext={handleNext}
              onAnswerSelected={handleAnswerSelected}
              selectedAnswer={selectedAnswer}
              timerEnabled={timerEnabled}
              timeLeft={timeLeft}
            />
          </div>
        ) : (
          <ResultModal
            score={score}
            totalQuestions={activeQuestions.length}
            userAnswers={userAnswers}
            questions={activeQuestions}
            onRestart={handleRestart}
            onOpenInfographic={() => setShowInfographic(true)}
          />
        )}
      </main>

      {/* Footer Bar */}
      <footer className="w-full bg-[#120709] border-t border-amber-900/40 py-3 px-4 text-center text-xs text-amber-200/60 font-spectral">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Triết học Mác - Lênin • Bộ môn Khoa học Lý luận Chính trị</span>
          <div className="flex items-center gap-4 text-stone-400 text-xs">
            <button
              onClick={() => setShowInfographic(true)}
              className="hover:text-amber-300 transition underline underline-offset-2"
            >
              Sơ đồ Cơ sở hạ tầng & KTTT
            </button>
            <button
              onClick={() => setShowFlashcards(true)}
              className="hover:text-amber-300 transition underline underline-offset-2"
            >
              Thẻ ôn tập nhanh
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <InfographicModal
        isOpen={showInfographic}
        onClose={() => setShowInfographic(false)}
      />

      <StudyFlashcards
        isOpen={showFlashcards}
        onClose={() => setShowFlashcards(false)}
      />
    </div>
  );
}
