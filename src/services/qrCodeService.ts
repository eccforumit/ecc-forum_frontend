'use client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';

export interface QrCodeData {
  profile_url?: string;
  cv_url?: string;
  qr_code_url: string;
  qr_code_png: string;
  student_name: string;
  cv_available?: boolean;
}

export interface QrCodeResponse {
  success: boolean;
  data: QrCodeData;
  message?: string;
}

class QrCodeService {
  private getAuthHeaders(): HeadersInit {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  }

    async generateMyQrCode(type: 'profile' | 'cv'): Promise<QrCodeData> {
        const response = await fetch(`${API_BASE_URL}/me/qr-code`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify({ type })
        });

        const result: QrCodeResponse = await response.json();

        if (!result.success) {
            throw new Error(result.message || 'Erreur lors de la génération du QR code');
        }

        return result.data;
    }  async generateStudentQrCode(studentId: string, type: 'profile' | 'cv'): Promise<QrCodeData> {
    const response = await fetch(`${API_BASE_URL}/qr-code/student/${studentId}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ type })
    });

    const result: QrCodeResponse = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Erreur lors de la génération du QR code');
    }

    return result.data;
  }

  generateQrCodeDataUrl(qrCodePng: string): string {
    return `data:image/png;base64,${qrCodePng}`;
  }
}

export const qrCodeService = new QrCodeService();
