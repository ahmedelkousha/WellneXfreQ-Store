import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight, Zap, Target, Loader2 } from "lucide-react";
import coachJumpImg from "@assets/jumpingoverwebready-e1774927545253_1775036665246.png";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function Products() {
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
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/90 to-transparent h-2/3"></div>
          <img src={coachJumpImg} alt="Products Hero" className="w-full h-full object-cover object-center opacity-30 mix-blend-overlay grayscale" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6 backdrop-blur-md"
          >
            <Zap className="w-4 h-4" />
            Biohacking Arsenal
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6"
          >
            Our Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00CED1]">Collection</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light"
          >
            Explore our meticulously curated array of professional PEMF and Terahertz frequency devices engineered for total cellular mastery.
          </motion.p>
        </div>
      </section>

      {/* FULL PRODUCTS LISTING */}
      <section className="py-20 relative z-10 border-t border-white/5 bg-black/40">
        <div className="container mx-auto px-4">

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-50">
              <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
              <span className="text-white/60 tracking-wider font-medium">Loading Products...</span>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={fadeIn}
                  className="group rounded-2xl bg-card border border-white/5 overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(126,255,212,0.1)] flex flex-col"
                >
                  <Link to={`/product/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-black/50">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 transition-opacity group-hover:opacity-90"></div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/10 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                        High Tech
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 z-20 right-4">
                      <h3 className="text-2xl font-heading font-bold text-white mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                    </div>
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-white/60 text-sm leading-relaxed mb-6 flex-grow">
                      {product.tagline || product.description?.slice(0, 100) + '...'}
                    </p>

                    <ul className="mb-6 space-y-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      {product.benefits?.slice(0, 2).map((benefit, i) => (
                        <li key={i} className="flex items-start text-xs text-white/80">
                          <Target className="w-3.5 h-3.5 text-primary mr-2 shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    <Button asChild className="w-full bg-white/5 hover:bg-primary hover:text-primary-foreground text-white border border-white/10 hover:border-primary transition-all group/btn">
                      <Link to={`/product/${product.slug}`}>
                        Explore Capabilities <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}

              {products.length === 0 && (
                <div className="col-span-full text-center py-20 border border-white/5 rounded-3xl bg-white/5 text-white/40">
                  No products currently available in the catalog.
                </div>
              )}
            </motion.div>
          )}

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-card/40 border border-white/10 rounded-3xl p-10 md:p-16 text-center shadow-xl"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Unsure Which Frequency Fits You?</h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              Our coaching team is ready to analyze your specific wellness goals to match you with the precise device protocol you need.
            </p>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 rounded-full shadow-[0_0_30px_rgba(126,255,212,0.3)] transition-all hover:scale-105 group">
              <Link to="/contact">
                Consult With A Coach <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
