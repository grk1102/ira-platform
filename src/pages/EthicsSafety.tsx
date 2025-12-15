import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Eye, Lock, AlertCircle, Heart, RefreshCw } from 'lucide-react';

const principles = [
  {
    icon: ShieldCheck,
    title: 'What Ira Can Do',
    items: [
      'Create space for self-reflection',
      'Offer calming exercises and breathing techniques',
      'Listen without judgment',
      'Provide gentle prompts for emotional exploration',
      'Adapt its tone based on how you are feeling',
    ],
  },
  {
    icon: AlertCircle,
    title: 'What Ira Cannot Do',
    items: [
      'Diagnose any mental health condition',
      'Provide therapy or medical treatment',
      'Replace professional mental health care',
      'Give specific advice for crisis situations',
      'Guarantee any particular outcome',
    ],
  },
];

const privacyPrinciples = [
  {
    icon: Eye,
    title: 'Transparency',
    description: 'We will always be clear about what Ira does, how personalization works, and what (if any) data is used. No hidden agendas.',
  },
  {
    icon: Lock,
    title: 'Privacy by Default',
    description: 'Personalization is session-based and temporary. We do not store your emotional data permanently unless you explicitly opt in.',
  },
  {
    icon: RefreshCw,
    title: 'Your Control',
    description: 'You can reset your personalization at any time. Your experience with Ira is yours to shape and change.',
  },
  {
    icon: Heart,
    title: 'No Exploitation',
    description: 'We will never use your emotional vulnerability for profit, advertising, or manipulation. Your wellbeing is not a product.',
  },
];

const EthicsSafetyPage = () => {
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
                Our commitment to you
              </p>
              <h1 className="ira-heading-display mb-6">
                Ethics & Safety
              </h1>
              <p className="ira-text-large text-muted-foreground">
                Trust is the foundation of emotional support. Here is how we earn and protect yours.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Boundaries */}
        <section className="ira-section bg-muted/30">
          <div className="ira-container">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="ira-card bg-card"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      index === 0 ? 'bg-ira-sage-light' : 'bg-ira-terracotta-light'
                    }`}>
                      <principle.icon className={`w-6 h-6 ${
                        index === 0 ? 'text-ira-sage' : 'text-ira-terracotta'
                      }`} />
                    </div>
                    <h2 className="font-serif text-xl md:text-2xl text-foreground">
                      {principle.title}
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {principle.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2.5 ${
                          index === 0 ? 'bg-ira-sage' : 'bg-ira-terracotta'
                        }`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI & Personalization */}
        <section className="ira-section">
          <div className="ira-container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6 text-center">
                How Personalization Works
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  When you first visit Ira, you may be gently asked how you are feeling. 
                  This is not a diagnosis or assessment — it is simply a way for Ira to 
                  meet you where you are.
                </p>
                <p>
                  Based on your response, Ira may adjust its tone, the order of content 
                  shown, or the way conversations begin. Someone feeling overwhelmed might 
                  see softer language and calming options first. Someone feeling steady 
                  might see reflective prompts.
                </p>
                <p>
                  This personalization is:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-ira-sage mt-2.5" />
                    <span><strong>Temporary</strong> — stored only in your browser session</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-ira-sage mt-2.5" />
                    <span><strong>Optional</strong> — you can skip it entirely</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-ira-sage mt-2.5" />
                    <span><strong>Transparent</strong> — you always know when it is happening</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-ira-sage mt-2.5" />
                    <span><strong>Respectful</strong> — no labels, scores, or judgments</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Privacy Principles */}
        <section className="ira-section bg-muted/30">
          <div className="ira-container">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="ira-heading-display mb-6">
                Privacy Principles
              </h2>
              <p className="ira-text-large text-muted-foreground max-w-xl mx-auto">
                Your emotional data is sacred. We treat it that way.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {privacyPrinciples.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-card rounded-2xl"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-ira-lavender-light flex items-center justify-center">
                    <principle.icon className="w-5 h-5 text-ira-lavender" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-2">{principle.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Crisis Support */}
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
                If You Need More Support
              </h2>
              <p className="ira-text-large text-muted-foreground mb-8">
                Ira is not a crisis resource. If you are in distress or having thoughts of 
                self-harm, please reach out to a professional or crisis service.
              </p>
              <div className="p-6 bg-ira-terracotta-light rounded-2xl text-left">
                <p className="font-medium text-foreground mb-3">Crisis Resources:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>National Suicide Prevention Lifeline: 988 (US)</li>
                  <li>Crisis Text Line: Text HOME to 741741 (US)</li>
                  <li>International Association for Suicide Prevention: <a href="https://www.iasp.info/resources/Crisis_Centres/" className="ira-link" target="_blank" rel="noopener noreferrer">Find a crisis center</a></li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EthicsSafetyPage;
