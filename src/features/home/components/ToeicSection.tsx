import { Box, Container, Grid } from "@mui/material";
import { toeicCourses } from "../services/mockData";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { ToeicCourseCard, ToeicTitle, ToeicContent } from "./toeic";

export default function ToeicSection() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: isDarkMode ? colors.gray800 : colors.white,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 200,
          height: 200,
          borderRadius: "50%",
          backgroundColor: isDarkMode
            ? `${colors.teal900}30`
            : `${colors.teal100}90`,
          zIndex: 0,
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={5}>
          <ToeicTitle />
          <Grid item xs={12} md={7}>
            <Grid container spacing={3}>
              {toeicCourses.map((course) => (
                <Grid item key={course.id} xs={12} sm={6} md={6}>
                  <ToeicCourseCard course={course} />
                </Grid>
              ))}
            </Grid>
            <ToeicContent />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
