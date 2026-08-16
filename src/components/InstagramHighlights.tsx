'use client';

import React from 'react';
import { INSTAGRAM_HIGHLIGHTS } from '@/data/products';
import { Box, Key, Sparkles, Tag, LucideIcon } from 'lucide-react';

interface InstagramHighlightsProps {
  onSelectHighlight: (categoryKey: string) => void;
  selectedCategory: string;
}

const iconMap: Record<string, LucideIcon> = {
  figurines: Box,
  'keychains-metal': Key,
  rubber: Sparkles,
  stickers: Tag,
};

export const InstagramHighlights: React.FC<InstagramHighlightsProps> = ({
  onSelectHighlight,
  selectedCategory,
}) => {
  return (
    <div className="w-full bg-white border-y border-zinc-200 py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
            INSTAGRAM HIGHLIGHTS (@oh_my_marvz)
          </span>
          <span className="text-xs text-zinc-400 font-mono">
            Tap a highlight to filter
          </span>
        </div>

        {/* Scrollable Highlight Story Circles */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
          {INSTAGRAM_HIGHLIGHTS.map((hl) => {
            const isSelected = selectedCategory === hl.id;
            const Icon = iconMap[hl.id] || Box;
            return (
              <button
                key={hl.id}
                onClick={() => onSelectHighlight(hl.id)}
                className={`flex flex-col items-center gap-2 flex-shrink-0 group focus:outline-none transition-all ${
                  isSelected ? 'scale-105' : 'hover:scale-102'
                }`}
              >
                {/* Story Ring Circle */}
                <div className={`p-[2px] rounded-full transition-all ${
                  isSelected ? 'bg-red-600 ring-2 ring-red-600/30' : 'bg-zinc-200 group-hover:bg-zinc-400'
                }`}>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-zinc-50 border-2 border-white flex items-center justify-center text-zinc-800 shadow-sm">
                    <Icon className="w-6 h-6 text-red-600 stroke-[2.5]" />
                  </div>
                </div>

                <span className={`text-xs font-black uppercase tracking-wider ${
                  isSelected ? 'text-red-600 font-black' : 'text-zinc-700'
                }`}>
                  {hl.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
