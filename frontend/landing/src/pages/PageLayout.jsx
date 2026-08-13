import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import LogoMark from "../components/Logo";
import { MoonIcon, SunIcon } from "../components/Icons";

function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button onClick={toggle} className="icon-btn" aria-label="Toggle theme">
      {dark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
    </button>
  );
}

export default function PageLayout({ children }) {
  return (
    <div style={{ backgroundColor: "var(--color-bg-primary)", color: "var(--color-text-primary)", minHeight: "100vh" }}>
      <nav
        className="site-nav fixed top-0 left-0 right-0 z-50"
        style={{
          background: "var(--color-bg-nav)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="mx-auto w-full max-w-6xl flex items-center justify-between px-4 sm:px-6 py-3.5">
          <Link to="/" className="flex items-center gap-2.5 no-underline" aria-label="Shipwise home">
            <LogoMark size={34} />
            <span className="text-xl font-extrabold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              Ship<span style={{ color: "var(--color-accent)" }}>wise</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="nav-link no-underline">
              Home
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>

      <footer className="px-4 py-12 border-t" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-lg font-extrabold">
            <LogoMark size={26} />
            Ship<span style={{ color: "var(--color-accent)" }}>wise</span>
          </div>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>© 2026 Shipwise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
