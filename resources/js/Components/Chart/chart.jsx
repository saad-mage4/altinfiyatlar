import React, { useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import { Chart as PrimeChart } from 'primereact/chart';
import { useApiQuery } from "@/hooks/useApi";
import { Loader } from "../UI";
import { useTheme } from "@/context/ThemeContext";
import Skeleton from "react-loading-skeleton";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
    const { data: response, isLoading } = useApiQuery(
        'charts',
        "https://www.nosyapi.com/apiv2/service/economy/historical-data/currency-conversion",
        {
            date: '2024-04-19',
            code: "TRY",
            apiKey: import.meta.env.VITE_NOSY_TOKEN,
        }
    );


    const { theme } = useTheme();

    useEffect(() => {
        document.body.className = theme === "dark" ? "dark_theme" : "";
    }, [theme]);


    // let checkTheme_ = document
    //     .querySelector("body")
    //     .classList.contains("dark_theme");

    let labels = [];
    let exchangeRates = [];


    if (response?.data?.currencyConversion) {
        Object.entries(response?.data?.currencyConversion)?.map(
            ([key, item]) => {
                Object.entries(item)?.map(([key, value]) => {
                    labels.push(key);
                    exchangeRates.push(value?.reverseExchangeRate);
                });
            }
        );
    }

    const totalDuration = 10000;
    const delayBetweenPoints = totalDuration / exchangeRates.length;

    const previousY = (ctx) =>
        ctx.index === 0
            ? ctx.chart.scales.y.getPixelForValue(100)
            : ctx.chart
                  .getDatasetMeta(ctx.datasetIndex)
                  .data[ctx.index - 1].getProps(["y"], true).y;

    const documentStyle = getComputedStyle(document.documentElement);
    const borderColor = documentStyle.getPropertyValue('--teal-500');
    // const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    // const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const surfaceBorder = theme === "dark" ? "#444" : "#ccc";
    const textColor = theme === "dark" ? "#fff" : "#000";

    const data = {
        labels,
        datasets: [
            {
                borderColor:
                    "rgb(8, 197, 81)"
                // borderColor
                ,
                label: "Exchange Rate",
                data: exchangeRates,
                // borderColor: "rgba(75, 192, 192, 1)",
                // backgroundColor: "rgba(75, 192, 192, 0.2)",
                // backgroundColor: "rgb(124, 214, 160)",
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
                    gradient.addColorStop(0, "rgba(124, 214, 160, 0.5)");
                    gradient.addColorStop(1, "rgba(124, 214, 160, 0)");
                    return gradient;
                },
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `Rate: ${tooltipItem.raw}`;
                    },
                },
            },
        },
        // scales: {
        //     x: {
        //         title: {
        //             display: false,
        //             text: "Date",
        //         },
        //         ticks: {
        //             color: checkTheme_ ? "#fff" : "#000",
        //         },
        //     },
        //     y: {
        //         title: {
        //             display: false,
        //             text: "Exchange Rate",
        //         },
        //         ticks: {
        //             color: checkTheme_ ? "#fff" : "#000",
        //         },
        //     },
        // },
        scales: {
            x: {
                ticks: {
                    // color: checkTheme_ ? "#fff" : "#000",
                    color: textColor
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    // color: checkTheme_ ? "#fff" : "#000",
                    color: textColor
                },
                grid: {
                    color: surfaceBorder
                }
            }
        },
        // animation: {
        //     x: {
        //         type: "number",
        //         easing: "linear",
        //         duration: delayBetweenPoints,
        //         from: NaN,
        //         delay(ctx) {
        //             if (ctx.type !== "data" || ctx.xStarted) {
        //                 return 0;
        //             }
        //             ctx.xStarted = true;
        //             return ctx.index * delayBetweenPoints;
        //         },
        //     },
        //     y: {
        //         type: "number",
        //         easing: "linear",
        //         duration: delayBetweenPoints,
        //         from: previousY,
        //         delay(ctx) {
        //             if (ctx.type !== "data" || ctx.yStarted) {
        //                 return 0;
        //             }
        //             ctx.yStarted = true;
        //             return ctx.index * delayBetweenPoints;
        //         },
        //     },
        // },
    };

    if (isLoading) return <Skeleton height={300} />
    return (
        <div className="chartjs-wrapper">
            <Line data={data} options={options} />
        </div>
        // <div className="card">
        //     <PrimeChart type="line" data={data} options={options} />
        // </div>
    );
};

export default Chart;
