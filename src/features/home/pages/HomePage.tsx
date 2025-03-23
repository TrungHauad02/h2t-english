import { Box } from "@mui/material";
import {
  FeaturesSection,
  HeroSection,
  LessonsSection,
  RoutesSection,
  TestsSection,
  CompetitionsSection,
  LeaderboardSection,
  ToeicSection,
  TestimonialsSection,
} from "../components";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import StudentHeader from "layouts/header/StudentHeader";
import Footer from "layouts/footer/Footer";

export default function HomePage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: isDarkMode ? color.gray900 : color.gray100,
        color: isDarkMode ? color.white : color.black,
        overflowX: "hidden",
      }}
    >
      <StudentHeader />
      <HeroSection />
      <FeaturesSection />
      <LessonsSection />
      <RoutesSection />
      <TestsSection />
      <CompetitionsSection />
      <LeaderboardSection />
      <ToeicSection />
      <TestimonialsSection />
      <Footer />
    </Box>
  );
}
