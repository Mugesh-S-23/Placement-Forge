export type TargetRole = 
  | 'Full-Stack Web Dev'
  | 'Data Analyst & BI (SQL/Python)'
  | 'Core Engineering & Embedded (ECE/EEE/Mech)'
  | 'IT Services & Campus Aptitude (TCS/Infosys/CTS)'
  | 'Software Development Engineer (Campus SDE)'
  | 'QA & Automation Engineer';

export type ExperienceLevel = 'Starting from Zero (Beginner)' | 'Intermediate';

export type ThemeMode = 'dark' | 'light' | 'system';

export interface UserProfile {
  name: string;
  email?: string;
  college: string;
  department: string;
  gradYear: string;
  targetRole: TargetRole;
  experienceLevel: ExperienceLevel;
  hasResume: boolean;
  resumeFileName?: string;
  resumeSummary?: string;
  reverseResumeSkills: string[];
}

export interface ReadinessScore {
  logic: number;
  coreConcepts: number;
  roleTech: number;
  articulation: number;
  overall: number;
}

export interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface SprintDay {
  id: number;
  title: string;
  subtitle: string;
  estimatedTime: string;
  track: 'general' | 'dsa' | 'both';
  roleTrack?: TargetRole | 'All';
  dayCategory: string;
  learn: {
    eli5: string;
    analogy: string;
    tanglishTip: string;
    keyTakeaways: string[];
  };
  practice: {
    problemTitle: string;
    problemDescription: string;
    defaultLanguage?: string;
    starterCode?: string;
    hints: [string, string, string]; // Progressive 3 hints
    sampleInput?: string;
    expectedOutput?: string;
    testCases?: TestCase[];
  };
  verify: {
    prompt: string;
    placeholder: string;
    sampleGoodAnswer: string;
  };
  status: 'completed' | 'in_progress' | 'locked';
  earnedVelocity?: number;
  userVerificationSubmission?: string;
  feedback?: {
    strengths: string[];
    blindspots: string[];
    velocityDelta: number;
    coachNote: string;
  };
}

export interface DSATrackItem {
  id: string;
  title: string;
  difficulty: 'Easy (Freshers)' | 'Medium (Core Drive)' | 'Hard';
  topic: 'Arrays' | 'HashMaps' | 'Two Pointers' | 'Stack/Queue' | 'Trees' | 'Searching';
  frequencyCompany: string; // e.g. 'TCS, Infosys, Zoho'
  timeComplexity: string;
  analogy: string;
  hints: string[];
  codeSnippet: string;
}

export interface MockInterviewQuestion {
  id: string;
  category: 'Technical Foundation' | 'Project Deep-Dive' | 'System Flow' | 'HR & Behavioral' | 'Core Engineering';
  question: string;
  context: string;
  interviewerTone: 'Friendly Technical Lead' | 'HR Director' | 'Product Architect' | 'Core Systems Assessor';
  trickyAspect: string;
  corporatePivotPhrase: string;
  mentorExplanation: string;
  idealKeypoints: string[];
}

export interface MasterclassItem {
  id: string;
  title: string;
  category: 'HR Rounds & Communication' | 'Zero-to-One Tech Foundations' | 'Alumni Placement Secrets' | 'Core & Non-CS Transitions';
  speaker: string;
  speakerRole: string;
  duration: string;
  takeaways: string[];
  videoUrl: string;
  youtubeId?: string;
  summary: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'forgebot';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  companyTag?: 'TCS' | 'Infosys' | 'CTS' | 'Zoho' | 'General';
}

export interface StudyMaterialItem {
  id: string;
  title: string;
  roleTarget: TargetRole | 'All Departments';
  category: 'Fundamentals' | 'Interview Cheat Sheet' | 'Real-World Systems' | 'Core Domain';
  readTime: string;
  summary: string;
  analogy: string;
  tanglishSummary: string;
  keyConcepts: string[];
  codeCheatSheet: string;
  interviewQuestions: {
    question: string;
    idealAnswer: string;
    corporatePivot: string;
  }[];
}
