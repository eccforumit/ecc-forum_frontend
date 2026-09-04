'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { qrCodeService, QrCodeData } from '@/services/qrCodeService';
import { FaDownload, FaCopy, FaSpinner } from 'react-icons/fa';

interface QrCodeDisplayProps {
  cvUrl: string;
  studentName: string;
  onClose: () => void;
}

export function QrCodeDisplay({ cvUrl, studentName, onClose }: QrCodeDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [qrData, setQrData] = useState<QrCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const generateQrCode = async () => {
      try {
        setLoading(true);
        const data = await qrCodeService.generateMyQrCode('cv');
        setQrData(data);
      } catch {
        setError('Erreur lors de la génération du QR code');
      } finally {
        setLoading(false);
      }
    };

    generateQrCode();
  }, []);

  const copyToClipboard = async () => {
    if (!qrData) return;
    
    try {
      await navigator.clipboard.writeText(qrData.cv_url || cvUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
    }
  };

  const downloadQRCode = () => {
    if (!qrData) return;

    const link = document.createElement('a');
    link.href = qrCodeService.generateQrCodeDataUrl(qrData.qr_code_png);
    link.download = `QR_Code_CV_${studentName.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p>Génération du QR code...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
        </div>
      </div>
    );
  }

  if (!qrData) return null;

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">QR Code de votre CV</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Partagez ce QR code pour que les recruteurs puissent accéder directement à votre CV.
        </p>

        <div className="bg-white p-4 rounded-lg inline-block mb-6 border">
          <Image
            src={qrCodeService.generateQrCodeDataUrl(qrData.qr_code_png)}
            alt={`QR Code CV pour ${studentName}`}
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-6">
          <p className="text-sm font-medium mb-2">Lien du CV:</p>
          <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded border">
            <span className="text-sm text-gray-600 dark:text-gray-300 truncate flex-1">
              {qrData.cv_url}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              leftIcon={<FaCopy />}
              className="ml-2"
            >
              {copied ? 'Copié !' : 'Copier'}
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6 text-left">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            Comment utiliser ce QR code :
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Ajoutez-le sur votre CV papier</li>
            <li>• Utilisez-le sur votre carte de visite</li>
            <li>• Partagez-le lors d&apos;événements de networking</li>
            <li>• Intégrez-le dans vos présentations</li>
          </ul>
        </div>

        <div className="flex space-x-3">
          <Button
            variant="primary"
            onClick={downloadQRCode}
            leftIcon={<FaDownload />}
            className="flex-1"
          >
            Télécharger
          </Button>
          
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Fermer
          </Button>
        </div>

        {/* <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          Le QR code pointe directement vers votre CV sur Cloudinary.
        </p> */}
      </div>
    </div>
  );
}