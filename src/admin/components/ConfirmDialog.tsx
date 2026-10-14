import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isDestructive = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#121622] border border-gold/20 rounded-2xl shadow-2xl overflow-hidden p-6 text-ivory animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-ivory/50 hover:text-ivory transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${isDestructive ? 'bg-red-500/10 text-red-400' : 'bg-gold/10 text-gold'}`}>
            <AlertTriangle size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-serif font-bold text-ivory mb-2">{title}</h3>
            <p className="text-sm text-ivory/70 leading-relaxed mb-6">{message}</p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 rounded-lg border border-ivory/20 text-ivory/80 text-sm font-medium hover:bg-white/5 transition-colors"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isDestructive
                    ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20'
                    : 'bg-gold hover:bg-gold/90 text-midnight font-bold shadow-lg shadow-gold/20'
                }`}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
