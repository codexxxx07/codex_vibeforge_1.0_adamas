import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";

export default function HelpCenter() {
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
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Help Center</h1>
      <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
        Find answers to common questions, step-by-step guides, and troubleshooting tips for all Shipwise features.
      </p>

      <div className="flex flex-col gap-4">
        {[
          { q: "How do I join a live class?", a: "Navigate to the Live Classes section in your Student Portal. Click on the scheduled class and hit 'Join Session' when it becomes active. Ensure your camera and microphone permissions are enabled." },
          { q: "How do I reset my password?", a: "Click 'Forgot Password' on the login screen. Enter your registered college email and follow the reset link sent to your inbox. Check your spam folder if you don't see it within 5 minutes." },
          { q: "Can I access courses offline?", a: "Yes! Download lectures and materials using the Offline Downloads feature in the mobile app. Content syncs automatically when you reconnect to the internet." },
          { q: "How do I contact my mentor?", a: "Use the Doubt Solving feature in the Student Portal. Post your question with relevant context, and your assigned mentor will respond within 24 hours." },
          { q: "How do I track my progress?", a: "The Progress dashboard shows your skill scores, learning streak, course completion rates, and personalized performance insights updated in real-time." },
          { q: "What are system requirements?", a: "Shipwise works on any modern browser (Chrome, Firefox, Safari, Edge). For the best experience, use a stable internet connection with at least 2 Mbps bandwidth." },
        ].map((item, i) => (
          <div key={i} className="glass-card p-6">
            <h3 className="text-base font-bold mb-2">{item.q}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{item.a}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
