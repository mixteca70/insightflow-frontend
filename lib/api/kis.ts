/** KIS API 클라이언트 - BFF 패턴으로 /api/* 경로 호출 */

import type { ThemeHeatmapData, ThemeWithLeaders, StockPrice } from "@/types/kis";

const API_BASE = "/api";

export async function fetchThemeHeatmap(): Promise<ThemeHeatmapData> {
  const res = await fetch(`${API_BASE}/kis/themes`);
  if (!res.ok) throw new Error("테마 데이터 조회 실패");
  return res.json();
}

export async function fetchHotThemes(): Promise<ThemeWithLeaders[]> {
  const res = await fetch(`${API_BASE}/kis/hot-themes`);
  if (!res.ok) throw new Error("급등 테마 조회 실패");
  return res.json();
}

export async function fetchStockPrices(codes: string[]): Promise<StockPrice[]> {
  if (codes.length === 0) return [];
  const res = await fetch(`${API_BASE}/kis/prices`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ codes }),
  });
  if (!res.ok) throw new Error("종목 시세 조회 실패");
  return res.json();
}
