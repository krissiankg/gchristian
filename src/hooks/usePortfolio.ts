import { useEffect, useState } from "react";
import { fetchPortfolio, type PortfolioBundle } from "@/data/portfolio";

const empty: PortfolioBundle = { web: [], graphic: [], video: [], all: [] };

export function usePortfolio() {
  const [data, setData] = useState<PortfolioBundle>(empty);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchPortfolio()
      .then((bundle) => {
        if (!alive) return;
        setData(bundle);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!alive) return;
        setError(err instanceof Error ? err.message : "Failed to load portfolio");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return { data, loading, error };
}
