import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Target, GitBranch, Bell, MoreHorizontal } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Inicio' },
  { to: '/opportunities', icon: Target, label: 'Oportunidades' },
  { to: '/spancop', icon: GitBranch, label: 'SPANCOP' },
  { to: '/alerts', icon: Bell, label: 'Alertas', badge: true },
  { to: '/settings', icon: MoreHorizontal, label: 'Más' },
];

export default function BottomNav() {
  const { notificationCount } = useAppStore();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-shell-gray-200 z-40 safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ to, icon: Icon, label, badge }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-colors ${
                isActive ? 'text-shell-gray-800' : 'text-shell-gray-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`relative w-6 h-6 flex items-center justify-center rounded-lg ${isActive ? 'bg-shell-yellow' : ''}`}>
                  <Icon size={16} className={isActive ? 'text-shell-gray-800' : 'text-shell-gray-400'} />
                  {badge && notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-shell-red text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  )}
                </div>
                <span className={`text-[9px] font-medium ${isActive ? 'text-shell-gray-800' : 'text-shell-gray-400'}`}>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
