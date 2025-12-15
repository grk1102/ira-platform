import { motion } from 'framer-motion';
import { Feather, Wind, BarChart3, MessageCircle } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Onboarding } from '@/components/Onboarding';
import { FeatureCard } from '@/components/FeatureCard';
import { useIra } from '@/contexts/IraContext';

const features = [
  {
    id: 'reflect',
    title: 'Reflect',
    description: 'Write or think through what is on your mind.',
    icon: Feather,
    href: '/features#reflect',
    accent: 'sage' as const,
    priority: { heavy: 3, stressed: 2, tired: 4, confused: 1, calm: 2 },
  },
  {
    id: 'calm',
    title: 'Calm',
    description: 'Simple exercises to settle your body and breath.',
    icon: Wind,
    href: '/features#calm',
    accent: 'lavender' as const,
    priority: { heavy: 1, stressed: 1, tired: 2, confused: 3, calm: 4 },
  },
  {
    id: 'understand',
    title: 'Understand',
    description: 'See patterns in how you feel over time.',
    icon: BarChart3,
    href: '/features#understand',
    accent: 'blue' as const,
    priority: { heavy: 4, stressed: 4, tired: 3, confused: 2, calm: 1 },
  },
  {
    id: 'talk',
    title: 'Talk',
    description: 'Have a quiet conversation with Ira.',
    icon: MessageCircle,
    href: '/chat',
    accent: 'warm' as const,
    priority: { heavy: 2, stressed: 3, tired: 1, confused: 4, calm: 3 },
  },
];

const Index = () => {
  const { hasCompletedOnboarding, startOnboarding, getGreeting, feeling, getAccentClass } = useIra();

  const sortedFeatures = [...features].sort((a, b) => {
    if (!feeling) return 0;
    const priorityA = a.priority[feeling as keyof typeof a.priority] || 5;
    const priorityB = b.priority[feeling as keyof typeof b.priority] || 5;
    return priorityA - priorityB;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Onboarding />
      
      <main className="pt-14">
        {!hasCompletedOnboarding ? (
          // Landing state
          <section className="min-h-[calc(100vh-56px)] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-xs"
            >
              <h1 className="text-2xl font-medium text-foreground mb-2">
                Ira
              </h1>
              <p className="text-muted-foreground mb-8">
                A calm space to understand yourself.
              </p>
              <button
                onClick={startOnboarding}
                className="ira-btn-primary"
              >
                Start
              </button>
            </motion.div>
          </section>
        ) : (
          // Main content after onboarding
          <section className="ira-container py-12 md:py-16">
            {/* Personalized greeting */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-10"
            >
              <div className={`inline-block px-4 py-2 rounded-xl ${getAccentClass()} mb-4`}>
                <span className="text-sm text-foreground">
                  {feeling && feeling.charAt(0).toUpperCase() + feeling.slice(1)}
                </span>
              </div>
              <h1 className="text-xl font-medium text-foreground">
                {getGreeting()}
              </h1>
            </motion.div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sortedFeatures.map((feature, index) => (
                <FeatureCard
                  key={feature.id}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  href={feature.href}
                  accent={feature.accent}
                  delay={0.1 + index * 0.08}
                />
              ))}
            </div>

            {/* Quick action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 text-center"
            >
              <button
                onClick={startOnboarding}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Update how I feel
              </button>
            </motion.div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Index;
