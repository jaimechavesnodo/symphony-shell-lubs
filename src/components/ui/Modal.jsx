import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, size = 'md', noPadding = false }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeMap = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
    full: 'max-w-full mx-4',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-shell-gray-800/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-modal w-full ${sizeMap[size]} max-h-[90vh] flex flex-col animate-fade-in`}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-shell-gray-100">
            <h2 className="text-base font-semibold text-shell-gray-800">{title}</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-shell-gray-100 flex items-center justify-center text-shell-gray-400 hover:text-shell-gray-700 transition-colors">
              <X size={16} />
            </button>
          </div>
        )}
        {!title && (
          <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-shell-gray-100 hover:bg-shell-gray-200 flex items-center justify-center text-shell-gray-400 hover:text-shell-gray-700 transition-colors">
            <X size={16} />
          </button>
        )}
        <div className={`overflow-y-auto flex-1 ${noPadding ? '' : 'p-6'}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
