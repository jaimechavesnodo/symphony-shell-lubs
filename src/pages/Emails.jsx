import { useState } from 'react';
import { Mail, Copy, CheckCircle, ExternalLink, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../store/useAppStore';
import Modal from '../components/ui/Modal';

export default function Emails() {
  const { emails, markEmailSent } = useAppStore();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = (body) => {
    navigator.clipboard.writeText(body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sorted = [...emails].sort((a, b) => {
    if (a.isNew && !b.isNew) return -1;
    if (!a.isNew && b.isNew) return 1;
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="page-container">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-shell-gray-800">Correos generados</h1>
        <p className="text-sm text-shell-gray-400">{emails.length} correos · {emails.filter(e => e.status === 'draft').length} borradores</p>
      </div>

      <div className="space-y-3">
        {sorted.map((email) => (
          <div
            key={email.id}
            className={`card border cursor-pointer hover:shadow-card-hover transition-all duration-200 ${email.isNew ? 'border-shell-yellow ring-1 ring-shell-yellow' : 'border-shell-gray-100'}`}
            onClick={() => setSelected(email)}
          >
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${email.status === 'enviado' ? 'bg-green-50' : 'bg-shell-yellow-light'}`}>
                    <Mail size={16} className={email.status === 'enviado' ? 'text-green-500' : 'text-shell-yellow-dark'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      {email.isNew && (
                        <span className="text-[10px] bg-shell-yellow text-shell-gray-800 font-bold px-1.5 py-0.5 rounded-full">NUEVO</span>
                      )}
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                        email.status === 'enviado' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {email.status === 'enviado' ? 'Enviado' : 'Borrador'}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-shell-gray-800 truncate">{email.subject}</h3>
                    <p className="text-xs text-shell-gray-500 mt-0.5">{email.company}</p>
                    <p className="text-xs text-shell-gray-400 mt-0.5">Para: {email.to}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-shell-gray-400">
                    {new Date(email.date).toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })}
                  </span>
                  <ChevronRight size={14} className="text-shell-gray-300 mt-1 ml-auto" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Email detail modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.subject} size="lg">
        {selected && (
          <div className="space-y-4">
            {selected.isNew && (
              <div className="bg-shell-yellow-light border border-shell-yellow rounded-xl p-3 text-xs text-shell-gray-700 flex items-center gap-2">
                <span className="font-bold">✨ Generado por B2Buddy</span> · Basado en la reunión más reciente
              </div>
            )}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><span className="text-shell-gray-400">Para:</span> <span className="text-shell-gray-700 font-medium">{selected.to}</span></div>
              <div><span className="text-shell-gray-400">De:</span> <span className="text-shell-gray-700 font-medium">{selected.from}</span></div>
              <div><span className="text-shell-gray-400">Empresa:</span> <span className="text-shell-gray-700 font-medium">{selected.company}</span></div>
              <div><span className="text-shell-gray-400">Fecha:</span> <span className="text-shell-gray-700 font-medium">{new Date(selected.date).toLocaleDateString('es-PE')}</span></div>
            </div>
            <div className="bg-shell-gray-50 rounded-xl p-4 border border-shell-gray-100">
              <pre className="text-sm text-shell-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{selected.body}</pre>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => handleCopy(selected.body)} className={`btn-primary ${copied ? 'bg-green-500 text-white hover:bg-green-600' : ''}`}>
                <Copy size={14} />
                {copied ? 'Copiado' : 'Copiar texto'}
              </button>
              {selected.status === 'draft' && (
                <button onClick={() => { markEmailSent(selected.id); setSelected(null); }} className="btn-secondary">
                  <CheckCircle size={14} />
                  Marcar como enviado
                </button>
              )}
              {selected.opportunityId && (
                <button onClick={() => { setSelected(null); navigate(`/opportunities/${selected.opportunityId}`); }} className="btn-secondary">
                  <ExternalLink size={14} />
                  Ver oportunidad
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
