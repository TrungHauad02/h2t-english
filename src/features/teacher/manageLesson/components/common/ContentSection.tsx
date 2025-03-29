import {
  Box,
  Typography,
  Paper,
  Divider,
  Zoom,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import DescriptionIcon from "@mui/icons-material/Description";
import React, { ReactElement } from "react";

interface ContentSectionProps {
  title: string;
  content: string;
  icon?: ReactElement;
}

export default function ContentSection({
  title,
  content,
  icon = <DescriptionIcon />,
}: ContentSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Màu sắc và hiệu ứng dựa trên isDarkMode
  const accentColor = isDarkMode ? color.teal200 : color.teal600;
  const textColor = isDarkMode ? color.gray100 : color.gray800;
  const cardBgColor = isDarkMode ? color.gray800 : color.white;
  const dividerColor = isDarkMode ? color.gray600 : color.gray200;
  const highlightColor = isDarkMode ? color.teal900 : color.teal100;

  return (
    <Zoom in={true} style={{ transitionDelay: "100ms" }}>
      <Box
        component={Paper}
        elevation={0}
        sx={{
          bgcolor: cardBgColor,
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",
          boxShadow: isDarkMode
            ? "0 2px 5px rgba(0,0,0,0.15)"
            : "0 1px 3px rgba(0,0,0,0.05)",
          "&:hover": {
            boxShadow: isDarkMode
              ? "0 6px 12px rgba(0,0,0,0.25)"
              : "0 4px 10px rgba(0,0,0,0.15)",
            transform: "translateY(-2px)",
          },

          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            width: "6px",
            height: "50%",
            backgroundColor: accentColor,
            transition: "height 0.3s ease",
            zIndex: 2,
          },

          "&:hover::before": {
            height: "100%",
          },
        }}
      >
        {/* Hiệu ứng background accent */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `radial-gradient(circle at top right, ${highlightColor}, transparent 40%)`,
            opacity: 0.6,
            zIndex: 0,
          }}
        />

        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            pb: 1.5,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              mr: 1.5,
              color: accentColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: isDarkMode
                ? "rgba(20, 184, 166, 0.1)"
                : "rgba(20, 184, 166, 0.1)",
              borderRadius: "50%",
              p: 1,
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              "& svg": {
                fontSize: isMobile ? 24 : 28,
                color: accentColor,
              },
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            {icon}
          </Box>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            fontWeight="bold"
            sx={{
              color: isDarkMode ? color.teal200 : color.teal700,
              letterSpacing: "0.5px",
            }}
          >
            {title}
          </Typography>
        </Box>

        <Divider
          sx={{
            mb: 2.5,
            bgcolor: dividerColor,
            opacity: 0.7,
            position: "relative",
            zIndex: 1,
          }}
        />

        {/* Content Section */}
        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.8,
            color: textColor,
            px: { xs: 0.5, sm: 1 },
            position: "relative",
            zIndex: 1,
            fontSize: { xs: "0.95rem", sm: "1rem" },
            "& strong": {
              color: accentColor,
              fontWeight: 600,
            },
            "& em": {
              color: isDarkMode ? color.teal100 : color.teal800,
              fontStyle: "italic",
            },
          }}
        >
          {content}
        </Typography>
      </Box>
    </Zoom>
  );
}
