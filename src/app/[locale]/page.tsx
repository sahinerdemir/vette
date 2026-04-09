import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Gallery } from '@/components/Gallery';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [{ url: '/logo.png', width: 1024, height: 1024, alt: 'Vette Auto Brokerage' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    alternates: {
      languages: {
        en: '/en',
        tr: '/tr',
        es: '/es',
        pt: '/pt',
        de: '/de',
        el: '/el',
        sq: '/sq',
        ru: '/ru',
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Gallery />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
