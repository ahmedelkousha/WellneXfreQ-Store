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

const DualTechTable = () => {
  const { t } = useTranslation();

  const tableData = [
    {
      feature: t('about.dual_tech_table.features.primary_goal'),
      pemf: t('about.dual_tech_table.pemf_values.primary_goal'),
      terahertz: t('about.dual_tech_table.terahertz_values.primary_goal'),
    },
    {
      feature: t('about.dual_tech_table.features.mechanism'),
      pemf: t('about.dual_tech_table.pemf_values.mechanism'),
      terahertz: t('about.dual_tech_table.terahertz_values.mechanism'),
    },
    {
      feature: t('about.dual_tech_table.features.key_benefit'),
      pemf: t('about.dual_tech_table.pemf_values.key_benefit'),
      terahertz: t('about.dual_tech_table.terahertz_values.key_benefit'),
    },
    {
      feature: t('about.dual_tech_table.features.analogy'),
      pemf: t('about.dual_tech_table.pemf_values.analogy'),
      terahertz: t('about.dual_tech_table.terahertz_values.analogy'),
    },
  ];

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
          <p className="text-white/60 max-w-4xl md:text-lg mx-auto text-md text-left">
            {t('about.dual_tech_table.description')}
          </p>
        </motion.div>

        {/* Responsive Table Wrapper */}
        <motion.div 
          variants={fadeIn}
          className="overflow-x-auto bg-card rounded-xl border border-white/10 shadow-2xl scrollbar-hide"
        >
          <table className="w-full text-left border-collapse text-nowrap min-w-[370px] font-sans">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-6 px-3 md:px-6 text-xs md:text-sm tracking-widest text-muted-foreground uppercase font-semibold w-[20%]">
                  {t('about.dual_tech_table.headers.feature')}
                </th>
                <th className="py-6 px-3 md:px-6 text-xs md:text-sm tracking-wider text-primary uppercase font-semibold w-[30%]">
                  {t('about.dual_tech_table.headers.pemf')}
                </th>
                <th className="py-6 px-3 md:px-6 text-xs md:text-sm tracking-wider text-primary uppercase font-semibold w-[30%]">
                  {t('about.dual_tech_table.headers.terahertz')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tableData.map((row, index) => (
                <motion.tr 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-white/5 transition-colors duration-200"
                >
                  <td className="py-6 px-3 md:px-6 md:text-xs text-xs tracking-widest text-muted-foreground uppercase font-medium align-top">
                    {row.feature}
                  </td>
                  <td className="py-6 px-3 md:px-6 text-card-foreground md:text-base text-xs align-top">
                    {row.pemf}
                  </td>
                  <td className="py-6 px-3 md:px-6 text-card-foreground md:text-base text-xs align-top">
                    {row.terahertz}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default DualTechTable;