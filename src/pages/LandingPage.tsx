import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { HeroSection } from "../components/landing/HeroSection";
import type { Guest } from "../types";

export function LandingPage() {
  const { invite_slug } = useParams<{ invite_slug: string }>();
  const [guest, setGuest] = useState<Guest | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!invite_slug) return;
    supabase
      .from("guests")
      .select("*")
      .eq("invite_slug", invite_slug)
      .single()
      .then(({ data, error }) => {
        if (error || !data) setNotFound(true);
        else setGuest(data);
      });
  }, [invite_slug]);

  if (notFound) {
    return (
      <main className="min-h-dvh flex items-center justify-center bg-primary-dark px-mobile">
        <div className="text-center">
          <h1 className="font-heading text-heading text-secondary-light mb-4">Invitación no encontrada</h1>
          <p className="font-body text-body text-white/60">El enlace que usaste no es válido.</p>
        </div>
      </main>
    );
  }

  if (!guest) {
    return (
      <main className="min-h-dvh flex items-center justify-center bg-primary-dark">
        <p className="font-body text-body text-white/40">Cargando...</p>
      </main>
    );
  }

  return (
    <main>
      <HeroSection guestName={`${guest.first_name} ${guest.last_name}`} inviteSlug={invite_slug!} />
    </main>
  );
}
