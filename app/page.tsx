import { ThemeHeatmap } from "@/components/dashboard/ThemeHeatmap";
import { HotThemeList } from "@/components/dashboard/HotThemeList";
import { GovernanceAlertList } from "@/components/dashboard/GovernanceAlertList";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">메인 인사이트 대시보드</h1>
        <p className="text-muted-foreground">
          시장의 맥락을 한눈에 파악하세요
        </p>
      </div>

      <ThemeHeatmap />

      <div className="grid gap-8 lg:grid-cols-2">
        <HotThemeList />
        <GovernanceAlertList />
      </div>
    </div>
  );
}
