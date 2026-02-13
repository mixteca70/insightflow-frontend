"use client";

import { useState } from "react";
import { FilterPanel, type FilterFormValues } from "@/components/scanner/FilterPanel";
import { StockResultGrid } from "@/components/scanner/StockResultGrid";
import { useStockScreener, type ScreenerFilter } from "@/lib/hooks/useStockScreener";

export default function ScannerPage() {
  const [filter, setFilter] = useState<ScreenerFilter>({});

  const { data, isLoading, error, refetch } = useStockScreener(filter);

  const handleFilterSubmit = (values: FilterFormValues) => {
    setFilter({
      operatingMarginMin: values.operatingMarginMin,
      perMax: values.perMax,
      debtRatioMax: values.debtRatioMax,
      majorShareholderMin: values.majorShareholderMin,
      majorShareholderMax: values.majorShareholderMax,
    });
  };

  const handleFilterReset = () => {
    setFilter({});
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">스마트 스캐너</h1>
        <p className="text-muted-foreground">
          재무·지배구조 조건으로 종목을 발굴하세요
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <FilterPanel
          onSubmit={handleFilterSubmit}
          onReset={handleFilterReset}
        />
        <div>
          <StockResultGrid
            data={data}
            isLoading={isLoading}
            error={error}
            onRetry={() => refetch()}
          />
        </div>
      </div>
    </div>
  );
}
