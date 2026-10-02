import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import featuredProductImgSm from '@assets/featured-product-sm.png';
import featuredProductImgLg from '@assets/featured-product-lg.webp';
import featuredProductImgPhone from '@assets/featured-product-phone.png';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

export default function FeaturedProduct() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language ? i18n.language.split('-')[0] : 'en';
  const { data: products = [] } = useProducts();
  const featuredProduct = products.find((p) => p.isFeatured) || products[0];
  const isActualFeatured = products.some((p) => p.isFeatured);

  return (
    <section id="products" className="py-20 relative bg-white/2">
      <div className="mx-auto sm:px-4 h-full w-full px-2">
        <motion.div
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto pb-20"
        >
          <h3 className="font-heading text-primary text-xs tracking-[0.2em] font-semibold mb-4 uppercase">
            {t('home.products.badge')}
          </h3>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
            {t('home.products.title')}
            <br />
            <span className="text-primary italic font-normal">
              {t('home.products.title_highlight')}
            </span>
          </h2>
          <p className="text-sm md:text-lg max-w-3xl mx-auto text-center text-white/60 md:px-16 px-4">
            {t('home.products.subtitle')}
          </p>
        </motion.div>

        {/* Featured Product Card */}
        <motion.div
          variants={fadeIn}
          className="relative w-auto h-[670px] sm:h-[940px] rounded-3xl overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5"
        >
          {/* Large Image */}
          <div className="hidden xl:block absolute inset-0 z-0 h-full w-full">
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/5 via-black/5 to-transparent z-10" />
            <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/20 via-black/20 to-transparent z-10 lg:block hidden" />
            <img
              loading="lazy"
              src={featuredProductImgLg}
              alt="OlyLife THz Tera-P90+"
              className="h-[940px] w-full object-cover object-bottom transition-transform duration-1000 group-hover:scale-[1.03]"
            />
          </div>

          {/* Small Image */}
          <div className="sm:block hidden xl:hidden absolute inset-0 z-0 h-full w-full">
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/5 via-black/5 to-transparent z-10" />
            <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/20 via-black/20 to-transparent z-10 lg:block hidden" />
            <img
              loading="lazy"
              src={featuredProductImgSm}
              alt="OlyLife THz Tera-P90+"
              className="h-[940px] w-full object-cover object-[72%] transition-transform duration-1000 group-hover:scale-[1.03]"
            />
          </div>

          {/* Mobile Image */}
          <div className="sm:hidden block absolute inset-0 z-0 h-full w-full">
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/5 via-black/5 to-transparent z-10" />
            <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/20 via-black/20 to-transparent z-10 lg:block hidden" />
            <img
              loading="lazy"
              src={featuredProductImgPhone}
              alt="OlyLife THz Tera-P90+"
              className="h-[670px] w-full object-cover object-[72%] transition-transform duration-1000 group-hover:scale-[1.03]"
            />
          </div>

          {/* Content overlay */}
          <div className="relative z-20 h-full w-full flex flex-col justify-start p-8 md:p-16 sm:p-12 lg:p-30">
            <div className="lg:max-w-xl text-left w-full">
              {isActualFeatured && (
                <span className="bg-secondary w-fit p-3 rounded-lg text-primary font-bold text-[11px] uppercase tracking-[0.25em] mb-5 block drop-shadow-md">
                  {t('home.products.featured_badge')}
                </span>
              )}

              <h3 className="text-[1.4rem] sm:text-4xl lg:text-6xl font-heading font-bold text-white mb-4 drop-shadow-lg">
                {t('home.products.featured_title')}
              </h3>
              <p className="text-[0.9rem] sm:text-lg text-white/70 mb-4 sm:mb-10 max-w-md font-light leading-relaxed">
                {t('home.products.featured_desc')}
              </p>

              <div className="flex flex-col gap-6 items-start w-fit">
                <Link
                  to={
                    featuredProduct
                      ? `/${currentLang}/product/${featuredProduct.slug}`
                      : `/${currentLang}/products`
                  }
                  className="sm:px-4 gap-[6px] sm:py-4 px-3 py-3 rounded-lg bg-primary text-black font-bold uppercase tracking-widest text-[0.65rem] sm:text-[0.8rem] hover:bg-white transition-all text-center inline-flex items-center justify-center shadow-[0_0_20px_rgba(102,248,219,0.3)] hover:shadow-[0_0_15px_rgba(102,248,219,0.5)] hover:-translate-y-1 w-fit"
                >
                  {t('home.products.learn_more')}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to={`/${currentLang}/products`}
                  className="text-white/50 gap-[6px] hover:text-primary transition-colors text-[10px] sm:text-[13px] font-semibold uppercase tracking-widest inline-flex items-center group/link w-full sm:w-auto justify-center sm:justify-start"
                >
                  {t('home.products.view_all')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
