import { BrowserRouter, Routes, Route, useLocation, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import About from "@/pages/About";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";

const queryClient = new QueryClient();

function LanguageWrapper({ children }: { children: React.ReactNode }) {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && ["en", "pl"].includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return <>{children}</>;
}

function RootRedirect() {
  const { i18n } = useTranslation();
  const { pathname, search } = useLocation();
  const segments = pathname.split("/");
  const currentLang = segments[1];

  if (currentLang !== "en" && currentLang !== "pl") {
    // Determine target language from i18n (detected) or fallback to en
    const targetLang = ["en", "pl"].includes(i18n.language) ? i18n.language : "en";
    return <Navigate to={`/${targetLang}${pathname}${search}`} replace />;
  }
  return null;
}

function AppShell() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.includes("/admin");

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow pb-16 md:pb-0">
        <Routes>
          <Route path="/login" element={<Navigate to="/en/admin/login" replace />} />
          <Route path="/admin" element={<Navigate to="/en/admin" replace />} />
          <Route path="/admin/login" element={<Navigate to="/en/admin/login" replace />} />
          <Route path="/:lang/*" element={

            <LanguageWrapper>
            <Routes>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="product/:slug" element={<ProductDetail />} />
              {/* DISABLED BLOG FEATURE */}
              <Route path="blog/*" element={<NotFound />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              {/* END DISABLED BLOG FEATURE */}
              <Route path="contact" element={<Contact />} />
              <Route path="about" element={<About />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/login" element={<AdminLogin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LanguageWrapper>} />
          
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AppShell />
          <Toaster />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
