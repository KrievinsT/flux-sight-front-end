import React, { useEffect, useRef } from "react";
import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";

import { LuClock } from "react-icons/lu";

Chart.register(PieController, ArcElement, Tooltip, Legend, CategoryScale);

const TrafficByCountryCard = ({ darkMode }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["USA", "Canada", "UK", "Germany", "India", "Australia"],
        datasets: [
          {
            label: "Traffic",
            data: [40, 20, 15, 10, 10, 5], 
            backgroundColor: [
              "#1E90FF", 
              "#00FA9A", 
              "#FFD700", 
              "#FF6347",
              "#9370DB",
              "#40E0D0", 
            ],
            hoverOffset: 8, 
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 12,
              color: darkMode ? "#D1D5DB" : "#4B5563", // Set legend text color based on darkMode
            },
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const value = tooltipItem.raw;
                return `${value}% of traffic`;
              },
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
  }, [darkMode]); // Add darkMode dependency to update the chart when darkMode changes

  return (
    <div
      className={`${
        darkMode
          ? "bg-[#1D1D1D] border-1 border-white border-opacity-50 shadow-md"
          : "bg-white border-2 border-gray-200 border-opacity-100 shadow-sm"
      } rounded-lg p-4`}
    >
      <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-black"}`}>
        Traffic Distribution by Country
      </h2>
      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
        Last Campaign Performance
      </p>
      <div className="mt-4">
        <div className="mt-4 h-40">
          <canvas id="chart-pie" ref={chartRef} className="w-full h-full"></canvas>
        </div>
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4 "></div>
        <div className="flex items-center text-sm">
          <LuClock className={`w-4 h-4 ${darkMode ? "text-gray-300" : ""}`}  />
          <p className={`mb-0 pl-2 ${darkMode ? "text-gray-300" : "text-gray-500"}`}>just updated</p>
        </div>
      </div>
    </div>
  );
};

export default TrafficByCountryCard;
