"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useState } from "react";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { mounted } = useTheme();
  if (!mounted) {
    return (
      <div className="flex min-h-screen" suppressHydrationWarning>
        <div className="hidden w-64 border-r border-border bg-sidebar md:block" suppressHydrationWarning />
        <div className="flex flex-1 flex-col" suppressHydrationWarning>
          <div className="h-16 border-b border-border" suppressHydrationWarning />
          <main className="flex-1 p-6" suppressHydrationWarning>
            <div className="h-8 w-48 animate-pulse rounded bg-muted" suppressHydrationWarning />
          </main>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 10000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
        storageKey="insightflow-theme"
      >
        <ThemeWrapper>{children}</ThemeWrapper>
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
