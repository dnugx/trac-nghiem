import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, ChevronLeft, ChevronRight, RotateCw, BookOpen, Quote, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface Flashcard {
  id: number;
  term: string;
  category: string;
  frontHint: string;
  backDefinition: string;
  quote: string;
  author: string;
}

const FLASHCARDS: Flashcard[] = [
  {
    id: 1,
    term: 'Cơ Sở Hạ Tầng (Economic Base)',
    category: 'Hình thái KT-XH',
    frontHint: 'Định nghĩa khoa học & các thành tố cấu thành cơ cấu kinh tế',
    backDefinition: 'Toàn bộ những quan hệ sản xuất của một xã hội trong sự vận động hiện thực hợp thành cơ cấu kinh tế của xã hội đó. Gồm: Quan hệ sản xuất thống trị, Quan hệ sản xuất tàn dư và Quan hệ sản xuất mầm mống.',
    quote: 'Sự tổng hợp toàn bộ những quan hệ sản xuất ấy tạo thành cơ cấu kinh tế của xã hội, tức là cái cơ sở hiện thực trên đó xây dựng lên một kiến trúc thượng tầng pháp lý và chính trị.',
    author: 'Karl Marx',
  },
  {
    id: 2,
    term: 'Kiến Trúc Thượng Tầng (Superstructure)',
    category: 'Hình thái KT-XH',
    frontHint: 'Hệ thống tư tưởng và các thiết chế chính trị - xã hội',
    backDefinition: 'Toàn bộ những quan điểm, tư tưởng xã hội (chính trị, pháp quyền, đạo đức, tôn giáo, nghệ thuật, triết học) cùng các thiết chế xã hội tương ứng (nhà nước, đảng phái, giáo hội, các đoàn thể). Trong đó, Nhà nước là thiết chế quyền lực mạnh mẽ nhất.',
    quote: 'Nhà nước là một bộ máy duy trì sự thống trị của giai cấp này đối với giai cấp khác.',
    author: 'V.I. Lenin',
  },
  {
    id: 3,
    term: 'Quy luật Biện chứng CSHT - KTTT',
    category: 'Mối quan hệ bản chất',
    frontHint: 'Cơ chế quyết định và tác động trở lại',
    backDefinition: 'Cơ sở hạ tầng quyết định kiến trúc thượng tầng (nguồn gốc, nội dung, tính chất và sự biến đổi). Ngược lại, kiến trúc thượng tầng có tính độc lập tương đối và tác động trở lại mạnh mẽ: nếu phù hợp thì thúc đẩy, nếu trái quy luật kinh tế thì kìm hãm CSHT.',
    quote: 'Sự phát triển chính trị, pháp luật, triết học, tôn giáo... đều dựa trên cơ sở kinh tế. Nhưng chúng đều ảnh hưởng lẫn nhau và ảnh hưởng đến cơ sở kinh tế.',
    author: 'Friedrich Engels',
  },
  {
    id: 4,
    term: 'Vật chất & Ý thức',
    category: 'Chủ nghĩa duy vật biện chứng',
    frontHint: 'Mối quan hệ giữa thực tại khách quan và sự phản ánh tinh thần',
    backDefinition: 'Vật chất là thực tại khách quan có trước, sinh ra và quyết định ý thức. Ý thức là sự phản ánh năng động, sáng tạo thực tại khách quan vào óc người, có tính độc lập tương đối và tác động trở lại thế giới vật chất thông qua hoạt động thực tiễn.',
    quote: 'Ý thức con người không chỉ phản ánh thế giới khách quan, mà còn tạo ra thế giới khách quan.',
    author: 'V.I. Lenin',
  },
  {
    id: 5,
    term: 'Vai trò của Thực tiễn đối với Nhận thức',
    category: 'Nhận thức luận',
    frontHint: 'Nguồn gốc, động lực và tiêu chuẩn kiểm tra chân lý',
    backDefinition: 'Thực tiễn là toàn bộ hoạt động vật chất có mục đích, mang tính lịch sử - xã hội của con người nhằm cải tạo tự nhiên và xã hội. Thực tiễn đóng vai trò là cơ sở, động lực, mục đích của nhận thức và là tiêu chuẩn duy nhất để kiểm tra chân lý.',
    quote: 'Vấn đề tư duy của con người có đạt tới chân lý khách quan hay không... là một vấn đề thực tiễn. Trong thực tiễn, con người phải chứng minh chân lý.',
    author: 'Karl Marx',
  },
  {
    id: 6,
    term: 'Quy luật Mâu thuẫn (Hạt nhân Biện chứng)',
    category: '3 Quy luật cơ bản',
    frontHint: 'Nguồn gốc và động lực của sự vận động, phát triển',
    backDefinition: 'Mọi sự vật, hiện tượng đều chứa đựng những mặt đối lập vừa thống nhất vừa đấu tranh với nhau. Sự thống nhất là tương đối, tạm thời; đấu tranh là tuyệt đối. Quá trình giải quyết mâu thuẫn là nguồn gốc, động lực nội tại thúc đẩy sự vật vận động và phát triển.',
    quote: 'Có thể định nghĩa vắn tắt phép biện chứng là học thuyết về sự thống nhất của các mặt đối lập. Như thế là nắm được hạt nhân của phép biện chứng.',
    author: 'V.I. Lenin',
  },
];

interface StudyFlashcardsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudyFlashcards: React.FC<StudyFlashcardsProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isOpen) return null;

  const card = FLASHCARDS[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    soundEngine.playClick();
    setCurrentIndex((prev) => (prev + 1) % FLASHCARDS.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    soundEngine.playClick();
    setCurrentIndex((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
  };

  const handleFlip = () => {
    soundEngine.playClick();
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#1a0a0d] border border-amber-600/70 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-red-950 via-[#2c1216] to-red-950 border-b border-amber-700/50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif-vintage font-bold text-amber-100 text-base sm:text-lg">
              Thẻ Ghi Nhớ Triết Học Mác - Lênin
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Stage with Scholarly Ambience */}
        <div className="p-6 flex flex-col items-center">
          <div className="w-full flex justify-between items-center text-xs text-amber-300/80 mb-3 font-semibold">
            <span>CHUYÊN ĐỀ: {card.category}</span>
            <span>{currentIndex + 1} / {FLASHCARDS.length}</span>
          </div>

          {/* Flip Container */}
          <div
            onClick={handleFlip}
            className="w-full h-80 sm:h-96 rounded-2xl cursor-pointer perspective relative"
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full relative preserve-3d"
            >
              {/* Front side */}
              <div className="absolute inset-0 backface-hidden w-full h-full rounded-2xl bg-gradient-to-br from-[#2f1317] via-[#210c0e] to-[#140608] border-2 border-amber-600/60 p-6 sm:p-8 flex flex-col justify-between shadow-2xl text-center">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-red-950 text-amber-400 border border-red-800">
                    MẶT TRƯỚC (KHÁI NIỆM)
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-amber-300/70">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Nhấn để lật</span>
                  </div>
                </div>

                <div className="my-auto space-y-3">
                  <h4 className="font-serif-vintage font-bold text-2xl sm:text-3xl text-amber-200">
                    {card.term}
                  </h4>
                  <p className="text-stone-300 text-sm italic font-spectral">
                    {card.frontHint}
                  </p>
                </div>

                <div className="text-xs text-amber-400/80 flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Chạm vào thẻ để xem định nghĩa chi tiết & danh ngôn</span>
                </div>
              </div>

              {/* Back side */}
              <div
                style={{ transform: 'rotateY(180deg)' }}
                className="absolute inset-0 backface-hidden w-full h-full rounded-2xl bg-[#fdf8ee] text-[#331114] border-2 border-amber-500 p-6 sm:p-8 flex flex-col justify-between shadow-2xl text-left"
              >
                <div className="flex justify-between items-center border-b border-amber-900/20 pb-2">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-red-900 font-cinzel">
                    {card.term}
                  </span>
                  <span className="text-[11px] text-stone-600 font-medium">Nhấn để quay lại</span>
                </div>

                <div className="my-auto space-y-3 overflow-y-auto">
                  <p className="text-xs sm:text-sm font-medium leading-relaxed text-stone-800">
                    {card.backDefinition}
                  </p>

                  <div className="border-l-2 border-red-800 pl-3 py-1 bg-amber-50/80 rounded-r">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-red-900 mb-0.5">
                      <Quote className="w-3 h-3" />
                      <span>{card.author}</span>
                    </div>
                    <p className="text-xs italic text-stone-700 font-spectral">
                      «{card.quote}»
                    </p>
                  </div>
                </div>

                <div className="text-[11px] text-stone-500 text-center pt-2 border-t border-amber-900/10">
                  Học phần: Triết học Mác - Lênin
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between w-full mt-6">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-200 border border-amber-700/50 text-xs sm:text-sm font-semibold transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Trước</span>
            </button>

            <button
              onClick={handleFlip}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-950 hover:bg-red-900 text-amber-200 border border-amber-600/60 text-xs sm:text-sm font-semibold transition"
            >
              <RotateCw className="w-4 h-4" />
              <span>Lật thẻ</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 text-xs sm:text-sm font-bold shadow transition"
            >
              <span>Sau</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
