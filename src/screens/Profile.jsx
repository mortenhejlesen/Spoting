import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Settings, LogOut, ChevronRight, Shield, Dumbbell,
  Apple, AlertTriangle, X, Trophy, Target, RefreshCw,
  CheckCircle, ChevronDown, Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import Header from '../components/navigation/Header.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';

// ─── Display maps ─────────────────────────────────────────────────────────────

const FITNESS_LABELS = {
  beginner:      { label: 'Beginner',       emoji: '🌱', variant: 'teal'   },
  recreational:  { label: 'Recreational',   emoji: '⚡', variant: 'violet' },
  intermediate:  { label: 'Intermediate',   emoji: '🏋️', variant: 'violet' },
  competitive:   { label: 'Competitive',    emoji: '🏆', variant: 'orange' },
  advanced:      { label: 'Advanced',       emoji: '🔥', variant: 'orange' },
  elite:         { label: 'Elite',          emoji: '🌟', variant: 'green'  },
};

const GOAL_LABELS = {
  'injury-prevention': { label: 'Injury Prevention', emoji: '🛡️' },
  'performance':       { label: 'Performance Gains', emoji: '⚡' },
  'fitness':           { label: 'Fitness & Conditioning', emoji: '🏃' },
  'weight':            { label: 'Weight Management', emoji: '⚖️' },
  'muscle':            { label: 'Build Muscle', emoji: '💪' },
  'return':            { label: 'Return from Injury', emoji: '🔄' },
  'maintenance':       { label: 'Maintenance', emoji: '🔒' },
};

const GYM_LABELS = {
  full:        { label: 'Full Gym', emoji: '🏋️' },
  home:        { label: 'Home Setup', emoji: '🏠' },
  bodyweight:  { label: 'Bodyweight Only', emoji: '🤸' },
};

const TRACKING_LABELS = {
  simple:  'Simple (no tracking)',
  macros:  'Macro Tracking',
  full:    'Full Nutrition Logging',
};

const DIETARY_COLORS = {
  vegan:          'bg-accent-green/10 text-accent-green border-accent-green/30',
  vegetarian:     'bg-accent-teal/10 text-accent-teal border-accent-teal/30',
  'gluten-free':  'bg-accent-orange/10 text-accent-orange border-accent-orange/30',
  'dairy-free':   'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30',
  halal:          'bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30',
  kosher:         'bg-accent-violet/10 text-accent-violet border-accent-violet/30',
  'nut-free':     'bg-accent-orange/10 text-accent-orange border-accent-orange/30',
};

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ icon: Icon, title, iconColor, children, className = '' }) {
  return (
    <Card className={className}>
      <div className="flex items-center gap-2 mb-4">
        <Icon size={15} style={{ color: iconColor }} />
        <p className="text-xs text-text-secondary uppercase tracking-wider font-semibold">{title}</p>
      </div>
      {children}
    </Card>
  );
}

// ─── Row component ────────────────────────────────────────────────────────────

function InfoRow({ label, value, valueClass = 'text-text-primary' }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-text-secondary">{label}</span>
      <span className={`text-sm font-medium ${valueClass}`}>{value || '—'}</span>
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ name }) {
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AT';
  return (
    <div className="relative">
      <div className="w-22 h-22 w-24 h-24 rounded-full gradient-violet flex items-center justify-center shadow-[0_0_30px_rgba(108,99,255,0.3)]">
        <span className="text-3xl font-bold text-white">{initials}</span>
      </div>
      <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-accent-green border-2 border-bg-primary flex items-center justify-center">
        <CheckCircle size={13} className="text-white" />
      </div>
    </div>
  );
}

// ─── Add injury flag form ─────────────────────────────────────────────────────

const COMMON_INJURY_FLAGS = [
  'Knee pain', 'Lower back', 'Shoulder', 'Hamstring', 'Ankle', 'Hip flexor',
  'Achilles', 'Calf', 'Groin', 'Neck', 'Elbow', 'Wrist',
];

function AddInjuryFlag({ onAdd }) {
  const [custom, setCustom] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (flag) => {
    if (flag.trim()) {
      onAdd(flag.trim());
      setCustom('');
      setShowForm(false);
    }
  };

  return (
    <div className="mt-3">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="text-xs text-accent-violet flex items-center gap-1"
        >
          + Add injury flag
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-2"
        >
          <div className="flex flex-wrap gap-1.5">
            {COMMON_INJURY_FLAGS.map(f => (
              <button
                key={f}
                onClick={() => handleAdd(f)}
                className="text-[10px] bg-accent-orange/10 text-accent-orange border border-accent-orange/20 px-2 py-1 rounded-lg hover:bg-accent-orange/20 transition-colors"
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={custom}
              onChange={e => setCustom(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd(custom)}
              placeholder="Custom flag..."
              className="flex-1 bg-bg-elevated border border-white/10 rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-secondary/50 outline-none focus:border-accent-orange/50"
            />
            <button
              onClick={() => handleAdd(custom)}
              className="px-3 py-2 bg-accent-orange/20 text-accent-orange text-sm font-semibold rounded-lg border border-accent-orange/30"
            >
              Add
            </button>
            <button onClick={() => setShowForm(false)} className="p-2 text-text-secondary">
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function Profile() {
  const { state, actions } = useApp();
  const { profile, injuryFlags, settings, sessionLogs } = state;
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [units, setUnits] = useState(settings?.units || 'kg');
  const [regenerating, setRegenerating] = useState(false);

  const initials = profile?.name
    ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AT';

  const fitnessConfig = FITNESS_LABELS[profile?.fitnessLevel] || FITNESS_LABELS.recreational;
  const goalConfig = GOAL_LABELS[profile?.primaryGoal] || null;
  const gymConfig = GYM_LABELS[profile?.gymAccess] || null;

  const totalTrainingMins = useMemo(
    () => sessionLogs.reduce((s, l) => s + (l.duration || 0), 0),
    [sessionLogs]
  );

  const handleResetProfile = () => {
    localStorage.clear();
    window.location.reload();
  };

  const toggleUnits = () => {
    const newUnits = units === 'kg' ? 'lbs' : 'kg';
    setUnits(newUnits);
    actions.updateSettings({ units: newUnits });
  };

  const handleRegeneratePlan = () => {
    setRegenerating(true);
    actions.regeneratePlan?.();
    setTimeout(() => setRegenerating(false), 1200);
  };

  const handleRemoveInjuryFlag = (index) => {
    const updated = (injuryFlags || []).filter((_, i) => i !== index);
    actions.setInjuryFlags(updated);
  };

  const handleAddInjuryFlag = (flag) => {
    actions.setInjuryFlags([...(injuryFlags || []), flag]);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col pb-24">
      <Header title="Profile" />

      <div className="px-4 space-y-5">

        {/* ── Avatar + name ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center pt-2 pb-2"
        >
          <Avatar name={profile?.name} />
          <h2 className="text-2xl font-bold text-text-primary mt-4">{profile?.name || 'Athlete'}</h2>
          <div className="flex flex-wrap gap-2 justify-center mt-2.5">
            {profile?.sports?.map(sport => (
              <Badge key={sport} sport={sport} className="capitalize">{sport}</Badge>
            ))}
            {profile?.fitnessLevel && (
              <Badge variant={fitnessConfig.variant}>
                {fitnessConfig.emoji} {fitnessConfig.label}
              </Badge>
            )}
          </div>
        </motion.div>

        {/* ── Stats row ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 }}
        >
          <div className="grid grid-cols-3 gap-3">
            <Card className="text-center py-3">
              <div className="text-2xl font-bold font-mono text-accent-violet">{profile?.trainingDaysPerWeek || '—'}</div>
              <div className="text-[10px] text-text-secondary mt-0.5">Days / Week</div>
            </Card>
            <Card className="text-center py-3">
              <div className="text-2xl font-bold font-mono text-accent-teal">{sessionLogs.length}</div>
              <div className="text-[10px] text-text-secondary mt-0.5">Sessions</div>
            </Card>
            <Card className="text-center py-3">
              <div className="text-2xl font-bold font-mono text-accent-orange">
                {totalTrainingMins >= 60 ? `${Math.floor(totalTrainingMins / 60)}h` : `${totalTrainingMins}m`}
              </div>
              <div className="text-[10px] text-text-secondary mt-0.5">Total Time</div>
            </Card>
          </div>
        </motion.div>

        {/* ── My Sports ─────────────────────────────────────────────────── */}
        {profile?.sports?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
            <Section icon={Trophy} title="My Sports" iconColor="#6C63FF">
              <div className="space-y-2">
                {profile.sports.map(sport => {
                  const position = profile.positions?.[sport];
                  return (
                    <div key={sport} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-2.5">
                        <Badge sport={sport} className="capitalize">{sport}</Badge>
                      </div>
                      {position && (
                        <span className="text-xs text-text-secondary bg-bg-elevated px-2 py-1 rounded-lg">
                          {position}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </Section>
          </motion.div>
        )}

        {/* ── Training Settings ─────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
          <Section icon={Dumbbell} title="Training Settings" iconColor="#00D4AA">
            <div className="divide-y divide-white/5">
              <InfoRow
                label="Training days/week"
                value={profile?.trainingDaysPerWeek ? `${profile.trainingDaysPerWeek} days` : null}
                valueClass="text-accent-violet font-semibold"
              />
              <InfoRow
                label="Primary goal"
                value={goalConfig ? `${goalConfig.emoji} ${goalConfig.label}` : null}
              />
              <InfoRow
                label="Gym access"
                value={gymConfig ? `${gymConfig.emoji} ${gymConfig.label}` : null}
              />
              <InfoRow
                label="Match schedule"
                value={
                  profile?.matchDays?.length
                    ? `${profile.matchDays.length} match${profile.matchDays.length !== 1 ? 'es' : ''} scheduled`
                    : profile?.hasMatchSchedule
                    ? 'Active'
                    : 'None'
                }
              />
              {profile?.weight && (
                <InfoRow
                  label="Bodyweight"
                  value={`${profile.weight} ${units}`}
                  valueClass="font-mono text-accent-teal"
                />
              )}
            </div>
          </Section>
        </motion.div>

        {/* ── Injury Flags ──────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
          <Section icon={Shield} title="Injury Flags" iconColor="#FF6B35">
            {/* Profile injuries from onboarding */}
            {profile?.injuries?.length > 0 && (
              <div className="mb-3">
                <p className="text-[10px] text-text-secondary uppercase tracking-wide mb-2">From Onboarding</p>
                <div className="flex flex-wrap gap-1.5">
                  {profile.injuries.map(inj => (
                    <span
                      key={inj}
                      className="text-xs bg-accent-orange/10 text-accent-orange border border-accent-orange/30 px-2.5 py-1 rounded-full"
                    >
                      {inj}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Active runtime flags */}
            {injuryFlags?.length > 0 && (
              <div className="space-y-2 mb-2">
                <p className="text-[10px] text-text-secondary uppercase tracking-wide">Active Flags</p>
                {injuryFlags.map((flag, i) => (
                  <motion.div
                    key={`${flag}-${i}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    className="flex items-center gap-2.5 bg-accent-orange/10 rounded-xl px-3 py-2.5 border border-accent-orange/20"
                  >
                    <AlertTriangle size={13} className="text-accent-orange flex-shrink-0" />
                    <span className="text-sm text-text-primary flex-1">{flag}</span>
                    <button
                      onClick={() => handleRemoveInjuryFlag(i)}
                      className="w-6 h-6 rounded-full bg-accent-orange/20 flex items-center justify-center text-accent-orange hover:bg-accent-orange/30 transition-colors flex-shrink-0"
                      aria-label="Remove flag"
                    >
                      <X size={11} />
                    </button>
                  </motion.div>
                ))}
                {injuryFlags.length > 0 && (
                  <button
                    onClick={() => actions.setInjuryFlags([])}
                    className="text-[10px] text-text-secondary underline"
                  >
                    Clear all flags
                  </button>
                )}
              </div>
            )}

            {!profile?.injuries?.length && !injuryFlags?.length && (
              <p className="text-sm text-text-secondary">No active injury flags — training unrestricted. 💪</p>
            )}

            <AddInjuryFlag onAdd={handleAddInjuryFlag} />
          </Section>
        </motion.div>

        {/* ── Nutrition ─────────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.20 }}>
          <Section icon={Apple} title="Nutrition" iconColor="#4CAF50">
            {profile?.dietaryPreferences?.length > 0 ? (
              <>
                <p className="text-[10px] text-text-secondary uppercase tracking-wide mb-2.5">Dietary Preferences</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {profile.dietaryPreferences.map(pref => (
                    <span
                      key={pref}
                      className={`text-xs px-2.5 py-1 rounded-full border capitalize ${
                        DIETARY_COLORS[pref] || 'bg-bg-elevated text-text-secondary border-white/10'
                      }`}
                    >
                      {pref}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-text-secondary mb-3">No dietary restrictions set.</p>
            )}
            <div className="flex items-center justify-between pt-1 border-t border-white/5">
              <span className="text-sm text-text-secondary">Tracking mode</span>
              <span className="text-sm text-text-primary font-medium">
                {TRACKING_LABELS[profile?.nutritionTracking] || 'Simple'}
              </span>
            </div>
            <button
              onClick={() => actions.navigate('nutrition')}
              className="mt-3 w-full flex items-center justify-between py-2.5 px-3 bg-accent-green/10 border border-accent-green/20 rounded-xl"
            >
              <span className="text-sm text-accent-green font-semibold">View Today's Nutrition Plan</span>
              <ChevronRight size={14} className="text-accent-green" />
            </button>
          </Section>
        </motion.div>

        {/* ── Settings ──────────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
          <Section icon={Settings} title="Settings" iconColor="#8888AA">
            <div className="space-y-4">

              {/* Units toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-primary">Weight Units</span>
                <button
                  onClick={toggleUnits}
                  className="flex items-center gap-0.5 bg-bg-elevated rounded-xl p-1 border border-white/10"
                >
                  {['kg', 'lbs'].map(u => (
                    <span
                      key={u}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        units === u ? 'bg-accent-violet text-white shadow-sm' : 'text-text-secondary'
                      }`}
                    >
                      {u}
                    </span>
                  ))}
                </button>
              </div>

              {/* Regenerate plan */}
              <button
                onClick={handleRegeneratePlan}
                className="w-full flex items-center justify-between py-2"
              >
                <span className="text-sm text-text-primary">Regenerate Weekly Plan</span>
                <div className="flex items-center gap-1.5">
                  {regenerating && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    >
                      <RefreshCw size={14} className="text-accent-violet" />
                    </motion.div>
                  )}
                  {!regenerating && <ChevronRight size={16} className="text-text-secondary" />}
                </div>
              </button>

              {/* Notifications */}
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-text-primary">Notifications</span>
                <span className="text-xs text-text-secondary bg-bg-elevated px-2 py-1 rounded-lg">
                  {settings?.notifications ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </Section>
        </motion.div>

        {/* ── Reset Profile ─────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
          <AnimatePresence mode="wait">
            {!showResetConfirm ? (
              <motion.button
                key="reset-btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowResetConfirm(true)}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-accent-orange/30 text-accent-orange text-sm font-semibold hover:bg-accent-orange/5 transition-colors"
              >
                <LogOut size={16} />
                Reset Profile &amp; Start Over
              </motion.button>
            ) : (
              <motion.div
                key="reset-confirm"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
              >
                <Card className="border border-accent-orange/40">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent-orange/15 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle size={18} className="text-accent-orange" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-primary">Are you absolutely sure?</p>
                      <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                        This permanently deletes your profile, all session logs, exercise history, nutrition records, and your generated program. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="flex-1 py-3 rounded-xl bg-bg-elevated text-text-secondary text-sm font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleResetProfile}
                      className="flex-1 py-3 rounded-xl bg-accent-orange text-white text-sm font-bold"
                    >
                      Yes, Reset Everything
                    </button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Version footer ────────────────────────────────────────────── */}
        <div className="text-center py-4">
          <p className="text-xs text-text-secondary font-semibold">AthleteOS v1.0</p>
          <p className="text-[10px] text-text-secondary/50 mt-1">Performance lives underneath the sport.</p>
        </div>

      </div>
    </div>
  );
}
