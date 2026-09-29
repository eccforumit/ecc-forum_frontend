'use client';

import Image from 'next/image';
import { StudentCV } from '@/services/cvService';
import { Button } from '@/components/ui/Button';
import { FaDownload, FaQrcode } from 'react-icons/fa';

interface CvViewerProps {
  cv: StudentCV;
  onClose: () => void;
  onGenerateQR: () => void;
}

export function CvViewer({ cv, onClose, onGenerateQR }: CvViewerProps) {
  const downloadCV = () => {
    if (cv.profileUrl) {
      window.open(cv.profileUrl, '_blank');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Aperçu du CV</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={onGenerateQR}
            leftIcon={<FaQrcode />}
          >
            QR Code
          </Button>
          <Button
            variant="primary"
            onClick={downloadCV}
            leftIcon={<FaDownload />}
            disabled={!cv.profileUrl}
          >
            Voir CV complet
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
          >
            Fermer
          </Button>
        </div>
      </div>

      {/* En-tête du CV */}
      <div className="border-b pb-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            {cv.profileImageUrl && (
              <Image
                src={cv.profileImageUrl}
                alt={cv.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {cv.firstName} {cv.lastName}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">{cv.title}</p>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                <p>{cv.email}</p>
                {cv.phone && <p>{cv.phone}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Informations académiques */}
      {(cv.school || cv.major || cv.schoolYear) && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Formation actuelle
          </h3>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            {cv.school && <p><strong>École:</strong> {cv.school}</p>}
            {cv.major && <p><strong>Filière:</strong> {cv.major}</p>}
            {cv.schoolYear && <p><strong>Année:</strong> {cv.schoolYear}</p>}
          </div>
        </div>
      )}

      {/* Résumé */}
      {cv.summary && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Résumé professionnel
          </h3>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">{cv.summary}</p>
          </div>
        </div>
      )}

      {/* Compétences */}
      {cv.skills && cv.skills.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Compétences
          </h3>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex flex-wrap gap-2">
              {cv.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {skill.name}
                  {skill.level && ` (${skill.level})`}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Informations de création */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8 pt-4 border-t">
        <p>CV créé le {new Date(cv.createdAt).toLocaleDateString('fr-FR')}</p>
        {cv.profileUrl && (
          <p className="mt-1">
            <a 
              href={cv.profileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
            >
              Voir la version complète →
            </a>
          </p>
        )}
      </div>
    </div>
  );
}