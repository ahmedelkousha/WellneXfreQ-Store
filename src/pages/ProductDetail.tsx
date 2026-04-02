import { useParams, Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, Tag, MessageCircle, ShieldCheck } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import NotFound from "@/pages/not-found";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: products = [], isLoading } = useProducts();

  if (isLoading) {
    return <div className="min-h-screen pt-32 text-center text-white">Loading product details...</div>;
  }

  const product = products.find(p => p.slug === slug);

  if (!product) {
    return <NotFound />;
  }

  const scrollToForm = () => {
    document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-background min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50 mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/#technology" className="hover:text-primary transition-colors">Technology</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">{product.name}</span>
        </div>

        {/* Product Hero */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden bg-card border border-white/5 aspect-[4/3] lg:aspect-square"
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-6 uppercase tracking-wider w-fit">
              Quantum Technology
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-xl text-primary font-medium mb-6">
              {product.tagline}
            </p>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              {product.description}
            </p>

            {/* Key Benefits */}
            <div className="mb-8">
              <h3 className="text-sm uppercase tracking-widest text-white/50 font-semibold mb-4">Key Benefits</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-white/80">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Section — driven by Firebase via useProducts */}
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
                    <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-0.5">Retail Price</p>
                    <p className="text-3xl font-heading font-bold text-white">{product.price}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 text-xs text-white/40">
                    <ShieldCheck className="w-4 h-4 text-primary/60" />
                    <span>Direct sale</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-0.5">Pricing</p>
                    <p className="text-lg font-heading font-semibold text-white">Contact for Pricing</p>
                    <p className="text-xs text-white/40 mt-0.5">We'll match you with the right package</p>
                  </div>
                </div>
              )}
            </motion.div>

            <Button
              onClick={scrollToForm}
              size="lg"
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg font-semibold shadow-[0_0_30px_rgba(126,255,212,0.2)]"
            >
              Inquire to Purchase
            </Button>
          </motion.div>
        </div>

        {/* Details Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="grid md:grid-cols-3 gap-8 mb-24"
        >
          <motion.div variants={fadeIn} className="bg-card/40 border border-white/5 rounded-3xl p-8">
            <h3 className="text-2xl font-heading font-semibold text-white mb-4">How it Works</h3>
            <p className="text-white/70 leading-relaxed">{product.howItWorks}</p>
          </motion.div>

          <motion.div variants={fadeIn} className="bg-card/40 border border-white/5 rounded-3xl p-8">
            <h3 className="text-2xl font-heading font-semibold text-white mb-4">Who it's For</h3>
            <p className="text-white/70 leading-relaxed">{product.whoItsFor}</p>
          </motion.div>

          <motion.div variants={fadeIn} className="bg-card/40 border border-white/5 rounded-3xl p-8">
            <h3 className="text-2xl font-heading font-semibold text-white mb-4">The Science</h3>
            <p className="text-white/70 leading-relaxed">{product.science}</p>
          </motion.div>
        </motion.div>

        {/* Gallery — only shown when images have been uploaded */}
        {product.gallery && product.gallery.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-32"
          >
            <h2 className="text-3xl font-heading font-bold text-white mb-8">Gallery</h2>
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

        {/* Inquiry Form */}
        <motion.div
          id="inquiry-form"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-3xl mx-auto bg-card border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary to-transparent"></div>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Purchase Inquiry</h2>
            <p className="text-white/60">
              Our professional-grade devices are available via direct inquiry to ensure you get the right technology for your specific needs.
            </p>
          </div>

          <ContactForm defaultProduct={product.id} />
        </motion.div>

      </div>
    </div>
  );
}
