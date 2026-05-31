import { useState } from "react";
import { Section } from "./utils";

export default function Team() {
  const members = [
    {
      name: "Sathira Sugeesvara",
      role: "Founder & Lead Developer",
      bio: "Visionary behind Xenora Labs. Full-stack engineer with a passion for AI and scalable architecture.",
      skills: ["MERN Stack", "JAVA", "MySQL"],
      initials: "SS",
      accent: "#38bdf8",
      photo: "/team/sathira.jpg",
    },
    {
      name: "Himansith Wickramasinghe",
      role: "Co-Founder & Backend Engineer",
      bio: "Architect of robust, high-performance systems. Specializes in APIs, databases, and cloud infrastructure.",
      skills: ["Python", "JAVA", "PHP"],
      initials: "HW",
      accent: "#a78bfa",
      photo: "/team/himansith.jpg",
    },
    {
      name: "Maleesha Dilshan",
      role: "Developer",
      bio: "Creative technologist bringing ideas to life with clean code, sharp design, and relentless execution.",
      skills: ["HTML", "CSS", "JavaScript", "MongoDB"],
      initials: "MD",
      accent: "#34d399",
      photo: "/team/maleesha.jpg",
    },
  ];

  return (
    <Section id="team" style={{ padding: "clamp(60px, 10vw, 120px) 5%" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 6vw, 70px)" }}>
          <div style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: "0.7rem",
            letterSpacing: "4px", color: "#38bdf8", marginBottom: "16px",
          }}>// THE TEAM</div>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900,
            background: "linear-gradient(135deg, #e8eaf0, #38bdf8)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Who We Are</h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "clamp(16px, 3vw, 28px)",
        }}>
          {members.map((m, i) => (
            <MemberCard key={i} m={m} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function MemberCard({ m }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div style={{
      background: "rgba(10,15,30,0.7)", border: "1px solid rgba(56,189,248,0.12)",
      borderRadius: "12px", padding: "clamp(24px, 4vw, 40px) clamp(20px, 3vw, 32px)",
      textAlign: "center", transition: "all 0.35s", backdropFilter: "blur(6px)",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = m.accent + "55";
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = `0 20px 40px ${m.accent}18`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(56,189,248,0.12)";
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* Avatar — photo with initials fallback */}
      <div style={{
        width: "100px", height: "100px", borderRadius: "50%",
        border: `2px solid ${m.accent}66`,
        boxShadow: `0 0 28px ${m.accent}28`,
        margin: "0 auto 20px",
        overflow: "hidden",
        position: "relative",
        background: `linear-gradient(135deg, ${m.accent}33, ${m.accent}11)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {!imgError ? (
          <img
            src={m.photo}
            alt={m.name}
            onError={() => setImgError(true)}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center top",
              display: "block",
            }}
          />
        ) : (
          <span style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: "1.4rem",
            fontWeight: 700, color: m.accent,
          }}>{m.initials}</span>
        )}
      </div>

      <div style={{
        fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(0.82rem, 2vw, 0.95rem)",
        fontWeight: 700, color: "#e8eaf0", marginBottom: "6px",
      }}>{m.name}</div>

      <div style={{
        color: m.accent, fontSize: "0.72rem",
        fontFamily: "'Space Mono', monospace", letterSpacing: "1.5px", marginBottom: "14px",
      }}>{m.role}</div>

      <p style={{
        color: "#64748b", fontSize: "clamp(0.82rem, 1.8vw, 0.87rem)",
        lineHeight: 1.7, marginBottom: "20px",
      }}>{m.bio}</p>

      <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
        {m.skills.map(s => (
          <span key={s} style={{
            background: `${m.accent}12`, border: `1px solid ${m.accent}25`,
            borderRadius: "3px", padding: "3px 10px", fontSize: "0.68rem",
            fontFamily: "'Space Mono', monospace", color: m.accent,
          }}>{s}</span>
        ))}
      </div>
    </div>
  );
}
