interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  colorClass?: string;
  label?: string;
}

export function ProgressRing({ 
  progress, 
  size = 48, 
  strokeWidth = 4, 
  colorClass = 'stroke-primary',
  label 
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className={colorClass}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease-out' }}
        />
      </svg>
      {label && (
        <span className="absolute text-xs font-medium text-muted-foreground">
          {label}
        </span>
      )}
    </div>
  );
}

interface ProgressDotsProps {
  total: number;
  completed: number;
  colorClass?: string;
}

export function ProgressDots({ total, completed, colorClass = 'bg-primary' }: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            i < completed ? colorClass : 'bg-muted'
          }`}
        />
      ))}
    </div>
  );
}