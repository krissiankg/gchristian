import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ScrollRevealText } from "@/components/ScrollRevealText";
import { useLanguage } from "@/i18n/LanguageContext";

const VISIBLE_ROLES = 5;

const About = () => {
  const { t, locale } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const timeline = expanded ? t.about.timeline : t.about.timeline.slice(0, VISIBLE_ROLES);
  const hasMore = t.about.timeline.length > VISIBLE_ROLES;

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

            <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="sm:col-span-2">
                <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">{t.about.educationLabel}</p>
                <ul className="space-y-4">
                  {t.about.education.map((item) => (
                    <li key={item.school} className="flex gap-4">
                      <span className="font-body text-xs text-primary w-16 shrink-0 pt-0.5">{item.year}</span>
                      <div>
                        <p className="font-display text-sm font-semibold text-foreground">{item.school}</p>
                        <p className="font-body text-xs text-muted-foreground">{item.title}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">{t.about.coursesLabel}</p>
                <div className="flex flex-wrap gap-2">
                  {t.about.courses.map((course) => (
                    <span key={course} className="font-body text-[11px] px-3 py-1 border border-border text-muted-foreground">{course}</span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">{t.about.languagesLabel}</p>
                <ul className="space-y-2">
                  {t.about.languages.map((lang) => (
                    <li key={lang.name} className="font-body text-sm text-muted-foreground">
                      <span className="text-foreground font-medium">{lang.name}</span> · {lang.level}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <p className="font-body text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-primary mb-6 sm:mb-8">{t.about.experience}</p>
            <div className="space-y-0">
              {timeline.map((item, i) => (
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
            {hasMore && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="mt-8 inline-flex items-center gap-2 text-primary font-body text-xs tracking-wider uppercase hover:opacity-80 transition-opacity"
              >
                {expanded ? t.about.showLess : `${t.about.showMore} (${t.about.timeline.length})`}
                <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
