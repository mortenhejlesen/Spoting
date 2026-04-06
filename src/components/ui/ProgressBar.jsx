import React from 'react';

export default function ProgressBar({
  value,
  max = 100,
  color = 'violet',
  label,
  showValue = false,
  height = 6,
}) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  const colors = {
    violet: 'bg-accent-violet',
    teal: 'bg-accent-teal',
    orange: 'bg-accent-orange',
    green: 'bg-accent-green',
  };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm text-text-secondary">{label}</span>}
          {showValue && (
            <span className="text-sm font-semibold text-text-primary">{percentage}%</span>
          )}
        </div>
      )}
      <div
        className="w-full bg-bg-elevated rounded-full overflow-hidden"
        style={{ height }}
      >
        <div
          className={`${
            colors[color] ?? colors.violet
          } h-full rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
