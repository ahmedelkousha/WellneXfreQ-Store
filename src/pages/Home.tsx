import { motion, useScroll, useTransform } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';
import { useTranslation } from 'react-i18next';
import useEmblaCarousel from 'embla-carousel-react';
import DualTechPanel from '@/components/sections/DualAction';
import DualTechFeatures from '@/components/sections/DualActionFeatures';
import { ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import featuredProductImgSm from '@assets/featured-product-sm.png';
import featuredProductImgLg from '@assets/featured-product-lg.webp';
import featuredProductImgPhone from '@assets/featured-product-phone.png';
import heroImg from '@assets/hero-scale.jpeg';
import coachBlankingImg from '@assets/patrycja-coach.png';
import bloodAnalysisVideo from '@assets/Livebloodanalysisfb.mp4';
import videoPoster from '@assets/poster.png';
import Contact from './Contact';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function Home() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0];
  const { scrollYProgress } = useScroll();
  const { data: products = [] } = useProducts();
  const featuredProduct = products.find((p) => p.isFeatured) || products[0];
  const isActualFeatured = products.some((p) => p.isFeatured);
  const isPoland = i18n.language === 'pl';

  // Carousel State
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    dragFree: true,
    containScroll: 'trimSnaps',
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '250%']);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

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

      {/* HERO SECTION */}
      <section
        id="hero"
        className={`relative h-svh flex items-center justify-center overflow-hidden rounded-b-4xl md:rounded-b-[3rem] z-10 border-b border-white/10 shadow-[0_10px_50px_rgba(0,0,0,0.5)]`}
      >
        <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-linear-to-b from-background/50 via-background/45 to-background/40 z-10" />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-background/5 to-background/60 z-10" /> */}
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
            {/* <span className="text-[9px] uppercase tracking-[0.3em] text-white/60 font-medium">Scroll</span> */}
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
            {/* <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className={`${isPoland ? "text-[1.4rem] text-left" : "text-[1.7rem] text-left"} sm:text-3xl md:text-[2rem] lg:text-[2.4rem] font-heading font-bold text-white tracking-tight leading-tight max-w-7xl`}
            >
              {t("home.hero.title2")} <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-[#00CED1] italic pr-1">{t("home.hero.title2_highlight")}</span>
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`${isPoland ? "text-[1.4rem] text-left" : "text-[1.7rem] text-left"} sm:text-3xl md:text-[2rem] lg:text-[2.4rem] font-heading font-bold text-white tracking-tight leading-tight max-w-7xl`}
            >
              {t("home.hero.title3")} <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-[#00CED1] italic pr-1">{t("home.hero.title3_highlight")}</span>
            </motion.h2> */}

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] text-white max-w-[22rem] sm:max-w-[28rem] lg:max-w-[36rem] text-left sm:text-left sm:mt-6 mt-4 font-light"
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

      <div id="technology">
        <DualTechPanel />
        <DualTechFeatures />
      </div>

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-20 relative bg-white/2">
        <div className="mx-auto sm:px-4 h-full w-full px-2">
          <motion.div
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto pb-20"
          >
            <h3 className="font-heading text-primary text-xs tracking-[0.2em] font-semibold mb-4 uppercase">
              {t('home.products.badge')}
            </h3>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
              {t('home.products.title')}
              <br />
              <span className="text-primary italic font-normal">
                {t('home.products.title_highlight')}
              </span>
            </h2>
            <p className="text-sm md:text-lg max-w-3xl mx-auto text-center text-white/60 md:px-16 px-4">
              {t('home.products.subtitle')}
            </p>
          </motion.div>

          {/* Featured Product Card */}
          <motion.div
            variants={fadeIn}
            className="relative w-auto h-[670px] sm:h-[940px] rounded-3xl overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5"
          >
            {/* Background Image Setup */}

            {/* Large Image */}
            <div className="hidden xl:block absolute inset-0 z-0 h-full w-full">
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/5 via-black/5 to-transparent z-10" />
              <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/20 via-black/20 to-transparent z-10 lg:block hidden" />
              <img
                loading="lazy"
                src={featuredProductImgLg}
                alt="OlyLife THz Tera-P90+"
                className="h-[940px] w-full object-cover object-bottom transition-transform duration-1000 group-hover:scale-[1.03]"
              />
            </div>

            {/* Small Image */}
            <div className="sm:block hidden xl:hidden absolute inset-0 z-0 h-full w-full">
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/5 via-black/5 to-transparent z-10" />
              <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/20 via-black/20 to-transparent z-10 lg:block hidden" />
              <img
                loading="lazy"
                src={featuredProductImgSm}
                alt="OlyLife THz Tera-P90+"
                className="h-[940px] w-full object-cover object-[72%] transition-transform duration-1000 group-hover:scale-[1.03]"
              />
            </div>

            {/* Mobile Image */}
            <div className="sm:hidden block absolute inset-0 z-0 h-full w-full">
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/5 via-black/5 to-transparent z-10" />
              <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/20 via-black/20 to-transparent z-10 lg:block hidden" />
              <img
                loading="lazy"
                src={featuredProductImgPhone}
                alt="OlyLife THz Tera-P90+"
                className="h-[670px] w-full object-cover object-[72%] transition-transform duration-1000 group-hover:scale-[1.03]"
              />
            </div>

            {/* Content overlay */}
            <div className="relative z-20 h-full w-full flex flex-col justify-start p-8 md:p-16 sm:p-12 lg:p-30">
              <div className="lg:max-w-xl text-left w-full">
                {isActualFeatured && (
                  <span className="bg-secondary w-fit p-3 rounded-lg text-primary font-bold text-[11px] uppercase tracking-[0.25em] mb-5 block drop-shadow-md">
                    {t('home.products.featured_badge')}
                  </span>
                )}

                <h3 className="text-[1.4rem] sm:text-4xl lg:text-6xl font-heading font-bold text-white mb-4 drop-shadow-lg">
                  {t('home.products.featured_title')}
                </h3>
                <p className="text-[0.9rem] sm:text-lg text-white/70 mb-4 sm:mb-10 max-w-md font-light leading-relaxed">
                  {t('home.products.featured_desc')}
                </p>

                <div className="flex flex-col gap-6 items-start w-fit">
                  <Link
                    to={
                      featuredProduct
                        ? `/${currentLang}/product/${featuredProduct.slug}`
                        : `/${currentLang}/products`
                    }
                    className="sm:px-4 gap-[6px] sm:py-4 px-3 py-3 rounded-lg bg-primary text-black font-bold uppercase tracking-widest text-[0.65rem] sm:text-[0.8rem] hover:bg-white transition-all text-center inline-flex items-center justify-center shadow-[0_0_20px_rgba(102,248,219,0.3)] hover:shadow-[0_0_15px_rgba(102,248,219,0.5)] hover:-translate-y-1 w-fit"
                  >
                    {t('home.products.learn_more')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to={`/${currentLang}/products`}
                    className="text-white/50 gap-[6px] hover:text-primary transition-colors text-[10px] sm:text-[13px] font-semibold uppercase tracking-widest inline-flex items-center group/link w-full sm:w-auto justify-center sm:justify-start"
                  >
                    {t('home.products.view_all')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* TESTIMONIALS SECTION */}
      <section className="py-32 relative border-t border-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h3 className="font-heading text-primary text-xs tracking-[0.2em] font-semibold mb-4 uppercase">
              {t('home.blood_analysis.badge')}
            </h3>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
              {t('home.blood_analysis.title')}
              <br />
              <span className="text-primary italic font-normal">
                {t('home.blood_analysis.title_highlight')}
              </span>
            </h2>
            <p className="text-white/60 max-w-3xl mx-auto text-sm leading-relaxed md:text-lg text-center">
              {t('home.blood_analysis.subtitle')}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="relative group max-w-4xl w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          
            <video
              src={bloodAnalysisVideo}
              controls
              preload="none"
              poster={videoPoster}
              className="w-full h-full aspect-video p-2 rounded-4xl object-cover transition-transform duration-700 group-hover:scale-[101%]"
            />
            <div className="absolute bottom-6 right-6 z-20 text-white/40 text-xs font-mono uppercase tracking-widest">
              Blood Analysis after PEMF session
            </div>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 pt-40">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeIn}
            className="text-center mb-20"
          >
            <h3 className="font-heading text-primary text-xs tracking-[0.2em] font-semibold mb-4 uppercase">
              {t('home.testimonials.badge')}
            </h3>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
              {t('home.testimonials.title')}
              <br />
              <span className="text-primary italic font-normal">
                {t('home.testimonials.title_highlight')}
              </span>
            </h2>
            <p className="text-white/60 max-w-3xl mx-auto text-sm md:text-lg text-center">
              {t('home.testimonials.subtitle')}
            </p>
          </motion.div>

          <div className="relative">
            {/* Carousel Viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6 md:gap-8">
                {(
                  t('home.testimonials.items', { returnObjects: true }) as any[]
                ).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex-[0_0_100%] md:flex-[0_0_calc(50%-1rem)] lg:flex-[0_0_calc(33.333%-1.33rem)] min-w-0"
                  >
                    <div className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-[2rem] p-8 md:p-10 hover:border-primary/30 group transition-all flex flex-col h-full shadow-lg">
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-primary text-primary"
                          />
                        ))}
                      </div>
                      <p className="text-white/80 italic mb-10 leading-relaxed text-lg quote-marks">
                        "{item.quote}"
                      </p>
                      <div className="flex items-center gap-4 mt-auto">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0 border border-primary/20">
                          {'0' + (idx + 1)}
                        </div>
                        <div>
                          <h4 className="text-white font-bold tracking-tight">
                            {item.name}
                          </h4>
                          <p className="text-white/40 text-[10px] uppercase tracking-[0.2em]">
                            {item.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Unified Navigation controls (Arrows and Dots) */}
            <div className="flex items-center justify-center gap-6 mt-12 mb-8">
              <Button
                size="icon"
                variant="ghost"
                onClick={scrollPrev}
                disabled={prevBtnDisabled}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-primary hover:text-black hover:border-primary disabled:opacity-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <div className="flex items-center gap-2">
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex ? 'bg-primary w-8' : 'bg-white/10 w-4 hover:bg-white/20'}`}
                  />
                ))}
              </div>

              <Button
                size="icon"
                variant="ghost"
                onClick={scrollNext}
                disabled={nextBtnDisabled}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-primary hover:text-black hover:border-primary disabled:opacity-20"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Disclaimer */}
            <div className="text-center mt-12">
              <p className="text-white/40 text-[10px] uppercase tracking-widest italic max-w-2xl mx-auto opacity-60">
                {t('home.testimonials.disclaimer')}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* THE JOURNEY SECTION */}
      <section
        id="philosophy"
        className="py-32 bg-white/2 relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn}>
                <h3 className="font-heading text-primary text-xs tracking-[0.2em] font-semibold mb-4 uppercase">
                  {t('home.philosophy.badge')}
                </h3>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-8 leading-tight">
                  {t('home.philosophy.title')}{' '}
                  <span className="text-primary italic font-normal">
                    {t('home.philosophy.title_italic_1')}
                  </span>
                  <br />
                  {t('home.philosophy.subtitle')}{' '}
                  <span className="text-primary italic font-normal">
                    {t('home.philosophy.subtitle_italic_2')}
                  </span>
                  <br />
                  {t('home.philosophy.title_3')}{' '}
                  <span className="text-primary italic font-normal">
                    {t('home.philosophy.title_highlight_3')}
                  </span>
                </h2>
                <p className="text-sm md:text-lg text-white/70 mb-8 leading-relaxed">
                  {t('home.philosophy.text1')}
                </p>
                <p className="text-sm md:text-lg text-white/70 mb-8 leading-relaxed">
                  {t('home.philosophy.text2')}
                </p>

                {/* Mobile Image */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="lg:hidden block relative rounded-3xl overflow-hidden group"
                >
                  <img
                    loading="lazy"
                    src={coachBlankingImg}
                    alt="Coach jumping"
                    className="w-full h-full object-contain md:object-fit transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Floating card */}
                  <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary text-xs font-bold bg-primary/5">
                        13+
                      </div>
                      <span className="text-sm uppercase tracking-widest text-white/40 font-medium">
                        {t('home.philosophy.coach')}
                      </span>
                    </div>
                  </div>
                </motion.div>
                {/* End of mobile image */}

                <div className="border-l-3 py-1 border-primary/50 pl-4 my-10 italic">
                  <p className="text-sm md:text-lg text-left text-white/70 leading-relaxed">
                    "{t('home.philosophy.coach_text')}" <br />
                    <span className="text-primary italic text-base mt-2 inline-block font-normal">
                      — Patrycja
                    </span>
                  </p>
                </div>

                <div className="block lg:hidden border-l-3 py-1 border-primary/50 pl-4 my-10">
                  <p className="text-sm md:text-lg text-left text-white/70 leading-relaxed">
                    {t('home.philosophy.coach_text2')}{' '}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.fitin2it.com/"
                      className="text-primary text-sm md:text-lg text-left leading-relaxed"
                    >
                      {t('home.philosophy.coach_text2_highlight')}.
                    </a>
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-start gap-8">
                  <Button
                    asChild
                    className="sm:px-4 gap-[6px] sm:py-4 px-3 py-3 rounded-lg bg-primary text-black font-bold uppercase tracking-widest text-[0.65rem] sm:text-[0.8rem] hover:bg-white transition-all text-center inline-flex items-center justify-center shadow-[0_0_20px_rgba(102,248,219,0.3)] hover:shadow-[0_0_15px_rgba(102,248,219,0.5)] hover:-translate-y-1 w-fit"
                  >
                    <Link to={`/${currentLang}/contact`}>
                      {t('home.philosophy.learn_more').toUpperCase()}{' '}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </motion.div>

            {/* large screen image */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="lg:block hidden relative o rounded-3xl overflow-hidden group"
              >
                <img
                  loading="lazy"
                  src={coachBlankingImg}
                  alt="Coach jumping"
                  className="w-full h-full object-contain md:object-fit transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating card */}
                <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary text-xs font-bold bg-primary/5">
                      13+
                    </div>
                    <span className="text-sm uppercase tracking-widest text-white/40 font-medium">
                      {t('home.philosophy.coach')}
                    </span>
                  </div>
                </div>
              </motion.div>

              <div className="hidden lg:block border-l-3 py-1 border-primary/50 pl-4 my-10 italic">
                <p className="text-sm md:text-lg text-left text-white/70 leading-relaxed">
                  "{t('home.philosophy.coach_text2')}{' '}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.fitin2it.com/"
                    className="text-primary text-sm md:text-lg text-left leading-relaxed"
                  >
                    {t('home.philosophy.coach_text2_highlight')}.
                  </a>
                  "
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <AffiliateCTA /> */}
      <div id="contact">
        <Contact hideBackButton={true} />
      </div>
    </div>
  );
}
