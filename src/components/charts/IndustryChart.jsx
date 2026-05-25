import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { industryData } from '../../data/mockData';

const COLORS = ['#FBCE07', '#FFE44D', '#F59E0B', '#FCD34D', '#3B82F6', '#86EFAC', '#FCA5A5'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-card-hover border border-shell-gray-100 p-3 text-xs">
      <p className="font-semibold text-shell-gray-700 mb-1">{label}</p>
      <p className="text-shell-gray-500">Volumen: <span className="font-bold text-shell-gray-800">{(payload[0].value / 1000).toFixed(1)}K L</span></p>
    </div>
  );
};

export default function IndustryChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={industryData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
        <XAxis dataKey="industria" tick={{ fontSize: 10, fill: '#999' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: '#999' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="volumen" radius={[4, 4, 0, 0]} maxBarSize={40}>
          {industryData.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
