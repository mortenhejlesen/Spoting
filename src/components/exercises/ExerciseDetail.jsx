import React from 'react';
import { X, ChevronRight } from 'lucide-react';
import Badge from '../ui/Badge.jsx';
import Modal from '../ui/Modal.jsx';
import SetLogger from './SetLogger.jsx';
import Timer from '../ui/Timer.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function ExerciseDetail({ exercise, isOpen, onClose }) {
  const { actions } = useApp();

  if (!exercise) return null;

  const handleLogSet = (setData) => {
    actions.addExerciseLog({
      exerciseId: exercise.id,
      date: new Date().toISOString(),
      sets: [{ reps: setData.reps, weight: setData.weight }],
    });
  };

  const isTimedExercise = !!exercise.duration && exercise.category !== 'strength';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={exercise.name}>
      <div className="space-y-5">
        {/* Category & muscles */}
        <div className="flex flex-wrap gap-2">
          <Badge variant={exercise.category === 'strength' ? 'strength' : exercise.category === 'mobility' ? 'mobility' : 'conditioning'}>
            {exercise.category}
          </Badge>
          {exercise.targetMuscles?.map(m => (
            <span key={m} className="text-xs text-text-secondary bg-bg-elevated px-2 py-1 rounded-full">{m}</span>
          ))}
        </div>

        {/* Prescription */}
        <div className="grid grid-cols-3 gap-3">
          {exercise.sets && (
            <div className="bg-bg-elevated rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-text-primary font-mono">{exercise.sets}</div>
              <div className="text-xs text-text-secondary mt-0.5">Sets</div>
            </div>
          )}
          {exercise.reps && (
            <div className="bg-bg-elevated rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-text-primary font-mono">{exercise.reps}</div>
              <div className="text-xs text-text-secondary mt-0.5">Reps</div>
            </div>
          )}
          {exercise.duration && (
            <div className="bg-bg-elevated rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-text-primary font-mono">{exercise.duration}s</div>
              <div className="text-xs text-text-secondary mt-0.5">Hold</div>
            </div>
          )}
          {exercise.restSeconds && (
            <div className="bg-bg-elevated rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-accent-teal font-mono">{exercise.restSeconds}s</div>
              <div className="text-xs text-text-secondary mt-0.5">Rest</div>
            </div>
          )}
        </div>

        {/* Timer for timed exercises */}
        {isTimedExercise && (
          <div className="flex justify-center py-2">
            <Timer initialSeconds={exercise.duration} label={`Hold for ${exercise.duration}s`} />
          </div>
        )}

        {/* Coaching cues */}
        {exercise.cues?.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Coaching Cues</h3>
            <ul className="space-y-2">
              {exercise.cues.map((cue, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-text-primary">
                  <span className="w-6 h-6 rounded-full bg-accent-violet/20 text-accent-violet flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {cue}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Set logging for strength */}
        {exercise.category === 'strength' && (
          <div>
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Log Sets</h3>
            <SetLogger exercise={exercise} onLogSet={handleLogSet} />
          </div>
        )}

        {/* Equipment */}
        {exercise.equipment?.length > 0 && (
          <div className="bg-bg-elevated rounded-xl p-3">
            <span className="text-xs text-text-secondary">Equipment needed: </span>
            <span className="text-xs text-text-primary font-medium">{exercise.equipment.join(' · ')}</span>
          </div>
        )}

        {/* Progressions / Regressions */}
        {(exercise.progressions?.length > 0 || exercise.regressions?.length > 0) && (
          <div className="grid grid-cols-2 gap-3">
            {exercise.regressions?.length > 0 && (
              <div className="bg-bg-elevated rounded-xl p-3">
                <div className="text-xs text-text-secondary mb-2">↓ Easier</div>
                <ul className="space-y-1">
                  {exercise.regressions.map((r, i) => (
                    <li key={i} className="text-xs text-text-primary">{r}</li>
                  ))}
                </ul>
              </div>
            )}
            {exercise.progressions?.length > 0 && (
              <div className="bg-bg-elevated rounded-xl p-3">
                <div className="text-xs text-text-secondary mb-2">↑ Harder</div>
                <ul className="space-y-1">
                  {exercise.progressions.map((p, i) => (
                    <li key={i} className="text-xs text-text-primary">{p}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
