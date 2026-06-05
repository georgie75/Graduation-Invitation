import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export function RSVPSection() {
  const [attending, setAttending] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-[80px] md:py-[120px] px-mobile md:px-desktop scroll-mt-20" id="rsvp">
      <div className="max-w-2xl mx-auto">
        <motion.div className="text-center" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          <span className="font-body text-caption text-secondary-dark uppercase tracking-[0.2em] mb-4 block">Confirmación</span>
          <h2 className="font-heading text-heading text-primary mb-6">¿Nos acompañas?</h2>
          <p className="font-body text-body-lg text-on-surface/70 mb-10">Por favor, confirma tu asistencia antes del 1 de Mayo para asegurar tu lugar en esta gala.</p>
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
                    <div className="pt-2">
                      <label className="font-body text-caption text-secondary-dark uppercase tracking-[0.1em] mb-2 block">Número de acompañantes</label>
                      <select className="w-full bg-white/50 border border-outline/30 rounded-xl px-5 py-4 font-body text-body text-on-surface focus:outline-none focus:border-secondary-dark/50 transition-colors">
                        <option>Solo yo</option>
                        <option>+1 Invitado</option>
                        <option>+2 Invitados</option>
                        <option>+3 Invitados</option>
                      </select>
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
