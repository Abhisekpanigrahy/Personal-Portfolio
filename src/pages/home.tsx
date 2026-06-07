import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "@/components/sections/Loader";
import CustomCursor from "@/components/sections/CustomCursor";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useTheme } from "@/lib/theme";

function SectionDivider() {
  return (
    <div className="relative h-px mx-8 md:mx-16 lg:mx-28">
      <div className="absolute inset-0"
        style={{ background: "var(--section-divider, linear-gradient(90deg,transparent,rgba(124,58,237,0.3),rgba(0,255,255,0.2),transparent))" }}
      />
    </div>
  );
}

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className={`relative min-h-screen overflow-hidden transition-colors duration-400 ${isDark ? "dark" : "light"}`}
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col w-full relative z-10"
          >
            <Navbar />
            <Hero />
            <SectionDivider />
            <About />
            <SectionDivider />
            <Skills />
            <SectionDivider />
            <Experience />
            <SectionDivider />
            <Projects />
            <SectionDivider />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollToTop />
    </main>
  );
}
