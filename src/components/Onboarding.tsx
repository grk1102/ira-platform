import { motion, AnimatePresence } from 'framer-motion';
import { useIra, Feeling, State } from '@/contexts/IraContext';

const feelings: { value: Feeling; label: string }[] = [
  { value: 'calm', label: 'Calm' },
  { value: 'tired', label: 'Tired' },
  { value: 'stressed', label: 'Stressed' },
  { value: 'heavy', label: 'Heavy' },
  { value: 'confused', label: 'Confused' },
];

const states: { value: State; label: string }[] = [
  { value: 'struggling', label: 'Struggling' },
  { value: 'managing', label: 'Managing' },
  { value: 'growing', label: 'Growing' },
];

export function Onboarding() {
  const { 
    showOnboarding, 
    onboardingStep, 
    feeling,
    setFeeling, 
    setState, 
    nextOnboardingStep,
    completeOnboarding 
  } = useIra();

  const handleFeelingSelect = (value: Feeling) => {
    setFeeling(value);
    nextOnboardingStep();
  };

  const handleStateSelect = (value: State) => {
    setState(value);
    completeOnboarding();
  };

  return (
    <AnimatePresence>
      {showOnboarding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background flex items-center justify-center p-6"
        >
          <AnimatePresence mode="wait">
            {onboardingStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-sm text-center"
              >
                <h1 className="text-xl font-medium text-foreground mb-8">
                  How are you feeling right now?
                </h1>
                
                <div className="flex flex-wrap justify-center gap-3">
                  {feelings.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => handleFeelingSelect(item.value)}
                      className="px-5 py-2.5 rounded-full bg-muted text-foreground text-sm font-medium
                               transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {onboardingStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-sm text-center"
              >
                <p className="text-sm text-muted-foreground mb-2">
                  Feeling {feeling}
                </p>
                <h1 className="text-xl font-medium text-foreground mb-8">
                  Which feels closer today?
                </h1>
                
                <div className="flex flex-col gap-3">
                  {states.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => handleStateSelect(item.value)}
                      className="w-full px-5 py-3.5 rounded-xl bg-muted text-foreground text-sm font-medium
                               transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
