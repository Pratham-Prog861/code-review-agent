"use client";

import React, { useState } from "react";
import { CodeEditor } from "@/components/code-review/code-editor";
import { ReviewPanel } from "@/components/code-review/review-panel";
import { StatsCard } from "@/components/code-review/stats-card";
import { SettingsPanel } from "@/components/code-review/settings-panel";
import { CodeReviewResponse } from "@/lib/types";
import { toast } from "sonner";
import { Loader2, Code2, Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturesSection } from "@/components/landing/features";
import { HowItWorksSection } from "@/components/landing/how-it-works";
import { StatsSection } from "@/components/landing/stats-section";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/layout/footer";

export default function CodeReviewPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [depth, setDepth] = useState<"quick" | "standard" | "thorough">(
    "standard",
  );
  const [useCompression, setUseCompression] = useState(true);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<CodeReviewResponse | null>(null);

  const handleReview = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code to review.");
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language,
          depth,
          useCompression,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze code");
      }

      setResult(data);
      toast.success("Code review completed successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative selection:bg-indigo-100 dark:selection:bg-indigo-900/30 overflow-hidden scroll-smooth">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-200 h-200 rounded-full bg-linear-to-br from-indigo-500/20 via-purple-500/10 to-transparent blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-5%] w-175 h-175 rounded-full bg-linear-to-tr from-blue-500/20 via-cyan-500/10 to-transparent blur-[120px] animate-pulse-slow animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-linear-to-r from-violet-500/5 to-fuchsia-500/5 blur-[100px] animate-float" />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.015] dark:opacity-[0.025]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]" />
      </div>

      <header className="border-b bg-background/70 backdrop-blur-2xl sticky top-0 z-50 transition-all duration-300 shadow-lg shadow-primary/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-indigo-500/30 rounded-2xl blur-md group-hover:blur-lg transition-all duration-300" />
              <div className="relative bg-gradient-to-br from-primary/20 to-indigo-500/20 p-3 rounded-2xl ring-1 ring-inset ring-foreground/10 shadow-lg shadow-primary/10 group-hover:scale-105 transition-transform duration-300">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold font-playfair tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-indigo-600 dark:from-foreground dark:via-primary dark:to-indigo-400">
                Code Review Agent
              </h1>
              <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-muted-foreground/60">
                Powered by ScaleDown
              </span>
            </div>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-1">
            <a
              href="#features"
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300 ease-out"></span>
            </a>
            <a
              href="#how-it-works"
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            >
              How it Works
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300 ease-out"></span>
            </a>
            <a
              href="#stats"
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            >
              Stats
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300 ease-out"></span>
            </a>
            <a
              href="#get-started"
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            >
              Get Started
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300 ease-out"></span>
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex text-sm font-medium hover:bg-muted/50"
            >
              Sign In
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex gap-2 rounded-xl border-indigo-200/80 dark:border-indigo-800/80 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/30 dark:to-purple-950/30 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/50 dark:hover:to-purple-900/50 text-indigo-700 dark:text-indigo-300 font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              onClick={() =>
                window.open("https://github.com/scaledown-ai", "_blank")
              }
            >
              <Github size={16} />
              <span>GitHub</span>
            </Button>
          </div>
        </div>
      </header>

      <main
        id="get-started"
        className="flex-1 container mx-auto px-4 md:px-6 py-12 z-10 w-full max-w-[100vw] overflow-x-hidden"
      >
        {/* Hero Section */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-200/30 dark:border-indigo-800/30 mb-6 animate-in fade-in slide-in-from-top-4 duration-700 animation-delay-200">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-medium bg-clip-text text-transparent bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
              AI-Powered Code Analysis
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-playfair font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 animation-delay-300">
            <span className="bg-clip-text text-transparent bg-linear-to-br from-foreground via-foreground/90 to-foreground/70">
              Elevate Your
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-primary via-indigo-600 to-purple-600 dark:from-primary dark:via-indigo-400 dark:to-purple-400">
              Code Quality
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 animation-delay-500">
            Get instant, intelligent code reviews powered by advanced AI.
            <br className="hidden md:block" />
            Ship cleaner code, catch bugs early, and save valuable tokens.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in zoom-in-95 duration-700 animation-delay-700">
          {/* Left Panel: Code Input */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex-1 border rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/10 bg-card ring-1 ring-inset ring-foreground/5 flex flex-col min-h-125 lg:min-h-150 hover:shadow-indigo-500/20 transition-all duration-500 hover:ring-foreground/10">
              <CodeEditor
                code={code}
                onChange={setCode}
                disabled={isAnalyzing}
              />
            </div>
            <div className="flex justify-center pt-1 shrink-0">
              <div className="relative group w-full sm:w-auto">
                {/* Animated glow effect */}
                <div className="absolute -inset-1 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500 animate-pulse-slow" />

                <Button
                  size="lg"
                  onClick={handleReview}
                  disabled={isAnalyzing || !code.trim()}
                  className="relative w-full sm:w-auto min-w-60 h-16 text-lg font-bold shadow-2xl transition-all hover:-translate-y-1 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-600 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-700 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl"
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent" />

                  {/* Button content */}
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span className="tracking-wide">Analyzing Code...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-6 w-6 drop-shadow-lg" />
                        <span className="tracking-wide">Review Code</span>
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Panel: Results & Settings */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Settings & Stats Area - Compact Grid */}
            <div className="flex flex-col gap-4 shrink-0">
              <div
                className={`transition-all duration-300 ${
                  isAnalyzing ? "opacity-80 pointer-events-none" : "opacity-100"
                }`}
              >
                <SettingsPanel
                  language={language}
                  setLanguage={setLanguage}
                  depth={depth}
                  setDepth={setDepth}
                  useCompression={useCompression}
                  setUseCompression={setUseCompression}
                  disabled={isAnalyzing}
                />
              </div>

              {result && (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  <StatsCard stats={result.stats} />
                </div>
              )}
            </div>

            {/* Main Result Area */}
            <div className="flex-1 flex flex-col min-h-100 lg:min-h-125">
              {!result ? (
                <div className="h-full border-2 border-dashed border-indigo-200/60 dark:border-indigo-700/40 rounded-3xl p-6 md:p-10 text-center bg-linear-to-br from-indigo-50/60 via-purple-50/40 to-pink-50/30 dark:from-indigo-900/30 dark:via-purple-900/20 dark:to-pink-900/10 flex flex-col items-center justify-center relative overflow-hidden group hover:border-indigo-300/80 dark:hover:border-indigo-600/60 transition-all duration-500">
                  {/* Animated background elements */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-indigo-400/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-purple-400/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                  <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in-95 duration-700">
                    {/* Icon with enhanced styling */}
                    <div className="relative mb-8 group/icon">
                      {/* Rotating gradient ring */}
                      <div className="absolute -inset-4 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl group-hover/icon:opacity-40 transition-opacity duration-500" />
                      <div className="absolute -inset-2 bg-linear-to-br from-indigo-400/20 to-purple-400/20 rounded-2xl animate-pulse-slow" />

                      {/* Icon container */}
                      <div className="relative bg-linear-to-br from-background via-background/98 to-background/95 p-6 rounded-3xl shadow-2xl ring-1 ring-indigo-200/50 dark:ring-indigo-800/50 group-hover/icon:scale-110 group-hover/icon:rotate-6 transition-all duration-500 backdrop-blur-sm">
                        <Code2
                          className="w-14 h-14 text-transparent bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text drop-shadow-lg"
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>

                    {/* Title with gradient */}
                    <h3 className="font-playfair font-bold text-2xl md:text-3xl mb-3 md:mb-4 text-transparent bg-linear-to-r from-foreground via-indigo-600 to-purple-600 dark:from-foreground dark:via-indigo-400 dark:to-purple-400 bg-clip-text tracking-tight">
                      Ready to Analyze
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base max-w-70 md:max-w-[320px] mx-auto text-muted-foreground leading-relaxed">
                      Paste your code snippet and discover insights that
                      <br />
                      <span className="font-semibold text-foreground/80">
                        transform your development workflow
                      </span>
                    </p>

                    {/* Decorative dots */}
                    <div className="flex items-center gap-2 mt-8 opacity-40">
                      <div
                        className="w-2 h-2 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 animate-pulse"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-linear-to-r from-purple-500 to-pink-500 animate-pulse"
                        style={{ animationDelay: "200ms" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-linear-to-r from-pink-500 to-rose-500 animate-pulse"
                        style={{ animationDelay: "400ms" }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col border rounded-3xl bg-card shadow-xl p-4 md:p-6 overflow-hidden">
                  <ReviewPanel
                    issues={result.issues}
                    qualityScore={result.qualityScore}
                    summary={result.summary}
                    refactoredCode={result.refactoredCode}
                  />
                  <div className="text-center pt-4 mt-4 border-t shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setResult(null)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Start New Review
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
}
