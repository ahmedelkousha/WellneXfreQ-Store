import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Loader2 } from "lucide-react";
import { useBlogs } from "@/hooks/useBlogs";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const categoryColors: Record<string, string> = {
  Technology: "bg-primary/10 text-primary border-primary/30",
  Performance: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  Coaching: "bg-violet-500/10 text-violet-400 border-violet-500/30",
  Wellness: "bg-green-500/10 text-green-400 border-green-500/30",
  "Getting Started": "bg-orange-500/10 text-orange-400 border-orange-500/30",
};

export default function Blog() {
  const { data: blogPosts = [], isLoading } = useBlogs();

  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  return (
    <div className="bg-background min-h-screen pb-20 md:pb-0">
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[150px] rounded-full" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            Insights & Education
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
          >
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00CED1]">Frequency</span> Journal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto text-lg"
          >
            Science, performance, and the cellular edge. Deep-dives on PEMF, Terahertz frequency, recovery, and biohacking from 13+ years in the field.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="flex py-32 justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeIn}
                className="mb-20"
              >
                <Link to={`/blog/${featuredPost.slug}`} className="block group">
                  <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_60px_rgba(126,255,212,0.08)] bg-card">
                    <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/50 z-10 lg:block hidden" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent z-10 lg:hidden block" />
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryColors[featuredPost.category] || categoryColors.Technology}`}>
                          {featuredPost.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6 w-fit">
                        Featured
                      </div>
                      <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4 leading-tight group-hover:text-primary/90 transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-white/60 leading-relaxed mb-8">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-white/40">
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featuredPost.readTime}</span>
                          <span>{featuredPost.date}</span>
                        </div>
                        <span className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                          Read more <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {regularPosts.map((post) => (
                <motion.div key={post.id} variants={fadeIn}>
                  <Link to={`/blog/${post.slug}`} className="block group h-full">
                    <div className="rounded-2xl overflow-hidden border border-white/5 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(126,255,212,0.08)] bg-card flex flex-col h-full">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent z-10" />
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3 z-20">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColors[post.category] || categoryColors.Technology}`}>
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-lg font-heading font-bold text-white mb-3 leading-snug group-hover:text-primary/90 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-white/30 border-t border-white/5 pt-4">
                          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{post.readTime}</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
