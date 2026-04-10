import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export default function Privacy() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  const currentLang = lang || i18n.language.split("-")[0] || "en";

  const sections = t("privacy.sections", { returnObjects: true }) as Array<{ title: string; body: string }>;

  return (
    <div className="bg-background min-h-screen pb-20 md:pb-0" id="privacy-policy-page">
      {/* Header */}
      <div className="pt-32 pb-16 relative border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full" />
        </div>
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button 
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
              <span className="uppercase tracking-widest leading-none font-medium">{t("common.navigation.back")}</span>
            </button>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-6">
              {t("privacy.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{t("privacy.title")}</h1>
            <p className="text-white/50 text-sm">
              {t("privacy.effective_date")} <span className="text-white/70">{t("privacy.date")}</span>
            </p>
            <p className="text-white/60 mt-6 leading-relaxed">
              {t("privacy.intro")}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-3xl py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="space-y-12"
        >
          {Array.isArray(sections) && sections.map((section, i) => (
            <motion.div key={i} variants={fadeIn} className="space-y-3">
              <h2 className="text-xl font-heading font-bold text-white">
                {i + 1}. {section.title}
              </h2>
              <p className="text-white/65 leading-relaxed text-base">
                {section.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-white/40"
        >
          <p>{t("privacy.footer_text", { year: new Date().getFullYear() })}</p>
          <Link to={`/${currentLang}/contact`} className="text-primary hover:text-primary/80 transition-colors">
            {t("privacy.footer_link")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
