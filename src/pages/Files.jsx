import { useState } from 'react';
import { Upload, Download, FolderOpen } from 'lucide-react';
import useAppStore from '../store/useAppStore';
import Modal from '../components/ui/Modal';

const fileTypes = ['Todos', 'POPSA', 'Hoja de descubrimiento', 'Propuesta comercial', 'Contrato', 'Orden de compra', 'Ficha técnica', 'Reporte de visita técnica', 'Cotización'];
const fileIcons = {
  'POPSA': '📋', 'Hoja de descubrimiento': '🔍', 'Propuesta comercial': '📄',
  'Contrato': '📃', 'Orden de compra': '🛒', 'Ficha técnica': '⚙️',
  'Reporte de visita técnica': '📊', 'Cotización': '💰',
};

export default function Files() {
  const { files, addFile, opportunities, companies } = useAppStore();
  const [typeFilter, setTypeFilter] = useState('Todos');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [newFile, setNewFile] = useState({ name: '', type: 'POPSA', opportunityId: '' });

  const filtered = files.filter((f) => typeFilter === 'Todos' || f.type === typeFilter);

  const handleUpload = () => {
    if (!newFile.name) return;
    const opp = opportunities.find(o => o.id === newFile.opportunityId);
    addFile({
      ...newFile,
      company: opp ? companies.find(c => c.id === opp.companyId)?.name || '' : '',
      size: `${(Math.random() * 4 + 0.5).toFixed(1)} MB`,
    });
    setNewFile({ name: '', type: 'POPSA', opportunityId: '' });
    setUploadOpen(false);
  };

  return (
    <div className="page-container">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-shell-gray-800">Archivos</h1>
          <p className="text-sm text-shell-gray-400">{files.length} archivos en el repositorio</p>
        </div>
        <button onClick={() => setUploadOpen(true)} className="btn-primary">
          <Upload size={15} />
          Subir archivo
        </button>
      </div>

      {/* Type filter */}
      <div className="flex gap-2 flex-wrap mb-5">
        {fileTypes.map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              typeFilter === t ? 'bg-shell-yellow text-shell-gray-800' : 'bg-white border border-shell-gray-200 text-shell-gray-500 hover:border-shell-gray-300'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Files grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((f) => (
          <div key={f.id} className="card p-4 hover:shadow-card-hover transition-all duration-200">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-shell-gray-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                {fileIcons[f.type] || '📄'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-shell-gray-800 truncate">{f.name}</p>
                <p className="text-[10px] text-shell-gray-400 mt-0.5">{f.type}</p>
              </div>
            </div>
            <div className="space-y-1 text-[10px] text-shell-gray-400 mb-3">
              <p className="truncate">🏢 {f.company}</p>
              <p>📅 {new Date(f.date).toLocaleDateString('es-PE')}</p>
              <p>💾 {f.size} · 👤 {f.uploader?.split(' ')[0]}</p>
            </div>
            <button className="btn-secondary w-full justify-center text-xs py-1.5">
              <Download size={12} />
              Descargar
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <FolderOpen size={32} className="text-shell-gray-200 mx-auto mb-2" />
            <p className="text-sm text-shell-gray-400">No hay archivos con el filtro seleccionado</p>
          </div>
        )}
      </div>

      {/* Upload modal */}
      <Modal isOpen={uploadOpen} onClose={() => setUploadOpen(false)} title="Subir archivo" size="sm">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-shell-gray-600 block mb-1.5">Nombre del archivo</label>
            <input
              value={newFile.name}
              onChange={(e) => setNewFile((p) => ({ ...p, name: e.target.value }))}
              placeholder="ej. Propuesta_ClienteXYZ_v2.pdf"
              className="w-full border border-shell-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-shell-yellow"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-shell-gray-600 block mb-1.5">Tipo de documento</label>
            <select
              value={newFile.type}
              onChange={(e) => setNewFile((p) => ({ ...p, type: e.target.value }))}
              className="w-full border border-shell-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-shell-yellow"
            >
              {fileTypes.filter(t => t !== 'Todos').map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-shell-gray-600 block mb-1.5">Oportunidad asociada</label>
            <select
              value={newFile.opportunityId}
              onChange={(e) => setNewFile((p) => ({ ...p, opportunityId: e.target.value }))}
              className="w-full border border-shell-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-shell-yellow"
            >
              <option value="">Sin asociar</option>
              {opportunities.map((o) => (
                <option key={o.id} value={o.id}>{o.id} – {companies.find(c => c.id === o.companyId)?.name?.split(' ').slice(0,3).join(' ')}</option>
              ))}
            </select>
          </div>
          <div className="border-2 border-dashed border-shell-gray-200 rounded-xl p-6 text-center">
            <Upload size={24} className="text-shell-gray-300 mx-auto mb-2" />
            <p className="text-xs text-shell-gray-400">Arrastra un archivo aquí o haz clic para seleccionar</p>
            <p className="text-[10px] text-shell-gray-300 mt-1">Simulado – el archivo se registra sin subirse</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleUpload} disabled={!newFile.name} className={`btn-primary flex-1 justify-center ${!newFile.name ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <Upload size={14} /> Registrar archivo
            </button>
            <button onClick={() => setUploadOpen(false)} className="btn-secondary">Cancelar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
