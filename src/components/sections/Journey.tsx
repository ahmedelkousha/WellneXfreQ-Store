import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import coachBlankingImg from '@assets/patrycja-coach.png';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function Journey() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language ? i18n.language.split('-')[0] : 'en';

  return (
    <section
      id="philosophy"
      className="py-32 bg-white/2 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn}>
              <h3 className="font-heading text-primary text-xs tracking-[0.2em] font-semibold mb-4 uppercase">
                {t('home.philosophy.badge')}
              </h3>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-8 leading-tight">
                {t('home.philosophy.title')}{' '}
                <span className="text-primary italic font-normal">
                  {t('home.philosophy.title_italic_1')}
                </span>
                <br />
                {t('home.philosophy.subtitle')}{' '}
                <span className="text-primary italic font-normal">
                  {t('home.philosophy.subtitle_italic_2')}
                </span>
                <br />
                {t('home.philosophy.title_3')}{' '}
                <span className="text-primary italic font-normal">
                  {t('home.philosophy.title_highlight_3')}
                </span>
              </h2>
              <p className="text-sm md:text-lg text-white/70 mb-8 leading-relaxed">
                {t('home.philosophy.text1')}
              </p>
              <p className="text-sm md:text-lg text-white/70 mb-8 leading-relaxed">
                {t('home.philosophy.text2')}
              </p>

              {/* Mobile Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="lg:hidden block relative rounded-3xl overflow-hidden group"
              >
                <img
                  loading="lazy"
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
                    <span className="text-sm uppercase tracking-widest text-white/40 font-medium">
                      {t('home.philosophy.coach')}
                    </span>
                  </div>
                </div>
              </motion.div>
              {/* End of mobile image */}

              <div className="border-l-3 py-1 border-primary/50 pl-4 my-10 italic">
                <p className="text-sm md:text-lg text-left text-white/70 leading-relaxed">
                  "{t('home.philosophy.coach_text')}" <br />
                  <span className="text-primary italic text-base mt-2 inline-block font-normal">
                    — Patrycja
                  </span>
                </p>
              </div>

              <div className="block lg:hidden border-l-3 py-1 border-primary/50 pl-4 my-10">
                <p className="text-sm md:text-lg text-left text-white/70 leading-relaxed">
                  {t('home.philosophy.coach_text2')}{' '}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.fitin2it.com/"
                    className="text-primary text-sm md:text-lg text-left leading-relaxed"
                  >
                    {t('home.philosophy.coach_text2_highlight')}.
                  </a>
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-start gap-8">
                <Button
                  asChild
                  className="sm:px-4 gap-[6px] sm:py-4 px-3 py-3 rounded-lg bg-primary text-black font-bold uppercase tracking-widest text-[0.65rem] sm:text-[0.8rem] hover:bg-white transition-all text-center inline-flex items-center justify-center shadow-[0_0_20px_rgba(102,248,219,0.3)] hover:shadow-[0_0_15px_rgba(102,248,219,0.5)] hover:-translate-y-1 w-fit"
                >
                  <Link to={`/${currentLang}/contact`}>
                    {t('home.philosophy.learn_more').toUpperCase()}{' '}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* large screen image */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="lg:block hidden relative o rounded-3xl overflow-hidden group"
            >
              <img
                loading="lazy"
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
                  <span className="text-sm uppercase tracking-widest text-white/40 font-medium">
                    {t('home.philosophy.coach')}
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="hidden lg:block border-l-3 py-1 border-primary/50 pl-4 my-10 italic">
              <p className="text-sm md:text-lg text-left text-white/70 leading-relaxed">
                "{t('home.philosophy.coach_text2')}{' '}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.fitin2it.com/"
                  className="text-primary text-sm md:text-lg text-left leading-relaxed"
                >
                  {t('home.philosophy.coach_text2_highlight')}.
                </a>
                "
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
