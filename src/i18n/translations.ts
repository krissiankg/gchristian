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
      "Full-Stack Engineer, AI Automation Architect & Vibe Coder ⚡. Je conçois des plateformes web, micro-SaaS et workflows intelligents à la vitesse de l'éclair.",
    cta: "Voir les projets",
    yearsLabel: "ans d'expérience",
    photoAlt: "Portrait de Christian GUEGUELIGUE",
  },
  about: {
    label: "À propos",
    title: "Des solutions digitales modernes, orientées résultats",
    p1: "Spécialisé dans la conception de solutions digitales performantes, j'accompagne entreprises, startups et entrepreneurs dans la création de sites web, applications, plateformes SaaS et systèmes automatisés.",
    p2: "Je combine développement full-stack (Next.js, React, WordPress), design UX/UI, création de produits numériques et automatisation IA (n8n, Make, Antigravity) pour livrer des solutions sur mesure, évolutives et orientées résultats. Mon objectif : aider mes clients à gagner en efficacité, en visibilité et en croissance, avec des solutions déployées en production réelle.",
    experience: "Expérience",
    showMore: "Voir tout le parcours",
    showLess: "Réduire",
    timeline: [
      {
        year: "2025 – Présent",
        role: "Webmaster & Support technique",
        company: "JSAN — Journées Scientifiques de l'Alimentation et de la Nutrition",
        desc: "Gestion technique du site officiel (contenus, formulaires, accès, mailing), communications aux inscrits via CRM et e-mails, mise à jour du calendrier scientifique, adaptation de la plateforme au format hybride et support aux participants.",
      },
      {
        year: "2025 – Présent",
        role: "Community Manager Freelance",
        company: "ADVOCACY-ONG Bénin · Temps partiel",
        desc: "Gestion des pages Facebook et Instagram, création de visuels (flyers, bannières, affiches), suivi des KPI et du ROI, campagnes sponsorisées et animation de la communauté.",
      },
      {
        year: "2023 – Présent",
        role: "Fondateur & Développeur Principal",
        company: "GUELICHWEB — Agence digitale",
        desc: "Sites web, applications, automatisation IA, chatbots WhatsApp, CRM et produits numériques pour les entreprises de la zone UEMOA.",
      },
      {
        year: "2022 – Présent",
        role: "Consultant Formateur Freelance",
        company: "Dr Computer, SNB, particuliers · Temps partiel",
        desc: "Accompagnement des clients dans la gestion de leurs sites. Formations WordPress, copywriting et montage vidéo.",
      },
      {
        year: "2017 – Présent",
        role: "Design UX/UI, Développement & Administration web",
        company: "Freelance · Temps partiel",
        desc: "Plateformes vitrines, e-commerce et sur mesure. SEO, wireframes, maquettes et prototypes interactifs, tests utilisateurs et maintenance de nombreux sites.",
      },
      {
        year: "2017 – 2023",
        role: "Consultant en stratégie de communication",
        company: "Alliance Bioversity-CIAT Bénin · Temps partiel",
        desc: "Gestion des réseaux sociaux, design graphique (flyers, brochures, calendriers), montage vidéo et production de contenus promotionnels.",
      },
      {
        year: "2019 – 2022",
        role: "Maintenance & réparation informatique",
        company: "Alliance Bioversity-CIAT Bénin et particuliers · Temps partiel",
        desc: "Installation et configuration de logiciels, diagnostic et réparation de matériel (ordinateurs, imprimantes).",
      },
      {
        year: "2021",
        role: "Technicien informatique, formateur & administrateur de bases de données",
        company: "PADA-Nutrition · Temps partiel",
        desc: "Digitalisation de formulaires d'enquête avec Survey Solutions Designer, gestion de serveur, suivi et support à distance. Diffusion de documents sur les recettes à base de biodiversité locale.",
      },
      {
        year: "2018",
        role: "Saisie et vérification de données",
        company: "IRD — Institut de Recherche pour le Développement · Temps partiel",
        desc: "Saisie et contrôle qualité de données de recherche.",
      },
      {
        year: "2015 – 2016",
        role: "Assistant de recherche (stage)",
        company: "Bioversity-Bénin / IITA",
        desc: "Chargé du traitement des données : analyses avec SPSS et Excel. Traducteur en langue fon.",
      },
    ],
    educationLabel: "Formation",
    education: [
      { year: "En cours", title: "Bachelor (L1) — Formation certifiante", school: "University of Maryland Global Campus (UMGC)" },
      { year: "2010", title: "Études universitaires", school: "Université d'Abomey-Calavi (UAC)" },
      { year: "2008", title: "Enseignement secondaire", school: "CEG 1 Abomey-Calavi" },
    ],
    coursesLabel: "Cours",
    courses: ["Maintenance ordinateur et réseau", "Programmation de gestion"],
    languagesLabel: "Langues",
    languages: [
      { name: "Français", level: "Bilingue / langue natale" },
      { name: "Anglais", level: "Professionnel intermédiaire" },
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
        label: "Full-Stack & Web",
        skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "WordPress", "PHP", "Python", "Sanity", "Supabase"],
      },
      {
        label: "Automatisation & IA",
        skills: ["n8n", "Make (Integromat)", "Antigravity", "Cursor", "Prompt Engineering", "Intégrations API", "Chatbots"],
      },
      {
        label: "Design & Multimédia",
        skills: ["Figma", "Photoshop", "Illustrator", "After Effects", "Premiere Pro", "CapCut", "Filmora"],
      },
      {
        label: "Infra, Data & Enquêtes",
        skills: ["Vercel", "Netlify", "AWS (EC2, S3)", "GitHub", "MySQL", "SQL Server", "phpMyAdmin", "WinDev", "CSPro", "Survey Solutions"],
      },
    ],
  },
  contact: {
    label: "Contact",
    line1: "Travaillons",
    line2: "ensemble",
    subtitle:
      "Un site, une app, une automatisation ou un produit digital ? Parlons de votre projet.",
    location: "Disponible mondialement (Remote)",
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
      "Full-Stack Engineer, AI Automation Architect & Vibe Coder ⚡. Building modern web platforms, intelligent workflows and scalable micro-SaaS at light speed.",
    cta: "View Projects",
    yearsLabel: "years experience",
    photoAlt: "Portrait of Christian GUEGUELIGUE",
  },
  about: {
    label: "About",
    title: "Modern digital solutions, built for results",
    p1: "I specialize in designing high-performing digital solutions and help companies, startups and entrepreneurs create websites, applications, SaaS platforms and automated systems.",
    p2: "I combine full-stack development (Next.js, React, WordPress), UX/UI design, digital product creation and AI automation (n8n, Make, Antigravity) to build custom, scalable, results-oriented solutions. My goal is to help clients improve efficiency, visibility and growth with solutions deployed in real production environments.",
    experience: "Experience",
    showMore: "Show full journey",
    showLess: "Show less",
    timeline: [
      {
        year: "2025 – Present",
        role: "Webmaster & Technical Support",
        company: "JSAN — Scientific Days of Food and Nutrition",
        desc: "Technical management of the official website (content, forms, access, mailing), official communications to registrants via CRM and email, scientific calendar updates, hybrid-event adaptation and participant support.",
      },
      {
        year: "2025 – Present",
        role: "Freelance Community Manager",
        company: "ADVOCACY-ONG Benin · Part-time",
        desc: "Facebook and Instagram management, visual assets (flyers, banners, posters), KPI and ROI tracking, paid boosting campaigns and community engagement.",
      },
      {
        year: "2023 – Present",
        role: "Founder & Lead Developer",
        company: "GUELICHWEB — Digital agency",
        desc: "Websites, apps, AI automation, WhatsApp chatbots, CRM and digital products for businesses across the WAEMU region.",
      },
      {
        year: "2022 – Present",
        role: "Freelance Training Consultant",
        company: "Dr Computer, SNB, individuals · Part-time",
        desc: "Client support for website management. Training in WordPress, copywriting and video editing.",
      },
      {
        year: "2017 – Present",
        role: "UI/UX Design, Web Development & Website Administration",
        company: "Freelance · Part-time",
        desc: "Corporate, e-commerce and custom web platforms. SEO, wireframes, mockups and interactive prototypes, user testing and maintenance of multiple websites.",
      },
      {
        year: "2017 – 2023",
        role: "Communication Strategy Consultant",
        company: "Alliance Bioversity-CIAT Benin · Part-time",
        desc: "Social media management, graphic design (flyers, brochures, calendars), video editing and promotional content production.",
      },
      {
        year: "2019 – 2022",
        role: "IT Repair and Maintenance",
        company: "Alliance Bioversity-CIAT Benin and individuals · Part-time",
        desc: "Software installation and configuration, troubleshooting and repair of hardware (computers, printers).",
      },
      {
        year: "2021",
        role: "IT Technician, Trainer and Database Administrator",
        company: "PADA-Nutrition · Part-time",
        desc: "Survey form digitization with Survey Solutions Designer, server management, remote monitoring and support. Dissemination of recipe documents based on local biodiversity.",
      },
      {
        year: "2018",
        role: "Data Entry and Data Verification",
        company: "IRD — French Research Institute for Development · Part-time",
        desc: "Research data entry and quality control.",
      },
      {
        year: "2015 – 2016",
        role: "Research Assistant (internship)",
        company: "Bioversity-Benin / IITA",
        desc: "Data Processing Officer: data analysis with SPSS and Excel. Fon language translator.",
      },
    ],
    educationLabel: "Education",
    education: [
      { year: "Ongoing", title: "Bachelor (year 1) — Not degree-seeking undergraduate", school: "University of Maryland Global Campus (UMGC)" },
      { year: "2010", title: "University studies", school: "University of Abomey-Calavi (UAC)" },
      { year: "2008", title: "Secondary school", school: "CEG 1 Abomey-Calavi" },
    ],
    coursesLabel: "Courses",
    courses: ["Computer & network maintenance", "Business programming"],
    languagesLabel: "Languages",
    languages: [
      { name: "French", level: "Native or bilingual" },
      { name: "English", level: "Professional working proficiency" },
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
        label: "Full-Stack & Web",
        skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "WordPress", "PHP", "Python", "Sanity", "Supabase"],
      },
      {
        label: "Automation & AI",
        skills: ["n8n", "Make (Integromat)", "Antigravity", "Cursor", "Prompt Engineering", "API Integration", "Chatbots"],
      },
      {
        label: "Design & Media",
        skills: ["Figma", "Photoshop", "Illustrator", "After Effects", "Premiere Pro", "CapCut", "Filmora"],
      },
      {
        label: "Infra, Data & Surveys",
        skills: ["Vercel", "Netlify", "AWS (EC2, S3)", "GitHub", "MySQL", "SQL Server", "phpMyAdmin", "WinDev", "CSPro", "Survey Solutions"],
      },
    ],
  },
  contact: {
    label: "Contact",
    line1: "Let's work",
    line2: "together",
    subtitle:
      "Need a website, an app, an automation or a digital product? Let's talk about your project.",
    location: "Available Worldwide (Remote)",
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
