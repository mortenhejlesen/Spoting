import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Wind,
  Heart,
  Moon,
  Clock,
  Calendar,
  Trophy,
  Filter,
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import Header from '../components/navigation/Header.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';
import { exerciseLibrary } from '../data/exerciseLibrary.js';

// ─── Config ───────────────────────────────────────────────────────────────────

const SESSION_CONFIG = {
  strength: {
    icon: Dumbbell,
    color: '#6C63FF',
    bg: 'bg-accent-violet/10',
    border: 'border-accent-violet/30',
    label: 'Strength',
    variant: 'strength',
  },
  mobility: {
    icon: Heart,
    color: '#00D4AA',
    bg: 'bg-accent-teal/10',
    border: 'border-accent-teal/30',
    label: 'Mobility',
    variant: 'mobility',
  },
  conditioning: {
    icon: Wind,
    color: '#FF6B35',
    bg: 'bg-accent-orange/10',
    border: 'border-accent-orange/30',
    label: 'Conditioning',
    variant: 'conditioning',
  },
  recovery: {
    icon: Heart,
    color: '#4CAF50',
    bg: 'bg-accent-green/10',
    border: 'border-accent-green/30',
    label: 'Recovery',
    variant: 'recovery',
  },
  rest: {
    icon: Moon,
    color: '#8888AA',
    bg: 'bg-white/5',
    border: 'border-white/10',
    label: 'Rest',
    variant: 'rest',
  },
};

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getWeekDates(weekOffset = 0) {
  const now = new Date();
  // Anchor to Monday of the current week
  const dayOfWeek = now.getDay(); // 0=Sun
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7) + weekOffset * 7);
  monday.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function isToday(date) {
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

function formatWeekRange(dates) {
  const start = dates[0];
  const end = dates[6];
  const opts = { month: 'short', day: 'numeric' };
  return `${start.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString('en-US', opts)}`;
}

function formatDayDate(date) {
  return date.getDate();
}

function resolveExerciseName(id) {
  const ex = exerciseLibrary[id];
  return ex ? ex.name : id;
}

function getPlanForDate(weeklyPlan, date) {
  if (!weeklyPlan?.days) return null;
  return weeklyPlan.days.find(day => {
    const d = new Date(day.date);
    return (
      d.getDate() === date.getDate() &&
      d.getMonth() === date.getMonth() &&
      d.getFullYear() === date.getFullYear()
    );
  }) || null;
}

function getUniqueSports(weeklyPlan) {
  if (!weeklyPlan?.days) return [];
  const sports = new Set();
  weeklyPlan.days.forEach(d => { if (d.sport) sports.add(d.sport); });
  return ['all', ...sports];
}

// ─── Day Card ─────────────────────────────────────────────────────────────────

function DayCard({ date, plan, dayLabel, onTap, sportFilter }) {
  const today = isToday(date);
  const sessionType = plan?.sessionType || 'rest';
  const cfg = SESSION_CONFIG[sessionType] || SESSION_CONFIG.rest;
  const Icon = cfg.icon;
  const exercises = plan?.exercises || [];
  const resolvedExercises = exercises.slice(0, 4).map(id => resolveExerciseName(id));
  const matchDay = plan?.matchDay || false;

  // Filter by sport if needed
  if (sportFilter && sportFilter !== 'all' && plan?.sport && plan.sport !== sportFilter) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      onClick={onTap}
      className={`bg-bg-card rounded-2xl overflow-hidden cursor-pointer transition-all ${
        today
          ? 'border-2 border-accent-violet shadow-[0_0_20px_rgba(108,99,255,0.15)]'
          : 'border border-white/5'
      }`}
    >
      {/* Card header */}
      <div className={`flex items-center justify-between px-4 py-3 ${today ? 'bg-accent-violet/10' : 'bg-bg-elevated/40'}`}>
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center ${cfg.bg} border ${cfg.border}`}
          >
            <Icon size={15} style={{ color: cfg.color }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold ${today ? 'text-accent-violet' : 'text-text-primary'}`}>
                {dayLabel}
              </span>
              {today && (
                <span className="text-[9px] font-bold bg-accent-violet text-white px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                  Today
                </span>
              )}
            </div>
            <span className="text-xs text-text-secondary">{formatDayDate(date)} {date.toLocaleDateString('en-US', { month: 'short' })}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {matchDay && (
            <span className="text-base" title="Match Day">⚽</span>
          )}
          {plan?.estimatedDuration && (
            <div className="flex items-center gap-1 bg-bg-card px-2 py-1 rounded-lg">
              <Clock size={10} className="text-text-secondary" />
              <span className="text-[10px] font-mono text-text-secondary">{plan.estimatedDuration}m</span>
            </div>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="px-4 py-3 space-y-2.5">
        {/* Session type + sport badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={cfg.variant}>{cfg.label}</Badge>
          {plan?.sport && (
            <Badge sport={plan.sport} className="capitalize">{plan.sport}</Badge>
          )}
          {matchDay && (
            <Badge variant="orange">Match Day</Badge>
          )}
        </div>

        {/* Exercise list */}
        {resolvedExercises.length > 0 ? (
          <div className="space-y-1">
            {resolvedExercises.map((name, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.color }} />
                <span className="text-xs text-text-secondary leading-tight truncate">{name}</span>
              </div>
            ))}
            {exercises.length > 4 && (
              <p className="text-[10px] text-text-secondary pl-3">
                +{exercises.length - 4} more exercises
              </p>
            )}
          </div>
        ) : (
          <p className="text-xs text-text-secondary italic">
            {sessionType === 'rest' ? 'Rest & recovery — no session today.' : 'No exercises scheduled.'}
          </p>
        )}

        {/* Reasoning */}
        {plan?.reasoning && (
          <p className="text-[10px] text-text-secondary leading-relaxed border-l-2 border-white/10 pl-2.5 italic line-clamp-2">
            {plan.reasoning}
          </p>
        )}

        {/* Nutrition focus */}
        {plan?.nutritionFocus && (
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="text-[10px] text-text-secondary">Nutrition:</span>
            <span className="text-[10px] text-accent-teal font-medium capitalize">{plan.nutritionFocus}</span>
          </div>
        )}
      </div>

      {/* Tap affordance */}
      {today && (
        <div className="px-4 pb-3">
          <div className="w-full py-2 bg-accent-violet/15 border border-accent-violet/30 rounded-xl text-center text-xs font-bold text-accent-violet">
            Start Today's Session →
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── Week summary strip ───────────────────────────────────────────────────────

function WeekSummary({ weekDates, weeklyPlan, sportFilter }) {
  const stats = useMemo(() => {
    let sessions = 0;
    let totalMins = 0;
    let matchDays = 0;
    weekDates.forEach(date => {
      const plan = getPlanForDate(weeklyPlan, date);
      if (plan && plan.sessionType !== 'rest') sessions++;
      if (plan?.estimatedDuration) totalMins += plan.estimatedDuration;
      if (plan?.matchDay) matchDays++;
    });
    return { sessions, totalMins, matchDays };
  }, [weekDates, weeklyPlan]);

  return (
    <div className="grid grid-cols-3 gap-2">
      <Card className="text-center py-3 !p-3">
        <div className="text-xl font-bold font-mono text-accent-violet">{stats.sessions}</div>
        <div className="text-[10px] text-text-secondary mt-0.5">Sessions</div>
      </Card>
      <Card className="text-center py-3 !p-3">
        <div className="text-xl font-bold font-mono text-accent-teal">{stats.totalMins}</div>
        <div className="text-[10px] text-text-secondary mt-0.5">Minutes</div>
      </Card>
      <Card className="text-center py-3 !p-3">
        <div className="text-xl font-bold font-mono text-[#FFD700]">{stats.matchDays}</div>
        <div className="text-[10px] text-text-secondary mt-0.5">Match Days</div>
      </Card>
    </div>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function WeeklyProgram() {
  const { state, actions } = useApp();
  const { weeklyPlan, profile } = state;
  const [weekOffset, setWeekOffset] = useState(0);
  const [sportFilter, setSportFilter] = useState('all');

  const weekDates = useMemo(() => getWeekDates(weekOffset), [weekOffset]);
  const uniqueSports = useMemo(() => getUniqueSports(weeklyPlan), [weeklyPlan]);

  const isPrevDisabled = weekOffset <= -4;
  const isNextDisabled = weekOffset >= 4;

  const handleDayTap = (plan) => {
    if (plan && plan.sessionType !== 'rest') {
      actions.navigate('today');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary pb-24">
      <Header title="This Week" subtitle={profile?.name ? `${profile.name}'s Program` : 'Training Program'} />

      <div className="px-4 space-y-4">
        {/* Week navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between bg-bg-card border border-white/5 rounded-2xl p-3"
        >
          <button
            onClick={() => !isPrevDisabled && setWeekOffset(o => o - 1)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              isPrevDisabled ? 'opacity-30 cursor-not-allowed' : 'bg-bg-elevated hover:bg-white/10 text-text-secondary hover:text-text-primary'
            }`}
          >
            <ChevronLeft size={18} />
          </button>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <Calendar size={13} className="text-text-secondary" />
              <span className="text-sm font-semibold text-text-primary">
                {formatWeekRange(weekDates)}
              </span>
            </div>
            {weekOffset === 0 && (
              <span className="text-[10px] text-accent-violet font-semibold">Current Week</span>
            )}
            {weekOffset < 0 && (
              <span className="text-[10px] text-text-secondary">{Math.abs(weekOffset)} week{Math.abs(weekOffset) > 1 ? 's' : ''} ago</span>
            )}
            {weekOffset > 0 && (
              <span className="text-[10px] text-accent-teal font-semibold">Week +{weekOffset}</span>
            )}
          </div>

          <button
            onClick={() => !isNextDisabled && setWeekOffset(o => o + 1)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              isNextDisabled ? 'opacity-30 cursor-not-allowed' : 'bg-bg-elevated hover:bg-white/10 text-text-secondary hover:text-text-primary'
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </motion.div>

        {/* Week summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <WeekSummary weekDates={weekDates} weeklyPlan={weeklyPlan} sportFilter={sportFilter} />
        </motion.div>

        {/* Sport filter tabs */}
        {uniqueSports.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide"
          >
            <Filter size={13} className="text-text-secondary flex-shrink-0" />
            {uniqueSports.map(sport => (
              <button
                key={sport}
                onClick={() => setSportFilter(sport)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  sportFilter === sport
                    ? 'bg-accent-violet text-white'
                    : 'bg-bg-card border border-white/10 text-text-secondary'
                }`}
              >
                {sport === 'all' ? 'All Sports' : sport.charAt(0).toUpperCase() + sport.slice(1)}
              </button>
            ))}
          </motion.div>
        )}

        {/* No plan state */}
        {!weeklyPlan && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="text-center py-10">
              <Trophy size={32} className="text-text-secondary mx-auto mb-3" />
              <p className="text-text-primary font-semibold mb-1">No program generated yet</p>
              <p className="text-xs text-text-secondary mb-4">
                Complete your athlete profile to get your personalised weekly program.
              </p>
              <button
                onClick={() => actions.navigate('profile')}
                className="mx-auto px-5 py-2.5 gradient-violet text-white text-sm font-bold rounded-xl"
              >
                Set Up Profile
              </button>
            </Card>
          </motion.div>
        )}

        {/* Day cards */}
        {weeklyPlan && (
          <div className="space-y-3">
            {weekDates.map((date, i) => {
              const plan = getPlanForDate(weeklyPlan, date);
              // For past weeks, we still show cards but clearly marked
              return (
                <DayCard
                  key={i}
                  date={date}
                  plan={plan}
                  dayLabel={DAY_LABELS[i]}
                  onTap={() => handleDayTap(plan)}
                  sportFilter={sportFilter}
                />
              );
            })}
          </div>
        )}

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card>
            <p className="text-[10px] text-text-secondary uppercase tracking-wider mb-2.5">Session Types</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(SESSION_CONFIG).map(([type, cfg]) => {
                const Icon = cfg.icon;
                return (
                  <div key={type} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${cfg.bg} border ${cfg.border}`}>
                      <Icon size={11} style={{ color: cfg.color }} />
                    </div>
                    <span className="text-xs text-text-secondary">{cfg.label}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
