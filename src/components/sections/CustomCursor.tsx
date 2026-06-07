import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.innerWidth <= 768 || "ontouchstart" in window;
    if (isMobile.current) return;

    document.body.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const clickable =
        t.tagName === "A" || t.tagName === "BUTTON" ||
        t.closest("a") || t.closest("button") ||
        window.getComputedStyle(t).cursor === "pointer";
      setIsHovering(!!clickable);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && (window.innerWidth <= 768 || "ontouchstart" in window)) {
    return null;
  }

  return (
    <>
      {/* Main dot — snappy */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: 8,
          height: 8,
          background: isHovering ? "#00ffff" : "#7c3aed",
          boxShadow: isHovering ? "0 0 12px #00ffff" : "0 0 12px #7c3aed",
          x: pos.x - 4,
          y: pos.y - 4,
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{ type: "tween", duration: 0.05 }}
      />

      {/* Outer ring — lagging */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          border: `1px solid ${isHovering ? "rgba(0,255,255,0.6)" : "rgba(124,58,237,0.5)"}`,
          background: isHovering ? "rgba(0,255,255,0.05)" : "transparent",
          x: pos.x - (isHovering ? 24 : 16),
          y: pos.y - (isHovering ? 24 : 16),
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      />
    </>
  );
}
