import React, { useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Tabs,
  Tab,
  Zoom,
  Fade,
} from "@mui/material";
import { Lesson } from "interfaces";
import { featuredLessons } from "../services/mockData";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

interface LessonCardProps {
  lesson: Lesson;
  index: number;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
}));

const CardOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%)",
  zIndex: 1,
}));

function LessonCard({ lesson, index, isSelected, onSelect }: LessonCardProps) {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const [showCard, setShowCard] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCard(true);
    }, index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  // Define different border colors for selected cards
  const getBorderColor = () => {
    const colors = [
      "#5eead4", // teal300
      "#6ee7b7", // emerald300
      "#86efac", // green300
      "#4ade80", // green400
    ];
    return colors[index % colors.length];
  };

  return (
    <Zoom in={showCard} style={{ transitionDelay: showCard ? "0ms" : "0ms" }}>
      <StyledCard
        onClick={() => onSelect(lesson.id)}
        sx={{
          backgroundColor: isDarkMode ? colors.gray800 : colors.white,
          color: isDarkMode ? colors.gray100 : colors.gray900,
          borderRadius: 3,
          boxShadow: isSelected
            ? `0 8px 24px rgba(0,0,0,0.2), 0 0 0 3px ${getBorderColor()}`
            : "0 4px 12px rgba(0,0,0,0.1)",
          transform: isSelected ? "scale(1.02)" : "scale(1)",
          "& .lesson-card-content": {
            transform: isSelected ? "translateY(-8px)" : "translateY(0)",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height={isMobile ? "180" : "200"}
            image={lesson.image}
            alt={lesson.title}
            sx={{
              filter: isDarkMode ? "brightness(0.85)" : "none",
              transition: "all 0.5s ease",
              "&:hover": {
                filter: isDarkMode ? "brightness(1)" : "brightness(1.05)",
              },
            }}
          />
          <CardOverlay />
        </Box>

        <CardContent
          className="lesson-card-content"
          sx={{
            flexGrow: 1,
            p: 2.5,
            position: "relative",
            transition: "transform 0.3s ease",
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            fontWeight="bold"
            sx={{
              fontSize: "1.1rem",
              mb: 1,
              color: isDarkMode ? colors.white : colors.gray900,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1.3,
            }}
          >
            {lesson.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? colors.gray300 : colors.gray700,
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "0.875rem",
              lineHeight: 1.5,
            }}
          >
            {lesson.description}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "auto",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <VisibilityIcon
                fontSize="small"
                sx={{
                  color: isDarkMode ? colors.gray400 : colors.gray500,
                  mr: 0.5,
                  fontSize: "0.875rem",
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? colors.gray400 : colors.gray500,
                  fontSize: "0.75rem",
                }}
              >
                {lesson.views.toLocaleString()}
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="small"
              startIcon={<PlayArrowIcon />}
              sx={{
                backgroundColor: isDarkMode ? colors.teal700 : colors.teal600,
                color: colors.white,
                boxShadow: "none",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.75rem",
                padding: "4px 10px",
                minWidth: "auto",
                "&:hover": {
                  backgroundColor: isDarkMode ? colors.teal600 : colors.teal500,
                  boxShadow: "0 2px 8px rgba(20, 184, 166, 0.3)",
                },
              }}
            >
              Start
            </Button>
          </Box>
        </CardContent>
      </StyledCard>
    </Zoom>
  );
}

// Main LessonsSection component
export default function LessonsSection() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const [selectedLessonId, setSelectedLessonId] = useState<number>(0);
  const [filter, setFilter] = useState<string>("popular");
  const [animate, setAnimate] = useState(false);

  // Cast featuredLessons to Lesson type
  const lessons = featuredLessons as unknown as Lesson[];

  useEffect(() => {
    setAnimate(true);
    // Set the first lesson as selected by default
    if (lessons.length > 0) {
      setSelectedLessonId(lessons[0].id);
    }
  }, [lessons]);

  const handleFilterChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setFilter(newValue);
  };

  // Sort lessons based on the selected filter
  const sortedLessons = React.useMemo(() => {
    let sorted = [...lessons];
    switch (filter) {
      case "popular":
        sorted = sorted.sort((a, b) => b.views - a.views);
        break;
      case "newest":
        // Use createdAt from BaseEntity
        sorted = sorted.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        break;
    }
    return sorted.slice(0, 4); // Only show top 4
  }, [filter, lessons]);

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
      {/* Decorative elements */}
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
        <Fade in={animate} timeout={800}>
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
              <Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: 800,
                    color: isDarkMode ? colors.teal300 : colors.teal700,
                    mb: 1,
                    position: "relative",
                    display: "inline-block",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      bottom: -8,
                      left: 0,
                      width: "40%",
                      height: 4,
                      backgroundColor: isDarkMode
                        ? colors.teal500
                        : colors.teal600,
                      borderRadius: 2,
                    },
                  }}
                >
                  Featured Lessons
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: isDarkMode ? colors.gray300 : colors.gray700,
                    maxWidth: "600px",
                    mt: 2,
                  }}
                >
                  Explore our most popular lessons and start improving your
                  English skills today
                </Typography>
              </Box>

              <Button
                variant="outlined"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderColor: isDarkMode ? colors.teal500 : colors.teal600,
                  color: isDarkMode ? colors.teal400 : colors.teal600,
                  borderWidth: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  "&:hover": {
                    borderColor: isDarkMode ? colors.teal400 : colors.teal700,
                    backgroundColor: isDarkMode
                      ? "rgba(20, 184, 166, 0.1)"
                      : "rgba(13, 148, 136, 0.05)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                View All Lessons
              </Button>
            </Box>

            <Tabs
              value={filter}
              onChange={handleFilterChange}
              textColor="inherit"
              sx={{
                mb: 3,
                "& .MuiTabs-indicator": {
                  backgroundColor: isDarkMode ? colors.teal400 : colors.teal600,
                  height: 3,
                  borderRadius: "3px 3px 0 0",
                },
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: isDarkMode ? colors.gray400 : colors.gray600,
                  minWidth: 0,
                  px: 3,
                  "&.Mui-selected": {
                    color: isDarkMode ? colors.teal300 : colors.teal700,
                  },
                },
              }}
            >
              <Tab label="Most Popular" value="popular" />
              <Tab label="Newest" value="newest" />
            </Tabs>
          </Box>
        </Fade>

        <Grid container spacing={3}>
          {sortedLessons.map((lesson, index) => (
            <Grid item key={lesson.id} xs={12} sm={6} md={3}>
              <LessonCard
                lesson={lesson}
                index={index}
                isSelected={selectedLessonId === lesson.id}
                onSelect={setSelectedLessonId}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
