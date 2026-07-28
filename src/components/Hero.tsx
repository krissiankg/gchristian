import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import heroBg from "@/assets/placeholder.svg";
import heroPhoto from "@/assets/christian-portrait.png";
import GodRaysCanvas from "@/components/GodRaysCanvas";
import { useLanguage } from "@/i18n/LanguageContext";
import { SITE } from "@/i18n/site";

const Hero = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[100svh] flex items-center pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-20 sm:opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80" />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        <GodRaysCanvas targetRef={buttonRef} className="absolute inset-0 w-full h-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="flex flex-col-reverse lg:flex-row lg:items-start gap-8 sm:gap-10 lg:gap-12">
          {/* Photo + CTA */}
          <div className="shrink-0 w-full max-w-[18rem] sm:max-w-[19rem] mx-auto lg:mx-0">
            <div className="relative">
              <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-br from-primary/20 to-transparent blur-3xl -z-10" />
              <div className="relative w-full aspect-[4/5] overflow-hidden border border-border/50 bg-card">
                <img
                  src={heroPhoto}
                  alt={t.hero.photoAlt}
                  className="w-full h-full object-cover object-[center_15%]"
                />
                <div className="absolute bottom-0 right-0 border border-border bg-card/95 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2">
                  <p className="font-body text-[11px] sm:text-xs text-muted-foreground">
                    <span className="text-primary">{SITE.experienceYears}</span> {t.hero.yearsLabel}
                  </p>
                </div>
              </div>
              <div className="mt-6 sm:mt-8 lg:mt-10">
                <a
                  ref={buttonRef}
                  href="#work"
                  className="relative group inline-flex w-full items-center justify-center gap-3 px-6 py-3.5 font-display font-semibold text-sm tracking-wide border border-primary text-primary hover:text-primary-foreground transition-colors duration-300 overflow-hidden"
                >
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary"
                    aria-hidden="true"
                  />
                  <span className="relative">{t.hero.cta}</span>
                  <ArrowDown className="relative w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Text — first on mobile via flex-col-reverse */}
          <div className="lg:pl-4 xl:pl-8 text-center lg:text-left flex-1 min-w-0">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5 sm:mb-8">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary animate-pulse shrink-0" />
              <p className="font-body text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.4em] uppercase text-primary">
                {t.hero.available}
              </p>
            </div>

            <h1 className="font-display font-extrabold leading-[0.95] tracking-tight mb-5 sm:mb-6">
              <span className="block text-foreground text-[clamp(2.25rem,8vw,3.75rem)]">
                {t.hero.hi}
              </span>
              <span className="block text-primary text-[clamp(2.5rem,9vw,5rem)]">
                Christian
              </span>
              <span className="block text-primary text-[clamp(1.75rem,6.5vw,3.75rem)] break-words">
                GUEGUELIGUE
              </span>
            </h1>

            <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0 lg:max-w-lg">
              {t.hero.subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
