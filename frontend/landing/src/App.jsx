import { useState } from "react";
import { useTheme } from "./ThemeContext";

function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-300 hover:scale-110 hover:rotate-12"
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
    href: "/student-web",
  },
  {
    id: "mentor",
    title: "Mentor Portal",
    desc: "Teach, guide, and grow. Build courses, conduct live sessions, grade submissions, and analyze student performance.",
    features: ["Course Builder", "Live Class Control", "Grading Dashboard", "Student Analytics", "Schedule", "Resources"],
    color: "#EE964B",
    href: "/mentor-web",
  },
  {
    id: "admin",
    title: "Admin Panel",
    desc: "Full platform command. Manage users, batches, payments, content, and access deep analytics.",
    features: ["User Management", "Batch Control", "Payments", "Content Control", "Analytics", "Reports"],
    color: "#F4D35E",
    href: "/admin-panel",
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
  const { dark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-primary)", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4"
        style={{
          background: dark ? "rgba(11,11,24,0.9)" : "rgba(248,250,252,0.9)",
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
          <a href="/student-web" className="text-sm font-bold px-5 py-2 rounded-lg no-underline transition-all hover:scale-105"
            style={{ background: "var(--color-accent)", color: "#fff" }}>
            Get Started
          </a>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer" aria-label="Menu">
            <span className="block w-6 h-0.5 rounded transition-all" style={{ background: "var(--color-text-primary)", transform: menuOpen ? "rotate(45deg) translateY(5px)" : "" }}></span>
            <span className="block w-6 h-0.5 rounded transition-all" style={{ background: "var(--color-text-primary)", opacity: menuOpen ? 0 : 1 }}></span>
            <span className="block w-6 h-0.5 rounded transition-all" style={{ background: "var(--color-text-primary)", transform: menuOpen ? "rotate(-45deg) translateY(-5px)" : "" }}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 md:hidden" style={{ background: dark ? "rgba(11,11,24,0.98)" : "rgba(248,250,252,0.98)", backdropFilter: "blur(20px)" }}>
          {["Features", "Portals", "About", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              className="text-lg font-semibold no-underline transition-all duration-300 border-b-2 border-transparent hover:border-[var(--color-accent)] pb-0.5" style={{ color: "var(--color-text-primary)" }}>
              {item}
            </a>
          ))}
          <a href="/student-web" className="text-base font-bold px-6 py-3 rounded-lg no-underline" style={{ background: "var(--color-accent)", color: "#fff" }}>
            Get Started
          </a>
        </div>
      )}

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(circle at 20% 50%, var(--color-glow) 0%, transparent 50%), radial-gradient(circle at 80% 50%, var(--color-glow) 0%, transparent 50%)`,
        }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
            style={{ background: "var(--color-accent-light)", color: "var(--color-accent)", border: "1px solid var(--color-border)" }}>
            🚀 Next-Gen Learning Platform
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none mb-6">
            Navigate Knowledge <br />
            <span style={{ color: "var(--color-accent)" }}>Wisely</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            Shipwise is a complete SaaS platform for technical education — with dedicated portals for students, mentors, and administrators.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/student-web" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold no-underline transition-all hover:scale-105 hover:-translate-y-1"
              style={{ background: "var(--color-accent)", color: "#fff", boxShadow: "0 4px 20px var(--color-glow-strong)" }}>
              Start Learning
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#portals" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold no-underline transition-all hover:scale-105 hover:-translate-y-1"
              style={{ border: "1px solid var(--color-border)", color: "var(--color-text-primary)" }}>
              Explore Portals
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mt-16">
            {[
              { num: "5K+", label: "Active Learners" },
              { num: "120+", label: "Expert Courses" },
              { num: "92%", label: "Success Rate" },
              { num: "4.8★", label: "Avg Rating" },
            ].map((s) => (
              <div key={s.label} className="text-center">
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
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ background: "var(--color-accent-light)", color: "var(--color-accent)", border: "1px solid var(--color-border)" }}>
              Platform Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Everything You Need to Succeed</h2>
            <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
              Built for modern technical education — from live classes to AI-powered tutoring.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass-card p-6 sm:p-8 hover:-translate-y-1">
                <div className="text-3xl mb-4">{f.icon}</div>
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
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ background: "var(--color-accent-light)", color: "var(--color-accent)", border: "1px solid var(--color-border)" }}>
              Three Portals
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">One Platform, Three Perspectives</h2>
            <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
              Each portal is purpose-built for its audience — no clutter, just what you need.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {portals.map((p) => (
              <a key={p.id} href={p.href} className="glass-card p-6 sm:p-8 no-underline block group hover:-translate-y-2"
                style={{ borderTop: `3px solid ${p.color}` }}>
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
              </a>
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
            <p className="text-base sm:text-lg max-w-lg mx-auto mb-8" style={{ color: "var(--color-text-muted)" }}>
              Join thousands of learners, mentors, and institutions who trust Shipwise for their technical education needs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/student-web" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold no-underline transition-all hover:scale-105"
                style={{ background: "var(--color-accent)", color: "#fff" }}>
                Start Learning Free
              </a>
              <a href="/mentor-web" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold no-underline transition-all hover:scale-105"
                style={{ border: "1px solid var(--color-border)", color: "var(--color-text-primary)" }}>
                Become a Mentor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 border-t" style={{ borderColor: "var(--color-border)" }}>
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
            { title: "Platform", links: ["Student Portal", "Mentor Portal", "Admin Panel", "Mobile App"] },
            { title: "Resources", links: ["Help Center", "Documentation", "API Status", "Community"] },
            { title: "Company", links: ["About Us", "Careers", "Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold mb-4" style={{ color: "var(--color-text-primary)" }}>{col.title}</h4>
              <div className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <a key={l} href="#" className="text-sm no-underline transition-colors hover:opacity-80" style={{ color: "var(--color-text-muted)" }}>{l}</a>
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
  );
}
