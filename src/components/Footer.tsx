'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-gray-400 py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <Image
          src="/logo.png"
          alt="Vette Auto Brokerage Logo"
          width={100}
          height={50}
          className="mx-auto mb-4 object-contain"
        />
        <div className="w-16 h-px bg-navy-700 mx-auto mb-6" />
        <p className="text-sm">
          &copy; {year} Vette LLC. {t('rights')}
        </p>
      </div>
    </footer>
  );
}
