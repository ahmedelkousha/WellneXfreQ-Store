import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, ArrowLeft, Instagram, Facebook, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Contact({ hideBackButton = false }: { hideBackButton?: boolean }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="pt-28 pb-24 bg-background text-foreground relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-6 max-w-6xl relative z-10">

        {!hideBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-white/50 hover:text-primary transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-medium uppercase tracking-widest">{t("common.navigation.back")}</span>
          </button>
        )}

        <section className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">
            {t("contact.hero.badge") || "Get in Touch"}
          </p>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            {t("contact.hero.title")}
          </h1>
          <p className="text-sm md:text-base text-white/60 max-w-2xl">
            {t("contact.hero.subtitle")}
          </p>
        </section>

        <div className="grid gap-10 grid-cols-1  items-start">


          <aside className="space-y-6 flex flex-row justify-center flex-wrap sm:flex-nowrap gap-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-black/40 border border-white/10 rounded-3xl p-5 md:p-6 space-y-6 sm:w-1/2 m-0 w-full"
            >
              <h3 className="text-sm font-semibold text-white mb-4">{t("contact.info.title")}</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4 text-xs">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50 mb-0.5">{t("contact.info.email")}</p>
                    <a href={`mailto:${t("order.social.email")}`} className="text-white/90 hover:text-primary transition-colors">{t("order.social.email")}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-xs">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50 mb-0.5">{t("contact.info.phone")}</p>
                    <a href={`tel:${t("order.social.phone").replace(/\s/g, "")}`} className="text-white/90 hover:text-primary transition-colors">{t("order.social.phone")}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-xs">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50 mb-0.5">{t("contact.info.location")}</p>
                    <p className="text-white/90">Australia | Poland</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-black/40 border border-white/10 rounded-3xl p-5 md:p-6 space-y-4 sm:w-1/2 m-0 w-full"
            >
              {/* <h3 className="text-sm font-semibold text-white">
                {t("order.social.title")}
              </h3>
              <p className="text-xs text-white/70">{t("order.social.subtitle")}</p> */}

              <div className="grid grid-cols-2 gap-3 text-xs">
                <a
                  href={t("order.social.facebook")}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:border-primary hover:bg-primary/10 transition-colors"
                >
                  <Facebook className="h-4 w-4 text-primary" />
                  <div className="flex flex-col">
                    <span className="font-medium text-white/90">Facebook</span>
                    <span className="text-[10px] text-white/60">{i18n.language.startsWith("pl") ? "Poland" : "Australia"}</span>
                  </div>
                </a>
                <a
                  href={t("order.social.instagram")}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:border-primary hover:bg-primary/10 transition-colors"
                >
                  <Instagram className="h-4 w-4 text-primary" />
                  <div className="flex flex-col">
                    <span className="font-medium text-white/90">Instagram</span>
                    <span className="text-[10px] text-white/60">{i18n.language.startsWith("pl") ? "Poland" : "Australia"}</span>
                  </div>
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={t("order.social.whatsapp")}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-xs text-white/80 hover:text-primary transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <MessageCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span>WhatsApp (AU & PL): {t("order.social.phone")}</span>
                </a>
              </div>
            </motion.div>

            {/* <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-primary/5 border border-primary/20 p-6 rounded-3xl"
            >
              <h3 className="text-sm font-heading font-bold text-primary mb-2">{t("contact.help.title")}</h3>
              <p className="text-white/60 text-[11px] leading-relaxed">
                {t("contact.help.text")}
              </p>
            </motion.div> */}
          </aside>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-black/40 border border-white/10 rounded-3xl p-5 md:p-8 shadow-xl shadow-black/40 relative"
          >
            <div className="absolute top-0 left-10 right-10 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"></div>
            <h2 className="text-xl font-heading font-bold text-white mb-8">{t("contact.form.title")}</h2>
            <ContactForm />
          </motion.section>


        </div>
      </div>
    </div>
  );
}
