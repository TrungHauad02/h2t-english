import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  useMediaQuery,
  useTheme,
  Typography,
  Tab,
  Tabs,
  Grid,
  Paper,
  Stack,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Route } from "interfaces";
import RouteHeader from "../components/RouteHeader";
import TeacherInfoCard from "../components/TeacherInfoCard";
import LearningPathTimeline from "../components/LearningPathTimeline";
import ProgressBadge from "../components/ProgressBadge";
import ProgressStats from "../components/ProgressStats";
import ProgressAnalyticsTab from "../components/ProgressAnalyticsTab";
import RecommendationsTab from "../components/RecommendationsTab";
import AchievementsTab from "../components/AchievementsTab";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { routeService, userService } from "services";
import { toast } from "react-toastify";
import { RouteNotFound, RouteSkeleton } from "../components";
import useAuth from "hooks/useAuth";
import InsightsIcon from "@mui/icons-material/Insights";
import TimelineIcon from "@mui/icons-material/Timeline";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BarChartIcon from "@mui/icons-material/BarChart";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useNavigate } from "react-router-dom";
import ProgressOverview from "../components/ProgressOverview";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`route-tabpanel-${index}`}
      aria-labelledby={`route-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `route-tab-${index}`,
    "aria-controls": `route-tabpanel-${index}`,
  };
}

export default function RoutePage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { id } = useParams();
  const { userId } = useAuth();
  const [route, setRoute] = useState<Route>();
  const [process, setProcess] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const fetchRoute = async () => {
      setLoading(true);
      try {
        if (id && userId) {
          const resData = await Promise.all([
            routeService.findById(Number(id)),
            userService.getProcessByRouteId(Number(userId), Number(id)),
          ]);
          if (resData[0].data) {
            setRoute(resData[0].data);
          }
          if (resData[1].data) {
            setProcess(resData[1].data);
          }
        }
      } catch (error) {
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchRoute();
  }, [id, userId]);

  if (loading) {
    return <RouteSkeleton />;
  }

  if (!route) {
    return <RouteNotFound />;
  }

  // Calculate progress percentage
  const progressPercentage =
    route.routeNodes.length > 0
      ? Math.round((process.length / route.routeNodes.length) * 100)
      : 0;

  // Get next uncompleted lesson
  const getNextLesson = () => {
    if (!route || !route.routeNodes || route.routeNodes.length === 0) {
      return null;
    }

    const sortedNodes = [...route.routeNodes].sort(
      (a, b) => a.serial - b.serial
    );
    const nextNode = sortedNodes.find((node) => !process.includes(node.id));

    return nextNode;
  };

  // Navigate to the next lesson
  const handleContinueLearning = () => {
    const nextLesson = getNextLesson();

    if (!nextLesson) {
      return;
    }

    let path = "";
    switch (nextLesson.type) {
      case "VOCABULARY":
        path = `/lesson/topics/${nextLesson.nodeId}`;
        break;
      case "GRAMMAR":
        path = `/lesson/grammars/${nextLesson.nodeId}`;
        break;
      case "READING":
        path = `/lesson/readings/${nextLesson.nodeId}`;
        break;
      case "LISTENING":
        path = `/lesson/listenings/${nextLesson.nodeId}`;
        break;
      case "WRITING":
        path = `/lesson/writings/${nextLesson.nodeId}`;
        break;
      case "SPEAKING":
        path = `/lesson/speakings/${nextLesson.nodeId}`;
        break;
      case "MIXING_TEST":
        path = `/test/mixing/${nextLesson.nodeId}`;
        break;
      case "READING_TEST":
        path = `/test/reading/${nextLesson.nodeId}`;
        break;
      case "LISTENING_TEST":
        path = `/test/listening/${nextLesson.nodeId}`;
        break;
      case "SPEAKING_TEST":
        path = `/test/speaking/${nextLesson.nodeId}`;
        break;
      case "WRITING_TEST":
        path = `/test/writing/${nextLesson.nodeId}`;
        break;
      default:
        path = "/";
    }

    navigate(path);
  };

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        width: "100%",
        minHeight: "100vh",
        mt: { xs: 6, md: 8 },
        pt: { xs: 2, md: 4 },
        pb: 6,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            width: "100%",
          }}
        >
          {/* Header with route info and progress badge */}
          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "flex-start", md: "center" },
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 2, md: 0 },
            }}
          >
            <RouteHeader route={route} />
          </Box>

          {/* Progress Summary - Mobile Only */}
          {isMobile && (
            <Paper
              elevation={2}
              sx={{
                p: 2,
                borderRadius: "12px",
                backgroundColor: isDarkMode ? color.gray900 : color.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? color.gray400 : color.gray600,
                  }}
                >
                  Your Progress
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: isDarkMode
                      ? progressPercentage === 100
                        ? color.emerald300
                        : color.teal300
                      : progressPercentage === 100
                      ? color.emerald600
                      : color.teal600,
                    fontWeight: "bold",
                  }}
                >
                  {progressPercentage}% Complete
                </Typography>
              </Box>
              <ProgressBadge
                progress={process.length}
                total={route.routeNodes.length}
                size="small"
                showLabel={false}
                showPercentage={false}
              />
            </Paper>
          )}

          {/* Continue Learning Button */}
          {getNextLesson() && (
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrowIcon />}
              onClick={handleContinueLearning}
              sx={{
                backgroundImage: `linear-gradient(135deg, ${
                  isDarkMode ? color.teal500 : color.teal400
                } 0%, ${
                  isDarkMode ? color.emerald600 : color.emerald500
                } 100%)`,
                color: color.white,
                py: 1.5,
                borderRadius: "12px",
                boxShadow: `0 8px 20px ${
                  isDarkMode
                    ? "rgba(5, 150, 105, 0.3)"
                    : "rgba(5, 150, 105, 0.2)"
                }`,
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundImage: `linear-gradient(135deg, ${
                    isDarkMode ? color.teal600 : color.teal500
                  } 0%, ${
                    isDarkMode ? color.emerald700 : color.emerald600
                  } 100%)`,
                  boxShadow: `0 8px 25px ${
                    isDarkMode
                      ? "rgba(5, 150, 105, 0.4)"
                      : "rgba(5, 150, 105, 0.3)"
                  }`,
                },
              }}
            >
              Continue Learning: {getNextLesson()?.title || "Next Lesson"}
            </Button>
          )}

          <Grid container spacing={3}>
            {/* Left Sidebar - Teacher Info & Progress Stats */}
            <Grid item xs={12} md={4} lg={3} order={{ xs: 2, md: 1 }}>
              <Stack spacing={3}>
                <TeacherInfoCard userId={route.ownerId} />

                {/* Progress Stats */}
                <ProgressStats route={route} process={process} />
              </Stack>
            </Grid>

            {/* Main Content Area */}
            <Grid item xs={12} md={8} lg={9} order={{ xs: 1, md: 2 }}>
              {/* Tabs for Progress and Learning Path */}
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: isDarkMode ? color.gray700 : color.gray200,
                  mb: 2,
                }}
              >
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="course progress tabs"
                  sx={{
                    "& .MuiTabs-indicator": {
                      backgroundColor: isDarkMode
                        ? color.teal400
                        : color.teal600,
                    },
                    "& .Mui-selected": {
                      color: isDarkMode ? color.teal300 : color.teal600,
                    },
                  }}
                >
                  <Tab
                    icon={<TimelineIcon />}
                    label="Learning Path"
                    {...a11yProps(0)}
                    sx={{
                      textTransform: "none",
                      fontWeight: "medium",
                      color: isDarkMode ? color.gray300 : color.gray600,
                    }}
                  />
                  <Tab
                    icon={<InsightsIcon />}
                    label="Progress Analytics"
                    {...a11yProps(1)}
                    sx={{
                      textTransform: "none",
                      fontWeight: "medium",
                      color: isDarkMode ? color.gray300 : color.gray600,
                    }}
                  />
                  <Tab
                    icon={<AssessmentIcon />}
                    label="Recommendations"
                    {...a11yProps(2)}
                    sx={{
                      textTransform: "none",
                      fontWeight: "medium",
                      color: isDarkMode ? color.gray300 : color.gray600,
                    }}
                  />
                  <Tab
                    icon={<BarChartIcon />}
                    label="Progress Overview"
                    {...a11yProps(3)}
                    sx={{
                      textTransform: "none",
                      fontWeight: "medium",
                      color: isDarkMode ? color.gray300 : color.gray600,
                    }}
                  />
                  <Tab
                    icon={<EmojiEventsIcon />}
                    label="Achievements"
                    {...a11yProps(4)}
                    sx={{
                      textTransform: "none",
                      fontWeight: "medium",
                      color: isDarkMode ? color.gray300 : color.gray600,
                    }}
                  />
                </Tabs>
              </Box>

              {/* Tab Panels */}
              <TabPanel value={tabValue} index={0}>
                <LearningPathTimeline route={route} process={process} />
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <ProgressAnalyticsTab route={route} process={process} />
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <RecommendationsTab route={route} process={process} />
              </TabPanel>

              <TabPanel value={tabValue} index={3}>
                <ProgressOverview route={route} process={process} />
              </TabPanel>

              <TabPanel value={tabValue} index={4}>
                <AchievementsTab route={route} process={process} />
              </TabPanel>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
