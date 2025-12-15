import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const steps = [
  {
    number: '01',
    title: 'Ira adapts to how you feel',
    description: 'When you first arrive, Ira gently asks how you are feeling. This is not data collection — it is presence. Based on your response, the experience shifts to meet you where you are.',
    details: [
      'If you are feeling overwhelmed, Ira slows down',
      'If you are finding your balance, Ira offers reflection',
      'Your emotional state shapes the tone, not the features',
    ],
  },
  {
    number: '02',
    title: 'Reflection becomes personal',
    description: 'Journaling prompts, questions, and moments of stillness are tailored to what you might need most. Not through algorithms, but through thoughtful design.',
    details: [
      'Prompts change based on your current emotional landscape',
      'No pressure to respond — observation is enough',
      'Your reflections are private and temporary unless you choose otherwise',
    ],
  },
  {
    number: '03',
    title: 'Calm arrives differently for everyone',
    description: 'Some find peace through breathing. Others through expression. Ira surfaces the right tools at the right moment, without overwhelming you with options.',
    details: [
      'Breathing exercises when anxiety is present',
      'Grounding techniques when things feel heavy',
      'Space to simply be when that is what you need',
    ],
  },
  {
    number: '04',
    title: 'Growth happens without pressure',
    description: 'Over time, if you return, Ira remembers — not your data, but your journey. Patterns may emerge. Awareness may deepen. But there are no goals, no streaks, no metrics.',
    details: [
      'No gamification or achievement systems',
      'Progress is internal, not displayed',
      'You define what growth means for you',
    ],
  },
];

const HowIraHelpsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 md:pt-32">
        {/* Hero */}
        <section className="ira-section">
          <div className="ira-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto text-center"
            >
              <p className="text-ira-sage font-serif italic text-lg mb-4">
                A gentle approach
              </p>
              <h1 className="ira-heading-display mb-6">
                How Ira Helps
              </h1>
              <p className="ira-text-large text-muted-foreground">
                Ira does not fix or solve. It creates space for you to understand yourself 
                better — at your own pace, in your own way.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Steps */}
        <section className="ira-section bg-muted/30">
          <div className="ira-container">
            <div className="max-w-3xl mx-auto space-y-16">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-start gap-6 md:gap-10">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-ira-sage-light flex items-center justify-center">
                      <span className="font-serif text-2xl text-ira-sage">{step.number}</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                        {step.title}
                      </h2>
                      <p className="ira-text-large text-muted-foreground mb-6">
                        {step.description}
                      </p>
                      <ul className="space-y-3">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-ira-sage mt-2.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="ira-section">
          <div className="ira-container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                The goal is not to feel better.
                <br />
                <span className="text-ira-sage">It is to feel more.</span>
              </h2>
              <p className="ira-text-large text-muted-foreground">
                More aware. More present. More connected to yourself. 
                Ira is simply here to hold space while you do.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowIraHelpsPage;
