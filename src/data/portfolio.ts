import { supabase } from "@/lib/supabase";
import { mergeFeaturedWebProjects } from "@/data/featuredProjects";
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

/** Past this delay, show the curated projects instead of waiting on Supabase. */
const SUPABASE_TIMEOUT_MS = 8000;

/** AbortSignal.timeout is missing on older Safari (< 16), so build it by hand. */
function timeoutSignal(ms: number): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
}

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
        .order("order_index", { ascending: true })
        .abortSignal(timeoutSignal(SUPABASE_TIMEOUT_MS)),
      supabase
        .from("portfolio_projects")
        .select("*")
        .eq("is_visible", true)
        .eq("portfolio_type", "graphic_design")
        .order("order_index", { ascending: true })
        .abortSignal(timeoutSignal(SUPABASE_TIMEOUT_MS)),
      supabase
        .from("video_portfolio")
        .select("*")
        .eq("is_visible", true)
        .order("order_index", { ascending: true })
        .abortSignal(timeoutSignal(SUPABASE_TIMEOUT_MS)),
    ]);

    // Web projects fall back to the curated list; graphic and video rows are hidden on error.
    const failed = [webRes.error, graphicRes.error, videoRes.error].filter(Boolean);
    failed.forEach((error) => console.warn("Supabase query failed", error));

    const webFromApi = ((webRes.error ? [] : webRes.data || []) as PortfolioProjectRow[]).map(mapProjectRow);
    // Align with offre.guelichweb.online featured mocks (desired up-to-date versions)
    const web = mergeFeaturedWebProjects(webFromApi);
    const graphic = ((graphicRes.error ? [] : graphicRes.data || []) as PortfolioProjectRow[]).map(mapProjectRow);
    const video = ((videoRes.error ? [] : videoRes.data || []) as VideoPortfolioRow[]).map(mapVideoRow);

    const bundle: PortfolioBundle = {
      web,
      graphic,
      video,
      all: [...web, ...graphic, ...video],
    };
    // Don't cache a partial result, so the next page load can retry the failed queries.
    if (!failed.length) cache = bundle;
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

export function clearPortfolioCache() {
  cache = null;
}
