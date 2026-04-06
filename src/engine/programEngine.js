import { programData } from '../data/programData.js';
import { exerciseLibrary } from '../data/exerciseLibrary.js';

// Main function: generates a weeklyPlan from userProfile
export function generateWeeklyPlan(userProfile) {
  // userProfile shape:
  // {
  //   name: string,
  //   sports: string[], // ["badminton", "tennis", "soccer"]
  //   positions: { badminton?: string, tennis?: string, soccer?: string },
  //   trainingDaysPerWeek: number, // 2-5
  //   hasMatchSchedule: boolean,
  //   matchDays: string[], // ["Monday", "Wednesday"] etc.
  //   fitnessLevel: "beginner" | "recreational" | "competitive" | "elite",
  //   injuries: string[], // ["Shoulder", "Knee", etc.]
  //   primaryGoal: string,
  //   dietaryPreferences: string[],
  //   nutritionTracking: string,
  //   gymAccess: "full" | "home" | "bodyweight",
  // }

  // Returns weeklyPlan:
  // {
  //   weekStart: string (ISO date of Monday),
  //   generatedAt: string (ISO datetime),
  //   days: DayPlan[]
  // }

  const profile = userProfile || {};
  const trainingDays = Math.min(Math.max(profile.trainingDaysPerWeek || 3, 2), 5);
  const matchDays = profile.hasMatchSchedule ? (profile.matchDays || []) : [];
  const fitnessLevel = profile.fitnessLevel || 'recreational';
  const gymAccess = profile.gymAccess || 'full';
  const injuries = profile.injuries || [];

  // 1. Get current week's Monday
  const monday = getMondayOfCurrentWeek();
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // 2. Determine session type assignments based on trainingDaysPerWeek
  const sessionTypeMap = getSessionTypes(trainingDays);

  // 3. Build a schedule avoiding hard sessions before matches, and adding recovery after matches
  const primarySport = getPrimarySport(profile);
  const loadAdjustment = getLoadAdjustment(fitnessLevel);

  // Identify restricted days: day-before-match (no hard training) and day-after-match (recovery only)
  const dayBeforeMatch = new Set();
  const dayAfterMatch = new Set();
  matchDays.forEach(day => {
    const idx = weekDays.indexOf(day);
    if (idx > 0) dayBeforeMatch.add(weekDays[idx - 1]);
    if (idx < 6) dayAfterMatch.add(weekDays[idx + 1]);
  });

  // 4. Assign session types to days
  const sessionQueue = [...sessionTypeMap];
  const dayPlans = [];

  for (let i = 0; i < 7; i++) {
    const dayName = weekDays[i];
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];

    let sessionType = 'rest';

    if (matchDays.includes(dayName)) {
      sessionType = 'match';
    } else if (dayAfterMatch.has(dayName)) {
      sessionType = 'recovery';
    } else if (dayBeforeMatch.has(dayName)) {
      // Only allow mobility or recovery before a match, not strength/conditioning
      const safeTypes = sessionQueue.filter(t => t === 'mobility' || t === 'recovery');
      if (safeTypes.length > 0) {
        sessionType = safeTypes[0];
        sessionQueue.splice(sessionQueue.indexOf(safeTypes[0]), 1);
      } else if (sessionQueue.length > 0) {
        // Downgrade to mobility
        sessionType = 'mobility';
        sessionQueue.shift();
      } else {
        sessionType = 'rest';
      }
    } else if (sessionQueue.length > 0) {
      sessionType = sessionQueue.shift();
    }

    // 5. Build exercises for this session
    const exercises = buildSessionExercises(sessionType, primarySport, profile, gymAccess, injuries, fitnessLevel);

    dayPlans.push({
      date: dateStr,
      dayName,
      sessionType,
      sport: sessionType !== 'rest' && sessionType !== 'recovery' ? primarySport : null,
      loadLabel: loadAdjustment.label,
      exercises,
      notes: getDayNotes(sessionType, dayName, matchDays, dayBeforeMatch, dayAfterMatch),
    });
  }

  return {
    weekStart: monday.toISOString().split('T')[0],
    generatedAt: new Date().toISOString(),
    userProfile: profile,
    days: dayPlans,
  };
}

// Returns Monday of the current week
function getMondayOfCurrentWeek() {
  const today = new Date();
  const day = today.getDay(); // 0=Sun, 1=Mon, ...
  const diff = (day === 0 ? -6 : 1 - day);
  const monday = new Date(today);
  monday.setDate(today.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

// Returns ordered session types for the week based on training days per week
function getSessionTypes(trainingDaysPerWeek) {
  switch (trainingDaysPerWeek) {
    case 2:
      return ['strength', 'conditioning'];
    case 3:
      return ['strength', 'conditioning', 'mobility'];
    case 4:
      return ['strength', 'conditioning', 'strength', 'mobility'];
    case 5:
      return ['strength', 'conditioning', 'strength', 'mobility', 'mixed'];
    default:
      return ['strength', 'conditioning', 'mobility'];
  }
}

// Generates contextual notes for a day
function getDayNotes(sessionType, dayName, matchDays, dayBeforeMatch, dayAfterMatch) {
  if (sessionType === 'match') return 'Match day — focus on warm-up and performance.';
  if (sessionType === 'recovery') return 'Recovery day — light movement, foam rolling, and stretching.';
  if (dayBeforeMatch.has(dayName)) return 'Pre-match day — keep intensity low, prioritize mobility.';
  if (sessionType === 'rest') return 'Rest day — prioritize sleep and nutrition.';
  return null;
}

// Builds a list of exercise entries for the given session type
function buildSessionExercises(sessionType, sport, profile, gymAccess, injuries, fitnessLevel) {
  if (sessionType === 'rest' || sessionType === 'match') return [];

  // Pull exercise IDs from programData if available, else use defaults
  let exerciseIds = [];
  const sportProgram = programData?.[sport];

  if (sportProgram && sportProgram[sessionType]) {
    exerciseIds = sportProgram[sessionType];
  } else {
    exerciseIds = getDefaultExerciseIds(sessionType);
  }

  // Filter based on user constraints
  const filtered = filterExercises(exerciseIds, profile);

  // Get full exercise objects
  const exercises = getExercisesFromIds(filtered);

  // Apply load adjustments
  const loadAdjustment = getLoadAdjustment(fitnessLevel);
  return exercises.map(ex => ({
    ...ex,
    sets: Math.max(1, Math.round((ex.sets || 3) * loadAdjustment.setsMultiplier)),
    restSeconds: Math.round((ex.restSeconds || 60) * loadAdjustment.restMultiplier),
  }));
}

// Fallback exercise IDs when programData doesn't have sport-specific entries
function getDefaultExerciseIds(sessionType) {
  const defaults = {
    strength: ['squat', 'deadlift', 'pushup', 'row', 'lunge'],
    conditioning: ['jumpRope', 'burpee', 'highKnees', 'lateralShuffles', 'sprintIntervals'],
    mobility: ['hipFlexorStretch', 'thoracicRotation', 'ankleCircles', 'shoulderCircles', 'hamstringStretch'],
    recovery: ['foamRolling', 'gentleYoga', 'walkingCooldown', 'deepBreathing'],
    mixed: ['squat', 'pushup', 'jumpRope', 'hipFlexorStretch', 'lateralShuffles'],
  };
  return defaults[sessionType] || defaults.strength;
}

// Determines the primary sport to focus on for the week
function getPrimarySport(userProfile) {
  const sports = userProfile?.sports || [];

  // If no sports defined, return a generic fallback
  if (sports.length === 0) return 'general';

  // If one sport, return it
  if (sports.length === 1) return sports[0];

  // If multiple sports and match schedule exists, return sport with closest upcoming match
  if (userProfile.hasMatchSchedule && userProfile.matchDays?.length > 0) {
    // Try to find a sport associated with the earliest match day
    // For simplicity: if matchDays has a sport tag, use it; otherwise fall back to first sport
    if (userProfile.matchSports) {
      const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const today = new Date().getDay();
      const todayIdx = today === 0 ? 6 : today - 1;

      let closestSport = null;
      let closestDistance = Infinity;

      userProfile.matchDays.forEach((day, i) => {
        const dayIdx = weekDays.indexOf(day);
        if (dayIdx === -1) return;
        const distance = (dayIdx - todayIdx + 7) % 7;
        if (distance < closestDistance) {
          closestDistance = distance;
          closestSport = userProfile.matchSports[i] || sports[0];
        }
      });

      if (closestSport) return closestSport;
    }
  }

  // Default: return the first sport
  return sports[0];
}

// Filters exercises based on user constraints
export function filterExercises(exerciseIds, userProfile) {
  const injuries = userProfile?.injuries || [];
  const gymAccess = userProfile?.gymAccess || 'full';
  const positions = userProfile?.positions || {};
  const sports = userProfile?.sports || [];

  // Determine user's positions as a flat array
  const userPositions = Object.values(positions).filter(Boolean);

  return exerciseIds.filter(id => {
    const exercise = exerciseLibrary?.[id];
    if (!exercise) return true; // Keep unknown IDs (will be filtered later by getExercisesFromIds)

    // Remove exercises contraindicated by injuries
    if (exercise.contraindicatedFor) {
      const hasContraindication = exercise.contraindicatedFor.some(inj =>
        injuries.some(userInj => userInj.toLowerCase().includes(inj.toLowerCase()))
      );
      if (hasContraindication) return false;
    }

    // Remove exercises that require equipment the user doesn't have
    if (exercise.requiredEquipment) {
      if (gymAccess === 'bodyweight' && exercise.requiredEquipment !== 'none') return false;
      if (gymAccess === 'home') {
        const homeEquipment = ['none', 'mat', 'resistanceBand', 'dumbbells', 'pullupBar'];
        if (!homeEquipment.includes(exercise.requiredEquipment)) return false;
      }
    }

    // Filter by position tags (if exercise specifies positions, user must match at least one)
    if (exercise.positionTags && exercise.positionTags.length > 0 && userPositions.length > 0) {
      const hasMatchingPosition = exercise.positionTags.some(tag =>
        userPositions.some(pos => pos.toLowerCase() === tag.toLowerCase())
      );
      if (!hasMatchingPosition) return false;
    }

    return true;
  });
}

// Gets the set/rep scheme adjustment based on fitness level
export function getLoadAdjustment(fitnessLevel) {
  switch (fitnessLevel) {
    case 'beginner':
      return {
        setsMultiplier: 0.67,   // reduce sets by ~1 (e.g. 3 -> 2)
        restMultiplier: 1.5,    // increase rest time
        repRangeShift: -2,      // lower rep range
        label: 'Beginner Load',
      };
    case 'recreational':
      return {
        setsMultiplier: 1.0,    // use prescribed sets/reps
        restMultiplier: 1.0,
        repRangeShift: 0,
        label: 'Standard Load',
      };
    case 'competitive':
      return {
        setsMultiplier: 1.33,   // add ~1 set
        restMultiplier: 0.9,    // slightly shorter rest
        repRangeShift: 0,
        label: 'Competitive Load',
      };
    case 'elite':
      return {
        setsMultiplier: 1.5,    // significantly more volume
        restMultiplier: 0.75,   // shorter rest periods
        repRangeShift: 2,       // higher rep range
        label: 'Elite Load',
      };
    default:
      return {
        setsMultiplier: 1.0,
        restMultiplier: 1.0,
        repRangeShift: 0,
        label: 'Standard Load',
      };
  }
}

// Gets today's plan from the weekly plan
export function getTodaysPlan(weeklyPlan) {
  const today = new Date().toDateString();
  return weeklyPlan?.days?.find(d => new Date(d.date).toDateString() === today) || null;
}

// Gets exercise objects from IDs
export function getExercisesFromIds(exerciseIds) {
  return exerciseIds.map(id => exerciseLibrary[id]).filter(Boolean);
}
