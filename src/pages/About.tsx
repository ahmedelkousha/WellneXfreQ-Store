import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Activity, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import AffiliateCTA from "@/components/sections/AffiliateCTA";
import coachPatrycjaImg from "@assets/patrycja-coach.png";
import aboutCover from "@assets/about-cover.png";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export default function About() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background min-h-screen pb-20 md:pb-0">
      <SEO 
        title={t("seo.about.title")} 
        description={t("seo.about.description")} 
      />

      {/* HERO */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-b from-background/50 via-background/85 to-background z-10" />
          <img
            src={aboutCover}
            alt="About wellneXfreQ"
            className="w-full h-full object-cover object-center opacity-40 grayscale"
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            {t("about.hero.tagline")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight"
          >
            {t("about.hero.title")}{" "}
            <span className="italic font-light text-primary">{t("about.hero.title_italic_1")}</span>
            <br />
            {t("about.hero.title_and")}{" "}
            <span className="italic font-light text-primary">{t("about.hero.title_italic_2")}</span>
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-[#00CED1]">
              {t("about.hero.title_highlight")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-light"
          >
            {t("about.hero.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-24 relative bg-white/2 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeIn}
                className="mb-6 inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm uppercase tracking-widest text-primary font-semibold"
              >
                {t("about.story.badge")}
              </motion.div>

              <motion.h2
                variants={fadeIn}
                className="text-3xl md:text-5xl font-heading font-bold text-white mb-8 leading-tight"
              >
                {t("about.story.title")} <span className="italic font-light text-primary">{t("about.story.title_highlight")}</span>
              </motion.h2>

              <motion.div variants={fadeIn} className="space-y-6 text-lg text-white/70 leading-relaxed">
                <p>
                  {t("about.story.p1")}
                </p>
                <p>
                  {t("about.story.p2")}
                </p>
                <p>
                  {t("about.story.p3")}
                </p>
                <p>
                  {t("about.story.p4")}
                </p>

                <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 text-xl font-heading font-medium text-white italic">
                  "{t("about.story.quote")}"
                </blockquote>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative h-[560px] lg:h-[680px] rounded-3xl overflow-hidden group"
            >
              <img
                src={coachPatrycjaImg}
                alt="Strength & Movement Coach"
                className="w-full h-full object-contain transition-transform duration-700 scale-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating credential card */}
              <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl z-20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">13+ Years</div>
                    <div className="text-white/60 text-sm">Biohacking &amp; Movement Experience</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DUAL TECHNOLOGY */}
      <section className="py-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm uppercase tracking-widest text-primary font-semibold mb-6">
              {t("about.tech.badge")}
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              {t("about.tech.title")} <span className="text-primary italic font-light">{t("about.tech.title_highlight")}</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              {t("about.tech.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* PEMF */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="relative bg-card/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-10 hover:border-primary/30 transition-colors group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[60px] rounded-full pointer-events-none" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <span className="text-primary font-mono text-sm font-bold tracking-widest">01</span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-2">{t("about.tech.pemf_title")}</h3>
              <p className="text-primary text-sm font-medium mb-4 italic">{t("about.tech.pemf_subtitle")}</p>
              <p className="text-white/70 leading-relaxed mb-6">
                {t("about.tech.pemf_desc")}
              </p>
              <ul className="space-y-3">
                {(() => {
                  const benefits = t("about.tech.pemf_benefits", { returnObjects: true });
                  if (!Array.isArray(benefits)) return null;
                  return benefits.map((b: any, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                      <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        {b.label && <span className="text-primary font-bold mr-1.5">{b.label}:</span>}
                        <span className="text-white/70">{b.desc || b}</span>
                      </div>
                    </li>
                  ));
                })()}
              </ul>
            </motion.div>

            {/* Terahertz */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{ ...fadeIn, visible: { ...fadeIn.visible, transition: { duration: 0.8, ease: "easeOut", delay: 0.15 } } }}
              className="relative bg-card/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-10 hover:border-primary/30 transition-colors group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6 text-cyan-400" />
                </div>
                <span className="text-cyan-400 font-mono text-sm font-bold tracking-widest">02</span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-2">{t("about.tech.thz_title")}</h3>
              <p className="text-cyan-400 text-sm font-medium mb-4 italic">{t("about.tech.thz_subtitle")}</p>
              <p className="text-white/70 leading-relaxed mb-6">
                {t("about.tech.thz_desc")}
              </p>
              <ul className="space-y-3">
                {(() => {
                  const benefits = t("about.tech.thz_benefits", { returnObjects: true });
                  if (!Array.isArray(benefits)) return null;
                  return benefits.map((b: any, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                      <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        {b.label && <span className="text-cyan-400 font-bold mr-1.5">{b.label}:</span>}
                        <span className="text-white/70">{b.desc || b}</span>
                      </div>
                    </li>
                  ));
                })()}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center bg-card/40 border border-white/10 rounded-3xl p-10 md:p-16 backdrop-blur-sm"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              {t("home.cta.title")}<span className="text-primary">{t("home.cta.title_highlight")}</span>
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              {t("home.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 rounded-full shadow-[0_0_30px_rgba(126,255,212,0.3)] transition-all hover:scale-105 group">
                <Link to={`/${currentLang}/contact`}>
                  {t("home.cta.button")} <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 border-white/20 text-white hover:bg-white/5 transition-all rounded-full">
                <Link to={`/${currentLang}/products`}>{t("home.products.view_all")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <AffiliateCTA />
    </div>
  );
}
