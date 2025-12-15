import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { usePersonalization, EmotionalState, JourneyState } from '@/contexts/PersonalizationContext';

const emotionalOptions: { value: EmotionalState; label: string; emoji: string }[] = [
  { value: 'calm', label: 'Calm', emoji: '🌿' },
  { value: 'heavy', label: 'Heavy', emoji: '🌧️' },
  { value: 'anxious', label: 'Anxious', emoji: '🍃' },
  { value: 'tired', label: 'Tired', emoji: '🌙' },
  { value: 'confused', label: 'Confused', emoji: '🌀' },
];

const journeyOptions: { value: JourneyState; label: string; description: string }[] = [
  { value: 'struggling', label: 'Struggling', description: 'Finding it hard right now' },
  { value: 'trying', label: 'Trying', description: 'Taking it one day at a time' },
  { value: 'managing', label: 'Managing', description: 'Finding my balance' },
  { value: 'growing', label: 'Growing', description: 'Discovering new awareness' },
];

export function EmotionalCheckinModal() {
  const { 
    showCheckinModal, 
    closeCheckinModal, 
    setEmotionalState, 
    setJourneyState,
    completeCheckin,
    emotionalState,
    journeyState,
  } = usePersonalization();

  const [step, setStep] = useState(1);

  const handleEmotionalSelect = (value: EmotionalState) => {
    setEmotionalState(value);
  };

  const handleJourneySelect = (value: JourneyState) => {
    setJourneyState(value);
  };

  const handleContinue = () => {
    if (step === 1 && emotionalState) {
      setStep(2);
    } else if (step === 2) {
      completeCheckin();
      setStep(1);
    }
  };

  const handleSkip = () => {
    completeCheckin();
    setStep(1);
  };

  return (
    <AnimatePresence>
      {showCheckinModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && closeCheckinModal()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-md bg-background rounded-3xl shadow-elevated p-8 md:p-10"
          >
            <button
              onClick={closeCheckinModal}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
                    How are you feeling?
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    There's no right answer. Just notice what's here.
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {emotionalOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleEmotionalSelect(option.value)}
                        className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                          emotionalState === option.value
                            ? 'border-primary bg-ira-sage-light'
                            : 'border-border hover:border-primary/40 hover:bg-muted'
                        }`}
                      >
                        <span className="text-2xl">{option.emoji}</span>
                        <span className="font-medium text-foreground">{option.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleSkip}
                      className="flex-1 py-3 px-4 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Skip for now
                    </button>
                    <button
                      onClick={handleContinue}
                      disabled={!emotionalState}
                      className="flex-1 py-3 px-6 bg-primary text-primary-foreground rounded-full font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
                    >
                      Continue
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
                    Right now, I feel like I'm…
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    This helps Ira understand how to support you best.
                  </p>

                  <div className="space-y-3 mb-8">
                    {journeyOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleJourneySelect(option.value)}
                        className={`w-full flex flex-col p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                          journeyState === option.value
                            ? 'border-primary bg-ira-sage-light'
                            : 'border-border hover:border-primary/40 hover:bg-muted'
                        }`}
                      >
                        <span className="font-medium text-foreground">{option.label}</span>
                        <span className="text-sm text-muted-foreground">{option.description}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 px-4 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleContinue}
                      className="flex-1 py-3 px-6 bg-primary text-primary-foreground rounded-full font-medium transition-all duration-200 hover:opacity-90"
                    >
                      Begin my space
                    </button>
                  </div>

                  <p className="text-xs text-center text-muted-foreground mt-6">
                    This is temporary and optional. No data is stored permanently.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
