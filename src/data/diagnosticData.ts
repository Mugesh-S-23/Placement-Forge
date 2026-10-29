export interface DiagnosticStep1 {
  title: string;
  question: string;
  scenario: string;
  options: { id: string; text: string; logicFeedback: string; isOptimal: boolean }[];
}

export interface DiagnosticStep2 {
  title: string;
  question: string;
  scenario: string;
  steps: { id: string; label: string }[];
  correctOrder: string[];
}

export interface DiagnosticStep3 {
  title: string;
  prompt: string;
  formula: string[];
  placeholder: string;
  sampleTip: string;
}

export const DIAGNOSTIC_STEP_1: DiagnosticStep1 = {
  title: "Step 1: Intuitive Logic & Pattern Puzzle",
  question: "The Heavy Gold Coin Puzzle",
  scenario: "You have 9 identical-looking gold coins, but exactly 1 coin is counterfeit and weighs slightly more than the other 8. You have a two-pan balance scale. What is the MINIMUM number of weighings guaranteed to find the heavier counterfeit coin?",
  options: [
    {
      id: "opt-1",
      text: "4 weighings (Split 4 and 4, then divide the remainder)",
      logicFeedback: "Binary halving works, but we can do better! A balance scale actually has 3 outcomes: left heavy, right heavy, or balanced!",
      isOptimal: false
    },
    {
      id: "opt-2",
      text: "2 weighings (Divide into 3 groups of 3 coins each)",
      logicFeedback: "Spot on! By dividing into 3 groups of 3 (A, B, C): Weigh A vs B. If balanced, coin is in C. If unbalanced, you know the heavy group. 2nd weighing: weigh 2 coins from the chosen group of 3. Total = 2 weighings! This is ternary search O(log3 N).",
      isOptimal: true
    },
    {
      id: "opt-3",
      text: "3 weighings (Weigh in pairs of 3)",
      logicFeedback: "Close! 3 weighings will definitely find it, but with ternary division you can guarantee it in just 2.",
      isOptimal: false
    },
    {
      id: "opt-4",
      text: "1 weighing (Lucky guess)",
      logicFeedback: "While you might get lucky, technical problem solving requires worst-case mathematical guarantees.",
      isOptimal: false
    }
  ]
};

export const DIAGNOSTIC_STEP_2: DiagnosticStep2 = {
  title: "Step 2: Real-World Flow & System Logic",
  question: "Order the User Authentication Flow",
  scenario: "A student enters their email & password on PlacementForge and clicks 'Sign In'. Drag or arrange these 4 events into the correct security and execution sequence:",
  steps: [
    { id: "A", label: "Browser sends HTTPS POST request with credentials to /api/auth" },
    { id: "B", label: "Client validates non-empty email format and password length in UI" },
    { id: "C", label: "Server queries DB, verifies password hash with bcrypt, issues JWT token" },
    { id: "D", label: "Browser stores session token securely and redirects user to Dashboard" }
  ],
  correctOrder: ["B", "A", "C", "D"]
};

export const DIAGNOSTIC_STEP_3: DiagnosticStep3 = {
  title: "Step 3: Clear Articulation & Communication",
  prompt: "Deliver your 60-Second Self-Introduction",
  formula: [
    "1. Who you are & your educational background (Department, Year)",
    "2. Your technical core strengths and what project you built recently",
    "3. Why you are excited to solve engineering problems in this role"
  ],
  placeholder: "Hello! My name is ..., currently in my final year of ECE/CSE at ... In the past 6 months, I have focused on full-stack web development and built ... What drives me is ...",
  sampleTip: "Don't recite your high school marks or hobbies like watching movies. Keep it strictly focused on your technical problem-solving journey and positive learning attitude."
};
