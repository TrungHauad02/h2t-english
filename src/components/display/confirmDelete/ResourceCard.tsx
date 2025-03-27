import React from "react";
import { Box, Divider, Slide, Typography, alpha } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { StyleProps } from "./types";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface ResourceCardProps extends StyleProps {
  animateWarning: boolean;
  resourceName: string;
  description: string;
  countdown: number;
  renderPaperShreds: () => React.ReactNode[];
  renderDestructionParticles: () => React.ReactNode[];
}

export default function ResourceCard({
  animateWarning,
  resourceName,
  description,
  countdown,
  renderPaperShreds,
  renderDestructionParticles,
  paperShredding,
}: ResourceCardProps) {
  const colors = useColor();
  const { isDarkMode } = useDarkMode();
  const textColor = isDarkMode ? colors.gray100 : colors.gray800;
  const secondaryTextColor = isDarkMode ? colors.gray400 : colors.gray600;

  return (
    <Slide direction="up" in={animateWarning} timeout={400}>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          perspective: "1000px",
          transformStyle: "preserve-3d",
          my: 2,
        }}
      >
        {/* Paper shredding effect overlay */}
        {paperShredding && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              overflow: "hidden",
              zIndex: 2,
            }}
          >
            {renderPaperShreds()}
          </Box>
        )}

        <Box
          sx={{
            p: 3,
            backgroundColor: isDarkMode
              ? alpha(colors.gray800, 0.7)
              : alpha(colors.gray100, 0.7),
            borderRadius: "8px",
            backdropFilter: "blur(10px)",
            border: `1px solid ${isDarkMode ? colors.gray700 : colors.gray300}`,
            position: "relative",
            transition: "all 0.5s ease",
            transform: paperShredding ? "rotateX(10deg)" : "rotateX(0)",
            transformStyle: "preserve-3d",
            boxShadow: `0 10px 25px -5px ${
              isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"
            }`,
            overflow: "hidden",
          }}
        >
          {/* Resource Name with Glitch Effect on Delete */}
          <Typography
            variant="h6"
            sx={{
              color: colors.red600,
              fontWeight: 600,
              textAlign: "center",
              mb: 2,
              position: "relative",
              "&::before": paperShredding
                ? {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(90deg, transparent 0%, ${alpha(
                      colors.red500,
                      0.8
                    )} 20%, transparent 20.1%, transparent)`,
                    animation: "glitch 1s infinite",
                    "@keyframes glitch": {
                      "0%": { transform: "translateX(-100%)" },
                      "100%": { transform: "translateX(100%)" },
                    },
                  }
                : {},
              animation: paperShredding ? "textGlitch 0.3s infinite" : "none",
              "@keyframes textGlitch": {
                "0%": { transform: "none", opacity: 1 },
                "7%": {
                  transform: "skew(-0.5deg, -0.9deg)",
                  opacity: 0.75,
                },
                "10%": { transform: "none", opacity: 1 },
                "27%": { transform: "none", opacity: 1 },
                "30%": {
                  transform: "skew(0.8deg, -0.1deg)",
                  opacity: 0.75,
                },
                "35%": { transform: "none", opacity: 1 },
                "52%": { transform: "none", opacity: 1 },
                "55%": {
                  transform: "skew(-1deg, 0.2deg)",
                  opacity: 0.75,
                },
                "60%": { transform: "none", opacity: 1 },
                "72%": { transform: "none", opacity: 1 },
                "75%": {
                  transform: "skew(0.4deg, 1deg)",
                  opacity: 0.75,
                },
                "80%": { transform: "none", opacity: 1 },
                "100%": { transform: "none", opacity: 1 },
              },
            }}
          >
            {resourceName}
          </Typography>

          <Divider
            sx={{
              mb: 2,
              borderColor: isDarkMode
                ? alpha(colors.gray600, 0.5)
                : alpha(colors.gray400, 0.5),
              opacity: paperShredding ? 0.5 : 1,
            }}
          />

          {/* Warning Message Box */}
          <Box
            sx={{
              px: 2,
              py: 2,
              backgroundColor: isDarkMode
                ? alpha(colors.gray900, 0.5)
                : alpha(colors.gray200, 0.5),
              borderLeft: `4px solid ${colors.red500}`,
              borderRadius: "4px",
              mb: 2,
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease",
              filter: paperShredding ? "blur(2px)" : "none",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                mb: 1,
              }}
            >
              <WarningAmberIcon
                fontSize="small"
                sx={{
                  mr: 1,
                  color: isDarkMode ? colors.warningDarkMode : colors.warning,
                  mt: 0.3,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: secondaryTextColor,
                  fontWeight: 500,
                  lineHeight: 1.5,
                }}
              >
                {description}
              </Typography>
            </Box>
          </Box>

          {/* Countdown Timer (shown during deletion) */}
          {paperShredding && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                backgroundColor: alpha(
                  isDarkMode ? colors.gray900 : colors.white,
                  0.7
                ),
                backdropFilter: "blur(4px)",
                zIndex: 10,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: colors.red600,
                  fontWeight: 700,
                  animation: "pulseFade 1s infinite",
                  "@keyframes pulseFade": {
                    "0%, 100%": { opacity: 1, transform: "scale(1)" },
                    "50%": { opacity: 0.7, transform: "scale(1.1)" },
                  },
                }}
              >
                {countdown}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: textColor,
                  mt: 1,
                }}
              >
                Deleting...
              </Typography>
            </Box>
          )}
        </Box>

        {renderDestructionParticles()}
      </Box>
    </Slide>
  );
}
