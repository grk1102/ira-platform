import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Feather, Wind, Brain, MessageCircle } from 'lucide-react';
import { usePersonalization } from '@/contexts/PersonalizationContext';

const cards = [
  {
    id: 'reflection',
    icon: Feather,
    title: 'Reflection & Expression',
    description: 'Journaling prompts and gentle questions to help you explore what you are feeling.',
    color: 'bg-ira-sage-light',
    iconColor: 'text-ira-sage',
    priority: { anxious: 2, heavy: 1, confused: 1, tired: 3, calm: 2 },
  },
  {
    id: 'calming',
    icon: Wind,
    title: 'Calming the Body',
    description: 'Breathing exercises and grounding techniques for moments of overwhelm.',
    color: 'bg-ira-lavender-light',
    iconColor: 'text-ira-lavender',
    priority: { anxious: 1, heavy: 2, confused: 3, tired: 2, calm: 4 },
  },
  {
    id: 'mindbody',
    icon: Brain,
    title: 'Mind-Body Connection',
    description: 'Understand how your thoughts, feelings, and body are connected.',
    color: 'bg-ira-terracotta-light',
    iconColor: 'text-ira-terracotta',
    priority: { anxious: 3, heavy: 3, confused: 2, tired: 1, calm: 1 },
  },
  {
    id: 'talking',
    icon: MessageCircle,
    title: 'Talking Things Through',
    description: 'A compassionate conversation when you need someone to listen.',
    color: 'bg-ira-sage-light',
    iconColor: 'text-ira-sage',
    priority: { anxious: 4, heavy: 4, confused: 4, tired: 4, calm: 3 },
  },
];

export function EmotionalCardsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { emotionalState } = usePersonalization();

  // Sort cards based on emotional state
  const sortedCards = [...cards].sort((a, b) => {
    if (!emotionalState) return 0;
    const priorityA = a.priority[emotionalState as keyof typeof a.priority] || 5;
    const priorityB = b.priority[emotionalState as keyof typeof b.priority] || 5;
    return priorityA - priorityB;
  });

  return (
    <section className="ira-section bg-muted/30" ref={ref}>
      <div className="ira-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="ira-heading-display mb-6">
            Experience Preview
          </h2>
          <p className="ira-text-large text-muted-foreground">
            Different ways Ira can support you, depending on what you need right now.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {sortedCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="ira-card bg-card cursor-pointer group"
            >
              <div className={`w-14 h-14 rounded-2xl ${card.color} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300`}>
                <card.icon className={`w-7 h-7 ${card.iconColor}`} />
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">
                {card.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {card.description}
              </p>
              {index === 0 && emotionalState && (
                <div className="mt-4 inline-flex items-center gap-2 text-xs text-primary bg-ira-sage-light px-3 py-1.5 rounded-full">
                  <span>Suggested for you</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
