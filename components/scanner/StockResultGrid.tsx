"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MiniChartSidebar } from "@/components/layout/MiniChartSidebar";
import { cn } from "@/lib/utils";

export interface StockResultItem {
  stockCode: string;
  stockName: string;
  currentPrice: number;
  changeRate: number;
  per?: number;
  pbr?: number;
  governanceScore?: number;
}

interface StockResultGridProps {
  data?: StockResultItem[];
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

function GovernanceScoreIcon({ score }: { score?: number }) {
  if (score === undefined) return <span className="text-muted-foreground">-</span>;
  if (score >= 80) return <span className="text-green-500">●</span>;
  if (score >= 60) return <span className="text-yellow-500">●</span>;
  return <span className="text-red-500">●</span>;
}

export function StockResultGrid({
  data = [],
  isLoading,
  error,
  onRetry,
}: StockResultGridProps) {
  const [selectedStock, setSelectedStock] = useState<StockResultItem | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleRowClick = (stock: StockResultItem) => {
    setSelectedStock(stock);
    setSidebarOpen(true);
  };

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>종목명</TableHead>
              <TableHead>현재가</TableHead>
              <TableHead>등락률</TableHead>
              <TableHead>PER</TableHead>
              <TableHead>PBR</TableHead>
              <TableHead>지배구조</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                <TableCell><Skeleton className="h-4 w-8" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md border p-6 text-center">
        <p className="text-destructive">데이터를 불러올 수 없습니다.</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-sm text-primary hover:underline"
          >
            재시도
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>종목명</TableHead>
              <TableHead>현재가</TableHead>
              <TableHead>등락률</TableHead>
              <TableHead>PER</TableHead>
              <TableHead>PBR</TableHead>
              <TableHead>지배구조</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  조건에 맞는 종목이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              data.map((stock) => (
                <TableRow
                  key={stock.stockCode}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(stock)}
                >
                  <TableCell>
                    <Link
                      href={`/stock/${stock.stockCode}`}
                      className="font-medium hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {stock.stockName}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {stock.currentPrice.toLocaleString()}원
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        stock.changeRate >= 0 ? "text-red-500" : "text-blue-500"
                      )}
                    >
                      {stock.changeRate >= 0 ? "+" : ""}
                      {stock.changeRate.toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell>
                    {stock.per != null ? (
                      <Badge variant="outline">{stock.per.toFixed(1)}배</Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    {stock.pbr != null ? (
                      <Badge variant="outline">{stock.pbr.toFixed(1)}배</Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <GovernanceScoreIcon score={stock.governanceScore} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <MiniChartSidebar
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        stockCode={selectedStock?.stockCode}
        stockName={selectedStock?.stockName}
      />
    </>
  );
}
