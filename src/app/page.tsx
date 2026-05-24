"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Education from "@/sections/Education";
import Github from "@/sections/Github";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Spring-based smooth scroll progress indicator */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />
      
      {/* Header navbar navigation */}
      <Navbar />
      
      {/* Full Page Layout Wrapper */}
      <main className="flex-grow flex flex-col">
        {/* HERO SECTION */}
        <Hero />
        
        {/* ABOUT SECTION */}
        <About />
        
        {/* SKILLS SECTION */}
        <Skills />
        
        {/* PROJECTS SECTION */}
        <Projects />
        
        {/* EXPERIENCE SECTION */}
        <Experience />
        
        {/* EDUCATION SECTION */}
        <Education />
        
        {/* GITHUB METRICS SECTION */}
        <Github />
        
        {/* CONTACT SECTION */}
        <Contact />
      </main>
      
      {/* FOOTER */}
      <Footer />
    </>
  );
}
