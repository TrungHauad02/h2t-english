import React from "react";
import { Grid, Paper, Box, Typography, Skeleton } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface StatsSummaryCardsProps {
  errorCount: number;
  userCount: number;
  teacherAdvanceCount: number;
  highSeverityErrors: number;
  isLoading: boolean;
}

export default function StatsSummaryCards({
  errorCount,
  userCount,
  teacherAdvanceCount,
  highSeverityErrors,
  isLoading,
}: StatsSummaryCardsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const cards = [
    {
      title: "Total Users",
      value: userCount,
      icon: <PeopleAltIcon sx={{ fontSize: 40 }} />,
      backgroundColor: isDarkMode ? color.teal800 : color.teal100,
      iconColor: color.teal500,
      textColor: isDarkMode ? color.white : color.teal900,
    },
    {
      title: "Advanced Teachers",
      value: teacherAdvanceCount,
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      backgroundColor: isDarkMode ? color.emerald800 : color.emerald100,
      iconColor: color.emerald500,
      textColor: isDarkMode ? color.white : color.emerald900,
    },
    {
      title: "Error Logs",
      value: errorCount,
      icon: <ErrorOutlineIcon sx={{ fontSize: 40 }} />,
      backgroundColor: isDarkMode ? color.gray800 : color.gray100,
      iconColor: color.gray500,
      textColor: isDarkMode ? color.white : color.gray900,
    },
    {
      title: "High Severity Errors",
      value: highSeverityErrors,
      icon: <WarningAmberIcon sx={{ fontSize: 40 }} />,
      backgroundColor: isDarkMode ? color.red700 : color.red100,
      iconColor: color.red500,
      textColor: isDarkMode ? color.white : color.red900,
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: "1rem",
              backgroundColor: card.backgroundColor,
              height: "100%",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{ color: card.textColor, fontWeight: "bold" }}
                >
                  {card.title}
                </Typography>
                {isLoading ? (
                  <Skeleton
                    variant="rectangular"
                    width={60}
                    height={40}
                    sx={{
                      bgcolor: isDarkMode
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.1)",
                    }}
                  />
                ) : (
                  <Typography
                    variant="h4"
                    sx={{ color: card.textColor, fontWeight: "bold" }}
                  >
                    {card.value.toLocaleString()}
                  </Typography>
                )}
              </Box>
              <Box
                sx={{
                  backgroundColor: isDarkMode
                    ? "rgba(0,0,0,0.2)"
                    : "rgba(255,255,255,0.4)",
                  borderRadius: "50%",
                  width: 64,
                  height: 64,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: card.iconColor,
                }}
              >
                {card.icon}
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
