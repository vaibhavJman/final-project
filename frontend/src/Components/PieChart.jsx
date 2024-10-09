import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const GenderRatioChart = () => {
  const [genderData, setGenderData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/gendercount")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = [
          { name: "Male", value: data.male },
          { name: "Female", value: data.female },
        ];
        setGenderData(formattedData);
      });
  }, []);

  const COLORS = ["#8884d8", "#82ca9d"];

  const getColor = (name) => {
    switch (name) {
      case "Male":
        return "#8884d8";
      case "Female":
        return "#82ca9d";
      default:
        return "#000"; // fallback to black if name doesn't match
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    // console.log(payload);

    if (active && payload && payload.length) {
      const metricColor = getColor(payload[0].name); // Get the color for the corresponding metric
      return (
        <div className="bg-gray-800 text-white rounded-lg p-2">
          <div className="flex items-center">
            <span
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: metricColor,
                marginRight: "8px",
              }}
            ></span>
            <span style={{ marginRight: "30px" }}>{payload[0].name}:</span>
            <span className="ml-auto">{payload[0].value}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={genderData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {genderData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GenderRatioChart;
