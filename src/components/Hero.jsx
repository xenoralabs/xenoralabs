import { Typewriter } from "./utils";

export default function Hero() {
  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", padding: "clamp(100px, 15vw, 140px) 5% clamp(60px, 10vw, 80px)",
      textAlign: "center",
    }}>
      <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", width: "100%" }}>
        {/* Glowing orb */}
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: "clamp(200px, 50vw, 340px)", height: "clamp(200px, 50vw, 340px)", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(26,108,245,0.18) 0%, transparent 70%)",
          filter: "blur(40px)", zIndex: 0,
        }} />

        <img src="/favicon.png" alt="Xenora Labs" style={{
          height: "clamp(90px, 20vw, 160px)", objectFit: "contain", marginBottom: "20px",
          position: "relative", zIndex: 1,
          filter: "drop-shadow(0 0 32px rgba(56,189,248,0.5))",
          animation: "float 4s ease-in-out infinite",
        }} />

        <div style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.9rem, 6vw, 4.2rem)",
          fontWeight: 900, letterSpacing: "clamp(2px, 1vw, 4px)", lineHeight: 1.1,
          background: "linear-gradient(135deg, #e8eaf0 30%, #38bdf8 70%, #1a6cf5 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          marginBottom: "8px",
        }}>XENORA LABS</div>

        <div style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(0.6rem, 2vw, 1rem)",
          letterSpacing: "clamp(3px, 1.5vw, 6px)", color: "#38bdf8",
          marginBottom: "24px", textTransform: "uppercase",
        }}>— Building Intelligent Futures —</div>

        <div style={{
          fontSize: "clamp(0.95rem, 2.5vw, 1.5rem)", color: "#cbd5e1", marginBottom: "44px",
          fontFamily: "'Space Mono', monospace", minHeight: "2.4em",
          padding: "0 clamp(0px, 2vw, 20px)",
        }}>
          We build{" "}
          <Typewriter words={["Web Applications", "AI Solutions", "Mobile Apps", "Digital Products", "the Future"]} />
        </div>

        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", padding: "0 5%" }}>
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "linear-gradient(135deg, #1a6cf5, #38bdf8)",
              border: "none", borderRadius: "4px", padding: "13px clamp(20px, 5vw, 36px)",
              color: "#fff", fontFamily: "'Orbitron', sans-serif", fontSize: "0.75rem",
              letterSpacing: "2px", cursor: "pointer", textTransform: "uppercase",
              boxShadow: "0 0 24px rgba(56,189,248,0.35)", transition: "all 0.3s",
              flex: "1 1 auto", maxWidth: "220px",
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 0 40px rgba(56,189,248,0.55)"; }}
            onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 0 24px rgba(56,189,248,0.35)"; }}
          >View Our Work</button>

          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "transparent", border: "1px solid rgba(56,189,248,0.5)",
              borderRadius: "4px", padding: "13px clamp(20px, 5vw, 36px)",
              color: "#38bdf8", fontFamily: "'Orbitron', sans-serif", fontSize: "0.75rem",
              letterSpacing: "2px", cursor: "pointer", textTransform: "uppercase",
              transition: "all 0.3s", flex: "1 1 auto", maxWidth: "220px",
            }}
            onMouseEnter={e => { e.target.style.background = "rgba(56,189,248,0.08)"; e.target.style.borderColor = "#38bdf8"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(56,189,248,0.5)"; }}
          >Hire Us</button>
        </div>

        {/* Scroll indicator */}
        <div style={{ marginTop: "clamp(40px, 8vw, 64px)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "1px", height: "50px", background: "linear-gradient(to bottom, #38bdf8, transparent)", animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.6rem", letterSpacing: "3px", color: "#475569" }}>SCROLL</span>
        </div>
      </div>
    </section>
  );
}
