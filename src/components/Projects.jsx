import { useState } from "react";
import { Section } from "./utils";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const projects = [
    {
      title: "Lankago AI",
      desc: "An intelligent AI platform tailored for Sri Lankan users, locally aware, and built to solve real regional problems.",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Gemini AI", "OpenWeather API"],
      category: "AI",
      accent: "#38bdf8",
      icon: "🤖",
      image: "/projects/lankago.jpg",
      demo: "https://your-lankago-demo-url.com", // 🔁 Replace with actual demo URL------------------------------------------------------------------------------------------------------------------------------
    },
    {
      title: "Xaro Clothing",
      desc: "A modern e-commerce platform for a clothing brand — featuring dynamic product pages, cart system, and clean responsive UI.",
      tags: ["React", "Google Sheets", "TypeScript", "GitHub Pages"],
      category: "Web",
      accent: "#a78bfa",
      icon: "👕",
      image: "/projects/xaro.jpg",
      demo: " https://sathirasugeesvara.github.io/xaro-clothing/",
    },
    {
      title: "Pandora Welcome App",
      desc: "A stunning welcome & onboarding application with cinematic visuals and smooth animated transitions for premium user experiences.",
      tags: ["React", "CSS", "JavaScript", "Google Sheets", "GitHub", "Vercel"],
      category: "Web",
      accent: "#34d399",
      icon: "🌄",
      image: "/projects/pandora.jpg",
      demo: "https://pandora-welcome-app.vercel.app", 
    },
    {
      title: "Sathira's Portfolio",
      desc: "Personal developer portfolio with fully responsive layout, smooth navigation, project showcase, skills section, contact form, and a timeline of key milestones.",
      tags: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      category: "Web",
      accent: "#f59e0b",
      icon: "🧑‍💻",
      image: "/projects/sathiraportfolio.jpg",
      demo: "https://sathirasugeesvara.github.io",
    },
    // Add more projects as needed
  ];

  const categories = ["All", "Web", "AI"];
  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <Section id="projects" style={{ padding: "clamp(60px, 10vw, 120px) 5%", background: "rgba(6,8,18,0.5)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(36px, 6vw, 50px)" }}>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.7rem", letterSpacing: "4px", color: "#38bdf8", marginBottom: "16px" }}>// OUR WORK</div>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900,
            background: "linear-gradient(135deg, #e8eaf0, #38bdf8)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "28px",
          }}>Projects</h2>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{
                background: filter === c ? "linear-gradient(135deg, #1a6cf5, #38bdf8)" : "rgba(56,189,248,0.06)",
                border: filter === c ? "none" : "1px solid rgba(56,189,248,0.2)",
                borderRadius: "3px", padding: "8px 22px",
                color: filter === c ? "#fff" : "#64748b",
                fontFamily: "'Orbitron', sans-serif", fontSize: "0.7rem", letterSpacing: "2px",
                cursor: "pointer", transition: "all 0.2s",
              }}>{c}</button>
            ))}
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "clamp(14px, 2.5vw, 24px)",
        }}>
          {filtered.map((p, i) => (
            <ProjectCard key={i} p={p} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function ProjectCard({ p }) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: "rgba(10,15,30,0.8)", border: `1px solid ${hovered ? p.accent + "55" : "rgba(56,189,248,0.1)"}`,
        borderRadius: "12px", overflow: "hidden", transition: "all 0.35s",
        transform: hovered ? "translateY(-6px)" : "",
        boxShadow: hovered ? `0 24px 48px ${p.accent}15` : "",
        display: "flex", flexDirection: "column",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image header */}
      <div style={{
        height: "clamp(160px, 22vw, 200px)",
        position: "relative", overflow: "hidden",
        background: `linear-gradient(135deg, rgba(10,15,30,0.95), ${p.accent}22)`,
        flexShrink: 0,
      }}>
        {/* Project screenshot */}
        {!imgError ? (
          <img
            src={p.image}
            alt={p.title}
            onError={() => setImgError(true)}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "top center",
              display: "block",
              transition: "transform 0.5s ease",
              transform: hovered ? "scale(1.06)" : "scale(1)",
            }}
          />
        ) : (
          /* Fallback: emoji + grid pattern */
          <>
            <div style={{
              position: "absolute", inset: 0, opacity: 0.05,
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(56,189,248,0.5) 30px, rgba(56,189,248,0.5) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(56,189,248,0.5) 30px, rgba(56,189,248,0.5) 31px)",
            }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(2.5rem, 8vw, 4rem)" }}>
              {p.icon}
            </div>
          </>
        )}

        {/* Gradient overlay at bottom */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "60px",
          background: "linear-gradient(to top, rgba(10,15,30,0.9), transparent)",
        }} />

        {/* Emoji badge */}
        <div style={{
          position: "absolute", top: "12px", right: "12px",
          background: "rgba(6,8,18,0.75)", backdropFilter: "blur(8px)",
          border: `1px solid ${p.accent}33`,
          borderRadius: "8px", padding: "4px 10px",
          fontSize: "1rem", lineHeight: 1.5,
        }}>{p.icon}</div>

        {/* Category badge */}
        <div style={{
          position: "absolute", top: "12px", left: "12px",
          background: `${p.accent}22`, backdropFilter: "blur(8px)",
          border: `1px solid ${p.accent}44`,
          borderRadius: "4px", padding: "3px 10px",
          fontFamily: "'Orbitron', sans-serif", fontSize: "0.6rem",
          letterSpacing: "2px", color: p.accent,
        }}>{p.category}</div>

        {/* Demo hover overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: `${p.accent}18`,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}>
          <a
            href={p.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              background: "linear-gradient(135deg, #1a6cf5, #38bdf8)",
              border: "none", borderRadius: "4px",
              padding: "10px 28px",
              color: "#fff", fontFamily: "'Orbitron', sans-serif",
              fontSize: "0.7rem", letterSpacing: "2px",
              textDecoration: "none", textTransform: "uppercase",
              boxShadow: `0 0 24px ${p.accent}55`,
              transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: "8px",
            }}
          >
            <span>↗</span> Live Demo
          </a>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "clamp(18px, 3.5vw, 26px) clamp(16px, 3vw, 22px)", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(0.85rem, 2vw, 1rem)",
          fontWeight: 700, color: "#e8eaf0", marginBottom: "8px",
        }}>{p.title}</h3>
        <p style={{
          color: "#64748b", fontSize: "clamp(0.82rem, 1.8vw, 0.87rem)",
          lineHeight: 1.7, marginBottom: "16px", flex: 1,
        }}>{p.desc}</p>
        <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
          {p.tags.map(t => (
            <span key={t} style={{
              background: `${p.accent}15`, border: `1px solid ${p.accent}30`,
              borderRadius: "3px", padding: "3px 9px", fontSize: "0.66rem",
              fontFamily: "'Space Mono', monospace", color: p.accent,
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
