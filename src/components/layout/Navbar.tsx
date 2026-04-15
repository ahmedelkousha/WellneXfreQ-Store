import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import { useProducts } from "@/hooks/useProducts";
import { Home, Cpu, Mail, Leaf, ShoppingBag } from "lucide-react";
import logoImg from "@assets/logo.png";

import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  // const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split("-")[0]; // handle variants like en-US
  // const { data: products = [] } = useProducts();
  const [activeSection, setActiveSection] = useState<string>("");
  const { pathname: location } = useLocation();
  const navigate = useNavigate();

  const getPath = (path: string) => `/${currentLang}${path === "/" ? "" : path}`;

  const toggleLanguage = () => {
    const nextLang = currentLang === "en" ? "pl" : "en";
    const newPath = location.replace(`/${currentLang}`, `/${nextLang}`);
    navigate(newPath);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // useEffect(() => {
  //   setProductsDropdownOpen(false);
  // }, [location]);

  // IntersectionObserver to track active section for bottom nav highlight
  useEffect(() => {
    if (!location.startsWith(`/${currentLang}/`) && location !== `/${currentLang}`) {
      setActiveSection("");
      return;
    }

    const sectionIds = ["technology", "philosophy", "blog", "products", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-20% 0px -20% 0px" }
    );

    const timer = setTimeout(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 200);

    const handleScroll = () => {
      if (window.scrollY < 200) setActiveSection("");
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location, currentLang]);

  const scrollToSection = (sectionId: string) => {
    if (location === `/${currentLang}` || location === `/${currentLang}/`) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      sessionStorage.setItem("pendingScroll", sectionId);
      navigate(`/${currentLang}`);
    }
  };

  const handleHomeClick = () => {
    if (location === `/${currentLang}` || location === `/${currentLang}/`) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(`/${currentLang}`);
    }
  };

  const isHomeActive = (location === `/${currentLang}` || location === `/${currentLang}/`) && !["technology", "philosophy", "blog", "products", "contact"].includes(activeSection);
  const isTechActive = activeSection === "technology"
  const isPhilActive = activeSection === "philosophy" || location.includes("/about");
  // const isBlogActive = activeSection === "blog" || location.includes("/blog");
  const isProductsActive = activeSection === "products" || location.includes("/products");
  const isContactActive = activeSection === "contact" || location.includes("/contact");
  // const isOrderActive = location.includes("/order");

  const mobileNavItems = [
    {
      label: t("nav.home"),
      icon: Home,
      action: handleHomeClick,
      active: isHomeActive,
      href: false
    },
    {
      label: t("nav.philosophy"),
      icon: Leaf,
      action: () => scrollToSection("philosophy"),
      active: isPhilActive,
      href: false
    },
    {
      label: t("nav.technology"),
      icon: Cpu,
      action: () => scrollToSection("technology"),
      active: isTechActive,
      href: false
    },

    // {
    //   label: t("nav.blog"),
    //   icon: BookOpen,
    //   action: () => scrollToSection("blog"),
    //   active: isBlogActive,
    // },
    {
      label: t("nav.products"),
      icon: ShoppingBag,
      action: () => scrollToSection("products"),
      active: isProductsActive,
      href: false
    },
    {
      label: t("nav.contact"),
      icon: Mail,
      action: () => scrollToSection("contact"),
      active: isContactActive,
      href: false
    },
    // {
    //   label: t("nav.order"),
    //   icon: Cpu,
    //   href: getPath("/order"),
    //   active: isOrderActive,
    // },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-background py-4"
          : "bg-background/90 py-5"
          }`}
      >
        <div className="mx-auto px-4 md:px-6 lg:px-12 flex items-center justify-between">
          <button onClick={handleHomeClick} className="flex items-center gap-2 z-50 relative">
            <img loading="lazy"
              src={logoImg}
              alt="wellneXfreQ"
              className={`md:h-8 h-6 w-auto`}
              style={{ mixBlendMode: "screen" }}
            />

            {/* { (location === `/${currentLang}` || location === `/${currentLang}/`) && (
              <motion.div
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: isScrolled ? 0 : 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" as const }}
                className={`${isScrolled ? 'opacity-0' : 'opacity-100'} absolute top-16 z-20 left-0  text-black bg-white flex items-center gap-2 px-2 py-2 rounded-lg border border-primary/30 text-[0.58rem] md:text-xs font-medium backdrop-blur-md`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {t("home.hero.tagline")}
              </motion.div>
            )} */}

          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">




            <button
              onClick={handleHomeClick}
              className={`text-xs tracking-widest font-medium transition-colors uppercase ${isHomeActive ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
            >
              {t("nav.home")}
            </button>

            {/* <div
                className={`absolute top-full left-1/2 -translate-x-1/2 w-64 bg-card border border-white/10 rounded-lg shadow-xl overflow-hidden transition-all duration-200 origin-top ${productsDropdownOpen
                    ? "opacity-100 scale-y-100 pointer-events-auto"
                    : "opacity-0 scale-y-0 pointer-events-none"
                  }`}
                onMouseEnter={() => setProductsDropdownOpen(true)}
                onMouseLeave={() => setProductsDropdownOpen(false)}
              >
                <div className="py-2">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      to={getPath(`/product/${product.slug}`)}
                      className="block px-4 py-2.5 text-sm hover:bg-white/5 hover:text-primary transition-colors font-medium"
                    >
                      {currentLang === "pl" ? (product.name_pl || product.name) : product.name}
                    </Link>
                  ))}
                </div>
              </div> */}
            {/* </div> */}

            <button
              onClick={() => scrollToSection("philosophy")}
              className={`text-xs tracking-widest font-medium transition-colors uppercase ${isPhilActive ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
            >
              {t("nav.philosophy")}
            </button>
            <button
              className={`flex items-center text-xs tracking-widest font-medium transition-colors uppercase ${isTechActive ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
              onClick={() => scrollToSection("technology")}
            // onMouseEnter={() => setProductsDropdownOpen(true)}
            // onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              {t("nav.technology")}
            </button>


            {/* <button
              onClick={() => scrollToSection("blog")}
              className={`text-sm font-medium transition-colors ${isBlogActive ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
            >
              {t("nav.blog")}
            </button> */}

            <Link
              to={getPath("/products")}
              className={`text-xs tracking-widest font-medium transition-colors uppercase ${isProductsActive ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
            >
              {t("nav.products")}
            </Link>

            <Link
              to={getPath("/contact")}
              className={`text-xs tracking-widest font-medium transition-colors uppercase ${isContactActive ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
            >
              {t("nav.contact")}
            </Link>
            {/* 
            <Link
              to={getPath("/order")}
              className={`text-sm font-medium transition-colors ${isOrderActive ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
            >
              {t("nav.order")}
            </Link> */}

            <div className="flex items-center gap-3 ml-2">
              <button
                onClick={toggleLanguage}
                className="flex items-center justify-center hover:scale-105 transition-transform focus:outline-none shrink-0"
                title={currentLang === "en" ? "Switch to Polish" : "Przełącz na Angielski"}
              >
                {currentLang === "en" ? (
                  <Flag code="PL" className="w-6 h-4 rounded-sm shadow-sm" />
                ) : (
                  <Flag code="AU" className="w-6 h-4 rounded-sm shadow-sm" />
                )}
                {/* {currentLang === "en" ? (
                  <span className="w-4 h-4 text-xs tracking-[0.2rem] rounded-sm shadow-sm text-primary hover:text-white">PL</span>
                ) : (
                  <span className="w-4 h-4 text-xs tracking-[0.2rem] rounded-sm shadow-sm">EN</span>
                )} */}
              </button>

              <Button
                asChild
                variant="outline"
                className="border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link className="text-xs font-medium tracking-widest" to={getPath("/order")}>{t("nav.order").toUpperCase()}</Link>
              </Button>
            </div>
          </nav>

          {/* Mobile top: logo + Inquire Now only */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center focus:outline-none"
            >
              {/* {currentLang === "en" ? (
                <span className="w-4 h-4 text-xs rounded-sm shadow-sm text-white hover:text-primary">PL</span>
              ) : (
                <span className="w-4 h-4 text-xs rounded-sm text-white hover:text-primary shadow-sm">EN</span>
              )} */}
              {currentLang === "en" ? (
                <Flag code="PL" className="w-6 h-4 rounded-sm shadow-sm" />
              ) : (
                <Flag code="AU" className="w-6 h-4 rounded-sm shadow-sm" />
              )}
            </button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="text-xs tracking-widest font-medium transition-colors uppercase border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link to={getPath("/order")}>{t("nav.order")}</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Fixed Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-white/10" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <div className="flex items-center py-2 px-1">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;

            if (item.href) {
              return (
                <Link
                  key={item.label}
                  to={item.href as any}
                  className={`flex flex-col items-center gap-1 px-1 py-2 rounded-xl transition-all flex-1 min-w-0 ${item.active
                    ? "text-primary bg-primary/10"
                    : "text-foreground/40"
                    }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="text-[10px] font-medium leading-none text-center">{item.label}</span>
                </Link>
              );
            }

            return (
              <button
                key={item.label}
                onClick={item.action}
                className={`flex flex-col items-center gap-1 px-1 py-2 rounded-xl transition-all flex-1 min-w-0 ${item.active
                  ? "text-primary bg-primary/10"
                  : "text-foreground/40"
                  }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="text-[10px] font-medium leading-none text-center">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}