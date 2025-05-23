import React from "react";
import { Box, Card, Typography } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

import CountUp from "react-countup";

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  bgColor: string;
}

export default function StatsCard({
  icon,
  title,
  value,
  bgColor,
}: StatsCardProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Format the value if it's a number greater than or equal to 1000
  const displayValue = typeof value === "number" ? value : parseFloat(value);

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
        },
        overflow: "visible",
      }}
    >
      <Box sx={{ position: "relative", p: 3 }}>
        <Box
          sx={{
            position: "absolute",
            top: -15,
            right: 16,
            width: 56,
            height: 56,
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: bgColor,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {icon}
        </Box>
        <Box sx={{ pt: 3 }}>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray600,
              fontWeight: 500,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              mt: 1,
              mb: 1,
              fontWeight: 700,
              color: isDarkMode ? color.gray100 : color.gray900,
            }}
          >
            <CountUp end={displayValue} separator="," />
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
