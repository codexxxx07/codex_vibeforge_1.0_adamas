import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";

export default function MentorPortal() {
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
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4" style={{ color: "#EE964B" }}>Mentor Portal</h1>
      <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        Teach, guide, and grow — build courses, conduct live sessions, grade submissions, and analyze student performance.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { icon: "🏗️", title: "Course Builder", desc: "Create comprehensive courses with modules, lessons, quizzes, and assignments using an intuitive drag-and-drop editor." },
          { icon: "📡", title: "Live Class Control", desc: "Host interactive live sessions with screen sharing, whiteboard, breakout rooms, and real-time student engagement tools." },
          { icon: "✏️", title: "Grading Dashboard", desc: "Review and grade student submissions efficiently with rubrics, inline comments, and bulk grading capabilities." },
          { icon: "📈", title: "Student Analytics", desc: "Track student engagement, performance trends, and identify learners who need extra attention." },
          { icon: "📅", title: "Schedule", desc: "Manage your teaching schedule, set office hours, and sync with calendar apps for seamless time management." },
          { icon: "📚", title: "Resources", desc: "Upload and organize teaching materials — documents, videos, code samples, and reference links for your students." },
        ].map((item) => (
          <div key={item.title} className="glass-card p-6 hover:-translate-y-1">
            <div className="text-2xl mb-3">{item.icon}</div>
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 glass-card p-8 text-center">
        <h3 className="text-xl font-bold mb-3">Ready to start teaching?</h3>
        <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
          Access the Mentor Portal to manage your courses and students.
        </p>
        <a href={import.meta.env.VITE_MENTOR_URL} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold no-underline transition-all hover:scale-105"
          style={{ background: "#EE964B", color: "#fff" }}>
          Open Mentor Portal →
        </a>
      </div>
    </PageLayout>
  );
}
