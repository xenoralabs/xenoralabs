import { useState, useEffect } from "react";

export default function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const fn = () => { if (window.innerWidth > 768) setOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const links = ["Home", "About", "Services", "Projects", "Team", "Contact"];
  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(6,8,18,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(56,189,248,0.12)" : "none",
        transition: "all 0.4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 5%", height: "70px",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => scrollTo("home")}>
          <img src="/favicon.png" alt="Xenora Labs" style={{ height: "36px", objectFit: "contain" }} />
          <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)", letterSpacing: "2px", color: "#e8eaf0" }}>
            XENORA <span style={{ color: "#38bdf8" }}>LABS</span>
          </span>
        </div>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: "flex", gap: "clamp(16px, 2.5vw, 32px)" }}>
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{
              background: "none", border: "none",
              color: active === l.toLowerCase() ? "#38bdf8" : "#9ca3af",
              fontFamily: "'Orbitron', sans-serif", fontSize: "0.72rem", letterSpacing: "2px",
              cursor: "pointer", textTransform: "uppercase", transition: "color 0.2s",
              padding: "4px 0", borderBottom: active === l.toLowerCase() ? "1px solid #38bdf8" : "1px solid transparent",
            }}
              onMouseEnter={e => e.target.style.color = "#38bdf8"}
              onMouseLeave={e => { if (active !== l.toLowerCase()) e.target.style.color = "#9ca3af"; }}
            >{l}</button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="nav-mobile-btn"
          aria-label="Toggle menu"
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "none", flexDirection: "column", gap: "5px", padding: "6px",
          }}
        >
          <span style={{ width: "24px", height: "2px", background: "#38bdf8", display: "block", transition: "all 0.3s", transform: open ? "translateY(7px) rotate(45deg)" : "" }} />
          <span style={{ width: "24px", height: "2px", background: "#38bdf8", display: "block", transition: "all 0.3s", opacity: open ? 0 : 1 }} />
          <span style={{ width: "24px", height: "2px", background: "#38bdf8", display: "block", transition: "all 0.3s", transform: open ? "translateY(-7px) rotate(-45deg)" : "" }} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          position: "fixed", top: "70px", left: 0, right: 0,
          background: "rgba(6,8,18,0.97)", backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(56,189,248,0.15)",
          padding: "16px 5% 24px", display: "flex", flexDirection: "column",
          gap: "4px", zIndex: 99,
        }}>
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{
              background: "none", border: "none",
              color: active === l.toLowerCase() ? "#38bdf8" : "#9ca3af",
              fontFamily: "'Orbitron', sans-serif", fontSize: "0.82rem",
              letterSpacing: "2px", cursor: "pointer", textAlign: "left",
              padding: "12px 0", borderBottom: "1px solid rgba(56,189,248,0.06)",
              transition: "color 0.2s",
            }}>{l}</button>
          ))}
        </div>
      )}
    </>
  );
}
