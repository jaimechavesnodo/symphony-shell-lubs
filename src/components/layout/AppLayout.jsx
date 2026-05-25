import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import B2BuddyModal from '../b2buddy/B2BuddyModal';
import B2BuddyFAB from '../b2buddy/B2BuddyButton';
import useAppStore from '../../store/useAppStore';

export default function AppLayout() {
  const b2buddyOpen = useAppStore((s) => s.b2buddyOpen);
  const closeB2Buddy = useAppStore((s) => s.closeB2Buddy);

  return (
    <div className="flex h-screen bg-shell-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          <Outlet />
          {/* Footer */}
          <div className="hidden md:block border-t border-shell-gray-100 bg-white mt-4">
            <p className="text-center text-[11px] text-shell-gray-300 py-3">
              Powered by NODO · Prototipo v1.0 · 2026
            </p>
          </div>
        </main>
      </div>
      <BottomNav />
      <B2BuddyFAB />
      <B2BuddyModal isOpen={b2buddyOpen} onClose={closeB2Buddy} />
    </div>
  );
}
