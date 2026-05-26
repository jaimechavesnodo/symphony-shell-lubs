import useAppStore from '../../store/useAppStore';

const BASE = import.meta.env.BASE_URL;

export default function B2BuddyFAB() {
  const { openB2Buddy, b2buddyOpen } = useAppStore();
  if (b2buddyOpen) return null;

  return (
    <button
      onClick={openB2Buddy}
      className="md:hidden fixed bottom-20 right-4 z-50 flex items-center gap-2 bg-shell-yellow text-shell-gray-800 font-bold text-sm pl-1 pr-4 py-1 rounded-full shadow-modal hover:bg-shell-yellow-mid transition-all duration-200 active:scale-95"
    >
      <img src={`${BASE}b2buddy-avatar.png`} alt="B2Buddy" className="w-10 h-10 object-contain drop-shadow-sm" />
      <span>B2Buddy</span>
    </button>
  );
}
