'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { studentService } from '@/services/studentService';

import { StudentProfile } from '@/types/auth';
import { Button } from '@/components/ui/Button';
import { ProfileForm } from '@/components/dashboard/ProfileForm';
import { CvUploadForm } from '@/components/dashboard/CvUploadForm';
import { QrCodeDisplay } from '@/components/dashboard/QrCodeDisplay';
import { FaSignOutAlt, FaFileAlt, FaQrcode, FaEye, FaEdit } from 'react-icons/fa';

export default function StudentDashboard() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'dashboard' | 'profile' | 'cv' | 'qr-code'>('dashboard');
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    
    if (!isAuthenticated || !user) {
      router.push('/auth/login/student');
      return;
    }
    
    if (user.user_type !== 'student') {
      router.push('/dashboard/espace-entreprise');
      return;
    }

    const loadStudentProfile = async () => {
      try {
        setProfileLoading(true);
        const profile = await studentService.getMyProfile();
        setStudentProfile(profile);
      } catch {
      } finally {
        setProfileLoading(false);
      }
    };

    loadStudentProfile();
  }, [isAuthenticated, user, isLoading, router]);



  const handleProfileUpdate = (updatedProfile: StudentProfile) => {
    setStudentProfile(updatedProfile);
    setCurrentView('dashboard');
  };

  const handleCvSuccess = (updatedProfile: StudentProfile) => {
    setStudentProfile(updatedProfile);
    setCurrentView('dashboard');
  };

  const handleViewCV = () => {
    if (studentProfile?.cv_file_url) {
      window.open(studentProfile.cv_file_url, '_blank');
    } else {
      alert('Aucun CV disponible. Créez d\'abord votre CV.');
    }
  };

  const handleGenerateQR = () => {
    if (studentProfile?.cv_file_url) {
      setCurrentView('qr-code');
    } else {
      alert('Aucun CV disponible pour générer un QR code.');
    }
  };

  if (isLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-primary-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Chargement de votre espace étudiant...</p>
        </div>
      </div>
    );
  }

  const displayName = studentProfile?.first_name && studentProfile?.last_name 
    ? `${studentProfile.first_name} ${studentProfile.last_name}`
    : studentProfile?.full_name || user?.email || 'Utilisateur';

  const displayEmail = user?.email || '';

  // Modal component for overlays
  const ModalWithTitle = ({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </Button>
        </div>
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-primary to-primary-800 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"></div>
        <div className="absolute top-10 right-1/4 w-40 h-40 rounded-full bg-white/5 blur-2xl"></div>
      </div>

      {/* Header with logout button */}
      <div className="relative z-10 flex justify-between items-center p-4 md:p-6">
        {/* Profile Picture - Top Left */}
        <div className="flex items-center space-x-3 md:space-x-4 min-w-0 flex-1">
          <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
            <Image
              src={studentProfile?.profile_image_url || "/img/default-avatar.png"}
              alt="Profile"
              fill
              sizes="(max-width: 768px) 48px, 64px"
              className="rounded-full object-cover border-2 border-white shadow-lg"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base md:text-lg font-semibold text-white truncate">{displayName}</h2>
            <p className="text-white/80 text-xs md:text-sm truncate">{displayEmail}</p>
          </div>
        </div>

        {/* Logout Button - Top Right */}
        <Button
          onClick={logout}
          variant="outline"
          className="border-white/30 text-white hover:bg-white/10 bg-white/5 px-3 md:px-4"
          leftIcon={<FaSignOutAlt />}
        >
          <span className="hidden sm:inline">Se déconnecter</span>
          <span className="sm:hidden">Déconnexion</span>
        </Button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Student Info Cards - PerformanceSection Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
              Tableau de Bord Étudiant
            </h1>
            <p className="text-lg md:text-xl mb-12 text-center max-w-3xl mx-auto text-white/90">
              Gérez votre profil et accédez à vos documents
            </p>
          </motion.div>

          {/* Info Grid - Similar to PerformanceSection stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              className="flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:bg-white/15 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4 text-white">
                <p className="text-2xl font-bold">
                  {studentProfile?.school === 'other' 
                    ? studentProfile?.school_name 
                    : studentProfile?.school_display || studentProfile?.school || 'École'}
                </p>
                <div className="w-10 h-0.5 bg-secondary mx-auto mt-2"></div>
              </div>
              <p className="text-sm font-medium text-white/90">École</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:bg-white/15 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4 text-white">
                <p className="text-2xl font-bold">{studentProfile?.major || 'Spécialité'}</p>
                <div className="w-10 h-0.5 bg-secondary mx-auto mt-2"></div>
              </div>
              <p className="text-sm font-medium text-white/90">Cursus</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:bg-white/15 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4 text-white">
                <p className="text-2xl font-bold">
                  {studentProfile?.school_year === 'Laureat' 
                    ? 'Lauréat' 
                    : studentProfile?.school_year === 'Futur_diplome'
                    ? 'Futur diplomé'
                    : studentProfile?.school_year === 'Cesure'
                    ? 'Césure'
                    : `${studentProfile?.school_year || 'Année'}A`}
                </p>
                <div className="w-10 h-0.5 bg-secondary mx-auto mt-2"></div>
              </div>
              <p className="text-sm font-medium text-white/90">Année d&apos;étude</p>
            </motion.div>
          </div>

          {(studentProfile?.linkedin_url || studentProfile?.github_url || studentProfile?.portfolio_url) && (
            <motion.div
              className="max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-white mb-4 text-center">Liens Professionnels</h4>
                <div className="flex flex-wrap justify-center gap-4">
                  {studentProfile?.linkedin_url && (
                    <motion.a
                      href={studentProfile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex items-center gap-3 px-4 py-3 bg-[#0077B5]/20 hover:bg-[#0077B5]/30 border border-[#0077B5]/40 hover:border-[#0077B5]/60 rounded-xl transition-all duration-200 min-w-[200px]"
                    >
                      <div className="w-10 h-10 bg-[#0077B5] rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white text-sm">LinkedIn</div>
                        <div className="text-xs text-white/70 truncate group-hover:text-white/90 transition-colors">
                          {studentProfile.linkedin_url.replace('https://', '').replace('http://', '')}
                        </div>
                      </div>
                      <svg className="w-4 h-4 text-white/60 group-hover:text-white/90 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.a>
                  )}

                  {studentProfile?.github_url && (
                    <motion.a
                      href={studentProfile.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex items-center gap-3 px-4 py-3 bg-gray-900/30 hover:bg-gray-900/50 border border-gray-600/40 hover:border-gray-500/60 rounded-xl transition-all duration-200 min-w-[200px]"
                    >
                      <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white text-sm">GitHub</div>
                        <div className="text-xs text-white/70 truncate group-hover:text-white/90 transition-colors">
                          {studentProfile.github_url.replace('https://', '').replace('http://', '')}
                        </div>
                      </div>
                      <svg className="w-4 h-4 text-white/60 group-hover:text-white/90 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.a>
                  )}

                  {studentProfile?.portfolio_url && (
                    <motion.a
                      href={studentProfile.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex items-center gap-3 px-4 py-3 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 hover:border-purple-400/60 rounded-xl transition-all duration-200 min-w-[200px]"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white text-sm">Portfolio</div>
                        <div className="text-xs text-white/70 truncate group-hover:text-white/90 transition-colors">
                          {studentProfile.portfolio_url.replace('https://', '').replace('http://', '')}
                        </div>
                      </div>
                      <svg className="w-4 h-4 text-white/60 group-hover:text-white/90 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-white">Actions Rapides</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <Button
                    onClick={() => setCurrentView('profile')}
                    variant="outline"
                    className="w-full h-auto p-4 border-white/20 text-white hover:bg-white/10 bg-white/5 hover:border-white/40 transition-all duration-200 flex flex-col items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <FaEdit className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-sm">Profil</div>
                      <div className="text-xs text-white/70 mt-1">Compléter informations</div>
                    </div>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <Button
                    onClick={() => setCurrentView('cv')}
                    variant="primary"
                    className="w-full h-auto p-4 bg-secondary hover:bg-secondary/90 transition-all duration-200 flex flex-col items-center gap-3 relative"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <FaFileAlt className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-sm">
                        {studentProfile?.cv_file_url ? 'Modifier CV' : 'Ajouter CV'}
                      </div>
                      <div className="flex items-center justify-center mt-1">
                        {studentProfile?.cv_file_url ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/30 text-green-100 text-xs rounded-full">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Uploadé
                          </span>
                        ) : (
                          <span className="text-xs text-white/70">Fichier PDF requis</span>
                        )}
                      </div>
                    </div>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <Button
                    onClick={handleViewCV}
                    variant="primary"
                    disabled={!studentProfile?.cv_file_url}
                    className="w-full h-auto p-4 bg-secondary hover:bg-secondary/90 disabled:bg-gray-500/20 disabled:cursor-not-allowed transition-all duration-200 flex flex-col items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <FaEye className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-sm">Visualiser</div>
                      <div className="flex items-center justify-center mt-1">
                        {studentProfile?.cv_file_url ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/30 text-blue-100 text-xs rounded-full">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                            Disponible
                          </span>
                        ) : (
                          <span className="text-xs text-white/50">CV requis</span>
                        )}
                      </div>
                    </div>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <Button
                    onClick={handleGenerateQR}
                    variant="primary"
                    disabled={!studentProfile?.cv_file_url}
                    className="w-full h-auto p-4 bg-secondary hover:bg-secondary/90 disabled:bg-gray-500/20 disabled:cursor-not-allowed transition-all duration-200 flex flex-col items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <FaQrcode className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-sm">QR Code</div>
                      <div className="flex items-center justify-center mt-1">
                        {studentProfile?.cv_file_url ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/30 text-purple-100 text-xs rounded-full">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5z" clipRule="evenodd" />
                            </svg>
                            Actif
                          </span>
                        ) : (
                          <span className="text-xs text-white/50">CV requis</span>
                        )}
                      </div>
                    </div>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modales */}
      {currentView === 'profile' && (
        <ModalWithTitle title="Modifier le profil" onClose={() => setCurrentView('dashboard')}>
          {profileLoading ? (
            <div className="p-6 text-center">
              <p>Chargement du profil...</p>
            </div>
          ) : studentProfile ? (
            <ProfileForm
              profile={studentProfile}
              onSuccess={handleProfileUpdate}
              onCancel={() => setCurrentView('dashboard')}
            />
          ) : (
            <div className="p-6 text-center">
              <p className="text-red-600">Erreur: Profil non trouvé</p>
              <button 
                onClick={() => setCurrentView('dashboard')} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Fermer
              </button>
            </div>
          )}
        </ModalWithTitle>
      )}

      {currentView === 'cv' && studentProfile && (
        <ModalWithTitle title="Gérer votre CV" onClose={() => setCurrentView('dashboard')}>
          <CvUploadForm
            currentProfile={studentProfile}
            onSuccess={handleCvSuccess}
            onCancel={() => setCurrentView('dashboard')}
          />
        </ModalWithTitle>
      )}



      {currentView === 'qr-code' && studentProfile?.cv_file_url && (
        <ModalWithTitle title="QR Code du CV" onClose={() => setCurrentView('dashboard')}>
          <QrCodeDisplay
            cvUrl={studentProfile.cv_file_url}
            studentName={displayName}
            onClose={() => setCurrentView('dashboard')}
          />
        </ModalWithTitle>
      )}
    </section>
  );
}