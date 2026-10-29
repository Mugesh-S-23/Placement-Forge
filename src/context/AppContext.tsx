'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  ReadinessScore, 
  SprintDay, 
  ChatMessage, 
  TargetRole, 
  ExperienceLevel,
  ThemeMode 
} from '@/types';
import { INITIAL_SPRINT_DAYS } from '@/data/sprints';

interface AppContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  loginUser: (email: string, pass: string) => boolean;
  signupUser: (name: string, email: string, pass: string) => boolean;
  setGuestUser: () => void;
  completeOnboarding: (details: {
    college: string;
    department: string;
    gradYear: string;
    targetRole: TargetRole;
    experienceLevel: ExperienceLevel;
  }) => void;
  updateTargetRole: (role: TargetRole) => void;
  updateExperienceLevel: (level: ExperienceLevel) => void;
  scores: {
    baseline: ReadinessScore;
    current: ReadinessScore;
    velocityDelta: number;
  };
  setScores: React.Dispatch<React.SetStateAction<{
    baseline: ReadinessScore;
    current: ReadinessScore;
    velocityDelta: number;
  }>>;
  sprintDays: SprintDay[];
  completeDayVerification: (dayId: number, submission: string, feedback: {
    strengths: string[];
    blindspots: string[];
    velocityDelta: number;
    coachNote: string;
  }) => void;
  diagnosticCompleted: boolean;
  completeDiagnostic: (answers: { step1Choice?: string; step2Order?: string[]; step3Intro?: string }) => void;
  isForgeBotOpen: boolean;
  setIsForgeBotOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  reverseResumeSkills: string[];
  setReverseResumeSkills: React.Dispatch<React.SetStateAction<string[]>>;
  resetToDemo: () => void;
}

const DEFAULT_USER: UserProfile = {
  name: "Arun Kumar",
  college: "PSG College of Technology",
  department: "Electronics & Communication (ECE)",
  gradYear: "3rd Year (2026)",
  targetRole: "Full-Stack Web Dev",
  experienceLevel: "Starting from Zero (Beginner)",
  hasResume: false,
  reverseResumeSkills: [
    "Basic C / Java syntax in 1st year",
    "Created an HTML/CSS landing page for a college symposium",
    "Wrote basic SQL queries in semester lab",
    "Participated in mini-project presentation"
  ]
};

const DEFAULT_SCORES = {
  baseline: {
    logic: 20,
    coreConcepts: 15,
    roleTech: 20,
    articulation: 25,
    overall: 20
  },
  current: {
    logic: 35,
    coreConcepts: 30,
    roleTech: 38,
    articulation: 33,
    overall: 34
  },
  velocityDelta: 14 // +14% this week
};

const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-init-1',
    sender: 'forgebot',
    text: "Vanakkam! I'm ForgeBot, your 24/7 Placement Operating System mentor for all engineering & campus departments. Whether you're in ECE, Mech, Civil, Biotech, or CS, ask me about campus drive patterns (TCS, Zoho, CTS, Infosys), interview corporate pivots, or study materials!",
    timestamp: "Just now",
    suggestedQuestions: [
      "What to prepare for TCS NQT Round 1?",
      "How to introduce myself as a non-CS student?",
      "How to explain an academic gap in HR round?",
      "Core ECE / Embedded interview questions",
      "Zoho round 2 programming pattern tips"
    ]
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'placementforge_state_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(true);
  const [scores, setScores] = useState(DEFAULT_SCORES);
  const [sprintDays, setSprintDays] = useState<SprintDay[]>(INITIAL_SPRINT_DAYS);
  const [diagnosticCompleted, setDiagnosticCompleted] = useState<boolean>(false);
  const [reverseResumeSkills, setReverseResumeSkills] = useState<string[]>(DEFAULT_USER.reverseResumeSkills);
  const [isForgeBotOpen, setIsForgeBotOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Apply theme to DOM
  const applyTheme = (mode: ThemeMode) => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    root.classList.remove('dark', 'light');

    if (mode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(prefersDark ? 'dark' : 'light');
    } else {
      root.classList.add(mode);
    }
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    applyTheme(mode);
    try {
      localStorage.setItem('placementforge_theme', mode);
    } catch {}
  };

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('placementforge_theme') as ThemeMode;
      if (savedTheme) {
        setThemeState(savedTheme);
        applyTheme(savedTheme);
      } else {
        applyTheme('dark');
      }

      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.user) setUser(parsed.user);
        if (parsed.scores) setScores(parsed.scores);
        if (parsed.sprintDays) setSprintDays(parsed.sprintDays);
        if (parsed.diagnosticCompleted !== undefined) setDiagnosticCompleted(parsed.diagnosticCompleted);
        if (parsed.reverseResumeSkills) setReverseResumeSkills(parsed.reverseResumeSkills);
        if (parsed.chatMessages) setChatMessages(parsed.chatMessages);
        if (parsed.isAuthenticated !== undefined) setIsAuthenticated(parsed.isAuthenticated);
        if (parsed.hasCompletedOnboarding !== undefined) setHasCompletedOnboarding(parsed.hasCompletedOnboarding);
      }
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage on updates
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
        user,
        scores,
        sprintDays,
        diagnosticCompleted,
        reverseResumeSkills,
        chatMessages,
        isAuthenticated,
        hasCompletedOnboarding
      }));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  }, [user, scores, sprintDays, diagnosticCompleted, reverseResumeSkills, chatMessages, isAuthenticated, hasCompletedOnboarding, isLoaded]);

  const loginUser = (email: string, pass: string) => {
    setIsAuthenticated(true);
    if (!user.email) {
      setUser(prev => ({ ...prev, email }));
    }
    return true;
  };

  const signupUser = (name: string, email: string, pass: string) => {
    setIsAuthenticated(true);
    setUser(prev => ({
      ...prev,
      name: name || 'Student Candidate',
      email: email
    }));
    setHasCompletedOnboarding(false);
    return true;
  };

  const setGuestUser = () => {
    setUser(DEFAULT_USER);
    setScores(DEFAULT_SCORES);
    setIsAuthenticated(true);
    setHasCompletedOnboarding(true);
  };

  const completeOnboarding = (details: {
    college: string;
    department: string;
    gradYear: string;
    targetRole: TargetRole;
    experienceLevel: ExperienceLevel;
  }) => {
    setUser(prev => ({
      ...prev,
      college: details.college,
      department: details.department,
      gradYear: details.gradYear,
      targetRole: details.targetRole,
      experienceLevel: details.experienceLevel
    }));
    setHasCompletedOnboarding(true);
  };

  const updateTargetRole = (role: TargetRole) => {
    setUser(prev => ({ ...prev, targetRole: role }));
  };

  const updateExperienceLevel = (level: ExperienceLevel) => {
    setUser(prev => ({ ...prev, experienceLevel: level }));
  };

  const completeDiagnostic = (answers: { step1Choice?: string; step2Order?: string[]; step3Intro?: string }) => {
    setDiagnosticCompleted(true);
    setScores({
      baseline: { logic: 20, coreConcepts: 15, roleTech: 20, articulation: 25, overall: 20 },
      current: { logic: 35, coreConcepts: 30, roleTech: 38, articulation: 33, overall: 34 },
      velocityDelta: 14
    });
  };

  const completeDayVerification = (
    dayId: number, 
    submission: string, 
    feedback: { strengths: string[]; blindspots: string[]; velocityDelta: number; coachNote: string }
  ) => {
    setSprintDays(prev => {
      return prev.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            status: 'completed',
            earnedVelocity: feedback.velocityDelta || 10,
            userVerificationSubmission: submission,
            feedback
          };
        }
        if (day.id === dayId + 1 && day.status === 'locked') {
          return { ...day, status: 'in_progress' };
        }
        return day;
      });
    });

    setScores(prev => {
      const added = feedback.velocityDelta || 10;
      const newCurrent = {
        logic: Math.min(100, prev.current.logic + 5),
        coreConcepts: Math.min(100, prev.current.coreConcepts + 4),
        roleTech: Math.min(100, prev.current.roleTech + 5),
        articulation: Math.min(100, prev.current.articulation + 4),
        overall: Math.min(100, prev.current.overall + 4)
      };
      return {
        ...prev,
        current: newCurrent,
        velocityDelta: prev.velocityDelta + added
      };
    });
  };

  const addChatMessage = (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMsg: ChatMessage = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  const resetToDemo = () => {
    setUser(DEFAULT_USER);
    setScores(DEFAULT_SCORES);
    setSprintDays(INITIAL_SPRINT_DAYS);
    setDiagnosticCompleted(false);
    setReverseResumeSkills(DEFAULT_USER.reverseResumeSkills);
    setChatMessages(INITIAL_CHAT_MESSAGES);
    setIsAuthenticated(true);
    setHasCompletedOnboarding(true);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {}
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      theme,
      setTheme,
      isAuthenticated,
      hasCompletedOnboarding,
      loginUser,
      signupUser,
      setGuestUser,
      completeOnboarding,
      updateTargetRole,
      updateExperienceLevel,
      scores,
      setScores,
      sprintDays,
      completeDayVerification,
      diagnosticCompleted,
      completeDiagnostic,
      isForgeBotOpen,
      setIsForgeBotOpen,
      chatMessages,
      addChatMessage,
      reverseResumeSkills,
      setReverseResumeSkills,
      resetToDemo
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
