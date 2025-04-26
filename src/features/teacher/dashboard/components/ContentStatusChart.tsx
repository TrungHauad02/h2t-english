import React from "react";
import { Box, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export default function ContentStatusChart({
  active,
  inactive,
}: {
  active: number;
  inactive: number;
}) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const data = [
    { name: "Published", value: active },
    { name: "Unpublished", value: inactive },
  ];

  const COLORS = [
    isDarkMode ? color.emerald400 : color.emerald600,
    isDarkMode ? color.gray500 : color.gray400,
  ];

  const total = active + inactive;

  return (
    <Box sx={{ p: 1, height: 300, position: "relative" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: isDarkMode ? color.gray800 : color.white,
              borderColor: isDarkMode ? color.gray700 : color.gray300,
              color: isDarkMode ? color.gray200 : color.gray800,
            }}
            formatter={(value: number) => [
              `${value} contents`,
              "Number of contents",
            ]}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              color: isDarkMode ? color.gray200 : color.gray800,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <Typography
        variant="body1"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none",
          color: isDarkMode ? color.gray200 : color.gray800,
          fontWeight: 600,
        }}
      >
        Total: {total}
      </Typography>
    </Box>
  );
}
