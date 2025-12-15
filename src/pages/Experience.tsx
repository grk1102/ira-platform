import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Smartphone, Heart, Compass, Activity, RotateCcw } from 'lucide-react';

const steps = [
  {
    icon: Smartphone,
    title: 'Check in',
    description: 'Start when you are ready. Answer a few questions about how you feel.',
    color: 'bg-ira-mist-soft',
  },
  {
    icon: Heart,
    title: 'Choose what you need',
    description: 'Reflect, breathe, explore recommendations, or just talk.',
    color: 'bg-ira-sage-soft',
  },
  {
    icon: Compass,
    title: 'Engage gently',
    description: 'No goals to complete. Take your time with each feature.',
    color: 'bg-ira-lavender-soft',
  },
  {
    icon: Activity,
    title: 'See your progress',
    description: 'Soft indicators show your engagement. No pressure, no streaks.',
    color: 'bg-ira-warm',
  },
  {
    icon: RotateCcw,
    title: 'Return when ready',
    description: 'Close anytime. Come back when it feels right.',
    color: 'bg-secondary',
  },
];

const ExperiencePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-14 pb-16">
        <div className="ira-container py-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-10 text-center"
          >
            <h1 className="text-2xl font-medium text-foreground mb-2">
              How Ira Works
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              A gentle loop designed around your pace.
            </p>
          </motion.div>

          {/* Visual flow */}
          <div className="relative max-w-lg mx-auto">
            {/* Connection line */}
            <div className="absolute left-8 top-12 bottom-12 w-px bg-border hidden md:block" />

            <div className="space-y-6">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="relative flex items-start gap-5"
                  >
                    <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center`}>
                      <IconComponent className="w-7 h-7 text-foreground/70" />
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-lg font-medium text-foreground mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center mt-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        {index + 1}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Philosophy note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-16 text-center"
          >
            <div className="ira-card-flat max-w-md mx-auto">
              <p className="text-foreground leading-relaxed">
                Ira tracks gentle progress, not streaks. There is no penalty for missing days.
                Your wellbeing is not a competition.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ExperiencePage;