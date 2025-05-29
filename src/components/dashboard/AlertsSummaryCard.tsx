
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { AlertTriangle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNowStrict } from 'date-fns';

interface Alert {
  id: string;
  severity: 'warning' | 'critical';
  message: string;
  time: string; // ISO date string
}

interface AlertsSummaryCardProps {
  alerts: Alert[];
}

export function AlertsSummaryCard({ alerts }: AlertsSummaryCardProps) {
  const criticalAlerts = alerts.filter(a => a.severity === 'critical').length;
  const warningAlerts = alerts.filter(a => a.severity === 'warning').length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Alerts Summary</span>
          <Bell className="h-5 w-5 text-muted-foreground" />
        </CardTitle>
        <CardDescription>
          {criticalAlerts > 0 && <span className="text-destructive">{criticalAlerts} critical</span>}
          {criticalAlerts > 0 && warningAlerts > 0 && ", "}
          {warningAlerts > 0 && <span className="text-yellow-600 dark:text-yellow-400">{warningAlerts} warnings</span>}
          {criticalAlerts === 0 && warningAlerts === 0 && "No active alerts."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <p className="text-sm text-muted-foreground">System is running smoothly.</p>
        ) : (
          <ul className="space-y-2 max-h-40 overflow-y-auto">
            {alerts.slice(0, 3).map((alert) => ( // Show max 3 alerts
              <li key={alert.id} className="flex items-start space-x-2">
                <AlertTriangle className={`h-4 w-4 mt-0.5 ${alert.severity === 'critical' ? 'text-destructive' : 'text-yellow-500'}`} />
                <div>
                  <p className="text-sm text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{formatDistanceToNowStrict(new Date(alert.time))} ago</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      {alerts.length > 0 && (
         <CardFooter>
            <Button variant="outline" size="sm" asChild className="w-full">
              <Link href="/alerts">View All Alerts</Link>
            </Button>
          </CardFooter>
      )}
    </Card>
  );
}
