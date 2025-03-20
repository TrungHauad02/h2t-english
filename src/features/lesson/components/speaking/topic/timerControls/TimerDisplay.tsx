import { Box, Tooltip, Zoom } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { useRef, useState, useEffect } from "react";
import DigitalDisplay from "./DigitalDisplay";
import VisualDisplay from "./VisualDisplay";

interface TimerDisplayProps {
  timeDisplay: "digital" | "visual";
  toggleTimeDisplay: () => void;
  percentRemaining: number;
  minutes: number;
  seconds: number;
  isXs: boolean;
  isMd: boolean;
}

export default function TimerDisplay({
  timeDisplay,
  toggleTimeDisplay,
  percentRemaining,
  minutes,
  seconds,
  isXs,
  isMd,
}: TimerDisplayProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [pulseEffect, setPulseEffect] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (percentRemaining < 20) {
      setPulseEffect(true);
    } else {
      setPulseEffect(false);
    }
  }, [percentRemaining]);

  const getCirclePoints = () => {
    const radius = 50;
    const center = 60;
    const points = [];
    const totalPoints = 60;

    const visiblePoints = Math.floor((percentRemaining / 100) * totalPoints);

    for (let i = 0; i < totalPoints; i++) {
      const angle = (i / totalPoints) * 2 * Math.PI - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);

      points.push({
        x,
        y,
        visible: i < visiblePoints,
      });
    }

    return points;
  };

  const getTimerColor = () => {
    if (percentRemaining < 10) return color.red500;
    if (percentRemaining < 30) return color.warning;
    return isDarkMode ? color.emerald400 : color.emerald600;
  };

  const getBackgroundGlow = () => {
    if (percentRemaining < 10) {
      return {
        boxShadow: pulseEffect
          ? `0 0 20px 5px ${color.red500}80`
          : `0 0 10px 2px ${color.red500}40`,
        transition: "box-shadow 0.5s ease-in-out",
      };
    }
    if (percentRemaining < 30) {
      return {
        boxShadow: `0 0 10px 2px ${color.warning}40`,
      };
    }
    return {
      boxShadow: `0 0 10px 2px ${
        isDarkMode ? color.emerald400 + "40" : color.emerald600 + "40"
      }`,
    };
  };

  const timerSize = isXs ? 100 : isMd ? 110 : 120;
  const fontSizeDigital = isXs ? "h4" : "h3";
  const svgFontSize = isXs ? 16 : 18;
  const svgSubFontSize = isXs ? 8 : 10;

  return (
    <Tooltip
      title="Click to change display mode"
      placement="top"
      TransitionComponent={Zoom}
    >
      <Box
        onClick={toggleTimeDisplay}
        sx={{
          width: timerSize,
          height: timerSize,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          cursor: "pointer",
          background: isDarkMode
            ? `radial-gradient(circle, ${color.gray800} 0%, ${color.gray900} 100%)`
            : `radial-gradient(circle, ${color.white} 0%, ${color.gray100} 100%)`,
          ...getBackgroundGlow(),
          animation: pulseEffect
            ? "pulse-background 2s infinite ease-in-out"
            : "none",
          "@keyframes pulse-background": {
            "0%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.05)" },
            "100%": { transform: "scale(1)" },
          },
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          "&:hover": {
            transform: "scale(1.05)",
          },
          flexShrink: 0,
        }}
      >
        {timeDisplay === "digital" ? (
          <DigitalDisplay
            minutes={minutes}
            seconds={seconds}
            percentRemaining={percentRemaining}
            fontSizeDigital={fontSizeDigital}
            getTimerColor={getTimerColor}
          />
        ) : (
          <VisualDisplay
            timerSize={timerSize}
            svgRef={svgRef}
            getCirclePoints={getCirclePoints}
            getTimerColor={getTimerColor}
            minutes={minutes}
            seconds={seconds}
            percentRemaining={percentRemaining}
            svgFontSize={svgFontSize}
            svgSubFontSize={svgSubFontSize}
            pulseEffect={pulseEffect}
          />
        )}
      </Box>
    </Tooltip>
  );
}
