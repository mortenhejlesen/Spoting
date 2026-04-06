import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Check, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import Header from '../components/navigation/Header.jsx';
import ExerciseCard from '../components/exercises/ExerciseCard.jsx';
import ExerciseDetail from '../components/exercises/ExerciseDetail.jsx';
import RPESlider from '../components/ui/RPESlider.jsx';
import Badge from '../components/ui/Badge.jsx';
import { getTodaysPlan, getExercisesFromIds } from '../engine/programEngine.js';
import { exerciseLibrary } from '../data/exerciseLibrary.js';

const MOOD_OPTIONS = [
  { emoji: '💪', label: 'Strong', value: 'strong' },
  { emoji: '😐', label: 'OK', value: 'ok' },
  { emoji: '😓', label: 'Tired', value: 'tired' },
  { emoji: '🤕', label: 'Something hurts', value: 'hurt' },
];

function BlockSection({ title, exercises, accent, onTapExercise }) {
  const [collapsed, setCollapsed] = useState(false);
  if (!exercises || exercises.length === 0) return null;
  return (
    <div className="mb-4">
      <button
        className="flex items-center justify-between w-full mb-3"
        onClick={() => setCollapsed(c => !c)}
      >
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 rounded-full" style={{ backgroundColor: accent }} />
          <span className="text-sm font-bold text-text-primary uppercase tracking-wider">{title}</span>
        </div>
        {collapsed ? <ChevronDown size={16} className="text-text-secondary" /> : <ChevronUp size={16} className="text-text-secondary" />}
      </button>
      {!collapsed && (
        <div className="space-y-3">
          {exercises.map(ex => (
            <ExerciseCard key={ex.id} exercise={ex} onTap={onTapExercise} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TodaySession() {
  const { state, actions } = useApp();
  const { weeklyPlan } = state;

  const todaysPlan = useMemo(() => getTodaysPlan(weeklyPlan), [weeklyPlan]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [rpe, setRpe] = useState(5);
  const [mood, setMood] = useState('');
  const [showInjuryInput, setShowInjuryInput] = useState(false);
  const [injuryNote, setInjuryNote] = useState('');
  const [duration, setDuration] = useState(0);
  const [startTime] = useState(Date.now());

  // Build exercise blocks from plan
  const blocks = useMemo(() => {
    if (!todaysPlan) return null;
    const allExIds = todaysPlan.exercises || [];
    const all = allExIds.map(id => exerciseLibrary[id]).filter(Boolean);

    // Categorize
    const warmup = all.filter(e => e.category === 'mobility' || (e.category === 'conditioning' && e.id?.includes('warm')));
    const main = all.filter(e => e.category === 'strength' || e.category === 'conditioning');
    const cooldown = all.filter(e => e.category === 'stretch');

    // If no clear split, use all as main
    if (main.length === 0) return { main: all, warmup: [], cooldown: [] };
    return { warmup, main, cooldown };
  }, [todaysPlan]);

  const handleCompleteSession = () => {
    const elapsed = Math.round((Date.now() - startTime) / 60000);
    actions.addSessionLog({
      date: new Date().toISOString(),
      sessionType: todaysPlan?.sessionType || 'training',
      sport: todaysPlan?.sport || state.profile?.sports?.[0],
      duration: elapsed || todaysPlan?.estimatedDuration || 45,
      rpe,
      mood,
      notes: injuryNote,
    });
    if (injuryNote) {
      const current = state.injuryFlags || [];
      actions.setInjuryFlags([...current, injuryNote]);
    }
    setSessionComplete(true);
  };

  if (!todaysPlan || todaysPlan.sessionType === 'rest') {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col">
        <Header title="Today" showBack backTo="home" />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
          <span className="text-6xl">🌙</span>
          <h2 className="text-xl font-bold text-text-primary">Rest Day</h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            Recovery is where adaptation happens. Focus on hydration, nutrition, and sleep tonight.
          </p>
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 12 }}
        >
          <div className="text-7xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Session Complete!</h2>
          <p className="text-text-secondary text-sm mb-6">Recovery window open — eat a protein + carb meal within 30 minutes.</p>
          <div className="bg-bg-card rounded-card p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">RPE logged</span>
              <span className="font-bold text-text-primary">{rpe}/10</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Mood</span>
              <span className="font-bold text-text-primary">{MOOD_OPTIONS.find(m => m.value === mood)?.emoji || '—'}</span>
            </div>
          </div>
          <button
            onClick={() => actions.navigate('nutrition')}
            className="w-full py-3.5 bg-accent-teal/20 border border-accent-teal/30 text-accent-teal font-bold rounded-xl text-base mb-3"
          >
            🍽️ View Recovery Meals
          </button>
          <button
            onClick={() => actions.navigate('home')}
            className="w-full py-3.5 gradient-violet text-white font-bold rounded-xl text-base"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  const sessionConfig = {
    strength: { color: '#6C63FF', label: 'Strength' },
    mobility: { color: '#00D4AA', label: 'Mobility' },
    conditioning: { color: '#FF6B35', label: 'Conditioning' },
    recovery: { color: '#4CAF50', label: 'Recovery' },
  };
  const cfg = sessionConfig[todaysPlan.sessionType] || sessionConfig.strength;

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col pb-32">
      <Header
        title={`${cfg.label} Session`}
        subtitle={todaysPlan.estimatedDuration ? `~${todaysPlan.estimatedDuration} min` : ''}
        showBack
        backTo="home"
      />

      <div className="px-4 space-y-2 mb-4">
        <div className="flex items-center gap-2">
          {todaysPlan.sport && <Badge sport={todaysPlan.sport} className="capitalize">{todaysPlan.sport}</Badge>}
          <Badge variant={todaysPlan.sessionType}>{cfg.label}</Badge>
        </div>

        {todaysPlan.reasoning && (
          <div className="bg-bg-card rounded-xl p-3 border border-white/5">
            <p className="text-xs text-text-secondary italic leading-relaxed">
              💡 {todaysPlan.reasoning}
            </p>
          </div>
        )}
      </div>

      <div className="px-4">
        {blocks && (
          <>
            <BlockSection title="Warm-Up" exercises={blocks.warmup} accent="#00D4AA" onTapExercise={setSelectedExercise} />
            <BlockSection title="Main Block" exercises={blocks.main} accent={cfg.color} onTapExercise={setSelectedExercise} />
            <BlockSection title="Cool-Down" exercises={blocks.cooldown} accent="#4CAF50" onTapExercise={setSelectedExercise} />
          </>
        )}

        {/* Session Completion Form */}
        <div className="bg-bg-card rounded-card p-5 mt-4 space-y-5 border border-white/5">
          <h3 className="font-bold text-text-primary">Complete Session</h3>

          <RPESlider value={rpe} onChange={setRpe} />

          <div>
            <p className="text-sm text-text-secondary mb-3">How do you feel?</p>
            <div className="grid grid-cols-4 gap-2">
              {MOOD_OPTIONS.map(m => (
                <button
                  key={m.value}
                  onClick={() => {
                    setMood(m.value);
                    if (m.value === 'hurt') setShowInjuryInput(true);
                  }}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all ${
                    mood === m.value ? 'border-accent-violet bg-accent-violet/10' : 'border-white/10 bg-bg-elevated'
                  }`}
                >
                  <span className="text-xl">{m.emoji}</span>
                  <span className="text-[10px] text-text-secondary">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {showInjuryInput && (
            <div>
              <label className="text-sm text-text-secondary block mb-1.5">Describe what hurts</label>
              <input
                type="text"
                placeholder="e.g. Left knee pain on squats"
                value={injuryNote}
                onChange={(e) => setInjuryNote(e.target.value)}
                className="w-full bg-bg-elevated border border-accent-orange/30 rounded-xl px-3 py-2.5 text-text-primary text-sm focus:border-accent-orange outline-none"
              />
            </div>
          )}

          <button
            onClick={handleCompleteSession}
            className="w-full py-4 gradient-violet text-white font-bold rounded-xl text-base flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Check size={18} />
            Complete Session
          </button>
        </div>
      </div>

      {/* Exercise Detail Modal */}
      <ExerciseDetail
        exercise={selectedExercise}
        isOpen={!!selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />
    </div>
  );
}
