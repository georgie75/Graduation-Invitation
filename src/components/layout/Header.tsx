import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl border-b border-[#461400]/10 shadow-sm shadow-primary/5">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-mobile md:px-desktop">
        <Link
          to="/"
          className="font-heading text-heading text-primary"
        >
          Kevin Iten
        </Link>
        <span className="font-caption text-caption uppercase tracking-[0.2em] text-secondary-dark">
          Class of 2026
        </span>
      </nav>
    </header>
  );
}
