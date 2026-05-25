import { TrendingUp, TrendingDown } from 'lucide-react';

export default function KPICard({ label, value, subtitle, trend, trendLabel, icon: Icon, accentColor = 'yellow', onClick }) {
  const accentMap = {
    yellow: 'border-shell-yellow',
    red: 'border-shell-red',
    green: 'border-green-400',
    blue: 'border-blue-400',
    gray: 'border-shell-gray-300',
  };

  const trendPositive = trend && parseFloat(trend) > 0;
  const trendNegative = trend && parseFloat(trend) < 0;

  return (
    <div
      className={`kpi-card border-t-4 ${accentMap[accentColor] || accentMap.yellow} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-shell-gray-400 uppercase tracking-wide">{label}</span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-shell-gray-50 flex items-center justify-center">
            <Icon size={16} className="text-shell-gray-400" />
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-shell-gray-800 mb-1">{value}</div>
      {subtitle && <div className="text-xs text-shell-gray-400 mb-2">{subtitle}</div>}
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-medium ${trendPositive ? 'text-green-600' : trendNegative ? 'text-shell-red' : 'text-shell-gray-400'}`}>
          {trendPositive ? <TrendingUp size={12} /> : trendNegative ? <TrendingDown size={12} /> : null}
          <span>{trend} {trendLabel}</span>
        </div>
      )}
    </div>
  );
}
