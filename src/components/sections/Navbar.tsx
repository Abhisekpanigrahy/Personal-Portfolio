import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";

const NAV_HEIGHT = 68; // px — keep in sync with py-4 + content height

const navLinks = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact" },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-[52px] h-[28px] rounded-full flex items-center px-1 shrink-0"
      style={{
        background: isDark
          ? "linear-gradient(135deg,rgba(124,58,237,0.4),rgba(0,255,255,0.2))"
          : "linear-gradient(135deg,rgba(124,58,237,0.15),rgba(8,145,178,0.15))",
        border: isDark ? "1px solid rgba(124,58,237,0.4)" : "1px solid rgba(124,58,237,0.25)",
        boxShadow: isDark ? "0 0 12px rgba(124,58,237,0.25)" : "none",
      }}
      whileTap={{ scale: 0.93 }}
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        className="w-5 h-5 rounded-full flex items-center justify-center"
        animate={{ x: isDark ? 0 : 22 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        style={{
          background: isDark
            ? "linear-gradient(135deg,#7c3aed,#a78bfa)"
            : "linear-gradient(135deg,#f59e0b,#fbbf24)",
          boxShadow: isDark ? "0 0 8px rgba(124,58,237,0.6)" : "0 0 8px rgba(245,158,11,0.5)",
        }}
      >
        {isDark ? <Moon size={11} color="#fff" /> : <Sun size={11} color="#fff" />}
      </motion.div>
    </motion.button>
  );
}

export default function Navbar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Set initial state
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const T = {
    logoViolet:  isDark ? "#7c3aed" : "#6d28d9",
    logoCyan:    isDark ? "#00ffff" : "#0891b2",
    logoText:    "var(--text-primary)",
    linkActive:  isDark ? "#00ffff" : "#6d28d9",
    linkDefault: "var(--text-secondary)",
    ctaBg: isDark
      ? "linear-gradient(135deg,rgba(124,58,237,0.22),rgba(0,255,255,0.1))"
      : "linear-gradient(135deg,rgba(109,40,217,0.12),rgba(8,145,178,0.08))",
    ctaBorder:   isDark ? "rgba(124,58,237,0.45)" : "rgba(109,40,217,0.3)",
    ctaColor:    isDark ? "#a78bfa" : "#6d28d9",
    hamburgerBorder: isDark ? "rgba(124,58,237,0.35)" : "rgba(109,40,217,0.25)",
    hamburgerColor:  isDark ? "#a78bfa" : "#6d28d9",
    progressGrad: isDark
      ? "linear-gradient(90deg,#7c3aed,#00ffff,#ec4899)"
      : "linear-gradient(90deg,#6d28d9,#0891b2,#be185d)",
    underlineGrad: isDark
      ? "linear-gradient(90deg,#7c3aed,#00ffff)"
      : "linear-gradient(90deg,#6d28d9,#0891b2)",
  };

  return (
    <>
      {/* ── Scroll progress bar — always fixed at very top ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left pointer-events-none"
        style={{
          scaleX: scrollYProgress,
          background: T.progressGrad,
          boxShadow: isDark ? "0 0 8px rgba(0,255,255,0.5)" : "0 0 6px rgba(109,40,217,0.4)",
          transformOrigin: "left",
        }}
      />

      {/* ── FIXED navbar — always on top, never scrolls away ── */}
      <header
        className="fixed top-0 left-0 right-0 w-full z-[100]"
        style={{
          height: NAV_HEIGHT,
          background: scrolled
            ? isDark ? "rgba(6,6,15,0.92)" : "rgba(245,245,250,0.94)"
            : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled
            ? isDark ? "1px solid rgba(124,58,237,0.18)" : "1px solid rgba(124,58,237,0.14)"
            : "1px solid transparent",
          boxShadow: scrolled
            ? isDark ? "0 4px 30px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.08)"
            : "none",
          transition: "background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-6">

          {/* Logo */}
          <motion.a
            href="#"
            className="relative group shrink-0"
            whileHover={{ scale: 1.04 }}
            onClick={(e) => { e.preventDefault(); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            data-testid="nav-logo"
          >
            <span className="font-display font-bold text-xl tracking-tight">
              <span style={{ color: T.logoViolet }}>&lt;</span>
              <span style={{ color: T.logoText }}>AP</span>
              <span style={{ color: T.logoCyan }}>/&gt;</span>
            </span>
            <span
              className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
              style={{ background: T.underlineGrad }}
            />
          </motion.a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-7 flex-1 justify-center" aria-label="Main navigation">
            {navLinks.map(({ label, href }, i) => {
              const isActive = activeSection === href.slice(1);
              return (
                <motion.button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="relative text-sm font-medium group py-1"
                  style={{ color: isActive ? T.linkActive : T.linkDefault }}
                  whileHover={{ color: "var(--text-primary)" }}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  data-testid={`nav-link-${label.toLowerCase()}`}
                >
                  {label}
                  {/* Active indicator */}
                  <span
                    className="absolute -bottom-0.5 left-0 h-[2px] rounded-full transition-all duration-300"
                    style={{ width: isActive ? "100%" : "0%", background: T.underlineGrad }}
                  />
                  {/* Hover indicator */}
                  <span
                    className="absolute -bottom-0.5 left-0 h-[2px] rounded-full w-0 group-hover:w-full transition-all duration-300"
                    style={{ background: T.underlineGrad, opacity: isActive ? 0 : 0.7 }}
                  />
                </motion.button>
              );
            })}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle />

            {/* Hire Me — desktop only */}
            <motion.button
              onClick={() => scrollTo("#contact")}
              className="hidden md:flex items-center px-5 py-2 text-sm font-semibold rounded-xl relative overflow-hidden group"
              style={{
                background: T.ctaBg,
                border: `1px solid ${T.ctaBorder}`,
                color: T.ctaColor,
              }}
              whileHover={{ scale: 1.05, boxShadow: isDark ? "0 0 20px rgba(124,58,237,0.3)" : "0 0 16px rgba(109,40,217,0.2)" }}
              whileTap={{ scale: 0.97 }}
              data-testid="nav-cta"
            >
              <span className="relative z-10">Hire Me</span>
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: isDark
                    ? "linear-gradient(135deg,rgba(124,58,237,0.35),rgba(0,255,255,0.15))"
                    : "linear-gradient(135deg,rgba(109,40,217,0.18),rgba(8,145,178,0.1))",
                }}
              />
            </motion.button>

            {/* Hamburger — mobile only */}
            <motion.button
              className="md:hidden p-2 rounded-xl"
              style={{ border: `1px solid ${T.hamburgerBorder}`, color: T.hamburgerColor }}
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
              data-testid="nav-hamburger"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* ── Spacer so content starts below the fixed navbar ── */}
      <div style={{ height: NAV_HEIGHT }} aria-hidden="true" />

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[99] flex flex-col"
            style={{
              background: isDark ? "rgba(6,6,15,0.98)" : "rgba(245,245,250,0.98)",
              backdropFilter: "blur(30px)",
            }}
          >
            {/* Subtle grid bg */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(var(--grid-color) 1px,transparent 1px),linear-gradient(90deg,var(--grid-color) 1px,transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Mobile menu header */}
            <div
              className="relative z-10 flex items-center justify-between px-6 py-4 shrink-0"
              style={{ borderBottom: "1px solid var(--border-subtle)", height: NAV_HEIGHT }}
            >
              <span className="font-display font-bold text-xl">
                <span style={{ color: T.logoViolet }}>&lt;</span>
                <span style={{ color: T.logoText }}>AP</span>
                <span style={{ color: T.logoCyan }}>/&gt;</span>
              </span>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <motion.button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-xl"
                  style={{ border: `1px solid ${T.hamburgerBorder}`, color: T.hamburgerColor }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            {/* Nav links */}
            <nav className="relative z-10 flex flex-col justify-center flex-1 px-8 gap-1 overflow-y-auto">
              {navLinks.map(({ label, href }, i) => (
                <motion.button
                  key={href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.3 }}
                  onClick={() => scrollTo(href)}
                  className="text-left py-4 flex items-center justify-between group"
                  style={{ borderBottom: "1px solid var(--border-subtle)" }}
                  data-testid={`mobile-nav-${label.toLowerCase()}`}
                >
                  <span
                    className="text-2xl font-display font-bold transition-colors duration-200"
                    style={{ color: activeSection === href.slice(1) ? T.linkActive : "var(--text-primary)" }}
                  >
                    {label}
                  </span>
                  <span
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-lg"
                    style={{ color: T.logoViolet }}
                  >→</span>
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.3 }}
                onClick={() => scrollTo("#contact")}
                className="mt-8 w-full py-4 rounded-2xl font-display font-bold text-lg text-white"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
                  boxShadow: "0 0 30px rgba(124,58,237,0.35)",
                }}
              >
                Hire Me
              </motion.button>
            </nav>

            <div className="relative z-10 px-8 py-6 shrink-0">
              <p className="font-mono text-xs" style={{ color: "var(--text-faint)" }}>
                abhisekpanigrahy79@gmail.com
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
