"use client";

import { Github, Twitter, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/2 to-transparent" />
      <div className="absolute inset-0 bg-noise opacity-[0.015] dark:opacity-[0.025]" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-primary/30 to-indigo-500/30 rounded-xl blur-md group-hover:blur-lg transition-all duration-300" />
                <div className="relative bg-linear-to-br from-primary/20 to-indigo-500/20 p-2 rounded-xl ring-1 ring-inset ring-foreground/10 shadow-lg">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="font-playfair font-bold text-2xl bg-clip-text text-transparent bg-linear-to-r from-foreground via-primary to-indigo-600 dark:from-foreground dark:via-primary dark:to-indigo-400">
                Code Review Agent
              </h3>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-6">
              Empowering developers with AI-driven insights and efficient
              context management. Built for speed, designed for excellence.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
              <span>by the ScaleDown team</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-foreground/90 mb-4">
              Product
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-200 flex items-center gap-2 group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-primary rounded-full transition-all duration-300" />
                Features
              </li>
              <li className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-200 flex items-center gap-2 group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-primary rounded-full transition-all duration-300" />
                Pricing
              </li>
              <li className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-200 flex items-center gap-2 group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-primary rounded-full transition-all duration-300" />
                API Docs
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-foreground/90 mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-200 flex items-center gap-2 group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-primary rounded-full transition-all duration-300" />
                About
              </li>
              <li className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-200 flex items-center gap-2 group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-primary rounded-full transition-all duration-300" />
                Blog
              </li>
              <li className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-200 flex items-center gap-2 group">
                <span className="w-0 group-hover:w-2 h-0.5 bg-primary rounded-full transition-all duration-300" />
                Contact
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-muted-foreground/80">
            © 2026 Code Review Agent. Powered by{" "}
            <span className="font-semibold text-foreground/90">ScaleDown</span>.
            All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="group relative">
              <div className="absolute -inset-2 bg-linear-to-r from-primary/20 to-indigo-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-all duration-300" />
              <div className="relative text-muted-foreground hover:text-foreground transition-colors duration-200 p-2 rounded-lg bg-muted/30 hover:bg-muted/50">
                <Github className="w-4 h-4" />
              </div>
            </a>
            <a href="#" className="group relative">
              <div className="absolute -inset-2 bg-linear-to-r from-primary/20 to-indigo-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-all duration-300" />
              <div className="relative text-muted-foreground hover:text-foreground transition-colors duration-200 p-2 rounded-lg bg-muted/30 hover:bg-muted/50">
                <Twitter className="w-4 h-4" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
