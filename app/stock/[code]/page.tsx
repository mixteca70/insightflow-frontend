"use client";

import { use } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FundamentalCharts } from "@/components/stock/FundamentalCharts";
import { GovernanceStructure } from "@/components/stock/GovernanceStructure";
import { fetchGovernanceStructure } from "@/lib/api/dart";

export default function StockDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);

  const { data: governanceData, isLoading: governanceLoading } = useQuery({
    queryKey: ["governance", code],
    queryFn: () => fetchGovernanceStructure(code),
    staleTime: 86400000,
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/scanner">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">종목 상세 ({code})</h1>
          <p className="text-muted-foreground">
            펀더멘털 및 지배구조 분석
          </p>
        </div>
      </div>

      <FundamentalCharts stockCode={code} />

      <GovernanceStructure
        data={governanceData}
        isLoading={governanceLoading}
      />
    </div>
  );
}
