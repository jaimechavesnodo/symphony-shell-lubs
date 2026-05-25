import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend
} from 'recharts';
import useAppStore from '../../store/useAppStore';
import { forecastData } from '../../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-card-hover border border-shell-gray-100 p-3 text-xs">
      <p className="font-semibold text-shell-gray-700 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-shell-gray-500">{p.name}:</span>
          <span className="font-semibold text-shell-gray-700">{p.value ? `${(p.value / 1000).toFixed(0)}K L` : '–'}</span>
        </div>
      ))}
    </div>
  );
};

export default function ForecastChart() {
  const forecastUpdated = useAppStore((s) => s.forecastUpdated);

  const data = forecastData.map((d, i) => {
    if (forecastUpdated && i === 4) {
      return { ...d, proyeccion: 152000 };
    }
    return d;
  });

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="gradReal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FBCE07" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#FBCE07" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="gradProy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
        <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend formatter={(v) => <span className="text-xs text-shell-gray-500">{v}</span>} />
        <ReferenceLine y={150000} stroke="#DD1D21" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: 'Meta', fontSize: 10, fill: '#DD1D21', position: 'right' }} />
        <Area type="monotone" dataKey="real" name="Real" stroke="#FBCE07" strokeWidth={2.5} fill="url(#gradReal)" dot={false} connectNulls={false} />
        <Area type="monotone" dataKey="proyeccion" name="Proyección" stroke="#3B82F6" strokeWidth={2} fill="url(#gradProy)" strokeDasharray="5 3" dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
