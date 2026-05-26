import { X, Phone, Mail, User, TrendingDown, Calendar, CheckCircle, AlertTriangle, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { alertDetails } from '../../data/alertDetails';
import useAppStore from '../../store/useAppStore';

const SEV_COLORS = {
  Alta:  { bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-shell-red',    dot: 'bg-shell-red' },
  Media: { bg: 'bg-amber-50',  border: 'border-amber-200',  text: 'text-amber-600',    dot: 'bg-amber-400' },
  Baja:  { bg: 'bg-shell-gray-50', border: 'border-shell-gray-200', text: 'text-shell-gray-500', dot: 'bg-shell-gray-400' },
};

const COMMITMENT_STATUS = {
  vencido:  { label: 'Vencido',  cls: 'text-shell-red bg-red-50' },
  pendiente:{ label: 'Pendiente',cls: 'text-amber-600 bg-amber-50' },
  completado:{ label: 'Hecho',   cls: 'text-green-600 bg-green-50' },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-card-hover border border-shell-gray-100 p-3 text-xs">
      <p className="font-semibold text-shell-gray-700 mb-1">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-shell-gray-500">{p.name}:</span>
          <span className="font-semibold text-shell-gray-700">
            {typeof p.value === 'number' && p.value > 1000
              ? `${(p.value/1000).toFixed(1)}K L`
              : `${p.value}${p.name === 'meta' || p.name === 'forecast' ? '%' : ''}`}
          </span>
        </div>
      ))}
    </div>
  );
};

function VolumeChart({ data, clientName }) {
  const isForecast = clientName === 'Forecast vs Meta';
  return (
    <ResponsiveContainer width="100%" height={180}>
      {isForecast ? (
        <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
          <XAxis dataKey="mes" tick={{ fontSize: 10, fill: '#999' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#999' }} axisLine={false} tickLine={false} domain={[50, 100]} unit="%" />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={80} stroke="#DD1D21" strokeDasharray="4 3" strokeWidth={1.5} />
          <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#FBCE07" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="meta" name="meta" stroke="#DD1D21" strokeWidth={1.5} strokeDasharray="5 3" dot={false} />
        </LineChart>
      ) : (
        <AreaChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-${clientName.replace(/\s/g,'')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FBCE07" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FBCE07" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
          <XAxis dataKey="mes" tick={{ fontSize: 10, fill: '#999' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#999' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="vol" name="Volumen L" stroke="#FBCE07" strokeWidth={2.5} fill={`url(#grad-${clientName.replace(/\s/g,'')})`} dot={false} />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
}

export default function AlertDetailModal({ alert, onClose }) {
  const navigate = useNavigate();
  const { dismissAlert } = useAppStore();

  if (!alert) return null;

  const detail = alertDetails[alert.id];
  const sev = SEV_COLORS[alert.severity] || SEV_COLORS.Baja;

  const handleGoToOpportunity = (opportunityId) => {
    navigate(`/opportunities/${opportunityId}`);
    onClose();
  };

  const handleResolve = () => {
    dismissAlert(alert.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-shell-gray-800/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-2xl max-h-[88vh] flex flex-col animate-fade-in">

        {/* Header */}
        <div className={`flex items-start gap-3 px-6 py-4 border-b border-shell-gray-100 ${sev.bg} rounded-t-2xl`}>
          <div className={`w-2.5 h-2.5 rounded-full ${sev.dot} mt-1.5 shrink-0`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sev.border} ${sev.text} ${sev.bg}`}>
                {alert.severity}
              </span>
              <span className="text-[10px] text-shell-gray-400 capitalize">{alert.type?.replace(/_/g, ' ')}</span>
            </div>
            <h2 className="text-sm font-bold text-shell-gray-800">{alert.title}</h2>
            <p className="text-xs text-shell-gray-500 mt-0.5">{alert.company}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-white/60 flex items-center justify-center text-shell-gray-400 shrink-0">
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          {/* Summary */}
          {detail?.summary && (
            <div className="bg-shell-gray-50 rounded-xl p-4 border border-shell-gray-100">
              <p className="text-sm text-shell-gray-700 leading-relaxed">{detail.summary}</p>
            </div>
          )}

          {/* Client cards */}
          {detail?.clients?.map((client, i) => (
            <div key={i} className="border border-shell-gray-100 rounded-xl overflow-hidden">
              <div className="bg-shell-gray-50 px-4 py-2 border-b border-shell-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-shell-gray-700">{client.company}</span>
                <button
                  onClick={() => handleGoToOpportunity(client.opportunityId)}
                  className="text-[10px] text-shell-yellow-dark font-semibold flex items-center gap-0.5 hover:underline"
                >
                  Ver oportunidad <ChevronRight size={10} />
                </button>
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                {/* Contact info */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-shell-gray-600">
                    <User size={11} className="text-shell-gray-400" />
                    <span className="font-semibold">{client.contact}</span>
                    <span className="text-shell-gray-400">· {client.role}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-shell-gray-500">
                    <Phone size={11} className="text-shell-gray-400" />
                    {client.phone}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-shell-gray-500">
                    <User size={11} className="text-shell-gray-400" />
                    Ejecutivo: <span className="font-semibold text-shell-gray-700">{client.executive}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-shell-gray-500">
                    <Clock size={11} className="text-shell-gray-400" />
                    Último contacto: <span className={`font-semibold ${client.daysSince >= 7 ? 'text-shell-red' : 'text-shell-gray-700'}`}>hace {client.daysSince} días</span>
                  </div>
                </div>

                {/* Opportunity info */}
                <div className="space-y-1.5 border-l border-shell-gray-100 pl-3">
                  <div className="text-xs text-shell-gray-500">Etapa: <span className="font-semibold text-shell-gray-700">{client.stage}</span></div>
                  <div className="text-xs text-shell-gray-500">Producto: <span className="font-semibold text-shell-gray-700">{client.product}</span></div>
                  <div className="text-xs text-shell-gray-500">
                    Volumen: <span className="font-semibold text-shell-gray-700">{((client.volumeL || client.volumeActualL || 0)/1000).toFixed(0)}K L</span>
                  </div>
                  {client.valueUSD && (
                    <div className="text-xs text-shell-gray-500">Valor: <span className="font-semibold text-shell-gray-700">${(client.valueUSD/1000).toFixed(0)}K</span></div>
                  )}
                  {/* Volume drop specific */}
                  {client.volumeAnteriorL && (
                    <div className="mt-2 bg-red-50 rounded-lg p-2 border border-red-100">
                      <div className="text-[10px] font-bold text-shell-red mb-1 flex items-center gap-1">
                        <TrendingDown size={10} /> Caída de volumen
                      </div>
                      <div className="text-xs text-shell-gray-700">
                        <span className="text-green-600 font-semibold">{(client.volumeAnteriorL/1000).toFixed(0)}K L</span>
                        <span className="text-shell-gray-400 mx-1">→</span>
                        <span className="text-shell-red font-semibold">{(client.volumeActualL/1000).toFixed(0)}K L</span>
                        <span className="ml-1 text-shell-red font-bold">({client.caida}%)</span>
                      </div>
                      <div className="text-[10px] text-shell-gray-400 mt-0.5">Período: {client.periodo}</div>
                    </div>
                  )}
                  {/* Contract info */}
                  {client.contratoVigente && (
                    <div className="mt-2 bg-amber-50 rounded-lg p-2 border border-amber-100">
                      <div className="text-[10px] font-bold text-amber-600 mb-1">📋 Contrato vigente</div>
                      <div className="text-xs text-shell-gray-700">Vence: <span className="font-semibold text-shell-red">{client.contratoVigente.vencimiento}</span></div>
                      <div className="text-[10px] text-shell-gray-400">Quedan <span className="font-bold text-shell-red">{client.contratoVigente.diasRestantes} días</span></div>
                    </div>
                  )}
                  {/* Competitor info */}
                  {client.competidor && (
                    <div className="mt-2 bg-red-50 rounded-lg p-2 border border-red-100">
                      <div className="text-[10px] font-bold text-shell-red mb-0.5">⚠️ Competidor detectado</div>
                      <div className="text-xs text-shell-gray-700">{client.competidor}</div>
                      <div className="text-[10px] text-shell-gray-500">{client.amenaza}</div>
                    </div>
                  )}
                  {/* Forecast info */}
                  {client.forecastActual && (
                    <div className="mt-2 bg-amber-50 rounded-lg p-2 border border-amber-100">
                      <div className="text-[10px] font-bold text-amber-600 mb-1">📊 Forecast actual</div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-amber-600">{client.forecastActual}%</span>
                        <span className="text-xs text-shell-gray-400">vs meta {client.forecastMeta}%</span>
                        <span className="text-xs text-shell-red font-bold">–{client.gap}pts</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Commitments */}
          {detail?.commitments?.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-shell-gray-500 uppercase tracking-wide mb-2">Compromisos</h4>
              <div className="space-y-2">
                {detail.commitments.map((c, i) => {
                  const st = COMMITMENT_STATUS[c.status] || COMMITMENT_STATUS.pendiente;
                  return (
                    <div key={i} className="flex items-start gap-2.5 p-2.5 border border-shell-gray-100 rounded-xl bg-shell-gray-50">
                      <AlertTriangle size={13} className={c.status === 'vencido' ? 'text-shell-red' : 'text-amber-500'} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-shell-gray-700">{c.text}</p>
                        <p className="text-[10px] text-shell-gray-400 mt-0.5">Vencimiento: {c.dueDate}</p>
                      </div>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${st.cls}`}>{st.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Volume history chart */}
          {detail?.volumeHistory && (
            <div>
              <h4 className="text-xs font-bold text-shell-gray-500 uppercase tracking-wide mb-3">
                📈 Histórico 12 meses
              </h4>
              {Object.entries(detail.volumeHistory).map(([clientName, data]) => (
                <div key={clientName}>
                  <p className="text-[11px] font-semibold text-shell-gray-600 mb-2">{clientName}</p>
                  <VolumeChart data={data} clientName={clientName} />
                </div>
              ))}
            </div>
          )}

          {/* Recommendation */}
          {detail?.recommendation && (
            <div className="bg-shell-yellow-light border border-shell-yellow/40 rounded-xl p-4">
              <h4 className="text-xs font-bold text-shell-gray-700 mb-1 flex items-center gap-1.5">
                💡 Acción recomendada
              </h4>
              <p className="text-xs text-shell-gray-700 leading-relaxed">{detail.recommendation}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-shell-gray-100 flex gap-2 justify-end">
          {detail?.clients?.[0]?.opportunityId && (
            <button
              onClick={() => handleGoToOpportunity(detail.clients[0].opportunityId)}
              className="btn-secondary text-xs"
            >
              Ver oportunidad →
            </button>
          )}
          <button onClick={handleResolve} className="btn-secondary text-xs">
            <CheckCircle size={13} />
            Marcar resuelta
          </button>
          <button onClick={onClose} className="btn-primary text-xs">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
