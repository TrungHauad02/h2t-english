import {
  Box,
  Typography,
  Stack,
  Fade,
  Grow,
  Slide,
  Paper,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import SchoolIcon from "@mui/icons-material/School";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import RouteIcon from "@mui/icons-material/Route";
import MapIcon from "@mui/icons-material/Map";

export default function Header() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 6,
        py: { xs: 3, md: 4 },
        px: { xs: 3, md: 5 },
        borderRadius: "24px",
        background: isDarkMode
          ? `linear-gradient(135deg, ${color.gray800}, ${color.gray900})`
          : `linear-gradient(135deg, ${color.white}, ${color.gray100})`,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        boxShadow: isDarkMode
          ? `0 10px 30px -10px ${color.black}40, 0 1px 2px ${color.teal700}30`
          : `0 20px 80px -20px ${color.gray400}40, 0 2px 4px ${color.teal200}50`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "5px",
          background: `linear-gradient(to right, ${color.teal400}, ${color.emerald500}, ${color.teal600})`,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: { xs: 50, md: 50 },
          right: { xs: -20, md: 40 },
          width: { xs: 80, md: 180 },
          height: { xs: 80, md: 180 },
          borderRadius: "50%",
          background: isDarkMode ? color.teal800 + "15" : color.teal200 + "30",
          zIndex: 0,
        }}
      />

      {/* Floating icons */}
      <Grow in timeout={1000}>
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: 10, md: 30 },
            right: { xs: 10, md: 80 },
            transform: "rotate(10deg)",
            opacity: 0.8,
          }}
        >
          <RouteIcon
            sx={{
              fontSize: { xs: 20, md: 28 },
              color: isDarkMode ? color.teal400 : color.teal600,
            }}
          />
        </Box>
      </Grow>

      <Grow in timeout={1400}>
        <Box
          sx={{
            position: "absolute",
            top: { xs: 20, md: 40 },
            right: { xs: 40, md: 160 },
            transform: "rotate(-5deg)",
            opacity: 0.6,
          }}
        >
          <MapIcon
            sx={{
              fontSize: { xs: 24, md: 32 },
              color: isDarkMode ? color.emerald400 : color.emerald600,
            }}
          />
        </Box>
      </Grow>

      <Grow in timeout={1200}>
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: 40, md: 60 },
            right: { xs: 50, md: 140 },
            transform: "rotate(15deg)",
            opacity: 0.7,
          }}
        >
          <LightbulbIcon
            sx={{
              fontSize: { xs: 20, md: 26 },
              color: isDarkMode ? color.green400 : color.green600,
            }}
          />
        </Box>
      </Grow>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 4, md: 5 }}
        alignItems={{ xs: "center", md: "center" }}
        sx={{ position: "relative", zIndex: 2 }}
      >
        <Slide direction="right" in timeout={800}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: 90, sm: 110 },
              height: { xs: 90, sm: 110 },
              borderRadius: "32%",
              background: `linear-gradient(135deg, ${
                isDarkMode ? color.teal600 : color.teal300
              }, ${isDarkMode ? color.teal800 : color.teal500})`,
              boxShadow: `0 12px 30px ${
                isDarkMode ? color.teal900 + "90" : color.teal500 + "40"
              }`,
              transform: "perspective(1000px) rotateY(-10deg) rotateX(5deg)",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform:
                  "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.05)",
              },
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "150%",
                height: "150%",
                background: `linear-gradient(45deg, transparent 30%, ${color.white}30 45%, transparent 50%)`,
                transform: "translateX(-200%) translateY(-200%)",
                animation: "shine 3s infinite 1s",
                "@keyframes shine": {
                  "0%": {
                    transform: "translateX(-200%) translateY(-200%)",
                  },
                  "100%": {
                    transform: "translateX(100%) translateY(100%)",
                  },
                },
              }}
            />
            <SchoolIcon sx={{ fontSize: { xs: 45, sm: 60 }, color: "white" }} />
          </Box>
        </Slide>

        <Box>
          <Fade in timeout={1000}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                color: isDarkMode ? color.teal300 : color.teal700,
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                textShadow: isDarkMode
                  ? `0 2px 4px ${color.black}40`
                  : `0 1px 2px ${color.gray400}40`,
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: "100%",
                  height: 4,
                  borderRadius: 2,
                  bgcolor: `linear-gradient(to right, ${color.teal500}, ${color.emerald400})`,
                  background: `linear-gradient(to right, ${color.teal500}, ${color.emerald400})`,
                  opacity: 0.8,
                },
              }}
            >
              Learning Routes
            </Typography>
          </Fade>

          <Fade in timeout={1400}>
            <Typography
              variant="subtitle1"
              sx={{
                color: isDarkMode ? color.gray300 : color.gray700,
                fontWeight: 400,
                maxWidth: "800px",
                lineHeight: 1.6,
                fontSize: { xs: "0.95rem", sm: "1.1rem" },
                mt: 1,
                position: "relative",
                zIndex: 2,
              }}
            >
              Explore our structured learning paths designed to help you build
              skills step by step. Each route contains a curated collection of
              lessons to guide your learning journey.
            </Typography>
          </Fade>
        </Box>
      </Stack>
    </Paper>
  );
}
