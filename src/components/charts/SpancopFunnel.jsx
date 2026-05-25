import useAppStore from '../../store/useAppStore';

const stages = [
  { key: 'Suspect', color: '#E5E7EB', textColor: '#6B7280', width: '100%' },
  { key: 'Prospect', color: '#FEF9C3', textColor: '#B45309', width: '86%' },
  { key: 'Approach', color: '#FED7AA', textColor: '#C2410C', width: '72%' },
  { key: 'Negotiate', color: '#DBEAFE', textColor: '#1D4ED8', width: '58%' },
  { key: 'Close', color: '#D1FAE5', textColor: '#065F46', width: '44%' },
  { key: 'Order', color: '#A7F3D0', textColor: '#047857', width: '32%' },
  { key: 'Payment', color: '#6EE7B7', textColor: '#065F46', width: '22%' },
];

export default function SpancopFunnel({ compact = false }) {
  const opportunities = useAppStore((s) => s.opportunities);

  const counts = stages.reduce((acc, { key }) => {
    acc[key] = opportunities.filter((o) => o.stage === key);
    return acc;
  }, {});

  const totalVolume = (stage) =>
    counts[stage]?.reduce((s, o) => s + (o.volumeL || 0), 0) || 0;

  return (
    <div className="space-y-1.5">
      {stages.map(({ key, color, textColor, width }) => {
        const count = counts[key]?.length || 0;
        const vol = totalVolume(key);
        return (
          <div key={key} className="flex items-center gap-2">
            <div className="w-16 text-right text-[10px] font-medium text-shell-gray-400 shrink-0">{key}</div>
            <div className="flex-1 relative">
              <div
                className="h-7 rounded-md flex items-center justify-between px-2.5 transition-all duration-500"
                style={{ width, background: color, marginLeft: `calc((100% - ${width}) / 2)` }}
              >
                <span className="text-[11px] font-bold" style={{ color: textColor }}>{count}</span>
                {!compact && (
                  <span className="text-[10px] font-medium" style={{ color: textColor }}>
                    {vol > 0 ? `${(vol / 1000).toFixed(0)}K L` : ''}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
