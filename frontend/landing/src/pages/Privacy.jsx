import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";

export default function Privacy() {
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
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Privacy Policy</h1>
      <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        Last updated: July 24, 2026
      </p>

      <div className="space-y-8">
        {[
          { title: "Information We Collect", content: "We collect information you provide directly, such as your name, email address, educational institution, and learning activity. We also collect usage data including pages visited, features used, and performance metrics to improve our platform." },
          { title: "How We Use Your Information", content: "We use your information to provide and improve our educational services, personalize your learning experience, communicate with you about updates and opportunities, ensure platform security, and generate anonymized analytics." },
          { title: "Data Sharing", content: "We do not sell your personal data. We may share anonymized, aggregated data for research purposes. We share data with service providers who help us operate the platform (hosting, analytics, payment processing) under strict data protection agreements." },
          { title: "Data Security", content: "We implement industry-standard security measures including encryption at rest and in transit, regular security audits, access controls, and incident response procedures. All data is stored on secure cloud infrastructure with SOC 2 compliance." },
          { title: "Your Rights", content: "You have the right to access, correct, or delete your personal data. You can export your learning data at any time. You may opt out of non-essential data collection. Contact our privacy team for any data-related requests." },
          { title: "Cookies & Tracking", content: "We use essential cookies for authentication and session management. Analytics cookies help us understand usage patterns. You can manage cookie preferences in your browser settings. We do not use third-party advertising trackers." },
          { title: "Children's Privacy", content: "Shipwise is designed for users aged 13 and above. For users under 18, we require parental or institutional consent. We comply with COPPA and relevant data protection regulations for minors." },
          { title: "Contact Us", content: "For privacy-related inquiries, contact our Data Protection Officer at privacy@shipwise.edu. We respond to all requests within 30 days." },
        ].map((section) => (
          <div key={section.title} className="glass-card p-6">
            <h2 className="text-lg font-bold mb-3">{section.title}</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{section.content}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
