import { useState, useEffect, useRef } from "react";


function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const count = 90;
    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(30,130,255,0.55)";
        ctx.fill();
      });
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(30,130,255,${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 0, pointerEvents: "none" }} />;
}

// ── Typewriter ───────────────────────────────────────────────────────────────
function Typewriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx % words.length];
    let timeout;
    if (!deleting && text.length < word.length) {
      timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), 80);
    } else if (!deleting && text.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 45);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setIdx(i => i + 1);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, words]);

  return (
    <span style={{ color: "#38bdf8" }}>
      {text}<span style={{ animation: "blink 1s infinite", color: "#38bdf8" }}>|</span>
    </span>
  );
}

// ── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Section Wrapper ──────────────────────────────────────────────────────────
function Section({ id, children, style }) {
  const [ref, visible] = useReveal();
  return (
    <section id={id} ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: "opacity 0.75s ease, transform 0.75s ease",
      ...style
    }}>
      {children}
    </section>
  );
}

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["Home", "About", "Services", "Projects", "Team", "Contact"];
  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(6,8,18,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(18px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(56,189,248,0.12)" : "none",
      transition: "all 0.4s ease",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 5%", height: "70px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => scrollTo("home")}>
        <img src="/favicon.png" alt="Xenora Labs" style={{ height: "38px", objectFit: "contain" }} />
        <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "2px", color: "#e8eaf0" }}>
          XENORA <span style={{ color: "#38bdf8" }}>LABS</span>
        </span>
      </div>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: "32px" }} className="nav-desktop">
        {links.map(l => (
          <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{
            background: "none", border: "none", color: active === l.toLowerCase() ? "#38bdf8" : "#9ca3af",
            fontFamily: "'Orbitron', sans-serif", fontSize: "0.72rem", letterSpacing: "2px",
            cursor: "pointer", textTransform: "uppercase", transition: "color 0.2s",
            padding: "4px 0", borderBottom: active === l.toLowerCase() ? "1px solid #38bdf8" : "1px solid transparent",
          }}
            onMouseEnter={e => e.target.style.color = "#38bdf8"}
            onMouseLeave={e => { if (active !== l.toLowerCase()) e.target.style.color = "#9ca3af"; }}
          >{l}</button>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setOpen(!open)} className="nav-mobile-btn" style={{
        background: "none", border: "none", cursor: "pointer", display: "none", flexDirection: "column", gap: "5px", padding: "4px"
      }}>
        {[0, 1, 2].map(i => <span key={i} style={{ width: "24px", height: "2px", background: "#38bdf8", display: "block", transition: "all 0.3s" }} />)}
      </button>

      {open && (
        <div style={{
          position: "fixed", top: "70px", left: 0, right: 0, background: "rgba(6,8,18,0.97)",
          borderBottom: "1px solid rgba(56,189,248,0.15)", padding: "20px 5%",
          display: "flex", flexDirection: "column", gap: "16px", zIndex: 99,
        }}>
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{
              background: "none", border: "none", color: "#e8eaf0", fontFamily: "'Orbitron', sans-serif",
              fontSize: "0.85rem", letterSpacing: "2px", cursor: "pointer", textAlign: "left", padding: "8px 0",
            }}>{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", padding: "120px 5% 80px", textAlign: "center",
    }}>
      <div style={{ position: "relative", zIndex: 1, maxWidth: "860px" }}>
        {/* Glowing orb behind logo */}
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: "340px", height: "340px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(26,108,245,0.18) 0%, transparent 70%)",
          filter: "blur(40px)", zIndex: 0,
        }} />
        <img src="/favicon.png" alt="Xenora Labs" style={{
          height: "160px", objectFit: "contain", marginBottom: "20px",
          position: "relative", zIndex: 1,
          filter: "drop-shadow(0 0 32px rgba(56,189,248,0.5))",
          animation: "float 4s ease-in-out infinite",
        }} />
        <div style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
          fontWeight: 900, letterSpacing: "4px", lineHeight: 1.1,
          background: "linear-gradient(135deg, #e8eaf0 30%, #38bdf8 70%, #1a6cf5 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          marginBottom: "8px",
        }}>XENORA LABS</div>
        <div style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(0.75rem, 2vw, 1rem)",
          letterSpacing: "6px", color: "#38bdf8", marginBottom: "28px", textTransform: "uppercase",
        }}>— Building Intelligent Futures —</div>
        <div style={{
          fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "#cbd5e1", marginBottom: "48px",
          fontFamily: "'Space Mono', monospace", minHeight: "2em",
        }}>
          We build{" "}
          <Typewriter words={["Web Applications", "AI Solutions", "Mobile Apps", "Digital Products", "the Future"]} />
        </div>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "linear-gradient(135deg, #1a6cf5, #38bdf8)",
              border: "none", borderRadius: "4px", padding: "14px 36px",
              color: "#fff", fontFamily: "'Orbitron', sans-serif", fontSize: "0.78rem",
              letterSpacing: "2px", cursor: "pointer", textTransform: "uppercase",
              boxShadow: "0 0 24px rgba(56,189,248,0.35)", transition: "all 0.3s",
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 0 40px rgba(56,189,248,0.55)"; }}
            onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 0 24px rgba(56,189,248,0.35)"; }}
          >View Our Work</button>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "transparent", border: "1px solid rgba(56,189,248,0.5)",
              borderRadius: "4px", padding: "14px 36px",
              color: "#38bdf8", fontFamily: "'Orbitron', sans-serif", fontSize: "0.78rem",
              letterSpacing: "2px", cursor: "pointer", textTransform: "uppercase", transition: "all 0.3s",
            }}
            onMouseEnter={e => { e.target.style.background = "rgba(56,189,248,0.08)"; e.target.style.borderColor = "#38bdf8"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(56,189,248,0.5)"; }}
          >Hire Us</button>
        </div>
        {/* Scroll indicator */}
        <div style={{ marginTop: "64px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "1px", height: "50px", background: "linear-gradient(to bottom, #38bdf8, transparent)", animation: "pulse 2s infinite" }} />
          <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.6rem", letterSpacing: "3px", color: "#475569" }}>SCROLL</span>
        </div>
      </div>
    </section>
  );
}

// ── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { val: "5+", label: "Projects Shipped" },
    { val: "3", label: "Core Members" },
    { val: "100%", label: "Client Satisfaction" },
    { val: "∞", label: "Lines of Code" },
  ];
  return (
    <Section id="stats" style={{ padding: "60px 5%", borderTop: "1px solid rgba(56,189,248,0.08)", borderBottom: "1px solid rgba(56,189,248,0.08)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px" }}>
        {stats.map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 900, background: "linear-gradient(135deg, #38bdf8, #1a6cf5)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>{s.val}</div>
            <div style={{ color: "#64748b", fontSize: "0.8rem", letterSpacing: "2px", fontFamily: "'Orbitron', sans-serif", marginTop: "4px" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <Section id="about" style={{ padding: "120px 5%", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.7rem", letterSpacing: "4px", color: "#38bdf8", marginBottom: "16px" }}>// ABOUT US</div>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 900, lineHeight: 1.15, marginBottom: "24px",
            background: "linear-gradient(135deg, #e8eaf0, #38bdf8)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>We Are Xenora Labs</h2>
          <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: "20px", fontSize: "1rem" }}>
            Xenora Labs is a full-stack development agency. We craft high-performance digital products — from AI-powered platforms to sleek web apps — with precision engineering and bold design.
          </p>
          <p style={{ color: "#94a3b8", lineHeight: 1.8, fontSize: "1rem" }}>
            Based in Sri Lanka, we operate globally. Our mission is simple: <span style={{ color: "#38bdf8" }}>build intelligent, scalable, and beautiful software</span> that pushes the boundaries of what's possible.
          </p>
          <div style={{ display: "flex", gap: "24px", marginTop: "36px", flexWrap: "wrap" }}>
            {["React","MongoDB","Node.js", "Express.js", "Python", "JAVA", "PHP", "MySQL", "C", "HTML/CSS", "JavaScript", "AI/ML"].map(t => (
              <span key={t} style={{
                background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.2)",
                borderRadius: "3px", padding: "4px 12px", fontSize: "0.72rem",
                fontFamily: "'Space Mono', monospace", color: "#38bdf8", letterSpacing: "1px",
              }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", inset: "-2px", borderRadius: "12px",
            background: "linear-gradient(135deg, rgba(26,108,245,0.4), rgba(56,189,248,0.1), transparent)",
            zIndex: 0,
          }} />
          <div style={{
            position: "relative", zIndex: 1, background: "rgba(10,15,30,0.8)",
            borderRadius: "12px", padding: "40px", border: "1px solid rgba(56,189,248,0.15)",
            backdropFilter: "blur(10px)",
          }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.85rem", color: "#475569", marginBottom: "20px" }}>// xenora-labs.config.js</div>
            {[
              ["agency", '"Xenora Labs"'],
              ["founded", '"2026"'],
              ["stack", '["MERN", "Python", "JAVA"]'],
              ["focus", '"Full-Stack Dev"'],
              ["tagline", '"Building Intelligent Futures"'],
              ["status", '"Open for projects ✓"'],
            ].map(([k, v]) => (
              <div key={k} style={{ marginBottom: "10px", fontFamily: "'Space Mono', monospace", fontSize: "0.82rem" }}>
                <span style={{ color: "#38bdf8" }}>{k}</span>
                <span style={{ color: "#475569" }}>: </span>
                <span style={{ color: "#a3e635" }}>{v}</span>
                <span style={{ color: "#475569" }}>,</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Services ──────────────────────────────────────────────────────────────────
function Services() {
  const services = [
    { icon: "⚡", title: "Full-Stack Web Development", desc: "End-to-end web applications using the MERN stack — scalable architecture, RESTful APIs, and pixel-perfect frontends." },
    { icon: "🤖", title: "AI & Machine Learning", desc: "Smart, data-driven solutions powered by Python and modern ML frameworks. From NLP to predictive models." },
    { icon: "📱", title: "Mobile Applications", desc: "Cross-platform mobile apps with smooth UX and robust backends, built for real-world performance." },
    { icon: "🎨", title: "UI/UX & Branding", desc: "Distinctive visual identities and user interfaces that communicate your brand with clarity and impact." },
    { icon: "🔧", title: "Backend & APIs", desc: "High-performance servers, secure RESTful & GraphQL APIs, and database architecture using Node.js, PHP, and Python." },
    { icon: "☁️", title: "DevOps & Deployment", desc: "Cloud deployment, CI/CD pipelines, and hosting on Vercel, AWS, and more — so your product ships fast and stays up." },
  ];
  return (
    <Section id="services" style={{ padding: "120px 5%" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "70px" }}>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.7rem", letterSpacing: "4px", color: "#38bdf8", marginBottom: "16px" }}>// WHAT WE DO</div>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900,
            background: "linear-gradient(135deg, #e8eaf0, #38bdf8)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Our Services</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {services.map((s, i) => (
            <div key={i} style={{
              background: "rgba(10,15,30,0.7)", border: "1px solid rgba(56,189,248,0.12)",
              borderRadius: "10px", padding: "36px 28px", transition: "all 0.35s",
              cursor: "default", backdropFilter: "blur(6px)",
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
              <div style={{ fontSize: "2.2rem", marginBottom: "16px" }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.92rem", letterSpacing: "1px", color: "#e8eaf0", marginBottom: "12px", fontWeight: 700 }}>{s.title}</h3>
              <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.75 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────
function Projects() {
  const [filter, setFilter] = useState("All");
  const projects = [
    {
      title: "Lankago AI",
      desc: "An intelligent AI platform tailored for Sri Lankan users, locally aware, and built to solve real regional problems.",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Gemini AI", "OpenWeather API"],
      category: "AI",
      accent: "#38bdf8",
      icon: "🤖",
    },
    {
      title: "Xaro Clothing",
      desc: "A modern e-commerce platform for a clothing brand — featuring dynamic product pages, cart system, and clean responsive UI.",
      tags: ["React", "Google Sheets", "TypeScript"],
      category: "Web",
      accent: "#a78bfa",
      icon: "👕",
    },
    {
      title: "Panorama Welcome App",
      desc: "A stunning welcome & onboarding application with cinematic visuals and smooth animated transitions for premium user experiences.",
      tags: ["React", "CSS", "JavaScript", "Google Sheets"],
      category: "Web",
      accent: "#34d399",
      icon: "🌄",
    },
    // Add more projects as needed




  ];
  const categories = ["All", "Web", "AI"];
  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <Section id="projects" style={{ padding: "120px 5%", background: "rgba(6,8,18,0.5)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.7rem", letterSpacing: "4px", color: "#38bdf8", marginBottom: "16px" }}>// OUR WORK</div>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900,
            background: "linear-gradient(135deg, #e8eaf0, #38bdf8)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "32px",
          }}>Projects</h2>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{
                background: filter === c ? "linear-gradient(135deg, #1a6cf5, #38bdf8)" : "rgba(56,189,248,0.06)",
                border: filter === c ? "none" : "1px solid rgba(56,189,248,0.2)",
                borderRadius: "3px", padding: "8px 24px",
                color: filter === c ? "#fff" : "#64748b",
                fontFamily: "'Orbitron', sans-serif", fontSize: "0.7rem", letterSpacing: "2px",
                cursor: "pointer", transition: "all 0.2s",
              }}>{c}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {filtered.map((p, i) => (
            <div key={i} style={{
              background: "rgba(10,15,30,0.8)", border: `1px solid rgba(56,189,248,0.1)`,
              borderRadius: "12px", overflow: "hidden", transition: "all 0.35s",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = p.accent + "55";
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = `0 24px 48px ${p.accent}15`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(56,189,248,0.1)";
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              {/* Card header */}
              <div style={{
                height: "160px", background: `linear-gradient(135deg, rgba(10,15,30,0.9), ${p.accent}22)`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem",
                borderBottom: `1px solid ${p.accent}22`, position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", inset: 0, opacity: 0.05,
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(56,189,248,0.5) 30px, rgba(56,189,248,0.5) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(56,189,248,0.5) 30px, rgba(56,189,248,0.5) 31px)",
                }} />
                {p.icon}
              </div>
              <div style={{ padding: "28px 24px" }}>
                <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1rem", fontWeight: 700, color: "#e8eaf0", marginBottom: "10px" }}>{p.title}</h3>
                <p style={{ color: "#64748b", fontSize: "0.87rem", lineHeight: 1.7, marginBottom: "20px" }}>{p.desc}</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {p.tags.map(t => (
                    <span key={t} style={{
                      background: `${p.accent}15`, border: `1px solid ${p.accent}30`,
                      borderRadius: "3px", padding: "3px 10px", fontSize: "0.68rem",
                      fontFamily: "'Space Mono', monospace", color: p.accent,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ── Team ──────────────────────────────────────────────────────────────────────
function Team() {
  const members = [
    {
      name: "Sathira Sugeesvara",
      role: "Founder & Lead Developer",
      bio: "Visionary behind Xenora Labs. Full-stack engineer with a passion for AI and scalable architecture.",
      skills: ["MERN Stack", "JAVA", "MySQL"],
      initials: "SS",
      accent: "#38bdf8",
    },
    {
      name: "Himansith Wickramasinghe",
      role: "Co-Founder & Backend Engineer",
      bio: "Architect of robust, high-performance systems. Specializes in APIs, databases, and cloud infrastructure.",
      skills: ["Python", "JAVA", "PHP"],
      initials: "HW",
      accent: "#a78bfa",
    },
    {
      name: "Maleesha Dilshan",
      role: "Developer",
      bio: "Creative technologist bringing ideas to life with clean code, sharp design, and relentless execution.",
      skills: ["HTML", "CSS", "JavaScript", "MongoDB"],
      initials: "MD",
      accent: "#34d399",
    },
  ];

  return (
    <Section id="team" style={{ padding: "120px 5%" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "70px" }}>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.7rem", letterSpacing: "4px", color: "#38bdf8", marginBottom: "16px" }}>// THE TEAM</div>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900,
            background: "linear-gradient(135deg, #e8eaf0, #38bdf8)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Who We Are</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px" }}>
          {members.map((m, i) => (
            <div key={i} style={{
              background: "rgba(10,15,30,0.7)", border: "1px solid rgba(56,189,248,0.12)",
              borderRadius: "12px", padding: "40px 32px", textAlign: "center",
              transition: "all 0.35s", backdropFilter: "blur(6px)",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = m.accent + "55";
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = `0 20px 40px ${m.accent}12`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(56,189,248,0.12)";
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              {/* Avatar */}
              <div style={{
                width: "90px", height: "90px", borderRadius: "50%",
                background: `linear-gradient(135deg, ${m.accent}33, ${m.accent}11)`,
                border: `2px solid ${m.accent}55`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px",
                fontFamily: "'Orbitron', sans-serif", fontSize: "1.4rem", fontWeight: 700,
                color: m.accent, boxShadow: `0 0 24px ${m.accent}22`,
              }}>{m.initials}</div>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "#e8eaf0", marginBottom: "6px" }}>{m.name}</div>
              <div style={{ color: m.accent, fontSize: "0.72rem", fontFamily: "'Space Mono', monospace", letterSpacing: "1.5px", marginBottom: "16px" }}>{m.role}</div>
              <p style={{ color: "#64748b", fontSize: "0.87rem", lineHeight: 1.7, marginBottom: "20px" }}>{m.bio}</p>
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
          ))}
        </div>
      </div>
    </Section>
  );
}

// ── Contact ────────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // In production: connect to EmailJS / Formspree / backend
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", project: "", message: "" });
  };

  return (
    <Section id="contact" style={{ padding: "120px 5%", background: "rgba(6,8,18,0.5)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.7rem", letterSpacing: "4px", color: "#38bdf8", marginBottom: "16px" }}>// GET IN TOUCH</div>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900,
            background: "linear-gradient(135deg, #e8eaf0, #38bdf8)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "16px",
          }}>Start a Project</h2>
          <p style={{ color: "#64748b", fontSize: "1rem" }}>Have an idea? Let's build something extraordinary together.</p>
        </div>

        <div style={{
          background: "rgba(10,15,30,0.8)", border: "1px solid rgba(56,189,248,0.12)",
          borderRadius: "16px", padding: "clamp(32px, 5vw, 60px)", backdropFilter: "blur(10px)",
        }}>
          {sent && (
            <div style={{
              background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.3)",
              borderRadius: "8px", padding: "16px", textAlign: "center",
              color: "#38bdf8", fontFamily: "'Orbitron', sans-serif", fontSize: "0.8rem",
              letterSpacing: "1px", marginBottom: "24px",
            }}>✓ MESSAGE SENT — We'll get back to you within 24 hours!</div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {[
              { key: "name", label: "Your Name", type: "text", placeholder: "John Doe", col: 1 },
              { key: "email", label: "Email Address", type: "email", placeholder: "john@company.com", col: 1 },
              { key: "project", label: "Project Type", type: "text", placeholder: "e.g. Web App, AI Tool...", col: 2 },
            ].map(f => (
              <div key={f.key} style={{ gridColumn: f.col === 2 ? "1 / -1" : "auto" }}>
                <label style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.65rem", letterSpacing: "2px", color: "#38bdf8", display: "block", marginBottom: "8px" }}>{f.label}</label>
                <input
                  type={f.type}
                  value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  style={{
                    width: "100%", background: "rgba(6,8,18,0.8)", border: "1px solid rgba(56,189,248,0.15)",
                    borderRadius: "6px", padding: "12px 16px", color: "#e8eaf0",
                    fontFamily: "'Space Mono', monospace", fontSize: "0.85rem",
                    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(56,189,248,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(56,189,248,0.15)"}
                />
              </div>
            ))}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.65rem", letterSpacing: "2px", color: "#38bdf8", display: "block", marginBottom: "8px" }}>Message</label>
              <textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us about your project..."
                rows={5}
                style={{
                  width: "100%", background: "rgba(6,8,18,0.8)", border: "1px solid rgba(56,189,248,0.15)",
                  borderRadius: "6px", padding: "12px 16px", color: "#e8eaf0",
                  fontFamily: "'Space Mono', monospace", fontSize: "0.85rem",
                  outline: "none", resize: "vertical", boxSizing: "border-box", transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(56,189,248,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(56,189,248,0.15)"}
              />
            </div>
            <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
              <button onClick={handleSubmit} style={{
                background: "linear-gradient(135deg, #1a6cf5, #38bdf8)",
                border: "none", borderRadius: "4px", padding: "16px 60px",
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

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      padding: "48px 5% 32px",
      borderTop: "1px solid rgba(56,189,248,0.08)",
      textAlign: "center",
    }}>
      <img src="/favicon.png" alt="Xenora Labs" style={{ height: "48px", objectFit: "contain", marginBottom: "16px", opacity: 0.9 }} />
      <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.65rem", letterSpacing: "4px", color: "#38bdf8", marginBottom: "8px" }}>BUILDING INTELLIGENT FUTURES</div>
      <div style={{ color: "#1e293b", fontSize: "0.78rem", fontFamily: "'Space Mono', monospace" }}>
        © {new Date().getFullYear()} Xenora Labs. All rights reserved.
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = ["home", "about", "services", "projects", "team", "contact"];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.45 });
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: "#060812", minHeight: "100vh", color: "#e8eaf0", overflowX: "hidden" }}>
      <ParticleCanvas />
      <Navbar active={activeSection} />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Projects />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}
