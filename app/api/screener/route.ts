import { NextRequest, NextResponse } from "next/server";

const MOCK_SCREENER_RESULTS = [
  { stockCode: "005930", stockName: "삼성전자", currentPrice: 72500, changeRate: 1.2, per: 12.5, pbr: 1.2, governanceScore: 85 },
  { stockCode: "000660", stockName: "SK하이닉스", currentPrice: 185000, changeRate: 2.5, per: 8.2, pbr: 1.5, governanceScore: 78 },
  { stockCode: "373220", stockName: "LG에너지솔루션", currentPrice: 385000, changeRate: 2.1, per: 25.3, pbr: 3.1, governanceScore: 72 },
  { stockCode: "006400", stockName: "삼성SDI", currentPrice: 312000, changeRate: 1.8, per: 18.5, pbr: 2.2, governanceScore: 88 },
  { stockCode: "042700", stockName: "한미반도체", currentPrice: 98000, changeRate: 4.2, per: 15.2, pbr: 2.8, governanceScore: 65 },
];

export async function POST(req: NextRequest) {
  const filter = (await req.json()) as Record<string, unknown>;
  await new Promise((r) => setTimeout(r, 500));

  return NextResponse.json(MOCK_SCREENER_RESULTS);
}
