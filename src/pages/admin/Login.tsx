import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

export default function AdminLogin() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || i18n.language || "en";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate(`/${currentLang}/admin`);
      }
    });
    return () => unsubscribe();
  }, [navigate, currentLang]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(`/${currentLang}/admin`);
    } catch (error: any) {
      toast({
        title: t("admin.login.failed"),
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
      <SEO title="Admin Login" noindex={true} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-card border border-white/10 p-8 rounded-3xl"
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">{t("admin.login.title")}</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-white/70 text-sm">{t("admin.login.email")}</label>
            <Input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/50 text-white border-white/10 mt-1" 
              required
            />
          </div>
          <div>
            <label className="text-white/70 text-sm">{t("admin.login.password")}</label>
            <Input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/50 text-white border-white/10 mt-1" 
              required
            />
          </div>
          <Button type="submit" className="w-full bg-primary text-black">{t("admin.login.submit")}</Button>
        </form>
      </motion.div>
    </div>
  );
}
