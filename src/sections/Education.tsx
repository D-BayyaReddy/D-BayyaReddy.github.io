"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";

interface EducationItem {
  degree: string;
  institution: string;
  score: string;
  period: string;
}

const educationList: EducationItem[] = [
  {
    degree: "Bachelor of Technology (B.Tech)",
    institution: "Sree Vidyanikethan Engineering College",
    score: "CGPA: 6.7",
    period: "Class of 2025"
  },
  {
    degree: "Intermediate Board",
    institution: "Sri Chaitanya Jr College",
    score: "CGPA: 7.7",
    period: "2019 - 2021"
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Sri Chaitanya Techno School",
    score: "CGPA: 8.0 / 10",
    period: "Class of 2019"
  }
];

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-[#020205]/20">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-primary tracking-widest uppercase mb-2 block"
          >
            05 / ACADEMIC RECORD
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold"
          >
            Education Timeline
          </motion.h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-border-custom pl-6 sm:pl-8 ml-4">
          {educationList.map((item, idx) => (
            <div key={idx} className="relative mb-12 last:mb-0">
              {/* Timeline Floating Circle Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-background border-2 border-secondary flex items-center justify-center shadow-lg shadow-secondary/25 z-10"
              >
                <GraduationCap size={10} className="text-secondary" />
              </motion.div>

              {/* Education details card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-panel rounded-2xl p-6 border border-border-custom bg-card-custom hover:border-secondary/25 relative"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{item.degree}</h3>
                    <h4 className="text-sm font-semibold text-text-muted">{item.institution}</h4>
                  </div>
                  <div className="flex flex-row sm:flex-col items-start sm:items-end gap-3 sm:gap-1 mt-2 sm:mt-0">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-text-accent px-2 py-0.5 rounded bg-secondary/5 border border-secondary/20">
                      {item.score}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-mono text-text-muted">
                      <Calendar size={10} />
                      {item.period}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
