import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";

export default function Documentation() {
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
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Documentation</h1>
      <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
        Comprehensive technical documentation for the Shipwise platform — APIs, SDKs, integration guides, and architecture overviews.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { icon: "🚀", title: "Getting Started", desc: "Quick start guide for new users. Set up your account, configure your environment, and launch your first course in minutes." },
          { icon: "🔑", title: "Authentication", desc: "Learn about OAuth 2.0, JWT tokens, API keys, and role-based access control for secure platform integration." },
          { icon: "📡", title: "REST API Reference", desc: "Full reference for all REST endpoints — users, courses, enrollments, grades, payments, and webhook events." },
          { icon: "🔌", title: "Webhooks & Events", desc: "Subscribe to real-time events for user actions, course updates, payment completions, and grade submissions." },
          { icon: "🏗️", title: "Architecture Guide", desc: "Understand the platform microservices architecture, data flow, caching layers, and deployment topology." },
          { icon: "📦", title: "SDKs & Libraries", desc: "Official client libraries for JavaScript, Python, and Java. Pre-built components for rapid integration." },
        ].map((item) => (
          <div key={item.title} className="glass-card p-6 hover:-translate-y-1">
            <div className="text-2xl mb-3">{item.icon}</div>
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
