"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";

interface HistoryItem {
  type: "echo" | "output" | "error";
  text: string;
}

const Terminal: React.FC = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const terminalBodyRef = useRef<HTMLDivElement | null>(null);

  const commandResponses: Record<string, string> = {
    help: `Available commands:
  - <span class="text-primary font-bold">about</span>    : Learn about Bayya Reddy Danduri
  - <span class="text-primary font-bold">skills</span>   : Output core technology stack
  - <span class="text-primary font-bold">projects</span> : Details of SaaS & web projects
  - <span class="text-primary font-bold">contact</span>  : Email & social references
  - <span class="text-primary font-bold">clear</span>    : Wipe the terminal log history
  - <span class="text-primary font-bold">secret</span>   : Discover portfolio secrets`,
    about: `Bio:
  I'm Bayya Reddy Danduri, a software developer specializing in building
  scalable SaaS, automation systems, fitness-tech platforms, and clean client-side
  interfaces. I focus on writing robust, production-ready code with clean architecture.`,
    skills: `Technical Stack:
  - <span class="text-secondary font-bold">Languages:</span> Python, JavaScript, C, Java, Dart
  - <span class="text-secondary font-bold">Web Stacks:</span> React, Next.js, HTML5, CSS3, Tailwind
  - <span class="text-secondary font-bold">Backend/DB:</span> Flask, Node.js, Express, PostgreSQL, Firebase, SQLite
  - <span class="text-secondary font-bold">Creative:</span> Blender, Photoshop, Premiere Pro, After Effects`,
    projects: `Featured Projects:
  - <span class="text-primary font-bold">FitForgeStudio</span>: Multi-Tenant Gym SaaS (Flask, Postgres, Razorpay, Whatsapp)
  - <span class="text-primary font-bold">Seamless Player</span>: Streaming Application (HTML5, Tailwind, JS, API)
  - <span class="text-primary font-bold">Flutter E-Commerce</span>: Cross-platform store application (Firebase, Dart)`,
    contact: `Let's Build Something:
  - <span class="text-primary font-bold">Email</span>: bayyareddy.d@example.com
  - <span class="text-primary font-bold">GitHub</span>: github.com/D-BayyaReddy
  - <span class="text-primary font-bold">Location</span>: Bengaluru, India`,
    secret: `🔑 ACCESS GRANTED: SECRET UNLOCKED!
  Enjoy a celebratory shower of sparks! Keep building great software. 🚀`
  };

  useEffect(() => {
    // Add welcome message initially
    setHistory([
      { type: "output", text: "Welcome to the interactive portfolio sandbox! (v2.0.0)" },
      { type: "output", text: "Type 'help' in the prompt below or click any quick hotkey." }
    ]);
  }, []);

  useEffect(() => {
    // Scroll terminal to bottom
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const execCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const normalized = trimmed.toLowerCase();
    
    // Echo the command
    setHistory(prev => [...prev, { type: "echo", text: trimmed }]);

    if (normalized === "clear") {
      setHistory([]);
      return;
    }

    if (normalized === "secret") {
      // Trigger confetti!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.65 },
        colors: ["#8b5cf6", "#06b6d4", "#f472b6", "#fbbf24"]
      });
    }

    if (commandResponses.hasOwnProperty(normalized)) {
      setHistory(prev => [...prev, { type: "output", text: commandResponses[normalized] }]);
    } else {
      setHistory(prev => [
        ...prev, 
        { type: "error", text: `Command not found: "${trimmed}". Type 'help' for options.` }
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      execCommand(input);
      setInput("");
    }
  };

  return (
    <div className="w-full glass-panel rounded-xl overflow-hidden shadow-2xl border border-border-custom bg-card-custom">
      {/* Terminal Window Header Bar */}
      <div className="flex items-center justify-between bg-black/5 dark:bg-black/40 px-5 py-3 border-b border-border-custom">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 hover:opacity-85 cursor-pointer" />
          <span className="w-3 h-3 rounded-full bg-yellow-500 hover:opacity-85 cursor-pointer" />
          <span className="w-3 h-3 rounded-full bg-green-500 hover:opacity-85 cursor-pointer" />
        </div>
        <span className="text-xs font-mono text-text-muted select-none">bayya@portfolio: ~</span>
        <TerminalIcon size={14} className="text-text-muted" />
      </div>

      {/* Terminal Body Screen */}
      <div
        ref={terminalBodyRef}
        className="p-5 h-[340px] overflow-y-auto font-mono text-sm leading-relaxed flex flex-col gap-3 bg-[#020205]/90"
      >
        {history.map((item, idx) => (
          <div key={idx} className="whitespace-pre-wrap">
            {item.type === "echo" && (
              <span className="text-secondary font-bold">
                bayya@portfolio:~$ <span className="text-zinc-200 font-normal">{item.text}</span>
              </span>
            )}
            {item.type === "output" && (
              <div 
                className="text-zinc-300" 
                dangerouslySetInnerHTML={{ __html: item.text }} 
              />
            )}
            {item.type === "error" && (
              <span className="text-red-400 flex items-center gap-1">
                <AlertCircle size={14} /> {item.text}
              </span>
            )}
          </div>
        ))}
        {/* Active Line Prompt */}
        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border-custom/20">
          <span className="text-secondary font-bold select-none">bayya@portfolio:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command here..."
            className="flex-1 bg-transparent border-none outline-none text-white caret-secondary"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>

      {/* Hotkey Shortcuts Footer */}
      <div className="flex flex-wrap gap-2 px-5 py-3 bg-black/5 dark:bg-black/25 border-t border-border-custom/30 select-none">
        <span className="text-xs font-mono text-text-muted flex items-center">Quick Links:</span>
        {["about", "skills", "projects", "contact", "secret", "clear"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => execCommand(cmd)}
            className="text-xs font-mono px-3 py-1 rounded bg-black/5 dark:bg-white/5 border border-border-custom hover:border-primary hover:bg-primary/10 text-text-muted hover:text-foreground transition-all duration-200"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Terminal;
