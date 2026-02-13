/** OpenDART API 응답 타입 정의 */

export interface GovernanceChange {
  corpCode: string;
  corpName: string;
  stockCode: string;
  changeDate: string;
  changeType: string;
  beforeShare: number;
  afterShare: number;
  changeRate: number;
}

export interface GovernanceAlertItem {
  corpCode: string;
  corpName: string;
  stockCode: string;
  reportDate: string;
  summary: string;
  changeRate: number;
}

export interface MajorShareholder {
  name: string;
  shareRatio: number;
  change: number;
}

export interface GovernanceStructure {
  stockCode: string;
  corpName: string;
  majorShareholders: MajorShareholder[];
  totalMajorShare: number;
}
