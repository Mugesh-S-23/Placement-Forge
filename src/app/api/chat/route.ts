import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const { message, targetRole, department } = await req.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message cannot be empty' }, { status: 400 });
    }

    const trimmed = message.trim();
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const client = new GoogleGenAI({ apiKey });
        const systemPrompt = `You are "ForgeBot", an elite, empathetic campus placement coach and senior engineering mentor for Indian university students.
The student's target role is: "${targetRole || 'Full-Stack Web Dev'}".
Student department: "${department || 'ECE/Non-CS'}".

Guidelines:
- Provide clean, structured, bulleted, actionable guidance.
- Cover campus drive patterns (TCS NQT Ninja/Digital/Prime, Zoho Rounds 1-4, Infosys DSE/SP, Cognizant GenC/Next), eligibility criteria, resume advice, and interview etiquette.
- Include practical tips, avoid fluff, and maintain an encouraging tone.
- When relevant, include a quick 'Pro-Tip' or 'Tamil/Vernacular summary phrase' if helpful.`;

        const response = await client.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `${systemPrompt}\n\nStudent Query: "${trimmed}"`
        });

        const reply = response.text || '';
        return NextResponse.json({
          reply,
          suggestedFollowups: [
            "What projects should I highlight on my resume?",
            "How do I clear the Zoho round 2 coding test?",
            "What are the top 5 questions asked in HR rounds?"
          ]
        });
      } catch (geminiError) {
        console.warn("Gemini chat failed, falling back to expert knowledge base:", geminiError);
      }
    }

    // High quality offline fallback responses for campus queries
    const lower = trimmed.toLowerCase();
    let reply = "";
    let suggestedFollowups = [
      "How to prepare for Zoho Round 2 & 3?",
      "How to introduce myself as a non-CS student?",
      "What are the best STAR answers for HR rounds?"
    ];

    if (lower.includes('tcs') || lower.includes('nqt')) {
      reply = `### 🎯 TCS NQT Campus Drive Master Blueprint

**Test Structure & Rounds:**
1. **Foundation Section (75 mins):**
   * Traits / Numerical Ability (20 Qs)
   * Verbal Ability (25 Qs)
   * Reasoning Ability (20 Qs)
   * *Tip:* Negative marking applies; do not guess blindly. Aim for 70%+ accuracy.
2. **Advanced Section (Elevates you to Digital / Prime Package):**
   * Advanced Quantitative & Reasoning (15 Qs)
   * Advanced Coding (2 Problems, 90 mins):
     - Problem 1: Array / String manipulation (Kadane's, Frequency maps, Palindromes).
     - Problem 2: Dynamic Programming / Matrix / Tree recursion.

**PlacementForge Recommended Action:**
- Focus on passing all hidden test cases (check edge cases: $N=0$, negative numbers, large constraints $10^9$ requiring \`long long\` / BigInt).
- Practice Day 1 (Mental Models) & Day 3 (HashMaps) in our 14-Day Micro-Sprint.`;
      suggestedFollowups = [
        "What is the salary difference between TCS Ninja, Digital, and Prime?",
        "Top coding patterns for TCS NQT 2026",
        "How to clear TCS Technical & Managerial interview?"
      ];
    } else if (lower.includes('non-cs') || lower.includes('ece') || lower.includes('mechanical') || lower.includes('civil') || lower.includes('branch')) {
      reply = `### 🚀 Non-CS to Software SDE: The 3-Step Bridge

Interviewers love non-CS students who show genuine initiative because it proves passion beyond syllabus mandates!

1. **How to Frame Your Introduction:**
   * *"While my academic degree is in Electronics / Mechanical, I developed a deep fascination for software engineering when I realized how code can automate physical systems. Over the past 8 months, I have built foundational mastery in full-stack architecture and data structures through consistent daily practice."*
2. **The Golden Trifecta for Your Resume:**
   * 1 Full-Stack Project with authentication and database persistence.
   * Solid grasp of Arrays, HashMaps, and basic SQL queries (JOINs).
   * 1 college-specific integration (e.g. IoT dashboard, attendance automation).
3. **Overcoming the "Why IT?" Interview Question:**
   * Emphasize analytical problem-solving and rapid learning velocity.
   * State that software offers immediate feedback loops and global scalability.`;
      suggestedFollowups = [
        "Can a mechanical engineer get shortlisted for Zoho?",
        "Which projects are best for non-CS freshers?",
        "How to explain basic CS subjects like OS and DBMS?"
      ];
    } else if (lower.includes('gap') || lower.includes('backlog') || lower.includes('academic') || lower.includes('marks')) {
      reply = `### 🛡️ How to Address Academic Gaps or Backlogs with Confidence

Hiring managers test your **resilience and maturity**, not perfection.

1. **The 3-Sentence Resolution Formula:**
   * **Sentence 1 (Ownership without excuses):** *"During my 2nd/3rd semester, I faced an academic backlog / had a gap year due to personal health reasons / needing to recalibrate my foundational focus."*
   * **Sentence 2 (The Turning Point):** *"I took complete responsibility, audited where my preparation was lacking, and developed a disciplined daily schedule."*
   * **Sentence 3 (The Proof & Present):** *"Since then, I cleared all subjects, maintained consistent academic standing, and channeled my energy into building real-world projects and mastering core algorithms."*
2. **Golden Rules:**
   * Never blame professors, the college, or external circumstances.
   * Conclude by redirecting to your current Personal Velocity (+14%).`;
      suggestedFollowups = [
        "What are the 60% criteria for service vs product companies?",
        "How to clear company eligibility criteria with past backlogs?",
        "Common HR trap questions and how to answer them"
      ];
    } else if (lower.includes('zoho')) {
      reply = `### ⚡ Zoho Campus Recruitment Playbook

Zoho follows a unique, pure problem-solving approach. They do NOT look at college GPA as heavily as raw coding grit.

1. **Round 1 (Aptitude & C Output Tracing):**
   * Pointers, recursive outputs, bitwise operations, loop conditions.
   * *Secret:* Practice dry-running code on paper without a compiler!
2. **Round 2 (Basic Programming - 5 Qs, 2.5 hrs):**
   * Pattern printing, string manipulation without library functions, array permutations.
   * *Example:* "Look-and-say sequence", "Sort array by frequency".
3. **Round 3 (Advanced Programming - 1-2 Mini-Systems):**
   * Design a Railway Reservation System, Dungeon Game, or Taxi Booking System on console.
   * Focus on clean modular OOP classes and edge cases.
4. **Round 4 (Technical & HR Interviews):**
   * Deep questioning on why you chose specific loops or data structures.`;
      suggestedFollowups = [
        "What pattern programs are asked in Zoho Round 2?",
        "How to design the Railway Reservation mini-system for Zoho Round 3?",
        "Does Zoho allow Python or only Java/C++?"
      ];
    } else if (lower.includes('resume') || lower.includes('reverse resume') || lower.includes('ats')) {
      reply = `### 📄 Resume Transformation: From Blank Page to Day-0 SDE

1. **Clean 1-Page Format:**
   * Education (Degree, College, CGPA).
   * Technical Skills (categorized into Languages, Frameworks, Databases, Tools).
   * Projects (2 strong projects with STAR bullet points and live GitHub links).
   * Certifications & Coursework (Data Structures, Database Management, Computer Networks).
2. **Quantify Every Bullet Point:**
   * ❌ *"Built an e-commerce website using React and Node"*
   * ✅ *"Architected an e-commerce catalog using React and Express; indexed MongoDB collections to deliver sub-150ms search for 200+ products."*
3. **Use the PlacementForge Reverse Resume Tool:**
   * Head over to the \`/dashboard/resume-audit\` page to convert your coursework and mini-projects into recruiter-ready bullet points!`;
      suggestedFollowups = [
        "How to pass campus ATS screening filters?",
        "Should I include hobby projects on my resume?",
        "What if I don't have an internship?"
      ];
    } else {
      reply = `### 💡 PlacementForge Strategic Advice

Here is the essential blueprint for your placement journey:

1. **Consistency over Marathon Cramming:**
   * 30 minutes of daily micro-sprints beats 8 hours of chaotic panic on the night before the drive.
2. **The 3 Core Interview Pillars:**
   * **Data Structures:** Arrays, HashMaps, and Two Pointers solve 75% of fresher coding tests.
   * **Core Fundamentals:** How an API works, basic SQL JOINs, and OOP encapsulation.
   * **Articulation:** Practicing your 60-second intro and mastering the Corporate Pivot Phrase when you don't know a question.
3. **Next Action Step:**
   * Check out **Day 1: Mental Models & Flow** in your dashboard roadmap, or practice with our **Adaptive Mock Interviewer**!`;
    }

    return NextResponse.json({
      reply,
      suggestedFollowups
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({
      reply: "ForgeBot is ready to help! Please ask any placement question regarding recruitment patterns, resume polishing, or technical concepts.",
      suggestedFollowups: [
        "What to prepare for TCS NQT?",
        "How to introduce myself as a non-CS student?"
      ]
    });
  }
}
