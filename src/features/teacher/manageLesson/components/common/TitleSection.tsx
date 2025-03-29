import {
  Box,
  Typography,
  Paper,
  Zoom,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface TitleSectionProps {
  title: string;
}

export default function TitleSection({ title }: TitleSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const accentColor = isDarkMode ? color.teal200 : color.teal700;
  const cardBgColor = isDarkMode ? color.gray800 : color.white;
  const shadowColor = isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)";

  return (
    <Zoom in={true} style={{ transitionDelay: "50ms" }}>
      <Box
        component={Paper}
        elevation={0}
        sx={{
          bgcolor: cardBgColor,
          p: { xs: 2.5, sm: 3, md: 4 },
          borderRadius: 3,
          boxShadow: `0 3px 8px ${shadowColor}`,
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",

          "&:hover": {
            boxShadow: `0 8px 16px ${shadowColor}`,
            transform: "translateY(-3px)",
          },

          // Top accent border
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "10%",
            width: "80%",
            height: "4px",
            background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
            opacity: 0.8,
            transition: "all 0.3s ease",
          },

          "&:hover::before": {
            width: "100%",
            left: "0%",
            opacity: 1,
          },

          // Background pattern
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: isDarkMode
              ? `radial-gradient(${color.teal900} 1px, transparent 1px)`
              : `radial-gradient(${color.teal100} 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
            opacity: 0.08,
            zIndex: 0,
            transition: "opacity 0.3s ease",
          },

          "&:hover::after": {
            opacity: 0.15,
          },
        }}
      >
        <Typography
          variant={isMobile ? "h6" : isTablet ? "h5" : "h4"}
          component="h1"
          fontWeight="bold"
          sx={{
            color: accentColor,
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textShadow: isDarkMode ? "0 2px 4px rgba(0,0,0,0.3)" : "none",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            padding: { xs: "0.5rem 0.5rem", sm: "0.5rem 1.5rem" },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: "25%",
              width: "50%",
              height: "2px",
              backgroundColor: isDarkMode ? color.teal700 : color.teal200,
              opacity: 0,
              transition: "all 0.3s ease",
            },
            "&:hover::after": {
              opacity: 0.7,
              left: "15%",
              width: "70%",
            },
          }}
        >
          {title}
        </Typography>
      </Box>
    </Zoom>
  );
}
