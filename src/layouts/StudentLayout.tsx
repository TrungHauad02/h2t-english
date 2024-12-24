import { Outlet } from "react-router-dom";
import StudentHeader from "./header/StudentHeader";
import Footer from "./footer/Footer";
import { Box } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export default function StudentLayout() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 4 },
        bgcolor: isDarkMode ? color.gray900 : color.gray100,
      }}
    >
      <StudentHeader />
      <Outlet />
      <Footer />
    </Box>
  );
}
