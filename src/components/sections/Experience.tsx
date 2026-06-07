import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Briefcase, ChevronDown } from "lucide-react";
import { useTheme } from "@/lib/theme";

const experiences = [
  {
    company: "APIE TECH", role: "Full Stack Engineer",
    period: "Dec 2024 – Present", duration: "1 yr 6 mos",
    location: "Bhubaneswar, Odisha · Remote", type: "Full-time", color: "#7c3aed",
    description: "Architect and deploy scalable, production-ready web and mobile applications using the MERN stack. Collaborate with cross-functional remote teams in agile sprints — define technical requirements, implement features, and conduct peer code reviews.",
    projects: [
      {
        name: "Velvet Bai", tagline: "Home Services Platform",
        stack: ["React.js","React Native","Redux","Node.js","Express.js","MongoDB","Razorpay","FCM"],
        highlights: [
          "Engineered end-to-end booking flow, earnings-to-transactions module, SOS functionality, job lifecycle management, and a dynamic service provider rating and review system for dual user and provider roles.",
          "Developed a comprehensive admin panel with analytics dashboard, dispute resolution, promotional code engine, exportable reports, real-time FCM push notifications, and a fully responsive role-based web application at scale.",
        ],
      },
      {
        name: "Samadhan", tagline: "Citizen Grievance Platform",
        stack: ["React Native","React.js","Node.js","Express.js","MongoDB","JWT","AWS S3","FCM","SendGrid","MSG91"],
        highlights: [
          "Built a full-stack citizen grievance platform with OTP-based phone authentication, complaint posting with media attachments, real-time status tracking, anonymous stealth-mode reporting, and multi-language support (English, Hindi, Odia).",
          "Developed admin and social worker modules with role-based access control, comprehensive analytics dashboard, master data management, complaint approval workflows, user verification, and export functionality.",
        ],
      },
      {
        name: "Pickup Ninja", tagline: "Hyper Local Delivery Service",
        stack: ["React.js","React Native","Next.js","Node.js","Express.js","Firebase Firestore","FCM","Sendgrid","Google Maps API"],
        highlights: [
          "Developed three application modules — Booking App, Rider App, and Admin Panel — for a hyperlocal pick-and-drop platform with real-time GPS tracking via TOOKAN API.",
          "Implemented FCM push notifications, Sendgrid email alerts, OpenMoney payment gateway, and Google Maps API for a seamless end-to-end delivery experience.",
        ],
      },
      {
        name: "CFLRS", tagline: "Foundational Learning Reporting System",
        stack: ["React.js","Redux","Node.js","Express.js","MongoDB"],
        highlights: [
          "Designed and integrated the Schools module UI within FLNSight, a government education analytics platform.",
          "Enabled data-driven insights on student learning outcomes through seamless REST API integration.",
        ],
      },
      {
        name: "IPEL", tagline: "Digital Repository",
        stack: ["React.js","Redux","Node.js","Express.js","MongoDB"],
        highlights: [
          "Built REST API integrations for a centralized repository managing project documents, resources, images, and videos.",
          "Developed real-time dynamic dashboards to monitor and visualize key project initiative metrics.",
        ],
      },
      {
        name: "Novaite", tagline: "AI-Driven Digital Solutions Platform",
        stack: ["React.js","GraphQL","Directus"],
        highlights: [
          "Integrated GraphQL APIs to unify data flows between frontend components and backend services.",
          "Contributed to automating business operations and enhancing customer engagement using Directus CMS.",
        ],
      },
      {
        name: "Contractr", tagline: "B2B Manpower Marketplace · kontract.in",
        stack: ["React.js","Redux Toolkit","React Router v6","Tailwind CSS","Framer Motion","Lucide React"],
        highlights: [
          "Developed a full-featured B2B Manpower Marketplace with three separate portals for Vendor, Company, and Admin users featuring role-based protected routing and responsive design.",
          "Built user management modules with dashboards, application tracking, contract management, job postings, revenue tracking, and real-time notifications; resolved critical bugs across authentication flow, routing, and UI rendering.",
        ],
      },
      {
        name: "A365", tagline: "Advanced Software Solutions Platform · a365.io",
        stack: ["Next.js","React","CSS","Responsive Design","SEO Optimization"],
        highlights: [
          "Built a multi-page corporate web platform for a software solutions company offering IT consulting, cloud solutions, and cybersecurity services to 500+ clients across 25+ countries.",
          "Developed a scalable Next.js-based frontend with optimized static assets, custom branding, enterprise/SMB solution tiers, and a lead generation contact flow.",
        ],
      },
      {
        name: "SuperGlassEast FL", tagline: "Windshield Repair & Glass Restoration · superglassfl.com",
        stack: ["HTML","CSS","JavaScript","Responsive Design","SEO"],
        highlights: [
          "Developed a full-stack business website for a certified mobile glass restoration franchise with dedicated service pages covering windshield repair, fleet services, boat glass, and aquarium restoration.",
          "Integrated SEO-optimized metadata, Open Graph tags, mobile-first responsive design, and lead generation features including free quote CTA and click-to-call functionality.",
        ],
      },
    ],
  },
  {
    company: "CODEKART", role: "Web Developer Intern",
    period: "Dec 2021 – Jul 2022", duration: "8 mos",
    location: "Bhubaneswar, Odisha · Remote", type: "Internship", color: "#00c97a",
    description: "Developed responsive, accessible UI screens and Single Page Application modules as a front-end developer. Delivered modular, reusable React components with clean, maintainable code following industry best practices.",
    projects: [
      {
        name: "CKARE", tagline: "Clinic Management Web Application",
        stack: ["React.js","Redux","Bootstrap","Material UI"],
        highlights: [
          "Designed and developed a full-featured clinic management SPA enabling service delivery to Pro and Member users.",
          "Implemented payment gateway integration and barcode generation to streamline clinic operations. Team Size: 7 Members.",
        ],
      },
      {
        name: "POLITIX", tagline: "Political Video & Live Streaming Platform",
        stack: ["React.js","Redux","Bootstrap","Material UI"],
        highlights: [
          "Built a video and live-streaming platform for US political news enabling user-generated and moderated video content.",
          "Developed features for content creation, live broadcasting, and content moderation to democratize political journalism. Team Size: 8 Members.",
        ],
      },
    ],
  },
];

function ProjectCard({ project, accentColor }: { project: typeof experiences[0]["projects"][0]; accentColor: string }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl p-4 space-y-3"
      style={{
        background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.7)",
        border: `1px solid ${accentColor}18`,
        backdropFilter: "blur(10px)",
      }}
      data-testid={`project-card-${project.name.toLowerCase().replace(/\s+/g,"-")}`}
    >
      <div>
        <h4 className="font-display font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{project.name}</h4>
        <p className="font-mono text-xs mt-0.5" style={{ color: accentColor }}>{project.tagline}</p>
      </div>
      <ul className="space-y-1.5">
        {project.highlights.map((h, i) => (
          <li key={i} className="text-xs flex gap-2" style={{ color: "var(--text-secondary)" }}>
            <span className="mt-0.5 shrink-0" style={{ color: accentColor }}>›</span>{h}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1.5 pt-1">
        {project.stack.map((tech) => (
          <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full font-mono"
            style={{ background: `${accentColor}10`, border: `1px solid ${accentColor}22`, color: `${accentColor}cc` }}
          >{tech}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [expanded, setExpanded] = useState<number | null>(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleToggle = (i: number) => {
    setExpanded((prev) => (prev === i ? null : i));
  };

  return (
    <section id="experience" ref={ref} className="py-32 relative overflow-hidden" data-testid="experience-section">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px]"
          style={{ background: `radial-gradient(circle,${isDark ? "rgba(0,201,122,0.05)" : "rgba(0,201,122,0.03)"},transparent)` }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
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
              Where I've Worked
            </span>
          </div>
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: "var(--text-primary)" }}>
            Work{" "}
            <span className="gradient-heading">Experience</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px"
            style={{ background: isDark ? "linear-gradient(180deg,#7c3aed,rgba(0,201,122,0.3),transparent)" : "linear-gradient(180deg,rgba(109,40,217,0.4),rgba(0,201,122,0.2),transparent)" }}
          />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.2, duration: 0.7 }}
                className="relative pl-16"
              >
                <motion.div
                  className="absolute left-[18px] top-6 w-4 h-4 rounded-full"
                  style={{ background: exp.color, border: `2px solid var(--bg-primary)` }}
                  animate={{ boxShadow: [`0 0 8px ${exp.color}`,`0 0 20px ${exp.color}`,`0 0 8px ${exp.color}`] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />

                <div className="rounded-2xl overflow-hidden exp-card"
                  style={{
                    background: "var(--bg-card)",
                    border: `1px solid ${expanded === i ? exp.color + "35" : "var(--border-subtle)"}`,
                    backdropFilter: "blur(16px)",
                    transition: "border-color 0.3s",
                    boxShadow: isDark ? "none" : "0 2px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  <button
                    className="w-full text-left p-6 flex items-start justify-between gap-4"
                    onClick={() => handleToggle(i)}
                    data-testid={`experience-toggle-${i}`}
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display font-bold text-lg" style={{ color: "var(--text-primary)" }}>{exp.company}</h3>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider"
                          style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}30`, color: exp.color }}
                        >{exp.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium text-sm" style={{ color: exp.color }}>
                        <Briefcase size={13} />{exp.role}
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
                        <span className="flex items-center gap-1"><Calendar size={11} />{exp.period} · {exp.duration}</span>
                        <span className="flex items-center gap-1"><MapPin size={11} />{exp.location}</span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expanded === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ color: "var(--text-muted)" }}
                      className="shrink-0 mt-1"
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {expanded === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.76,0,0.24,1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 space-y-5"
                          style={{ borderTop: `1px solid ${exp.color}15` }}
                        >
                          <p className="text-sm leading-relaxed pt-4" style={{ color: "var(--text-secondary)" }}>{exp.description}</p>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {exp.projects.map((p) => (
                              <ProjectCard key={p.name} project={p} accentColor={exp.color} />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
