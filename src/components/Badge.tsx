import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import type { Badge as BadgeType } from '@/contexts/IraContext';

interface BadgeProps {
  badge: BadgeType;
  size?: 'sm' | 'md';
}

const badgeColors: Record<string, string> = {
  awareness: 'bg-ira-mist-soft text-ira-mist',
  consistency: 'bg-ira-sage-soft text-ira-sage',
  calm: 'bg-ira-lavender-soft text-ira-lavender',
  growth: 'bg-secondary text-secondary-foreground',
};

export function Badge({ badge, size = 'md' }: BadgeProps) {
  const colorClass = badgeColors[badge.id] || 'bg-muted text-muted-foreground';
  const sizeClasses = size === 'sm' ? 'w-10 h-10' : 'w-14 h-14';
  const iconSize = size === 'sm' ? 16 : 24;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center gap-2"
    >
      <div
        className={`${sizeClasses} rounded-full flex items-center justify-center ${
          badge.earned ? colorClass : 'bg-muted/50 text-muted-foreground/30'
        } transition-all duration-300`}
      >
        <Award size={iconSize} />
      </div>
      <div className="text-center">
        <p className={`text-xs font-medium ${badge.earned ? 'text-foreground' : 'text-muted-foreground/50'}`}>
          {badge.name}
        </p>
      </div>
    </motion.div>
  );
}

interface BadgeGridProps {
  badges: BadgeType[];
}

export function BadgeGrid({ badges }: BadgeGridProps) {
  return (
    <div className="flex items-center justify-center gap-6">
      {badges.map(badge => (
        <Badge key={badge.id} badge={badge} />
      ))}
    </div>
  );
}