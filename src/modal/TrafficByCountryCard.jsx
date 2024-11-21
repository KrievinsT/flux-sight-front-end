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

const TrafficByCountryCard = () => {
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
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h2 className="text-lg font-semibold">Traffic Distribution by Country</h2>
      <p className="text-gray-500 text-sm">Last Campaign Performance</p>
      <div className="mt-4">
        <div className="mt-4 h-40">
          <canvas id="chart-pie" ref={chartRef} className="w-full h-full"></canvas>
        </div>
        <hr className="my-4 border-t" />
      <div className="flex items-center text-sm text-gray-500">
      <LuClock lassName="w-4 h-4 "  />
        <p className="mb-0 pl-2">just updated</p>
      </div>
      </div>
    </div>
  );
};

export default TrafficByCountryCard;
