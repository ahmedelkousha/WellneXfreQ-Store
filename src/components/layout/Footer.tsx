import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Mail,
  ArrowUpRight,
  Phone,
  MessageCircle,
  MapPin
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import FloatingProductsCTA from "../sections/FloatingProductsCTA";
import logo from "@assets/logo-icon.png";



const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Footer() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0];
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const getPath = (path: string) => `/${currentLang}${path === "/" ? "" : path}`;

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === `/${currentLang}` || pathname === `/${currentLang}/`) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(`/${currentLang}`);
    }
  };

  const scrollToPhilosophy = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === `/${currentLang}` || pathname === `/${currentLang}/`) {
      const el = document.getElementById("philosophy");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      sessionStorage.setItem("pendingScroll", "philosophy");
      navigate(`/${currentLang}`);
    }
  };

  const socialLinks = [
    { icon: Facebook, href: t("order.social.facebook") },
    { icon: Instagram, href: t("order.social.instagram") },
  ];

  const TechLinks = () => (
    <ul className="space-y-4 -translate-x-[0.9rem]">
      <li><Link to={getPath("/products")} className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> THz TERA-P90+</Link></li>
      <li><Link to={getPath("/products")} className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> TERA-P90</Link></li>
      <li><Link to={getPath("/products")} className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> GALAXY G-ONE</Link></li>
      <li><Link to={getPath("/products")} className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> SHAKEN MASSAGER</Link></li>
      <li><Link to={getPath("/products")} className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> VITALITY WAND</Link></li>
      <li><Link to={getPath("/products")} className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> H+ BAR</Link></li>
    </ul>
  );

  const CompanyLinks = () => (
    <ul className="space-y-4 -translate-x-[0.9rem] uppercase">
      <li><a href={getPath("/")} onClick={handleHomeClick} className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> {t("nav.home")}</a></li>
      {/* <li><Link to={getPath("/about")} className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> {t("nav.about")}</Link></li> */}
      <li><a href={`${getPath("/")}#philosophy`} onClick={scrollToPhilosophy} className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> {t("footer.philosophy")}</a></li>
      <li><a href={`${getPath("/")}#technology`} onClick={scrollToPhilosophy} className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> {t("nav.technology")}</a></li>
      <li><Link to={getPath("/products")} className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> {t("nav.products")}</Link></li>
      {/* <li><Link to={getPath("/blog")} className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> {t("nav.blog")}</Link></li> */}
      <li><Link to={getPath("/contact")} className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> {t("nav.contact")}</Link></li>
      <li><Link to={getPath("/order")} className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> {t("nav.order-footer")}</Link></li>
    </ul>
  );

  const ConnectLinks = () => (
    <ul className="space-y-4">
      <li className="flex items-start gap-3 text-sm">
        <Mail className="w-5 h-5 text-primary shrink-0" />
        <a href={`mailto:${t("order.social.email")}`} className="hover:text-white transition-colors break-all">{t("order.social.email")}</a>
      </li>
      <li className="flex items-start gap-3 text-sm">
        <Phone className="w-5 h-5 text-primary shrink-0" />
        <a href={`tel:${t("order.social.phone").replace(/\s/g, "")}`} className="hover:text-white transition-colors">{t("order.social.phone")}</a>
      </li>
      <li className="flex items-start gap-3 text-sm">
        <MessageCircle className="w-5 h-5 text-primary shrink-0" />
        <a target="_blank" rel="noopener noreferrer" href={`https://wa.me/61450334543`} className="hover:text-white transition-colors">{t("order.social.phone")}</a>
      </li>
      <li className="flex items-start gap-3 text-sm">
        <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <span className="text-foreground/70">Australia | Poland</span>
      </li>
    </ul>
  );

  return (
    <footer className="relative bg-background border-t border-white/5 pt-24 pb-12 overflow-hidden mb-16 md:mb-0">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="lg:col-span-1 space-y-0"
          >
            <a href={getPath("/")} onClick={handleHomeClick} className="inline-block mb-2 -mt-4">
              <img loading="lazy" src={logo} alt="logo" className="h-16" />
            </a>
            <p className="text-white/50 leading-relaxed text-sm max-w-xs mb-4">
              {t("footer.tagline")}
            </p>

            <div className="flex gap-4 pt-4">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-primary hover:text-primary transition-all duration-300 bg-white/5 hover:bg-primary/10"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:block">
            <h4 className="text-primary font-heading font-semibold mb-6 tracking-wider uppercase text-xs">{t("footer.company")}</h4>
            <CompanyLinks />
          </div>

          <div className="hidden md:block">
            <h4 className="text-primary font-heading font-semibold mb-6 tracking-wider uppercase text-xs">{t("footer.tech")}</h4>
            <TechLinks />
          </div>

          <div className="hidden md:block">
            <h4 className="text-primary font-heading font-semibold mb-6 tracking-wider uppercase text-xs">{t("footer.connect")}</h4>
            <ConnectLinks />

          </div>

          {/* Mobile Accordion */}
          <div className="md:hidden col-span-1">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="company" className="border-white/10">
                <AccordionTrigger className="text-white hover:no-underline font-heading font-semibold tracking-wider text-xs uppercase">{t("footer.company")}</AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 pb-4">
                    <CompanyLinks />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="technology" className="border-white/10">
                <AccordionTrigger className="text-white hover:no-underline font-heading font-semibold tracking-wider text-xs uppercase">{t("footer.tech")}</AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 pb-4">
                    <TechLinks />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="connect" className="border-white/10">
                <AccordionTrigger className="text-white hover:no-underline font-heading font-semibold tracking-wider text-xs uppercase">{t("footer.connect")}</AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 pb-4">
                    <ConnectLinks />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] uppercase tracking-[0.2em] text-white/30">
          <p>&copy; {new Date().getFullYear()} wellneXfreQ. {t("footer.rights")}</p>
          <div className="flex gap-8">
            <Link to={getPath("/privacy")} className="hover:text-primary transition-colors">{t("footer.privacy")}</Link>
            <Link to={getPath("/terms")} className="hover:text-primary transition-colors">{t("footer.terms")}</Link>
          </div>
        </div>
      </div>
      <FloatingProductsCTA />
    </footer>
  );
}
