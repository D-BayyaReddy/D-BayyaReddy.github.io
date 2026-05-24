"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";

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
  { label: "Contact", href: "#contact" }
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Track active section on scroll
      const scrollPosition = window.scrollY + 120;
      const sections = navLinks.map(link => document.querySelector(link.href));
      
      sections.forEach(section => {
        if (!section) return;
        const top = (section as HTMLElement).offsetTop;
        const height = (section as HTMLElement).offsetHeight;
        const id = section.getAttribute("id") || "";

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-background/70 border-b border-border-custom backdrop-blur-md" 
          : "py-6 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="text-xl font-extrabold tracking-tight flex items-center">
          <span className="text-primary font-bold mr-1">&lt;</span>
          Bayya<span className="text-primary font-medium">.D</span>
          <span className="text-primary font-bold ml-1">/&gt;</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary relative py-1 ${
                activeSection === link.href.slice(1) 
                  ? "text-foreground font-semibold" 
                  : "text-text-muted"
              }`}
            >
              {link.label}
              {activeSection === link.href.slice(1) && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary rounded-full" />
              )}
            </a>
          ))}
        </nav>

        {/* Theme Toggle & Mobile Menu Controls */}
        <div className="flex items-center gap-4">
          {/* Theme Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-border-custom bg-card-custom hover:bg-hover-custom transition-all duration-200"
            aria-label="Toggle theme mode"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Contact Button */}
          <a
            href="#contact"
            className="hidden sm:inline-flex text-xs font-semibold px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-opacity duration-200 shadow-md shadow-primary/25"
          >
            Let's Talk
          </a>

          {/* Hamburger button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 md:hidden rounded-full border border-border-custom bg-card-custom hover:bg-hover-custom transition-all duration-200 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-[280px] bg-background/95 border-l border-border-custom backdrop-blur-xl z-40 p-8 flex flex-col justify-center gap-8 md:hidden transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full border border-border-custom"
        >
          <X size={17} />
        </button>
        <nav className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-medium transition-colors hover:text-primary ${
                activeSection === link.href.slice(1) ? "text-foreground font-semibold" : "text-text-muted"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          onClick={() => setIsOpen(false)}
          className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-md shadow-primary/25"
        >
          Let's Talk
        </a>
      </div>
    </header>
  );
};

export default Navbar;
