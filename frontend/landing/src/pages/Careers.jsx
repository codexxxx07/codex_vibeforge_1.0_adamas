import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";

export default function Careers() {
  return (
    <PageLayout>
      <div className="mb-6">
        <Link to="/" className="text-sm font-medium no-underline transition-colors hover:opacity-80" style={{ color: "var(--color-accent)" }}>
          ← Back to Home
        </Link>
      </div>

      <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
        style={{ background: "var(--color-accent-light)", color: "var(--color-accent)", border: "1px solid var(--color-border)" }}>
        Company
      </span>
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Careers</h1>
      <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        Join our team and help build the future of technical education. We're always looking for talented people who share our passion.
      </p>

      <div className="flex flex-col gap-4">
        {[
          { title: "Frontend Engineer", type: "Full-time", location: "Remote", desc: "Build beautiful, performant user interfaces using React and modern web technologies." },
          { title: "Backend Engineer", type: "Full-time", location: "Remote", desc: "Design and implement scalable microservices, APIs, and data pipelines for our education platform." },
          { title: "Product Designer", type: "Full-time", location: "Hybrid", desc: "Create intuitive, accessible designs that make complex educational tools feel simple." },
          { title: "DevOps Engineer", type: "Full-time", location: "Remote", desc: "Manage cloud infrastructure, CI/CD pipelines, and ensure 99.99% platform uptime." },
          { title: "Content Strategist", type: "Contract", location: "Remote", desc: "Develop and curate high-quality technical content for our growing course library." },
          { title: "Community Manager", type: "Full-time", location: "Remote", desc: "Foster our learner community, organize events, and drive engagement across platforms." },
        ].map((job) => (
          <div key={job.title} className="glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold mb-1">{job.title}</h3>
              <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--color-text-muted)" }}>{job.desc}</p>
              <div className="flex gap-3">
                <span className="text-xs font-medium px-3 py-1 rounded-full"
                  style={{ background: "var(--color-accent-light)", color: "var(--color-accent)" }}>{job.type}</span>
                <span className="text-xs font-medium px-3 py-1 rounded-full"
                  style={{ background: "var(--color-accent-light)", color: "var(--color-accent)" }}>{job.location}</span>
              </div>
            </div>
            <button className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 flex-shrink-0"
              style={{ background: "var(--color-accent)", color: "#fff", cursor: "pointer", border: "none" }}>
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
