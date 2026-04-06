import React from 'react';

const sportColors = {
  badminton: {
    bg: 'bg-[#6C63FF]/20',
    text: 'text-[#6C63FF]',
    border: 'border-[#6C63FF]/30',
  },
  tennis: {
    bg: 'bg-[#FFD700]/20',
    text: 'text-[#FFD700]',
    border: 'border-[#FFD700]/30',
  },
  soccer: {
    bg: 'bg-[#00C853]/20',
    text: 'text-[#00C853]',
    border: 'border-[#00C853]/30',
  },
};

export default function Badge({ children, variant = 'default', sport, className = '' }) {
  if (sport) {
    const colors = sportColors[sport] || sportColors.badminton;
    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border} ${className}`}
      >
        {children}
      </span>
    );
  }

  const variants = {
    default: 'bg-bg-elevated text-text-secondary',
    violet: 'bg-accent-violet/20 text-accent-violet border border-accent-violet/30',
    teal: 'bg-accent-teal/20 text-accent-teal border border-accent-teal/30',
    orange: 'bg-accent-orange/20 text-accent-orange border border-accent-orange/30',
    green: 'bg-accent-green/20 text-accent-green border border-accent-green/30',
    strength: 'bg-[#6C63FF]/20 text-[#6C63FF] border border-[#6C63FF]/30',
    mobility: 'bg-[#00D4AA]/20 text-[#00D4AA] border border-[#00D4AA]/30',
    conditioning: 'bg-[#FF6B35]/20 text-[#FF6B35] border border-[#FF6B35]/30',
    recovery: 'bg-[#4CAF50]/20 text-[#4CAF50] border border-[#4CAF50]/30',
    rest: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
        variants[variant] ?? variants.default
      } ${className}`}
    >
      {children}
    </span>
  );
}
