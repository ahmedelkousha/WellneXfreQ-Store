import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ChevronDown, Home, Cpu, BookOpen, Mail, Leaf } from "lucide-react";
import logoImg from "@assets/logo.png";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const { data: products = [] } = useProducts();
  const [activeSection, setActiveSection] = useState<string>("");
  const { pathname: location } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setProductsDropdownOpen(false);
  }, [location]);

  // IntersectionObserver to track active section for bottom nav highlight
  useEffect(() => {
    if (location !== "/") {
      setActiveSection("");
      return;
    }

    const sectionIds = ["technology", "philosophy", "blog"];

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

    // When user scrolls back near top, reset active section
    const handleScroll = () => {
      if (window.scrollY < 200) setActiveSection("");
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  const scrollToSection = (sectionId: string) => {
    if (location === "/") {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      sessionStorage.setItem("pendingScroll", sectionId);
      navigate("/");
    }
  };

  const handleHomeClick = () => {
    if (location === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const isHomeActive = location === "/" && !["technology", "philosophy", "blog"].includes(activeSection);
  const isTechActive = activeSection === "technology" || location === "/products";
  const isPhilActive = activeSection === "philosophy" || location === "/about"; // kept for IntersectionObserver tracking
  const isBlogActive = activeSection === "blog" || location === "/blog";
  const isContactActive = location === "/contact";

  const mobileNavItems = [
    {
      label: "Home",
      icon: Home,
      action: handleHomeClick,
      active: isHomeActive && location === "/",
    },
    {
      label: "Technology",
      icon: Cpu,
      action: () => scrollToSection("technology"),
      active: isTechActive,
    },
    {
      label: "Philosophy",
      icon: Leaf,
      action: () => scrollToSection("philosophy"),
      active: isPhilActive,
    },
    {
      label: "Blog",
      icon: BookOpen,
      action: () => scrollToSection("blog"),
      active: isBlogActive,
    },
    {
      label: "Contact",
      icon: Mail,
      href: "/contact",
      active: isContactActive,
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? "bg-background/90 backdrop-blur-md py-3"
            : "bg-transparent py-5"
          }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <button onClick={handleHomeClick} className="flex items-center gap-2 z-50 relative">
            <img
              src={logoImg}
              alt="wellneXfreQ"
              className="h-6 w-auto"
              style={{ mixBlendMode: "screen" }}
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={handleHomeClick}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Home
            </button>

            <div className="relative">
              <button
                className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => scrollToSection("technology")}
                onMouseEnter={() => setProductsDropdownOpen(true)}
                onMouseLeave={() => setProductsDropdownOpen(false)}
              >
                Technology <ChevronDown className="w-4 h-4" />
              </button>

              <div
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
                      to={`/product/${product.slug}`}
                      className="block px-4 py-2.5 text-sm hover:bg-white/5 hover:text-primary transition-colors font-medium"
                    >
                      {product.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => scrollToSection("philosophy")}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Philosophy
            </button>

            <button
              onClick={() => scrollToSection("blog")}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Blog
            </button>

            <Link
              to="/contact"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Contact
            </Link>

            <Button
              asChild
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link to="/contact">Inquire Now</Link>
            </Button>
          </nav>

          {/* Mobile top: logo + Inquire Now only */}
          <div className="md:hidden">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link to="/contact">Inquire Now</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Fixed Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-white/10" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <div className="flex items-center justify-around py-2 px-1">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;

            if (item.href) {
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-0 ${item.active
                      ? "text-primary bg-primary/10"
                      : "text-foreground/40"
                    }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="text-[10px] font-medium leading-none">{item.label}</span>
                </Link>
              );
            }

            return (
              <button
                key={item.label}
                onClick={item.action}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-0 ${item.active
                    ? "text-primary bg-primary/10"
                    : "text-foreground/40"
                  }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="text-[10px] font-medium leading-none">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}