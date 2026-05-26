import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, User, ChevronRight } from 'lucide-react';
import useAppStore from '../store/useAppStore';

const BASE = import.meta.env.BASE_URL;

const roles = [
  {
    key: 'admin',
    title: 'Gerente Comercial',
    name: 'Carlos Mendoza',
    description: 'Vista completa: todos los ejecutivos, dashboard consolidado, programa de incentivos y capacitaciones.',
    icon: ShieldCheck,
    badge: 'Admin',
    badgeColor: 'bg-shell-red text-white',
  },
  {
    key: 'executive',
    title: 'Ejecutivo Comercial',
    name: 'Paola Fernández',
    description: 'Vista personal: mis oportunidades, alertas, tareas y actualización por voz con B2Buddy.',
    icon: User,
    badge: 'Ejecutivo',
    badgeColor: 'bg-shell-gray-700 text-white',
  },
];

export default function Login() {
  const [selected, setSelected] = useState(null);
  const { setUser, resetDemo } = useAppStore();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!selected) return;
    resetDemo();
    setUser(selected);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* ─── LEFT PANEL — Form ─────────────────────────────────────────────── */}
      <div className="flex flex-col md:w-[42%] bg-white">
        {/* Logo */}
        <div className="px-8 pt-8 pb-4 flex items-center gap-3">
          <img src={`${BASE}shell-logo.png`} alt="Shell" className="w-10 h-10 object-contain" />
          <div>
            <div className="text-xl font-bold text-shell-gray-800 leading-none">Symphony</div>
            <div className="text-[11px] text-shell-gray-400 mt-0.5">Commercial Intelligence in Motion</div>
          </div>
        </div>

        <div className="mx-8 h-0.5 w-12 bg-shell-yellow mb-6" />

        <div className="flex-1 flex flex-col px-8 pb-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-shell-gray-800 leading-tight">
              Bienvenido a <span className="text-shell-red">Symphony</span>
            </h1>
            <p className="text-shell-gray-500 text-sm mt-2 leading-relaxed max-w-xs">
              La plataforma de inteligencia comercial que impulsa mejores decisiones y resultados.
            </p>
          </div>

          <p className="text-[11px] font-bold text-shell-gray-400 uppercase tracking-wider mb-4">
            Selecciona tu perfil para ingresar
          </p>

          <div className="space-y-3 mb-6">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selected === role.key;
              return (
                <button
                  key={role.key}
                  onClick={() => setSelected(role.key)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-shell-yellow bg-shell-yellow-light shadow-card-hover'
                      : 'border-shell-gray-100 bg-white hover:border-shell-gray-200 hover:shadow-card'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-shell-yellow' : 'bg-shell-gray-100'}`}>
                      <Icon size={18} className={isSelected ? 'text-shell-gray-800' : 'text-shell-gray-500'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-shell-gray-800 text-sm">{role.title}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${role.badgeColor}`}>{role.badge}</span>
                      </div>
                      <p className="text-xs text-shell-gray-500 font-medium">{role.name}</p>
                      <p className="text-[11px] text-shell-gray-400 mt-0.5 leading-snug">{role.description}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${isSelected ? 'border-shell-yellow bg-shell-yellow' : 'border-shell-gray-300'}`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-shell-gray-800" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleLogin}
            disabled={!selected}
            className={`w-full flex items-center justify-between px-6 py-4 rounded-xl font-bold text-sm transition-all duration-200 ${
              selected
                ? 'bg-shell-gray-800 text-white hover:bg-shell-gray-700 shadow-card-hover'
                : 'bg-shell-gray-100 text-shell-gray-300 cursor-not-allowed'
            }`}
          >
            <span>Ingresar a Symphony</span>
            <ChevronRight size={18} />
          </button>

          <div className="mt-5 flex items-start gap-2 text-[11px] text-shell-gray-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span>Tu información está segura con nosotros. <span className="text-shell-red font-medium cursor-pointer">Conoce más sobre seguridad y privacidad →</span></span>
          </div>
        </div>

        <div className="px-8 py-4 border-t border-shell-gray-100">
          <p className="text-[11px] text-shell-gray-400 text-center">
            Powered by NODO · Prototipo v1.0 · 2026
          </p>
        </div>
      </div>

      {/* ─── RIGHT PANEL — Hero image ───────────────────────────────────────── */}
      <div
        className="hidden md:block md:w-[58%] relative overflow-hidden"
        style={{
          backgroundImage: `url(${BASE}login-bg.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Subtle dark overlay for logo/text legibility at top */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.0) 60%, rgba(0,0,0,0.25) 100%)',
          }}
        />

        {/* Shell energy lines SVG overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="eg1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FBCE07" stopOpacity="0" />
              <stop offset="45%" stopColor="#FBCE07" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#FBCE07" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="eg2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FBCE07" stopOpacity="0" />
              <stop offset="55%" stopColor="#FBCE07" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FBCE07" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M-60 500 Q180 330 520 410 Q710 455 870 310" stroke="url(#eg1)" strokeWidth="3" fill="none" />
          <path d="M-60 530 Q200 365 540 438 Q720 478 870 340" stroke="url(#eg1)" strokeWidth="2" fill="none" />
          <path d="M-60 555 Q220 395 550 462 Q730 500 870 365" stroke="url(#eg2)" strokeWidth="2.5" fill="none" />
          <path d="M-60 575 Q200 420 510 480 Q710 518 870 388" stroke="url(#eg2)" strokeWidth="1.5" fill="none" />
          <circle cx="510" cy="428" r="4" fill="#FBCE07" opacity="0.65" />
          <circle cx="548" cy="445" r="2.5" fill="#FBCE07" opacity="0.45" />
          <circle cx="485" cy="415" r="2" fill="#FBCE07" opacity="0.35" />
        </svg>

        {/* Shell logo + title top center */}
        <div className="relative flex flex-col items-center pt-8 px-8">
          <img src={`${BASE}shell-logo.png`} alt="Shell" className="w-16 h-16 object-contain drop-shadow-lg mb-3" />
          <h2
            className="font-bold leading-none tracking-tight text-center drop-shadow-lg"
            style={{
              fontSize: 'clamp(44px, 6vw, 72px)',
              background: 'linear-gradient(135deg, #FBCE07 0%, #FFE44D 55%, #DD1D21 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Symphony
          </h2>
          <p className="text-white/80 text-xs font-light tracking-widest mt-1.5 uppercase drop-shadow">
            Commercial Intelligence in Motion
          </p>
        </div>
      </div>
    </div>
  );
}
