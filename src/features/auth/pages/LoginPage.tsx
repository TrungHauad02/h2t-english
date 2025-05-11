import {
  Box,
  Container,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LoginForm from "../components/LoginForm";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export default function LoginPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const imgLogin =
    "http://138.2.91.94:9000/h2t-english/static%2FLoginBG-removebg-preview.png";
  const wavyBgPattern = isDarkMode ? "/wavy-bg-dark.svg" : "/wavy-bg-light.svg";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: isDarkMode
          ? `linear-gradient(135deg, ${color.gray900}, ${color.gray800})`
          : `linear-gradient(135deg, ${color.teal50}, ${color.emerald100})`,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${wavyBgPattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
          zIndex: 0,
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: { xs: 4, md: 8 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Paper
          elevation={16}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            background: "transparent",
            backdropFilter: "blur(10px)",
            backgroundColor: isDarkMode
              ? `${color.gray800}80`
              : `${color.white}80`,
            border: `1px solid ${isDarkMode ? color.gray700 : color.teal200}`,
            boxShadow: isDarkMode
              ? `0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px ${color.teal700}40`
              : `0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px ${color.teal300}40`,
          }}
        >
          {/* Left side - Image */}
          <Box
            sx={{
              flex: { xs: "1 1 auto", md: "0 0 50%" },
              position: "relative",
              minHeight: { xs: "220px", sm: "300px", md: "auto" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: { xs: 2, md: 4 },
              background: isDarkMode
                ? `linear-gradient(135deg, ${color.teal900}, ${color.emerald900})`
                : `linear-gradient(135deg, ${color.teal400}, ${color.emerald500})`,
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: "url(/circuit-pattern.svg)",
                backgroundSize: "cover",
                opacity: 0.1,
                zIndex: 0,
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Box
                component="img"
                src={imgLogin}
                alt="Login"
                sx={{
                  maxWidth: "100%",
                  maxHeight: "350px",
                  objectFit: "contain",
                  filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.3))",
                  transform: "scale(1.1)",
                  transition: "transform 0.5s ease-in-out",
                  animation: "float 6s ease-in-out infinite",
                  "@keyframes float": {
                    "0%": { transform: "translateY(0px) scale(1.1)" },
                    "50%": { transform: "translateY(-15px) scale(1.1)" },
                    "100%": { transform: "translateY(0px) scale(1.1)" },
                  },
                }}
              />

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: color.white,
                  textAlign: "center",
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                  display: { xs: "none", sm: "block" },
                }}
              >
                Welcome Back!
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  maxWidth: "80%",
                  textAlign: "center",
                  color: color.white,
                  opacity: 0.9,
                  display: { xs: "none", sm: "block" },
                }}
              >
                Sign in to continue your learning journey
              </Typography>
            </Box>

            {/* Decorative circles */}
            <Box
              sx={{
                position: "absolute",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${color.teal300}20, transparent 70%)`,
                top: "-100px",
                left: "-100px",
                zIndex: 0,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${color.emerald300}30, transparent 70%)`,
                bottom: "-50px",
                right: "-50px",
                zIndex: 0,
              }}
            />
          </Box>

          {/* Right side - Form */}
          <Box
            sx={{
              flex: { xs: "1 1 auto", md: "0 0 50%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              px: { xs: 3, sm: 4 },
              py: { xs: 4, sm: 5 },
              position: "relative",
              overflow: "visible",
            }}
          >
            {/* Subtle decorative elements */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "100px",
                height: "100px",
                borderRadius: "0 0 0 100%",
                background: isDarkMode
                  ? `linear-gradient(135deg, ${color.teal700}30, ${color.emerald600}20)`
                  : `linear-gradient(135deg, ${color.teal300}40, ${color.emerald200}30)`,
                opacity: 0.5,
                zIndex: 0,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "70px",
                height: "70px",
                borderRadius: "0 100% 0 0",
                background: isDarkMode
                  ? `linear-gradient(315deg, ${color.teal800}30, ${color.emerald700}20)`
                  : `linear-gradient(315deg, ${color.teal400}40, ${color.emerald300}30)`,
                opacity: 0.4,
                zIndex: 0,
              }}
            />

            {/* Content container */}
            <Box
              sx={{
                width: "100%",
                maxWidth: "350px",
                position: "relative",
                zIndex: 1,
                mx: "auto",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: isDarkMode
                    ? `linear-gradient(90deg, ${color.teal400}, ${color.emerald400})`
                    : `linear-gradient(90deg, ${color.teal600}, ${color.emerald600})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textFillColor: "transparent",
                  display: { xs: "block", sm: "none" },
                  textAlign: "center",
                  mb: 2,
                }}
              >
                Welcome Back!
              </Typography>

              {/* Form with subtle background */}
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 2,
                  p: 0.5,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: -8,
                    left: -8,
                    right: -8,
                    bottom: -8,
                    borderRadius: 3,
                    background: isDarkMode
                      ? `linear-gradient(45deg, ${color.teal900}30, transparent 60%)`
                      : `linear-gradient(45deg, ${color.teal100}50, transparent 60%)`,
                    zIndex: -1,
                  },
                }}
              >
                <LoginForm />
              </Box>

              {/* Quote box for non-mobile */}
              {!isMobile && (
                <Box
                  sx={{
                    mt: 4,
                    p: 2.5,
                    borderRadius: 2.5,
                    backgroundColor: isDarkMode
                      ? `${color.teal900}50`
                      : `${color.teal100}70`,
                    border: `1px solid ${
                      isDarkMode ? color.teal800 : color.teal200
                    }`,
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: -15,
                      left: -15,
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      background: isDarkMode ? color.teal700 : color.teal300,
                      opacity: 0.2,
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDarkMode ? color.gray200 : color.gray700,
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                  >
                    "Education is the most powerful weapon which you can use to
                    change the world."
                    <Box
                      component="span"
                      sx={{
                        display: "block",
                        mt: 1,
                        fontWeight: 600,
                        fontStyle: "normal",
                        color: isDarkMode ? color.teal300 : color.teal700,
                      }}
                    >
                      - Nelson Mandela
                    </Box>
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
