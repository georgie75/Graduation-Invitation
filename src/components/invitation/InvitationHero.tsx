import { motion } from "framer-motion";
import { useCountdown } from "../../hooks/useCountdown";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

export function InvitationHero() {
  const { days, hours, minutes, seconds, expired } = useCountdown();

  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden px-mobile md:px-desktop" id="hero">
      <div className="absolute inset-0 bg-hero" />

      <motion.div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center" variants={stagger} initial="hidden" animate="visible">
        <motion.div variants={fadeUp} className="mb-8 md:mb-12">
          <h1 className="font-heading text-display-mobile md:text-[80px] text-white drop-shadow-2xl leading-tight">
            Kevin Jten's
            <br />
            <span className="text-secondary-light">Graduation</span>
          </h1>
          <div className="h-px w-32 bg-secondary-light/50 mx-auto mt-6 md:mt-8" />
        </motion.div>

        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 mb-12 md:mb-16">
          {[
            { label: "Días", value: days },
            { label: "Horas", value: hours },
            { label: "Minutos", value: minutes },
            { label: "Segundos", value: seconds },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <span className="font-heading text-[40px] md:text-[52px] text-secondary-light gold-glow leading-none">{item.value}</span>
              <span className="font-body text-[10px] text-white/60 uppercase tracking-[0.2em] mt-2">{item.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="max-w-2xl mx-auto">
          <p className="font-subheading text-subheading text-white mb-3 italic">&ldquo;Mi Graduación&rdquo;</p>
          <p className="font-body text-body md:text-body-lg text-white/80 leading-relaxed max-w-xl mx-auto">
            Hoy es un día muy especial porque culmino una etapa en mi vida que he logrado con ayuda de Dios y de mi familia. Quisiera compartir este momento admirable contigo.
          </p>
          <motion.a
            href="#event"
            className="inline-flex items-center text-secondary-light font-body text-caption tracking-widest uppercase mt-10 hover:gap-4 transition-all duration-300"
            whileHover={{ gap: "16px" }}>
            Detalles del Evento
            <span className="material-symbols-outlined ml-2 text-[16px]">south</span>
          </motion.a>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none opacity-20 dot-pattern" />
    </section>
  );
}
