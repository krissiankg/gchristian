import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Play, Search, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import RevealImage from "@/components/RevealImage";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { usePortfolio } from "@/hooks/usePortfolio";
import type { PortfolioItem, PortfolioKind } from "@/data/portfolioTypes";

type LightboxState = {
  images: string[];
  index: number;
  title: string;
} | null;

const ProjectsListing = () => {
  const { t } = useLanguage();
  const { data, loading, error } = usePortfolio();
  const [filter, setFilter] = useState<PortfolioKind>("web");
  const [activeVideo, setActiveVideo] = useState<PortfolioItem | null>(null);
  const [lightbox, setLightbox] = useState<LightboxState>(null);

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

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") {
        setLightbox((prev) =>
          prev
            ? { ...prev, index: (prev.index + 1) % prev.images.length }
            : prev,
        );
      }
      if (e.key === "ArrowLeft") {
        setLightbox((prev) =>
          prev
            ? {
                ...prev,
                index: (prev.index - 1 + prev.images.length) % prev.images.length,
              }
            : prev,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const openGraphic = (project: PortfolioItem, imageIndex = 0) => {
    const images = (project.images.length ? project.images : [project.image]).filter(Boolean);
    if (!images.length) return;
    setLightbox({ images, index: imageIndex, title: project.title });
  };

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

          {/* Graphic gallery */}
          {!loading && !error && filter === "graphic" && items.length > 0 && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 space-y-4 sm:space-y-5">
              {items.map((project, i) => {
                const cover = project.image || project.images[0];
                if (!cover) return null;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => openGraphic(project, 0)}
                    className="group relative break-inside-avoid w-full text-left overflow-hidden border border-border/60 bg-card/40 opacity-0 animate-fade-up focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    <img
                      src={cover}
                      alt={project.title}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-body text-[10px] tracking-widest uppercase text-primary mb-1">
                            {project.category}
                          </p>
                          <h3 className="font-display text-sm sm:text-base font-semibold text-foreground truncate">
                            {project.title}
                          </h3>
                        </div>
                        <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 border border-primary/40 bg-primary/15 text-primary">
                          <Search className="w-4 h-4" />
                        </span>
                      </div>
                      <p className="mt-2 font-body text-[10px] tracking-widest uppercase text-muted-foreground">
                        {t.projects.viewImage}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Web / Video grids */}
          {!loading && !error && filter !== "graphic" && items.length > 0 && (
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

      {lightbox && (
        <div
          className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2 text-white/70 hover:text-white"
            onClick={() => setLightbox(null)}
            aria-label={t.projects.close}
          >
            <X size={22} />
          </button>

          {lightbox.images.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-2 sm:left-6 z-20 p-2 text-white/70 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((prev) =>
                    prev
                      ? {
                          ...prev,
                          index: (prev.index - 1 + prev.images.length) % prev.images.length,
                        }
                      : prev,
                  );
                }}
                aria-label="Previous"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                type="button"
                className="absolute right-2 sm:right-6 z-20 p-2 text-white/70 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((prev) =>
                    prev
                      ? { ...prev, index: (prev.index + 1) % prev.images.length }
                      : prev,
                  );
                }}
                aria-label="Next"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          <div
            className="relative max-w-5xl w-full max-h-[85svh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.images[lightbox.index]}
              alt={lightbox.title}
              className="max-h-[75svh] w-auto max-w-full object-contain shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center px-4">
              <p className="font-display text-sm sm:text-base text-white font-semibold">{lightbox.title}</p>
              <p className="font-body text-[10px] tracking-widest uppercase text-white/50 mt-1">
                {lightbox.index + 1} {t.projects.of} {lightbox.images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsListing;
