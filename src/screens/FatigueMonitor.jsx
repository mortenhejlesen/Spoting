import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, TrendingDown, Minus, Flag } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import Header from '../components/navigation/Header.jsx';
import Card from '../components/ui/Card.jsx';
import LoadGauge from '../components/progress/LoadGauge.jsx';
import { LoadBarChart, RPETrendChart } from '../components/progress/VolumeChart.jsx';
import {
  calculateACRatio,
  getFatigueStatus,
  getLoadHistory,
  getRPETrend,
} from '../engine/fatigueEngine.js';

export default function FatigueMonitor() {
  const { state, actions } = useApp();
  const { sessionLogs, injuryFlags } = state;

  const ratio = useMemo(() => calculateACRatio(sessionLogs), [sessionLogs]);
  const status = useMemo(() => getFatigueStatus(ratio), [ratio]);
  const loadHistory = useMemo(() => getLoadHistory(sessionLogs), [sessionLogs]);
  const rpeTrend = useMemo(() => getRPETrend(sessionLogs), [sessionLogs]);

  const hasEnoughData = sessionLogs.length >= 3;

  const zoneInfo = {
    under: { icon: TrendingDown, label: 'Undertraining', desc: 'You can safely increase training load.' },
    optimal: { icon: TrendingUp, label: 'Optimal Load', desc: 'Maintain your current training rhythm.' },
    caution: { icon: Minus, label: 'Caution Zone', desc: 'Reduce session intensity for the next 2-3 days.' },
    danger: { icon: AlertTriangle, label: 'High Risk Zone', desc: 'Take 1-2 full rest days before training hard again.' },
  };

  const zoneData = zoneInfo[status.zone] || zoneInfo.optimal;
  const ZoneIcon = zoneData.icon;

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col pb-24">
      <Header title="Fatigue & Load" subtitle="Acute:Chronic Workload Ratio" showBack backTo="progress" />

      <div className="px-4 space-y-5">

        {/* ACWR Gauge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card glow={status.zone === 'optimal' ? 'teal' : status.zone === 'danger' ? 'violet' : undefined}>
            <p className="text-xs text-text-secondary uppercase tracking-wider text-center mb-4">
              Acute : Chronic Workload Ratio
            </p>
            {hasEnoughData ? (
              <LoadGauge ratio={ratio} status={status.status} color={status.color} />
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">📊</div>
                <p className="text-text-secondary text-sm">Log at least 3 sessions to see your load ratio</p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Recommendation */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div
            className="rounded-card p-4 flex items-start gap-4 border"
            style={{ backgroundColor: `${status.color}15`, borderColor: `${status.color}30` }}
          >
            <ZoneIcon size={24} style={{ color: status.color }} className="flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-text-primary mb-1">{zoneData.label}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{status.recommendation || zoneData.desc}</p>
            </div>
          </div>
        </motion.div>

        {/* Zone legend */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          <Card>
            <p className="text-xs text-text-secondary uppercase tracking-wider mb-3">Load Zones</p>
            <div className="space-y-2">
              {[
                { range: '< 0.8', label: 'Undertraining', color: '#3B82F6', desc: 'Increase volume gradually' },
                { range: '0.8 – 1.3', label: 'Optimal', color: '#4CAF50', desc: 'Sweet spot for adaptation' },
                { range: '1.3 – 1.5', label: 'Caution', color: '#FF9800', desc: 'Monitor fatigue closely' },
                { range: '> 1.5', label: 'High Risk', color: '#FF6B35', desc: 'Injury risk elevated' },
              ].map(zone => (
                <div key={zone.label} className="flex items-center gap-3">
                  <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: zone.color }} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold font-mono" style={{ color: zone.color }}>{zone.range}</span>
                      <span className="text-xs font-medium text-text-primary">{zone.label}</span>
                    </div>
                    <span className="text-[11px] text-text-secondary">{zone.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 4-Week Load History */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <p className="text-xs text-text-secondary uppercase tracking-wider mb-3">4-Week Load History</p>
            <LoadBarChart data={loadHistory.map((load, i) => ({
              week: `W-${3 - i}`,
              load: Math.round(load),
            }))} />
          </Card>
        </motion.div>

        {/* RPE Trend */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card>
            <p className="text-xs text-text-secondary uppercase tracking-wider mb-3">RPE Trend (Last 14 Sessions)</p>
            <RPETrendChart data={rpeTrend.map(d => ({
              date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              rpe: d.rpe,
            }))} />
            {rpeTrend.length > 2 && (
              <p className="text-xs text-text-secondary mt-2">
                Average RPE: <span className="text-text-primary font-semibold">
                  {(rpeTrend.reduce((s, d) => s + d.rpe, 0) / rpeTrend.length).toFixed(1)}
                </span>
              </p>
            )}
          </Card>
        </motion.div>

        {/* Injury Flags */}
        {injuryFlags && injuryFlags.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <div className="flex items-center gap-2 mb-3">
                <Flag size={14} className="text-accent-orange" />
                <p className="text-xs text-text-secondary uppercase tracking-wider">Active Injury Flags</p>
              </div>
              <div className="space-y-2">
                {injuryFlags.map((flag, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 bg-accent-orange/10 rounded-lg border border-accent-orange/20">
                    <span className="text-accent-orange text-xs mt-0.5">⚠️</span>
                    <span className="text-sm text-text-primary">{flag}</span>
                    <button
                      onClick={() => {
                        const updated = injuryFlags.filter((_, idx) => idx !== i);
                        actions.setInjuryFlags(updated);
                      }}
                      className="ml-auto text-xs text-text-secondary hover:text-accent-orange"
                    >
                      Clear
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-secondary mt-3 leading-relaxed">
                Flagged injuries are used to automatically filter out contraindicated exercises from your program.
              </p>
            </Card>
          </motion.div>
        )}

        {/* Stats summary */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <div className="grid grid-cols-2 gap-3 pb-4">
            <Card className="text-center py-4">
              <div className="text-2xl font-bold font-mono text-text-primary">{sessionLogs.length}</div>
              <div className="text-xs text-text-secondary mt-0.5">Total Sessions</div>
            </Card>
            <Card className="text-center py-4">
              <div className="text-2xl font-bold font-mono text-accent-teal">
                {sessionLogs.length > 0
                  ? Math.round(sessionLogs.reduce((s, l) => s + (l.duration || 45), 0) / sessionLogs.length)
                  : '—'}
              </div>
              <div className="text-xs text-text-secondary mt-0.5">Avg Duration (min)</div>
            </Card>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
