import React from 'react';
import { Flame } from 'lucide-react';

export default function StreakDisplay({ streak = 0, record = 0 }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        <Flame
          size={32}
          className={streak > 0 ? 'text-accent-orange' : 'text-text-secondary'}
          fill={streak > 0 ? '#FF6B35' : 'none'}
        />
        {streak > 0 && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-orange rounded-full flex items-center justify-center">
            <span className="text-[8px] font-bold text-white">{streak > 99 ? '99+' : streak}</span>
          </div>
        )}
      </div>
      <span className="text-xl font-bold font-mono text-text-primary">{streak}</span>
      <span className="text-xs text-text-secondary">day streak</span>
      {record > 0 && <span className="text-[10px] text-text-secondary">Best: {record}</span>}
    </div>
  );
}
