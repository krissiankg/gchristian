export type TranslationTree = typeof fr;

const fr = {
  nav: {
    about: "À propos",
    projects: "Projets",
    skills: "Compétences",
    contact: "Contact",
    hire: "Me contacter",
  },
  hero: {
    available: "Disponible en freelance",
    hi: "Bonjour, je suis",
    name: "Christian GUEGUELIGUE",
    subtitle:
      "Consultant freelance, développeur full-stack et expert en automatisation IA. Je conçois des sites, apps, SaaS et workflows sur-mesure — basé à Abomey-Calavi, Bénin.",
    cta: "Voir les projets",
    yearsLabel: "ans d'expérience",
    photoAlt: "Portrait de Christian GUEGUELIGUE",
  },
  about: {
    label: "À propos",
    title: "Des solutions digitales modernes, orientées résultats",
    p1: "Spécialisé dans la conception de solutions digitales performantes, j'accompagne entreprises, startups et entrepreneurs dans la création de sites web, applications, plateformes SaaS et systèmes automatisés.",
    p2: "Je combine développement full-stack (Next.js, React, WordPress), design UX/UI et automatisation IA (n8n, Make, Antigravity) pour livrer des solutions évolutives, déployées en production réelle.",
    experience: "Expérience",
    timeline: [
      {
        year: "2023 – Présent",
        role: "Fondateur & Développeur Principal",
        company: "GUELICHWEB — Agence Digitale",
        desc: "Sites web, apps, automatisation IA, CRM, chatbots, branding et produits numériques. Prospection B2B sur la zone UEMOA.",
      },
      {
        year: "2025 – Présent",
        role: "Community Manager Freelance",
        company: "ADVOCACY-ONG Bénin",
        desc: "Stratégie réseaux sociaux, création visuelle, campagnes publicitaires et reporting KPI/ROI.",
      },
      {
        year: "2017 – Présent",
        role: "Consultant stratégie digitale & Développeur Web",
        company: "Alliance Bioversity-CIAT & clients divers",
        desc: "Communication digitale, sites vitrines & e-commerce, SEO, UX/UI Figma, maintenance en production.",
      },
      {
        year: "2022 – Présent",
        role: "Consultant Formateur Freelance",
        company: "Dr Computer, SNB, particuliers",
        desc: "Formations WordPress, copywriting et montage vidéo — présentiel et distanciel.",
      },
    ],
  },
  projects: {
    label: "Projets",
    title: "Réalisations sélectionnées",
    viewAll: "Tout voir",
    viewDetails: "Voir le détail",
    source: "Source",
    live: "Démo live",
    back: "Retour",
    allProjects: "Tous les projets",
    portfolio: "Portfolio",
    technicalDetails: "Détails techniques",
    objectives: "Objectifs",
    features: "Fonctionnalités",
    year: "Année",
    getInTouch: "Discutons",
    notFound: "Projet introuvable",
    loading: "Chargement du portfolio…",
    error: "Impossible de charger le portfolio pour le moment.",
    empty: "Aucun projet dans cette catégorie.",
    filterWeb: "Web / App",
    filterGraphic: "Design Graphique",
    filterVideo: "Vidéo",
    watchVideo: "Voir la vidéo",
    close: "Fermer",
    viewImage: "Agrandir",
    of: "sur",
  },
  services: {
    label: "Services",
    title: "Ce que je peux faire pour vous",
    subtitle:
      "De la conception au déploiement, un accompagnement digital complet adapté à vos objectifs business.",
    items: [
      {
        title: "Développement Web & Full-Stack",
        description:
          "Sites, apps et plateformes SaaS avec Next.js, React, TypeScript, WordPress et architectures modernes.",
      },
      {
        title: "Automatisation & IA",
        description:
          "Workflows n8n/Make, intégrations API, chatbots, CRM et orchestration de flux IA pour gagner en efficacité.",
      },
      {
        title: "Design UX/UI",
        description:
          "Maquettes Figma, parcours utilisateurs, identités visuelles et interfaces pensées pour convertir.",
      },
      {
        title: "Produits numériques",
        description:
          "Landing pages de vente, paiements Stripe, funnels et packs digitaux orientés conversion.",
      },
      {
        title: "Déploiement & Infra",
        description:
          "Vercel, Netlify, VPS Linux, AWS, CI/CD et sécurisation de serveurs pour une mise en production solide.",
      },
      {
        title: "Conseil & Formation",
        description:
          "Stratégie digitale, WordPress, copywriting, vidéo et accompagnement technique sur mesure.",
      },
    ],
  },
  skills: {
    label: "Compétences",
    title: "Stack & expertise",
    subtitle: "Les outils que j'utilise au quotidien pour concevoir, automatiser et déployer.",
    groups: [
      {
        label: "Full-Stack",
        skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "WordPress", "Supabase"],
      },
      {
        label: "Automatisation & IA",
        skills: ["n8n", "Make", "Antigravity", "Prompt Engineering", "API Integration", "Chatbots"],
      },
      {
        label: "Design & Multimédia",
        skills: ["Figma", "Photoshop", "Illustrator", "Premiere Pro", "After Effects", "CapCut"],
      },
      {
        label: "Infra & Data",
        skills: ["Vercel", "Netlify", "AWS EC2/S3", "VPS Linux", "MySQL", "GitHub"],
      },
    ],
  },
  contact: {
    label: "Contact",
    line1: "Travaillons",
    line2: "ensemble",
    subtitle:
      "Un site, une app, une automatisation ou un produit digital ? Parlons de votre projet.",
    location: "Abomey-Calavi, Bénin",
  },
  footer: {
    rights: "© 2026 Christian GUEGUELIGUE. Conçu avec exigence.",
    top: "Haut de page ↑",
  },
  notFound: {
    title: "Page introuvable",
    text: "Cette page n'existe pas ou a été déplacée. Revenons sur le bon chemin.",
    home: "Accueil",
    projects: "Voir les projets",
  },
} as const;

const en: TranslationTree = {
  nav: {
    about: "About",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
    hire: "Hire Me",
  },
  hero: {
    available: "Available for freelance",
    hi: "Hi, I'm",
    name: "Christian GUEGUELIGUE",
    subtitle:
      "Freelance consultant, full-stack developer and AI automation expert. I build websites, apps, SaaS platforms and custom workflows — based in Abomey-Calavi, Benin.",
    cta: "View Projects",
    yearsLabel: "years experience",
    photoAlt: "Portrait of Christian GUEGUELIGUE",
  },
  about: {
    label: "About",
    title: "Modern digital solutions, built for results",
    p1: "I specialize in designing high-performing digital solutions and help companies, startups and entrepreneurs create websites, applications, SaaS platforms and automated systems.",
    p2: "I combine full-stack development (Next.js, React, WordPress), UX/UI design and AI automation (n8n, Make, Antigravity) to ship scalable solutions deployed in real production environments.",
    experience: "Experience",
    timeline: [
      {
        year: "2023 – Present",
        role: "Founder & Lead Developer",
        company: "GUELICHWEB — Digital Agency",
        desc: "Websites, apps, AI automation, CRM, chatbots, branding and digital products. Active B2B outreach across the WAEMU region.",
      },
      {
        year: "2025 – Present",
        role: "Freelance Community Manager",
        company: "ADVOCACY-ONG Benin",
        desc: "Social media strategy, visual assets, paid campaigns and monthly KPI/ROI reporting.",
      },
      {
        year: "2017 – Present",
        role: "Digital Strategy Consultant & Web Developer",
        company: "Alliance Bioversity-CIAT & various clients",
        desc: "Digital communication, brochure sites & e-commerce, SEO, Figma UX/UI, and ongoing production maintenance.",
      },
      {
        year: "2022 – Present",
        role: "Freelance Training Consultant",
        company: "Dr Computer, SNB, individuals",
        desc: "WordPress, copywriting and video editing training — on-site and remote.",
      },
    ],
  },
  projects: {
    label: "Projects",
    title: "Selected Work",
    viewAll: "View All",
    viewDetails: "View Details",
    source: "Source",
    live: "Live Demo",
    back: "Back",
    allProjects: "All Projects",
    portfolio: "Portfolio",
    technicalDetails: "Technical Details",
    objectives: "Objectives",
    features: "Features",
    year: "Year",
    getInTouch: "Get in Touch",
    notFound: "Project not found",
    loading: "Loading portfolio…",
    error: "Unable to load the portfolio right now.",
    empty: "No projects in this category.",
    filterWeb: "Web / App",
    filterGraphic: "Graphic Design",
    filterVideo: "Video",
    watchVideo: "Watch video",
    close: "Close",
    viewImage: "Enlarge",
    of: "of",
  },
  services: {
    label: "Services",
    title: "What I Can Do For You",
    subtitle:
      "From concept to deployment, end-to-end digital support tailored to your business goals.",
    items: [
      {
        title: "Web & Full-Stack Development",
        description:
          "Websites, apps and SaaS platforms with Next.js, React, TypeScript, WordPress and modern architectures.",
      },
      {
        title: "Automation & AI",
        description:
          "n8n/Make workflows, API integrations, chatbots, CRM and AI flow orchestration to boost efficiency.",
      },
      {
        title: "UX/UI Design",
        description:
          "Figma mockups, user journeys, visual identities and interfaces designed to convert.",
      },
      {
        title: "Digital Products",
        description:
          "Sales landing pages, Stripe payments, funnels and digital packs built for conversion.",
      },
      {
        title: "Deployment & Infra",
        description:
          "Vercel, Netlify, Linux VPS, AWS, CI/CD and server hardening for solid production launches.",
      },
      {
        title: "Consulting & Training",
        description:
          "Digital strategy, WordPress, copywriting, video and tailored technical coaching.",
      },
    ],
  },
  skills: {
    label: "Skills",
    title: "Stack & Expertise",
    subtitle: "The tools I use daily to design, automate and ship.",
    groups: [
      {
        label: "Full-Stack",
        skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "WordPress", "Supabase"],
      },
      {
        label: "Automation & AI",
        skills: ["n8n", "Make", "Antigravity", "Prompt Engineering", "API Integration", "Chatbots"],
      },
      {
        label: "Design & Media",
        skills: ["Figma", "Photoshop", "Illustrator", "Premiere Pro", "After Effects", "CapCut"],
      },
      {
        label: "Infra & Data",
        skills: ["Vercel", "Netlify", "AWS EC2/S3", "Linux VPS", "MySQL", "GitHub"],
      },
    ],
  },
  contact: {
    label: "Contact",
    line1: "Let's work",
    line2: "together",
    subtitle:
      "Need a website, an app, an automation or a digital product? Let's talk about your project.",
    location: "Abomey-Calavi, Benin",
  },
  footer: {
    rights: "© 2026 Christian GUEGUELIGUE. Built with craft.",
    top: "Back to top ↑",
  },
  notFound: {
    title: "Page Not Found",
    text: "The page you're looking for doesn't exist or has been moved. Let's get you back on track.",
    home: "Go Home",
    projects: "View Projects",
  },
};

export const translations = { fr, en } as const;
