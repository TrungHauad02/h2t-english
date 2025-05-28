import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import useAuth from "hooks/useAuth";
import { CompetitionTest, Toeic, AIResponse } from "interfaces";
import { 
  AIResponseManagementStats, 
  CompetitionManagementStats, 
  RecentManagementActivities, 
  ToeicManagementStats 
} from "../components";
import { teacherAdvanceDashboardService } from "../services/teacherAdvanceDashboardService";

export default function TeacherAdvanceDashboardPage() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dashboardData, setDashboardData] = useState<{
    competitionStats: {
      totalCompetitions: number;
      activeCompetitions: number;
      completedCompetitions: number;
      totalSubmissions: number;
      recentCompetitions: CompetitionTest[];
    };
    toeicStats: {
      totalTests: number;
      activeTests: number;
      totalAttempts: number;
      averageScore: number;
      recentTests: Toeic[];
    };
    aiResponseStats: {
      totalResponses: number;
      evaluatedResponses: number;
      pendingEvaluation: number;
      recentResponses: AIResponse[];
    };
  }>({
    competitionStats: {
      totalCompetitions: 0,
      activeCompetitions: 0,
      completedCompetitions: 0,
      totalSubmissions: 0,
      recentCompetitions: [],
    },
    toeicStats: {
      totalTests: 0,
      activeTests: 0,
      totalAttempts: 0,
      averageScore: 0,
      recentTests: [],
    },
    aiResponseStats: {
      totalResponses: 0,
      evaluatedResponses: 0,
      pendingEvaluation: 0,
      recentResponses: [],
    },
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!userId) return;
      
      setIsLoading(true);
      try {
        const resData = await teacherAdvanceDashboardService.getDashboardData(Number(userId));
        setDashboardData(resData.data);
      } catch (error) {
        console.error("Error fetching teacher advance dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();

    // Refresh data every 5 minutes
    const intervalId = setInterval(() => {
      fetchDashboardData();
    }, 300000);

    return () => clearInterval(intervalId);
  }, [userId]);

  const handleAIResponseView = (response: AIResponse) => {
    // Store the response in sessionStorage to be picked up by the AI Response page
    sessionStorage.setItem('selectedAIResponse', JSON.stringify(response));
    // Navigate to AI Response page
    navigate("/teacher-advance/ai-response");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        backgroundColor: isDarkMode ? color.gray900 : color.gray50,
        mt: 4,
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
        Teacher Advance Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Top Row - Management Stats */}
        <Grid item xs={12} md={6} lg={4}>
          <CompetitionManagementStats
            data={dashboardData.competitionStats}
            isLoading={isLoading}
          />
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <ToeicManagementStats
            data={dashboardData.toeicStats}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12} lg={4}>
          <AIResponseManagementStats
            data={dashboardData.aiResponseStats}
            isLoading={isLoading}
          />
        </Grid>

        {/* Bottom Row - Recent Activities */}
        <Grid item xs={12}>
          <RecentManagementActivities
            competitions={dashboardData.competitionStats.recentCompetitions}
            toeicTests={dashboardData.toeicStats.recentTests}
            aiResponses={dashboardData.aiResponseStats.recentResponses}
            isLoading={isLoading}
            onNavigate={handleNavigate}
            onAIResponseView={handleAIResponseView}
          />
        </Grid>
      </Grid>
    </Box>
  );
}