import type { LocalizedString } from "@/i18n/site";

export interface Testimonial {
  name: string;
  role: LocalizedString;
  company: string;
  text: LocalizedString;
}

/** Placeholder testimonials — replace with real client quotes when available. */
export const testimonials: Testimonial[] = [
  {
    name: "Client formation",
    role: { fr: "Organisme de formation", en: "Training organization" },
    company: "Spass mit Deutsch",
    text: {
      fr: "Christian a livré un site et une plateforme de résultats fiables, clairs et adaptés à nos besoins métier. Suivi sérieux et communication fluide.",
      en: "Christian delivered a reliable results platform and website, clear and tailored to our needs. Serious follow-up and smooth communication.",
    },
  },
  {
    name: "Entrepreneur digital",
    role: { fr: "Fondateur", en: "Founder" },
    company: "Produit digital",
    text: {
      fr: "De la landing page au paiement Stripe, tout a été pensé pour convertir. Un vrai partenaire technique et business.",
      en: "From landing page to Stripe checkout, everything was built to convert. A true technical and business partner.",
    },
  },
  {
    name: "Organisation",
    role: { fr: "Direction", en: "Management" },
    company: "Projet institutionnel",
    text: {
      fr: "Réactif, rigoureux et orienté résultats. Christian gère aussi bien le développement que la communication digitale.",
      en: "Responsive, rigorous and results-driven. Christian handles both development and digital communication with care.",
    },
  },
  {
    name: "PME UEMOA",
    role: { fr: "Dirigeant", en: "Business owner" },
    company: "Client agence",
    text: {
      fr: "Nous avons gagné en visibilité et en efficacité grâce à son approche concrète : site, automatisation et conseils actionnables.",
      en: "We gained visibility and efficiency thanks to his practical approach: website, automation and actionable advice.",
    },
  },
];
