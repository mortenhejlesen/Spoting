/**
 * AppContext.jsx
 * Global state management for AthleteOS using React Context + useReducer.
 *
 * All state mutations go through the `actions` object exposed by useApp().
 * Persistence is handled by dataService; this context is the single source
 * of truth for in-memory application state.
 *
 * NOTE: generateWeeklyPlan is imported from programEngine.js — that file must
 * be created separately at src/engine/programEngine.js.
 */

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as dataService from '../services/dataService.js';
import { generateWeeklyPlan } from '../engine/programEngine.js';
import {
  calculateACRatio,
  getFatigueStatus,
  getSimpleFatigueLabel,
} from '../engine/fatigueEngine.js';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const AppContext = createContext(null);

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

const initialState = {
  /** @type {Object|null} */
  profile: null,
  /** @type {Object|null} */
  weeklyPlan: null,
  /** @type {Array<Object>} */
  sessionLogs: [],
  /** @type {Array<Object>} */
  exerciseLogs: [],
  /** @type {Array<Object>} */
  nutritionLogs: [],
  /** @type {Array<string>} */
  injuryFlags: [],
  /** @type {{ units: string, notifications: boolean }} */
  settings: { units: 'kg', notifications: true },
  /**
   * Controls which screen is rendered.
   * @type {'onboarding'|'home'|'today'|'program'|'nutrition'|'progress'|'profile'|'fatigue'|'match-nutrition'}
   */
  currentScreen: 'onboarding',
  /**
   * Fatigue status derived from ACWR. null until first session log is present.
   * Shape: { ratio: number, status: string, color: string, zone: string, recommendation: string, label: string }
   * @type {Object|null}
   */
  fatigueStatus: null,
  /**
   * In-app notification banners.
   * Each entry: { id: number, type: string, message: string, icon?: string }
   * @type {Array<Object>}
   */
  notifications: [],
  /** @type {boolean} */
  isLoading: false,
};

// ---------------------------------------------------------------------------
// Action type constants
// ---------------------------------------------------------------------------

const ACTIONS = {
  SET_PROFILE: 'SET_PROFILE',
  SET_WEEKLY_PLAN: 'SET_WEEKLY_PLAN',
  ADD_SESSION_LOG: 'ADD_SESSION_LOG',
  ADD_EXERCISE_LOG: 'ADD_EXERCISE_LOG',
  ADD_NUTRITION_LOG: 'ADD_NUTRITION_LOG',
  SET_INJURY_FLAGS: 'SET_INJURY_FLAGS',
  SET_SETTINGS: 'SET_SETTINGS',
  NAVIGATE: 'NAVIGATE',
  UPDATE_FATIGUE: 'UPDATE_FATIGUE',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  DISMISS_NOTIFICATION: 'DISMISS_NOTIFICATION',
  SET_LOADING: 'SET_LOADING',
  LOAD_ALL_DATA: 'LOAD_ALL_DATA',
};

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_ALL_DATA:
      // Bulk-load all persisted data on app mount.
      return { ...state, ...action.payload };

    case ACTIONS.SET_PROFILE:
      // After profile is saved, always navigate to home.
      return { ...state, profile: action.payload, currentScreen: 'home' };

    case ACTIONS.SET_WEEKLY_PLAN:
      return { ...state, weeklyPlan: action.payload };

    case ACTIONS.ADD_SESSION_LOG:
      return { ...state, sessionLogs: [...state.sessionLogs, action.payload] };

    case ACTIONS.ADD_EXERCISE_LOG:
      return { ...state, exerciseLogs: [...state.exerciseLogs, action.payload] };

    case ACTIONS.ADD_NUTRITION_LOG:
      return { ...state, nutritionLogs: [...state.nutritionLogs, action.payload] };

    case ACTIONS.SET_INJURY_FLAGS:
      return { ...state, injuryFlags: action.payload };

    case ACTIONS.SET_SETTINGS:
      // Merge partial settings updates.
      return { ...state, settings: { ...state.settings, ...action.payload } };

    case ACTIONS.NAVIGATE:
      return { ...state, currentScreen: action.payload };

    case ACTIONS.UPDATE_FATIGUE:
      return { ...state, fatigueStatus: action.payload };

    case ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { id: Date.now(), ...action.payload },
        ],
      };

    case ACTIONS.DISMISS_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      };

    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

/**
 * AppProvider wraps the application and provides global state + action creators
 * to all descendant components via useApp().
 */
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // -------------------------------------------------------------------------
  // Boot: hydrate state from localStorage on first render
  // -------------------------------------------------------------------------
  useEffect(() => {
    const profile = dataService.getProfile();
    const weeklyPlan = dataService.getWeeklyPlan();
    const sessionLogs = dataService.getSessionLogs();
    const exerciseLogs = dataService.getExerciseLogs();
    const nutritionLogs = dataService.getNutritionLogs();
    const injuryFlags = dataService.getInjuryFlags();
    const settings = dataService.getSettings();

    // Determine entry screen: skip onboarding if already completed.
    const currentScreen =
      profile && profile.onboardingComplete ? 'home' : 'onboarding';

    dispatch({
      type: ACTIONS.LOAD_ALL_DATA,
      payload: {
        profile,
        weeklyPlan,
        sessionLogs,
        exerciseLogs,
        nutritionLogs,
        injuryFlags,
        // Merge loaded settings over the defaults to avoid losing keys.
        settings: { ...initialState.settings, ...settings },
        currentScreen,
      },
    });
  }, []);

  // -------------------------------------------------------------------------
  // Derived state: recalculate fatigue whenever session logs change
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (state.sessionLogs.length > 0) {
      const ratio = calculateACRatio(state.sessionLogs);
      const status = getFatigueStatus(ratio);
      const label = getSimpleFatigueLabel(state.sessionLogs);

      dispatch({
        type: ACTIONS.UPDATE_FATIGUE,
        payload: { ratio, label, ...status },
      });
    } else {
      // Reset fatigue when there are no logs (e.g. after clearAllData).
      dispatch({ type: ACTIONS.UPDATE_FATIGUE, payload: null });
    }
  }, [state.sessionLogs]);

  // -------------------------------------------------------------------------
  // Action creators
  // -------------------------------------------------------------------------
  const actions = {
    /**
     * Saves the completed profile, generates a weekly plan, and navigates to home.
     * @param {Object} profile - raw profile data from onboarding
     */
    saveProfile: (profile) => {
      const completeProfile = { ...profile, onboardingComplete: true };

      dataService.saveProfile(completeProfile);

      // Generate an initial weekly plan based on the athlete's profile.
      // generateWeeklyPlan comes from programEngine.js (to be created separately).
      const plan = generateWeeklyPlan(completeProfile);
      dataService.saveWeeklyPlan(plan);

      dispatch({ type: ACTIONS.SET_PROFILE, payload: completeProfile });
      dispatch({ type: ACTIONS.SET_WEEKLY_PLAN, payload: plan });
    },

    /**
     * Navigates to the specified screen.
     * @param {'onboarding'|'home'|'today'|'program'|'nutrition'|'progress'|'profile'|'fatigue'|'match-nutrition'} screen
     */
    navigate: (screen) => dispatch({ type: ACTIONS.NAVIGATE, payload: screen }),

    /**
     * Persists and registers a new session log, then shows a recovery reminder.
     * @param {Object} log - { date, sessionType, sport, duration, rpe, mood, notes, exercises }
     */
    addSessionLog: (log) => {
      dataService.addSessionLog(log);
      dispatch({ type: ACTIONS.ADD_SESSION_LOG, payload: log });

      // Post-session recovery window notification.
      dispatch({
        type: ACTIONS.ADD_NOTIFICATION,
        payload: {
          type: 'recovery',
          message: 'Recovery window open — eat within 30 min',
          icon: '🍽️',
        },
      });
    },

    /**
     * Persists and registers a new exercise log entry.
     * @param {Object} log - { exerciseId, date, sets: [{ reps, weight }] }
     */
    addExerciseLog: (log) => {
      dataService.addExerciseLog(log);
      dispatch({ type: ACTIONS.ADD_EXERCISE_LOG, payload: log });
    },

    /**
     * Persists and registers a new nutrition log entry.
     * @param {Object} log - { date, mealId, timing, completed }
     */
    addNutritionLog: (log) => {
      dataService.addNutritionLog(log);
      dispatch({ type: ACTIONS.ADD_NUTRITION_LOG, payload: log });
    },

    /**
     * Replaces the full set of injury flags in storage and state.
     * @param {Array<string>} flags
     */
    setInjuryFlags: (flags) => {
      dataService.saveInjuryFlags(flags);
      dispatch({ type: ACTIONS.SET_INJURY_FLAGS, payload: flags });
    },

    /**
     * Merges settings updates into existing settings and persists them.
     * @param {Object} updates - partial settings object
     */
    updateSettings: (updates) => {
      dataService.updateSettings(updates);
      dispatch({ type: ACTIONS.SET_SETTINGS, payload: updates });
    },

    /**
     * Dismisses an in-app notification banner by id.
     * @param {number} id
     */
    dismissNotification: (id) =>
      dispatch({ type: ACTIONS.DISMISS_NOTIFICATION, payload: id }),

    /**
     * Regenerates the weekly plan from the current profile and persists it.
     * No-op if no profile is loaded.
     */
    regeneratePlan: () => {
      if (state.profile) {
        const plan = generateWeeklyPlan(state.profile);
        dataService.saveWeeklyPlan(plan);
        dispatch({ type: ACTIONS.SET_WEEKLY_PLAN, payload: plan });
      }
    },
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Consumer hook
// ---------------------------------------------------------------------------

/**
 * Returns the current app state and action creators.
 * Must be called inside a component that is a descendant of AppProvider.
 *
 * @returns {{ state: typeof initialState, actions: Object }}
 */
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { ACTIONS };
export default AppContext;
