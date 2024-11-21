import React, { useEffect, useRef } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";

import { LuClock } from "react-icons/lu";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

const WebsiteViewsCard = () => {
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
            data: [5674, 5372 , 7539, 5247, 2134, 7808, 3405],
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
  }, []);

  return (
    <div className="bg-white  border border-gray-200  rounded-lg p-4 ">
      <h6 className="text-lg font-semibold">Website Views</h6>
      <p className="text-sm text-gray-500">Last Campaign Performance</p>
      <div className="mt-4 h-40">
        <canvas id="chart-bars" ref={chartRef}></canvas>
      </div>
      <hr className="border-t my-4" />
      <div className="flex items-center text-sm text-gray-500">
      <LuClock lassName="w-4 h-4 "  />
        <p className="mb-0 pl-2">Campaign sent 2 days ago</p>
      </div>
    </div>
  );
};

export default WebsiteViewsCard;
