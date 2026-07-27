import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import RevealImage from "@/components/RevealImage";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { usePortfolio } from "@/hooks/usePortfolio";
import type { PortfolioItem, PortfolioKind } from "@/data/portfolioTypes";

const ProjectsListing = () => {
  const { t } = useLanguage();
  const { data, loading, error } = usePortfolio();
  const [filter, setFilter] = useState<PortfolioKind>("web");
  const [activeVideo, setActiveVideo] = useState<PortfolioItem | null>(null);

  const filters: { id: PortfolioKind; label: string; count: number }[] = [
    { id: "web", label: t.projects.filterWeb, count: data.web.length },
    { id: "graphic", label: t.projects.filterGraphic, count: data.graphic.length },
    { id: "video", label: t.projects.filterVideo, count: data.video.length },
  ];

  const items = useMemo(() => {
    if (filter === "web") return data.web;
    if (filter === "graphic") return data.graphic;
    return data.video;
  }, [data, filter]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-24 sm:pt-32 pb-14 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-xs tracking-widest uppercase mb-8 sm:mb-12">
            <ArrowLeft className="w-3 h-3" /> {t.projects.back}
          </Link>
          <div className="mb-8 sm:mb-12">
            <p className="font-body text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-primary mb-4">{t.projects.portfolio}</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">{t.projects.allProjects}</h1>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-10">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 whitespace-nowrap text-xs font-body tracking-widest uppercase transition-colors border ${
                  filter === item.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {item.label}
                <span className={`text-[10px] px-1.5 py-0.5 ${filter === item.id ? "bg-primary-foreground/20" : "bg-secondary"}`}>
                  {item.count}
                </span>
              </button>
            ))}
          </div>

          {loading && <p className="font-body text-sm text-muted-foreground py-20 text-center">{t.projects.loading}</p>}
          {error && <p className="font-body text-sm text-destructive py-20 text-center">{t.projects.error}</p>}

          {!loading && !error && items.length === 0 && (
            <p className="font-body text-sm text-muted-foreground py-20 text-center">{t.projects.empty}</p>
          )}

          {!loading && !error && items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              {items.map((project, i) => {
                const isVideo = project.kind === "video";
                const card = (
                  <>
                    <div className="overflow-hidden border border-border/50 mb-4 relative">
                      <RevealImage
                        src={project.image}
                        alt={project.title}
                        className="w-full aspect-video"
                        delay={i * 0.05}
                      />
                      {isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/20">
                          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground">
                            <Play className="w-5 h-5 ml-0.5" />
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(project.tags.length ? project.tags : [project.category]).slice(0, 3).map((tag) => (
                        <span key={tag} className="font-body text-[10px] tracking-wider uppercase px-3 py-1 border border-border text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {project.title}
                    </h3>
                    {(project.description || project.summary) && (
                      <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {project.description || project.summary}
                      </p>
                    )}
                  </>
                );

                if (isVideo) {
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setActiveVideo(project)}
                      className="group block text-left opacity-0 animate-fade-up"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      {card}
                    </button>
                  );
                }

                return (
                  <Link
                    key={project.id}
                    to={`/project/${project.id}`}
                    className="group block opacity-0 animate-fade-up"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {card}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />

      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-card border border-border overflow-hidden">
            <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-border">
              <h2 className="font-display text-base sm:text-lg font-semibold truncate">{activeVideo.title}</h2>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="p-2 text-muted-foreground hover:text-foreground"
                aria-label={t.projects.close}
              >
                <X size={18} />
              </button>
            </div>
            <div className="aspect-video bg-black">
              {activeVideo.videoEmbed ? (
                <div
                  className="w-full h-full relative [&>div]:!h-full [&>div]:!p-0 [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full"
                  dangerouslySetInnerHTML={{ __html: activeVideo.videoEmbed }}
                />
              ) : activeVideo.videoUrl || activeVideo.live ? (
                <iframe
                  src={activeVideo.videoUrl || activeVideo.live}
                  title={activeVideo.title}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground font-body text-sm">
                  {t.projects.empty}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsListing;
