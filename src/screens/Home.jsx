import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Zap, ChevronRight, X, Dumbbell, Wind, Heart, Moon } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';
import { getTodaysPlan } from '../engine/programEngine.js';
import { getSimpleFatigueLabel } from '../engine/fatigueEngine.js';

const SESSION_ICONS = {
  strength: { icon: Dumbbell, color: '#6C63FF', label: 'Strength' },
  mobility: { icon: Heart, color: '#00D4AA', label: 'Mobility' },
  conditioning: { icon: Wind, color: '#FF6B35', label: 'Conditioning' },
  recovery: { icon: Heart, color: '#4CAF50', label: 'Recovery' },
  rest: { icon: Moon, color: '#8888AA', label: 'Rest Day' },
};

const FATIGUE_PILLS = {
  Fresh: { bg: 'bg-accent-green/20', text: 'text-accent-green', border: 'border-accent-green/30' },
  Moderate: { bg: 'bg-sport-tennis/20', text: 'text-sport-tennis', border: 'border-sport-tennis/30' },
  Fatigued: { bg: 'bg-accent-orange/20', text: 'text-accent-orange', border: 'border-accent-orange/30' },
  Rest: { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/30' },
};

const LOAD_COLORS = {
  rest: '#8888AA',
  light: '#4CAF50',
  moderate: '#FFD700',
  hard: '#FF6B35',
};

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatDate(date = new Date()) {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

function getWeekStrip(weeklyPlan) {
  const today = new Date();
  const days = [];
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - today.getDay() + 1 + i); // Mon-Sun
    const plan = weeklyPlan?.days?.find(day => new Date(day.date).toDateString() === d.toDateString());
    days.push({
      label: dayLabels[i],
      date: d,
      isToday: d.toDateString() === today.toDateString(),
      sessionType: plan?.sessionType || 'rest',
      matchDay: plan?.matchDay || false,
    });
  }
  return days;
}

export default function Home() {
  const { state, actions } = useApp();
  const { profile, weeklyPlan, sessionLogs, notifications } = state;

  const todaysPlan = useMemo(() => getTodaysPlan(weeklyPlan), [weeklyPlan]);
  const fatigueLabel = useMemo(() => getSimpleFatigueLabel(sessionLogs), [sessionLogs]);
  const weekStrip = useMemo(() => getWeekStrip(weeklyPlan), [weeklyPlan]);

  const sessionsThisWeek = useMemo(() => {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
    return sessionLogs.filter(s => new Date(s.date) >= weekStart).length;
  }, [sessionLogs]);

  const streak = useMemo(() => {
    if (!sessionLogs.length) return 0;
    let s = 0;
    const today = new Date();
    for (let i = 0; i < 60; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const hasSession = sessionLogs.some(log => new Date(log.date).toDateString() === d.toDateString());
      if (hasSession) s++;
      else if (i > 0) break;
    }
    return s;
  }, [sessionLogs]);

  const matchSoon = weeklyPlan?.days?.find(d => {
    const diff = (new Date(d.date) - new Date()) / 86400000;
    return d.matchDay && diff >= 0 && diff <= 1;
  });

  const sessionConfig = SESSION_ICONS[todaysPlan?.sessionType] || SESSION_ICONS.rest;
  const fatigueStyle = FATIGUE_PILLS[fatigueLabel] || FATIGUE_PILLS.Fresh;

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary pb-24">
      {/* Notification Banners */}
      {notifications.length > 0 && (
        <div className="px-4 pt-3 space-y-2">
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-3 bg-accent-violet/10 border border-accent-violet/20 rounded-xl"
            >
              <span className="text-lg">{n.icon || '🔔'}</span>
              <span className="text-sm text-text-primary flex-1">{n.message}</span>
              <button onClick={() => actions.dismissNotification(n.id)} className="text-text-secondary">
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      <div className="px-4 pt-6 space-y-5">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">
                {getGreeting()}{profile?.name ? `, ${profile.name}` : ''}
              </h1>
              <p className="text-text-secondary text-sm mt-0.5">{formatDate()}</p>
            </div>
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${fatigueStyle.bg} ${fatigueStyle.text} ${fatigueStyle.border}`}>
              {fatigueLabel}
            </span>
          </div>

          {/* Sport badges */}
          {profile?.sports?.length > 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {profile.sports.map(sport => (
                <Badge key={sport} sport={sport} className="capitalize">{sport}</Badge>
              ))}
            </div>
          )}
        </motion.div>

        {/* Match Day Alert */}
        {matchSoon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-sport-tennis/10 border border-sport-tennis/30 rounded-card p-4 flex items-center gap-3"
            onClick={() => actions.navigate('match-nutrition')}
          >
            <span className="text-2xl">🏆</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-sport-tennis">
                {matchSoon.matchDay && new Date(matchSoon.date).toDateString() === new Date().toDateString()
                  ? 'Match Day — Nutrition plan active'
                  : 'Match Tomorrow — Nutrition plan activated'}
              </p>
              <p className="text-xs text-text-secondary mt-0.5">Tap to see your match day ladder</p>
            </div>
            <ChevronRight size={16} className="text-sport-tennis" />
          </motion.div>
        )}

        {/* Today's Plan Card */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="bg-bg-card rounded-card overflow-hidden border border-white/5">
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">Today's Session</p>
                  <div className="flex items-center gap-2">
                    <sessionConfig.icon size={18} style={{ color: sessionConfig.color }} />
                    <h2 className="text-xl font-bold text-text-primary">{sessionConfig.label}</h2>
                  </div>
                </div>
                {todaysPlan?.estimatedDuration && (
                  <span className="text-sm text-text-secondary font-mono">{todaysPlan.estimatedDuration} min</span>
                )}
              </div>

              {todaysPlan?.exercises?.length > 0 && (
                <p className="text-sm text-text-secondary mb-4">
                  {todaysPlan.exercises.slice(0, 3).join(' · ')}{todaysPlan.exercises.length > 3 ? ` +${todaysPlan.exercises.length - 3} more` : ''}
                </p>
              )}

              {todaysPlan?.reasoning && (
                <p className="text-xs text-text-secondary italic mb-4 leading-relaxed border-l-2 border-accent-violet/40 pl-3">
                  {todaysPlan.reasoning}
                </p>
              )}

              {todaysPlan?.sport && (
                <Badge sport={todaysPlan.sport} className="mb-4 capitalize">{todaysPlan.sport}</Badge>
              )}

              {todaysPlan?.sessionType !== 'rest' ? (
                <button
                  onClick={() => actions.navigate('today')}
                  className="w-full py-3.5 gradient-violet text-white font-bold rounded-xl text-base flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <Zap size={18} />
                  Start Session
                </button>
              ) : (
                <div className="w-full py-3.5 bg-bg-elevated text-text-secondary font-semibold rounded-xl text-base text-center">
                  Rest Day — Recovery
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Weekly Load Strip */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <p className="text-xs text-text-secondary uppercase tracking-wider mb-3">This Week</p>
            <div className="flex gap-1.5">
              {weekStrip.map((day, i) => {
                const color = LOAD_COLORS[day.sessionType] || LOAD_COLORS.rest;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className={`w-full h-8 rounded-lg transition-all ${day.isToday ? 'ring-2 ring-white/40 ring-offset-1 ring-offset-bg-card' : ''}`}
                      style={{ backgroundColor: `${color}30`, border: `1px solid ${color}50` }}
                    >
                      {day.matchDay && (
                        <div className="w-full h-full flex items-center justify-center text-[10px]">⚽</div>
                      )}
                    </div>
                    <span className={`text-[10px] font-semibold ${day.isToday ? 'text-text-primary' : 'text-text-secondary'}`}>
                      {day.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3 mt-3 flex-wrap">
              {Object.entries(LOAD_COLORS).map(([key, color]) => (
                <div key={key} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-[10px] text-text-secondary capitalize">{key}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <div className="grid grid-cols-3 gap-3">
            <Card className="text-center py-4">
              <div className="text-2xl font-bold font-mono text-text-primary">{sessionsThisWeek}</div>
              <div className="text-xs text-text-secondary mt-0.5">Sessions</div>
              <div className="text-[10px] text-text-secondary">this week</div>
            </Card>
            <Card className="text-center py-4">
              <div className="text-2xl font-bold font-mono text-accent-orange">{streak}</div>
              <div className="text-xs text-text-secondary mt-0.5">Day Streak</div>
              <div className="text-[10px] text-text-secondary">🔥</div>
            </Card>
            <Card
              className="text-center py-4"
              onClick={() => actions.navigate('fatigue')}
            >
              <div className="text-2xl font-bold font-mono" style={{ color: state.fatigueStatus?.color || '#4CAF50' }}>
                {state.fatigueStatus?.ratio?.toFixed(1) || '—'}
              </div>
              <div className="text-xs text-text-secondary mt-0.5">Load Ratio</div>
              <div className="text-[10px] text-text-secondary">tap for details</div>
            </Card>
          </div>
        </motion.div>

        {/* Recent Activity */}
        {sessionLogs.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-text-secondary uppercase tracking-wider">Recent Activity</p>
                <button onClick={() => actions.navigate('progress')} className="text-xs text-accent-violet">See all</button>
              </div>
              <div className="space-y-3">
                {sessionLogs.slice(-3).reverse().map((log, i) => {
                  const cfg = SESSION_ICONS[log.sessionType] || SESSION_ICONS.rest;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cfg.color}20` }}>
                        <cfg.icon size={16} style={{ color: cfg.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-text-primary capitalize">{log.sessionType} Session</div>
                        <div className="text-xs text-text-secondary">
                          {new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          {log.duration ? ` · ${log.duration} min` : ''}
                          {log.rpe ? ` · RPE ${log.rpe}` : ''}
                        </div>
                      </div>
                      {log.sport && <Badge sport={log.sport} className="text-[10px] capitalize">{log.sport}</Badge>}
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
