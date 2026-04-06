// AthleteOS — Nutrition Engine
// Generates personalised daily nutrition plans based on user profile, schedule, and dietary preferences.

import mealLibrary from "../data/mealLibrary.js";

// ─────────────────────────────────────────────────────────────
// INTERNAL HELPERS
// ─────────────────────────────────────────────────────────────

/**
 * Parses a time string "HH:MM" and returns total minutes since midnight.
 * @param {string} timeStr
 * @returns {number}
 */
function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * Adds or subtracts minutes from a "HH:MM" string and returns the new "HH:MM" string.
 * @param {string} timeStr
 * @param {number} offsetMinutes — can be negative
 * @returns {string}
 */
function offsetTime(timeStr, offsetMinutes) {
  const totalMinutes = timeToMinutes(timeStr) + offsetMinutes;
  const clamped = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(clamped / 60).toString().padStart(2, "0");
  const m = (clamped % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

/**
 * Formats an offset in minutes as a human-readable label like "T-3h" or "T+45min".
 * @param {number} offsetMinutes
 * @returns {string}
 */
function formatOffset(offsetMinutes) {
  if (offsetMinutes === 0) return "Match / Kick-off";
  const sign = offsetMinutes < 0 ? "-" : "+";
  const abs = Math.abs(offsetMinutes);
  if (abs % 60 === 0) {
    return `T${sign}${abs / 60}hr`;
  }
  if (abs >= 60) {
    const h = Math.floor(abs / 60);
    const m = abs % 60;
    return `T${sign}${h}hr ${m}min`;
  }
  return `T${sign}${abs}min`;
}

/**
 * Returns true if dietaryPreferences (array of strings) are all satisfied by a meal's dietaryTags.
 * An empty or null dietaryPreferences array means no restrictions.
 * @param {object} meal
 * @param {string[]} dietaryPreferences
 * @returns {boolean}
 */
function meetsdietary(meal, dietaryPreferences) {
  if (!dietaryPreferences || dietaryPreferences.length === 0) return true;
  return dietaryPreferences.every((pref) => meal.dietaryTags.includes(pref));
}

/**
 * Returns true if the meal is appropriate for the given sport.
 * @param {object} meal
 * @param {string} sport
 * @returns {boolean}
 */
function meetsSport(meal, sport) {
  if (!sport) return true;
  return meal.sport.includes("all") || meal.sport.includes(sport.toLowerCase());
}

// ─────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────

/**
 * Determines the nutrition day type based on the user's schedule and the given date.
 *
 * Requires userProfile to contain:
 *   - matchDays: string[]  — ISO date strings, e.g. ["2026-03-20"]
 *   - trainingDays: string[] — ISO date strings or day-of-week numbers (0=Sun … 6=Sat)
 *   - recoveryDays: string[] (optional)
 *
 * @param {object} userProfile
 * @param {Date|string} date
 * @returns {"match-day"|"pre-match"|"training-day"|"rest-day"|"recovery-day"}
 */
export function getDayType(userProfile, date) {
  const d = date instanceof Date ? date : new Date(date);
  const isoDate = d.toISOString().slice(0, 10);

  const matchDays = userProfile.matchDays || [];
  const trainingDays = userProfile.trainingDays || [];
  const recoveryDays = userProfile.recoveryDays || [];

  // Normalise training days — support both ISO strings and day-of-week numbers
  const isTrainingDay = trainingDays.some((entry) => {
    if (typeof entry === "number") return d.getDay() === entry;
    return entry === isoDate;
  });

  const isMatchDay = matchDays.includes(isoDate);

  // Check if tomorrow is a match day
  const tomorrow = new Date(d);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowIso = tomorrow.toISOString().slice(0, 10);
  const isPreMatchDay = matchDays.includes(tomorrowIso);

  // Check if yesterday was a match day
  const yesterday = new Date(d);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayIso = yesterday.toISOString().slice(0, 10);
  const isPostMatchDay =
    matchDays.includes(yesterdayIso) ||
    recoveryDays.includes(isoDate);

  if (isMatchDay) return "match-day";
  if (isPreMatchDay) return "pre-match";
  if (isPostMatchDay) return "recovery-day";
  if (isTrainingDay) return "training-day";
  return "rest-day";
}

/**
 * Returns a daily nutrition timeline — an ordered array of time slots with meal recommendations
 * appropriate for the given day type and user profile.
 *
 * @param {"match-day"|"pre-match"|"training-day"|"rest-day"|"recovery-day"} dayType
 * @param {object} userProfile
 * @returns {Array<{ time: string, label: string, meals: object[], notes: string }>}
 */
export function getNutritionTimeline(dayType, userProfile) {
  const prefs = userProfile.dietaryPreferences || [];
  const sport = userProfile.sport || null;

  const filter = (category) => getMealRecommendations(category, prefs, sport);

  switch (dayType) {
    case "match-day": {
      const matchTime = userProfile.matchTime || "15:00";
      return getMatchDayLadder(userProfile, matchTime);
    }

    case "pre-match":
      return [
        {
          time: "07:00",
          label: "Breakfast — Glycogen Loading Begins",
          meals: filter("pre-training"),
          notes:
            "Start glycogen loading early. Choose high-carbohydrate, moderate-protein meals. Avoid excess fat and new foods.",
        },
        {
          time: "10:30",
          label: "Mid-Morning Snack",
          meals: filter("pre-match"),
          notes:
            "Keep portions moderate. Focus on easily digested carbohydrates and a small amount of protein.",
        },
        {
          time: "13:00",
          label: "Lunch — Carbohydrate Focus",
          meals: filter("pre-match"),
          notes:
            "White rice, pasta, or bread with lean protein. Keep fibre and fat low to speed digestion.",
        },
        {
          time: "16:00",
          label: "Afternoon Snack",
          meals: filter("pre-match"),
          notes:
            "Banana, rice cakes, or yogurt. Keep it light. Hydrate with 500ml of water or electrolyte drink.",
        },
        {
          time: "19:00",
          label: "Evening Meal — Final Glycogen Top-Up",
          meals: [
            ...filter("pre-match"),
            ...filter("pre-training"),
          ].slice(0, 4),
          notes:
            "Larger carbohydrate portion with lean protein. Avoid heavy sauces, high fat, excessive fibre. Early dinner preferred.",
        },
        {
          time: "21:30",
          label: "Optional Pre-Sleep Snack",
          meals: filter("anti-inflammatory"),
          notes:
            "Light casein-rich snack (Greek yogurt, cottage cheese) or golden milk to reduce overnight inflammation.",
        },
      ];

    case "training-day":
      return [
        {
          time: "07:00",
          label: "Breakfast",
          meals: filter("pre-training"),
          notes:
            "High-carbohydrate, moderate-protein breakfast 2–3 hours before training. Adequate hydration: 500ml water with meal.",
        },
        {
          time: "10:00",
          label: "Pre-Training Snack (if training at midday)",
          meals: filter("pre-training"),
          notes:
            "Light snack 45–60 minutes before training. Prioritise fast-digesting carbohydrates. Avoid high-fat options.",
        },
        {
          time: "13:30",
          label: "Post-Training Recovery Meal",
          meals: filter("post-training"),
          notes:
            "Aim to eat within 30–60 minutes of finishing training to maximise the anabolic window. Target 1.2g/kg carbs and 0.4g/kg protein.",
        },
        {
          time: "16:00",
          label: "Afternoon Snack",
          meals: filter("pre-training"),
          notes:
            "Sustain energy and maintain protein synthesis. Balanced macros, no restriction needed.",
        },
        {
          time: "19:00",
          label: "Dinner",
          meals: filter("post-training"),
          notes:
            "Continue recovery. Emphasise protein quality and a broad range of micronutrients from colourful vegetables.",
        },
      ];

    case "recovery-day":
      return [
        {
          time: "08:00",
          label: "Breakfast — Anti-Inflammatory Start",
          meals: filter("anti-inflammatory"),
          notes:
            "Prioritise anti-inflammatory foods. Tart cherry juice is ideal. Hydrate well — aim for 500ml water before noon.",
        },
        {
          time: "11:00",
          label: "Mid-Morning Snack",
          meals: filter("anti-inflammatory"),
          notes:
            "Berries, walnuts, or golden milk. Focus on omega-3 and antioxidant content.",
        },
        {
          time: "13:30",
          label: "Lunch — Recovery Focus",
          meals: [...filter("anti-inflammatory"), ...filter("post-training")].slice(0, 4),
          notes:
            "Omega-3 rich protein (salmon, sardines) with quinoa or sweet potato. Turmeric dressing recommended.",
        },
        {
          time: "16:30",
          label: "Afternoon Snack",
          meals: filter("rest-day"),
          notes:
            "Keep calories moderate today. A protein-rich snack helps maintain muscle mass during lower activity.",
        },
        {
          time: "19:30",
          label: "Dinner",
          meals: [...filter("anti-inflammatory"), ...filter("rest-day")].slice(0, 4),
          notes:
            "Full recovery meal. Sleep nutrition matters — magnesium from leafy greens and zinc from meat/seeds support overnight repair.",
        },
        {
          time: "21:00",
          label: "Pre-Sleep Recovery Drink",
          meals: filter("anti-inflammatory").filter((m) => m.id === "anti-3"),
          notes:
            "Golden milk with black pepper maximises curcumin absorption. Supports sleep quality and reduces overnight soreness.",
        },
      ];

    case "rest-day":
    default:
      return [
        {
          time: "08:30",
          label: "Breakfast",
          meals: filter("rest-day"),
          notes:
            "No rush on rest days. Prioritise whole foods and adequate protein to maintain muscle. Reduce carbohydrates slightly compared to training days.",
        },
        {
          time: "12:00",
          label: "Lunch",
          meals: [...filter("rest-day"), ...filter("anti-inflammatory")].slice(0, 4),
          notes:
            "Aim for a nutrient-dense, colourful plate. Lean protein, vegetables, and whole grains. This is a good day for batch cooking.",
        },
        {
          time: "15:30",
          label: "Afternoon Snack",
          meals: filter("anti-inflammatory"),
          notes:
            "Light snack. Avoid large amounts of carbohydrates on rest days — protein and fat-rich snacks (nuts, yogurt) are better choices.",
        },
        {
          time: "19:00",
          label: "Dinner",
          meals: filter("rest-day"),
          notes:
            "Prioritise omega-3 fats, micronutrients, and high-quality protein. Reduce overall caloric intake by 15–20% compared to training days.",
        },
      ];
  }
}

/**
 * Returns meals from the library filtered by category, dietary preferences, and sport.
 *
 * @param {string} category — must match a meal's category field
 * @param {string[]} dietaryPreferences — e.g. ["vegan", "gluten-free"]
 * @param {string|null} sport
 * @returns {object[]}
 */
export function getMealRecommendations(category, dietaryPreferences = [], sport = null) {
  return mealLibrary.filter(
    (meal) =>
      meal.category === category &&
      meetsdietary(meal, dietaryPreferences) &&
      meetsSport(meal, sport)
  );
}

/**
 * Generates the match day nutrition ladder — a time-anchored sequence of meals
 * from 12 hours before kick-off through post-match recovery.
 *
 * @param {object} userProfile
 * @param {string} matchTime — "HH:MM", e.g. "14:00"
 * @returns {Array<{ time: string, offsetLabel: string, label: string, meals: object[], notes: string }>}
 */
export function getMatchDayLadder(userProfile, matchTime) {
  const prefs = userProfile.dietaryPreferences || [];
  const sport = userProfile.sport || null;

  const filter = (category, ids = null) => {
    const base = getMealRecommendations(category, prefs, sport);
    if (!ids) return base;
    return base.filter((m) => ids.includes(m.id));
  };

  // Offsets in minutes relative to match kick-off
  const slots = [
    {
      offsetMinutes: -720, // T-12hr
      label: "Morning — Glycogen Loading Begins",
      category: "pre-training",
      notes:
        "Start the day with a high-carbohydrate, moderate-protein breakfast. Avoid new or unusual foods. Hydrate with 500–750ml of water over the morning.",
    },
    {
      offsetMinutes: -480, // T-8hr
      label: "Mid-Morning Snack",
      category: "pre-match",
      notes:
        "Light, easily digestible carbohydrate snack. Rice cakes with honey or fruit are ideal. Continue sipping water.",
    },
    {
      offsetMinutes: -300, // T-5hr
      label: "Pre-Match Lunch — Carbohydrate Focus",
      category: "pre-match",
      notes:
        "Main carbohydrate meal of the day. White rice or white pasta with lean protein. Keep fat and fibre low. Eat confidently with familiar foods.",
    },
    {
      offsetMinutes: -150, // T-2hr 30min
      label: "Pre-Match Snack",
      category: "pre-match",
      notes:
        "Top up glycogen with a light, low-fibre snack. Banana and yogurt or a small bagel with honey. Sip 300–400ml of water or electrolyte drink.",
    },
    {
      offsetMinutes: -60, // T-1hr
      label: "Final Fuelling Window",
      category: "pre-match",
      mealIds: ["prematch-2", "prematch-5"],
      notes:
        "Final opportunity to raise blood glucose. Small, fast-absorbing meal only — banana, yogurt, or a few rice cakes. No heavy food from this point.",
    },
    {
      offsetMinutes: -15, // T-15min
      label: "Pre-Match Protocol",
      category: null,
      meals: [],
      notes:
        "No solid food. Sip 150–200ml of isotonic sports drink or water. Use visualisation and warm-up routine. Save any energy gel for half-time if needed.",
    },
    {
      offsetMinutes: 0,
      label: "Kick-off / Match Start",
      category: null,
      meals: [],
      notes: "Execute your game. Trust your preparation.",
    },
    {
      offsetMinutes: 45, // Half-time
      label: "Half-Time",
      category: null,
      meals: [],
      notes:
        "200ml isotonic drink, half a banana, or an energy gel. Keep intake small and rapid. Avoid anything solid that may cause cramps in the second half.",
    },
    {
      offsetMinutes: 90, // Full-time / Post-match
      label: "Post-Match — Immediate Recovery",
      category: "post-training",
      mealIds: ["post-2", "post-6"],
      notes:
        "Start recovery immediately. Liquid nutrition (protein shake, chocolate milk) is ideal if appetite is low after competition. Rehydrate: aim for 150% of fluid lost.",
    },
    {
      offsetMinutes: 180, // T+3hr
      label: "Post-Match Recovery Meal",
      category: "post-training",
      notes:
        "Full recovery meal with high-quality protein (30–40g), moderate carbohydrates, and anti-inflammatory foods. Omega-3 sources (salmon) are ideal tonight.",
    },
    {
      offsetMinutes: 360, // T+6hr / Evening
      label: "Evening — Anti-Inflammatory Protocol",
      category: "anti-inflammatory",
      notes:
        "Wind-down nutrition. Tart cherry juice before bed is clinically proven to accelerate recovery. Golden milk supports sleep quality.",
    },
  ];

  return slots.map((slot) => {
    const absoluteTime = offsetTime(matchTime, slot.offsetMinutes);
    let meals = [];

    if (slot.meals) {
      // Explicitly provided meals (e.g. empty array for kick-off)
      meals = slot.meals;
    } else if (slot.category) {
      const base = getMealRecommendations(slot.category, prefs, sport);
      meals = slot.mealIds ? base.filter((m) => slot.mealIds.includes(m.id)) : base;
    }

    return {
      time: absoluteTime,
      offsetLabel: formatOffset(slot.offsetMinutes),
      label: slot.label,
      meals,
      notes: slot.notes,
    };
  });
}

/**
 * Returns a short, human-readable label describing the day's nutrition focus.
 *
 * @param {"match-day"|"pre-match"|"training-day"|"rest-day"|"recovery-day"} dayType
 * @returns {string}
 */
export function getDailyNutritionFocus(dayType) {
  const labels = {
    "match-day": "Match Day Fueling",
    "pre-match": "Pre-Match Preparation",
    "training-day": "Training Nutrition",
    "recovery-day": "Recovery Focus",
    "rest-day": "Rest Day",
  };
  return labels[dayType] ?? "Daily Nutrition";
}

/**
 * Calculates macro targets based on the athlete's profile and the day type.
 *
 * Methodology:
 *   - Protein: 1.6–2.2 g/kg bodyweight depending on goal and day type
 *   - Carbohydrates: 3–10 g/kg depending on day type (sports science guidelines)
 *   - Fat: 0.8–1.5 g/kg as a floor for hormonal health
 *   - Calories: derived from macros (4 kcal/g protein, 4 kcal/g carbs, 9 kcal/g fat)
 *
 * userProfile fields used:
 *   - weight: number (kg) — defaults to 75 if not provided
 *   - fitnessLevel: "beginner" | "intermediate" | "advanced" | "elite"
 *   - goal: "performance" | "fat-loss" | "muscle-gain" | "maintenance"
 *   - sport: string
 *
 * @param {object} userProfile
 * @param {"match-day"|"pre-match"|"training-day"|"rest-day"|"recovery-day"} dayType
 * @returns {{ calories: number, protein: number, carbs: number, fat: number }}
 */
export function getMacroTargets(userProfile, dayType) {
  const weight = userProfile.weight || 75;
  const fitnessLevel = userProfile.fitnessLevel || "intermediate";
  const goal = userProfile.goal || "performance";

  // ── Protein multiplier (g/kg) ──────────────────────────
  // Higher on training/match days due to muscle breakdown; slightly lower on rest days.
  const proteinMap = {
    beginner: { "match-day": 1.7, "pre-match": 1.7, "training-day": 1.8, "recovery-day": 2.0, "rest-day": 1.6 },
    intermediate: { "match-day": 1.9, "pre-match": 1.8, "training-day": 2.0, "recovery-day": 2.2, "rest-day": 1.8 },
    advanced: { "match-day": 2.0, "pre-match": 1.9, "training-day": 2.2, "recovery-day": 2.2, "rest-day": 1.9 },
    elite: { "match-day": 2.2, "pre-match": 2.0, "training-day": 2.2, "recovery-day": 2.2, "rest-day": 2.0 },
  };

  // ── Carbohydrate multiplier (g/kg) ────────────────────
  // Based on IOC 2016 and ACSM guidelines for team/endurance sport.
  const carbsMap = {
    "match-day": 8.0,
    "pre-match": 7.0,
    "training-day": 6.0,
    "recovery-day": 5.0,
    "rest-day": 3.5,
  };

  // ── Fat multiplier (g/kg) ─────────────────────────────
  const fatMap = {
    "match-day": 0.9,
    "pre-match": 1.0,
    "training-day": 1.1,
    "recovery-day": 1.3,
    "rest-day": 1.3,
  };

  // ── Goal modifier ─────────────────────────────────────
  const goalModifier = {
    "performance": { proteinMod: 0, carbsMod: 0, fatMod: 0, caloriesMod: 1.0 },
    "fat-loss": { proteinMod: 0.2, carbsMod: -1.5, fatMod: -0.2, caloriesMod: 0.88 },
    "muscle-gain": { proteinMod: 0.2, carbsMod: 1.0, fatMod: 0.1, caloriesMod: 1.10 },
    "maintenance": { proteinMod: 0, carbsMod: -0.5, fatMod: 0, caloriesMod: 0.96 },
  };

  const levelProteinRate =
    (proteinMap[fitnessLevel] ?? proteinMap.intermediate)[dayType] ?? 1.8;
  const carbsRate = carbsMap[dayType] ?? 5.0;
  const fatRate = fatMap[dayType] ?? 1.1;
  const modifier = goalModifier[goal] ?? goalModifier.performance;

  const protein = Math.round((levelProteinRate + modifier.proteinMod) * weight);
  const carbs = Math.round(Math.max(0, (carbsRate + modifier.carbsMod) * weight));
  const fat = Math.round(Math.max(20, (fatRate + modifier.fatMod) * weight));

  const rawCalories = protein * 4 + carbs * 4 + fat * 9;
  const calories = Math.round(rawCalories * modifier.caloriesMod);

  return { calories, protein, carbs, fat };
}
