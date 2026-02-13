import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 외부 브라우저(다른 기기)에서 접근 시 개발 오버레이 허용
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    // 같은 네트워크 내 다른 기기 접근 시 (실제 IP는 npm run dev 실행 시 터미널에 표시됨)
    "192.168.0.34",
  ],
};

export default nextConfig;
