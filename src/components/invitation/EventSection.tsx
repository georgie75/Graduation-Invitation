import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

const details = [
  {
    icon: "location_on",
    label: "Lugar",
    title: "Colegio de Abogados de Honduras",
    sub: "Tegucigalpa, Honduras",
  },
  {
    icon: "calendar_today",
    label: "Fecha",
    title: "13 de Junio de 2026",
    sub: "Sábado de celebración",
  },
  {
    icon: "schedule",
    label: "Hora",
    title: "7:00 PM",
    sub: "Recepción y Protocolo",
  },
];

export function EventSection() {
  return (
    <section className="py-[80px] md:py-[120px] px-mobile md:px-desktop bg-surface scroll-mt-20" id="event">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="font-heading text-heading text-primary mb-8">
              Información del Evento
            </h2>
            <div className="space-y-8 md:space-y-10">
              {details.map((item) => (
                <div key={item.label} className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-secondary-light shrink-0 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-body text-caption text-secondary-dark uppercase mb-1 tracking-[0.1em]">
                      {item.label}
                    </h3>
                    <p className="font-subheading text-subheading text-primary">
                      {item.title}
                    </p>
                    <p className="font-body text-body text-on-surface/70">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBawMMwWZv-8L_LRcTnV0V6g0_08r6lTBTmy-oRVp5YY5k38Qmcx3SA1XF4mLAKxMbi-JNaHI6G26Ho3kEz1A3Jc3mK3rqV_UIL-9yTjUdKvARQc69JJli1qYwSPlRsjcF-tIufL3i_NHLeMTigczs9DlcwWhhR-IBzp7fyRZRPSAtEY9vYh3ySgcOYAf10PH7PtWf1HAsYgH3SR13JvLEap9J5_uFQIV70T67-oe3qHgSL3ZqjH3hQ0_a87Spx-Q_2sbT4mSe40cw"
              alt="Graduation cap and diploma"
            />
            <div className="absolute inset-0 bg-primary/20" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-primary/80 to-transparent">
              <p className="font-subheading text-subheading text-white italic">
                &ldquo;El futuro pertenece a quienes creen en la belleza de sus sueños.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
