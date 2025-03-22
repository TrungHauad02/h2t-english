import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import SchoolIcon from "@mui/icons-material/School";
import RouteIcon from "@mui/icons-material/Route";
import QuizIcon from "@mui/icons-material/Quiz";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { styled } from "@mui/material/styles";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  delay: number;
}

// Styled component for hexagon shape
const HexagonWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "90px",
  height: "104px",
  margin: "0 auto",
}));

const HexagonInner = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
}));

const HexagonBefore = styled(Box)(({ theme }) => ({
  content: '""',
  position: "absolute",
  width: "100%",
  height: "100%",
  transform: "rotate(60deg)",
}));

const HexagonAfter = styled(Box)(({ theme }) => ({
  content: '""',
  position: "absolute",
  width: "100%",
  height: "100%",
  transform: "rotate(-60deg)",
}));

function FeatureCard({
  title,
  description,
  icon,
  index,
  delay,
}: FeatureCardProps) {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const [showCard, setShowCard] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Animation delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCard(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Color patterns based on index
  const getColorPattern = (idx: number) => {
    const patterns = [
      { bg: colors.teal700, accent: colors.teal300 },
      { bg: colors.emerald700, accent: colors.emerald300 },
      { bg: colors.green700, accent: colors.green300 },
      { bg: colors.emerald800, accent: colors.emerald400 },
      { bg: colors.teal800, accent: colors.teal400 },
      { bg: colors.green800, accent: colors.green400 },
    ];
    return patterns[idx % patterns.length];
  };

  const colorPattern = getColorPattern(index);

  return (
    <Zoom in={showCard} style={{ transitionDelay: showCard ? "0ms" : "0ms" }}>
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: isDarkMode ? colors.gray800 : colors.white,
          position: "relative",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: isHovered
            ? `0 12px 28px rgba(0,0,0,0.2), 0 0 0 2px ${colorPattern.accent}`
            : "0 6px 16px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease-in-out",
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        }}
      >
        {/* Decorative corner accent */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "30%",
            height: "30%",
            backgroundColor: colorPattern.accent,
            opacity: 0.15,
            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
          }}
        />

        <CardActionArea
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: 3,
            "&:hover": {
              backgroundColor: isDarkMode
                ? "rgba(255,255,255,0.03)"
                : "rgba(0,0,0,0.02)",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 2.5,
            }}
          >
            <HexagonWrapper>
              <HexagonBefore
                sx={{
                  backgroundColor: colorPattern.bg,
                  borderRadius: "8px",
                }}
              />
              <HexagonAfter
                sx={{
                  backgroundColor: colorPattern.bg,
                  borderRadius: "8px",
                }}
              />
              <HexagonInner>
                <Box
                  sx={{
                    color: colors.white,
                    fontSize: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </Box>
              </HexagonInner>
            </HexagonWrapper>

            <Typography
              variant="h5"
              component="h3"
              fontWeight="bold"
              align="center"
              sx={{
                mt: 2.5,
                mb: 1,
                color: isDarkMode ? colorPattern.accent : colorPattern.bg,
              }}
            >
              {title}
            </Typography>

            <Divider
              sx={{
                width: "40%",
                my: 1.5,
                backgroundColor: isDarkMode
                  ? colorPattern.accent
                  : colorPattern.bg,
                opacity: 0.5,
              }}
            />
          </Box>

          <Typography
            variant="body1"
            align="center"
            sx={{
              color: isDarkMode ? colors.gray300 : colors.gray700,
              flex: 1,
            }}
          >
            {description}
          </Typography>

          <Fade in={isHovered}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                mt: 2.5,
              }}
            >
              <Button
                variant="text"
                size="small"
                sx={{
                  color: isDarkMode ? colorPattern.accent : colorPattern.bg,
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: isDarkMode
                      ? "rgba(94, 234, 212, 0.08)"
                      : "rgba(15, 118, 110, 0.08)",
                  },
                }}
                endIcon={<ArrowForwardIcon />}
              >
                Learn more
              </Button>
            </Box>
          </Fade>
        </CardActionArea>
      </Card>
    </Zoom>
  );
}

export default function FeaturesSection() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animations when component mounts
    setAnimate(true);
  }, []);

  const features = [
    {
      title: "Interactive Lessons",
      description:
        "Engaging multimedia lessons covering all aspects of English language learning.",
      icon: <SchoolIcon fontSize="inherit" />,
    },
    {
      title: "Learning Paths",
      description:
        "Structured learning routes tailored to your goals and current proficiency level.",
      icon: <RouteIcon fontSize="inherit" />,
    },
    {
      title: "Practice Tests",
      description:
        "Comprehensive tests to assess your skills and track your progress over time.",
      icon: <QuizIcon fontSize="inherit" />,
    },
    {
      title: "Competitions",
      description:
        "Regular competitions to challenge yourself and compete with other learners.",
      icon: <EmojiEventsIcon fontSize="inherit" />,
    },
    {
      title: "TOEIC Preparation",
      description:
        "Specialized courses and practice tests designed for TOEIC exam success.",
      icon: <GTranslateIcon fontSize="inherit" />,
    },
    {
      title: "AI Scoring & Feedback",
      description:
        "Get instant evaluations and personalized insights on your speaking and writing from our advanced AI.",
      icon: <SmartToyIcon fontSize="inherit" />,
    },
  ];

  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 6, md: 10 },
        overflow: "hidden",
        backgroundColor: isDarkMode ? colors.gray900 : colors.gray50,
      }}
    >
      {/* Decorative background elements */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: -50, md: -150 },
          right: { xs: -50, md: -150 },
          width: { xs: 150, md: 300 },
          height: { xs: 150, md: 300 },
          borderRadius: "50%",
          background: isDarkMode
            ? `radial-gradient(circle, ${colors.teal900}, ${colors.transparent})`
            : `radial-gradient(circle, ${colors.teal100}, ${colors.transparent})`,
          opacity: 0.6,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: -70, md: -200 },
          left: { xs: -70, md: -200 },
          width: { xs: 200, md: 400 },
          height: { xs: 200, md: 400 },
          borderRadius: "50%",
          background: isDarkMode
            ? `radial-gradient(circle, ${colors.emerald900}, ${colors.transparent})`
            : `radial-gradient(circle, ${colors.emerald100}, ${colors.transparent})`,
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in={animate} timeout={800}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                background: isDarkMode
                  ? `linear-gradient(135deg, ${colors.teal300}, ${colors.emerald400})`
                  : `linear-gradient(135deg, ${colors.teal600}, ${colors.emerald700})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              Our Core Features
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                mb: 2,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  maxWidth: 700,
                  color: isDarkMode ? colors.gray300 : colors.gray700,
                  fontWeight: 500,
                }}
              >
                Everything you need to learn English effectively
              </Typography>
              <Tooltip
                title="Our powerful features are designed to accelerate your language learning journey"
                arrow
                placement="top"
              >
                <IconButton
                  size="small"
                  sx={{
                    color: isDarkMode ? colors.teal400 : colors.teal600,
                  }}
                >
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <Divider
              sx={{
                width: "120px",
                margin: "0 auto",
                my: 3,
                backgroundColor: isDarkMode ? colors.teal500 : colors.teal600,
                height: "3px",
                borderRadius: "2px",
              }}
            />
          </Box>
        </Fade>

        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
              }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                index={index}
                delay={index * 150}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
