import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const DualTechPanel = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-background text-foreground p-6 pt-20 md:pb-48 pb-28 md:pt-24 md:px-16">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-5xl mx-auto text-center"
      >
        
        {/* Header Content */}
        <motion.div variants={fadeIn} className="mb-12">
          <h3 className="font-heading text-primary text-xs tracking-[0.2em] font-semibold mb-4 uppercase">
            {t('about.dual_tech_table.badge')}
          </h3>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
            {t('about.dual_tech_table.title')} <br />
            <span className="text-primary italic font-light">{t('about.dual_tech_table.title_highlight')}</span>
          </h2>
          <p className="text-white/60 max-w-4xl md:text-lg mx-auto text-base text-left md:text-center">
            {t('about.dual_tech_table.description')}
          </p>
        </motion.div>

        {/* Split Panel */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 text-left">
          
          {/* Left Panel - PEMF */}
          <motion.div 
            variants={fadeIn}
            className="bg-[#111111] p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl flex flex-col hover:border-primary/30 transition-colors"
          >
            <h3 className="text-[#66F8DB] font-heading tracking-widest text-sm font-bold mb-2 uppercase">
              {t('about.dual_tech_table.pemf_values.badge')}
            </h3>
            <p className="text-white/50 mb-8 font-light italic text-lg border-b border-white/10 pb-6">
              {t('about.dual_tech_table.pemf_values.tagline')}
            </p>
            <ul className="space-y-5">
              {(t('about.dual_tech_table.pemf_values.bullets', { returnObjects: true }) as string[]).map((bullet, i) => (
                <li key={i} className="flex items-start text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#66F8DB] mt-2 mr-4 shrink-0 shadow-[0_0_8px_rgba(102,248,219,0.8)]" />
                  <span className="text-sm md:text-base leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Panel - Terahertz */}
          <motion.div 
            variants={fadeIn}
            className="bg-[#111111] p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl flex flex-col hover:border-primary/30 transition-colors"
          >
            <h3 className="text-[#66F8DB] font-heading tracking-widest text-sm font-bold mb-2 uppercase">
              {t('about.dual_tech_table.terahertz_values.badge')}
            </h3>
            <p className="text-white/50 mb-8 font-light italic text-lg border-b border-white/10 pb-6">
              {t('about.dual_tech_table.terahertz_values.tagline')}
            </p>
            <ul className="space-y-5">
              {(t('about.dual_tech_table.terahertz_values.bullets', { returnObjects: true }) as string[]).map((bullet, i) => (
                <li key={i} className="flex items-start text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#66F8DB] mt-2 mr-4 shrink-0 shadow-[0_0_8px_rgba(102,248,219,0.8)]" />
                  <span className="text-sm md:text-base leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
        </div>

      </motion.div>
    </section>
  );
};

export default DualTechPanel;