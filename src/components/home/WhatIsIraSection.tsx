import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Shield, Sparkles, Users } from 'lucide-react';

const principles = [
  {
    icon: Heart,
    title: 'Non-judgmental',
    description: 'A space where every feeling is valid. No labels, no scores — just understanding.',
  },
  {
    icon: Sparkles,
    title: 'Self-awareness',
    description: 'Gently discover patterns in how you feel and respond to life.',
  },
  {
    icon: Shield,
    title: 'Research-inspired',
    description: 'Built on principles of emotional wellbeing, delivered with warmth.',
  },
  {
    icon: Users,
    title: 'Human-centered',
    description: 'Technology that feels human. Ira is a companion, never a replacement.',
  },
];

export function WhatIsIraSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="what-is-ira" className="ira-section bg-muted/30" ref={ref}>
      <div className="ira-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="ira-heading-display mb-6">
            What is Ira?
          </h2>
          <p className="ira-text-large text-muted-foreground">
            Ira is a gentle emotional companion — a space to reflect, breathe, and grow in self-understanding. 
            Not a therapist, not an app with streaks. Just a calm presence when you need it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="ira-card bg-card group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-ira-sage-light flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <principle.icon className="w-6 h-6 text-ira-sage group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground italic">
            Ira is not a replacement for professional therapy or medical advice.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
