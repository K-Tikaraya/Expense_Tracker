import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

// Custom Bar Chart Component
const CustomBarChart = ({ data }) => {
  // ✅ Dynamically choose the key: category or source
  const xKey = data?.length > 0 && data[0].category ? "category" : "source";

  // Solid purple color for all bars
  const barColor = "#875cf5";

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white border border-purple-200 rounded-lg shadow-lg p-3">
          <p className="text-sm font-semibold text-purple-700 mb-1">
            {item[xKey]} {/* ✅ dynamically handle category/source */}
          </p>
          <p className="text-xs text-gray-600">
            Amount: <span className="font-medium text-gray-800">{item.amount}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
        <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
        <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={barColor} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
