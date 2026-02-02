"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TokenStats } from "@/lib/types";
import { Zap, TrendingDown } from "lucide-react";

interface StatsCardProps {
  stats: TokenStats;
}

export function StatsCard({ stats }: StatsCardProps) {
  return (
    <Card className="overflow-hidden border-indigo-100 dark:border-indigo-900/50 shadow-sm relative group">
      <div className="absolute inset-0 bg-linear-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 opacity-50 transition-opacity group-hover:opacity-70" />
      <CardHeader className="relative pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
            <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/50 rounded-md">
              <Zap className="w-4 h-4 stroke-[2.5]" />
            </div>
            ScaleDown Efficiency
          </div>
          {stats.savingsPercentage > 0 && (
            <span className="text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2.5 py-1 rounded-full flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              {stats.savingsPercentage}%
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative pt-2">
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground font-medium uppercase tracking-wider">
              <span>Compression Rate</span>
              <span className="text-foreground">
                {stats.savingsPercentage}%
              </span>
            </div>
            <div className="h-2.5 w-full bg-indigo-100 dark:bg-indigo-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 dark:bg-indigo-400 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${stats.savingsPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground/70 pt-1">
              <span>Original Size</span>
              <span>Optimized</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-background/60 dark:bg-background/20 rounded-xl p-3 text-center border border-indigo-100/50 dark:border-indigo-900/20 backdrop-blur-sm">
              <span className="block text-2xl font-bold tracking-tight text-foreground">
                {(stats.originalTokens || 0).toLocaleString()}
              </span>
              <span className="text-[10px] uppercase text-muted-foreground font-semibold tracking-wider flex items-center justify-center gap-1">
                Tokens
              </span>
            </div>
            <div className="bg-background/60 dark:bg-background/20 rounded-xl p-3 text-center border border-indigo-100/50 dark:border-indigo-900/20 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-green-500/5 dark:bg-green-500/10" />
              <span className="block text-2xl font-bold tracking-tight text-green-600 dark:text-green-400 relative z-10">
                {(stats.compressedTokens || 0).toLocaleString()}
              </span>
              <span className="text-[10px] uppercase text-muted-foreground font-semibold tracking-wider flex items-center justify-center gap-1 relative z-10">
                Compressed
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
