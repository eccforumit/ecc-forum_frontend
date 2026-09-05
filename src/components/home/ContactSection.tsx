'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/Button';
import { FaPaperPlane, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { GradientText } from '@/components/ui/GradientText';
import { sendContactEmail } from '@/services/emailService';


type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type ToastType = 'success' | 'error' | null;

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: ToastType; message: string } | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const showToast = (type: ToastType, message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Send main contact email
      const result = await sendContactEmail(data);
      
      if (result === true) {
        showToast('success', 'Votre message a été envoyé avec succès!');
        reset();
      } else {
        throw new Error('Email service returned false');
      }
    } catch (error) {
      let errorMessage = 'Erreur lors de l\'envoi du message. Veuillez réessayer.';
      
      if (error instanceof Error) {
        // Afficher le message d'erreur réel du serveur
        errorMessage = error.message;
      }
      
      showToast('error', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <section id="contact" className="py-20 bg-white dark:bg-gray-800" ref={ref}>
        {/* Toast Notification */}
        {toast && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl max-w-md ${
                toast.type === 'success' 
                  ? 'bg-green-500 text-white border-l-4 border-green-600' 
                  : 'bg-red-500 text-white border-l-4 border-red-600'
              }`}
            >
              <div className="flex items-center space-x-3">
                {toast.type === 'success' ? (
                  <FaCheckCircle className="text-green-200 text-xl flex-shrink-0" />
                ) : (
                  <FaExclamationTriangle className="text-red-200 text-xl flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium">
                    {toast.type === 'success' ? 'Succès!' : 'Erreur!'}
                  </p>
                  <p className="text-sm opacity-90">{toast.message}</p>
                </div>
              </div>
            </motion.div>
        )}

        <div className="container-custom">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              <span className="text-gray-900 dark:text-white">Contactez</span> <GradientText>Nous</GradientText>
            </h2>
            <p className="section-subtitle">
              Vous avez des questions sur le Forum ECC? N&apos;hésitez pas à nous contacter.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            {/* Contact Info */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg"
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
                Informations de Contact
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary rounded-full p-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-gray-800 dark:text-white">Adresse</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      École Centrale Casablanca, Bouskoura
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary rounded-full p-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-gray-800 dark:text-white">Email</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Forum@centrale-casablanca.ma
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium text-lg text-gray-800 dark:text-white mb-3">
                  Suivez-nous
                </h4>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/ecc_forum_entreprises" target="_blank" rel="noopener noreferrer" aria-label="Instagram du Forum ECC" className="bg-primary hover:bg-primary-700 text-white p-2 rounded-full transition-colors">
                    <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                      <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/forumecc-entreprises" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn du Forum ECC" className="bg-primary hover:bg-primary-700 text-white p-2 rounded-full transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
                  Envoyez-nous un message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nom complet
                    </label>
                    <input
                        type="text"
                        {...register('name', { required: 'Le nom est requis' })}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                            errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                        type="email"
                        {...register('email', {
                          required: 'L\'email est requis',
                          pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Email invalide' }
                        })}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                            errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Téléphone
                  </label>
                  <input
                      type="tel"
                      {...register('phone')}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Sujet
                  </label>
                  <input
                      type="text"
                      {...register('subject', { required: 'Le sujet est requis' })}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                          errors.subject ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                      rows={5}
                      {...register('message', { required: 'Le message est requis' })}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
                          errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
                </div>

                <div className="mt-8">
                  <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      isLoading={isSubmitting}
                      leftIcon={<FaPaperPlane />}
                  >
                    Envoyer
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
  );
};