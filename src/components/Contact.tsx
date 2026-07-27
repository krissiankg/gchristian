import { Mail, MapPin, ArrowUpRight, Phone } from "lucide-react";
import { ScrollRevealMultiLine } from "@/components/ScrollRevealText";
import { useLanguage } from "@/i18n/LanguageContext";
import { SITE } from "@/i18n/site";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const Contact = () => {
  const { t, locale } = useLanguage();

  const socials = [
    { label: "GitHub", href: SITE.github },
    { label: "LinkedIn", href: SITE.linkedin },
    { label: "GUELICHWEB", href: SITE.agency },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 bg-card/50" key={locale}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-body text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-primary mb-5 sm:mb-6">{t.contact.label}</p>
          <ScrollRevealMultiLine
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 sm:mb-6"
            lines={[
              t.contact.line1,
              { text: t.contact.line2, className: "text-gradient", alwaysVisible: true },
            ]}
          />
          <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-md mx-auto mb-8 sm:mb-12">
            {t.contact.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center justify-center gap-3 text-primary-foreground px-5 sm:px-8 py-3.5 sm:py-4 font-display font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity break-all"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-glow)) 100%)" }}
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span className="truncate">{SITE.email}</span>
            </a>

            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="group relative flex items-center justify-center gap-2 overflow-hidden border border-border px-5 py-3.5 sm:py-4 font-body text-xs tracking-wider text-muted-foreground transition-all duration-500 hover:border-[#25D366]/50 hover:text-white hover:shadow-[0_0_24px_rgba(37,211,102,0.35)]"
            >
              <span
                className="absolute inset-0 origin-left scale-x-0 bg-[#25D366] transition-transform duration-500 ease-out group-hover:scale-x-100"
                aria-hidden="true"
              />
              <span className="relative flex items-center gap-2">
                <span className="relative h-4 w-4 shrink-0">
                  <Phone className="absolute inset-0 h-4 w-4 transition-all duration-300 group-hover:scale-75 group-hover:opacity-0" />
                  <WhatsAppIcon className="absolute inset-0 h-4 w-4 scale-75 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                </span>
                <span>{SITE.phone}</span>
              </span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground font-body text-xs tracking-wider mb-10 sm:mb-16">
            <MapPin className="w-3 h-3 shrink-0" />
            {t.contact.location}
          </div>

          <div className="flex items-center justify-center gap-6 sm:gap-8 flex-wrap">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="font-body text-xs text-muted-foreground hover:text-primary transition-colors tracking-wider uppercase flex items-center gap-1"
              >
                {social.label}
                <ArrowUpRight className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
