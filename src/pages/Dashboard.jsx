import { useNavigate } from 'react-router-dom';
import {
  Droplets, DollarSign, TrendingUp, Target, AlertTriangle,
  Clock, ChevronRight, Calendar, Activity, Zap, Bell
} from 'lucide-react';
import useAppStore from '../store/useAppStore';
import KPICard from '../components/ui/KPICard';
import SpancopBadge from '../components/ui/SpancopBadge';
import ForecastChart from '../components/charts/ForecastChart';
import IndustryChart from '../components/charts/IndustryChart';
import SpancopFunnel from '../components/charts/SpancopFunnel';
import EnergyLines from '../components/ui/EnergyLines';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Buenos días';
  if (h < 18) return 'Buenas tardes';
  return 'Buenas noches';
}

const activityIcons = {
  reunion: { bg: 'bg-blue-50', text: 'text-blue-500', icon: '🤝' },
  llamada: { bg: 'bg-green-50', text: 'text-green-500', icon: '📞' },
  correo: { bg: 'bg-shell-yellow-light', text: 'text-amber-600', icon: '✉️' },
  actualización: { bg: 'bg-purple-50', text: 'text-purple-500', icon: '🔄' },
  visita: { bg: 'bg-orange-50', text: 'text-orange-500', icon: '🏢' },
  nota: { bg: 'bg-shell-gray-50', text: 'text-shell-gray-500', icon: '📝' },
  compromiso: { bg: 'bg-red-50', text: 'text-red-500', icon: '⚠️' },
};

export default function Dashboard() {
  const { currentUser, opportunities, alerts, events, forecastUpdated } = useAppStore();
  const navigate = useNavigate();

  const firstName = currentUser?.name?.split(' ')[0] || 'Carlos';
  const isAdmin = currentUser?.role === 'admin';

  const myOpps = isAdmin ? opportunities : opportunities.filter((o) => o.executiveId === currentUser?.executiveId);

  const totalVolumeL = myOpps.reduce((s, o) => s + (o.volumeL || 0), 0);
  const totalValueUSD = myOpps.reduce((s, o) => s + (o.valueUSD || 0), 0);
  const forecastPct = forecastUpdated ? 85 : 82;
  const activeOpps = myOpps.filter((o) => !['Payment'].includes(o.stage)).length;
  const atRisk = myOpps.filter((o) => o.risk === 'Alto' || o.daysSinceContact >= 7).length;
  const pendingCommitments = myOpps.reduce((s, o) => s + (o.commitments?.length || 0), 0);

  // Top opportunities for table
  const topOpps = myOpps
    .filter((o) => ['Approach', 'Negotiate', 'Close'].includes(o.stage))
    .sort((a, b) => b.valueUSD - a.valueUSD)
    .slice(0, 4);

  // Recent activities
  const recentActivities = myOpps
    .flatMap((o) => (o.activities || []).map((a) => ({ ...a, company: o.companyId })))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Company name lookup
  const companies = useAppStore((s) => s.companies);
  const companyName = (id) => companies.find((c) => c.id === id)?.name || id;

  // Upcoming events
  const upcoming = events
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 4);

  // Unresolved alerts
  const unresolvedAlerts = alerts.filter((a) => !a.resolved).slice(0, 5);

  // SPANCOP KPIs
  const panc = myOpps.filter((o) => ['Prospect', 'Approach', 'Negotiate', 'Close'].includes(o.stage));
  const panctVol = panc.reduce((s, o) => s + (o.volumeL || 0), 0);
  const pipelineStrength = (panctVol / 200000).toFixed(1);
  const prospects = myOpps.filter((o) => o.stage === 'Prospect').length;
  const closes = myOpps.filter((o) => o.stage === 'Close').length;
  const hitRate = prospects > 0 ? Math.round((closes / prospects) * 100) : 25;
  const cycleTime = 47;

  const formatDate = (d) => new Date(d).toLocaleDateString('es-PE', { day: '2-digit', month: 'short' });

  const eventTypeColors = {
    reunion: 'bg-shell-yellow-light text-amber-700',
    visita: 'bg-blue-50 text-blue-600',
    seguimiento: 'bg-green-50 text-green-600',
    compromiso: 'bg-purple-50 text-purple-600',
    vencimiento: 'bg-red-50 text-shell-red',
  };

  return (
    <div className="page-container">
      {/* ─── Hero ───────────────────────────────────────────────────────────── */}
      <div className="relative bg-white rounded-2xl p-6 mb-6 border border-shell-gray-100 shadow-card overflow-hidden">
        <EnergyLines position="bottom-right" opacity={0.2} />
        <div className="relative">
          <h1 className="text-2xl font-bold text-shell-gray-800">
            {getGreeting()}, {firstName} 👋
          </h1>
          <p className="text-sm text-shell-gray-500 mt-1">Aquí tienes el pulso comercial de hoy.</p>

          {/* Daily pulse */}
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              { icon: '📉', text: '2 clientes con caída de volumen', color: 'text-shell-red' },
              { icon: '⚠️', text: '1 compromiso técnico por vencer', color: 'text-amber-600' },
              { icon: '🔔', text: '4 oportunidades sin seguimiento', color: 'text-orange-600' },
              { icon: forecastUpdated ? '📈' : '📊', text: `Forecast del mes: ${forecastPct}%`, color: 'text-green-600' },
              { icon: '💧', text: `${(totalVolumeL / 1000).toFixed(1)}K L proyectados`, color: 'text-blue-600' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-1.5 bg-shell-gray-50 rounded-lg px-3 py-1.5 text-xs">
                <span>{item.icon}</span>
                <span className={`font-medium ${item.color}`}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── KPI Cards ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <KPICard label="Pipeline total (L)" value={`${(totalVolumeL / 1000).toFixed(1)}K`} trend="+12%" trendLabel="vs mes ant." icon={Droplets} accentColor="yellow" />
        <KPICard label="Pipeline (USD)" value={`$${(totalValueUSD / 1000).toFixed(0)}K`} trend="+8%" trendLabel="vs mes ant." icon={DollarSign} accentColor="yellow" />
        <KPICard label="Forecast probado" value={`${forecastPct}%`} trend={forecastUpdated ? '+3%' : '+6%'} trendLabel="vs mes ant." icon={TrendingUp} accentColor="green" />
        <KPICard label="Oportunidades activas" value={activeOpps} subtitle="en pipeline" icon={Target} accentColor="blue" />
        <KPICard label="Clientes en riesgo" value={atRisk} subtitle="requieren acción" icon={AlertTriangle} accentColor="red" onClick={() => navigate('/alerts')} />
        <KPICard label="Compromisos por vencer" value={pendingCommitments} subtitle="esta semana" icon={Clock} accentColor="gray" />
      </div>

      {/* ─── Middle row ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* SPANCOP mini + KPIs */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title mb-0">SPANCOP – Embudo comercial</h3>
            <button onClick={() => navigate('/spancop')} className="text-xs text-shell-yellow-dark font-semibold hover:underline flex items-center gap-0.5">
              Ver completo <ChevronRight size={12} />
            </button>
          </div>
          <SpancopFunnel />
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-shell-gray-100 pt-4">
            <div className="text-center">
              <div className="text-lg font-bold text-shell-gray-800">{pipelineStrength}x</div>
              <div className="text-[10px] text-shell-gray-400">Pipeline Strength</div>
              <div className="text-[10px] text-green-500 font-semibold">&gt;5.0 ✓</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-shell-gray-800">{hitRate}%</div>
              <div className="text-[10px] text-shell-gray-400">Hit Rate</div>
              <div className="text-[10px] text-green-500 font-semibold">&gt;20% ✓</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-shell-gray-800">{cycleTime}d</div>
              <div className="text-[10px] text-shell-gray-400">Cycle Time</div>
              <div className="text-[10px] text-shell-gray-400">Approach→Close</div>
            </div>
          </div>
        </div>

        {/* Forecast chart */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title mb-0">Forecast de volúmenes (L)</h3>
          </div>
          <ForecastChart />
        </div>

        {/* Alerts */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title mb-0 flex items-center gap-2">
              <Bell size={14} className="text-shell-red" />
              Alertas inteligentes
            </h3>
            <button onClick={() => navigate('/alerts')} className="text-xs text-shell-yellow-dark font-semibold hover:underline flex items-center gap-0.5">
              Ver todas <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-2.5">
            {unresolvedAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-shell-gray-50 cursor-pointer transition-colors" onClick={() => navigate('/alerts')}>
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${alert.severity === 'Alta' ? 'bg-shell-red' : alert.severity === 'Media' ? 'bg-amber-400' : 'bg-shell-gray-300'}`} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-shell-gray-700 leading-tight">{alert.title}</p>
                  <p className="text-[10px] text-shell-gray-400 mt-0.5 truncate">{alert.company}</p>
                </div>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${alert.severity === 'Alta' ? 'bg-red-50 text-shell-red' : alert.severity === 'Media' ? 'bg-amber-50 text-amber-600' : 'bg-shell-gray-100 text-shell-gray-500'}`}>
                  {alert.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Bottom row ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Opportunities in focus */}
        <div className="lg:col-span-1 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title mb-0">Oportunidades en atención</h3>
            <button onClick={() => navigate('/opportunities')} className="text-xs text-shell-yellow-dark font-semibold hover:underline flex items-center gap-0.5">
              Ver todas <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-2">
            {topOpps.map((opp) => (
              <div
                key={opp.id}
                onClick={() => navigate(`/opportunities/${opp.id}`)}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-shell-gray-50 cursor-pointer transition-colors border border-transparent hover:border-shell-gray-100"
              >
                <div className="w-8 h-8 rounded-lg bg-shell-gray-100 flex items-center justify-center shrink-0">
                  <span className="text-sm">🏭</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-shell-gray-700 truncate">{companyName(opp.companyId)}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <SpancopBadge stage={opp.stage} size="sm" />
                    <span className="text-[10px] text-shell-gray-400">{(opp.volumeL / 1000).toFixed(0)}K L</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-shell-gray-700">${(opp.valueUSD / 1000).toFixed(0)}K</div>
                  <div className="text-[10px] text-shell-gray-400">{opp.probability}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title mb-0 flex items-center gap-2">
              <Activity size={14} className="text-shell-gray-400" />
              Actividad reciente
            </h3>
          </div>
          <div className="space-y-3">
            {recentActivities.map((act) => {
              const cfg = activityIcons[act.type] || activityIcons.nota;
              return (
                <div key={act.id} className="flex items-start gap-2.5">
                  <div className={`w-7 h-7 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0 text-sm`}>
                    {cfg.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-shell-gray-700 leading-snug line-clamp-2">{act.text}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-shell-gray-400">{act.executiveName}</span>
                      <span className="text-[10px] text-shell-gray-300">·</span>
                      <span className="text-[10px] text-shell-gray-400">{formatDate(act.date)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming events */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title mb-0 flex items-center gap-2">
              <Calendar size={14} className="text-shell-gray-400" />
              Próximos compromisos
            </h3>
            <button onClick={() => navigate('/calendar')} className="text-xs text-shell-yellow-dark font-semibold hover:underline flex items-center gap-0.5">
              Ver calendario <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-2.5">
            {upcoming.map((evt) => (
              <div key={evt.id} className="flex items-center gap-3">
                <div className="text-center w-10 shrink-0">
                  <div className="text-base font-bold text-shell-gray-800 leading-none">
                    {new Date(evt.date).getDate()}
                  </div>
                  <div className="text-[10px] text-shell-gray-400 uppercase">
                    {new Date(evt.date).toLocaleDateString('es-PE', { month: 'short' })}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-shell-gray-700 truncate">{evt.title}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold capitalize ${eventTypeColors[evt.type] || 'bg-shell-gray-100 text-shell-gray-500'}`}>
                      {evt.type}
                    </span>
                    {evt.time && evt.time !== '00:00' && (
                      <span className="text-[10px] text-shell-gray-400">{evt.time}</span>
                    )}
                    {evt.source === 'b2buddy' && (
                      <span className="text-[9px] bg-shell-yellow text-shell-gray-700 px-1 py-0.5 rounded font-bold">B2B</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Industry chart ──────────────────────────────────────────────────── */}
      <div className="card p-5 mb-4">
        <h3 className="section-title">Distribución por industria (L proyectados)</h3>
        <IndustryChart />
      </div>
    </div>
  );
}
