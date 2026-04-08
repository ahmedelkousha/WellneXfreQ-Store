import { useParams, Link, useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, Tag, MessageCircle, ShieldCheck, Loader2, ArrowLeft } from "lucide-react";
// import ContactForm from "@/components/ContactForm";
import NotFound from "@/pages/not-found";
import { useTranslation } from "react-i18next";
// import OrderForm from "@/components/sections/OrderForm";
import OrderNow from "./OrderNow";


const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export default function ProductDetail() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0];
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { data: products = [], isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-32 text-center text-white gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <span className="text-white/40 tracking-widest uppercase text-sm">{t("product_detail.loading")}</span>
      </div>
    );
  }

  const product = products.find(p => p.slug === slug);

  if (!product) {
    return <NotFound />;
  }

  const scrollToForm = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-background min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">

        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium uppercase tracking-widest">{t("common.navigation.back_to_catalog")}</span>
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50 mb-8">
          <Link to={`/${currentLang}`} className="hover:text-primary transition-colors">{t("product_detail.breadcrumb.home")}</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/${currentLang}/#technology`} className="hover:text-primary transition-colors">{t("product_detail.breadcrumb.tech")}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">{currentLang === "pl" ? (product.name_pl || product.name) : product.name}</span>
        </div>

        {/* Product Hero */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden bg-card border border-white/5 aspect-4/3 lg:aspect-square"
          >
            <img src={product.image} alt={currentLang === "pl" ? (product.name_pl || product.name) : product.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-6 uppercase tracking-wider w-fit">
              {t("product_detail.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-8 leading-tight">
              {currentLang === "pl" ? (product.name_pl || product.name) : product.name}
            </h1>

            {/* Key Features */}
            <div className="mb-8">
              <h3 className="text-sm uppercase tracking-widest text-white/50 font-semibold mb-4">{t("product_detail.headers.benefits")}</h3>
              <ul className="grid grid-cols-1 gap-4">
                {(currentLang === "pl" ? (product.features_pl || product.features) : product.features)?.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Section */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              {product.price ? (
                <div className="flex items-center gap-4 bg-primary/5 border border-primary/20 rounded-2xl p-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Tag className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-0.5">{t("product_detail.headers.price")}</p>
                    <p className="text-3xl font-heading font-bold text-white">{product.price}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 text-xs text-white/40">
                    <ShieldCheck className="w-4 h-4 text-primary/60" />
                    <span>{t("product_detail.pricing.direct")}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 bg-white/3 border border-white/10 rounded-2xl p-5">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-0.5">{t("product_detail.headers.pricing")}</p>
                    <p className="text-lg font-heading font-semibold text-white">{t("product_detail.pricing.contact")}</p>
                    <p className="text-xs text-white/40 mt-0.5">{t("product_detail.pricing.fallback")}</p>
                  </div>
                </div>
              )}
            </motion.div>

            <Button
              onClick={scrollToForm}
              size="lg"
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg font-semibold shadow-[0_0_30px_rgba(126,255,212,0.2)]"
            >
              {t("nav.order-footer")}
            </Button>
          </motion.div>
        </div>



        {/* Gallery */}
        {product.gallery && product.gallery.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-32"
          >
            <h2 className="text-3xl font-heading font-bold text-white mb-8">{t("product_detail.headers.gallery")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {product.gallery.map((imgUrl, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-white/5 group">
                  <img
                    src={imgUrl}
                    alt={`${product.name} gallery ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
        <div id="order-section">
          <OrderNow />
        </div>

      </div>
    </div>
  );
}
