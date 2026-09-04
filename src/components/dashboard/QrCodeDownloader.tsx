'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { qrCodeDownloadService } from '@/services/qrCodeDownloadService';
import { FaDownload, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

interface QrCodeDownloaderProps {
  className?: string;
  buttonText?: string;
  buttonVariant?: 'primary' | 'secondary' | 'outline';
}

export const QrCodeDownloader: React.FC<QrCodeDownloaderProps> = ({
  className = '',
  buttonText = 'Télécharger tous les QR codes ECC',
  buttonVariant = 'primary',
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    setProgress(0);
    setProgressMessage('');
    setError(null);
    setSuccess(false);

    try {
      await qrCodeDownloadService.downloadAllEccQrCodes(
        (message: string, percentage: number) => {
          setProgressMessage(message);
          setProgress(percentage);
        }
      );

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsDownloading(false);
      }, 3000);
    } catch (err) {
      console.error('Erreur lors du téléchargement:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Une erreur est survenue lors du téléchargement'
      );
      setTimeout(() => {
        setError(null);
        setIsDownloading(false);
      }, 5000);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Button
        onClick={handleDownload}
        disabled={isDownloading}
        variant={buttonVariant}
        className="w-full relative"
        leftIcon={
          isDownloading ? (
            <FaSpinner className="animate-spin" />
          ) : success ? (
            <FaCheckCircle />
          ) : error ? (
            <FaExclamationTriangle />
          ) : (
            <FaDownload />
          )
        }
      >
        {isDownloading
          ? 'Téléchargement en cours...'
          : success
          ? 'Téléchargement terminé !'
          : error
          ? 'Erreur de téléchargement'
          : buttonText}
      </Button>

      {/* Barre de progression */}
      {isDownloading && (
        <div className="space-y-2">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-primary h-2.5 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {progressMessage}
            </span>
            <span className="font-semibold text-primary">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-start">
            <FaExclamationTriangle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">
                Erreur
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Message de succès */}
      {success && (
        <div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-start">
            <FaCheckCircle className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-1">
                Succès
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Les QR codes ont été téléchargés avec succès !
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Informations */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="text-sm text-blue-700 dark:text-blue-300">
          <p className="font-semibold mb-2">📦 Structure du ZIP :</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>
              <span className="font-medium">Cycle_Ingenieur.zip</span>
              <ul className="list-circle list-inside ml-4 mt-1 text-xs">
                <li>1A.zip, 2A.zip, 3A.zip, Cesure.zip</li>
                <li>Laureat.zip, Futur_diplome.zip</li>
              </ul>
            </li>
            <li>
              <span className="font-medium">Cycle_Bachelor.zip</span>
              <ul className="list-circle list-inside ml-4 mt-1 text-xs">
                <li>1A.zip, 2A.zip, 3A.zip, 4A.zip</li>
                <li>Laureat.zip, Futur_diplome.zip</li>
              </ul>
            </li>
          </ul>
          <p className="mt-3 text-xs">
            Chaque fichier QR code est nommé : <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">Prenom_Nom.png</code>
          </p>
        </div>
      </div>
    </div>
  );
};
