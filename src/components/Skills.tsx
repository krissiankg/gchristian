import { ScrollRevealText } from "@/components/ScrollRevealText";
import { useLanguage } from "@/i18n/LanguageContext";

const Skills = () => {
  const { t, locale } = useLanguage();

  return (
    <section id="skills" className="py-16 sm:py-24 lg:py-32" key={locale}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10 sm:mb-16">
          <p className="font-body text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-primary mb-4">{t.skills.label}</p>
          <ScrollRevealText className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
            {t.skills.title}
          </ScrollRevealText>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">{t.skills.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {t.skills.groups.map((group) => (
            <div key={group.label} className="border border-border p-5 sm:p-6 hover:border-primary/30 transition-colors group">
              <p className="font-display text-sm font-semibold text-primary mb-5 sm:mb-6 tracking-wide uppercase">{group.label}</p>
              <ul className="space-y-3">
                {group.skills.map((skill) => (
                  <li key={skill} className="font-body text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 shrink-0 bg-muted-foreground group-hover:bg-primary transition-colors" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
