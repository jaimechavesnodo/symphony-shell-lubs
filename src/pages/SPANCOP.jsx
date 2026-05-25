import { useNavigate } from 'react-router-dom';
import useAppStore from '../store/useAppStore';
import SpancopBadge from '../components/ui/SpancopBadge';

const stages = [
  { key: 'Suspect', color: 'bg-shell-gray-50', header: 'bg-shell-gray-100', headerText: 'text-shell-gray-600', border: 'border-shell-gray-200' },
  { key: 'Prospect', color: 'bg-amber-50/30', header: 'bg-amber-50', headerText: 'text-amber-700', border: 'border-amber-100' },
  { key: 'Approach', color: 'bg-orange-50/30', header: 'bg-orange-50', headerText: 'text-orange-700', border: 'border-orange-100' },
  { key: 'Negotiate', color: 'bg-blue-50/30', header: 'bg-blue-50', headerText: 'text-blue-700', border: 'border-blue-100' },
  { key: 'Close', color: 'bg-green-50/30', header: 'bg-green-50', headerText: 'text-green-700', border: 'border-green-100' },
  { key: 'Order', color: 'bg-emerald-50/30', header: 'bg-emerald-50', headerText: 'text-emerald-700', border: 'border-emerald-100' },
  { key: 'Payment', color: 'bg-teal-50/30', header: 'bg-teal-50', headerText: 'text-teal-700', border: 'border-teal-100' },
];

const industryEmojis = { Minería: '⛏️', Transporte: '🚛', Agro: '🌾', Pesca: '🐟', Construcción: '🏗️', Industria: '🏭', Aviación: '✈️', Distribución: '📦' };
const riskColors = { Alto: 'text-shell-red bg-red-50', Medio: 'text-amber-600 bg-amber-50', Bajo: 'text-green-600 bg-green-50' };

export default function SPANCOP() {
  const { opportunities, companies, currentUser } = useAppStore();
  const navigate = useNavigate();
  const isAdmin = currentUser?.role === 'admin';

  const myOpps = isAdmin ? opportunities : opportunities.filter((o) => o.executiveId === currentUser?.executiveId);
  const companyName = (id) => companies.find((c) => c.id === id)?.name?.split(' ').slice(0, 2).join(' ') || id;

  // KPIs
  const panc = myOpps.filter((o) => ['Prospect', 'Approach', 'Negotiate', 'Close'].includes(o.stage));
  const pancVol = panc.reduce((s, o) => s + (o.volumeL || 0), 0);
  const pipelineStrength = (pancVol / 200000).toFixed(1);
  const prospects = myOpps.filter((o) => o.stage === 'Prospect').length;
  const closes = myOpps.filter((o) => o.stage === 'Close').length;
  const hitRate = prospects > 0 ? Math.round((closes / prospects) * 100) : 25;

  const totalVolumeByStage = (key) =>
    myOpps.filter((o) => o.stage === key).reduce((s, o) => s + (o.volumeL || 0), 0);
  const totalValueByStage = (key) =>
    myOpps.filter((o) => o.stage === key).reduce((s, o) => s + (o.valueUSD || 0), 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-shell-gray-800">SPANCOP – Embudo Comercial</h1>
        <p className="text-sm text-shell-gray-400 mt-1">Vista Kanban de todas las oportunidades en pipeline</p>
      </div>

      {/* KPI bar */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
        {[
          { label: 'Total oportunidades', value: myOpps.length },
          { label: 'Volumen pipeline', value: `${(myOpps.reduce((s, o) => s + o.volumeL, 0) / 1000).toFixed(0)}K L` },
          { label: 'Valor pipeline', value: `$${(myOpps.reduce((s, o) => s + o.valueUSD, 0) / 1000).toFixed(0)}K` },
          { label: 'Pipeline Strength', value: `${pipelineStrength}x`, badge: '> 5.0 ✓', badgeColor: 'text-green-600' },
          { label: 'Hit Rate', value: `${hitRate}%`, badge: '> 20% ✓', badgeColor: 'text-green-600' },
          { label: 'Cycle Time', value: '47 días', badge: 'Approach→Close', badgeColor: 'text-shell-gray-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl p-3 border border-shell-gray-100 shadow-card text-center">
            <div className="text-lg font-bold text-shell-gray-800">{kpi.value}</div>
            <div className="text-[10px] text-shell-gray-400">{kpi.label}</div>
            {kpi.badge && <div className={`text-[10px] font-semibold mt-0.5 ${kpi.badgeColor}`}>{kpi.badge}</div>}
          </div>
        ))}
      </div>

      {/* Kanban */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {stages.map(({ key, color, header, headerText, border }) => {
          const opps = myOpps.filter((o) => o.stage === key);
          const vol = totalVolumeByStage(key);
          const val = totalValueByStage(key);
          return (
            <div key={key} className={`flex-none w-64 rounded-2xl ${color} border ${border} flex flex-col`} style={{ minHeight: 480 }}>
              {/* Column header */}
              <div className={`${header} rounded-t-2xl px-3 py-3 border-b ${border}`}>
                <div className="flex items-center justify-between mb-1">
                  <SpancopBadge stage={key} />
                  <span className={`text-xs font-bold ${headerText}`}>{opps.length}</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className={headerText}>{vol > 0 ? `${(vol / 1000).toFixed(0)}K L` : '–'}</span>
                  <span className={headerText}>{val > 0 ? `$${(val / 1000).toFixed(0)}K` : '–'}</span>
                </div>
              </div>

              {/* Cards */}
              <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                {opps.map((opp) => (
                  <div
                    key={opp.id}
                    onClick={() => navigate(`/opportunities/${opp.id}`)}
                    className="bg-white rounded-xl p-3 shadow-card border border-shell-gray-100 cursor-pointer hover:shadow-card-hover hover:border-shell-gray-200 transition-all duration-150 animate-fade-in"
                  >
                    <div className="flex items-start justify-between gap-1 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{industryEmojis[opp.industry] || '🏢'}</span>
                        <p className="text-xs font-semibold text-shell-gray-800 leading-tight">{companyName(opp.companyId)}</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-shell-gray-400 mb-1.5 truncate">{opp.product}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-shell-gray-700">{(opp.volumeL / 1000).toFixed(0)}K L</div>
                        <div className="text-[10px] text-shell-gray-400">${(opp.valueUSD / 1000).toFixed(0)}K</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-blue-600">{opp.probability}%</div>
                        <div className="text-[10px] text-shell-gray-400">{opp.daysInStage}d</div>
                      </div>
                    </div>
                    {opp.risk !== 'Bajo' && (
                      <div className={`mt-2 text-[10px] font-semibold px-1.5 py-0.5 rounded-md inline-block ${riskColors[opp.risk]}`}>
                        Riesgo {opp.risk}
                      </div>
                    )}
                    {opp.daysSinceContact >= 7 && (
                      <div className="mt-1 text-[10px] text-shell-red font-semibold">
                        ⚠️ {opp.daysSinceContact}d sin contacto
                      </div>
                    )}
                  </div>
                ))}
                {opps.length === 0 && (
                  <div className="flex items-center justify-center h-24 text-[11px] text-shell-gray-300 font-medium">
                    Sin oportunidades
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
