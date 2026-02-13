import { ReactNode } from "react";

// 정적 내보내기용 - mock 데이터에 있는 종목코드들
const STOCK_CODES = [
  "005930", "000660", "373220", "006400",
  "009540", "010140", "042660", "042700", "247540",
];

export function generateStaticParams() {
  return STOCK_CODES.map((code) => ({ code }));
}

export default function StockLayout({ children }: { children: ReactNode }) {
  return children;
}
