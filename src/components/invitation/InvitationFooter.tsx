export function InvitationFooter() {
  return (
    <footer className="w-full py-12 md:py-16 border-t border-secondary-dark/10 bg-surface">
      <div className="flex flex-col items-center gap-6 px-mobile md:px-desktop max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>
            school
          </span>
          <span className="font-heading text-heading text-primary tracking-widest">
            Kevin Iten
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          <a href="#event" className="font-body text-caption uppercase tracking-widest text-on-surface/70 hover:text-secondary-dark transition-colors">
            Detalles del Evento
          </a>
          <a href="#rsvp" className="font-body text-caption uppercase tracking-widest text-on-surface/70 hover:text-secondary-dark transition-colors">
            Confirmar Asistencia
          </a>
        
        </div>

        <div className="h-px w-full max-w-lg bg-secondary-dark/10" />

        <p className="font-body text-[10px] uppercase tracking-widest text-on-surface/50">
          &copy; 2026 THE GRADUATION OF Kevin Iten
        </p>
      </div>
    </footer>
  );
}
