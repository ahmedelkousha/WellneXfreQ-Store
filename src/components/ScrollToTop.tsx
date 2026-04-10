import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    const getPathWithoutLang = (path: string) => {
      const parts = path.split('/');
      // Remove language prefix if present
      if (parts.length > 1 && ['en', 'pl'].includes(parts[1])) {
        return '/' + parts.slice(2).join('/');
      }
      return path;
    };

    if (prevPathname.current) {
      const prevPathWithoutLang = getPathWithoutLang(prevPathname.current);
      const currentPathWithoutLang = getPathWithoutLang(pathname);

      // If only the language changed (or it's the exact same pathname), do not scroll
      if (prevPathWithoutLang === currentPathWithoutLang) {
        prevPathname.current = pathname;
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    prevPathname.current = pathname;
  }, [pathname]);

  return null;
}
