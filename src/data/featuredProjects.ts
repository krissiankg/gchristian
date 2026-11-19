import type { PortfolioItem } from "@/data/portfolioTypes";

const OFFRE_ASSET = "https://offre.guelichweb.online";

/** Live screenshot of a site (WordPress mShots), used when no hand-made cover exists. */
const shot = (url: string) =>
  `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1280&h=720`;

/**
 * Projects curated from the LinkedIn profile (Projets section), most recent first.
 * They are the up-to-date versions and replace any overlapping Supabase rows.
 */
export const featuredWebOverrides: PortfolioItem[] = [
  {
    id: "featured-forgeia",
    kind: "web",
    title: "FORGE IA — Plateforme de formation au développement web assisté par l'IA",
    category: "Plateforme de formation / EdTech",
    description:
      "Plateforme créée pour accompagner une formation présentielle de six séances à Godomey (Bénin), où des débutants apprennent à créer et déployer des sites et applications web avec l'IA.",
    summary:
      "FORGE IA guide les apprenants pas à pas : roadmap des séances, ressources, exercices pratiques et mise en ligne de leurs propres projets. Le site présente aussi l'offre de formation et gère les inscriptions.",
    objectifs:
      "Rendre la création de sites et d'applications accessible aux débutants grâce aux outils d'IA, et leur apprendre à vendre leurs réalisations.",
    image: shot("https://forgeia.site/"),
    images: [shot("https://forgeia.site/")],
    tags: ["IA", "Next.js", "Formation", "Vibe Coding"],
    features: [
      "Parcours de 6 séances en présentiel",
      "Roadmap et ressources par séance",
      "Création et déploiement de sites avec l'IA",
      "Présentation de l'offre et inscriptions",
    ],
    live: "https://forgeia.site/",
    year: "2026",
    featured: true,
  },
  {
    id: "featured-buscord",
    kind: "web",
    title: "BUSCORD — Plateforme web institutionnelle | Burkina Faso",
    category: "Site Web Institutionnel",
    description:
      "Conception et développement du site institutionnel de BUSCORD, bureau de gestion et de mise en œuvre de projets de développement au Burkina Faso.",
    summary:
      "Vitrine digitale haut de gamme pour BUSCORD, partenaire des bailleurs de fonds, ONG et institutions internationales dans l'humanitaire et le BTP.",
    objectifs:
      "Valoriser l'expertise terrain et les 15+ années d'expérience de BUSCORD auprès des partenaires internationaux et bailleurs humanitaires.",
    image: `${OFFRE_ASSET}/portfolio/buscord.png`,
    images: [`${OFFRE_ASSET}/portfolio/buscord.png`, `${OFFRE_ASSET}/portfolio/buscord-hero.jpg`],
    tags: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    features: [
      "Domaines d'intervention (suivi-contrôle, BTP, intermédiation sociale)",
      "Showcase des réalisations (écoles, forages, lycées)",
      "Indicateurs d'impact dynamiques (7+ projets, 440M+ FCFA)",
      "UX/UI responsive moderne",
      "Formulaire de contact bailleurs",
    ],
    live: "https://buscord.online/",
    year: "2026",
    featured: true,
  },
  {
    id: "featured-openway",
    kind: "web",
    title: "OPENWAY — Plateforme d'orientation et d'accompagnement académique",
    category: "Site Web Institutionnel",
    description:
      "Conception et développement du site institutionnel d'OPENWAY, centre d'orientation et d'accompagnement académique basé à Abomey-Calavi (Bénin).",
    summary:
      "Un site moderne pour présenter les programmes d'orientation d'OPENWAY destinés aux jeunes dès 12 ans, ses activités et ses modalités d'accompagnement.",
    objectifs:
      "Donner de la visibilité à OPENWAY et faciliter la prise de contact des familles et des élèves.",
    image: shot("https://openway.bj/"),
    images: [shot("https://openway.bj/")],
    tags: ["Design", "Développement web", "Responsive"],
    features: [
      "Présentation des programmes d'orientation",
      "Actualités et activités",
      "Prise de contact simplifiée",
      "Design responsive",
    ],
    live: "https://openway.bj/",
    year: "2026",
    featured: true,
  },
  {
    id: "featured-exceltools-online",
    kind: "web",
    title: "ExcelTools — Automatisation de workflows Excel & CSV",
    category: "Micro-SaaS",
    description:
      "ExcelTools aide les équipes à automatiser leurs tâches Excel et CSV répétitives, sans formules ni macros.",
    summary:
      "L'utilisateur construit un workflow réutilisable (« recette »), prévisualise chaque étape puis l'exécute sur de nouveaux fichiers. Tout le traitement se fait dans le navigateur.",
    objectifs:
      "Faire gagner du temps sur les traitements de fichiers récurrents, sans compétences techniques.",
    image: shot("https://www.exceltools.online/"),
    images: [shot("https://www.exceltools.online/")],
    tags: ["SaaS", "Automatisation", "Excel", "CSV"],
    features: [
      "Workflows réutilisables",
      "Prévisualisation étape par étape",
      "Traitement local dans le navigateur",
      "Aucune formule ni macro à écrire",
    ],
    live: "https://www.exceltools.online/",
    year: "2025",
    featured: true,
  },
  {
    id: "featured-exceltools-site",
    kind: "web",
    title: "ExcelTools.site — Suite d'outils Excel, CSV, JSON et XML",
    category: "Outils web gratuits",
    description:
      "Suite complète d'outils web gratuits pour gérer et convertir des fichiers Excel, CSV, JSON et XML.",
    summary:
      "Développement front-end en HTML, CSS et JavaScript d'une collection d'outils de conversion et de manipulation de fichiers, utilisables directement en ligne.",
    objectifs: "Proposer des utilitaires simples et rapides pour les conversions de fichiers du quotidien.",
    image: shot("https://www.exceltools.site/"),
    images: [shot("https://www.exceltools.site/")],
    tags: ["HTML", "CSS", "JavaScript"],
    features: ["Conversion Excel ⇄ CSV ⇄ JSON ⇄ XML", "Outils de nettoyage de données", "100 % en ligne et gratuit"],
    live: "https://www.exceltools.site/",
    year: "2025",
    featured: true,
  },
  {
    id: "featured-guelichweb",
    kind: "web",
    title: "Guelichweb — Plateforme web & vitrine digitale",
    category: "Site d'agence",
    description:
      "Développement d'une plateforme web moderne avec Next.js et React, et d'un CMS headless (Sanity) pour une gestion de contenu flexible.",
    summary:
      "Site de l'agence Guelichweb (transformation digitale & IA au Bénin) : services, réalisations, automatisation WhatsApp et contenu géré via Sanity.",
    objectifs: "Présenter l'offre de l'agence et générer des demandes de projets qualifiées.",
    image: shot("https://guelichweb.online/fr"),
    images: [shot("https://guelichweb.online/fr")],
    tags: ["Next.js", "React", "Sanity", "Tailwind CSS"],
    features: ["CMS headless Sanity", "Site multilingue", "Portfolio de réalisations", "Design haute performance"],
    live: "https://guelichweb.online/fr",
    year: "2025",
    featured: true,
  },
  {
    id: "featured-guelichweb-offre",
    kind: "web",
    title: "Landing page & funnel marketing Guelichweb",
    category: "Landing page / Funnel",
    description:
      "Landing page optimisée pour la conversion, avec un système de capture de leads et une offre promotionnelle (-10 %).",
    summary:
      "Page de vente de l'offre « site professionnel à partir de 125 000 FCFA » pour les écoles, ONG et PME, intégrée à la stratégie d'acquisition digitale de l'agence.",
    objectifs: "Convertir le trafic en prospects qualifiés et optimiser le parcours utilisateur.",
    image: shot("https://offre.guelichweb.online/"),
    images: [shot("https://offre.guelichweb.online/")],
    tags: ["Landing page", "Lead generation", "Conversion"],
    features: ["Capture de leads", "Offre promotionnelle", "Portfolio intégré", "Parcours optimisé mobile"],
    live: "https://offre.guelichweb.online/",
    year: "2025",
    featured: true,
  },
  {
    id: "featured-spass-site",
    kind: "web",
    title: "Spass mit Deutsch Bénin — Site officiel",
    category: "Site WordPress",
    description:
      "Développement et gestion du site vitrine WordPress de Spass mit Deutsch Bénin : programmes de formation en allemand, blog et inscriptions en ligne.",
    summary:
      "Le site présente les cours d'allemand (A1 à C1), la préparation aux examens, les actualités du centre et permet de s'inscrire en ligne.",
    objectifs: "Attirer de nouveaux apprenants et simplifier les inscriptions.",
    image: shot("https://www.spassmitdeutschbenin.com/"),
    images: [shot("https://www.spassmitdeutschbenin.com/")],
    tags: ["WordPress", "SEO", "Blog"],
    features: ["Programmes de formation", "Blog", "Inscription en ligne", "Gestion et maintenance"],
    live: "https://www.spassmitdeutschbenin.com/",
    year: "2025",
    featured: true,
  },
  {
    id: "featured-jsan",
    kind: "web",
    title: "JSAN — Site de conférence scientifique",
    category: "Site événementiel",
    description:
      "Conception et développement du site officiel des Journées Scientifiques de l'Alimentation et de la Nutrition (JSAN), organisées par la SNB.",
    summary:
      "Programme scientifique, soumissions, inscriptions et informations pratiques, avec une adaptation pour un événement hybride.",
    objectifs: "Centraliser la communication de l'événement et faciliter la participation.",
    image: shot("https://snb-jsan.bj/"),
    images: [shot("https://snb-jsan.bj/")],
    tags: ["Événementiel", "Développement web", "Hybride"],
    features: ["Calendrier scientifique", "Soumissions et inscriptions", "Format hybride", "Support participants"],
    live: "https://snb-jsan.bj/",
    year: "2023",
    featured: true,
  },
  {
    id: "featured-spass",
    kind: "web",
    title: "Spass mit Deutsch Bénin — Plateforme de résultats d'examens",
    category: "Plateforme Web / App",
    description:
      "Plateforme dédiée permettant aux apprenants de consulter en toute sécurité leurs résultats aux examens de certification.",
    summary:
      "Système complet de gestion et de consultation de résultats en ligne avec une interface moderne et sécurisée.",
    objectifs:
      "Digitaliser l'annonce des résultats et permettre un accès rapide et sécurisé aux apprenants.",
    image: `${OFFRE_ASSET}/portfolio/spass-mit-deutsch.png`,
    images: [`${OFFRE_ASSET}/portfolio/spass-mit-deutsch.png`],
    tags: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    features: [
      "Consultation des résultats",
      "Téléchargement de certificats PDF",
      "Espace administrateur sécurisé",
      "Support multilingue",
    ],
    live: "https://platform.spassmitdeutschbenin.com/",
    year: "2021",
    featured: true,
  },
  {
    id: "featured-snb",
    kind: "web",
    title: "SNB — Société de Nutrition du Bénin",
    category: "Site Web Institutionnel",
    description:
      "Site officiel de la Société de Nutrition du Bénin, dédié à la promotion de ses activités et de ses événements scientifiques.",
    summary:
      "Plateforme pour l'association œuvrant pour une alimentation saine, la santé et le développement durable au Bénin.",
    objectifs:
      "Moderniser la présence en ligne de la SNB et diffuser les connaissances en nutrition.",
    image: `${OFFRE_ASSET}/portfolio/snb-bj.png`,
    images: [`${OFFRE_ASSET}/portfolio/snb-bj.png`],
    tags: ["React", "Vite", "Tailwind CSS", "TypeScript"],
    features: ["Présentation de l'association", "Actualités et événements", "Ressources scientifiques", "Espace membres"],
    live: "https://snb.bj/",
    year: "2021",
    featured: true,
  },
  {
    id: "featured-immoconnect",
    kind: "web",
    title: "ImmoConnect — Prototype immobilier & construction",
    category: "Prototype UX/UI",
    description:
      "Prototype bilingue pour acheter ou louer un logement, publier un bien ou lancer un projet de construction, réalisé avec Figma Make.",
    summary: "Toutes ces démarches réunies dans un parcours unique, pensé mobile d'abord.",
    objectifs: "Valider un concept de plateforme immobilière par un prototype interactif.",
    image: shot("https://trill-dun-78912893.figma.site/"),
    images: [shot("https://trill-dun-78912893.figma.site/")],
    tags: ["Figma Make", "UX/UI", "Prototype"],
    features: ["Achat / location", "Publication d'annonces", "Projets de construction", "Bilingue"],
    live: "https://trill-dun-78912893.figma.site/",
    year: "2026",
    featured: false,
  },
  {
    id: "featured-whos-the-bot",
    kind: "web",
    title: "Who's the bot? — Jeu social avec IA",
    category: "Jeu web / IA",
    description:
      "L'hôte invite 3 à 6 joueurs avec un code de quatre lettres ou un lien. Chacun reçoit un pseudo anonyme et une couleur à chaque manche, et une IA se glisse parmi les humains : à vous de la démasquer.",
    summary: "Un jeu de déduction en temps réel qui met à l'épreuve notre capacité à reconnaître une IA.",
    objectifs: "Explorer une expérience ludique et sociale autour de l'IA conversationnelle.",
    image: shot("https://whos-the-bot.krissiank.chatgpt.site/"),
    images: [shot("https://whos-the-bot.krissiank.chatgpt.site/")],
    tags: ["IA", "Temps réel", "Jeu"],
    features: ["Salons par code ou lien", "Pseudos anonymes par manche", "Un joueur IA caché", "3 à 6 joueurs"],
    live: "https://whos-the-bot.krissiank.chatgpt.site/",
    year: "2026",
    featured: false,
  },
];

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

const overrideHosts = new Set(featuredWebOverrides.map((p) => hostOf(p.live)).filter(Boolean));
const overrideKeywords = ["snb", "nutrition", "buscord", "spass", "openway", "forge", "exceltools", "jsan"];

/** Replace overlapping Supabase rows (same site or same project name) with the curated versions. */
export function mergeFeaturedWebProjects(apiWeb: PortfolioItem[]): PortfolioItem[] {
  const filtered = apiWeb.filter((project) => {
    const title = project.title.toLowerCase();
    if (overrideKeywords.some((k) => title.includes(k))) return false;
    const host = hostOf(project.live);
    return !host || !overrideHosts.has(host);
  });

  return [...featuredWebOverrides, ...filtered];
}
