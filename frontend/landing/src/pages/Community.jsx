import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";

export default function Community() {
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
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Community</h1>
      <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
        Join the Shipwise community — connect with fellow learners, mentors, and developers. Share knowledge, ask questions, and grow together.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { icon: "💬", title: "Discussion Forum", desc: "Post questions, share insights, and engage in technical discussions with thousands of learners and mentors." },
          { icon: "🐙", title: "Open Source", desc: "Contribute to Shipwise on GitHub. Report bugs, submit PRs, and help build the future of technical education." },
          { icon: "🎓", title: "Study Groups", desc: "Form or join study groups for specific topics. Collaborate on projects, prepare for interviews, and learn together." },
          { icon: "🏆", title: "Challenges & Hackathons", desc: "Participate in coding challenges, hackathons, and competitions. Win prizes and recognition." },
          { icon: "📢", title: "Events & Meetups", desc: "Attend virtual and in-person events, tech talks, and workshops hosted by industry experts." },
          { icon: "🌟", title: "Showcase", desc: "Share your projects, portfolio pieces, and achievements with the community. Get feedback and inspiration." },
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
