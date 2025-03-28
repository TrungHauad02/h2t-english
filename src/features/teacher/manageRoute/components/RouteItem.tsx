import {
  Box,
  Typography,
  Button,
  Chip,
  Paper,
  IconButton,
  Tooltip,
  Slide,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Route } from "interfaces";
import useColor from "theme/useColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState, useEffect } from "react";

interface RouteItemProps {
  route: Route;
  onViewDetail: (id: number) => void;
  handleOpenDeleteDialog: (id: number) => void;
}

export default function RouteItem({
  route,
  onViewDetail,
  handleOpenDeleteDialog,
}: RouteItemProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Dynamic colors
  const primaryColor = isDarkMode ? color.teal400 : color.teal600;
  const bgColor = isDarkMode
    ? `linear-gradient(145deg, ${color.gray800}, ${color.gray900})`
    : `linear-gradient(145deg, ${color.white}, ${color.gray50})`;
  const cardBorder = isHovered
    ? `2px solid ${primaryColor}`
    : isDarkMode
    ? `2px solid ${color.gray700}`
    : `2px solid ${color.gray200}`;

  // Status colors
  const statusColors = {
    published: {
      dot: isDarkMode ? color.emerald400 : color.emerald500,
      text: isDarkMode ? color.emerald300 : color.emerald700,
      bg: isDarkMode ? color.gray700 : color.gray100,
    },
    unpublished: {
      dot: isDarkMode ? color.gray400 : color.gray500,
      text: isDarkMode ? color.gray300 : color.gray700,
      bg: isDarkMode ? color.gray700 : color.gray100,
    },
  };

  return (
    <Slide direction="up" in={isLoaded} mountOnEnter unmountOnExit>
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          maxWidth: 345,
          width: "100%",
          borderRadius: "16px",
          background: bgColor,
          border: cardBorder,
          overflow: "hidden",
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: isHovered ? "scale(1.02)" : "scale(1)",
          boxShadow: isHovered
            ? isDarkMode
              ? "0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.5)"
              : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            : isDarkMode
            ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)"
            : "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "6px",
            height: "100%",
            background: primaryColor,
            transform: isHovered ? "scaleY(1)" : "scaleY(0.7)",
            transformOrigin: "top",
            transition: "transform 0.3s ease",
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Bookmark indicator */}
        <Box
          sx={{
            position: "absolute",
            top: -6,
            right: 20,
            width: 0,
            height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: `20px solid ${primaryColor}`,
            transition: "transform 0.3s ease",
            transform: isHovered ? "translateY(6px)" : "translateY(0)",
          }}
        />

        {/* Image container with overlay */}
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <Box
            sx={{
              width: "100%",
              height: "180px",
              backgroundColor: isDarkMode ? color.gray800 : color.gray200,
              overflow: "hidden",
            }}
          >
            <img
              src={route.image}
              alt={route.title}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />
          </Box>
          {/* Image overlay */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "30%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
              opacity: isHovered ? 0.5 : 0.2,
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Status indicator */}
          <Box
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              display: "flex",
              alignItems: "center",
              borderRadius: "20px",
              padding: "4px 12px",
              backgroundColor: route.status
                ? statusColors.published.bg
                : statusColors.unpublished.bg,
              backdropFilter: "blur(4px)",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <FiberManualRecordIcon
              sx={{
                color: route.status
                  ? statusColors.published.dot
                  : statusColors.unpublished.dot,
                fontSize: "10px",
                mr: 0.7,
                animation: route.status ? "pulse 2s infinite" : "none",
                "@keyframes pulse": {
                  "0%": {
                    opacity: 1,
                  },
                  "50%": {
                    opacity: 0.5,
                  },
                  "100%": {
                    opacity: 1,
                  },
                },
              }}
            />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: route.status
                  ? statusColors.published.text
                  : statusColors.unpublished.text,
                fontSize: "0.7rem",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              {route.status ? "Published" : "Unpublished"}
            </Typography>
          </Box>
        </Box>

        {/* Content area */}
        <Box sx={{ p: 3, pb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              color: isDarkMode ? color.white : color.gray900,
              fontWeight: 700,
              fontSize: "1.1rem",
              lineHeight: 1.3,
              mb: 1.5,
              transition: "color 0.2s ease",
              position: "relative",
              display: "inline-block",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -4,
                left: 0,
                width: isHovered ? "100%" : "40%",
                height: "2px",
                background: primaryColor,
                transition: "width 0.3s ease",
              },
            }}
          >
            {route.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray300 : color.gray700,
              mb: 3,
              fontSize: "0.875rem",
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              height: "4em",
              transition: "color 0.2s ease",
            }}
          >
            {route.description}
          </Typography>

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "auto",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                variant="text"
                onClick={() => onViewDetail(route.id)}
                endIcon={<KeyboardArrowRightIcon />}
                sx={{
                  color: primaryColor,
                  fontWeight: 600,
                  textTransform: "none",
                  p: 0,
                  "&:hover": {
                    background: "transparent",
                    transform: "translateX(4px)",
                  },
                  transition: "transform 0.2s ease",
                }}
              >
                View details
              </Button>

              <Chip
                label={`${route.routeNodes?.length || 0} Nodes`}
                size="small"
                sx={{
                  height: 24,
                  backgroundColor: isDarkMode ? color.gray700 : color.gray100,
                  color: isDarkMode ? color.teal300 : color.teal700,
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  border: `1px solid ${
                    isDarkMode ? color.gray600 : color.gray200
                  }`,
                  "& .MuiChip-label": {
                    px: 1,
                  },
                }}
              />
            </Box>

            <Tooltip title="Delete" placement="top">
              <IconButton
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDeleteDialog(route.id);
                }}
                sx={{
                  color: isDarkMode ? color.red400 : color.red600,
                  "&:hover": {
                    backgroundColor: isDarkMode
                      ? "rgba(220, 38, 38, 0.1)"
                      : "rgba(220, 38, 38, 0.05)",
                    transform: "scale(1.1)",
                  },
                  transition: "transform 0.2s ease",
                }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>
    </Slide>
  );
}
