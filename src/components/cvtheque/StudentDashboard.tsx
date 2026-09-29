'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ShareCVModal } from './ShareCVModal';
import { useToast } from '@/components/ui/Toaster';

// Mock data for student's CV and sharing history
const myCV = {
  id: 'demo',
  name: 'Yassine El Amrani',
  title: 'Ingénieur Développeur Web',
  profileUrl: '/cv-theque/demo',
};
const sharingHistory = [
  {
    company: 'Marjane',
    date: '2025-06-01',
    status: 'Vu',
  },
  {
    company: 'Attijariwafa Bank',
    date: '2025-06-02',
    status: 'En attente',
  },
];

export const StudentDashboard = () => {
  const [shareOpen, setShareOpen] = useState(false);
  const { toast } = useToast();
  
  const handleShare = (companyId: string) => {
    setShareOpen(false);
    toast({
      title: 'CV Partagé',
      description: `Votre CV a été partagé avec ${companyId}!`,
      variant: 'success'
    });
    // Here you would call an API to share the CV
  };
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Tableau de bord Étudiant</h1>
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Mon CV</h2>
        <div className="flex items-center gap-4 mb-4">
          <span className="font-bold">{myCV.name}</span>
          <span className="text-gray-500">{myCV.title}</span>
          <Link href={myCV.profileUrl} className="btn btn-outline btn-sm">Voir le profil</Link>
          <Link href="/cv-theque/edit" className="btn btn-primary btn-sm">Modifier</Link>
          <Button variant="secondary" size="sm" onClick={() => setShareOpen(true)}>Partager mon CV</Button>
        </div>
        <ShareCVModal open={shareOpen} onClose={() => setShareOpen(false)} onShare={handleShare} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Historique de partage</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Entreprise</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Statut</th>
              </tr>
            </thead>
            <tbody>
              {sharingHistory.map((entry, i) => (
                <tr key={i} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-2">{entry.company}</td>
                  <td className="px-4 py-2">{entry.date}</td>
                  <td className="px-4 py-2">{entry.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
