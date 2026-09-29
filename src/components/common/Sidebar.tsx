import React from 'react';
import {
  LayoutDashboard,
  Map,
  Gamepad2,
  Code2,
  Flame,
  Trophy,
  User as UserIcon,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'learning-path', label: 'Learning Path', icon: Map },
    { id: 'games', label: 'Arcade Games', icon: Gamepad2, badge: '10' },
    { id: 'challenges', label: 'Code Challenges', icon: Code2 },
    { id: 'daily', label: 'Daily Quest', icon: Flame, highlight: true },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'profile', label: 'Adventurer Profile', icon: UserIcon },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-slate-800 bg-slate-900/60 p-4 min-h-[calc(100vh-4rem)]">
      {/* Nav List */}
      <nav className="flex-1 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all select-none ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-white' : item.highlight ? 'text-amber-400' : 'text-slate-400'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                    isActive ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Session Quick Card in Sidebar */}
      {user && (
        <div className="pt-4 border-t border-slate-800">
          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2.5 truncate">
              <span className="text-xl">{user.avatar}</span>
              <div className="truncate">
                <span className="block text-xs font-bold text-white truncate">{user.name}</span>
                <span className="block text-[10px] text-slate-500 font-mono">
                  Level {user.level} · {user.xp} XP
                </span>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
