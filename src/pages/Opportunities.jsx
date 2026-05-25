import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronRight, AlertTriangle } from 'lucide-react';
import useAppStore from '../store/useAppStore';
import SpancopBadge from '../components/ui/SpancopBadge';

const stages = ['Todas', 'Suspect', 'Prospect', 'Approach', 'Negotiate', 'Close', 'Order', 'Payment'];
const industries = ['Todas', 'Minería', 'Transporte', 'Agro', 'Pesca', 'Construcción', 'Industria', 'Aviación', 'Distribución'];
const riskColors = { Alto: 'text-shell-red', Medio: 'text-amber-600', Bajo: 'text-green-600' };
const industryEmojis = { Minería: '⛏️', Transporte: '🚛', Agro: '🌾', Pesca: '🐟', Construcción: '🏗️', Industria: '🏭', Aviación: '✈️', Distribución: '📦' };

export default function Opportunities() {
  const { opportunities, companies, executives, currentUser } = useAppStore();
  const navigate = useNavigate();
  const isAdmin = currentUser?.role === 'admin';

  const [stageFilter, setStageFilter] = useState('Todas');
  const [industryFilter, setIndustryFilter] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  const myOpps = isAdmin ? opportunities : opportunities.filter((o) => o.executiveId === currentUser?.executiveId);

  const companyName = (id) => companies.find((c) => c.id === id)?.name || id;
  const execName = (id) => executives.find((e) => e.id === id)?.name || id;

  const filtered = myOpps.filter((o) => {
    if (stageFilter !== 'Todas' && o.stage !== stageFilter) return false;
    if (industryFilter !== 'Todas' && o.industry !== industryFilter) return false;
    if (searchQuery && !companyName(o.companyId).toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page-container">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-shell-gray-800">Oportunidades</h1>
          <p className="text-sm text-shell-gray-400">{myOpps.length} oportunidades en pipeline</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-shell-gray-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por empresa..."
            className="w-full pl-8 pr-3 py-2 text-sm bg-shell-gray-50 rounded-lg border border-shell-gray-200 focus:outline-none focus:ring-2 focus:ring-shell-yellow focus:bg-white"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="text-xs border border-shell-gray-200 rounded-lg px-3 py-2 bg-white text-shell-gray-700 focus:outline-none focus:ring-2 focus:ring-shell-yellow"
          >
            {stages.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="text-xs border border-shell-gray-200 rounded-lg px-3 py-2 bg-white text-shell-gray-700 focus:outline-none focus:ring-2 focus:ring-shell-yellow"
          >
            {industries.map((i) => <option key={i}>{i}</option>)}
          </select>
        </div>
      </div>

      {/* Stage tabs quick filter */}
      <div className="flex gap-2 flex-wrap mb-4">
        {stages.map((s) => (
          <button
            key={s}
            onClick={() => setStageFilter(s)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              stageFilter === s
                ? 'bg-shell-yellow text-shell-gray-800'
                : 'bg-white border border-shell-gray-200 text-shell-gray-500 hover:border-shell-gray-300'
            }`}
          >
            {s} {s !== 'Todas' && `(${myOpps.filter(o => o.stage === s).length})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-shell-gray-100">
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-shell-gray-400 uppercase tracking-wide">Empresa</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-shell-gray-400 uppercase tracking-wide">Etapa</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-shell-gray-400 uppercase tracking-wide hidden md:table-cell">Producto</th>
                <th className="text-right px-4 py-3 text-[11px] font-semibold text-shell-gray-400 uppercase tracking-wide">Volumen</th>
                <th className="text-right px-4 py-3 text-[11px] font-semibold text-shell-gray-400 uppercase tracking-wide hidden sm:table-cell">Valor</th>
                <th className="text-right px-4 py-3 text-[11px] font-semibold text-shell-gray-400 uppercase tracking-wide hidden lg:table-cell">Prob.</th>
                <th className="text-center px-4 py-3 text-[11px] font-semibold text-shell-gray-400 uppercase tracking-wide hidden lg:table-cell">Riesgo</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold text-shell-gray-400 uppercase tracking-wide hidden xl:table-cell">Ejecutivo</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((opp) => (
                <tr
                  key={opp.id}
                  onClick={() => navigate(`/opportunities/${opp.id}`)}
                  className="border-b border-shell-gray-50 hover:bg-shell-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-shell-gray-100 flex items-center justify-center text-sm shrink-0">
                        {industryEmojis[opp.industry] || '🏢'}
                      </div>
                      <div>
                        <div className="font-semibold text-shell-gray-800 text-xs">{companyName(opp.companyId)}</div>
                        <div className="text-[10px] text-shell-gray-400">{opp.region}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <SpancopBadge stage={opp.stage} size="sm" />
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs text-shell-gray-600">{opp.product}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-xs font-bold text-shell-gray-800">{(opp.volumeL / 1000).toFixed(0)}K L</span>
                  </td>
                  <td className="px-4 py-3 text-right hidden sm:table-cell">
                    <span className="text-xs font-semibold text-shell-gray-700">${(opp.valueUSD / 1000).toFixed(0)}K</span>
                  </td>
                  <td className="px-4 py-3 text-right hidden lg:table-cell">
                    <span className="text-xs font-bold text-blue-600">{opp.probability}%</span>
                  </td>
                  <td className="px-4 py-3 text-center hidden lg:table-cell">
                    <span className={`text-[10px] font-semibold ${riskColors[opp.risk]}`}>
                      {opp.risk === 'Alto' && <AlertTriangle size={10} className="inline mr-0.5" />}
                      {opp.risk}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden xl:table-cell">
                    <span className="text-xs text-shell-gray-500">{execName(opp.executiveId)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <ChevronRight size={14} className="text-shell-gray-300" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-shell-gray-400 text-sm">
              No hay oportunidades con los filtros seleccionados
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
