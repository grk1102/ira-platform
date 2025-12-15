import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Questionnaire types
export type EmotionalState = 'calm' | 'stressed' | 'anxious' | 'low-energy' | 'overthinking' | 'motivated' | 'heavy';
export type StressSource = 'work' | 'relationships' | 'health' | 'sleep' | 'food' | 'screen-time' | 'loneliness' | 'future';
export type EnergyLevel = 'drained' | 'balanced' | 'energetic';
export type LifestyleHabit = 'exercise' | 'healthy-eating' | 'irregular-meals' | 'late-nights' | 'music' | 'creative' | 'meditation';
export type HelpfulActivity = 'music' | 'movement' | 'silence' | 'writing' | 'talking' | 'nature' | 'learning';
export type GrowthStage = 'struggling' | 'managing' | 'growing';

export interface QuestionnaireAnswers {
  emotionalStates: EmotionalState[];
  stressSources: StressSource[];
  energyLevel: EnergyLevel | null;
  lifestyleHabits: LifestyleHabit[];
  helpfulActivities: HelpfulActivity[];
  growthStage: GrowthStage | null;
}

export interface Progress {
  reflect: number;
  breathe: number;
  recommendations: number;
  chat: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  earnedAt?: number;
}

export interface Milestone {
  id: string;
  text: string;
  timestamp: number;
}

export interface Reflection {
  id: string;
  content: string;
  gratitudes: string[];
  timestamp: number;
}

interface IraState {
  hasCompletedOnboarding: boolean;
  showOnboarding: boolean;
  onboardingStep: number;
  questionnaire: QuestionnaireAnswers;
  progress: Progress;
  badges: Badge[];
  milestones: Milestone[];
  reflections: Reflection[];
  breatheSessions: number;
  chatMessages: number;
}

interface IraContextType extends IraState {
  completeOnboarding: () => void;
  startOnboarding: () => void;
  nextOnboardingStep: () => void;
  prevOnboardingStep: () => void;
  updateQuestionnaire: <K extends keyof QuestionnaireAnswers>(key: K, value: QuestionnaireAnswers[K]) => void;
  addReflection: (content: string, gratitudes: string[]) => void;
  completeBreatheSession: () => void;
  addChatMessage: () => void;
  exploreRecommendation: () => void;
  getGreeting: () => string;
  getChatOpening: () => string;
  getAccentClass: () => string;
  getTotalProgress: () => number;
  resetOnboarding: () => void;
}

const IraContext = createContext<IraContextType | undefined>(undefined);

const STORAGE_KEY = 'ira_state_v2';

const initialBadges: Badge[] = [
  { id: 'awareness', name: 'Awareness', description: 'Started understanding yourself', earned: false },
  { id: 'consistency', name: 'Consistency', description: 'Returned to care for yourself', earned: false },
  { id: 'calm', name: 'Calm', description: 'Found moments of peace', earned: false },
  { id: 'growth', name: 'Growth', description: 'Moving forward with intention', earned: false },
];

const defaultState: IraState = {
  hasCompletedOnboarding: false,
  showOnboarding: false,
  onboardingStep: 1,
  questionnaire: {
    emotionalStates: [],
    stressSources: [],
    energyLevel: null,
    lifestyleHabits: [],
    helpfulActivities: [],
    growthStage: null,
  },
  progress: {
    reflect: 0,
    breathe: 0,
    recommendations: 0,
    chat: 0,
  },
  badges: initialBadges,
  milestones: [],
  reflections: [],
  breatheSessions: 0,
  chatMessages: 0,
};

export function IraProvider({ children }: { children: ReactNode }) {
  const [iraState, setIraState] = useState<IraState>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return { ...defaultState, ...JSON.parse(saved) };
        } catch {
          return defaultState;
        }
      }
    }
    return defaultState;
  });

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(iraState));
  }, [iraState]);

  const addMilestone = (text: string) => {
    const milestone: Milestone = {
      id: Date.now().toString(),
      text,
      timestamp: Date.now(),
    };
    setIraState(prev => ({
      ...prev,
      milestones: [...prev.milestones.slice(-9), milestone],
    }));
  };

  const checkAndAwardBadge = (badgeId: string) => {
    setIraState(prev => {
      const badge = prev.badges.find(b => b.id === badgeId);
      if (badge && !badge.earned) {
        return {
          ...prev,
          badges: prev.badges.map(b =>
            b.id === badgeId ? { ...b, earned: true, earnedAt: Date.now() } : b
          ),
        };
      }
      return prev;
    });
  };

  const startOnboarding = () => {
    setIraState(prev => ({ ...prev, showOnboarding: true, onboardingStep: 1 }));
  };

  const nextOnboardingStep = () => {
    setIraState(prev => ({ ...prev, onboardingStep: prev.onboardingStep + 1 }));
  };

  const prevOnboardingStep = () => {
    setIraState(prev => ({ ...prev, onboardingStep: Math.max(1, prev.onboardingStep - 1) }));
  };

  const completeOnboarding = () => {
    setIraState(prev => ({
      ...prev,
      hasCompletedOnboarding: true,
      showOnboarding: false,
      onboardingStep: 1,
    }));
    addMilestone('You showed up today.');
    checkAndAwardBadge('awareness');
  };

  const updateQuestionnaire = <K extends keyof QuestionnaireAnswers>(
    key: K,
    value: QuestionnaireAnswers[K]
  ) => {
    setIraState(prev => ({
      ...prev,
      questionnaire: { ...prev.questionnaire, [key]: value },
    }));
  };

  const addReflection = (content: string, gratitudes: string[]) => {
    const newReflection: Reflection = {
      id: Date.now().toString(),
      content,
      gratitudes,
      timestamp: Date.now(),
    };
    setIraState(prev => ({
      ...prev,
      reflections: [...prev.reflections.slice(-19), newReflection],
      progress: { ...prev.progress, reflect: Math.min(100, prev.progress.reflect + 25) },
    }));
    addMilestone('You took time to reflect.');
    if (iraState.reflections.length >= 2) {
      checkAndAwardBadge('consistency');
    }
  };

  const completeBreatheSession = () => {
    setIraState(prev => ({
      ...prev,
      breatheSessions: prev.breatheSessions + 1,
      progress: { ...prev.progress, breathe: Math.min(100, prev.progress.breathe + 25) },
    }));
    addMilestone('You cared for your body.');
    checkAndAwardBadge('calm');
  };

  const addChatMessage = () => {
    setIraState(prev => ({
      ...prev,
      chatMessages: prev.chatMessages + 1,
      progress: { ...prev.progress, chat: Math.min(100, prev.progress.chat + 10) },
    }));
  };

  const exploreRecommendation = () => {
    setIraState(prev => ({
      ...prev,
      progress: { ...prev.progress, recommendations: Math.min(100, prev.progress.recommendations + 15) },
    }));
  };

  const getGreeting = (): string => {
    const { questionnaire } = iraState;
    const { emotionalStates, growthStage, energyLevel } = questionnaire;

    if (!growthStage) return "A calm space to understand yourself.";

    if (emotionalStates.includes('heavy') || growthStage === 'struggling') {
      return "Let's take this very slowly today.";
    }
    if (emotionalStates.includes('stressed') || emotionalStates.includes('anxious')) {
      return "A moment of quiet for you.";
    }
    if (energyLevel === 'drained' || emotionalStates.includes('low-energy')) {
      return "Go gently. No rush.";
    }
    if (growthStage === 'growing' || emotionalStates.includes('motivated')) {
      return "Building on something good.";
    }
    return "Welcome back.";
  };

  const getChatOpening = (): string => {
    const { questionnaire } = iraState;
    const { growthStage, emotionalStates } = questionnaire;

    if (growthStage === 'struggling' || emotionalStates.includes('heavy')) {
      return "Do you want to talk, or just sit here for a bit?";
    }
    if (emotionalStates.includes('calm') || growthStage === 'growing') {
      return "What's been on your mind lately?";
    }
    if (emotionalStates.includes('anxious') || emotionalStates.includes('overthinking')) {
      return "Want to put some thoughts into words?";
    }
    return "How can I help right now?";
  };

  const getAccentClass = (): string => {
    const { questionnaire } = iraState;
    const { growthStage, emotionalStates } = questionnaire;

    if (emotionalStates.includes('heavy') || growthStage === 'struggling') {
      return 'bg-ira-lavender-soft';
    }
    if (growthStage === 'growing' || emotionalStates.includes('calm')) {
      return 'bg-ira-sage-soft';
    }
    return 'bg-ira-mist-soft';
  };

  const getTotalProgress = (): number => {
    const { progress } = iraState;
    return Math.round((progress.reflect + progress.breathe + progress.recommendations + progress.chat) / 4);
  };

  const resetOnboarding = () => {
    setIraState(defaultState);
  };

  return (
    <IraContext.Provider
      value={{
        ...iraState,
        completeOnboarding,
        startOnboarding,
        nextOnboardingStep,
        prevOnboardingStep,
        updateQuestionnaire,
        addReflection,
        completeBreatheSession,
        addChatMessage,
        exploreRecommendation,
        getGreeting,
        getChatOpening,
        getAccentClass,
        getTotalProgress,
        resetOnboarding,
      }}
    >
      {children}
    </IraContext.Provider>
  );
}

export function useIra() {
  const context = useContext(IraContext);
  if (context === undefined) {
    throw new Error('useIra must be used within an IraProvider');
  }
  return context;
}