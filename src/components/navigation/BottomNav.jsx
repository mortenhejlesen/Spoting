import React from 'react';
import { Home, Calendar, Apple, TrendingUp, User } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'program', label: 'Program', icon: Calendar },
  { id: 'nutrition', label: 'Nutrition', icon: Apple },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const { state, actions } = useApp();
  const { currentScreen } = state;

  const isActive = (id) => {
    if (id === 'home') return currentScreen === 'home' || currentScreen === 'today';
    if (id === 'program') return currentScreen === 'program';
    if (id === 'nutrition') return currentScreen === 'nutrition' || currentScreen === 'match-nutrition';
    if (id === 'progress') return currentScreen === 'progress' || currentScreen === 'fatigue';
    if (id === 'profile') return currentScreen === 'profile';
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-bg-card border-t border-white/5 pb-safe"
      style={{ maxWidth: '480px', margin: '0 auto' }}>
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = isActive(id);
          return (
            <button
              key={id}
              onClick={() => actions.navigate(id)}
              className="flex flex-col items-center gap-1 min-w-[44px] min-h-[44px] justify-center px-3 py-1 rounded-lg transition-colors relative"
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-accent-violet/10 rounded-lg"
                  transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                />
              )}
              <Icon
                size={22}
                className={active ? 'text-accent-violet' : 'text-text-secondary'}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span className={`text-[10px] font-semibold ${active ? 'text-accent-violet' : 'text-text-secondary'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
