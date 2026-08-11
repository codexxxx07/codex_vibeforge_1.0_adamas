import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";

export default function AdminPanel() {
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
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4" style={{ color: "#F4D35E" }}>Admin Panel</h1>
      <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        Full platform command — manage users, batches, payments, content, and access deep analytics to keep everything running smoothly.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { icon: "👥", title: "User Management", desc: "View, add, edit, and manage all users — students, mentors, and other admins. Control roles, permissions, and access levels." },
          { icon: "📦", title: "Batch Control", desc: "Create and manage student batches. Assign mentors, set schedules, and track batch-level performance metrics." },
          { icon: "💳", title: "Payments", desc: "Monitor all transactions, manage subscription plans, handle refunds, and generate financial reports." },
          { icon: "📄", title: "Content Control", desc: "Oversee all course content. Approve, edit, or remove courses, ensuring quality and consistency across the platform." },
          { icon: "📊", title: "Analytics", desc: "Access comprehensive platform analytics — user growth, engagement metrics, revenue trends, and course popularity." },
          { icon: "📋", title: "Reports", desc: "Generate detailed reports for compliance, audits, and business intelligence. Export data in multiple formats." },
        ].map((item) => (
          <div key={item.title} className="glass-card p-6 hover:-translate-y-1">
            <div className="text-2xl mb-3">{item.icon}</div>
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 glass-card p-8 text-center">
        <h3 className="text-xl font-bold mb-3">Need admin access?</h3>
        <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
          Access the Admin Panel to manage the entire platform.
        </p>
        <a href={import.meta.env.VITE_ADMIN_URL} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold no-underline transition-all hover:scale-105"
          style={{ background: "#F4D35E", color: "#262626" }}>
          Open Admin Panel →
        </a>
      </div>
    </PageLayout>
  );
}
