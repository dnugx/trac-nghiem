import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Layers, Factory, Landmark, ArrowUpDown, BookOpen, CheckCircle, Info } from 'lucide-react';
import { INFOGRAPHIC_DETAILS } from '../data/quizData';

interface InfographicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfographicModal: React.FC<InfographicModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'csht' | 'kttt' | 'relation'>('all');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl bg-[#180a0c] border border-amber-600/60 rounded-2xl shadow-2xl overflow-hidden my-auto"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-red-950 via-[#2a1114] to-red-950 border-b border-amber-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-serif-vintage text-amber-100">
                Sơ Đồ Trực Quan: Cơ Sở Hạ Tầng & Kiến Trúc Thượng Tầng
              </h2>
              <p className="text-xs text-amber-300/70 font-spectral">
                Học thuyết về hình thái kinh tế - xã hội của Chủ nghĩa duy vật lịch sử
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Main Visual Poster */}
          <div className="relative rounded-xl overflow-hidden border-2 border-amber-500/50 shadow-2xl bg-black">
            <img
              src="/src/assets/images/infra_superstructure_1792637995914.jpg"
              alt="Mô hình Cơ sở hạ tầng và Kiến trúc thượng tầng"
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[440px] object-contain mx-auto"
            />
            <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-amber-600/50 text-[11px] text-amber-300 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              <span>Sơ đồ biện chứng duy vật lịch sử</span>
            </div>
          </div>

          {/* Quick Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'all'
                  ? 'bg-amber-600 text-stone-950 shadow'
                  : 'bg-stone-900 text-stone-300 border border-stone-800 hover:border-amber-700'
              }`}
            >
              Tất cả các thành tố
            </button>
            <button
              onClick={() => setActiveTab('csht')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'csht'
                  ? 'bg-amber-600 text-stone-950 shadow'
                  : 'bg-stone-900 text-stone-300 border border-stone-800 hover:border-amber-700'
              }`}
            >
              <Factory className="w-3.5 h-3.5 text-amber-400" />
              Cơ sở hạ tầng (Nền móng)
            </button>
            <button
              onClick={() => setActiveTab('kttt')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'kttt'
                  ? 'bg-amber-600 text-stone-950 shadow'
                  : 'bg-stone-900 text-stone-300 border border-stone-800 hover:border-amber-700'
              }`}
            >
              <Landmark className="w-3.5 h-3.5 text-amber-400" />
              Kiến trúc thượng tầng (Phía trên)
            </button>
            <button
              onClick={() => setActiveTab('relation')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'relation'
                  ? 'bg-amber-600 text-stone-950 shadow'
                  : 'bg-stone-900 text-stone-300 border border-stone-800 hover:border-amber-700'
              }`}
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
              Quan hệ tác động biện chứng
            </button>
          </div>

          {/* Cards Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INFOGRAPHIC_DETAILS.filter((item) => {
              if (activeTab === 'all') return true;
              if (activeTab === 'csht') return item.id === 'csht' || item.id === 'llsx';
              if (activeTab === 'kttt') return item.id === 'kttt';
              if (activeTab === 'relation') return item.id === 'relation';
              return true;
            }).map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-br from-[#220d0f] to-[#17080a] border border-amber-800/40 rounded-xl p-4 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-red-950 text-amber-300 border border-red-800">
                      {item.badge}
                    </span>
                    <span className="text-xs text-stone-400">{item.category}</span>
                  </div>
                  <h3 className="font-serif-vintage font-bold text-base text-amber-100 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>

                <div className="bg-black/30 rounded-lg p-2.5 border border-amber-900/30">
                  <div className="text-[11px] font-semibold text-amber-400 mb-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span>Thành tố cụ thể:</span>
                  </div>
                  <ul className="text-xs text-stone-300 space-y-1 list-disc list-inside">
                    {item.examples.map((ex, i) => (
                      <li key={i} className="line-clamp-2">{ex}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Theoretical Summary Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/70 via-black/80 to-red-950/70 border border-amber-600/40 text-center">
            <h4 className="font-serif-vintage font-bold text-amber-200 text-sm mb-1">
              Khái quát quy luật cốt lõi
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 max-w-3xl mx-auto italic font-spectral">
              «Cơ sở hạ tầng quyết định sự hình thành, cơ cấu và tính chất của kiến trúc thượng tầng; đồng thời kiến trúc thượng tầng (đặc biệt là Nhà nước và Pháp luật) tác động trở lại mạnh mẽ tới sự duy trì, củng cố và phát triển của cơ sở hạ tầng.»
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#130708] border-t border-amber-900/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-1.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold rounded-lg text-xs sm:text-sm transition shadow"
          >
            Đã hiểu, quay lại làm bài
          </button>
        </div>
      </motion.div>
    </div>
  );
};
