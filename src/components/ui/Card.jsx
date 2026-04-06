import React from 'react';

export default function Card({ children, className = '', onClick, glow, elevated }) {
  const base = 'rounded-card p-4';
  const bg = elevated ? 'bg-bg-elevated' : 'bg-bg-card';
  const glowClass =
    glow === 'violet'
      ? 'card-glow-violet'
      : glow === 'teal'
      ? 'card-glow-teal'
      : '';
  const clickable = onClick
    ? 'cursor-pointer active:scale-[0.98] transition-transform'
    : '';

  return (
    <div
      className={`${base} ${bg} ${glowClass} ${clickable} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
