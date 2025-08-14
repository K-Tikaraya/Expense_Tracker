import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts"

// Custom Bar Chart Component
const CustomBarChart = ({ data }) => {

    // Solid purple color for all bars (you can change if needed)
    const barColor = "#875cf5";

    // Custom Tooltip styling
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className='bg-white shadow-lg rounded-lg px-3 py-2 border border-gray-200'>
                    <p className='text-sm font-semibold text-purple-700 mb-1'>
                        {payload[0].payload.category}
                    </p>
                    <p className='text-sm text-gray-700'>
                        Amount: <span className='font-bold text-gray-900'>
                            ${payload[0].payload.amount}
                        </span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className='bg-white mt-6'>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none" />

                    <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12, fill: "#555" }}
                        stroke="none"
                    />
                    <YAxis
                        tick={{ fontSize: 12, fill: '#555' }}
                        stroke="none"
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <Bar
                        dataKey="amount"
                        fill={barColor}
                        radius={[10, 10, 0, 0]} // rounded top
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={barColor} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart
