import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { toeicCourses } from "../services/mockData";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface ToeicCourseCardProps {
  course: {
    id: number;
    title: string;
    image: string;
    description: string;
    duration: string;
    level: string;
  };
}

function ToeicCourseCard({ course }: ToeicCourseCardProps) {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: isDarkMode ? colors.gray800 : colors.white,
        color: isDarkMode ? colors.gray100 : colors.gray900,
        borderRadius: 2,
        overflow: "hidden",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 4,
        },
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={course.image}
        alt={course.title}
      />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h6"
          component="h3"
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          {course.title}
        </Typography>
        <Typography
          variant="body2"
          color={isDarkMode ? colors.gray300 : colors.gray700}
          sx={{ mb: 2 }}
        >
          {course.description}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography
            variant="body2"
            color={isDarkMode ? colors.gray400 : colors.gray600}
          >
            Duration: {course.duration}
          </Typography>
          <Typography
            variant="body2"
            color={isDarkMode ? colors.gray400 : colors.gray600}
          >
            Level: {course.level}
          </Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: "auto",
            backgroundColor: colors.teal600,
            "&:hover": {
              backgroundColor: colors.teal700,
            },
          }}
        >
          Enroll Now
        </Button>
      </CardContent>
    </Card>
  );
}

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
          <Grid item xs={12} md={5}>
            <Box sx={{ pr: { md: 4 } }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  color: isDarkMode ? colors.teal300 : colors.teal700,
                }}
              >
                TOEIC Preparation
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: isDarkMode ? colors.gray300 : colors.gray700,
                }}
              >
                Our specialized TOEIC preparation courses are designed to help
                you achieve your target score. From listening and reading to
                speaking and writing, we cover all aspects of the TOEIC exam.
              </Typography>

              <Box sx={{ mt: 4, display: { xs: "none", md: "block" } }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Why prepare with us?
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <Typography component="li" sx={{ mb: 1 }}>
                    Courses designed by TOEIC experts
                  </Typography>
                  <Typography component="li" sx={{ mb: 1 }}>
                    Full-length practice tests with detailed analytics
                  </Typography>
                  <Typography component="li" sx={{ mb: 1 }}>
                    Proven score improvement strategies
                  </Typography>
                  <Typography component="li" sx={{ mb: 1 }}>
                    Personalized study plans
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  sx={{
                    mt: 3,
                    borderColor: isDarkMode ? colors.teal400 : colors.teal600,
                    color: isDarkMode ? colors.teal400 : colors.teal600,
                    "&:hover": {
                      borderColor: isDarkMode ? colors.teal300 : colors.teal700,
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  Learn More About TOEIC
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Grid container spacing={3}>
              {toeicCourses.map((course) => (
                <Grid item key={course.id} xs={12} sm={6} md={6}>
                  <ToeicCourseCard course={course} />
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4, display: { xs: "block", md: "none" } }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Why prepare with us?
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" sx={{ mb: 1 }}>
                  Courses designed by TOEIC experts
                </Typography>
                <Typography component="li" sx={{ mb: 1 }}>
                  Full-length practice tests with detailed analytics
                </Typography>
                <Typography component="li" sx={{ mb: 1 }}>
                  Proven score improvement strategies
                </Typography>
                <Typography component="li" sx={{ mb: 1 }}>
                  Personalized study plans
                </Typography>
              </Box>

              <Button
                variant="outlined"
                fullWidth
                sx={{
                  mt: 3,
                  borderColor: isDarkMode ? colors.teal400 : colors.teal600,
                  color: isDarkMode ? colors.teal400 : colors.teal600,
                  "&:hover": {
                    borderColor: isDarkMode ? colors.teal300 : colors.teal700,
                    backgroundColor: "transparent",
                  },
                }}
              >
                Learn More About TOEIC
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
