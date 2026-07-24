import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";

export default function About() {
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
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">About Us</h1>
      <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        We're on a mission to make technical education accessible, effective, and engaging for everyone.
      </p>

      <div className="space-y-8">
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            Shipwise was founded with a simple belief: quality technical education should be accessible to every student, regardless of their background or location. We build tools that empower educators to teach effectively and students to learn efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { num: "5,000+", label: "Active Learners" },
            { num: "120+", label: "Expert Courses" },
            { num: "92%", label: "Success Rate" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-6 text-center">
              <div className="text-3xl font-extrabold mb-1" style={{ color: "var(--color-accent)" }}>{stat.num}</div>
              <div className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text-muted)" }}>
            Started in 2024, Shipwise grew from a small idea into a comprehensive SaaS platform serving students, mentors, and institutions across the country. Our team of educators and engineers works tirelessly to bridge the gap between traditional education and the demands of the modern tech industry.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            From live interactive classes to AI-powered tutoring, from browser-based practice labs to comprehensive analytics — every feature is designed with one goal in mind: helping learners succeed.
          </p>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Accessibility First", desc: "Low bandwidth modes, mobile-first design, and offline support ensure no learner is left behind." },
              { title: "Quality Content", desc: "Every course is reviewed by industry experts and updated regularly to stay current." },
              { title: "Data-Driven", desc: "We use analytics to personalize learning paths and help mentors intervene early." },
              { title: "Open & Transparent", desc: "Our platform is built with open-source principles. We believe in community-driven growth." },
            ].map((v) => (
              <div key={v.title}>
                <h3 className="text-base font-bold mb-1">{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
