import { Code, Bot, Paintbrush, ShoppingBag, Server, GraduationCap } from "lucide-react";
import { ScrollRevealText } from "@/components/ScrollRevealText";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = [Code, Bot, Paintbrush, ShoppingBag, Server, GraduationCap];

const Services = () => {
  const { t, locale } = useLanguage();

  return (
    <section id="services" className="py-16 sm:py-24 lg:py-32" key={locale}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10 sm:mb-16">
          <p className="font-body text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-primary mb-4">{t.services.label}</p>
          <ScrollRevealText className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
            {t.services.title}
          </ScrollRevealText>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">{t.services.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/50">
          {t.services.items.map((service, index) => {
            const Icon = icons[index] ?? Code;
            return (
              <div key={service.title} className="bg-background p-6 sm:p-8 group hover:bg-card transition-colors duration-500">
                <Icon className="w-6 h-6 text-primary mb-4 sm:mb-5 group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-base font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
