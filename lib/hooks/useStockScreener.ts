"use client";

import { useQuery } from "@tanstack/react-query";

export interface ScreenerFilter {
  operatingMarginMin?: number;
  perMax?: number;
  debtRatioMax?: number;
  majorShareholderMin?: number;
  majorShareholderMax?: number;
}

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
