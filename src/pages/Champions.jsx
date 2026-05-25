import { Trophy, Zap, CheckSquare, TrendingUp, ShieldCheck, Medal } from 'lucide-react';
import useAppStore from '../store/useAppStore';
import { championsData } from '../data/mockData';

const categoryIcons = {
  updates: Zap, tasks: CheckSquare, spancop: TrendingUp, commitments: ShieldCheck,
};

const podiumColors = ['text-shell-yellow', 'text-shell-gray-400', 'text-amber-600'];
const podiumBgs = ['bg-shell-yellow-light border-shell-yellow', 'bg-shell-gray-50 border-shell-gray-200', 'bg-amber-50 border-amber-100'];
const podiumHeights = ['h-24', 'h-16', 'h-12'];

export default function Champions() {
  const { executives, currentUser } = useAppStore();

  const ranked = championsData.executives
    .map((e) => {
      const exec = executives.find((ex) => ex.id === e.executiveId);
      return { ...e, exec };
    })
    .sort((a, b) => b.total - a.total);

  const top3 = ranked.slice(0, 3);
  const myEntry = ranked.find((r) => r.executiveId === currentUser?.executiveId);
  const myRank = ranked.findIndex((r) => r.executiveId === currentUser?.executiveId) + 1;
  const maxPoints = championsData.categories.reduce((s, c) => s + c.maxPoints, 0);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-shell-gray-800 to-shell-gray-700 rounded-2xl p-6 mb-6 overflow-hidden">
        {/* Racing decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-shell-red" />
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-shell-yellow" />
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-32 h-32 border-4 border-shell-yellow/20 rounded-full" />
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-20 h-20 border-4 border-shell-red/20 rounded-full" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <Trophy size={24} className="text-shell-yellow" />
            <div>
              <h1 className="text-xl font-bold text-white">Podio de Campeones</h1>
              <p className="text-xs text-shell-gray-400">Ranking comercial · Mayo 2025</p>
            </div>
          </div>
          {/* Monthly prize */}
          <div className="bg-shell-yellow/10 border border-shell-yellow/20 rounded-xl p-3 mt-4">
            <div className="flex items-center gap-2">
              <Medal size={16} className="text-shell-yellow" />
              <div>
                <p className="text-xs font-bold text-shell-yellow">{championsData.monthlyPrize.title}</p>
                <p className="text-[10px] text-shell-gray-400">{championsData.monthlyPrize.description}</p>
                <p className="text-xs font-semibold text-white mt-0.5">🏆 {championsData.monthlyPrize.prize}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Podium */}
      <div className="card p-6 mb-5">
        <h2 className="text-sm font-bold text-shell-gray-700 mb-6 text-center">Top 3 del Mes</h2>
        <div className="flex items-end justify-center gap-4 mb-6">
          {[1, 0, 2].map((idx) => {
            const entry = top3[idx];
            if (!entry) return null;
            const rankDisplay = idx + 1;
            const displayOrder = [2, 1, 3];
            const position = displayOrder[idx];
            return (
              <div key={entry.executiveId} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  position === 1 ? 'bg-shell-yellow text-shell-gray-800' : 'bg-shell-gray-200 text-shell-gray-600'
                }`}>
                  {entry.exec?.avatar}
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-shell-gray-800">{entry.exec?.name?.split(' ')[0]}</p>
                  <p className="text-[10px] text-shell-gray-400">{entry.exec?.sector}</p>
                </div>
                <div className={`w-20 rounded-t-xl border-2 flex flex-col items-center justify-start pt-2 ${podiumHeights[position - 1]} ${podiumBgs[position - 1]}`}>
                  <span className={`text-lg font-bold ${podiumColors[position - 1]}`}>{position}°</span>
                  <span className="text-[10px] font-bold text-shell-gray-600">{entry.total} pts</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* My position */}
        {myEntry && (
          <div className="bg-shell-yellow-light border-2 border-shell-yellow rounded-xl p-3 text-center">
            <p className="text-xs text-shell-gray-500 mb-0.5">Tu posición</p>
            <p className="text-2xl font-bold text-shell-gray-800">#{myRank}</p>
            <p className="text-xs font-semibold text-shell-gray-600">{myEntry.total} puntos de {maxPoints} posibles</p>
          </div>
        )}
      </div>

      {/* Categories breakdown */}
      <div className="card p-5 mb-5">
        <h2 className="section-title">Puntos por categoría</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {championsData.categories.map((cat) => {
            const Icon = categoryIcons[cat.key] || Zap;
            const myPoints = myEntry?.[cat.key] || 0;
            return (
              <div key={cat.key} className="bg-shell-gray-50 rounded-xl p-3 text-center">
                <Icon size={18} className="text-shell-gray-500 mx-auto mb-1.5" />
                <p className="text-[10px] text-shell-gray-400 mb-1">{cat.label}</p>
                <p className="text-base font-bold text-shell-gray-800">{myPoints}</p>
                <p className="text-[10px] text-shell-gray-400">de {cat.maxPoints}</p>
                <div className="w-full bg-shell-gray-200 rounded-full h-1 mt-2">
                  <div className="h-1 rounded-full bg-shell-yellow" style={{ width: `${(myPoints / cat.maxPoints) * 100}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full ranking table */}
      <div className="card overflow-hidden">
        <div className="p-5 border-b border-shell-gray-100">
          <h2 className="section-title mb-0">Ranking completo</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-shell-gray-100">
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-shell-gray-400 uppercase">#</th>
              <th className="text-left px-5 py-3 text-[11px] font-semibold text-shell-gray-400 uppercase">Ejecutivo</th>
              <th className="text-right px-5 py-3 text-[11px] font-semibold text-shell-gray-400 uppercase hidden sm:table-cell">Actualizaciones</th>
              <th className="text-right px-5 py-3 text-[11px] font-semibold text-shell-gray-400 uppercase hidden md:table-cell">Tareas</th>
              <th className="text-right px-5 py-3 text-[11px] font-semibold text-shell-gray-400 uppercase hidden lg:table-cell">SPANCOP</th>
              <th className="text-right px-5 py-3 text-[11px] font-semibold text-shell-gray-400 uppercase">Total</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((entry, i) => {
              const isMe = entry.executiveId === currentUser?.executiveId;
              return (
                <tr key={entry.executiveId} className={`border-b border-shell-gray-50 ${isMe ? 'bg-shell-yellow-light' : 'hover:bg-shell-gray-50'}`}>
                  <td className="px-5 py-3">
                    <span className={`text-sm font-bold ${i === 0 ? 'text-shell-yellow-dark' : i === 1 ? 'text-shell-gray-400' : i === 2 ? 'text-amber-600' : 'text-shell-gray-500'}`}>
                      {i < 3 ? ['🥇', '🥈', '🥉'][i] : `#${i + 1}`}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${isMe ? 'bg-shell-yellow text-shell-gray-800' : 'bg-shell-gray-100 text-shell-gray-600'}`}>
                        {entry.exec?.avatar}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-shell-gray-800">{entry.exec?.name}</p>
                        <p className="text-[10px] text-shell-gray-400">{entry.exec?.sector}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right hidden sm:table-cell text-xs text-shell-gray-700 font-medium">{entry.updates}</td>
                  <td className="px-5 py-3 text-right hidden md:table-cell text-xs text-shell-gray-700 font-medium">{entry.tasks}</td>
                  <td className="px-5 py-3 text-right hidden lg:table-cell text-xs text-shell-gray-700 font-medium">{entry.spancop}</td>
                  <td className="px-5 py-3 text-right">
                    <span className={`text-sm font-bold ${isMe ? 'text-shell-yellow-dark' : 'text-shell-gray-800'}`}>{entry.total}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
