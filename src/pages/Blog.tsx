import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Loader2, BookOpen } from "lucide-react";
import { useBlogs } from "@/hooks/useBlogs";
import { useTranslation } from "react-i18next";
import AffiliateCTA from "@/components/sections/AffiliateCTA";
import blogCoverImg from "@assets/blog-cover.png";
import SEO from "@/components/SEO";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function Blog() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0];

  const categoryColors: Record<string, string> = {
    Technology: "bg-primary/10 text-primary border-primary/30",
    Performance: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    Coaching: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    Wellness: "bg-green-500/10 text-green-400 border-green-500/30",
    "Getting Started": "bg-orange-500/10 text-orange-400 border-orange-500/30",
  };

  const getCategoryLabel = (category: string) => {
    return t(`blog.categories.${category}`, { defaultValue: category });
  };

  const { data: blogPosts = [], isLoading } = useBlogs();

  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  return (
    <div className="bg-background min-h-screen pb-20 md:pb-0">
      <SEO 
        title={t("seo.blog.title")} 
        description={t("seo.blog.description")} 
        noindex={true}
      />
      {/* BLOG HERO — cover image section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full scale-150 transform -translate-y-1/2" />
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background via-background/90 to-transparent h-2/3" />
          <img
            src={blogCoverImg}
            alt="Blog cover"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-overlay grayscale"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6 backdrop-blur-md"
          >
            <BookOpen className="w-4 h-4" />
            {t("blog.hero.badge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6"
          >
            {t("blog.hero.title")}<span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-[#00CED1]">{t("blog.hero.title_highlight")}</span>{t("blog.hero.title_suffix")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light"
          >
            {t("blog.hero.subtitle")}
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="flex py-32 justify-center flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <span className="text-white/40 text-sm tracking-widest uppercase">{t("blog.list.loading")}</span>
          </div>
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
                <Link to={`/${currentLang}/blog/${featuredPost.slug}`} className="block group">
                  <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_60px_rgba(126,255,212,0.08)] bg-card">
                    <div className="relative aspect-4/3 lg:aspect-auto overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-r from-transparent to-card/50 z-10 lg:block hidden" />
                      <div className="absolute inset-0 bg-linear-to-t from-card/80 to-transparent z-10 lg:hidden block" />
                      <img
                        src={featuredPost.image}
                        alt={currentLang === "pl" ? (featuredPost.title_pl || featuredPost.title) : featuredPost.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryColors[featuredPost.category] || categoryColors.Technology}`}>
                          {getCategoryLabel(featuredPost.category)}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6 w-fit">
                        {t("blog.featured.badge")}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4 leading-tight group-hover:text-primary/90 transition-colors">
                        {currentLang === "pl" ? (featuredPost.title_pl || featuredPost.title) : featuredPost.title}
                      </h2>
                      <p className="text-white/60 leading-relaxed mb-8">
                        {currentLang === "pl" ? (featuredPost.excerpt_pl || featuredPost.excerpt) : featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-white/40">
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{currentLang === "pl" ? (featuredPost.readTime_pl || featuredPost.readTime) : featuredPost.readTime}</span>
                          <span>{currentLang === "pl" ? (featuredPost.date_pl || featuredPost.date) : featuredPost.date}</span>
                        </div>
                        <span className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                          {t("blog.featured.read_more")} <ArrowRight className="w-4 h-4" />
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
                  <Link to={`/${currentLang}/blog/${post.slug}`} className="block group h-full">
                    <div className="rounded-2xl overflow-hidden border border-white/5 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(126,255,212,0.08)] bg-card flex flex-col h-full">
                      <div className="relative aspect-video overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-t from-card/80 to-transparent z-10" />
                        <img
                          src={post.image}
                          alt={currentLang === "pl" ? (post.title_pl || post.title) : post.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3 z-20">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColors[post.category] || categoryColors.Technology}`}>
                            {getCategoryLabel(post.category)}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col grow">
                        <h3 className="text-lg font-heading font-bold text-white mb-3 leading-snug group-hover:text-primary/90 transition-colors line-clamp-2">
                          {currentLang === "pl" ? (post.title_pl || post.title) : post.title}
                        </h3>
                        <p className="text-white/50 text-sm leading-relaxed mb-6 grow line-clamp-3">
                          {currentLang === "pl" ? (post.excerpt_pl || post.excerpt) : post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-white/30 border-t border-white/5 pt-4">
                          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{currentLang === "pl" ? (post.readTime_pl || post.readTime) : post.readTime}</span>
                          <span>{currentLang === "pl" ? (post.date_pl || post.date) : post.date}</span>
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
      <AffiliateCTA />
    </div>
  );
}
