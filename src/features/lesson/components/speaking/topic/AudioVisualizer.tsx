import { Box, Typography, Alert, Tooltip, Fade } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useEffect, useRef } from "react";

interface AudioVisualizerProps {
  isRecording: boolean;
  audioLevel: number;
}

export default function AudioVisualizer({
  isRecording,
  audioLevel,
}: AudioVisualizerProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const barsCount = 60; // Increased number of bars for smoother animation
  const barValues = useRef<number[]>(Array(barsCount).fill(0));
  const prevAudioLevel = useRef<number>(audioLevel);

  // Parameters to adjust animation effects
  const animationSmoothingFactor = 0.15; // Animation transition speed (0-1)
  const barRandomizationFactor = 0.2; // Randomization level of bars (0-1)

  useEffect(() => {
    if (!isRecording || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    updateCanvasSize();

    const handleResize = () => {
      updateCanvasSize(); // Reset animation khi thay đổi kích thước
      cancelAnimationFrame(animationFrameRef.current);
      animate();
    };

    window.addEventListener("resize", handleResize);
    updateCanvasSize();

    // Target values for smooth motion
    let targetValues = Array(barsCount).fill(0);

    // Animation function
    const animate = () => {
      if (!ctx) return;

      // Smooth audio level changes
      prevAudioLevel.current += (audioLevel - prevAudioLevel.current) * 0.1;
      const smoothedAudioLevel = prevAudioLevel.current;

      // Clear canvas
      ctx.clearRect(
        0,
        0,
        canvas.width / (window.devicePixelRatio || 1),
        canvas.height / (window.devicePixelRatio || 1)
      );

      // Calculate bar width based on canvas width and gaps
      const canvasDisplayWidth = canvas.width / (window.devicePixelRatio || 1);
      const canvasDisplayHeight =
        canvas.height / (window.devicePixelRatio || 1);
      const barWidth = (canvasDisplayWidth - (barsCount - 1) * 2) / barsCount;
      const barMaxHeight = canvasDisplayHeight * 0.85;

      // Update target values with controlled randomization
      targetValues = targetValues.map((_, i) => {
        // Create wave effect with nearby bars having relatively similar heights
        const baseValue = smoothedAudioLevel / 100;
        const position = i / barsCount; // 0 to 1 based on position

        // Create wave effect with sin wave
        const waveEffect = Math.sin(Date.now() / 500 + i * 0.2) * 0.2 + 0.8;

        // Create peak effect in the middle
        const centerEffect = 1 - Math.abs(position - 0.5) * 0.5;

        // Combine effects with a bit of randomness
        return (
          baseValue *
          barMaxHeight *
          waveEffect *
          centerEffect *
          (1 - barRandomizationFactor + barRandomizationFactor * Math.random())
        );
      });

      // Smooth transition to target values
      barValues.current = barValues.current.map((val, i) => {
        return val + (targetValues[i] - val) * animationSmoothingFactor;
      });

      // Draw bars
      for (let i = 0; i < barsCount; i++) {
        const barHeight = barValues.current[i];
        const x = i * (barWidth + 2);
        const y = canvasDisplayHeight - barHeight;

        // Create gradient
        const gradient = ctx.createLinearGradient(x, y, x, canvasDisplayHeight);

        if (isDarkMode) {
          if (smoothedAudioLevel < 10) {
            gradient.addColorStop(0, color.teal600);
            gradient.addColorStop(1, color.teal800);
          } else if (smoothedAudioLevel < 30) {
            gradient.addColorStop(0, color.teal400);
            gradient.addColorStop(1, color.teal700);
          } else {
            gradient.addColorStop(0, color.teal300);
            gradient.addColorStop(1, color.teal600);
          }
        } else {
          if (smoothedAudioLevel < 10) {
            gradient.addColorStop(0, color.teal200);
            gradient.addColorStop(1, color.teal400);
          } else if (smoothedAudioLevel < 30) {
            gradient.addColorStop(0, color.teal300);
            gradient.addColorStop(1, color.teal600);
          } else {
            gradient.addColorStop(0, color.teal400);
            gradient.addColorStop(1, color.teal700);
          }
        }

        // Draw bar with rounded top corners
        const cornerRadius = Math.min(barWidth / 2, 4);

        // Only draw rounded corners if bar is tall enough
        if (barHeight > cornerRadius * 2) {
          ctx.beginPath();
          ctx.moveTo(x, canvasDisplayHeight);
          ctx.lineTo(x, y + cornerRadius);
          ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
          ctx.lineTo(x + barWidth - cornerRadius, y);
          ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + cornerRadius);
          ctx.lineTo(x + barWidth, canvasDisplayHeight);
          ctx.closePath();
          ctx.fillStyle = gradient;
          ctx.fill();
        } else {
          ctx.fillStyle = gradient;
          ctx.fillRect(x, y, barWidth, barHeight);
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [isRecording, audioLevel, isDarkMode, color]);

  // Calculate volume level indicator color
  const getVolumeIndicatorColor = () => {
    if (audioLevel < 10) {
      return isDarkMode ? color.red700 : color.red500;
    } else if (audioLevel < 30) {
      return isDarkMode ? color.yellow : color.warning;
    } else {
      return isDarkMode ? color.green700 : color.green500;
    }
  };

  // Calculate volume level text
  const getVolumeText = () => {
    if (audioLevel < 10) return "Low";
    if (audioLevel < 30) return "Medium";
    return "Good";
  };

  return (
    <Fade in={isRecording}>
      <Box
        sx={{
          margin: "0 auto",
          p: { xs: 1.5, sm: 2 }, // Smaller padding on mobile
          bgcolor: isDarkMode ? color.gray700 : color.gray200,
          borderRadius: 2,
          mb: 3,
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          transition: "all 0.3s ease",
          width: "95%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Stack vertically on mobile
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 1,
            gap: { xs: 1, sm: 0 }, // Add gap for mobile
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: isDarkMode ? color.gray300 : color.gray700,
              display: "flex",
              alignItems: "center",
              fontSize: { xs: "0.875rem", sm: "1rem" }, // Smaller font on mobile
            }}
          >
            Audio Level
            <Tooltip title="Ensure your microphone is recording clearly">
              <InfoOutlinedIcon
                fontSize="small"
                sx={{
                  ml: 1,
                  color: isDarkMode ? color.gray400 : color.gray500,
                }}
              />
            </Tooltip>
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: getVolumeIndicatorColor(),
                mr: 1,
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: isDarkMode ? color.gray300 : color.gray700,
              }}
            >
              {getVolumeText()} ({Math.round(audioLevel)})
            </Typography>
          </Box>
        </Box>

        {/* Canvas for visualization */}
        <Box
          sx={{
            mt: 2,
            mb: 2,
            height: { xs: 60, sm: 80, md: 100 }, // Smaller height on mobile devices
            width: "100%",
            bgcolor: isDarkMode ? color.gray800 : color.gray100,
            borderRadius: 1,
            overflow: "hidden",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
        </Box>

        {audioLevel < 10 && (
          <Alert
            severity="warning"
            variant="outlined"
            sx={{
              mt: 1,
              color: isDarkMode ? color.warningDarkMode : color.warning,
              borderColor: isDarkMode ? color.warningDarkMode : color.warning,
              bgcolor: isDarkMode
                ? "rgba(245, 158, 11, 0.1)"
                : "rgba(251, 191, 36, 0.1)",
              fontSize: { xs: "0.75rem", sm: "0.875rem" }, // Smaller font on mobile
              p: { xs: 0.5, sm: 1 }, // Smaller padding on mobile
            }}
          >
            Your microphone volume appears to be low. Try speaking louder or
            adjusting your microphone settings.
          </Alert>
        )}

        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Stack vertically on mobile
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: { xs: 1, sm: 0 }, // Add gap for mobile
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray600,
              fontSize: { xs: "0.7rem", sm: "0.75rem" }, // Smaller font on mobile
            }}
          >
            Speak clearly into your microphone
          </Typography>

          {/* Volume meter */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: { xs: "100%", sm: "auto" }, // Full width on mobile
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", sm: 150 }, // Full width on mobile
                height: 8,
                bgcolor: isDarkMode ? color.gray600 : color.gray300,
                borderRadius: 4,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: `${Math.min(audioLevel * 1.5, 100)}%`,
                  borderRadius: 4,
                  background: isDarkMode
                    ? `linear-gradient(to right, ${
                        color.teal700
                      }, ${getVolumeIndicatorColor()})`
                    : `linear-gradient(to right, ${
                        color.teal400
                      }, ${getVolumeIndicatorColor()})`,
                  transition: "width 0.2s ease-in-out",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}
