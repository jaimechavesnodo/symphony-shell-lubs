import { Trophy, Star, Droplets, FileText, MapPin, Phone, Zap, TrendingUp, DollarSign, Users, ChevronUp, Crown, Award } from 'lucide-react';
import useAppStore from '../store/useAppStore';
import { championsData } from '../data/mockData';

const BASE = import.meta.env.BASE_URL;

const iconMap = {
  'file-text': FileText, 'map-pin': MapPin, 'phone-outgoing': Phone,
  'droplets': Droplets, 'refresh-cw': Zap, 'check-square': Zap, 'trending-up': TrendingUp,
};

const rankColors = {
  1: { bg: 'from-yellow-400 to-amber-500', border: 'border-yellow-400', text: 'text-yellow-400', glow: 'shadow-yellow-400/40', icon: Crown },
  2: { bg: 'from-slate-300 to-slate-400', border: 'border-slate-300', text: 'text-slate-300', glow: 'shadow-slate-300/30', icon: Award },
  3: { bg: 'from-amber-600 to-amber-700', border: 'border-amber-600', text: 'text-amber-600', glow: 'shadow-amber-600/30', icon: Award },
};

const podiumHeights = { 1: 'h-28', 2: 'h-20', 3: 'h-14', 4: 'h-10', 5: 'h-8' };

// Incentive calculation
function calcIncentive(entry) {
  const { incentiveRates } = championsData;
  const proposals = entry.proposals * incentiveRates.proposals.rate;
  const visits = entry.visits * incentiveRates.visits.rate;
  const contacts = entry.contacts * incentiveRates.contacts.rate;
  const volume = (entry.volumePct / 100) * incentiveRates.volumeBase.rate;
  return { proposals, visits, contacts, volume, total: proposals + visits + contacts + volume };
}

function ExecCard({ entry, rank, exec, isMe, compact = false }) {
  const rc = rankColors[rank] || { bg: 'from-shell-gray-300 to-shell-gray-400', border: 'border-shell-gray-300', text: 'text-shell-gray-400', glow: '' };
  const RankIcon = rc.icon || Star;
  const maxTotal = championsData.executives[0]?.total || 1;
  const pct = Math.round((entry.total / maxTotal) * 100);

  return (
    <div className={`relative rounded-2xl border-2 ${rc.border} bg-white overflow-hidden transition-all duration-300 ${isMe ? 'ring-2 ring-shell-yellow shadow-lg' : 'shadow-card'}`}>
      {/* Rank gradient top strip */}
      <div className={`h-1.5 bg-gradient-to-r ${rc.bg}`} />

      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${rc.bg} flex items-center justify-center text-white font-bold text-sm shadow-lg ${rc.glow} shadow-lg`}>
              {exec?.avatar}
            </div>
            {rank <= 3 && (
              <div className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-br ${rc.bg} flex items-center justify-center shadow`}>
                <span className="text-[9px] font-black text-white">{rank}</span>
              </div>
            )}
          </div>

          {/* Name + sector */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-bold text-shell-gray-800 truncate">{exec?.name?.split(' ')[0]}</p>
              {isMe && <span className="text-[9px] bg-shell-yellow text-shell-gray-800 px-1.5 py-0.5 rounded-full font-bold shrink-0">TÚ</span>}
            </div>
            <p className="text-[10px] text-shell-gray-400">{exec?.sector}</p>
          </div>

          {/* Points */}
          <div className="text-right shrink-0">
            <div className={`text-xl font-black ${rc.text}`}>{entry.total.toLocaleString()}</div>
            <div className="text-[9px] text-shell-gray-400 font-medium">puntos XP</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <div className="w-full bg-shell-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full bg-gradient-to-r ${rc.bg} transition-all duration-700`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-shell-gray-400 mt-0.5">
            <span>{pct}% del líder</span>
            <span>#{rank}</span>
          </div>
        </div>

        {/* Category mini bars */}
        {!compact && (
          <div className="grid grid-cols-4 gap-1 mt-3">
            {[
              { label: 'Prop.', pts: entry.proposalsPts, max: 400, color: '#FBCE07' },
              { label: 'Vis.',  pts: entry.visitsPts,    max: 350, color: '#3B82F6' },
              { label: 'Cont.', pts: entry.contactsPts,  max: 300, color: '#10B981' },
              { label: 'Vol.',  pts: entry.volumePts,    max: 400, color: '#DD1D21' },
            ].map(cat => (
              <div key={cat.label} className="text-center">
                <div className="w-full bg-shell-gray-100 rounded-full h-1.5 overflow-hidden mb-0.5">
                  <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${Math.round(cat.pts / cat.max * 100)}%`, background: cat.color }} />
                </div>
                <span className="text-[9px] text-shell-gray-400">{cat.label}</span>
                <div className="text-[9px] font-bold text-shell-gray-600">{cat.pts}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── BADGE DEFINITIONS ────────────────────────────────────────────────────────
const GOALS = { proposals: 12, visits: 10, contacts: 20, volumePct: 100 };

const badgeDefs = [
  {
    key: 'proposals', icon: '🎯',
    tiers: [
      { name: 'Cazador de Negocios',   min: 5,  color: '#CD7F32', glow: 'shadow-amber-700/40', desc: '5+ propuestas' },
      { name: 'Cazador Élite',          min: 10, color: '#C0C0C0', glow: 'shadow-slate-300/40', desc: '10+ propuestas' },
      { name: 'Depredador Comercial',   min: 15, color: '#FFD700', glow: 'shadow-yellow-400/40', desc: '15+ propuestas' },
    ],
  },
  {
    key: 'visits', icon: '🏃',
    tiers: [
      { name: 'Maratonista Comercial',  min: 4,  color: '#CD7F32', glow: 'shadow-amber-700/40', desc: '4+ visitas' },
      { name: 'Ultra Maratonista',      min: 8,  color: '#C0C0C0', glow: 'shadow-slate-300/40', desc: '8+ visitas' },
      { name: 'Leyenda del Campo',      min: 12, color: '#FFD700', glow: 'shadow-yellow-400/40', desc: '12+ visitas' },
    ],
  },
  {
    key: 'contacts', icon: '📡',
    tiers: [
      { name: 'Abre Puertas',           min: 8,  color: '#CD7F32', glow: 'shadow-amber-700/40', desc: '8+ contactos' },
      { name: 'Conector Experto',       min: 14, color: '#C0C0C0', glow: 'shadow-slate-300/40', desc: '14+ contactos' },
      { name: 'Master Networker',       min: 20, color: '#FFD700', glow: 'shadow-yellow-400/40', desc: '20+ contactos' },
    ],
  },
  {
    key: 'volumePct', icon: '💧',
    tiers: [
      { name: 'Ejecutor',              min: 70,  color: '#CD7F32', glow: 'shadow-amber-700/40', desc: '70%+ de meta' },
      { name: 'Meta Hunter',           min: 85,  color: '#C0C0C0', glow: 'shadow-slate-300/40', desc: '85%+ de meta' },
      { name: 'Superestrella Shell',   min: 100, color: '#FFD700', glow: 'shadow-yellow-400/40', desc: '100% de meta' },
    ],
  },
];

function BadgesSection({ entry }) {
  return (
    <div className="card p-5">
      <h2 className="text-sm font-bold text-shell-gray-700 mb-4 flex items-center gap-2">
        🎖️ Mis insignias
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badgeDefs.map(def => {
          const val = entry[def.key] || 0;
          const earnedTier = [...def.tiers].reverse().find(t => val >= t.min);
          const nextTier = def.tiers.find(t => val < t.min);

          return (
            <div key={def.key} className="flex flex-col items-center gap-2">
              {/* Badge circle */}
              <div
                className={`w-20 h-20 rounded-full flex flex-col items-center justify-center relative transition-all duration-300 ${
                  earnedTier
                    ? `shadow-lg shadow-lg`
                    : 'bg-shell-gray-100 border-2 border-dashed border-shell-gray-200'
                }`}
                style={earnedTier ? {
                  background: `radial-gradient(circle at 35% 35%, white 0%, ${earnedTier.color}33 30%, ${earnedTier.color}66 100%)`,
                  border: `3px solid ${earnedTier.color}`,
                  boxShadow: `0 0 20px ${earnedTier.color}44`,
                } : {}}
              >
                <span className={`text-3xl ${!earnedTier ? 'grayscale opacity-30' : ''}`}>{def.icon}</span>
                {earnedTier && (
                  <span className="text-[9px] font-black mt-0.5" style={{ color: earnedTier.color }}>
                    {earnedTier.color === '#FFD700' ? '★ GOLD' : earnedTier.color === '#C0C0C0' ? '◆ PLATA' : '● BRONCE'}
                  </span>
                )}
                {/* Shine effect for gold */}
                {earnedTier?.color === '#FFD700' && (
                  <div className="absolute top-1 right-2 text-xs">✨</div>
                )}
              </div>

              {/* Badge name */}
              <div className="text-center">
                {earnedTier ? (
                  <>
                    <p className="text-xs font-bold text-shell-gray-800 leading-tight">{earnedTier.name}</p>
                    <p className="text-[10px] text-shell-gray-400 mt-0.5">{earnedTier.desc}</p>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-semibold text-shell-gray-400 leading-tight">{def.tiers[0].name}</p>
                    <p className="text-[10px] text-shell-gray-300">{def.tiers[0].desc}</p>
                  </>
                )}
                {/* Next tier hint */}
                {nextTier && earnedTier && (
                  <p className="text-[9px] text-shell-yellow-dark font-semibold mt-0.5">
                    Próximo: {nextTier.name} ({nextTier.min - val} más)
                  </p>
                )}
                {nextTier && !earnedTier && (
                  <p className="text-[9px] text-shell-gray-400 mt-0.5">
                    Faltan {nextTier.min - val}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Special badges */}
      <div className="mt-5 pt-4 border-t border-shell-gray-100">
        <p className="text-[10px] font-bold text-shell-gray-400 uppercase tracking-wide mb-3">Logros especiales</p>
        <div className="flex flex-wrap gap-2">
          {[
            { icon: '🌟', name: 'Top 5', desc: 'En el ranking', earned: true },
            { icon: '📈', name: 'Crecimiento', desc: '+15% vs mes ant.', earned: true },
            { icon: '🤝', name: 'Negociador', desc: '3+ ops en Negotiate', earned: entry.volumePct >= 80 },
            { icon: '🏆', name: 'Campeón', desc: 'Posición #1', earned: false },
            { icon: '💎', name: 'Diamante', desc: '1.500+ XP', earned: entry.total >= 1500 },
          ].map(badge => (
            <div
              key={badge.name}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                badge.earned
                  ? 'bg-shell-yellow-light border-shell-yellow text-shell-gray-800'
                  : 'bg-shell-gray-50 border-shell-gray-100 opacity-40'
              }`}
            >
              <span className={badge.earned ? '' : 'grayscale'}>{badge.icon}</span>
              <div>
                <p className="text-[11px] font-bold leading-none">{badge.name}</p>
                <p className="text-[9px] text-shell-gray-500">{badge.desc}</p>
              </div>
              {badge.earned && <span className="text-[10px] text-shell-yellow-dark">✓</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── EXECUTIVE VIEW ────────────────────────────────────────────────────────────
function ExecutiveView({ currentUser, executives }) {
  const ranked = championsData.executives
    .map(e => ({ ...e, exec: executives.find(ex => ex.id === e.executiveId) }))
    .sort((a, b) => b.total - a.total);

  const myEntry = ranked.find(r => r.executiveId === currentUser?.executiveId);
  const myRank = ranked.findIndex(r => r.executiveId === currentUser?.executiveId) + 1;

  const top3Order = [ranked[1], ranked[0], ranked[2]].filter(Boolean);

  const cats = myEntry ? [
    { label: 'Propuestas enviadas',  val: myEntry.proposals, goal: GOALS.proposals, pts: myEntry.proposalsPts, maxPts: 400, unit: 'propuestas', color: '#FBCE07' },
    { label: 'Visitas reportadas',   val: myEntry.visits,    goal: GOALS.visits,    pts: myEntry.visitsPts,    maxPts: 350, unit: 'visitas',    color: '#3B82F6' },
    { label: 'Primeros contactos',   val: myEntry.contacts,  goal: GOALS.contacts,  pts: myEntry.contactsPts,  maxPts: 300, unit: 'contactos',  color: '#10B981' },
    { label: 'Cumplimiento volumen', val: myEntry.volumePct, goal: GOALS.volumePct, pts: myEntry.volumePts,    maxPts: 400, unit: '%', color: '#DD1D21',
      extra: `${(myEntry.volumeL/1000).toFixed(1)}K L en cierre` },
  ] : [];

  return (
    <div className="space-y-6">
      {/* Hero */}
      {myEntry && (
        <div className="relative overflow-hidden rounded-2xl"
          style={{ background: 'linear-gradient(135deg, #1a1200 0%, #3d2d00 40%, #7a5800 70%, #FBCE07 100%)' }}>
          <div className="absolute inset-0 opacity-8">
            <div className="absolute top-2 right-6 text-[160px] font-black text-white/10 leading-none select-none">#{myRank}</div>
          </div>
          <div className="relative p-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-shell-yellow flex items-center justify-center text-shell-gray-800 font-black text-xl shadow-lg shrink-0 border-4 border-white/30">
              {myEntry.exec?.avatar}
            </div>
            <div>
              <div className="text-[10px] text-white/60 uppercase tracking-widest font-semibold mb-0.5">Tu posición este mes</div>
              <div className="text-3xl font-black text-shell-yellow">#{myRank} <span className="text-base font-semibold text-white/70">de {ranked.length}</span></div>
              <div className="text-sm text-white/80 mt-0.5">{myEntry.exec?.name} · {myEntry.exec?.sector}</div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-4xl font-black text-white">{myEntry.total.toLocaleString()}</div>
              <div className="text-xs text-white/60">puntos XP</div>
              <div className="text-xs text-shell-yellow font-bold mt-1">
                {myRank === 1 ? '🏆 Líder del mes' : `+${ranked[0].total - myEntry.total} pts para el 1°`}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Podium top 3 */}
      <div className="card p-5">
        <h2 className="text-sm font-bold text-shell-gray-700 text-center mb-5">🏆 Top 3 del Mes</h2>
        <div className="flex items-end justify-center gap-3">
          {top3Order.map((entry, idx) => {
            const visualRank = [2, 1, 3][idx];
            const rc = rankColors[visualRank];
            const isMe = entry.executiveId === currentUser?.executiveId;
            return (
              <div key={entry.executiveId} className="flex flex-col items-center gap-1.5 w-24">
                {visualRank === 1 && <span className="text-lg">👑</span>}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${rc.bg} flex items-center justify-center text-white font-black text-sm shadow-lg border-2 ${rc.border} ${isMe ? 'ring-2 ring-shell-yellow ring-offset-1' : ''}`}>
                  {entry.exec?.avatar}
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-bold text-shell-gray-800">{entry.exec?.name?.split(' ')[0]}{isMe ? ' (tú)' : ''}</p>
                  <p className="text-[9px] text-shell-gray-400">{entry.total.toLocaleString()} pts</p>
                </div>
                <div className={`w-full rounded-t-lg border-2 ${rc.border} flex items-center justify-center ${podiumHeights[visualRank]}`}
                  style={{ background: `linear-gradient(to bottom, ${visualRank === 1 ? 'rgba(251,206,7,0.18)' : visualRank === 2 ? 'rgba(148,163,184,0.12)' : 'rgba(180,120,30,0.12)'}, transparent)` }}>
                  <span className={`text-lg font-black ${rc.text}`}>{visualRank}°</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      {myEntry && <BadgesSection entry={myEntry} />}

      {/* My category breakdown with goals */}
      {myEntry && (
        <div className="card p-5">
          <h2 className="text-sm font-bold text-shell-gray-700 mb-5">📊 Mis puntos por categoría</h2>
          <div className="space-y-5">
            {cats.map(cat => {
              const pct = Math.min(100, Math.round((cat.val / cat.goal) * 100));
              return (
                <div key={cat.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <span className="text-xs font-semibold text-shell-gray-700">{cat.label}</span>
                      {cat.extra && <span className="ml-2 text-[10px] text-shell-gray-400">{cat.extra}</span>}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold text-shell-gray-700">
                        {cat.unit === '%' ? `${cat.val}%` : cat.val} <span className="text-shell-gray-400 font-normal">de</span> {cat.unit === '%' ? `${cat.goal}%` : `${cat.goal} ${cat.unit}`}
                      </span>
                      <span className="text-xs font-black" style={{ color: cat.color }}>{cat.pts} pts</span>
                    </div>
                  </div>
                  {/* Double bar: goal track + actual */}
                  <div className="relative">
                    <div className="w-full bg-shell-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-3 rounded-full transition-all duration-700 relative"
                        style={{ width: `${pct}%`, background: cat.color }}
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-full" />
                      </div>
                    </div>
                    <div className="flex justify-between text-[9px] text-shell-gray-400 mt-0.5">
                      <span>{pct}% de la meta</span>
                      <span style={{ color: pct >= 100 ? '#16a34a' : pct >= 75 ? cat.color : '#999' }}>
                        {pct >= 100 ? '✓ Meta alcanzada' : `Faltan ${cat.unit === '%' ? `${cat.goal - cat.val}%` : `${cat.goal - cat.val} ${cat.unit}`}`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-shell-gray-100">
            <div>
              <span className="text-sm font-bold text-shell-gray-700">Total XP</span>
              <p className="text-[10px] text-shell-gray-400">Máximo posible: {400+350+300+400} pts</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-shell-yellow-dark">{myEntry.total.toLocaleString()}</span>
              <p className="text-[10px] text-shell-gray-400">{Math.round(myEntry.total/14.5)}% del máximo</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ADMIN VIEW ───────────────────────────────────────────────────────────────
function AdminView({ executives }) {
  const ranked = championsData.executives
    .map(e => ({ ...e, exec: executives.find(ex => ex.id === e.executiveId), incentive: calcIncentive(e) }))
    .sort((a, b) => b.total - a.total);

  const totalPool = ranked.reduce((s, r) => s + r.incentive.total, 0);

  return (
    <div className="space-y-6">
      {/* Header stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4 text-center border-t-4 border-shell-yellow">
          <div className="text-2xl font-black text-shell-gray-800">${totalPool.toLocaleString()}</div>
          <div className="text-xs text-shell-gray-400 mt-0.5">Pool total de incentivos</div>
        </div>
        <div className="card p-4 text-center border-t-4 border-green-400">
          <div className="text-2xl font-black text-green-600">{ranked.length}</div>
          <div className="text-xs text-shell-gray-400 mt-0.5">Ejecutivos activos</div>
        </div>
        <div className="card p-4 text-center border-t-4 border-blue-400">
          <div className="text-2xl font-black text-blue-600">
            {(ranked.reduce((s,r) => s + r.volumeL, 0) / 1000).toFixed(1)}K L
          </div>
          <div className="text-xs text-shell-gray-400 mt-0.5">Volumen en etapas Close/Order</div>
        </div>
      </div>

      {/* Leaderboard with incentives */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-shell-gray-100 bg-shell-gray-50 flex items-center justify-between">
          <h2 className="text-sm font-bold text-shell-gray-800 flex items-center gap-2">
            <Users size={15} className="text-shell-gray-400" /> Ranking del equipo + Liquidación incentivos
          </h2>
          <span className="text-[10px] text-shell-gray-400">Mayo 2026</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-shell-gray-100">
                <th className="text-left px-4 py-3 text-[10px] font-bold text-shell-gray-400 uppercase">#</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold text-shell-gray-400 uppercase">Ejecutivo</th>
                <th className="text-right px-3 py-3 text-[10px] font-bold text-shell-gray-400 uppercase">XP Total</th>
                <th className="text-right px-3 py-3 text-[10px] font-bold text-shell-gray-400 uppercase hidden lg:table-cell" style={{color:'#FBCE07'}}>Propuestas</th>
                <th className="text-right px-3 py-3 text-[10px] font-bold hidden lg:table-cell" style={{color:'#3B82F6'}}>Visitas</th>
                <th className="text-right px-3 py-3 text-[10px] font-bold hidden lg:table-cell" style={{color:'#10B981'}}>Contactos</th>
                <th className="text-right px-3 py-3 text-[10px] font-bold hidden lg:table-cell" style={{color:'#DD1D21'}}>Volumen</th>
                <th className="text-right px-4 py-3 text-[10px] font-bold text-shell-gray-400 uppercase">Litros close</th>
                <th className="text-right px-4 py-3 text-[10px] font-bold text-green-600 uppercase">Incentivo USD</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((entry, i) => {
                const rc = rankColors[i + 1] || {};
                return (
                  <tr key={entry.executiveId} className="border-b border-shell-gray-50 hover:bg-shell-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        {i < 3 ? (
                          <span className={`text-base font-black ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-slate-400' : 'text-amber-600'}`}>
                            {['🥇','🥈','🥉'][i]}
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-shell-gray-400">#{i+1}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-shell-gray-800 shadow-sm ${i === 0 ? 'bg-shell-yellow' : 'bg-shell-gray-100'}`}>
                          {entry.exec?.avatar}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-shell-gray-800">{entry.exec?.name}</p>
                          <p className="text-[10px] text-shell-gray-400">{entry.exec?.sector}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span className={`text-sm font-black ${i === 0 ? 'text-shell-yellow-dark' : 'text-shell-gray-800'}`}>{entry.total.toLocaleString()}</span>
                    </td>
                    <td className="px-3 py-3 text-right hidden lg:table-cell">
                      <div className="text-xs font-semibold text-shell-gray-700">{entry.proposalsPts}</div>
                      <div className="text-[9px] text-shell-gray-400">{entry.proposals} prop.</div>
                    </td>
                    <td className="px-3 py-3 text-right hidden lg:table-cell">
                      <div className="text-xs font-semibold text-shell-gray-700">{entry.visitsPts}</div>
                      <div className="text-[9px] text-shell-gray-400">{entry.visits} vis.</div>
                    </td>
                    <td className="px-3 py-3 text-right hidden lg:table-cell">
                      <div className="text-xs font-semibold text-shell-gray-700">{entry.contactsPts}</div>
                      <div className="text-[9px] text-shell-gray-400">{entry.contacts} cont.</div>
                    </td>
                    <td className="px-3 py-3 text-right hidden lg:table-cell">
                      <div className="text-xs font-semibold text-shell-gray-700">{entry.volumePts}</div>
                      <div className="text-[9px] text-shell-gray-400">{entry.volumePct}%</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-xs font-semibold text-shell-gray-700">{(entry.volumeL/1000).toFixed(1)}K L</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className={`text-sm font-black ${i === 0 ? 'text-green-600' : 'text-shell-gray-800'}`}>
                        ${entry.incentive.total.toLocaleString()}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-shell-yellow bg-shell-yellow-light">
                <td colSpan={8} className="px-4 py-3 text-sm font-bold text-shell-gray-800">Total a liquidar</td>
                <td className="px-4 py-3 text-right text-lg font-black text-green-700">${totalPool.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Incentive breakdown */}
      <div className="card p-5">
        <h2 className="text-sm font-bold text-shell-gray-700 mb-4 flex items-center gap-2">
          <DollarSign size={15} className="text-green-500" /> Liquidación detallada por ejecutivo
        </h2>
        <div className="space-y-4">
          {ranked.map((entry, i) => (
            <div key={entry.executiveId} className={`rounded-xl p-4 border ${i === 0 ? 'border-shell-yellow bg-shell-yellow-light' : 'border-shell-gray-100 bg-shell-gray-50'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-shell-gray-800 ${i === 0 ? 'bg-shell-yellow' : 'bg-shell-gray-200'}`}>
                    {entry.exec?.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-shell-gray-800">{entry.exec?.name}</p>
                    <p className="text-[10px] text-shell-gray-400">#{i+1} · {entry.total.toLocaleString()} pts XP</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-green-700">${entry.incentive.total.toLocaleString()}</div>
                  <div className="text-[10px] text-shell-gray-400">incentivo total</div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Propuestas', val: entry.incentive.proposals, detail: `${entry.proposals} × $25`, color: '#FBCE07' },
                  { label: 'Visitas',    val: entry.incentive.visits,    detail: `${entry.visits} × $40`,    color: '#3B82F6' },
                  { label: 'Contactos', val: entry.incentive.contacts,  detail: `${entry.contacts} × $15`,  color: '#10B981' },
                  { label: 'Volumen',   val: Math.round(entry.incentive.volume), detail: `${entry.volumePct}% × $2k`,  color: '#DD1D21' },
                ].map(c => (
                  <div key={c.label} className="text-center bg-white rounded-lg p-2 border border-shell-gray-100">
                    <div className="text-xs font-bold text-shell-gray-700" style={{ color: c.color }}>${c.val.toLocaleString()}</div>
                    <div className="text-[9px] text-shell-gray-500 font-medium">{c.label}</div>
                    <div className="text-[9px] text-shell-gray-400">{c.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Champions() {
  const { executives, currentUser } = useAppStore();
  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="page-container">
      {/* Header — Shell yellow gradient, no black */}
      <div className="relative overflow-hidden rounded-2xl mb-6"
        style={{ background: 'linear-gradient(135deg, #FFF9D6 0%, #FFE44D 35%, #FBCE07 65%, #D4A800 100%)' }}>
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/20" />
        <div className="absolute -right-2 -bottom-4 w-24 h-24 rounded-full bg-shell-red/10" />
        <div className="absolute left-1/2 -bottom-6 w-32 h-32 rounded-full bg-white/10" />

        <div className="relative px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center shadow-sm">
              <Trophy size={24} className="text-shell-gray-800" />
            </div>
            <div>
              <h1 className="text-xl font-black text-shell-gray-800">Podio de Campeones</h1>
              <p className="text-xs text-shell-gray-600 font-medium">Ranking comercial · Mayo 2026</p>
            </div>
          </div>

          {/* Prize highlight */}
          <div className="hidden md:flex items-center gap-3 bg-white/40 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/50">
            <span className="text-2xl">🏆</span>
            <div>
              <p className="text-[10px] font-bold text-shell-gray-700 uppercase tracking-wide">Premio del mes</p>
              <p className="text-xs font-bold text-shell-gray-800">{championsData.monthlyPrize.prize}</p>
              <p className="text-[10px] text-shell-gray-600">{championsData.monthlyPrize.description}</p>
            </div>
          </div>
        </div>
      </div>

      {isAdmin ? (
        <AdminView executives={executives} />
      ) : (
        <ExecutiveView currentUser={currentUser} executives={executives} />
      )}
    </div>
  );
}
