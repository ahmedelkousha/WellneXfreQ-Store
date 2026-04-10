import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight, Zap, Loader2, Mouse } from "lucide-react";
import { useTranslation } from "react-i18next";
// import AffiliateCTA from "@/components/sections/AffiliateCTA";
import featuredProductImgSm from "@assets/featured-product-sm.png";
import featuredProductImgLg from "@assets/featured-product-lg.png";
import featuredProductImgPhone from "@assets/featured-product-phone.png";


const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function Products() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0];
  const { data: products = [], isLoading } = useProducts();
  const featuredId = products.find(p => p.isFeatured)?.id;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background min-h-screen">

      {/* PRODUCTS HERO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden h-screen">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full scale-150 transform -translate-y-1/2"></div>
          {/* <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background via-background/90 to-transparent h-2/3"></div> */}

          {/* <img src={coachJumpImg} alt="Products Hero" className="w-full h-full object-cover object-center opacity-30 mix-blend-overlay grayscale" /> */}
          {/* Large Image */}
          <div className="hidden xl:block absolute inset-0 z-0 h-full w-full">
            <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0a] via-black/5 to-transparent z-10" />
            <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/20 via-black/20 to-transparent z-10 lg:block hidden" />
            <img
              src={featuredProductImgLg}
              alt="OlyLife THz Tera-P90+"
              className="h-[940px] w-full object-cover object-fit transition-transform duration-1000 group-hover:scale-[1.03]"
            />
          </div>

          {/* Small Image */}
          <div className="xl:hidden sm:block hidden absolute inset-0 z-0 h-full w-full">
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/5 via-black/5 to-transparent z-10" />
            <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/20 via-black/20 to-transparent z-10 lg:block hidden" />
            <img
              src={featuredProductImgSm}
              alt="OlyLife THz Tera-P90+"
              className="h-[940px] w-full object-cover object-[80%] transition-transform duration-1000 group-hover:scale-[1.03]"
            />
          </div>

          {/* Mobile Image */}
          <div className="sm:hidden block absolute inset-0 z-0 h-full w-full">
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/5 via-black/5 to-transparent z-10" />
            <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/20 via-black/20 to-transparent z-10 lg:block hidden" />
            <img
              src={featuredProductImgPhone}
              alt="OlyLife THz Tera-P90+"
              className="h-[800px] w-full object-cover object-[72%] transition-transform duration-1000 group-hover:scale-[1.03]"
            />
          </div>

        </div>

        <div className="container relative z-10 text-left pl-6 pt-0 lg:pt-10 lg:pl-30">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-4 sm:mb-6 backdrop-blur-md"
          >
            <Mouse className="w-4 h-4" />
            <span className="lg:text-md md:text-sm text-[0.7rem]">{t("shop.hero.badge")}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[1.7rem] sm:text-3xl lg:text-4xl xl:text-7xl font-heading font-bold text-white sm:mb-6 mb-4"
          >
            {t("shop.hero.title")}<span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-[#00CED1]"><br />{t("shop.hero.title_highlight")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm lg:text-lg text-white/60 max-w-88 lg:max-w-114 xl:max-w-2xl font-light"
          >
            {t("shop.hero.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* FULL PRODUCTS LISTING */}
      <section id="products-grid" className="py-20 relative z-10 border-t border-white/5 bg-black/40">
        <div className="container mx-auto px-4">

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-50">
              <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
              <span className="text-white/60 tracking-wider font-medium">{t("shop.list.loading")}</span>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {products.map((product) => {
                const isFeatured = product.id === featuredId;

                return (
                  <motion.div
                    key={product.id}
                    variants={fadeIn}
                    className="group bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-primary/40 transition-[border-color,box-shadow,transform] duration-500 hover:shadow-[0_0_40px_rgba(126,255,212,0.08)] flex flex-col will-change-transform h-full"
                  >
                    <Link
                      to={`/${currentLang}/product/${product.slug}`}
                      className="block overflow-hidden relative aspect-video"
                    >
                      <div className="absolute inset-0 bg-linear-to-t from-card/80 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                      <img
                        src={product.image}
                        alt={currentLang === "pl" ? (product.name_pl || product.name) : product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      />
                      {isFeatured && (
                        <div className="absolute top-4 left-4 z-20">
                          <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded bg-primary text-black/80 flex items-center gap-1.5">
                            <Zap className="w-3 h-3" />
                            FEATURED
                          </span>
                        </div>
                      )}
                    </Link>

                    <div className="p-6 md:p-8 flex flex-col grow">
                      <h3 className="text-xl font-heading font-bold text-white mb-4 group-hover:text-primary transition-colors">
                        {currentLang === "pl" ? (product.name_pl || product.name) : product.name}
                      </h3>

                      <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors line-clamp-3 leading-relaxed mb-8 grow">
                        {currentLang === "pl" ? (product.shortDescription_pl || product.shortDescription) : product.shortDescription}
                      </p>

                      <div className="pt-6 border-t border-white/5 mt-auto flex items-center justify-between">
                        <span className="font-mono uppercase tracking-widest text-white/20 group-hover:text-primary/50 transition-colors text-sm">
                          {product.price || "$$$"}
                        </span>
                        <Button asChild variant="default" size="sm" className="font-bold uppercase tracking-widest text-xs px-4 bg-primary text-black hover:bg-primary/90 transition-colors">
                          <Link to={`/${currentLang}/order`}>
                            {t("nav.order-footer")} <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {!isLoading && products.length === 0 && (
                <div className="col-span-full text-center py-20 border border-white/5 rounded-3xl bg-white/5 text-white/40">
                  {t("shop.list.empty")}
                </div>
              )}
            </motion.div>
          )}

        </div>
      </section>

      {/* <AffiliateCTA /> */}

      {/* CTA SECTION */}
      {/* <section className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-card/40 border border-white/10 rounded-3xl p-10 md:p-16 text-center shadow-xl"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">{t("shop.cta.title")}</h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              {t("shop.cta.subtitle")}
            </p>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 rounded-full shadow-[0_0_30px_rgba(126,255,212,0.3)] transition-all hover:scale-105 group">
              <Link to={`/${currentLang}/contact`}>
                {t("shop.cta.button")} <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section> */}

      {/* FULL PRODUCTS LISTING SECTION ENDS HERE */}

      {/* MEDICAL AND REGULATORY NOTICE */}
      <section className="py-24 relative z-10 border-t border-white/5 bg-background">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto bg-black/40 border border-primary/20 p-10 md:p-16 rounded-[2.5rem] text-center shadow-[0_0_60px_rgba(126,255,212,0.03)] relative overflow-hidden group hover:border-primary/30 transition-all duration-500"
          >
            {/* Subtle inner glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-colors"></div>
            
            <h2 className="text-3xl md:text-4xl font-heading font-medium text-white mb-10 tracking-tight">
              {t("shop.medical_notice.title")}
            </h2>
            <p className="text-base md:text-lg text-white/50 leading-relaxed font-light max-w-4xl mx-auto">
              {t("shop.medical_notice.text")}
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
