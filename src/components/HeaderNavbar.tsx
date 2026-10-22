import React from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, BookOpen, Layers, RotateCcw, Clock } from 'lucide-react';

interface HeaderNavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  selectedTopic: string;
  onSelectTopic: (topic: string) => void;
  onOpenInfographic: () => void;
  onOpenFlashcards: () => void;
  onRestart: () => void;
  timerEnabled: boolean;
  onToggleTimer: () => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  soundEnabled,
  onToggleSound,
  isFullscreen,
  onToggleFullscreen,
  selectedTopic,
  onSelectTopic,
  onOpenInfographic,
  onOpenFlashcards,
  onRestart,
  timerEnabled,
  onToggleTimer,
}) => {
  return (
    <header className="w-full bg-[#160b0c]/90 border-b border-amber-900/40 backdrop-blur-md px-4 py-3 sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-amber-500/80 bg-gradient-to-br from-red-800 to-amber-950 flex items-center justify-center shadow-lg shadow-red-950/50">
            <span className="text-amber-400 font-cinzel font-bold text-lg select-none">M·L</span>
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold font-serif-vintage tracking-wide text-amber-100 flex items-center gap-2">
              Triết Học Mác - Lênin
              <span className="text-[10px] md:text-xs font-sans uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-red-950 text-amber-300 border border-red-800">
                Chuyên Đề
              </span>
            </h1>
            <p className="text-xs text-amber-200/70 font-spectral italic hidden sm:block">
              Học thuyết Cơ sở hạ tầng & Kiến trúc thượng tầng
            </p>
          </div>
        </div>

        {/* Center / Topic Filter */}
        <div className="flex items-center gap-2">
          <select
            value={selectedTopic}
            onChange={(e) => onSelectTopic(e.target.value)}
            className="bg-[#241113] text-amber-200 text-xs md:text-sm font-medium border border-amber-800/60 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500 hover:border-amber-600 transition"
          >
            <option value="base_superstructure">Cơ sở hạ tầng & KTTT (8 câu cốt lõi)</option>
            <option value="laws_materialism">Biện chứng & Nhận thức (8 câu)</option>
            <option value="all">Toàn bộ chuyên đề (16 câu)</option>
          </select>

          {/* Sơ đồ trực quan button */}
          <button
            onClick={onOpenInfographic}
            className="flex items-center gap-1.5 bg-gradient-to-r from-red-900/80 to-amber-900/80 hover:from-red-800 hover:to-amber-800 text-amber-200 text-xs md:text-sm px-3 py-1.5 rounded-lg border border-amber-600/40 shadow-sm transition hover:shadow-amber-900/30"
            title="Xem sơ đồ trực quan hóa Cơ sở hạ tầng & Kiến trúc thượng tầng"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline font-medium">Sơ đồ trực quan</span>
          </button>

          {/* Flashcards button */}
          <button
            onClick={onOpenFlashcards}
            className="flex items-center gap-1.5 bg-[#291316] hover:bg-[#381a1e] text-amber-200 text-xs md:text-sm px-3 py-1.5 rounded-lg border border-amber-800/50 shadow-sm transition"
            title="Xem thẻ ghi nhớ các khái niệm cốt lõi"
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline font-medium">Ghi nhớ</span>
          </button>
        </div>

        {/* Actions (Sound, Timer, Reset, Fullscreen) */}
        <div className="flex items-center gap-1.5">
          {/* Timer Toggle */}
          <button
            onClick={onToggleTimer}
            className={`p-2 rounded-lg border transition text-xs flex items-center gap-1 ${
              timerEnabled
                ? 'bg-amber-950/70 border-amber-500/80 text-amber-300'
                : 'bg-[#220f12] border-amber-900/40 text-amber-400/60 hover:text-amber-300'
            }`}
            title={timerEnabled ? 'Tắt đồng hồ tính giờ' : 'Bật đồng hồ tính giờ (30 giây/câu)'}
          >
            <Clock className="w-4 h-4" />
            <span className="text-[11px] font-mono hidden lg:inline">{timerEnabled ? '30s' : 'Đồng hồ'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 rounded-lg bg-[#220f12] border border-amber-900/40 text-amber-300 hover:bg-[#34161a] transition"
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh hiệu ứng'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>

          {/* Restart */}
          <button
            onClick={onRestart}
            className="p-2 rounded-lg bg-[#220f12] border border-amber-900/40 text-amber-300 hover:bg-[#34161a] transition"
            title="Làm lại từ đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={onToggleFullscreen}
            className="p-2 rounded-lg bg-gradient-to-r from-amber-700 to-amber-600 text-stone-950 font-bold hover:from-amber-600 hover:to-amber-500 shadow-md transition"
            title={isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình trình chiếu'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
