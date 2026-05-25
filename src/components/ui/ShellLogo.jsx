// Uses /public/shell-logo.png when available, falls back to inline SVG
function FallbackSVG({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#FBCE07" />
      <g transform="translate(50,50)" fill="#DD1D21">
        <path d="M0,-32 C-8,-28 -18,-20 -22,-8 C-26,4 -24,16 -18,24 C-10,32 0,36 0,36 C0,36 10,32 18,24 C24,16 26,4 22,-8 C18,-20 8,-28 0,-32Z" />
        <path d="M-12,-24 C-20,-16 -26,-4 -24,8" stroke="#FBCE07" strokeWidth="2" fill="none" />
        <path d="M12,-24 C20,-16 26,-4 24,8" stroke="#FBCE07" strokeWidth="2" fill="none" />
        <path d="M0,-32 L0,-20" stroke="#FBCE07" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

export default function ShellLogo({ size = 32 }) {
  return (
    <img
      src="/shell-logo.png"
      alt="Shell"
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: 'contain' }}
      onError={(e) => {
        e.target.style.display = 'none';
        const parent = e.target.parentNode;
        const fallback = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        fallback.setAttribute('width', size);
        fallback.setAttribute('height', size);
        fallback.setAttribute('viewBox', '0 0 100 100');
        fallback.innerHTML = `<circle cx="50" cy="50" r="50" fill="#FBCE07"/><g transform="translate(50,50)" fill="#DD1D21"><path d="M0,-32 C-8,-28 -18,-20 -22,-8 C-26,4 -24,16 -18,24 C-10,32 0,36 0,36 C0,36 10,32 18,24 C24,16 26,4 22,-8 C18,-20 8,-28 0,-32Z"/></g>`;
        parent.appendChild(fallback);
      }}
    />
  );
}

export function ShellLogoInline({ size = 28, className = '' }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full overflow-hidden bg-shell-yellow ${className}`}
      style={{ width: size, height: size, minWidth: size }}
    >
      <img
        src="/shell-logo.png"
        alt="Shell"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        onError={(e) => {
          // Fallback: render inline SVG by replacing the img
          const parent = e.target.parentNode;
          e.target.remove();
          parent.innerHTML = `<svg width="${size * 0.65}" height="${size * 0.65}" viewBox="0 0 60 65" fill="#DD1D21" xmlns="http://www.w3.org/2000/svg"><path d="M30 0 C18 6 8 16 4 28 C0 40 4 52 12 60 C18 66 24 68 30 68 C36 68 42 66 48 60 C56 52 60 40 56 28 C52 16 42 6 30 0Z"/><path d="M10 20 C6 28 6 38 10 46" stroke="#FBCE07" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M50 20 C54 28 54 38 50 46" stroke="#FBCE07" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M30 0 L30 14" stroke="#FBCE07" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
        }}
      />
    </div>
  );
}
