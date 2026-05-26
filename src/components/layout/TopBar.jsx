import { Search, Bell, ChevronDown, Mic } from 'lucide-react';
import { useState } from 'react';
import useAppStore from '../../store/useAppStore';
const BASE = import.meta.env.BASE_URL;

export default function TopBar() {
  const { currentUser, notificationCount, openB2Buddy } = useAppStore();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="bg-white border-b border-shell-gray-100 sticky top-0 z-30 h-14 flex items-center px-4 md:px-6 gap-4">
      {/* Mobile logo */}
      <div className="flex md:hidden items-center gap-2 mr-2">
        <img src={`${BASE}shell-logo.png`} alt="Shell" className="w-7 h-7 object-contain" />
        <span className="font-bold text-shell-gray-800 text-base">Symphony</span>
      </div>

      {/* Search */}
      <div className={`flex-1 max-w-md relative ${searchFocused ? 'ring-2 ring-shell-yellow rounded-lg' : ''}`}>
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-shell-gray-400" />
        <input
          type="text"
          placeholder="Buscar oportunidades, clientes..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-shell-gray-50 rounded-lg border border-shell-gray-200 text-shell-gray-700 placeholder:text-shell-gray-400 focus:outline-none focus:bg-white transition-colors"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-shell-gray-400 bg-shell-gray-100 px-1.5 py-0.5 rounded font-mono hidden sm:block">⌘K</kbd>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* B2Buddy mobile button */}
        <button
          onClick={openB2Buddy}
          className="md:hidden bg-shell-yellow text-shell-gray-800 rounded-full p-2 hover:bg-shell-yellow-mid transition-colors"
        >
          <Mic size={16} />
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-lg hover:bg-shell-gray-50 flex items-center justify-center text-shell-gray-500 transition-colors">
          <Bell size={18} />
          {notificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-shell-red rounded-full" />
          )}
        </button>

        {/* User */}
        {currentUser && (
          <button className="flex items-center gap-2 hover:bg-shell-gray-50 rounded-lg px-2 py-1.5 transition-colors">
            <div className="w-7 h-7 rounded-full bg-shell-yellow flex items-center justify-center text-shell-gray-800 font-bold text-xs shrink-0">
              {currentUser.avatar}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-shell-gray-700 leading-none">{currentUser.name}</div>
              <div className="text-[10px] text-shell-gray-400 mt-0.5">{currentUser.title}</div>
            </div>
            <ChevronDown size={14} className="text-shell-gray-400 hidden sm:block" />
          </button>
        )}
      </div>
    </header>
  );
}
