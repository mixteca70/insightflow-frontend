"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { createChart, AreaSeries, type IChartApi } from "lightweight-charts";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MiniChartSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stockCode?: string;
  stockName?: string;
  data?: Array<{ time: string; value: number }>;
}

export function MiniChartSidebar({
  open,
  onOpenChange,
  stockCode,
  stockName,
  data = [],
}: MiniChartSidebarProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartRef.current || !open || !stockCode) return;

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
        secondsVisible: false,
      },
    });

    const areaSeries = chart.addSeries(AreaSeries, {
      lineColor: "rgb(59, 130, 246)",
      topColor: "rgba(59, 130, 246, 0.4)",
      bottomColor: "rgba(59, 130, 246, 0)",
    });

    const chartData = data.length
      ? data.map((d) => ({ time: d.time as never, value: d.value }))
      : Array.from({ length: 30 }, (_, i) => ({
          time: `2024-01-${String(i + 1).padStart(2, "0")}` as never,
          value: 50000 + Math.random() * 20000,
        }));

    areaSeries.setData(chartData);
    chartInstanceRef.current = chart;

    const handleResize = () => {
      if (chartRef.current) chart.applyOptions({ width: chartRef.current.clientWidth });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
      chartInstanceRef.current = null;
    };
  }, [open, stockCode, data]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:w-[450px]">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>
              {stockName || "종목"} ({stockCode || "-"})
            </span>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <div ref={chartRef} className="h-[200px] w-full" />
          {stockCode && (
            <Link href={`/stock/${stockCode}`} className="mt-4 block">
              <Button variant="outline" className="w-full">
                상세 보기
              </Button>
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
