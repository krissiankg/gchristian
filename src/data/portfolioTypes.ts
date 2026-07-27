export type PortfolioKind = "web" | "graphic" | "video";

export interface PortfolioItem {
  id: string;
  kind: PortfolioKind;
  title: string;
  category: string;
  description: string;
  summary: string;
  objectifs: string;
  image: string;
  images: string[];
  tags: string[];
  features: string[];
  live: string;
  year: string;
  featured: boolean;
  /** Video-only */
  videoEmbed?: string;
  videoUrl?: string;
  videoPlatform?: string;
}

export interface PortfolioProjectRow {
  id: string;
  title: string;
  category: string | null;
  thumbnail_url: string | null;
  project_url: string | null;
  description: string | null;
  summary: string | null;
  features: string[] | null;
  technologies: string[] | null;
  images: string[] | null;
  objectifs: string | null;
  order_index: number | null;
  is_featured: boolean | null;
  is_visible: boolean | null;
  portfolio_type: "web_app" | "graphic_design" | string;
  created_at?: string;
  updated_at?: string;
}

export interface VideoPortfolioRow {
  id: string;
  title: string;
  cover_image_url: string | null;
  video_url: string | null;
  video_embed: string | null;
  video_platform: string | null;
  size_category: string | null;
  description: string | null;
  order_index: number | null;
  is_visible: boolean | null;
  created_at?: string;
}

function yearFrom(date?: string | null) {
  if (!date) return "";
  return new Date(date).getFullYear().toString();
}

export function mapProjectRow(row: PortfolioProjectRow): PortfolioItem {
  const images = (row.images?.filter(Boolean) as string[]) ?? [];
  const thumb = row.thumbnail_url || images[0] || "";
  return {
    id: row.id,
    kind: row.portfolio_type === "graphic_design" ? "graphic" : "web",
    title: row.title,
    category: row.category || (row.portfolio_type === "graphic_design" ? "Design" : "Web"),
    description: row.description || row.summary || "",
    summary: row.summary || row.description || "",
    objectifs: row.objectifs || "",
    image: thumb,
    images: images.length ? images : thumb ? [thumb] : [],
    tags: row.technologies || [],
    features: row.features || [],
    live: row.project_url || "",
    year: yearFrom(row.created_at),
    featured: Boolean(row.is_featured),
  };
}

export function mapVideoRow(row: VideoPortfolioRow): PortfolioItem {
  return {
    id: row.id,
    kind: "video",
    title: row.title,
    category: row.video_platform || "Video",
    description: row.description || "",
    summary: row.description || "",
    objectifs: "",
    image: row.cover_image_url || "",
    images: row.cover_image_url ? [row.cover_image_url] : [],
    tags: row.video_platform ? [row.video_platform] : [],
    features: [],
    live: row.video_url || "",
    year: yearFrom(row.created_at),
    featured: false,
    videoEmbed: row.video_embed || undefined,
    videoUrl: row.video_url || undefined,
    videoPlatform: row.video_platform || undefined,
  };
}
