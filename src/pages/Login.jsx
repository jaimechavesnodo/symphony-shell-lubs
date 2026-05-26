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
    description: 'Vista completa: todos los ejecutivos, dashboard consolidado, programa de incentivos.',
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

      {/* ─── LEFT PANEL ────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:w-[38%] bg-white min-h-screen">

        {/* Branding header — Shell logo + Symphony title */}
        <div className="px-8 pt-8 pb-5">
          <div className="flex items-center gap-3 mb-4">
            <img src={`${BASE}shell-logo.png`} alt="Shell" className="w-12 h-12 object-contain shrink-0" />
            <div>
              <div
                className="font-bold leading-none"
                style={{
                  fontSize: 28,
                  background: 'linear-gradient(135deg, #D4A800 0%, #FBCE07 50%, #DD1D21 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Symphony
              </div>
              <div className="text-[11px] text-shell-gray-400 font-medium mt-0.5 tracking-wide">
                Commercial Intelligence in Motion
              </div>
            </div>
          </div>
          <div className="h-0.5 w-10 bg-shell-yellow" />
        </div>

        {/* Form content */}
        <div className="flex-1 flex flex-col px-8 pb-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-shell-gray-800 leading-tight">
              Bienvenido a <span className="text-shell-red">Symphony</span>
            </h1>
            <p className="text-shell-gray-500 text-sm mt-1.5 leading-relaxed">
              La plataforma de inteligencia comercial que impulsa mejores decisiones y resultados.
            </p>
          </div>

          <p className="text-[11px] font-bold text-shell-gray-400 uppercase tracking-wider mb-3">
            Selecciona tu perfil para ingresar
          </p>

          <div className="space-y-3 mb-5">
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
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-shell-yellow' : 'bg-shell-gray-100'}`}>
                      <Icon size={16} className={isSelected ? 'text-shell-gray-800' : 'text-shell-gray-500'} />
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

          <div className="mt-4 flex items-start gap-2 text-[11px] text-shell-gray-400">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span>
              Tu información está segura con nosotros.{' '}
              <span className="text-shell-red font-medium cursor-pointer">
                Conoce más sobre seguridad y privacidad →
              </span>
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-shell-gray-100">
          <p className="text-[11px] text-shell-gray-400 text-center">
            Powered by NODO · Prototipo v1.0 · 2026
          </p>
        </div>
      </div>

      {/* ─── RIGHT PANEL — Full image, no overlay text ─────────────────────── */}
      <div
        className="hidden md:block md:w-[62%] relative"
        style={{
          backgroundImage: `url(${BASE}login-bg.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
        }}
      />
    </div>
  );
}
