export default function EnergyLines({ position = 'bottom-right', opacity = 0.15 }) {
  const posMap = {
    'bottom-right': 'bottom-0 right-0',
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
  };

  return (
    <div className={`absolute ${posMap[position]} pointer-events-none overflow-hidden`} style={{ opacity }}>
      <svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M280 200 Q200 120 80 160 Q20 180 -20 140" stroke="#FBCE07" strokeWidth="2.5" fill="none" />
        <path d="M280 170 Q210 100 100 130 Q40 150 0 110" stroke="#FBCE07" strokeWidth="2" fill="none" />
        <path d="M280 140 Q220 80 120 100 Q60 115 20 80" stroke="#FBCE07" strokeWidth="1.5" fill="none" />
        <path d="M280 110 Q230 60 140 72 Q80 80 40 50" stroke="#FBCE07" strokeWidth="1" fill="none" />
        <circle cx="260" cy="190" r="3" fill="#FBCE07" />
        <circle cx="240" cy="175" r="2" fill="#FBCE07" />
        <circle cx="255" cy="165" r="1.5" fill="#FBCE07" />
      </svg>
    </div>
  );
}
