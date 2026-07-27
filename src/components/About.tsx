import { ScrollRevealText } from "@/components/ScrollRevealText";
import { useLanguage } from "@/i18n/LanguageContext";

const About = () => {
  const { t, locale } = useLanguage();

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32" key={locale}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
          <div>
            <p className="font-body text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-primary mb-4">{t.about.label}</p>
            <ScrollRevealText className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6 sm:mb-8">
              {t.about.title}
            </ScrollRevealText>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{t.about.p1}</p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{t.about.p2}</p>
          </div>

          <div>
            <p className="font-body text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-primary mb-6 sm:mb-8">{t.about.experience}</p>
            <div className="space-y-0">
              {t.about.timeline.map((item, i) => (
                <div key={`${item.role}-${i}`} className="relative pl-6 sm:pl-8 pb-8 sm:pb-10 border-l border-border last:pb-0 group">
                  <div className="absolute left-0 top-1 -translate-x-1">
                    <div className={`w-2 h-2 transition-colors relative ${i === 0 ? "bg-primary" : "bg-muted-foreground group-hover:bg-primary"}`}>
                      {i === 0 && (
                        <span className="absolute inset-0 animate-[radar-ping_2s_ease-out_infinite] bg-primary opacity-0" />
                      )}
                    </div>
                  </div>
                  <p className="font-body text-xs text-primary mb-1">{item.year}</p>
                  <p className="font-display text-base sm:text-lg font-semibold text-foreground">{item.role}</p>
                  <p className="font-body text-[11px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-2">{item.company}</p>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
