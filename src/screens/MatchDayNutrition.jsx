import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Coffee,
  Droplets,
  Clock,
  ChevronRight,
  Info,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import Header from '../components/navigation/Header.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';
import MealCard from '../components/nutrition/MealCard.jsx';
import { getMatchDayLadder } from '../engine/nutritionEngine.js';

// ─── Node config ─────────────────────────────────────────────────────────────

const PHASE_COLORS = {
  loading: { color: '#6C63FF', bg: 'bg-accent-violet/10', border: 'border-accent-violet/30', text: 'text-accent-violet' },
  fuelling: { color: '#FF6B35', bg: 'bg-accent-orange/10', border: 'border-accent-orange/30', text: 'text-accent-orange' },
  matchday: { color: '#FFD700', bg: 'bg-[#FFD700]/10', border: 'border-[#FFD700]/30', text: 'text-[#FFD700]' },
  kickoff: { color: '#4CAF50', bg: 'bg-accent-green/10', border: 'border-accent-green/30', text: 'text-accent-green' },
  recovery: { color: '#00D4AA', bg: 'bg-accent-teal/10', border: 'border-accent-teal/30', text: 'text-accent-teal' },
};

function getPhase(offsetLabel) {
  if (!offsetLabel || offsetLabel === 'Match / Kick-off') return 'kickoff';
  if (offsetLabel.includes('+')) return 'recovery';
  const mins = parseTotalMinutes(offsetLabel);
  if (mins >= 720) return 'loading';
  if (mins >= 90) return 'fuelling';
  return 'matchday';
}

function parseTotalMinutes(offsetLabel) {
  if (!offsetLabel || offsetLabel.includes('+')) return 0;
  const hrMatch = offsetLabel.match(/T-(\d+)hr/);
  const minMatch = offsetLabel.match(/(\d+)min/);
  const hrs = hrMatch ? parseInt(hrMatch[1], 10) : 0;
  const mins = minMatch ? parseInt(minMatch[1], 10) : 0;
  return hrs * 60 + mins;
}

function formatTime12h(timeStr) {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
}

function isNodeNow(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  const slotMins = h * 60 + m;
  const nowMins = new Date().getHours() * 60 + new Date().getMinutes();
  return Math.abs(nowMins - slotMins) < 60;
}

function isNodePast(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  const slotMins = h * 60 + m;
  const nowMins = new Date().getHours() * 60 + new Date().getMinutes();
  return nowMins > slotMins + 60;
}

// Special callout for caffeine window (T-45min)
const CAFFEINE_WINDOW_LABEL = 'T-45min';

// ─── Component ────────────────────────────────────────────────────────────────

export default function MatchDayNutrition() {
  const { state, actions } = useApp();
  const { profile } = state;
  const [expandedSlot, setExpandedSlot] = useState(null);
  const [showHydrationTip, setShowHydrationTip] = useState(false);

  const matchTime = profile?.matchTime || '15:00';
  const primarySport = profile?.sports?.[0] || 'football';

  const ladder = useMemo(() => {
    if (!profile) return [];
    return getMatchDayLadder(profile, matchTime);
  }, [profile, matchTime]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary pb-24">
      <Header
        title="Match Day Plan"
        showBack
        backTo="nutrition"
        subtitle={`Kick-off ${formatTime12h(matchTime)}`}
      />

      <div className="px-4 space-y-5">
        {/* Sport + activation notice */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 flex-wrap"
        >
          <Badge sport={primarySport} className="capitalize">{primarySport}</Badge>
          {profile?.sports?.slice(1).map(s => (
            <Badge key={s} sport={s} className="capitalize">{s}</Badge>
          ))}
        </motion.div>

        {/* Warning banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-2xl p-4 flex items-start gap-3"
        >
          <AlertTriangle size={18} className="text-[#FFD700] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-[#FFD700]">This plan activates automatically on match days</p>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">
              Your nutrition hub switches to this protocol when a match is scheduled. Stick to familiar foods — match day is not the time to experiment.
            </p>
          </div>
        </motion.div>

        {/* Kick-off hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-bg-card border border-[#FFD700]/20 rounded-2xl p-5 text-center"
        >
          <div className="text-4xl mb-2">🏆</div>
          <p className="text-xs text-text-secondary uppercase tracking-widest mb-1">Kick-off</p>
          <p className="text-3xl font-bold font-mono text-[#FFD700]">{formatTime12h(matchTime)}</p>
          <p className="text-xs text-text-secondary mt-2">
            Your nutrition window opens 12 hours before this time.
          </p>
        </motion.div>

        {/* Hydration quick tip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <button
            onClick={() => setShowHydrationTip(v => !v)}
            className="w-full flex items-center justify-between p-3.5 bg-accent-teal/10 border border-accent-teal/20 rounded-xl"
          >
            <div className="flex items-center gap-2">
              <Droplets size={16} className="text-accent-teal" />
              <span className="text-sm font-semibold text-accent-teal">Hydration Protocol</span>
            </div>
            <Info size={14} className="text-accent-teal/70" />
          </button>
          {showHydrationTip && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-accent-teal/5 border border-accent-teal/20 border-t-0 rounded-b-xl px-4 pb-4"
            >
              <div className="pt-3 space-y-2">
                {[
                  { time: 'T-12hr', action: '500–750ml water through the morning' },
                  { time: 'T-3hr', action: '500ml water or electrolyte drink with pre-match meal' },
                  { time: 'T-2hr', action: '300–400ml isotonic drink or water' },
                  { time: 'T-15min', action: '150–200ml — no more. Sip, don\'t gulp.' },
                  { time: 'Half-time', action: '200ml isotonic drink only' },
                  { time: 'Post-match', action: 'Aim for 150% of fluid lost. Weigh yourself to estimate.' },
                ].map(tip => (
                  <div key={tip.time} className="flex gap-3 items-start">
                    <span className="text-[10px] font-bold text-accent-teal bg-accent-teal/10 px-1.5 py-0.5 rounded-md font-mono flex-shrink-0 mt-0.5">{tip.time}</span>
                    <span className="text-xs text-text-secondary leading-relaxed">{tip.action}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Caffeine callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="bg-[#6C63FF]/10 border border-[#6C63FF]/30 rounded-xl p-4 flex items-start gap-3"
        >
          <Coffee size={18} className="text-accent-violet flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-accent-violet">Caffeine Window — T-45min to T-60min</p>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">
              Optional: <span className="text-text-primary font-semibold">3–6mg/kg bodyweight</span> caffeine (1–2 cups of coffee or a caffeine gel).
              Shown to improve sprint performance, reaction time, and decision-making.
              Avoid if caffeine-sensitive or not practiced in training.
            </p>
            {profile?.weight && (
              <p className="text-xs text-accent-violet mt-1.5 font-mono">
                Your range: {Math.round(3 * profile.weight)}–{Math.round(6 * profile.weight)}mg
                ({Math.round(3 * profile.weight / 100)}-{Math.round(6 * profile.weight / 100)} cups est.)
              </p>
            )}
          </div>
        </motion.div>

        {/* Timeline */}
        <div>
          <p className="text-xs text-text-secondary uppercase tracking-wider mb-4">
            Nutrition Ladder
          </p>

          {ladder.length === 0 ? (
            <Card>
              <p className="text-sm text-text-secondary text-center py-6">
                Complete your profile to generate your personalised match day plan.
              </p>
              <button
                onClick={() => actions.navigate('profile')}
                className="w-full py-3 mt-2 bg-accent-violet/10 border border-accent-violet/30 text-accent-violet text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
              >
                Set Up Profile <ChevronRight size={14} />
              </button>
            </Card>
          ) : (
            <motion.div
              className="relative"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Vertical spine line */}
              <div className="absolute left-[18px] top-5 bottom-5 w-px bg-white/8 z-0" />

              <div className="space-y-0">
                {ladder.map((slot, index) => {
                  const phase = getPhase(slot.offsetLabel);
                  const cfg = PHASE_COLORS[phase];
                  const isNow = isNodeNow(slot.time);
                  const isPast = isNodePast(slot.time);
                  const isKickoff = slot.offsetLabel === 'Match / Kick-off';
                  const isExpanded = expandedSlot === index;

                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex gap-4 relative z-10"
                    >
                      {/* Node dot */}
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0 border-2 transition-all ${
                            isKickoff
                              ? 'bg-[#FFD700] border-[#FFD700] shadow-[0_0_12px_#FFD70050]'
                              : isNow
                              ? `${cfg.bg} ${cfg.border} ring-2 ring-offset-1 ring-offset-bg-primary`
                              : isPast
                              ? 'bg-bg-elevated border-accent-teal/40'
                              : `bg-bg-card ${cfg.border}`
                          }`}
                          style={isNow ? { ringColor: cfg.color } : {}}
                        >
                          {isKickoff ? (
                            <span className="text-sm">🏆</span>
                          ) : isPast ? (
                            <span className="text-[10px] text-accent-teal font-bold">✓</span>
                          ) : (
                            <Zap size={12} style={{ color: cfg.color }} />
                          )}
                        </div>
                        {index < ladder.length - 1 && (
                          <div className={`w-px flex-1 mt-1 min-h-[16px] ${isPast ? 'bg-accent-teal/30' : 'bg-white/8'}`} />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-4">
                        {/* Time + offset badge */}
                        <div className="flex items-center gap-2 mb-1.5 mt-1.5 flex-wrap">
                          <span
                            className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-md border ${cfg.bg} ${cfg.border} ${cfg.text}`}
                          >
                            {slot.offsetLabel}
                          </span>
                          <span className="text-xs font-mono text-text-secondary">
                            {formatTime12h(slot.time)}
                          </span>
                          {isNow && (
                            <span className="text-[9px] font-bold bg-accent-violet text-white px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                              Now
                            </span>
                          )}
                        </div>

                        {/* Label */}
                        <h3 className={`text-sm font-bold mb-1 ${isKickoff ? 'text-[#FFD700]' : isPast ? 'text-text-secondary' : 'text-text-primary'}`}>
                          {slot.label}
                        </h3>

                        {/* Notes */}
                        {slot.notes && (
                          <p className="text-xs text-text-secondary leading-relaxed mb-2.5">
                            {slot.notes}
                          </p>
                        )}

                        {/* Meals */}
                        {slot.meals && slot.meals.length > 0 && (
                          <div className="space-y-2">
                            {(isExpanded ? slot.meals : slot.meals.slice(0, 1)).map(meal => (
                              <MealCard key={meal.id} meal={meal} showMacros />
                            ))}
                            {slot.meals.length > 1 && (
                              <button
                                onClick={() => setExpandedSlot(isExpanded ? null : index)}
                                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${cfg.bg} ${cfg.border} ${cfg.text}`}
                              >
                                {isExpanded
                                  ? 'Show less'
                                  : `+${slot.meals.length - 1} more option${slot.meals.length > 2 ? 's' : ''}`}
                              </button>
                            )}
                          </div>
                        )}

                        {/* Special slots with no meals */}
                        {(!slot.meals || slot.meals.length === 0) && isKickoff && (
                          <div className="bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-xl p-3 text-center">
                            <p className="text-sm font-bold text-[#FFD700]">Execute your game.</p>
                            <p className="text-xs text-text-secondary mt-0.5">Trust your preparation.</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>

        {/* Performance principles footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <p className="text-xs text-text-secondary uppercase tracking-wider mb-3">Golden Rules</p>
            <div className="space-y-2.5">
              {[
                'Never eat anything new on match day.',
                'Stick to familiar foods you\'ve practiced with in training.',
                'Reduce fibre and fat intake from T-5hr onwards.',
                'Avoid carbonated drinks within 2 hours of kick-off.',
                'Hydration is as important as nutrition — track your sweat rate.',
              ].map((rule, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-accent-violet/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[9px] font-bold text-accent-violet">{i + 1}</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
