'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { type ChartConfig } from '@/components/ui/chart';
import { useAdminDashboard } from '@/hooks/useDashboard';

const chartConfig = {
  total: {
    label: 'Total Slots',
    color: 'hsl(var(--chart-1))',
  },
  available: {
    label: 'Available Slots',
    color: 'hsl(var(--chart-2))',
  },
  occupied: {
    label: 'Occupied Slots',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export function BarChartComponent() {
  const { data, isLoading } = useAdminDashboard();

  const chartData = [
    {
      level: 'All',
      total: data?.totalSlots ?? 0,
      available: data?.availableSlots ?? 0,
      occupied: data?.occupiedSlots ?? 0,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Slot Distribution</CardTitle>
        <CardDescription>Overview of parking slot availability</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} margin={{ top: 20 }} barGap={10}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="level" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />

            <Bar
              dataKey="total"
              fill="var(--color-total)"
              radius={8}
              barSize={180}
              isAnimationActive={!isLoading}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>

            <Bar
              dataKey="available"
              fill="var(--color-available)"
              radius={8}
              barSize={180}
              isAnimationActive={!isLoading}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>

            <Bar
              dataKey="occupied"
              fill="var(--color-occupied)"
              radius={8}
              barSize={180}
              isAnimationActive={!isLoading}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>

          </BarChart> 
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 4.1% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Displaying total, available, and occupied parking slots
        </div>
      </CardFooter>
    </Card>
  );
}
