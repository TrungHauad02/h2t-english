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
import { DashboardData } from "../types";
import { ServiceResponse } from "interfaces";

export default function TeacherDashboardPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [dashboardData, setDashboardData] = useState<Partial<DashboardData>>(
    {}
  );
  const [numberLessons, setNumberLessons] = useState(0);
  const [numberTests, setNumberTests] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPromises: Promise<ServiceResponse<number>>[] = [
          teacherDashboardService.getTotalRouteByTeacherId(1),
          teacherDashboardService.getTotalTopicByTeacherId(1),
          teacherDashboardService.getTotalGrammarByTeacherId(1),
          teacherDashboardService.getTotalReadingByTeacherId(1),
          teacherDashboardService.getTotalWritingByTeacherId(1),
          teacherDashboardService.getTotalListeningByTeacherId(1),
          teacherDashboardService.getTotalSpeakingByTeacherId(1),
          teacherDashboardService.getTotalMixingTestByTeacherId(1),
          teacherDashboardService.getTotalReadingTestByTeacherId(1),
          teacherDashboardService.getTotalListeningTestByTeacherId(1),
          teacherDashboardService.getTotalSpeakingTestByTeacherId(1),
          teacherDashboardService.getTotalWritingTestByTeacherId(1),
          teacherDashboardService.getViewsByTeacherId(1),
          teacherDashboardService.getActiveContentByTeacherId(1),
          teacherDashboardService.getInactiveContentByTeacherId(1),
        ];

        const resData = await Promise.all(allPromises);

        setDashboardData({
          stats: {
            totalRoutes: resData[0].data,
            totalTopics: resData[1].data,
            totalGrammars: resData[2].data,
            totalReadings: resData[3].data,
            totalWritings: resData[4].data,
            totalListenings: resData[5].data,
            totalSpeakings: resData[6].data,
            totalMixingTests: resData[7].data,
            totalReadingTests: resData[8].data,
            totalListeningTests: resData[9].data,
            totalSpeakingTests: resData[10].data,
            totalWritingTests: resData[11].data,
            totalViews: resData[12].data,
            activeContent: resData[13].data,
            inactiveContent: resData[14].data,
          },
        });
        const numberOfLessons =
          resData[1].data +
          resData[2].data +
          resData[3].data +
          resData[4].data +
          resData[5].data +
          resData[6].data;

        const numberOfTests =
          resData[7].data +
          resData[8].data +
          resData[9].data +
          resData[10].data +
          resData[11].data;
        setNumberLessons(numberOfLessons);
        setNumberTests(numberOfTests);
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
          totalRoutes={dashboardData.stats?.totalRoutes ?? 0}
          numberLessons={numberLessons}
          totalTests={numberTests}
          totalViews={dashboardData.stats?.totalViews ?? 0}
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
                active={dashboardData.stats?.activeContent ?? 0}
                inactive={dashboardData.stats?.inactiveContent ?? 0}
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
              <ContentTypeDistribution data={dashboardData.stats} />
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
              <TestTypeDistribution data={dashboardData.stats} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
