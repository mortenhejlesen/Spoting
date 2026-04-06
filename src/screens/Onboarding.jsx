import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

// ─── Sport icons as emoji / SVG ───────────────────────────────────────────────
const SPORTS = [
  { id: 'badminton', label: 'Badminton', emoji: '🏸', color: '#6C63FF', desc: 'Court speed & agility' },
  { id: 'tennis', label: 'Tennis', emoji: '🎾', color: '#FFD700', desc: 'Power & endurance' },
  { id: 'soccer', label: 'Soccer', emoji: '⚽', color: '#00C853', desc: 'Team performance' },
];

const POSITIONS = {
  badminton: ['All-Court Attacker', 'Defensive Retriever', 'Net Dominator', 'Doubles Specialist'],
  tennis: ['Aggressive Baseliner', 'Serve & Volley', 'Defensive Counterpuncher', 'All-Court Player'],
  soccer: ['Goalkeeper', 'Center Back', 'Fullback / Wingback', 'Central Midfielder', 'Attacking Midfielder', 'Winger', 'Striker'],
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const FITNESS_LEVELS = [
  { id: 'beginner', label: 'Beginner', desc: 'New to structured training', icon: '🌱' },
  { id: 'recreational', label: 'Recreational', desc: 'Train regularly for fun', icon: '⚡' },
  { id: 'competitive', label: 'Competitive', desc: 'Compete in local leagues', icon: '🏆' },
  { id: 'elite', label: 'Elite', desc: 'High-level competition', icon: '🌟' },
];

const INJURY_OPTIONS = ['Shoulder', 'Knee', 'Achilles', 'Lower Back', 'Elbow', 'Hip', 'Ankle', 'None'];

const GOALS = [
  { id: 'injury-prevention', label: 'Injury Prevention', icon: '🛡️' },
  { id: 'performance', label: 'Performance Gains', icon: '⚡' },
  { id: 'fitness', label: 'Fitness & Conditioning', icon: '🏃' },
  { id: 'weight', label: 'Weight Management', icon: '⚖️' },
  { id: 'muscle', label: 'Build Muscle', icon: '💪' },
  { id: 'return', label: 'Return from Injury', icon: '🔄' },
];

const DIETARY = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Halal', 'No Restrictions'];

const NUTRITION_TRACKING = [
  { id: 'simple', label: 'Just give me meals', desc: 'Simple meal suggestions' },
  { id: 'macros', label: 'Show me macros too', desc: 'Meal plans + nutritional info' },
  { id: 'full', label: 'Full tracking mode', desc: 'Detailed macro tracking' },
];

const GYM_ACCESS = [
  { id: 'full', label: 'Full Gym Access', icon: '🏋️', desc: 'Barbells, cables, machines' },
  { id: 'home', label: 'Home Setup', icon: '🏠', desc: 'Dumbbells, resistance bands' },
  { id: 'bodyweight', label: 'Bodyweight Only', icon: '🤸', desc: 'No equipment needed' },
];

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? '-100%' : '100%', opacity: 0 }),
};

export default function Onboarding() {
  const { actions } = useApp();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const [profile, setProfile] = useState({
    name: '',
    sports: [],
    positions: {},
    trainingDaysPerWeek: 3,
    hasMatchSchedule: false,
    matchDays: [],
    fitnessLevel: '',
    injuries: [],
    primaryGoal: '',
    dietaryPreferences: [],
    nutritionTracking: 'simple',
    gymAccess: 'full',
  });

  const totalSteps = 8; // steps 0-6 + summary

  const goNext = () => {
    if (step < totalSteps - 1) {
      setDirection(1);
      setStep(s => s + 1);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(s => s - 1);
    }
  };

  const update = (key, value) => setProfile(p => ({ ...p, [key]: value }));

  const toggleSport = (id) => {
    setProfile(p => ({
      ...p,
      sports: p.sports.includes(id) ? p.sports.filter(s => s !== id) : [...p.sports, id],
    }));
  };

  const toggleMulti = (key, value) => {
    setProfile(p => ({
      ...p,
      [key]: p[key].includes(value) ? p[key].filter(v => v !== value) : [...p[key], value],
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 0: return true; // name optional for MVP flow
      case 1: return profile.sports.length > 0;
      case 2: return Object.keys(profile.positions).length > 0 || profile.sports.length === 0;
      case 3: return true;
      case 4: return !!profile.fitnessLevel;
      case 5: return !!profile.primaryGoal;
      case 6: return true;
      case 7: return !!profile.gymAccess;
      default: return true;
    }
  };

  const handleComplete = async () => {
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 2000));
    actions.saveProfile(profile);
  };

  const stepContent = [
    // Step 0 — Name
    <div key="name" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Welcome to AthleteOS</h2>
        <p className="text-text-secondary">Your personalized performance companion. Let's build your profile.</p>
      </div>
      <div>
        <label className="text-sm text-text-secondary block mb-2">Your name (optional)</label>
        <input
          type="text"
          placeholder="What should we call you?"
          value={profile.name}
          onChange={(e) => update('name', e.target.value)}
          className="w-full bg-bg-elevated border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-accent-violet outline-none text-base"
        />
      </div>
      <div className="bg-bg-elevated rounded-xl p-4 space-y-2">
        <p className="text-xs text-text-secondary font-semibold uppercase tracking-wider">What AthleteOS does</p>
        {['Builds personalized gym programs for your sport', 'Plans nutrition around your match schedule', 'Monitors fatigue to prevent overtraining', 'Never covers sport technique — only the performance layer'].map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-accent-violet text-xs mt-0.5">✓</span>
            <span className="text-sm text-text-primary">{item}</span>
          </div>
        ))}
      </div>
    </div>,

    // Step 1 — Sport Selection
    <div key="sports" className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Select Your Sports</h2>
        <p className="text-text-secondary">Select the sports you train for. Multi-select is supported.</p>
      </div>
      <div className="space-y-3">
        {SPORTS.map(sport => {
          const selected = profile.sports.includes(sport.id);
          return (
            <button
              key={sport.id}
              onClick={() => toggleSport(sport.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                selected ? 'border-opacity-100 bg-opacity-10' : 'border-white/10 bg-bg-elevated'
              }`}
              style={selected ? { borderColor: sport.color, backgroundColor: `${sport.color}15` } : {}}
            >
              <span className="text-3xl">{sport.emoji}</span>
              <div className="flex-1 text-left">
                <div className="font-semibold text-text-primary">{sport.label}</div>
                <div className="text-xs text-text-secondary">{sport.desc}</div>
              </div>
              {selected && (
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: sport.color }}>
                  <Check size={13} className="text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>,

    // Step 2 — Position / Playing Style
    <div key="positions" className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Playing Style</h2>
        <p className="text-text-secondary">Your position shapes which exercises we prioritize.</p>
      </div>
      {profile.sports.map(sportId => {
        const sport = SPORTS.find(s => s.id === sportId);
        const positions = POSITIONS[sportId] || [];
        return (
          <div key={sportId}>
            <label className="text-sm font-semibold mb-2 block" style={{ color: sport?.color }}>
              {sport?.emoji} {sport?.label}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {positions.map(pos => {
                const selected = profile.positions[sportId] === pos;
                return (
                  <button
                    key={pos}
                    onClick={() => update('positions', { ...profile.positions, [sportId]: pos })}
                    className={`p-3 rounded-xl border text-sm font-medium text-left transition-all ${
                      selected ? 'border-accent-violet bg-accent-violet/10 text-accent-violet' : 'border-white/10 bg-bg-elevated text-text-secondary'
                    }`}
                  >
                    {pos}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>,

    // Step 3 — Training Schedule
    <div key="schedule" className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Training Schedule</h2>
        <p className="text-text-secondary">We'll build around your sport, not against it.</p>
      </div>
      <div className="bg-bg-elevated rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-text-primary">Off-sport training days per week</span>
          <span className="text-2xl font-bold text-accent-violet font-mono">{profile.trainingDaysPerWeek}</span>
        </div>
        <input
          type="range"
          min={2}
          max={5}
          value={profile.trainingDaysPerWeek}
          onChange={(e) => update('trainingDaysPerWeek', parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-text-secondary mt-1">
          <span>2 days</span>
          <span>5 days</span>
        </div>
      </div>

      <div className="bg-bg-elevated rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-text-primary">Regular match / competition schedule?</span>
          <button
            onClick={() => update('hasMatchSchedule', !profile.hasMatchSchedule)}
            className={`w-12 h-6 rounded-full transition-colors ${profile.hasMatchSchedule ? 'bg-accent-violet' : 'bg-bg-card'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${profile.hasMatchSchedule ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
        </div>

        {profile.hasMatchSchedule && (
          <div>
            <p className="text-xs text-text-secondary mb-3">Which days do you typically play?</p>
            <div className="flex gap-2 flex-wrap">
              {DAYS.map((day, i) => {
                const selected = profile.matchDays.includes(DAY_FULL[i]);
                return (
                  <button
                    key={day}
                    onClick={() => toggleMulti('matchDays', DAY_FULL[i])}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      selected ? 'bg-accent-violet text-white' : 'bg-bg-card text-text-secondary'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>,

    // Step 4 — Fitness Level
    <div key="fitness" className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Current Fitness Level</h2>
        <p className="text-text-secondary">We'll calibrate intensity, sets, and reps to match you.</p>
      </div>
      <div className="space-y-3">
        {FITNESS_LEVELS.map(level => {
          const selected = profile.fitnessLevel === level.id;
          return (
            <button
              key={level.id}
              onClick={() => update('fitnessLevel', level.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                selected ? 'border-accent-violet bg-accent-violet/10' : 'border-white/10 bg-bg-elevated'
              }`}
            >
              <span className="text-2xl">{level.icon}</span>
              <div>
                <div className="font-semibold text-text-primary">{level.label}</div>
                <div className="text-xs text-text-secondary">{level.desc}</div>
              </div>
              {selected && <Check size={18} className="text-accent-violet ml-auto" />}
            </button>
          );
        })}
      </div>
      <div>
        <p className="text-sm font-semibold text-text-primary mb-3">Any current or recent injuries?</p>
        <div className="flex flex-wrap gap-2">
          {INJURY_OPTIONS.map(inj => {
            const selected = profile.injuries.includes(inj);
            return (
              <button
                key={inj}
                onClick={() => {
                  if (inj === 'None') {
                    update('injuries', []);
                  } else {
                    toggleMulti('injuries', inj);
                  }
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selected
                    ? inj === 'None' ? 'bg-accent-green/20 text-accent-green border border-accent-green/40' : 'bg-accent-orange/20 text-accent-orange border border-accent-orange/40'
                    : 'bg-bg-elevated text-text-secondary border border-white/10'
                }`}
              >
                {inj}
              </button>
            );
          })}
        </div>
      </div>
    </div>,

    // Step 5 — Primary Goal
    <div key="goal" className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Primary Goal</h2>
        <p className="text-text-secondary">This shapes the balance between strength, mobility, and conditioning.</p>
      </div>
      <div className="space-y-2">
        {GOALS.map(goal => {
          const selected = profile.primaryGoal === goal.id;
          return (
            <button
              key={goal.id}
              onClick={() => update('primaryGoal', goal.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                selected ? 'border-accent-violet bg-accent-violet/10' : 'border-white/10 bg-bg-elevated'
              }`}
            >
              <span className="text-xl w-8">{goal.icon}</span>
              <span className="font-medium text-text-primary">{goal.label}</span>
              {selected && <Check size={18} className="text-accent-violet ml-auto" />}
            </button>
          );
        })}
      </div>
    </div>,

    // Step 6 — Nutrition
    <div key="nutrition" className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Nutrition Preferences</h2>
        <p className="text-text-secondary">All meal plans will respect your dietary needs.</p>
      </div>
      <div>
        <p className="text-sm font-semibold text-text-primary mb-3">Dietary requirements</p>
        <div className="flex flex-wrap gap-2">
          {DIETARY.map(diet => {
            const selected = profile.dietaryPreferences.includes(diet);
            return (
              <button
                key={diet}
                onClick={() => toggleMulti('dietaryPreferences', diet)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  selected ? 'bg-accent-teal/20 text-accent-teal border-accent-teal/40' : 'bg-bg-elevated text-text-secondary border-white/10'
                }`}
              >
                {diet}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-text-primary mb-3">How do you want to track nutrition?</p>
        <div className="space-y-2">
          {NUTRITION_TRACKING.map(opt => {
            const selected = profile.nutritionTracking === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => update('nutritionTracking', opt.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                  selected ? 'border-accent-teal bg-accent-teal/10' : 'border-white/10 bg-bg-elevated'
                }`}
              >
                <div>
                  <div className="font-medium text-text-primary text-sm">{opt.label}</div>
                  <div className="text-xs text-text-secondary">{opt.desc}</div>
                </div>
                {selected && <Check size={16} className="text-accent-teal ml-auto" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>,

    // Step 7 — Gym Access + Summary
    <div key="gym" className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Gym Access</h2>
        <p className="text-text-secondary">We'll filter exercises to match your equipment.</p>
      </div>
      <div className="space-y-3">
        {GYM_ACCESS.map(opt => {
          const selected = profile.gymAccess === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => update('gymAccess', opt.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                selected ? 'border-accent-violet bg-accent-violet/10' : 'border-white/10 bg-bg-elevated'
              }`}
            >
              <span className="text-2xl">{opt.icon}</span>
              <div>
                <div className="font-semibold text-text-primary">{opt.label}</div>
                <div className="text-xs text-text-secondary">{opt.desc}</div>
              </div>
              {selected && <Check size={18} className="text-accent-violet ml-auto" />}
            </button>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-bg-elevated rounded-xl p-4 space-y-2">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Your Profile Summary</p>
        {[
          { label: 'Sports', value: profile.sports.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ') || '—' },
          { label: 'Training Days', value: `${profile.trainingDaysPerWeek} days/week` },
          { label: 'Fitness Level', value: profile.fitnessLevel ? profile.fitnessLevel.charAt(0).toUpperCase() + profile.fitnessLevel.slice(1) : '—' },
          { label: 'Goal', value: GOALS.find(g => g.id === profile.primaryGoal)?.label || '—' },
          { label: 'Gym Access', value: GYM_ACCESS.find(g => g.id === profile.gymAccess)?.label || '—' },
        ].map(item => (
          <div key={item.label} className="flex justify-between text-sm">
            <span className="text-text-secondary">{item.label}</span>
            <span className="text-text-primary font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>,
  ];

  if (isGenerating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary px-6 text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-6xl mb-6"
        >
          ⚡
        </motion.div>
        <h2 className="text-2xl font-bold text-text-primary mb-3">Building Your Program</h2>
        <p className="text-text-secondary">Personalizing your training plan, nutrition timing, and fatigue tracking...</p>
        <div className="mt-8 flex gap-1.5">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-accent-violet"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      {/* Progress bar */}
      <div className="px-4 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-4">
          {step > 0 && (
            <button onClick={goBack} className="w-9 h-9 flex items-center justify-center rounded-full bg-bg-elevated text-text-secondary">
              <ArrowLeft size={18} />
            </button>
          )}
          <div className="flex-1 h-1.5 bg-bg-elevated rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent-violet rounded-full"
              animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-xs text-text-secondary font-mono">{step + 1}/{totalSteps}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {stepContent[step]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="px-4 py-6 pb-10">
        {step < totalSteps - 1 ? (
          <button
            onClick={goNext}
            disabled={!canProceed()}
            className="w-full flex items-center justify-center gap-2 py-4 bg-accent-violet text-white font-bold rounded-xl text-base disabled:opacity-40 transition-opacity active:scale-95 min-h-[52px]"
          >
            Continue
            <ArrowRight size={18} />
          </button>
        ) : (
          <button
            onClick={handleComplete}
            disabled={!profile.gymAccess}
            className="w-full flex items-center justify-center gap-2 py-4 bg-accent-violet text-white font-bold rounded-xl text-base disabled:opacity-40 gradient-violet active:scale-95 min-h-[52px]"
          >
            Build My Program ⚡
          </button>
        )}
      </div>
    </div>
  );
}
