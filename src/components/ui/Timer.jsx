import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function Timer({ initialSeconds, onComplete, autoStart = false, label = '' }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);

  useEffect(() => {
    setSeconds(initialSeconds);
    setIsRunning(autoStart);
  }, [initialSeconds, autoStart]);

  useEffect(() => {
    if (!isRunning) return;
    if (seconds <= 0) {
      setIsRunning(false);
      onComplete?.();
      return;
    }
    const timer = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(timer);
  }, [isRunning, seconds, onComplete]);

  const reset = useCallback(() => {
    setSeconds(initialSeconds);
    setIsRunning(false);
  }, [initialSeconds]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const progress = ((initialSeconds - seconds) / initialSeconds) * 100;
  const circumference = 2 * Math.PI * 45;

  return (
    <div className="flex flex-col items-center gap-4">
      {label && <span className="text-sm text-text-secondary">{label}</span>}
      <div className="relative w-28 h-28">
        <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#1C1C26" strokeWidth="6" />
          <circle
            cx="50" cy="50" r="45" fill="none"
            stroke={seconds > 0 ? '#6C63FF' : '#4CAF50'}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold font-mono text-text-primary">
            {mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : secs}
          </span>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => setIsRunning(r => !r)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-violet text-white"
        >
          {isRunning ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button
          onClick={reset}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-bg-elevated text-text-secondary"
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </div>
  );
}
