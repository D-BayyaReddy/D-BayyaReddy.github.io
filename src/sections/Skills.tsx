"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Layout, Database, Smartphone, Wrench, Palette } from "lucide-react";

interface SkillItem {
  name: string;
  level: number; // percentage
  category: "programming" | "frontend" | "backend" | "mobile" | "dev-tools" | "creative";
}

const skillsList: SkillItem[] = [
  // Programming
  { name: "Python", level: 90, category: "programming" },
  { name: "JavaScript", level: 85, category: "programming" },
  { name: "C", level: 75, category: "programming" },
  { name: "Java", level: 70, category: "programming" },
  // Frontend
  { name: "React / Next.js", level: 85, category: "frontend" },
  { name: "HTML5 / CSS3", level: 95, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  // Backend
  { name: "Flask & APIs", level: 88, category: "backend" },
  { name: "Authentication / JWT", level: 80, category: "backend" },
  { name: "Database Design", level: 82, category: "backend" },
  // Mobile
  { name: "Flutter", level: 78, category: "mobile" },
  { name: "Firebase Integration", level: 80, category: "mobile" },
  // Dev Tools
  { name: "Git & Versioning", level: 90, category: "dev-tools" },
  { name: "Docker Containers", level: 75, category: "dev-tools" },
  { name: "PostgreSQL", level: 80, category: "dev-tools" },
  { name: "SQLite", level: 85, category: "dev-tools" },
  // Creative
  { name: "Blender 3D", level: 70, category: "creative" },
  { name: "Photoshop / After Effects", level: 80, category: "creative" },
  { name: "Premiere Pro / Premiere", level: 85, category: "creative" },
  { name: "AutoCAD / SolidWorks", level: 75, category: "creative" }
];

interface Category {
  id: "all" | SkillItem["category"];
  label: string;
  icon: React.ReactNode;
}

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category["id"]>("all");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const categories: Category[] = [
    { id: "all", label: "All Stacks", icon: <Code size={14} /> },
    { id: "programming", label: "Programming", icon: <Code size={14} /> },
    { id: "frontend", label: "Frontend", icon: <Layout size={14} /> },
    { id: "backend", label: "Backend", icon: <Database size={14} /> },
    { id: "mobile", label: "Mobile", icon: <Smartphone size={14} /> },
    { id: "dev-tools", label: "Dev Tools", icon: <Wrench size={14} /> },
    { id: "creative", label: "Creative", icon: <Palette size={14} /> }
  ];

  const filteredSkills = activeCategory === "all"
    ? skillsList
    : skillsList.filter(skill => skill.category === activeCategory);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-primary tracking-widest uppercase mb-2 block"
          >
            02 / TECH STACK
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold"
          >
            Languages, Tools & Frameworks
          </motion.h2>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-full border transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-primary/15 to-secondary/15 border-primary text-foreground shadow-sm shadow-primary/10"
                  : "bg-card-custom border-border-custom text-text-muted hover:text-foreground hover:bg-hover-custom"
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div 
          ref={containerRef}
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onMouseMove={handleMouseMove}
                className="glass-panel spotlight-card rounded-2xl p-6 border border-border-custom bg-card-custom flex flex-col gap-4 relative group overflow-hidden"
              >
                <div className="flex justify-between items-center z-10 relative">
                  <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors duration-200">
                    {skill.name}
                  </span>
                  <span className="font-mono text-xs text-text-muted">
                    {skill.level}%
                  </span>
                </div>

                {/* Animated Level Bar */}
                <div className="w-full h-1.5 bg-black/25 rounded-full overflow-hidden z-10 relative">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
