"use client";

import React, { useEffect, useState, useRef } from "react";

const GlowCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const delayCursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  
  const ringElementRef = useRef<HTMLDivElement | null>(null);
  const dotElementRef = useRef<HTMLDivElement | null>(null);
  
  const isHiddenRef = useRef(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Disable on touch screen devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;

      // Bring cursor back on mouse movement
      if (isHiddenRef.current) {
        isHiddenRef.current = false;
        if (ringElementRef.current) ringElementRef.current.style.opacity = "1";
        if (dotElementRef.current) dotElementRef.current.style.opacity = "1";
      }

      // Check if user is focusing a text field (input / textarea)
      const activeEl = document.activeElement;
      const isTextField = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA');

      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }

      if (isTextField) {
        // If focused on an input, hide the cursor after 800ms of no movement
        hideTimerRef.current = setTimeout(() => {
          isHiddenRef.current = true;
          if (ringElementRef.current) ringElementRef.current.style.opacity = "0";
          if (dotElementRef.current) dotElementRef.current.style.opacity = "0";
        }, 800);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.interactive-cursor') ||
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA';
      
      setIsHovered(!!isInteractive);
    };

    // Hide cursor immediately when typing in a text field
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        isHiddenRef.current = true;
        if (ringElementRef.current) ringElementRef.current.style.opacity = "0";
        if (dotElementRef.current) dotElementRef.current.style.opacity = "0";
      }
    };

    // Hide cursor on focusin of text fields
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        isHiddenRef.current = true;
        if (ringElementRef.current) ringElementRef.current.style.opacity = "0";
        if (dotElementRef.current) dotElementRef.current.style.opacity = "0";
      }
    };

    // Re-show cursor when focusing out of text fields
    const handleFocusOut = () => {
      isHiddenRef.current = false;
      if (ringElementRef.current) ringElementRef.current.style.opacity = "1";
      if (dotElementRef.current) dotElementRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);

    let animationFrameId: number;

    const render = () => {
      // Interpolate position with delay for lag effect
      const dx = cursorRef.current.x - delayCursorRef.current.x;
      const dy = cursorRef.current.y - delayCursorRef.current.y;
      
      delayCursorRef.current.x += dx * 0.14;
      delayCursorRef.current.y += dy * 0.14;

      if (ringElementRef.current) {
        // Center the ring: ring is 36px wide (translate by x - 18, y - 18)
        ringElementRef.current.style.transform = `translate3d(${delayCursorRef.current.x - 18}px, ${delayCursorRef.current.y - 18}px, 0) scale(${isHovered ? 1.5 : 1})`;
      }
      
      if (dotElementRef.current) {
        // Center the dot: dot is 8px wide
        dotElementRef.current.style.transform = `translate3d(${cursorRef.current.x - 4}px, ${cursorRef.current.y - 4}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
      cancelAnimationFrame(animationFrameId);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isHovered]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Glowing Ring */}
      <div
        ref={ringElementRef}
        className="fixed top-0 left-0 w-9 h-9 border border-primary/45 rounded-full pointer-events-none z-[9999] transition-all duration-75 ease-out mix-blend-screen bg-primary/5 shadow-[0_0_15px_rgba(139,92,246,0.25)] transition-opacity duration-200"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          willChange: "transform, opacity",
          opacity: 1
        }}
      />
      {/* Inner Dot */}
      <div
        ref={dotElementRef}
        className="fixed top-0 left-0 w-2 h-2 bg-secondary rounded-full pointer-events-none z-[9999] transition-all duration-0 ease-out mix-blend-screen shadow-[0_0_8px_rgba(6,182,212,0.85)] transition-opacity duration-200"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          willChange: "transform, opacity",
          opacity: 1
        }}
      />
    </>
  );
};

export default GlowCursor;
