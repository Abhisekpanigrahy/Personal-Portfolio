import { motion } from "framer-motion";
import { Mail, Linkedin } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useTheme } from "@/lib/theme";

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/abhisek-panigrahy-754877228", color: "#0077B5" },
  { icon: SiGithub, label: "GitHub",   href: "https://github.com/abhisekpanigrahy",                 color: "#888" },
  { icon: Mail,     label: "Email",    href: "mailto:abhisekpanigrahy79@gmail.com",                 color: "#7c3aed" },
];

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className="relative pt-1" data-testid="footer">
      <div className="h-px"
        style={{ background: isDark
          ? "linear-gradient(90deg,transparent,rgba(124,58,237,0.5),rgba(0,255,255,0.3),transparent)"
          : "linear-gradient(90deg,transparent,rgba(109,40,217,0.3),rgba(8,145,178,0.2),transparent)"
        }}
      />
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-display font-bold text-sm">
          <span style={{ color: isDark ? "#7c3aed" : "#6d28d9" }}>&lt;</span>
          <span style={{ color: "var(--text-primary)" }}>Abhisek Panigrahy</span>
          <span style={{ color: isDark ? "#00ffff" : "#0891b2" }}>/&gt;</span>
          <span className="font-mono font-normal text-xs ml-3" style={{ color: "var(--text-faint)" }}>
            © {new Date().getFullYear()} All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, label, href, color }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
              whileHover={{ scale: 1.15, color, borderColor: `${color}40`, background: `${color}12` }}
              whileTap={{ scale: 0.9 }}
              aria-label={label}
              data-testid={`footer-social-${label.toLowerCase()}`}
            >
              <Icon size={14} />
            </motion.a>
          ))}
        </div>

        <p className="font-mono text-xs" style={{ color: "var(--text-faint)" }}>
          Built with React + Three.js
        </p>
      </div>
    </footer>
  );
}
