import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/i18n/LanguageContext";
import { SITE } from "@/i18n/site";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();
  const location = useLocation();

  const links = [
    { label: t.nav.about, href: "/#about" },
    { label: t.nav.projects, href: "/projects" },
    { label: t.nav.skills, href: "/#skills" },
    { label: t.nav.contact, href: "/#contact" },
  ];

  const isActive = (href: string) =>
    href.startsWith("/") && !href.includes("#") && location.pathname === href;

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, locale]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[90] border-b bg-background/70 backdrop-blur-xl border-border/50 pt-[env(safe-area-inset-top)]">
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-[4.5rem]">
        <Link
          to="/"
          className="font-display font-bold tracking-tight text-foreground text-base sm:text-lg font-semibold shrink-0"
          onClick={() => setIsOpen(false)}
        >
          {SITE.brand}
          <span className="text-primary">{SITE.brandSuffix}</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-colors duration-300 font-body uppercase text-xs tracking-widest whitespace-nowrap ${
                isActive(link.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2 xl:gap-3">
          <div className="flex items-center rounded-full border border-border/60 p-0.5 text-[10px] font-body tracking-widest uppercase">
            <button
              type="button"
              onClick={() => setLocale("fr")}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                locale === "fr" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Français"
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                locale === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="English"
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full text-muted-foreground transition-colors duration-300 hover:text-primary"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href="/#contact"
            className="text-xs font-body tracking-widest uppercase text-primary-foreground px-4 xl:px-5 py-2.5 hover:opacity-90 transition-all duration-300 whitespace-nowrap"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-glow)) 100%)",
            }}
          >
            {t.nav.hire}
          </a>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
            className="min-h-10 min-w-10 px-2 text-[10px] font-body tracking-widest uppercase border border-border/60 text-muted-foreground hover:text-primary"
            aria-label="Toggle language"
          >
            {locale === "fr" ? "EN" : "FR"}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="min-h-10 min-w-10 p-2 text-muted-foreground transition-colors hover:text-primary inline-flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="min-h-10 min-w-10 text-foreground inline-flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-b border-border bg-background/98 backdrop-blur-xl max-h-[calc(100svh-4rem)] overflow-y-auto">
          <div className="container mx-auto px-4 sm:px-6 flex flex-col py-5 gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-body uppercase transition-colors text-xs tracking-widest text-muted-foreground hover:text-primary py-3 border-b border-border/40 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 self-stretch text-center text-xs font-body tracking-widest uppercase text-primary-foreground px-5 py-3.5 hover:opacity-90 transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-glow)) 100%)",
              }}
            >
              {t.nav.hire}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
