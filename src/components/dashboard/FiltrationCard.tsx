
import { Filter, RotateCcw, Zap, CalendarClock } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNowStrict, format } from 'date-fns';

interface FiltrationData {
  status: 'active' | 'idle' | 'cleaning_due';
  runTimeToday: number; // hours
  nextFilterChangeDays: number;
  filterCapacityUsed: number; // percentage
  lastCleaned: string; // ISO date string
}

interface FiltrationCardProps {
  filtrationData: FiltrationData;
}

export function FiltrationCard({ filtrationData }: FiltrationCardProps) {
  const { status, runTimeToday, nextFilterChangeDays, filterCapacityUsed, lastCleaned } = filtrationData;

  let statusBadgeVariant: "default" | "secondary" | "destructive" = "secondary";
  let statusText = "Idle";

  if (status === 'active') {
    statusBadgeVariant = "default"; // default is primary color
    statusText = "Active";
  } else if (status === 'cleaning_due') {
    statusBadgeVariant = "destructive";
    statusText = "Cleaning Due";
  }

  return (
    <MetricCard
      title="Filtration System"
      value={<Badge variant={statusBadgeVariant}>{statusText}</Badge>}
      icon={Filter}
      className="col-span-1 row-span-2" // Example for grid layout control
    >
      <div className="mt-4 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground flex items-center"><Zap className="w-4 h-4 mr-2" />Run Time Today</span>
          <span>{runTimeToday.toFixed(1)} hrs</span>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-muted-foreground flex items-center"><RotateCcw className="w-4 h-4 mr-2" />Filter Change In</span>
            <span>{nextFilterChangeDays} days</span>
          </div>
          <Progress value={100 - (filterCapacityUsed > 100 ? 100 : filterCapacityUsed)} className="h-2" /> 
          {/* Progress shows remaining capacity */}
        </div>

        <div className="flex items-center justify-between">
           <span className="text-muted-foreground flex items-center"><CalendarClock className="w-4 h-4 mr-2" />Last Cleaned</span>
           <span>{format(new Date(lastCleaned), "MMM d, yyyy")} ({formatDistanceToNowStrict(new Date(lastCleaned))} ago)</span>
        </div>
      </div>
    </MetricCard>
  );
}
