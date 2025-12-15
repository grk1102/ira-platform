import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { toast } from 'sonner';

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Thank you for joining Ira's journey", {
      description: "We'll be in touch when we're ready for you.",
    });
    
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <section className="ira-section" ref={ref}>
      <div className="ira-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-ira-sage font-serif italic text-lg mb-4">
            Be part of something gentle
          </p>
          <h2 className="ira-heading-display mb-6">
            Join Ira's Journey
          </h2>
          <p className="ira-text-large text-muted-foreground mb-10">
            Ira is growing, learning, and becoming more helpful every day. 
            Join early and be part of shaping a kinder approach to emotional wellbeing.
          </p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="flex-1 px-5 py-3.5 bg-card border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-medium transition-all duration-200 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isSubmitting ? 'Joining...' : 'Join early'}
            </button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm text-muted-foreground mt-6"
          >
            No spam. Just gentle updates on Ira's development.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
