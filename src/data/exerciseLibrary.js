// AthleteOS Exercise Library
// Covers: Badminton, Tennis, Soccer
// Schema: id, name, category, sport, targetMuscles, sets, reps, restSeconds,
//         cues, injuryFlags, equipment, progressions, regressions, duration, positionTags

export const exerciseLibrary = {

  // ─────────────────────────────────────────────────────────────
  // BADMINTON — STRENGTH
  // ─────────────────────────────────────────────────────────────

  "bad-str-1": {
    id: "bad-str-1",
    name: "Romanian Single-Leg Deadlift",
    category: "strength",
    sport: ["badminton"],
    targetMuscles: ["hamstrings", "glutes", "erector spinae", "core"],
    sets: 3,
    reps: "8-10",
    restSeconds: 75,
    cues: [
      "Hinge at the hip, not the waist — keep the spine neutral throughout the movement",
      "Drive the standing heel into the floor and squeeze the glute at the top",
      "Keep the floating leg in line with the torso — imagine your body is one long plank"
    ],
    injuryFlags: [],
    equipment: ["dumbbells"],
    progressions: ["Barbell Single-Leg RDL", "Deficit Single-Leg RDL"],
    regressions: ["Bilateral Romanian Deadlift", "Bodyweight Hip Hinge to Wall"],
    duration: 0,
    positionTags: [],
  },

  "bad-str-2": {
    id: "bad-str-2",
    name: "Lateral Band Walk",
    category: "strength",
    sport: ["badminton"],
    targetMuscles: ["gluteus medius", "gluteus minimus", "hip abductors", "TFL"],
    sets: 3,
    reps: "15 each direction",
    restSeconds: 60,
    cues: [
      "Keep your toes pointed forward — do not let them rotate outward as you step",
      "Maintain a quarter-squat position throughout; do not let the hips rise on each step",
      "Push the band apart with each step rather than letting it pull your knees together"
    ],
    injuryFlags: [],
    equipment: ["bands"],
    progressions: ["Monster Walk", "Lateral Band Walk on Bosu"],
    regressions: ["Clamshell", "Supine Hip Abduction with Band"],
    duration: 0,
    positionTags: [],
  },

  "bad-str-3": {
    id: "bad-str-3",
    name: "Hip Thrust",
    category: "strength",
    sport: ["badminton"],
    targetMuscles: ["glutes", "hamstrings", "core"],
    sets: 4,
    reps: "10-12",
    restSeconds: 90,
    cues: [
      "Drive through your heels and squeeze your glutes hard at the top — do not hyperextend the lower back",
      "Tuck your chin and keep your ribs down; the movement should come from the hips, not the spine",
      "Pause for one second at the top before lowering — this maximises glute activation"
    ],
    injuryFlags: [],
    equipment: ["barbell", "bench"],
    progressions: ["Banded Barbell Hip Thrust", "Single-Leg Hip Thrust"],
    regressions: ["Glute Bridge", "Bodyweight Hip Thrust"],
    duration: 0,
    positionTags: [],
  },

  "bad-str-4": {
    id: "bad-str-4",
    name: "Wrist Flexion Curls",
    category: "strength",
    sport: ["badminton"],
    targetMuscles: ["wrist flexors", "forearm"],
    sets: 3,
    reps: "15-20",
    restSeconds: 45,
    cues: [
      "Rest the forearm fully on your thigh; only the wrist and hand should move",
      "Lower the weight slowly over 3 counts to build tendon resilience",
      "Use a light load — this is prehab work, not a strength contest"
    ],
    injuryFlags: [],
    equipment: ["dumbbells"],
    progressions: ["Reverse-Grip Barbell Wrist Curl", "Towel Wrist Curl"],
    regressions: ["Bodyweight Wrist Circles", "Finger Extension with Band"],
    duration: 0,
    positionTags: [],
  },

  "bad-str-5": {
    id: "bad-str-5",
    name: "Wrist Extension Curls",
    category: "strength",
    sport: ["badminton"],
    targetMuscles: ["wrist extensors", "forearm"],
    sets: 3,
    reps: "15-20",
    restSeconds: 45,
    cues: [
      "Support the forearm flat on your thigh with the palm facing down",
      "Lift only through the wrist — do not recruit the elbow or shoulder",
      "Control the descent for at least 3 seconds; the eccentric phase protects the tendon insertion"
    ],
    injuryFlags: [],
    equipment: ["dumbbells"],
    progressions: ["Reverse Barbell Curl", "Rice Bucket Extension Drill"],
    regressions: ["Theraband Wrist Extension", "Bodyweight Wrist Circles"],
    duration: 0,
    positionTags: [],
  },

  "bad-str-6": {
    id: "bad-str-6",
    name: "Pronation/Supination Cable Rotation",
    category: "strength",
    sport: ["badminton"],
    targetMuscles: ["pronator teres", "supinator", "forearm"],
    sets: 3,
    reps: "12-15 each direction",
    restSeconds: 60,
    cues: [
      "Keep the elbow pinned at 90° against your side — the rotation comes from the forearm only",
      "Move through the full range of motion; do not rush or shorten the arc",
      "If you feel pain at the lateral elbow, reduce load immediately and check with a physio"
    ],
    injuryFlags: ["Elbow"],
    equipment: ["cable", "dumbbells"],
    progressions: ["Hammer to Reverse Curl", "Loaded Forearm Rotation on Incline"],
    regressions: ["Bodyweight Forearm Rotation", "Theraband Supination"],
    duration: 0,
    positionTags: [],
  },

  "bad-str-7": {
    id: "bad-str-7",
    name: "Y-T-W Raises",
    category: "strength",
    sport: ["badminton"],
    targetMuscles: ["lower trapezius", "middle trapezius", "rotator cuff", "posterior deltoid"],
    sets: 3,
    reps: "12 each position",
    restSeconds: 60,
    cues: [
      "Start face-down on an incline bench — keep the thumbs pointing up in all three positions to protect the shoulder",
      "Move slowly and deliberately; these are small muscles — momentum defeats the purpose",
      "Pinch the shoulder blades together before lifting; the scapula should move first"
    ],
    injuryFlags: ["Shoulder"],
    equipment: ["dumbbells", "bodyweight"],
    progressions: ["Cable Y-T-W", "Prone Y-T-W with Plate"],
    regressions: ["Prone Scapular Retraction", "Band Pull-Apart"],
    duration: 0,
    positionTags: [],
  },

  "bad-str-8": {
    id: "bad-str-8",
    name: "Band External Rotation",
    category: "strength",
    sport: ["badminton"],
    targetMuscles: ["infraspinatus", "teres minor", "rotator cuff"],
    sets: 3,
    reps: "15-20",
    restSeconds: 45,
    cues: [
      "Keep the elbow tight to your side at 90° and rotate only from the shoulder joint",
      "Do not let the shoulder blade shrug upward — keep the scapula depressed throughout",
      "Pause at the end range for one second before returning — this builds rotator cuff endurance"
    ],
    injuryFlags: ["Shoulder"],
    equipment: ["bands"],
    progressions: ["Cable External Rotation", "Side-Lying Dumbbell External Rotation"],
    regressions: ["Isometric External Rotation against Wall", "Theraband Rotation at Low Resistance"],
    duration: 0,
    positionTags: [],
  },

  "bad-str-9": {
    id: "bad-str-9",
    name: "Copenhagen Adductor Hold",
    category: "strength",
    sport: ["badminton"],
    targetMuscles: ["adductors", "groin", "hip flexors"],
    sets: 3,
    reps: "20-30 sec hold",
    restSeconds: 60,
    cues: [
      "Stack the top foot on a bench and hold a side-plank position — your adductor is doing the work, not your shoulder",
      "Keep the lower leg lifted off the floor; if this is too hard, let it rest lightly",
      "Breathe steadily — this is an isometric hold, not a breath-hold contest"
    ],
    injuryFlags: [],
    equipment: ["bench", "bodyweight"],
    progressions: ["Copenhagen Short Lever Adductor Press", "Long-Lever Copenhagen"],
    regressions: ["Lying Adductor Squeeze with Ball", "Standing Adductor Isometric"],
    duration: 0,
    positionTags: [],
  },

  "bad-str-10": {
    id: "bad-str-10",
    name: "Single-Leg Calf Raise with Eccentric Lower",
    category: "strength",
    sport: ["badminton"],
    targetMuscles: ["gastrocnemius", "soleus", "Achilles tendon"],
    sets: 3,
    reps: "12-15",
    restSeconds: 75,
    cues: [
      "Rise on two feet if needed, then lower slowly on one foot over 4-5 seconds — the eccentric is the key stimulus",
      "Keep the knee straight for the first set (gastrocnemius focus) and slightly bent for the second (soleus focus)",
      "Stop immediately if you feel a sharp pinch in the Achilles — reduce range or load"
    ],
    injuryFlags: ["Achilles", "Ankle"],
    equipment: ["bodyweight", "dumbbells"],
    progressions: ["Weighted Single-Leg Calf Raise", "Deficit Single-Leg Calf Raise"],
    regressions: ["Bilateral Calf Raise", "Seated Calf Raise"],
    duration: 0,
    positionTags: [],
  },

  "bad-str-11": {
    id: "bad-str-11",
    name: "Pallof Press",
    category: "strength",
    sport: ["badminton"],
    targetMuscles: ["transverse abdominis", "obliques", "core stabilizers"],
    sets: 3,
    reps: "10-12 each side",
    restSeconds: 60,
    cues: [
      "Stand perpendicular to the cable — the challenge is resisting rotation, not pressing the weight",
      "Exhale fully as you press out; brace the core as if bracing for a punch",
      "Feet shoulder-width apart, slight bend in the knees — stand tall, do not lean away from the cable"
    ],
    injuryFlags: [],
    equipment: ["cable", "bands"],
    progressions: ["Pallof Press with Overhead Reach", "Half-Kneeling Pallof Press"],
    regressions: ["Dead Bug", "Plank with Shoulder Tap"],
    duration: 0,
    positionTags: [],
  },

  // ─────────────────────────────────────────────────────────────
  // BADMINTON — MOBILITY
  // ─────────────────────────────────────────────────────────────

  "bad-mob-1": {
    id: "bad-mob-1",
    name: "90/90 Hip Stretch",
    category: "mobility",
    sport: ["badminton"],
    targetMuscles: ["hip internal rotators", "hip external rotators", "piriformis"],
    sets: 2,
    reps: "90 sec each side",
    restSeconds: 30,
    cues: [
      "Sit with both legs at 90° angles — front shin parallel to your body, rear shin perpendicular",
      "Lean forward over the front shin keeping the spine long; avoid collapsing through the lower back",
      "Progress by shifting your weight toward the front leg to deepen the stretch"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["90/90 Hip Lift", "90/90 Seated Rotation"],
    regressions: ["Supine Figure-4 Stretch", "Lying Hip Rotation"],
    duration: 90,
    positionTags: [],
  },

  "bad-mob-2": {
    id: "bad-mob-2",
    name: "Thread the Needle",
    category: "mobility",
    sport: ["badminton"],
    targetMuscles: ["thoracic spine", "rhomboids", "posterior shoulder"],
    sets: 2,
    reps: "60 sec each side",
    restSeconds: 20,
    cues: [
      "Start on all fours; slide one arm under the opposite arm and let the shoulder rest on the floor",
      "Use the top arm pressing into the floor to deepen the rotation — breathe into the stretch",
      "Do not force the neck; it should follow the thoracic spine, not lead it"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["Side-Lying Thoracic Rotation", "Seated Thoracic Rotation with Dowel"],
    regressions: ["Cat-Cow", "Seated Trunk Rotation"],
    duration: 60,
    positionTags: [],
  },

  "bad-mob-3": {
    id: "bad-mob-3",
    name: "Ankle Dorsiflexion Wall Drill",
    category: "mobility",
    sport: ["badminton"],
    targetMuscles: ["ankle dorsiflexors", "gastrocnemius", "soleus"],
    sets: 2,
    reps: "60 sec each side",
    restSeconds: 20,
    cues: [
      "Position the foot 5-10 cm from the wall and drive the knee over the little toe without the heel lifting",
      "Gradually move the foot further from the wall as mobility improves — mark your progress",
      "Keep the torso upright; do not compensate by leaning forward at the hip"
    ],
    injuryFlags: ["Ankle"],
    equipment: ["bodyweight"],
    progressions: ["Weighted Dorsiflexion Stretch", "Single-Leg Calf Raise Full ROM"],
    regressions: ["Seated Ankle Circles", "Towel Calf Stretch"],
    duration: 60,
    positionTags: [],
  },

  "bad-mob-4": {
    id: "bad-mob-4",
    name: "Pigeon Pose",
    category: "mobility",
    sport: ["badminton"],
    targetMuscles: ["piriformis", "hip external rotators", "hip flexors"],
    sets: 2,
    reps: "90 sec each side",
    restSeconds: 20,
    cues: [
      "Bring the front shin as parallel to your torso as your hip allows — do not force the angle",
      "Prop up on your hands first, then slowly lower onto forearms as the hip opens",
      "Breathe deeply and consciously relax the glute of the front leg with each exhale"
    ],
    injuryFlags: ["Hip", "Knee"],
    equipment: ["bodyweight"],
    progressions: ["Deep Pigeon with Quad Pull", "Pigeon with Forward Fold"],
    regressions: ["Supine Figure-4", "Seated Hip External Rotation"],
    duration: 90,
    positionTags: [],
  },

  "bad-mob-5": {
    id: "bad-mob-5",
    name: "Open Book Stretch",
    category: "mobility",
    sport: ["badminton"],
    targetMuscles: ["thoracic spine", "pectorals", "anterior shoulder"],
    sets: 2,
    reps: "60 sec each side",
    restSeconds: 20,
    cues: [
      "Lie on your side with hips at 90°; rotate the top arm toward the ceiling and let it fall to the opposite side",
      "Keep the knees stacked and heavy — they act as an anchor for the hip while the thoracic spine rotates",
      "Follow your hand with your eyes to encourage full cervical rotation alongside the thoracic movement"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["Open Book with Foam Roller Between Knees", "Standing Thoracic Rotation"],
    regressions: ["Cat-Cow", "Seated Trunk Rotation"],
    duration: 60,
    positionTags: [],
  },

  "bad-mob-6": {
    id: "bad-mob-6",
    name: "Deep Lunge with Rotation",
    category: "mobility",
    sport: ["badminton"],
    targetMuscles: ["hip flexors", "glutes", "thoracic spine", "obliques"],
    sets: 2,
    reps: "60 sec each side",
    restSeconds: 20,
    cues: [
      "Step into a deep lunge, plant the front foot, then rotate the torso over the front thigh",
      "Push the front knee gently outward with the elbow to open the groin while maintaining balance",
      "Use your breath — exhale to rotate deeper, inhale to reset"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["Lunge with Overhead Reach", "World's Greatest Stretch Flow"],
    regressions: ["Kneeling Hip Flexor Stretch", "Half-Kneeling Rotation"],
    duration: 60,
    positionTags: [],
  },

  "bad-mob-7": {
    id: "bad-mob-7",
    name: "Forearm Flexor Stretch",
    category: "mobility",
    sport: ["badminton"],
    targetMuscles: ["wrist flexors", "forearm flexors", "medial elbow"],
    sets: 2,
    reps: "60 sec each side",
    restSeconds: 15,
    cues: [
      "Extend the arm fully, palm facing up, and gently pull the fingers back with the opposite hand",
      "Hold the stretch below the pain threshold — a mild pull is correct, sharp pain is not",
      "Rotate the palm slightly inward or outward to explore different regions of the flexor group"
    ],
    injuryFlags: ["Elbow"],
    equipment: ["bodyweight"],
    progressions: ["Wall Forearm Stretch with Weight Shift", "Prayer Stretch"],
    regressions: ["Passive Wrist Flexion", "Warm-Water Wrist Soak"],
    duration: 60,
    positionTags: [],
  },

  "bad-mob-8": {
    id: "bad-mob-8",
    name: "Overhead Lat Stretch",
    category: "mobility",
    sport: ["badminton"],
    targetMuscles: ["latissimus dorsi", "teres major", "shoulder girdle"],
    sets: 2,
    reps: "60 sec each side",
    restSeconds: 20,
    cues: [
      "Grip a rack or doorframe overhead with one hand and let the bodyweight gently pull the lat",
      "Lean the hips away from the hand and feel the stretch run from the armpit down the side",
      "Avoid shrugging the shoulder — keep the shoulder blade pulled down while you lean"
    ],
    injuryFlags: ["Shoulder"],
    equipment: ["bodyweight"],
    progressions: ["Overhead Lat Stretch with Side Bend", "Hanging Lat Stretch"],
    regressions: ["Child's Pose with Arm Reach", "Doorframe Lat Stretch Seated"],
    duration: 60,
    positionTags: [],
  },

  // ─────────────────────────────────────────────────────────────
  // BADMINTON — CONDITIONING
  // ─────────────────────────────────────────────────────────────

  "bad-con-1": {
    id: "bad-con-1",
    name: "Six-Corner Shadow Footwork",
    category: "conditioning",
    sport: ["badminton"],
    targetMuscles: ["quads", "glutes", "calves", "hip flexors", "cardiovascular system"],
    sets: 6,
    reps: "60 sec on / 30 sec off",
    restSeconds: 30,
    cues: [
      "Return to the center base position after every simulated shot — do not drift",
      "Use a proper split-step before each direction change; do not flat-foot the first step",
      "Keep the racket up and simulate a realistic swing at each corner"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["Six-Corner Shadow with Resistance Band Around Waist", "Random Corner Calling by Partner"],
    regressions: ["Four-Corner Shadow", "Slow Shadow Walk-Through"],
    duration: 60,
    positionTags: [],
  },

  "bad-con-2": {
    id: "bad-con-2",
    name: "Lateral Shuffle with Split-Step",
    category: "conditioning",
    sport: ["badminton"],
    targetMuscles: ["glutes", "hip abductors", "quads", "calves"],
    sets: 4,
    reps: "15 m x8",
    restSeconds: 45,
    cues: [
      "Stay low and wide in the athletic stance; avoid letting the knees collapse inward during the shuffle",
      "Plant the split-step at the change-of-direction cone before accelerating the other way",
      "Pump the arms in sync with the leg drive to maintain rhythm and speed"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["Lateral Shuffle with Med Ball Catch", "Lateral Shuffle on Resistance Sled"],
    regressions: ["Side Step Walk", "Lateral Shuffle at 50% Speed"],
    duration: 0,
    positionTags: [],
  },

  "bad-con-3": {
    id: "bad-con-3",
    name: "Jump Smash Landing Mechanics",
    category: "conditioning",
    sport: ["badminton"],
    targetMuscles: ["glutes", "quads", "calves", "core"],
    sets: 3,
    reps: "10",
    restSeconds: 60,
    cues: [
      "Jump from both feet, simulate the overhead smash swing, and land softly on one foot transitioning to two",
      "Bend the knees and hips on landing to absorb force — a stiff landing is an injury waiting to happen",
      "Check that the knee tracks over the second toe and does not cave inward on each landing"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["Jump Smash Landing with Immediate Sprint", "Weighted Vest Jump Smash"],
    regressions: ["Box Step-Down Landing Practice", "Two-Foot Jump and Land"],
    duration: 0,
    positionTags: [],
  },

  "bad-con-4": {
    id: "bad-con-4",
    name: "Diagonal Sprint-Lunge Intervals",
    category: "conditioning",
    sport: ["badminton"],
    targetMuscles: ["quads", "glutes", "hip flexors", "cardiovascular system"],
    sets: 4,
    reps: "6 diagonal reps each set",
    restSeconds: 60,
    cues: [
      "Sprint diagonally to a cone, lunge to simulate the rear-corner retrieve, then sprint back to center",
      "Keep the torso upright in the lunge — do not let the front knee shoot past the toes excessively",
      "Drive explosively from the lunge position back to center to replicate match-play recovery"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["Diagonal Sprint-Lunge with Racket Swing", "Diagonal Sprint-Lunge on Sand"],
    regressions: ["Walking Diagonal Lunge", "Cone Sprint without Lunge"],
    duration: 0,
    positionTags: [],
  },

  "bad-con-5": {
    id: "bad-con-5",
    name: "Reactive Step Drill",
    category: "conditioning",
    sport: ["badminton"],
    targetMuscles: ["fast-twitch fibers", "peroneus", "glutes", "quads"],
    sets: 5,
    reps: "8 reactions per set",
    restSeconds: 45,
    cues: [
      "Stand in ready position; react to a visual or auditory cue by stepping to the called direction",
      "The first step should be a powerful push off the opposite foot — minimize the reaction lag",
      "Keep your weight slightly forward on the balls of the feet so you can move in any direction"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["Reactive Step Drill with Random Cue App", "Reactive Step into Overhead Reach"],
    regressions: ["Planned Step Drill", "Mirror Drill with Partner at Half Speed"],
    duration: 0,
    positionTags: [],
  },

  // ─────────────────────────────────────────────────────────────
  // BADMINTON — POST-MATCH STRETCHES
  // ─────────────────────────────────────────────────────────────

  "bad-str-pm-1": {
    id: "bad-str-pm-1",
    name: "Dominant Hip Flexor Lunge Stretch",
    category: "stretch",
    sport: ["badminton"],
    targetMuscles: ["iliopsoas", "rectus femoris", "hip flexors"],
    sets: 2,
    reps: "90 sec each side",
    restSeconds: 15,
    cues: [
      "Kneel on the dominant side and shift the hips forward until you feel the stretch through the front of the hip",
      "Tuck the pelvis under slightly — do not arch the lower back to create a false sensation of stretch",
      "Raise the same-side arm overhead and lean slightly away to add a lateral component"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: [],
    regressions: [],
    duration: 90,
    positionTags: [],
  },

  "bad-str-pm-2": {
    id: "bad-str-pm-2",
    name: "Adductor Seated Straddle",
    category: "stretch",
    sport: ["badminton"],
    targetMuscles: ["adductors", "groin", "hamstrings"],
    sets: 2,
    reps: "60 sec",
    restSeconds: 15,
    cues: [
      "Sit tall with legs wide apart; fold forward from the hips, not the lower back",
      "Place hands on the floor in front and walk them forward gradually — do not bounce",
      "Breathe deeply into the groin; with each exhale consciously release tension in the inner thighs"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: [],
    regressions: [],
    duration: 60,
    positionTags: [],
  },

  "bad-str-pm-3": {
    id: "bad-str-pm-3",
    name: "Forearm Flexor Wall Stretch",
    category: "stretch",
    sport: ["badminton"],
    targetMuscles: ["wrist flexors", "forearm", "medial elbow"],
    sets: 2,
    reps: "60 sec each side",
    restSeconds: 10,
    cues: [
      "Place the palm flat on a wall, fingers pointing downward, with the arm straight",
      "Gently rotate away from the wall to increase the stretch along the forearm and into the elbow",
      "This should feel like a relieving release — if it is sharp, ease off and consult a physio"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: [],
    regressions: [],
    duration: 60,
    positionTags: [],
  },

  "bad-str-pm-4": {
    id: "bad-str-pm-4",
    name: "Thoracic Foam Roller Extension",
    category: "stretch",
    sport: ["badminton"],
    targetMuscles: ["thoracic spine", "erector spinae", "intercostals"],
    sets: 2,
    reps: "90 sec",
    restSeconds: 15,
    cues: [
      "Place the roller perpendicular to the spine at the mid-back; support the head with hands interlaced",
      "Gently extend over the roller, allow gravity to do the work — no aggressive bouncing",
      "Move the roller one vertebra at a time up the thoracic spine, spending time at each stiff segment"
    ],
    injuryFlags: [],
    equipment: ["foam roller"],
    progressions: [],
    regressions: [],
    duration: 90,
    positionTags: [],
  },

  "bad-str-pm-5": {
    id: "bad-str-pm-5",
    name: "Standing Calf Achilles Stretch",
    category: "stretch",
    sport: ["badminton"],
    targetMuscles: ["gastrocnemius", "soleus", "Achilles tendon"],
    sets: 2,
    reps: "60 sec each side",
    restSeconds: 10,
    cues: [
      "Straight-knee version first (gastrocnemius): heel on the floor, toes up on a step or wall",
      "Then bend the knee slightly to shift the stretch into the soleus and Achilles insertion",
      "Never force the heel off the ground — this should be a gentle sustained stretch, not a yank"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: [],
    regressions: [],
    duration: 60,
    positionTags: [],
  },

  "bad-str-pm-6": {
    id: "bad-str-pm-6",
    name: "Shoulder Cross-Body Stretch",
    category: "stretch",
    sport: ["badminton"],
    targetMuscles: ["posterior shoulder", "teres minor", "infraspinatus"],
    sets: 2,
    reps: "45 sec each side",
    restSeconds: 10,
    cues: [
      "Draw the arm across the chest with the opposite hand at the elbow — not the wrist",
      "Keep the shoulder down and resist the urge to shrug; the stretch should be felt at the back of the shoulder",
      "Breathe and relax into the stretch — match play compresses the posterior capsule significantly"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: [],
    regressions: [],
    duration: 45,
    positionTags: [],
  },

  // ─────────────────────────────────────────────────────────────
  // TENNIS — STRENGTH
  // ─────────────────────────────────────────────────────────────

  "ten-str-1": {
    id: "ten-str-1",
    name: "Cable Wood Chop",
    category: "strength",
    sport: ["tennis"],
    targetMuscles: ["obliques", "transverse abdominis", "glutes", "shoulders"],
    sets: 3,
    reps: "12 each direction",
    restSeconds: 75,
    cues: [
      "The power comes from the hips and legs — let the core transfer that force, not generate it alone",
      "Keep the arms slightly bent and move through a full diagonal arc from hip to opposite shoulder",
      "Do not rotate the knees — the pivot comes from the hips and thoracic spine"
    ],
    injuryFlags: [],
    equipment: ["cable", "bands"],
    progressions: ["Cable Chop with Lunge", "Medicine Ball Chop Throw"],
    regressions: ["Half-Kneeling Cable Chop", "Seated Rotation with Plate"],
    duration: 0,
    positionTags: [],
  },

  "ten-str-2": {
    id: "ten-str-2",
    name: "Medicine Ball Rotational Throw",
    category: "strength",
    sport: ["tennis"],
    targetMuscles: ["obliques", "glutes", "pectorals", "shoulders", "legs"],
    sets: 4,
    reps: "8 each side",
    restSeconds: 90,
    cues: [
      "Load into the back hip, coil the core, then uncoil explosively — the ball follows the body rotation",
      "Release the ball at the moment you would contact the ball in your serve or groundstroke",
      "Reset fully between reps; this is power training — quality over quantity"
    ],
    injuryFlags: [],
    equipment: ["medicine ball"],
    progressions: ["Heavy Med Ball Throw", "Med Ball Throw with Approach Step"],
    regressions: ["Standing Cable Rotation", "Half-Speed Rotational Throw"],
    duration: 0,
    positionTags: [],
  },

  "ten-str-3": {
    id: "ten-str-3",
    name: "Pallof Press",
    category: "strength",
    sport: ["tennis"],
    targetMuscles: ["transverse abdominis", "obliques", "core stabilizers"],
    sets: 3,
    reps: "10-12 each side",
    restSeconds: 60,
    cues: [
      "Resist the cable's pull to rotate — this trains the anti-rotation demand critical in tennis groundstrokes",
      "Exhale as you press out and hold for one second; do not rush the return",
      "Stand perpendicular to the cable and keep the shoulders level throughout"
    ],
    injuryFlags: [],
    equipment: ["cable", "bands"],
    progressions: ["Pallof Press with Overhead Reach", "Single-Leg Pallof Press"],
    regressions: ["Dead Bug", "Plank Hold"],
    duration: 0,
    positionTags: [],
  },

  "ten-str-4": {
    id: "ten-str-4",
    name: "Bulgarian Split Squat",
    category: "strength",
    sport: ["tennis"],
    targetMuscles: ["quads", "glutes", "hamstrings", "hip flexors"],
    sets: 4,
    reps: "8-10 each leg",
    restSeconds: 90,
    cues: [
      "Keep the torso upright and drive through the front heel — not the toes",
      "Control the descent over 3 seconds; the stretch through the rear hip flexor is the training stimulus",
      "Position the front foot far enough forward so the shin is vertical at the bottom of the movement"
    ],
    injuryFlags: [],
    equipment: ["dumbbells", "barbell", "bench"],
    progressions: ["Barbell Bulgarian Split Squat", "Deficit Bulgarian Split Squat"],
    regressions: ["Reverse Lunge", "Step-Up"],
    duration: 0,
    positionTags: [],
  },

  "ten-str-5": {
    id: "ten-str-5",
    name: "Single-Leg RDL",
    category: "strength",
    sport: ["tennis"],
    targetMuscles: ["hamstrings", "glutes", "erector spinae", "core"],
    sets: 3,
    reps: "8-10 each leg",
    restSeconds: 75,
    cues: [
      "Hinge from the hip and let the back leg rise naturally as a counterbalance — do not force it up",
      "Keep both hips level to the floor; the tendency is to open the hip of the lifted leg",
      "Maintain a long spine from crown to heel of the floating foot"
    ],
    injuryFlags: [],
    equipment: ["dumbbells", "kettlebell"],
    progressions: ["Barbell Single-Leg RDL", "Single-Leg RDL to Knee Drive"],
    regressions: ["Staggered-Stance RDL", "Glute Bridge"],
    duration: 0,
    positionTags: [],
  },

  "ten-str-6": {
    id: "ten-str-6",
    name: "Wrist Extensor Eccentric Curl",
    category: "strength",
    sport: ["tennis"],
    targetMuscles: ["wrist extensors", "lateral forearm", "lateral elbow"],
    sets: 3,
    reps: "15",
    restSeconds: 60,
    cues: [
      "Rest the forearm on your thigh, palm down; lift slowly and lower over 5 seconds — the eccentric is the medicine",
      "Use a very light weight — 1-2 kg is sufficient; this is tendon loading, not muscle building",
      "If you experience lateral elbow pain during the exercise, reduce the load rather than stopping altogether"
    ],
    injuryFlags: ["Elbow"],
    equipment: ["dumbbells"],
    progressions: ["Reverse Barbell Curl", "Rice Bucket Wrist Extension"],
    regressions: ["Theraband Wrist Extension", "Isometric Wrist Extension"],
    duration: 0,
    positionTags: [],
  },

  "ten-str-7": {
    id: "ten-str-7",
    name: "Shoulder External Rotation with Band",
    category: "strength",
    sport: ["tennis"],
    targetMuscles: ["infraspinatus", "teres minor", "rotator cuff"],
    sets: 3,
    reps: "15-20",
    restSeconds: 45,
    cues: [
      "Elbow pinned at 90° to the side; only the forearm moves — keep the upper arm still",
      "Pull the band slowly and return under control; do not let the band snap the arm back",
      "Feel the squeeze at the back of the shoulder at the end range — hold briefly"
    ],
    injuryFlags: ["Shoulder"],
    equipment: ["bands"],
    progressions: ["Dumbbell Side-Lying External Rotation", "Cable External Rotation"],
    regressions: ["Isometric External Rotation", "Wall External Rotation Drill"],
    duration: 0,
    positionTags: [],
  },

  "ten-str-8": {
    id: "ten-str-8",
    name: "Face Pull",
    category: "strength",
    sport: ["tennis"],
    targetMuscles: ["posterior deltoid", "middle trapezius", "rhomboids", "external rotators"],
    sets: 3,
    reps: "15-20",
    restSeconds: 60,
    cues: [
      "Pull the rope toward your face with the elbows flared high — finish with thumbs pointing behind you",
      "Keep the chest tall and do not let the head jut forward to meet the rope",
      "Focus on squeezing the rear deltoids and upper back at the end point of each rep"
    ],
    injuryFlags: ["Shoulder"],
    equipment: ["cable", "bands"],
    progressions: ["Face Pull with External Rotation Pause", "Prone Y Raise on Incline"],
    regressions: ["Band Pull-Apart", "Seated Row"],
    duration: 0,
    positionTags: [],
  },

  "ten-str-9": {
    id: "ten-str-9",
    name: "Lateral Step-Up",
    category: "strength",
    sport: ["tennis"],
    targetMuscles: ["glutes", "quads", "hip abductors", "hamstrings"],
    sets: 3,
    reps: "10-12 each leg",
    restSeconds: 75,
    cues: [
      "Step laterally onto the box, drive through the heel of the top foot, and stand tall before stepping down",
      "Do not push off the bottom foot — all the work should come from the leg on the box",
      "Control the step-down slowly; the eccentric deceleration is critical for court movement"
    ],
    injuryFlags: [],
    equipment: ["bench", "box", "dumbbells"],
    progressions: ["Weighted Lateral Step-Up", "Lateral Step-Up to Balance"],
    regressions: ["Step-Up onto Low Box", "Side Step-Touch"],
    duration: 0,
    positionTags: [],
  },

  "ten-str-10": {
    id: "ten-str-10",
    name: "Copenhagen Adductor Hold",
    category: "strength",
    sport: ["tennis"],
    targetMuscles: ["adductors", "groin", "hip stabilizers"],
    sets: 3,
    reps: "20-30 sec hold",
    restSeconds: 60,
    cues: [
      "Top foot rests on a bench; hold the side plank position with the adductor pulling the body up",
      "Keep the hips in line — do not let the pelvis drop or rotate",
      "Breathe steadily; the hold duration is the challenge, not the load"
    ],
    injuryFlags: [],
    equipment: ["bench", "bodyweight"],
    progressions: ["Long-Lever Copenhagen Hold", "Copenhagen Adductor Press"],
    regressions: ["Adductor Squeeze with Ball", "Short-Lever Copenhagen Hold"],
    duration: 0,
    positionTags: [],
  },

  // ─────────────────────────────────────────────────────────────
  // TENNIS — MOBILITY
  // ─────────────────────────────────────────────────────────────

  "ten-mob-1": {
    id: "ten-mob-1",
    name: "Hip Internal Rotation Stretch",
    category: "mobility",
    sport: ["tennis"],
    targetMuscles: ["hip internal rotators", "glute medius", "TFL"],
    sets: 2,
    reps: "60 sec each side",
    restSeconds: 20,
    cues: [
      "Sit on the floor with one knee bent inward; let gravity pull the knee toward the floor",
      "Place a gentle hand pressure on the knee to deepen the stretch — do not force it",
      "Keep the pelvis neutral; do not compensate by letting the opposite hip lift"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["90/90 Hip Internal Rotation", "Standing Hip Internal Rotation Drill"],
    regressions: ["Supine Hip Internal Rotation", "Side-Lying Internal Rotation"],
    duration: 60,
    positionTags: [],
  },

  "ten-mob-2": {
    id: "ten-mob-2",
    name: "Thoracic Extension over Foam Roller",
    category: "mobility",
    sport: ["tennis"],
    targetMuscles: ["thoracic spine", "erector spinae", "pectorals"],
    sets: 2,
    reps: "90 sec",
    restSeconds: 20,
    cues: [
      "Position the roller at the mid-thoracic spine and support the head — do not let the head drop unsupported",
      "Extend gently over the roller, hold 3-5 seconds, then shift one segment and repeat",
      "This unlocks the thoracic rotation needed for an effective serve — focus on the area between the shoulder blades"
    ],
    injuryFlags: [],
    equipment: ["foam roller"],
    progressions: ["Thoracic Extension with Overhead Reach", "Thoracic Rotation over Roller"],
    regressions: ["Seated Thoracic Extension over Chair", "Cat-Cow"],
    duration: 90,
    positionTags: [],
  },

  "ten-mob-3": {
    id: "ten-mob-3",
    name: "Kneeling Hip Flexor Stretch",
    category: "mobility",
    sport: ["tennis"],
    targetMuscles: ["iliopsoas", "rectus femoris", "hip flexors"],
    sets: 2,
    reps: "90 sec each side",
    restSeconds: 20,
    cues: [
      "Kneel on one knee, step the other foot forward, and shift the hips forward until you feel the front of the hip open",
      "Tuck the pelvis slightly under — a neutral or posteriorly tilted pelvis deepens the stretch on the iliopsoas",
      "Avoid arching the lower back; the stretch should be felt through the front of the hip, not the lumbar spine"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["Kneeling Hip Flexor Stretch with Arm Reach", "Couch Stretch"],
    regressions: ["Standing Hip Flexor Stretch", "Supine Hip Flexor Stretch"],
    duration: 90,
    positionTags: [],
  },

  "ten-mob-4": {
    id: "ten-mob-4",
    name: "Ankle Dorsiflexion Drill",
    category: "mobility",
    sport: ["tennis"],
    targetMuscles: ["ankle dorsiflexors", "gastrocnemius", "soleus"],
    sets: 2,
    reps: "60 sec each side",
    restSeconds: 20,
    cues: [
      "Foot 5-10 cm from wall, drive the knee over the little toe without the heel lifting",
      "Progressively move the foot further from the wall — note your maximum distance each session",
      "Good ankle dorsiflexion prevents knee valgus on split-step landing — an ACL risk factor"
    ],
    injuryFlags: ["Ankle"],
    equipment: ["bodyweight"],
    progressions: ["Weighted Dorsiflexion Stretch", "Ankle Dorsiflexion on Slant Board"],
    regressions: ["Seated Ankle Circles", "Towel Calf Stretch"],
    duration: 60,
    positionTags: [],
  },

  "ten-mob-5": {
    id: "ten-mob-5",
    name: "Sleeper Stretch",
    category: "mobility",
    sport: ["tennis"],
    targetMuscles: ["posterior shoulder capsule", "infraspinatus", "teres minor"],
    sets: 2,
    reps: "60 sec each side",
    restSeconds: 20,
    cues: [
      "Lie on the affected side with the shoulder at 90° and internally rotate the forearm toward the bed",
      "Use the opposite hand to apply gentle pressure on the wrist — never force the stretch",
      "This addresses posterior shoulder tightness that is almost universal in tennis players — do it daily"
    ],
    injuryFlags: ["Shoulder"],
    equipment: ["bodyweight"],
    progressions: ["Cross-Body Posterior Shoulder Stretch", "Horizontal Adduction Stretch"],
    regressions: ["Passive Internal Rotation", "Door Frame Posterior Shoulder Mobilisation"],
    duration: 60,
    positionTags: [],
  },

  "ten-mob-6": {
    id: "ten-mob-6",
    name: "Doorframe Chest Opener",
    category: "mobility",
    sport: ["tennis"],
    targetMuscles: ["pectorals", "anterior shoulder", "biceps tendon"],
    sets: 2,
    reps: "60 sec each side",
    restSeconds: 15,
    cues: [
      "Place the forearm on the door frame at 90°, step through the doorway and feel the chest open",
      "Vary the arm height from 90° to 120° to target different portions of the pectoral muscle",
      "Keep the core braced and avoid arching the lower back to simulate a stretch that is not there"
    ],
    injuryFlags: ["Shoulder"],
    equipment: ["bodyweight"],
    progressions: ["Band-Assisted Chest Opener", "Prone Chest Opener with Towel"],
    regressions: ["Supine Chest Opener over Roller", "Wall Pec Stretch at Lower Height"],
    duration: 60,
    positionTags: [],
  },

  "ten-mob-7": {
    id: "ten-mob-7",
    name: "Seated Figure-4 Stretch",
    category: "mobility",
    sport: ["tennis"],
    targetMuscles: ["piriformis", "glute medius", "hip external rotators"],
    sets: 2,
    reps: "60 sec each side",
    restSeconds: 15,
    cues: [
      "Sit on a chair, cross one ankle over the opposite knee and gently press down on the raised knee",
      "Hinge forward at the hip with a long spine to deepen the glute stretch",
      "Feel the stretch in the outer hip and glute — these muscles are heavily loaded in open-stance groundstrokes"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["Pigeon Pose", "Figure-4 with Forward Fold on Floor"],
    regressions: ["Supine Figure-4", "Glute Self-Massage"],
    duration: 60,
    positionTags: [],
  },

  // ─────────────────────────────────────────────────────────────
  // TENNIS — CONDITIONING
  // ─────────────────────────────────────────────────────────────

  "ten-con-1": {
    id: "ten-con-1",
    name: "Point-Length Intervals",
    category: "conditioning",
    sport: ["tennis"],
    targetMuscles: ["cardiovascular system", "legs", "core"],
    sets: 15,
    reps: "25 sec work / 20 sec rest",
    restSeconds: 20,
    cues: [
      "Move continuously during the work interval — shuffle, sprint, decelerate and change direction",
      "Replicate the energy demands of a real point: burst efforts with incomplete recovery",
      "Monitor your heart rate — you should be working at 85-90% max HR during work intervals"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["Longer Work Sets 35 sec", "Point Intervals with Med Ball"],
    regressions: ["10 sec Work / 20 sec Rest", "Walking Recovery Between Sets"],
    duration: 25,
    positionTags: [],
  },

  "ten-con-2": {
    id: "ten-con-2",
    name: "Baseline-to-Net Sprint and Backpedal",
    category: "conditioning",
    sport: ["tennis"],
    targetMuscles: ["quads", "glutes", "hamstrings", "cardiovascular system"],
    sets: 3,
    reps: "x10",
    restSeconds: 90,
    cues: [
      "Sprint forward from the baseline to the service line, plant and backpedal back to baseline",
      "Stay low on the backpedal — do not turn your back to the net",
      "Touch the line with your foot at each end before changing direction"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["Baseline-to-Net with Lateral Shuffle Extension", "Weighted Vest Sprint"],
    regressions: ["Half-Speed Drill", "Jog and Walk Version"],
    duration: 0,
    positionTags: [],
  },

  "ten-con-3": {
    id: "ten-con-3",
    name: "Lateral Shuffle Baseline Drill",
    category: "conditioning",
    sport: ["tennis"],
    targetMuscles: ["hip abductors", "glutes", "quads", "cardiovascular system"],
    sets: 4,
    reps: "8 lengths of the baseline",
    restSeconds: 60,
    cues: [
      "Shuffle from doubles sideline to doubles sideline without crossing your feet",
      "Touch each sideline with the hand closest to it — this ensures you reach full court width",
      "Keep your racket up and ready position throughout — train as you play"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["Lateral Shuffle with Forehand and Backhand Swings", "Resistance Band Lateral Shuffle"],
    regressions: ["Side-Step Walk Baseline", "Half-Width Lateral Shuffle"],
    duration: 0,
    positionTags: [],
  },

  "ten-con-4": {
    id: "ten-con-4",
    name: "5m Acceleration Bursts with Split-Step Pattern",
    category: "conditioning",
    sport: ["tennis"],
    targetMuscles: ["fast-twitch fibers", "glutes", "calves", "quads"],
    sets: 5,
    reps: "8 bursts per set",
    restSeconds: 60,
    cues: [
      "Start with a split-step, then explode for exactly 5 metres and decelerate under control",
      "The first two steps are the most critical — drive the knees high and push explosively off the ground",
      "Vary direction (forward, lateral, diagonal) within each set to simulate court movement"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["5m Burst with Reaction Cue", "5m Burst with Cone Touch"],
    regressions: ["3m Burst", "Half-Speed Acceleration Drill"],
    duration: 0,
    positionTags: [],
  },

  "ten-con-5": {
    id: "ten-con-5",
    name: "Multi-Direction Cone Drill T-Drill Variation",
    category: "conditioning",
    sport: ["tennis"],
    targetMuscles: ["agility", "quads", "glutes", "hip abductors", "cardiovascular system"],
    sets: 6,
    reps: "1 rep per set, alternate start direction",
    restSeconds: 75,
    cues: [
      "Set up a T-shape with cones; sprint forward, shuffle left and right along the top, shuffle back to center, backpedal home",
      "Touch each cone with the nearest hand — this commits you to full range of movement",
      "Time each rep; aim for consistency across all 6 sets rather than only the first few"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["T-Drill with Reaction Start", "Extended T-Drill with Additional Legs"],
    regressions: ["Walk-Through T-Drill", "L-Drill"],
    duration: 0,
    positionTags: [],
  },

  // ─────────────────────────────────────────────────────────────
  // SOCCER — STRENGTH
  // ─────────────────────────────────────────────────────────────

  "soc-str-1": {
    id: "soc-str-1",
    name: "Nordic Hamstring Curl",
    category: "strength",
    sport: ["soccer"],
    targetMuscles: ["hamstrings", "gluteus maximus", "gastrocnemius"],
    sets: 3,
    reps: "6-8",
    restSeconds: 120,
    cues: [
      "Kneel with ankles anchored; lower your body as slowly as possible before catching yourself with your hands",
      "The eccentric phase is the exercise — control the fall, do not just drop",
      "As strength improves, push back up with as little hand assistance as possible"
    ],
    injuryFlags: ["Knee"],
    equipment: ["bodyweight", "partner"],
    progressions: ["Full Nordic Hamstring Curl Unassisted", "Weighted Nordic Curl"],
    regressions: ["Assisted Nordic with Band", "Glute-Ham Raise on Machine"],
    duration: 0,
    positionTags: ["goalkeeper", "center back", "fullback", "midfielder", "striker", "winger"],
  },

  "soc-str-2": {
    id: "soc-str-2",
    name: "Lateral Band Walk",
    category: "strength",
    sport: ["soccer"],
    targetMuscles: ["gluteus medius", "hip abductors", "TFL"],
    sets: 3,
    reps: "15 each direction",
    restSeconds: 60,
    cues: [
      "Step sideways in a squat stance with the band above the knees — keep the toes forward",
      "Do not let the stance narrow as you step; maintain constant tension on the band",
      "Squeeze the glute of the stepping leg as it reaches full extension"
    ],
    injuryFlags: [],
    equipment: ["bands"],
    progressions: ["Monster Walk", "Lateral Band Walk with Overhead Press"],
    regressions: ["Clamshell", "Side-Lying Hip Abduction"],
    duration: 0,
    positionTags: ["center back", "fullback", "midfielder", "striker", "winger"],
  },

  "soc-str-3": {
    id: "soc-str-3",
    name: "Single-Leg Squat",
    category: "strength",
    sport: ["soccer"],
    targetMuscles: ["quads", "glutes", "hamstrings", "core"],
    sets: 3,
    reps: "8-10 each leg",
    restSeconds: 75,
    cues: [
      "Stand on one leg, squat until the thigh is parallel to the floor and return — keep the knee in line with the toes",
      "Reach both arms forward as you squat to counterbalance and keep the torso upright",
      "Do not let the pelvis drop on the non-working side — engage the glute medius throughout"
    ],
    injuryFlags: [],
    equipment: ["bodyweight", "dumbbells"],
    progressions: ["Pistol Squat", "Single-Leg Squat to Box with Load"],
    regressions: ["Box Squat", "TRX Single-Leg Squat"],
    duration: 0,
    positionTags: ["center back", "fullback", "midfielder", "striker", "winger"],
  },

  "soc-str-4": {
    id: "soc-str-4",
    name: "Hip Thrust",
    category: "strength",
    sport: ["soccer"],
    targetMuscles: ["glutes", "hamstrings", "core"],
    sets: 4,
    reps: "10-12",
    restSeconds: 90,
    cues: [
      "Load the barbell across the hips with a pad for comfort; upper back rests on the bench",
      "Drive through the heels and squeeze the glutes hard at the top — do not hyperextend the lumbar",
      "Full hip extension at the top is non-negotiable; half-reps do not build sprint power"
    ],
    injuryFlags: [],
    equipment: ["barbell", "bench"],
    progressions: ["Banded Hip Thrust", "Single-Leg Hip Thrust"],
    regressions: ["Glute Bridge", "Bodyweight Hip Thrust"],
    duration: 0,
    positionTags: ["striker", "winger"],
  },

  "soc-str-5": {
    id: "soc-str-5",
    name: "Adductor Copenhagen Hold",
    category: "strength",
    sport: ["soccer"],
    targetMuscles: ["adductors", "groin", "hip flexors"],
    sets: 3,
    reps: "20-30 sec hold",
    restSeconds: 60,
    cues: [
      "Top leg on bench, body in side plank — the adductor supports your body weight",
      "Keep the hips forward and stacked; do not let the pelvis rotate backward",
      "Progress from short-lever (knee on bench) to long-lever (ankle on bench) over time"
    ],
    injuryFlags: [],
    equipment: ["bench", "bodyweight"],
    progressions: ["Long-Lever Copenhagen Hold", "Copenhagen Adductor Press"],
    regressions: ["Short-Lever Copenhagen", "Adductor Ball Squeeze"],
    duration: 0,
    positionTags: ["goalkeeper", "center back", "fullback", "midfielder", "striker", "winger"],
  },

  "soc-str-6": {
    id: "soc-str-6",
    name: "Loaded Jump Mechanics",
    category: "strength",
    sport: ["soccer"],
    targetMuscles: ["quads", "glutes", "calves", "core"],
    sets: 4,
    reps: "6",
    restSeconds: 120,
    cues: [
      "Jump from both feet with a short countermovement; land softly with knees and hips absorbing the force",
      "On landing, immediately check that knees are tracking over the toes — valgus collapse is the ACL killer",
      "Reset fully between reps; this is strength and neuromuscular training, not cardio"
    ],
    injuryFlags: [],
    equipment: ["bodyweight", "vest"],
    progressions: ["Depth Jump", "Weighted Vest Jump Mechanics"],
    regressions: ["Box Jump Landing Practice", "Double Broad Jump"],
    duration: 0,
    positionTags: ["center back", "striker"],
  },

  "soc-str-7": {
    id: "soc-str-7",
    name: "Neck Stability Isometrics",
    category: "strength",
    sport: ["soccer"],
    targetMuscles: ["neck flexors", "neck extensors", "sternocleidomastoid", "upper trapezius"],
    sets: 3,
    reps: "8 reps each direction",
    restSeconds: 60,
    cues: [
      "Place the hand against the forehead and resist the neck extension — the head should not move",
      "Work in all four directions: front, back, left side, right side",
      "Start with low force — neck isometrics are effective even at 20-30% of maximum effort"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["Neck Isometric with Plate Resistance", "Neck Bridge on Mat"],
    regressions: ["Gentle Neck Isometric at Minimal Force", "Cervical Stabilisation with Head Nod"],
    duration: 0,
    positionTags: ["center back"],
  },

  "soc-str-8": {
    id: "soc-str-8",
    name: "Lateral Explosive Step-Up",
    category: "strength",
    sport: ["soccer"],
    targetMuscles: ["glutes", "quads", "hip abductors", "calves"],
    sets: 4,
    reps: "8 each leg",
    restSeconds: 90,
    cues: [
      "Approach the box laterally, drive explosively upward off the leading leg, and land softly at the top",
      "Do not use the bottom leg to push off — load must come from the working leg",
      "Pause briefly at the top to establish balance before stepping down"
    ],
    injuryFlags: [],
    equipment: ["box", "dumbbells"],
    progressions: ["Weighted Lateral Step-Up", "Lateral Step-Up to Jump"],
    regressions: ["Lateral Step-Up Low Box", "Side Step-Touch"],
    duration: 0,
    positionTags: ["fullback", "winger"],
  },

  "soc-str-9": {
    id: "soc-str-9",
    name: "Anti-Rotation Core Press",
    category: "strength",
    sport: ["soccer"],
    targetMuscles: ["transverse abdominis", "obliques", "core stabilizers"],
    sets: 3,
    reps: "10-12 each side",
    restSeconds: 60,
    cues: [
      "Stand perpendicular to the cable at chest height; resist the rotational pull as you press out",
      "Keep the pelvis neutral and core braced — do not let the hips shift toward the machine",
      "Exhale on the press; the breath creates intra-abdominal pressure that makes resistance training safer"
    ],
    injuryFlags: [],
    equipment: ["cable", "bands"],
    progressions: ["Anti-Rotation Press on One Leg", "Pallof Press with Band Walk"],
    regressions: ["Dead Bug", "Plank Hold"],
    duration: 0,
    positionTags: ["midfielder"],
  },

  "soc-str-10": {
    id: "soc-str-10",
    name: "Goalkeeper Lateral Dive and Push-Up",
    category: "strength",
    sport: ["soccer"],
    targetMuscles: ["pectorals", "shoulder girdle", "core", "hip flexors"],
    sets: 4,
    reps: "6 each direction",
    restSeconds: 90,
    cues: [
      "Start in a wide athletic squat; dive laterally to one side, perform a push-up, and explosively return to standing",
      "The push-up is full range — chest to the floor; build upper body contact strength for real-game saves",
      "Keep the eyes up and visualise the ball — goalkeeping is as much cognitive as physical"
    ],
    injuryFlags: [],
    equipment: ["bodyweight", "mat"],
    progressions: ["Weighted Vest Lateral Dive", "Dive onto Box"],
    regressions: ["Lateral Dive without Push-Up", "Step and Push-Up"],
    duration: 0,
    positionTags: ["goalkeeper"],
  },

  "soc-str-11": {
    id: "soc-str-11",
    name: "Goalkeeper Wrist Loading",
    category: "strength",
    sport: ["soccer"],
    targetMuscles: ["wrist extensors", "wrist flexors", "forearm"],
    sets: 3,
    reps: "15-20",
    restSeconds: 45,
    cues: [
      "Perform wrist extension and flexion curls with a light dumbbell — focus on the full range of motion",
      "The goal is tendon and ligament conditioning to withstand the impact of shot-stopping",
      "Alternate between palm-up (flexors) and palm-down (extensors) sets within the same session"
    ],
    injuryFlags: [],
    equipment: ["dumbbells"],
    progressions: ["Rice Bucket Drills", "Loaded Wrist Roller"],
    regressions: ["Theraband Wrist Exercises", "Wrist Circles"],
    duration: 0,
    positionTags: ["goalkeeper"],
  },

  "soc-str-12": {
    id: "soc-str-12",
    name: "Single-Leg Lateral Bound",
    category: "strength",
    sport: ["soccer"],
    targetMuscles: ["glutes", "quads", "hip abductors", "calves"],
    sets: 4,
    reps: "6 each leg",
    restSeconds: 90,
    cues: [
      "Push off one leg laterally as far as possible; land on the opposite single leg and stick the landing",
      "Absorb the landing through the hip, knee and ankle — do not land stiff",
      "The goal is maximum horizontal distance with a controlled, balanced landing"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["Continuous Lateral Bounds", "Lateral Bound with Med Ball"],
    regressions: ["Step-Out to Balance", "Two-Leg Lateral Jump"],
    duration: 0,
    positionTags: ["goalkeeper"],
  },

  // ─────────────────────────────────────────────────────────────
  // SOCCER — MOBILITY
  // ─────────────────────────────────────────────────────────────

  "soc-mob-1": {
    id: "soc-mob-1",
    name: "90/90 Hip Stretch",
    category: "mobility",
    sport: ["soccer"],
    targetMuscles: ["hip internal rotators", "hip external rotators", "piriformis"],
    sets: 2,
    reps: "90 sec each side",
    restSeconds: 20,
    cues: [
      "Sit with both legs at 90° angles; lean over the front shin with a long spine to access the hip complex",
      "Shift your weight gradually forward rather than forcing the position",
      "The kicking hip needs full rotation range — prioritise the dominant side first"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["90/90 Hip Lift", "90/90 with Lateral Lean"],
    regressions: ["Supine Figure-4", "Lying Hip Rotation"],
    duration: 90,
    positionTags: [],
  },

  "soc-mob-2": {
    id: "soc-mob-2",
    name: "Adductor Side Lunge",
    category: "mobility",
    sport: ["soccer"],
    targetMuscles: ["adductors", "groin", "hip flexors"],
    sets: 2,
    reps: "60 sec each side",
    restSeconds: 20,
    cues: [
      "Step wide to one side, sit into the hip of the bent leg while keeping the opposite leg straight",
      "Push the knee of the bent leg out with the elbow to open the groin further",
      "Keep the heel of the straight leg on the floor — do not allow it to pronate"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["Adductor Side Lunge with Overhead Reach", "Side Lunge to Balance"],
    regressions: ["Standing Adductor Stretch", "Seated Straddle"],
    duration: 60,
    positionTags: [],
  },

  "soc-mob-3": {
    id: "soc-mob-3",
    name: "Psoas Release and Kneeling Stretch",
    category: "mobility",
    sport: ["soccer"],
    targetMuscles: ["iliopsoas", "rectus femoris", "lumbar fascia"],
    sets: 2,
    reps: "90 sec each side",
    restSeconds: 20,
    cues: [
      "Kneel on the rear knee, drive the hip forward and feel the stretch at the front of the hip — not the lower back",
      "Tuck the pelvis under slightly and raise the same-side arm to elongate the psoas further",
      "Footballers often have chronically tight psoas from repetitive kicking — be patient with this stretch"
    ],
    injuryFlags: ["Hip"],
    equipment: ["bodyweight"],
    progressions: ["Couch Stretch", "Psoas Stretch with Hip Rotation"],
    regressions: ["Supine Hip Flexor Stretch", "Standing Quad Stretch"],
    duration: 90,
    positionTags: [],
  },

  "soc-mob-4": {
    id: "soc-mob-4",
    name: "Ankle Dorsiflexion Wall Drill",
    category: "mobility",
    sport: ["soccer"],
    targetMuscles: ["ankle dorsiflexors", "gastrocnemius", "soleus"],
    sets: 2,
    reps: "60 sec each side",
    restSeconds: 15,
    cues: [
      "Foot 5-10 cm from the wall; drive the knee over the pinky toe without letting the heel rise",
      "Restricted ankle dorsiflexion is a major contributor to ACL injuries in cutting movements",
      "Progress weekly by moving the foot 1 cm further from the wall"
    ],
    injuryFlags: ["Ankle"],
    equipment: ["bodyweight"],
    progressions: ["Ankle Dorsiflexion with Band", "Slant Board Dorsiflexion"],
    regressions: ["Seated Ankle Circles", "Standing Calf Stretch"],
    duration: 60,
    positionTags: [],
  },

  "soc-mob-5": {
    id: "soc-mob-5",
    name: "Thoracic Rotation Stretch",
    category: "mobility",
    sport: ["soccer"],
    targetMuscles: ["thoracic spine", "obliques", "intercostals"],
    sets: 2,
    reps: "60 sec each side",
    restSeconds: 15,
    cues: [
      "Sit cross-legged and place one hand behind the head; rotate the elbow toward the opposite knee",
      "Let the thoracic spine do the rotation — do not pull the head with the hand",
      "Upper body rotation improves both heading mechanics and long-ball delivery"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["Thread the Needle", "Seated Rotation with Dowel"],
    regressions: ["Cat-Cow", "Seated Trunk Rotation Passive"],
    duration: 60,
    positionTags: [],
  },

  "soc-mob-6": {
    id: "soc-mob-6",
    name: "Glute Piriformis Figure-4 Stretch",
    category: "mobility",
    sport: ["soccer"],
    targetMuscles: ["piriformis", "glute medius", "hip external rotators"],
    sets: 2,
    reps: "60 sec each side",
    restSeconds: 15,
    cues: [
      "Lie on your back, cross one ankle over the opposite knee and draw both legs toward the chest",
      "Hold behind the thigh of the lower leg — do not grab the shin as this can stress the knee",
      "Feel the stretch deep in the outer hip and glute — breathing into the area helps release tension"
    ],
    injuryFlags: ["Hip"],
    equipment: ["bodyweight"],
    progressions: ["Pigeon Pose", "Figure-4 Forward Fold"],
    regressions: ["Seated Figure-4 on Chair", "Glute Foam Roll"],
    duration: 60,
    positionTags: [],
  },

  "soc-mob-7": {
    id: "soc-mob-7",
    name: "Dynamic Hip Circle",
    category: "mobility",
    sport: ["soccer"],
    targetMuscles: ["hip flexors", "hip extensors", "hip rotators", "adductors"],
    sets: 2,
    reps: "10 circles each leg each direction",
    restSeconds: 15,
    cues: [
      "Stand on one leg and draw large circles with the opposite knee — forward and backward",
      "Use a wall for balance initially; the movement should be smooth and controlled, not jerky",
      "Increase the circle size as the hip warms up — this is an active warm-up movement"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["Dynamic Hip Circle with Band Resistance", "Standing Hip CAR"],
    regressions: ["Supine Hip Circles", "Standing Hip Flexion and Extension"],
    duration: 60,
    positionTags: [],
  },

  // ─────────────────────────────────────────────────────────────
  // SOCCER — CONDITIONING
  // ─────────────────────────────────────────────────────────────

  "soc-con-1": {
    id: "soc-con-1",
    name: "Shuttle Run Match-Distance Intervals",
    category: "conditioning",
    sport: ["soccer"],
    targetMuscles: ["cardiovascular system", "legs", "core"],
    sets: 6,
    reps: "1 min work / 1 min rest",
    restSeconds: 60,
    cues: [
      "Mark out 10-20 m cones and sprint, decelerate and change direction at each cone",
      "This replicates the high-intensity interval demands of match play (10-13 km total, 700-900 m sprinting)",
      "Keep a consistent pace across all 6 sets — do not blow up in the first two"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["Extended Sets 90 sec", "Shuttle with Ball"],
    regressions: ["30 sec Work / 90 sec Rest", "Jog Shuttle"],
    duration: 60,
    positionTags: [],
  },

  "soc-con-2": {
    id: "soc-con-2",
    name: "Repeated Sprint Protocol 40m",
    category: "conditioning",
    sport: ["soccer"],
    targetMuscles: ["fast-twitch fibers", "glutes", "quads", "cardiovascular system"],
    sets: 3,
    reps: "8 sprints x3 sets",
    restSeconds: 30,
    cues: [
      "Explode from a standing start and sprint maximum effort for 40 m",
      "30 seconds rest between sprints — this is deliberately insufficient to replicate match fatigue",
      "Track your split times; the goal is to maintain speed across all 8 sprints, not just the first"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["60m Sprints", "Repeated Sprint with Direction Change"],
    regressions: ["20m Sprint", "Longer Rest Period 60 sec"],
    duration: 0,
    positionTags: [],
  },

  "soc-con-3": {
    id: "soc-con-3",
    name: "Reactive Agility Ladder",
    category: "conditioning",
    sport: ["soccer"],
    targetMuscles: ["agility", "foot speed", "coordination", "cardiovascular system"],
    sets: 5,
    reps: "4 ladder lengths per set",
    restSeconds: 45,
    cues: [
      "Vary the ladder pattern each set (icky shuffle, lateral two-in, hopscotch) to challenge neuromuscular coordination",
      "Prioritise precision over speed — sloppy footwork trains sloppy movement",
      "React to a coach's cue at the end of each ladder length to add a perceptual-cognitive element"
    ],
    injuryFlags: [],
    equipment: ["agility ladder", "bodyweight"],
    progressions: ["Agility Ladder with Ball Dribble", "Random Pattern Reactive Ladder"],
    regressions: ["Slow Walk-Through Ladder Patterns", "Simple In-Out Ladder"],
    duration: 0,
    positionTags: [],
  },

  "soc-con-4": {
    id: "soc-con-4",
    name: "Deceleration and Change-of-Direction Drill",
    category: "conditioning",
    sport: ["soccer"],
    targetMuscles: ["quads", "glutes", "hamstrings", "core"],
    sets: 5,
    reps: "6 reps per set",
    restSeconds: 60,
    cues: [
      "Sprint to a cone, plant the outside foot, and change direction explosively — the plant foot is everything",
      "Lower your centre of gravity before the change — a high centre of gravity bleeds speed",
      "ACL injuries frequently occur during deceleration — always control the knee-over-toe alignment when cutting"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["COD Drill with Reaction Cue", "COD with Slalom Poles"],
    regressions: ["Slow COD Drill", "Walking Change of Direction Practice"],
    duration: 0,
    positionTags: [],
  },

  "soc-con-5": {
    id: "soc-con-5",
    name: "GK Lateral Bounds",
    category: "conditioning",
    sport: ["soccer"],
    targetMuscles: ["glutes", "hip abductors", "quads", "calves"],
    sets: 4,
    reps: "8 bounds each direction",
    restSeconds: 75,
    cues: [
      "Bound explosively sideways off one foot and land on the opposite single foot — stick the landing",
      "Goalkeepers need maximum power and stability across the full width of the goal",
      "Increase bound distance progressively each week — track your average distance"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["GK Bounds with Dive", "Banded Lateral Bounds"],
    regressions: ["Two-Foot Lateral Jump", "Lateral Step-Bounce"],
    duration: 0,
    positionTags: ["goalkeeper"],
  },

  "soc-con-6": {
    id: "soc-con-6",
    name: "CB Sprint-Decelerate-Head Jump",
    category: "conditioning",
    sport: ["soccer"],
    targetMuscles: ["cardiovascular system", "legs", "neck", "core"],
    sets: 4,
    reps: "6 per set",
    restSeconds: 75,
    cues: [
      "Sprint 15 m, decelerate and jump to head an imaginary ball at the top of your jump",
      "Win the header with the forehead — eyes open, neck braced, contact above the centre of the ball",
      "Land under control on both feet and immediately decelerate before the next rep"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["Sprint-Decelerate-Head with Actual Ball", "Sprint-Jump-Head with Resistance Band"],
    regressions: ["Standing Jump and Head", "Sprint without Jump"],
    duration: 0,
    positionTags: ["center back"],
  },

  "soc-con-7": {
    id: "soc-con-7",
    name: "Winger Acceleration and Cross Movement",
    category: "conditioning",
    sport: ["soccer"],
    targetMuscles: ["quads", "glutes", "calves", "shoulder girdle"],
    sets: 4,
    reps: "6 per side",
    restSeconds: 75,
    cues: [
      "Sprint down a simulated touchline for 20 m, cut inside, and simulate a driven cross at the end",
      "The crossing action should involve full follow-through of the kicking leg — do not jog it",
      "Vary the type of cross each rep: flat cross, floated ball, low-driven cutback"
    ],
    injuryFlags: [],
    equipment: ["bodyweight"],
    progressions: ["Winger Acceleration with Ball and Cross", "Winger Drill with Defender Marker"],
    regressions: ["Walking Through the Pattern", "Jog Acceleration and Cross"],
    duration: 0,
    positionTags: ["winger"],
  },

};

export default exerciseLibrary;
