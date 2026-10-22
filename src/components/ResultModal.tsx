import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { RotateCcw, Award, CheckCircle2, XCircle, BookOpen, Share2, Sparkles } from 'lucide-react';
import { Question } from '../data/quizData';
import { soundEngine } from '../utils/soundEffects';

interface ResultModalProps {
  score: number;
  totalQuestions: number;
  userAnswers: { [questionId: number]: number };
  questions: Question[];
  onRestart: () => void;
  onOpenInfographic: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  score,
  totalQuestions,
  userAnswers,
  questions,
  onRestart,
  onOpenInfographic,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  useEffect(() => {
    soundEngine.playFanfare();
    // Big confetti celebration
    const end = Date.now() + 2 * 1000;
    const colors = ['#fce881', '#d4af37', '#e11d48', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  let rankTitle = 'Học giả Triết học Xuất sắc';
  let rankColor = 'text-amber-400 border-amber-500 bg-amber-950/80';
  let rankDesc = 'Bạn đã nắm rất vững mối quan hệ biện chứng giữa Cơ sở hạ tầng & Kiến trúc thượng tầng cùng các nguyên lý triết học Mác - Lênin!';

  if (percentage < 50) {
    rankTitle = 'Cần củng cố thêm lý luận';
    rankColor = 'text-rose-400 border-rose-500 bg-rose-950/80';
    rankDesc = 'Hãy ôn tập kỹ hơn về tính quyết định của cơ sở kinh tế đối với thể chế chính trị - pháp lý và thử sức lại nhé!';
  } else if (percentage < 80) {
    rankTitle = 'Người nghiên cứu có triển vọng';
    rankColor = 'text-blue-400 border-blue-500 bg-blue-950/80';
    rankDesc = 'Bạn đã nắm được các khái niệm nền tảng, chỉ cần rèn giũa thêm một số câu hỏi vận dụng thực tiễn.';
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl mx-auto my-6 p-4 sm:p-6 bg-gradient-to-br from-[#240e10] via-[#1a090b] to-[#100507] border-2 border-amber-600/70 rounded-2xl shadow-2xl overflow-hidden"
    >
      {/* Top Banner with Victory Medal */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pb-6 border-b border-amber-800/50 text-center sm:text-left">
        <div className="relative">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-amber-500/80 shadow-2xl bg-black">
            <img
              src="/src/assets/images/victory_medal_1792637995495.jpg"
              alt="Huân chương hoàn thành xuất sắc"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-amber-500 text-stone-950 shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-2">
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${rankColor}`}>
            {rankTitle}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-vintage text-amber-100">
            KẾT QUẢ HOÀN THÀNH BÀI THI
          </h2>
          <div className="flex items-center justify-center sm:justify-start gap-4">
            <div className="text-4xl sm:text-5xl font-cinzel font-extrabold text-amber-400 drop-shadow">
              {score} <span className="text-2xl sm:text-3xl text-stone-400">/ {totalQuestions}</span>
            </div>
            <div className="text-left">
              <div className="text-lg font-bold text-emerald-400">{percentage}%</div>
              <div className="text-xs text-stone-400">Độ chính xác</div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 max-w-md">
            {rankDesc}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="py-4 flex flex-wrap items-center justify-center gap-3 border-b border-amber-800/40">
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-lg shadow-amber-950/60 transition transform hover:scale-105 active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Làm lại từ đầu</span>
        </button>

        <button
          onClick={onOpenInfographic}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-200 border border-amber-700/60 font-semibold text-sm transition"
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>Xem sơ đồ trực quan</span>
        </button>
      </div>

      {/* Question by question detailed review */}
      <div className="pt-6 space-y-4">
        <h3 className="text-base sm:text-lg font-serif-vintage font-bold text-amber-200 flex items-center justify-between">
          <span>Chi tiết từng câu hỏi & Đối chiếu đáp án</span>
          <span className="text-xs font-sans text-stone-400 font-normal">
            Đúng {score}/{totalQuestions} câu
          </span>
        </h3>

        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {questions.map((q, idx) => {
            const userPick = userAnswers[q.id];
            const isCorrect = userPick === q.correct;
            const letters = ['A', 'B', 'C', 'D'];

            return (
              <div
                key={q.id}
                className={`p-3.5 rounded-xl border transition ${
                  isCorrect
                    ? 'bg-emerald-950/30 border-emerald-800/50'
                    : 'bg-rose-950/30 border-rose-800/50'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="text-xs sm:text-sm font-semibold text-stone-100">
                      <span className="text-amber-400 font-cinzel mr-1.5">Câu {idx + 1}:</span>
                      {q.q}
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className={`px-2 py-0.5 rounded font-medium ${
                        isCorrect ? 'bg-emerald-900/60 text-emerald-300' : 'bg-rose-900/60 text-rose-300'
                      }`}>
                        Bạn chọn: {userPick !== undefined ? `${letters[userPick]}. ${q.a[userPick]}` : 'Chưa trả lời'}
                      </span>

                      {!isCorrect && (
                        <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-medium">
                          Đáp án đúng: {letters[q.correct]}. {q.a[q.correct]}
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] sm:text-xs text-stone-300/90 leading-relaxed bg-black/40 p-2 rounded-lg border border-amber-900/30">
                      💡 <strong className="text-amber-300">Cơ sở lý luận:</strong> {q.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
