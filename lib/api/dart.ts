/** OpenDART API 클라이언트 - BFF 패턴으로 /api/* 경로 호출 */

import type {
  GovernanceAlertItem,
  GovernanceStructure,
} from "@/types/dart";

const API_BASE = "/api";

export async function fetchGovernanceAlerts(): Promise<GovernanceAlertItem[]> {
  const res = await fetch(`${API_BASE}/dart/governance-alerts`);
  if (!res.ok) throw new Error("지배구조 공시 조회 실패");
  return res.json();
}

export async function fetchGovernanceStructure(
  stockCode: string
): Promise<GovernanceStructure> {
  const res = await fetch(`${API_BASE}/dart/governance/${stockCode}`);
  if (!res.ok) throw new Error("지배구조 조회 실패");
  return res.json();
}
