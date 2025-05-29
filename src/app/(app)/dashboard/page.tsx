
import { WaterLevelCard } from '@/components/dashboard/WaterLevelCard';
import { TemperatureCard } from '@/components/dashboard/TemperatureCard';
import { FiltrationCard } from '@/components/dashboard/FiltrationCard';
import { RecentActivityCard } from '@/components/dashboard/RecentActivityCard';
import { AlertsSummaryCard } from '@/components/dashboard/AlertsSummaryCard';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function DashboardPage() {
  // Mock data - in a real app, this would come from an API
  const poolData = {
    waterLevel: 75, // percentage
    temperature: 28, // Celsius
    targetTemperature: 29,
    filtration: {
      status: 'active' as 'active' | 'idle' | 'cleaning_due',
      runTimeToday: 4.5, // hours
      nextFilterChangeDays: 25, // days
      filterCapacityUsed: 15, // percentage (100 - nextFilterChangeDays scaled appropriately)
      lastCleaned: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    },
    recentActivity: [
      { id: '1', time: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), description: 'Filtration cycle started.' },
      { id: '2', time: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), description: 'Temperature reached target 29°C.' },
      { id: '3', time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), description: 'Water level top-up initiated.' },
    ],
    alerts: [
      { id: 'a1', severity: 'warning' as 'warning' | 'critical', message: 'Filter pressure high, check soon.', time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
    ]
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <WaterLevelCard level={poolData.waterLevel} />
        <TemperatureCard current={poolData.temperature} target={poolData.targetTemperature} />
        <FiltrationCard filtrationData={poolData.filtration} />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <RecentActivityCard activities={poolData.recentActivity} />
        <AlertsSummaryCard alerts={poolData.alerts} />
      </div>

       {/* Example of a chart - could be temperature history or similar */}
      <Card>
        <CardHeader>
          <CardTitle>Temperature History (Placeholder)</CardTitle>
          <CardDescription>Shows temperature fluctuations over the last 24 hours.</CardDescription>
        </CardHeader>
        {/* Chart component would go here. For now, a placeholder. */}
        <div className="p-6 h-64 flex items-center justify-center text-muted-foreground bg-muted/50 rounded-b-lg">
          Chart Placeholder
        </div>
      </Card>
    </div>
  );
}
