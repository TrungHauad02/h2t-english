import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import {
  ContentStatusChart,
  ContentTypeDistribution,
  SectionHeader,
  StatsCardSection,
  TestTypeDistribution,
} from "../components";
import { teacherDashboardService } from "../services/teacherDashboardService";
import { TeacherDashboardData } from "../types";
import useAuth from "hooks/useAuth";

export default function TeacherDashboardPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { userId } = useAuth();
  const [dashboardData, setDashboardData] = useState<TeacherDashboardData>({
    totalLessons: 0,
    totalRoutes: 0,
    totalTests: 0,
    totalViews: 0,
    activeContent: 0,
    inactiveContent: 0,
    lessonData: {
      totalTopics: 0,
      totalGrammars: 0,
      totalReadings: 0,
      totalListenings: 0,
      totalSpeakings: 0,
      totalWritings: 0,
    },
    testData: {
      totalMixingTests: 0,
      totalReadingTests: 0,
      totalListeningTests: 0,
      totalSpeakingTests: 0,
      totalWritingTests: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await teacherDashboardService.getTeacherDashboard(
          parseInt(userId || "")
        );
        setDashboardData(resData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 6 }}>
        {/* Page Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: isDarkMode ? color.gray100 : color.gray900,
            }}
          >
            Teacher Dashboard
          </Typography>
        </Box>

        {/* Stats Cards */}
        <StatsCardSection
          totalRoutes={dashboardData.totalRoutes}
          numberLessons={dashboardData.totalLessons}
          totalTests={dashboardData.totalTests}
          totalViews={dashboardData.totalViews}
        />

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                height: "100%",
                borderRadius: "1rem",
                backgroundColor: isDarkMode ? color.gray800 : color.white,
                boxShadow: `0 4px 20px rgba(0, 0, 0, ${
                  isDarkMode ? 0.35 : 0.08
                })`,
                border: `1px solid ${
                  isDarkMode ? color.gray700 : color.gray100
                }`,
              }}
            >
              <SectionHeader
                title="Content Status"
                subtitle="Ratio of published and unpublished content."
              />
              <ContentStatusChart
                active={dashboardData.activeContent}
                inactive={dashboardData.inactiveContent}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                height: "100%",
                borderRadius: "1rem",
                backgroundColor: isDarkMode ? color.gray800 : color.white,
                boxShadow: `0 4px 20px rgba(0, 0, 0, ${
                  isDarkMode ? 0.35 : 0.08
                })`,
                border: `1px solid ${
                  isDarkMode ? color.gray700 : color.gray100
                }`,
              }}
            >
              <SectionHeader
                title="Content Type Distribution"
                subtitle="Distribution of content types."
              />
              <ContentTypeDistribution data={dashboardData.lessonData} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 3,
                height: "100%",
                borderRadius: "1rem",
                backgroundColor: isDarkMode ? color.gray800 : color.white,
                boxShadow: `0 4px 20px rgba(0, 0, 0, ${
                  isDarkMode ? 0.35 : 0.08
                })`,
                border: `1px solid ${
                  isDarkMode ? color.gray700 : color.gray100
                }`,
              }}
            >
              <SectionHeader
                title="Test  Distribution"
                subtitle="Distribution of test types."
              />
              <TestTypeDistribution data={dashboardData.testData} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
