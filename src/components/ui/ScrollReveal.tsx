"use client";

import React, { useEffect, useRef, useState } from "react";

export type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "fade";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number; // delay in milliseconds
  duration?: number; // duration in milliseconds
  threshold?: number;
  rootMargin?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  className = "",
  style = {}
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Graceful fallback for SSR or environments without IntersectionObserver
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    // Respect user's accessibility motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Immediately unobserve so zero memory/CPU is consumed afterwards
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  // Initial hidden transform per animation type
  const getInitialTransform = () => {
    switch (animation) {
      case "fade-up":
        return "translate3d(0, 28px, 0)";
      case "fade-down":
        return "translate3d(0, -28px, 0)";
      case "fade-left":
        return "translate3d(-32px, 0, 0)";
      case "fade-right":
        return "translate3d(32px, 0, 0)";
      case "zoom-in":
        return "scale(0.94) translate3d(0, 16px, 0)";
      case "fade":
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  const dynamicStyle: React.CSSProperties = {
    ...style,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translate3d(0, 0, 0) scale(1)" : getInitialTransform(),
    transitionProperty: "opacity, transform",
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", // Natural deceleration curve
    willChange: isVisible ? "auto" : "opacity, transform"
  };

  return (
    <div ref={elementRef} className={className} style={dynamicStyle}>
      {children}
    </div>
  );
}
