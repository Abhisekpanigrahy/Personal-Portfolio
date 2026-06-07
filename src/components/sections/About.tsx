import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/lib/theme";

const stats = [
  { value: "2+", label: "Years Experience", icon: "⚡" },
  { value: "8+", label: "Projects Delivered", icon: "🚀" },
  { value: "6+", label: "Happy Clients",     icon: "✦" },
  { value: "2",  label: "Professional Roles", icon: "◈" },
];

const traits = [
  { label: "Problem Solver", color: "#7c3aed" },
  { label: "Clean Code",     color: "#00c97a" },
  { label: "Team Player",    color: "#ec4899" },
  { label: "Fast Learner",   color: "#f59e0b" },
];

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const violet = isDark ? "#7c3aed" : "#6d28d9";
  const cyan   = isDark ? "#00ffff" : "#0891b2";

  return (
    <section id="about" ref={ref} className="py-32 relative overflow-hidden" data-testid="about-section">
      {/* Parallax bg blobs */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: `radial-gradient(circle,${isDark ? "rgba(124,58,237,0.1)" : "rgba(124,58,237,0.05)"},transparent)` }}
        />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full"
          style={{ background: `radial-gradient(circle,${isDark ? "rgba(0,255,255,0.07)" : "rgba(8,145,178,0.05)"},transparent)` }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-[60px]"
              style={{ background: `linear-gradient(90deg,transparent,${violet})` }}
            />
            <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "var(--text-muted)" }}>
              About Me
            </span>
          </div>
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: "var(--text-primary)" }}>
            Who I{" "}
            <span className="gradient-heading">Am</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — Visual card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-3xl p-8 overflow-hidden"
              style={{
                background: "var(--bg-card)",
                border: `1px solid ${isDark ? "rgba(124,58,237,0.2)" : "rgba(124,58,237,0.12)"}`,
                boxShadow: isDark ? "0 20px 60px rgba(0,0,0,0.3)" : "0 8px 40px rgba(0,0,0,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="absolute inset-0 holographic opacity-60 rounded-3xl" />

              <div className="relative z-10 flex flex-col items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl flex items-center justify-center overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg,${isDark ? "rgba(124,58,237,0.4)" : "rgba(124,58,237,0.15)"},${isDark ? "rgba(0,255,255,0.2)" : "rgba(8,145,178,0.1)"})`,
                      border: `1px solid ${isDark ? "rgba(124,58,237,0.4)" : "rgba(124,58,237,0.2)"}`,
                      boxShadow: isDark ? "0 0 40px rgba(124,58,237,0.3)" : "0 4px 20px rgba(124,58,237,0.15)",
                    }}
                  >
                    <motion.span
                      className="gradient-name-text font-display font-bold text-4xl"
                      animate={{ scale: [1,1.05,1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >AP</motion.span>
                  </div>
                  {/* Status badge */}
                  <div className="absolute -bottom-2 -right-2 flex items-center gap-1.5 px-3 py-1 rounded-full"
                    style={{
                      background: isDark ? "rgba(6,6,15,0.9)" : "rgba(255,255,255,0.95)",
                      border: "1px solid rgba(0,201,122,0.3)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: "#00c97a" }}
                      animate={{ opacity: [1,0.3,1] }} transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="font-mono text-[10px]" style={{ color: "#00c97a" }}>Open to Work</span>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-display font-bold text-xl" style={{ color: "var(--text-primary)" }}>Abhisek Panigrahy</h3>
                  <p className="font-mono text-xs mt-1" style={{ color: "var(--text-muted)" }}>Full Stack Engineer</p>
                  <p className="font-mono text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>Berhampur, Odisha, India</p>
                </div>

                {/* Trait pills */}
                <div className="flex flex-wrap justify-center gap-2">
                  {traits.map(({ label, color }, i) => (
                    <motion.span
                      key={label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="px-3 py-1 rounded-full font-mono text-xs"
                      style={{
                        background: `${color}12`,
                        border: `1px solid ${color}28`,
                        color,
                      }}
                    >{label}</motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating accent cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="absolute -top-4 -right-4 hidden lg:block"
            >
              <div className="px-4 py-3 rounded-xl"
                style={{
                  background: isDark ? "rgba(6,6,15,0.9)" : "rgba(255,255,255,0.95)",
                  border: `1px solid ${isDark ? "rgba(0,255,255,0.2)" : "rgba(8,145,178,0.2)"}`,
                  backdropFilter: "blur(20px)",
                  boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 16px rgba(0,0,0,0.08)",
                }}
              >
                <div className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>Stack</div>
                <div className="font-display font-bold text-sm mt-0.5" style={{ color: "var(--text-primary)" }}>MERN + Next.js</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-4 -left-4 hidden lg:block"
            >
              <div className="px-4 py-3 rounded-xl"
                style={{
                  background: isDark ? "rgba(6,6,15,0.9)" : "rgba(255,255,255,0.95)",
                  border: `1px solid ${isDark ? "rgba(124,58,237,0.2)" : "rgba(124,58,237,0.15)"}`,
                  backdropFilter: "blur(20px)",
                  boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 16px rgba(0,0,0,0.08)",
                }}
              >
                <div className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>Experience</div>
                <div className="font-display font-bold text-sm mt-0.5" style={{ color: "var(--text-primary)" }}>2+ Years</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <div className="flex flex-col gap-8">
            <div className="space-y-5">
              {[
                <>Full Stack Engineer with <span style={{ color: cyan }}>2+ years of experience</span> designing, developing, and deploying scalable, production-ready web and mobile applications using the MERN stack.</>,
                <>Proficient in React.js, React Native, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, and Firebase. Experienced in building RESTful APIs, GraphQL integrations, real-time notification systems, and payment gateway integrations.</>,
                <>Based in <span style={{ color: isDark ? "#a78bfa" : "#6d28d9" }}>Berhampur, Odisha, India</span> — working remotely with cross-functional teams to deliver high-quality software on time and within scope.</>,
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                  className="text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >{text}</motion.p>
              ))}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, label, icon }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: [0.34,1.56,0.64,1] }}
                  className="p-5 rounded-2xl relative overflow-hidden group cursor-default"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    backdropFilter: "blur(10px)",
                  }}
                  whileHover={{ scale: 1.02 }}
                  data-testid={`stat-${label.toLowerCase().replace(/\s+/g,"-")}`}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{ background: isDark ? "linear-gradient(135deg,rgba(124,58,237,0.08),rgba(0,255,255,0.04))" : "linear-gradient(135deg,rgba(124,58,237,0.05),rgba(8,145,178,0.03))" }}
                  />
                  <div className="relative z-10">
                    <span className="text-2xl mb-2 block">{icon}</span>
                    <div className="gradient-stat font-display font-bold text-3xl">{value}</div>
                    <div className="font-mono text-xs mt-1" style={{ color: "var(--text-muted)" }}>{label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
