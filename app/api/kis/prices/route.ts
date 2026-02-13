import { NextRequest, NextResponse } from "next/server";

const MOCK_PRICES: Record<string, { name: string; price: number; change: number }> = {
  "005930": { name: "삼성전자", price: 72500, change: 1.2 },
  "000660": { name: "SK하이닉스", price: 185000, change: 2.5 },
  "373220": { name: "LG에너지솔루션", price: 385000, change: 2.1 },
  "006400": { name: "삼성SDI", price: 312000, change: 1.8 },
};

export async function POST(req: NextRequest) {
  const { codes } = (await req.json()) as { codes: string[] };
  if (!Array.isArray(codes)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  await new Promise((r) => setTimeout(r, 200));

  const result = codes.map((code) => {
    const mock = MOCK_PRICES[code] ?? {
      name: `종목${code}`,
      price: 50000 + Math.random() * 50000,
      change: (Math.random() - 0.5) * 4,
    };
    return {
      stockCode: code,
      stockName: mock.name,
      currentPrice: mock.price,
      changeRate: mock.change,
      changePrice: Math.round((mock.price * mock.change) / 100),
    };
  });

  return NextResponse.json(result);
}
