import React, { useEffect, useRef } from "react";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
import { LuClock } from "react-icons/lu";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

const WebsiteViewsCard = ({ darkMode }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Views",
            data: [5674, 5372, 7539, 5247, 2134, 7808, 3405],
            backgroundColor: "#4F46E5",
            borderRadius: 4,
            borderSkipped: false,
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
              color: darkMode ? "#D1D5DB" : "#9CA3AF",
            },
          },
          y: {
            grid: {
              color: darkMode ? "#4B5563" : "#E5E7EB",
              drawBorder: false,
            },
            ticks: {
              color: darkMode ? "#D1D5DB" : "#9CA3AF",
              stepSize: 50,
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
  }, [darkMode]);

  return (
    <div
      className={`rounded-lg p-4 ${
        darkMode
          ? "bg-[#1D1D1D] border-1 border-white border-opacity-50 shadow-md"
          : "bg-white border-2 border-gray-200 border-opacity-100 shadow-sm"
      }`}
    >
      <h6 className={`text-lg font-semibold ${darkMode ? "text-[#fff]" : ""}`}>Website Views</h6>
      <p className={`text-sm  ${darkMode ? "text-gray-300" : "text-gray-500"}`}>Last Campaign Performance</p>
      <div className="mt-4 h-40">
        <canvas id="chart-bars" ref={chartRef}></canvas>
      </div>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4 "></div>
      <div className="flex items-center text-sm text-gray-500">
        <LuClock className={`w-4 h-4 ${darkMode ? "text-gray-300" : ""}`} />
        <p className={`pl-2 ${darkMode ? "text-gray-300" : ""}`}>Campaign sent 2 days ago</p>
      </div>
    </div>
  );
};

export default WebsiteViewsCard;
