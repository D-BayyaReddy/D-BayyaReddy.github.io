"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";

const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let ambientParticles: AmbientParticle[] = [];
    let sparks: Spark[] = [];
    const maxAmbient = 60;

    let mouse = {
      x: null as number | null,
      y: null as number | null,
      lastX: null as number | null,
      lastY: null as number | null,
      radius: 150, // Gravity pull field radius
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (mouse.lastX !== null && mouse.lastY !== null && mouse.x !== null && mouse.y !== null) {
        const deltaX = mouse.x - mouse.lastX;
        const deltaY = mouse.y - mouse.lastY;
        const movement = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Spawn sparks if mouse moves fast enough
        const spawnCount = Math.min(2, Math.max(1, Math.floor(movement / 12)));
        for (let i = 0; i < spawnCount; i++) {
          sparks.push(new Spark(mouse.x, mouse.y, theme));
        }
      }
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
      mouse.lastX = null;
      mouse.lastY = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    class AmbientParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      alpha: number;
      alphaSpeed: number;
      grow: boolean;
      colorRGB: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 0.6;
        this.baseAlpha = theme === "dark" 
          ? Math.random() * 0.2 + 0.1 
          : Math.random() * 0.08 + 0.03;
        this.alpha = this.baseAlpha;
        this.alphaSpeed = 0.003 + Math.random() * 0.005;
        this.grow = true;

        // Violet and cyan themes
        const colors = theme === "dark" 
          ? ["139, 92, 246", "6, 182, 212", "167, 139, 250"]
          : ["109, 40, 217", "8, 145, 178", "124, 58, 237"];
        this.colorRGB = colors[Math.floor(Math.random() * colors.length)];
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.colorRGB}, ${this.alpha})`;
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap boundaries
        if (this.x < -10) this.x = canvas!.width + 10;
        if (this.x > canvas!.width + 10) this.x = -10;
        if (this.y < -10) this.y = canvas!.height + 10;
        if (this.y > canvas!.height + 10) this.y = -10;

        // Alpha pulses
        if (this.grow) {
          this.alpha += this.alphaSpeed;
          if (this.alpha >= this.baseAlpha + 0.2) this.grow = false;
        } else {
          this.alpha -= this.alphaSpeed;
          if (this.alpha <= this.baseAlpha) this.grow = true;
        }

        // Gravity pull toward cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x += (dx / dist) * force * 0.35;
            this.y += (dy / dist) * force * 0.35;
            this.alpha = Math.min(this.alpha + 0.03, theme === "dark" ? 0.7 : 0.25);
          }
        }
      }
    }

    class Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      decay: number;
      colorBase: string;

      constructor(startX: number, startY: number, currentTheme: string) {
        this.x = startX;
        this.y = startY;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.3;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 0.15;
        this.size = Math.random() * 2.5 + 1.2;
        this.life = 1.0;
        this.decay = 0.012 + Math.random() * 0.018;

        const colors = currentTheme === "dark"
          ? [
              "rgba(139, 92, 246, ", // Violet
              "rgba(6, 182, 212, ",  // Cyan
              "rgba(244, 114, 182, ", // Pink
              "rgba(253, 224, 71, ", // Gold
            ]
          : [
              "rgba(109, 40, 217, ", // Violet
              "rgba(8, 145, 178, ",  // Cyan
              "rgba(219, 39, 119, ", // Pink
              "rgba(202, 138, 4, ",  // Gold
            ];
        this.colorBase = colors[Math.floor(Math.random() * colors.length)];
      }

      draw() {
        if (!ctx || this.life <= 0) return;
        const radius = Math.max(0, this.size * this.life);
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.colorBase}${Math.max(0, this.life)})`;
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.012; // simulated gravity pull downwards
        this.life -= this.decay;
      }
    }

    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ambientParticles = [];
      sparks = [];
      for (let i = 0; i < maxAmbient; i++) {
        ambientParticles.push(new AmbientParticle());
      }
    };

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(initCanvas, 150);
    };

    window.addEventListener("resize", handleResize);
    initCanvas();

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render background stars
      ambientParticles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Update and filter active sparks
      sparks = sparks.filter((s) => s.life > 0);
      sparks.forEach((s) => {
        s.update();
        s.draw();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} id="particles-canvas" className="pointer-events-none" />;
};

export default CanvasBackground;
