"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchThemeHeatmap } from "@/lib/api/kis";

const STALE_TIME = 10000; // 10초

export function useThemeHeatmap() {
  return useQuery({
    queryKey: ["themeHeatmap"],
    queryFn: fetchThemeHeatmap,
    staleTime: STALE_TIME,
  });
}
