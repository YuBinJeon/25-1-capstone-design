
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ListChecks, Zap, Thermometer, Waves } from 'lucide-react';
import { formatDistanceToNowStrict } from 'date-fns';

interface Activity {
  id: string;
  time: string; // ISO date string
  description: string;
}

interface RecentActivityCardProps {
  activities: Activity[];
}

const getActivityIcon = (description: string) => {
  if (description.toLowerCase().includes('filter') || description.toLowerCase().includes('filtration')) return <FilterIcon className="h-4 w-4" />;
  if (description.toLowerCase().includes('temp')) return <Thermometer className="h-4 w-4" />;
  if (description.toLowerCase().includes('level') || description.toLowerCase().includes('water')) return <Waves className="h-4 w-4" />;
  return <ListChecks className="h-4 w-4" />;
};

// Custom FilterIcon as lucide-react might not have a simple 'FilterIcon'
const FilterIcon = (props: React.ComponentProps<typeof Zap>) => <Zap {...props} /> // Using Zap as placeholder

export function RecentActivityCard({ activities }: RecentActivityCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest system events and actions.</CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent activity.</p>
        ) : (
          <ScrollArea className="h-[200px]"> {/* Adjust height as needed */}
            <ul className="space-y-3">
              {activities.map((activity) => (
                <li key={activity.id} className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {getActivityIcon(activity.description)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNowStrict(new Date(activity.time))} ago
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
