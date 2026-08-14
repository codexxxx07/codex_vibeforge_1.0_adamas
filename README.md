# Shipwise — Navigate Knowledge Wisely

> A modern multi-portal EdTech platform that connects students, mentors, and administrators through a unified learning ecosystem.

Shipwise is a complete SaaS platform for technical education. Students learn, mentors teach, and administrators manage — all inside one polished, fully interactive frontend application.

---

## Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. Key Features](#2-key-features)
- [3. Platform Architecture](#3-platform-architecture)
- [4. Tech Stack](#4-tech-stack)
- [5. Project Structure](#5-project-structure)
- [6. Landing Page](#6-landing-page)
- [7. Demo Authentication](#7-demo-authentication)
- [8. Student Portal](#8-student-portal)
- [9. Mentor Portal](#9-mentor-portal)
- [10. Admin Panel](#10-admin-panel)
- [11. UI / UX](#11-ui--ux)
- [12. Installation](#12-installation)
- [13. Quick Demo Walkthrough](#13-quick-demo-walkthrough)
- [14. Notes on Mock Functionality](#14-notes-on-mock-functionality)

---

## 1. Project Overview

**What it is.** Shipwise is a fully interactive, frontend-only EdTech platform prototype. It delivers three purpose-built experiences behind one landing page:

- **Student Portal** — a learning command center for live classes, practice, assessments, doubts, progress, and certificates.
- **Mentor Portal** — a teaching workspace for building courses, running live sessions, grading, and analyzing students.
- **Admin Panel** — a platform command center for users, batches, payments, content, courses, and analytics.

**What problem it solves.** Technical education is fragmented across separate tools for classes, assignments, coding practice, doubt resolution, and analytics. Shipwise consolidates the entire learning lifecycle into one ecosystem, with a tailored interface for each actor so there is "no clutter, just what you need."

**Who it is designed for.** Students, mentors/instructors, and platform administrators. The three-portal split lets each role work in an interface shaped around its own workflow.

**Why multiple portals.** Each role has fundamentally different responsibilities. Dedicated portals reduce cognitive load, respect each role's workflow, and demonstrate role-based UX and authorization concepts in a single application.

**How the portals work together.** All three portals live in one React app and share the same design system and theme. The landing page is the front door; selecting a portal opens a login modal; successful sign-in routes into the corresponding dashboard. Every portal is a fully navigable dashboard seeded with realistic demo data.

> **Hackathon scope note.** This is a **frontend prototype**. There is no backend — all portal data is simulated in-browser, authentication is client-side, and only the theme and demo session are persisted in `localStorage`. This is intentional for the hackathon and is documented honestly throughout.

---

## 2. Key Features

### Landing Platform

- Polished marketing landing page with hero, animated statistics, and feature highlights.
- "Three Portals" section — one card per role that opens its login modal.
- Login modal with copy-to-clipboard **demo credentials** for every portal.
- Light / dark theme toggle, persisted across sessions.
- Smooth scrolling (Lenis) and scroll-triggered fade animations.
- Static footer & sub-pages: Student / Mentor / Admin info, Mobile App, Help Center, Documentation, API Status, Community, About, Careers, Privacy, Terms.

### Student Portal

- **Dashboard** — overview of stats, quick actions, course progress, today's schedule, and recent activity.
- **Onboarding** — a 3-step wizard for personal info, interests, and preferences.
- **Skill Assessment** — a placement-style MCQ test with simulated grading and answer review.
- **Live Class** — a simulated class room with chat, hand-raise, and mic / camera / screen controls.
- **Recordings** — a recording library with a simulated player, chapters, and speed control.
- **Practice Lab** — a code editor with simulated compile output and an in-page terminal tab.
- **Doubt Solving** — a community forum with tags, replies, 1:1 mentor booking, and expert-match request.
- **Progress** — progress bars, weekly activity chart, weak topics, and achievements.
- **Assignments** — MCQ, code, and shell-file submission flows with status tracking.
- **Certificates** — certificates and a skills radar chart (download/share are simulated).
- **Terminal** — a simulated Linux shell supporting `ls`, `cd`, `cat`, `echo`, `pwd`, `history`, `neofetch`, and more.
- **PYQ Engine** — past-year-question practice with a real 10-minute exam countdown, mark-for-review, and results.
- **Scheduler** — a working study calendar where subjects can be added and removed.
- **Skill Stack** — a skill progression timeline with expandable learning paths.
- **GitHub Tracker** — a contribution heatmap, repos, and pull requests (mock data).
- **AI Tutor** — a simulated chat tutor with keyword-based answers and typing indicators.
- **Plagiarism Check** — a simulated upload flow with a similarity result and side-by-side comparison.
- **Payment** — plan selection and checkout (UPI / Card / Net Banking) with GST calculation (payment is simulated).
- **Settings** — appearance (real theme toggle), notification and data preferences, and account options.

### Mentor Portal

- **Dashboard** — live counts for pending gradings, courses, and classes plus quick navigation.
- **Course Builder** — a wizard to create courses with modules and lessons, then save as draft or publish.
- **Live Class** — a simulated live-class control room with chat, hand-raise queue, and start/end controls.
- **Grading** — a submission inbox with course/status filters, full grade + feedback, and a quick-grade mode.
- **Analytics** — engagement, course performance, and student drill-down with CSV export.
- **Students** — a roster with search, filters, pagination, detail views, bulk messaging, and CSV export.
- **Schedule** — a weekly grid with drag-and-drop rescheduling plus add / edit / delete classes.
- **Resources** — a file manager with folder tree, search, uploads (click or drag-drop), share toggles, and delete.
- **Settings** — profile, notification preferences, availability, payment info, and a danger zone.
- **Toast system** — success / error / warning notifications for every action.
- **AppContext** — shared in-memory state for submissions, resources, schedule, courses, and notifications.

### Admin Panel

- **Dashboard** — platform stats, revenue/users charts, recent registrations, quick actions, and system health.
- **Users** — full user management with add, edit, delete, suspend/activate, search, pagination, and bulk actions.
- **Batches** — batch cards with status filters, expandable rosters, and a create-batch form.
- **Payments** — revenue stats, transactions table, and a mentor-payout workflow.
- **Content** — categories, course approval, moderation, resources, and tags control.
- **Analytics** — user growth, revenue trend, enrollments, demographics, and top courses.
- **Courses** — grid/list views, filters, edit, feature, archive, delete, and bulk delete.
- **Reports** — collapsible report cards (users, courses, financials) and system logs.
- **Settings** — platform info, feature toggles, SMTP config, payment gateway, security, and maintenance mode.
- **Modal system** — shared success / error / warning dialogs plus inline form overlays.

---

## 3. Platform Architecture


**Routing map** (`src/App.jsx`):

| Route | Page |
|---|---|
| `/` | Landing page (hero, features, portals, footer) |
| `/student` · `/student-portal` | Student Portal |
| `/mentor` · `/mentor-portal` | Mentor Portal |
| `/admin` · `/admin-panel` | Admin Panel |
| `/mobile-app` · `/help-center` · `/documentation` · `/api-status` · `/community` | Landing sub-pages |
| `/about` · `/careers` · `/privacy` · `/terms` | Company pages |
| `*` | 404 page |

Each portal independently verifies authentication on mount: it reads `isAuthenticated` + `role` from `localStorage` (or the `?auth=true&role=...` URL params left by the login flow) and redirects to `/` if the role does not match. Logging out clears both keys and returns to the landing page.

---

## 4. Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework — components, hooks, contexts |
| **Vite 8** | Build tool and dev server |
| **JavaScript (ESM / JSX)** | Application language |
| **Tailwind CSS 3.4** | Utility-first styling and responsive layout |
| **Custom CSS** (`src/index.css`) | Design tokens (CSS variables), light/dark themes, animations |
| **React Router DOM 7** | Client-side routing between landing and portals |
| **Lenis** | Smooth-scrolling engine for the landing experience |
| **Custom SVG icons** | Iconography (hand-rolled — no icon library) |
| **LocalStorage** | Persists the theme (`swTheme`) and demo session (`isAuthenticated`, `role`) |
| **Google Fonts — Inter** | Platform typography |
| **ESLint** | Linting (`eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`) |
| **PostCSS + Autoprefixer** | CSS processing pipeline for Tailwind |

Verified against `frontend/landing/package.json`. Note: the project intentionally uses hand-written SVG icon components instead of a third-party icon package.

---

## 5. Project Structure

The repository contains a single frontend app. All four experiences (landing, student, mentor, admin) are bundled inside it — the portals live under `src/portals/`.

```
EdTech/
└── frontend/
    └── landing/                       # One Vite app hosting the entire platform
        ├── index.html                 # Entry HTML (title, Inter font, favicon)
        ├── package.json               # Dependencies & scripts
        ├── vite.config.js             # Vite config (React plugin)
        ├── tailwind.config.js         # Shipwise palette + Inter font + class dark mode
        ├── postcss.config.js          # Tailwind + autoprefixer
        ├── eslint.config.js           # ESLint flat config
        ├── public/                    # Static assets (favicon.svg, icons.svg)
        └── src/
            ├── main.jsx               # Bootstrap: ThemeProvider → Router → effects
            ├── App.jsx                # Routes + Landing page + login modal + demo auth
            ├── ThemeContext.jsx       # Light/dark theme provider (localStorage-persisted)
            ├── index.css              # Tailwind directives + design tokens + animations
            ├── components/            # Shared UI: Logo, Icons, SmoothScroll (Lenis), ScrollFade
            ├── pages/                 # Landing sub-pages (About, Careers, Terms, ...)
            └── portals/
                ├── student/           # Student Portal (19 modules)
                │   ├── StudentPortal.jsx          # Auth guard + page registry
                │   ├── components/                # Modal, layout (Sidebar/Header/DashboardLayout)
                │   └── pages/                     # Dashboard, AITutor, PYQ, Terminal, ...
                ├── mentor/            # Mentor Portal (9 modules)
                │   ├── MentorPortal.jsx           # Auth guard + page registry
                │   ├── AppContext.jsx             # Shared state + toast system
                │   ├── components/                # Toast, layout (Sidebar/Header/DashboardLayout)
                │   └── pages/                     # Dashboard, CourseBuilder, Grading, ...
                └── admin/             # Admin Panel (9 modules)
                    ├── AdminPortal.jsx            # Auth guard + page registry
                    ├── components/                # Modal, layout (Sidebar/Header/DashboardLayout)
                    └── pages/                     # Dashboard, Users, Batches, Payments, ...
```

**Folder responsibilities**

| Folder | Responsibility |
|---|---|
| `src/App.jsx` | Landing page markup, login modal, demo credentials, and the full route table. |
| `src/ThemeContext.jsx` | Theme state (`dark` boolean), toggles the `.dark` class, persists choice in `localStorage`. |
| `src/components/` | Landing-only shared pieces: logo mark, SVG icon set, Lenis smooth scroll, scroll-fade effect. |
| `src/pages/` | Static marketing sub-pages rendered inside the shared `PageLayout`. |
| `src/portals/*/` | Each portal is self-contained: its own auth guard, layout shell (sidebar + header), page registry, and pages. |

---

## 6. Landing Page

The landing page is built from `src/App.jsx` and follows a single-page scroll layout:

- **Navbar** — sticky glass navbar with the Shipwise logo, anchor links (`Features`, `Portals`, `About`, `Contact`), a theme toggle, and a "Get Started" CTA. A full-screen mobile menu replaces it on small screens.
- **Hero** — "Navigate Knowledge Wisely" headline with an animated underline, supporting copy, primary/secondary CTAs, and an animated **stats row** (5K+ Active Learners, 120+ Courses, 92% Success Rate, 4.5★ Rating) that counts up when scrolled into view.
- **Features** — six glass cards: Skill-Based Learning, AI Tutor, Browser Terminal, Smart Analytics, Low Bandwidth Mode, Open Source Focus.
- **Three Portals** — three interactive cards (Student / Mentor / Admin), each with its own description, feature chips, accent color, and an "Open portal" call-to-action. Clicking a card opens that portal's **login modal**.
- **Login modal** — a per-portal sign-in dialog (color-coded) with email/password fields, validation, and a **Demo Credentials** panel where the email and password can be copied to the clipboard with one click.
- **About / CTA** — a closing call-to-action panel ("Ready to Navigate Knowledge Wisely?") with student and mentor CTAs.
- **Footer** — four link columns (Platform, Resources, Company) plus social icon buttons; the platform/company links route to the static sub-pages.
- **Theme switching** — the sun/moon toggle flips the entire site (landing *and* portals) between light and dark, persisted in `localStorage`.

The landing experience is enhanced by **Lenis smooth scrolling** and a **scroll-fade effect** that drifts cards in as they enter the viewport (both respect `prefers-reduced-motion`).

---

## 7. Demo Authentication

> **Important.** Authentication is currently **demo / client-side only**. Credentials are hardcoded in `src/App.jsx`, matched in the browser, and the "session" is a flag stored in `localStorage`. It is **not** production-secure and is provided purely for hackathon demonstration.

| Role | Email | Password | Portal route |
|---|---|---|---|
| **Student** | `student@college.edu` | `student123` | `/student` |
| **Mentor** | `mentor@college.edu` | `mentor123` | `/mentor` |
| **Admin** | `admin@college.edu` | `admin123` | `/admin` |

**How the flow works**

1. On the landing page, click a portal card → the login modal opens with the matching role pre-selected.
2. Enter the demo credentials (or click the copy buttons next to them).
3. On success, the app writes `isAuthenticated=true` and `role=<role>` to `localStorage` and navigates to the portal (`/student`, `/mentor`, or `/admin`).
4. The portal's auth guard re-validates the stored role before rendering; mismatched or missing credentials redirect to `/`.
5. **Logout** (bottom of each portal sidebar) removes both keys and returns to the landing page.

**A note on the future.** Because all auth state is front-end-only, a real backend can be plugged in later by replacing the credential match in `App.jsx` with an API call (e.g., JWT-based), and swapping the `localStorage` guards in each portal with token validation. No UI restructuring would be required.

---

## 8. Student Portal

Entry route: `/student`. The portal mounts a collapsible sidebar (desktop) / drawer (mobile), a header with search, notifications, and theme toggle, and 18 sidebar sections plus a standalone Terminal module. All data is simulated.

| Feature | What it currently does |
|---|---|
| **Dashboard** | "Welcome back" hero, stat cards, quick-action cards, course progress bars, today's schedule, recent activity. Quick actions jump to Live Class, Practice Lab, Doubts, and PYQ. |
| **Onboarding** | 3-step wizard (personal info → interests → preferences) with validation, toggleable interest chips, a goal selector, and a study-hours slider. Ends at a "Start Placement Test" step. |
| **Skill Assessment** | Topic picker → MCQ placement quiz (Linux/C topics) → score screen with percentage, correct/wrong counts, weak-area flags, and a full answer review. Grading is computed client-side. |
| **Live Class** | Simulated class room: live-stream placeholder, REC badge, chapter list, live chat, participants, and mic / camera / screen-share / hand-raise controls. Leave flow shows confirm + "Left Class" dialogs. |
| **Recordings** | Library of recorded classes with a simulated player (play/pause, progress bar, chapter selector, 1x–2x speed) and a simulated download dialog. |
| **Practice Lab** | Exercise + Terminal tabs. Picking an exercise pre-fills a C code editor; "Run" shows a fake compile spinner then canned output. The terminal tab echoes commands with a fake `[executed]` prefix. |
| **Doubt Solving** | Community forum with tag filtering, thread detail modals with replies, hot topics; Mentor tab with availability, ratings, 1:1 session booking, and an "Expert Match" request form. |
| **Progress** | Overall progress stat, per-course syllabus bars, a weekly activity bar chart, weak topics (each linking to Practice Lab), and an achievements grid. |
| **Assignments** | Filterable assignment list (All/Pending/Submitted/Graded). MCQ, code, and shell-submission flows flip local status to "submitted" (no real upload/grading). |
| **Certificates** | Certificate list (completed + in-progress), a skills radar chart, and simulated Download PDF / Share on LinkedIn dialogs. |
| **Terminal** | A real mini command-line simulator: `help`, `ls`, `cd`, `cat`, `echo`, `whoami`, `pwd`, `uname`, `date`, `neofetch`, `history`, `clear`, plus easter-egg responses and arrow-key command history. |
| **PYQ Engine** | Subject picker → 5-question MCQ exams with a live 10-minute countdown (`setInterval`), mark-for-review, a question palette, auto-submit at 0:00, and a results screen with per-question answers. |
| **Scheduler** | A real calendar (current month, prev/next, today highlight), monthly/weekly views, and a form to add/remove subjects with per-day toggles and a color picker. |
| **Skill Stack** | Vertical skill-progression timeline; expanding a skill reveals its courses, projects, and next-step recommendation. |
| **GitHub Tracker** | Contribution heatmap (randomized mock), stat cards, repositories, and pull requests with detail modals. Not connected to the GitHub API. |
| **AI Tutor** | Chat UI with a typing indicator; canned keyword-based answers (e.g., polymorphism, deadlock, OSI model), suggestion chips, and an "Explain Error" modal. Not a real LLM. |
| **Plagiarism Check** | Drag-drop/browse upload simulation, 23% similarity result, matched sources, and a toggleable side-by-side code comparison. No scanning logic. |
| **Payment** | Three plans (Basic ₹499 / Pro ₹999 / Enterprise ₹2499) with GST (18%) order summary, UPI / Card / Net Banking tabs, EMI calculator, and a simulated processing dialog. No real payment. |
| **Settings** | Working theme toggle via `ThemeContext`; notification/data preference switches; account and storage sections with simulated save/actions. |

---

## 9. Mentor Portal

Entry route: `/mentor`. The portal is wrapped in an `AppProvider` (`src/portals/mentor/AppContext.jsx`) that owns shared in-memory state — submissions, resources, schedule, courses, notifications — plus a **toast system** that surfaces success/error/warning feedback for every action.

| Feature | What it currently does |
|---|---|
| **Dashboard** | Live counts derived from context (pending gradings, active courses, upcoming classes), quick-action navigation, recent activity, today's schedule, and a weekly earnings chart (mock). |
| **Course Builder** | Full course-creation wizard: title/description/category/level/thumbnail, plus an expandable curriculum of modules and lessons (each lesson can carry a video file). Save Draft or Publish — both validated, simulated with a short delay, then added to context. |
| **Live Class** | Simulated control room: Start/End Class with toasts, live chat, a raise-hand queue with Accept/Decline, and mic/camera/screen-share preview states. No real WebRTC. |
| **Grading** | Inbox of student submissions with course/status filters, a stats strip (pending/graded/avg score), full grade + feedback panel, and an inline Quick Grade mode. Grades update context and toast on success. |
| **Analytics** | Engagement bars, course-performance progress, and a student drill-down with search; "Export Data" downloads a real `analytics-export.csv`. |
| **Students** | Roster with search, course filter, pagination, detail view, "Message All" (simulated), and a real `students-export.csv` download. |
| **Schedule** | Weekly Mon–Sun grid (08:00–18:00) with drag-and-drop class rescheduling, hover edit/delete, and an Add Class modal. Changes persist to context state for the session. |
| **Resources** | File manager with a folder tree, search, click-to-upload and drag-drop upload (type/size inferred from the file), shared/private toggles, and delete. Downloads are simulated via toast. |
| **Settings** | Profile form, expertise tags, notification toggles, availability, read-only payment info, and a danger zone (delete account / archive courses are simulated; Export All Data downloads a real JSON file). |

---

## 10. Admin Panel

Entry route: `/admin`. The panel uses a shared `Modal` component for notifications/confirmations and hand-rolled inline overlays for forms. All data is mock and lives in component state.

| Feature | What it currently does |
|---|---|
| **Dashboard** | Stat cards, revenue chart, user chart, recent registrations (expandable), quick actions, and a system-health strip. Charts are static CSS/SVG renderings of mock arrays. |
| **Users** | Role tabs, search, pagination, row selection with bulk Suspend/Activate, and full CRUD: add user, edit user, toggle active state, delete. |
| **Batches** | Status-filtered batch cards with occupancy bars, expandable rosters, mentor/contact/schedule details, and a create-batch form. |
| **Payments** | Revenue stats, a filterable transactions table, and a payouts workflow ("Pay Now" / "Process All" flip payouts to Paid). |
| **Content** | Five control tabs: Categories (add/rename/delete), Course Approval (approve/reject/review), Moderation (keep/remove), Resources (simulated uploads/downloads), and Tags (add/delete with duplicate check). |
| **Analytics** | Overview stats, user-growth bars, revenue trend, enrollment/popularity bars, demographics donut, and a top-courses table. |
| **Courses** | Grid/list toggle, category/status/price filters, checkbox bulk-delete, and per-course edit, feature (star), archive, and delete. "Create Course" is a "coming soon" placeholder modal. |
| **Reports** | Collapsible report cards for users, courses, financials, and a scrollable system-logs list. Download buttons show simulated success dialogs. |
| **Settings** | Platform info, feature toggles, SMTP config with "Test Connection", payment gateway status, security options (2FA, session timeout, password policy), and a maintenance-mode switch. The theme toggle is wired to the real `ThemeContext`. |

---

## 11. UI / UX

The entire platform shares one visual system, defined in `src/index.css` and Tailwind.

- **Design tokens** — CSS custom properties (`--color-bg-*`, `--color-text-*`, `--color-border`, `--color-accent`, shadows, glows) power every surface, making theming consistent across all four experiences.
- **Light / Dark themes** — class-based dark mode (`.dark` on `<html>`). Light uses soft gray-blue surfaces with a teal accent; dark uses deep navy surfaces with a brighter teal. Choice persists via `localStorage`.
- **Brand palette** — Shipwise teal `#1D7874` (accent), yellow `#F4D35E` (admin), orange `#EE964B` (mentor), defined in `tailwind.config.js`.
- **Typography** — Inter (400–900) via Google Fonts, with a monospace stack for terminal and credential displays.
- **Components & patterns** — glass cards, rounded buttons (`sw-btn`, `sw-btn-ghost`), input styles, icon buttons, eyebrow badges with a pulsing radar dot, animated nav-link underlines, and hover lift/translate states.
- **Motion** — Lenis smooth scrolling, scroll-fade reveals with staggered card drift, animated stat counters, a CSS hero underline, and keyframed entrance animations (all disabled under `prefers-reduced-motion`).
- **Responsive** — Tailwind breakpoints throughout; portals use collapsible sidebars on desktop and slide-in drawer navigation on mobile, with responsive headers and grids.
- **Portal accents** — each portal color-codes its login modal, sidebar, and highlights (teal = student, orange = mentor, yellow = admin) while staying on the shared theme.
- **Feedback systems** — modal dialogs for info/confirmations (student + admin) and toast notifications (mentor), plus simulated save/processing states.

---

## 12. Installation

### Prerequisites

- **Node.js** 18+ (the project uses Vite 8 and React 19)
- **npm** (bundled with Node.js)

### Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd <repository-folder>

# 2. Install dependencies
cd frontend/landing
npm install

# 3. Start the dev server
npm run dev
```

Vite will print a local URL (default `http://localhost:5173`). Open it, then follow the [Quick Demo Walkthrough](#13-quick-demo-walkthrough).

### Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint over the project |

---

## 13. Quick Demo Walkthrough

1. Run `npm run dev` in `frontend/landing` and open the printed URL.
2. Scroll the landing page — try the theme toggle (navbar), the animated hero stats, and the portal cards.
3. Click **Student Portal** and sign in with `student@college.edu` / `student123`.
4. Explore the student sidebar — try the **PYQ Engine** (timed exam), **Terminal** (type `help`), **Practice Lab**, and **AI Tutor**.
5. Log out from the sidebar bottom, then repeat with the **Mentor Portal** (`mentor@college.edu` / `mentor123`) — try Course Builder, Grading, and drag a class in Schedule.
6. Finally, sign in to the **Admin Panel** (`admin@college.edu` / `admin123`) and try Users (add a user), Batches (create one), and Content approval.

---

## 14. Notes on Mock Functionality

To keep the hackathon demo honest and shippable, several features are simulated rather than wired to real services:

- **Authentication** is client-side (hardcoded credentials + `localStorage`). See [Demo Authentication](#7-demo-authentication).
- **No backend / database** — all portal data is seeded in React state and resets on reload.
- **AI Tutor** is keyword-based canned responses, not a real LLM.
- **Live classes** are UI simulations — no WebRTC/media.
- **Practice Lab & Terminal** fake compilation and command execution.
- **Downloads** (certificates, recordings, resources, reports) are mostly simulated modals — except the mentor/admin **CSV/JSON exports**, which generate real files.
- **Payments** and **plagiarism scanning** are simulated flows with validation only.
- **Charts** are CSS/SVG renderings of hardcoded arrays.

These are natural integration points for a follow-up phase: a real backend (REST/graph), JWT auth, an LLM API, WebRTC streaming, payment gateways (e.g., Razorpay/Stripe), and a database — all without changing the existing UI architecture.

---

*Built for the EdTech hackathon. © 2026 Shipwise.*
