import { useEffect, useRef, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import StudentPortal from "./portals/student/StudentPortal";
import MentorPortal from "./portals/mentor/MentorPortal";
import AdminPortal from "./portals/admin/AdminPortal";
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
  student: { email: "student@college.edu", password: "student123", path: "/student" },
  mentor:  { email: "mentor@college.edu",  password: "mentor123",  path: "/mentor" },
  admin:   { email: "admin@college.edu",   password: "admin123",   path: "/admin" },
};

// ─── Login Modal ─────────────────────────────────────────────────────────────
function LoginModal({ portalId, portalTitle, portalColor, onClose }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");   
  const [error, setError]       = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    const cred = CREDENTIALS[portalId];
    if (email === cred.email && password === cred.password) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", portalId);
      console.log(`[Login] Auth set for role=${portalId}, redirecting to ${cred.path}`);
      navigate(`${cred.path}?role=${portalId}&auth=true`);
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8 relative modal-card"
        style={{
          border: "1px solid var(--color-border)",
          borderTop: `3px solid ${portalColor}`,
        }}
      >
        <button
          onClick={onClose}
          className="btn-3d absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg"
          style={{ color: "var(--color-text-muted)" }}
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <h2 className="text-xl font-bold mb-1" style={{ color: portalColor }}>{portalTitle}</h2>
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
              className="px-4 py-2.5 rounded-xl text-sm outline-none w-full"
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
              className="px-4 py-2.5 rounded-xl text-sm outline-none w-full"
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
            className="btn-3d mt-1 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
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
      className="btn-3d w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-300 hover:scale-110 hover:rotate-12"
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

const heroStats = [
  { value: 5, suffix: "K+", label: "Active Learners" },
  { value: 120, suffix: "+", label: "Active Courses" },
  { value: 92, suffix: "%", label: "Success Rate" },
  { value: 4.5, suffix: "★", label: "Average Rating" },
];

function StatsSection() {
  const rowRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rowRef} className={`stats-row${inView ? " is-inview" : ""}`}>
      {heroStats.map((s) => (
        <CounterCard key={s.label} {...s} started={inView} />
      ))}
    </div>
  );
}

function CounterCard({ value, suffix, label, started }) {
  const [display, setDisplay] = useState(0);
  const ranRef = useRef(false);

  useEffect(() => {
    if (!started || ranRef.current) return;
    ranRef.current = true;
    let raf;
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, value]);

  const decimals = Number.isInteger(value) ? 0 : 1;
  const text = display.toFixed(decimals);

  return (
    <div className="skew-stat">
      <div className="skew-stat-card">
        <div className="skew-stat-content">
          <div className="skew-stat-value">
            {text}
            <span className="skew-stat-suffix">{suffix}</span>
          </div>
          <div className="skew-stat-label">{label}</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { dark } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePortal, setActivePortal] = useState(null); // { id, title, color }

  return (
    <Routes>
      <Route path="/" element={
        <div className="bg-shell" style={{ color: "var(--color-text-primary)", minHeight: "100vh" }}>

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
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4"
        style={{
          background: dark ? "linear-gradient(180deg, rgba(8,12,24,0.82), rgba(8,12,24,0.55))" : "linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.66))",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <a href="#" className="flex items-center gap-2 text-xl font-extrabold tracking-tight no-underline" style={{ color: "var(--color-text-primary)" }}>
          <span className="text-2xl">🧭</span>
          Ship<span style={{ color: "var(--color-accent)" }}>wise</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["Features", "Portals", "About", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium no-underline transition-all duration-300 border-b-2 border-transparent hover:border-[var(--color-accent)] pb-0.5" style={{ color: "var(--color-text-muted)" }}>
              {item}
            </a>
          ))}
          <ThemeToggle />
          <Link to="/student" className="btn-3d text-sm font-bold px-5 py-2 rounded-lg no-underline transition-all hover:scale-105"
            style={{ background: "var(--color-accent-strong)", color: "#fff" }}>
            Get Started
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setMenuOpen(!menuOpen)} className="btn-3d flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer" aria-label="Menu">
            <span className="block w-6 h-0.5 rounded transition-all" style={{ background: "var(--color-text-primary)", transform: menuOpen ? "rotate(45deg) translateY(5px)" : "" }}></span>
            <span className="block w-6 h-0.5 rounded transition-all" style={{ background: "var(--color-text-primary)", opacity: menuOpen ? 0 : 1 }}></span>
            <span className="block w-6 h-0.5 rounded transition-all" style={{ background: "var(--color-text-primary)", transform: menuOpen ? "rotate(-45deg) translateY(-5px)" : "" }}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 md:hidden" style={{ background: dark ? "rgba(8,12,24,0.98)" : "rgba(255,255,255,0.96)", backdropFilter: "blur(20px)" }}>
          {["Features", "Portals", "About", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              className="text-lg font-semibold no-underline transition-all duration-300 border-b-2 border-transparent hover:border-[var(--color-accent)] pb-0.5" style={{ color: "var(--color-text-primary)" }}>
              {item}
            </a>
          ))}
          <Link to="/student" className="btn-3d text-base font-bold px-6 py-3 rounded-lg no-underline" style={{ background: "var(--color-accent-strong)", color: "#fff" }}>
            Get Started
          </Link>
        </div>
      )}

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(circle at 20% 50%, var(--color-glow) 0%, transparent 50%), radial-gradient(circle at 80% 50%, var(--color-glow) 0%, transparent 50%)`,
        }} />
        <div className="hero-blob hero-blob-a" aria-hidden="true" />
        <div className="hero-blob hero-blob-b" aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="badge-pill inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="badge-shine" aria-hidden="true" />🚀 Next-Gen Learning Platform
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none mb-6">
            Navigate Knowledge <br />
            <span className="text-gradient">Wisely</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            Shipwise is a complete SaaS platform for technical education — with dedicated portals for students, mentors, and administrators.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/student" className="btn-3d btn-glow inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold no-underline transition-all hover:scale-105 hover:-translate-y-1"
              style={{ background: "var(--color-accent-strong)", color: "#fff" }}>
              Start Learning
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <a href="#portals" className="btn-3d btn-ghost inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold no-underline transition-all hover:scale-105 hover:-translate-y-1"
              style={{ color: "var(--color-text-primary)" }}>
              Explore Portals
            </a>
          </div>
          <StatsSection />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="badge-pill inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="badge-shine" aria-hidden="true" />Platform Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Everything You Need to Succeed</h2>
            <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: "var(--color-text-secondary)" }}>
              Built for modern technical education — from live classes to AI-powered tutoring.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass-card feature-card p-6 sm:p-8 hover:-translate-y-1">
                <div className="feature-icon mb-5">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portals */}
      <section id="portals" className="px-4 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="badge-pill inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="badge-shine" aria-hidden="true" />Three Portals
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">One Platform, Three Perspectives</h2>
            <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: "var(--color-text-secondary)" }}>
              Each portal is purpose-built for its audience — no clutter, just what you need.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {portals.map((p) => (
              <button key={p.id} onClick={() => setActivePortal(p)} className="btn-3d glass-card portal-card p-6 sm:p-8 block group hover:-translate-y-2 text-left w-full"
                style={{ borderTop: `3px solid ${p.color}`, cursor: "pointer", ["--portal-accent"]: p.color }}>
                <h3 className="text-xl font-bold mb-3 group-hover:opacity-80 transition-opacity" style={{ color: p.color }}>{p.title}</h3>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{p.desc}</p>
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
          <div className="glass-card cta-card p-10 sm:p-16">
            <span className="text-5xl mb-4 block">🧭</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Ready to Navigate Knowledge Wisely?</h2>
            <p className="text-base sm:text-lg max-w-lg mx-auto mb-8" style={{ color: "var(--color-text-secondary)" }}>
              Join thousands of learners, mentors, and institutions who trust Shipwise for their technical education needs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/student" className="btn-3d btn-glow inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold no-underline transition-all hover:scale-105"
                style={{ background: "var(--color-accent-strong)", color: "#fff" }}>
                Start Learning Free
              </Link>
              <Link to="/mentor" className="btn-3d btn-ghost inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold no-underline transition-all hover:scale-105"
                style={{ color: "var(--color-text-primary)" }}>
                Become a Mentor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer px-4 py-12 border-t" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-lg font-extrabold mb-4">
              <span>🧭</span> Ship<span style={{ color: "var(--color-accent)" }}>wise</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              Navigate Knowledge Wisely. A complete SaaS platform for technical education.
            </p>
          </div>
          <div className="col-span-1 sm:col-span-1 lg:col-span-1">
            <h4 className="text-sm font-bold mb-4" style={{ color: "var(--color-text-primary)" }}>Platform</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/student-portal" className="text-sm no-underline transition-colors hover:opacity-80" style={{ color: "var(--color-text-muted)" }}>Student Portal</Link>
              <Link to="/mentor-portal" className="text-sm no-underline transition-colors hover:opacity-80" style={{ color: "var(--color-text-muted)" }}>Mentor Portal</Link>
              <Link to="/admin-panel" className="text-sm no-underline transition-colors hover:opacity-80" style={{ color: "var(--color-text-muted)" }}>Admin Panel</Link>
              <Link to="/mobile-app" className="text-sm no-underline transition-colors hover:opacity-80" style={{ color: "var(--color-text-muted)" }}>Mobile App</Link>
            </div>
          </div>
          <div className="col-span-1 sm:col-span-1 lg:col-span-1">
            <h4 className="text-sm font-bold mb-4" style={{ color: "var(--color-text-primary)" }}>Resources</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/help-center" className="text-sm no-underline transition-colors hover:opacity-80" style={{ color: "var(--color-text-muted)" }}>Help Center</Link>
              <Link to="/documentation" className="text-sm no-underline transition-colors hover:opacity-80" style={{ color: "var(--color-text-muted)" }}>Documentation</Link>
              <Link to="/api-status" className="text-sm no-underline transition-colors hover:opacity-80" style={{ color: "var(--color-text-muted)" }}>API Status</Link>
              <Link to="/community" className="text-sm no-underline transition-colors hover:opacity-80" style={{ color: "var(--color-text-muted)" }}>Community</Link>
            </div>
          </div>
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 text-center sm:text-left lg:text-left">
            <h4 className="text-sm font-bold mb-4" style={{ color: "var(--color-text-primary)" }}>Company</h4>
            <div className="flex flex-col gap-2.5 items-center sm:items-start lg:items-start">
              <Link to="/about" className="text-sm no-underline transition-colors hover:opacity-80" style={{ color: "var(--color-text-muted)" }}>About Us</Link>
              <Link to="/careers" className="text-sm no-underline transition-colors hover:opacity-80" style={{ color: "var(--color-text-muted)" }}>Careers</Link>
              <Link to="/privacy" className="text-sm no-underline transition-colors hover:opacity-80" style={{ color: "var(--color-text-muted)" }}>Privacy</Link>
              <Link to="/terms" className="text-sm no-underline transition-colors hover:opacity-80" style={{ color: "var(--color-text-muted)" }}>Terms</Link>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: "var(--color-border)" }}>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>© 2026 Shipwise. All rights reserved.</p>
          <div className="flex gap-4">
            {[
              { name: "GitHub", d: "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.24 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.803 5.625-5.475 5.92.43.37.813 1.102.813 2.22 0 1.606-.015 2.896-.015 3.293 0 .32.216.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" },
              { name: "Twitter", d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
              { name: "LinkedIn", d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" },
              { name: "YouTube", d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
            ].map((s) => (
              <a key={s.name} href="#" className="social-link text-xs no-underline font-medium inline-flex items-center gap-1.5 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={s.d} />
                </svg>
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
      } />
      <Route path="/student" element={<StudentPortal />} />
      <Route path="/mentor" element={<MentorPortal />} />
      <Route path="/admin" element={<AdminPortal />} />
      <Route path="/student-portal" element={<StudentPortal />} />
      <Route path="/mentor-portal" element={<MentorPortal />} />
      <Route path="/admin-panel" element={<AdminPortal />} />
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
