import { motion } from 'framer-motion';
import type { Milestone as MilestoneType } from '@/contexts/IraContext';

interface MilestoneItemProps {
  milestone: MilestoneType;
  index: number;
}

function MilestoneItem({ milestone, index }: MilestoneItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50"
    >
      <div className="w-2 h-2 rounded-full bg-ira-sage" />
      <p className="text-sm text-foreground">{milestone.text}</p>
    </motion.div>
  );
}

interface MilestoneListProps {
  milestones: MilestoneType[];
}

export function MilestoneList({ milestones }: MilestoneListProps) {
  const recentMilestones = milestones.slice(-3).reverse();

  if (recentMilestones.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground">Your milestones will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {recentMilestones.map((milestone, index) => (
        <MilestoneItem key={milestone.id} milestone={milestone} index={index} />
      ))}
    </div>
  );
}