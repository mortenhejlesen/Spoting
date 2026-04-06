import React from 'react';

const RPE_LABELS = {
  1: 'Very Easy', 2: 'Easy', 3: 'Moderate', 4: 'Somewhat Hard',
  5: 'Hard', 6: 'Hard+', 7: 'Very Hard', 8: 'Very Hard+',
  9: 'Extremely Hard', 10: 'Max Effort'
};

const RPE_COLORS = {
  1: '#4CAF50', 2: '#4CAF50', 3: '#00D4AA', 4: '#00D4AA',
  5: '#FFD700', 6: '#FF9800', 7: '#FF9800', 8: '#FF6B35',
  9: '#FF3B30', 10: '#FF0000'
};

export default function RPESlider({ value, onChange }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary font-medium">RPE (Effort Level)</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold font-mono" style={{ color: RPE_COLORS[value] }}>{value}</span>
          <span className="text-sm" style={{ color: RPE_COLORS[value] }}>{RPE_LABELS[value]}</span>
        </div>
      </div>
      <div className="relative">
        <input
          type="range"
          min={1}
          max={10}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full"
          style={{ accentColor: RPE_COLORS[value] }}
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-text-secondary">1</span>
          <span className="text-xs text-text-secondary">10</span>
        </div>
      </div>
      <div className="flex gap-0.5 h-2">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i + 1}
            className="flex-1 rounded-full transition-all"
            style={{ backgroundColor: i + 1 <= value ? RPE_COLORS[i + 1] : '#1C1C26' }}
          />
        ))}
      </div>
    </div>
  );
}
