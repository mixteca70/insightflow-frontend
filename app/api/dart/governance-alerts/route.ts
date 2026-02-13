import { NextResponse } from "next/server";

const MOCK_ALERTS = [
  {
    corpCode: "00126380",
    corpName: "삼성전자",
    stockCode: "005930",
    reportDate: "2024-02-10",
    summary: "대주주 지분 변동 신고 - 국민연금 0.5%p 감소",
    changeRate: -0.5,
  },
  {
    corpCode: "00164779",
    corpName: "SK하이닉스",
    stockCode: "000660",
    reportDate: "2024-02-09",
    summary: "대주주 지분 변동 - SK그룹 1.2%p 증가",
    changeRate: 1.2,
  },
  {
    corpCode: "00126380",
    corpName: "LG에너지솔루션",
    stockCode: "373220",
    reportDate: "2024-02-08",
    summary: "대주주 지분 변동 - LG그룹 0.3%p 증가",
    changeRate: 0.3,
  },
];

export async function GET() {
  await new Promise((r) => setTimeout(r, 350));
  return NextResponse.json(MOCK_ALERTS);
}
