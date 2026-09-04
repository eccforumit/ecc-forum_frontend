import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

// Mock companies list
const companies = [
  { id: 'marjane', name: 'Marjane' },
  { id: 'attijariwafa', name: 'Attijariwafa Bank' },
  { id: 'danone', name: 'Danone' },
  { id: 'nareva', name: 'Nareva Holding' },
];

interface ShareCVModalProps {
  open: boolean;
  onClose: () => void;
  onShare: (companyId: string) => void;
}

export const ShareCVModal: React.FC<ShareCVModalProps> = ({ open, onClose, onShare }) => {
  const [selected, setSelected] = useState('');
  if (!open) return null;
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
        <h2 className="text-xl font-bold mb-6 text-center">Partager mon CV avec une entreprise</h2>
        <select
          className="w-full mb-4 px-3 py-2 border rounded"
          value={selected}
          onChange={e => setSelected(e.target.value)}
        >
          <option value="">Sélectionner une entreprise</option>
          {companies.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <Button
          variant="primary"
          className="w-full"
          disabled={!selected}
          onClick={() => selected && onShare(selected)}
        >
          Partager
        </Button>
      </div>
    </div>
  );
};
