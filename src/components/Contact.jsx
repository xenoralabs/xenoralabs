import { useState } from "react";
import { Section } from "./utils";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  // Update on resize
  useState(() => {
    const fn = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", project: "", message: "" });
  };

  const inputStyle = {
    width: "100%", background: "rgba(6,8,18,0.8)", border: "1px solid rgba(56,189,248,0.15)",
    borderRadius: "6px", padding: "13px 16px", color: "#e8eaf0",
    fontFamily: "'Space Mono', monospace", fontSize: "0.85rem",
    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontFamily: "'Orbitron', sans-serif", fontSize: "0.65rem",
    letterSpacing: "2px", color: "#38bdf8", display: "block", marginBottom: "8px",
  };

  return (
    <Section id="contact" style={{ padding: "clamp(60px, 10vw, 120px) 5%", background: "rgba(6,8,18,0.5)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(36px, 6vw, 60px)" }}>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.7rem", letterSpacing: "4px", color: "#38bdf8", marginBottom: "16px" }}>// GET IN TOUCH</div>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900,
            background: "linear-gradient(135deg, #e8eaf0, #38bdf8)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "16px",
          }}>Start a Project</h2>
          <p style={{ color: "#64748b", fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>Have an idea? Let's build something extraordinary together.</p>
        </div>

        <div style={{
          background: "rgba(10,15,30,0.8)", border: "1px solid rgba(56,189,248,0.12)",
          borderRadius: "16px", padding: "clamp(24px, 5vw, 60px)", backdropFilter: "blur(10px)",
        }}>
          {sent && (
            <div style={{
              background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.3)",
              borderRadius: "8px", padding: "14px", textAlign: "center",
              color: "#38bdf8", fontFamily: "'Orbitron', sans-serif", fontSize: "0.75rem",
              letterSpacing: "1px", marginBottom: "24px",
            }}>✓ MESSAGE SENT — We'll get back to you within 24 hours!</div>
          )}

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "20px",
          }}>
            {/* Name */}
            <div>
              <label style={labelStyle}>Your Name</label>
              <input type="text" value={form.name} placeholder="John Doe"
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(56,189,248,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(56,189,248,0.15)"}
              />
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Email Address</label>
              <input type="email" value={form.email} placeholder="john@company.com"
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(56,189,248,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(56,189,248,0.15)"}
              />
            </div>

            {/* Project — full width */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Project Type</label>
              <input type="text" value={form.project} placeholder="e.g. Web App, AI Tool..."
                onChange={e => setForm({ ...form, project: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(56,189,248,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(56,189,248,0.15)"}
              />
            </div>

            {/* Message — full width */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Message</label>
              <textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us about your project..."
                rows={5}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={e => e.target.style.borderColor = "rgba(56,189,248,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(56,189,248,0.15)"}
              />
            </div>

            {/* Submit — full width */}
            <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
              <button onClick={handleSubmit} style={{
                background: "linear-gradient(135deg, #1a6cf5, #38bdf8)",
                border: "none", borderRadius: "4px",
                padding: isMobile ? "14px 0" : "16px 60px",
                width: isMobile ? "100%" : "auto",
                color: "#fff", fontFamily: "'Orbitron', sans-serif", fontSize: "0.78rem",
                letterSpacing: "3px", cursor: "pointer", textTransform: "uppercase",
                boxShadow: "0 0 30px rgba(56,189,248,0.3)", transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 0 50px rgba(56,189,248,0.5)"; }}
                onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 0 30px rgba(56,189,248,0.3)"; }}
              >Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
