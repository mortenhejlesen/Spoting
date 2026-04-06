import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';

export default function SetLogger({ exercise, onLogSet, previousSets = [] }) {
  const [sets, setSets] = useState(
    Array.from({ length: exercise?.sets || 3 }, (_, i) => ({
      setNumber: i + 1,
      reps: '',
      weight: '',
      completed: false,
    }))
  );

  const updateSet = (index, field, value) => {
    setSets(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));
  };

  const completeSet = (index) => {
    setSets(prev => prev.map((s, i) => i === index ? { ...s, completed: true } : s));
    const set = sets[index];
    onLogSet?.({ ...set, setNumber: index + 1, completed: true });
  };

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="grid grid-cols-[32px_1fr_1fr_44px] gap-2 px-1">
        <span className="text-xs text-text-secondary text-center">Set</span>
        <span className="text-xs text-text-secondary text-center">kg</span>
        <span className="text-xs text-text-secondary text-center">Reps</span>
        <span className="text-xs text-text-secondary text-center">✓</span>
      </div>

      {sets.map((set, index) => (
        <div
          key={index}
          className={`grid grid-cols-[32px_1fr_1fr_44px] gap-2 items-center p-2 rounded-lg transition-colors ${
            set.completed ? 'bg-accent-green/10 border border-accent-green/20' : 'bg-bg-elevated'
          }`}
        >
          <span className="text-sm font-bold text-text-secondary text-center">{set.setNumber}</span>

          <input
            type="number"
            inputMode="decimal"
            placeholder={previousSets[index]?.weight || '0'}
            value={set.weight}
            onChange={(e) => updateSet(index, 'weight', e.target.value)}
            disabled={set.completed}
            className="w-full bg-bg-card text-text-primary text-center text-sm py-2 px-2 rounded-lg border border-white/10 focus:border-accent-violet outline-none disabled:opacity-50"
          />

          <input
            type="number"
            inputMode="numeric"
            placeholder={exercise?.reps?.split('-')[0] || '10'}
            value={set.reps}
            onChange={(e) => updateSet(index, 'reps', e.target.value)}
            disabled={set.completed}
            className="w-full bg-bg-card text-text-primary text-center text-sm py-2 px-2 rounded-lg border border-white/10 focus:border-accent-violet outline-none disabled:opacity-50"
          />

          <button
            onClick={() => !set.completed && completeSet(index)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              set.completed
                ? 'bg-accent-green text-white'
                : 'bg-bg-card border border-white/10 text-text-secondary hover:border-accent-green hover:text-accent-green'
            }`}
          >
            <Check size={16} />
          </button>
        </div>
      ))}

      <button
        onClick={() => setSets(prev => [...prev, { setNumber: prev.length + 1, reps: '', weight: '', completed: false }])}
        className="w-full flex items-center justify-center gap-2 py-2 text-sm text-text-secondary border border-dashed border-white/10 rounded-lg hover:border-accent-violet hover:text-accent-violet transition-colors"
      >
        <Plus size={14} />
        Add Set
      </button>
    </div>
  );
}
