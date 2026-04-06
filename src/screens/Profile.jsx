import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, LogOut, ChevronRight, Shield, Dumbbell, Apple, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import Header from '../components/navigation/Header.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';

const FITNESS_LABELS = {
  beginner: 'Beginner 🌱',
  recreational: 'Recreational ⚡',
  competitive: 'Competitive 🏆',
  elite: 'Elite 🌟',
};

const GOAL_LABELS = {
  'injury-prevention': '🛡️ Injury Prevention',
  'performance': '⚡ Performance Gains',
  'fitness': '🏃 Fitness & Conditioning',
  'weight': '⚖️ Weight Management',
  'muscle': '💪 Build Muscle',
  'return': '🔄 Return from Injury',
};

const GYM_LABELS = {
  full: '🏋️ Full Gym',
  home: '🏠 Home Setup',
  bodyweight: '🤸 Bodyweight Only',
};

export default function Profile() {
  const { state, actions } = useApp();
  const { profile, injuryFlags, settings } = state;
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [units, setUnits] = useState(settings?.units || 'kg');

  const initials = profile?.name
    ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AT';

  const handleResetProfile = () => {
    localStorage.clear();
    window.location.reload();
  };

  const toggleUnits = () => {
    const newUnits = units === 'kg' ? 'lbs' : 'kg';
    setUnits(newUnits);
    actions.updateSettings({ units: newUnits });
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col pb-24">
      <Header title="Profile" />

      <div className="px-4 space-y-5">

        {/* Avatar + Name */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center pt-2 pb-4">
          <div className="w-20 h-20 rounded-full gradient-violet flex items-center justify-center mb-3 shadow-lg">
            <span className="text-2xl font-bold text-white">{initials}</span>
          </div>
          <h2 className="text-xl font-bold text-text-primary">{profile?.name || 'Athlete'}</h2>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {profile?.sports?.map(sport => (
              <Badge key={sport} sport={sport} className="capitalize">{sport}</Badge>
            ))}
            {profile?.fitnessLevel && (
              <Badge variant="violet">{FITNESS_LABELS[profile.fitnessLevel] || profile.fitnessLevel}</Badge>
            )}
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <div className="grid grid-cols-3 gap-3">
            <Card className="text-center py-3">
              <div className="text-xl font-bold font-mono text-text-primary">{profile?.trainingDaysPerWeek || '—'}</div>
              <div className="text-[10px] text-text-secondary mt-0.5">Training Days<br />/ week</div>
            </Card>
            <Card className="text-center py-3">
              <div className="text-xs font-bold text-text-primary leading-tight">{GYM_LABELS[profile?.gymAccess] || '—'}</div>
              <div className="text-[10px] text-text-secondary mt-0.5">Gym Access</div>
            </Card>
            <Card className="text-center py-3">
              <div className="text-[10px] font-bold text-text-primary leading-tight">{GOAL_LABELS[profile?.primaryGoal] || '—'}</div>
              <div className="text-[10px] text-text-secondary mt-0.5">Goal</div>
            </Card>
          </div>
        </motion.div>

        {/* My Sports */}
        {profile?.sports?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <div className="flex items-center gap-2 mb-3">
                <User size={15} className="text-accent-violet" />
                <p className="text-xs text-text-secondary uppercase tracking-wider">My Sports</p>
              </div>
              <div className="space-y-2">
                {profile.sports.map(sport => {
                  const position = profile.positions?.[sport];
                  return (
                    <div key={sport} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-2">
                        <Badge sport={sport} className="capitalize">{sport}</Badge>
                      </div>
                      {position && <span className="text-xs text-text-secondary">{position}</span>}
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Training Settings */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Dumbbell size={15} className="text-accent-teal" />
              <p className="text-xs text-text-secondary uppercase tracking-wider">Training Settings</p>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Training days/week', value: `${profile?.trainingDaysPerWeek || '—'} days` },
                { label: 'Match schedule', value: profile?.hasMatchSchedule ? (profile?.matchDays?.join(', ') || 'Yes') : 'No' },
                { label: 'Gym access', value: GYM_LABELS[profile?.gymAccess] || '—' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">{item.label}</span>
                  <span className="text-sm text-text-primary font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Injury Flags */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Shield size={15} className="text-accent-orange" />
              <p className="text-xs text-text-secondary uppercase tracking-wider">Injury Flags</p>
            </div>
            {profile?.injuries?.length > 0 && (
              <div className="mb-3">
                <p className="text-[10px] text-text-secondary mb-2">From onboarding:</p>
                <div className="flex flex-wrap gap-1.5">
                  {profile.injuries.map(inj => (
                    <span key={inj} className="text-xs bg-accent-orange/10 text-accent-orange border border-accent-orange/30 px-2 py-0.5 rounded-full">
                      {inj}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {injuryFlags?.length > 0 && (
              <div>
                <p className="text-[10px] text-text-secondary mb-2">Active flags:</p>
                <div className="space-y-1.5">
                  {injuryFlags.map((flag, i) => (
                    <div key={i} className="flex items-center gap-2 bg-accent-orange/10 rounded-lg px-3 py-2 border border-accent-orange/20">
                      <AlertTriangle size={12} className="text-accent-orange flex-shrink-0" />
                      <span className="text-xs text-text-primary flex-1">{flag}</span>
                      <button
                        onClick={() => {
                          const updated = injuryFlags.filter((_, idx) => idx !== i);
                          actions.setInjuryFlags(updated);
                        }}
                        className="text-text-secondary hover:text-accent-orange"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {(!profile?.injuries?.length && !injuryFlags?.length) && (
              <p className="text-sm text-text-secondary">No active injury flags. 💪</p>
            )}
          </Card>
        </motion.div>

        {/* Nutrition */}
        {profile?.dietaryPreferences?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card>
              <div className="flex items-center gap-2 mb-3">
                <Apple size={15} className="text-accent-green" />
                <p className="text-xs text-text-secondary uppercase tracking-wider">Nutrition</p>
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {profile.dietaryPreferences.map(pref => (
                    <span key={pref} className="text-xs bg-accent-teal/10 text-accent-teal border border-accent-teal/30 px-2 py-0.5 rounded-full">
                      {pref}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-1 text-sm">
                  <span className="text-text-secondary">Tracking mode</span>
                  <span className="text-text-primary font-medium capitalize">{profile.nutritionTracking || 'Simple'}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Settings */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Settings size={15} className="text-text-secondary" />
              <p className="text-xs text-text-secondary uppercase tracking-wider">Settings</p>
            </div>
            <div className="space-y-4">
              {/* Units toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-primary">Weight Units</span>
                <button
                  onClick={toggleUnits}
                  className="flex items-center gap-0.5 bg-bg-elevated rounded-lg p-0.5 border border-white/10"
                >
                  {['kg', 'lbs'].map(u => (
                    <span
                      key={u}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                        units === u ? 'bg-accent-violet text-white' : 'text-text-secondary'
                      }`}
                    >
                      {u}
                    </span>
                  ))}
                </button>
              </div>

              {/* Regenerate plan */}
              <button
                onClick={() => actions.regeneratePlan?.()}
                className="w-full flex items-center justify-between py-2"
              >
                <span className="text-sm text-text-primary">Regenerate Weekly Plan</span>
                <ChevronRight size={16} className="text-text-secondary" />
              </button>
            </div>
          </Card>
        </motion.div>

        {/* Reset Profile */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-accent-orange/30 text-accent-orange text-sm font-semibold"
            >
              <LogOut size={16} />
              Reset Profile & Start Over
            </button>
          ) : (
            <Card className="border border-accent-orange/30">
              <p className="text-sm font-bold text-text-primary mb-1">Are you sure?</p>
              <p className="text-xs text-text-secondary mb-4 leading-relaxed">
                This will delete all your data including session logs, exercise history, and your program. This cannot be undone.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl bg-bg-elevated text-text-secondary text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetProfile}
                  className="flex-1 py-2.5 rounded-xl bg-accent-orange text-white text-sm font-bold"
                >
                  Yes, Reset
                </button>
              </div>
            </Card>
          )}
        </motion.div>

        {/* Version */}
        <div className="text-center pb-4">
          <p className="text-xs text-text-secondary">AthleteOS v1.0</p>
          <p className="text-[10px] text-text-secondary/50 mt-0.5">Performance lives underneath the sport</p>
        </div>

      </div>
    </div>
  );
}
