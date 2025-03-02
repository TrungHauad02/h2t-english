import { Box, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import ListRoute from "../components/ListRoute";

export default function ListRoutePage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const backgroundColor = isDarkMode ? color.gray800 : color.gray50;

  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        bgcolor: backgroundColor,
        p: 3,
      }}
    >
      {/* Tiêu đề trang */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: isDarkMode ? color.teal300 : color.teal500,
          fontWeight: "bold",
          mb: 4,
        }}
      >
        Learning Routes
      </Typography>

      <ListRoute />
    </Box>
  );
}
