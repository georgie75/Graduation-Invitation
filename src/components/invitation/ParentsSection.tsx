import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25, delayChildren: 0.15 } },
};

const cornerVariant = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function ParentsSection() {
  return (
    <section className="py-[80px] md:py-[120px] px-mobile md:px-desktop bg-gradient-to-b from-surface to-white/80" id="parents">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="relative p-[60px] md:p-[80px] text-center"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="absolute inset-0 invitation-glass rounded-2xl" />

          <motion.div
            className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-secondary-light/40 rounded-tl-xl"
            variants={cornerVariant}
          />
          <motion.div
            className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-secondary-light/40 rounded-tr-xl"
            variants={cornerVariant}
          />
          <motion.div
            className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-secondary-light/40 rounded-bl-xl"
            variants={cornerVariant}
          />
          <motion.div
            className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-secondary-light/40 rounded-br-xl"
            variants={cornerVariant}
          />

          <div className="relative z-10">
            <motion.div variants={fadeUp}>
              <span className="material-symbols-outlined text-secondary-light text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                favorite
              </span>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h3 className="font-body text-caption text-secondary-dark uppercase tracking-[0.25em] mt-4 mb-2">
                Con el orgullo de
              </h3>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h2 className="font-heading text-[38px] md:text-[48px] text-primary leading-none mt-4">
                Papás
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 my-8">
              <span className="h-px w-12 bg-gradient-to-l from-secondary-light/60 to-transparent" />
              <span className="material-symbols-outlined text-secondary-light text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>
                diamond
              </span>
              <span className="h-px w-12 bg-gradient-to-r from-secondary-light/60 to-transparent" />
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="font-heading text-[28px] md:text-[36px] text-primary leading-tight tracking-wide">
                Walter Iten
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="flex items-center justify-center gap-4 my-5">
                <span className="h-px w-8 bg-secondary-light/40" />
                <span className="font-subheading text-[18px] text-secondary-dark italic tracking-widest">y</span>
                <span className="h-px w-8 bg-secondary-light/40" />
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="font-heading text-[28px] md:text-[36px] text-primary leading-tight tracking-wide">
                Bety Ponce
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-secondary-light to-transparent mx-auto my-8" />
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="font-body text-body text-on-surface/60 max-w-sm mx-auto leading-relaxed">
                Quienes con amor y dedicación han hecho de este sueño una realidad.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
