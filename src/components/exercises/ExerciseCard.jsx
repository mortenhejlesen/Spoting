import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import Badge from '../ui/Badge.jsx';

const categoryColors = {
  strength: 'strength',
  mobility: 'mobility',
  conditioning: 'conditioning',
  stretch: 'recovery',
};

const categoryEmoji = {
  strength: '💪',
  mobility: '🧘',
  conditioning: '⚡',
  stretch: '🤸',
};

export default function ExerciseCard({ exercise, onTap, showSets = true }) {
  const [expanded, setExpanded] = useState(false);
  if (!exercise) return null;

  return (
    <div className="bg-bg-card rounded-card overflow-hidden border border-white/5">
      <div
        className="flex items-start gap-3 p-4 cursor-pointer active:bg-bg-elevated transition-colors"
        onClick={() => onTap ? onTap(exercise) : setExpanded(!expanded)}
      >
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-bg-elevated flex items-center justify-center text-2xl flex-shrink-0">
          {categoryEmoji[exercise.category] || '🏋️'}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-text-primary text-sm leading-tight">{exercise.name}</h3>
            <Badge variant={categoryColors[exercise.category] || 'default'} className="flex-shrink-0 text-[10px]">
              {exercise.category}
            </Badge>
          </div>

          {showSets && (
            <div className="flex items-center gap-3 mt-1.5">
              {exercise.sets && (
                <span className="text-xs text-text-secondary">
                  <span className="font-semibold text-text-primary">{exercise.sets}</span> sets
                </span>
              )}
              {exercise.reps && (
                <span className="text-xs text-text-secondary">
                  <span className="font-semibold text-text-primary">{exercise.reps}</span> reps
                </span>
              )}
              {exercise.duration && (
                <span className="text-xs text-text-secondary">
                  <span className="font-semibold text-text-primary">{exercise.duration}s</span>
                </span>
              )}
              {exercise.restSeconds && (
                <span className="text-xs text-text-secondary">
                  <span className="font-semibold text-accent-teal">{exercise.restSeconds}s</span> rest
                </span>
              )}
            </div>
          )}

          {exercise.targetMuscles?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {exercise.targetMuscles.slice(0, 3).map(m => (
                <span key={m} className="text-[10px] text-text-secondary bg-bg-elevated px-1.5 py-0.5 rounded-full">
                  {m}
                </span>
              ))}
            </div>
          )}
        </div>

        <button className="text-text-secondary mt-0.5" onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {expanded && exercise.cues?.length > 0 && (
        <div className="px-4 pb-4 border-t border-white/5 pt-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Info size={13} className="text-accent-violet" />
            <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Coaching Cues</span>
          </div>
          <ul className="space-y-1.5">
            {exercise.cues.map((cue, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                <span className="text-accent-violet font-bold mt-0.5">•</span>
                {cue}
              </li>
            ))}
          </ul>
          {exercise.equipment?.length > 0 && (
            <div className="mt-3 pt-2 border-t border-white/5">
              <span className="text-xs text-text-secondary">Equipment: </span>
              <span className="text-xs text-text-primary">{exercise.equipment.join(', ')}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
