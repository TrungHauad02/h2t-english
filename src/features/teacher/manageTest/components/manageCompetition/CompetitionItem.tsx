import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Paper,
  IconButton,
  Tooltip,
  Slide,
  alpha,
  Divider,
  Stack,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EventIcon from "@mui/icons-material/Event";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { CompetitionTest } from "interfaces";
import { useNavigate } from "react-router-dom";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { format } from "date-fns";

interface CompetitionItemProps {
  competition: CompetitionTest;
  handleOpenDeleteDialog: (id: number) => void;
}

export default function CompetitionItem({
  competition,
  handleOpenDeleteDialog,
}: CompetitionItemProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  
  const getStatusColor = () => {
    const now = new Date();
    
    // If competition hasn't started yet
    if (new Date(competition.startTime) > now) {
      return {
        badge: {
          bg: isDarkMode ? alpha(color.teal700, 0.3) : alpha(color.teal100, 0.7),
          text: isDarkMode ? color.teal300 : color.teal800,
          label: "Upcoming",
        },
        dot: isDarkMode ? color.teal400 : color.teal500,
        text: isDarkMode ? color.teal300 : color.teal700,
        accentColor: isDarkMode ? color.teal400 : color.teal600,
      };
    }
    
    // If competition is active
    if (new Date(competition.startTime) <= now && new Date(competition.endTime) >= now) {
      return {
        badge: {
          bg: isDarkMode ? alpha(color.emerald700, 0.3) : alpha(color.emerald100, 0.7),
          text: isDarkMode ? color.emerald300 : color.emerald800,
          label: "Active",
        },
        dot: isDarkMode ? color.emerald400 : color.emerald500,
        text: isDarkMode ? color.emerald300 : color.emerald700,
        accentColor: isDarkMode ? color.emerald400 : color.emerald600,
      };
    }
    
    // If competition has ended
    return {
      badge: {
        bg: isDarkMode ? alpha(color.gray700, 0.3) : alpha(color.gray200, 0.7),
        text: isDarkMode ? color.gray300 : color.gray800,
        label: "Past",
      },
      dot: isDarkMode ? color.gray400 : color.gray500,
      text: isDarkMode ? color.gray300 : color.gray700,
      accentColor: isDarkMode ? color.gray400 : color.gray600,
    };
  };

  // Get publish status colors
  const getPublishStatusColors = () => {
    if (competition.status) {
      return {
        bg: isDarkMode ? alpha(color.emerald700, 0.3) : alpha(color.emerald100, 0.7),
        text: isDarkMode ? color.emerald300 : color.emerald800,
        icon: <VisibilityIcon fontSize="small" sx={{ fontSize: '14px' }} />,
        label: "Published",
      };
    } else {
      return {
        bg: isDarkMode ? alpha(color.gray700, 0.3) : alpha(color.gray200, 0.7),
        text: isDarkMode ? color.gray400 : color.gray600,
        icon: <VisibilityOffIcon fontSize="small" sx={{ fontSize: '14px' }} />,
        label: "Unpublished",
      };
    }
  };

  const statusColors = getStatusColor();
  const publishStatusColors = getPublishStatusColors();
  
  const formatDate = (date: Date) => {
    return format(new Date(date), "MMM dd, yyyy - HH:mm");
  };

  const handleViewDetail = () => {
    navigate(`/teacher/competitions/${competition.id}`);
  };

  // Dynamic colors
  const bgColor = isDarkMode
    ? `linear-gradient(145deg, ${color.gray800}, ${color.gray900})`
    : `linear-gradient(145deg, ${color.white}, ${color.gray50})`;
  const cardBorder = isHovered
    ? `2px solid ${statusColors.accentColor}`
    : isDarkMode
    ? `2px solid ${color.gray700}`
    : `2px solid ${color.gray200}`;

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
            background: statusColors.accentColor,
            transform: isHovered ? "scaleY(1)" : "scaleY(0.7)",
            transformOrigin: "top",
            transition: "transform 0.3s ease",
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: -6,
            right: 20,
            width: 0,
            height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: `20px solid ${statusColors.accentColor}`,
            transition: "transform 0.3s ease",
            transform: isHovered ? "translateY(6px)" : "translateY(0)",
          }}
        />

        <Box sx={{ p: 3, pt: 2.5 }}>
          {/* Status badges at the top */}
          <Stack 
            direction="row" 
            spacing={1.5} 
            sx={{ 
              mb: 1.5,
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1
            }}
          >
            {/* Time-based status chip */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "20px",
                padding: "4px 12px",
                backgroundColor: statusColors.badge.bg,
                backdropFilter: "blur(4px)",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <FiberManualRecordIcon
                sx={{
                  color: statusColors.dot,
                  fontSize: "10px",
                  mr: 0.7,
                  animation: statusColors.badge.label === "Active" ? "pulse 2s infinite" : "none",
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
                  color: statusColors.badge.text,
                  fontSize: "0.7rem",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                {statusColors.badge.label}
              </Typography>
            </Box>

            {/* Publish status chip */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "20px",
                padding: "4px 12px",
                backgroundColor: publishStatusColors.bg,
                backdropFilter: "blur(4px)",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <Box component="span" sx={{ mr: 0.7, display: "flex", alignItems: "center" }}>
                {publishStatusColors.icon}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  color: publishStatusColors.text,
                  fontSize: "0.7rem",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                {publishStatusColors.label}
              </Typography>
            </Box>

            {/* Duration chip */}
            <Chip
              label={`${competition.duration} min`}
              size="small"
              sx={{
                height: 24,
                backgroundColor: isDarkMode ? alpha(color.gray700, 0.5) : alpha(color.gray100, 0.8),
                color: statusColors.badge.text,
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
          </Stack>

          <Typography
            variant="h6"
            sx={{
              color: isDarkMode ? color.white : color.gray900,
              fontWeight: 700,
              fontSize: "1.1rem",
              lineHeight: 1.3,
              mb: 1.5,
              mt: 1,
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
                background: statusColors.accentColor,
                transition: "width 0.3s ease",
              },
            }}
          >
            {competition.title}
          </Typography>

          <Divider 
            sx={{ 
              mb: 2, 
              mt: 2, 
              borderColor: isDarkMode ? color.gray700 : color.gray200,
              opacity: 0.5
            }} 
          />

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <EventIcon
                fontSize="small"
                sx={{ color: isDarkMode ? color.teal400 : color.teal600 }}
              />
              <Typography
                variant="body2"
                sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
              >
                Start: {formatDate(competition.startTime)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <EventIcon
                fontSize="small"
                sx={{ color: isDarkMode ? color.red400 : color.red600 }}
              />
              <Typography
                variant="body2"
                sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
              >
                End: {formatDate(competition.endTime)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <AccessTimeIcon
                fontSize="small"
                sx={{ color: isDarkMode ? color.emerald400 : color.emerald600 }}
              />
              <Typography
                variant="body2"
                sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
              >
                Duration: {competition.duration} minutes
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <HelpOutlineIcon
                fontSize="small"
                sx={{ color: isDarkMode ? color.emerald400 : color.emerald600 }}
              />
              <Typography
                variant="body2"
                sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
              >
                Questions: {competition.totalQuestions || 0}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "auto",
            }}
          >
            <Button
              variant="text"
              onClick={handleViewDetail}
              endIcon={<KeyboardArrowRightIcon />}
              sx={{
                color: statusColors.accentColor,
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

            <Tooltip title="Delete" placement="top">
              <IconButton
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDeleteDialog(competition.id);
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