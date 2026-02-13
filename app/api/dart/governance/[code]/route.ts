import { NextRequest, NextResponse } from "next/server";

const MOCK_GOVERNANCE: Record<string, { corpName: string; shareholders: Array<{ name: string; shareRatio: number; change: number }>; total: number }> = {
  "005930": {
    corpName: "삼성전자",
    total: 52.3,
    shareholders: [
      { name: "이재용 외 특수관계인", shareRatio: 21.2, change: 0 },
      { name: "국민연금", shareRatio: 8.5, change: -0.5 },
      { name: "삼성전자우", shareRatio: 5.2, change: 0 },
      { name: "외국인", shareRatio: 52.1, change: 1.2 },
    ],
  },
  "000660": {
    corpName: "SK하이닉스",
    total: 28.5,
    shareholders: [
      { name: "SK그룹", shareRatio: 20.1, change: 1.2 },
      { name: "국민연금", shareRatio: 5.2, change: -0.3 },
      { name: "외국인", shareRatio: 45.3, change: 0.8 },
    ],
  },
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  await new Promise((r) => setTimeout(r, 300));

  const mock = MOCK_GOVERNANCE[code];
  if (!mock) {
    return NextResponse.json({
      stockCode: code,
      corpName: `종목${code}`,
      majorShareholders: [
        { name: "대주주1", shareRatio: 25, change: 0 },
        { name: "대주주2", shareRatio: 15, change: 1 },
      ],
      totalMajorShare: 40,
    });
  }

  return NextResponse.json({
    stockCode: code,
    corpName: mock.corpName,
    majorShareholders: mock.shareholders,
    totalMajorShare: mock.total,
  });
}
