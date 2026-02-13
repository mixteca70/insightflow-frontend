/** OpenDART API 클라이언트 - BFF 패턴으로 /api/* 경로 호출, GitHub Pages에서는 정적 JSON 사용 */

import type {
  GovernanceAlertItem,
  GovernanceStructure,
} from "@/types/dart";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export async function fetchGovernanceAlerts(): Promise<GovernanceAlertItem[]> {
  const url = BASE ? `${BASE}/data/governance-alerts.json` : "/api/dart/governance-alerts";
  const res = await fetch(url);
  if (!res.ok) throw new Error("지배구조 공시 조회 실패");
  return res.json();
}

export async function fetchGovernanceStructure(
  stockCode: string
): Promise<GovernanceStructure> {
  if (BASE) {
    const res = await fetch(`${BASE}/data/governance.json`);
    if (!res.ok) throw new Error("지배구조 조회 실패");
    const data = (await res.json()) as Record<string, GovernanceStructure>;
    const mock = data[stockCode];
    if (!mock) {
      return {
        stockCode,
        corpName: `종목${stockCode}`,
        majorShareholders: [
          { name: "대주주1", shareRatio: 25, change: 0 },
          { name: "대주주2", shareRatio: 15, change: 1 },
        ],
        totalMajorShare: 40,
      };
    }
    return mock;
  }
  const res = await fetch(`/api/dart/governance/${stockCode}`);
  if (!res.ok) throw new Error("지배구조 조회 실패");
  return res.json();
}
