import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-white/50 hover:text-primary transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium uppercase tracking-widest">{t("common.navigation.back")}</span>
        </button>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6">{t("contact.hero.title")}</h1>
            <p className="text-xl text-white/60">
              {t("contact.hero.subtitle")}
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-card/50 border border-white/5 p-8 rounded-3xl backdrop-blur-sm">
              <h3 className="text-xl font-heading font-semibold text-white mb-6">{t("contact.info.title")}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50 mb-1">{t("contact.info.email")}</p>
                    <a href="mailto:your@wellnexfreq.com" className="text-white hover:text-primary transition-colors">your@wellnexfreq.com</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50 mb-1">{t("contact.info.phone")}</p>
                    <a href="tel:+61450334543" className="text-white hover:text-primary transition-colors">+61 450 334 543</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50 mb-1">{t("contact.info.location")}</p>
                    <p className="text-white">Australia | Poland</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 p-8 rounded-3xl">
              <h3 className="text-lg font-heading font-bold text-primary mb-3">{t("contact.help.title")}</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {t("contact.help.text")}
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 bg-card border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative"
          >
            <div className="absolute top-0 left-10 right-10 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"></div>
            <h2 className="text-2xl font-heading font-bold text-white mb-8">{t("contact.form.title")}</h2>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
