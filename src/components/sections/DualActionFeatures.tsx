import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Activity, Battery, Quote, ShieldCheck, Star, Zap } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const TechnologySection = () => {
  const { t } = useTranslation();

  return (
    <>
    {/* It was flex I hide a it as per client */}
      <div className="hidden bg-white/2 text-gray-300 font-sans px-4 py-20 md:py-48 md:px-16 justify-center overflow-hidden">
        <div className="max-w-5xl w-full relative">
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch">
            
            {/* Column 1: PEMF CELLULAR RECHARGE */}
            <div className="flex-1 flex flex-col md:py-0 p-8 px-4 md:px-0">
              <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-4">
                {t('about.tech.technology_01')}
              </p>
              <h2 className="text-white text-sm md:font-medium font-semibold md:text-2xl tracking-wide mb-2">
                {t('about.tech.pemf_title')}
              </h2>
              <p className="text-primary italic text-sm md:text-lg md:mb-8 mb-4">
                {t('about.tech.pemf_subtitle')}
              </p>
              <p className="leading-relaxed text-[12px] md:text-[15px] pb-4 md:mb-4 text-gray-400">
                {t('about.tech.pemf_desc')}
              </p>

              <div className="w-40 h-[0.5px] bg-primary my-2"></div>

              <ul className="space-y-4 md:space-y-6 pt-4">
                {(t('about.tech.pemf_benefits', { returnObjects: true }) as { label: string, desc: string }[]).map((benefit, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="text-[15px]"
                  >
                    <span className="text-primary font-semibold mr-2 uppercase block sm:inline">{benefit.label}:</span>
                    <span className="text-gray-400 md:text-lg text-sm">{benefit.desc}</span>
                  </motion.li>
                ))}
              </ul>
              <h3 className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase leading-loose md:mb-6 mb-4 pt-8 pr-12">
                {t('about.tech.pemf_nasa_badge')}
              </h3>
            </div>

            {/* Separator Line */}
            <div className="hidden md:block w-px bg-white/10 shrink-0 self-stretch my-12 relative">
              {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full"></div> */}
            </div>
            <div className="md:hidden h-px w-full bg-white/10 shrink-0 relative">
              {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full"></div> */}
            </div>

            {/* Column 2: TERAHERTZ ACTIVATION */}
            <div className="flex-1 flex flex-col md:py-0 p-8 px-4 md:px-0">
              <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-4">
                {t('about.tech.technology_02')}
              </p>
              <h2 className="text-white text-sm md:text-2xl md:font-medium font-semibold tracking-wide mb-2">
                {t('about.tech.thz_title')}
              </h2>
              <p className="text-primary italic text-sm md:text-lg md:mb-8 mb-4">
                {t('about.tech.thz_subtitle')}
              </p>
              <p className="leading-relaxed text-[12px] md:text-[15px] pb-4 md:mb-4 text-gray-400">
                {t('about.tech.thz_desc')}
              </p>

              <div className="w-40 h-[0.5px] bg-primary my-2"></div>

              <ul className="space-y-4 md:space-y-6 pt-4">
                 {(t('about.tech.thz_benefits', { returnObjects: true }) as { label: string, desc: string }[]).map((benefit, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="text-[15px]"
                  >
                    <span className="text-primary font-semibold mr-2 uppercase block sm:inline">{benefit.label}:</span>
                    <span className="text-gray-400 text-sm md:text-lg">{benefit.desc}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 px-8 md:px-16 py-20 md:pb-40 max-w-6xl mx-auto"
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
    </>
  );
};

export default TechnologySection;