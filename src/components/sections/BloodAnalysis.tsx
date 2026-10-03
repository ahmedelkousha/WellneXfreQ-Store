import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import bloodAnalysisVideo from '@assets/Livebloodanalysisfb.mp4';
import videoPoster from '@assets/poster.png';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

export default function BloodAnalysis() {
  const { t } = useTranslation();

  return (
    <section className="py-20 relative border-t border-white/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeIn}
          className="text-center pb-20"
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
    </section>
  );
}
