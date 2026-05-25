export default function VoiceWave({ active = true }) {
  if (!active) {
    return (
      <div className="flex items-center justify-center gap-1 h-10">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="voice-bar bg-shell-gray-300" style={{ height: 4, width: 4, borderRadius: 2 }} />
        ))}
      </div>
    );
  }

  const barClasses = ['voice-bar-1', 'voice-bar-2', 'voice-bar-3', 'voice-bar-4', 'voice-bar-5', 'voice-bar-6', 'voice-bar-7'];
  const heights = [20, 32, 16, 40, 28, 36, 22];

  return (
    <div className="flex items-center justify-center gap-1 h-10">
      {barClasses.map((cls, i) => (
        <div
          key={i}
          className={`voice-bar ${cls}`}
          style={{ height: heights[i], width: 4 }}
        />
      ))}
    </div>
  );
}
