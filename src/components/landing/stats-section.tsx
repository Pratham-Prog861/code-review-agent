"use client";

import { TrendingUp, Users, Zap, Award } from "lucide-react";

const stats = [
  {
    icon: <Users className="w-8 h-8" />,
    value: "10K+",
    label: "Active Developers",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    value: "1M+",
    label: "Code Reviews",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    value: "70%",
    label: "Token Savings",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: <Award className="w-8 h-8" />,
    value: "99.9%",
    label: "Accuracy Rate",
    color: "from-purple-500 to-pink-500",
  },
];

export function StatsSection() {
  return (
    <section
      id="stats"
      className="py-20 relative overflow-hidden border-y bg-muted/30"
    >

      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group animate-in fade-in zoom-in-95 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >

              <div
                className={`mb-4 p-4 rounded-2xl bg-linear-to-br ${stat.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}
              >
                <div
                  className={`bg-linear-to-br ${stat.color} bg-clip-text text-transparent`}
                >
                  {stat.icon}
                </div>
              </div>

              <div
                className={`text-4xl md:text-5xl font-bold font-playfair mb-2 bg-linear-to-br ${stat.color} bg-clip-text text-transparent`}
              >
                {stat.value}
              </div>

              <div className="text-sm md:text-base text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
