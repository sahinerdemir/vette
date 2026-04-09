'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { href: '#about', label: t('about') },
    { href: '#gallery', label: t('gallery') },
    { href: '#contact', label: t('contact') },
  ];

  return (
    <>
      <div className="fixed top-6 left-6 right-6 z-50">
        <header
          className={`transition-all duration-500 rounded-full px-8 ${
            scrolled
              ? 'py-2 glass shadow-lg'
              : 'py-4 bg-navy-800/60 backdrop-blur-md border border-white/10'
          }`}
        >
          <div className="relative flex items-center justify-between">
            {/* Left nav - desktop */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium uppercase tracking-widest hover:text-accent-red transition-colors duration-300"
                  aria-label={item.label}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Center logo */}
            <a href="#" className="absolute left-1/2 -translate-x-1/2" aria-label="Vette - Home">
              <Image
                src="/logo.png"
                alt="Vette Auto Brokerage Logo"
                width={scrolled ? 100 : 140}
                height={scrolled ? 50 : 70}
                className="transition-all duration-500 object-contain md:w-auto"
                style={{ width: scrolled ? 100 : 140, height: 'auto' }}
                priority
              />
            </a>

            {/* Right controls - desktop */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher />
            </div>

          </div>
        </header>
      </div>

      {/* Mobile hamburger - outside header for z-index above overlay */}
      <button
        className="md:hidden fixed top-10 right-10 z-[60] w-10 h-10 flex items-center justify-center"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <div className="relative w-6 h-5">
          <span className={`absolute left-0 h-0.5 w-6 bg-current transition-all duration-300 ${menuOpen ? 'top-2 rotate-45' : 'top-0'}`} />
          <span className={`absolute left-0 top-2 h-0.5 w-6 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`absolute left-0 h-0.5 w-6 bg-current transition-all duration-300 ${menuOpen ? 'top-2 -rotate-45' : 'top-4'}`} />
        </div>
      </button>

      {/* Mobile menu - outside header container */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-[55] bg-navy-900/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-2xl font-heading font-bold uppercase tracking-widest hover:text-accent-red transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <LanguageSwitcher />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
