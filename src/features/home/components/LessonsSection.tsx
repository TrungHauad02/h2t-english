import { Box, Container, Grid, Fade } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { LessonCard, useLessonsSection, LessonTitle, LessonButtonView, LessonFilter } from "./lesson";

export default function LessonsSection() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const hooks = useLessonsSection();

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        position: "relative",
        overflow: "hidden",
        background: isDarkMode
          ? `linear-gradient(to bottom, ${colors.gray800}, ${colors.gray900})`
          : `linear-gradient(to bottom, ${colors.gray100}, ${colors.gray50})`,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: { xs: "-5%", md: "-10%" },
          right: { xs: "-10%", md: "-5%" },
          width: { xs: "200px", md: "400px" },
          height: { xs: "200px", md: "400px" },
          borderRadius: "50%",
          background: isDarkMode
            ? `radial-gradient(circle, ${colors.teal900} 0%, ${colors.transparent} 70%)`
            : `radial-gradient(circle, ${colors.teal50} 0%, ${colors.transparent} 70%)`,
          opacity: 0.6,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in={hooks.animate} timeout={800}>
          <Box sx={{ mb: 5 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "flex-end" },
                mb: 3,
                gap: { xs: 2, sm: 0 },
              }}
            >
              <LessonTitle />
              <LessonButtonView />
            </Box>

            <LessonFilter
              animate={hooks.animate}
              filter={hooks.filter}
              handleFilterChange={hooks.handleFilterChange}
            />
          </Box>
        </Fade>

        <Grid container spacing={3}>
          {hooks.sortedLessons.map((lesson, index) => (
            <Grid item key={lesson.id} xs={12} sm={6} md={3}>
              <LessonCard
                lesson={lesson}
                index={index}
                isSelected={hooks.selectedLessonId === lesson.id}
                onSelect={hooks.setSelectedLessonId}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
