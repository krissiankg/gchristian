import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ScrollRevealText } from "@/components/ScrollRevealText";
import RevealImage from "@/components/RevealImage";
import { useLanguage } from "@/i18n/LanguageContext";
import { usePortfolio } from "@/hooks/usePortfolio";

const Projects = () => {
  const { t, locale } = useLanguage();
  const { data, loading, error } = usePortfolio();
  const featured = data.web.slice(0, 3);

  return (
    <section id="work" className="py-16 sm:py-24 lg:py-32 bg-card/50" key={locale}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4 mb-10 sm:mb-16">
          <div className="min-w-0">
            <p className="font-body text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-primary mb-4">{t.projects.label}</p>
            <ScrollRevealText className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {t.projects.title}
            </ScrollRevealText>
          </div>
          <Link to="/projects" className="hidden sm:flex shrink-0 items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-xs tracking-widest uppercase">
            {t.projects.viewAll} <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        {loading && (
          <p className="font-body text-sm text-muted-foreground py-16 text-center">{t.projects.loading}</p>
        )}
        {error && (
          <p className="font-body text-sm text-destructive py-16 text-center">{t.projects.error}</p>
        )}

        {!loading && !error && (
          <>
            <div className="space-y-14 sm:space-y-20">
              {featured.map((project, i) => (
                <div key={project.id} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center">
                  <div className={`${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                    <Link to={`/project/${project.id}`} className="overflow-hidden border border-border/50 group block">
                      <RevealImage src={project.image} alt={project.title} className="w-full aspect-video group-hover:scale-105 transition-transform duration-700" />
                    </Link>
                  </div>
                  <div className={`${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(project.tags.length ? project.tags : [project.category]).slice(0, 4).map((tag) => (
                        <span key={tag} className="font-body text-[10px] tracking-wider uppercase px-3 py-1 border border-border text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                    <Link to={`/project/${project.id}`}>
                      <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 hover:text-primary transition-colors">{project.title}</h3>
                    </Link>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">{project.description || project.summary}</p>
                    <Link to={`/project/${project.id}`} className="inline-flex items-center gap-2 text-primary font-body text-xs tracking-wider uppercase hover:opacity-80 transition-opacity">
                      {t.projects.viewDetails} <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/projects" className="sm:hidden flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-xs tracking-widest uppercase mt-10">
              {t.projects.viewAll} <ArrowUpRight className="w-3 h-3" />
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
