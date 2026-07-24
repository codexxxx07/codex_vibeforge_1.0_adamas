import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";

export default function MobileApp() {
  return (
    <PageLayout>
      <div className="mb-6">
        <Link to="/" className="text-sm font-medium no-underline transition-colors hover:opacity-80" style={{ color: "var(--color-accent)" }}>
          ← Back to Home
        </Link>
      </div>

      <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
        style={{ background: "var(--color-accent-light)", color: "var(--color-accent)", border: "1px solid var(--color-border)" }}>
        Platform
      </span>
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Mobile App</h1>
      <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        Learn on the go with the Shipwise mobile app — optimized for low bandwidth, offline access, and a seamless learning experience anywhere.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { icon: "📱", title: "Learn Anywhere", desc: "Access all your courses, live classes, and practice labs from your phone. Study during your commute or downtime." },
          { icon: "📶", title: "Low Bandwidth Mode", desc: "144p video, audio-only streams, and compressed content. Learn reliably even on slow or unstable connections." },
          { icon: "📥", title: "Offline Downloads", desc: "Download lectures, notes, and assignments for offline access. No internet? No problem." },
          { icon: "🔔", title: "Smart Notifications", desc: "Get timely reminders for live classes, assignment deadlines, and doubt replies. Never miss an important update." },
          { icon: "💬", title: "Instant Doubts", desc: "Post and resolve doubts directly from your phone. Attach screenshots and code snippets for faster resolution." },
          { icon: "📊", title: "Progress Sync", desc: "Seamlessly switch between mobile and desktop. Your progress, streaks, and data sync across all devices in real-time." },
        ].map((item) => (
          <div key={item.title} className="glass-card p-6 hover:-translate-y-1">
            <div className="text-2xl mb-3">{item.icon}</div>
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 glass-card p-8 text-center">
        <h3 className="text-xl font-bold mb-3">Coming Soon</h3>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          The Shipwise mobile app is currently in development. Stay tuned for launch announcements!
        </p>
      </div>
    </PageLayout>
  );
}
