import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";

export default function ApiStatus() {
  return (
    <PageLayout>
      <div className="mb-6">
        <Link to="/" className="text-sm font-medium no-underline transition-colors hover:opacity-80" style={{ color: "var(--color-accent)" }}>
          ← Back to Home
        </Link>
      </div>

      <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
        style={{ background: "var(--color-accent-light)", color: "var(--color-accent)", border: "1px solid var(--color-border)" }}>
        Resources
      </span>
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">API Status</h1>
      <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        Real-time status and uptime monitoring for all Shipwise services and APIs.
      </p>

      <div className="flex flex-col gap-4">
        {[
          { name: "Authentication API", status: "Operational", uptime: "99.99%", color: "#22C55E" },
          { name: "Course Service", status: "Operational", uptime: "99.97%", color: "#22C55E" },
          { name: "Live Class Engine", status: "Operational", uptime: "99.95%", color: "#22C55E" },
          { name: "Payment Gateway", status: "Operational", uptime: "99.99%", color: "#22C55E" },
          { name: "File Storage (S3)", status: "Operational", uptime: "99.99%", color: "#22C55E" },
          { name: "AI Tutor Service", status: "Degraded Performance", uptime: "99.20%", color: "#F59E0B" },
          { name: "Notification Service", status: "Operational", uptime: "99.98%", color: "#22C55E" },
          { name: "Analytics Pipeline", status: "Operational", uptime: "99.96%", color: "#22C55E" },
        ].map((service) => (
          <div key={service.name} className="glass-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: service.color }}></span>
              <span className="font-semibold text-sm">{service.name}</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span style={{ color: service.color }}>{service.status}</span>
              <span style={{ color: "var(--color-text-muted)" }}>Uptime: {service.uptime}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs mt-6 text-center" style={{ color: "var(--color-text-muted)" }}>
        Last updated: July 24, 2026 · All times in UTC
      </p>
    </PageLayout>
  );
}
