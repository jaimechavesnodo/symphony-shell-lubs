import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowLeft, Mic, Mail, Calendar, FolderOpen, Phone, User,
  CheckCircle, Circle, FileText, Clock, MapPin, Package, ChevronRight
} from 'lucide-react';
import useAppStore from '../store/useAppStore';
import SpancopBadge from '../components/ui/SpancopBadge';
import Modal from '../components/ui/Modal';

const activityIcons = {
  reunion: '🤝', llamada: '📞', correo: '✉️', actualización: '🔄',
  visita: '🏢', nota: '📝', compromiso: '⚠️',
};

const activityColors = {
  reunion: 'border-blue-200 bg-blue-50',
  llamada: 'border-green-200 bg-green-50',
  correo: 'border-amber-200 bg-amber-50',
  actualización: 'border-purple-200 bg-purple-50',
  visita: 'border-orange-200 bg-orange-50',
  nota: 'border-shell-gray-200 bg-shell-gray-50',
  compromiso: 'border-red-200 bg-red-50',
};

const fileTypeIcons = {
  'POPSA': '📋', 'Hoja de descubrimiento': '🔍', 'Propuesta comercial': '📄',
  'Contrato': '📃', 'Orden de compra': '🛒', 'Ficha técnica': '⚙️',
  'Reporte de visita técnica': '📊', 'Cotización': '💰',
};

export default function OpportunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { opportunities, companies, contacts, executives, files, openB2Buddy } = useAppStore();

  const [activeTab, setActiveTab] = useState('timeline');
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const opp = opportunities.find((o) => o.id === id);
  if (!opp) return (
    <div className="page-container py-12 text-center text-shell-gray-400">
      <p>Oportunidad no encontrada</p>
      <button onClick={() => navigate('/opportunities')} className="mt-4 btn-secondary inline-flex">Volver</button>
    </div>
  );

  const company = companies.find((c) => c.id === opp.companyId);
  const contact = contacts.find((c) => c.id === opp.contactId);
  const executive = executives.find((e) => e.id === opp.executiveId);
  const oppFiles = files.filter((f) => f.opportunityId === opp.id);

  const riskColors = { Alto: 'text-shell-red bg-red-50', Medio: 'text-amber-600 bg-amber-50', Bajo: 'text-green-600 bg-green-50' };
  const probColor = opp.probability >= 70 ? 'text-green-600' : opp.probability >= 40 ? 'text-blue-600' : 'text-amber-600';

  const emailBody = `Hola ${contact?.name?.split(' ')[0] || ''},\n\nGracias por el espacio de hoy. De acuerdo con lo conversado, compartimos los próximos pasos para continuar avanzando con la propuesta de ${opp.product}.\n\nVolumen estimado: ${(opp.volumeL / 1000).toFixed(0)}.000 L anuales\nEtapa actual: ${opp.stage}\nPróximo paso: ${opp.nextStep}\n\nQuedamos atentos a sus comentarios.\n\nAtentamente,\n${executive?.name}\nEjecutivo Comercial\nShell Lubricantes Perú | Powered by Primax`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailBody);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const tabs = [
    { key: 'timeline', label: 'Timeline', count: opp.activities?.length },
    { key: 'commitments', label: 'Compromisos', count: opp.commitments?.length },
    { key: 'files', label: 'Archivos', count: oppFiles.length },
  ];

  return (
    <div className="page-container">
      {/* Back */}
      <button onClick={() => navigate('/opportunities')} className="flex items-center gap-1.5 text-sm text-shell-gray-500 hover:text-shell-gray-800 mb-4 transition-colors">
        <ArrowLeft size={15} />
        Volver a oportunidades
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ─── Left panel ─────────────────────────────────────────────────── */}
        <div className="space-y-4">
          {/* Main card */}
          <div className="card p-5">
            <div className="flex items-start justify-between gap-2 mb-4">
              <div>
                <h1 className="text-lg font-bold text-shell-gray-800 leading-tight">{company?.name}</h1>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin size={11} className="text-shell-gray-400" />
                  <span className="text-xs text-shell-gray-400">{opp.region}</span>
                  <span className="text-shell-gray-300 text-xs">·</span>
                  <span className="text-xs text-shell-gray-400">{opp.industry}</span>
                </div>
              </div>
              <SpancopBadge stage={opp.stage} />
            </div>

            {/* Probability */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-shell-gray-400">Probabilidad de cierre</span>
                <span className={`text-lg font-bold ${probColor}`}>{opp.probability}%</span>
              </div>
              <div className="w-full bg-shell-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${opp.probability >= 70 ? 'bg-green-500' : opp.probability >= 40 ? 'bg-blue-500' : 'bg-amber-400'}`}
                  style={{ width: `${opp.probability}%` }}
                />
              </div>
            </div>

            {/* Key metrics */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-shell-gray-50 rounded-xl p-3">
                <div className="text-[10px] text-shell-gray-400 mb-0.5">Volumen estimado</div>
                <div className="text-sm font-bold text-shell-gray-800">{(opp.volumeL / 1000).toFixed(0)}.000 L</div>
              </div>
              <div className="bg-shell-gray-50 rounded-xl p-3">
                <div className="text-[10px] text-shell-gray-400 mb-0.5">Valor estimado</div>
                <div className="text-sm font-bold text-shell-gray-800">${opp.valueUSD.toLocaleString()}</div>
              </div>
            </div>

            {/* Product */}
            <div className="flex items-center gap-2 mb-4 p-3 bg-shell-yellow-light rounded-xl">
              <Package size={14} className="text-shell-yellow-dark shrink-0" />
              <div>
                <div className="text-[10px] text-shell-gray-400">Producto</div>
                <div className="text-xs font-semibold text-shell-gray-700">{opp.product}</div>
              </div>
            </div>

            {/* Contact */}
            {contact && (
              <div className="border-t border-shell-gray-100 pt-4 mb-4">
                <div className="text-[10px] font-semibold text-shell-gray-400 uppercase tracking-wide mb-2">Contacto principal</div>
                <div className="flex items-start gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-shell-yellow flex items-center justify-center text-shell-gray-800 font-bold text-xs shrink-0">
                    {contact.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-shell-gray-800">{contact.name}</div>
                    <div className="text-xs text-shell-gray-500">{contact.role}</div>
                    <div className="flex flex-col gap-0.5 mt-1">
                      <a href={`tel:${contact.phone}`} className="text-xs text-shell-gray-400 flex items-center gap-1 hover:text-shell-gray-700">
                        <Phone size={10} /> {contact.phone}
                      </a>
                      <a href={`mailto:${contact.email}`} className="text-xs text-shell-gray-400 flex items-center gap-1 hover:text-shell-gray-700">
                        <Mail size={10} /> {contact.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Executive */}
            {executive && (
              <div className="flex items-center gap-2 mb-4">
                <User size={12} className="text-shell-gray-400" />
                <span className="text-xs text-shell-gray-500">Ejecutivo: <span className="font-semibold text-shell-gray-700">{executive.name}</span></span>
              </div>
            )}

            {/* Risk + last contact */}
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${riskColors[opp.risk]}`}>
                Riesgo {opp.risk}
              </span>
              <div className="flex items-center gap-1 text-xs text-shell-gray-400">
                <Clock size={11} />
                {opp.daysSinceContact === 0 ? 'Contactado hoy' : `${opp.daysSinceContact}d sin contacto`}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="card p-4 space-y-2">
            <div className="text-[10px] font-semibold text-shell-gray-400 uppercase tracking-wide mb-3">Acciones rápidas</div>
            <button onClick={openB2Buddy} className="w-full bg-shell-yellow text-shell-gray-800 font-semibold text-sm px-4 py-3 rounded-xl flex items-center gap-2.5 hover:bg-shell-yellow-mid transition-colors">
              <div className="w-6 h-6 bg-shell-gray-800 rounded-full flex items-center justify-center shrink-0">
                <Mic size={12} className="text-shell-yellow" />
              </div>
              Actualizar por voz
            </button>
            <button onClick={() => setEmailModalOpen(true)} className="btn-secondary w-full justify-center">
              <Mail size={15} />
              Generar correo resumen
            </button>
            <button onClick={() => setCalendarModalOpen(true)} className="btn-secondary w-full justify-center">
              <Calendar size={15} />
              Crear evento en calendario
            </button>
            <button onClick={() => setActiveTab('files')} className="btn-secondary w-full justify-center">
              <FolderOpen size={15} />
              Ver archivos ({oppFiles.length})
            </button>
          </div>

          {/* Next step */}
          <div className="card p-4">
            <div className="text-[10px] font-semibold text-shell-gray-400 uppercase tracking-wide mb-2">Próximo paso</div>
            <div className="flex items-start gap-2">
              <ChevronRight size={14} className="text-shell-yellow-dark mt-0.5 shrink-0" />
              <p className="text-sm text-shell-gray-700 font-medium">{opp.nextStep}</p>
            </div>
          </div>
        </div>

        {/* ─── Right panel ────────────────────────────────────────────────── */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex gap-1 bg-shell-gray-100 rounded-xl p-1 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 text-xs font-semibold px-3 py-2 rounded-lg transition-all ${
                  activeTab === tab.key ? 'bg-white text-shell-gray-800 shadow-card' : 'text-shell-gray-500 hover:text-shell-gray-700'
                }`}
              >
                {tab.label} {tab.count > 0 && <span className="ml-1 opacity-60">({tab.count})</span>}
              </button>
            ))}
          </div>

          {/* Timeline */}
          {activeTab === 'timeline' && (
            <div className="card p-5">
              <h3 className="section-title">Historial de actividades</h3>
              <div className="space-y-4">
                {(opp.activities || []).map((act, i) => (
                  <div key={act.id} className="flex gap-3 animate-fade-in">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-shell-gray-100 flex items-center justify-center text-sm shrink-0">
                        {activityIcons[act.type] || '📝'}
                      </div>
                      {i < (opp.activities.length - 1) && <div className="w-0.5 flex-1 bg-shell-gray-100 mt-1" />}
                    </div>
                    <div className={`flex-1 border rounded-xl p-3 mb-1 ${activityColors[act.type] || 'border-shell-gray-100 bg-shell-gray-50'}`}>
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm text-shell-gray-700 leading-relaxed">{act.text}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 text-[10px] text-shell-gray-400">
                        <span>{act.executiveName}</span>
                        <span>·</span>
                        <span>{new Date(act.date).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Commitments */}
          {activeTab === 'commitments' && (
            <div className="card p-5">
              <h3 className="section-title">Compromisos activos</h3>
              {opp.commitments?.length > 0 ? (
                <div className="space-y-3">
                  {opp.commitments.map((c, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                      <Circle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-shell-gray-700">{c}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <CheckCircle size={32} className="text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-shell-gray-400">Sin compromisos pendientes</p>
                </div>
              )}
            </div>
          )}

          {/* Files */}
          {activeTab === 'files' && (
            <div className="card p-5">
              <h3 className="section-title">Archivos asociados</h3>
              {oppFiles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {oppFiles.map((f) => (
                    <div key={f.id} className="flex items-center gap-3 p-3 border border-shell-gray-100 rounded-xl hover:bg-shell-gray-50 transition-colors">
                      <div className="w-10 h-10 bg-shell-gray-100 rounded-xl flex items-center justify-center text-xl shrink-0">
                        {fileTypeIcons[f.type] || '📄'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-shell-gray-700 truncate">{f.name}</p>
                        <p className="text-[10px] text-shell-gray-400">{f.type} · {f.size}</p>
                      </div>
                      <button className="text-[10px] text-shell-yellow-dark font-semibold hover:underline shrink-0">
                        <FileText size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-shell-gray-400 text-sm">
                  Sin archivos asociados
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Email modal */}
      <Modal isOpen={emailModalOpen} onClose={() => setEmailModalOpen(false)} title="Correo resumen generado" size="md">
        <div className="space-y-4">
          <div className="bg-shell-yellow-light rounded-xl p-3 text-xs text-shell-gray-700">
            <strong>Asunto:</strong> Resumen reunión y próximos pasos – {company?.name}
          </div>
          <div className="bg-shell-gray-50 rounded-xl p-4">
            <pre className="text-xs text-shell-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{emailBody}</pre>
          </div>
          <div className="flex gap-3">
            <button onClick={handleCopyEmail} className={`btn-primary flex-1 justify-center ${copiedEmail ? 'bg-green-500 text-white hover:bg-green-600' : ''}`}>
              {copiedEmail ? '✓ Copiado' : 'Copiar texto'}
            </button>
            <button onClick={() => setEmailModalOpen(false)} className="btn-secondary">Cerrar</button>
          </div>
        </div>
      </Modal>

      {/* Calendar modal */}
      <Modal isOpen={calendarModalOpen} onClose={() => setCalendarModalOpen(false)} title="Crear evento en calendario" size="sm">
        <div className="space-y-4">
          <p className="text-sm text-shell-gray-600">B2Buddy sugerirá crear los siguientes eventos de seguimiento:</p>
          {[
            { title: `Follow-up – ${company?.name}`, date: 'Próxima semana', type: 'Seguimiento' },
            { title: `Visita técnica – ${company?.name}`, date: 'En 2 semanas', type: 'Visita técnica' },
          ].map((evt, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-xl">
              <Calendar size={16} className="text-blue-500 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-shell-gray-700">{evt.title}</p>
                <p className="text-[10px] text-shell-gray-400">{evt.date} · {evt.type}</p>
              </div>
            </div>
          ))}
          <div className="flex gap-2">
            <button className="btn-primary flex-1 justify-center" onClick={() => setCalendarModalOpen(false)}>
              <CheckCircle size={14} /> Aceptar
            </button>
            <button className="btn-secondary" onClick={() => setCalendarModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
