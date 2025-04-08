"use client";

import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { SkillCategory } from "@/types/user";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  category: SkillCategory;
  skillLevels: { [key: string]: number };
}

export function RadarChartCard({ category, skillLevels }: RadarChartProps) {
  const [chartData, setChartData] = useState<ChartData<"radar">>({
    labels: [],
    datasets: [],
  });

  // Calculate the average skill level for this category
  const getAverageSkill = () => {
    const skills = category.skills;
    const sum = skills.reduce(
      (acc, skill) => acc + (skillLevels[skill] || 0),
      0
    );
    return (sum / skills.length).toFixed(1);
  };

  useEffect(() => {
    // Colors based on the amber theme from the skills page
    const data: ChartData<"radar"> = {
      labels: category.skills,
      datasets: [
        {
          label: category.name,
          data: category.skills.map((skill) => skillLevels[skill] || 0),
          backgroundColor: "rgba(217, 119, 6, 0.15)", // amber-600 with transparency
          borderColor: "rgba(217, 119, 6, 0.8)", // amber-600
          borderWidth: 1.5,
          pointBackgroundColor: "rgba(217, 119, 6, 1)", // amber-600
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(217, 119, 6, 1)", // amber-600
          pointRadius: 3,
          pointHoverRadius: 5,
        },
      ],
    };
    setChartData(data);
  }, [category, skillLevels]);

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)", // Light gray lines in light mode
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)", // Very light gray grid in light mode
        },
        ticks: {
          backdropColor: "transparent", // Remove the white background behind the numbers
          color: "rgba(100, 116, 139, 0.8)", // slate-500 for tick labels
          font: {
            size: 10,
          },
        },
        suggestedMin: 0,
        suggestedMax: 5,
        pointLabels: {
          color: "rgba(71, 85, 105, 1)", // slate-600 for point labels (skill names)
          font: {
            size: 11,
            family: "'Inter', sans-serif",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend as it's not needed for a single dataset
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "rgba(100, 116, 139, 1)",
        bodyColor: "rgba(71, 85, 105, 1)",
        borderColor: "rgba(226, 232, 240, 1)",
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
        titleFont: {
          size: 12,
          weight: "bold" as const,
        },
        bodyFont: {
          size: 11,
        },
        callbacks: {
          title: function (tooltipItems: any) {
            return tooltipItems[0].label;
          },
          label: function (context: any) {
            return `Level: ${context.parsed.r} / 5`;
          },
        },
      },
    },
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.1, // Add slight curve to the lines
      },
    },
  };

  return (
    <div className="h-full space-y-4">
      <div className="text-center text-gray-600 dark:text-gray-300 text-sm">
        Average skill level:{" "}
        <span className="font-medium text-amber-600 dark:text-amber-400">
          {getAverageSkill()}/5
        </span>
      </div>

      <div className="h-72 w-full">
        <Radar data={chartData} options={options} />
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 text-center italic mt-2">
        Hover over points to see exact skill levels
      </div>
    </div>
  );
}
