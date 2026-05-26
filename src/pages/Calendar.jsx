import { useState } from 'react';
import { ChevronLeft, ChevronRight, Bot, X } from 'lucide-react';
import useAppStore from '../store/useAppStore';

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

const typeConfig = {
  reunion:     { label: 'Reunión',           dot: 'bg-shell-yellow',  pill: 'bg-shell-yellow text-shell-gray-800',    border: 'border-shell-yellow/40' },
  visita:      { label: 'Visita técnica',    dot: 'bg-blue-500',      pill: 'bg-blue-500 text-white',                 border: 'border-blue-200' },
  seguimiento: { label: 'Seguimiento',       dot: 'bg-green-500',     pill: 'bg-green-500 text-white',                border: 'border-green-200' },
  compromiso:  { label: 'Compromiso',        dot: 'bg-purple-500',    pill: 'bg-purple-500 text-white',               border: 'border-purple-200' },
  vencimiento: { label: 'Vencimiento',       dot: 'bg-shell-red',     pill: 'bg-shell-red text-white',                border: 'border-red-200' },
};

const allTypes = Object.keys(typeConfig);

export default function Calendar() {
  const { events } = useAppStore();

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [activeFilters, setActiveFilters] = useState(new Set(allTypes));
  const [selectedEvent, setSelectedEvent] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const toggleFilter = (type) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      next.has(type) ? next.delete(type) : next.add(type);
      return next;
    });
  };

  const toggleAll = () => {
    if (activeFilters.size === allTypes.length) {
      setActiveFilters(new Set());
    } else {
      setActiveFilters(new Set(allTypes));
    }
  };

  const eventsForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    return events.filter(e => e.date === dateStr && activeFilters.has(e.type));
  };

  const upcomingEvents = events
    .filter(e => new Date(e.date) >= new Date(`${year}-${String(month+1).padStart(2,'0')}-01`) &&
                 new Date(e.date) <= new Date(year, month+1, 0) &&
                 activeFilters.has(e.type))
    .sort((a,b) => new Date(a.date) - new Date(b.date));

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isToday = (day) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('es-PE', { weekday:'long', day:'2-digit', month:'long' });

  return (
    <div className="page-container">
      <div className="flex flex-col lg:flex-row gap-5">

        {/* ─── Sidebar ──────────────────────────────────────────────────────── */}
        <div className="lg:w-60 shrink-0 space-y-4">

          {/* Filters */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-shell-gray-700 uppercase tracking-wide">Filtros</h3>
              <button
                onClick={toggleAll}
                className="text-[10px] font-semibold text-shell-yellow-dark hover:underline"
              >
                {activeFilters.size === allTypes.length ? 'Limpiar' : 'Todos'}
              </button>
            </div>
            <div className="space-y-2">
              {allTypes.map(type => {
                const cfg = typeConfig[type];
                const isActive = activeFilters.has(type);
                return (
                  <button
                    key={type}
                    onClick={() => toggleFilter(type)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all duration-150 ${
                      isActive ? 'bg-shell-gray-50' : 'opacity-40 hover:opacity-60'
                    }`}
                  >
                    {/* Custom checkbox */}
                    <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all ${
                      isActive ? cfg.dot + ' shadow-sm' : 'border-2 border-shell-gray-300'
                    }`}>
                      {isActive && (
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                          <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className={`text-xs font-medium ${isActive ? 'text-shell-gray-700' : 'text-shell-gray-400'}`}>
                      {cfg.label}
                    </span>
                    {/* Count badge */}
                    <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-shell-gray-100 text-shell-gray-500' : 'bg-shell-gray-50 text-shell-gray-300'
                    }`}>
                      {events.filter(e => e.type === type).length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upcoming */}
          <div className="card p-4">
            <h3 className="text-xs font-bold text-shell-gray-700 uppercase tracking-wide mb-3">
              Este mes ({upcomingEvents.length})
            </h3>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {upcomingEvents.length === 0 && (
                <p className="text-[11px] text-shell-gray-400 text-center py-3">Sin eventos con los filtros seleccionados</p>
              )}
              {upcomingEvents.map(evt => {
                const cfg = typeConfig[evt.type] || typeConfig.reunion;
                return (
                  <button
                    key={evt.id}
                    onClick={() => setSelectedEvent(evt)}
                    className="w-full text-left hover:bg-shell-gray-50 rounded-lg p-2 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${cfg.dot}`} />
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-shell-gray-700 leading-tight line-clamp-2">{evt.title}</p>
                        <p className="text-[10px] text-shell-gray-400 mt-0.5">
                          {new Date(evt.date).toLocaleDateString('es-PE', {day:'2-digit', month:'short'})}
                          {evt.time && evt.time !== '00:00' && ` · ${evt.time}`}
                          {evt.source === 'b2buddy' && <span className="ml-1 text-shell-yellow-dark font-bold">B2B</span>}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Calendar grid ────────────────────────────────────────────────── */}
        <div className="flex-1 card p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-shell-gray-800">
              {MONTHS[month]} {year}
            </h2>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                className="w-8 h-8 rounded-lg hover:bg-shell-gray-100 flex items-center justify-center text-shell-gray-500 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))}
                className="px-2.5 h-8 rounded-lg hover:bg-shell-gray-100 text-xs font-semibold text-shell-gray-500 transition-colors"
              >
                Hoy
              </button>
              <button
                onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                className="w-8 h-8 rounded-lg hover:bg-shell-gray-100 flex items-center justify-center text-shell-gray-500 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[11px] font-semibold text-shell-gray-400 py-2">{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (!day) return <div key={`e-${i}`} className="min-h-[80px]" />;
              const dayEvents = eventsForDay(day);
              const today_ = isToday(day);
              return (
                <div
                  key={day}
                  className={`min-h-[80px] p-1.5 rounded-xl border transition-colors ${
                    today_
                      ? 'border-shell-yellow bg-shell-yellow-light'
                      : 'border-transparent hover:border-shell-gray-100 hover:bg-shell-gray-50'
                  }`}
                >
                  <div className={`text-xs font-bold mb-1 w-6 h-6 flex items-center justify-center rounded-full ${
                    today_ ? 'bg-shell-yellow text-shell-gray-800' : 'text-shell-gray-600'
                  }`}>
                    {day}
                  </div>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 2).map(evt => {
                      const cfg = typeConfig[evt.type] || typeConfig.reunion;
                      return (
                        <button
                          key={evt.id}
                          onClick={() => setSelectedEvent(evt)}
                          className={`w-full text-left text-[9px] font-semibold px-1.5 py-0.5 rounded cursor-pointer truncate flex items-center gap-0.5 ${cfg.pill} hover:opacity-90 transition-opacity`}
                        >
                          {evt.source === 'b2buddy' && <Bot size={8} className="shrink-0" />}
                          <span className="truncate">{evt.title.split('–')[0].trim()}</span>
                        </button>
                      );
                    })}
                    {dayEvents.length > 2 && (
                      <div className="text-[9px] text-shell-gray-400 font-medium px-1">
                        +{dayEvents.length - 2} más
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-shell-gray-100">
            {allTypes.map(type => {
              const cfg = typeConfig[type];
              const isActive = activeFilters.has(type);
              return (
                <button
                  key={type}
                  onClick={() => toggleFilter(type)}
                  className={`flex items-center gap-1.5 text-[10px] font-medium transition-opacity ${isActive ? 'opacity-100' : 'opacity-30'}`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                  <span className="text-shell-gray-600">{cfg.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Event detail popup ───────────────────────────────────────────────── */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-shell-gray-800/30" onClick={() => setSelectedEvent(null)} />
          <div className="relative bg-white rounded-2xl shadow-modal p-5 w-full max-w-sm animate-fade-in">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-lg hover:bg-shell-gray-100 flex items-center justify-center text-shell-gray-400"
            >
              <X size={14} />
            </button>
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${typeConfig[selectedEvent.type]?.pill || 'bg-shell-gray-100 text-shell-gray-600'}`}>
                  {typeConfig[selectedEvent.type]?.label || selectedEvent.type}
                </span>
                {selectedEvent.source === 'b2buddy' && (
                  <span className="text-[10px] bg-shell-yellow text-shell-gray-700 px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5">
                    <Bot size={10} /> B2Buddy
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-shell-gray-800 leading-snug">{selectedEvent.title}</h3>
            </div>
            <div className="space-y-1.5 text-xs text-shell-gray-600">
              <p>
                <span className="font-semibold text-shell-gray-400">Fecha: </span>
                {formatDate(selectedEvent.date)}
              </p>
              {selectedEvent.time && selectedEvent.time !== '00:00' && (
                <p><span className="font-semibold text-shell-gray-400">Hora: </span>{selectedEvent.time} a.m.</p>
              )}
              {selectedEvent.description && (
                <p className="leading-relaxed pt-1 border-t border-shell-gray-100">{selectedEvent.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
