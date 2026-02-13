/** KIS API 응답 타입 정의 */

export interface ThemePriceItem {
  themeCode: string;
  themeName: string;
  changeRate: number;
  changePrice: number;
  currentPrice: number;
  tradingValue: number;
}

export interface ThemeHeatmapData {
  themes: ThemePriceItem[];
  updatedAt: string;
}

export interface StockPrice {
  stockCode: string;
  stockName: string;
  currentPrice: number;
  changeRate: number;
  changePrice: number;
  per?: number;
  pbr?: number;
}

export interface ThemeWithLeaders {
  themeCode: string;
  themeName: string;
  changeRate: number;
  tradingValue: number;
  leaders: StockPrice[];
}
