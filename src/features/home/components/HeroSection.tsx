import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Chip,
  Stack,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const mainImage =
    "https://images.unsplash.com/photo-1742603096268-0efc93dcc95a?q=80&w=2066&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const statistics = [
    { label: "Students", value: "1,200+" },
    { label: "Lessons", value: "800+" },
    { label: "Teachers", value: "500+" },
    { label: "Average Improvement", value: "35%" },
  ];

  const handleNavigation = (path: string) => () => {
    navigate(path);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: isDarkMode ? colors.gray800 : colors.teal50,
        color: isDarkMode ? colors.white : colors.gray900,
        overflow: "hidden",
        position: "relative",
        mt: 8,
        "&:hover": {
          boxShadow: 8,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box pt={isMobile ? 8 : 10} pb={6}>
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
                <Chip
                  label="Language Learning Platform"
                  size="small"
                  sx={{
                    mb: 2,
                    backgroundColor: isDarkMode
                      ? colors.teal800
                      : colors.teal100,
                    color: isDarkMode ? colors.teal200 : colors.teal700,
                    fontWeight: 600,
                    borderRadius: 1,
                  }}
                />

                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2.2rem", sm: "2.5rem", md: "3rem" },
                    mb: 2,
                    background: isDarkMode
                      ? `linear-gradient(135deg, ${colors.teal300}, ${colors.teal500})`
                      : `linear-gradient(135deg, ${colors.teal700}, ${colors.teal500})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1.2,
                  }}
                >
                  Master English with Confidence
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    color: isDarkMode ? colors.gray300 : colors.gray700,
                    fontSize: { xs: "1.1rem", md: "1.25rem" },
                    lineHeight: 1.6,
                    maxWidth: "90%",
                  }}
                >
                  Personalized learning paths, interactive lessons, and
                  real-time feedback to help you achieve your language goals.
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ mb: 4 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: colors.teal600,
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      "&:hover": {
                        backgroundColor: colors.teal700,
                        transform: "translateY(-2px)",
                        boxShadow: 4,
                      },
                      transition: "all 0.2s ease",
                    }}
                    onClick={handleNavigation("/routes")}
                  >
                    Start Learning
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: isDarkMode ? colors.teal400 : colors.teal600,
                      borderWidth: 2,
                      color: isDarkMode ? colors.teal400 : colors.teal600,
                      fontWeight: 600,
                      px: 3,
                      py: 1.5,
                      "&:hover": {
                        borderColor: isDarkMode
                          ? colors.teal300
                          : colors.teal700,
                        backgroundColor: isDarkMode
                          ? colors.teal900 + "20"
                          : colors.teal50 + "80",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.2s ease",
                    }}
                    onClick={handleNavigation("/test/mixings")}
                  >
                    Take Assessment
                  </Button>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  display: { xs: "none", md: "block" },
                  mx: "auto",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: -10,
                    left: -10,
                    right: 10,
                    bottom: 10,
                    borderRadius: 3,
                    border: `3px solid ${
                      isDarkMode ? colors.teal700 : colors.teal300
                    }`,
                    zIndex: 1,
                  }}
                />
                <Box
                  component="img"
                  src={mainImage}
                  alt="Learning English online"
                  sx={{
                    width: "100%",
                    borderRadius: 3,
                    objectFit: "cover",
                    objectPosition: "center",
                    boxShadow: `0 20px 40px ${
                      isDarkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.15)"
                    }`,
                    transform: "perspective(1000px) rotateY(-5deg)",
                    transition: "all 0.5s ease",
                    zIndex: 2,
                    position: "relative",
                    "&:hover": {
                      transform: "perspective(1000px) rotateY(0deg)",
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider
          sx={{
            my: 4,
            borderColor: isDarkMode ? colors.gray700 : colors.gray200,
          }}
        />

        <Box pb={6}>
          <Grid container spacing={2}>
            {statistics.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    textAlign: "center",
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 2,
                    backgroundColor: isDarkMode ? colors.gray700 : colors.white,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: isDarkMode
                        ? colors.gray900
                        : colors.teal50,
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      color: isDarkMode ? colors.teal300 : colors.teal600,
                      mb: 1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: isDarkMode ? colors.gray300 : colors.gray600,
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Paper>
  );
}
