import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Heart, Lock, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const safetyPoints = [
  {
    icon: ShieldCheck,
    title: 'Not a diagnosis tool',
    description: 'Ira does not diagnose, treat, or replace professional mental health care.',
  },
  {
    icon: Heart,
    title: 'Encourages real support',
    description: 'When you need more, Ira will gently encourage seeking human support.',
  },
  {
    icon: Lock,
    title: 'Privacy-first',
    description: 'Your reflections are yours. We prioritize your data privacy and control.',
  },
  {
    icon: UserCheck,
    title: 'Transparent personalization',
    description: 'Any adaptation is optional, temporary, and clearly explained.',
  },
];

export function SafetySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="ira-section bg-muted/30" ref={ref}>
      <div className="ira-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="ira-heading-display mb-6">
              Safety & Trust
            </h2>
            <p className="ira-text-large text-muted-foreground">
              Your emotional safety is our foundation. Here's how Ira is designed to support you responsibly.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {safetyPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-4 p-5 bg-card rounded-2xl"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-ira-sage-light flex items-center justify-center">
                  <point.icon className="w-5 h-5 text-ira-sage" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">{point.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <Link
              to="/ethics-safety"
              className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity font-medium"
            >
              Learn more about our ethics
              <span>→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
