"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import CanvasBackground from "@/components/CanvasBackground";

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

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Import Hero3D dynamically to prevent SSR hydration errors
const Hero3D = dynamic(() => import("@/components/Hero3D"), { ssr: false });

const Hero: React.FC = () => {
  const roles = ["Software Engineer", "Full-Stack Developer", "Fitness Tech Builder"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentRole = roles[roleIndex];

    const type = () => {
      if (isDeleting) {
        setTypedText(currentRole.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      } else {
        setTypedText(currentRole.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 === currentRole.length) {
          setIsDeleting(true);
          // Wait before starting backspace
          timer = setTimeout(type, 1800);
          return;
        }
      }
      
      const speed = isDeleting ? 45 : 90;
      timer = setTimeout(type, speed);
    };

    timer = setTimeout(type, 1000);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <section 
      id="home" 
      className="min-h-screen relative flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* Background Interactive canvas particles */}
      <CanvasBackground />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left side: content */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full border border-primary/25 bg-primary/5 text-text-accent text-xs font-semibold mb-6 shadow-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
            Open for freelance & innovative collaborations
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none mb-4"
          >
            Hi, I'm <span className="bg-gradient-to-r from-white via-primary to-secondary bg-clip-text text-transparent drop-shadow-sm select-text font-black">Bayya Reddy</span>
          </motion.h1>

          {/* Subtitle / Typing animation */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-text-muted h-10 flex items-center"
          >
            I am a&nbsp;
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold">
              {typedText}
            </span>
            <span className="w-[3px] h-6 sm:h-8 bg-secondary ml-1 animate-pulse" />
          </motion.h2>

          {/* Short Bio info */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-base sm:text-lg text-text-muted max-w-lg mb-8 leading-relaxed"
          >
            Building high-performance SaaS engines, interactive client web interfaces, and fitness automation platforms with premium coding standards.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 items-center mb-10 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto text-sm font-semibold inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>Explore Projects</span>
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto text-sm font-semibold inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-border-custom bg-card-custom hover:bg-hover-custom hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>Contact Me</span>
              <Mail size={16} />
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center gap-4.5"
          >
            <a
              href="https://github.com/D-BayyaReddy"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border-custom bg-card-custom text-text-muted hover:text-foreground hover:border-primary transition-all duration-200"
              aria-label="GitHub Account"
            >
              <GithubIcon className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://linkedin.com/in/bayyareddydanduri"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border-custom bg-card-custom text-text-muted hover:text-foreground hover:border-primary transition-all duration-200"
              aria-label="LinkedIn Account"
            >
              <LinkedinIcon className="w-[18px] h-[18px]" />
            </a>
            <a
              href="mailto:bayyareddydanduri@gmail.com"
              className="p-3 rounded-full border border-border-custom bg-card-custom text-text-muted hover:text-foreground hover:border-primary transition-all duration-200"
              aria-label="Email Contact"
            >
              <Mail size={18} />
            </a>
          </motion.div>
        </div>

        {/* Right side: 3D Object */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 flex items-center justify-center"
        >
          <Hero3D />
        </motion.div>
      </div>

      {/* Decorative mouse scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-10 pointer-events-none select-none">
        <div className="w-6 h-10 border border-text-muted rounded-full relative flex justify-center py-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1.5 h-2 bg-primary rounded-full"
          />
        </div>
        <span className="text-[10px] tracking-widest font-mono text-text-muted">SCROLL</span>
      </div>
    </section>
  );
};

export default Hero;
