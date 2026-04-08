'use client';

import { useTranslations } from 'next-intl';
import { AnimatedSection } from './AnimatedSection';
import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';

export function Contact() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      vehicle: formData.get('vehicle') as string,
      message: formData.get('message') as string,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="section-padding bg-navy-800 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-red/5 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto relative z-10">
        <AnimatedSection>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-center mb-6">
            {t('title')}
          </h2>
          <p className="text-gray-400 text-center mb-4">{t('subtitle')}</p>
          <div className="w-20 h-1 bg-accent-red mx-auto mb-16" />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t('name')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-navy-700 border border-navy-600 focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 transition-all duration-300 outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t('email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-navy-700 border border-navy-600 focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 transition-all duration-300 outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  {t('phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 rounded-xl bg-navy-700 border border-navy-600 focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 transition-all duration-300 outline-none"
                />
              </div>
              <div>
                <label htmlFor="vehicle" className="block text-sm font-medium mb-2">
                  {t('vehicle')}
                </label>
                <input
                  type="text"
                  id="vehicle"
                  name="vehicle"
                  placeholder={t('vehicle_placeholder')}
                  className="w-full px-4 py-3 rounded-xl bg-navy-700 border border-navy-600 focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 transition-all duration-300 outline-none placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                {t('message')} *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-navy-700 border border-navy-600 focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 transition-all duration-300 outline-none resize-none"
              />
            </div>

            <div className="text-center">
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-12 py-4 bg-accent-red text-white font-heading font-semibold uppercase tracking-widest text-sm rounded-full hover:bg-red-600 transition-colors duration-300 shadow-lg shadow-accent-red/30 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? t('sending') : t('submit')}
              </motion.button>
            </div>

            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-green-400 font-medium"
                role="status"
              >
                {t('success')}
              </motion.p>
            )}

            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-red-500 font-medium"
                role="alert"
              >
                {t('error')}
              </motion.p>
            )}
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}
