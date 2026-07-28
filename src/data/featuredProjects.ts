import type { PortfolioItem } from "@/data/portfolioTypes";

const OFFRE_ASSET = "https://offre.guelichweb.online";

/**
 * Featured projects shown on offre.guelichweb.online (frontend mocks).
 * These are the desired up-to-date versions until Supabase admin is fully aligned.
 */
export const featuredWebOverrides: PortfolioItem[] = [
  {
    id: "featured-buscord",
    kind: "web",
    title: "BUSCORD — Bureau d'Études & Contrôle",
    category: "Site Web Institutionnel",
    description:
      "Plateforme web institutionnelle du Bureau de Suivi-Contrôle et de Réalisation pour le Développement au Burkina Faso.",
    summary:
      "Conception et réalisation d'une vitrine digitale haut de gamme pour BUSCORD, partenaire clé des bailleurs de fonds, ONG et institutions internationales dans l'humanitaire et le BTP.",
    objectifs:
      "Valoriser l'expertise terrain et les 15+ années d'expérience de BUSCORD auprès des partenaires internationaux et bailleurs humanitaires.",
    image: `${OFFRE_ASSET}/portfolio/buscord.png`,
    images: [
      `${OFFRE_ASSET}/portfolio/buscord.png`,
      `${OFFRE_ASSET}/portfolio/buscord-hero.jpg`,
    ],
    tags: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    features: [
      "Présentation des domaines d'intervention (Suivi-contrôle, BTP, Intermédiation sociale)",
      "Showcase des réalisations (Écoles, Forages, Lycées)",
      "Indicateurs d'impact dynamique & métriques (7+ projets, 440M+ FCFA)",
      "UX/UI responsive moderne (Glassmorphism & typographie soignée)",
      "Formulaire de contact & d'interaction bailleurs",
    ],
    live: "https://buscord.online/",
    year: "2025",
    featured: true,
  },
  {
    id: "featured-snb",
    kind: "web",
    title: "Société de Nutrition du Bénin (SNB)",
    category: "Site Web Institutionnel",
    description:
      "Site web officiel de la Société de Nutrition du Bénin, une association scientifique et professionnelle.",
    summary:
      "Refonte complète avec les nouvelles technologies pour l'association œuvrant pour une alimentation saine, la santé et le développement durable au Bénin.",
    objectifs:
      "Moderniser la présence en ligne de la SNB et offrir une plateforme performante pour la diffusion des connaissances en nutrition.",
    image: `${OFFRE_ASSET}/portfolio/snb-bj.png`,
    images: [`${OFFRE_ASSET}/portfolio/snb-bj.png`],
    tags: ["React", "Vite", "Tailwind CSS", "TypeScript"],
    features: [
      "Présentation de l'association",
      "Actualités et événements",
      "Ressources scientifiques",
      "Espace membres",
    ],
    live: "https://snb.bj/",
    year: "2025",
    featured: true,
  },
  {
    id: "featured-spass",
    kind: "web",
    title: "Spass mit Deutsch Benin",
    category: "Plateforme Web / App",
    description:
      "Plateforme officielle de consultation des résultats d'examen pour le centre de formation Spass mit Deutsch au Bénin.",
    summary:
      "Système complet de gestion et de consultation de résultats en ligne avec une interface moderne et sécurisée.",
    objectifs:
      "Digitaliser le processus d'annonce des résultats pour le centre de formation en allemand et permettre un accès rapide et sécurisé aux apprenants.",
    image: `${OFFRE_ASSET}/portfolio/spass-mit-deutsch.png`,
    images: [`${OFFRE_ASSET}/portfolio/spass-mit-deutsch.png`],
    tags: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    features: [
      "Consultation des résultats",
      "Téléchargement de certificats PDF",
      "Design responsive",
      "Espace administrateur sécurisé",
      "Support multilingue",
    ],
    live: "https://platform.spassmitdeutschbenin.com/",
    year: "2025",
    featured: true,
  },
];

/** Same filter as offre: replace overlapping Supabase rows with featured mocks. */
export function mergeFeaturedWebProjects(apiWeb: PortfolioItem[]): PortfolioItem[] {
  const filtered = apiWeb.filter((project) => {
    const title = project.title.toLowerCase();
    return (
      !title.includes("snb") &&
      !title.includes("nutrition") &&
      !title.includes("buscord") &&
      !title.includes("spass")
    );
  });

  return [...featuredWebOverrides, ...filtered];
}
