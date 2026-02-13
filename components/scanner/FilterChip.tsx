"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FilterChipProps {
  label: string;
  value: string | number;
  variant?: "default" | "secondary" | "outline" | "destructive";
  className?: string;
}

export function FilterChip({
  label,
  value,
  variant = "secondary",
  className,
}: FilterChipProps) {
  return (
    <Badge
      variant={variant}
      className={cn("font-normal", className)}
    >
      {label}: {value}
    </Badge>
  );
}
