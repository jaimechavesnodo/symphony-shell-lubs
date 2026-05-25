import { useState } from 'react';
import { ChevronLeft, ChevronRight, Bot } from 'lucide-react';
import useAppStore from '../store/useAppStore';

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const typeColors = {
  reunion: 'bg-shell-yellow text-shell-gray-800',
  visita: 'bg-blue-500 text-white',
  seguimiento: 'bg-green-500 text-white',
  compromiso: 'bg-purple-500 text-white',
  vencimiento: 'bg-shell-red text-white',
};

const typeLabels = {
  reunion: 'Reunión', visita: 'Visita técnica', seguimiento: 'Seguimiento',
  compromiso: 'Compromiso', vencimiento: 'Vencimiento',
};

const filterTypes = ['reunion', 'visita', 'seguimiento', 'compromiso', 'vencimiento'];

export default function Calendar() {
  const { events } = useAppStore();
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeFilters, setActiveFilters] = useState(new Set(filterTypes));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const toggleFilter = (type) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      next.has(type) ? next.delete(type) : next.add(type);
      return next;
    });
  };

  const eventsForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter((e) => e.date === dateStr && activeFilters.has(e.type));
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isToday = (day) => {
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  return (
    <div className="page-container">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Sidebar filters */}
        <div className="lg:w-56 shrink-0">
          <div className="card p-4 mb-4">
            <h3 className="text-xs font-bold text-shell-gray-500 uppercase tracking-wide mb-3">Filtros</h3>
            <div className="space-y-2">
              {filterTypes.map((type) => (
                <label key={type} className="flex items-center gap-2.5 cursor-pointer">
                  <div
                    onClick={() => toggleFilter(type)}
                    className={`w-4 h-4 rounded flex items-center justify-center cursor-pointer transition-colors ${
                      activeFilters.has(type) ? 'bg-shell-yellow' : 'border-2 border-shell-gray-200'
                    }`}
                  >
                    {activeFilters.has(type) && <div className="w-2 h-2 rounded-sm bg-shell-gray-800" />}
                  </div>
                  <span className="text-xs text-shell-gray-700 font-medium">{typeLabels[type]}</span>
                  <div className={`ml-auto w-2 h-2 rounded-full ${typeColors[type]?.split(' ')[0] || 'bg-shell-gray-300'}`} />
                </label>
              ))}
            </div>
          </div>

          {/* Upcoming */}
          <div className="card p-4">
            <h3 className="text-xs font-bold text-shell-gray-500 uppercase tracking-wide mb-3">Próximos</h3>
            <div className="space-y-2">
              {events
                .filter((e) => new Date(e.date) >= today)
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .slice(0, 5)
                .map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => setSelectedEvent(evt)}
                    className="cursor-pointer hover:bg-shell-gray-50 rounded-lg p-2 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${typeColors[evt.type]?.split(' ')[0] || 'bg-shell-gray-300'}`} />
                      <p className="text-[11px] font-medium text-shell-gray-700 line-clamp-2 leading-tight">{evt.title}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5 ml-4">
                      <span className="text-[10px] text-shell-gray-400">
                        {new Date(evt.date).toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })}
                      </span>
                      {evt.source === 'b2buddy' && (
                        <span className="text-[9px] bg-shell-yellow text-shell-gray-700 px-1 rounded font-bold">B2B</span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Calendar grid */}
        <div className="flex-1">
          <div className="card p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-shell-gray-800">{MONTHS[month]} {year}</h2>
              <div className="flex gap-2">
                <button onClick={prevMonth} className="w-8 h-8 rounded-lg hover:bg-shell-gray-100 flex items-center justify-center text-shell-gray-500 transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={nextMonth} className="w-8 h-8 rounded-lg hover:bg-shell-gray-100 flex items-center justify-center text-shell-gray-500 transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map((d) => (
                <div key={d} className="text-center text-[11px] font-semibold text-shell-gray-400 py-2">{d}</div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, i) => {
                if (!day) return <div key={`empty-${i}`} />;
                const dayEvents = eventsForDay(day);
                const today_ = isToday(day);
                return (
                  <div
                    key={day}
                    className={`min-h-[80px] p-1.5 rounded-xl border transition-colors ${
                      today_ ? 'border-shell-yellow bg-shell-yellow-light' : 'border-transparent hover:border-shell-gray-100 hover:bg-shell-gray-50'
                    }`}
                  >
                    <div className={`text-xs font-bold mb-1 w-6 h-6 flex items-center justify-center rounded-full ${
                      today_ ? 'bg-shell-yellow text-shell-gray-800' : 'text-shell-gray-600'
                    }`}>{day}</div>
                    <div className="space-y-0.5">
                      {dayEvents.slice(0, 2).map((evt) => (
                        <div
                          key={evt.id}
                          onClick={() => setSelectedEvent(evt)}
                          className={`text-[9px] font-semibold px-1 py-0.5 rounded cursor-pointer truncate flex items-center gap-0.5 ${typeColors[evt.type] || 'bg-shell-gray-200 text-shell-gray-700'}`}
                        >
                          {evt.source === 'b2buddy' && <Bot size={8} className="shrink-0" />}
                          <span className="truncate">{evt.title.split('–')[0].trim()}</span>
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-[9px] text-shell-gray-400 font-medium">+{dayEvents.length - 2} más</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Event detail popup */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-shell-gray-800/30" onClick={() => setSelectedEvent(null)} />
          <div className="relative bg-white rounded-2xl shadow-modal p-5 w-full max-w-sm animate-fade-in">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${typeColors[selectedEvent.type]}`}>
                    {typeLabels[selectedEvent.type]}
                  </span>
                  {selectedEvent.source === 'b2buddy' && (
                    <span className="text-[10px] bg-shell-yellow text-shell-gray-700 px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5">
                      <Bot size={10} /> B2Buddy
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-shell-gray-800">{selectedEvent.title}</h3>
              </div>
              <button onClick={() => setSelectedEvent(null)} className="text-shell-gray-400 hover:text-shell-gray-600 w-6 h-6 rounded flex items-center justify-center">✕</button>
            </div>
            <div className="space-y-2 text-xs text-shell-gray-600">
              <p><span className="font-semibold text-shell-gray-400">Fecha:</span> {new Date(selectedEvent.date).toLocaleDateString('es-PE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</p>
              {selectedEvent.time && selectedEvent.time !== '00:00' && (
                <p><span className="font-semibold text-shell-gray-400">Hora:</span> {selectedEvent.time}</p>
              )}
              {selectedEvent.description && (
                <p className="leading-relaxed">{selectedEvent.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
