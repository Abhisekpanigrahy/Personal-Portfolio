import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Linkedin } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useTheme } from "@/lib/theme";

const schema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  email:   z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type FormData = z.infer<typeof schema>;

const contactInfo = [
  { icon: Mail,  label: "Email",    value: "abhisekpanigrahy79@gmail.com", href: "mailto:abhisekpanigrahy79@gmail.com", color: "#7c3aed" },
  { icon: Phone, label: "Phone",    value: "+91 9348657780",               href: "tel:+919348657780",                  color: "#00c97a" },
  { icon: MapPin,label: "Location", value: "Berhampur, Odisha, India",     href: null,                                 color: "#ec4899" },
];
const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/abhisek-panigrahy-754877228", color: "#0077B5" },
  { icon: SiGithub, label: "GitHub",   href: "https://github.com/abhisekpanigrahy",                 color: "#888" },
  { icon: Mail,     label: "Email",    href: "mailto:abhisekpanigrahy79@gmail.com",                 color: "#7c3aed" },
];

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

export default function Contact() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ref = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [focused, setFocused]     = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: FormData) => {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setError("Email service not configured. Please contact me directly at abhisekpanigrahy79@gmail.com");
      return;
    }
    setSending(true); setError(null);
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
        { name: data.name, email: data.email, title: data.message },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setSubmitted(true); form.reset();
      setTimeout(() => setSubmitted(false), 6000);
    } catch {
      setError("Failed to send. Please email me directly at abhisekpanigrahy79@gmail.com");
    } finally { setSending(false); }
  };

  const inputStyle = (field: string) => ({
    background: focused === field
      ? isDark ? "rgba(124,58,237,0.07)" : "rgba(124,58,237,0.04)"
      : "var(--bg-card)",
    border: `1px solid ${focused === field ? "rgba(124,58,237,0.45)" : "var(--border-subtle)"}`,
    color: "var(--text-primary)",
    boxShadow: focused === field ? (isDark ? "0 0 20px rgba(124,58,237,0.1)" : "0 0 12px rgba(124,58,237,0.08)") : "none",
    caretColor: "#7c3aed",
    outline: "none",
    transition: "all 0.25s ease",
    backdropFilter: "blur(10px)",
  });

  const violet = isDark ? "#7c3aed" : "#6d28d9";

  return (
    <section id="contact" ref={ref} className="py-32 relative overflow-hidden" data-testid="contact-section">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px]"
          style={{ background: `radial-gradient(circle,${isDark ? "rgba(0,255,255,0.05)" : "rgba(8,145,178,0.04)"},transparent)` }}
        />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px]"
          style={{ background: `radial-gradient(circle,${isDark ? "rgba(124,58,237,0.05)" : "rgba(124,58,237,0.03)"},transparent)` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-[60px]"
              style={{ background: `linear-gradient(90deg,transparent,${violet})` }}
            />
            <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "var(--text-muted)" }}>
              Get In Touch
            </span>
          </div>
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: "var(--text-primary)" }}>
            Let's{" "}
            <span className="gradient-heading">Connect</span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Have a project in mind or want to collaborate? I'm always open to discussing new opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="space-y-6"
          >
            {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
              <motion.div
                key={label}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", backdropFilter: "blur(10px)" }}
                whileHover={{ borderColor: `${color}35`, background: isDark ? `${color}06` : `${color}04` }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                >
                  <Icon size={16} style={{ color }} />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "var(--text-faint)" }}>{label}</p>
                  {href
                    ? <a href={href} className="text-sm font-medium transition-colors duration-200 hover:underline"
                        style={{ color: "var(--text-secondary)" }} data-testid={`contact-${label.toLowerCase()}`}>{value}</a>
                    : <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{value}</p>
                  }
                </div>
              </motion.div>
            ))}

            <div>
              <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--text-faint)" }}>Connect With Me</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
                    whileHover={{ scale: 1.1, color, borderColor: `${color}40`, background: `${color}12`, boxShadow: isDark ? `0 0 20px ${color}25` : `0 4px 16px ${color}18` }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={label}
                    data-testid={`social-${label.toLowerCase()}`}
                  >
                    <Icon size={17} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl relative overflow-hidden"
              style={{ background: "var(--bg-card)", border: "1px solid rgba(0,201,122,0.18)", backdropFilter: "blur(10px)" }}
            >
              <div className="absolute inset-0 rounded-2xl"
                style={{ background: isDark ? "radial-gradient(ellipse at top left,rgba(0,201,122,0.05),transparent)" : "radial-gradient(ellipse at top left,rgba(0,201,122,0.03),transparent)" }}
              />
              <div className="relative z-10 flex items-start gap-3">
                <motion.div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: "#00c97a" }}
                  animate={{ opacity: [1,0.3,1] }} transition={{ duration: 1.5, repeat: Infinity }}
                />
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Currently <span style={{ color: "#00c97a", fontWeight: 600 }}>open to opportunities</span> — full-time roles, freelance projects, and interesting collaborations. Response time: within 24 hours.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            <form
              ref={formRef}
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-2xl p-6 space-y-5 relative overflow-hidden"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", backdropFilter: "blur(20px)", boxShadow: isDark ? "none" : "0 4px 30px rgba(0,0,0,0.06)" }}
              data-testid="contact-form"
            >
              <div className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: isDark ? "radial-gradient(ellipse at top right,rgba(124,58,237,0.05),transparent 60%)" : "radial-gradient(ellipse at top right,rgba(124,58,237,0.03),transparent 60%)" }}
              />

              <div className="relative z-10 space-y-5">
                {[
                  { id: "name",    label: "Name",    type: "text",  placeholder: "Your name",             rows: undefined },
                  { id: "email",   label: "Email",   type: "email", placeholder: "your@email.com",        rows: undefined },
                  { id: "message", label: "Message", type: "text",  placeholder: "Tell me about your project...", rows: 5 },
                ].map(({ id, label, type, placeholder, rows }) => (
                  <div key={id} className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{label}</label>
                    {rows ? (
                      <textarea
                        {...form.register(id as keyof FormData)}
                        rows={rows}
                        placeholder={placeholder}
                        className="w-full rounded-xl px-4 py-3.5 text-sm font-medium"
                        style={{ ...inputStyle(id), resize: "none" }}
                        onFocus={() => setFocused(id)}
                        onBlur={() => setFocused(null)}
                        data-testid={`input-${id}`}
                      />
                    ) : (
                      <input
                        {...form.register(id as keyof FormData)}
                        type={type}
                        placeholder={placeholder}
                        className="w-full rounded-xl px-4 py-3.5 text-sm font-medium"
                        style={inputStyle(id)}
                        onFocus={() => setFocused(id)}
                        onBlur={() => setFocused(null)}
                        data-testid={`input-${id}`}
                      />
                    )}
                    {form.formState.errors[id as keyof FormData] && (
                      <p className="text-xs" style={{ color: "#f87171" }}>
                        {form.formState.errors[id as keyof FormData]?.message}
                      </p>
                    )}
                  </div>
                ))}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-start gap-2 text-sm py-3 px-4 rounded-xl"
                    style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171" }}
                    data-testid="form-error"
                  >
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />{error}
                  </motion.div>
                )}

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 text-sm py-3 px-4 rounded-xl"
                    style={{ background: "rgba(0,201,122,0.08)", border: "1px solid rgba(0,201,122,0.2)", color: "#00c97a" }}
                    data-testid="form-success"
                  >
                    <CheckCircle size={16} />Message sent! I'll get back to you within 24 hours.
                  </motion.div>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm relative overflow-hidden group"
                    style={{
                      background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                      color: "#fff",
                      boxShadow: isDark ? "0 0 30px rgba(124,58,237,0.3)" : "0 4px 20px rgba(124,58,237,0.25)",
                      opacity: sending ? 0.7 : 1,
                    }}
                    whileHover={{ scale: sending ? 1 : 1.02, boxShadow: isDark ? "0 0 40px rgba(124,58,237,0.5)" : "0 6px 28px rgba(124,58,237,0.35)" }}
                    whileTap={{ scale: sending ? 1 : 0.98 }}
                    data-testid="button-submit"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(135deg,#6d28d9,#7c3aed)" }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      {sending ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={15} />}
                      {sending ? "Sending..." : "Send Message"}
                    </span>
                  </motion.button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
