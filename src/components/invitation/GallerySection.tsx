import { motion } from "framer-motion";

const milestones = [
  {
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?q=80&w=2070&auto=format&fit=crop",
    quote: "El futuro pertenece a quienes creen en la belleza de sus sueños.",
  },
  {
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
    quote: "El futuro pertenece a quienes creen en la belleza de sus sueños.",
  },
  {
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2070&auto=format&fit=crop",
    quote: "El futuro pertenece a quienes creen en la belleza de sus sueños.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export function GallerySection() {
  return (
    <section className="py-[80px] md:py-[120px] px-mobile md:px-desktop bg-surface-bright scroll-mt-20" id="gallery">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <span className="font-body text-caption text-secondary-dark uppercase tracking-[0.2em] mb-4 block">
            Mi Trayectoria
          </span>
          <h2 className="font-heading text-heading text-primary">
            Galería de Momentos
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {milestones.map((item, i) => (
            <motion.div
              key={i}
              className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden group cursor-pointer"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src={item.image}
                alt={`Milestone ${i + 1}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="font-subheading text-[18px] md:text-subheading text-white italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
