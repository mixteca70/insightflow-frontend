"use client";

import { useQuery } from "@tanstack/react-query";

export interface ScreenerFilter {
  operatingMarginMin?: number;
  perMax?: number;
  debtRatioMax?: number;
  majorShareholderMin?: number;
  majorShareholderMax?: number;
}

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

async function fetchScreenerResults(
  _filter: ScreenerFilter
): Promise<Array<{
  stockCode: string;
  stockName: string;
  currentPrice: number;
  changeRate: number;
  per?: number;
  pbr?: number;
  governanceScore?: number;
}>> {
  if (BASE) {
    const res = await fetch(`${BASE}/data/screener.json`);
    if (!res.ok) throw new Error("스크리너 조회 실패");
    return res.json();
  }
  const res = await fetch("/api/screener", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(_filter),
  });
  if (!res.ok) throw new Error("스크리너 조회 실패");
  return res.json();
}

export function useStockScreener(filter: ScreenerFilter) {
  return useQuery({
    queryKey: ["stockScreener", filter],
    queryFn: () => fetchScreenerResults(filter),
    staleTime: 10000,
  });
}
