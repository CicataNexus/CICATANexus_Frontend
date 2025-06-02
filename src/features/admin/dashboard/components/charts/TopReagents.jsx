"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Cell } from "recharts";

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
import { useState, useEffect } from "react";

export const description = "A bar chart with a label";

const chartConfig = {
    solicitudes: {
        label: "Solicitudes",
        color: "var(--color-chart-light-blue)",
    },
};

export default function TopReagents() {
    const [chartData, setChartData] = useState([]);
    const [viewMode, setViewMode] = useState(0);
    const [currentLabel, setCurrentLabel] = useState("Junio");
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const period = viewMode;
            const year = 2025;
            const month = period === 0 ? 6 : undefined;

            let url = `http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/v1/analytics/most-used-all?period=${period}&year=${year}`;
            if (month) {
                url += `&month=${month}`;
            }
            
            try {
                const response = await fetch(url);
                const data = await response.json();

                const formattedData = data.reagent.map((item) => ({
                    reagent: item.name,
                    solicitudes: item.count,
                }));
                setChartData(formattedData);
            } catch (error) {
                console.error("Error al obtener datos de reactivos más solicitados:", error);
            }
        };

        fetchData();
    }, [viewMode]);

    return (
        <Card>
            <CardHeader className="flex justify-between items-start pb-3">
                <CardTitle className="text-base font-semibold font-poppins leading-none">
                    Reactivos más solicitados
                </CardTitle>
                <ViewModeSwitch viewMode={viewMode} setViewMode={setViewMode} />
            </CardHeader>
            {chartData.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                    <div className="text-gray-500 font-montserrat text-xl font-semibold text-center">
                        No hay solicitudes registradas
                    </div>
                </div>
            ) : (
                <>
                    <CardContent className="flex justify-center items-center h-[110px]">
                        <ChartContainer
                            config={chartConfig}
                            className="h-[110px] w-full"
                        >
                            <BarChart
                                accessibilityLayer
                                data={chartData}
                                margin={{
                                    top: 20,
                                }}
                            >
                                <CartesianGrid vertical={false} stroke="#d1d1d1" />
                                <XAxis
                                    dataKey="reagent"
                                    interval={0}
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                    tick={({ x, y, payload }) => {
                                        const maxChars = 5;
                                        const label =
                                            payload.value.length > maxChars
                                                ? payload.value.slice(0, maxChars - 1) +
                                                "…"
                                                : payload.value;

                                        return (
                                            <text
                                                x={x}
                                                y={y + 10}
                                                textAnchor="middle"
                                                fontSize={12}
                                                fontWeight={600}
                                                fontFamily="var(--font-montserrat)"
                                                fill="#374151"
                                            >
                                                <title>{payload.value}</title>
                                                {label}
                                            </text>
                                        );
                                    }}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar
                                    dataKey="solicitudes"
                                    fill="var(--color-chart-light-blue)"
                                    radius={8}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={
                                                hoveredIndex === index
                                                    ? "var(--color-primary-blue)"
                                                    : "var(--color-chart-light-blue)"
                                            }
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            style={{ transition: "fill 0.2s ease" }}
                                        />
                                    ))}
                                    <LabelList
                                        position="top"
                                        offset={12}
                                        className="fill-gray-600 font-montserrat font-medium tabular-nums truncate"
                                        fontSize={12}
                                    />
                                </Bar>
                            </BarChart>
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
                </>
            )}
        </Card>
    );
}
