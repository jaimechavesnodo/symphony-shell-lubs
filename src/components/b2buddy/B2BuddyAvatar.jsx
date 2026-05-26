const BASE = import.meta.env.BASE_URL;

export default function B2BuddyAvatar({ size = 48, animated = false }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {animated && (
        <div
          className="absolute inset-0 rounded-full opacity-25 animate-ping"
          style={{ background: 'radial-gradient(circle, #FBCE07 0%, transparent 70%)', animationDuration: '2s' }}
        />
      )}
      <img
        src={`${BASE}b2buddy-avatar.png`}
        alt="B2Buddy"
        style={{ width: size, height: size, objectFit: 'contain' }}
        className="relative drop-shadow-md"
      />
    </div>
  );
}
