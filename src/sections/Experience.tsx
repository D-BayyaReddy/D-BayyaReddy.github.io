"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";

interface TimelineItem {
  role: string;
  company: string;
  period: string;
  desc: string[];
}

const experienceList: TimelineItem[] = [
  {
    role: "Engineering Intern",
    company: "APGENCO (Andhra Pradesh Power Generation Corporation)",
    period: "2024 - 2025",
    desc: [
      "Assisted senior engineers on turbine mechanics and thermal diagnostics operations.",
      "Analyzed plant automation controllers, documenting feedback logic and telemetry parameters.",
      "Conducted structural safety compliance reviews and reporting logs.",
      "Collaborated across multidisciplinary teams resolving production workflow bottlenecks."
    ]
  }
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-primary tracking-widest uppercase mb-2 block"
          >
            04 / CAREER HISTORY
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold"
          >
            Professional Experience
          </motion.h2>
        </div>

        {/* Timeline Visual Container */}
        <div className="relative border-l border-border-custom pl-6 sm:pl-8 ml-4">
          {experienceList.map((item, idx) => (
            <div key={idx} className="relative mb-12 last:mb-0">
              {/* Floating dot indicator */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/25 z-10"
              >
                <Briefcase size={10} className="text-primary" />
              </motion.div>

              {/* Career details card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-panel rounded-2xl p-6 sm:p-8 border border-border-custom bg-card-custom hover:border-primary/25 relative"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{item.role}</h3>
                    <h4 className="text-sm font-semibold text-text-accent">{item.company}</h4>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-border-custom text-text-muted text-xs font-medium font-mono shrink-0 self-start sm:self-center">
                    <Calendar size={12} />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Achievements List */}
                <ul className="flex flex-col gap-3">
                  {item.desc.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex gap-3 items-start text-sm text-text-muted leading-relaxed">
                      <CheckCircle2 size={15} className="text-secondary shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
