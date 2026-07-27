import { testimonials } from "@/data/testimonials";
import { ScrollRevealText } from "@/components/ScrollRevealText";
import { useLanguage } from "@/i18n/LanguageContext";
import { pick } from "@/i18n/site";

const Testimonials = () => {
  const { t, locale } = useLanguage();
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-16 sm:py-24 overflow-hidden" key={locale}>
      <div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <p className="font-body text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-primary mb-4">{t.testimonials.label}</p>
        <ScrollRevealText className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          {t.testimonials.title}
        </ScrollRevealText>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-24 lg:w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-24 lg:w-32 bg-gradient-to-l from-background to-transparent" />
        <div
          className="flex gap-3 sm:gap-5 will-change-transform"
          style={{ animation: `marquee 22s linear infinite reverse` }}
        >
          {doubled.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="flex-shrink-0 w-[min(85vw,320px)] sm:w-[360px] border border-border/50 p-5 sm:p-6 flex flex-col justify-between group hover:border-primary/30 transition-colors"
            >
              <p className="font-body text-xs text-muted-foreground leading-relaxed mb-6">"{pick(item.text, locale)}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="font-display text-xs font-bold text-primary">{item.name[0]}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-display text-xs font-semibold text-foreground truncate">{item.name}</p>
                  <p className="font-body text-[10px] text-muted-foreground truncate">{pick(item.role, locale)} @ {item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
