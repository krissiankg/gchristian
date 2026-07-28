import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { fetchPortfolio, findPortfolioItem } from "@/data/portfolio";
import type { PortfolioItem } from "@/data/portfolioTypes";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const [project, setProject] = useState<PortfolioItem | null | undefined>(undefined);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    fetchPortfolio()
      .then((bundle) => {
        if (!alive || !id) return;
        setProject(findPortfolioItem(bundle, id) ?? null);
      })
      .catch(() => {
        if (alive) setProject(null);
      });
    return () => {
      alive = false;
    };
  }, [id]);

  const gallery = project
    ? (project.images.length ? project.images : [project.image]).filter(Boolean)
    : [];

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight" && gallery.length > 1) {
        setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % gallery.length));
      }
      if (e.key === "ArrowLeft" && gallery.length > 1) {
        setLightboxIndex((prev) =>
          prev === null ? 0 : (prev - 1 + gallery.length) % gallery.length,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, gallery.length]);

  if (project === undefined) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-body text-sm text-muted-foreground">{t.projects.loading}</p>
      </div>
    );
  }

  if (!project || project.kind === "video") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-display text-6xl font-bold mb-4">404</h1>
          <p className="text-muted-foreground font-body mb-8">{t.projects.notFound}</p>
          <Link to="/projects" className="text-primary hover:underline font-body">← {t.projects.allProjects}</Link>
        </div>
      </div>
    );
  }

  const details = [project.summary, project.description, project.objectifs]
    .filter(Boolean)
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .join("\n\n");

  const isGraphic = project.kind === "graphic";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-24 sm:pt-32 pb-14 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <Link to="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-xs tracking-widest uppercase mb-8 sm:mb-12">
            <ArrowLeft className="w-3 h-3" /> {t.projects.allProjects}
          </Link>

          <div className="mb-10 sm:mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="font-body text-[10px] tracking-wider uppercase px-3 py-1 border border-primary/30 text-primary">
                {project.category}
              </span>
              {project.tags.slice(0, 5).map((tag) => (
                <span key={tag} className="font-body text-[10px] tracking-wider uppercase px-3 py-1 border border-border text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">{project.title}</h1>
            <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {project.description || project.summary}
            </p>
            {project.live && (
              <div className="flex flex-wrap gap-4 mt-6">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-body text-xs tracking-widest uppercase border border-primary/40 px-5 py-2.5 hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  {t.projects.live} <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {isGraphic ? (
            <div className="columns-1 sm:columns-2 gap-4 sm:gap-5 space-y-4 sm:space-y-5 mb-16">
              {gallery.map((img, i) => (
                <button
                  key={`${img}-${i}`}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="group relative break-inside-avoid w-full overflow-hidden border border-border/60 bg-card/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <img
                    src={img}
                    alt={`${project.title} — ${i + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center justify-center w-11 h-11 border border-primary/40 bg-primary/15 text-primary">
                      <Search className="w-4 h-4" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-6 mb-16">
              {gallery.map((img, i) => (
                <button
                  key={`${img}-${i}`}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="group block w-full overflow-hidden border border-border/50 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <div className="relative">
                    <img
                      src={img}
                      alt={`${project.title} — ${i + 1}`}
                      className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="inline-flex items-center justify-center w-11 h-11 border border-primary/40 bg-primary/15 text-primary">
                        <Search className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {details && (
            <div className="max-w-3xl mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-6">{t.projects.technicalDetails}</h2>
              <div className="font-body text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {details}
              </div>
            </div>
          )}

          {project.features.length > 0 && (
            <div className="max-w-3xl mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-6">{t.projects.features}</h2>
              <ul className="space-y-3">
                {project.features.map((feature) => (
                  <li key={feature} className="font-body text-sm text-muted-foreground flex gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.year && (
            <div className="mt-12 pt-8 border-t border-border/50">
              <p className="font-body text-xs tracking-widest uppercase text-muted-foreground">{t.projects.year}: {project.year}</p>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-border/50 flex justify-between items-center gap-4">
            <Link to="/projects" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-xs tracking-widest uppercase">
              <ArrowLeft className="w-3 h-3" /> {t.projects.allProjects}
            </Link>
            <Link to="/#contact" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity font-body text-xs tracking-widest uppercase">
              {t.projects.getInTouch} <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>
      <Footer />

      {lightboxIndex !== null && gallery[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2 text-white/70 hover:text-white"
            onClick={() => setLightboxIndex(null)}
            aria-label={t.projects.close}
          >
            <X size={22} />
          </button>

          {gallery.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-2 sm:left-6 z-20 p-2 text-white/70 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) =>
                    prev === null ? 0 : (prev - 1 + gallery.length) % gallery.length,
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
                  setLightboxIndex((prev) =>
                    prev === null ? 0 : (prev + 1) % gallery.length,
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
              src={gallery[lightboxIndex]}
              alt={project.title}
              className="max-h-[75svh] w-auto max-w-full object-contain shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center px-4">
              <p className="font-display text-sm sm:text-base text-white font-semibold">{project.title}</p>
              <p className="font-body text-[10px] tracking-widest uppercase text-white/50 mt-1">
                {lightboxIndex + 1} {t.projects.of} {gallery.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
