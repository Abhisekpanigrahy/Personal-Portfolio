import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 30px rgba(124,58,237,0.5)",
          }}
          whileTap={{ scale: 0.93 }}
          className="fixed bottom-8 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(0,255,255,0.1))",
            border: "1px solid rgba(124,58,237,0.4)",
            color: "#a78bfa",
            backdropFilter: "blur(20px)",
          }}
          aria-label="Scroll to top"
          data-testid="scroll-to-top"
        >
          <ChevronUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
