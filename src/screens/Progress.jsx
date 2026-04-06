import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, Dumbbell, Apple, Activity, Award, Target,
  BarChart2, CheckCircle, Zap, Calendar, ChevronDown,
} from 'lucide-react';
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

// ─── Tab config ───────────────────────────────────────────────────────────────

const TABS = [
  { id: 'overview',   label: 'Overview',   icon: TrendingUp },
  { id: 'strength',   label: 'Strength',   icon: Dumbbell   },
  { id: 'nutrition',  label: 'Nutrition',  icon: Apple      },
  { id: 'load',       label: 'Load',       icon: Activity   },
];

const SESSION_TYPE_COLORS = {
  strength:     '#6C63FF',
  mobility:     '#00D4AA',
  conditioning: '#FF6B35',
  recovery:     '#4CAF50',
  rest:         '#8888AA',
};

// ─── Utility helpers ──────────────────────────────────────────────────────────

function computeStreak(sessionLogs) {
  if (!sessionLogs.length) return { current: 0, record: 0 };
  const today = new Date();
  let current = 0;
  for (let i = 0; i < 90; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    if (sessionLogs.some(l => new Date(l.date).toDateString() === d.toDateString())) current++;
    else if (i > 0) break;
  }
  const sorted = [...sessionLogs].sort((a, b) => new Date(a.date) - new Date(b.date));
  let record = current, temp = 0;
  let prev = null;
  sorted.forEach(log => {
    const d = new Date(log.date);
    if (prev && (d - prev) / 86400000 <= 1.5) temp++;
    else temp = 1;
    record = Math.max(record, temp);
    prev = d;
  });
  return { current, record };
}

function getPersonalRecords(exerciseLogs, limit = 3) {
  const prs = {};
  exerciseLogs.forEach(log => {
    const max = Math.max(...(log.sets?.map(s => parseFloat(s.weight) || 0) || [0]));
    const maxReps = log.sets?.find(s => parseFloat(s.weight) === max)?.reps || 0;
    if (!prs[log.exerciseId] || max > prs[log.exerciseId].weight) {
      prs[log.exerciseId] = { id: log.exerciseId, weight: max, reps: maxReps, date: log.date };
    }
  });
  return Object.values(prs)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, limit)
    .map(pr => ({ ...pr, name: exerciseLibrary[pr.id]?.name || pr.id }));
}

function computeVolumeData(exerciseLogs, exerciseId) {
  if (!exerciseId) return [];
  return [...exerciseLogs]
    .filter(l => l.exerciseId === exerciseId)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(log => ({
      date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      volume: Math.round(log.sets?.reduce((s, set) => s + (parseFloat(set.weight) || 0) * (parseInt(set.reps) || 0), 0) || 0),
    }));
}

function detectPR(exerciseLogs, exerciseId) {
  const logs = [...exerciseLogs]
    .filter(l => l.exerciseId === exerciseId)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  if (logs.length < 2) return false;
  const lastMax = Math.max(...(logs.at(-1).sets?.map(s => parseFloat(s.weight) || 0) || [0]));
  const prevMax = Math.max(...logs.slice(0, -1).flatMap(l => l.sets?.map(s => parseFloat(s.weight) || 0) || [0]));
  return lastMax > prevMax;
}

function computeNutritionCompliance(sessionLogs, nutritionLogs) {
  if (!sessionLogs.length) return { rate: 0, logged: 0, sessionsWithNutrition: 0 };
  const sessionsWithNutrition = sessionLogs.filter(s => {
    const sessionDate = new Date(s.date).toDateString();
    return nutritionLogs.some(n => new Date(n.date).toDateString() === sessionDate && n.completed);
  }).length;
  return {
    rate: Math.round((sessionsWithNutrition / sessionLogs.length) * 100),
    logged: nutritionLogs.filter(n => n.completed).length,
    sessionsWithNutrition,
  };
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab({ sessionLogs, exerciseLogs, nutritionLogs, profile }) {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const sessionsThisMonth = sessionLogs.filter(s => new Date(s.date) >= monthStart).length;
  const monthTarget = (profile?.trainingDaysPerWeek || 3) * 4;
  const { current: streak, record: bestStreak } = useMemo(() => computeStreak(sessionLogs), [sessionLogs]);
  const prs = useMemo(() => getPersonalRecords(exerciseLogs), [exerciseLogs]);
  const recent = useMemo(() => [...sessionLogs].slice(-5).reverse(), [sessionLogs]);
  const avgDuration = sessionLogs.length > 0
    ? Math.round(sessionLogs.reduce((s, l) => s + (l.duration || 45), 0) / sessionLogs.length)
    : null;

  return (
    <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">

      {/* Month progress */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-text-secondary uppercase tracking-wider">Sessions This Month</p>
            <div className="flex items-end gap-1.5 mt-1">
              <span className="text-3xl font-bold font-mono text-text-primary">{sessionsThisMonth}</span>
              <span className="text-sm text-text-secondary mb-1">/ {monthTarget}</span>
            </div>
          </div>
          <div className="w-16 h-16 relative flex-shrink-0">
            <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1C1C26" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.9" fill="none"
                stroke="#6C63FF" strokeWidth="3"
                strokeDasharray={`${Math.min(monthTarget > 0 ? (sessionsThisMonth / monthTarget) * 100 : 0, 100)} 100`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-accent-violet">
                {monthTarget > 0 ? Math.round((sessionsThisMonth / monthTarget) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
        <ProgressBar value={sessionsThisMonth} max={monthTarget} color="violet" height={7} />
        <p className="text-xs text-text-secondary mt-2">
          {sessionsThisMonth >= monthTarget
            ? 'Monthly target hit. Exceptional consistency.'
            : `${monthTarget - sessionsThisMonth} more session${monthTarget - sessionsThisMonth !== 1 ? 's' : ''} to reach your monthly target.`}
        </p>
      </Card>

      {/* Streak + stats */}
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
              {avgDuration ?? '—'}<span className="text-sm text-text-secondary"> min</span>
            </span>
          </Card>
        </div>
      </div>

      {/* Personal records */}
      {prs.length > 0 && (
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Award size={15} className="text-[#FFD700]" />
            <p className="text-xs text-text-secondary uppercase tracking-wider">Personal Records</p>
          </div>
          <div className="space-y-3">
            {prs.map((pr, i) => (
              <div key={pr.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  i === 0 ? 'bg-[#FFD700]/15 text-[#FFD700]' :
                  i === 1 ? 'bg-[#C0C0C0]/15 text-[#C0C0C0]' :
                            'bg-[#CD7F32]/15 text-[#CD7F32]'
                }`}>#{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary truncate">{pr.name}</p>
                  <p className="text-xs text-text-secondary">
                    {new Date(pr.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    {pr.reps ? ` · ${pr.reps} reps` : ''}
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className="text-lg font-bold font-mono text-[#FFD700]">{pr.weight}</span>
                  <span className="text-xs text-text-secondary"> kg</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recent sessions */}
      {recent.length > 0 ? (
        <Card>
          <p className="text-xs text-text-secondary uppercase tracking-wider mb-3">Recent Sessions</p>
          <div className="space-y-3">
            {recent.map((log, i) => {
              const color = SESSION_TYPE_COLORS[log.sessionType] || '#8888AA';
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: color + '80' }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary capitalize">{log.sessionType} Session</p>
                    <p className="text-xs text-text-secondary">
                      {new Date(log.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      {log.duration ? ` · ${log.duration} min` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {log.sport && <Badge sport={log.sport} className="text-[10px] capitalize">{log.sport}</Badge>}
                    {log.rpe != null && <span className="text-xs font-mono text-text-secondary">RPE {log.rpe}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">🏋️</div>
          <p className="text-text-secondary text-sm">Complete your first session to start tracking progress.</p>
        </div>
      )}
    </motion.div>
  );
}

// ─── Strength Tab ─────────────────────────────────────────────────────────────

function StrengthTab({ exerciseLogs }) {
  const exerciseOptions = useMemo(() => {
    const ids = [...new Set(exerciseLogs.map(l => l.exerciseId))];
    return ids.map(id => ({ id, name: exerciseLibrary[id]?.name || id }));
  }, [exerciseLogs]);

  const [selectedId, setSelectedId] = useState(exerciseOptions[0]?.id || null);
  const [showDropdown, setShowDropdown] = useState(false);

  const volumeData = useMemo(() => computeVolumeData(exerciseLogs, selectedId), [exerciseLogs, selectedId]);
  const isPR = useMemo(() => detectPR(exerciseLogs, selectedId), [exerciseLogs, selectedId]);
  const selectedName = exerciseOptions.find(e => e.id === selectedId)?.name || null;

  const stats = useMemo(() => {
    if (!selectedId) return null;
    const logs = exerciseLogs.filter(l => l.exerciseId === selectedId);
    let maxWeight = 0, totalSets = 0, totalVolume = 0;
    logs.forEach(l => (l.sets || []).forEach(s => {
      totalSets++;
      const w = parseFloat(s.weight) || 0;
      if (w > maxWeight) maxWeight = w;
      totalVolume += w * (parseInt(s.reps) || 0);
    }));
    return { sessions: logs.length, maxWeight, totalSets, totalVolume: Math.round(totalVolume) };
  }, [exerciseLogs, selectedId]);

  const prs = useMemo(() => getPersonalRecords(exerciseLogs, 5), [exerciseLogs]);

  if (!exerciseOptions.length) {
    return (
      <motion.div key="strength-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card className="text-center py-12">
          <Dumbbell size={36} className="text-text-secondary mx-auto mb-3" />
          <p className="text-text-primary font-semibold mb-1">No strength data yet</p>
          <p className="text-xs text-text-secondary">Log sets with weight and reps to track volume over time.</p>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div key="strength" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">

      {/* Exercise selector */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(v => !v)}
          className="w-full flex items-center justify-between p-3.5 bg-bg-card border border-white/10 rounded-xl"
        >
          <div className="flex items-center gap-2">
            <Dumbbell size={14} className="text-accent-violet" />
            <span className="text-sm font-semibold text-text-primary truncate">{selectedName || 'Select exercise'}</span>
          </div>
          <ChevronDown size={14} className={`text-text-secondary transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
        </button>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full mt-1 left-0 right-0 bg-bg-elevated border border-white/10 rounded-xl overflow-hidden z-20 max-h-56 overflow-y-auto"
          >
            {exerciseOptions.map(ex => (
              <button
                key={ex.id}
                onClick={() => { setSelectedId(ex.id); setShowDropdown(false); }}
                className={`w-full text-left px-4 py-3 text-sm transition-colors border-b border-white/5 last:border-0 ${
                  selectedId === ex.id ? 'text-accent-violet bg-accent-violet/10' : 'text-text-primary hover:bg-white/5'
                }`}
              >
                {ex.name}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {selectedId && stats && (
        <>
          {isPR && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 p-3.5 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-xl"
            >
              <Award size={20} className="text-[#FFD700] flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-[#FFD700]">New Personal Record!</p>
                <p className="text-xs text-text-secondary">Last session broke your previous best.</p>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Max', value: `${stats.maxWeight}kg`, color: 'text-accent-violet' },
              { label: 'Sessions', value: stats.sessions, color: 'text-accent-teal' },
              { label: 'Sets', value: stats.totalSets, color: 'text-accent-orange' },
              { label: 'Volume', value: stats.totalVolume > 999 ? `${(stats.totalVolume / 1000).toFixed(1)}t` : `${stats.totalVolume}kg`, color: 'text-[#FFD700]' },
            ].map(s => (
              <Card key={s.label} className="text-center !p-3">
                <div className={`text-base font-bold font-mono ${s.color}`}>{s.value}</div>
                <div className="text-[10px] text-text-secondary mt-0.5">{s.label}</div>
              </Card>
            ))}
          </div>

          <Card>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-text-secondary uppercase tracking-wider">Volume Over Time</p>
              <span className="text-[10px] text-text-secondary">sets × reps × weight</span>
            </div>
            <VolumeChart data={volumeData} exerciseName={selectedName} />
          </Card>

          {exerciseLibrary[selectedId]?.cues?.length > 0 && (
            <Card>
              <p className="text-xs text-text-secondary uppercase tracking-wider mb-3">Coaching Notes</p>
              <div className="space-y-2">
                {exerciseLibrary[selectedId].cues.slice(0, 2).map((cue, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-violet mt-1.5 flex-shrink-0" />
                    <p className="text-xs text-text-secondary leading-relaxed">{cue}</p>
                  </div>
                ))}
              </div>
              {exerciseLibrary[selectedId].targetMuscles?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
                  {exerciseLibrary[selectedId].targetMuscles.map(m => (
                    <span key={m} className="text-[10px] bg-bg-elevated px-2 py-0.5 rounded-full text-text-secondary capitalize">{m}</span>
                  ))}
                </div>
              )}
            </Card>
          )}
        </>
      )}

      {prs.length > 0 && (
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Award size={14} className="text-[#FFD700]" />
            <p className="text-xs text-text-secondary uppercase tracking-wider">All-Time Records</p>
          </div>
          <div className="space-y-3">
            {prs.map((pr, i) => (
              <div key={pr.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  i === 0 ? 'bg-[#FFD700]/15 text-[#FFD700]' :
                  i === 1 ? 'bg-[#C0C0C0]/15 text-[#C0C0C0]' :
                            'bg-[#CD7F32]/15 text-[#CD7F32]'
                }`}>#{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{pr.name}</p>
                  <p className="text-xs text-text-secondary">{new Date(pr.date).toLocaleDateString()}</p>
                </div>
                <span className="text-base font-bold font-mono text-[#FFD700] flex-shrink-0">{pr.weight}kg</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </motion.div>
  );
}

// ─── Nutrition Tab ────────────────────────────────────────────────────────────

function NutritionTab({ sessionLogs, nutritionLogs }) {
  const compliance = useMemo(() => computeNutritionCompliance(sessionLogs, nutritionLogs), [sessionLogs, nutritionLogs]);

  const now = new Date();
  const thisMonthLogged = nutritionLogs.filter(l => {
    const d = new Date(l.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() && l.completed;
  }).length;

  const last7Sessions = sessionLogs.filter(l => (now - new Date(l.date)) / 86400000 <= 7).length;
  const last7Nutrition = nutritionLogs.filter(l => (now - new Date(l.date)) / 86400000 <= 7 && l.completed).length;
  const weeklyRate = last7Sessions > 0 ? Math.round((last7Nutrition / (last7Sessions * 2)) * 100) : 0;

  const timingGroups = useMemo(() => {
    const g = { pre: 0, post: 0, other: 0 };
    nutritionLogs.forEach(l => {
      if (!l.completed) return;
      const t = (l.timing || '').toLowerCase();
      if (t.includes('before') || t.includes('pre')) g.pre++;
      else if (t.includes('after') || t.includes('post') || t.includes('recovery')) g.post++;
      else g.other++;
    });
    return g;
  }, [nutritionLogs]);

  const totalTagged = timingGroups.pre + timingGroups.post + timingGroups.other;

  return (
    <motion.div key="nutrition" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">

      {/* Compliance ring */}
      <Card>
        <p className="text-xs text-text-secondary uppercase tracking-wider mb-4">Meal Plan Compliance</p>
        <div className="flex items-center gap-5">
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="32" fill="none" stroke="#1C1C26" strokeWidth="8" />
              <circle
                cx="40" cy="40" r="32" fill="none"
                stroke="#00D4AA" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${(compliance.rate / 100) * 201} 201`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold font-mono text-text-primary">{compliance.rate}%</span>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-text-secondary">This week</span>
                <span className="font-semibold text-text-primary">{weeklyRate}%</span>
              </div>
              <ProgressBar value={weeklyRate} max={100} color="teal" height={6} />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-text-secondary">All time</span>
                <span className="font-semibold text-text-primary">{compliance.sessionsWithNutrition}/{sessionLogs.length}</span>
              </div>
              <ProgressBar value={compliance.sessionsWithNutrition} max={sessionLogs.length || 1} color="violet" height={6} />
            </div>
          </div>
        </div>
        <p className="text-xs text-text-secondary mt-3 leading-relaxed">
          Eating within 30 minutes of a session maximises glycogen replenishment and muscle protein synthesis. Aim for 100%.
        </p>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="text-center py-4">
          <div className="text-2xl font-bold font-mono text-accent-teal">{thisMonthLogged}</div>
          <div className="text-xs text-text-secondary mt-1">Meals This Month</div>
        </Card>
        <Card className="text-center py-4">
          <div className="text-2xl font-bold font-mono text-accent-violet">{nutritionLogs.filter(l => l.completed).length}</div>
          <div className="text-xs text-text-secondary mt-1">Total Logged</div>
        </Card>
      </div>

      {/* Timing breakdown */}
      {totalTagged > 0 && (
        <Card>
          <p className="text-xs text-text-secondary uppercase tracking-wider mb-3">Meal Timing Breakdown</p>
          <div className="space-y-3">
            {[
              { label: 'Pre-Session Meals',     value: timingGroups.pre,   color: 'violet', icon: Zap          },
              { label: 'Post-Session Recovery', value: timingGroups.post,  color: 'teal',   icon: CheckCircle  },
              { label: 'Other Meals Logged',    value: timingGroups.other, color: 'orange', icon: Apple        },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Icon size={12} className={`text-accent-${item.color}`} />
                      <span className="text-xs text-text-secondary">{item.label}</span>
                    </div>
                    <span className="text-xs font-semibold text-text-primary">{item.value}</span>
                  </div>
                  <ProgressBar value={item.value} max={totalTagged} color={item.color} height={5} />
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {nutritionLogs.length === 0 && (
        <Card className="text-center py-10">
          <Apple size={32} className="text-text-secondary mx-auto mb-3" />
          <p className="text-text-primary font-semibold mb-1">No meals logged yet</p>
          <p className="text-xs text-text-secondary">Tap "Mark as Eaten" on meals in the Nutrition hub to track compliance.</p>
        </Card>
      )}
    </motion.div>
  );
}

// ─── Load Tab ─────────────────────────────────────────────────────────────────

function LoadTab({ sessionLogs, fatigueStatus }) {
  const ratio = useMemo(
    () => fatigueStatus?.ratio ?? (sessionLogs.length ? calculateACRatio(sessionLogs) : 1.0),
    [sessionLogs, fatigueStatus]
  );
  const status = useMemo(
    () => fatigueStatus ?? getFatigueStatus(ratio),
    [fatigueStatus, ratio]
  );

  const loadHistoryData = useMemo(
    () => getLoadHistory(sessionLogs).map((load, i) => ({ week: `W${i + 1}`, load: Math.round(load) })),
    [sessionLogs]
  );
  const rpeTrend = useMemo(
    () => getRPETrend(sessionLogs).map(d => ({
      date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      rpe: d.rpe,
    })),
    [sessionLogs]
  );

  const now = new Date();
  const acuteLoad = useMemo(() => {
    const total = sessionLogs.filter(l => (now - new Date(l.date)) / 86400000 <= 7)
      .reduce((s, l) => s + (l.rpe || 0) * (l.duration || 0), 0);
    return Math.round(total / 7);
  }, [sessionLogs]);

  const chronicLoad = useMemo(() => {
    const total = sessionLogs.filter(l => (now - new Date(l.date)) / 86400000 <= 28)
      .reduce((s, l) => s + (l.rpe || 0) * (l.duration || 0), 0);
    return Math.round(total / 28);
  }, [sessionLogs]);

  return (
    <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">

      {/* Gauge */}
      <Card>
        <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">Acute:Chronic Workload Ratio</p>
        <p className="text-[10px] text-text-secondary mb-4">7-day load ÷ 28-day load · Gabbett (2016) model</p>
        <LoadGauge ratio={ratio} status={status?.status || 'No Data'} color={status?.color || '#8888AA'} />
        {status?.recommendation && (
          <div
            className="mt-4 p-3 rounded-xl border text-sm font-semibold text-center"
            style={{ backgroundColor: `${status.color}15`, borderColor: `${status.color}30`, color: status.color }}
          >
            {status.recommendation}
          </div>
        )}
      </Card>

      {/* Acute / Chronic */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="text-center py-4">
          <div className="text-2xl font-bold font-mono text-accent-orange">{acuteLoad}</div>
          <div className="text-xs text-text-secondary mt-1">Acute Load</div>
          <div className="text-[10px] text-text-secondary">7-day avg</div>
        </Card>
        <Card className="text-center py-4">
          <div className="text-2xl font-bold font-mono text-accent-violet">{chronicLoad}</div>
          <div className="text-xs text-text-secondary mt-1">Chronic Load</div>
          <div className="text-[10px] text-text-secondary">28-day avg</div>
        </Card>
      </div>

      {/* Load history */}
      <Card>
        <div className="flex items-center gap-2 mb-1">
          <BarChart2 size={13} className="text-accent-violet" />
          <p className="text-xs text-text-secondary uppercase tracking-wider">4-Week Load History</p>
        </div>
        <p className="text-[10px] text-text-secondary mb-3">Weekly session load totals (RPE × minutes)</p>
        <LoadBarChart data={loadHistoryData} />
      </Card>

      {/* RPE trend */}
      <Card>
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={13} className="text-accent-teal" />
          <p className="text-xs text-text-secondary uppercase tracking-wider">RPE Trend</p>
        </div>
        <p className="text-[10px] text-text-secondary mb-3">Perceived exertion — last 14 sessions</p>
        <RPETrendChart data={rpeTrend} />
      </Card>

      {/* Zone guide */}
      <Card>
        <p className="text-xs text-text-secondary uppercase tracking-wider mb-3">ACWR Zone Reference</p>
        <div className="space-y-2.5">
          {[
            { zone: 'Under',    range: '< 0.8',      color: '#3B82F6', desc: 'Below optimal load. Increase training gradually.' },
            { zone: 'Optimal',  range: '0.8 – 1.29', color: '#4CAF50', desc: 'Sweet spot. Maintain current load.' },
            { zone: 'Caution',  range: '1.3 – 1.49', color: '#FF9800', desc: 'Elevated injury risk. Prioritise recovery.' },
            { zone: 'Danger',   range: '≥ 1.5',      color: '#FF6B35', desc: 'High injury risk. Reduce load immediately.' },
          ].map(z => (
            <div key={z.zone} className="flex items-center gap-3">
              <div className="w-1.5 h-9 rounded-full flex-shrink-0" style={{ backgroundColor: z.color }} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-text-primary">{z.zone}</span>
                  <span className="text-[10px] font-mono text-text-secondary">{z.range}</span>
                </div>
                <p className="text-[10px] text-text-secondary leading-tight">{z.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function Progress() {
  const { state, actions } = useApp();
  const { sessionLogs, exerciseLogs, nutritionLogs, profile, fatigueStatus } = state;
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col pb-24">
      <Header
        title="Progress"
        subtitle={profile?.name ? `${profile.name}'s Analytics` : 'Performance Analytics'}
      />

      {/* Tab bar */}
      <div className="px-4 pt-2">
        <div className="flex gap-1 bg-bg-card rounded-2xl p-1 overflow-x-auto scrollbar-hide border border-white/5">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-fit flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all relative ${
                  active ? 'text-white' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="progress-tab-bg"
                    className="absolute inset-0 bg-accent-violet rounded-xl"
                    transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                  />
                )}
                <Icon size={13} className="relative z-10" />
                <span className="whitespace-nowrap relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 mt-4 space-y-4 pb-2">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <OverviewTab
              key="overview"
              sessionLogs={sessionLogs}
              exerciseLogs={exerciseLogs}
              nutritionLogs={nutritionLogs}
              profile={profile}
            />
          )}
          {activeTab === 'strength' && (
            <StrengthTab key="strength" exerciseLogs={exerciseLogs} />
          )}
          {activeTab === 'nutrition' && (
            <NutritionTab key="nutrition" sessionLogs={sessionLogs} nutritionLogs={nutritionLogs} />
          )}
          {activeTab === 'load' && (
            <LoadTab key="load" sessionLogs={sessionLogs} fatigueStatus={fatigueStatus} />
          )}
        </AnimatePresence>

        {/* Full fatigue monitor link — always visible in load tab */}
        {activeTab === 'load' && (
          <button
            onClick={() => actions.navigate('fatigue')}
            className="w-full py-3 bg-accent-violet/10 border border-accent-violet/30 text-accent-violet font-semibold rounded-xl text-sm"
          >
            View Full Fatigue Monitor →
          </button>
        )}
      </div>
    </div>
  );
}
