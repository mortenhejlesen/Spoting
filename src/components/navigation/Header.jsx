import React from 'react';
import { ArrowLeft, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

export default function Header({ title, subtitle, showBack, backTo, rightAction, transparent = false }) {
  const { actions, state } = useApp();
  const unreadCount = state.notifications?.length || 0;

  return (
    <header className={`flex items-center justify-between px-4 py-4 ${transparent ? '' : 'bg-bg-primary'} sticky top-0 z-20`}>
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => actions.navigate(backTo || 'home')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-bg-elevated text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <div>
          {title && <h1 className="text-lg font-bold text-text-primary leading-tight">{title}</h1>}
          {subtitle && <p className="text-xs text-text-secondary">{subtitle}</p>}
        </div>
      </div>
      {rightAction || (
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-bg-elevated text-text-secondary">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-orange rounded-full" />
          )}
        </button>
      )}
    </header>
  );
}
