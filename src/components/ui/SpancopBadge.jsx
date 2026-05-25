const stageConfig = {
  Suspect: { cls: 'badge-spancop-suspect', dot: 'bg-shell-gray-400' },
  Prospect: { cls: 'badge-spancop-prospect', dot: 'bg-amber-500' },
  Approach: { cls: 'badge-spancop-approach', dot: 'bg-orange-500' },
  Negotiate: { cls: 'badge-spancop-negotiate', dot: 'bg-blue-500' },
  Close: { cls: 'badge-spancop-close', dot: 'bg-green-500' },
  Order: { cls: 'badge-spancop-order', dot: 'bg-green-600' },
  Payment: { cls: 'badge-spancop-payment', dot: 'bg-emerald-600' },
};

export default function SpancopBadge({ stage, size = 'md' }) {
  const cfg = stageConfig[stage] || stageConfig.Suspect;
  const sizeClass = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-0.5';
  return (
    <span className={`${cfg.cls} ${sizeClass} inline-flex items-center gap-1.5 font-semibold rounded-full`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {stage}
    </span>
  );
}

export { stageConfig };
