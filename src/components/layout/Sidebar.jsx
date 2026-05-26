import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Target, Filter, Bell, Calendar,
  Mail, FolderOpen, BookOpen, Trophy, Settings, LogOut
} from 'lucide-react';
import useAppStore from '../../store/useAppStore';
const BASE = import.meta.env.BASE_URL;

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Inicio' },
  { to: '/opportunities', icon: Target, label: 'Oportunidades' },
  { to: '/spancop', icon: Filter, label: 'SPANCOP' },
  { to: '/alerts', icon: Bell, label: 'Alertas', badge: true },
  { to: '/calendar', icon: Calendar, label: 'Calendario' },
  { to: '/emails', icon: Mail, label: 'Correos' },
  { to: '/files', icon: FolderOpen, label: 'Archivos' },
  { to: '/powering-u', icon: BookOpen, label: 'Powering U' },
  { to: '/champions', icon: Trophy, label: 'Podio de Campeones' },
];

export default function Sidebar() {
  const { currentUser, logout, notificationCount, openB2Buddy } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-shell-gray-100 h-screen sticky top-0 overflow-y-auto shrink-0">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-shell-gray-100">
        <div className="flex items-center gap-2.5">
          <img
            src={`${BASE}shell-logo.png`}
            alt="Shell"
            className="w-9 h-9 object-contain shrink-0"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling?.querySelector('.shell-fallback')?.classList.remove('hidden');
            }}
          />
          <div className="shell-fallback hidden w-9 h-9 rounded-full bg-shell-yellow flex items-center justify-center shrink-0">
            <span className="text-shell-red font-bold text-lg">S</span>
          </div>
          <div>
            <div className="text-lg font-bold text-shell-gray-800 leading-none">Symphony</div>
            <div className="text-[10px] text-shell-gray-400 font-medium tracking-wide mt-0.5">Powered by NODO</div>
          </div>
        </div>
        <div className="mt-2 text-[10px] text-shell-gray-400 leading-tight">Commercial Intelligence in Motion</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ to, icon: Icon, label, badge }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? 'sidebar-item-active' : 'sidebar-item'
            }
          >
            <div className="relative">
              <Icon size={18} />
              {badge && notificationCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-shell-red text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </div>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* B2Buddy CTA */}
      <div className="px-3 py-3 border-t border-shell-gray-100">
        <button
          onClick={openB2Buddy}
          className="w-full bg-shell-yellow hover:bg-shell-yellow-mid text-shell-gray-800 font-semibold text-sm px-3 py-2.5 rounded-xl flex items-center gap-2 transition-colors duration-150"
        >
          <img
            src={`${BASE}b2buddy-avatar.png`}
            alt="B2Buddy"
            className="w-9 h-9 object-contain shrink-0 drop-shadow-sm"
          />
          <div className="text-left">
            <div className="text-xs font-bold leading-none">Hablar con B2Buddy</div>
            <div className="text-[10px] font-normal text-shell-gray-600 mt-0.5">Tu copiloto comercial</div>
          </div>
        </button>
      </div>

      {/* User + Settings */}
      <div className="px-3 py-3 border-t border-shell-gray-100 space-y-0.5">
        <NavLink to="/settings" className={({ isActive }) => isActive ? 'sidebar-item-active' : 'sidebar-item'}>
          <Settings size={18} />
          <span>Configuración</span>
        </NavLink>
        <button onClick={handleLogout} className="sidebar-item w-full text-left">
          <LogOut size={18} />
          <span>Salir</span>
        </button>
        {currentUser && (
          <div className="flex items-center gap-2.5 px-3 pt-3 mt-1 border-t border-shell-gray-100">
            <div className="w-8 h-8 rounded-full bg-shell-yellow flex items-center justify-center text-shell-gray-800 font-bold text-xs shrink-0">
              {currentUser.avatar}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-shell-gray-700 truncate">{currentUser.name}</div>
              <div className="text-[10px] text-shell-gray-400 truncate">{currentUser.title}</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
