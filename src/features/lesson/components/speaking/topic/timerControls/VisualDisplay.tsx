import { Box } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface VisualDisplayProps {
  timerSize: number;
  svgRef: React.RefObject<SVGSVGElement | null>;
  getCirclePoints: () => Array<{ x: number; y: number; visible: boolean }>;
  getTimerColor: () => string;
  minutes: number;
  seconds: number;
  percentRemaining: number;
  svgFontSize: number;
  svgSubFontSize: number;
  pulseEffect: boolean;
}

export default function VisualDisplay({
  timerSize,
  svgRef,
  getCirclePoints,
  getTimerColor,
  minutes,
  seconds,
  percentRemaining,
  svgFontSize,
  svgSubFontSize,
  pulseEffect,
}: VisualDisplayProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <svg
        ref={svgRef}
        width={timerSize}
        height={timerSize}
        viewBox="0 0 120 120"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <circle
          cx="60"
          cy="60"
          r="54"
          stroke={isDarkMode ? color.gray700 : color.gray300}
          strokeWidth="1"
          fill="none"
        />

        {getCirclePoints().map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={index % 5 === 0 ? 3 : 2}
            fill={
              point.visible
                ? getTimerColor()
                : isDarkMode
                ? color.gray700
                : color.gray300
            }
            opacity={point.visible ? 1 : 0.5}
            style={{
              transition: "fill 0.3s ease, opacity 0.3s ease",
              animation:
                pulseEffect && point.visible && index % 5 === 0
                  ? "pulse-points 2s infinite ease-in-out"
                  : "none",
            }}
          />
        ))}

        <text
          x="60"
          y="55"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={getTimerColor()}
          style={{
            fontSize: svgFontSize,
            fontWeight: "bold",
          }}
        >
          {`${minutes}:${seconds.toString().padStart(2, "0")}`}
        </text>

        <text
          x="60"
          y="75"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={isDarkMode ? color.gray400 : color.gray600}
          style={{
            fontSize: svgSubFontSize,
            opacity: 0.8,
          }}
        >
          {Math.round(percentRemaining)}% remaining
        </text>
      </svg>
    </Box>
  );
}
