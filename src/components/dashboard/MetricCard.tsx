
import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  icon?: LucideIcon;
  children?: React.ReactNode; // For charts or progress bars
  footerContent?: React.ReactNode;
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  unit, 
  description, 
  icon: Icon, 
  children, 
  footerContent, 
  className 
}: MetricCardProps) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-2xl font-bold">
          {value}
          {unit && <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>}
        </div>
        {children}
      </CardContent>
      {footerContent && (
        <CardFooter className="text-xs text-muted-foreground pt-2">
          {footerContent}
        </CardFooter>
      )}
    </Card>
  );
}

// Helper function for cn if not globally available or for local use
// In this project, cn is available from @/lib/utils
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');
