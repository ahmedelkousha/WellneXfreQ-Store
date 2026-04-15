import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Shield, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "wellnexfreq_cookie_consent";

export type ConsentValue = "accepted" | "rejected" | null;

export function getStoredConsent(): ConsentValue {
  try {
    return (localStorage.getItem(CONSENT_KEY) as ConsentValue) ?? null;
  } catch {
    return null;
  }
}

export function dispatchConsentChange(value: ConsentValue) {
  window.dispatchEvent(new CustomEvent("cookie_consent_changed", { detail: value }));
}

export default function ConsentBanner() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || i18n.language || "en";

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay so banner doesn't flash on page load if already consented
    const timer = setTimeout(() => {
      if (getStoredConsent() === null) {
        setVisible(true);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    dispatchConsentChange("accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    dispatchConsentChange("rejected");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="consent-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto pointer-events-auto">
            <div className="bg-zinc-900/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl shadow-black/60 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-5">
              {/* Icon */}
              <div className="shrink-0 p-3 rounded-xl bg-primary/10 text-primary">
                <Cookie className="w-6 h-6" />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold mb-1 text-sm">
                  {t("cookie_consent.title")}
                </p>
                <p className="text-white/50 text-xs leading-relaxed">
                  {t("cookie_consent.description")}{" "}
                  <a
                    href={`/${currentLang}/privacy`}
                    className="text-primary/80 hover:text-primary underline"
                  >
                    {t("cookie_consent.privacy_link")}
                  </a>
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 shrink-0 flex-wrap">
                <Button
                  onClick={handleReject}
                  variant="ghost"
                  size="sm"
                  className="text-white/40 hover:text-white hover:bg-white/5 text-xs border border-white/10"
                >
                  {t("cookie_consent.reject")}
                </Button>
                <Button
                  onClick={handleAccept}
                  size="sm"
                  className="bg-primary text-black font-bold text-xs rounded-full px-6 hover:bg-primary/90"
                >
                  <Shield className="w-3.5 h-3.5 mr-2" />
                  {t("cookie_consent.accept")}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
