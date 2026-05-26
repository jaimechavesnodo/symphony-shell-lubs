import { useState, useEffect } from 'react';
import { X, Play, Clock, BookOpen, CheckCircle, ChevronRight, Award, RotateCcw } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

function MarkdownText({ text }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;
        // Bold headers with **
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={i} className="font-bold text-shell-gray-800 mt-3">{line.replace(/\*\*/g, '')}</p>;
        }
        // Table rows
        if (line.startsWith('|')) {
          const cells = line.split('|').filter(c => c.trim() && c.trim() !== '---');
          if (cells.length === 0) return null;
          return (
            <div key={i} className="flex gap-0">
              {cells.map((cell, ci) => (
                <div key={ci} className={`flex-1 text-xs px-2 py-1 border border-shell-gray-200 ${i === 0 ? 'font-semibold bg-shell-gray-50' : ''}`}>
                  {cell.trim()}
                </div>
              ))}
            </div>
          );
        }
        // Bullet points
        if (line.startsWith('- ') || line.startsWith('• ')) {
          const content = line.replace(/^[-•]\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          return (
            <div key={i} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-shell-yellow mt-1.5 shrink-0" />
              <p className="text-sm text-shell-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          );
        }
        // Numbered list
        if (/^\d+\./.test(line)) {
          const content = line.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          const num = line.match(/^(\d+)/)?.[1];
          return (
            <div key={i} className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-shell-yellow flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-shell-gray-800">{num}</span>
              </div>
              <p className="text-sm text-shell-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          );
        }
        // Normal paragraph with **bold** support
        const content = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return <p key={i} className="text-sm text-shell-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />;
      })}
    </div>
  );
}

function VideoPlayer({ videoId, title }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div
      className="relative w-full bg-shell-gray-800 rounded-xl overflow-hidden cursor-pointer group"
      style={{ paddingBottom: '56.25%' }}
      onClick={() => setPlaying(true)}
    >
      {!playing ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-shell-gray-700 to-shell-gray-800" />
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-shell-yellow/90 flex items-center justify-center group-hover:bg-shell-yellow transition-colors shadow-lg">
              <Play size={24} className="text-shell-gray-800 ml-1" fill="currentColor" />
            </div>
            <div className="text-center px-4">
              <p className="text-white font-semibold text-sm">{title}</p>
              <p className="text-shell-gray-400 text-xs mt-1">Haz clic para reproducir</p>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-shell-gray-500 text-xs">
            <Play size={10} />
            <span>Video de capacitación Shell</span>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-shell-gray-900">
          <div className="text-center text-white">
            <div className="w-12 h-12 border-4 border-shell-yellow border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-shell-gray-400">Cargando video de capacitación…</p>
            <p className="text-xs text-shell-gray-500 mt-1">Módulo: {title}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CourseModal({ isOpen, onClose, module, content }) {
  const [activeTab, setActiveTab] = useState('lessons');
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab('lessons');
      setSelectedLesson(0);
      setAnswers({});
      setSubmitted(false);
      setScore(null);
    }
  }, [isOpen, module?.id]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !content || !module) return null;

  const lessons = content.lessons || [];
  const questions = content.questions || [];
  const currentLesson = lessons[selectedLesson];

  const handleAnswer = (qId, optIdx, isMultiple) => {
    setAnswers(prev => {
      if (isMultiple) {
        const current = prev[qId] || [];
        return {
          ...prev,
          [qId]: current.includes(optIdx)
            ? current.filter(i => i !== optIdx)
            : [...current, optIdx],
        };
      }
      return { ...prev, [qId]: [optIdx] };
    });
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach(q => {
      const ans = answers[q.id] || [];
      const isCorrect =
        ans.length === q.correct.length &&
        q.correct.every(c => ans.includes(c));
      if (isCorrect) correct++;
    });
    const pct = Math.round((correct / questions.length) * 100);
    setScore({ correct, total: questions.length, pct });
    setSubmitted(true);
  };

  const isAnswerCorrect = (q) => {
    const ans = answers[q.id] || [];
    return ans.length === q.correct.length && q.correct.every(c => ans.includes(c));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-shell-gray-800/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-4xl max-h-[90vh] flex flex-col animate-fade-in">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-shell-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-shell-yellow/20 flex items-center justify-center text-xl">
              {module.icon === 'package' ? '📦' : module.icon === 'git-branch' ? '🔀' : module.icon === 'briefcase' ? '💼' : module.icon === 'shield' ? '🛡️' : module.icon === 'user' ? '👤' : module.icon === 'zap' ? '⚡' : module.icon === 'droplets' ? '💧' : '🎯'}
            </div>
            <div>
              <h2 className="text-sm font-bold text-shell-gray-800">{module.title}</h2>
              <p className="text-[10px] text-shell-gray-400">{module.category} · {module.lessons} lecciones · {module.duration}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-shell-gray-100 flex items-center justify-center text-shell-gray-400">
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-3 pb-0 shrink-0 border-b border-shell-gray-100">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'lessons'
                ? 'border-shell-yellow text-shell-gray-800'
                : 'border-transparent text-shell-gray-400 hover:text-shell-gray-600'
            }`}
          >
            <BookOpen size={13} /> Lecciones ({lessons.length})
          </button>
          <button
            onClick={() => setActiveTab('eval')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'eval'
                ? 'border-shell-yellow text-shell-gray-800'
                : 'border-transparent text-shell-gray-400 hover:text-shell-gray-600'
            }`}
          >
            <CheckCircle size={13} /> Evaluación ({questions.length} preguntas)
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">

          {/* ─── LESSONS TAB ─────────────────────────────────────────────── */}
          {activeTab === 'lessons' && (
            <div className="flex w-full overflow-hidden">
              {/* Lesson list sidebar */}
              <div className="w-52 shrink-0 border-r border-shell-gray-100 overflow-y-auto p-3 bg-shell-gray-50">
                <p className="text-[10px] font-bold text-shell-gray-400 uppercase tracking-wide px-2 mb-2">Contenido</p>
                {lessons.map((lesson, idx) => (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLesson(idx)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl mb-1 transition-all ${
                      selectedLesson === idx
                        ? 'bg-shell-yellow-light border border-shell-yellow/50'
                        : 'hover:bg-white border border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold ${
                        selectedLesson === idx ? 'bg-shell-yellow text-shell-gray-800' : 'bg-shell-gray-200 text-shell-gray-500'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-[11px] font-semibold leading-tight ${selectedLesson === idx ? 'text-shell-gray-800' : 'text-shell-gray-600'}`}>
                          {lesson.title}
                        </p>
                        <p className="text-[10px] text-shell-gray-400 mt-0.5 flex items-center gap-0.5">
                          <Clock size={8} /> {lesson.duration}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Lesson content */}
              <div className="flex-1 overflow-y-auto p-6">
                {currentLesson && (
                  <div className="animate-fade-in">
                    <h3 className="text-base font-bold text-shell-gray-800 mb-1">{currentLesson.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-shell-gray-400 mb-4">
                      <span className="flex items-center gap-1"><Clock size={11} /> {currentLesson.duration}</span>
                      <span>·</span>
                      <span>Lección {selectedLesson + 1} de {lessons.length}</span>
                    </div>

                    {/* Video player */}
                    <div className="mb-6">
                      <VideoPlayer videoId={currentLesson.videoId} title={currentLesson.title} />
                    </div>

                    {/* Lesson text */}
                    <div className="bg-shell-gray-50 rounded-xl p-5 border border-shell-gray-100">
                      <MarkdownText text={currentLesson.content} />
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between mt-5">
                      <button
                        onClick={() => setSelectedLesson(Math.max(0, selectedLesson - 1))}
                        disabled={selectedLesson === 0}
                        className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                      >
                        ← Anterior
                      </button>
                      {selectedLesson < lessons.length - 1 ? (
                        <button
                          onClick={() => setSelectedLesson(selectedLesson + 1)}
                          className="btn-primary text-xs"
                        >
                          Siguiente <ChevronRight size={13} />
                        </button>
                      ) : (
                        <button
                          onClick={() => setActiveTab('eval')}
                          className="btn-primary bg-green-600 text-white hover:bg-green-700 text-xs"
                        >
                          Ir a evaluación <CheckCircle size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── EVALUATION TAB ──────────────────────────────────────────── */}
          {activeTab === 'eval' && (
            <div className="flex-1 overflow-y-auto p-6">
              {!submitted ? (
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-base font-bold text-shell-gray-800">Evaluación final</h3>
                      <p className="text-xs text-shell-gray-400 mt-0.5">{questions.length} preguntas · Selección simple o múltiple</p>
                    </div>
                    <div className="text-right text-xs text-shell-gray-400">
                      Respondidas: <span className="font-bold text-shell-gray-700">{Object.keys(answers).length}/{questions.length}</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {questions.map((q, qi) => (
                      <div key={q.id} className="bg-white border border-shell-gray-100 rounded-xl p-5 shadow-card">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-6 h-6 rounded-full bg-shell-yellow flex items-center justify-center shrink-0">
                            <span className="text-[11px] font-bold text-shell-gray-800">{qi + 1}</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-shell-gray-800 leading-snug">{q.question}</p>
                            <p className="text-[10px] text-shell-gray-400 mt-0.5">
                              {q.type === 'multiple' ? '📋 Selección múltiple — marca todas las correctas' : '🔘 Selección única'}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2 ml-9">
                          {q.options.map((opt, oi) => {
                            const selected = (answers[q.id] || []).includes(oi);
                            return (
                              <button
                                key={oi}
                                onClick={() => handleAnswer(q.id, oi, q.type === 'multiple')}
                                className={`w-full text-left flex items-start gap-2.5 px-3 py-2.5 rounded-lg border-2 transition-all text-xs ${
                                  selected
                                    ? 'border-shell-yellow bg-shell-yellow-light text-shell-gray-800 font-medium'
                                    : 'border-shell-gray-100 bg-shell-gray-50 text-shell-gray-600 hover:border-shell-gray-200 hover:bg-white'
                                }`}
                              >
                                <div className={`w-4 h-4 rounded${q.type === 'multiple' ? '' : '-full'} border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                                  selected ? 'border-shell-yellow bg-shell-yellow' : 'border-shell-gray-300'
                                }`}>
                                  {selected && <div className={`bg-shell-gray-800 ${q.type === 'multiple' ? 'w-2 h-2 rounded-sm' : 'w-2 h-2 rounded-full'}`} />}
                                </div>
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleSubmit}
                      disabled={Object.keys(answers).length < questions.length}
                      className={`btn-primary px-6 py-3 text-sm ${Object.keys(answers).length < questions.length ? 'opacity-40 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                    >
                      <CheckCircle size={15} />
                      Enviar evaluación ({Object.keys(answers).length}/{questions.length})
                    </button>
                  </div>
                </div>
              ) : (
                /* Results */
                <div className="animate-fade-in">
                  {/* Score card */}
                  <div className={`rounded-2xl p-6 text-center mb-6 ${score.pct >= 70 ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
                    <div className="text-5xl font-bold mb-2" style={{ color: score.pct >= 70 ? '#16a34a' : '#DD1D21' }}>
                      {score.pct}%
                    </div>
                    <p className="font-semibold text-shell-gray-700">{score.correct} de {score.total} respuestas correctas</p>
                    {score.pct >= 70 ? (
                      <div className="flex items-center justify-center gap-2 mt-2 text-green-600">
                        <Award size={16} />
                        <span className="text-sm font-semibold">¡Evaluación aprobada!</span>
                      </div>
                    ) : (
                      <p className="text-sm text-shell-red mt-1">Necesitas 70% para aprobar. ¡Repasa las lecciones e intenta de nuevo!</p>
                    )}
                  </div>

                  {/* Question review */}
                  <h4 className="text-sm font-bold text-shell-gray-700 mb-3">Revisión de respuestas</h4>
                  <div className="space-y-4">
                    {questions.map((q, qi) => {
                      const correct = isAnswerCorrect(q);
                      return (
                        <div key={q.id} className={`rounded-xl p-4 border ${correct ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                          <div className="flex items-start gap-2 mb-2">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${correct ? 'bg-green-500' : 'bg-shell-red'}`}>
                              {correct ? <span className="text-white text-[10px]">✓</span> : <span className="text-white text-[10px]">✗</span>}
                            </div>
                            <p className="text-xs font-semibold text-shell-gray-800">{q.question}</p>
                          </div>
                          <div className="ml-7 space-y-1">
                            {q.options.map((opt, oi) => {
                              const wasSelected = (answers[q.id] || []).includes(oi);
                              const isCorrect = q.correct.includes(oi);
                              return (
                                <div key={oi} className={`text-xs px-2 py-1 rounded flex items-center gap-1.5 ${
                                  isCorrect ? 'text-green-700 font-semibold' : wasSelected && !isCorrect ? 'text-shell-red' : 'text-shell-gray-400'
                                }`}>
                                  {isCorrect ? '✓ ' : wasSelected && !isCorrect ? '✗ ' : '  '}{opt}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-3 mt-5 justify-end">
                    <button
                      onClick={() => { setAnswers({}); setSubmitted(false); setScore(null); }}
                      className="btn-secondary text-xs"
                    >
                      <RotateCcw size={13} /> Intentar de nuevo
                    </button>
                    <button onClick={onClose} className="btn-primary text-xs">
                      Cerrar <X size={13} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
