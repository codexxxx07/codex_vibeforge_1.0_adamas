import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";

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

export default function PageLayout({ children }) {
  const { dark } = useTheme();

  return (
    <div style={{ backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-primary)", minHeight: "100vh" }}>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4"
        style={{
          background: dark ? "rgba(11,11,24,0.9)" : "rgba(248,250,252,0.9)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight no-underline" style={{ color: "var(--color-text-primary)" }}>
          <span className="text-2xl">🧭</span>
          Ship<span style={{ color: "var(--color-accent)" }}>wise</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm font-medium no-underline transition-all duration-300 border-b-2 border-transparent hover:border-[var(--color-accent)] pb-0.5" style={{ color: "var(--color-text-muted)" }}>
            Home
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>

      <footer className="px-4 py-12 border-t" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-lg font-extrabold">
            <span>🧭</span> Ship<span style={{ color: "var(--color-accent)" }}>wise</span>
          </div>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>© 2026 Shipwise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
