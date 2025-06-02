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
import { useState, useEffect, useMemo } from "react";

export default function RequestsByTech() {
    const [data, setData] = useState([]);
    const [viewMode, setViewMode] = useState(0);
    const [currentLabel, setCurrentLabel] = useState("Junio");

    useEffect(() => {
        const fetchData = async () => {
            const period = viewMode;
            const year = 2025;
            const month = period === 0 ? 6 : undefined;

            let url = `http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}/v1/analytics/by-technician?period=${period}&year=${year}`;
            if (month) {
                url += `&month=${month}`;
            }

            try {
                const response = await fetch(url);
                const data = await response.json();

                const sorted = data
                    .sort((a, b) => b.count - a.count)
                    .map((item, index) => ({
                        name: item.technician,
                        value: item.count,
                        fill: index === 0
                            ? "var(--color-primary-blue)"
                            : "var(--color-chart-light-blue)",
                        key: item.technician.toLowerCase(),
                    }));
                setData(sorted);
            } catch (error) {
                console.error("Error al obtener solicitudes por técnico:", error);
            }
        };

        fetchData();
    }, []);

    const chartConfig = useMemo(() => {
        return data.reduce((config, item) => {
            config[item.key] = {
                label: "Solicitudes",
                color: item.fill,
            };
            return config;
        }, {});
    }, [data]);

    return (
        <Card>
            <CardHeader className="flex justify-between items-start">
                <CardTitle className="text-base font-semibold font-poppins leading-none">
                    Solicitudes atendidas por técnico
                </CardTitle>
                <ViewModeSwitch viewMode={viewMode} setViewMode={setViewMode} />
            </CardHeader>
            {data.length === 0 ? (
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
                                    data={data}
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
                                    <XAxis type="number" domain={[0, 'auto']} hide />
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
                                    <Bar dataKey="value" layout="vertical" radius={4}>
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                        <LabelList
                                            dataKey="name"
                                            position="insideLeft"
                                            offset={8}
                                            className="fill-white font-semibold font-montserrat"
                                            fontSize={13}
                                        />
                                        <LabelList
                                            dataKey="value"
                                            position="right"
                                            offset={8}
                                            className="fill-gray-600 font-medium font-montserrat tabular-nums"
                                            fontSize={13}
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
