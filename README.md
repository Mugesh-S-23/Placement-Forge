# PlacementForge 🚀
### *The Zero-to-Offer Placement Operating System across All Engineering & Campus Branches*

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-v3-indigo?style=flat)](https://recharts.org/)
[![Google GenAI](https://img.shields.io/badge/Google_GenAI-Gemini_Flash-green?style=flat&logo=google)](https://ai.google.dev/)

---

## 📌 Overview

**PlacementForge** is an ultra-clean, non-intimidating, responsive web application built to guide engineering students and campus job seekers from zero preparation to confident placement offers. 

Unlike conventional coding platforms that cater strictly to Computer Science majors with dense, intimidating interfaces, PlacementForge is **scalable across all academic departments** (ECE, EEE, Mechanical, Civil, Chemical, Biotech, CSE, IT, AIDS/AIML, and Management/Commerce). It prioritizes **Personal Velocity (+% delta)**, physical analogies, and corporate communication pivots over rote syntax memorization.

---

## ✨ Core Features & Modules

### 1. 🔐 Clean Authentication & Academic Onboarding (`/login` & `/onboarding`)
- **Dedicated Auth Experience**: Clean toggle between **Sign In** and **Sign Up**.
- **1-Click Guest Demo**: Pre-calibrated demo profile for quick presentations and evaluations.
- **Academic Customization**: Captures College, Department (ECE, Mech, Civil, Biotech, CSE, etc.), Year of Study, and Preparedness Level.
- **Bug-Free Selection**: Selection chips highlight only when hovered or explicitly touched by the candidate.

### 2. 📊 The Command Center & Readiness Radar (`/dashboard`)
- **Top Highlights Ribbon**: Displays Day-0 Baseline (20%), Current Readiness (34%), and Personal Velocity (+14% this week) in bright emerald.
- **Visual Readiness Radar (Recharts)**: Evaluates 4 core placement dimensions:
  1. *Logic & Tracing*
  2. *Core Concepts*
  3. *Target Role Tech*
  4. *Articulation & Pivot*
- **Non-Forced Calibration Diagnostic**: Optional 3-minute diagnostic test to establish an initial baseline without trapping the user.

### 3. 🎯 Role-Tailored 14-Day Micro-Sprints (`/dashboard/roadmap`)
- Structured, bite-sized daily loops:
  - **Learn**: ELI5 breakdown, physical real-world analogy, and regional Tanglish/vernacular tip.
  - **Practice**: Exactly 1 targeted challenge with 3 progressive toggleable hints.
  - **Verify**: Student explains the concept; evaluated by AI or heuristic fallback with an instant **+10% Velocity Boost**.
- Filterable and customizable across multiple campus tracks: Full-Stack Web Dev, Data Analyst, Core Engineering (Embedded/ECE/Mech), IT Services (TCS/Infosys/CTS), and Campus SDE.

### 4. 📚 Self-Contained Study Materials Library (`/dashboard/study-materials`)
- Zero external reliance—all notes, architectural diagrams, syntax cheat sheets, and interview question banks are built directly into the portal:
  - **Full-Stack Web Dev**: REST APIs, HTTP Verbs, Status Codes, CORS, JSON contracts.
  - **Data Analyst & BI**: SQL JOINs, GROUP BY vs HAVING, DENSE_RANK() window functions, Pandas.
  - **Core Engineering & Embedded (ECE/EEE/Mech)**: Bit manipulation in C, `volatile` keyword, UART vs I2C vs SPI, ADC state machines.
  - **IT Services & Campus Drives**: TCS NQT mental math shortcuts, C/Java pointer tracing, array frequency logic.
  - **Campus SDE**: Big-O hierarchy, Stack vs Heap memory layout, spatial cache locality.

### 5. 💻 Interactive Code Sandbox (`/dashboard/practice/[dayId]`)
- Multi-language code editor supporting **JavaScript, Python, C++, and SQL**.
- Live client-side test case runner with sample inputs, boundary conditions, and hidden edge cases.
- Real-time terminal output displaying execution latency (ms) and pass/fail indicators.

### 6. 🛡️ Adaptive Mock Interviewer with Mentor Mode (`/dashboard/mock-interview`)
- Evaluates written or spoken responses (integrated with the Web Speech API).
- **The Dual-Mode Mechanism**:
  - *Normal State*: Professional technical lead or HR interviewer persona.
  - *Trigger State (Stuck or Mistake made)*: Card smoothly shifts to warm amber accents (**"Mentor Mode Activated"**), demystifies the trick behind the question, teaches the **Exact Safe Corporate Pivot Phrase**, and allows a pressure-free retry.

### 7. 🤖 Placement AI Mentor — "ForgeBot" (`/dashboard/chat` & Drawer)
- Available as a global slide-over drawer or dedicated chat page.
- Instant campus intelligence for:
  - TCS NQT Ninja, Digital & Prime patterns
  - Zoho Rounds 1 to 4 coding strategies
  - Explaining academic gaps or backlogs without panic
  - Transitioning from non-CS branches to software engineering

### 8. 🎥 Curated Masterclass Video Vault (`/dashboard/video-vault`)
- Responsive, playable video briefings covering alumni placement secrets, technical fundamentals, and STAR behavioral methods.
- Includes key takeaway summaries and synchronized notes.

### 9. 🌓 Theme Customization
- Built-in theme switcher supporting **Light Mode**, **Dark Mode**, and **System Default**.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.5](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Charts**: [Recharts v3](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Integration**: [@google/genai](https://www.npmjs.com/package/@google/genai) (`gemini-2.5-flash` / `gemini-3.8-flash`)
- **Offline Resilience**: Instant heuristic mock fallbacks for all API routes if `GEMINI_API_KEY` is not configured.