"use client";

import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Paste Code",
    description:
      "Simply paste your snippet or file content into the smart editor.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    number: "02",
    title: "Intelligent Compression",
    description:
      "ScaleDown automatically optimizes the context, stripping noise while keeping signal.",
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "03",
    title: "AI Analysis",
    description:
      "Our advanced model reviews the code for logic, security, and performance issues.",
    color: "from-pink-500 to-rose-500",
  },
  {
    number: "04",
    title: "Actionable Results",
    description:
      "Receive a structured report with a quality score and specific fix suggestions.",
    color: "from-amber-500 to-orange-500",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-32 bg-background border-t relative overflow-hidden"
    >

      <div className="absolute top-0 right-0 w-125 h-125 bg-linear-to-br from-primary/5 to-transparent rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-linear-to-tr from-indigo-500/5 to-transparent rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-20">
          <div className="lg:w-2/5 lg:sticky lg:top-32 animate-in fade-in slide-in-from-left-6 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-primary/10 via-indigo-500/10 to-purple-500/10 border border-primary/20 mb-6">
              <ArrowRight className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Our Process
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-linear-to-br from-foreground via-foreground/90 to-foreground/70">
              How it works
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10">
              A seamless pipeline from raw code to polished, production-ready
              software. We combine efficient token management with powerful
              generative AI to deliver exceptional results.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-1 w-24 bg-linear-to-r from-primary via-indigo-500 to-purple-500 rounded-full" />
              <div className="text-xs uppercase font-bold tracking-wider text-muted-foreground/60">
                4 Simple Steps
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 grid grid-cols-1 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative animate-in fade-in slide-in-from-right-6 duration-1000"
                style={{ animationDelay: `${index * 200}ms` }}
              >

                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-24 w-0.5 h-16 bg-linear-to-b from-primary/30 to-transparent" />
                )}

                <div className="flex gap-6 relative">

                  <div className="relative shrink-0">
                    <div
                      className={`absolute -inset-1 bg-linear-to-br ${step.color} rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500`}
                    />
                    <div
                      className={`relative text-3xl font-playfair font-bold bg-linear-to-br ${step.color} bg-clip-text text-transparent w-16 h-16 rounded-2xl bg-card border-2 flex items-center justify-center shadow-lg ring-1 ring-inset ring-foreground/5 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500`}
                    >
                      {step.number}
                    </div>
                  </div>

                  <div className="flex-1 pt-2">
                    <h3 className="font-bold text-2xl mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {step.description}
                    </p>

                    <div className="mt-4 h-0.5 w-0 group-hover:w-16 bg-linear-to-r from-primary to-transparent rounded-full transition-all duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
