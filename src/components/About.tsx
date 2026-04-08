'use client';

import { useTranslations } from 'next-intl';
import { AnimatedSection } from './AnimatedSection';

const serviceIcons = [
  // Vehicle Sourcing
  <svg key="s1" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>,
  // Expert Negotiation
  <svg key="s2" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // End-to-End Support
  <svg key="s3" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>,
];

export function About() {
  const t = useTranslations('about');

  const services = [
    { title: t('service1_title'), desc: t('service1_desc'), icon: serviceIcons[0] },
    { title: t('service2_title'), desc: t('service2_desc'), icon: serviceIcons[1] },
    { title: t('service3_title'), desc: t('service3_desc'), icon: serviceIcons[2] },
  ];

  return (
    <section id="about" className="section-padding bg-navy-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent-red/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-blue/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-center mb-6">
            {t('title')}
          </h2>
          <div className="w-20 h-1 bg-accent-red mx-auto mb-12" />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="text-lg md:text-xl text-gray-300 text-center max-w-4xl mx-auto mb-8 leading-relaxed">
            {t('description')}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="text-base md:text-lg text-gray-400 text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            {t('mission')}
          </p>
        </AnimatedSection>

        {/* Services */}
        <AnimatedSection delay={0.3}>
          <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight text-center mb-12">
            {t('services_title')}
          </h3>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <AnimatedSection key={i} delay={0.4 + i * 0.15}>
              <div className="group p-8 rounded-2xl bg-navy-700/50 border border-navy-600 hover:border-accent-red/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent-red/10">
                <div className="w-16 h-16 rounded-xl bg-accent-red/10 text-accent-red flex items-center justify-center mb-6 group-hover:bg-accent-red group-hover:text-white transition-all duration-300">
                  {service.icon}
                </div>
                <h4 className="font-heading text-xl font-bold uppercase tracking-wide mb-4">
                  {service.title}
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
