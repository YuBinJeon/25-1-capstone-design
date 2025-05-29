
"use client"; // For state and potential client-side filtering

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Bell, CheckCircle2, Info } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from 'date-fns';

type AlertSeverity = 'critical' | 'warning' | 'info' | 'resolved';

interface Alert {
  id: string;
  timestamp: string; // ISO date string
  message: string;
  severity: AlertSeverity;
  source: string; // e.g., 'Water Level Sensor', 'Temperature Probe', 'Filter System'
}

// Mock data
const mockAlerts: Alert[] = [
  { id: '1', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), message: 'Water level critically low. Pump at risk.', severity: 'critical', source: 'Water Level Sensor' },
  { id: '2', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), message: 'Filter pressure high. Maintenance recommended.', severity: 'warning', source: 'Filter System' },
  { id: '3', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), message: 'Pool temperature slightly below target.', severity: 'info', source: 'Temperature Probe' },
  { id: '4', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), message: 'Low pH detected.', severity: 'warning', source: 'pH Sensor' },
  { id: '5', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), message: 'Water level issue from 2 days ago resolved.', severity: 'resolved', source: 'System' },
  { id: '6', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), message: 'Chlorine level requires adjustment.', severity: 'warning', source: 'Chlorine Sensor' },
];


const SeverityIcon = ({ severity }: { severity: AlertSeverity }) => {
  switch (severity) {
    case 'critical': return <AlertTriangle className="h-5 w-5 text-destructive" />;
    case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case 'info': return <Info className="h-5 w-5 text-blue-500" />;
    case 'resolved': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    default: return <Bell className="h-5 w-5 text-muted-foreground" />;
  }
};

const SeverityBadge = ({ severity }: { severity: AlertSeverity }) => {
  let variant: "default" | "secondary" | "destructive" | "outline" = "secondary";
  if (severity === 'critical') variant = 'destructive';
  else if (severity === 'warning') variant = 'default'; // Using default for warning as it often uses primary/accent
  else if (severity === 'resolved') variant = 'outline'; // Or a custom green one

  // Custom styling for warning and resolved
  let className = "";
  if (severity === 'warning') className = "bg-yellow-500 hover:bg-yellow-500/80 text-white"; // Ensure these colors are defined or use HSL vars
  if (severity === 'resolved') className = "bg-green-500 hover:bg-green-500/80 text-white";


  return <Badge variant={variant} className={className}>{severity.charAt(0).toUpperCase() + severity.slice(1)}</Badge>;
};


export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [severityFilter, setSeverityFilter] = useState<AlertSeverity | 'all'>('all');

  const filteredAlerts = useMemo(() => {
    if (severityFilter === 'all') {
      return alerts;
    }
    return alerts.filter(alert => alert.severity === severityFilter);
  }, [alerts, severityFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-foreground">System Alerts</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter by severity:</span>
          <Select value={severityFilter} onValueChange={(value) => setSeverityFilter(value as AlertSeverity | 'all')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alert Log</CardTitle>
          <CardDescription>
            Displaying {filteredAlerts.length} of {alerts.length} alerts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredAlerts.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No alerts match your filter, or the system is clear!</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Status</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell><SeverityIcon severity={alert.severity} /></TableCell>
                    <TableCell>{format(new Date(alert.timestamp), "MMM d, yyyy, HH:mm:ss")}</TableCell>
                    <TableCell className="max-w-xs truncate">{alert.message}</TableCell>
                    <TableCell>{alert.source}</TableCell>
                    <TableCell className="text-right"><SeverityBadge severity={alert.severity} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
