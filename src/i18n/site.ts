export type Locale = "fr" | "en";

export type LocalizedString = { fr: string; en: string };

export function pick(value: LocalizedString, locale: Locale): string {
  return value[locale];
}

export const SITE = {
  firstName: "Christian",
  lastName: "GUEGUELIGUE",
  fullName: "Christian GUEGUELIGUE",
  brand: "gchristian",
  brandSuffix: ".online",
  email: "krissiankg@gmail.com",
  phone: "+229 01 66 36 87 05",
  phoneHref: "tel:+2290166368705",
  whatsapp: "+229 66 36 87 05",
  whatsappHref: "https://wa.me/22966368705",
  location: {
    fr: "Abomey-Calavi, Bénin",
    en: "Abomey-Calavi, Benin",
  },
  website: "https://gchristian.online",
  linkedin: "https://www.linkedin.com/in/christianguegueligue/",
  github: "https://github.com/krissiankg",
  agency: "https://guelichweb.online/fr",
  experienceYears: "9+",
} as const;
