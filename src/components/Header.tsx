'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'top-0 py-2 glass shadow-lg'
          : 'top-6 py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
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
            width={scrolled ? 120 : 200}
            height={scrolled ? 60 : 100}
            className="transition-all duration-500 object-contain"
            priority
          />
        </a>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto z-50 w-10 h-10 flex items-center justify-center"
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
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-0 bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-heading font-bold uppercase tracking-widest hover:text-accent-red transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-4 mt-8">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
