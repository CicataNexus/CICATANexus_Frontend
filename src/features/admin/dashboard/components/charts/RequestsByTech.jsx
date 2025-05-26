"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    XAxis,
    YAxis,
    Cell,
} from "recharts";

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

// Datos base
const rawData = [
    { name: "Pedro", value: 38 },
    { name: "María", value: 22 },
    { name: "Juan", value: 11 },
    { name: "Rodrigo", value: 2 },
];

// Ordena y asigna color a cada barra
const chartData = [...rawData]
    .sort((a, b) => b.value - a.value)
    .map((item, index) => ({
        ...item,
        fill:
            index === 0
                ? "var(--color-primary-blue)"
                : "var(--color-chart-light-blue)",
        key: item.name.toLowerCase(),
    }));

const chartConfig = chartData.reduce((config, item) => {
    config[item.key] = {
        label: "Solicitudes",
        color: item.fill,
    };
    return config;
}, {});

export default function RequestsByTech() {
    const [viewMode, setViewMode] = useState("monthly");
    const [currentLabel, setCurrentLabel] = useState("Marzo");

    return (
        <Card>
            <CardHeader className="flex justify-between items-start">
                <CardTitle>Solicitudes atendidas por técnico</CardTitle>
                <ViewModeSwitch viewMode={viewMode} setViewMode={setViewMode} />
            </CardHeader>

            <CardContent className="flex justify-center items-center h-[110px]">
                <ChartContainer
                    config={chartConfig}
                    className="h-[110px] w-full"
                >
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ right: 16 }}
                    >
                        <CartesianGrid horizontal={false} stroke="#d1d1d1" />
                        <YAxis
                            dataKey="name"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            hide
                        />
                        <XAxis type="number" domain={[0, 50]} hide />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    nameKey="key"
                                    labelKey="name"
                                />
                            }
                        />
                        <Bar
                            dataKey="value"
                            layout="vertical"
                            radius={4}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                            <LabelList
                                dataKey="name"
                                position="insideLeft"
                                offset={8}
                                className="fill-white font-normal font-montserrat"
                                fontSize={13}
                            />
                            <LabelList
                                dataKey="value"
                                position="right"
                                offset={8}
                                className="fill-black font-medium font-montserrat tabular-nums"
                                fontSize={13}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>

            <CardFooter className="flex-col items-center text-sm">
                <div className="flex justify-center items-center gap-4 mt-2 text-sm font-semibold">
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
