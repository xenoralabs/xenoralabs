import { useState, useEffect, useRef } from "react";

// ── Typewriter ───────────────────────────────────────────────────────────────
export function Typewriter({ words }) {
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
export function useReveal() {
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
export function Section({ id, children, style }) {
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
