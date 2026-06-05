import { useParticles } from "../../hooks/useParticles";

export function ParticleBackground() {
  const containerRef = useParticles(40);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
