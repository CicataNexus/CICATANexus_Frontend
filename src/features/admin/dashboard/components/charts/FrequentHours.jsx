"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../cards/Card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./Chart";
import ViewModeSwitch from "@/components/ViewModeSwitch";
import { Icon } from "@iconify/react";
import { useState } from "react";

export const description = "A simple area chart";

const chartData = [
    { hour: "8:00", requests: 186 },
    { hour: "9:00", requests: 305 },
    { hour: "10:00", requests: 237 },
    { hour: "11:00", requests: 73 },
    { hour: "12:00", requests: 209 },
    { hour: "13:00", requests: 214 },
    { hour: "14:00", requests: 214 },
    { hour: "15:00", requests: 214 },
    { hour: "16:00", requests: 214 },
];

const chartConfig = {
    requests: {
        label: "Solicitudes",
        color: "var(--color-primary-green)",
    },
};

export default function FrequentHours() {
    const [currentLabel, setCurrentLabel] = useState("Lunes");

    return (
        <Card>
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-base font-semibold font-poppins leading-none">
                    Horarios más frecuentes
                </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-[110px]">
                <ChartContainer
                    config={chartConfig}
                    className="h-[150px] w-full"
                >
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} stroke="#d1d1d1" />
                        <XAxis
                            dataKey="hour"
                            interval={0}
                            padding={{ left: 3, right: 3 }}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={({ x, y, payload }) => (
                                <text
                                    x={x}
                                    y={y + 10}
                                    textAnchor="middle"
                                    fontSize={12}
                                    fontFamily="var(--font-montserrat)"
                                    fontWeight={500}
                                    fill="#374151"
                                >
                                    {payload.value}
                                </text>
                            )}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <defs>
                            <linearGradient
                                id="greenGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="var(--color-primary-green)"
                                    stopOpacity={0.9}
                                />
                                <stop
                                    offset="75%"
                                    stopColor="#B3D7CD"
                                    stopOpacity={0.6}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#ffffff"
                                    stopOpacity={0.3}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="requests"
                            type="natural"
                            fill="url(#greenGradient)"
                            fillOpacity={0.4}
                            stroke="var(--color-primary-green)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-center text-sm">
                <div className="flex justify-center items-center gap-2 mt-2 text-sm font-semibold">
                    <Icon
                        icon="iconamoon:arrow-left-2-light"
                        className="h-4 w-4 cursor-pointer text-blue-600"
                    />
                    <span className="font-montserrat font-medium">
                        {currentLabel}
                    </span>
                    <Icon
                        icon="iconamoon:arrow-right-2-light"
                        className="h-4 w-4 cursor-pointer text-blue-600"
                    />
                </div>
            </CardFooter>
        </Card>
    );
}
