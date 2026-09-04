import React from 'react';
import { Button } from '@/components/ui/Button';

interface AuthTypeModalProps {
  mode: 'signin' | 'signup';
  onSelect: (type: 'company' | 'individual') => void;
  onClose: () => void;
}

export const AuthTypeModal: React.FC<AuthTypeModalProps> = ({ mode, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 max-w-sm w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          onClick={onClose}
          aria-label="Fermer"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-6 text-center">
          {mode === 'signup' ? 'Choisissez votre type d\'inscription' : 'Choisissez votre type de connexion'}
        </h2>
        <div className="flex flex-col gap-4">
          <Button variant="primary" onClick={() => onSelect('individual')}>
            Particulier
          </Button>
          <Button variant="outline" onClick={() => onSelect('company')}>
            Entreprise
          </Button>
        </div>
      </div>
    </div>
  );
};
