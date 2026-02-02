"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">

      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-200/30 dark:border-indigo-800/30 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Zap className="w-4 h-4 text-indigo-500 fill-indigo-500" />
            <span className="text-sm font-medium bg-clip-text text-transparent bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
              Start Reviewing Today
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-playfair font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 animation-delay-200">
            <span className="bg-clip-text text-transparent bg-linear-to-br from-foreground via-foreground/90 to-foreground/70">
              Ready to Transform Your
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
              Code Quality?
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 animation-delay-400">
            Join thousands of developers who are shipping better code, faster.
            Get instant AI-powered reviews and save up to 70% on context tokens.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 animation-delay-600">
            <Button
              size="lg"
              className="w-full sm:w-auto h-14 px-8 text-base font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 shadow-2xl hover:shadow-indigo-500/50 transition-all hover:-translate-y-1 group"
            >
              <span>Get Started Free</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground animate-in fade-in zoom-in-95 duration-1000 animation-delay-800">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse animation-delay-200" />
              <span>Free forever plan</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
