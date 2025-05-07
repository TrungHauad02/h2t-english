import { Box, alpha } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface ErrorCodeDisplayProps {
  errorCode: string;
}

export default function ErrorCodeDisplay({ errorCode }: ErrorCodeDisplayProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      component="span"
      sx={{
        display: "inline-block",
        backgroundColor: isDarkMode
          ? alpha(color.teal700, 0.3)
          : alpha(color.teal50, 0.7),
        border: `1px solid ${
          isDarkMode ? alpha(color.teal600, 0.3) : color.teal100
        }`,
        borderRadius: "4px",
        padding: "2px 6px",
        width: "fit-content",
        color: isDarkMode ? color.teal300 : color.teal700,
        fontFamily: "monospace",
        fontWeight: 600,
        fontSize: "0.875rem",
      }}
    >
      {errorCode}
    </Box>
  );
}
