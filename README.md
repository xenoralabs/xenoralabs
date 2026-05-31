# Xenora Labs Portfolio

> **Building Intelligent Futures** — Official portfolio for Xenora Labs full-stack dev agency.

## Stack
- React 18 + Vite
- Vanilla CSS (no UI library — full custom)
- Google Fonts: Orbitron + Space Mono
- Deployed on Vercel

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Add your logo
# Place your logo file at: public/logo.png

# 3. Run dev server
npm run dev
# Opens at http://localhost:5173
```

---

## Deploying to Vercel

### Option A — Vercel CLI (fastest)
```bash
npm install -g vercel
vercel
# Follow prompts — it auto-detects Vite
```

### Option B — Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repo
4. Settings are auto-detected (Framework: Vite)
5. Click **Deploy** ✓

---

## Adding Your Logo
Place your logo PNG at **`public/logo.png`** — it's referenced in the Navbar, Hero, and Footer automatically.

## Adding Team Photos (Optional)
Place photos at:
- `public/team/sathira.jpg`
- `public/team/himansith.jpg`
- `public/team/maleesha.jpg`

Then in `App.jsx`, in the `Team` component, replace the initials avatar `<div>` with:
```jsx
<img src="/team/sathira.jpg" alt="Sathira" style={{ width: "90px", height: "90px", borderRadius: "50%", objectFit: "cover" }} />
```

## Adding Contact Form Backend
The contact form is ready for [EmailJS](https://www.emailjs.com/) or [Formspree](https://formspree.io/):

### Formspree (easiest — free):
1. Sign up at formspree.io
2. Create a form → get your endpoint
3. In `App.jsx` → `Contact` component → `handleSubmit`:
```js
await fetch("https://formspree.io/f/YOUR_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
```

---

## Customization
| File | What to change |
|------|----------------|
| `src/App.jsx` → `Projects` | Add/edit project cards |
| `src/App.jsx` → `Team` | Names, roles, bios, skills |
| `src/App.jsx` → `Services` | Services list |
| `src/App.jsx` → `Stats` | Numbers/stats |
| `src/index.css` | Fonts, animations |

---

© 2024 Xenora Labs. All rights reserved.
