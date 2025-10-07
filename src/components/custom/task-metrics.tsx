'use client';

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Task } from "./todo-section";

type Props = {
    tasks: Task[];
    currentTime: string;
};

// Convert seconds -> HH:MM:SS
const parseChronix = (time?: string): number | null => {
    if (!time) return null;

    const [h, m, s] = time.split(':').map(Number);
    if ([h, m, s].some(isNaN)) return null;

    return h * 3600 + m * 60 + s;
};

const formatChronix = (sec: number): string => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;

    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export default function TaskMetrics({ tasks, currentTime }: Props) {
    const chartData = tasks.map((t) => {
        const activeSec = parseChronix(t.activeAt);
        const doneSec = parseChronix(t.doneAt);

        if (activeSec === null || doneSec === null) return null;

        return {
            task: t.text,
            start: activeSec,
            end: doneSec,
            duration: Math.max(0, doneSec - activeSec),
            activeAt: t.activeAt,
            doneAt: t.doneAt
        }
    }).filter(Boolean) as {
        task: string;
        start: number;
        end: number;
        duration: number;
        activeAt: string;
        doneAt: string;
    }[];

    const chartConfig = {
        duration: {
            label: 'duration',
            color: 'var(--chart-1)'
        }
    } satisfies ChartConfig;

    const maxXAxis = parseChronix(currentTime) ?? 0;

    return (
        <>
            <Card className="m-1.5">
                <CardHeader>
                    <CardTitle>Task Duration</CardTitle>
                    <CardDescription>Today&apos;s overall productivity.</CardDescription>
                </CardHeader>
                <CardContent>
                    {chartData.length === 0 ? (
                        <p>No completed tasks yet</p>
                    ) : (
                        <ChartContainer config={chartConfig}>
                            <ResponsiveContainer height={'10%'} width={'50%'}>
                                <BarChart data={chartData} layout="vertical">
                                    <XAxis type="number" domain={[0, maxXAxis]} tickFormatter={(v) => formatChronix(v)} />
                                    <YAxis dataKey={'task'} type="category" tickLine={false} axisLine={false} />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent />}
                                        formatter={(value, name) => {
                                            if (name === 'duration') {
                                                return [formatChronix(value as number), 'Duration'];
                                            }
                                            if (name === 'start') {
                                                return [formatChronix(value as number), 'Start'];
                                            }
                                            return [value, name];
                                        }}
                                    />
                                    <Bar dataKey={'start'} stackId={'a'} fill="transparent" />
                                    <Bar dataKey={'duration'} stackId={'a'} fill="var(--color-duration)" radius={5} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    )}
                </CardContent>
            </Card>
        </>
    )
}