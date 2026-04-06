import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Dumbbell, Apple, Activity, Award, Flame, Target } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import Header from '../components/navigation/Header.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import StreakDisplay from '../components/progress/StreakDisplay.jsx';
import { VolumeChart, LoadBarChart, RPETrendChart } from '../components/progress/VolumeChart.jsx';
import LoadGauge from '../components/progress/LoadGauge.jsx';
import { calculateACRatio, getFatigueStatus, getLoadHistory, getRPETrend } from '../engine/fatigueEngine.js';
import { exerciseLibrary } from '../data/exerciseLibrary.js';

const TABS = [
  { id: 'overview', label: 'Overview', icon: TrendingUp },
  { id: 'strength', label: 'Strength', icon: Dumbbell },
  { id: 'nutrition', label: 'Nutrition', icon: Apple },
  { id: 'load', label: 'Load', icon: Activity },
];

export default function Progress() {
  const { state, actions } = useApp();
  const { sessionLogs, exerciseLogs, nutritionLogs, profile } = state;
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedExercise, setSelectedExercise] = useState(null);

  // ─── Overview Calculations ──────────────────────────────────────────
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const sessionsThisMonth = useMemo(() =>
    sessionLogs.filter(s => new Date(s.date) >= monthStart).length,
    [sessionLogs]
  );
  const monthTarget = (profile?.trainingDaysPerWeek || 3) * 4;

  const streak = useMemo(() => {
    if (!sessionLogs.length) return 0;
    let s = 0;
    for (let i = 0; i < 60; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const has = sessionLogs.some(l => new Date(l.date).toDateString() === d.toDateString());
      if (has) s++;
      else if (i > 0) break;
    }
    return s;
  }, [sessionLogs]);

  const bestStreak = useMemo(() => {
    if (!sessionLogs.length) return 0;
    const sorted = [...sessionLogs].sort((a, b) => new Date(a.date) - new Date(b.date));
    let max = 0, curr = 0;
    let prevDate = null;
    sorted.forEach(log => {
      const d = new Date(log.date);
      if (prevDate && (d - prevDate) / 86400000 <= 1.5) {
        curr++;
      } else {
        curr = 1;
      }
      max = Math.max(max, curr);
      prevDate = d;
    });
    return max;
  }, [sessionLogs]);

  // ─── Strength Calculations ───────────────────────────────────────────
  const exerciseOptions = useMemo(() => {
    const ids = [...new Set(exerciseLogs.map(l => l.exerciseId))];
    return ids.map(id => ({ id, name: exerciseLibrary[id]?.name || id }));
  }, [exerciseLogs]);

  const volumeData = useMemo(() => {
    if (!selectedExercise) return [];
    const logs = exerciseLogs
      .filter(l => l.exerciseId === selectedExercise)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return logs.map(log => ({
      date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      volume: log.sets?.reduce((sum, set) => sum + (parseFloat(set.weight) || 0) * (parseInt(set.reps) || 0), 0) || 0,
    }));
  }, [exerciseLogs, selectedExercise]);

  const personalRecords = useMemo(() => {
    const prs = {};
    exerciseLogs.forEach(log => {
      const maxWeight = Math.max(...(log.sets?.map(s => parseFloat(s.weight) || 0) || [0]));
      if (!prs[log.exerciseId] || maxWeight > prs[log.exerciseId].weight) {
        prs[log.exerciseId] = { exerciseId: log.exerciseId, weight: maxWeight, date: log.date };
      }
    });
    return Object.values(prs)
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 3)
      .map(pr => ({ ...pr, name: exerciseLibrary[pr.exerciseId]?.name || pr.exerciseId }));
  }, [exerciseLogs]);

  // ─── Nutrition Calculations ──────────────────────────────────────────
  const nutritionCompliance = useMemo(() => {
    if (!sessionLogs.length) return 0;
    const sessionsWithNutrition = sessionLogs.filter(s => {
      const sessionDate = new Date(s.date).toDateString();
      return nutritionLogs.some(n => new Date(n.date).toDateString() === sessionDate);
    }).length;
    return Math.round((sessionsWithNutrition / sessionLogs.length) * 100);
  }, [sessionLogs, nutritionLogs]);

  // ─── Load Calculations ───────────────────────────────────────────────
  const ratio = useMemo(() => calculateACRatio(sessionLogs), [sessionLogs]);
  const status = useMemo(() => getFatigueStatus(ratio), [ratio]);
  const loadHistory = useMemo(() => getLoadHistory(sessionLogs), [sessionLogs]);
  const rpeTrend = useMemo(() => getRPETrend(sessionLogs), [sessionLogs]);

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col pb-24">
      <Header title="Progress" />

      {/* Tab Bar */}
      <div className="px-4 pt-2">
        <div className="flex gap-1 bg-bg-card rounded-xl p-1 overflow-x-auto scrollbar-hide">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-fit flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  active ? 'bg-accent-violet text-white' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon size={13} />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 mt-4 space-y-4">

        {/* ─── OVERVIEW TAB ─── */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">

            {/* Month Progress */}
            <Card>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-text-secondary uppercase tracking-wider">Sessions This Month</p>
                  <div className="flex items-end gap-1.5 mt-1">
                    <span className="text-3xl font-bold font-mono text-text-primary">{sessionsThisMonth}</span>
                    <span className="text-sm text-text-secondary mb-1">/ {monthTarget}</span>
                  </div>
                </div>
                <div className="w-16 h-16 relative">
                  <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1C1C26" strokeWidth="3" />
                    <circle
                      cx="18" cy="18" r="15.9" fill="none"
                      stroke="#6C63FF" strokeWidth="3"
                      strokeDasharray={`${Math.min((sessionsThisMonth / monthTarget) * 100, 100)} 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-accent-violet">
                      {Math.round((sessionsThisMonth / monthTarget) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
              <ProgressBar value={sessionsThisMonth} max={monthTarget} color="violet" />
            </Card>

            {/* Streak + Stats */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="flex items-center justify-center py-4 col-span-1">
                <StreakDisplay streak={streak} record={bestStreak} />
              </Card>
              <div className="col-span-2 space-y-3">
                <Card className="py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity size={13} className="text-accent-teal" />
                    <span className="text-xs text-text-secondary">Total Sessions</span>
                  </div>
                  <span className="text-2xl font-bold font-mono text-text-primary">{sessionLogs.length}</span>
                </Card>
                <Card className="py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Target size={13} className="text-accent-orange" />
                    <span className="text-xs text-text-secondary">Avg Duration</span>
                  </div>
                  <span className="text-2xl font-bold font-mono text-text-primary">
                    {sessionLogs.length > 0
                      ? Math.round(sessionLogs.reduce((s, l) => s + (l.duration || 45), 0) / sessionLogs.length)
                      : '—'
                    }<span className="text-sm text-text-secondary"> min</span>
                  </span>
                </Card>
              </div>
            </div>

            {/* Personal Records */}
            {personalRecords.length > 0 && (
              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <Award size={15} className="text-sport-tennis" />
                  <p className="text-xs text-text-secondary uppercase tracking-wider">Personal Records</p>
                </div>
                <div className="space-y-3">
                  {personalRecords.map((pr, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{pr.name}</p>
                        <p className="text-xs text-text-secondary">
                          {new Date(pr.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold font-mono text-sport-tennis">{pr.weight}</span>
                        <span className="text-xs text-text-secondary"> kg</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Recent Sessions */}
            {sessionLogs.length > 0 && (
              <Card>
                <p className="text-xs text-text-secondary uppercase tracking-wider mb-3">Recent Sessions</p>
                <div className="space-y-3">
                  {[...sessionLogs].slice(-5).reverse().map((log, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-text-primary capitalize">{log.sessionType}</p>
                        <p className="text-xs text-text-secondary">
                          {new Date(log.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          {log.duration ? ` · ${log.duration} min` : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {log.sport && <Badge sport={log.sport} className="text-[10px] capitalize">{log.sport}</Badge>}
                        {log.rpe && (
                          <span className="text-xs font-bold font-mono text-text-secondary">RPE {log.rpe}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {sessionLogs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-5xl mb-3">🏋️</div>
                <p className="text-text-secondary text-sm">Complete your first session to start tracking progress</p>
                <button
                  onClick={() => actions.navigate('today')}
                  className="mt-4 px-6 py-3 bg-accent-violet text-white font-bold rounded-xl text-sm"
                >
                  Start Today's Session
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* ─── STRENGTH TAB ─── */}
        {activeTab === 'strength' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <Card>
              <p className="text-xs text-text-secondary uppercase tracking-wider mb-3">Volume Over Time</p>
              {exerciseOptions.length > 0 ? (
                <>
                  <select
                    value={selectedExercise || ''}
                    onChange={e => setSelectedExercise(e.target.value)}
                    className="w-full bg-bg-elevated border border-white/10 rounded-xl px-3 py-2.5 text-text-primary text-sm mb-4 focus:border-accent-violet outline-none"
                  >
                    <option value="">Select an exercise</option>
                    {exerciseOptions.map(ex => (
                      <option key={ex.id} value={ex.id}>{ex.name}</option>
                    ))}
                  </select>
                  <VolumeChart data={volumeData} exerciseName={exerciseOptions.find(e => e.id === selectedExercise)?.name} />
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-text-secondary text-sm">Log sets in sessions to track strength progress</p>
                </div>
              )}
            </Card>

            {personalRecords.length > 0 && (
              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <Award size={15} className="text-sport-tennis" />
                  <p className="text-xs text-text-secondary uppercase tracking-wider">All-Time Records</p>
                </div>
                <div className="space-y-3">
                  {personalRecords.map((pr, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-sport-tennis/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-sport-tennis">#{i + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">{pr.name}</p>
                        <p className="text-xs text-text-secondary">{new Date(pr.date).toLocaleDateString()}</p>
                      </div>
                      <span className="text-lg font-bold font-mono text-sport-tennis">{pr.weight}kg</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </motion.div>
        )}

        {/* ─── NUTRITION TAB ─── */}
        {activeTab === 'nutrition' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Card className="text-center py-4">
                <div className="text-3xl font-bold font-mono text-accent-teal">{nutritionCompliance}%</div>
                <div className="text-xs text-text-secondary mt-1">Post-Session<br />Meal Compliance</div>
              </Card>
              <Card className="text-center py-4">
                <div className="text-3xl font-bold font-mono text-accent-violet">{nutritionLogs.length}</div>
                <div className="text-xs text-text-secondary mt-1">Meals<br />Logged</div>
              </Card>
            </div>

            <Card>
              <p className="text-xs text-text-secondary uppercase tracking-wider mb-3">Compliance by Session</p>
              <ProgressBar
                value={nutritionCompliance}
                max={100}
                color="teal"
                label="Post-session meal rate"
                showValue
              />
              <p className="text-xs text-text-secondary mt-3 leading-relaxed">
                Eating within 30 minutes of a session accelerates glycogen replenishment and muscle protein synthesis. Aim for 100% compliance.
              </p>
            </Card>

            {nutritionLogs.length > 0 && (
              <Card>
                <p className="text-xs text-text-secondary uppercase tracking-wider mb-3">Recent Meals Logged</p>
                <div className="space-y-2">
                  {[...nutritionLogs].slice(-5).reverse().map((log, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                      <span className="text-sm text-text-primary">{log.mealId}</span>
                      <span className="text-xs text-text-secondary">
                        {new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </motion.div>
        )}

        {/* ─── LOAD TAB ─── */}
        {activeTab === 'load' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <Card>
              <p className="text-xs text-text-secondary uppercase tracking-wider text-center mb-4">Load Ratio</p>
              <LoadGauge ratio={ratio} status={status.status} color={status.color} />
            </Card>
            <Card>
              <p className="text-xs text-text-secondary uppercase tracking-wider mb-3">4-Week Load History</p>
              <LoadBarChart data={loadHistory.map((load, i) => ({
                week: `W-${3 - i}`,
                load: Math.round(load),
              }))} />
            </Card>
            <Card>
              <p className="text-xs text-text-secondary uppercase tracking-wider mb-3">RPE Trend</p>
              <RPETrendChart data={rpeTrend.map(d => ({
                date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                rpe: d.rpe,
              }))} />
            </Card>
            <button
              onClick={() => actions.navigate('fatigue')}
              className="w-full py-3 bg-accent-violet/10 border border-accent-violet/30 text-accent-violet font-semibold rounded-xl text-sm"
            >
              View Full Fatigue Monitor →
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}
