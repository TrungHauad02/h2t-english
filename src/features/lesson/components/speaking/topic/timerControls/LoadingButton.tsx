import { Box, Button } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function LoadingButton() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Button
      variant="contained"
      disabled
      sx={{
        bgcolor: isDarkMode ? color.gray700 : color.gray400,
        px: { xs: 2, sm: 3 },
        py: { xs: 1, sm: 1 },
        borderRadius: "24px",
        position: "relative",
        overflow: "hidden",
        fontSize: { xs: "0.75rem", sm: "0.875rem" },
        width: { xs: "100%", sm: "auto" },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background: `linear-gradient(to right, transparent 0%, ${
            isDarkMode ? color.gray600 : color.gray300
          } 50%, transparent 100%)`,
          animation: "loading-shimmer 1.5s infinite",
        },
        "@keyframes loading-shimmer": {
          "0%": { left: "-100%" },
          "100%": { left: "100%" },
        },
      }}
    >
      <Box
        sx={{
          width: { xs: 18, sm: 24 },
          height: { xs: 18, sm: 24 },
          borderRadius: "50%",
          border: "3px solid rgba(255,255,255,0.3)",
          borderTop: `3px solid ${isDarkMode ? color.white : color.white}`,
          animation: "spin 1s linear infinite",
          mr: 1.5,
          "@keyframes spin": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
        }}
      />
      Accessing...
    </Button>
  );
}
