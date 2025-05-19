import React from "react";
import { Box, Typography, Tooltip, Badge, Fade } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { styled } from "@mui/material/styles";

interface ProgressBadgeProps {
  progress: number;
  total: number;
  size?: "small" | "medium" | "large";
  showLabel?: boolean;
  showPercentage?: boolean;
}

const RotatingBadge = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  animation: "float 3s ease-in-out infinite",
  "@keyframes float": {
    "0%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-5px)" },
    "100%": { transform: "translateY(0px)" },
  },
}));

export default function ProgressBadge({
  progress,
  total,
  size = "medium",
  showLabel = true,
  showPercentage = true,
}: ProgressBadgeProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const percentage = total > 0 ? Math.round((progress / total) * 100) : 0;

  // Sizing configurations
  const sizeConfig = {
    small: {
      badgeSize: 40,
      iconSize: "small",
      fontSize: "0.75rem",
      fontWeight: 600,
    },
    medium: {
      badgeSize: 60,
      iconSize: "medium",
      fontSize: "0.875rem",
      fontWeight: 600,
    },
    large: {
      badgeSize: 80,
      iconSize: "large",
      fontSize: "1rem",
      fontWeight: 700,
    },
  };

  const config = sizeConfig[size];

  // Badge configurations based on completion percentage
  const getBadgeConfig = () => {
    if (percentage === 0) {
      return {
        icon: (
          <EmojiEventsIcon
            fontSize={config.iconSize as "small" | "medium" | "large"}
          />
        ),
        color: isDarkMode ? color.gray500 : color.gray400,
        borderColor: isDarkMode ? color.gray600 : color.gray300,
        glowColor: "transparent",
        label: "Not Started",
        tooltip: "Start your learning journey!",
      };
    } else if (percentage < 25) {
      return {
        icon: (
          <EmojiEventsIcon
            fontSize={config.iconSize as "small" | "medium" | "large"}
          />
        ),
        color: isDarkMode ? color.teal600 : color.teal500,
        borderColor: isDarkMode ? color.teal700 : color.teal400,
        glowColor: isDarkMode ? color.teal600 + "40" : color.teal500 + "30",
        label: "Beginner",
        tooltip: "You've started your learning journey!",
      };
    } else if (percentage < 50) {
      return {
        icon: (
          <StarIcon
            fontSize={config.iconSize as "small" | "medium" | "large"}
          />
        ),
        color: isDarkMode ? color.teal500 : color.teal400,
        borderColor: isDarkMode ? color.teal600 : color.teal300,
        glowColor: isDarkMode ? color.teal500 + "50" : color.teal400 + "40",
        label: "Learning",
        tooltip: "You're making good progress!",
      };
    } else if (percentage < 75) {
      return {
        icon: (
          <MilitaryTechIcon
            fontSize={config.iconSize as "small" | "medium" | "large"}
          />
        ),
        color: isDarkMode ? color.emerald500 : color.emerald400,
        borderColor: isDarkMode ? color.emerald600 : color.emerald300,
        glowColor: isDarkMode
          ? color.emerald500 + "60"
          : color.emerald400 + "50",
        label: "Advanced",
        tooltip: "You're becoming proficient!",
      };
    } else if (percentage < 100) {
      return {
        icon: (
          <WorkspacePremiumIcon
            fontSize={config.iconSize as "small" | "medium" | "large"}
          />
        ),
        color: isDarkMode ? color.emerald400 : color.emerald500,
        borderColor: isDarkMode ? color.emerald500 : color.emerald400,
        glowColor: isDarkMode
          ? color.emerald400 + "70"
          : color.emerald500 + "60",
        label: "Expert",
        tooltip: "Almost there! Keep going!",
      };
    } else {
      return {
        icon: (
          <WorkspacePremiumIcon
            fontSize={config.iconSize as "small" | "medium" | "large"}
          />
        ),
        color: isDarkMode ? color.emerald300 : color.emerald600,
        borderColor: isDarkMode ? color.emerald400 : color.emerald500,
        glowColor: isDarkMode
          ? color.emerald300 + "80"
          : color.emerald600 + "70",
        label: "Mastered",
        tooltip: "Congratulations! You've mastered this course!",
      };
    }
  };

  const badgeConfig = getBadgeConfig();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Tooltip title={badgeConfig.tooltip} arrow>
        <Box>
          <RotatingBadge>
            <Box
              sx={{
                position: "relative",
                width: config.badgeSize,
                height: config.badgeSize,
                borderRadius: "50%",
                backgroundColor: isDarkMode ? color.gray800 : color.white,
                border: `2px solid ${badgeConfig.borderColor}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: badgeConfig.color,
                boxShadow:
                  badgeConfig.glowColor !== "transparent"
                    ? `0 0 15px ${badgeConfig.glowColor}`
                    : "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow:
                    badgeConfig.glowColor !== "transparent"
                      ? `0 0 20px ${badgeConfig.glowColor}`
                      : "none",
                },
              }}
            >
              {badgeConfig.icon}

              {/* Show percentage inside the badge for medium and large sizes */}
              {showPercentage && size !== "small" && (
                <Fade in={true}>
                  <Badge
                    badgeContent={`${percentage}%`}
                    color="primary"
                    sx={{
                      position: "absolute",
                      bottom: -8,
                      right: -8,
                      "& .MuiBadge-badge": {
                        backgroundColor: badgeConfig.color,
                        color: isDarkMode ? color.gray900 : color.white,
                        fontWeight: "bold",
                        fontSize: "0.7rem",
                        minWidth: 30,
                        height: 20,
                      },
                    }}
                  />
                </Fade>
              )}
            </Box>
          </RotatingBadge>
        </Box>
      </Tooltip>

      {/* Show label below the badge */}
      {showLabel && (
        <Fade in={true}>
          <Box sx={{ mt: 1, textAlign: "center" }}>
            <Typography
              variant="body2"
              sx={{
                color: badgeConfig.color,
                fontWeight: config.fontWeight,
                fontSize: config.fontSize,
              }}
            >
              {badgeConfig.label}
            </Typography>

            {/* Show percentage below for small size */}
            {showPercentage && size === "small" && (
              <Typography
                variant="caption"
                sx={{
                  color: isDarkMode ? color.gray400 : color.gray600,
                  display: "block",
                }}
              >
                {`${percentage}% Complete`}
              </Typography>
            )}
          </Box>
        </Fade>
      )}
    </Box>
  );
}
