import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Users, LogOut, Shield, RefreshCw } from 'lucide-react';
import useAppStore from '../store/useAppStore';

export default function Settings() {
  const { currentUser, logout, executives, resetDemo } = useAppStore();
  const navigate = useNavigate();
  const [alertToggles, setAlertToggles] = useState({
    sin_contacto: true, compromiso: true, caida_volumen: true,
    estancada: true, contrato: true, forecast: true, pareto: false,
  });

  const toggleAlert = (key) => setAlertToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleLogout = () => { logout(); navigate('/login'); };
  const handleReset = () => { resetDemo(); navigate('/dashboard'); };

  const alertLabels = {
    sin_contacto: 'Cliente sin contacto (> 7 días)',
    compromiso: 'Compromiso técnico por vencer',
    caida_volumen: 'Caída de volumen detectada',
    estancada: 'Oportunidad estancada',
    contrato: 'Contrato próximo a vencer',
    forecast: 'Forecast bajo frente a meta',
    pareto: 'Cliente Pareto sin visita',
  };

  return (
    <div className="page-container max-w-2xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-shell-gray-800">Configuración</h1>
        <p className="text-sm text-shell-gray-400">Preferencias y ajustes de cuenta</p>
      </div>

      {/* Profile */}
      <div className="card p-5 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <User size={16} className="text-shell-gray-400" />
          <h2 className="text-sm font-bold text-shell-gray-700">Perfil de usuario</h2>
        </div>
        {currentUser && (
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-shell-yellow flex items-center justify-center text-shell-gray-800 font-bold text-xl">
              {currentUser.avatar}
            </div>
            <div>
              <h3 className="text-base font-bold text-shell-gray-800">{currentUser.name}</h3>
              <p className="text-sm text-shell-gray-500">{currentUser.title}</p>
              <p className="text-xs text-shell-gray-400">{currentUser.email}</p>
              <span className={`mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${currentUser.role === 'admin' ? 'bg-shell-red text-white' : 'bg-shell-gray-700 text-white'}`}>
                {currentUser.role === 'admin' ? 'Administrador' : 'Ejecutivo'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Alert settings */}
      <div className="card p-5 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Bell size={16} className="text-shell-gray-400" />
          <h2 className="text-sm font-bold text-shell-gray-700">Configuración de alertas</h2>
        </div>
        <div className="space-y-3">
          {Object.entries(alertLabels).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between py-2 border-b border-shell-gray-50 last:border-0">
              <span className="text-sm text-shell-gray-700">{label}</span>
              <button
                onClick={() => toggleAlert(key)}
                className={`w-11 h-6 rounded-full transition-colors duration-200 relative ${alertToggles[key] ? 'bg-shell-yellow' : 'bg-shell-gray-200'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 shadow-sm ${alertToggles[key] ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Executives (admin only) */}
      {currentUser?.role === 'admin' && (
        <div className="card p-5 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Users size={16} className="text-shell-gray-400" />
            <h2 className="text-sm font-bold text-shell-gray-700">Equipo comercial</h2>
          </div>
          <div className="space-y-2">
            {executives.map((exec) => (
              <div key={exec.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-shell-gray-50">
                <div className="w-8 h-8 rounded-full bg-shell-yellow flex items-center justify-center text-xs font-bold text-shell-gray-800">
                  {exec.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-shell-gray-700">{exec.name}</p>
                  <p className="text-xs text-shell-gray-400">{exec.sector} · {exec.email}</p>
                </div>
                <span className="text-xs text-shell-gray-400">{exec.points} pts</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Demo tools */}
      <div className="card p-5 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={16} className="text-shell-gray-400" />
          <h2 className="text-sm font-bold text-shell-gray-700">Herramientas de demo</h2>
        </div>
        <p className="text-xs text-shell-gray-400 mb-3">Restaura los datos al estado inicial para reiniciar la presentación.</p>
        <button onClick={handleReset} className="btn-secondary">
          <RefreshCw size={14} />
          Reiniciar datos del demo
        </button>
      </div>

      {/* Logout */}
      <div className="card p-5">
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-semibold text-shell-red hover:text-shell-red-dark transition-colors">
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
