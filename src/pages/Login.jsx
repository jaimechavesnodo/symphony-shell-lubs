import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, User, ChevronRight, TrendingUp, Target, Zap, Award } from 'lucide-react';
import useAppStore from '../store/useAppStore';

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

const industries = [
  { label: 'Agro', icon: '🌾' },
  { label: 'Transporte', icon: '🚛' },
  { label: 'Minería', icon: '⛏️' },
  { label: 'Construcción', icon: '🏗️' },
  { label: 'Industria', icon: '🏭' },
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

      {/* ─── LEFT PANEL — Form ───────────────────────────────────────────── */}
      <div className="flex flex-col md:w-[42%] bg-white relative">
        {/* Top logo bar */}
        <div className="px-8 pt-8 pb-6 flex items-center gap-3">
          <img src="/shell-logo.png" alt="Shell" className="w-10 h-10 object-contain" />
          <div>
            <div className="text-xl font-bold text-shell-gray-800 leading-none">Symphony</div>
            <div className="text-[11px] text-shell-gray-400 mt-0.5">Commercial Intelligence in Motion</div>
          </div>
        </div>

        {/* Yellow accent line */}
        <div className="mx-8 h-0.5 w-12 bg-shell-yellow mb-8" />

        {/* Form content */}
        <div className="flex-1 flex flex-col px-8 pb-6">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-shell-gray-800 leading-tight">
              Symphony
            </h1>
            <p className="text-shell-gray-500 text-sm mt-2 leading-relaxed max-w-xs">
              La plataforma de inteligencia comercial que impulsa mejores decisiones y resultados.
            </p>
          </div>

          {/* Role selection */}
          <p className="text-[11px] font-bold text-shell-gray-400 uppercase tracking-wider mb-4">
            Selecciona tu perfil para ingresar
          </p>

          <div className="space-y-3 mb-8">
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

          {/* Login button */}
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

          {/* Security note */}
          <div className="mt-6 flex items-start gap-2 text-[11px] text-shell-gray-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span>Tu información está segura con nosotros. <span className="text-shell-red font-medium cursor-pointer hover:underline">Conoce más sobre seguridad y privacidad →</span></span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-shell-gray-100">
          <p className="text-[11px] text-shell-gray-400 text-center">
            Powered by NODO · Prototipo v1.0 · 2026
          </p>
        </div>
      </div>

      {/* ─── RIGHT PANEL — Hero visual ──────────────────────────────────────── */}
      <div className="hidden md:flex md:w-[58%] flex-col relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #1a1208 0%, #2d1f00 25%, #4a2e00 45%, #7a4800 65%, #c47a00 85%, #FBCE07 100%)' }}
      >
        {/* Energy lines SVG overlay */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 700" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FBCE07" stopOpacity="0" />
              <stop offset="50%" stopColor="#FBCE07" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FBCE07" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FBCE07" stopOpacity="0" />
              <stop offset="60%" stopColor="#FBCE07" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FBCE07" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="glow" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#FBCE07" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#FBCE07" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Glow center */}
          <rect width="800" height="700" fill="url(#glow)" />
          {/* Energy curves */}
          <path d="M-50 520 Q200 380 500 440 Q700 480 850 350" stroke="url(#lineGrad1)" strokeWidth="2.5" fill="none" />
          <path d="M-50 490 Q180 360 480 420 Q680 460 850 330" stroke="url(#lineGrad1)" strokeWidth="1.5" fill="none" />
          <path d="M-50 560 Q220 420 520 460 Q720 500 850 380" stroke="url(#lineGrad2)" strokeWidth="2" fill="none" />
          <path d="M-50 580 Q200 450 480 490 Q700 520 850 410" stroke="url(#lineGrad2)" strokeWidth="1" fill="none" />
          <path d="M-50 600 Q150 500 400 520 Q620 540 850 450" stroke="url(#lineGrad2)" strokeWidth="1.5" fill="none" />
          {/* Dot accents */}
          <circle cx="480" cy="430" r="3" fill="#FBCE07" opacity="0.5" />
          <circle cx="520" cy="445" r="2" fill="#FBCE07" opacity="0.4" />
          <circle cx="460" cy="420" r="1.5" fill="#FBCE07" opacity="0.3" />
        </svg>

        {/* Dark overlay gradient for text legibility */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.5) 100%)' }} />

        {/* Content */}
        <div className="relative flex-1 flex flex-col px-12 pt-10 pb-0">
          {/* Shell logo top center */}
          <div className="flex justify-center mb-8">
            <img src="/shell-logo.png" alt="Shell" className="w-20 h-20 object-contain drop-shadow-lg" />
          </div>

          {/* Main headline */}
          <div className="text-center mb-2">
            <h2
              className="font-bold leading-none tracking-tight"
              style={{
                fontSize: 'clamp(52px, 7vw, 80px)',
                background: 'linear-gradient(135deg, #FBCE07 0%, #FFE44D 50%, #DD1D21 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Symphony
            </h2>
            <p className="text-white/70 text-base font-light tracking-widest mt-2 uppercase">
              Commercial Intelligence in Motion
            </p>
          </div>

          {/* Visual separator */}
          <div className="flex items-center gap-3 justify-center my-6">
            <div className="h-px flex-1 max-w-24 bg-shell-yellow/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-shell-yellow/60" />
            <div className="h-px flex-1 max-w-24 bg-shell-yellow/30" />
          </div>

          {/* Value props grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {valueProps.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 bg-white/8 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-3">
                <div className="w-7 h-7 rounded-lg bg-shell-yellow/20 flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-shell-yellow" />
                </div>
                <span className="text-white/85 text-xs font-medium leading-tight">{label}</span>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <div className="text-center mb-6">
            <p className="text-white/50 text-xs font-light italic">
              "Convierte conversaciones comerciales en inteligencia accionable."
            </p>
          </div>
        </div>

        {/* Industries strip */}
        <div className="relative">
          <div className="flex">
            {industries.map(({ label, icon }) => (
              <div
                key={label}
                className="flex-1 flex flex-col items-center justify-end py-5 gap-2 border-t border-white/10"
                style={{ background: 'rgba(0,0,0,0.35)' }}
              >
                <span className="text-2xl">{icon}</span>
                <span className="text-[10px] font-bold text-white/70 tracking-widest uppercase">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
