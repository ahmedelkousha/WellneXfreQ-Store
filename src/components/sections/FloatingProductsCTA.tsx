import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function FloatingProductsCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();
  const currentLang = lang || i18n.language.split("-")[0] || "en";

  // Only show on Home and About pages
  const isAllowedPage = location.pathname === `/${currentLang}` ||
    location.pathname === `/${currentLang}/` ||
    location.pathname === `/${currentLang}/about`;

  useEffect(() => {
    const handleScroll = () => {
      if (!isAllowedPage) {
        setIsVisible(false);
        return;
      }

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Thresholds
      const showThreshold = 400; // Show after scrolling 400px
      const hideBeforeBottom = 300; // Hide 300px before reaching the end

      const isPastShow = scrollY > showThreshold;
      const isBeforeHide = scrollY < (documentHeight - windowHeight - hideBeforeBottom);

      // Check for #technology intersection
      let isOverlappingTech = false;
      const techSection = document.getElementById("technology");
      if (techSection) {
        const rect = techSection.getBoundingClientRect();
        // The floating button usually sits near the bottom
        // We'll hide it if the tech section is within the visible window where the button sits
        const buttonY = windowHeight * 0.85; 
        if (rect.top <= buttonY && rect.bottom >= buttonY) {
          isOverlappingTech = true;
        }
      }

      setIsVisible(isPastShow && isBeforeHide && !isOverlappingTech);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAllowedPage, location.pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-[15%] sm:right-4 -right-14 md:bottom-20 md:right-8 z-50 flex items-center gap-2"
        >
          <Link
            to={`/${currentLang}/products`}
            className="group relative flex items-center gap-3 px-2 sm:px-6 sm:py-4 py-8 sm:rounded-full rounded-lg bg-primary text-black/80 hover:shadow-none shadow-2xl shadow-primary/40 hover:bg-transparent hover:text-primary transition-all duration-300 font-heading"
          >
            <ShoppingBag className="sm:w-5 sm:h-5 w-4 h-4 shrink-0 group-hover:rotate-12 transition-transform" />
            <span className="text-[9px] -translate-x-8 sm:translate-x-0 sm:rotate-0 -rotate-90 sm:text-[10px] lg:text-xs uppercase tracking-widest leading-none font-bold">
              <span className="hidden sm:inline">{t("common.navigation.view_products")}</span>
              <span className="sm:hidden">{ t("common.navigation.products")}</span>
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
