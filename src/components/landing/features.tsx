"use client";

import React from "react";
import { Zap, Shield, Sparkles, Clock } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-7 h-7 text-amber-500 drop-shadow-glow-amber" />,
    title: "Instant Compression",
    description:
      "ScaleDown technology compresses your code context by up to 70% without losing semantic meaning.",
    gradient: "from-amber-500/10 via-orange-500/10 to-yellow-500/10",
    iconBg: "bg-gradient-to-br from-amber-500/20 to-orange-500/20",
  },
  {
    icon: (
      <Shield className="w-7 h-7 text-indigo-500 drop-shadow-glow-indigo" />
    ),
    title: "Security First",
    description:
      "Your code is analyzed for vulnerabilities and security risks before it even reaches production.",
    gradient: "from-indigo-500/10 via-blue-500/10 to-purple-500/10",
    iconBg: "bg-gradient-to-br from-indigo-500/20 to-blue-500/20",
  },
  {
    icon: (
      <Sparkles className="w-7 h-7 text-purple-500 drop-shadow-glow-purple" />
    ),
    title: "AI-Powered Insights",
    description:
      "Get deeper analysis than standard linters. Understand the 'why' behind every suggestion.",
    gradient: "from-purple-500/10 via-fuchsia-500/10 to-pink-500/10",
    iconBg: "bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20",
  },
  {
    icon: (
      <Clock className="w-7 h-7 text-emerald-500 drop-shadow-glow-emerald" />
    ),
    title: "Real-time Feedback",
    description:
      "Stop waiting for human review cycles. Get immediate feedback as you type and iterate faster.",
    gradient: "from-emerald-500/10 via-green-500/10 to-teal-500/10",
    iconBg: "bg-gradient-to-br from-emerald-500/20 to-green-500/20",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-linear-to-b from-muted/30 via-muted/50 to-muted/30" />
      <div className="absolute inset-0 bg-noise opacity-[0.015] dark:opacity-[0.025]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-primary/10 via-indigo-500/10 to-purple-500/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-linear-to-br from-foreground via-foreground/90 to-foreground/70">
            Why use Code Review Agent?
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Supercharge your development workflow with intelligent tools
            <br className="hidden md:block" />
            designed to catch bugs early and save valuable tokens.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative animate-in fade-in zoom-in-95 duration-700"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Glow effect */}
              <div
                className={`absolute -inset-0.5 bg-linear-to-br ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`}
              />

              {/* Card */}
              <div className="relative bg-card p-8 rounded-3xl border shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                {/* Icon */}
                <div
                  className={`mb-6 ${feature.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ring-1 ring-inset ring-foreground/5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                >
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="font-bold text-xl mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {feature.description}
                </p>

                {/* Decorative element */}
                <div className="mt-6 h-1 w-0 group-hover:w-12 bg-linear-to-r from-primary to-transparent rounded-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
