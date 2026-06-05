import { useEffect, useRef } from "react";

interface Particle {
  el: HTMLDivElement;
}

export function useParticles(count = 40) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      const size = Math.random() * 4 + 2;
      const duration = Math.random() * 10 + 5;
      const delay = Math.random() * 5;

      el.className = "absolute rounded-full pointer-events-none";
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.background = "#FFE088";
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100 + 100}%`;
      el.style.animation = `float ${duration}s linear ${delay}s infinite`;
      el.style.opacity = `${Math.random() * 0.5 + 0.2}`;

      container.appendChild(el);
      particles.push({ el });
    }

    return () => {
      particles.forEach((p) => p.el.remove());
    };
  }, [count]);

  return containerRef;
}
