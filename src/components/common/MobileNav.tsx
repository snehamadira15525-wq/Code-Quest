import React from 'react';
import { LayoutDashboard, Map, Gamepad2, Code2, Flame, Trophy, User } from 'lucide-react';

interface MobileNavProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activePage, onNavigate }) => {
  const items = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'learning-path', label: 'Path', icon: Map },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'challenges', label: 'Code', icon: Code2 },
    { id: 'daily', label: 'Daily', icon: Flame },
    { id: 'leaderboard', label: 'Ranks', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 border-t border-slate-800 backdrop-blur-md px-2 py-1.5 flex items-center justify-around">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activePage === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors select-none ${
              isActive ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
