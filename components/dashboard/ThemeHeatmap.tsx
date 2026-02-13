"use client";

import { useThemeHeatmap } from "@/lib/hooks/useThemeHeatmap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function getHeatmapColor(changeRate: number): string {
  if (changeRate > 3) return "bg-red-500/80";
  if (changeRate > 1) return "bg-red-400/60";
  if (changeRate > 0) return "bg-red-300/40";
  if (changeRate > -1) return "bg-blue-300/40";
  if (changeRate > -3) return "bg-blue-400/60";
  return "bg-blue-500/80";
}

export function ThemeHeatmap() {
  const { data, isLoading, error, refetch } = useThemeHeatmap();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>테마 히트맵</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
            {Array.from({ length: 24 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>테마 히트맵</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">데이터를 불러올 수 없습니다.</p>
          <button
            onClick={() => refetch()}
            className="mt-2 text-sm text-primary hover:underline"
          >
            재시도
          </button>
        </CardContent>
      </Card>
    );
  }

  const themes = data?.themes ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>테마 히트맵</CardTitle>
        <p className="text-sm text-muted-foreground">
          업종/테마별 등락률 (색상: 상승 빨강, 하락 파랑)
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
          {themes.map((theme) => (
            <div
              key={theme.themeCode}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center rounded-md p-2 text-xs transition-transform hover:scale-105",
                getHeatmapColor(theme.changeRate)
              )}
              title={`${theme.themeName}: ${theme.changeRate > 0 ? "+" : ""}${theme.changeRate.toFixed(2)}%`}
            >
              <span className="truncate font-medium text-white drop-shadow">
                {theme.themeName}
              </span>
              <span className="text-white/90">
                {theme.changeRate > 0 ? "+" : ""}
                {theme.changeRate.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
