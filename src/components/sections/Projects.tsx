import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence, LayoutGroup } from "framer-motion";
import { useTheme } from "@/lib/theme";

const allProjects = [
  { name: "Velvet Bai",      tagline: "Home Services Platform",          description: "A dual-role home services platform with end-to-end booking flow, earnings-to-transactions module, SOS functionality, job lifecycle management, Razorpay payment integration, and a dynamic rating and review system.", stack: ["React.js","React Native","Redux","Node.js","Express.js","MongoDB","Razorpay","FCM"], category: ["Full Stack","Mobile"],   accent: "#7c3aed", number: "01" },
  { name: "Samadhan",        tagline: "Citizen Grievance Platform",       description: "Full-stack citizen grievance platform with OTP-based phone auth, complaint posting with media, real-time status tracking, anonymous stealth-mode reporting, and multi-language support (English, Hindi, Odia).",       stack: ["React Native","React.js","Node.js","Express.js","MongoDB","JWT","AWS S3","FCM"],    category: ["Full Stack","Mobile"],   accent: "#ec4899", number: "02" },
  { name: "Pickup Ninja",    tagline: "Hyper Local Delivery Service",     description: "Three-module hyperlocal pick-and-drop platform with real-time GPS tracking, FCM push notifications, Sendgrid email alerts, OpenMoney payment gateway, and Google Maps API integration.",                              stack: ["React.js","React Native","Next.js","Node.js","Firebase","Google Maps"],            category: ["Full Stack","Mobile"],   accent: "#00c97a", number: "03" },
  { name: "Kontract",        tagline: "B2B Manpower Marketplace",         description: "Full-featured B2B Manpower Marketplace with three portals (Vendor, Company, Admin) featuring role-based protected routing, dashboards, application tracking, contract management, and real-time notifications.",       stack: ["React.js","Redux Toolkit","React Router v6","Tailwind CSS","Framer Motion"],       category: ["Full Stack","Frontend"], accent: "#f59e0b", number: "04" },
  { name: "A365",            tagline: "Advanced Software Solutions",      description: "Multi-page corporate web platform for a software solutions company offering IT consulting, cloud solutions, and cybersecurity services to 500+ clients across 25+ countries.",                                          stack: ["Next.js","React","CSS","Responsive Design","SEO Optimization"],                    category: ["Frontend"],              accent: "#0ea5e9", number: "05" },
  { name: "CFLRS",           tagline: "Education Analytics Platform",     description: "Government education analytics platform providing data-driven insights on student learning outcomes through seamless REST API integration within FLNSight.",                                                             stack: ["React.js","Redux","Node.js","Express.js","MongoDB"],                               category: ["Full Stack","GovTech"],  accent: "#10b981", number: "06" },
  { name: "SuperGlassEast FL",tagline: "Glass Restoration Platform",      description: "Full-stack business website for a certified mobile glass restoration franchise with SEO-optimized metadata, Open Graph tags, mobile-first design, and lead generation features.",                                        stack: ["HTML","CSS","JavaScript","Responsive Design","SEO"],                               category: ["Frontend"],              accent: "#f97316", number: "07" },
];

const filters = ["All","Frontend","Full Stack","Mobile","GovTech"];

function ProjectCard({ project, index }: { project: typeof allProjects[0]; index: number }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const cardRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    el.style.transform = `perspective(1000px) rotateX(${((y-cy)/cy)*-5}deg) rotateY(${((x-cx)/cx)*5}deg) scale(1.02)`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.34,1.56,0.64,1] }}
    >
      <div
        ref={cardRef}
        className="relative rounded-2xl p-6 flex flex-col gap-4 h-full cursor-default overflow-hidden project-card"
        style={{
          background: "var(--bg-card)",
          border: `1px solid ${hovered ? project.accent + "45" : "var(--border-subtle)"}`,
          backdropFilter: "blur(16px)",
          transition: "transform 0.15s ease, border-color 0.3s, box-shadow 0.3s",
          boxShadow: hovered
            ? isDark ? `0 0 40px ${project.accent}18, 0 8px 40px rgba(0,0,0,0.3)` : `0 8px 40px ${project.accent}15`
            : isDark ? "none" : "0 2px 16px rgba(0,0,0,0.05)",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
        data-testid={`project-${project.name.toLowerCase().replace(/\s+/g,"-")}`}
      >
        {/* Hover gradient */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0, background: isDark ? `radial-gradient(ellipse at top left,${project.accent}10,transparent 60%)` : `radial-gradient(ellipse at top left,${project.accent}07,transparent 60%)` }}
        />

        {/* Number watermark */}
        <div className="absolute top-4 right-4 font-mono text-4xl font-bold pointer-events-none select-none"
          style={{ color: `${project.accent}12` }}
        >{project.number}</div>

        <div className="relative z-10 flex flex-col gap-4 h-full">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-base" style={{ color: "var(--text-primary)" }}>{project.name}</h3>
              <p className="font-mono text-xs mt-0.5" style={{ color: project.accent }}>{project.tagline}</p>
            </div>
            <motion.div
              className="w-2 h-2 rounded-full shrink-0 mt-1.5"
              style={{ background: project.accent }}
              animate={{ boxShadow: [`0 0 4px ${project.accent}`,`0 0 12px ${project.accent}`,`0 0 4px ${project.accent}`] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                style={{ background: "var(--border-subtle)", border: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
              >{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [active, setActive] = useState("All");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const filtered = active === "All" ? allProjects : allProjects.filter((p) => p.category.includes(active));

  const bgColor = isDark ? "rgba(6,6,15,0)" : "rgba(245,245,250,0)";

  return (
    <section id="projects" ref={ref} className="py-32 relative overflow-hidden" data-testid="projects-section">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          style={{ background: `radial-gradient(circle,${isDark ? "rgba(124,58,237,0.04)" : "rgba(124,58,237,0.025)"},${bgColor})` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-[60px]"
              style={{ background: `linear-gradient(90deg,transparent,${isDark ? "#7c3aed" : "#6d28d9"})` }}
            />
            <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "var(--text-muted)" }}>
              What I've Built
            </span>
          </div>
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: "var(--text-primary)" }}>
            Featured{" "}
            <span className="gradient-heading">Projects</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {filters.map((f) => (
            <motion.button
              key={f}
              onClick={() => setActive(f)}
              className="px-5 py-2 rounded-full text-sm font-medium"
              style={{
                background: active === f
                  ? "linear-gradient(135deg,#7c3aed,#4f46e5)"
                  : "var(--bg-card)",
                border: active === f
                  ? "1px solid rgba(124,58,237,0.5)"
                  : "1px solid var(--border-subtle)",
                color: active === f ? "#fff" : "var(--text-secondary)",
                boxShadow: active === f ? (isDark ? "0 0 20px rgba(124,58,237,0.3)" : "0 4px 16px rgba(124,58,237,0.2)") : "none",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              data-testid={`filter-${f.toLowerCase().replace(/\s+/g,"-")}`}
            >{f}</motion.button>
          ))}
        </motion.div>

        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.name} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
