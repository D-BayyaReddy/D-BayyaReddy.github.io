"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" }
];

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

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Track active sections using IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: "-35% 0px -50% 0px", // triggers when section dominates upper-middle viewport
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "pt-4 px-4 sm:px-6 md:px-8" 
          : "pt-6 px-6"
      }`}
    >
      <div 
        className={`mx-auto flex items-center justify-between transition-all duration-500 ease-in-out ${
          isScrolled 
            ? "max-w-5xl px-6 py-2.5 rounded-full bg-card-custom/80 border border-border-custom backdrop-blur-lg shadow-xl shadow-black/10 dark:shadow-black/30" 
            : "max-w-7xl px-0 py-0 bg-transparent border-transparent"
        }`}
      >
        {/* Logo */}
        <a href="#home" className="text-lg sm:text-xl font-extrabold tracking-tight flex items-center group text-foreground">
          <span className="text-primary font-bold mr-0.5 group-hover:-translate-x-0.5 transition-transform duration-300">&lt;</span>
          <span>Bayya</span>
          <span className="text-primary font-medium group-hover:scale-105 transition-transform duration-300">.D</span>
          <span className="text-primary font-bold ml-0.5 group-hover:translate-x-0.5 transition-transform duration-300">/&gt;</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-black/10 dark:bg-white/[0.02] p-0.5 rounded-full border border-border-custom/50">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.label}
                href={link.href}
                className={`text-[11px] lg:text-xs xl:text-sm font-semibold tracking-wide transition-colors duration-300 relative py-1.5 px-2.5 lg:px-3.5 rounded-full ${
                  isActive 
                    ? "text-primary dark:text-white" 
                    : "text-text-muted hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-primary/10 dark:bg-primary/25 border border-primary/25 dark:border-primary/30 rounded-full z-[-1]"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Menu Controls */}
        <div className="flex items-center gap-3">
          {/* Contact Button */}
          <a
            href="#contact"
            className="hidden sm:inline-flex text-xs font-semibold px-4.5 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-95 active:scale-95 transition-all duration-200 shadow-md shadow-primary/20"
          >
            Let's Talk
          </a>

          {/* Hamburger button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 md:hidden rounded-full border border-border-custom bg-card-custom hover:bg-hover-custom transition-all duration-200 text-foreground cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-[290px] bg-background/95 border-l border-border-custom backdrop-blur-xl z-50 p-8 flex flex-col justify-between md:hidden transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-text-muted tracking-wider">NAVIGATION</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full border border-border-custom hover:bg-hover-custom transition-all text-foreground cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Links List */}
        <nav className="flex flex-col gap-4.5 my-auto">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-base font-semibold tracking-wide transition-colors flex items-center justify-between group ${
                  isActive ? "text-primary" : "text-text-muted hover:text-foreground"
                }`}
              >
                <span>{link.label}</span>
                <span className={`w-1.5 h-1.5 rounded-full bg-primary transition-all duration-300 ${
                  isActive ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-50"
                }`} />
              </a>
            );
          })}
        </nav>

        {/* Drawer Footer */}
        <div className="flex flex-col gap-5 border-t border-border-custom pt-6">
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="w-full text-center py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold shadow-md shadow-primary/20"
          >
            Let's Talk
          </a>
          
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://github.com/D-BayyaReddy"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-border-custom bg-card-custom text-text-muted hover:text-foreground hover:border-primary transition-all duration-200"
              aria-label="GitHub Account"
            >
              <GithubIcon className="w-[14px] h-[14px]" />
            </a>
            <a
              href="https://linkedin.com/in/bayyareddydanduri"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-border-custom bg-card-custom text-text-muted hover:text-foreground hover:border-primary transition-all duration-200"
              aria-label="LinkedIn Account"
            >
              <LinkedinIcon className="w-[14px] h-[14px]" />
            </a>
            <a
              href="mailto:bayyareddydanduri@gmail.com"
              className="p-2 rounded-full border border-border-custom bg-card-custom text-text-muted hover:text-foreground hover:border-primary transition-all duration-200"
              aria-label="Email Contact"
            >
              <Mail size={14} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
