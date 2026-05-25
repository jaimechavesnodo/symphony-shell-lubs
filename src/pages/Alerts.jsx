import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Clock, TrendingDown, PhoneMissed, FileWarning, BarChart2, UserCheck, ListChecks, ShieldAlert, RefreshCw, CheckCircle, ChevronRight } from 'lucide-react';
import useAppStore from '../store/useAppStore';

const iconMap = {
  'phone-missed': PhoneMissed,
  'alert-triangle': AlertTriangle,
  'trending-down': TrendingDown,
  'clock': Clock,
  'file-warning': FileWarning,
  'bar-chart-2': BarChart2,
  'user-check': UserCheck,
  'list-checks': ListChecks,
  'shield-alert': ShieldAlert,
  'refresh-cw': RefreshCw,
};

const severityConfig = {
  Alta: { bg: 'bg-red-50', border: 'border-red-100', iconBg: 'bg-red-100', iconColor: 'text-shell-red', badge: 'bg-red-100 text-shell-red' },
  Media: { bg: 'bg-amber-50', border: 'border-amber-100', iconBg: 'bg-amber-100', iconColor: 'text-amber-600', badge: 'bg-amber-100 text-amber-600' },
  Baja: { bg: 'bg-shell-gray-50', border: 'border-shell-gray-100', iconBg: 'bg-shell-gray-100', iconColor: 'text-shell-gray-500', badge: 'bg-shell-gray-100 text-shell-gray-500' },
};

export default function Alerts() {
  const { alerts, dismissAlert, opportunities } = useAppStore();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Todas');

  const severities = ['Todas', 'Alta', 'Media', 'Baja'];

  const filtered = alerts.filter((a) => {
    if (filter !== 'Todas' && a.severity !== filter) return false;
    return true;
  }).sort((a, b) => {
    if (a.resolved && !b.resolved) return 1;
    if (!a.resolved && b.resolved) return -1;
    const order = { Alta: 0, Media: 1, Baja: 2 };
    return (order[a.severity] || 0) - (order[b.severity] || 0);
  });

  const unresolved = alerts.filter((a) => !a.resolved);
  const counts = { Alta: unresolved.filter(a => a.severity === 'Alta').length, Media: unresolved.filter(a => a.severity === 'Media').length, Baja: unresolved.filter(a => a.severity === 'Baja').length };

  return (
    <div className="page-container">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-shell-gray-800">Alertas inteligentes</h1>
          <p className="text-sm text-shell-gray-400">{unresolved.length} alertas activas</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Alta prioridad', count: counts.Alta, color: 'text-shell-red', bg: 'bg-red-50', border: 'border-red-100' },
          { label: 'Media prioridad', count: counts.Media, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
          { label: 'Baja prioridad', count: counts.Baja, color: 'text-shell-gray-500', bg: 'bg-shell-gray-50', border: 'border-shell-gray-100' },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} ${s.border} border rounded-xl p-4 text-center`}>
            <div className={`text-2xl font-bold ${s.color}`}>{s.count}</div>
            <div className="text-xs text-shell-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {severities.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              filter === s ? 'bg-shell-yellow text-shell-gray-800' : 'bg-white border border-shell-gray-200 text-shell-gray-500 hover:border-shell-gray-300'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Alerts list */}
      <div className="space-y-3">
        {filtered.map((alert) => {
          const cfg = severityConfig[alert.severity] || severityConfig.Baja;
          const Icon = iconMap[alert.icon] || AlertTriangle;
          const opp = opportunities.find((o) => o.id === alert.opportunityId);

          return (
            <div
              key={alert.id}
              className={`card border ${alert.resolved ? 'opacity-50' : ''} ${cfg.border} transition-all duration-200`}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl ${cfg.iconBg} flex items-center justify-center shrink-0`}>
                    <Icon size={18} className={cfg.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${cfg.badge}`}>{alert.severity}</span>
                          {alert.resolved && <span className="text-[10px] text-green-600 font-semibold bg-green-50 px-1.5 py-0.5 rounded-full">Resuelto</span>}
                        </div>
                        <h3 className="text-sm font-semibold text-shell-gray-800">{alert.title}</h3>
                        <p className="text-xs text-shell-gray-500 font-medium mt-0.5">{alert.company}</p>
                      </div>
                      <span className="text-[10px] text-shell-gray-400 shrink-0">
                        {new Date(alert.date).toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })}
                      </span>
                    </div>
                    <p className="text-xs text-shell-gray-600 mt-2 leading-relaxed">{alert.description}</p>
                    <div className="flex items-center gap-2 mt-3">
                      {opp && (
                        <button
                          onClick={() => navigate(`/opportunities/${opp.id}`)}
                          className="text-xs text-shell-yellow-dark font-semibold flex items-center gap-0.5 hover:underline"
                        >
                          Ver oportunidad <ChevronRight size={12} />
                        </button>
                      )}
                      {!alert.resolved && (
                        <button
                          onClick={() => dismissAlert(alert.id)}
                          className="text-xs text-shell-gray-400 hover:text-shell-gray-600 flex items-center gap-1 ml-auto"
                        >
                          <CheckCircle size={12} /> Marcar resuelta
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
