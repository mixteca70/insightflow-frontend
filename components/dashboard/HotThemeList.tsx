"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchHotThemes } from "@/lib/api/kis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function HotThemeList() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["hotThemes"],
    queryFn: fetchHotThemes,
    staleTime: 10000,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>급등 테마 & 주도주</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
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
          <CardTitle>급등 테마 & 주도주</CardTitle>
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

  const themes = data ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>급등 테마 & 주도주</CardTitle>
        <p className="text-sm text-muted-foreground">
          거래대금 상위 테마와 대장주
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {themes.map((theme) => (
            <div
              key={theme.themeCode}
              className="rounded-lg border border-border p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium">{theme.themeName}</span>
                <Badge
                  variant={theme.changeRate >= 0 ? "destructive" : "secondary"}
                  className={cn(
                    theme.changeRate < 0 && "bg-blue-500/20 text-blue-400"
                  )}
                >
                  {theme.changeRate >= 0 ? "+" : ""}
                  {theme.changeRate.toFixed(2)}%
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {theme.leaders.map((stock) => (
                  <Link
                    key={stock.stockCode}
                    href={`/stock/${stock.stockCode}`}
                    className="rounded bg-muted px-2 py-1 text-sm hover:bg-muted/80"
                  >
                    {stock.stockName}{" "}
                    <span
                      className={cn(
                        stock.changeRate >= 0 ? "text-red-500" : "text-blue-500"
                      )}
                    >
                      {stock.changeRate >= 0 ? "+" : ""}
                      {stock.changeRate.toFixed(2)}%
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
