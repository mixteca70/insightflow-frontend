const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");
const apiDir = path.join(rootDir, "app", "api");
const apiBackupDir = path.join(rootDir, ".api-backup-gh-pages");

try {
  // API 라우트를 프로젝트 루트 외부로 이동 (정적 내보내기와 호환되지 않음)
  if (fs.existsSync(apiDir)) {
    fs.cpSync(apiDir, apiBackupDir, { recursive: true });
    fs.rmSync(apiDir, { recursive: true });
    console.log("API routes temporarily removed for static export");
  }

  execSync("next build", {
    stdio: "inherit",
    cwd: rootDir,
    env: { ...process.env, NEXT_PUBLIC_BASE_PATH: "/insightflow-frontend" },
  });

  // GitHub Pages에서 _next 폴더가 Jekyll에 의해 무시되지 않도록
  fs.writeFileSync(path.join(rootDir, "out", ".nojekyll"), "");
} finally {
  // API 라우트 복원
  if (fs.existsSync(apiBackupDir)) {
    fs.cpSync(apiBackupDir, apiDir, { recursive: true });
    fs.rmSync(apiBackupDir, { recursive: true });
    console.log("API routes restored");
  }
}
