import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Sparkles, TrendingUp } from "lucide-react";

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

export default function AffiliateCTA() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0];

  return (
    <section className="py-24 relative overflow-hidden bg-card/30 border-y border-white/5">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                {t("common.affiliate.title")}
              </motion.div>
              
              <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                {t("common.affiliate.hero_title")} <span className="text-primary italic">{t("common.affiliate.hero_highlight")}</span>
              </motion.h2>
              
              <motion.p variants={fadeIn} className="text-lg text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed">
                {t("common.affiliate.subtitle")}
              </motion.p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10 text-left max-w-2xl mx-auto">
                <motion.div variants={fadeIn} className="flex items-start gap-4 group/item">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover/item:border-primary/50 transition-colors">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">{t("common.affiliate.p1_title")}</h4>
                    <p className="text-white/40 text-sm">{t("common.affiliate.p1_desc")}</p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeIn} className="flex items-start gap-4 group/item">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover/item:border-primary/50 transition-colors">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">{t("common.affiliate.p2_title")}</h4>
                    <p className="text-white/40 text-sm">{t("common.affiliate.p2_desc")}</p>
                  </div>
                </motion.div>
              </div>

              <motion.div variants={fadeIn}>
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-10 rounded-full shadow-[0_0_30px_rgba(126,255,212,0.3)] transition-all hover:scale-105 group font-bold">
                  <Link to={`/${currentLang}/contact?type=affiliate`}>
                    {t("common.affiliate.button")} <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
