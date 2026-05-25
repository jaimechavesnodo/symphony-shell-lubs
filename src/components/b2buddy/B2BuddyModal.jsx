import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2, Check, X, ChevronRight, Calendar, Mail, Tag, Volume2, Zap } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { demoTranscription, demoResult } from '../../data/mockData';
import VoiceWave from './VoiceWave';
import B2BuddyAvatar from './B2BuddyAvatar';

// States: idle | recording | processing | results | applied
export default function B2BuddyModal({ isOpen, onClose }) {
  const [phase, setPhase] = useState('idle');
  const [transcript, setTranscript] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [applied, setApplied] = useState(false);
  const intervalRef = useRef(null);
  const { applyDemoChanges, currentUser } = useAppStore();

  const userName = currentUser?.name?.split(' ')[0] || 'Carlos';

  useEffect(() => {
    if (!isOpen) {
      setPhase('idle');
      setTranscript('');
      setCharIndex(0);
      setApplied(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [isOpen]);

  // Typewriter effect during recording
  useEffect(() => {
    if (phase !== 'recording') {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setCharIndex((prev) => {
        const next = prev + 1;
        setTranscript(demoTranscription.slice(0, next));
        if (next >= demoTranscription.length) {
          clearInterval(intervalRef.current);
        }
        return next;
      });
    }, 38);
    return () => clearInterval(intervalRef.current);
  }, [phase]);

  const handleRecord = () => {
    if (phase === 'idle') {
      setTranscript('');
      setCharIndex(0);
      setPhase('recording');
    } else if (phase === 'recording') {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setTranscript(demoTranscription);
      setPhase('processing');
      setTimeout(() => setPhase('results'), 2800);
    }
  };

  const handleApply = () => {
    applyDemoChanges(demoResult);
    setApplied(true);
    setPhase('applied');
  };

  const handleClose = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-shell-gray-800/50 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white w-full sm:max-w-2xl sm:mx-4 rounded-t-3xl sm:rounded-2xl shadow-modal max-h-[92vh] flex flex-col animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-shell-gray-100">
          <B2BuddyAvatar size={44} animated={phase === 'recording'} />
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold text-shell-gray-800">B2Buddy</span>
              <span className="text-[10px] bg-shell-yellow text-shell-gray-700 px-1.5 py-0.5 rounded-full font-semibold">IA</span>
            </div>
            <p className="text-xs text-shell-gray-400">Tu Copiloto Comercial · Powered by NODO</p>
          </div>
          {phase !== 'applied' && (
            <button onClick={handleClose} className="w-8 h-8 rounded-lg hover:bg-shell-gray-100 flex items-center justify-center text-shell-gray-400">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* IDLE */}
          {phase === 'idle' && (
            <div className="animate-fade-in">
              <div className="bg-shell-yellow-light rounded-2xl p-4 mb-4">
                <p className="text-sm text-shell-gray-700 font-medium">
                  👋 Hola {userName}, dime sobre cuál oportunidad hablaremos y qué novedades hay.
                </p>
                <p className="text-xs text-shell-gray-500 mt-1">
                  Puedo actualizar oportunidades, crear tareas, generar correos y agendar eventos en tu calendario.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { icon: Tag, text: 'Actualizar SPANCOP' },
                  { icon: Calendar, text: 'Crear evento' },
                  { icon: Mail, text: 'Generar correo' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="bg-shell-gray-50 rounded-xl p-2.5 text-center">
                    <Icon size={16} className="text-shell-yellow-dark mx-auto mb-1" />
                    <p className="text-[10px] text-shell-gray-500 font-medium">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RECORDING */}
          {phase === 'recording' && (
            <div className="animate-fade-in space-y-4">
              <div className="flex flex-col items-center py-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-shell-red rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-shell-red">GRABANDO</span>
                </div>
                <VoiceWave active={true} />
                <p className="text-xs text-shell-gray-400 mt-2">Habla con naturalidad... B2Buddy está escuchando</p>
              </div>
              {transcript && (
                <div className="bg-shell-gray-50 rounded-xl p-4 border border-shell-gray-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Volume2 size={12} className="text-shell-gray-400" />
                    <span className="text-[10px] font-semibold text-shell-gray-400 uppercase tracking-wide">Transcripción</span>
                  </div>
                  <p className="text-sm text-shell-gray-700 leading-relaxed">{transcript}<span className="animate-pulse">|</span></p>
                </div>
              )}
            </div>
          )}

          {/* PROCESSING */}
          {phase === 'processing' && (
            <div className="flex flex-col items-center py-8 animate-fade-in">
              <div className="relative mb-4">
                <B2BuddyAvatar size={60} />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-shell-yellow rounded-full flex items-center justify-center">
                  <Loader2 size={14} className="text-shell-gray-800 animate-spin" />
                </div>
              </div>
              <p className="text-sm font-semibold text-shell-gray-700 mb-1">B2Buddy está analizando la reunión…</p>
              <p className="text-xs text-shell-gray-400 text-center max-w-xs">
                Identificando oportunidad, extrayendo compromisos, actualizando SPANCOP y generando correo de seguimiento.
              </p>
              <div className="mt-6 w-full max-w-xs space-y-2">
                {['Procesando transcripción...', 'Identificando oportunidad...', 'Extrayendo compromisos...'].map((t, i) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-shell-gray-400">
                    <Loader2 size={12} className="animate-spin text-shell-yellow" style={{ animationDelay: `${i * 0.3}s` }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RESULTS */}
          {phase === 'results' && !applied && (
            <div className="animate-fade-in space-y-4">
              {/* Summary */}
              <div className="bg-shell-yellow-light border border-shell-yellow rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={14} className="text-shell-yellow-dark" />
                  <span className="text-xs font-bold text-shell-gray-700 uppercase tracking-wide">Resumen B2Buddy</span>
                </div>
                <p className="text-sm text-shell-gray-700">{demoResult.summary}</p>
              </div>

              {/* Opportunity */}
              <div className="bg-white border border-shell-gray-200 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-shell-gray-500 uppercase tracking-wide">Oportunidad identificada</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-shell-gray-800">{demoResult.opportunityName}</p>
                    <p className="text-xs text-shell-gray-500">OPP-001 · Shell Rimula R6 M</p>
                  </div>
                  <ChevronRight size={16} className="text-shell-gray-300" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-orange-50 rounded-lg p-2 text-center">
                    <div className="text-[10px] text-shell-gray-400 mb-0.5">Etapa</div>
                    <div className="text-xs font-bold text-orange-600">Approach</div>
                    <div className="text-[10px] text-shell-gray-400">→</div>
                    <div className="text-xs font-bold text-blue-600">Negotiate</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2 text-center">
                    <div className="text-[10px] text-shell-gray-400 mb-0.5">Volumen</div>
                    <div className="text-xs font-bold text-shell-gray-600 line-through">28.000 L</div>
                    <div className="text-xs font-bold text-green-600">42.000 L</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2 text-center">
                    <div className="text-[10px] text-shell-gray-400 mb-0.5">Prob.</div>
                    <div className="text-xs font-bold text-shell-gray-600 line-through">45%</div>
                    <div className="text-xs font-bold text-blue-600">65%</div>
                  </div>
                </div>
              </div>

              {/* Commitments */}
              <div className="bg-white border border-shell-gray-200 rounded-xl p-4">
                <h4 className="text-xs font-bold text-shell-gray-500 uppercase tracking-wide mb-2">Compromisos detectados</h4>
                <div className="space-y-1.5">
                  {demoResult.commitments.map((c, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-shell-gray-700">
                      <div className="w-4 h-4 rounded-full bg-shell-yellow flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[9px] font-bold text-shell-gray-700">{i + 1}</span>
                      </div>
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              {/* Event */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar size={14} className="text-blue-500" />
                  <h4 className="text-xs font-bold text-shell-gray-700">Evento creado en calendario</h4>
                  <span className="text-[9px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-semibold">B2Buddy</span>
                </div>
                <p className="text-sm font-semibold text-shell-gray-700">{demoResult.event.title}</p>
                <p className="text-xs text-shell-gray-500 mt-0.5">
                  {demoResult.event.date} · {demoResult.event.time} a.m. · Visita técnica
                </p>
              </div>

              {/* Email preview */}
              <div className="bg-white border border-shell-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={14} className="text-shell-gray-400" />
                  <h4 className="text-xs font-bold text-shell-gray-500 uppercase tracking-wide">Correo generado</h4>
                </div>
                <p className="text-xs font-semibold text-shell-gray-700">{demoResult.emailSubject}</p>
                <p className="text-xs text-shell-gray-400 mt-1">Para: c.benavides@mineraandina.com.pe</p>
              </div>
            </div>
          )}

          {/* APPLIED */}
          {phase === 'applied' && (
            <div className="flex flex-col items-center py-8 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              <p className="text-base font-bold text-shell-gray-800 mb-2">¡Cambios aplicados!</p>
              <div className="text-xs text-shell-gray-500 text-center space-y-1 max-w-xs">
                <p>✅ Oportunidad actualizada a <strong>Negotiate</strong></p>
                <p>✅ Volumen actualizado a <strong>42.000 L</strong></p>
                <p>✅ Actividad agregada al timeline</p>
                <p>✅ Evento creado: <strong>23 jul, 10:00 a.m.</strong></p>
                <p>✅ Correo generado en bandeja de salida</p>
                <p>✅ Alerta sin contacto resuelta</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 pb-6 pt-4 border-t border-shell-gray-100 flex gap-3">
          {phase === 'idle' && (
            <>
              <button onClick={handleClose} className="btn-secondary flex-1 justify-center">
                Cancelar
              </button>
              <button onClick={handleRecord} className="btn-primary flex-1 justify-center bg-shell-red text-white hover:bg-shell-red-dark">
                <Mic size={16} />
                Iniciar grabación
              </button>
            </>
          )}

          {phase === 'recording' && (
            <>
              <button onClick={handleClose} className="btn-secondary flex-1 justify-center">
                Cancelar
              </button>
              <button onClick={handleRecord} className="flex-1 justify-center bg-shell-red text-white font-semibold px-4 py-2 rounded-lg hover:bg-shell-red-dark flex items-center gap-2 animate-pulse">
                <MicOff size={16} />
                Detener y procesar
              </button>
            </>
          )}

          {phase === 'processing' && (
            <button disabled className="btn-secondary flex-1 justify-center opacity-50 cursor-not-allowed">
              <Loader2 size={16} className="animate-spin" />
              Analizando…
            </button>
          )}

          {phase === 'results' && !applied && (
            <>
              <button onClick={handleClose} className="btn-secondary">
                Cancelar
              </button>
              <button onClick={handleApply} className="btn-primary flex-1 justify-center bg-green-600 text-white hover:bg-green-700">
                <Check size={16} />
                Aplicar cambios
              </button>
            </>
          )}

          {phase === 'applied' && (
            <button onClick={handleClose} className="btn-primary flex-1 justify-center">
              <Check size={16} />
              Listo — Ver dashboard actualizado
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
