import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';
import Hero from '@/components/sections/Hero';
import DualTechPanel from '@/components/sections/DualAction';
import DualTechFeatures from '@/components/sections/DualActionFeatures';
import FeaturedProduct from '@/components/sections/FeaturedProduct';
import BloodAnalysis from '@/components/sections/BloodAnalysis';
import Testimonials from '@/components/sections/Testimonials';
import Journey from '@/components/sections/Journey';
import Contact from './Contact';

export default function Home() {
  const { t } = useTranslation();

  useEffect(() => {
    const pending = sessionStorage.getItem('pendingScroll');
    if (pending) {
      sessionStorage.removeItem('pendingScroll');
      setTimeout(() => {
        const el = document.getElementById(pending);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, []);

  return (
    <div className="bg-background min-h-screen overflow-hidden">
      <SEO description={t('seo.home.description')} />
      <Hero />
      <div id="technology">
        <DualTechPanel />
        <DualTechFeatures />
      </div>
      <FeaturedProduct />
      <BloodAnalysis />
      <Testimonials />
      <Journey />
      <div id="contact">
        <Contact hideBackButton={true} />
      </div>
    </div>
  );
}
