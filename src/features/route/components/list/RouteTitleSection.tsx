import React from "react";
import { Typography, Box } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { Route } from "interfaces";

interface RouteTitleSectionProps {
  route: Route;
}

export default function RouteTitleSection({ route }: RouteTitleSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        position: "relative",
        p: 1,
        borderRadius: 2,
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDarkMode
            ? `linear-gradient(135deg, ${color.gray800} 0%, ${color.gray900} 100%)`
            : `linear-gradient(135deg, ${color.gray50} 0%, ${color.gray100} 100%)`,
          opacity: 0.6,
          zIndex: -1,
        },
      }}
    >
      {/* Title with innovative styling */}
      <Typography
        variant="h4"
        sx={{
          color: isDarkMode ? color.teal200 : color.teal800,
          fontWeight: 700,
          mb: 1,
          position: "relative",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "2px",
            background: isDarkMode
              ? `linear-gradient(to right, ${color.teal600}, ${color.teal400})`
              : `linear-gradient(to right, ${color.teal500}, ${color.teal300})`,
            transform: "scaleX(0)",
            transformOrigin: "right",
            transition: "transform 0.3s ease",
          },
          "&:hover::after": {
            transform: "scaleX(1)",
            transformOrigin: "left",
          },
        }}
      >
        {route.title}
      </Typography>

      {/* Description with enhanced readability */}
      <Typography
        variant="body1"
        sx={{
          color: isDarkMode ? color.gray300 : color.gray700,
          lineHeight: 1.6,
          fontWeight: 400,
          letterSpacing: "0.5px",
          position: "relative",
          pl: 1.5,
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "4px",
            background: isDarkMode
              ? `linear-gradient(${color.teal600}, ${color.teal400})`
              : `linear-gradient(${color.teal500}, ${color.teal300})`,
            borderRadius: 2,
          },
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}
      >
        {route.description}
      </Typography>
    </Box>
  );
}
