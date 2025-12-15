import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Understanding emotions',
    description: 'Start by simply noticing what you feel. No judgment, no analysis — just awareness.',
    color: 'bg-ira-sage-light',
  },
  {
    number: '02',
    title: 'Creating space to reflect',
    description: 'Find moments of stillness. Ira helps you pause and look inward with gentle prompts.',
    color: 'bg-ira-lavender-light',
  },
  {
    number: '03',
    title: 'Gentle emotional support',
    description: 'When feelings are big, Ira offers calming presence and grounding techniques.',
    color: 'bg-ira-terracotta-light',
  },
  {
    number: '04',
    title: 'Growing awareness over time',
    description: 'Patterns emerge. Understanding deepens. You become more attuned to yourself.',
    color: 'bg-ira-sage-light',
  },
];

export function GuidedPathSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="ira-section" ref={ref}>
      <div className="ira-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="ira-heading-display mb-6">
            How Ira Helps
          </h2>
          <p className="ira-text-large text-muted-foreground">
            A gentle path toward understanding yourself better. No pressure, no timeline — just one small step at a time.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="relative flex gap-6 pb-12 last:pb-0"
            >
              {/* Timeline line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-14 bottom-0 w-px bg-border" />
              )}

              {/* Step number */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-full ${step.color} flex items-center justify-center z-10`}>
                <span className="font-serif text-sm text-foreground">{step.number}</span>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
