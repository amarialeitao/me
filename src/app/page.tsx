'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Articles from '@/components/Articles';
import Education from '@/components/Education';
import Languages from '@/components/Languages';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Articles />
        <Education />
        <Languages />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
