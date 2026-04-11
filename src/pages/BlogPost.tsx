import { motion } from "framer-motion";
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Loader2, ArrowRight } from "lucide-react";
import { useBlogBySlug, useBlogs } from "@/hooks/useBlogs";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

export default function BlogPost() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0];
  const navigate = useNavigate();
  const params = useParams();
  const { data: post, isLoading } = useBlogBySlug(params?.slug || "");
  const { data: allBlogs = [] } = useBlogs();

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params?.slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <span className="text-white/40 tracking-widest uppercase text-sm">{t("blog_post.loading")}</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pb-20 md:pb-0">
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold text-white mb-4">{t("blog_post.not_found")}</h1>
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to={`/${currentLang}/blog`}>{t("blog_post.back_to_blog")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const currentIndex = allBlogs.findIndex((p) => p.slug === params?.slug);
  const nextPost = allBlogs[currentIndex + 1] || null;
  const prevPost = allBlogs[currentIndex - 1] || null;

  return (
    <div className="bg-background min-h-screen pb-20 md:pb-0">
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/30 z-10" />
        <img
          src={post.image}
          alt={currentLang === "pl" ? (post.title_pl || post.title) : post.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 container mx-auto px-4 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-primary transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="uppercase tracking-widest font-medium">{t("common.navigation.back_to_journal")}</span>
            </button>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryColors[post.category] || categoryColors.Technology}`}>
                {getCategoryLabel(post.category)}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/40">
                <Clock className="w-3 h-3" />{currentLang === "pl" ? (post.readTime_pl || post.readTime) : post.readTime}
              </span>
              <span className="text-xs text-white/40">{currentLang === "pl" ? (post.date_pl || post.date) : post.date}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight max-w-3xl">
              {currentLang === "pl" ? (post.title_pl || post.title) : post.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-3xl py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="space-y-10"
        >
          {/* Intro */}
          <motion.p variants={fadeIn} className="text-lg md:text-xl text-white/70 leading-relaxed font-light border-l-4 border-primary/60 pl-6">
            {currentLang === "pl" ? (post.content.intro_pl || post.content.intro) : post.content.intro}
          </motion.p>

          {/* Sections */}
          {post.content.sections.map((section, i) => (
            <motion.div key={i} variants={fadeIn} className="space-y-4">
              <h2 className="text-xl md:text-2xl font-heading font-bold text-white">
                {currentLang === "pl" ? (section.heading_pl || section.heading) : section.heading}
              </h2>
              <p className="text-white/65 leading-relaxed text-base md:text-lg">
                {currentLang === "pl" ? (section.body_pl || section.body) : section.body}
              </p>
            </motion.div>
          ))}

          {/* Conclusion */}
          <motion.div
            variants={fadeIn}
            className="rounded-2xl bg-primary/5 border border-primary/20 p-8 mt-12"
          >
            <p className="text-white/80 leading-relaxed text-base md:text-lg italic">
              {currentLang === "pl" ? (post.content.conclusion_pl || post.content.conclusion) : post.content.conclusion}
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeIn}
            className="rounded-2xl bg-card border border-white/10 p-8 text-center"
          >
            <h3 className="text-xl font-heading font-bold text-white mb-3">{t("blog_post.cta.title")}</h3>
            <p className="text-white/50 text-sm mb-6">{t("blog_post.cta.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to={`/${currentLang}/#technology`}>{t("blog_post.cta.view_tech")}</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/5">
                <Link to={`/${currentLang}/contact`}>{t("blog_post.cta.inquire")}</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Prev / Next Navigation */}
        {(prevPost || nextPost) && (
          <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {prevPost ? (
              <Link to={`/${currentLang}/blog/${prevPost.slug}`} className="group flex items-start gap-4 p-5 rounded-xl border border-white/5 hover:border-primary/30 hover:bg-white/2 transition-all">
                <ArrowLeft className="w-5 h-5 text-white/30 group-hover:text-primary shrink-0 mt-0.5 transition-colors" />
                <div>
                  <div className="text-xs text-white/30 mb-1 uppercase tracking-wider">{t("blog_post.nav.prev")}</div>
                  <div className="text-sm font-medium text-white group-hover:text-primary transition-colors line-clamp-2">{currentLang === "pl" ? (prevPost.title_pl || prevPost.title) : prevPost.title}</div>
                </div>
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link to={`/${currentLang}/blog/${nextPost.slug}`} className="group flex items-start gap-4 p-5 rounded-xl border border-white/5 hover:border-primary/30 hover:bg-white/2 transition-all sm:flex-row-reverse text-right">
                <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-primary shrink-0 mt-0.5 transition-colors" />
                <div>
                  <div className="text-xs text-white/30 mb-1 uppercase tracking-wider">{t("blog_post.nav.next")}</div>
                  <div className="text-sm font-medium text-white group-hover:text-primary transition-colors line-clamp-2">{currentLang === "pl" ? (nextPost.title_pl || nextPost.title) : nextPost.title}</div>
                </div>
              </Link>
            ) : <div />}
          </div>
        )}
      </div>
    </div>
  );
}
