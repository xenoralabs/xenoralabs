import { Section } from "./utils";

export default function Stats() {
  const stats = [
    { val: "5+", label: "Projects Shipped" },
    { val: "3",  label: "Core Members" },
    { val: "100%", label: "Client Satisfaction" },
    { val: "∞",  label: "Lines of Code" },
  ];
  return (
    <Section id="stats" style={{
      padding: "clamp(40px, 8vw, 60px) 5%",
      borderTop: "1px solid rgba(56,189,248,0.08)",
      borderBottom: "1px solid rgba(56,189,248,0.08)",
    }}>
      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
        gap: "clamp(20px, 4vw, 32px)",
      }}>
        {stats.map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.8rem, 5vw, 3rem)",
              fontWeight: 900, background: "linear-gradient(135deg, #38bdf8, #1a6cf5)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>{s.val}</div>
            <div style={{
              color: "#64748b", fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)",
              letterSpacing: "2px", fontFamily: "'Orbitron', sans-serif", marginTop: "4px",
            }}>{s.label}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
