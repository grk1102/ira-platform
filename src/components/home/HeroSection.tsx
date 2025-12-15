import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePersonalization } from '@/contexts/PersonalizationContext';

export function HeroSection() {
  const { getPersonalizedMessage, hasCompletedCheckin } = usePersonalization();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ira-sage-light/30 via-background to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ira-sage-light/40 rounded-full blur-3xl animate-breathe" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-ira-lavender-light/40 rounded-full blur-3xl animate-breathe" style={{ animationDelay: '2s' }} />

      <div className="ira-container relative z-10 text-center py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl mx-auto"
        >
          {/* Letter-style greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-ira-sage font-serif italic text-lg mb-6"
          >
            A letter for you
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6"
          >
            Hi, I'm <span className="text-ira-sage">Ira</span>.
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl">
              I'm here to help you understand yourself — gently.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="ira-text-large text-muted-foreground max-w-xl mx-auto mb-4"
          >
            {getPersonalizedMessage()}
          </motion.p>

          {hasCompletedCheckin && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="text-sm text-muted-foreground/70 mb-8"
            >
              ✨ Your experience is being personalized
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <Link
              to="/#what-is-ira"
              className="ira-button-primary min-w-[180px]"
            >
              Begin your space
            </Link>
            <a
              href="#talk-to-ira"
              className="ira-button-secondary min-w-[180px]"
            >
              Talk to Ira
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
