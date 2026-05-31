import { Section } from "./utils";

export default function Services() {
  const services = [
    { icon: "⚡", title: "Full-Stack Web Development", desc: "End-to-end web applications using the MERN stack — scalable architecture, RESTful APIs, and pixel-perfect frontends." },
    { icon: "🤖", title: "AI & Machine Learning", desc: "Smart, data-driven solutions powered by Python and modern ML frameworks. From NLP to predictive models." },
    { icon: "📱", title: "Mobile Applications", desc: "Cross-platform mobile apps with smooth UX and robust backends, built for real-world performance." },
    { icon: "🎨", title: "UI/UX & Branding", desc: "Distinctive visual identities and user interfaces that communicate your brand with clarity and impact." },
    { icon: "🔧", title: "Backend & APIs", desc: "High-performance servers, secure RESTful & GraphQL APIs, and database architecture using Node.js, PHP, and Python." },
    { icon: "☁️", title: "DevOps & Deployment", desc: "Cloud deployment, CI/CD pipelines, and hosting on Vercel, AWS, and more — so your product ships fast and stays up." },
  ];

  return (
    <Section id="services" style={{ padding: "clamp(60px, 10vw, 120px) 5%" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 7vw, 70px)" }}>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.7rem", letterSpacing: "4px", color: "#38bdf8", marginBottom: "16px" }}>// WHAT WE DO</div>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900,
            background: "linear-gradient(135deg, #e8eaf0, #38bdf8)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Our Services</h2>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "clamp(14px, 2.5vw, 24px)",
        }}>
          {services.map((s, i) => (
            <div key={i} style={{
              background: "rgba(10,15,30,0.7)", border: "1px solid rgba(56,189,248,0.12)",
              borderRadius: "10px", padding: "clamp(24px, 4vw, 36px) clamp(20px, 3vw, 28px)",
              transition: "all 0.35s", cursor: "default", backdropFilter: "blur(6px)",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(56,189,248,0.4)";
                e.currentTarget.style.background = "rgba(26,108,245,0.08)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(56,189,248,0.08)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(56,189,248,0.12)";
                e.currentTarget.style.background = "rgba(10,15,30,0.7)";
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "14px" }}>{s.icon}</div>
              <h3 style={{
                fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(0.8rem, 1.8vw, 0.92rem)",
                letterSpacing: "1px", color: "#e8eaf0", marginBottom: "10px", fontWeight: 700,
              }}>{s.title}</h3>
              <p style={{ color: "#64748b", fontSize: "clamp(0.82rem, 1.8vw, 0.9rem)", lineHeight: 1.75 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
