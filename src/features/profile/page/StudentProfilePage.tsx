import { Box, Container } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import StudentProfile from "../components/StudentProfile";

export default function StudentProfilePage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        mt: 6,
        minHeight: "100vh",
        width: "100%",
        background: isDarkMode
          ? `linear-gradient(135deg, ${color.gray950} 0%, ${color.gray900} 50%, ${color.teal950} 100%)`
          : `linear-gradient(135deg, ${color.teal50} 0%, ${color.emerald50} 50%, ${color.green50} 100%)`,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDarkMode
            ? `radial-gradient(circle at 20% 80%, ${color.teal900}20 0%, transparent 50%), 
               radial-gradient(circle at 80% 20%, ${color.emerald900}20 0%, transparent 50%)`
            : `radial-gradient(circle at 20% 80%, ${color.teal200}40 0%, transparent 50%), 
               radial-gradient(circle at 80% 20%, ${color.emerald200}40 0%, transparent 50%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            pt: { xs: 4, md: 6 },
            pb: { xs: 4, md: 8 },
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <StudentProfile />
        </Box>
      </Container>
    </Box>
  );
}
