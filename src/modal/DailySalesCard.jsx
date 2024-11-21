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

const AnnualRevenueCard = () => {
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
    <div className="bg-white  border border-gray-200  rounded-lg p-4">
      <h6 className="text-lg font-semibold">Annual Revenue</h6>
      <p className="text-sm text-gray-500">
        (<span className="font-bold">+25%</span>) increase compared to last year.
      </p>
      <div className="mt-4 h-40">
        <canvas id="chart-line" ref={chartRef}></canvas>
      </div>
      <hr className="my-4 border-t" />
      <div className="flex items-center text-sm text-gray-500">
      <LuClock lassName="w-4 h-4 "  />
        <p className="mb-0 pl-2">updated 2 hours ago</p>
      </div>
    </div>
  );
};

export default AnnualRevenueCard;
