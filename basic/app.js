/**
 * InsightFlow - Basic (Vanilla JS)
 * HTML, CSS, 바닐라 JS만 사용
 */

// Mock 데이터 (public/data/와 동일)
const DATA = {
  themes: {
    themes: [
      { themeCode: "T001", themeName: "2차전지", changeRate: 2.5 },
      { themeCode: "T002", themeName: "AI반도체", changeRate: 1.8 },
      { themeCode: "T003", themeName: "바이오", changeRate: -0.5 },
      { themeCode: "T004", themeName: "자동차", changeRate: 0.3 },
      { themeCode: "T005", themeName: "게임", changeRate: -1.2 },
      { themeCode: "T006", themeName: "금융", changeRate: 0.8 },
      { themeCode: "T007", themeName: "조선", changeRate: 3.2 },
      { themeCode: "T008", themeName: "철강", changeRate: -0.8 },
      { themeCode: "T009", themeName: "전기전자", changeRate: 1.5 },
      { themeCode: "T010", themeName: "건설", changeRate: -0.2 },
      { themeCode: "T011", themeName: "통신", changeRate: 0.5 },
      { themeCode: "T012", themeName: "유통", changeRate: -1.5 },
    ],
  },
  hotThemes: [
    {
      themeCode: "T001",
      themeName: "2차전지",
      changeRate: 2.5,
      leaders: [
        { stockCode: "373220", stockName: "LG에너지솔루션", changeRate: 2.1 },
        { stockCode: "006400", stockName: "삼성SDI", changeRate: 1.8 },
        { stockCode: "247540", stockName: "에코프로비엠", changeRate: 3.5 },
      ],
    },
    {
      themeCode: "T002",
      themeName: "AI반도체",
      changeRate: 1.8,
      leaders: [
        { stockCode: "005930", stockName: "삼성전자", changeRate: 1.2 },
        { stockCode: "000660", stockName: "SK하이닉스", changeRate: 2.5 },
        { stockCode: "042700", stockName: "한미반도체", changeRate: 4.2 },
      ],
    },
    {
      themeCode: "T007",
      themeName: "조선",
      changeRate: 3.2,
      leaders: [
        { stockCode: "009540", stockName: "HD한국조선해양", changeRate: 4.1 },
        { stockCode: "010140", stockName: "삼성중공업", changeRate: 2.8 },
        { stockCode: "042660", stockName: "한화오션", changeRate: 3.5 },
      ],
    },
  ],
  governanceAlerts: [
    {
      corpName: "삼성전자",
      stockCode: "005930",
      reportDate: "2024-02-10",
      summary: "대주주 지분 변동 신고 - 국민연금 0.5%p 감소",
      changeRate: -0.5,
    },
    {
      corpName: "SK하이닉스",
      stockCode: "000660",
      reportDate: "2024-02-09",
      summary: "대주주 지분 변동 - SK그룹 1.2%p 증가",
      changeRate: 1.2,
    },
    {
      corpName: "LG에너지솔루션",
      stockCode: "373220",
      reportDate: "2024-02-08",
      summary: "대주주 지분 변동 - LG그룹 0.3%p 증가",
      changeRate: 0.3,
    },
  ],
};

// Heatmap 색상 클래스
function getHeatmapClass(changeRate) {
  if (changeRate > 3) return "heatmap-up-3";
  if (changeRate > 1) return "heatmap-up-2";
  if (changeRate > 0) return "heatmap-up-1";
  if (changeRate > -1) return "heatmap-flat";
  if (changeRate > -3) return "heatmap-down-1";
  return "heatmap-down-2";
}

// DOM 요소
const heatmapEl = document.getElementById("themeHeatmap");
const heatmapErrorEl = document.getElementById("heatmapError");
const hotThemesEl = document.getElementById("hotThemes");
const hotThemesErrorEl = document.getElementById("hotThemesError");
const governanceEl = document.getElementById("governanceAlerts");
const governanceErrorEl = document.getElementById("governanceError");

// 테마 히트맵 렌더링
function renderHeatmap() {
  heatmapEl.innerHTML = "";
  heatmapErrorEl.classList.add("hidden");

  const themes = DATA.themes.themes;
  themes.forEach((theme) => {
    const item = document.createElement("div");
    item.className = `heatmap-item ${getHeatmapClass(theme.changeRate)}`;
    item.title = `${theme.themeName}: ${theme.changeRate > 0 ? "+" : ""}${theme.changeRate.toFixed(2)}%`;
    item.innerHTML = `
      <span class="name">${theme.themeName}</span>
      <span class="rate">${theme.changeRate > 0 ? "+" : ""}${theme.changeRate.toFixed(2)}%</span>
    `;
    heatmapEl.appendChild(item);
  });
}

// 급등 테마 렌더링
function renderHotThemes() {
  hotThemesEl.innerHTML = "";
  hotThemesErrorEl.classList.add("hidden");

  DATA.hotThemes.forEach((theme) => {
    const item = document.createElement("div");
    item.className = "theme-item";
    const badgeClass = theme.changeRate >= 0 ? "badge-up" : "badge-down";
    const leadersHtml = theme.leaders
      .map(
        (s) =>
          `<a href="#" class="leader-link" data-code="${s.stockCode}">${s.stockName} <span class="${s.changeRate >= 0 ? "up" : "down"}">${s.changeRate >= 0 ? "+" : ""}${s.changeRate.toFixed(2)}%</span></a>`
      )
      .join("");
    item.innerHTML = `
      <div class="theme-header">
        <span class="theme-name">${theme.themeName}</span>
        <span class="badge ${badgeClass}">${theme.changeRate >= 0 ? "+" : ""}${theme.changeRate.toFixed(2)}%</span>
      </div>
      <div class="leaders">${leadersHtml}</div>
    `;
    hotThemesEl.appendChild(item);
  });
}

// 지배구조 공시 렌더링
function renderGovernanceAlerts() {
  governanceEl.innerHTML = "";
  governanceErrorEl.classList.add("hidden");

  DATA.governanceAlerts.forEach((alert) => {
    const item = document.createElement("a");
    item.href = "#";
    item.className = "alert-item";
    item.dataset.code = alert.stockCode;
    const badgeClass = alert.changeRate >= 0 ? "badge-up" : "badge-down";
    item.innerHTML = `
      <div class="alert-header">
        <span class="alert-corp">${alert.corpName}</span>
        <span class="badge ${badgeClass}">${alert.changeRate > 0 ? "+" : ""}${alert.changeRate.toFixed(1)}%</span>
      </div>
      <p class="alert-summary">${alert.summary}</p>
      <p class="alert-date">${alert.reportDate}</p>
    `;
    governanceEl.appendChild(item);
  });
}

// 검색 폼
document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const code = document.getElementById("searchInput").value.trim();
  if (code) {
    alert(`종목 ${code} 검색 (basic 버전에서는 상세 페이지 없음)`);
  }
});

// 테마 토글 (라이트/다크)
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light", document.body.classList.contains("dark") === false);
});

// 기본 다크 테마
document.body.classList.add("dark");

// 재시도 버튼 (데이터가 내장되어 있어 실제로는 불필요하지만 UI 일관성)
document.getElementById("retryHeatmap").addEventListener("click", renderHeatmap);
document.getElementById("retryHotThemes").addEventListener("click", renderHotThemes);
document.getElementById("retryGovernance").addEventListener("click", renderGovernanceAlerts);

// 초기 렌더링
renderHeatmap();
renderHotThemes();
renderGovernanceAlerts();
