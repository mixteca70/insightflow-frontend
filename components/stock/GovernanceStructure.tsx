"use client";

import { useRef, useEffect } from "react";
import { createChart, HistogramSeries } from "lightweight-charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GovernanceStructure as GovernanceStructureType } from "@/types/dart";

interface GovernanceStructureProps {
  data?: GovernanceStructureType | null;
  isLoading?: boolean;
}

export function GovernanceStructure({
  data,
  isLoading,
}: GovernanceStructureProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !data?.majorShareholders?.length) return;

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 200,
      layout: {
        background: { color: "transparent" },
        textColor: "#888",
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: "rgba(255,255,255,0.05)" },
      },
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
      },
    });

    const barSeries = chart.addSeries(HistogramSeries, {
      color: "rgba(59, 130, 246, 0.6)",
    });

    const chartData = data.majorShareholders.map((s, i) => ({
      time: `2024-01-${String(i + 1).padStart(2, "0")}` as never,
      value: s.shareRatio,
      color: s.change >= 0 ? "rgba(239, 68, 68, 0.6)" : "rgba(59, 130, 246, 0.6)",
    }));
    barSeries.setData(chartData);

    const handleResize = () => {
      if (chartRef.current)
        chart.applyOptions({ width: chartRef.current.clientWidth });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>지배구조</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] animate-pulse rounded bg-muted" />
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>지배구조</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">데이터가 없습니다.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>대주주 지분율</CardTitle>
        <p className="text-sm text-muted-foreground">
          총 대주주 지분: {data.totalMajorShare?.toFixed(1) ?? "-"}%
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div ref={chartRef} className="h-[200px] w-full" />
          <div className="space-y-2">
            {data.majorShareholders.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded border border-border px-3 py-2"
              >
                <span className="text-sm">{s.name}</span>
                <span className="font-medium">
                  {s.shareRatio.toFixed(1)}%
                  {s.change !== 0 && (
                    <span
                      className={
                        s.change >= 0 ? "text-red-500" : "text-blue-500"
                      }
                    >
                      {" "}
                      ({s.change >= 0 ? "+" : ""}
                      {s.change.toFixed(1)}%)
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
