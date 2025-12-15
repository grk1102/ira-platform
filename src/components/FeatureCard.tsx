import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  accent: 'blue' | 'sage' | 'lavender' | 'warm';
  delay?: number;
}

const accentStyles = {
  blue: 'bg-ira-blue-soft',
  sage: 'bg-ira-sage-soft',
  lavender: 'bg-ira-lavender-soft',
  warm: 'bg-ira-warm',
};

const iconColors = {
  blue: 'text-ira-blue',
  sage: 'text-ira-sage',
  lavender: 'text-ira-lavender',
  warm: 'text-foreground',
};

export function FeatureCard({ title, description, icon: Icon, href, accent, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Link to={href} className="block">
        <div className="ira-card group cursor-pointer">
          <div className={`w-10 h-10 rounded-xl ${accentStyles[accent]} flex items-center justify-center mb-4`}>
            <Icon className={`w-5 h-5 ${iconColors[accent]}`} />
          </div>
          <h3 className="text-base font-medium text-foreground mb-1.5">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
