import React from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  alpha,
  Chip,
  Stack,
  Card,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export interface ChartItem {
  id: string;
  name: string;
  value: number;
  fill: string;
  icon: string;
  bgColor?: string;
}

export interface GeneralizedDistributionChartProps {
  data: ChartItem[];
  title?: string;
  totalLabel?: string;
  tooltipValueSuffix?: string;
  showPercentage?: boolean;
  height?: number;
  barSize?: number;
}

export default function GeneralizedDistributionChart({
  data,
  title,
  totalLabel = "items",
  tooltipValueSuffix = "",
  showPercentage = true,
  height = 290,
  barSize,
}: GeneralizedDistributionChartProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!data || data.length === 0) return null;

  // Process the items to ensure bgColor is set
  const processedData = data.map((item) => ({
    ...item,
    bgColor: item.bgColor || alpha(item.fill, isDarkMode ? 0.2 : 0.1),
  }));

  // Sort by value for better visualization
  const sortedChartData = [...processedData].sort((a, b) => b.value - a.value);

  // Calculate total
  const totalItems = processedData.reduce((sum, item) => sum + item.value, 0);

  // Determine dynamic bar size if not provided
  const dynamicBarSize = barSize || (isMobile ? 18 : 24);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Card
          elevation={6}
          sx={{
            p: 1.5,
            borderRadius: 2,
            backgroundColor: isDarkMode ? color.gray800 : color.white,
            border: `1px solid ${isDarkMode ? color.gray700 : color.gray300}`,
            minWidth: 180,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: data.bgColor,
                border: `1px solid ${
                  isDarkMode ? alpha(data.fill, 0.4) : alpha(data.fill, 0.3)
                }`,
              }}
            >
              <Typography variant="body2">{data.icon}</Typography>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{
                color: isDarkMode ? color.gray200 : color.gray800,
                fontWeight: 600,
              }}
            >
              {data.name}
            </Typography>
          </Stack>

          <Divider sx={{ my: 1.5 }} />

          <Stack spacing={0.5}>
            <Typography
              variant="body1"
              sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
            >
              <strong>{data.value}</strong> {tooltipValueSuffix || totalLabel}
            </Typography>
            {showPercentage && totalItems > 0 && (
              <Chip
                size="small"
                label={`${Math.round(
                  (data.value / totalItems) * 100
                )}% of total`}
                sx={{
                  backgroundColor: alpha(data.fill, isDarkMode ? 0.2 : 0.1),
                  color: isDarkMode ? alpha(data.fill, 0.9) : data.fill,
                  fontWeight: 500,
                  mt: 0.5,
                  height: 24,
                }}
              />
            )}
          </Stack>
        </Card>
      );
    }
    return null;
  };

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2 },
        height: "100%",
        overflow: "hidden",
      }}
    >
      {title && (
        <Typography
          variant="h6"
          sx={{
            color: isDarkMode ? color.gray200 : color.gray800,
            fontWeight: 600,
            mb: 2,
          }}
        >
          {title}
        </Typography>
      )}

      <Box sx={{ height: isMobile ? height - 10 : height, mx: -1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedChartData}
            layout="vertical"
            margin={{
              top: 5,
              right: isMobile ? 25 : 30,
              left: isMobile ? 5 : 15,
              bottom: 5,
            }}
            barCategoryGap={isMobile ? 8 : 12}
          >
            <defs>
              {sortedChartData.map((entry, index) => (
                <linearGradient
                  key={`gradient-${index}`}
                  id={`colorGradient${index}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor={entry.fill} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={entry.fill} stopOpacity={1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={
                isDarkMode
                  ? alpha(color.gray700, 0.5)
                  : alpha(color.gray300, 0.7)
              }
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={{
                fill: isDarkMode ? color.gray400 : color.gray600,
                fontSize: 11,
              }}
              axisLine={{ stroke: isDarkMode ? color.gray700 : color.gray300 }}
              tickLine={{ stroke: isDarkMode ? color.gray700 : color.gray300 }}
              tickCount={5}
            />
            <YAxis
              dataKey="name"
              type="category"
              tick={(props) => {
                const { x, y, payload } = props;
                const item = sortedChartData.find(
                  (item) => item.name === payload.value
                );

                return (
                  <g transform={`translate(${x},${y})`}>
                    {/* Icon */}
                    <rect
                      x={isMobile ? -65 : -85}
                      y={-10}
                      width={20}
                      height={20}
                      rx={4}
                      fill={item?.bgColor || "transparent"}
                      stroke={item?.fill || "transparent"}
                      strokeWidth={1}
                      opacity={0.9}
                    />
                    <text
                      x={isMobile ? -55 : -75}
                      y={0}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={12}
                    >
                      {item?.icon}
                    </text>

                    {/* Label */}
                    <text
                      x={isMobile ? -37 : -57}
                      y={0}
                      dy={0}
                      textAnchor="start"
                      fill={isDarkMode ? color.gray300 : color.gray800}
                      fontSize={isMobile ? 11 : 12}
                      fontWeight={600}
                    >
                      {payload.value}
                    </text>
                  </g>
                );
              }}
              axisLine={{ stroke: isDarkMode ? color.gray700 : color.gray300 }}
              tickLine={false}
              width={isMobile ? 70 : 90}
              tickMargin={4}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                fill: isDarkMode
                  ? alpha(color.gray700, 0.3)
                  : alpha(color.gray200, 0.5),
                radius: 4,
              }}
            />
            <Bar
              dataKey="value"
              radius={[0, 6, 6, 0]}
              barSize={dynamicBarSize}
              animationDuration={1200}
              animationEasing="ease-in-out"
            >
              {sortedChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#colorGradient${index})`}
                  filter={`drop-shadow(0px 2px 2px ${
                    isDarkMode ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.1)"
                  })`}
                />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                offset={5}
                style={{
                  fill: isDarkMode ? color.gray300 : color.gray700,
                  fontSize: 12,
                  fontWeight: 600,
                  textShadow: isDarkMode
                    ? "0px 1px 2px rgba(0,0,0,0.3)"
                    : "none",
                }}
                formatter={(value: number) => (value > 0 ? value : "")}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
