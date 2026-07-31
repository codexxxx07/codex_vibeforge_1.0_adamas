import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";

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

export default function PageLayout({ children }) {
  const { dark } = useTheme();

  return (
    <div className="page-shell" style={{ backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-primary)", minHeight: "100vh" }}>
      <div className={`floating-nav-shell ${dark ? "" : "px-3 pt-3 sm:px-6"}`}>
          <nav
            className={`${dark ? "flex items-center justify-between px-7 sm:px-12 py-4" : "light-nav flex items-center justify-between px-4 sm:px-6 py-3.5"}`}
          style={{
            background: "var(--color-nav-bg)",
            backdropFilter: "blur(var(--blur-nav))",
            borderBottom: dark ? "1px solid var(--color-border)" : undefined,
          }}
        >
          <Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight no-underline" style={{ color: "var(--color-text-primary)" }}>
            <span className="text-2xl">🧭</span>
            Ship<span style={{ color: "var(--color-accent)" }}>wise</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="nav-link text-sm font-medium no-underline transition-all duration-300 pb-0.5" style={{ color: "var(--color-text-muted)" }}>
              Home
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </div>

      <main className="page-main pt-28 sm:pt-32 pb-16 px-4">
        <div className="page-content max-w-4xl mx-auto">
          {children}
        </div>
      </main>

      <footer className="footer-surface px-4 py-12 border-t" style={{ borderColor: "var(--color-border)" }}>
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
