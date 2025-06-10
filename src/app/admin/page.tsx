
"use client"; // Required for form handling and state

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Thermometer, Save, Settings, AlertCircle, Loader2 } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AdminPage() {
  const { toast } = useToast();
  const [targetTemperature, setTargetTemperature] = useState(28); // Default or fetched value
  const [tempLoading, setTempLoading] = useState(false);

  const [phThresholdLow, setPhThresholdLow] = useState(7.2);
  const [phThresholdHigh, setPhThresholdHigh] = useState(7.8);
  const [alertLoading, setAlertLoading] = useState(false);

  const handleTemperatureSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTempLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('New target temperature:', targetTemperature);
    toast({
      title: 'Temperature Updated',
      description: `Target temperature set to ${targetTemperature}°C.`,
    });
    setTempLoading(false);
  };
  
  const handleAlertThresholdSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAlertLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('New pH thresholds:', phThresholdLow, phThresholdHigh);
    toast({
      title: 'Alert Thresholds Updated',
      description: `pH thresholds set to ${phThresholdLow} - ${phThresholdHigh}.`,
    });
    setAlertLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Admin Panel</h1>
        <Settings className="h-6 w-6 text-muted-foreground" />
      </div>

      <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-medium">
            <div className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-primary" />
              Temperature Control
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <CardTitle>Set Target Temperature</CardTitle>
                <CardDescription>Adjust the desired water temperature for the pool.</CardDescription>
              </CardHeader>
              <form onSubmit={handleTemperatureSubmit}>
                <CardContent>
                  <Label htmlFor="targetTemperature">Target Temperature (°C)</Label>
                  <Input
                    id="targetTemperature"
                    type="number"
                    value={targetTemperature}
                    onChange={(e) => setTargetTemperature(parseFloat(e.target.value))}
                    step="0.5"
                    min="10"
                    max="40"
                    className="mt-1"
                    disabled={tempLoading}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={tempLoading}>
                    {tempLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" /> Save Temperature
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-medium">
             <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Alert Thresholds
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <CardTitle>Configure Alert Thresholds</CardTitle>
                <CardDescription>Set limits for various parameters to trigger alerts.</CardDescription>
              </CardHeader>
               <form onSubmit={handleAlertThresholdSubmit}>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="phLow">pH Level - Low Threshold</Label>
                        <Input
                            id="phLow"
                            type="number"
                            value={phThresholdLow}
                            onChange={(e) => setPhThresholdLow(parseFloat(e.target.value))}
                            step="0.1"
                            min="6" max="8"
                            className="mt-1"
                            disabled={alertLoading}
                        />
                    </div>
                    <div>
                        <Label htmlFor="phHigh">pH Level - High Threshold</Label>
                        <Input
                            id="phHigh"
                            type="number"
                            value={phThresholdHigh}
                            onChange={(e) => setPhThresholdHigh(parseFloat(e.target.value))}
                            step="0.1"
                            min="6" max="9"
                            className="mt-1"
                            disabled={alertLoading}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={alertLoading}>
                    {alertLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" /> Save Thresholds
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Add more settings sections here, e.g., Filtration Schedule, User Management */}
         <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-medium">Filtration Schedule (Placeholder)</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground p-4">Configure automated filtration cycles here.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
