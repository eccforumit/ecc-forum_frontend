'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { FiSearch, FiFilter, FiDownload, FiMail, FiChevronDown, FiChevronUp, FiGrid, FiList } from 'react-icons/fi';
import { SectionLoader } from '@/components/ui/LoadingSpinner';
import { companyService, CompanyStudentProfile, StudentSearchFilters } from '@/services/companyService';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';

const useProfiles = () => {
  const [profiles, setProfiles] = useState<CompanyStudentProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchProfiles = async () => {
    setIsLoading(true);
    try {
      // Fetch all ECC profiles - backend will filter by school
      const filters: StudentSearchFilters = { 
        fetch_all: true,
        school: 'ECC'
      };
      const data = await companyService.getStudentProfiles(filters);
<<<<<<< HEAD
      setProfiles(data);
    } catch (err) {
=======
      console.log('✅ Profils ECC chargés:', data.length, data);
      setProfiles(data);
    } catch (err) {
      console.error('❌ Erreur chargement profils:', err);
>>>>>>> 2b0915062c9ce75dc23d95839a6e023bee5ffd6c
      setError(err instanceof Error ? err : new Error('Erreur lors du chargement des profils'));
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProfiles();
  }, []);
  
  return { profiles, isLoading, error, refetch: fetchProfiles };
};

export const CVSearchSection = () => {
  const { profiles: allProfiles, isLoading } = useProfiles();
  const [filteredProfiles, setFilteredProfiles] = useState<CompanyStudentProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [majorFilter, setMajorFilter] = useState<string>('');
  const [schoolYearFilter, setSchoolYearFilter] = useState<string>('');
<<<<<<< HEAD
  const [skillFilter, setSkillFilter] = useState<string>('');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'year' | 'skills'>('name');
=======
>>>>>>> 2b0915062c9ce75dc23d95839a6e023bee5ffd6c
  const [expandedProfileId, setExpandedProfileId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [profilesPerPage, setProfilesPerPage] = useState(10);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  
  // Calculate available CVs from filtered profiles
  const availableCVs = filteredProfiles.filter(p => p.cv_file_url).length;
  
  // Calculate majors, schools and skills from all profiles (ECC only)
  const majors = Array.from(new Set(allProfiles?.map(p => p.major).filter(Boolean) || []));
  // Remove school filter since we only show ECC
  const schoolYears = Array.from(new Set(allProfiles?.map(p => p.school_year).filter(Boolean) || []));
<<<<<<< HEAD
  // Distinct skills across all profiles, for the skill filter dropdown
  const allSkills = Array.from(
    new Set((allProfiles || []).flatMap(p => p.skills || []).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  const activeFilterCount =
    (majorFilter ? 1 : 0) +
    (schoolYearFilter ? 1 : 0) +
    (skillFilter ? 1 : 0) +
    (availableOnly ? 1 : 0);

  // Apply filters whenever filter criteria or profiles change
  useEffect(() => {
    if (!allProfiles) return;

    let result = [...allProfiles];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(profile =>
        profile.first_name.toLowerCase().includes(term) ||
        profile.last_name.toLowerCase().includes(term) ||
        profile.major.toLowerCase().includes(term) ||
        (profile.skills || []).some(skill => skill.toLowerCase().includes(term))
      );
    }

    // Apply major filter
    if (majorFilter) {
      result = result.filter(profile => profile.major === majorFilter);
    }

    // Apply school year filter
    if (schoolYearFilter) {
      result = result.filter(profile => profile.school_year === schoolYearFilter);
    }

    // Apply skill filter (exact skill match, case-insensitive)
    if (skillFilter) {
      const skill = skillFilter.toLowerCase();
      result = result.filter(profile =>
        (profile.skills || []).some(s => s.toLowerCase() === skill)
      );
    }

    // Only profiles with a downloadable CV
    if (availableOnly) {
      result = result.filter(profile => Boolean(profile.cv_file_url));
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'year':
          return String(a.school_year).localeCompare(String(b.school_year));
        case 'skills':
          return (b.skills || []).length - (a.skills || []).length;
        case 'name':
        default:
          return `${a.first_name} ${a.last_name}`.localeCompare(
            `${b.first_name} ${b.last_name}`
          );
      }
    });

    setFilteredProfiles(result);
  }, [searchTerm, majorFilter, schoolYearFilter, skillFilter, availableOnly, sortBy, allProfiles]);
=======
  
  // Apply filters whenever filter criteria or profiles change
  useEffect(() => {
    if (!allProfiles) return;
    
    console.log('🔍 Filtrage côté client - Profils disponibles:', allProfiles.length);
    
    let result = [...allProfiles];
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(profile => 
        profile.first_name.toLowerCase().includes(term) || 
        profile.last_name.toLowerCase().includes(term) || 
        profile.major.toLowerCase().includes(term) || 
        (profile.skills || []).some(skill => skill.toLowerCase().includes(term))
      );
      console.log('  → Après recherche:', result.length);
    }
    
    // Apply major filter
    if (majorFilter) {
      result = result.filter(profile => profile.major === majorFilter);
      console.log('  → Après filtre major:', result.length);
    }
    
    // Apply school year filter
    if (schoolYearFilter) {
      result = result.filter(profile => profile.school_year === schoolYearFilter);
      console.log('  → Après filtre année:', result.length);
    }
    
    console.log('✅ Profils filtrés finaux:', result.length);
    setFilteredProfiles(result);
  }, [searchTerm, majorFilter, schoolYearFilter, allProfiles]);
>>>>>>> 2b0915062c9ce75dc23d95839a6e023bee5ffd6c
  
  const handleToggleExpand = (id: number) => {
    setExpandedProfileId(expandedProfileId === id ? null : id);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setMajorFilter('');
    setSchoolYearFilter('');
<<<<<<< HEAD
    setSkillFilter('');
    setAvailableOnly(false);
    setSortBy('name');
=======
>>>>>>> 2b0915062c9ce75dc23d95839a6e023bee5ffd6c
    setCurrentPage(1);
  };
  
  const handleDownloadAllCVs = async () => {
    if (availableCVs === 0) {
      toast.error('Aucun CV disponible pour téléchargement');
      return;
    }

    setIsDownloadingAll(true);
    
    try {
      const zip = new JSZip();
      const profilesWithCV = filteredProfiles.filter(p => p.cv_file_url);
      
      toast.loading(`Téléchargement de ${availableCVs} CV en cours...`, { id: 'download-all' });
      
      // Download each CV and add to zip
      const downloadPromises = profilesWithCV.map(async (profile) => {
        try {
          const response = await fetch(profile.cv_file_url!);
          if (!response.ok) {
            return null;
          }
          
          const blob = await response.blob();
          const extension = profile.cv_file_url!.split('.').pop() || 'pdf';
          const fileName = `${profile.first_name}_${profile.last_name}_CV.${extension}`;
          
          zip.file(fileName, blob);
          return fileName;
        } catch {
          return null;
        }
      });
      
      const results = await Promise.all(downloadPromises);
      const successCount = results.filter(r => r !== null).length;
      
      if (successCount === 0) {
        toast.error('Impossible de télécharger les CV', { id: 'download-all' });
        return;
      }
      
      // Generate zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      
      // Create filename with current date and filters info
      const date = new Date().toISOString().split('T')[0];
      let zipFileName = `CVs_ECC_${date}`;
      
      if (majorFilter) zipFileName += `_${majorFilter}`;
      if (schoolYearFilter) zipFileName += `_${schoolYearFilter}`;
      
      zipFileName += '.zip';
      
      // Download the zip
      saveAs(zipBlob, zipFileName);
      
      toast.success(`${successCount} CV téléchargés avec succès!`, { id: 'download-all' });
      
    } catch {
      toast.error('Erreur lors du téléchargement des CV', { id: 'download-all' });
    } finally {
      setIsDownloadingAll(false);
    }
  };
  
  // Pagination logic
  const totalProfiles = filteredProfiles.length;
  const totalPages = Math.ceil(totalProfiles / profilesPerPage);
  const startIndex = (currentPage - 1) * profilesPerPage;
  const endIndex = startIndex + profilesPerPage;
  const currentProfiles = filteredProfiles.slice(startIndex, endIndex);
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
<<<<<<< HEAD
  }, [searchTerm, majorFilter, schoolYearFilter, skillFilter, availableOnly, sortBy]);
=======
  }, [searchTerm, majorFilter, schoolYearFilter]);
>>>>>>> 2b0915062c9ce75dc23d95839a6e023bee5ffd6c
  
  // Adjust profiles per page when switching view mode
  useEffect(() => {
    if (viewMode === 'grid') {
      setProfilesPerPage(20); // Plus de profils en mode grille
    } else {
      setProfilesPerPage(10); // Moins de profils en mode liste
    }
    setCurrentPage(1);
  }, [viewMode]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };
  
    if (isLoading) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">CV-Thèque</h2>
        <SectionLoader />
      </motion.section>
    );
  }
  
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg"
    >
      {/* Header Section - Responsive */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">CV-Thèque</h2>
        
        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-md">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-l-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                title="Vue liste"
              >
                <FiList size={18} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-r-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                title="Vue grille"
              >
                <FiGrid size={18} />
              </button>
            </div>
            
            <button
              onClick={handleDownloadAllCVs}
              disabled={availableCVs === 0 || isDownloadingAll}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all shadow-sm ${
                availableCVs === 0 || isDownloadingAll
                  ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-60'
                  : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]'
              }`}
              title={availableCVs === 0 ? 'Aucun CV disponible' : `Télécharger ${availableCVs} CV`}
            >
              <FiDownload size={20} className={isDownloadingAll ? 'animate-bounce' : ''} />
              <span className="text-sm font-semibold">
                {isDownloadingAll ? 'Téléchargement...' : `Télécharger ${availableCVs} CV`}
              </span>
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
              {totalProfiles} profil{totalProfiles > 1 ? 's' : ''} trouvé{totalProfiles > 1 ? 's' : ''}
            </span>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">Afficher:</label>
              <select
                value={profilesPerPage}
                onChange={(e) => {
                  setProfilesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden space-y-3">
          {/* First Row: View Toggle & Stats */}
          <div className="flex justify-between items-center gap-3">
            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-md">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-l-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                title="Vue liste"
              >
                <FiList size={18} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-r-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                title="Vue grille"
              >
                <FiGrid size={18} />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">Afficher:</label>
              <select
                value={profilesPerPage}
                onChange={(e) => {
                  setProfilesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
          
          {/* Second Row: Download Button */}
          <button
            onClick={handleDownloadAllCVs}
            disabled={availableCVs === 0 || isDownloadingAll}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all shadow-sm ${
              availableCVs === 0 || isDownloadingAll
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-60'
                : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-md active:scale-[0.98]'
            }`}
            title={availableCVs === 0 ? 'Aucun CV disponible' : `Télécharger ${availableCVs} CV`}
          >
            <FiDownload size={20} className={isDownloadingAll ? 'animate-bounce' : ''} />
            <span className="text-sm font-semibold">
              {isDownloadingAll ? 'Téléchargement...' : `Télécharger ${availableCVs} CV`}
            </span>
          </button>
          
          {/* Third Row: Results Count */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            {totalProfiles} profil{totalProfiles > 1 ? 's' : ''} trouvé{totalProfiles > 1 ? 's' : ''}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex-grow relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par nom, compétence..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm md:text-base"
          />
        </div>
        
        <Button 
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="w-full md:w-auto whitespace-nowrap flex items-center justify-center gap-2"
        >
          <FiFilter size={18} />
          <span className="md:hidden">
<<<<<<< HEAD
            Filtres{activeFilterCount > 0 && ` (${activeFilterCount})`}
          </span>
          <span className="hidden md:inline">
            {activeFilterCount > 0 ? (
              <span className="font-semibold text-primary">Filtres actifs ({activeFilterCount})</span>
=======
            Filtres{(majorFilter || schoolYearFilter) && ` (${(majorFilter ? 1 : 0) + (schoolYearFilter ? 1 : 0)})`}
          </span>
          <span className="hidden md:inline">
            {majorFilter || schoolYearFilter ? (
              <span className="font-semibold text-primary">Filtres actifs ({(majorFilter ? 1 : 0) + (schoolYearFilter ? 1 : 0)})</span>
>>>>>>> 2b0915062c9ce75dc23d95839a6e023bee5ffd6c
            ) : (
              'Filtres'
            )}
          </span>
        </Button>
      </div>
      
      {showFilters && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Spécialité</label>
              <select
                value={majorFilter}
                onChange={(e) => setMajorFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="" className="text-gray-900 dark:text-gray-100">Toutes les spécialités</option>
                {majors.map((major) => (
                  <option key={major} value={major} className="text-gray-900 dark:text-gray-100">
                    {major}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Année</label>
              <select
                value={schoolYearFilter}
                onChange={(e) => setSchoolYearFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="" className="text-gray-900 dark:text-gray-100">Toutes les années</option>
                {schoolYears.map((year) => (
                  <option key={year} value={year} className="text-gray-900 dark:text-gray-100">
<<<<<<< HEAD
                    {year === 'Laureat'
                      ? 'Lauréat'
=======
                    {year === 'Laureat' 
                      ? 'Lauréat' 
>>>>>>> 2b0915062c9ce75dc23d95839a6e023bee5ffd6c
                      : year === 'Futur_diplome'
                      ? 'Futur diplomé'
                      : year === 'Cesure'
                      ? 'Césure'
                      : `${year}A`}
                  </option>
                ))}
              </select>
            </div>
<<<<<<< HEAD

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Compétence</label>
              <select
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="" className="text-gray-900 dark:text-gray-100">Toutes les compétences</option>
                {allSkills.map((skill) => (
                  <option key={skill} value={skill} className="text-gray-900 dark:text-gray-100">
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Trier par</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'year' | 'skills')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="name" className="text-gray-900 dark:text-gray-100">Nom (A → Z)</option>
                <option value="year" className="text-gray-900 dark:text-gray-100">Année d&apos;études</option>
                <option value="skills" className="text-gray-900 dark:text-gray-100">Nombre de compétences</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-4">
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              CV disponible uniquement
            </label>
            <Button
=======
          </div>
          
          <div className="flex justify-end mt-4">
            <Button 
>>>>>>> 2b0915062c9ce75dc23d95839a6e023bee5ffd6c
              onClick={clearFilters}
              variant="outline"
              className="text-sm"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        </motion.div>
      )}
      
      {/* Vue Liste */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          {currentProfiles.length > 0 ? (
            currentProfiles.map((profile) => (
            <div 
              key={profile.id} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0 relative">
                    <Image 
                      src={profile.profile_image_url || '/img/default-avatar.png'} 
                      alt={`${profile.first_name} ${profile.last_name}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {profile.first_name} {profile.last_name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">{profile.major}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {profile.school === 'other' ? profile.school_name : (profile.school_display || profile.school)} - {
                          profile.school_year === 'Laureat' 
                            ? 'Lauréat' 
                            : profile.school_year === 'Futur_diplome'
                            ? 'Futur diplomé'
                            : profile.school_year === 'Cesure'
                            ? 'Césure'
                            : `${profile.school_year}A`
                        }
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(profile.skills || []).slice(0, 5).map((skill, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                          >
                            {skill}
                          </span>
                        ))}
                        {(profile.skills || []).length > 5 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                            +{(profile.skills || []).length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-3 justify-between items-center">
                  <div className="flex gap-3">
                    {profile.cv_file_url ? (
                      <Button 
                        variant="outline"
                        className="text-sm flex items-center gap-1"
                        onClick={() => window.open(profile.cv_file_url, '_blank')}
                      >
                        <FiDownload size={16} /> Voir CV
                      </Button>
                    ) : (
                      <Button 
                        variant="outline"
                        className="text-sm flex items-center gap-1 opacity-50 cursor-not-allowed"
                        disabled
                      >
                        <FiDownload size={16} /> CV indisponible
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline"
                      className="text-sm flex items-center gap-1"
                      asChild
                    >
                      <a href={`mailto:${profile.user_email}`}>
                        <FiMail size={16} /> Contacter
                      </a>
                    </Button>
                  </div>
                  
                  <div className="flex items-center">
                    <button 
                      onClick={() => handleToggleExpand(profile.id)}
                      className="ml-2 p-2 text-gray-600 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      {expandedProfileId === profile.id ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                    </button>
                  </div>
                </div>
                
                {expandedProfileId === profile.id && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Contact</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            {profile.user_email}
                          </div>
                          {profile.phone_number && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                              </svg>
                              {profile.phone_number}
                            </div>
                          )}
                        </div>
                        
                        {profile.experience && profile.experience.length > 0 && (
                          <div className="mt-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Expériences</h4>
                            <ul className="space-y-1 text-sm">
                              {profile.experience.map((exp, index) => (
                                <li key={index} className="list-disc list-inside text-gray-600 dark:text-gray-300">
                                  {exp}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        {profile.languages && profile.languages.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Langues</h4>
                            <ul className="space-y-1 text-sm">
                              {profile.languages.map((lang, index) => (
                                <li key={index} className="text-gray-600 dark:text-gray-300">
                                  {lang.language} ({lang.level})
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {(profile.skills || []).length > 5 && (
                          <div className="mt-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Toutes les compétences</h4>
                            <div className="flex flex-wrap gap-1">
                              {(profile.skills || []).map((skill, index) => (
                                <span 
                                  key={index} 
                                  className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {(profile.portfolio_url || profile.github_url || profile.linkedin_url) && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Liens professionnels</h4>
                        <div className="flex flex-wrap gap-3">
                          {profile.portfolio_url && (
                            <a 
                              href={profile.portfolio_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 hover:bg-purple-200 dark:bg-purple-50 dark:hover:bg-purple-100 text-purple-700 dark:text-purple-700 text-sm rounded-lg transition-colors font-medium"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.148.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                              </svg>
                              Portfolio
                            </a>
                          )}
                          
                          {profile.github_url && (
                            <a 
                              href={profile.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-50 dark:hover:bg-gray-100 text-gray-800 dark:text-gray-700 text-sm rounded-lg transition-colors font-medium"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                              </svg>
                              GitHub
                            </a>
                          )}
                          
                          {profile.linkedin_url && (
                            <a 
                              href={profile.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 dark:bg-blue-50 dark:hover:bg-blue-100 text-blue-700 dark:text-blue-700 text-sm rounded-lg transition-colors font-medium"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
                              </svg>
                              LinkedIn
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            <p>Aucun profil ne correspond à votre recherche.</p>
            <Button 
              onClick={clearFilters}
              variant="outline"
              className="mt-4"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
        </div>
      )}
      
      {/* Vue Grille */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProfiles.length > 0 ? (
            currentProfiles.map((profile) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-all hover:scale-105"
              >
                <div className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-20 w-20 rounded-full overflow-hidden relative mb-3">
                      <Image 
                        src={profile.profile_image_url || '/img/default-avatar.png'} 
                        alt={`${profile.first_name} ${profile.last_name}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {profile.first_name} {profile.last_name}
                    </h3>
                    
                    <p className="text-sm text-primary font-medium mb-1">{profile.major}</p>
                    
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      {profile.school === 'other' ? profile.school_name : (profile.school_display || profile.school)} - {
                        profile.school_year === 'Laureat' 
                          ? 'Lauréat' 
                          : profile.school_year === 'Futur_diplome'
                          ? 'Futur diplomé'
                          : profile.school_year === 'Cesure'
                          ? 'Césure'
                          : `${profile.school_year}A`
                      }
                    </p>
                    
                    {(profile.skills || []).length > 0 && (
                      <div className="flex flex-wrap gap-1 justify-center mb-3">
                        {(profile.skills || []).slice(0, 3).map((skill, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                          >
                            {skill}
                          </span>
                        ))}
                        {(profile.skills || []).length > 3 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                            +{(profile.skills || []).length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex flex-col gap-2 w-full">
                      {profile.cv_file_url ? (
                        <Button 
                          variant="outline"
                          className="text-xs w-full flex items-center justify-center gap-1"
                          onClick={() => window.open(profile.cv_file_url, '_blank')}
                        >
                          <FiDownload size={14} /> CV
                        </Button>
                      ) : (
                        <Button 
                          variant="outline"
                          className="text-xs w-full flex items-center justify-center gap-1 opacity-50 cursor-not-allowed"
                          disabled
                        >
                          <FiDownload size={14} /> Indisponible
                        </Button>
                      )}
                      
                      <Button 
                        variant="primary"
                        className="text-xs w-full flex items-center justify-center gap-1"
                        asChild
                      >
                        <a href={`mailto:${profile.user_email}`}>
                          <FiMail size={14} /> Contacter
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500 dark:text-gray-400">
              <p>Aucun profil ne correspond à votre recherche.</p>
              <Button 
                onClick={clearFilters}
                variant="outline"
                className="mt-4"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Affichage de {startIndex + 1} à {Math.min(endIndex, totalProfiles)} sur {totalProfiles} profils
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm w-full sm:w-auto"
            >
              Précédent
            </Button>
            
            <div className="flex gap-1 flex-wrap justify-center">
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && handlePageChange(page)}
                  disabled={page === '...'}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    page === currentPage
                      ? 'bg-primary text-white'
                      : page === '...'
                      ? 'cursor-default text-gray-400'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-sm w-full sm:w-auto"
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
    </motion.section>
  );
};
