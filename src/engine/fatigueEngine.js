/**
 * fatigueEngine.js
 * Implements Acute:Chronic Workload Ratio (ACWR) tracking for AthleteOS.
 *
 * Session load for a single session = RPE (0–10) * duration (minutes).
 * Acute load  = average daily load over the last  7 days.
 * Chronic load = average daily load over the last 28 days.
 * ACWR = acuteLoad / chronicLoad.
 *
 * Reference zones follow the Gabbett (2016) model widely used in sports science.
 */

import { getSessionLogs } from '../services/dataService.js';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Returns today's date normalised to midnight UTC as an ISO date string (YYYY-MM-DD).
 * @returns {string}
 */
function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Returns an ISO date string for `daysAgo` days before today.
 * @param {number} daysAgo
 * @returns {string}
 */
function dateNDaysAgo(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

/**
 * Filters session logs to those whose date falls within [startDate, endDate] inclusive.
 * @param {Array<Object>} sessionLogs
 * @param {string} startDate - ISO date string
 * @param {string} endDate   - ISO date string
 * @returns {Array<Object>}
 */
function filterLogsByDateRange(sessionLogs, startDate, endDate) {
  return sessionLogs.filter((log) => {
    const logDate = log.date ? String(log.date).slice(0, 10) : '';
    return logDate >= startDate && logDate <= endDate;
  });
}

/**
 * Calculates the load value for a single session (RPE × duration in minutes).
 * Clamps RPE to [0, 10] and duration to >= 0.
 * @param {Object} log
 * @returns {number}
 */
function sessionLoad(log) {
  const rpe = Math.min(Math.max(Number(log.rpe) || 0, 0), 10);
  const duration = Math.max(Number(log.duration) || 0, 0);
  return rpe * duration;
}

/**
 * Calculates average daily load over a window of `windowDays` days.
 * Total load is summed across all sessions in the window and divided by the
 * number of days in the window (not the number of sessions) to account for
 * rest days with zero load.
 * @param {Array<Object>} sessionLogs
 * @param {number} windowDays
 * @returns {number}
 */
function averageDailyLoad(sessionLogs, windowDays) {
  const today = todayISO();
  const startDate = dateNDaysAgo(windowDays - 1);
  const windowLogs = filterLogsByDateRange(sessionLogs, startDate, today);

  if (windowLogs.length === 0) return 0;

  const totalLoad = windowLogs.reduce((sum, log) => sum + sessionLoad(log), 0);
  return totalLoad / windowDays;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Calculates the acute load: average daily RPE*duration load over the last 7 days.
 * @param {Array<Object>} sessionLogs
 * @returns {number}
 */
export function calculateAcuteLoad(sessionLogs) {
  return averageDailyLoad(sessionLogs, 7);
}

/**
 * Calculates the chronic load: average daily RPE*duration load over the last 28 days.
 * @param {Array<Object>} sessionLogs
 * @returns {number}
 */
export function calculateChronicLoad(sessionLogs) {
  return averageDailyLoad(sessionLogs, 28);
}

/**
 * Calculates the Acute:Chronic Workload Ratio.
 * Returns 1.0 if chronic load is zero (avoid division by zero; athlete is baseline neutral).
 * @param {Array<Object>} sessionLogs
 * @returns {number}
 */
export function calculateACRatio(sessionLogs) {
  const acuteLoad = calculateAcuteLoad(sessionLogs);
  const chronicLoad = calculateChronicLoad(sessionLogs);

  if (chronicLoad === 0) return 1.0;
  return acuteLoad / chronicLoad;
}

/**
 * Maps an ACWR value to a structured fatigue status object.
 *
 * Zones (Gabbett 2016):
 *   < 0.8         → Undertraining
 *   0.8  – 1.29   → Optimal Load  (the "sweet spot")
 *   1.3  – 1.49   → Caution
 *   ≥ 1.5         → High Injury Risk
 *
 * @param {number} acRatio
 * @returns {{ status: string, color: string, recommendation: string, zone: string }}
 */
export function getFatigueStatus(acRatio) {
  const ratio = Number(acRatio);

  if (ratio < 0.8) {
    return {
      status: 'Undertraining',
      color: '#3B82F6',
      zone: 'under',
      recommendation: 'Increase training load gradually',
    };
  }

  if (ratio < 1.3) {
    return {
      status: 'Optimal Load',
      color: '#4CAF50',
      zone: 'optimal',
      recommendation: 'Maintain current training load',
    };
  }

  if (ratio < 1.5) {
    return {
      status: 'Caution',
      color: '#FF9800',
      zone: 'caution',
      recommendation: 'Reduce intensity, prioritize recovery',
    };
  }

  return {
    status: 'High Injury Risk',
    color: '#FF6B35',
    zone: 'danger',
    recommendation: 'Reduce load significantly, rest day recommended',
  };
}

/**
 * Returns a simple, human-readable fatigue label for use on the home screen.
 * Labels are derived from the ACWR zone:
 *   under   → "Fresh"
 *   optimal → "Moderate"
 *   caution → "Fatigued"
 *   danger  → "Rest"
 *
 * Returns "Fresh" when there are no session logs yet (no data = no load).
 *
 * @param {Array<Object>} sessionLogs
 * @returns {"Fresh" | "Moderate" | "Fatigued" | "Rest"}
 */
export function getSimpleFatigueLabel(sessionLogs) {
  if (!sessionLogs || sessionLogs.length === 0) return 'Fresh';

  const ratio = calculateACRatio(sessionLogs);
  const { zone } = getFatigueStatus(ratio);

  const labelMap = {
    under: 'Fresh',
    optimal: 'Moderate',
    caution: 'Fatigued',
    danger: 'Rest',
  };

  return labelMap[zone] || 'Fresh';
}

/**
 * Returns an array of 4 weekly total load values covering the last 4 weeks,
 * ordered from oldest (index 0) to most recent (index 3).
 * Useful for rendering a weekly load bar chart.
 *
 * @param {Array<Object>} sessionLogs
 * @returns {Array<number>} - length 4
 */
export function getLoadHistory(sessionLogs) {
  const history = [];

  for (let weekIndex = 3; weekIndex >= 0; weekIndex--) {
    // Week boundaries: weekIndex=3 is the oldest, weekIndex=0 is the current week
    const endDaysAgo = weekIndex * 7;
    const startDaysAgo = endDaysAgo + 6;

    const endDate = dateNDaysAgo(endDaysAgo);
    const startDate = dateNDaysAgo(startDaysAgo);

    const weekLogs = filterLogsByDateRange(sessionLogs, startDate, endDate);
    const totalLoad = weekLogs.reduce((sum, log) => sum + sessionLoad(log), 0);
    history.push(Number(totalLoad.toFixed(1)));
  }

  return history;
}

/**
 * Returns RPE trend data for the last 14 sessions, ordered oldest to newest.
 * Each entry contains the session date and its RPE value for sparkline/trend charts.
 *
 * @param {Array<Object>} sessionLogs
 * @returns {Array<{ date: string, rpe: number }>}
 */
export function getRPETrend(sessionLogs) {
  if (!sessionLogs || sessionLogs.length === 0) return [];

  return [...sessionLogs]
    .sort((a, b) => {
      const dateA = String(a.date || '').slice(0, 10);
      const dateB = String(b.date || '').slice(0, 10);
      return dateA > dateB ? 1 : -1;
    })
    .slice(-14)
    .map((log) => ({
      date: String(log.date || '').slice(0, 10),
      rpe: Math.min(Math.max(Number(log.rpe) || 0, 0), 10),
    }));
}
