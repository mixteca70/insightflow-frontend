/** KIS API 클라이언트 - BFF 패턴으로 /api/* 경로 호출, GitHub Pages에서는 정적 JSON 사용 */

import type { ThemeHeatmapData, ThemeWithLeaders, StockPrice } from "@/types/kis";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export async function fetchThemeHeatmap(): Promise<ThemeHeatmapData> {
  const url = BASE ? `${BASE}/data/themes.json` : "/api/kis/themes";
  const res = await fetch(url);
  if (!res.ok) throw new Error("테마 데이터 조회 실패");
  return res.json();
}

export async function fetchHotThemes(): Promise<ThemeWithLeaders[]> {
  const url = BASE ? `${BASE}/data/hot-themes.json` : "/api/kis/hot-themes";
  const res = await fetch(url);
  if (!res.ok) throw new Error("급등 테마 조회 실패");
  return res.json();
}

export async function fetchStockPrices(codes: string[]): Promise<StockPrice[]> {
  if (codes.length === 0) return [];
  if (BASE) {
    const pricesRes = await fetch(`${BASE}/data/prices.json`);
    if (!pricesRes.ok) throw new Error("종목 시세 조회 실패");
    const prices = (await pricesRes.json()) as Record<string, { name: string; price: number; change: number }>;
    return codes.map((code) => {
      const mock = prices[code] ?? { name: `종목${code}`, price: 50000, change: 0 };
      return {
        stockCode: code,
        stockName: mock.name,
        currentPrice: mock.price,
        changeRate: mock.change,
        changePrice: Math.round((mock.price * mock.change) / 100),
      };
    });
  }
  const res = await fetch("/api/kis/prices", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ codes }),
  });
  if (!res.ok) throw new Error("종목 시세 조회 실패");
  return res.json();
}
