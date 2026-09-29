'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useFontStyles } from '@/hooks/useFontStyles';
import { LinkButton } from './LinkButton';
import { ThemeToggle } from '@/components/theme-toggle';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInfoBarVisible, setIsInfoBarVisible] = useState(true);
  const fontStyles = useFontStyles();

  // Messages de navette
  const shuttleMessages = [
      '🚌 Navette: Départ à 7h30 - Technopark -> ECC ',
      '🚌 Navette: Départ à 9h00 - Technopark -> ECC ',
      '🚌 Navette: Retour à 18h30 - ECC -> Technopark',
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu items
  const menuItems = [
    { label: 'Accueil', href: '/' },
    { label: 'À propos', href: '/about' },
    { label: 'Equipe', href: '/#equipe' },
    { label: 'Programme', href: '/#programme' },
    { label: 'Entreprises', href: '/#partenaires' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      {/* Barre d'information défilante */}
      <AnimatePresence>
        {isInfoBarVisible && (
          <motion.div
            initial={{ height: 32, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary-700 to-primary-600 dark:from-primary-800 dark:to-primary-700 text-white overflow-hidden"
          >
            <div className="relative h-8 flex items-center">
              <motion.div
                className="flex whitespace-nowrap"
                animate={{
                  x: ['0%', '-50%'],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear",
                  },
                }}
              >
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="flex items-center">
                    {shuttleMessages.map((message, msgIndex) => (
                      <span
                        key={`${index}-${msgIndex}`}
                        className="mx-8 text-sm font-medium flex items-center"
                        style={fontStyles.sans}
                      >
                        {message}
                      </span>
                    ))}
                  </div>
                ))}
              </motion.div>
              
              {/* Bouton de fermeture */}
              <button
                onClick={() => setIsInfoBarVisible(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-colors z-10"
                aria-label="Fermer la barre d'information"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header
          className={`fixed ${isInfoBarVisible ? 'top-8' : 'top-0'} left-0 right-0 z-50 transition-all duration-300 ${
              isScrolled
                  ? 'bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm'
                  : 'bg-transparent'
          }`}
      >
         <div className="container-custom mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
                <div className="flex items-center" style={fontStyles.heading}>
                    <Image
                        src="/images/logo_normal.png"
                        alt="Forum ECC Logo"
                        width={60}
                        height={60}
                        className="h-8 md:h-10 w-auto mr-2 block dark:hidden"
                    />
                    <Image
                        src="/images/logo_forum.png"
                        alt="Forum ECC Logo"
                        width={60}
                        height={60}
                        className="h-8 md:h-10 w-auto mr-2 hidden dark:block"
                    />
              <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
      Forum<span className="text-primary">ECC</span>
    </span>

            </div>
          </Link>

          {/* Desktop navigation - centered */}
          <nav className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex space-x-8">
              {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                        href={item.href}
                        className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors"
                        style={fontStyles.sans}
                    >
                      {item.label}
                    </Link>
                  </li>
              ))}
            </ul>
          </nav>

          {/* Right side with theme toggle and auth buttons */}
          <div className="hidden md:block w-auto">
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <LinkButton href="/auth/login" variant="outline" size="sm">
                Connexion
              </LinkButton>
              <LinkButton href="/auth/signup/student" variant="primary" size="sm">
                S&apos;inscrire
              </LinkButton>
            </div>
          </div>

          {/* Mobile menu toggle and theme switcher */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
                className="flex items-center"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
            >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                  <path
                      d="M6 18L18 6M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
              ) : (
                  <path
                      d="M4 6H20M4 12H20M4 18H20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
              )}
            </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
              <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800"
              >
                <div className="container-custom mx-auto px-4 py-4">
                  <ul className="space-y-3">
                    {menuItems.map((item) => (
                        <li key={item.href}>
                          <Link
                              href={item.href}
                              className="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors py-2"
                              onClick={() => setIsMobileMenuOpen(false)}
                              style={fontStyles.sans}
                          >
                            {item.label}
                          </Link>
                        </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-col space-y-3">
                    <div className="flex justify-center pb-3">
                      <ThemeToggle />
                    </div>
                    <LinkButton href="/auth/login" variant="outline" size="sm" className="w-full">
                      Connexion
                    </LinkButton>
                    <LinkButton href="/auth/signup" variant="primary" size="sm" className="w-full">
                      S&apos;inscrire
                    </LinkButton>
                  </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;