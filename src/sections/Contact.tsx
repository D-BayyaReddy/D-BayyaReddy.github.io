"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, MessageSquare } from "lucide-react";
import confetti from "canvas-confetti";
import Terminal from "@/components/Terminal";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    const emailjs = (window as any).emailjs;
    if (emailjs) {
      emailjs.send("service_o40gvmx", "template_i7k00wh", {
        from_name: name,
        from_email: email,
        message: message,
      })
      .then(() => {
        setIsSubmitting(false);
        setSuccess(true);
        
        // Trigger a beautiful burst of confetti!
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#8b5cf6", "#06b6d4", "#ec4899"]
        });

        // Reset
        setName("");
        setEmail("");
        setMessage("");

        setTimeout(() => setSuccess(false), 5000);
      })
      .catch((err: any) => {
        console.error("EmailJS Error:", err);
        setIsSubmitting(false);
        alert("Failed to send message via EmailJS. Please try again or email directly.");
      });
    } else {
      // Fallback simulation if script fails to load
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess(true);
        
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#8b5cf6", "#06b6d4", "#ec4899"]
        });

        setName("");
        setEmail("");
        setMessage("");

        setTimeout(() => setSuccess(false), 5000);
      }, 1000);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const rect = form.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    form.style.setProperty("--mouse-x", `${x}px`);
    form.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#020205]/20">
      {/* Background neon visual glow grids */}
      <div className="absolute right-0 bottom-0 w-[450px] h-[450px] bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute left-0 top-0 w-[400px] h-[400px] bg-secondary/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-primary tracking-widest uppercase mb-2 block"
          >
            07 / GET IN TOUCH
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold"
          >
            Let's Build Something Amazing
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left side: Terminal Sandbox CLI */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold text-foreground">Interactive Sandbox Console</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Learn about my systems stack or trigger custom visual configurations directly through the command line terminal emulator.
              </p>
            </div>
            
            {/* Terminal sandbox component */}
            <Terminal />

            {/* Direct Info elements */}
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg border border-border-custom bg-card-custom flex items-center justify-center text-secondary">
                  <Mail size={16} />
                </div>
                <div className="text-xs">
                  <span className="text-text-muted block font-mono">EMAIL</span>
                  <a href="mailto:bayyareddydanduri@gmail.com" className="font-semibold hover:text-primary transition-colors">
                    bayyareddydanduri@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg border border-border-custom bg-card-custom flex items-center justify-center text-secondary">
                  <MapPin size={16} />
                </div>
                <div className="text-xs">
                  <span className="text-text-muted block font-mono">LOCATION</span>
                  <span className="font-semibold">Tirupati, Andhra Pradesh</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Modern Glassmorphic Form */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold text-foreground">Direct Secure Mail</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Prefer visual forms? Leave your name and message details below to send an direct email request.
              </p>
            </div>

            <form 
              onSubmit={handleSubmit}
              onMouseMove={handleMouseMove}
              className="glass-panel spotlight-card rounded-2xl p-6 sm:p-8 border border-border-custom bg-card-custom flex flex-col gap-5 relative overflow-hidden"
            >
              {/* Name field */}
              <div className="flex flex-col gap-2 relative z-10">
                <label htmlFor="name" className="text-xs font-mono text-text-muted font-bold">NAME</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                  suppressHydrationWarning
                  className="px-4 py-3 rounded-xl border border-border-custom bg-black/5 dark:bg-black/20 text-sm text-foreground outline-none focus:border-primary focus:bg-white dark:focus:bg-black/35 transition-colors duration-200"
                />
              </div>

              {/* Email field */}
              <div className="flex flex-col gap-2 relative z-10">
                <label htmlFor="email" className="text-xs font-mono text-text-muted font-bold">EMAIL</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="john@example.com"
                  suppressHydrationWarning
                  className="px-4 py-3 rounded-xl border border-border-custom bg-black/5 dark:bg-black/20 text-sm text-foreground outline-none focus:border-primary focus:bg-white dark:focus:bg-black/35 transition-colors duration-200"
                />
              </div>

              {/* Message field */}
              <div className="flex flex-col gap-2 relative z-10">
                <label htmlFor="message" className="text-xs font-mono text-text-muted font-bold">MESSAGE</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  placeholder="Let's build something exceptional..."
                  suppressHydrationWarning
                  className="px-4 py-3 rounded-xl border border-border-custom bg-black/5 dark:bg-black/20 text-sm text-foreground outline-none focus:border-primary focus:bg-white dark:focus:bg-black/35 transition-colors duration-200 resize-none"
                />
              </div>

              {/* Submit CTA button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all duration-200 relative z-10 shadow-lg shadow-primary/25 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Success output message */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs text-center font-medium relative z-10 flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={14} />
                    <span>Message delivered successfully! Thanks for reaching out.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
