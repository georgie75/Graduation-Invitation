import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ParticleBackground } from "./ParticleBackground";

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative h-dvh w-full flex flex-col items-center justify-center overflow-hidden bg-primary-dark">
      <ParticleBackground />

      <motion.div className="relative z-10 w-full max-w-4xl px-mobile md:px-desktop flex flex-col items-center text-center" variants={stagger} initial="hidden" animate="show">
        <motion.div variants={fadeUp} className="mb-4 md:mb-8">
          <span
            className="material-symbols-outlined !text-[90px] md:!text-[150px] text-secondary-light cap-silhouette inline-block animate-bounce-slow"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            school
          </span>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="font-heading text-[14px] md:text-[22px] text-secondary-light mb-6 md:mb-5 tracking-[0.3em]"
        >
          INVITACIÓN ESPECIAL
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-heading font-bold text-[30px] md:text-[60px] text-on-primary mb-6 md:mb-4 leading-[1.1]"
        >
          Carlos Martínez
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="font-heading text-[13px] md:text-[18px] text-secondary-light mb-1 max-w-md"
        >
          Has sido invitado a celebrar
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="font-heading text-[13px] md:text-[18px] text-secondary-light mb-4 md:mb-8"
        >
          mi graduación
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="font-heading text-[16px] md:text-[28px] text-white/80 italic mb-6 md:mb-12 max-w-2xl"
        >
          &ldquo;The future belongs to those who dare to dream.&rdquo;
        </motion.p>

        <motion.button
          variants={fadeUp}
          onClick={() => navigate("/invite/carlos-martinez")}
          className="group relative px-6 py-3 md:px-12 md:py-6 bg-[#AF8D11] text-on-secondary rounded-full overflow-hidden transition-all duration-300 hover:bg-secondary-light hover:text-secondary-dark active:scale-95 shadow-xl shadow-black/20 font-heading text-[14px] md:text-[20px] tracking-widest uppercase"
        >
          <span className="relative z-10">Abrir Invitación</span>
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </motion.button>
      </motion.div>
    </section>
  );
}
