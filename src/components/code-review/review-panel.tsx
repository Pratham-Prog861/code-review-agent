"use client";

import { useState } from "react";
import { ReviewIssue } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  FileText,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";

interface ReviewPanelProps {
  issues: ReviewIssue[];
  qualityScore: number;
  summary: string;
  refactoredCode?: string;
}

export function ReviewPanel({
  issues,
  qualityScore,
  summary,
  refactoredCode,
}: ReviewPanelProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (refactoredCode) {
      await navigator.clipboard.writeText(refactoredCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive";
      case "warning":
        return "secondary";
      case "info":
        return "default";
      case "suggestion":
        return "outline";
      default:
        return "outline";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      case "suggestion":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className="h-full flex flex-col">

      <div className="shrink-0 mb-4">
        <div className="flex items-center justify-between mb-4 pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-linear-to-br from-primary/20 to-indigo-500/20 rounded-xl ring-1 ring-primary/10">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-playfair tracking-tight">
                Review Report
              </h3>
              <p className="text-xs text-muted-foreground">
                Automated analysis
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Quality Score
            </span>
            <div
              className={`text-3xl font-bold px-5 py-2 rounded-xl shadow-lg ring-1 transition-all ${
                qualityScore > 80
                  ? "bg-linear-to-br from-emerald-500/10 to-green-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20"
                  : qualityScore > 50
                    ? "bg-linear-to-br from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20"
                    : "bg-linear-to-br from-rose-500/10 to-red-500/10 text-rose-600 dark:text-rose-400 ring-rose-500/20"
              }`}
            >
              {qualityScore}
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-muted/50 to-muted/30 border rounded-xl p-4 text-sm leading-relaxed shadow-sm mb-4">
          <p className="text-foreground/90">{summary}</p>
        </div>

        {refactoredCode && refactoredCode.trim() && (
          <div className="relative group border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-20 group-hover:opacity-30 blur-sm transition-opacity duration-300" />

            {/* Header */}
            <div className="relative bg-linear-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 backdrop-blur-sm px-4 py-3 border-b border-emerald-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-linear-to-br from-emerald-500/20 to-teal-500/20 rounded-lg ring-1 ring-emerald-500/30">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                      <span className="bg-linear-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                        Key Improvements
                      </span>
                    </h4>
                    <p className="text-[10px] text-muted-foreground">
                      Optimized code snippets
                    </p>
                  </div>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/30 transition-all duration-200 group/btn"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        Copied!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-muted-foreground group-hover/btn:text-emerald-500 transition-colors" />
                      <span className="text-xs font-medium text-muted-foreground group-hover/btn:text-foreground transition-colors">
                        Copy
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="relative">
              <ScrollArea className="max-h-100">
                <div className="bg-lienar-to-br from-emerald-50/50 via-teal-50/30 to-cyan-50/20 dark:from-emerald-950/20 dark:via-teal-950/10 dark:to-cyan-950/5 p-5 border-t border-emerald-500/10">
                  {/* Line numbers and code */}
                  <div className="flex gap-4">
                    {/* Line numbers */}
                    <div className="select-none text-emerald-600/50 dark:text-emerald-400/40 text-xs font-mono leading-[1.7] flex flex-col items-end pr-3 border-r-2 border-emerald-500/20">
                      {refactoredCode.split("\n").map((_, i) => (
                        <span
                          key={i}
                          className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors min-h-[1.7em]"
                        >
                          {i + 1}
                        </span>
                      ))}
                    </div>

                    <pre className="flex-1 text-xs font-mono leading-[1.7] overflow-x-auto">
                      <code className="text-foreground/90 whitespace-pre-wrap wrap-break-word">
                        {refactoredCode.split("\n").map((line, i) => {

                          if (line.trim().startsWith("//")) {
                            return (
                              <div
                                key={i}
                                className="text-emerald-600 dark:text-emerald-400 italic font-medium"
                              >
                                {line}
                              </div>
                            );
                          }

                          if (line.includes("// Fixed:")) {
                            return (
                              <div
                                key={i}
                                className="text-teal-700 dark:text-teal-300 font-semibold bg-teal-100/50 dark:bg-teal-900/20 px-2 py-0.5 rounded"
                              >
                                {line}
                              </div>
                            );
                          }
                          return (
                            <div key={i} className="text-foreground/90">
                              {line || "\u00A0"}
                            </div>
                          );
                        })}
                      </code>
                    </pre>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-emerald-50/80 via-emerald-50/40 to-transparent dark:from-emerald-950/40 dark:via-emerald-950/20 pointer-events-none" />
                </div>
              </ScrollArea>

              <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-emerald-500/10 to-transparent blur-2xl pointer-events-none" />
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <h4 className="text-sm font-bold text-foreground/80 uppercase tracking-wider mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          Issues Found ({issues.length})
        </h4>
        <ScrollArea className="h-full pr-2">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {issues.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-muted-foreground border-2 border-dashed rounded-xl bg-linear-to-br from-emerald-50/50 to-green-50/30 dark:from-emerald-900/10 dark:to-green-900/5">
                <CheckCircle2 className="w-8 h-8 mb-2 text-emerald-500" />
                <p className="font-medium">No issues found! Great code.</p>
              </div>
            ) : (
              issues.map((issue, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border rounded-xl bg-card shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  <AccordionTrigger className="hover:no-underline py-3 px-4">
                    <div className="flex items-center gap-3 text-left w-full pr-2">
                      <div className="shrink-0">
                        {getSeverityIcon(issue.severity)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold line-clamp-2">
                          {issue.message}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={
                              getSeverityColor(issue.severity) as
                                | "default"
                                | "secondary"
                                | "destructive"
                                | "outline"
                            }
                            className="text-[10px] uppercase tracking-wider h-5 px-2"
                          >
                            {issue.severity}
                          </Badge>
                          {issue.line && (
                            <span className="text-[10px] text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">
                              Ln {issue.line}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 pt-0">
                    <div className="pl-10 pt-1">
                      <div className="bg-muted/40 rounded-lg p-3 text-xs border">
                        <p className="font-bold text-foreground mb-1 uppercase tracking-wide flex items-center gap-1.5">
                          <Info className="w-3 h-3" /> Suggestion
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          {issue.suggestion}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            )}
          </Accordion>
        </ScrollArea>
      </div>
    </div>
  );
}
