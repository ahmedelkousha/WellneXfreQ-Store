import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { useBlogs } from "@/hooks/useBlogs";
import { ArrowRight, Zap, Battery, Activity, ShieldCheck, ChevronRight, Star, Quote, Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import heroImg from "@assets/hero1.jpg";
import coachJumpImg from "@assets/intro.jpg";
import coachBoulderImg from "@assets/Screen-Shot-2026-03-31-at-9.51.10-am_1775036665248.png";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const { data: products = [] } = useProducts();
  const { data: blogs = [], isLoading: blogsLoading } = useBlogs();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const pending = sessionStorage.getItem("pendingScroll");
    if (pending) {
      sessionStorage.removeItem("pendingScroll");
      setTimeout(() => {
        const el = document.getElementById(pending);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, []);

  return (
    <div className="bg-background min-h-screen overflow-hidden">
      {/* HERO SECTION */}
      <section id="hero" className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background z-10" />
          <img
            src={heroImg}
            alt="PEMF Therapy"
            className="w-full h-full object-cover lg:object-center object-[85%]"
          />
        </motion.div>

        <div className="container mx-auto px-4 relative z-20 text-center flex flex-col items-center mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" as const }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Quantum Wellness Technology
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white tracking-tight leading-tight max-w-5xl mx-auto"
          >
            Powered at the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00CED1]">Source.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mt-6 mb-10 font-light"
          >
            Bridging elite athletic performance with cellular regeneration through PEMF and Terahertz frequency medicine.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-base shadow-[0_0_30px_rgba(126,255,212,0.3)] border border-primary/50 transition-all hover:scale-105">
              <a href="#technology">Explore Technology</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base border-white/20 text-white hover:bg-white/5 transition-all">
              <a href="#philosophy">Our Philosophy</a>
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-xs uppercase tracking-widest">Scroll to discover</span>
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
            <motion.div
              animate={{ y: [0, 48, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-primary"
            />
          </div>
        </motion.div> */}
      </section>

      {/* SCIENCE/TECH EXPLAINER */}
      <section className="py-32 relative border-b border-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">The Future of <span className="text-primary italic font-light">Optimization</span></h2>
            <p className="text-white/60 max-w-3xl mx-auto text-lg">
              We go beyond conventional recovery. By utilizing specific electromagnetic and terahertz frequencies, we interact directly with your body's cellular communication network.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12 hover:border-primary/30 transition-colors group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-white mb-4">PEMF Technology</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Pulsed Electromagnetic Field therapy uses Earth-mimicking frequencies to recharge your cells' natural voltage. It's essentially a battery charger for your human cells, dramatically accelerating recovery and reducing inflammation.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-white/80">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0" /> Restores cellular membrane permeability
                </li>
                <li className="flex items-start gap-3 text-sm text-white/80">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0" /> Increases ATP (energy) production
                </li>
                <li className="flex items-start gap-3 text-sm text-white/80">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0" /> Enhances nutrient absorption and waste removal
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12 hover:border-primary/30 transition-colors group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-white mb-4">Terahertz Frequency</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Terahertz waves resonate at the exact same frequency as normal human cells, penetrating deep into tissues to activate dormant stem cells and accelerate the body's self-healing mechanisms.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-white/80">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0" /> Deep tissue penetration without ionizing radiation
                </li>
                <li className="flex items-start gap-3 text-sm text-white/80">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0" /> Clears meridian blockages and improves microcirculation
                </li>
                <li className="flex items-start gap-3 text-sm text-white/80">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0" /> Activates self-healing potential at the source
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section id="technology" className="py-32 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">Technology</span></h2>
              <p className="text-white/60 max-w-xl text-lg">Professional-grade biohacking devices engineered for cellular regeneration, deep recovery, and peak human performance.</p>
            </div>
          </motion.div>

          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0 scrollbar-hide">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-max md:w-auto"
            >
              {products.slice(0, 3).map((product) => (
                <motion.div
                  key={product.id}
                  variants={fadeIn}
                  className="group rounded-2xl bg-card border border-white/5 overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(126,255,212,0.1)] flex flex-col w-72 md:w-auto flex-shrink-0 md:flex-shrink"
                >
                  <Link to={`/product/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-black/50">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-4 left-4 z-20 right-4">
                      <h3 className="text-xl font-heading font-bold text-white mb-1">{product.name}</h3>
                    </div>
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-white/60 text-sm line-clamp-3 mb-6 flex-grow">
                      {product.description}
                    </p>
                    <Button asChild className="w-full bg-white/5 hover:bg-primary hover:text-primary-foreground text-white border border-white/10 hover:border-primary transition-all group/btn">
                      <Link to={`/product/${product.slug}`}>
                        Learn More <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:scale-105 shadow-[0_0_20px_rgba(126,255,212,0.15)] group h-12 px-8">
              <Link to="/products">
                View All Technology <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* PHILOSOPHY & STORY */}
      <section id="philosophy" className="py-32 relative bg-black border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="mb-6 inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm uppercase tracking-widest text-primary font-semibold">
                The Coach
              </motion.div>
              <motion.h2 variants={fadeIn} className="text-4xl md:text-6xl font-heading font-bold text-white mb-8 leading-tight">
                Built to <span className="italic font-light text-primary">Move.</span><br />
                Created to <span className="italic font-light text-primary">Last.</span>
              </motion.h2>
              <motion.div variants={fadeIn} className="space-y-6 text-lg text-white/70">
                <p>
                  As a Strength & Movement Coach with over 13 years of biohacking experience, I've pushed the human body to its limits. But true optimization isn't just about pushing harder—it's about how deeply you can recover.
                </p>
                <p>
                  After struggling with chronic pain, burnout, and profound low energy, I realized conventional methods weren't enough. The breakthrough came when I discovered PEMF and Terahertz frequency technology.
                </p>
                <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 text-xl font-heading font-medium text-white italic">
                  "My drive for health, wellness and longevity led me somewhere most people haven't looked yet — and that's exactly why wellneXfreQ exists."
                </blockquote>
                <p>
                  This brand exists at the intersection of elite athletic coaching and quantum wellness. We don't just sell devices; we educate and empower you to take control of your cellular health.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="pt-4">
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6 rounded-full shadow-[0_0_20px_rgba(126,255,212,0.2)] transition-all hover:scale-105 group">
                  <Link to="/about">Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative h-[600px] rounded-3xl overflow-hidden group"
            >
              {/* <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700"></div> */}
              <img
                src={coachJumpImg}
                alt="Coach jumping"
                className="w-full h-full object-cover object-center hover:grayscale-25 grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />

              {/* Floating card */}
              <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Battery className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">13+ Years</div>
                    <div className="text-white/60 text-sm">Biohacking & Movement Experience</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 relative border-b border-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Proven <span className="text-primary italic font-light">Results</span></h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">Real experiences from athletes and wellness seekers who have integrated our frequency technology into their daily routines.</p>
          </motion.div>

          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 pb-4 scrollbar-hide">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="flex md:grid md:grid-cols-3 gap-8 w-max md:w-auto"
            >
              {[
                {
                  text: "The Terahertz wand completely changed my recovery game. I'm back to training 5 days a week without joint pain.",
                  name: "Sarah M.",
                  role: "Triathlete"
                },
                {
                  text: "Using the PEMF mat for just 20 minutes a day has improved my deep sleep metrics by 40%. Absolutely incredible.",
                  name: "David T.",
                  role: "Executive"
                },
                {
                  text: "As a competitive athlete, I'm always looking for an edge. wellneXfreQ delivers exactly that. My recovery time is cut in half.",
                  name: "Marcus L.",
                  role: "CrossFit Competitor"
                }
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className="bg-card w-[300px] md:w-auto border border-white/5 rounded-3xl p-8 relative hover:border-primary/20 transition-all shrink-0"
                >
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
                  <div className="flex gap-1 text-primary mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/80 leading-relaxed mb-8 italic">"{testimonial.text}"</p>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-white/50">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section id="blog" className="py-32 relative border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">Frequency</span> Journal
              </h2>
              <p className="text-white/60 max-w-xl text-lg">Science, recovery, and the cellular edge — from 13+ years in the field.</p>
            </div>
          </motion.div>

          {blogsLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
          ) : (
            <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 pb-4 scrollbar-hide">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="flex gap-6 w-max md:w-auto md:grid md:grid-cols-3"
              >
                {blogs.slice(0, 3).map((post) => (
                  <motion.div key={post.id} variants={fadeIn} className="w-80 md:w-auto flex-shrink-0 md:flex-shrink">
                    <Link to={`/blog/${post.slug}`} className="block group h-full">
                      <div className="rounded-2xl overflow-hidden border border-white/5 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(126,255,212,0.08)] bg-card flex flex-col h-full">
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent z-10" />
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute top-3 left-3 z-20">
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full border bg-primary/10 text-primary border-primary/30">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="text-base font-heading font-bold text-white mb-2 leading-snug group-hover:text-primary/90 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-white/50 text-sm leading-relaxed flex-grow line-clamp-2 mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-white/30 border-t border-white/5 pt-3">
                            <span>{post.readTime}</span>
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:scale-105 shadow-[0_0_20px_rgba(126,255,212,0.15)] group h-12 px-8">
              <Link to="/blog">
                View All Articles <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Frequently Asked <span className="text-primary">Questions</span></h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-white/10 py-2">
                <AccordionTrigger className="text-left text-lg font-medium text-white hover:text-primary transition-colors">
                  What is the difference between PEMF and Terahertz frequency therapy?
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed text-base">
                  PEMF (Pulsed Electromagnetic Field) therapy uses low-frequency electromagnetic pulses that mimic the Earth's natural field to recharge cellular voltage — essentially a battery charger for your cells. Terahertz frequency operates at a higher frequency band that resonates with the natural vibration of healthy human cells, penetrating deep into tissues to activate stem cells and clear meridian blockages. They work through different mechanisms and complement each other powerfully. Our THz TERA-P90+ system combines both in one device.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b border-white/10 py-2">
                <AccordionTrigger className="text-left text-lg font-medium text-white hover:text-primary transition-colors">
                  Which product should I start with?
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed text-base">
                  It depends on your primary goal. For full-body cellular recovery and sleep improvement, start with the TERA-P90 foot mat — it's the most convenient daily entry point. For targeted pain or inflammation in specific areas, the VITALITY WAND is the most direct tool. If you want the most comprehensive system with both PEMF and Terahertz in one, the THz TERA-P90+ is the flagship. We recommend reaching out via the inquiry form so we can guide you based on your individual situation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b border-white/10 py-2">
                <AccordionTrigger className="text-left text-lg font-medium text-white hover:text-primary transition-colors">
                  How soon will I notice results?
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed text-base">
                  Most people notice changes in sleep quality within the first 3-7 days of consistent use — deeper sleep, waking more restored. Energy and pain levels typically shift noticeably within 2-3 weeks. The effects are cumulative; your body is rebuilding cellular voltage and clearing accumulated stress. The longer and more consistently you use the technology, the more pronounced the results. Think of it like training — one session has value, but the real transformation comes from the compounding effect.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-b border-white/10 py-2">
                <AccordionTrigger className="text-left text-lg font-medium text-white hover:text-primary transition-colors">
                  Can I use multiple devices together?
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed text-base">
                  Yes — and we actively encourage it. For example: begin your morning on the TERA-P90 foot mat for 20 minutes to recharge cellular voltage before the day starts, use the VITALITY WAND on any symptomatic areas post-training, hydrate with the H+ BAR throughout the day to manage oxidative stress, and wind down with the GALAXY G-ONE or SHAKEN MASSAGER to support nervous system recovery before sleep. These devices are designed to stack, not compete.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border-b border-white/10 py-2">
                <AccordionTrigger className="text-left text-lg font-medium text-white hover:text-primary transition-colors">
                  Is frequency therapy safe for people with existing health conditions?
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed text-base">
                  Our devices use non-ionizing frequencies that are safe for the vast majority of people. Terahertz and PEMF are non-invasive and work with the body's own natural frequencies. As with any wellness technology, those with pacemakers, implanted electronic devices, or who are pregnant should consult their healthcare provider before use. We encourage anyone with a specific medical situation to reach out to us directly — we take a personalised approach to every inquiry.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6" className="border-b border-white/10 py-2">
                <AccordionTrigger className="text-left text-lg font-medium text-white hover:text-primary transition-colors">
                  What makes wellneXfreQ different from other wellness brands?
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed text-base">
                  wellneXfreQ exists at the intersection of elite athletic coaching and quantum wellness science. Every product is selected by a Strength and Movement Coach with 13+ years of biohacking experience — not by a marketing team. We don't sell devices for the sake of it. We educate on the underlying science, provide a direct inquiry model (no pressure, no checkout), and build ongoing relationships with clients to ensure results. This is cellular health taken seriously, not a supplement aisle purchase.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={coachBoulderImg} alt="Background" className="w-full h-full object-cover object-center opacity-20 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto bg-card/60 backdrop-blur-2xl border border-primary/20 rounded-[3rem] p-10 md:p-20 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Ready to Optimize Your <span className="text-primary">Frequency?</span></h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Whether you're dealing with chronic issues or looking to elevate your athletic performance, our technology can help you get there.
            </p>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-10 text-lg rounded-full shadow-[0_0_40px_rgba(126,255,212,0.4)] transition-all hover:scale-105 group">
              <Link to="/contact">
                Start Your Journey <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
