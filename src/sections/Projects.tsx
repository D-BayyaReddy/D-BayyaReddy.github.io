"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, BookOpen, X, CheckCircle, Server, Eye } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Project {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  github?: string;
  live?: string;
  accent: string; // colors like violet/cyan for visual borders
  icon: string; // represent tech category
  features: string[];
  mockupTitle: string;
  mockupLines: string[];
}

const projectsList: Project[] = [
  {
    id: "fitforge",
    title: "FitForgeStudio",
    subtitle: "Multi-Tenant Gym Management SaaS",
    desc: "A production-grade multi-tenant SaaS platform featuring database isolation per tenant, role-based controls, payment collections, and automated notification services.",
    tags: ["Python", "Flask", "PostgreSQL", "Razorpay API", "APScheduler", "Git"],
    github: "https://github.com/D-BayyaReddy/FitForgeStudio",
    live: "#",
    accent: "from-violet-600 to-indigo-600",
    icon: "database",
    features: [
      "Dynamic database schema isolation per gym tenant.",
      "Razorpay API webhooks parsing client checkout receipts.",
      "APScheduler handling cron triggers for automated WhatsApp invoice reminders.",
      "Role-Based Access Control (Admin, Trainer, Gym Member).",
      "Trainer payout calculations and attendance logs."
    ],
    mockupTitle: "FitForge SaaS Engine",
    mockupLines: [
      "[INFO] Booting FitForge Database Pool Coordinator...",
      "[DB] Connected to schema tenant_048a (Apex Gym)...",
      "[CRON] Running daily WhatsApp reminder schedule...",
      "[Razorpay] Webhook verification signature: VALID.",
      "[API] GET /api/v1/tenant_048a/payouts - 200 OK (14ms)"
    ]
  },
  {
    id: "musicplayer",
    title: "Seamless Music Player",
    subtitle: "Single-Page Audio Streaming Web App",
    desc: "A fast, single-page application integrating Saavn public streaming endpoints, real-time media query fetches, audio buffer playback, and a smooth glassy user interface.",
    tags: ["HTML5", "Tailwind CSS", "JavaScript", "Saavn API"],
    github: "https://github.com/D-BayyaReddy/SeamlessPlayer",
    live: "#",
    accent: "from-cyan-500 to-teal-500",
    icon: "music",
    features: [
      "Direct API integration with real-time audio streaming source.",
      "Dynamic playlist creation, shuffle, and repeat play modes.",
      "Full responsive controls leveraging vanilla HTML5 media elements.",
      "Glassmorphic design with animated background blur reacting to song artwork."
    ],
    mockupTitle: "Seamless Player API Controller",
    mockupLines: [
      "[FETCH] Querying Saavn endpoint for payload: 'A.R. Rahman'...",
      "[MEDIA] Buffered media source segments successfully.",
      "[UI] Drawing CSS backdrop-filter artwork palette...",
      "[AUDIO] Playing audio track index 04 at 320kbps buffer."
    ]
  },
  {
    id: "flutterstore",
    title: "Flutter E-Commerce App",
    subtitle: "Cross-Platform Retail Engine",
    desc: "A cross-platform mobile retail store designed following Clean Architecture rules, full Test-Driven Development (TDD) workflow, and Firestore real-time sync databases.",
    tags: ["Flutter", "Firebase Store", "Dart", "Clean Architecture", "TDD"],
    github: "https://github.com/D-BayyaReddy/FlutterEcom",
    live: "#",
    accent: "from-pink-500 to-rose-500",
    icon: "smartphone",
    features: [
      "Clean Architecture patterns decoupling domain, data, and UI presentation layers.",
      "Robust client-side state handling utilizing BLoC patterns.",
      "Real-time product inventory updates synced directly through Firebase streams.",
      "Comprehensive unit and integration test coverage."
    ],
    mockupTitle: "Dart Flutter Debug Logs",
    mockupLines: [
      "I/flutter ( 4235): [BLOC] Transition: OrderStarted -> OrderLoading",
      "I/flutter ( 4235): [FIREBASE] Syncing streams path: /products/electronics",
      "I/flutter ( 4235): [TEST] Executing test spec: 'fetchProducts succeeds' - PASSED",
      "I/flutter ( 4235): Device viewport pixel ratio configured."
    ]
  },
  {
    id: "beatx",
    title: "BeatX",
    subtitle: "Premium UI Ad-Free Music Player",
    desc: "A premium music player application designed with a focus on immersive visuals, a glassmorphic UI, and an ad-free user listening experience.",
    tags: ["HTML5", "CSS3", "JavaScript", "GSAP", "Tailwind CSS"],
    github: "https://github.com/D-BayyaReddy/SeamlessPlayer",
    live: "/projects/beatx.html",
    accent: "from-blue-500 to-cyan-500",
    icon: "music",
    features: [
      "Premium ad-free audio streaming and local playback experience.",
      "Stunning adaptive glassmorphic UI matching album artwork palette.",
      "Immersive 'Now Playing' visualizer with synchronized lyrics support.",
      "Available for download on Windows, macOS, and Linux platforms."
    ],
    mockupTitle: "BeatX Client Engine",
    mockupLines: [
      "[SYSTEM] Loading BeatX Core Interface...",
      "[THEME] Initializing glassmorphic shader palette...",
      "[AD-BLOCK] Ad-free shield initialized successfully.",
      "[PLAYBACK] Buffering high-quality audio stream (320kbps)...",
      "[UI] Rendered responsive viewport layout."
    ]
  }
];

const Projects: React.FC = () => {
  const [selectedProj, setSelectedProj] = useState<Project | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#020205]/20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-primary tracking-widest uppercase mb-2 block"
          >
            03 / SELECTED WORKS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold"
          >
            Featured Engineering Projects
          </motion.h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsList.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onMouseMove={handleMouseMove}
              className="glass-panel spotlight-card rounded-2xl border border-border-custom bg-card-custom overflow-hidden flex flex-col h-full hover:-translate-y-1.5 transition-all duration-300 group"
            >
              {/* Virtual Browser Window Simulation / Mockup */}
              <div className="bg-black/5 dark:bg-black/35 px-4.5 py-3 border-b border-border-custom flex items-center justify-between select-none">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <span className="text-[10px] font-mono text-text-muted">{project.mockupTitle}</span>
                <span className="w-5" />
              </div>

              {/* Mockup console logs body */}
              <div className="p-4 bg-[#010103]/85 h-44 overflow-hidden font-mono text-[10px] leading-relaxed text-emerald-400/85 flex flex-col gap-1.5 border-b border-border-custom">
                {project.mockupLines.map((line, lIdx) => (
                  <div key={lIdx} className="truncate">{line}</div>
                ))}
                <div className="animate-pulse text-white mt-auto">_ cursor active</div>
              </div>

              {/* Project content */}
              <div className="p-6 flex flex-col flex-1 gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-border-custom text-text-muted">
                      {tag}
                    </span>
                  ))}
                </div>

                <div>
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  <h4 className="text-xs text-text-accent font-semibold mb-2">
                    {project.subtitle}
                  </h4>
                  <p className="text-text-muted text-xs leading-relaxed">
                    {project.desc}
                  </p>
                </div>

                {/* Footer buttons */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-custom/30 z-10 relative">
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-foreground transition-colors duration-200"
                        title="GitHub Code"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        className="text-text-muted hover:text-foreground transition-colors duration-200"
                        title="Live Site"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                  
                  {/* Case Study Details Trigger Button */}
                  <button
                    onClick={() => setSelectedProj(project)}
                    className="text-xs font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-text-accent hover:bg-primary/20 transition-all duration-200 cursor-pointer"
                  >
                    <BookOpen size={12} />
                    <span>Case Study</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal popup overlay */}
      <AnimatePresence>
        {selectedProj && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/75 backdrop-blur-sm">
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-2xl rounded-2xl border border-border-custom bg-card-custom glass-panel overflow-hidden shadow-2xl relative"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-4 bg-black/30 border-b border-border-custom">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{selectedProj.title}</h3>
                  <span className="text-xs text-text-accent font-medium">{selectedProj.subtitle}</span>
                </div>
                <button
                  onClick={() => setSelectedProj(null)}
                  className="p-1.5 rounded-full border border-border-custom bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Modal body */}
              <div className="p-6 overflow-y-auto max-h-[70vh] flex flex-col gap-6">
                {/* Description */}
                <div>
                  <h4 className="text-xs font-mono tracking-wider text-primary uppercase mb-2">Overview</h4>
                  <p className="text-text-muted text-sm leading-relaxed">{selectedProj.desc}</p>
                </div>

                {/* Technical Features list */}
                <div>
                  <h4 className="text-xs font-mono tracking-wider text-primary uppercase mb-3">Key Features & Metrics</h4>
                  <ul className="flex flex-col gap-2.5">
                    {selectedProj.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex gap-2.5 items-start text-xs text-text-muted leading-relaxed">
                        <CheckCircle size={14} className="text-secondary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Architecture stack badges */}
                <div>
                  <h4 className="text-xs font-mono tracking-wider text-primary uppercase mb-2.5">Engineering Architecture</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProj.tags.map(tag => (
                      <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-border-custom text-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal footer CTAs */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 bg-black/5 dark:bg-black/20 border-t border-border-custom/50">
                {selectedProj.github && (
                  <a
                    href={selectedProj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl border border-border-custom bg-card-custom hover:bg-hover-custom transition-all"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub Repo</span>
                  </a>
                )}
                {selectedProj.live && (
                  <a
                    href={selectedProj.live}
                    className="text-xs font-semibold inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-all shadow-md shadow-primary/20"
                  >
                    <Eye size={14} />
                    <span>Live Preview</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
