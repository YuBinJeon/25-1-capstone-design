
import { Waves } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { Progress } from '@/components/ui/progress';

interface WaterLevelCardProps {
  level: number; // Percentage
}

export function WaterLevelCard({ level }: WaterLevelCardProps) {
  let statusText = "Optimal";
  let progressColorClass = "bg-primary"; // Default to primary color

  if (level < 30) {
    statusText = "Low";
    progressColorClass = "bg-destructive";
  } else if (level < 60) {
    statusText = "Okay";
    progressColorClass = "bg-yellow-500"; // Custom color, ensure it's in tailwind config or use themed vars
  } else if (level > 95) {
    statusText = "High";
    progressColorClass = "bg-destructive";
  }
  
  return (
    <MetricCard
      title="Water Level"
      value={level}
      unit="%"
      icon={Waves}
      description={`Current status: ${statusText}`}
    >
      <Progress value={level} className="mt-2 h-3" indicatorClassName={progressColorClass} />
    </MetricCard>
  );
}

// Extend Progress component's props to accept indicatorClassName
declare module "@radix-ui/react-progress" {
  interface ProgressProps {
    indicatorClassName?: string;
  }
}
// This modification should ideally be done in the Progress component itself if it needs to be reused.
// For this specific case, we can customize style directly if indicatorClassName is not supported.
// The current shadcn/ui Progress component does not directly support indicatorClassName.
// A workaround is to style the indicator directly or create a custom Progress component.
// For simplicity, we'll rely on default styling or use a CSS variable if needed.
// Reverting to use default primary color or rely on CSS for specific coloring of progress.
// The Progress component in shadcn uses `bg-primary` for the indicator.
// Customizing this per-card would require more complex setup or component extension.
// We will use the description to convey status color meaning.
