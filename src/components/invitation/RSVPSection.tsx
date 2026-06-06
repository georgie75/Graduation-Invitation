import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabase";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export function RSVPSection({ inviteSlug }: { inviteSlug: string }) {
  const [attending, setAttending] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [guestOption, setGuestOption] = useState("0");
  const [customGuests, setCustomGuests] = useState(3);

  const isCustom = guestOption === "custom";

  useEffect(() => {
    if (!inviteSlug) return;
    supabase
      .from("guests")
      .select("attending, guest_count, responded_at")
      .eq("invite_slug", inviteSlug)
      .single()
      .then(({ data }) => {
        if (data?.responded_at) setSubmitted(true);
        setLoading(false);
      });
  }, [inviteSlug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const count = isCustom ? customGuests : Number(guestOption);
    await supabase
      .from("guests")
      .update({
        attending,
        guest_count: count,
        responded_at: new Date().toISOString(),
      })
      .eq("invite_slug", inviteSlug);
    setSubmitted(true);
  }

  if (loading) return null;

  return (
    <section className="py-[80px] md:py-[120px] px-mobile md:px-desktop scroll-mt-20" id="rsvp">
      <div className="max-w-2xl mx-auto">
        <motion.div className="text-center" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <span className="font-body text-caption text-secondary-dark uppercase tracking-[0.2em] mb-4 block">Confirmación</span>
          <h2 className="font-heading text-heading text-primary mb-6">¿Nos acompañas?</h2>
          <p className="font-body text-body-lg text-on-surface/70 mb-10">Por favor, confirma tu asistencia antes del 10 de Junio para asegurar tu lugar en esta gala.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="confirmation"
              className="invitation-glass rounded-2xl p-8 md:p-12 text-center"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <span className="material-symbols-outlined text-5xl text-secondary-light mb-4" style={{ fontVariationSettings: '"FILL" 1' }}>
                check_circle
              </span>
              <h3 className="font-heading text-heading text-primary mb-3">¡Confirmación Recibida!</h3>
              <p className="font-body text-body text-on-surface/70">Gracias por confirmar tu asistencia. Te esperamos el 13 de Junio para celebrar juntos este día tan especial.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="invitation-glass rounded-2xl p-8 md:p-12 space-y-8"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              exit={{ opacity: 0, y: -20 }}>
              <div className="flex flex-wrap justify-center gap-4">
                {["Asistiré con gusto", "No podré asistir"].map((label) => (
                  <label key={label} className="group cursor-pointer">
                    <input
                      type="radio"
                      name="attendance"
                      value={label}
                      className="hidden peer"
                      checked={label === "Asistiré con gusto" ? attending : !attending}
                      onChange={() => setAttending(label === "Asistiré con gusto")}
                    />
                    <div className="px-6 md:px-8 py-3 rounded-full border border-outline/50 text-on-surface/70 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all font-body text-caption uppercase tracking-widest">
                      {label}
                    </div>
                  </label>
                ))}
              </div>

              <AnimatePresence>
                {attending && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden">
                    <div className="pt-2 space-y-3">
                      <label className="font-body text-caption text-secondary-dark uppercase tracking-[0.1em] mb-2 block">Número de acompañantes</label>
                      <select
                        value={guestOption}
                        onChange={(e) => setGuestOption(e.target.value)}
                        className="w-full bg-white/50 border border-outline/30 rounded-xl px-5 py-4 font-body text-body text-on-surface focus:outline-none focus:border-secondary-dark/50 transition-colors">
                        <option value="0">Solo yo</option>
                        <option value="1">+1 Invitado</option>
                        <option value="2">+2 Invitados</option>
                        <option value="custom">Más...</option>
                      </select>
                      {isCustom && (
                        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                          <label className="font-body text-caption text-on-surface/60 mb-2 block">¿Cuántos acompañantes?</label>
                          <div className="flex items-center justify-center gap-4">
                            <button
                              type="button"
                              onClick={() => setCustomGuests(Math.max(3, customGuests - 1))}
                              className="w-12 h-12 rounded-full border border-outline/30 text-on-surface/70 hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center">
                              <span className="material-symbols-outlined">remove</span>
                            </button>
                            <span className="font-heading text-[28px] text-primary w-12 text-center tabular-nums">{customGuests}</span>
                            <button
                              type="button"
                              onClick={() => setCustomGuests(customGuests + 1)}
                              className="w-12 h-12 rounded-full border border-outline/30 text-on-surface/70 hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center">
                              <span className="material-symbols-outlined">add</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="w-full md:w-auto px-12 py-4 bg-primary text-white font-body text-caption uppercase tracking-widest rounded-xl hover:bg-secondary-dark active:scale-95 transition-all shadow-xl">
                Confirmar Asistencia
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
