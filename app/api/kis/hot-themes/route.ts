import { NextResponse } from "next/server";

const MOCK_HOT_THEMES = [
  {
    themeCode: "T001",
    themeName: "2차전지",
    changeRate: 2.5,
    tradingValue: 5000000000000,
    leaders: [
      { stockCode: "373220", stockName: "LG에너지솔루션", currentPrice: 385000, changeRate: 2.1, changePrice: 7900 },
      { stockCode: "006400", stockName: "삼성SDI", currentPrice: 312000, changeRate: 1.8, changePrice: 5500 },
      { stockCode: "247540", stockName: "에코프로비엠", currentPrice: 125000, changeRate: 3.5, changePrice: 4200 },
    ],
  },
  {
    themeCode: "T002",
    themeName: "AI반도체",
    changeRate: 1.8,
    tradingValue: 4200000000000,
    leaders: [
      { stockCode: "005930", stockName: "삼성전자", currentPrice: 72500, changeRate: 1.2, changePrice: 860 },
      { stockCode: "000660", stockName: "SK하이닉스", currentPrice: 185000, changeRate: 2.5, changePrice: 4500 },
      { stockCode: "042700", stockName: "한미반도체", currentPrice: 98000, changeRate: 4.2, changePrice: 3950 },
    ],
  },
  {
    themeCode: "T007",
    themeName: "조선",
    changeRate: 3.2,
    tradingValue: 1500000000000,
    leaders: [
      { stockCode: "009540", stockName: "HD한국조선해양", currentPrice: 152000, changeRate: 4.1, changePrice: 6000 },
      { stockCode: "010140", stockName: "삼성중공업", currentPrice: 9850, changeRate: 2.8, changePrice: 268 },
      { stockCode: "042660", stockName: "한화오션", currentPrice: 28500, changeRate: 3.5, changePrice: 965 },
    ],
  },
];

export async function GET() {
  await new Promise((r) => setTimeout(r, 400));
  return NextResponse.json(MOCK_HOT_THEMES);
}
