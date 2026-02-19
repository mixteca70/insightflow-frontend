# InsightFlow Basic

HTML, CSS, 바닐라 JavaScript만으로 구성된 버전입니다. 프레임워크 없이 동작합니다.

## 실행 방법

1. `basic` 폴더의 `index.html`을 브라우저에서 직접 열기
2. 또는 로컬 서버로 실행:
   ```bash
   # Python
   python -m http.server 8080
   # 또는 Node.js (npx)
   npx serve .
   ```
   후 http://localhost:8080 접속

## 구성

- `index.html` - 메인 마크업
- `styles.css` - 스타일 (다크/라이트 테마)
- `app.js` - 데이터 및 렌더링 로직

## 기능

- 메인 인사이트 대시보드
- 테마 히트맵 (업종별 등락률)
- 급등 테마 & 주도주
- 지배구조 이슈 종목
- 종목코드 검색
- 테마 전환 (라이트/다크)
