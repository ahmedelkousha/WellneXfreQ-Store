import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImg from "@assets/logo.png";
import { Instagram, Facebook, Mail, ArrowUpRight, Phone, MapPin } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function Footer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const scrollToPhilosophy = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/") {
      const el = document.getElementById("philosophy");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      sessionStorage.setItem("pendingScroll", "philosophy");
      navigate("/");
    }
  };

  const TechLinks = () => (
    <ul className="space-y-4">
      <li><Link to="/product/shaken-massager" className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> SHAKEN MASSAGER</Link></li>
      <li><Link to="/product/thz-tera-p90-plus" className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> THz TERA-P90+</Link></li>
      <li><Link to="/product/vitality-wand" className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> VITALITY WAND</Link></li>
      <li><Link to="/product/h-plus-bar" className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> H+ BAR</Link></li>
      <li><Link to="/product/galaxy-g-one" className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> GALAXY G-ONE</Link></li>
      <li><Link to="/product/tera-p90" className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> TERA-P90</Link></li>
    </ul>
  );

  const CompanyLinks = () => (
    <ul className="space-y-4">
      <li><a href="/" onClick={handleHomeClick} className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> Home</a></li>
      <li><a href="/#philosophy" onClick={scrollToPhilosophy} className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> Philosophy</a></li>
      <li><Link to="/about" className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> About</Link></li>
      <li><Link to="/blog" className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> Blog</Link></li>
      <li><Link to="/contact" className="hover:text-primary transition-colors text-sm flex items-center group"><ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1" /> Contact</Link></li>
    </ul>
  );

  const ConnectLinks = () => (
    <ul className="space-y-4">
      <li className="flex items-start gap-3 text-sm">
        <Mail className="w-5 h-5 text-primary shrink-0" />
        <a href="mailto:your@wellnexfreq.com" className="hover:text-white transition-colors break-all">your@wellnexfreq.com</a>
      </li>
      <li className="flex items-start gap-3 text-sm">
        <Phone className="w-5 h-5 text-primary shrink-0" />
        <a href="tel:+61450334543" className="hover:text-white transition-colors">+61 450 334 543</a>
      </li>
      <li className="flex items-start gap-3 text-sm">
        <MapPin className="w-5 h-5 text-primary shrink-0" />
        <span className="text-foreground/70">Australia | Poland</span>
      </li>
    </ul>
  );

  return (
    <footer className="bg-black text-foreground/70 py-16 border-t border-white/5 relative overflow-hidden mb-16 md:mb-0">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <a href="/" onClick={handleHomeClick} className="inline-block mb-6">
              <img src={logoImg} alt="wellneXfreQ" className="h-12 w-auto" style={{ mixBlendMode: "screen" }} />
            </a>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Bridging cutting-edge frequency technology with peak physical performance. Built to move. Created to last. Powered at the source.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:block">
            <h4 className="text-white font-heading font-semibold mb-6 tracking-wider">Company</h4>
            <CompanyLinks />
          </div>

          <div className="hidden md:block">
            <h4 className="text-white font-heading font-semibold mb-6 tracking-wider">Technology</h4>
            <TechLinks />
          </div>



          <div className="hidden md:block">
            <h4 className="text-white font-heading font-semibold mb-6 tracking-wider">Connect</h4>
            <ConnectLinks />
          </div>

          {/* Mobile Accordion */}
          <div className="md:hidden col-span-1">
            <Accordion type="single" collapsible className="w-full">

              <AccordionItem value="company" className="border-white/10">
                <AccordionTrigger className="text-white hover:no-underline font-heading font-semibold tracking-wider">Company</AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 pb-4">
                    <CompanyLinks />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="technology" className="border-white/10">
                <AccordionTrigger className="text-white hover:no-underline font-heading font-semibold tracking-wider">Technology</AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 pb-4">
                    <TechLinks />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="connect" className="border-white/10">
                <AccordionTrigger className="text-white hover:no-underline font-heading font-semibold tracking-wider">Connect</AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 pb-4">
                    <ConnectLinks />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} wellneXfreQ. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
