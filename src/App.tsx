import { BrowserRouter, Routes, Route, useLocation, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/Home"));
const Products = lazy(() => import("@/pages/Products"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Contact = lazy(() => import("@/pages/Contact"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const About = lazy(() => import("@/pages/About"));
const OrderNow = lazy(() => import("@/pages/OrderNow"));
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";
const AdminLogin = lazy(() => import("@/pages/admin/Login"));
const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

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
      <main className="grow pb-16 md:pb-0">
        <Routes>
          <Route path="/login" element={<Navigate to="/en/admin/login" replace />} />
          <Route path="/admin" element={<Navigate to="/en/admin" replace />} />
          <Route path="/admin/login" element={<Navigate to="/en/admin/login" replace />} />
          <Route path="/:lang/*" element={

            <LanguageWrapper>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="products" element={<Products />} />
                  <Route path="product/:slug" element={<ProductDetail />} />
                  <Route path="order" element={<OrderNow />} />
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
              </Suspense>
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
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <AppShell />
            <Toaster />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
