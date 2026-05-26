import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, User, ChevronRight, TrendingUp, Target, Zap, Award } from 'lucide-react';
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

const sectors = [
  { label: 'Agro', icon: '🌾', color: 'from-green-800/80 to-green-600/60' },
  { label: 'Transporte', icon: '🚛', color: 'from-blue-800/80 to-blue-600/60' },
  { label: 'Minería', icon: '⛏️', color: 'from-stone-800/80 to-stone-600/60' },
  { label: 'Construcción', icon: '🏗️', color: 'from-orange-800/80 to-orange-600/60' },
  { label: 'Industria', icon: '🏭', color: 'from-slate-800/80 to-slate-600/60' },
];

const valueProps = [
  { icon: TrendingUp, label: 'Inteligencia en tiempo real' },
  { icon: Target, label: 'Equipos alineados y conectados' },
  { icon: Zap, label: 'Decisiones más efectivas' },
  { icon: Award, label: 'Resultados que generan valor' },
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
        {/* Top logo */}
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
                ? 'bg-shell-gray-800 text-white hover:bg-shell-gray-700 shadow-card-hover active:scale-98'
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

      {/* ─── RIGHT PANEL — Hero visual ─────────────────────────────────────── */}
      <div className="hidden md:flex md:w-[58%] flex-col relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0f0800 0%, #1e1000 20%, #3d2200 40%, #7a4500 60%, #c47800 80%, #FBCE07 100%)' }}
      >
        {/* Energy lines SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="eg1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FBCE07" stopOpacity="0" />
              <stop offset="40%" stopColor="#FBCE07" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FBCE07" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="eg2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FBCE07" stopOpacity="0" />
              <stop offset="60%" stopColor="#FBCE07" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FBCE07" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="glow" cx="50%" cy="55%" r="45%">
              <stop offset="0%" stopColor="#FBCE07" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#FBCE07" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="700" fill="url(#glow)" />
          <path d="M-50 480 Q200 320 520 400 Q700 450 860 300" stroke="url(#eg1)" strokeWidth="3" fill="none" />
          <path d="M-50 510 Q180 360 500 430 Q680 470 860 330" stroke="url(#eg1)" strokeWidth="2" fill="none" />
          <path d="M-50 540 Q220 390 530 460 Q720 500 860 360" stroke="url(#eg2)" strokeWidth="2.5" fill="none" />
          <path d="M-50 560 Q200 420 490 480 Q700 520 860 390" stroke="url(#eg2)" strokeWidth="1.5" fill="none" />
          <path d="M-50 580 Q160 450 450 500 Q680 540 860 420" stroke="url(#eg2)" strokeWidth="1" fill="none" />
          <circle cx="500" cy="420" r="4" fill="#FBCE07" opacity="0.6" />
          <circle cx="540" cy="438" r="2.5" fill="#FBCE07" opacity="0.4" />
          <circle cx="475" cy="408" r="2" fill="#FBCE07" opacity="0.35" />
        </svg>

        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.6) 100%)' }} />

        {/* Content */}
        <div className="relative flex-1 flex flex-col px-12 pt-10">
          {/* Shell logo */}
          <div className="flex justify-center mb-6">
            <img src={`${BASE}shell-logo.png`} alt="Shell" className="w-20 h-20 object-contain drop-shadow-lg" />
          </div>

          {/* Headline */}
          <div className="text-center mb-4">
            <h2 className="font-bold leading-none tracking-tight"
              style={{ fontSize: 'clamp(52px,7vw,80px)', background: 'linear-gradient(135deg, #FBCE07 0%, #FFE44D 50%, #DD1D21 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Symphony
            </h2>
            <p className="text-white/70 text-sm font-light tracking-widest mt-2 uppercase">Commercial Intelligence in Motion</p>
          </div>

          <div className="flex items-center gap-3 justify-center my-4">
            <div className="h-px flex-1 max-w-16 bg-shell-yellow/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-shell-yellow/60" />
            <div className="h-px flex-1 max-w-16 bg-shell-yellow/30" />
          </div>

          {/* Value props */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {valueProps.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 bg-white/8 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2.5">
                <div className="w-7 h-7 rounded-lg bg-shell-yellow/20 flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-shell-yellow" />
                </div>
                <span className="text-white/85 text-xs font-medium leading-tight">{label}</span>
              </div>
            ))}
          </div>

          <div className="text-center mb-4">
            <p className="text-white/45 text-xs font-light italic">
              "Convierte conversaciones comerciales en inteligencia accionable."
            </p>
          </div>
        </div>

        {/* Sectors strip — main visual feature */}
        <div className="relative">
          {/* Sector cards */}
          <div className="flex">
            {sectors.map(({ label, icon, color }) => (
              <div key={label} className="flex-1 relative overflow-hidden" style={{ height: 160 }}>
                {/* Gradient background simulating photo */}
                <div className={`absolute inset-0 bg-gradient-to-b ${color}`} />
                {/* Texture overlay */}
                <div className="absolute inset-0" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)',
                }} />
                {/* Large icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span style={{ fontSize: 48, opacity: 0.35 }}>{icon}</span>
                </div>
                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-shell-gray-800/90 to-transparent pt-8 pb-3 px-2 text-center">
                  <span className="text-[10px] font-bold text-white/90 tracking-widest uppercase">{label}</span>
                </div>
                {/* Separator */}
                <div className="absolute inset-y-0 right-0 w-px bg-white/10" />
              </div>
            ))}
          </div>
          {/* Top border of sector strip */}
          <div className="absolute top-0 left-0 right-0 h-px bg-shell-yellow/30" />
        </div>
      </div>
    </div>
  );
}
