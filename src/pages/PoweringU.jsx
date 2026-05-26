import { useState } from 'react';
import { BookOpen, CheckCircle, Clock, Lock, Star } from 'lucide-react';
import { poweringUModules } from '../data/mockData';
import { courseContent } from '../data/courseContent';
import useAppStore from '../store/useAppStore';
import CourseModal from '../components/ui/CourseModal';

const categories = ['Todos', 'Productos Shell', 'SPANCOP', 'Venta consultiva', 'Objeciones', 'Marca personal'];
const statusConfig = {
  completado: { label: 'Completado', bg: 'bg-green-50', text: 'text-green-600', icon: CheckCircle },
  en_progreso: { label: 'En progreso', bg: 'bg-blue-50', text: 'text-blue-600', icon: Clock },
  pendiente: { label: 'Pendiente', bg: 'bg-shell-gray-50', text: 'text-shell-gray-400', icon: Lock },
};

export default function PoweringU() {
  const { currentUser } = useAppStore();
  const [catFilter, setCatFilter] = useState('Todos');
  const [selectedModule, setSelectedModule] = useState(null);

  const filtered = poweringUModules.filter(m => catFilter === 'Todos' || m.category === catFilter);

  const completed = poweringUModules.filter(m => m.status === 'completado').length;
  const inProgress = poweringUModules.filter(m => m.status === 'en_progreso').length;
  const avgScore = Math.round(
    poweringUModules.filter(m => m.score).reduce((s, m) => s + m.score, 0) /
    poweringUModules.filter(m => m.score).length
  );

  const openModule = (module) => {
    if (module.status !== 'pendiente') {
      setSelectedModule(module);
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="relative bg-white rounded-2xl p-6 mb-6 border border-shell-gray-100 shadow-card overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-shell-yellow rounded-full -translate-y-1/2 translate-x-1/2 opacity-10" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-shell-yellow rounded-xl flex items-center justify-center">
              <BookOpen size={20} className="text-shell-gray-800" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-shell-gray-800">Powering U</h1>
              <p className="text-xs text-shell-gray-400">Capacitación continua para el equipo comercial</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completed}</div>
              <div className="text-xs text-shell-gray-400">Completados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{inProgress}</div>
              <div className="text-xs text-shell-gray-400">En progreso</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-shell-yellow-dark">{avgScore}%</div>
              <div className="text-xs text-shell-gray-400">Promedio evaluaciones</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-shell-gray-400 mb-1">
              <span>Progreso general</span>
              <span className="font-semibold">{Math.round((completed / poweringUModules.length) * 100)}%</span>
            </div>
            <div className="w-full bg-shell-gray-100 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-shell-yellow transition-all duration-500"
                style={{ width: `${(completed / poweringUModules.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 flex-wrap mb-5">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCatFilter(c)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              catFilter === c ? 'bg-shell-yellow text-shell-gray-800' : 'bg-white border border-shell-gray-200 text-shell-gray-500'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Modules grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(module => {
          const cfg = statusConfig[module.status];
          const StatusIcon = cfg.icon;
          const hasCourseContent = !!courseContent[module.id];
          return (
            <div key={module.id} className={`card p-4 hover:shadow-card-hover transition-all duration-200 ${module.status === 'pendiente' ? 'opacity-70' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0`}>
                  <StatusIcon size={18} className={cfg.text} />
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
              </div>
              <h3 className="text-sm font-semibold text-shell-gray-800 mb-1 leading-tight">{module.title}</h3>
              <p className="text-[10px] text-shell-gray-400 mb-3">{module.category}</p>
              <div className="flex items-center gap-3 text-[10px] text-shell-gray-400 mb-3">
                <span>⏱ {module.duration}</span>
                <span>📚 {module.lessons} lecciones</span>
              </div>
              {module.status !== 'pendiente' && (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-[10px] text-shell-gray-400 mb-1">
                    <span>Progreso</span>
                    <span className="font-semibold">{module.progress}%</span>
                  </div>
                  <div className="w-full bg-shell-gray-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${module.status === 'completado' ? 'bg-green-500' : 'bg-shell-yellow'}`}
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                </div>
              )}
              {module.score && (
                <div className="flex items-center gap-1 text-xs text-amber-500 mb-2">
                  <Star size={12} fill="currentColor" />
                  <span className="font-bold">{module.score}/100</span>
                </div>
              )}
              <button
                onClick={() => openModule(module)}
                className={`w-full mt-1 text-xs font-semibold px-3 py-2.5 rounded-lg transition-all ${
                  module.status === 'completado'
                    ? 'bg-green-50 text-green-600 hover:bg-green-100'
                    : module.status === 'pendiente'
                    ? 'bg-shell-gray-100 text-shell-gray-400 cursor-not-allowed'
                    : 'bg-shell-yellow text-shell-gray-800 hover:bg-shell-yellow-mid'
                }`}
              >
                {module.status === 'completado' ? '📖 Repasar' : module.status === 'en_progreso' ? '▶ Continuar' : '🔒 Próximamente'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Course Modal */}
      <CourseModal
        isOpen={!!selectedModule}
        onClose={() => setSelectedModule(null)}
        module={selectedModule}
        content={selectedModule ? courseContent[selectedModule.id] : null}
      />
    </div>
  );
}
