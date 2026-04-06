import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled,
  className = '',
  fullWidth = false,
  icon: Icon,
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-btn transition-all duration-200 active:scale-95 no-select';

  const variants = {
    primary:
      'bg-accent-violet text-white hover:bg-violet-600 active:bg-violet-700 disabled:opacity-40',
    secondary:
      'bg-bg-elevated text-text-primary hover:bg-bg-card border border-white/10',
    teal: 'bg-accent-teal text-bg-primary hover:opacity-90',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated',
    danger: 'bg-accent-orange text-white hover:opacity-90',
    outline:
      'border border-accent-violet text-accent-violet hover:bg-accent-violet hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-3 text-base min-h-[44px]',
    lg: 'px-6 py-4 text-lg min-h-[52px]',
  };

  return (
    <button
      className={`${base} ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />}
      {children}
    </button>
  );
}
