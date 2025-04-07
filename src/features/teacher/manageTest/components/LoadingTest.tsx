import { CircularProgress, Stack } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function LoadingTest() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 6, minHeight: "60vh" }}
    >
      <CircularProgress
        size={40}
        sx={{ color: isDarkMode ? color.emerald400 : color.emerald600 }}
      />
    </Stack>
  );
}
