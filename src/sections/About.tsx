"use client";

import React from "react";
import { motion } from "framer-motion";
import { Server, Layers, Smartphone, Cpu } from "lucide-react";

interface StatItem {
  number: string;
  label: string;
}

const stats: StatItem[] = [
  { number: "3+", label: "Years Programming" },
  { number: "10+", label: "Projects Completed" },
  { number: "99.9%", label: "System Uptime focus" },
  { number: "24/7", label: "Dev Mindset" }
];

interface PillarItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const About: React.FC = () => {
  const pillars: PillarItem[] = [
    {
      icon: <Layers className="text-primary" size={22} />,
      title: "SaaS Architecture",
      desc: "Architecting multi-tenant databases, isolated schema platforms, and robust microservices."
    },
    {
      icon: <Server className="text-secondary" size={22} />,
      title: "API Development",
      desc: "Creating lightweight RESTful controllers, payload schemas, and granular authorization models."
    },
    {
      icon: <Smartphone className="text-primary" size={22} />,
      title: "Cross-Platform Mobile",
      desc: "Assembling reactive apps with Flutter, responsive hooks, and offline data sync mechanisms."
    },
    {
      icon: <Cpu className="text-secondary" size={22} />,
      title: "Performance Optimization",
      desc: "Tuning query execution, caching pipelines, and reducing load triggers for sub-second render."
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#020205]/20">
      {/* Decorative background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:100%_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-primary tracking-widest uppercase mb-2 block"
          >
            01 / DESIGN PHILOSOPHY
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold"
          >
            Core Competencies & Strategy
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bio & Stat Counters */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-2xl p-8 border border-border-custom bg-card-custom relative"
            >
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-text-muted bg-clip-text text-transparent">
                Software Engineer & SaaS Builder
              </h3>
              <p className="text-text-muted leading-relaxed text-base mb-6">
                Detail-oriented Software Engineer and Full-Stack Developer with strong foundations in Python, JavaScript, Flask, React, Flutter, and SaaS architecture. Passionate about building scalable applications, automation systems, fitness-tech platforms, and visually engaging user experiences.
              </p>
              <p className="text-text-muted leading-relaxed text-base">
                I focus on writing clean, modular code following SOLID principles, establishing automated CI/CD configurations, and creating interfaces that deliver absolute visual satisfaction.
              </p>
            </motion.div>

            {/* Experience Counters Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-panel rounded-xl p-5 text-center border border-border-custom bg-card-custom hover:scale-[1.02] transition-transform duration-200"
                >
                  <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block mb-1">
                    {stat.number}
                  </span>
                  <span className="text-xs font-medium text-text-muted tracking-wider uppercase">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Architectural Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel rounded-2xl p-6 border border-border-custom bg-card-custom flex flex-col gap-4 relative group hover:border-primary/35"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/20">
                  {pillar.icon}
                </div>
                <div>
                  <h4 className="font-bold text-base mb-1 text-foreground">
                    {pillar.title}
                  </h4>
                  <p className="text-text-muted text-xs leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
