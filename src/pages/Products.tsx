import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight, Zap, Target, Loader2, Activity } from "lucide-react";
import { useTranslation } from "react-i18next";
import AffiliateCTA from "@/components/sections/AffiliateCTA";
import coachJumpImg from "@assets/products-cover2.png";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background min-h-screen">

      {/* PRODUCTS HERO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full scale-150 transform -translate-y-1/2"></div>
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background via-background/90 to-transparent h-2/3"></div>
          <img src={coachJumpImg} alt="Products Hero" className="w-full h-full object-cover object-center opacity-30 mix-blend-overlay grayscale" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6 backdrop-blur-md"
          >
            <Zap className="w-4 h-4" />
            {t("shop.hero.badge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6"
          >
            {t("shop.hero.title")}<span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-[#00CED1]">{t("shop.hero.title_highlight")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light"
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
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {products.map((product, index) => {
                const isFeatured = index === 0;
                // Determine tech badge
                let techBadge = "Frequency";
                let TechIconVar = Zap;
                if (product.slug.includes("p90") || product.slug.includes("wand")) {
                  techBadge = product.slug.includes("plus") ? "Dual Tech" : (product.slug.includes("wand") ? "Terahertz" : "PEMF");
                  TechIconVar = product.slug.includes("wand") ? Activity : Zap;
                } else if (product.slug.includes("bar")) {
                  techBadge = "Hydrogen";
                  TechIconVar = Target;
                }

                const TechIcon = TechIconVar;

                return (
                  <motion.div
                    key={product.id}
                    variants={fadeIn}
                    className={`group bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-primary/40 transition-[border-color,box-shadow,transform] duration-500 hover:shadow-[0_0_40px_rgba(126,255,212,0.08)] flex flex-col will-change-transform ${
                      isFeatured ? "md:col-span-2 lg:col-span-2 md:flex-row h-auto" : "h-full"
                    }`}
                  >
                    <Link 
                      to={`/${currentLang}/product/${product.slug}`} 
                      className={`block overflow-hidden relative ${
                        isFeatured ? "md:w-1/2 aspect-video md:aspect-auto" : "aspect-video"
                      }`}
                    >
                      <div className="absolute inset-0 bg-linear-to-t from-card/80 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                      <img
                        src={product.image}
                        alt={currentLang === "pl" ? (product.name_pl || product.name) : product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border bg-primary/10 text-primary border-primary/30 backdrop-blur-md flex items-center gap-1.5 leading-none">
                          <TechIcon className="w-3 h-3" />
                          {techBadge}
                        </span>
                      </div>
                      {isFeatured && (
                        <div className="absolute bottom-4 left-4 z-20">
                          <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded bg-primary text-black/80">
                            Featured Product
                          </span>
                        </div>
                      )}
                    </Link>

                    <div className={`p-6 md:p-8 flex flex-col grow ${isFeatured ? "md:w-1/2 md:p-12 justify-center" : ""}`}>
                      <h3 className={`${isFeatured ? "text-2xl md:text-3xl" : "text-xl"} font-heading font-bold text-white mb-3 group-hover:text-primary transition-colors`}>
                        {currentLang === "pl" ? (product.name_pl || product.name) : product.name}
                      </h3>

                      <p className={`text-white/50 leading-relaxed mb-6 grow ${isFeatured ? "text-sm md:text-base line-clamp-4" : "text-sm line-clamp-3"}`}>
                        {currentLang === "pl"
                          ? (product.tagline_pl || product.tagline)
                          : (product.tagline)}
                      </p>

                      <div className={`space-y-3 mb-8 ${isFeatured ? "grid md:grid-cols-2 gap-x-8 gap-y-3 space-y-0" : ""}`}>
                        {(currentLang === "pl" ? (product.benefits_pl || product.benefits) : product.benefits)?.slice(0, isFeatured ? 4 : 2).map((benefit, i) => (
                          <div key={i} className="flex items-center text-xs text-white/40 group-hover:text-white/70 transition-colors">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-3 group-hover:bg-primary transition-colors shrink-0" />
                            {benefit}
                          </div>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-white/5 mt-auto flex items-center justify-between">
                        <span className={`font-mono uppercase tracking-widest text-white/20 group-hover:text-primary/50 transition-colors ${isFeatured ? "text-sm" : "text-xs"}`}>
                          {product.price || "$$$"}
                        </span>
                        <Button asChild variant="ghost" size={isFeatured ? "lg" : "sm"} className="text-xs font-bold uppercase tracking-widest hover:bg-primary/10 hover:text-primary -mr-3 px-3">
                          <Link to={`/${currentLang}/product/${product.slug}`}>
                            {t("shop.list.button")} <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
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

      <AffiliateCTA />

      {/* CTA SECTION */}
      <section className="py-24 relative overflow-hidden bg-background">
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
      </section>

    </div>
  );
}
