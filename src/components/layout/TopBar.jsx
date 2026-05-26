import { Search, Bell, ChevronDown, Mic, Building2, Target, BookOpen, AlertTriangle, User, X } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../../store/useAppStore';
import { poweringUModules } from '../../data/mockData';

const BASE = import.meta.env.BASE_URL;

// Result type config
const TYPE_CONFIG = {
  company:     { label: 'Empresa',       icon: Building2,    color: 'text-blue-500',   bg: 'bg-blue-50' },
  opportunity: { label: 'Oportunidad',   icon: Target,       color: 'text-shell-yellow-dark', bg: 'bg-shell-yellow-light' },
  course:      { label: 'Curso',         icon: BookOpen,     color: 'text-green-600',  bg: 'bg-green-50' },
  alert:       { label: 'Alerta',        icon: AlertTriangle,color: 'text-shell-red',  bg: 'bg-red-50' },
  executive:   { label: 'Ejecutivo',     icon: User,         color: 'text-purple-600', bg: 'bg-purple-50' },
};

function buildSearchIndex(store, isAdmin) {
  const { opportunities, companies, contacts, executives, alerts } = store;
  const items = [];

  // Companies
  companies.forEach(c => {
    items.push({
      id: `co-${c.id}`, type: 'company',
      title: c.name,
      subtitle: `${c.industry} · ${c.region}`,
      route: `/opportunities?company=${c.id}`,
      tags: [c.name.toLowerCase(), c.industry.toLowerCase(), c.region.toLowerCase()],
    });
  });

  // Opportunities
  const myOpps = isAdmin
    ? opportunities
    : opportunities.filter(o => o.executiveId === store.currentUser?.executiveId);

  myOpps.forEach(o => {
    const co = companies.find(c => c.id === o.companyId);
    const ct = contacts.find(c => c.id === o.contactId);
    items.push({
      id: `op-${o.id}`, type: 'opportunity',
      title: co?.name || o.companyId,
      subtitle: `${o.stage} · ${o.product} · ${(o.volumeL/1000).toFixed(0)}K L`,
      badge: o.stage,
      route: `/opportunities/${o.id}`,
      tags: [
        (co?.name || '').toLowerCase(),
        o.stage.toLowerCase(),
        o.product.toLowerCase(),
        (ct?.name || '').toLowerCase(),
        o.industry.toLowerCase(),
        o.region.toLowerCase(),
      ],
    });
  });

  // Powering U courses
  poweringUModules.forEach(m => {
    if (m.status !== 'pendiente') {
      items.push({
        id: `pu-${m.id}`, type: 'course',
        title: m.title,
        subtitle: `${m.category} · ${m.status === 'completado' ? 'Completado' : 'En progreso'} · ${m.duration}`,
        route: `/powering-u`,
        tags: [m.title.toLowerCase(), m.category.toLowerCase()],
      });
    }
  });

  // Alerts (unresolved)
  alerts.filter(a => !a.resolved).forEach(a => {
    items.push({
      id: `al-${a.id}`, type: 'alert',
      title: a.title,
      subtitle: `${a.company} · Severidad ${a.severity}`,
      badge: a.severity,
      route: `/alerts`,
      tags: [a.title.toLowerCase(), a.company.toLowerCase(), a.severity.toLowerCase(), a.type.toLowerCase()],
    });
  });

  // Executives (admin only)
  if (isAdmin) {
    executives.forEach(e => {
      items.push({
        id: `ex-${e.id}`, type: 'executive',
        title: e.name,
        subtitle: `Sector ${e.sector} · ${e.points} pts`,
        route: `/champions`,
        tags: [e.name.toLowerCase(), e.sector.toLowerCase()],
      });
    });
  }

  return items;
}

function highlight(text, query) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-shell-yellow/50 text-shell-gray-800 rounded px-0.5 not-italic">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

const STAGE_COLORS = {
  Suspect: 'bg-shell-gray-100 text-shell-gray-500',
  Prospect: 'bg-amber-100 text-amber-700',
  Approach: 'bg-orange-100 text-orange-600',
  Negotiate: 'bg-blue-100 text-blue-600',
  Close: 'bg-green-100 text-green-600',
  Order: 'bg-emerald-100 text-emerald-600',
  Payment: 'bg-teal-100 text-teal-600',
  Alta: 'bg-red-100 text-shell-red',
  Media: 'bg-amber-100 text-amber-600',
  Baja: 'bg-shell-gray-100 text-shell-gray-500',
};

export default function TopBar() {
  const store = useAppStore();
  const { currentUser, notificationCount, openB2Buddy } = store;
  const isAdmin = currentUser?.role === 'admin';
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  // Build search index once
  const searchIndex = useRef(null);
  useEffect(() => {
    searchIndex.current = buildSearchIndex(store, isAdmin);
  }, [store.opportunities, store.alerts, isAdmin]);

  // Filter on query change
  useEffect(() => {
    if (!query.trim() || query.length < 1) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const matched = (searchIndex.current || [])
      .filter(item => item.tags.some(t => t.includes(q)))
      .slice(0, 12);
    setResults(matched);
    setActiveIdx(-1);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Keyboard shortcut ⌘K
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === 'Escape') {
        setOpen(false);
        setQuery('');
        inputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleSelect = useCallback((item) => {
    navigate(item.route);
    setQuery('');
    setOpen(false);
    inputRef.current?.blur();
  }, [navigate]);

  const handleKeyDown = (e) => {
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, -1)); }
    if (e.key === 'Enter' && activeIdx >= 0) handleSelect(results[activeIdx]);
  };

  // Group results by type
  const grouped = results.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  const showDropdown = open && (results.length > 0 || query.length >= 1);

  return (
    <header className="bg-white border-b border-shell-gray-100 sticky top-0 z-30 h-14 flex items-center px-4 md:px-6 gap-4">
      {/* Mobile logo */}
      <div className="flex md:hidden items-center gap-2 mr-2">
        <img src={`${BASE}shell-logo.png`} alt="Shell" className="w-7 h-7 object-contain" />
        <span className="font-bold text-shell-gray-800 text-base">Symphony</span>
      </div>

      {/* Search */}
      <div ref={wrapperRef} className="flex-1 max-w-md relative">
        <div className={`relative transition-all duration-150 ${open ? 'ring-2 ring-shell-yellow rounded-lg' : ''}`}>
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-shell-gray-400 z-10" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar oportunidades, clientes..."
            className="w-full pl-9 pr-16 py-2 text-sm bg-shell-gray-50 rounded-lg border border-shell-gray-200 text-shell-gray-700 placeholder:text-shell-gray-400 focus:outline-none focus:bg-white transition-colors"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {query && (
              <button onClick={() => { setQuery(''); setResults([]); }} className="w-5 h-5 rounded flex items-center justify-center text-shell-gray-400 hover:text-shell-gray-600">
                <X size={12} />
              </button>
            )}
            {!query && <kbd className="text-[10px] text-shell-gray-400 bg-shell-gray-100 px-1.5 py-0.5 rounded font-mono hidden sm:block">⌘K</kbd>}
          </div>
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-modal border border-shell-gray-100 overflow-hidden z-50 animate-fade-in max-h-[70vh] overflow-y-auto">
            {results.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Search size={24} className="text-shell-gray-200 mx-auto mb-2" />
                <p className="text-sm text-shell-gray-400">Sin resultados para <span className="font-semibold">"{query}"</span></p>
                <p className="text-xs text-shell-gray-300 mt-1">Intenta con el nombre de un cliente, producto o etapa SPANCOP</p>
              </div>
            ) : (
              <div>
                {/* Quick tip */}
                <div className="px-3 py-2 bg-shell-gray-50 border-b border-shell-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-shell-gray-400">{results.length} resultado{results.length !== 1 ? 's' : ''} para <span className="font-semibold text-shell-gray-600">"{query}"</span></span>
                  <span className="text-[10px] text-shell-gray-300 hidden sm:block">↑↓ navegar · Enter seleccionar · Esc cerrar</span>
                </div>

                {/* Grouped results */}
                {Object.entries(grouped).map(([type, items]) => {
                  const cfg = TYPE_CONFIG[type];
                  const Icon = cfg.icon;
                  return (
                    <div key={type}>
                      {/* Group header */}
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 ${cfg.bg} border-b border-shell-gray-50`}>
                        <Icon size={11} className={cfg.color} />
                        <span className={`text-[10px] font-bold uppercase tracking-wide ${cfg.color}`}>{cfg.label}{items.length > 1 ? `s (${items.length})` : ''}</span>
                      </div>
                      {/* Items */}
                      {items.map((item, itemIdx) => {
                        const globalIdx = results.indexOf(item);
                        const isActive = globalIdx === activeIdx;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setActiveIdx(globalIdx)}
                            className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors border-b border-shell-gray-50 last:border-0 ${isActive ? 'bg-shell-yellow-light' : 'hover:bg-shell-gray-50'}`}
                          >
                            <div className={`w-7 h-7 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0`}>
                              <Icon size={13} className={cfg.color} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-shell-gray-800 truncate">
                                {highlight(item.title, query)}
                              </p>
                              <p className="text-[11px] text-shell-gray-400 truncate">{item.subtitle}</p>
                            </div>
                            {item.badge && (
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${STAGE_COLORS[item.badge] || 'bg-shell-gray-100 text-shell-gray-500'}`}>
                                {item.badge}
                              </span>
                            )}
                            {isActive && <span className="text-[10px] text-shell-gray-400 shrink-0">Enter →</span>}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}

                {/* Footer */}
                <div className="px-3 py-2 bg-shell-gray-50 border-t border-shell-gray-100 flex items-center gap-2">
                  <img src={`${BASE}b2buddy-avatar.png`} alt="B2Buddy" className="w-4 h-4 object-contain" />
                  <span className="text-[10px] text-shell-gray-400">¿No encuentras lo que buscas? <button onClick={openB2Buddy} className="text-shell-yellow-dark font-semibold hover:underline">Pregúntale a B2Buddy →</button></span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* B2Buddy mobile */}
        <button onClick={openB2Buddy} className="md:hidden bg-shell-yellow text-shell-gray-800 rounded-full p-2 hover:bg-shell-yellow-mid transition-colors">
          <Mic size={16} />
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-lg hover:bg-shell-gray-50 flex items-center justify-center text-shell-gray-500 transition-colors">
          <Bell size={18} />
          {notificationCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-shell-red rounded-full" />}
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
