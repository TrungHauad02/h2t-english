import {
  Box,
  Container,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SendOTPForm from "../components/SendOTPForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export default function ForgotPasswordPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isFlipped, setIsFlipped] = useState(false);
  const [email, setEmail] = useState("");

  const handleFlip = () => {
    setIsFlipped(true);
  };

  const imgForgotPassword =
    "https://d1dwx6vsztg5ne.cloudfront.net/h2t-english/static%2FLoginBG-removebg-preview.png";
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
          : `linear-gradient(135deg, ${color.teal50}, ${color.emerald100}, ${color.green100})`, // 3 màu cho quên mật khẩu
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
            border: `1px solid ${isDarkMode ? color.gray700 : color.green200}`,
            boxShadow: isDarkMode
              ? `0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px ${color.green700}40`
              : `0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px ${color.green300}40`,
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
                ? `linear-gradient(135deg, ${color.green900}, ${color.teal900})`
                : `linear-gradient(135deg, ${color.green400}, ${color.teal500})`,
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
                src={imgForgotPassword}
                alt="Forgot Password"
                sx={{
                  maxWidth: "100%",
                  maxHeight: "350px",
                  objectFit: "contain",
                  filter:
                    "drop-shadow(0 10px 15px rgba(0,0,0,0.3)) hue-rotate(15deg)",
                  transform: "scale(1.1) rotate(5deg)",
                  transition: "transform 0.5s ease-in-out",
                  animation: "floatPassword 6s ease-in-out infinite",
                  "@keyframes floatPassword": {
                    "0%": {
                      transform: "translateY(0px) scale(1.1) rotate(5deg)",
                    },
                    "50%": {
                      transform: "translateY(-15px) scale(1.1) rotate(5deg)",
                    },
                    "100%": {
                      transform: "translateY(0px) scale(1.1) rotate(5deg)",
                    },
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
                {isFlipped ? "Reset Your Password" : "Forgot Your Password?"}
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
                {isFlipped
                  ? "Create a new secure password to access your account"
                  : "Don't worry! It happens. Please enter your email address to recover your password"}
              </Typography>
            </Box>

            {/* Decorative circles */}
            <Box
              sx={{
                position: "absolute",
                width: "250px",
                height: "250px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${color.green300}20, transparent 70%)`,
                top: "-80px",
                left: "-80px",
                zIndex: 0,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${color.teal300}30, transparent 70%)`,
                bottom: "-40px",
                right: "-40px",
                zIndex: 0,
              }}
            />

            {/* Thêm yếu tố trang trí đặc biệt cho forgot password */}
            <Box
              sx={{
                position: "absolute",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                border: `2px dashed ${
                  isDarkMode ? color.green700 : color.green300
                }`,
                top: "40%",
                left: "40%",
                opacity: 0.4,
                zIndex: 0,
                animation: "rotate 20s linear infinite",
                "@keyframes rotate": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },
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
                  ? `linear-gradient(135deg, ${color.green700}30, ${color.teal600}20)`
                  : `linear-gradient(135deg, ${color.green300}40, ${color.teal200}30)`,
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
                  ? `linear-gradient(315deg, ${color.green800}30, ${color.teal700}20)`
                  : `linear-gradient(315deg, ${color.green400}40, ${color.teal300}30)`,
                opacity: 0.4,
                zIndex: 0,
              }}
            />

            {/* Content container - with perspective for card flip */}
            <Box
              sx={{
                width: "100%",
                maxWidth: "350px",
                position: "relative",
                zIndex: 1,
                mx: "auto",
                perspective: "1000px", // Add perspective for 3D effect
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: isDarkMode
                    ? `linear-gradient(90deg, ${color.green400}, ${color.teal400})`
                    : `linear-gradient(90deg, ${color.green600}, ${color.teal600})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textFillColor: "transparent",
                  display: { xs: "block", sm: "none" },
                  textAlign: "center",
                  mb: 2,
                }}
              >
                {isFlipped ? "Reset Password" : "Forgot Password?"}
              </Typography>

              {/* Card flip container with transition effect */}
              <Box
                sx={{
                  width: "100%",
                  transition:
                    "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",

                  "& .react-card-flip": {
                    width: "100%",
                  },

                  "& .react-card-flipper": {
                    width: "100%",
                  },

                  "& .react-card-front, & .react-card-back": {
                    width: "100%",
                    backfaceVisibility: "hidden",
                    boxShadow: isDarkMode
                      ? `0 8px 30px rgba(0, 0, 0, 0.25)`
                      : `0 8px 30px rgba(0, 0, 0, 0.1)`,
                    borderRadius: "12px",
                    backgroundColor: "transparent",
                  },
                }}
              >
                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                  {/* Front Card - Send OTP Form */}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      position: "relative",
                      borderRadius: 3,
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
                          ? `linear-gradient(45deg, ${color.green900}30, transparent 60%)`
                          : `linear-gradient(45deg, ${color.green100}50, transparent 60%)`,
                        zIndex: -1,
                      },
                    }}
                  >
                    <SendOTPForm
                      onOtpValidated={handleFlip}
                      email={email}
                      setEmail={setEmail}
                    />
                  </Box>

                  {/* Back Card - Reset Password Form */}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      position: "relative",
                      borderRadius: 3,
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
                    <ForgotPasswordForm email={email} />
                  </Box>
                </ReactCardFlip>
              </Box>

              {/* Security tip note */}
              {!isMobile && (
                <Box
                  sx={{
                    mt: 4,
                    p: 2.5,
                    borderRadius: 2.5,
                    backgroundColor: isDarkMode
                      ? `${color.green900}50`
                      : `${color.green100}70`,
                    border: `1px solid ${
                      isDarkMode ? color.green800 : color.green200
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
                      background: isDarkMode ? color.green700 : color.green300,
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
                    {isFlipped
                      ? "For better security, please choose a password that you don't use elsewhere."
                      : "We'll send a verification code to your email to ensure it's really you."}
                    <Box
                      component="span"
                      sx={{
                        display: "block",
                        mt: 1,
                        fontWeight: 600,
                        fontStyle: "normal",
                        color: isDarkMode ? color.green300 : color.green700,
                      }}
                    >
                      - Security Tip
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
