// Shell-branded SVG badges for Podio de Campeones gamification
// Flat design, Shell palette: yellow #FBCE07, red #DD1D21, white, grays

const TIER_COLORS = {
  locked:  { main: '#DEDEDE', light: '#F0F0F0', dark: '#BABABA', ring: '#CCCCCC' },
  bronze:  { main: '#CD7F32', light: '#E8A76A', dark: '#9A5E1A', ring: '#CD7F32' },
  silver:  { main: '#9EA3A8', light: '#C8CDD2', dark: '#6A7078', ring: '#9EA3A8' },
  gold:    { main: '#FBCE07', light: '#FFE44D', dark: '#D4A800', ring: '#FBCE07' },
};

// ─── 1. SHIELD + TARGET — Cazador de Negocios ─────────────────────────────────
export function BadgeShield({ tier = 'locked', size = 80 }) {
  const c = TIER_COLORS[tier];
  const glow = tier === 'gold' ? `drop-shadow(0 0 8px ${c.main}99)` : tier !== 'locked' ? `drop-shadow(0 2px 4px ${c.main}55)` : 'none';
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={{ filter: glow }}>
      {/* Shield outer */}
      <path d="M40 5 L67 17 L67 41 C67 58 55 67 40 74 C25 67 13 58 13 41 L13 17 Z" fill={c.dark}/>
      {/* Shield inner */}
      <path d="M40 10 L62 21 L62 41 C62 55 52 63 40 69 C28 63 18 55 18 41 L18 21 Z" fill={c.main}/>
      {/* Shield highlight */}
      <path d="M22 22 L22 43 C22 52 28 59 35 63 L35 16 Z" fill={c.light} opacity="0.25"/>
      {/* Target rings */}
      <circle cx="40" cy="40" r="16" fill="none" stroke="white" strokeWidth="2.5" opacity="0.9"/>
      <circle cx="40" cy="40" r="9"  fill="none" stroke="white" strokeWidth="2.5" opacity="0.9"/>
      <circle cx="40" cy="40" r="3.5" fill="white"/>
      {/* Arrow diagonal */}
      <line x1="56" y1="24" x2="43" y2="37" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <polygon points="56,18 62,26 52,28" fill="white"/>
    </svg>
  );
}

// ─── 2. HEXAGON + RUNNER — Maratonista Comercial ──────────────────────────────
export function BadgeHex({ tier = 'locked', size = 80 }) {
  const c = TIER_COLORS[tier];
  const glow = tier === 'gold' ? `drop-shadow(0 0 8px ${c.main}99)` : tier !== 'locked' ? `drop-shadow(0 2px 4px ${c.main}55)` : 'none';
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={{ filter: glow }}>
      {/* Hexagon outer shadow */}
      <path d="M40 7 L67 23 L67 55 L40 71 L13 55 L13 23 Z" fill={c.dark}/>
      {/* Hexagon main */}
      <path d="M40 10 L64 25 L64 53 L40 68 L16 53 L16 25 Z" fill={c.main}/>
      {/* Hexagon highlight facet */}
      <path d="M16 25 L40 10 L40 68 L16 53 Z" fill={c.light} opacity="0.2"/>
      {/* Running person — dynamic pose */}
      {/* Head */}
      <circle cx="44" cy="23" r="5" fill="white"/>
      {/* Torso */}
      <line x1="44" y1="28" x2="41" y2="42" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      {/* Arms — one forward, one back */}
      <line x1="41" y1="32" x2="32" y2="28" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="41" y1="32" x2="50" y2="36" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Legs — stride */}
      <line x1="41" y1="42" x2="33" y2="55" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      <line x1="41" y1="42" x2="51" y2="52" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      {/* Speed lines */}
      <line x1="22" y1="35" x2="30" y2="35" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      <line x1="20" y1="41" x2="28" y2="41" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

// ─── 3. MEDAL RIBBON + STAR — Abre Puertas / Conector ────────────────────────
export function BadgeMedal({ tier = 'locked', size = 80 }) {
  const c = TIER_COLORS[tier];
  const accentColor = tier === 'locked' ? '#BABABA' : tier === 'gold' ? '#DD1D21' : tier === 'silver' ? '#DD1D21' : '#FBCE07';
  const glow = tier === 'gold' ? `drop-shadow(0 0 8px ${c.main}99)` : tier !== 'locked' ? `drop-shadow(0 2px 4px ${c.main}55)` : 'none';
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={{ filter: glow }}>
      {/* Ribbon left */}
      <path d="M30 6 L38 6 L38 32 L26 46 L22 42 L33 30 Z" fill={accentColor}/>
      {/* Ribbon right */}
      <path d="M42 6 L50 6 L50 30 L58 42 L54 46 L42 32 Z" fill={c.main}/>
      {/* Ribbon knot */}
      <ellipse cx="40" cy="34" rx="7" ry="5" fill={c.dark}/>
      {/* Medal circle outer */}
      <circle cx="40" cy="56" r="20" fill={c.dark}/>
      {/* Medal circle main */}
      <circle cx="40" cy="56" r="17" fill={c.main}/>
      {/* Medal ring */}
      <circle cx="40" cy="56" r="14" fill="none" stroke={c.light} strokeWidth="2" opacity="0.5"/>
      {/* Star */}
      <path d="M40 43 L42.8 51.6 L52 51.6 L44.6 56.8 L47.4 65.4 L40 60.2 L32.6 65.4 L35.4 56.8 L28 51.6 L37.2 51.6 Z" fill="white"/>
    </svg>
  );
}

// ─── 4. TROPHY + OIL DROP — Ejecutor / Superestrella Shell ───────────────────
export function BadgeTrophy({ tier = 'locked', size = 80 }) {
  const c = TIER_COLORS[tier];
  const glow = tier === 'gold' ? `drop-shadow(0 0 10px ${c.main}AA)` : tier !== 'locked' ? `drop-shadow(0 2px 4px ${c.main}55)` : 'none';
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={{ filter: glow }}>
      {/* Cup body shadow */}
      <path d="M23 10 L57 10 L57 40 C57 56 50 62 40 65 C30 62 23 56 23 40 Z" fill={c.dark}/>
      {/* Cup body main */}
      <path d="M25 12 L55 12 L55 40 C55 54 49 60 40 63 C31 60 25 54 25 40 Z" fill={c.main}/>
      {/* Cup highlight */}
      <path d="M29 14 L29 52 C29 52 27 46 27 40 L27 14 Z" fill={c.light} opacity="0.3"/>
      {/* Left handle */}
      <path d="M25 16 Q13 16 13 30 Q13 42 25 40" stroke={c.dark} strokeWidth="7" strokeLinecap="round" fill="none"/>
      <path d="M25 16 Q14 16 14 30 Q14 41 25 40" stroke={c.main} strokeWidth="5" strokeLinecap="round" fill="none"/>
      {/* Right handle */}
      <path d="M55 16 Q67 16 67 30 Q67 42 55 40" stroke={c.dark} strokeWidth="7" strokeLinecap="round" fill="none"/>
      <path d="M55 16 Q66 16 66 30 Q66 41 55 40" stroke={c.main} strokeWidth="5" strokeLinecap="round" fill="none"/>
      {/* Stem */}
      <rect x="35" y="63" width="10" height="7" fill={c.dark}/>
      {/* Base */}
      <rect x="27" y="69" width="26" height="6" rx="3" fill={c.dark}/>
      <rect x="29" y="70" width="22" height="4" rx="2" fill={c.main}/>
      {/* Oil drop inside cup */}
      <path d="M40 24 Q40 24 34 34 Q34 42 40 42 Q46 42 46 34 Q46 24 40 24 Z" fill="white" opacity="0.85"/>
      {/* Drop shine */}
      <ellipse cx="37" cy="31" rx="2" ry="3" fill="white" opacity="0.5" transform="rotate(-15 37 31)"/>
    </svg>
  );
}

// ─── SPECIAL BADGE (rounded square) ──────────────────────────────────────────
export function BadgeSpecial({ icon, earned, size = 44 }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-xl flex items-center justify-center text-xl transition-all duration-300 ${
        earned
          ? 'bg-shell-yellow shadow-md shadow-shell-yellow/30'
          : 'bg-shell-gray-100 grayscale opacity-40'
      }`}
    >
      {icon}
    </div>
  );
}

// Map category keys to SVG components
export const BADGE_SVG = {
  proposals: BadgeShield,
  visits:    BadgeHex,
  contacts:  BadgeMedal,
  volumePct: BadgeTrophy,
};
