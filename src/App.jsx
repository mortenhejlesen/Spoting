import React, { Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext.jsx';
import BottomNav from './components/navigation/BottomNav.jsx';
import SkeletonLoader from './components/ui/SkeletonLoader.jsx';

// Lazy-load all screens
const Onboarding = lazy(() => import('./screens/Onboarding.jsx'));
const Home = lazy(() => import('./screens/Home.jsx'));
const TodaySession = lazy(() => import('./screens/TodaySession.jsx'));
const WeeklyProgram = lazy(() => import('./screens/WeeklyProgram.jsx'));
const NutritionHub = lazy(() => import('./screens/NutritionHub.jsx'));
const MatchDayNutrition = lazy(() => import('./screens/MatchDayNutrition.jsx'));
const Progress = lazy(() => import('./screens/Progress.jsx'));
const FatigueMonitor = lazy(() => import('./screens/FatigueMonitor.jsx'));
const Profile = lazy(() => import('./screens/Profile.jsx'));

const SCREENS_WITH_NAV = ['home', 'program', 'nutrition', 'progress', 'profile'];

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

function ScreenFallback() {
  return (
    <div className="min-h-screen bg-bg-primary p-4 pt-16 space-y-3">
      <SkeletonLoader count={3} />
    </div>
  );
}

function AppContent() {
  const { state } = useApp();
  const { currentScreen } = state;
  const showNav = SCREENS_WITH_NAV.includes(currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding': return <Onboarding />;
      case 'home': return <Home />;
      case 'today': return <TodaySession />;
      case 'program': return <WeeklyProgram />;
      case 'nutrition': return <NutritionHub />;
      case 'match-nutrition': return <MatchDayNutrition />;
      case 'progress': return <Progress />;
      case 'fatigue': return <FatigueMonitor />;
      case 'profile': return <Profile />;
      default: return <Home />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary relative">
      <Suspense fallback={<ScreenFallback />}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.18, ease: 'easeInOut' }}
            className="flex-1"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </Suspense>

      {showNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
