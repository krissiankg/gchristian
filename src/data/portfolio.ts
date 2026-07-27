import { supabase } from "@/lib/supabase";
import {
  mapProjectRow,
  mapVideoRow,
  type PortfolioItem,
  type PortfolioProjectRow,
  type VideoPortfolioRow,
} from "@/data/portfolioTypes";

export type PortfolioBundle = {
  web: PortfolioItem[];
  graphic: PortfolioItem[];
  video: PortfolioItem[];
  all: PortfolioItem[];
};

let cache: PortfolioBundle | null = null;
let inflight: Promise<PortfolioBundle> | null = null;

export async function fetchPortfolio(force = false): Promise<PortfolioBundle> {
  if (!force && cache) return cache;
  if (!force && inflight) return inflight;

  inflight = (async () => {
    const [webRes, graphicRes, videoRes] = await Promise.all([
      supabase
        .from("portfolio_projects")
        .select("*")
        .eq("is_visible", true)
        .eq("portfolio_type", "web_app")
        .order("order_index", { ascending: true }),
      supabase
        .from("portfolio_projects")
        .select("*")
        .eq("is_visible", true)
        .eq("portfolio_type", "graphic_design")
        .order("order_index", { ascending: true }),
      supabase
        .from("video_portfolio")
        .select("*")
        .eq("is_visible", true)
        .order("order_index", { ascending: true }),
    ]);

    if (webRes.error) throw webRes.error;
    if (graphicRes.error) throw graphicRes.error;
    if (videoRes.error) throw videoRes.error;

    const web = ((webRes.data || []) as PortfolioProjectRow[]).map(mapProjectRow);
    const graphic = ((graphicRes.data || []) as PortfolioProjectRow[]).map(mapProjectRow);
    const video = ((videoRes.data || []) as VideoPortfolioRow[]).map(mapVideoRow);

    const bundle: PortfolioBundle = {
      web,
      graphic,
      video,
      all: [...web, ...graphic, ...video],
    };
    cache = bundle;
    return bundle;
  })();

  try {
    return await inflight;
  } finally {
    inflight = null;
  }
}

export function findPortfolioItem(bundle: PortfolioBundle, id: string) {
  return bundle.all.find((item) => item.id === id);
}
