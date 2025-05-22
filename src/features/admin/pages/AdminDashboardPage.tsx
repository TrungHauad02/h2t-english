import { useEffect, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { ErrorLog, RolesEnum, SeverityEnum, User, AIResponse } from "interfaces";
import {
  ErrorLogStats,
  TeacherAdvanceStats,
  UserRoleDistribution,
  RecentErrorLogs,
  RecentUsers,
  StatsSummaryCards,
  AIResponseStats,
  RecentAIResponses,
} from "../components/dashboard";
import { adminDashboardService } from "services/features/adminDashboardService";

export default function AdminDashboardPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dashboardData, setDashboardData] = useState<{
    errorLogStats: {
      total: number;
      highActiveCount: number;
      bySeverity: Record<SeverityEnum, number>;
      recentLogs: ErrorLog[];
    };
    userStats: {
      total: number;
      byRole: Record<RolesEnum, number>;
      recentUsers: User[];
      teacherAdvance: {
        total: number;
        byLevel: Record<string, number>;
        activeCount: number;
      };
    };
    aiResponseStats: {
      total: number;
      evaluatedCount: number;
      notEvaluatedCount: number;
      recentEvaluated: AIResponse[];
      recentNotEvaluated: AIResponse[];
    };
  }>({
    errorLogStats: {
      total: 0,
      highActiveCount: 0,
      bySeverity: {
        [SeverityEnum.LOW]: 0,
        [SeverityEnum.MEDIUM]: 0,
        [SeverityEnum.HIGH]: 0,
      },
      recentLogs: [],
    },
    userStats: {
      total: 0,
      byRole: {
        [RolesEnum.ADMIN]: 0,
        [RolesEnum.STUDENT]: 0,
        [RolesEnum.TEACHER]: 0,
        [RolesEnum.TEACHER_ADVANCE]: 0,
      },
      recentUsers: [],
      teacherAdvance: {
        total: 0,
        byLevel: {},
        activeCount: 0,
      },
    },
    aiResponseStats: {
      total: 0,
      evaluatedCount: 0,
      notEvaluatedCount: 0,
      recentEvaluated: [],
      recentNotEvaluated: [],
    },
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const resData = await adminDashboardService.getDashboardData();
        setDashboardData(resData.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();

    const intervalId = setInterval(() => {
      fetchDashboardData();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        backgroundColor: isDarkMode ? color.gray900 : color.gray50,
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          mb: 4,
          color: isDarkMode ? color.teal300 : color.teal700,
          borderBottom: `2px solid ${
            isDarkMode ? color.teal500 : color.teal400
          }`,
          pb: 1.5,
          px: 0.5,
        }}
      >
        Admin Dashboard
      </Typography>

      {/* Quick stats summary */}
      <StatsSummaryCards
        errorCount={dashboardData.errorLogStats.total}
        userCount={dashboardData.userStats.total}
        teacherAdvanceCount={dashboardData.userStats.teacherAdvance.total}
        highSeverityErrors={dashboardData.errorLogStats.highActiveCount}
        isLoading={isLoading}
      />

      <Grid container spacing={4} sx={{ mt: 1 }}>
        {/* Left Column - Error Logs */}
        <Grid item xs={12} lg={6}>
          <Stack spacing={4} sx={{ mt: 2 }}>
            <ErrorLogStats
              data={dashboardData.errorLogStats}
              isLoading={isLoading}
            />
            <RecentErrorLogs
              logs={dashboardData.errorLogStats.recentLogs}
              isLoading={isLoading}
            />
            <RecentAIResponses
              evaluatedResponses={dashboardData.aiResponseStats.recentEvaluated}
              notEvaluatedResponses={dashboardData.aiResponseStats.recentNotEvaluated}
              isLoading={isLoading}
            />
          </Stack>
        </Grid>

        {/* Right Column - User Stats */}
        <Grid item xs={12} lg={6}>
          <Stack spacing={4} direction={"column"}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <UserRoleDistribution
                  data={dashboardData.userStats.byRole}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TeacherAdvanceStats
                  data={dashboardData.userStats.teacherAdvance}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <RecentUsers
                  users={dashboardData.userStats.recentUsers}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
            <AIResponseStats
              data={dashboardData.aiResponseStats}
              isLoading={isLoading}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}