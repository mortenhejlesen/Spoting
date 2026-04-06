import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Apple, Flame, Zap, Droplets, Clock, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import Header from '../components/navigation/Header.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';
import MealCard from '../components/nutrition/MealCard.jsx';
import {
  getDayType,
  getNutritionTimeline,
  getDailyNutritionFocus,
  getMacroTargets,
} from '../engine/nutritionEngine.js';

// ─── Day type display config ─────────────────────────────────────────────────

const DAY_TYPE_CONFIG = {
  'match-day': {
    label: 'Match Day',
    color: '#FFD700',
    bg: 'bg-[#FFD700]/10',
    border: 'border-[#FFD700]/30',
    text: 'text-[#FFD700]',
    icon: '🏆',
    description: 'Peak performance nutrition protocol is active.',
  },
  'pre-match': {
    label: 'Pre-Match',
    color: '#FF6B35',
    bg: 'bg-accent-orange/10',
    border: 'border-accent-orange/30',
    text: 'text-accent-orange',
    icon: '⚡',
    description: 'Glycogen loading phase. Prioritise carbohydrates.',
  },
  'training-day': {
    label: 'Training Day',
    color: '#6C63FF',
    bg: 'bg-accent-violet/10',
    border: 'border-accent-violet/30',
    text: 'text-accent-violet',
    icon: '💪',
    description: 'Fuel your session. Recover fast afterwards.',
  },
  'recovery-day': {
    label: 'Recovery Day',
    color: '#00D4AA',
    bg: 'bg-accent-teal/10',
    border: 'border-accent-teal/30',
    text: 'text-accent-teal',
    icon: '🌿',
    description: 'Anti-inflammatory focus. Repair and rebuild.',
  },
  'rest-day': {
    label: 'Rest Day',
    color: '#8888AA',
    bg: 'bg-white/5',
    border: 'border-white/10',
    text: 'text-text-secondary',
    icon: '😴',
    description: 'Moderate calories. Maintain muscle with quality protein.',
  },
};

// ─── Macro card config ────────────────────────────────────────────────────────

const MACRO_CARDS = [
  { key: 'calories', label: 'Calories', unit: 'kcal', icon: Flame, color: '#FF6B35' },
  { key: 'protein', label: 'Protein', unit: 'g', icon: Zap, color: '#6C63FF' },
  { key: 'carbs', label: 'Carbs', unit: 'g', icon: Apple, color: '#FFD700' },
  { key: 'fat', label: 'Fat', unit: 'g', icon: Droplets, color: '#00D4AA' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(timeStr) {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
}

function isCurrentSlot(timeStr, nextTimeStr) {
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();

  const slotMins = (() => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  })();

  const nextMins = nextTimeStr
    ? (() => {
        const [h, m] = nextTimeStr.split(':').map(Number);
        return h * 60 + m;
      })()
    : slotMins + 120;

  return nowMins >= slotMins && nowMins < nextMins;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function NutritionHub() {
  const { state, actions } = useApp();
  const { profile, nutritionLogs } = state;

  const today = new Date();

  const dayType = useMemo(() => {
    if (!profile) return 'rest-day';
    return getDayType(profile, today);
  }, [profile]);

  const timeline = useMemo(() => {
    if (!profile) return [];
    return getNutritionTimeline(dayType, profile);
  }, [dayType, profile]);

  const macros = useMemo(() => {
    if (!profile) return null;
    const shouldShow =
      profile.nutritionTracking === 'macros' || profile.nutritionTracking === 'full';
    if (!shouldShow) return null;
    return getMacroTargets(profile, dayType);
  }, [profile, dayType]);

  const dayConfig = DAY_TYPE_CONFIG[dayType] || DAY_TYPE_CONFIG['rest-day'];

  const todayStr = today.toISOString().slice(0, 10);
  const todayCompletedIds = useMemo(() => {
    return new Set(
      nutritionLogs
        .filter((log) => String(log.date).slice(0, 10) === todayStr && log.completed)
        .map((log) => log.mealId)
    );
  }, [nutritionLogs, todayStr]);

  const totalMeals = timeline.reduce((sum, slot) => sum + slot.meals.length, 0);
  const completedMeals = timeline.reduce(
    (sum, slot) => sum + slot.meals.filter((m) => todayCompletedIds.has(m.id)).length,
    0
  );
  const completionPct = totalMeals > 0 ? Math.round((completedMeals / totalMeals) * 100) : 0;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary pb-24">
      <Header
        title="Nutrition"
        subtitle={getDailyNutritionFocus(dayType)}
        rightAction={
          dayType === 'match-day' ? (
            <button
              onClick={() => actions.navigate('match-nutrition')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full text-[#FFD700] text-xs font-semibold"
            >
              Full Plan
              <ChevronRight size={12} />
            </button>
          ) : undefined
        }
      />

      <div className="px-4 space-y-5">
        {/* Day type banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`rounded-2xl border p-4 flex items-center gap-4 ${dayConfig.bg} ${dayConfig.border}`}
        >
          <div className="text-3xl leading-none">{dayConfig.icon}</div>
          <div className="flex-1">
            <div className={`text-lg font-bold leading-tight ${dayConfig.text}`}>
              {dayConfig.label}
            </div>
            <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
              {dayConfig.description}
            </p>
          </div>
          {dayType === 'match-day' && (
            <button
              onClick={() => actions.navigate('match-nutrition')}
              className="w-9 h-9 rounded-full bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0"
            >
              <ChevronRight size={16} className="text-[#FFD700]" />
            </button>
          )}
        </motion.div>

        {/* Completion bar */}
        {totalMeals > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-text-secondary uppercase tracking-wider">
                  Today's Progress
                </span>
                <span className="text-xs font-semibold text-text-primary font-mono">
                  {completedMeals} / {totalMeals} meals
                </span>
              </div>
              <div className="w-full bg-bg-elevated rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: dayConfig.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPct}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                />
              </div>
              <p className="text-xs text-text-secondary mt-2">
                {completionPct === 100
                  ? '✓ All meals logged — excellent discipline today.'
                  : completionPct >= 50
                  ? `Halfway there — keep ticking off meals as you go.`
                  : `Tap any meal card to mark it as eaten.`}
              </p>
            </Card>
          </motion.div>
        )}

        {/* Macro targets */}
        {macros && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <p className="text-xs text-text-secondary uppercase tracking-wider mb-2">
              Daily Targets
            </p>
            <div className="grid grid-cols-4 gap-2">
              {MACRO_CARDS.map(({ key, label, unit, icon: Icon, color }) => (
                <div
                  key={key}
                  className="bg-bg-card rounded-xl p-3 flex flex-col items-center gap-1 border border-white/5"
                >
                  <Icon size={14} style={{ color }} />
                  <span
                    className="text-base font-bold font-mono leading-tight"
                    style={{ color }}
                  >
                    {macros[key]}
                  </span>
                  <span className="text-[9px] text-text-secondary leading-none">{unit}</span>
                  <span className="text-[9px] text-text-secondary leading-none">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Timeline */}
        <div>
          <p className="text-xs text-text-secondary uppercase tracking-wider mb-3">
            Today's Timeline
          </p>

          {timeline.length === 0 ? (
            <Card>
              <p className="text-sm text-text-secondary text-center py-4">
                No nutrition plan available — complete your profile to get personalised meals.
              </p>
            </Card>
          ) : (
            <motion.div
              className="space-y-0"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {timeline.map((slot, index) => {
                const isCurrent = isCurrentSlot(
                  slot.time,
                  timeline[index + 1]?.time || null
                );
                const isPast = (() => {
                  const now = new Date();
                  const nowMins = now.getHours() * 60 + now.getMinutes();
                  const [h, m] = slot.time.split(':').map(Number);
                  return nowMins > h * 60 + m + 60;
                })();

                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex gap-3"
                  >
                    {/* Timeline spine */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full flex-shrink-0 mt-4 z-10 transition-colors ${
                          isCurrent
                            ? 'bg-accent-violet ring-2 ring-accent-violet/40 ring-offset-1 ring-offset-bg-primary'
                            : isPast
                            ? 'bg-accent-teal'
                            : 'bg-bg-elevated border-2 border-white/20'
                        }`}
                      />
                      {index < timeline.length - 1 && (
                        <div
                          className={`w-px flex-1 mt-1 mb-0 min-h-[20px] ${
                            isPast ? 'bg-accent-teal/40' : 'bg-white/10'
                          }`}
                        />
                      )}
                    </div>

                    {/* Slot content */}
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1.5">
                          <Clock size={11} className="text-text-secondary" />
                          <span
                            className={`text-xs font-mono font-semibold ${
                              isCurrent ? 'text-accent-violet' : 'text-text-secondary'
                            }`}
                          >
                            {formatTime(slot.time)}
                          </span>
                        </div>
                        {isCurrent && (
                          <span className="px-1.5 py-0.5 bg-accent-violet/20 text-accent-violet text-[9px] font-bold rounded-full uppercase tracking-wide">
                            Now
                          </span>
                        )}
                      </div>

                      <h3
                        className={`text-sm font-semibold mb-1.5 ${
                          isCurrent ? 'text-text-primary' : isPast ? 'text-text-secondary' : 'text-text-primary'
                        }`}
                      >
                        {slot.label}
                      </h3>

                      {slot.notes && (
                        <p className="text-xs text-text-secondary leading-relaxed mb-3">
                          {slot.notes}
                        </p>
                      )}

                      {slot.meals && slot.meals.length > 0 && (
                        <div className="space-y-2">
                          {slot.meals.slice(0, 2).map((meal) => (
                            <MealCard
                              key={meal.id}
                              meal={meal}
                              showMacros={!!macros}
                            />
                          ))}
                          {slot.meals.length > 2 && (
                            <p className="text-xs text-text-secondary pl-1">
                              +{slot.meals.length - 2} more options available
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Match day CTA */}
        {dayType !== 'match-day' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => actions.navigate('match-nutrition')}
              className="w-full p-4 bg-bg-card border border-white/5 rounded-2xl flex items-center justify-between group hover:border-accent-violet/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 flex items-center justify-center text-xl">
                  🏆
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-text-primary">Match Day Plan</p>
                  <p className="text-xs text-text-secondary">Full T-12hr ladder ready</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-text-secondary group-hover:text-accent-violet transition-colors" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
