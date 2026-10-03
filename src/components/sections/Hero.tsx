import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroImg from '@assets/hero-scale.jpeg';

export default function Hero() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language ? i18n.language.split('-')[0] : 'en';
  const isPoland = i18n.language === 'pl';
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '250%']);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative h-svh flex items-center justify-center overflow-hidden rounded-b-4xl md:rounded-b-[3rem] z-10 border-b border-white/10 shadow-[0_10px_50px_rgba(0,0,0,0.5)]"
    >
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-linear-to-b from-background/50 via-background/45 to-background/40 z-10" />
        <img
          src={heroImg}
          alt="PEMF Therapy"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-[80%_0%] sm:object-[80%] lg:object-[80%]"
        />

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute top-[83%] lg:top-[90%] xl:top-[90%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer z-30"
          onClick={() => scrollToSection('technology')}
        >
          <div className="bg-background/20 w-[20px] h-[34px] border border-white rounded-full flex justify-center p-1 backdrop-blur-sm transition-colors lg:translate-x-4 hover:border-primary/50">
            <motion.div
              animate={{
                y: [0, 20, 0],
                opacity: [1, 0.4, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-[0.3rem] h-[0.4rem] bg-white rounded-full shadow-[0_0_8px_rgba(126,255,212,0.8)]"
            />
          </div>
        </motion.div>
      </motion.div>

      <div className="container px-4 relative z-20 lg:translate-x-4 text-left flex flex-col items-start">
        <div className="text-left max-w-[35rem] lg:max-w-[45rem]">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`${isPoland ? 'text-[2.3rem] text-left' : 'text-[2.6rem] text-left'} sm:text-[2.7rem] md:text-[2.8rem] lg:text-[3.6rem] font-heading font-bold text-white tracking-tight leading-tight max-w-7xl`}
          >
            {t('home.hero.title1')} <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-[#00CED1] italic pr-2">
              {t('home.hero.title1_highlight')}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-[0.98rem] sm:text-[1rem] md:text-[1.1rem] text-white max-w-[22rem] sm:max-w-[28rem] lg:max-w-[36rem] text-left sm:text-left sm:mt-6 mt-4 font-light"
          >
            {t('home.hero.subtitle')} <br />
            {t('home.hero.subtitle2')}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="relative flex flex-col sm:flex-row gap-2 sm:w-auto pt-8"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="md:px-4 px-4 text-xs tracking-widest font-medium transition-colors uppercase text-primary border-primary hover:bg-primary hover:text-primary-foreground mt-3 sm:mt-6 xl:mt-8"
          >
            <Link to={`/${currentLang}/contact`}>
              {t('home.hero.cta_tech').toUpperCase()}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
