import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        const inc = p < 60 ? 3 : p < 85 ? 1.5 : 0.8;
        return Math.min(p + inc, 100);
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress > 30) setPhase(1);
    if (progress > 70) setPhase(2);
  }, [progress]);

  const phases = ["Initializing", "Loading Assets", "Rendering"];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.65, ease: [0.76,0,0.24,1] } }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#06060f" }}
      data-testid="loader"
    >
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(rgba(124,58,237,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.6) 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(124,58,237,0.14) 0%,transparent 70%)" }}
        />
      </div>

      {/* Logo mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.34,1.56,0.64,1] }}
        className="relative mb-12"
        style={{ width: 80, height: 80 }}
      >
        {/* Outer ring */}
        <motion.div
          className="absolute rounded-full"
          style={{ inset: -20, border: "1px solid transparent", borderTopColor: "#7c3aed", borderRightColor: "#00ffff" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner ring */}
        <motion.div
          className="absolute rounded-full"
          style={{ inset: -8, border: "1px solid transparent", borderBottomColor: "#ec4899", borderLeftColor: "#7c3aed" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        {/* Center */}
        <div className="w-full h-full rounded-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg,rgba(124,58,237,0.3),rgba(0,255,255,0.1))",
            border: "1px solid rgba(124,58,237,0.4)",
            boxShadow: "0 0 40px rgba(124,58,237,0.3),inset 0 0 20px rgba(124,58,237,0.1)",
          }}
        >
          <motion.span
            className="gradient-name-text font-display font-bold text-2xl"
            animate={{ opacity: [0.7,1,0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >AP</motion.span>
        </div>
      </motion.div>

      {/* Phase text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={phase}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="font-mono text-xs tracking-[0.4em] uppercase mb-8"
          style={{ color: "rgba(167,139,250,0.65)" }}
        >
          {phases[Math.min(phase, phases.length - 1)]}
        </motion.p>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="w-64">
        <div className="h-px w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg,#7c3aed,#00ffff)", boxShadow: "0 0 10px rgba(0,255,255,0.5)" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-mono text-[10px]" style={{ color: "rgba(255,255,255,0.18)" }}>
            {phases[Math.min(phase, phases.length - 1)].toUpperCase()}
          </span>
          <span className="font-mono text-[10px]" style={{ color: "rgba(167,139,250,0.55)" }}>
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-8">
        {[0,1,2,3,4].map((i) => (
          <motion.div key={i} className="w-1 h-1 rounded-full" style={{ background: "#7c3aed" }}
            animate={{ opacity: [0.2,1,0.2], scale: [0.8,1.2,0.8] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
