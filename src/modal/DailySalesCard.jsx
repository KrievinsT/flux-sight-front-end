import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";

import { LuClock } from "react-icons/lu";

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

const AnnualRevenueCard = ({ darkMode }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "J",
          "F",
          "M",
          "A",
          "M",
          "J",
          "J",
          "A",
          "S",
          "O",
          "N",
          "D",
        ],
        datasets: [
          {
            label: "Revenue",
            data: [5000, 7000, 8000, 6000, 9000, 11000, 15050, 12000, 13000, 14000, 16000, 18000],
            borderColor: "#45ff17",
            backgroundColor: "rgba(30, 64, 175, 0.2)",
            borderWidth: 2,
            tension: 0.1,
            pointRadius: 3,
            pointBackgroundColor: "#2d8517",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#9CA3AF",
            },
          },
          y: {
            grid: {
              color: "#E5E7EB",
              drawBorder: false,
            },
            ticks: {
              color: "#9CA3AF",
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div
      className={`${
        darkMode
          ? "bg-[#1D1D1D] border-1 border-white border-opacity-50 shadow-md"
          : "bg-white border-2 border-gray-200 border-opacity-100 shadow-sm"
      } rounded-lg p-4`}
    >
      <h6 className={`text-lg font-semibold ${darkMode ? "text-[#fff]" : ""}`}>Annual Revenue</h6>
      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
        (<span className="font-bold">+25%</span>) increase compared to last year.
      </p>
      <div className="mt-4 h-40">
        <canvas id="chart-line" ref={chartRef}></canvas>
      </div>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4 "></div>
      <div className="flex items-center text-sm text-gray-500">
        <LuClock className={`w-4 h-4 ${darkMode ? "text-gray-300" : ""}`} />
        <p className={`pl-2 ${darkMode ? "text-gray-300" : ""}`}>updated 2 hours ago</p>
      </div>
    </div>
  );
};

export default AnnualRevenueCard;
