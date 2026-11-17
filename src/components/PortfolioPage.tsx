'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Metrics from '@/components/Metrics';
import CaseStudies from '@/components/CaseStudies';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Now from '@/components/Now';
import Articles from '@/components/Articles';
import Testimonials from '@/components/Testimonials';
import ContactFooter from '@/components/ContactFooter';

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Metrics />
        <CaseStudies />
        <Experience />
        <Skills />
        <Education />
        <Now />
        <Articles />
        <Testimonials />
      </main>
      <ContactFooter />
    </>
  );
}
