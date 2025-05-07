import React from "react";
import { Box } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: ChartDataItem[];
}

export default function DonutChart({ data }: DonutChartProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: isDarkMode ? color.gray700 : color.white,
            border: `1px solid ${isDarkMode ? color.gray600 : color.gray300}`,
            p: 1.5,
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ color: payload[0].payload.color, fontWeight: "bold" }}>
            {payload[0].name}: {payload[0].value}
          </Box>
        </Box>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={160}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={45}
          outerRadius={70}
          paddingAngle={3}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
