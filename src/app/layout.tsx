import type { ReactNode } from 'react';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic', 'greek', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin', 'cyrillic', 'latin-ext'],
  variable: '--font-heading',
  display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className="dark">
      <body className={`${inter.variable} ${oswald.variable} font-body bg-navy-900 text-gray-100`}>
        {children}
      </body>
    </html>
  );
}
