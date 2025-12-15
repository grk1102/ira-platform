import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Heart, Sparkles, Users, Leaf } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Emotional Safety First',
    description: 'Every interaction is designed with your emotional wellbeing as the priority. No judgment, no pressure, no performance.',
  },
  {
    icon: Sparkles,
    title: 'Gentle by Design',
    description: 'We believe in softness as strength. Ira is intentionally slow, calm, and non-intrusive.',
  },
  {
    icon: Users,
    title: 'Human Connection',
    description: 'Technology should feel human. Ira is a companion, not a replacement for real relationships and professional support.',
  },
  {
    icon: Leaf,
    title: 'Growth Without Goals',
    description: 'We reject gamification and metrics. Your journey is yours — there is no right pace or destination.',
  },
];

const AboutPage = () => {
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
                The story behind Ira
              </p>
              <h1 className="ira-heading-display mb-6">
                About Ira
              </h1>
              <p className="ira-text-large text-muted-foreground">
                A space born from the belief that understanding ourselves should feel 
                like a gentle conversation, not a clinical assessment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="ira-section bg-muted/30">
          <div className="ira-container">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="prose prose-lg"
              >
                <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                  Why Ira Exists
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    In a world that often asks us to optimize, track, and improve ourselves, 
                    we wanted to create something different. A space that does not measure or judge. 
                    A companion that listens without agenda.
                  </p>
                  <p>
                    Ira was born from a simple observation: most of us do not need another app 
                    telling us what to do. We need space to hear ourselves. We need presence, 
                    not prescriptions.
                  </p>
                  <p>
                    The name "Ira" means watchful one — and that is what Ira does. It watches 
                    with you, not over you. It creates room for whatever you are feeling, 
                    without trying to change it.
                  </p>
                  <p>
                    This is not a wellness app. It is a gentle mirror. A quiet room. 
                    A space to simply be.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="ira-section">
          <div className="ira-container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="ira-heading-display mb-6">
                Our Values
              </h2>
              <p className="ira-text-large text-muted-foreground max-w-xl mx-auto">
                The principles that guide everything we create.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="ira-card bg-card"
                >
                  <div className="w-12 h-12 rounded-2xl bg-ira-sage-light flex items-center justify-center mb-5">
                    <value.icon className="w-6 h-6 text-ira-sage" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="ira-section bg-muted/30">
          <div className="ira-container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6 text-center">
                Our Approach to Science
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Ira is informed by research in emotional awareness, mindfulness, and 
                  somatic practices. But we do not make clinical claims. We do not diagnose. 
                  We do not treat.
                </p>
                <p>
                  We respect the complexity of human psychology enough to know that a digital 
                  companion cannot replace human connection or professional support. What Ira 
                  can do is create moments of pause — space where insight might arise naturally.
                </p>
                <p>
                  Our approach is humble. We are not here to fix you, because you are not broken. 
                  We are here to sit with you, because sometimes that is what helps most.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
