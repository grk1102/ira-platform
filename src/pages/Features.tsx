import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Check } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { useIra } from '@/contexts/IraContext';

const prompts = [
  "What is taking up space in your mind right now?",
  "How does your body feel in this moment?",
  "What would help you feel a little lighter?",
  "What are you avoiding thinking about?",
];

const FeaturesPage = () => {
  const { addReflection, reflections, emotionalHistory, feeling, state } = useIra();
  const [reflectionText, setReflectionText] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [saved, setSaved] = useState(false);
  
  // Breathing
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathCount, setBreathCount] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBreathing) {
      const phases = { inhale: 4000, hold: 4000, exhale: 4000 };
      timer = setInterval(() => {
        setBreathPhase(prev => {
          if (prev === 'inhale') return 'hold';
          if (prev === 'hold') return 'exhale';
          setBreathCount(c => c + 1);
          return 'inhale';
        });
      }, phases[breathPhase]);
    }
    return () => clearInterval(timer);
  }, [isBreathing, breathPhase]);

  const handleSaveReflection = () => {
    if (reflectionText.trim()) {
      addReflection(reflectionText);
      setReflectionText('');
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const nextPrompt = () => {
    setCurrentPrompt((prev) => (prev + 1) % prompts.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-14 pb-16">
        <div className="ira-container py-10">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-medium text-foreground mb-10"
          >
            Features
          </motion.h1>

          <div className="space-y-8">
            {/* Reflect */}
            <motion.section
              id="reflect"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="ira-card"
            >
              <h2 className="text-base font-medium text-foreground mb-1">Reflect</h2>
              <p className="text-sm text-muted-foreground mb-5">
                Write or think through what is on your mind.
              </p>

              <div className="mb-4">
                <button
                  onClick={nextPrompt}
                  className="text-sm text-primary hover:opacity-80 transition-opacity"
                >
                  {prompts[currentPrompt]}
                </button>
              </div>

              <textarea
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder="Start writing..."
                className="ira-input min-h-[120px] resize-none mb-3"
              />

              <div className="flex items-center justify-between">
                <button
                  onClick={handleSaveReflection}
                  disabled={!reflectionText.trim()}
                  className="ira-btn-secondary text-sm disabled:opacity-40"
                >
                  {saved ? (
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4" /> Saved
                    </span>
                  ) : (
                    'Save'
                  )}
                </button>
                {reflections.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {reflections.length} reflection{reflections.length !== 1 ? 's' : ''} saved
                  </span>
                )}
              </div>
            </motion.section>

            {/* Calm */}
            <motion.section
              id="calm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="ira-card"
            >
              <h2 className="text-base font-medium text-foreground mb-1">Calm</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Simple breathing to settle your body.
              </p>

              <div className="flex flex-col items-center py-6">
                <div className="relative mb-6">
                  <motion.div
                    animate={isBreathing ? {
                      scale: breathPhase === 'inhale' ? 1.15 : breathPhase === 'hold' ? 1.15 : 1,
                    } : { scale: 1 }}
                    transition={{ duration: 4, ease: 'easeInOut' }}
                    className="w-28 h-28 rounded-full bg-ira-lavender-soft flex items-center justify-center"
                  >
                    <span className="text-sm text-muted-foreground capitalize">
                      {isBreathing ? breathPhase : 'Ready'}
                    </span>
                  </motion.div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      setIsBreathing(!isBreathing);
                      if (!isBreathing) {
                        setBreathPhase('inhale');
                        setBreathCount(0);
                      }
                    }}
                    className="ira-btn-primary"
                  >
                    {isBreathing ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>
                  {breathCount > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {breathCount} breath{breathCount !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
            </motion.section>

            {/* Understand */}
            <motion.section
              id="understand"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="ira-card"
            >
              <h2 className="text-base font-medium text-foreground mb-1">Understand</h2>
              <p className="text-sm text-muted-foreground mb-5">
                See patterns in how you feel over time.
              </p>

              {emotionalHistory.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    Your emotional history will appear here.
                  </p>
                  {feeling && state && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Current: {feeling}, {state}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  {emotionalHistory.slice().reverse().map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 py-2"
                    >
                      <div className="flex gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-ira-blue-soft text-xs text-foreground">
                          {entry.feeling}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-muted text-xs text-muted-foreground">
                          {entry.state}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeaturesPage;
