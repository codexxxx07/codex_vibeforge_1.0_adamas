import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import StudentPortal from "./pages/StudentPortal";
import MentorPortal from "./pages/MentorPortal";
import AdminPanel from "./pages/AdminPanel";
import MobileApp from "./pages/MobileApp";
import HelpCenter from "./pages/HelpCenter";
import Documentation from "./pages/Documentation";
import ApiStatus from "./pages/ApiStatus";
import Community from "./pages/Community";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

// ─── Hardcoded credentials ───────────────────────────────────────────────────
const CREDENTIALS = {
  student: { email: "student@college.edu", password: "student123", url: "http://localhost:5174" },
  mentor:  { email: "mentor@college.edu",  password: "mentor123",  url: "http://localhost:5175" },
  admin:   { email: "admin@college.edu",   password: "admin123",   url: "http://localhost:5176" },
};

// ─── Login Modal ─────────────────────────────────────────────────────────────
function LoginModal({ portalId, portalTitle, portalColor, onClose }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");   
  const [error, setError]       = useState("");
  const titleId = `${portalId}-login-title`;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function handleLogin(e) {
    e.preventDefault();
    const cred = CREDENTIALS[portalId];
    if (email === cred.email && password === cred.password) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", portalId);
      console.log(`[Login] Auth set for role=${portalId}, redirecting to ${cred.url}`);
      window.location.href = `${cred.url}?role=${portalId}&auth=true`;
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "var(--color-scrim)", backdropFilter: "blur(var(--blur-scrim))" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        className="modal-card w-full max-w-sm rounded-[28px] p-8 relative"
        style={{
          background: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          borderTop: `3px solid ${portalColor}`,
          backdropFilter: "blur(var(--blur-glass)) saturate(160%)",
          WebkitBackdropFilter: "blur(var(--blur-glass)) saturate(160%)",
          boxShadow: "var(--shadow-modal)",
        }}
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full"
          style={{ color: "var(--color-text-muted)" }}
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <h2 id={titleId} className="text-xl font-bold mb-1" style={{ color: portalColor }}>{portalTitle}</h2>
        <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>Sign in to continue</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
              College Email ID
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="you@college.edu"
              required
              className="input-field px-4 py-3 rounded-2xl text-sm outline-none w-full"
              style={{
                background: "var(--color-bg-primary)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="••••••••"
              required
              className="input-field px-4 py-3 rounded-2xl text-sm outline-none w-full"
              style={{
                background: "var(--color-bg-primary)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
              }}
            />
          </div>

          {error && (
            <p className="text-sm font-medium" style={{ color: "#EF4444" }}>{error}</p>
          )}

          <button
            type="submit"
            className="button-primary mt-1 px-4 py-3 rounded-full text-sm font-bold"
            style={{ background: portalColor, color: "#fff" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      type="button"
      className="theme-toggle w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-110 hover:rotate-12"
      style={{
        borderColor: "var(--color-border)",
        color: "var(--color-text-muted)",
      }}
      aria-label="Toggle theme"
    >
      {dark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
        </svg>
      )}
    </button>
  );
}

const portals = [
  {
    id: "student",
    title: "Student Portal",
    desc: "Your learning command center. Attend live classes, practice in labs, track progress, solve doubts, and earn certificates.",
    features: ["Live Classes", "Practice Lab", "Doubt Solving", "Progress Tracking", "Assignments", "Certificates"],
    color: "#1D7874",
  },
  {
    id: "mentor",
    title: "Mentor Portal",
    desc: "Teach, guide, and grow. Build courses, conduct live sessions, grade submissions, and analyze student performance.",
    features: ["Course Builder", "Live Class Control", "Grading Dashboard", "Student Analytics", "Schedule", "Resources"],
    color: "#EE964B",
  },
  {
    id: "admin",
    title: "Admin Panel",
    desc: "Full platform command. Manage users, batches, payments, content, and access deep analytics.",
    features: ["User Management", "Batch Control", "Payments", "Content Control", "Analytics", "Reports"],
    color: "#F4D35E",
  },
];

const features = [
  { icon: "🎯", title: "Skill-Based Learning", desc: "Structured paths from beginner to expert with hands-on projects and real-world scenarios." },
  { icon: "🤖", title: "AI Tutor", desc: "Smart AI assistant that explains errors, suggests resources, and guides your learning journey." },
  { icon: "🖥️", title: "Browser Terminal", desc: "Full Linux terminal in your browser. Practice commands, run code, and learn without setup." },
  { icon: "📊", title: "Smart Analytics", desc: "Track everything. Progress, skill scores, streaks, and detailed performance insights." },
  { icon: "📱", title: "Low Bandwidth Mode", desc: "Optimized for limited connectivity. 144p mode, audio-only, and offline downloads." },
  { icon: "🔗", title: "Open Source Focus", desc: "GitHub-integrated learning. Build your open source portfolio as you learn." },
];

export default function App() {
  const { dark } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePortal, setActivePortal] = useState(null); // { id, title, color }

  return (
    <Routes>
      <Route path="/" element={
        <div className="landing-shell" style={{ backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-primary)", minHeight: "100vh" }}>

      {/* Login Modal */}
      {activePortal && (
        <LoginModal
          portalId={activePortal.id}
          portalTitle={activePortal.title}
          portalColor={activePortal.color}
          onClose={() => setActivePortal(null)}
        />
      )}
      {/* Navbar */}
      <div className="floating-nav-shell px-3 pt-3 sm:px-6">
          <nav
            className="light-nav flex items-center justify-between px-4 sm:px-6 py-3.5"
          style={{
            background: "var(--color-nav-bg)",
            backdropFilter: "blur(var(--blur-nav))",
          }}
          aria-label="Primary navigation"
        >
          <a href="#" className="flex items-center gap-2 text-xl font-extrabold tracking-tight no-underline" style={{ color: "var(--color-text-primary)" }}>
            <span className="text-2xl">🧭</span>
            Ship<span style={{ color: "var(--color-accent)" }}>wise</span>
          </a>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {["Features", "Portals", "About", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link text-sm font-medium no-underline transition-all duration-300 pb-0.5" style={{ color: "var(--color-text-muted)" }}>
                {item}
              </a>
            ))}
            <ThemeToggle />
            <a href="/student-web" className="button-primary text-sm font-bold px-5 py-2.5 no-underline"
              style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}>
              Get Started
            </a>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
              aria-label="Menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className="block w-6 h-0.5 rounded transition-all" style={{ background: "var(--color-text-primary)", transform: menuOpen ? "rotate(45deg) translateY(5px)" : "" }}></span>
              <span className="block w-6 h-0.5 rounded transition-all" style={{ background: "var(--color-text-primary)", opacity: menuOpen ? 0 : 1 }}></span>
              <span className="block w-6 h-0.5 rounded transition-all" style={{ background: "var(--color-text-primary)", transform: menuOpen ? "rotate(-45deg) translateY(-5px)" : "" }}></span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (dark ? (
        <div id="mobile-menu" className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 md:hidden" style={{ background: "var(--color-menu-bg)", backdropFilter: "blur(var(--blur-nav))" }}>
          {["Features", "Portals", "About", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              className="text-lg font-semibold no-underline transition-all duration-300 border-b-2 border-transparent hover:border-[var(--color-accent)] pb-0.5" style={{ color: "var(--color-text-primary)" }}>
              {item}
            </a>
          ))}
          <a href="/student-web" className="text-base font-bold px-6 py-3 rounded-lg no-underline" style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}>
            Get Started
          </a>
        </div>
      ) : (
        <div id="mobile-menu" className="fixed inset-x-4 top-24 z-40 md:hidden">
          <div className="mobile-menu-light flex flex-col gap-5 px-6 py-6">
            {["Features", "Portals", "About", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                className="text-base font-semibold no-underline transition-all duration-300" style={{ color: "var(--color-text-primary)" }}>
                {item}
              </a>
            ))}
            <a href="/student-web" className="button-primary text-base font-bold px-6 py-3 no-underline"
              style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}>
              Get Started
            </a>
          </div>
        </div>
      ))}

      {/* Hero */}
      <section className="hero-section min-h-screen flex flex-col items-center justify-center px-4 pt-28 sm:pt-32 pb-16 text-center relative overflow-hidden">
        <div className="hero-background" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <span className="section-pill text-xs font-semibold tracking-[0.24em] uppercase mb-6"
            style={{ color: "var(--color-accent)" }}>
            🚀 Next-Gen Learning Platform
          </span>
          <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl font-black leading-[0.92] mb-6">
            Navigate Knowledge <br />
            <span style={{ color: "var(--color-accent)" }}>Wisely</span>
          </h1>
          <p className="hero-copy text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            Shipwise is a complete SaaS platform for technical education — with dedicated portals for students, mentors, and administrators.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/student-web" className="button-primary px-8 py-3.5 text-base font-bold no-underline"
              style={{ background: "var(--color-accent)", color: "var(--color-on-accent)", boxShadow: "0 4px 20px var(--color-glow-strong)" }}>
              Start Learning
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#portals" className="button-secondary px-8 py-3.5 text-base font-semibold no-underline"
              style={{ border: "1px solid var(--color-border)", color: "var(--color-text-primary)" }}>
              Explore Portals
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 mt-16">
            {[
              { num: "5K+", label: "Active Learners" },
              { num: "120+", label: "Expert Courses" },
              { num: "92%", label: "Success Rate" },
              { num: "4.8★", label: "Avg Rating" },
            ].map((s) => (
              <div key={s.label} className="stat-card text-center">
                <div className="text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--color-accent)" }}>{s.num}</div>
                <div className="text-sm mt-1 font-medium" style={{ color: "var(--color-text-muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-pill text-xs font-semibold tracking-[0.24em] uppercase mb-4"
              style={{ color: "var(--color-accent)" }}>
              Platform Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Everything You Need to Succeed</h2>
            <p className="section-copy text-base sm:text-lg max-w-xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
              Built for modern technical education — from live classes to AI-powered tutoring.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass-card p-6 sm:p-8 hover:-translate-y-1.5">
                <div className="icon-tile text-3xl mb-5">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portals */}
      <section id="portals" className="px-4 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-pill text-xs font-semibold tracking-[0.24em] uppercase mb-4"
              style={{ color: "var(--color-accent)" }}>
              Three Portals
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">One Platform, Three Perspectives</h2>
            <p className="section-copy text-base sm:text-lg max-w-xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
              Each portal is purpose-built for its audience — no clutter, just what you need.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {portals.map((p) => (
              <button key={p.id} onClick={() => setActivePortal(p)} className="glass-card p-6 sm:p-8 block group hover:-translate-y-2 text-left w-full"
                style={{ borderTop: `3px solid ${p.color}`, cursor: "pointer" }}>
                <h3 className="text-xl font-bold mb-3 group-hover:opacity-80 transition-opacity" style={{ color: p.color }}>{p.title}</h3>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.features.map((f) => (
                    <span key={f} className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{ background: "var(--color-accent-light)", color: "var(--color-accent)" }}>{f}</span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2" style={{ color: "var(--color-accent)" }}>
                  Open Portal →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* About / CTA */}
      <section id="about" className="px-4 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-10 sm:p-16">
            <span className="text-5xl mb-4 block">🧭</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Ready to Navigate Knowledge Wisely?</h2>
            <p className="section-copy text-base sm:text-lg max-w-lg mx-auto mb-8" style={{ color: "var(--color-text-muted)" }}>
              Join thousands of learners, mentors, and institutions who trust Shipwise for their technical education needs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/student-web" className="button-primary px-8 py-3.5 text-base font-bold no-underline"
                style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}>
                Start Learning Free
              </a>
              <a href="/mentor-web" className="button-secondary px-8 py-3.5 text-base font-semibold no-underline"
                style={{ border: "1px solid var(--color-border)", color: "var(--color-text-primary)" }}>
                Become a Mentor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer-surface px-4 py-12 border-t" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-lg font-extrabold mb-4">
              <span>🧭</span> Ship<span style={{ color: "var(--color-accent)" }}>wise</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Navigate Knowledge Wisely. A complete SaaS platform for technical education.
            </p>
          </div>
          {[
            { title: "Platform", links: [{ label: "Student Portal", to: "/student-portal" }, { label: "Mentor Portal", to: "/mentor-portal" }, { label: "Admin Panel", to: "/admin-panel" }, { label: "Mobile App", to: "/mobile-app" }] },
            { title: "Resources", links: [{ label: "Help Center", to: "/help-center" }, { label: "Documentation", to: "/documentation" }, { label: "API Status", to: "/api-status" }, { label: "Community", to: "/community" }] },
            { title: "Company", links: [{ label: "About Us", to: "/about" }, { label: "Careers", to: "/careers" }, { label: "Privacy", to: "/privacy" }, { label: "Terms", to: "/terms" }] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold mb-4" style={{ color: "var(--color-text-primary)" }}>{col.title}</h4>
              <div className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <Link key={l.to} to={l.to} className="text-sm no-underline transition-colors hover:opacity-80" style={{ color: "var(--color-text-muted)" }}>{l.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: "var(--color-border)" }}>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>© 2026 Shipwise. All rights reserved.</p>
          <div className="flex gap-4">
            {["GitHub", "Twitter", "LinkedIn", "YouTube"].map((s) => (
              <a key={s} href="#" className="text-xs no-underline font-medium transition-colors hover:opacity-80" style={{ color: "var(--color-text-muted)" }}>{s}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
      } />
      <Route path="/student-portal" element={<StudentPortal />} />
      <Route path="/mentor-portal" element={<MentorPortal />} />
      <Route path="/admin-panel" element={<AdminPanel />} />
      <Route path="/mobile-app" element={<MobileApp />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/api-status" element={<ApiStatus />} />
      <Route path="/community" element={<Community />} />
      <Route path="/about" element={<About />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
