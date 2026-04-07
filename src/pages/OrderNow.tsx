import OrderForm from "@/components/sections/OrderForm";
import { useTranslation } from "react-i18next";
import { Instagram, Facebook, Mail, Phone, MessageCircle } from "lucide-react";

export default function OrderNow() {
  const { t } = useTranslation();

  return (
    <div className="pt-28 pb-24 bg-background text-foreground">
      <div className="container mx-auto px-4 lg:px-6 max-w-6xl">
        <section className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">
            {t("order.hero.badge")}
          </p>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            {t("order.hero.title")}
          </h1>
          <p className="text-sm md:text-base text-white/70 max-w-2xl">
            {t("order.hero.subtitle")}
          </p>
        </section>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] items-start">
          <section className="bg-black/40 border border-white/10 rounded-3xl p-5 md:p-7 shadow-xl shadow-black/40">
            <h2 className="text-lg font-semibold mb-3 text-white">
              {t("order.form.title")}
            </h2>
            <p className="text-xs text-white/60 mb-6">
              {t("order.form.description")}
            </p>
            <OrderForm />
          </section>

          <aside className="space-y-6">
            <div className="bg-black/40 border border-white/10 rounded-3xl p-5 md:p-6">
              <h3 className="text-sm font-semibold text-white mb-2">
                {t("order.methodology.title")}
              </h3>
              <ol className="space-y-2 text-xs text-white/70 list-decimal list-inside">
                <li>{t("order.methodology.steps.0")}</li>
                <li>{t("order.methodology.steps.1")}</li>
                <li>{t("order.methodology.steps.2")}</li>
              </ol>
              <p className="mt-3 text-[11px] text-white/50">
                {t("order.methodology.note")}
              </p>
            </div>

            <div className="bg-black/40 border border-white/10 rounded-3xl p-5 md:p-6 space-y-4">
              <h3 className="text-sm font-semibold text-white">
                {t("order.social.title")}
              </h3>
              <p className="text-xs text-white/70">{t("order.social.subtitle")}</p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <a
                  href="https://www.facebook.com/share/18CbZK1UyD/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:border-primary hover:bg-primary/10 transition-colors"
                >
                  <Facebook className="h-4 w-4 text-primary" />
                  <div className="flex flex-col">
                    <span className="font-medium text-white/90">Facebook</span>
                    <span className="text-[10px] text-white/60">Australia</span>
                  </div>
                </a>
                <a
                  href="https://www.facebook.com/share/1EE6TqJA6N/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:border-primary hover:bg-primary/10 transition-colors"
                >
                  <Facebook className="h-4 w-4 text-primary" />
                  <div className="flex flex-col">
                    <span className="font-medium text-white/90">Facebook</span>
                    <span className="text-[10px] text-white/60">Poland</span>
                  </div>
                </a>
                <a
                  href="https://www.instagram.com/wellnexfreq.au?igsh=MThrenBseWpzOWR1YQ=="
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:border-primary hover:bg-primary/10 transition-colors"
                >
                  <Instagram className="h-4 w-4 text-primary" />
                  <div className="flex flex-col">
                    <span className="font-medium text-white/90">Instagram</span>
                    <span className="text-[10px] text-white/60">Australia</span>
                  </div>
                </a>
                <a
                  href="https://www.instagram.com/wellnexfreq.pl?igsh=MWd4ajNlbWpka3Z5NQ=="
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:border-primary hover:bg-primary/10 transition-colors"
                >
                  <Instagram className="h-4 w-4 text-primary" />
                  <div className="flex flex-col">
                    <span className="font-medium text-white/90">Instagram</span>
                    <span className="text-[10px] text-white/60">Poland</span>
                  </div>
                </a>
              </div>

              <div className="space-y-2 text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a
                    href="mailto:your@wellnexfreq.com"
                    className="hover:text-primary transition-colors"
                  >
                    your@wellnexfreq.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <a
                    href="tel:+61450334543"
                    className="hover:text-primary transition-colors"
                  >
                    +61 450 334 543
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  <a
                    href="https://wa.me/61450334543"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    WhatsApp (AU & PL): +61 450 334 543
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

