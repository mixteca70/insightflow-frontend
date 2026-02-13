import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // GitHub Pages 배포 시에만 정적 내보내기
  ...(basePath && { output: "export" as const, basePath, assetPrefix: basePath }),
  // 외부 브라우저(다른 기기)에서 접근 시 개발 오버레이 허용
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.0.34",
  ],
};

export default nextConfig;
