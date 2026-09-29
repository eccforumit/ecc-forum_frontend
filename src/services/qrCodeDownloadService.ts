'use client';

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { api } from '@/lib/api';

interface StudentQrCode {
  id: number;
  first_name: string;
  last_name: string;
  qr_code_url: string;
  profile_image_url: string;
}

interface QrCodeData {
  Ingenieur: {
    [year: string]: StudentQrCode[];
  };
  Bachelor: {
    [year: string]: StudentQrCode[];
  };
}

interface QrCodeResponse {
  success: boolean;
  data: QrCodeData;
  total: number;
}

class QrCodeDownloadService {
  /**
   * Récupère tous les QR codes des étudiants ECC
   */
  async getAllEccQrCodes(): Promise<QrCodeData> {
    try {
      const response = await api.get<QrCodeResponse>('/qr-codes/ecc/all');
      
      if (!response.data.success) {
        throw new Error('Échec de la récupération des QR codes');
      }

      return response.data.data;
    } catch (error) {
      console.error('Erreur API getAllEccQrCodes:', error);
      throw new Error('Erreur lors de la récupération des QR codes');
    }
  }

  /**
   * Télécharge une image depuis une URL et la retourne en Blob
   */
  private async downloadImage(url: string): Promise<Blob> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur lors du téléchargement de l'image: ${url}`);
    }
    return await response.blob();
  }

  /**
   * Nettoie le nom de fichier (enlève les caractères spéciaux)
   */
  private sanitizeFileName(name: string): string {
    return name
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
  }

  /**
   * Convertit l'année d'étude en nom de dossier
   */
  private getYearFolderName(year: string): string {
    const yearMap: { [key: string]: string } = {
      '1': '1A',
      '2': '2A',
      '3': '3A',
      '4': '4A',
      'Cesure': 'Cesure',
      'Laureat': 'Laureat',
      'Futur_diplome': 'Futur_diplome',
    };
    return yearMap[year] || year;
  }

  /**
   * Crée un ZIP pour une année d'étude spécifique
   */
  private async createYearZip(
    students: StudentQrCode[],
    yearName: string,
    onProgress?: (current: number, total: number) => void
  ): Promise<Blob> {
    const zip = new JSZip();
    const total = students.length;

    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      
      if (onProgress) {
        onProgress(i + 1, total);
      }

      if (!student.qr_code_url) {
        console.warn(`QR code manquant pour ${student.first_name} ${student.last_name}`);
        continue;
      }

      try {
        const imageBlob = await this.downloadImage(student.qr_code_url);
        const fileName = `${this.sanitizeFileName(student.first_name)}_${this.sanitizeFileName(student.last_name)}.png`;
        zip.file(fileName, imageBlob);
      } catch (error) {
        console.error(`Erreur lors du téléchargement du QR code pour ${student.first_name} ${student.last_name}:`, error);
      }
    }

    return await zip.generateAsync({ type: 'blob' });
  }

  /**
   * Crée un ZIP pour un cursus (Ingénieur ou Bachelor)
   */
  private async createMajorZip(
    majorData: { [year: string]: StudentQrCode[] },
    majorName: string,
    onProgress?: (message: string, current: number, total: number) => void
  ): Promise<Blob> {
    const zip = new JSZip();
    const years = Object.keys(majorData);
    const totalYears = years.length;

    for (let i = 0; i < years.length; i++) {
      const year = years[i];
      const students = majorData[year];
      const yearFolderName = this.getYearFolderName(year);

      if (students.length === 0) continue;

      if (onProgress) {
        onProgress(`${majorName} - ${yearFolderName}`, i + 1, totalYears);
      }

      try {
        const yearZipBlob = await this.createYearZip(students, yearFolderName);
        zip.file(`${yearFolderName}.zip`, yearZipBlob);
      } catch (error) {
        console.error(`Erreur lors de la création du ZIP pour ${majorName} - ${yearFolderName}:`, error);
      }
    }

    return await zip.generateAsync({ type: 'blob' });
  }

  /**
   * Télécharge tous les QR codes ECC en structure ZIP hiérarchique
   */
  async downloadAllEccQrCodes(
    onProgress?: (message: string, percentage: number) => void
  ): Promise<void> {
    try {
      // Étape 1: Récupération des données
      if (onProgress) onProgress('Récupération des QR codes...', 0);
      const qrCodeData = await this.getAllEccQrCodes();

      // Étape 2: Création du ZIP principal
      const mainZip = new JSZip();
      const date = new Date().toISOString().split('T')[0];

      // Traiter le Cycle Ingénieur
      if (onProgress) onProgress('Création du ZIP Cycle Ingénieur...', 20);
      const ingenieurZip = await this.createMajorZip(
        qrCodeData.Ingenieur,
        'Cycle_Ingenieur',
        (msg, current, total) => {
          if (onProgress) {
            const percentage = 20 + (30 * current / total);
            onProgress(msg, percentage);
          }
        }
      );
      mainZip.file('Cycle_Ingenieur.zip', ingenieurZip);

      // Traiter le Cycle Bachelor
      if (onProgress) onProgress('Création du ZIP Cycle Bachelor...', 50);
      const bachelorZip = await this.createMajorZip(
        qrCodeData.Bachelor,
        'Cycle_Bachelor',
        (msg, current, total) => {
          if (onProgress) {
            const percentage = 50 + (30 * current / total);
            onProgress(msg, percentage);
          }
        }
      );
      mainZip.file('Cycle_Bachelor.zip', bachelorZip);

      // Étape 3: Génération et téléchargement du ZIP final
      if (onProgress) onProgress('Génération du fichier final...', 90);
      const finalZipBlob = await mainZip.generateAsync({ 
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      });

      if (onProgress) onProgress('Téléchargement en cours...', 100);
      saveAs(finalZipBlob, `qrcodes_ecc_${date}.zip`);

      if (onProgress) onProgress('Téléchargement terminé !', 100);
    } catch (error) {
      console.error('Erreur lors du téléchargement des QR codes:', error);
      throw error;
    }
  }

  /**
   * Compte le nombre total d'étudiants
   */
  countTotalStudents(data: QrCodeData): number {
    let total = 0;
    
    Object.values(data.Ingenieur).forEach(students => {
      total += students.length;
    });
    
    Object.values(data.Bachelor).forEach(students => {
      total += students.length;
    });
    
    return total;
  }
}

export const qrCodeDownloadService = new QrCodeDownloadService();
