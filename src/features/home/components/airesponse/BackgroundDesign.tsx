import { Box } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function BackgroundDesign() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <>
      {/* Animated circles */}
      <Box
        sx={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color.teal500}15 0%, transparent 70%)`,
          top: "-300px",
          right: "-200px",
          animation: "float 20s infinite ease-in-out",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-50px)" },
          },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color.emerald500}10 0%, transparent 70%)`,
          bottom: "-400px",
          left: "-300px",
          animation: "float 25s infinite ease-in-out reverse",
        }}
      />

      {/* Grid pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: isDarkMode
            ? `linear-gradient(${color.gray800}05 1px, transparent 1px), linear-gradient(90deg, ${color.gray800}05 1px, transparent 1px)`
            : `linear-gradient(${color.gray300}05 1px, transparent 1px), linear-gradient(90deg, ${color.gray300}05 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          opacity: 0.5,
        }}
      />
    </>
  );
}
