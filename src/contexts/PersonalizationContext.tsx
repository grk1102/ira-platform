import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type EmotionalState = 'calm' | 'heavy' | 'anxious' | 'tired' | 'confused' | null;
export type JourneyState = 'struggling' | 'trying' | 'managing' | 'growing' | null;

interface PersonalizationState {
  emotionalState: EmotionalState;
  journeyState: JourneyState;
  hasCompletedCheckin: boolean;
  showCheckinModal: boolean;
}

interface PersonalizationContextType extends PersonalizationState {
  setEmotionalState: (state: EmotionalState) => void;
  setJourneyState: (state: JourneyState) => void;
  completeCheckin: () => void;
  openCheckinModal: () => void;
  closeCheckinModal: () => void;
  resetPersonalization: () => void;
  getPersonalizedMessage: () => string;
  getChatbotGreeting: () => string;
  isOverwhelmed: boolean;
}

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

const STORAGE_KEY = 'ira_personalization';

export function PersonalizationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersonalizationState>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return {
      emotionalState: null,
      journeyState: null,
      hasCompletedCheckin: false,
      showCheckinModal: false,
    };
  });

  // Show modal after a short delay on first visit
  useEffect(() => {
    if (!state.hasCompletedCheckin && !state.showCheckinModal) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, showCheckinModal: true }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.hasCompletedCheckin, state.showCheckinModal]);

  // Persist to session storage
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setEmotionalState = (emotionalState: EmotionalState) => {
    setState(prev => ({ ...prev, emotionalState }));
  };

  const setJourneyState = (journeyState: JourneyState) => {
    setState(prev => ({ ...prev, journeyState }));
  };

  const completeCheckin = () => {
    setState(prev => ({ ...prev, hasCompletedCheckin: true, showCheckinModal: false }));
  };

  const openCheckinModal = () => {
    setState(prev => ({ ...prev, showCheckinModal: true }));
  };

  const closeCheckinModal = () => {
    setState(prev => ({ ...prev, showCheckinModal: false }));
  };

  const resetPersonalization = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setState({
      emotionalState: null,
      journeyState: null,
      hasCompletedCheckin: false,
      showCheckinModal: false,
    });
  };

  const isOverwhelmed = state.emotionalState === 'heavy' || 
                        state.emotionalState === 'anxious' || 
                        state.journeyState === 'struggling';

  const getPersonalizedMessage = (): string => {
    const { emotionalState, journeyState } = state;

    if (!emotionalState && !journeyState) {
      return "Welcome to a space made just for you. Here, there's no rush, no judgment — just room to breathe and be.";
    }

    if (isOverwhelmed) {
      const messages = {
        heavy: "It's okay to feel the weight of things. This is a safe place to simply rest.",
        anxious: "Take a breath. You're safe here. We can move at whatever pace feels right.",
        struggling: "Being here is enough. You don't have to do anything but be present.",
      };
      return messages[emotionalState as keyof typeof messages] || 
             messages.struggling;
    }

    const messages = {
      calm: "Your calm is a gift. Let's nurture it together.",
      tired: "Rest is wisdom. Take the space you need.",
      confused: "Clarity comes gently. Let's explore together, one thought at a time.",
      trying: "Every small step matters. You're doing more than you know.",
      managing: "You're finding your way. Let's keep building on what's working.",
      growing: "Your awareness is expanding. Let's explore what you're discovering.",
    };

    return messages[emotionalState as keyof typeof messages] || 
           messages[journeyState as keyof typeof messages] ||
           "Welcome to a space made just for you.";
  };

  const getChatbotGreeting = (): string => {
    if (isOverwhelmed) {
      return "I'm here with you. We can go slowly, or not at all. What feels right?";
    }

    if (state.journeyState === 'growing' || state.journeyState === 'managing') {
      return "Would you like to explore what's been helping you lately?";
    }

    if (state.emotionalState === 'calm') {
      return "It's lovely to meet you in this calm moment. What's on your mind?";
    }

    return "Hello. I'm Ira. How are you feeling right now?";
  };

  return (
    <PersonalizationContext.Provider
      value={{
        ...state,
        setEmotionalState,
        setJourneyState,
        completeCheckin,
        openCheckinModal,
        closeCheckinModal,
        resetPersonalization,
        getPersonalizedMessage,
        getChatbotGreeting,
        isOverwhelmed,
      }}
    >
      {children}
    </PersonalizationContext.Provider>
  );
}

export function usePersonalization() {
  const context = useContext(PersonalizationContext);
  if (context === undefined) {
    throw new Error('usePersonalization must be used within a PersonalizationProvider');
  }
  return context;
}
