import { Section } from "./utils";

export default function About() {
  return (
    <Section id="about" style={{ padding: "clamp(60px, 10vw, 120px) 5%" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: "clamp(36px, 6vw, 80px)",
          alignItems: "center",
        }}>
          {/* Left text */}
          <div>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.7rem", letterSpacing: "4px", color: "#38bdf8", marginBottom: "16px" }}>// ABOUT US</div>
            <h2 style={{
              fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
              fontWeight: 900, lineHeight: 1.15, marginBottom: "24px",
              background: "linear-gradient(135deg, #e8eaf0, #38bdf8)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>We Are Xenora Labs</h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: "20px", fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
              Xenora Labs is a full-stack development agency. We craft high-performance digital products — from AI-powered platforms to sleek web apps — with precision engineering and bold design.
            </p>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
              Based in Sri Lanka, we operate globally. Our mission is simple:{" "}
              <span style={{ color: "#38bdf8" }}>build intelligent, scalable, and beautiful software</span>{" "}
              that pushes the boundaries of what's possible.
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "32px", flexWrap: "wrap" }}>
              {["React","MongoDB","Node.js","Express.js","Python","JAVA","PHP","MySQL","C","HTML/CSS","JavaScript","AI/ML"].map(t => (
                <span key={t} style={{
                  background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.2)",
                  borderRadius: "3px", padding: "4px 12px", fontSize: "0.72rem",
                  fontFamily: "'Space Mono', monospace", color: "#38bdf8", letterSpacing: "1px",
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Right code block */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", inset: "-2px", borderRadius: "12px",
              background: "linear-gradient(135deg, rgba(26,108,245,0.4), rgba(56,189,248,0.1), transparent)",
              zIndex: 0,
            }} />
            <div style={{
              position: "relative", zIndex: 1, background: "rgba(10,15,30,0.8)",
              borderRadius: "12px", padding: "clamp(24px, 4vw, 40px)",
              border: "1px solid rgba(56,189,248,0.15)", backdropFilter: "blur(10px)",
            }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.82rem", color: "#475569", marginBottom: "20px" }}>// xenora-labs.config.js</div>
              {[
                ["agency",  '"Xenora Labs"'],
                ["founded", '"2026"'],
                ["stack",   '["MERN", "Python", "JAVA"]'],
                ["focus",   '"Full-Stack Dev"'],
                ["tagline", '"Building Intelligent Futures"'],
                ["status",  '"Open for projects ✓"'],
              ].map(([k, v]) => (
                <div key={k} style={{ marginBottom: "10px", fontFamily: "'Space Mono', monospace", fontSize: "clamp(0.72rem, 1.5vw, 0.82rem)" }}>
                  <span style={{ color: "#38bdf8" }}>{k}</span>
                  <span style={{ color: "#475569" }}>: </span>
                  <span style={{ color: "#a3e635" }}>{v}</span>
                  <span style={{ color: "#475569" }}>,</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
