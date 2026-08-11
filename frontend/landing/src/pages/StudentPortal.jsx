import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";

export default function StudentPortal() {
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
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4" style={{ color: "#1D7874" }}>Student Portal</h1>
      <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        Your learning command center — attend live classes, practice in labs, track progress, solve doubts, and earn certificates.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { icon: "📡", title: "Live Classes", desc: "Join real-time interactive sessions with mentors. Ask questions, participate in polls, and collaborate with peers." },
          { icon: "🖥️", title: "Practice Lab", desc: "Browser-based Linux terminal and code editor. Practice commands and run projects without any local setup." },
          { icon: "❓", title: "Doubt Solving", desc: "Post doubts anytime and get detailed explanations from mentors and the community within hours." },
          { icon: "📊", title: "Progress Tracking", desc: "Visualize your learning journey with streaks, skill scores, completion rates, and personalized insights." },
          { icon: "📝", title: "Assignments", desc: "Complete graded assignments with auto-evaluation. Get instant feedback and improve your skills." },
          { icon: "🏆", title: "Certificates", desc: "Earn verified certificates upon course completion. Share them on LinkedIn and build your professional profile." },
        ].map((item) => (
          <div key={item.title} className="glass-card p-6 hover:-translate-y-1">
            <div className="text-2xl mb-3">{item.icon}</div>
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 glass-card p-8 text-center">
        <h3 className="text-xl font-bold mb-3">Ready to start learning?</h3>
        <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
          Access the Student Portal to begin your journey.
        </p>
        <Link to="/student" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold no-underline transition-all hover:scale-105"
          style={{ background: "#1D7874", color: "#fff" }}>
          Open Student Portal →
        </Link>
      </div>
    </PageLayout>
  );
}
