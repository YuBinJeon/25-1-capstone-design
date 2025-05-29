
import { Thermometer, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MetricCard } from './MetricCard';

interface TemperatureCardProps {
  current: number; // Celsius
  target: number; // Celsius
}

export function TemperatureCard({ current, target }: TemperatureCardProps) {
  let trendIcon = <Minus className="h-4 w-4 text-muted-foreground" />;
  let trendText = "Stable";
  if (current < target) {
    trendIcon = <TrendingUp className="h-4 w-4 text-green-500" />;
    trendText = "Heating";
  } else if (current > target) {
    trendIcon = <TrendingDown className="h-4 w-4 text-blue-500" />;
    trendText = "Cooling";
  }

  return (
    <MetricCard
      title="Temperature"
      value={current}
      unit="°C"
      icon={Thermometer}
      description={`Target: ${target}°C`}
      footerContent={
        <div className="flex items-center gap-1">
          {trendIcon}
          <span>{trendText}</span>
        </div>
      }
    >
      {/* Optionally, a small inline chart could go here */}
      {/* <div className="mt-2 h-16 bg-muted/50 rounded flex items-center justify-center text-xs text-muted-foreground">
        Small trend chart placeholder
      </div> */}
    </MetricCard>
  );
}
