// AthleteOS — Program Data
// Organizes exercise IDs from exerciseLibrary.js into sport-specific weekly templates

export const programData = {

  badminton: {
    strengthExercises: [
      'bad-str-1', 'bad-str-2', 'bad-str-3', 'bad-str-4', 'bad-str-5',
      'bad-str-6', 'bad-str-7', 'bad-str-8', 'bad-str-9', 'bad-str-10', 'bad-str-11',
    ],
    mobilityExercises: [
      'bad-mob-1', 'bad-mob-2', 'bad-mob-3', 'bad-mob-4',
      'bad-mob-5', 'bad-mob-6', 'bad-mob-7', 'bad-mob-8',
    ],
    conditioningDrills: [
      'bad-con-1', 'bad-con-2', 'bad-con-3', 'bad-con-4', 'bad-con-5',
    ],
    postMatchStretches: [
      'bad-str-pm-1', 'bad-str-pm-2', 'bad-str-pm-3',
      'bad-str-pm-4', 'bad-str-pm-5', 'bad-str-pm-6',
    ],
    weeklyTemplates: {
      beginner: [
        {
          dayOffset: 1,
          sessionType: 'strength',
          exercises: ['bad-mob-3', 'bad-mob-1', 'bad-str-1', 'bad-str-2', 'bad-str-9', 'bad-str-10', 'bad-str-pm-5'],
          estimatedDuration: 45,
          reasoning: 'Building posterior chain and hip strength to power your lunges and protect your Achilles tendon from common badminton overuse injuries.',
        },
        {
          dayOffset: 4,
          sessionType: 'conditioning',
          exercises: ['bad-mob-6', 'bad-con-1', 'bad-con-2', 'bad-str-pm-1', 'bad-str-pm-5'],
          estimatedDuration: 30,
          reasoning: 'Six-corner shadow footwork and split-step drills to build the explosive lateral movement and court coverage specific to badminton rallies.',
        },
      ],
      recreational: [
        {
          dayOffset: 1,
          sessionType: 'strength',
          exercises: ['bad-mob-3', 'bad-mob-1', 'bad-str-1', 'bad-str-2', 'bad-str-3', 'bad-str-7', 'bad-str-8', 'bad-str-9'],
          estimatedDuration: 55,
          reasoning: 'Posterior chain strength paired with shoulder prehab — the foundation for powerful smashes without rotator cuff strain.',
        },
        {
          dayOffset: 3,
          sessionType: 'mobility',
          exercises: ['bad-mob-1', 'bad-mob-2', 'bad-mob-4', 'bad-mob-5', 'bad-mob-6', 'bad-mob-7', 'bad-mob-8'],
          estimatedDuration: 35,
          reasoning: 'Full-body mobility targeting hip rotation, thoracic spine, and forearm health — all critical for sustaining rally quality through a long match.',
        },
        {
          dayOffset: 5,
          sessionType: 'conditioning',
          exercises: ['bad-mob-6', 'bad-con-1', 'bad-con-2', 'bad-con-4', 'bad-str-pm-1', 'bad-str-pm-2', 'bad-str-pm-5'],
          estimatedDuration: 40,
          reasoning: 'Sport-specific conditioning drills replicating match movement demands, followed by hip and calf recovery stretches.',
        },
      ],
      competitive: [
        {
          dayOffset: 1,
          sessionType: 'strength',
          exercises: ['bad-mob-3', 'bad-mob-1', 'bad-str-1', 'bad-str-2', 'bad-str-3', 'bad-str-11', 'bad-str-9', 'bad-str-10'],
          estimatedDuration: 60,
          reasoning: 'Heavy compound lower body work with anti-rotation core — building the strength base for explosive direction changes and jump smashes.',
        },
        {
          dayOffset: 2,
          sessionType: 'mobility',
          exercises: ['bad-mob-1', 'bad-mob-2', 'bad-mob-4', 'bad-mob-5', 'bad-mob-7', 'bad-mob-8'],
          estimatedDuration: 30,
          reasoning: 'Active recovery mobility session to maintain range of motion between heavy training days and reduce next-day soreness.',
        },
        {
          dayOffset: 4,
          sessionType: 'strength',
          exercises: ['bad-mob-6', 'bad-str-4', 'bad-str-5', 'bad-str-6', 'bad-str-7', 'bad-str-8', 'bad-str-11'],
          estimatedDuration: 55,
          reasoning: 'Wrist, forearm, and shoulder prehab combined with Pallof press anti-rotation work — protecting the joints most vulnerable in badminton players.',
        },
        {
          dayOffset: 6,
          sessionType: 'conditioning',
          exercises: ['bad-mob-3', 'bad-con-1', 'bad-con-2', 'bad-con-3', 'bad-con-5', 'bad-str-pm-1', 'bad-str-pm-4', 'bad-str-pm-5'],
          estimatedDuration: 50,
          reasoning: 'High-intensity court simulation conditioning followed by thoracic and hip recovery to prepare for weekend matches.',
        },
      ],
      elite: [
        {
          dayOffset: 1,
          sessionType: 'strength',
          exercises: ['bad-mob-3', 'bad-mob-1', 'bad-str-1', 'bad-str-3', 'bad-str-11', 'bad-str-9', 'bad-str-10'],
          estimatedDuration: 70,
          reasoning: 'Max strength phase lower body: single-leg deadlift + hip thrust supersets to develop the force production needed for jump smash and lunge return.',
        },
        {
          dayOffset: 2,
          sessionType: 'mobility',
          exercises: ['bad-mob-1', 'bad-mob-2', 'bad-mob-5', 'bad-mob-6', 'bad-mob-7', 'bad-mob-8'],
          estimatedDuration: 35,
          reasoning: 'Daily mobility maintenance — at elite level, movement quality degrades without consistent daily mobility work.',
        },
        {
          dayOffset: 3,
          sessionType: 'conditioning',
          exercises: ['bad-con-1', 'bad-con-2', 'bad-con-3', 'bad-con-4', 'bad-con-5'],
          estimatedDuration: 50,
          reasoning: 'Full reactive conditioning protocol: shadow footwork, landing mechanics, and reactive drills to sharpen match-speed movement patterns.',
        },
        {
          dayOffset: 4,
          sessionType: 'strength',
          exercises: ['bad-mob-3', 'bad-str-4', 'bad-str-5', 'bad-str-6', 'bad-str-7', 'bad-str-8', 'bad-str-2', 'bad-str-11'],
          estimatedDuration: 65,
          reasoning: 'Upper body and wrist strength session — forearm endurance and rotator cuff health are the difference between 3-set and 5-set performance.',
        },
        {
          dayOffset: 6,
          sessionType: 'conditioning',
          exercises: ['bad-mob-6', 'bad-con-1', 'bad-con-4', 'bad-con-5', 'bad-str-pm-1', 'bad-str-pm-4', 'bad-str-pm-5', 'bad-str-pm-6'],
          estimatedDuration: 55,
          reasoning: 'Competition-prep conditioning: match intensity drills followed by a full 8-minute post-match stretch sequence to prime recovery.',
        },
      ],
    },
  },

  tennis: {
    strengthExercises: [
      'ten-str-1', 'ten-str-2', 'ten-str-3', 'ten-str-4', 'ten-str-5',
      'ten-str-6', 'ten-str-7', 'ten-str-8', 'ten-str-9', 'ten-str-10',
    ],
    mobilityExercises: [
      'ten-mob-1', 'ten-mob-2', 'ten-mob-3', 'ten-mob-4',
      'ten-mob-5', 'ten-mob-6', 'ten-mob-7',
    ],
    conditioningDrills: [
      'ten-con-1', 'ten-con-2', 'ten-con-3', 'ten-con-4', 'ten-con-5',
    ],
    postMatchStretches: [
      'ten-mob-1', 'ten-mob-2', 'ten-mob-3', 'ten-mob-5', 'ten-mob-7',
    ],
    weeklyTemplates: {
      beginner: [
        {
          dayOffset: 1,
          sessionType: 'strength',
          exercises: ['ten-mob-3', 'ten-mob-4', 'ten-str-4', 'ten-str-5', 'ten-str-3', 'ten-str-10', 'ten-mob-1'],
          estimatedDuration: 45,
          reasoning: 'Lower body single-leg strength and anti-rotation core — the platform every groundstroke is built on, regardless of playing style.',
        },
        {
          dayOffset: 4,
          sessionType: 'conditioning',
          exercises: ['ten-mob-3', 'ten-mob-4', 'ten-con-1', 'ten-con-2', 'ten-mob-1', 'ten-mob-7'],
          estimatedDuration: 35,
          reasoning: 'Point-length interval training and baseline sprints to build the aerobic base and acceleration speed needed for competitive play.',
        },
      ],
      recreational: [
        {
          dayOffset: 1,
          sessionType: 'strength',
          exercises: ['ten-mob-3', 'ten-mob-4', 'ten-str-4', 'ten-str-5', 'ten-str-1', 'ten-str-3', 'ten-str-8'],
          estimatedDuration: 55,
          reasoning: 'Rotational power development combined with single-leg balance — building the athletic base that powers every shot in tennis.',
        },
        {
          dayOffset: 3,
          sessionType: 'mobility',
          exercises: ['ten-mob-1', 'ten-mob-2', 'ten-mob-3', 'ten-mob-5', 'ten-mob-6', 'ten-mob-7'],
          estimatedDuration: 35,
          reasoning: 'Shoulder and hip mobility focus: the serve requires full thoracic extension and shoulder mobility — this session protects your most important asset.',
        },
        {
          dayOffset: 5,
          sessionType: 'conditioning',
          exercises: ['ten-mob-4', 'ten-con-1', 'ten-con-2', 'ten-con-4', 'ten-mob-1', 'ten-mob-5'],
          estimatedDuration: 40,
          reasoning: 'On-court pattern conditioning with acceleration bursts — replicating the demands of actual match play to build sport-specific endurance.',
        },
      ],
      competitive: [
        {
          dayOffset: 1,
          sessionType: 'strength',
          exercises: ['ten-mob-3', 'ten-mob-4', 'ten-str-4', 'ten-str-5', 'ten-str-1', 'ten-str-2', 'ten-str-3', 'ten-str-10'],
          estimatedDuration: 65,
          reasoning: 'Heavy rotational power combined with single-leg strength — building the force transfer capacity needed for consistent heavy groundstrokes.',
        },
        {
          dayOffset: 2,
          sessionType: 'mobility',
          exercises: ['ten-mob-1', 'ten-mob-2', 'ten-mob-5', 'ten-mob-6', 'ten-mob-7'],
          estimatedDuration: 30,
          reasoning: 'Shoulder, hip, and thoracic recovery — maintaining the joint health that allows you to practice and compete at high volume.',
        },
        {
          dayOffset: 4,
          sessionType: 'strength',
          exercises: ['ten-mob-4', 'ten-str-6', 'ten-str-7', 'ten-str-8', 'ten-str-9', 'ten-str-3', 'ten-str-2'],
          estimatedDuration: 55,
          reasoning: 'Elbow and shoulder prehab session — wrist extensor eccentric curls and face pulls to prevent the tennis elbow and shoulder impingement that ends careers.',
        },
        {
          dayOffset: 6,
          sessionType: 'conditioning',
          exercises: ['ten-mob-3', 'ten-mob-4', 'ten-con-1', 'ten-con-2', 'ten-con-3', 'ten-con-5', 'ten-mob-1', 'ten-mob-7'],
          estimatedDuration: 50,
          reasoning: 'Full court conditioning with multi-direction patterns and point-simulation intervals — match intensity training to sharpen competitive edge.',
        },
      ],
      elite: [
        {
          dayOffset: 1,
          sessionType: 'strength',
          exercises: ['ten-mob-3', 'ten-mob-4', 'ten-str-4', 'ten-str-5', 'ten-str-1', 'ten-str-2', 'ten-str-3'],
          estimatedDuration: 75,
          reasoning: 'Max force production session: Bulgarian split squat and med ball rotational throws to develop elite-level power in groundstrokes and the serve.',
        },
        {
          dayOffset: 2,
          sessionType: 'mobility',
          exercises: ['ten-mob-1', 'ten-mob-2', 'ten-mob-5', 'ten-mob-6', 'ten-mob-3', 'ten-mob-7'],
          estimatedDuration: 40,
          reasoning: 'Daily mobility to maintain the shoulder and hip range of motion demanded by elite serve mechanics and open-stance groundstrokes.',
        },
        {
          dayOffset: 3,
          sessionType: 'conditioning',
          exercises: ['ten-mob-4', 'ten-con-1', 'ten-con-4', 'ten-con-5', 'ten-mob-1'],
          estimatedDuration: 55,
          reasoning: 'High-intensity acceleration and direction-change conditioning — training the nervous system for the explosive first-step reaction time that wins points.',
        },
        {
          dayOffset: 4,
          sessionType: 'strength',
          exercises: ['ten-mob-4', 'ten-str-6', 'ten-str-7', 'ten-str-8', 'ten-str-9', 'ten-str-10', 'ten-str-3'],
          estimatedDuration: 65,
          reasoning: 'Injury prevention strength session: wrist, elbow, and shoulder resilience work that keeps elite players on court for a full competitive season.',
        },
        {
          dayOffset: 6,
          sessionType: 'conditioning',
          exercises: ['ten-mob-3', 'ten-con-1', 'ten-con-2', 'ten-con-3', 'ten-con-4', 'ten-con-5', 'ten-mob-1', 'ten-mob-5'],
          estimatedDuration: 60,
          reasoning: 'Full competition-simulation conditioning — multiple drill types at match intensity with proper stretch recovery protocol to prime for tournament week.',
        },
      ],
    },
  },

  soccer: {
    strengthExercises: [
      'soc-str-1', 'soc-str-2', 'soc-str-3', 'soc-str-4', 'soc-str-5',
      'soc-str-6', 'soc-str-7', 'soc-str-8', 'soc-str-9',
      'soc-str-10', 'soc-str-11', 'soc-str-12',
    ],
    mobilityExercises: [
      'soc-mob-1', 'soc-mob-2', 'soc-mob-3', 'soc-mob-4',
      'soc-mob-5', 'soc-mob-6', 'soc-mob-7',
    ],
    conditioningDrills: [
      'soc-con-1', 'soc-con-2', 'soc-con-3', 'soc-con-4',
      'soc-con-5', 'soc-con-6', 'soc-con-7',
    ],
    postMatchStretches: [
      'soc-mob-1', 'soc-mob-2', 'soc-mob-3', 'soc-mob-4', 'soc-mob-6',
    ],
    weeklyTemplates: {
      beginner: [
        {
          dayOffset: 2,
          sessionType: 'strength',
          exercises: ['soc-mob-7', 'soc-mob-4', 'soc-str-1', 'soc-str-2', 'soc-str-5', 'soc-mob-1', 'soc-mob-2'],
          estimatedDuration: 45,
          reasoning: 'Nordic hamstring curls are mandatory for all soccer players — they reduce hamstring injury risk by 51%. Paired with hip abductor work for lateral stability.',
        },
        {
          dayOffset: 5,
          sessionType: 'conditioning',
          exercises: ['soc-mob-7', 'soc-mob-4', 'soc-con-1', 'soc-con-3', 'soc-mob-1', 'soc-mob-6'],
          estimatedDuration: 35,
          reasoning: 'Match-distance interval running and agility ladder work to build the aerobic base and change-of-direction speed needed for competitive soccer.',
        },
      ],
      recreational: [
        {
          dayOffset: 1,
          sessionType: 'strength',
          exercises: ['soc-mob-7', 'soc-mob-4', 'soc-str-1', 'soc-str-2', 'soc-str-3', 'soc-str-5', 'soc-str-9'],
          estimatedDuration: 55,
          reasoning: 'Full lower body strength program anchored by the Nordic curl — building hamstring, glute, and adductor resilience to handle 90 minutes of match demands.',
        },
        {
          dayOffset: 3,
          sessionType: 'mobility',
          exercises: ['soc-mob-1', 'soc-mob-2', 'soc-mob-3', 'soc-mob-4', 'soc-mob-5', 'soc-mob-6', 'soc-mob-7'],
          estimatedDuration: 35,
          reasoning: 'Full hip complex and thoracic mobility — maintaining the range of motion needed for long passing, heading, and explosive kicking mechanics.',
        },
        {
          dayOffset: 5,
          sessionType: 'conditioning',
          exercises: ['soc-mob-7', 'soc-con-1', 'soc-con-2', 'soc-con-3', 'soc-mob-1', 'soc-mob-2'],
          estimatedDuration: 40,
          reasoning: 'Repeated sprint protocol and agility work replicating the physical profile of a competitive soccer match.',
        },
      ],
      competitive: [
        {
          dayOffset: 1,
          sessionType: 'strength',
          exercises: ['soc-mob-7', 'soc-mob-4', 'soc-str-1', 'soc-str-3', 'soc-str-5', 'soc-str-6', 'soc-str-9'],
          estimatedDuration: 65,
          reasoning: 'Lower body max strength: Nordic curl mandatory, jump mechanics and core press for the power generation needed in heading, sprinting, and shooting.',
        },
        {
          dayOffset: 2,
          sessionType: 'mobility',
          exercises: ['soc-mob-1', 'soc-mob-2', 'soc-mob-3', 'soc-mob-5', 'soc-mob-6'],
          estimatedDuration: 30,
          reasoning: 'Active recovery mobility — maintaining hip and ankle range of motion to reduce overuse injury risk between training sessions.',
        },
        {
          dayOffset: 4,
          sessionType: 'strength',
          exercises: ['soc-mob-7', 'soc-str-2', 'soc-str-4', 'soc-str-7', 'soc-str-8', 'soc-str-5'],
          estimatedDuration: 55,
          reasoning: 'Position-specific strength: hip thrust for wingers and strikers, neck stability for center backs, explosive step-up for fullbacks — individualized load.',
        },
        {
          dayOffset: 6,
          sessionType: 'conditioning',
          exercises: ['soc-mob-7', 'soc-con-1', 'soc-con-2', 'soc-con-3', 'soc-con-4', 'soc-mob-1', 'soc-mob-4'],
          estimatedDuration: 50,
          reasoning: 'Full match-simulation conditioning protocol with deceleration and direction change drills — the physical preparation that differentiates competitive players.',
        },
      ],
      elite: [
        {
          dayOffset: 1,
          sessionType: 'strength',
          exercises: ['soc-mob-7', 'soc-mob-4', 'soc-str-1', 'soc-str-3', 'soc-str-5', 'soc-str-6', 'soc-str-9'],
          estimatedDuration: 75,
          reasoning: 'Maximum strength block: Nordic curl + loaded jump mechanics to develop the hamstring resilience and explosive leg power required at elite level.',
        },
        {
          dayOffset: 2,
          sessionType: 'mobility',
          exercises: ['soc-mob-1', 'soc-mob-2', 'soc-mob-3', 'soc-mob-4', 'soc-mob-5', 'soc-mob-7'],
          estimatedDuration: 35,
          reasoning: 'Daily mobility maintenance — at elite level, hip and ankle mobility deficits directly impair sprint mechanics and increase ACL/hamstring injury risk.',
        },
        {
          dayOffset: 3,
          sessionType: 'conditioning',
          exercises: ['soc-mob-7', 'soc-con-2', 'soc-con-3', 'soc-con-4', 'soc-mob-4'],
          estimatedDuration: 55,
          reasoning: 'High-speed repeated sprint protocol at match intensity — training the metabolic systems that sustain elite-level output in the 75-90 minute period.',
        },
        {
          dayOffset: 4,
          sessionType: 'strength',
          exercises: ['soc-mob-7', 'soc-str-2', 'soc-str-4', 'soc-str-7', 'soc-str-8', 'soc-str-5', 'soc-str-9'],
          estimatedDuration: 65,
          reasoning: 'Position-specific power and prehab — elite players have individualized needs based on their physical demands within the team structure.',
        },
        {
          dayOffset: 6,
          sessionType: 'conditioning',
          exercises: ['soc-mob-7', 'soc-con-1', 'soc-con-2', 'soc-con-3', 'soc-con-4', 'soc-mob-1', 'soc-mob-2', 'soc-mob-6'],
          estimatedDuration: 60,
          reasoning: 'Full competition-intensity conditioning: repeated sprints, agility, deceleration, with full post-session recovery stretch to prime for match day.',
        },
      ],
    },
  },
};

export default programData;
