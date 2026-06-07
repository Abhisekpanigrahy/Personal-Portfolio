import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { IconType } from "react-icons";
import { useTheme } from "@/lib/theme";
import {
  SiReact, SiNodedotjs, SiMongodb, SiPostgresql, SiFirebase,
  SiNextdotjs, SiRedux, SiTailwindcss, SiBootstrap,
  SiMui, SiExpress, SiGraphql, SiGit, SiGithub,
  SiHtml5, SiCss, SiJavascript,
} from "react-icons/si";

const categories = [
  {
    name: "Frontend", icon: "◈", color: "#7c3aed",
    skills: [
      { name: "React.js",    icon: SiReact,      level: 92, color: "#61DAFB" },
      { name: "Next.js",     icon: SiNextdotjs,  level: 82, color: "#888" },
      { name: "Redux",       icon: SiRedux,      level: 85, color: "#764ABC" },
      { name: "Tailwind CSS",icon: SiTailwindcss,level: 88, color: "#06B6D4" },
      { name: "JavaScript",  icon: SiJavascript, level: 90, color: "#F7DF1E" },
      { name: "HTML5",       icon: SiHtml5,      level: 95, color: "#E34F26" },
      { name: "CSS3",        icon: SiCss,        level: 90, color: "#1572B6" },
      { name: "Bootstrap",   icon: SiBootstrap,  level: 85, color: "#7952B3" },
      { name: "Material UI", icon: SiMui,        level: 80, color: "#007FFF" },
    ],
  },
  {
    name: "Backend", icon: "⚡", color: "#00c97a",
    skills: [
      { name: "Node.js",    icon: SiNodedotjs, level: 88, color: "#339933" },
      { name: "Express.js", icon: SiExpress,   level: 87, color: "#888" },
      { name: "REST APIs",  icon: SiNodedotjs, level: 90, color: "#06b6d4" },
      { name: "GraphQL",    icon: SiGraphql,   level: 75, color: "#E10098" },
    ],
  },
  {
    name: "Database", icon: "◉", color: "#ec4899",
    skills: [
      { name: "MongoDB",    icon: SiMongodb,    level: 87, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, level: 75, color: "#336791" },
      { name: "Firebase",   icon: SiFirebase,   level: 82, color: "#FFCA28" },
    ],
  },
  {
    name: "Tools", icon: "✦", color: "#f59e0b",
    skills: [
      { name: "Git",          icon: SiGit,    level: 90, color: "#F05032" },
      { name: "GitHub",       icon: SiGithub, level: 90, color: "#888" },
      { name: "React Native", icon: SiReact,  level: 80, color: "#61DAFB" },
    ],
  },
];

const techCloud = ["TypeScript","REST APIs","JWT Auth","Socket.io","Docker","AWS","Vercel","Postman","Figma","Razorpay","FCM","Google Maps"];

function SkillBar({ name, icon: Icon, level, color, delay }: {
  name: string; icon: IconType; level: number; color: string; delay: number;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const iconColor = (isDark || color !== "#888") ? color : "#aaa";

  return (
    <div ref={ref} className="group" data-testid={`skill-${name.toLowerCase().replace(/\s+/g,"-")}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: `${color}18`, border: `1px solid ${color}28` }}
          >
            <Icon style={{ color: iconColor }} size={13} />
          </div>
          <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{name}</span>
        </div>
        <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>{level}%</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
        <motion.div
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg,rgba(124,58,237,0.8),${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.34,1.56,0.64,1] }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default function Skills() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const bgColor = isDark ? "rgba(6,6,15,0)" : "rgba(245,245,250,0)";

  return (
    <section id="skills" ref={ref} className="py-32 relative overflow-hidden" data-testid="skills-section">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
          style={{ background: `radial-gradient(ellipse,${isDark ? "rgba(124,58,237,0.06)" : "rgba(124,58,237,0.03)"},${bgColor})` }}
        />
      </div>

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
              style={{ background: `linear-gradient(90deg,transparent,${isDark ? "#7c3aed" : "#6d28d9"})` }}
            />
            <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "var(--text-muted)" }}>
              What I Know
            </span>
          </div>
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: "var(--text-primary)" }}>
            Technical{" "}
            <span className="gradient-heading">Skills</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.12, duration: 0.7, ease: [0.34,1.56,0.64,1] }}
              className="rounded-2xl p-6 relative overflow-hidden group skill-card"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                backdropFilter: "blur(16px)",
                boxShadow: isDark ? "none" : "0 2px 20px rgba(0,0,0,0.05)",
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top left,${cat.color}08,${cat.color}00 60%)` }}
              />
              <div className="flex items-center gap-3 mb-6 pb-4"
                style={{ borderBottom: `1px solid ${cat.color}18` }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                  style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}25` }}
                >
                  {cat.icon}
                </div>
                <h3 className="font-display font-bold text-sm tracking-wider uppercase" style={{ color: cat.color }}>
                  {cat.name}
                </h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <SkillBar key={skill.name} {...skill} delay={0.2 + ci * 0.1 + si * 0.06} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {techCloud.map((tech) => (
            <motion.span
              key={tech}
              className="px-4 py-2 rounded-full font-mono text-xs"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-muted)",
              }}
              whileHover={{
                background: isDark ? "rgba(124,58,237,0.1)" : "rgba(124,58,237,0.07)",
                borderColor: isDark ? "rgba(124,58,237,0.35)" : "rgba(124,58,237,0.25)",
                color: isDark ? "#a78bfa" : "#6d28d9",
                scale: 1.05,
              }}
              transition={{ duration: 0.2 }}
            >{tech}</motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
