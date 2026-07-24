import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";

export default function Terms() {
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
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Terms of Service</h1>
      <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        Last updated: July 24, 2026
      </p>

      <div className="space-y-8">
        {[
          { title: "Acceptance of Terms", content: "By accessing or using the Shipwise platform, you agree to be bound by these Terms of Service. If you do not agree, do not use the platform. These terms apply to all users, including students, mentors, and administrators." },
          { title: "User Accounts", content: "You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate and complete registration information. One account per user — multiple accounts may result in suspension." },
          { title: "Acceptable Use", content: "You agree to use Shipwise only for lawful educational purposes. Do not attempt to access other users' accounts, disrupt platform operations, upload malicious content, or engage in any activity that harms the platform or its users." },
          { title: "Intellectual Property", content: "All course content, platform features, and Shipwise branding are protected by intellectual property laws. You may not reproduce, distribute, or commercially exploit any content without explicit written permission." },
          { title: "Certificates & Credentials", content: "Certificates issued by Shipwise verify course completion. They do not constitute formal academic credit or professional certification. Misrepresentation of certificates may result in account termination." },
          { title: "Payment Terms", content: "Paid subscriptions are billed in advance. Refund requests must be made within 14 days of purchase. We reserve the right to change pricing with 30 days' notice. Failed payments result in temporary account suspension." },
          { title: "Limitation of Liability", content: "Shipwise is provided 'as is' without warranties of any kind. We are not liable for indirect, incidental, or consequential damages. Our total liability shall not exceed the amount paid by you in the 12 months preceding the claim." },
          { title: "Termination", content: "We may suspend or terminate your account for violation of these terms. You may delete your account at any time from Settings. Upon termination, your access to the platform and associated data will be removed." },
          { title: "Modifications", content: "We reserve the right to modify these terms at any time. Material changes will be communicated via email or platform notification. Continued use after changes constitutes acceptance of the updated terms." },
        ].map((section) => (
          <div key={section.title} className="glass-card p-6">
            <h2 className="text-lg font-bold mb-3">{section.title}</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{section.content}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
