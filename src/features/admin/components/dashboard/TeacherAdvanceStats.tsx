import { Box, Paper, Typography, Skeleton, Divider } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import SchoolIcon from "@mui/icons-material/School";
import DonutChart from "./charts/DonutChart";

interface TeacherAdvanceStatsProps {
  data: {
    total: number;
    byLevel: Record<string, number>;
    activeCount: number;
  };
  isLoading: boolean;
}

export default function TeacherAdvanceStats({
  data,
  isLoading,
}: TeacherAdvanceStatsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const levelColors = {
    BACHELOR: isDarkMode ? color.teal400 : color.teal500,
    MASTER: isDarkMode ? color.emerald400 : color.emerald500,
    DOCTOR: isDarkMode ? color.green400 : color.green500,
    PROFESSOR: isDarkMode ? color.teal300 : color.teal700,
  };

  const chartData = Object.entries(data.byLevel).map(([level, count]) => ({
    name: level,
    value: count,
    color: levelColors[level as keyof typeof levelColors] || color.gray500,
  }));

  const activePercentage =
    data.total > 0 ? (data.activeCount / data.total) * 100 : 0;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          borderBottom: `2px solid ${
            isDarkMode ? color.gray700 : color.gray200
          }`,
          pb: 1,
        }}
      >
        <SchoolIcon
          sx={{
            color: isDarkMode ? color.emerald400 : color.emerald600,
            mr: 1,
          }}
        />
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: isDarkMode ? color.emerald300 : color.emerald700 }}
        >
          Advanced Teachers
        </Typography>
      </Box>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}>
          <Skeleton
            variant="circular"
            width={150}
            height={150}
            sx={{
              bgcolor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            }}
          />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 180,
            }}
          >
            <DonutChart data={chartData} />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mt: 2 }}>
            {chartData.map((item) => (
              <Box
                key={item.name}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: item.color,
                      mr: 1,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
                  >
                    {item.name}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
                >
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              mt: 2,
              p: 1.5,
              borderRadius: "0.5rem",
              backgroundColor: isDarkMode
                ? `rgba(34, 197, 94, 0.1)`
                : `rgba(22, 163, 74, 0.1)`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: isDarkMode ? color.green300 : color.green700 }}
            >
              Active Teachers
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{ color: isDarkMode ? color.green300 : color.green700 }}
              >
                {data.activeCount} / {data.total}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  ml: 1,
                  backgroundColor: isDarkMode ? color.green700 : color.green500,
                  color: color.white,
                  px: 1,
                  py: 0.5,
                  borderRadius: "1rem",
                }}
              >
                {activePercentage.toFixed(1)}%
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Paper>
  );
}
