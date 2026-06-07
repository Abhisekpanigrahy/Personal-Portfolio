import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowRight, Download } from "lucide-react";
import HeroCanvas from "./HeroCanvas";
import gsap from "gsap";
import { useTheme } from "@/lib/theme";

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

function MagneticButton({ children, onClick, className, style, "data-testid": testId }: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  "data-testid"?: string;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.28, y: y * 0.28, duration: 0.3, ease: "power2.out" });
  };
  const handleMouseLeave = () => {
    const btn = btnRef.current;
    if (!btn) return;
    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.5)" });
  };
  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic-btn ${className}`}
      style={style}
      data-testid={testId}
    >
      {children}
    </button>
  );
}

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const violet = isDark ? "#7c3aed" : "#6d28d9";
  const cyan   = isDark ? "#00ffff" : "#0891b2";

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background */}
      <div className="absolute inset-0 transition-colors duration-400"
        style={{ background: isDark
          ? "radial-gradient(ellipse at 62% 50%,rgba(124,58,237,0.13) 0%,transparent 60%),radial-gradient(ellipse at 20% 80%,rgba(0,255,255,0.06) 0%,transparent 50%),#06060f"
          : "radial-gradient(ellipse at 62% 50%,rgba(124,58,237,0.07) 0%,transparent 60%),radial-gradient(ellipse at 20% 80%,rgba(8,145,178,0.05) 0%,transparent 50%),#f5f5fa"
        }}
      />

      {/* Animated grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(var(--grid-color) 1px,transparent 1px),linear-gradient(90deg,var(--grid-color) 1px,transparent 1px)`,
          backgroundSize: "80px 80px",
          opacity: isDark ? 0.04 : 0.06,
          y,
        }}
      />

      {/* 3D Canvas */}
      <motion.div
        className="absolute right-0 top-0 w-full lg:w-[55%] h-full"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <HeroCanvas isDark={isDark} />
      </motion.div>

      {/* Gradient fade — canvas into bg (stronger on mobile to hide canvas behind text) */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: isDark
          ? "linear-gradient(90deg,#06060f 35%,rgba(6,6,15,0.6) 60%,transparent 100%)"
          : "linear-gradient(90deg,#f5f5fa 35%,rgba(245,245,250,0.6) 60%,transparent 100%)"
        }}
      />
      {/* Extra mobile overlay — ensures no white bleed on small screens */}
      <div
        className="absolute inset-0 pointer-events-none lg:hidden"
        style={{
          background: isDark
            ? "rgba(6,6,15,0.55)"
            : "rgba(245,245,250,0.55)",
        }}
      />

      {/* Content */}
      <motion.div className="relative z-10 max-w-7xl mx-auto px-6 pt-8 w-full" style={{ opacity }}>
        <div className="max-w-2xl">

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: isDark ? "rgba(0,255,136,0.07)" : "rgba(5,150,105,0.07)",
              border: isDark ? "1px solid rgba(0,255,136,0.2)" : "1px solid rgba(5,150,105,0.2)",
            }}
          >
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ background: "#00c97a" }}
              animate={{ scale: [1,1.5,1], opacity: [0.7,1,0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-mono text-xs tracking-[0.25em] uppercase"
              style={{ color: isDark ? "rgba(0,255,136,0.8)" : "#059669" }}
            >
              Available for Work
            </span>
          </motion.div>

          {/* Role label */}
          <div className="overflow-hidden mb-3">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.76,0,0.24,1] }}
              className="font-mono text-xs tracking-[0.3em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Full Stack Engineer
            </motion.p>
          </div>

          {/* Headline */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.76,0,0.24,1] }}
              className="font-display font-bold leading-[0.95] mb-1"
              style={{ fontSize: "clamp(3rem,8vw,6rem)", color: "var(--text-primary)" }}
            >
              Hi, I'm
            </motion.h1>
          </div>

          {/* Name — no overflow-hidden so gradient-clip works */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.76,0,0.24,1] }}
            className="font-display font-bold leading-[0.95] mb-6"
            style={{ fontSize: "clamp(3rem,8vw,6rem)" }}
          >
            <span className="gradient-name-text">
              Abhisek
            </span>
          </motion.h1>

          {/* Animated role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="font-display text-xl sm:text-2xl mb-6 min-h-[40px]"
          >
            <TypeAnimation
              sequence={["Full Stack Engineer",2000,"MERN Stack Developer",2000,"React & Node.js Expert",2000,"Mobile App Developer",2000]}
              wrapper="span"
              speed={55}
              repeat={Infinity}
              className="gradient-role-text"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="text-base leading-relaxed mb-10 max-w-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Building scalable, production-ready web and mobile applications with 2+ years of experience.
            Specialized in the MERN stack, REST APIs, and real-time systems.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton
              onClick={() => scrollTo("#projects")}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                color: "#fff",
                boxShadow: isDark ? "0 0 30px rgba(124,58,237,0.4),0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(124,58,237,0.25)",
              }}
              data-testid="hero-view-work"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work <ArrowRight size={16} />
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg,#6d28d9,#7c3aed)" }}
              />
            </MagneticButton>

            <motion.a
              href="/resume.pdf"
              download="Abhisek_Panigrahy_Resume.pdf"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm"
              style={{
                background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.7)",
                border: isDark ? "1px solid rgba(0,255,255,0.3)" : "1px solid rgba(8,145,178,0.3)",
                color: isDark ? "#00ffff" : "#0891b2",
                backdropFilter: "blur(10px)",
              }}
              whileHover={{ scale: 1.03, boxShadow: isDark ? "0 0 20px rgba(0,255,255,0.2)" : "0 4px 16px rgba(8,145,178,0.15)" }}
              whileTap={{ scale: 0.97 }}
              data-testid="hero-download-resume"
            >
              <Download size={16} />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="flex gap-8 mt-14 pt-8"
            style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            {[{ value: "2+", label: "Years Exp." }, { value: "8+", label: "Projects" }, { value: "6+", label: "Clients" }].map(({ value, label }) => (
              <div key={label}>
                <div className="gradient-stat font-display font-bold text-2xl">
                  {value}
                </div>
                <div className="font-mono text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("#about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-label="Scroll down"
        data-testid="hero-scroll-indicator"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--text-faint)" }}>Scroll</span>
        <div className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: `1px solid ${isDark ? "rgba(124,58,237,0.35)" : "rgba(109,40,217,0.25)"}` }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ background: violet }}
            animate={{ y: [0,10,0], opacity: [1,0,1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.button>
    </section>
  );
}
