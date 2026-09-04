import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

// Mock data for received CVs
const receivedCVs = [
  {
    id: 'demo',
    name: 'Yassine El Amrani',
    email: 'yassine@example.com',
    title: 'Ingénieur Développeur Web',
    profileUrl: '/cv-theque/demo',
  },
  {
    id: 'demo2',
    name: 'Sara Benali',
    email: 'sara@example.com',
    title: 'Data Scientist',
    profileUrl: '/cv-theque/demo2',
  },
];

// Mock data for students who shared their CV
const sharedCVs = [
  {
    id: 'demo',
    name: 'Yassine El Amrani',
    email: 'yassine@example.com',
    title: 'Ingénieur Développeur Web',
    profileUrl: '/cv-theque/demo',
    sharedAt: '2025-06-01',
  },
  {
    id: 'demo2',
    name: 'Sara Benali',
    email: 'sara@example.com',
    title: 'Data Scientist',
    profileUrl: '/cv-theque/demo2',
    sharedAt: '2025-06-02',
  },
];

export const CompanyDashboard = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Tableau de bord Entreprise</h1>
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">CVs reçus</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Titre</th>
                <th className="px-4 py-2 text-left">Profil</th>
              </tr>
            </thead>
            <tbody>
              {receivedCVs.map((cv) => (
                <tr key={cv.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-2">{cv.name}</td>
                  <td className="px-4 py-2">{cv.email}</td>
                  <td className="px-4 py-2">{cv.title}</td>
                  <td className="px-4 py-2">
                    <Link href={cv.profileUrl} className="btn btn-outline btn-sm">Voir</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Gérer le profil entreprise</h2>
        <Link href="/entreprise/profile/edit">
          <Button variant="primary">Modifier le profil</Button>
        </Link>
      </div>
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Gérer les opportunités</h2>
        <Link href="/entreprise/opportunities">
          <Button variant="primary">Gérer les offres d&apos;emploi</Button>
        </Link>
      </div>
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">CVs partagés avec votre entreprise</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Titre</th>
                <th className="px-4 py-2 text-left">Date de partage</th>
                <th className="px-4 py-2 text-left">Profil</th>
              </tr>
            </thead>
            <tbody>
              {sharedCVs.map((cv) => (
                <tr key={cv.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-2">{cv.name}</td>
                  <td className="px-4 py-2">{cv.email}</td>
                  <td className="px-4 py-2">{cv.title}</td>
                  <td className="px-4 py-2">{cv.sharedAt}</td>
                  <td className="px-4 py-2">
                    <Link href={cv.profileUrl} className="btn btn-outline btn-sm">Voir</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
