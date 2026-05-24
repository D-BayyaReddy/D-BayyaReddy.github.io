"use client";

import React from "react";
import { motion } from "framer-motion";
import { GitPullRequest, GitFork, Star, Circle, ArrowUpRight } from "lucide-react";

interface RepoItem {
  name: string;
  desc: string;
  lang: string;
  langColor: string;
  stars: number;
  forks: number;
}

const featuredRepos: RepoItem[] = [
  {
    name: "FitForgeStudio",
    desc: "Multi-tenant Gym Management SaaS platform built with Flask, PostgreSQL, and payment gateways.",
    lang: "Python",
    langColor: "bg-yellow-500",
    stars: 12,
    forks: 4
  },
  {
    name: "SeamlessPlayer",
    desc: "Single-page responsive music audio player application utilizing Saavn public JSON APIs.",
    lang: "JavaScript",
    langColor: "bg-amber-400",
    stars: 8,
    forks: 2
  }
];

const Github: React.FC = () => {
  // Generate random contributor grid boxes for the mock heatmap (53 columns x 7 rows)
  const columns = 36; // reduced for visual balance on screens
  const rows = 7;
  
  const getActivityColor = (val: number) => {
    if (val === 0) return "bg-black/[0.04] dark:bg-white/[0.02] border-black/[0.01] dark:border-white/[0.01]";
    if (val === 1) return "bg-primary/15 dark:bg-primary/20 border-primary/10 dark:border-primary/10";
    if (val === 2) return "bg-primary/35 dark:bg-primary/45 border-primary/20 dark:border-primary/20";
    if (val === 3) return "bg-primary/60 dark:bg-primary/70 border-primary/30 dark:border-primary/30";
    return "bg-secondary border-secondary/40 shadow-[0_0_5px_rgba(6,182,212,0.4)]";
  };

  return (
    <section id="github" className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-primary tracking-widest uppercase mb-2 block"
          >
            06 / COMMUNITY METRICS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold"
          >
            GitHub Contributions & Activity
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contribution Grid Activity Heatmap */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-panel rounded-2xl p-6 border border-border-custom bg-card-custom"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-semibold text-foreground">Contribution History (Last 12 Months)</span>
                <a 
                  href="https://github.com/D-BayyaReddy" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs font-medium text-text-accent flex items-center gap-1 hover:underline"
                >
                  <span>View GitHub</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>

              {/* Heatmap Grid */}
              <div className="overflow-x-auto pb-2">
                <div className="flex flex-col gap-1 min-w-[500px]">
                  {Array.from({ length: rows }).map((_, rIdx) => (
                    <div key={rIdx} className="flex gap-1">
                      {Array.from({ length: columns }).map((_, cIdx) => {
                        // Deterministic random activity factor
                        const seed = (rIdx * 3 + cIdx * 7) % 7;
                        const activity = seed > 4 ? 0 : seed;
                        return (
                          <div
                            key={cIdx}
                            className={`w-3.5 h-3.5 rounded-sm border transition-all duration-300 hover:scale-125 ${getActivityColor(activity)}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-text-muted mt-4">
                <span>500+ commits in the past year</span>
                <div className="flex gap-1.5 items-center">
                  <span>Less</span>
                  <span className="w-2.5 h-2.5 rounded-sm bg-black/[0.04] dark:bg-white/[0.02] border border-black/[0.01] dark:border-white/[0.01]" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-primary/15 dark:bg-primary/20" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-primary/35 dark:bg-primary/45" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-primary/60 dark:bg-primary/70" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-secondary" />
                  <span>More</span>
                </div>
              </div>
            </motion.div>

            {/* Repos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredRepos.map((repo, idx) => (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="glass-panel rounded-2xl p-5 border border-border-custom bg-card-custom flex flex-col justify-between group hover:border-primary/20"
                >
                  <div>
                    <h3 className="font-bold text-sm text-foreground mb-1 group-hover:text-primary transition-colors flex items-center justify-between">
                      <span>{repo.name}</span>
                      <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-text-muted text-xs leading-relaxed mb-4">
                      {repo.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-text-muted font-mono">
                    <span className="flex items-center gap-1">
                      <Circle size={8} className={`${repo.langColor}`} />
                      {repo.lang}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Star size={10} />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <GitFork size={10} />
                      {repo.forks}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Code Stats Panel */}
          <div className="lg:col-span-4 flex flex-col gap-4 w-full">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-panel rounded-2xl p-6 border border-border-custom bg-card-custom"
            >
              <h3 className="text-sm font-bold mb-4 text-foreground">Language Distribution</h3>
              <div className="flex flex-col gap-3">
                {[
                  { name: "Python", pct: 45, color: "bg-yellow-500" },
                  { name: "JavaScript", pct: 25, color: "bg-amber-400" },
                  { name: "Dart / Flutter", pct: 15, color: "bg-cyan-400" },
                  { name: "C / C++", pct: 10, color: "bg-blue-500" },
                  { name: "Other", pct: 5, color: "bg-text-muted" }
                ].map((item) => (
                  <div key={item.name} className="flex flex-col gap-1">
                    <div className="flex justify-between text-[11px] text-text-muted">
                      <span>{item.name}</span>
                      <span>{item.pct}%</span>
                    </div>
                    <div className="w-full h-1 bg-black/35 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* General metrics */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-panel rounded-2xl p-6 border border-border-custom bg-card-custom flex flex-col gap-3"
            >
              <h3 className="text-sm font-bold text-foreground">Contribution Breakdown</h3>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-black/5 dark:bg-black/20 rounded-xl border border-border-custom/50">
                  <span className="text-xl font-extrabold text-foreground block">420+</span>
                  <span className="text-[10px] text-text-muted font-medium">Commits</span>
                </div>
                <div className="p-3 bg-black/5 dark:bg-black/20 rounded-xl border border-border-custom/50">
                  <span className="text-xl font-extrabold text-foreground block">12</span>
                  <span className="text-[10px] text-text-muted font-medium">Pull Requests</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Github;
