import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-6 sm:py-8 border-t border-border pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
        <p className="font-body text-[11px] sm:text-xs text-muted-foreground tracking-wider">
          {t.footer.rights}
        </p>
        <p className="font-body text-[11px] sm:text-xs text-muted-foreground tracking-wider">
          <a href="#" className="hover:text-primary transition-colors">{t.footer.top}</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
