// ── Social link config — replace placeholder values with your real URLs/handles ──
const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/xenoralabs",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
    color: "#e8eaf0",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/94784627089", 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20.52 3.48A11.82 11.82 0 0012.04 0C5.49 0 .16 5.33.16 11.88c0 2.1.55 4.15 1.6 5.95L0 24l6.34-1.66a11.87 11.87 0 005.7 1.45h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.24-6.15-3.41-8.43zM12.05 21.77a9.9 9.9 0 01-5.05-1.38l-.36-.21-3.76.99 1-3.66-.24-.38a9.86 9.86 0 01-1.52-5.25c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 012.89 6.99c0 5.46-4.44 9.89-9.89 9.89zm5.43-7.42c-.3-.15-1.78-.88-2.06-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.8.38-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.06 2.89 1.21 3.09.15.2 2.09 3.19 5.07 4.47.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.08-.12-.28-.2-.58-.35z"/>
      </svg>
    ),
    color: "#25D366",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/xenoralabs/", 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
      </svg>
    ),
    color: "#1877f2",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/xenoralabs",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.613.074-3.067.49-4.202 1.625C1.716 2.832 1.3 4.286 1.226 5.9 1.168 7.18 1.154 7.588 1.154 12c0 4.412.014 4.82.072 6.1.074 1.613.49 3.067 1.625 4.202 1.135 1.135 2.589 1.551 4.202 1.625 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.613-.074 3.067-.49 4.202-1.625 1.135-1.135 1.551-2.589 1.625-4.202.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.074-1.613-.49-3.067-1.625-4.202C19.267 1.716 17.813 1.3 16.2 1.226 14.92 1.168 14.512 1.154 12 1.154zm0 5.838a5.008 5.008 0 100 10.016 5.008 5.008 0 000-10.016zm0 8.262a3.254 3.254 0 110-6.508 3.254 3.254 0 010 6.508zm6.406-9.845a1.17 1.17 0 11-2.34 0 1.17 1.17 0 012.34 0z"/>
      </svg>
    ),
    color: "#e1306c",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@xenoralabs", 
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
      </svg>
    ),
    color: "#69c9d0",
  },
  {
    label: "Email",
    href: "mailto:xenoralabs@gmail.com", 
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M2 7l10 7 10-7"/>
      </svg>
    ),
    color: "#38bdf8",
  },
];

export default function Footer() {
  return (
    <footer style={{
      padding: "clamp(40px, 6vw, 64px) 5% clamp(24px, 4vw, 32px)",
      borderTop: "1px solid rgba(56,189,248,0.08)",
      textAlign: "center",
    }}>
      {/* Logo */}
      <img src="/favicon.png" alt="Xenora Labs" style={{ height: "44px", objectFit: "contain", marginBottom: "12px", opacity: 0.9 }} />
      <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(0.58rem, 1.5vw, 0.65rem)", letterSpacing: "4px", color: "#38bdf8", marginBottom: "28px" }}>
        BUILDING INTELLIGENT FUTURES
      </div>

      {/* Social icons */}
      <div style={{ display: "flex", gap: "clamp(12px, 3vw, 20px)", justifyContent: "center", flexWrap: "wrap", marginBottom: "32px" }}>
        {SOCIALS.map(s => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("mailto") ? "_self" : "_blank"}
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.label}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "44px", height: "44px", borderRadius: "10px",
              background: "rgba(10,15,30,0.8)",
              border: "1px solid rgba(56,189,248,0.12)",
              color: "#64748b",
              textDecoration: "none",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = s.color;
              e.currentTarget.style.borderColor = s.color + "55";
              e.currentTarget.style.background = s.color + "12";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = `0 8px 24px ${s.color}22`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "#64748b";
              e.currentTarget.style.borderColor = "rgba(56,189,248,0.12)";
              e.currentTarget.style.background = "rgba(10,15,30,0.8)";
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            {s.icon}
          </a>
        ))}
      </div>

      {/* Divider */}
      <div style={{ width: "clamp(40px, 10vw, 80px)", height: "1px", background: "rgba(56,189,248,0.15)", margin: "0 auto 20px" }} />

      {/* Copyright */}
      <div style={{ color: "#64748b", fontSize: "0.75rem", fontFamily: "'Space Mono', monospace" }}>
        © {new Date().getFullYear()} Xenora Labs. All rights reserved.
      </div>
    </footer>
  );
}
