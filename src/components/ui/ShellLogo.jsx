const BASE = import.meta.env.BASE_URL;

export default function ShellLogo({ size = 32 }) {
  return (
    <img
      src={`${BASE}shell-logo.png`}
      alt="Shell"
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: 'contain' }}
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
        src={`${BASE}shell-logo.png`}
        alt="Shell"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  );
}
