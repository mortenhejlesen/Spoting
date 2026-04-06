import React from 'react';

export function SkeletonLine({ width = 'full', height = 4 }) {
  return (
    <div className={`w-${width} h-${height} bg-bg-elevated rounded animate-pulse`} />
  );
}

export function SkeletonCard({ lines = 3, className = '' }) {
  return (
    <div className={`bg-bg-card rounded-card p-4 space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-bg-elevated rounded animate-pulse ${
            i === 0 ? 'w-3/4' : i === lines - 1 ? 'w-1/2' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
}

export default function SkeletonLoader({ type = 'card', count = 1, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
