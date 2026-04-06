import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
// import { useBlogs } from "@/hooks/useBlogs";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";
import DualTechTable from '@/components/sections/DualAction';
import DualTechFeatures from '@/components/sections/DualActionFeatures';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AffiliateCTA from "@/components/sections/AffiliateCTA";

import heroImg from "@assets/mountain.png";
import coachBlankingImg from "@assets/patrycja-coach.png";
import coachBoulderImg from "@assets/Screen-Shot-2026-03-31-at-9.51.10-am_1775036665248.png";
import bloodAnalysisVideo from "@assets/Livebloodanalysisfb.mp4";
import videoPoster from "@assets/poster.png";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0];
  const { scrollYProgress } = useScroll();
  const { data: products = [] } = useProducts();
  // Blogs DISABLED
  // const { data: blogs = [], isLoading: blogsLoading } = useBlogs();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Testimonials Embla Hook
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "start",
    skipSnaps: false
  });

  // Products Embla Hook
  const [productsEmblaRef, productsEmblaApi] = useEmblaCarousel({ 
    loop: false, 
    align: "start",
    skipSnaps: false
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const [productsSelectedIndex, setProductsSelectedIndex] = useState(0);
  const [productsScrollSnaps, setProductsScrollSnaps] = useState<number[]>([]);
  const [productsPrevBtnDisabled, setProductsPrevBtnDisabled] = useState(true);
  const [productsNextBtnDisabled, setProductsNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const productsScrollPrev = useCallback(() => productsEmblaApi && productsEmblaApi.scrollPrev(), [productsEmblaApi]);
  const productsScrollNext = useCallback(() => productsEmblaApi && productsEmblaApi.scrollNext(), [productsEmblaApi]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  const onProductsSelect = useCallback(() => {
    if (!productsEmblaApi) return;
    setProductsSelectedIndex(productsEmblaApi.selectedScrollSnap());
    setProductsPrevBtnDisabled(!productsEmblaApi.canScrollPrev());
    setProductsNextBtnDisabled(!productsEmblaApi.canScrollNext());
  }, [productsEmblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!productsEmblaApi) return;
    onProductsSelect();
    setProductsScrollSnaps(productsEmblaApi.scrollSnapList());
    productsEmblaApi.on("select", onProductsSelect);
    productsEmblaApi.on("reInit", onProductsSelect);
  }, [productsEmblaApi, onProductsSelect]);

  useEffect(() => {
    const pending = sessionStorage.getItem("pendingScroll");
    if (pending) {
      sessionStorage.removeItem("pendingScroll");
      setTimeout(() => {
        const el = document.getElementById(pending);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, []);

  return (
    <div className="bg-background min-h-screen overflow-hidden">
      {/* HERO SECTION */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/45 to-background/40 z-10" />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-background/5 to-background/60 z-10" /> */}
          <img
            src={heroImg}
            alt="PEMF Therapy"
            className="w-full h-full object-cover sm:object-bottom-left lg:object-bottom"
          />
        </motion.div>

        <div className="container mx-auto px-4 relative z-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" as const }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full -translate-y-24 md:-translate-y-8 border border-primary/30 bg-primary/10 text-primary text-sm font-medium backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {t("home.hero.tagline")}
          </motion.div>
          <div className="text-left">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-heading font-bold text-white tracking-tight leading-tight max-w-7xl mx-auto"
            >
              {t("home.hero.title1")} <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-[#00CED1]">{t("home.hero.title1_highlight")}</span>
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-heading font-bold text-white tracking-tight leading-tight max-w-7xl mx-auto"
            >
              {t("home.hero.title2")} <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-[#00CED1]">{t("home.hero.title2_highlight")}</span>
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-heading font-bold text-white tracking-tight leading-tight max-w-7xl mx-auto"
            >
              {t("home.hero.title3")} <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-[#00CED1]">{t("home.hero.title3_highlight")}</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-lg text-white/70 md:max-w-lg sm:max-w-sm max-w-xs mx-auto mt-10 font-light"
          >
            {t("home.hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-row sm:flex-row gap-2 sm:w-auto pt-8"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 sm:px-4 px-2 sm:text-base text-sm shadow-[0_0_30px_rgba(126,255,212,0.3)] border border-primary/50 transition-all hover:scale-105 cursor-pointer"
              onClick={() => scrollToSection("technology")}
            >
              {t("home.hero.cta_tech")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 border-white/20 text-white sm:px-4 px-2 sm:text-base text-sm hover:bg-white/5 transition-all cursor-pointer"
              onClick={() => scrollToSection("philosophy")}
            >
              {t("home.hero.cta_phil")}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* THE JOURNEY SECTION */}
      <section id="philosophy" className="py-32 bg-white/2 relative overflow-hidden scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-8 leading-tight">
                  {t("home.philosophy.title")} <span className="text-primary italic font-light">{t("home.philosophy.title_italic_1")}</span><br />
                  {t("home.philosophy.subtitle")} <span className="text-primary italic font-light">{t("home.philosophy.subtitle_italic_2")}</span><br />
                  {t("home.philosophy.title_3")} <span className="text-primary italic font-light">{t("home.philosophy.title_highlight_3")}</span>
                </h2>
                <p className="text-sm md:text-lg text-white/70 mb-8 leading-relaxed">
                  {t("home.philosophy.text1")}
                </p>
                <p className="text-sm md:text-lg text-white/70 mb-8 leading-relaxed">
                  {t("home.philosophy.text2")}
                </p>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="lg:hidden block relative rounded-3xl overflow-hidden group"
                >
                  <img
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
                      <span className="text-sm uppercase tracking-widest text-white/40 font-medium">{t("home.philosophy.coach")}</span>
                    </div>
                  </div>
                </motion.div>

                <div className="border-l-3 py-1 border-primary/50 pl-4 my-10 italic">
                  <p className="text-md text-white/70 leading-relaxed">
                    {t("home.philosophy.coach_text")}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-8">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6 rounded-full shadow-[0_0_20px_rgba(126,255,212,0.2)] transition-all hover:scale-105 group">
                    <Link to={`/${currentLang}/about`}>{t("home.philosophy.learn_more")} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></Link>
                  </Button>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="lg:block hidden relative o rounded-3xl overflow-hidden group"
            >
              <img
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
                  <span className="text-sm uppercase tracking-widest text-white/40 font-medium">{t("home.philosophy.coach")}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div id="technology">
        <DualTechTable />
      </div>
      
      <DualTechFeatures />

      
      {/* SCIENCE/TECH EXPLAINER */}
      {/* <section id="technology" className="py-32 relative border-b border-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              {t("home.tech.science_title")}<br /><span className="text-primary italic font-light">{t("home.tech.science_title_italic")}</span>
            </h2>
            <p className="text-white/60 max-w-3xl mx-auto text-lg text-left">
              {t("home.tech.science_subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12 hover:border-primary/30 transition-colors group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-white mb-4">{t("home.tech.pemf_title")}</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                {t("home.tech.pemf_desc")}
              </p>
              <ul className="space-y-3">
                {(t("home.tech.pemf_benefits", { returnObjects: true }) as string[]).map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" /> {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12 hover:border-primary/30 transition-colors group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-white mb-4">{t("home.tech.thz_title")}</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                {t("home.tech.thz_desc")}
              </p>
              <ul className="space-y-3">
                {(t("home.tech.thz_benefits", { returnObjects: true }) as string[]).map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" /> {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div> */}

          {/* Benefits Grid */}

          {/* <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mt-20"
          >
            {[
              { icon: ShieldCheck, title: t("home.tech.repair"), desc: t("home.tech.repair_desc") },
              { icon: Activity, title: t("home.tech.recovery"), desc: t("home.tech.recovery_desc") },
              { icon: Battery, title: t("home.tech.oxygenate"), desc: t("home.tech.oxygenate_desc") },
              { icon: Zap, title: t("home.tech.activate"), desc: t("home.tech.activate_desc") },
              { icon: Star, title: t("home.tech.flow"), desc: t("home.tech.flow_desc") },
              { icon: Quote, title: t("home.tech.balance"), desc: t("home.tech.balance_desc") },
            ].map((benefit, i) => (
              <div key={i} className="p-4 sm:p-5 md:p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center group hover:bg-primary/5 hover:border-primary/20 transition-all backdrop-blur-sm">
                <benefit.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-[10px] md:text-[11px] mb-2 tracking-widest uppercase">{benefit.title}</h4>
                <p className="text-white/40 text-[11px] md:text-xs leading-relaxed font-medium transition-colors group-hover:text-white/60">{benefit.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* PRODUCTS SECTION */}
      <section className="py-32 relative bg-white/2">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              {t("home.products.title")}<br /><span className="text-primary italic">{t("home.products.title_highlight")}</span>
            </h2>
            <p className="text-lg text-white/60 text-left">
              {t("home.products.subtitle")}
            </p>
          </motion.div>

          {/* Products Embla Container */}
          <div className="relative group/embla">
            <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={productsEmblaRef}>
              <div className="flex gap-6 md:gap-8">
                {products.length > 0 ? (
                  products.map((product, index) => {
                    const isFeatured = index === 0;
                    return (
                      <div
                        key={product.id}
                        className={`${isFeatured ? "flex-[0_0_90%] md:flex-[0_0_80%]" : "flex-[0_0_80%] sm:flex-[0_0_50%] md:flex-[0_0_calc(33.333%-1.33rem)]"} min-w-0`}
                      >
                        <motion.div
                          variants={fadeIn}
                          transition={{ delay: index * 0.1 }}
                          className={`group relative bg-card border border-white/5 rounded-2xl hover:border-primary/40 hover:shadow-[0_0_40px_rgba(126,255,212,0.08)] flex flex-col h-full ${
                            isFeatured ? "md:flex-row h-auto" : ""
                          }`}
                        >
                          <Link 
                            to={`/${currentLang}/product/${product.slug}`} 
                            className={`block overflow-hidden relative rounded-t-2xl ${
                              isFeatured ? "md:w-1/2 aspect-video md:aspect-auto md:rounded-l-2xl md:rounded-tr-none" : "aspect-4/3"
                            }`}
                          >
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10"></div>
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {isFeatured && (
                              <div className="absolute top-4 left-4 z-20">
                                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded bg-primary text-black/80">
                                  Featured
                                </span>
                              </div>
                            )}
                            <div className="absolute bottom-4 left-4 z-20 right-4 text-left">
                              <h3 className={`${isFeatured ? "text-xl md:text-2xl" : "text-lg"} font-heading font-bold text-white mb-1`}>
                                {currentLang === "pl" ? (product.name_pl || product.name) : product.name}
                              </h3>
                            </div>
                          </Link>
                          <div className={`p-6 flex flex-col grow text-left ${isFeatured ? "md:w-1/2 md:p-8 justify-center" : ""}`}>
                            <p className={`text-white/50 mb-6 grow ${isFeatured ? "text-sm md:text-base line-clamp-4" : "text-sm line-clamp-3"}`}>
                              {currentLang === "pl" ? (product.tagline_pl || product.tagline) : (product.tagline || product.description)}
                            </p>
                            <Button asChild className={`w-full bg-white/5 hover:bg-primary hover:text-primary-foreground text-white border border-white/10 hover:border-primary transition-all group/btn ${isFeatured ? "md:w-max px-6 h-10" : ""}`}>
                              <Link to={`/${currentLang}/product/${product.slug}`}>
                                {t("home.products.view")} <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                              </Link>
                            </Button>
                          </div>
                        </motion.div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex-[0_0_100%] text-center py-12 text-white/50">
                    {t("shop.list.empty")}
                  </div>
                )}
              </div>
            </div>

            {/* Products Navigation */}
            {products.length > 0 && productsScrollSnaps.length > 1 && (
              <div className="flex items-center justify-center gap-6 mt-12 pb-4">
                <button
                  onClick={productsScrollPrev}
                  disabled={productsPrevBtnDisabled}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary disabled:opacity-30 transition-all hover:bg-white/10 active:scale-95"
                  aria-label="Previous products"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2.5">
                  {productsScrollSnaps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => productsEmblaApi?.scrollTo(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        productsSelectedIndex === index ? "bg-primary w-6" : "bg-white/20"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={productsScrollNext}
                  disabled={productsNextBtnDisabled}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary disabled:opacity-30 transition-all hover:bg-white/10 active:scale-95"
                  aria-label="Next products"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:scale-105 shadow-[0_0_20px_rgba(126,255,212,0.15)] group h-12 px-8">
              <Link to={`/${currentLang}/products`}>
                {t("home.products.view_all")} <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* BLOG SECTION */}
      {/* <section id="blog" className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              {t("home.blog.title")}<br /><span className="text-primary italic">{t("home.blog.title_highlight")}</span>
            </h2>
            <p className="text-lg text-white/60">
              {t("home.blog.subtitle")}
            </p>
          </motion.div>

          {blogsLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
          ) : (
            <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 pb-4 scrollbar-hide">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="flex gap-6 w-max md:w-auto md:grid md:grid-cols-3"
              >
                {blogs.slice(0, 3).map((post, idx) => (
                  <motion.div
                    key={post.id}
                    variants={fadeIn}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(126,255,212,0.08)] w-80 md:w-auto shrink-0 md:shrink flex flex-col h-full"
                  >
                    <Link to={`/${currentLang}/blog/${post.slug}`} className="block aspect-video overflow-hidden relative">
                      <div className="absolute inset-0 bg-linear-to-t from-card/80 to-transparent z-10 transition-opacity"></div>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 z-20">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full border bg-primary/10 text-primary border-primary/30">
                          {currentLang === "pl" ? (post.category_pl || post.category) : post.category}
                        </span>
                      </div>
                    </Link>
                    <div className="p-6 flex flex-col grow">
                      <h3 className="text-xl font-heading font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {currentLang === "pl" ? (post.title_pl || post.title) : post.title}
                      </h3>
                      <p className="text-white/50 text-sm mb-6 line-clamp-3 leading-relaxed grow">
                        {currentLang === "pl" ? (post.excerpt_pl || post.excerpt) : post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-white/30 border-t border-white/5 pt-4">
                        <span className="flex items-center gap-1.5">
                          <Activity className="w-3 h-3 text-primary" />
                          {currentLang === "pl" ? (post.readTime_pl || post.readTime) : post.readTime}
                        </span>
                        <span>{currentLang === "pl" ? (post.date_pl || post.date) : post.date}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <Button asChild variant="ghost" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:scale-105 shadow-[0_0_20px_rgba(126,255,212,0.15)] group h-12 px-8">
              <Link to={`/${currentLang}/blog`}>
                {t("home.blog.view_all")} <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section> */}

      {/* TESTIMONIALS SECTION */}
      <section className="py-32 relative border-t border-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              {t("home.testimonials.title")}<br /><span className="text-primary">{t("home.testimonials.title_highlight")}</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg text-left">
              {t("home.testimonials.subtitle")}
            </p>
          </motion.div>

          <div className="relative group">
            <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
              <div className="flex gap-8">
                {(t("home.testimonials.items", { returnObjects: true }) as any[]).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex-[0_0_100%] md:flex-[0_0_calc(33.333%-1.33rem)] min-w-0 bg-card/40 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-primary/30 group"
                  >
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-white/80 italic mb-8 leading-relaxed text-lg quote-marks">
                      "{item.quote}"
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {item.name[0]}
                      </div>
                      <div>
                        <h4 className="text-white font-bold">{item.name}</h4>
                        <p className="text-white/40 text-xs uppercase tracking-widest">{item.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials Navigation */}
            <div className="flex items-center justify-center gap-6 mt-12 pb-4">
              <button
                onClick={scrollPrev}
                disabled={prevBtnDisabled}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary disabled:opacity-30 transition-all hover:bg-white/10 active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2.5">
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      selectedIndex === index ? "bg-primary w-6" : "bg-white/20"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={scrollNext}
                disabled={nextBtnDisabled}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary disabled:opacity-30 transition-all hover:bg-white/10 active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 flex justify-center"
          >
            <div className="relative group max-w-4xl w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              {/* <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-md border border-primary/50 flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                  <Activity className="w-10 h-10 text-primary fill-primary" />
                </div>
              </div> */}
              <video
                src={bloodAnalysisVideo}
                controls
                poster={videoPoster}
                className="w-full h-full aspect-video p-2 rounded-4xl object-cover transition-transform duration-700 group-hover:scale-[101%]"
              />
              <div className="absolute bottom-6 right-6 z-20 text-white/40 text-xs font-mono uppercase tracking-widest">
                Blood Analysis after PEMF session
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="md:py-26 py-10 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              {t("home.faqs.title")}<br /><span className="text-primary">{t("home.faqs.title_highlight")}</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <Accordion type="single" collapsible className="w-full">
              {(t("home.faqs.items", { returnObjects: true }) as any[]).map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-white/10 py-2">
                  <AccordionTrigger className="text-left md:text-lg text-sm font-medium text-white hover:text-primary transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 leading-relaxed md:text-base text-sm">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={coachBoulderImg} alt="Background" className="w-full h-full object-cover object-center opacity-20 grayscale" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-background"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto bg-card/60 backdrop-blur-2xl border border-primary/20 rounded-[3rem] p-10 md:p-20 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              {t("home.cta.title")}<span className="text-primary">{t("home.cta.title_highlight")}</span>
            </h2>
            <p className="md:text-xl text-md text-white/70 mb-10 max-w-2xl mx-auto">
              {t("home.cta.subtitle")}
            </p>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-10 text-lg rounded-full shadow-[0_0_40px_rgba(126,255,212,0.4)] transition-all hover:scale-105 group">
              <Link to={`/${currentLang}/products`}>
                {t("home.cta.button")} <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <AffiliateCTA />
    </div>
  );
}
