"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchGovernanceAlerts } from "@/lib/api/dart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export function GovernanceAlertList() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["governanceAlerts"],
    queryFn: fetchGovernanceAlerts,
    staleTime: 60000,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>지배구조 이슈 종목</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
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
          <CardTitle>지배구조 이슈 종목</CardTitle>
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

  const alerts = data ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>지배구조 이슈 종목</CardTitle>
        <p className="text-sm text-muted-foreground">
          최근 대주주 지분 변동 공시 (DART)
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              최근 공시가 없습니다.
            </p>
          ) : (
            alerts.map((alert) => (
              <Link
                key={`${alert.stockCode}-${alert.reportDate}`}
                href={`/stock/${alert.stockCode}`}
                className="block rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{alert.corpName}</span>
                  <Badge variant="outline" className="text-xs">
                    {alert.changeRate > 0 ? "+" : ""}
                    {alert.changeRate.toFixed(1)}%
                  </Badge>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {alert.summary}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {alert.reportDate}
                </p>
              </Link>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
