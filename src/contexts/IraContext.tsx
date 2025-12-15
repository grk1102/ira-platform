import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Feeling = 'calm' | 'tired' | 'stressed' | 'heavy' | 'confused' | null;
export type State = 'struggling' | 'managing' | 'growing' | null;

interface EmotionalEntry {
  feeling: Feeling;
  state: State;
  timestamp: number;
}

interface Reflection {
  id: string;
  content: string;
  timestamp: number;
}

interface IraState {
  feeling: Feeling;
  state: State;
  hasCompletedOnboarding: boolean;
  showOnboarding: boolean;
  onboardingStep: number;
  emotionalHistory: EmotionalEntry[];
  reflections: Reflection[];
}

interface IraContextType extends IraState {
  setFeeling: (feeling: Feeling) => void;
  setState: (state: State) => void;
  completeOnboarding: () => void;
  startOnboarding: () => void;
  nextOnboardingStep: () => void;
  addReflection: (content: string) => void;
  getGreeting: () => string;
  getChatOpening: () => string;
  getAccentClass: () => string;
}

const IraContext = createContext<IraContextType | undefined>(undefined);

const STORAGE_KEY = 'ira_state';

export function IraProvider({ children }: { children: ReactNode }) {
  const [iraState, setIraState] = useState<IraState>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return {
      feeling: null,
      state: null,
      hasCompletedOnboarding: false,
      showOnboarding: false,
      onboardingStep: 1,
      emotionalHistory: [],
      reflections: [],
    };
  });

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(iraState));
  }, [iraState]);

  const setFeeling = (feeling: Feeling) => {
    setIraState(prev => ({ ...prev, feeling }));
  };

  const setState = (state: State) => {
    setIraState(prev => {
      const newHistory = prev.feeling ? [
        ...prev.emotionalHistory,
        { feeling: prev.feeling, state, timestamp: Date.now() }
      ].slice(-10) : prev.emotionalHistory;
      
      return { ...prev, state, emotionalHistory: newHistory };
    });
  };

  const startOnboarding = () => {
    setIraState(prev => ({ ...prev, showOnboarding: true, onboardingStep: 1 }));
  };

  const nextOnboardingStep = () => {
    setIraState(prev => ({ ...prev, onboardingStep: prev.onboardingStep + 1 }));
  };

  const completeOnboarding = () => {
    setIraState(prev => ({ 
      ...prev, 
      hasCompletedOnboarding: true, 
      showOnboarding: false,
      onboardingStep: 1
    }));
  };

  const addReflection = (content: string) => {
    const newReflection: Reflection = {
      id: Date.now().toString(),
      content,
      timestamp: Date.now(),
    };
    setIraState(prev => ({
      ...prev,
      reflections: [...prev.reflections, newReflection].slice(-20)
    }));
  };

  const getGreeting = (): string => {
    const { feeling, state } = iraState;
    
    if (!feeling) return "A calm space to understand yourself.";

    const greetings: Record<string, Record<string, string>> = {
      heavy: {
        struggling: "Let's take this very slowly today.",
        managing: "One moment at a time.",
        growing: "You're doing something meaningful.",
      },
      stressed: {
        struggling: "Let's find some quiet together.",
        managing: "A small pause can help.",
        growing: "Making space for yourself matters.",
      },
      tired: {
        struggling: "Rest is okay. Start when you're ready.",
        managing: "Go gently today.",
        growing: "Taking care of yourself.",
      },
      confused: {
        struggling: "No need to figure it all out now.",
        managing: "Clarity comes with time.",
        growing: "Exploring is part of understanding.",
      },
      calm: {
        struggling: "You found some stillness.",
        managing: "A good place to be.",
        growing: "Building on something solid.",
      },
    };

    return greetings[feeling]?.[state || 'managing'] || "Welcome back.";
  };

  const getChatOpening = (): string => {
    const { feeling, state } = iraState;

    if (state === 'struggling' || feeling === 'heavy') {
      return "Do you want to talk, or just sit here for a bit?";
    }
    if (feeling === 'calm' || state === 'growing') {
      return "What's on your mind today?";
    }
    return "How can I help right now?";
  };

  const getAccentClass = (): string => {
    const { feeling, state } = iraState;
    
    if (feeling === 'heavy' || state === 'struggling') {
      return 'bg-ira-lavender-soft';
    }
    if (state === 'growing' || feeling === 'calm') {
      return 'bg-ira-sage-soft';
    }
    return 'bg-ira-blue-soft';
  };

  return (
    <IraContext.Provider
      value={{
        ...iraState,
        setFeeling,
        setState,
        completeOnboarding,
        startOnboarding,
        nextOnboardingStep,
        addReflection,
        getGreeting,
        getChatOpening,
        getAccentClass,
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
