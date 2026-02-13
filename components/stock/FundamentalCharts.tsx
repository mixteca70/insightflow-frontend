"use client";

import { useRef, useEffect } from "react";
import { createChart, AreaSeries, LineSeries } from "lightweight-charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FundamentalChartsProps {
  stockCode: string;
  operatingProfit?: number[];
  roe?: number[];
  years?: string[];
}

export function FundamentalCharts({
  stockCode,
  operatingProfit = [100, 120, 150, 180, 200],
  roe = [10, 12, 14, 15, 16],
  years = ["2020", "2021", "2022", "2023", "2024"],
}: FundamentalChartsProps) {
  const profitChartRef = useRef<HTMLDivElement>(null);
  const roeChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profitChartRef.current) return;

    const chart = createChart(profitChartRef.current, {
      width: profitChartRef.current.clientWidth,
      height: 250,
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

    const areaSeries = chart.addSeries(AreaSeries, {
      lineColor: "rgb(59, 130, 246)",
      topColor: "rgba(59, 130, 246, 0.4)",
      bottomColor: "rgba(59, 130, 246, 0)",
    });

    const data = years.map((year, i) => ({
      time: `${year}-01-01` as never,
      value: operatingProfit[i] ?? 0,
    }));
    areaSeries.setData(data);

    const handleResize = () => {
      if (profitChartRef.current)
        chart.applyOptions({ width: profitChartRef.current.clientWidth });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [stockCode, operatingProfit, years]);

  useEffect(() => {
    if (!roeChartRef.current) return;

    const chart = createChart(roeChartRef.current, {
      width: roeChartRef.current.clientWidth,
      height: 250,
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

    const lineSeries = chart.addSeries(LineSeries, {
      color: "rgb(34, 197, 94)",
      lineWidth: 2,
    });

    const data = years.map((year, i) => ({
      time: `${year}-01-01` as never,
      value: roe[i] ?? 0,
    }));
    lineSeries.setData(data);

    const handleResize = () => {
      if (roeChartRef.current)
        chart.applyOptions({ width: roeChartRef.current.clientWidth });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [stockCode, roe, years]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>영업이익 성장성 (5개년)</CardTitle>
          <p className="text-sm text-muted-foreground">단위: 억원</p>
        </CardHeader>
        <CardContent>
          <div ref={profitChartRef} className="h-[250px] w-full" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>ROE (자기자본이익률) 추이</CardTitle>
          <p className="text-sm text-muted-foreground">단위: %</p>
        </CardHeader>
        <CardContent>
          <div ref={roeChartRef} className="h-[250px] w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
