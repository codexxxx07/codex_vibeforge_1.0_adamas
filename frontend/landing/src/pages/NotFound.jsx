import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";

export default function NotFound() {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center text-center py-16">
        <span className="text-7xl mb-6">🧭</span>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-4">404</h1>
        <h2 className="text-xl font-bold mb-4">Page Not Found</h2>
        <p className="text-sm mb-8 max-w-md" style={{ color: "var(--color-text-secondary)" }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold no-underline transition-all hover:scale-105"
          style={{ background: "var(--color-accent-strong)", color: "#fff" }}>
          Back to Home
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </PageLayout>
  );
}
