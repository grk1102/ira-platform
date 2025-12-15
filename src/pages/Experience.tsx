import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Smartphone, Heart, Compass, DoorOpen } from 'lucide-react';

const steps = [
  {
    icon: Smartphone,
    title: 'Open Ira',
    description: 'Start when you are ready. No schedule, no reminders.',
  },
  {
    icon: Heart,
    title: 'Check how you feel',
    description: 'A simple question. Ira adjusts to meet you where you are.',
  },
  {
    icon: Compass,
    title: 'Choose what you need',
    description: 'Reflect, breathe, talk, or just sit. No wrong choice.',
  },
  {
    icon: DoorOpen,
    title: 'Leave when ready',
    description: 'No goals to complete. Close anytime.',
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
            className="mb-10"
          >
            <h1 className="text-xl font-medium text-foreground mb-2">
              Experience
            </h1>
            <p className="text-muted-foreground">
              How Ira fits into your day.
            </p>
          </motion.div>

          <div className="space-y-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="ira-card flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium text-foreground mb-0.5">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ira-blue-soft flex items-center justify-center">
                    <span className="text-xs font-medium text-ira-blue">
                      {index + 1}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">
              No streaks. No scores. Just space.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ExperiencePage;
