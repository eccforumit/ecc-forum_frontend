'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { studentService } from '@/services/studentService';
import { StudentProfile } from '@/types/auth';
import { useToast } from '@/components/ui/Toaster';
import { FaFileUpload, FaFilePdf, FaTrash } from 'react-icons/fa';

interface CvUploadFormProps {
  currentProfile: StudentProfile;
  onSuccess: (updatedProfile: StudentProfile) => void;
  onCancel: () => void;
}

export function CvUploadForm({ currentProfile, onSuccess, onCancel }: CvUploadFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    if (file.type !== 'application/pdf') {
      const errorMsg = 'Veuillez sélectionner un fichier PDF uniquement.';
      setError(errorMsg);
      toast({
        title: "Format de fichier invalide",
        description: errorMsg,
        variant: "error",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      const errorMsg = 'Le fichier ne doit pas dépasser 10MB.';
      setError(errorMsg);
      toast({
        title: "Fichier trop volumineux",
        description: errorMsg,
        variant: "error",
      });
      return;
    }

    setSelectedFile(file);
    setError('');
    
    // Toast de confirmation de sélection
    toast({
      title: "Fichier sélectionné",
      description: `${file.name} (${formatFileSize(file.size)}) prêt à être uploadé.`,
      variant: "info",
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Veuillez sélectionner un fichier PDF.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('cv_file', selectedFile);

      const updatedProfile = await studentService.updateMyProfile(formData);
      
      // Afficher le toast de succès
      toast({
        title: "CV uploadé avec succès !",
        description: "Votre CV a été enregistré et est maintenant disponible pour les entreprises.",
        variant: "success",
      });

      onSuccess(updatedProfile);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'upload du CV';
      setError(errorMessage);
      
      // Afficher le toast d'erreur
      toast({
        title: "Erreur d'upload",
        description: errorMessage,
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Toast de confirmation de suppression
    toast({
      title: "Fichier retiré",
      description: "Le fichier sélectionné a été retiré. Vous pouvez en choisir un autre.",
      variant: "info",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {currentProfile.cv_file_url ? 'Remplacer votre CV' : 'Ajouter votre CV'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Uploadez votre CV au format PDF pour le partager avec les entreprises
        </p>
      </div>

      {/* Affichage du CV actuel s'il existe */}
      {currentProfile.cv_file_url && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-3">
            <FaFilePdf className="text-green-600 text-2xl" />
            <div className="flex-1">
              <p className="text-green-800 dark:text-green-200 font-medium">
                CV actuel disponible
              </p>
              <p className="text-green-600 dark:text-green-400 text-sm">
                Vous pouvez visualiser ou remplacer votre CV existant
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.open(currentProfile.cv_file_url!, '_blank');
                toast({
                  title: "CV ouvert",
                  description: "Votre CV s'ouvre dans un nouvel onglet.",
                  variant: "info",
                });
              }}
              className="text-green-600 border-green-300 hover:bg-green-100 dark:hover:bg-green-900/40"
            >
              Voir le CV
            </Button>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Zone de drag & drop */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${dragOver 
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {selectedFile ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <FaFilePdf className="text-red-500 text-3xl" />
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900 dark:text-white">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemoveFile}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <FaFileUpload className="mx-auto text-4xl text-gray-400" />
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Glissez-déposez votre CV ici
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                ou cliquez pour sélectionner un fichier
              </p>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                leftIcon={<FaFileUpload />}
              >
                Choisir un fichier PDF
              </Button>
            </div>
            <p className="text-xs text-gray-400">
              Format accepté : PDF uniquement • Taille max : 10MB
            </p>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Boutons d'action */}
      <div className="flex justify-end space-x-4 mt-8">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Annuler
        </Button>
        
        <Button
          variant="primary"
          onClick={handleUpload}
          disabled={isLoading || !selectedFile}
          leftIcon={<FaFileUpload />}
        >
          {isLoading ? 'Upload en cours...' : 'Enregistrer le CV'}
        </Button>
      </div>
    </div>
  );
}