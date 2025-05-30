"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../cards/Card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./Chart";

const chartData = [{ atendidas: 1260, pendientes: 570 }];

const chartConfig = {
    atendidas: {
        label: "Atendidas",
        color: "var(--color-primary-green)",
    },
    pendientes: {
        label: "Pendientes",
        color: "var(--color-chart-light-green)",
    },
};

export default function RequestsStatus() {
    return (
        <Card className="p-6 shadow flex flex-col justify-between">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-base font-semibold font-poppins leading-tight">
                    Solicitudes atendidas vs Solicitudes pendientes
                </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-[110px]">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-[2/1] w-full h-full"
                >
                    <RadialBarChart
                        data={chartData}
                        endAngle={180}
                        innerRadius={80}
                        outerRadius={120}
                        width={undefined}
                        height={undefined}
                        cx="50%"
                        cy="85%"
                        margin={{ top: 0, right: 0, bottom: 10, left: 0 }}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarRadiusAxis
                            tick={false}
                            tickLine={false}
                            axisLine={false}
                        ></PolarRadiusAxis>
                        <RadialBar
                            dataKey="atendidas"
                            stackId="a"
                            cornerRadius={5}
                            fill="var(--color-primary-green)"
                            className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                            dataKey="pendientes"
                            fill="var(--color-chart-light-green)"
                            stackId="a"
                            cornerRadius={5}
                            className="stroke-transparent stroke-2"
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex justify-center gap-2 text-xs whitespace-nowrap overflow-x-hidden font-montserrat">
                <div className="flex items-center gap-1 font-medium leading-tight">
                    <div className="w-2 h-2 rounded-full bg-primary-green" />
                    Atendidas <span className="font-semibold tabular-nums">60%</span>
                </div>
                <div className="flex items-center gap-1 font-medium leading-tight">
                    <div className="w-2 h-2 rounded-full bg-chart-light-green" />
                    Pendientes <span className="font-semibold tabular-nums">40%</span>
                </div>
            </CardFooter>
        </Card>
    );
}
