import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface ErrorProps {
  errorCode?: number;
  errorMessage?: string;
}

export default function ErrorPage({
  errorCode = 404,
  errorMessage = "Oops! The page you're looking for seems to have gone on a language adventure.",
}: ErrorProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const backgroundColor = isDarkMode ? color.gray900 : color.gray50;
  const textColor = isDarkMode ? color.gray100 : color.gray800;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const paperBg = isDarkMode ? color.gray800 : color.white;
  const buttonColor = isDarkMode ? color.teal300 : color.teal600;
  const buttonHoverColor = isDarkMode ? color.teal200 : color.teal700;

  const words = [
    "Vocabulary",
    "Grammar",
    "Listening",
    "Reading",
    "Writing",
    "Speaking",
  ];

  return (
    <Box
      sx={{
        backgroundColor,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                height: isMobile ? "200px" : "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Floating English words background */}
              {words.map((word, index) => (
                <Typography
                  key={index}
                  variant="h6"
                  sx={{
                    position: "absolute",
                    color: `${accentColor}${isDarkMode ? "40" : "20"}`,
                    opacity: 0.7,
                    top: `${Math.random() * 80}%`,
                    left: `${Math.random() * 80}%`,
                    transform: `rotate(${Math.random() * 40 - 20}deg)`,
                    fontSize: `${Math.random() * 1.5 + 1}rem`,
                    fontWeight: "bold",
                    zIndex: 1,
                  }}
                >
                  {word}
                </Typography>
              ))}

              {/* Error code */}
              <Typography
                variant={isMobile ? "h1" : "h1"}
                component="h1"
                sx={{
                  fontSize: isMobile ? "8rem" : "15rem",
                  fontWeight: 900,
                  color: accentColor,
                  textShadow: `3px 3px 0px ${
                    isDarkMode ? color.teal700 : color.teal200
                  }`,
                  position: "relative",
                  zIndex: 2,
                  textAlign: "center",
                  lineHeight: 0.9,
                }}
              >
                {errorCode}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={4}
              sx={{
                backgroundColor: paperBg,
                padding: 4,
                borderRadius: 2,
                position: "relative",
                overflow: "hidden",
                border: `1px solid ${accentColor}`,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "5px",
                  height: "100%",
                  backgroundColor: accentColor,
                },
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                  color: accentColor,
                  fontWeight: 700,
                }}
              >
                Page Not Found
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  color: textColor,
                  fontSize: "1.1rem",
                  mb: 3,
                }}
              >
                {errorMessage}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: textColor,
                  mb: 4,
                }}
              >
                Don't worry! At H2T English, we believe every mistake is a
                learning opportunity. Let's navigate back to your language
                journey.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: buttonColor,
                    "&:hover": {
                      backgroundColor: buttonHoverColor,
                    },
                    fontWeight: 600,
                    px: 3,
                  }}
                  onClick={() => (window.location.href = "/")}
                >
                  Go to Homepage
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: buttonColor,
                    color: buttonColor,
                    "&:hover": {
                      borderColor: buttonHoverColor,
                      color: buttonHoverColor,
                      backgroundColor: isDarkMode
                        ? "rgba(94, 234, 212, 0.08)"
                        : "rgba(14, 148, 136, 0.08)",
                    },
                    fontWeight: 600,
                  }}
                  onClick={() => window.history.back()}
                >
                  Go Back
                </Button>
              </Box>

              <Box
                sx={{
                  mt: 5,
                  py: 2,
                  borderTop: `1px solid ${
                    isDarkMode ? color.gray700 : color.gray200
                  }`,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? color.gray400 : color.gray600,
                    fontStyle: "italic",
                  }}
                >
                  "The greatest glory in living lies not in never falling, but
                  in rising every time we fall." - Nelson Mandela
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* English vocabulary illustrations */}
        <Box
          sx={{
            mt: 6,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {["404", "ERROR", "LOST", "RETRY"].map((word, index) => (
            <Paper
              key={index}
              sx={{
                py: 1,
                px: 2,
                backgroundColor: isDarkMode ? color.gray800 : color.gray100,
                border: `1px dashed ${accentColor}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `rotate(${Math.random() * 6 - 3}deg)`,
              }}
            >
              <Typography
                sx={{
                  color: accentColor,
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                {word}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? color.gray400 : color.gray600,
                  fontSize: "0.7rem",
                }}
              >
                {index === 0 && "/fɔːr oʊ fɔːr/"}
                {index === 1 && "/ˈerər/"}
                {index === 2 && "/lɔːst/"}
                {index === 3 && "/riˈtraɪ/"}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
