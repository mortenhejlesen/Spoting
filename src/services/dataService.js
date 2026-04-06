/**
 * dataService.js
 * Centralized localStorage service for AthleteOS.
 * All localStorage access must go through this module — never access localStorage directly elsewhere.
 */

const KEYS = {
  PROFILE: 'athleteos_profile',
  WEEKLY_PLAN: 'athleteos_weekly_plan',
  SESSION_LOGS: 'athleteos_session_logs',
  EXERCISE_LOGS: 'athleteos_exercise_logs',
  NUTRITION_LOGS: 'athleteos_nutrition_logs',
  INJURY_FLAGS: 'athleteos_injury_flags',
  SETTINGS: 'athleteos_settings',
};

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Safely reads and JSON-parses a value from localStorage.
 * Returns null if the key is absent or the value is malformed.
 * @param {string} key
 * @returns {*}
 */
function getItem(key) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null || raw === undefined) return null;
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`[dataService] Failed to parse localStorage key "${key}":`, error);
    return null;
  }
}

/**
 * Safely JSON-stringifies and writes a value to localStorage.
 * @param {string} key
 * @param {*} value
 */
function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`[dataService] Failed to write localStorage key "${key}":`, error);
  }
}

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------

/**
 * Returns the saved user profile object, or null if none exists.
 * @returns {Object|null}
 */
export function getProfile() {
  return getItem(KEYS.PROFILE);
}

/**
 * Persists the user profile, replacing any existing value.
 * @param {Object} profile
 */
export function saveProfile(profile) {
  setItem(KEYS.PROFILE, profile);
}

/**
 * Merges the provided partial updates into the existing profile and saves the result.
 * If no profile exists yet, the updates become the initial profile.
 * @param {Object} updates
 */
export function updateProfile(updates) {
  const existing = getProfile() || {};
  setItem(KEYS.PROFILE, { ...existing, ...updates });
}

// ---------------------------------------------------------------------------
// Weekly Plan
// ---------------------------------------------------------------------------

/**
 * Returns the saved weekly plan object, or null if none exists.
 * @returns {Object|null}
 */
export function getWeeklyPlan() {
  return getItem(KEYS.WEEKLY_PLAN);
}

/**
 * Persists the weekly plan, replacing any existing value.
 * @param {Object} plan
 */
export function saveWeeklyPlan(plan) {
  setItem(KEYS.WEEKLY_PLAN, plan);
}

// ---------------------------------------------------------------------------
// Session Logs
// ---------------------------------------------------------------------------

/**
 * Returns all session logs as an array. Returns an empty array if none exist.
 * @returns {Array<Object>}
 */
export function getSessionLogs() {
  return getItem(KEYS.SESSION_LOGS) || [];
}

/**
 * Appends a new session log entry and persists the updated array.
 * @param {Object} log - { date, sessionType, sport, duration, rpe, mood, notes, exercises: [] }
 */
export function addSessionLog(log) {
  const logs = getSessionLogs();
  logs.push({ ...log, id: log.id || `session_${Date.now()}` });
  setItem(KEYS.SESSION_LOGS, logs);
}

/**
 * Returns session logs whose date falls within the given range (inclusive on both ends).
 * Dates are compared as ISO 8601 strings (lexicographic comparison is valid for YYYY-MM-DD).
 * @param {string} startDate - ISO date string, e.g. "2024-01-01"
 * @param {string} endDate   - ISO date string, e.g. "2024-01-07"
 * @returns {Array<Object>}
 */
export function getSessionLogsForDateRange(startDate, endDate) {
  const logs = getSessionLogs();
  return logs.filter((log) => {
    const logDate = log.date ? log.date.slice(0, 10) : '';
    return logDate >= startDate && logDate <= endDate;
  });
}

// ---------------------------------------------------------------------------
// Exercise Logs
// ---------------------------------------------------------------------------

/**
 * Returns all exercise logs as an array. Returns an empty array if none exist.
 * @returns {Array<Object>}
 */
export function getExerciseLogs() {
  return getItem(KEYS.EXERCISE_LOGS) || [];
}

/**
 * Appends a new exercise log entry and persists the updated array.
 * @param {Object} log - { exerciseId, date, sets: [{ reps, weight }] }
 */
export function addExerciseLog(log) {
  const logs = getExerciseLogs();
  logs.push({ ...log, id: log.id || `exercise_${Date.now()}` });
  setItem(KEYS.EXERCISE_LOGS, logs);
}

/**
 * Returns all exercise log entries for a specific exercise, sorted by date ascending.
 * @param {string} exerciseId
 * @returns {Array<Object>}
 */
export function getExerciseHistory(exerciseId) {
  const logs = getExerciseLogs();
  return logs
    .filter((log) => log.exerciseId === exerciseId)
    .sort((a, b) => (a.date > b.date ? 1 : -1));
}

// ---------------------------------------------------------------------------
// Nutrition Logs
// ---------------------------------------------------------------------------

/**
 * Returns all nutrition logs as an array. Returns an empty array if none exist.
 * @returns {Array<Object>}
 */
export function getNutritionLogs() {
  return getItem(KEYS.NUTRITION_LOGS) || [];
}

/**
 * Appends a new nutrition log entry and persists the updated array.
 * @param {Object} log - { date, mealId, timing, completed }
 */
export function addNutritionLog(log) {
  const logs = getNutritionLogs();
  logs.push({ ...log, id: log.id || `nutrition_${Date.now()}` });
  setItem(KEYS.NUTRITION_LOGS, logs);
}

// ---------------------------------------------------------------------------
// Injury Flags
// ---------------------------------------------------------------------------

/**
 * Returns the array of active injury flag strings. Returns an empty array if none exist.
 * @returns {Array<string>}
 */
export function getInjuryFlags() {
  return getItem(KEYS.INJURY_FLAGS) || [];
}

/**
 * Replaces the entire injury flags array with the provided array and persists it.
 * @param {Array<string>} flags
 */
export function saveInjuryFlags(flags) {
  setItem(KEYS.INJURY_FLAGS, Array.isArray(flags) ? flags : []);
}

/**
 * Appends a single injury flag string if it is not already present.
 * @param {string} flag
 */
export function addInjuryFlag(flag) {
  const flags = getInjuryFlags();
  if (!flags.includes(flag)) {
    flags.push(flag);
    setItem(KEYS.INJURY_FLAGS, flags);
  }
}

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

const DEFAULT_SETTINGS = {
  units: 'kg',
  notifications: true,
};

/**
 * Returns the saved settings object merged with defaults.
 * @returns {Object}
 */
export function getSettings() {
  const saved = getItem(KEYS.SETTINGS) || {};
  return { ...DEFAULT_SETTINGS, ...saved };
}

/**
 * Persists the settings object, replacing any existing value.
 * @param {Object} settings
 */
export function saveSettings(settings) {
  setItem(KEYS.SETTINGS, settings);
}

/**
 * Merges the provided partial updates into the existing settings and saves the result.
 * @param {Object} updates
 */
export function updateSettings(updates) {
  const existing = getSettings();
  setItem(KEYS.SETTINGS, { ...existing, ...updates });
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

/**
 * Removes all AthleteOS keys from localStorage, effectively resetting the app.
 */
export function clearAllData() {
  Object.values(KEYS).forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`[dataService] Failed to remove localStorage key "${key}":`, error);
    }
  });
}

/**
 * Returns true if the user has a saved profile and has completed onboarding.
 * @returns {boolean}
 */
export function hasCompletedOnboarding() {
  const profile = getProfile();
  return Boolean(profile && profile.onboardingComplete === true);
}
