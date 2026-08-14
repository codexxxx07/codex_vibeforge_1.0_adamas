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
import LogoMark from "./components/Logo";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChartIcon,
  CloseIcon,
  CompassIcon,
  CopyIcon,
  GitBranchIcon,
  GithubIcon,
  GraduationIcon,
  LinkedinIcon,
  MenuIcon,
  MoonIcon,
  PresentationIcon,
  ShieldIcon,
  SignalIcon,
  SparklesIcon,
  SunIcon,
  TargetIcon,
  TerminalIcon,
  XIcon,
  YoutubeIcon,
} from "./components/Icons";

// ─── Hardcoded credentials ───────────────────────────────────────────────────
const CREDENTIALS = {
  student: { email: "student@college.edu", password: "student123", path: "/student" },
  mentor:  { email: "mentor@college.edu",  password: "mentor123",  path: "/mentor" },
  admin:   { email: "admin@college.edu",   password: "admin123",   path: "/admin" },
};

const NAV_ITEMS = ["Features", "Portals", "About", "Contact"];

// ─── Login Modal ─────────────────────────────────────────────────────────────
function LoginModal({ portalId, portalTitle, portalColor, accent, onClose }) {
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
      style={{ background: "rgba(2, 6, 23, 0.55)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`${portalTitle} login`}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8 relative"
        style={{
          background: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
          borderTop: `3px solid ${accent}`,
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <button
          onClick={onClose}
          className="icon-btn absolute top-4 right-4"
          aria-label="Close"
        >
          <CloseIcon size={16} />
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
              className="sw-input"
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
              className="sw-input"
            />
          </div>

          {error && (
            <p className="text-sm font-medium" style={{ color: "#EF4444" }}>{error}</p>
          )}

          <button
            type="submit"
            className="sw-btn mt-1"
            style={{ background: accent }}
          >
            Login
          </button>
        </form>

        <DemoCredentials
          portalId={portalId}
          ink={portalColor}
          chip={`color-mix(in srgb, ${accent} 14%, transparent)`}
        />
      </div>
    </div>
  );
}

function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button onClick={toggle} className="icon-btn" aria-label="Toggle theme">
      {dark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
    </button>
  );
}

// ─── Demo credential copy helpers ────────────────────────────────────────────
function copyText(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  return new Promise((resolve, reject) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      resolve();
    } catch (err) {
      reject(err);
    } finally {
      document.body.removeChild(ta);
    }
  });
}

function DemoCredentialRow({ label, value }) {
  const [copied, setCopied] = useState(false);

  function handleCopy(e) {
    e.preventDefault();
    e.stopPropagation();
    copyText(value)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {});
  }

  return (
    <div className="portal-cred-row" onClick={(e) => e.stopPropagation()}>
      <span className="portal-cred-label">{label}</span>
      <span
        className="portal-cred-value"
        role="button"
        tabIndex={-1}
        title={`Copy ${label.toLowerCase()}`}
        aria-label={`Copy ${label.toLowerCase()}: ${value}`}
        onClick={handleCopy}
      >
        <code>{value}</code>
        <span className="portal-cred-copy" aria-hidden="true">
          {copied ? "Copied!" : <CopyIcon size={12} />}
        </span>
      </span>
    </div>
  );
}

function DemoCredentials({ portalId, ink, chip }) {
  const cred = CREDENTIALS[portalId];
  return (
    <div className="portal-creds" style={{ "--p-ink": ink, "--p-chip": chip }}>
      <div className="portal-creds-title">Demo Credentials</div>
      <DemoCredentialRow label="Email" value={cred.email} />
      <DemoCredentialRow label="Password" value={cred.password} />
    </div>
  );
}

const portals = [
  {
    id: "student",
    title: "Student Portal",
    desc: "Your learning command center. Attend live classes, practice in labs, track progress, solve doubts, and earn certificates.",
    features: ["Live Classes", "Practice Lab", "Doubt Solving", "Progress Tracking", "Assignments", "Certificates"],
    color: "#1D7874",
    ink: { light: "#115E5B", dark: "#5EEAD4" },
    icon: GraduationIcon,
  },
  {
    id: "mentor",
    title: "Mentor Portal",
    desc: "Teach, guide, and grow. Build courses, conduct live sessions, grade submissions, and analyze student performance.",
    features: ["Course Builder", "Live Class Control", "Grading Dashboard", "Student Analytics", "Schedule", "Resources"],
    color: "#EE964B",
    ink: { light: "#B45309", dark: "#FBBF24" },
    icon: PresentationIcon,
  },
  {
    id: "admin",
    title: "Admin Panel",
    desc: "Full platform command. Manage users, batches, payments, content, and access deep analytics.",
    features: ["User Management", "Batch Control", "Payments", "Content Control", "Analytics", "Reports"],
    color: "#F4D35E",
    ink: { light: "#8A6D1F", dark: "#FDE68A" },
    icon: ShieldIcon,
  },
];

const features = [
  { icon: TargetIcon,     title: "Skill-Based Learning", desc: "Structured paths from beginner to expert with hands-on projects and real-world scenarios." },
  { icon: SparklesIcon,   title: "AI Tutor",             desc: "Smart AI assistant that explains errors, suggests resources, and guides your learning journey." },
  { icon: TerminalIcon,   title: "Browser Terminal",     desc: "Full Linux terminal in your browser. Practice commands, run code, and learn without setup." },
  { icon: ChartIcon,      title: "Smart Analytics",      desc: "Track everything. Progress, skill scores, streaks, and detailed performance insights." },
  { icon: SignalIcon,     title: "Low Bandwidth Mode",   desc: "Optimized for limited connectivity. 144p mode, audio-only, and offline downloads." },
  { icon: GitBranchIcon,  title: "Open Source Focus",    desc: "GitHub-integrated learning. Build your open source portfolio as you learn." },
];

const heroStats = [
  { value: 5, suffix: "K+", label: "Active Learners" },
  { value: 120, suffix: "+", label: "Active Courses" },
  { value: 92, suffix: "%", label: "Success Rate" },
  { value: 4.5, suffix: "★", label: "Average Rating" },
];

const socialLinks = [
  { label: "GitHub", icon: GithubIcon },
  { label: "Twitter", icon: XIcon },
  { label: "LinkedIn", icon: LinkedinIcon },
  { label: "YouTube", icon: YoutubeIcon },
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
        <div className="skew-stat-value">
          {text}
          <span className="skew-stat-suffix">{suffix}</span>
        </div>
        <div className="skew-stat-label">{label}</div>
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
        <div className="page-shell" style={{ backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-primary)", minHeight: "100vh" }}>

      {/* Login Modal */}
      {activePortal && (
        <LoginModal
          portalId={activePortal.id}
          portalTitle={activePortal.title}
          portalColor={dark ? activePortal.ink.dark : activePortal.ink.light}
          accent={activePortal.color}
          onClose={() => setActivePortal(null)}
        />
      )}

      {/* Navbar */}
      <nav
        className="site-nav fixed top-0 left-0 right-0 z-50"
        style={{
          background: "var(--color-bg-nav)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="mx-auto w-full max-w-6xl flex items-center justify-between px-4 sm:px-6 py-3.5">
          <a href="#" className="flex items-center gap-2.5 no-underline" aria-label="Shipwise home">
            <LogoMark size={34} />
            <span className="text-xl font-extrabold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              Ship<span style={{ color: "var(--color-accent)" }}>wise</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link no-underline">
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              to="/student"
              className="sw-btn no-underline"
              style={{ padding: "0.6rem 1.15rem", fontSize: "0.875rem", borderRadius: "0.6rem" }}
            >
              Get Started
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="icon-btn"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 md:hidden"
          style={{ background: "var(--color-bg-nav)", backdropFilter: "blur(24px)" }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="menu-item text-lg font-semibold no-underline"
              style={{ color: "var(--color-text-primary)" }}
            >
              {item}
            </a>
          ))}
          <Link
            to="/student"
            onClick={() => setMenuOpen(false)}
            className="menu-item sw-btn no-underline"
          >
            Get Started
          </Link>
        </div>
      )}

      {/* Hero */}
      <section className="hero-section min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-16 text-center relative overflow-hidden">
        <div className="hero-grid" />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(circle at 20% 50%, var(--color-glow) 0%, transparent 50%), radial-gradient(circle at 80% 50%, var(--color-glow) 0%, transparent 50%)`,
        }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="sw-eyebrow mb-8">
            <span className="eyebrow-dot" />
            Next-Gen Learning Platform
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-8">
            Navigate Knowledge
            <br />
            <span className="relative inline-block" style={{ color: "var(--color-accent)" }}>
              Wisely
              <svg className="hero-underline" viewBox="0 0 120 10" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 7C28 2 92 2 118 6" fill="none" stroke="var(--color-accent)" strokeWidth="3.5" strokeLinecap="round" opacity="0.4" />
              </svg>
            </span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            Shipwise is a complete SaaS platform for technical education — with dedicated portals for students, mentors, and administrators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/student" className="sw-btn">
              Start Learning
              <ArrowRightIcon size={18} />
            </Link>
            <a href="#portals" className="sw-btn-ghost no-underline">
              Explore Portals
            </a>
          </div>
          <StatsSection />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="sw-eyebrow mb-5">
              <span className="eyebrow-dot" />
              Platform Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Everything You Need to Succeed</h2>
            <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: "var(--color-text-secondary)" }}>
              Built for modern technical education — from live classes to AI-powered tutoring.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass-card group p-7 hover:-translate-y-1">
                <span className="feature-icon">
                  <f.icon size={22} />
                </span>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portals */}
      <section id="portals" className="section-band px-4 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="sw-eyebrow mb-5">
              <span className="eyebrow-dot" />
              Three Portals
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">One Platform, Three Perspectives</h2>
            <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: "var(--color-text-secondary)" }}>
              Each portal is purpose-built for its audience — no clutter, just what you need.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {portals.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePortal(p)}
                data-portal={p.id}
                className="portal-card glass-card group p-7 text-left w-full hover:-translate-y-1.5"
                aria-label={`Open ${p.title} login`}
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="portal-icon">
                    <p.icon size={24} />
                  </span>
                  <ArrowUpRightIcon className="portal-arrow" size={20} />
                </div>
                <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-text-secondary)" }}>{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {p.features.map((f) => (
                    <span key={f} className="portal-chip">{f}</span>
                  ))}
                </div>
                <span className="portal-cta">
                  Open portal
                  <ArrowRightIcon size={15} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* About / CTA */}
      <section id="about" className="px-4 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card relative overflow-hidden p-10 sm:p-16 text-center">
            <div className="absolute inset-0 pointer-events-none" style={{
              background: `radial-gradient(circle at 50% 0%, var(--color-glow) 0%, transparent 60%)`,
            }} />
            <span
              className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
              style={{ background: "var(--color-accent-light)", color: "var(--color-accent)", border: "1px solid var(--color-border)" }}
            >
              <CompassIcon size={26} />
            </span>
            <h2 className="relative text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Ready to Navigate Knowledge Wisely?</h2>
            <p className="relative text-base sm:text-lg max-w-lg mx-auto mb-9" style={{ color: "var(--color-text-secondary)" }}>
              Join thousands of learners, mentors, and institutions who trust Shipwise for their technical education needs.
            </p>
            <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/student" className="sw-btn">
                Start Learning Free
              </Link>
              <Link to="/mentor" className="sw-btn-ghost">
                Become a Mentor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="px-4 py-14 border-t" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <LogoMark size={30} />
              <span className="text-lg font-extrabold">
                Ship<span style={{ color: "var(--color-accent)" }}>wise</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--color-text-secondary)" }}>
              Navigate Knowledge Wisely. A complete SaaS platform for technical education.
            </p>
          </div>
          <div>
            <h4 className="footer-heading">Platform</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/student-portal" className="footer-link no-underline">Student Portal</Link>
              <Link to="/mentor-portal" className="footer-link no-underline">Mentor Portal</Link>
              <Link to="/admin-panel" className="footer-link no-underline">Admin Panel</Link>
              <Link to="/mobile-app" className="footer-link no-underline">Mobile App</Link>
            </div>
          </div>
          <div>
            <h4 className="footer-heading">Resources</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/help-center" className="footer-link no-underline">Help Center</Link>
              <Link to="/documentation" className="footer-link no-underline">Documentation</Link>
              <Link to="/api-status" className="footer-link no-underline">API Status</Link>
              <Link to="/community" className="footer-link no-underline">Community</Link>
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <h4 className="footer-heading">Company</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/about" className="footer-link no-underline">About Us</Link>
              <Link to="/careers" className="footer-link no-underline">Careers</Link>
              <Link to="/privacy" className="footer-link no-underline">Privacy</Link>
              <Link to="/terms" className="footer-link no-underline">Terms</Link>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-5 border-t"
          style={{ borderColor: "var(--color-border)" }}>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>© 2026 Shipwise. All rights reserved.</p>
          <div className="flex gap-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href="#"
                className="icon-btn"
                aria-label={s.label}
                style={{ width: "2.2rem", height: "2.2rem" }}
              >
                <s.icon size={16} />
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
