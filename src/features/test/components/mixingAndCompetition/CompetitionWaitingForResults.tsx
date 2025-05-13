import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Fade,
  Slide,
  Avatar,
  IconButton,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { 
  EmojiEvents as Trophy, 
  AccessTime as Clock, 
  Group as Users, 
  Description as FileText, 
  StarRate as Star,
  TrendingUp,
  CheckCircle,
  Timer,
  Groups as Group,
  Analytics as Assessment
} from "@mui/icons-material";
import { keyframes } from "@mui/system";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { useNavigate } from "react-router-dom";

interface CompetitionWaitingForResultsProps {
  competition: any;
  submitCompetitionId: number;
  endTime: Date;
}

export default function CompetitionWaitingForResults({
  competition,
  submitCompetitionId,
  endTime
}: CompetitionWaitingForResultsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const pulse = keyframes`
    0% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
    100% { opacity: 0.6; transform: scale(1); }
  `;

  const floating = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  `;

  const rotate = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `;

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = endTime.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeRemaining("Competition has ended");
        setProgress(100);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      
      // Calculate progress based on total competition duration
      const startTime = new Date(competition.startTime);
      const totalDuration = endTime.getTime() - startTime.getTime();
      const elapsed = now.getTime() - startTime.getTime();
      setProgress((elapsed / totalDuration) * 100);
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [competition, endTime]);

  const handleReviewClick = () => {
    navigate(`/history-test/competition/${submitCompetitionId}`);
  };

  const statisticsCards = [
    {
      icon: <Users sx={{ fontSize: 40 }} />,
      title: "Participants",
      value: "Waiting for others",
      color: isDarkMode ? color.teal400 : color.teal600,
      description: "Others are still completing their tests"
    },
    {
      icon: <Timer sx={{ fontSize: 40 }} />,
      title: "Time Remaining",
      value: timeRemaining,
      color: isDarkMode ? color.emerald400 : color.emerald600,
      description: "Until competition ends"
    },
    {
      icon: <Assessment sx={{ fontSize: 40 }} />,
      title: "Your Status",
      value: "Test Completed",
      color: isDarkMode ? color.green400 : color.green600,
      description: "Your submission has been recorded"
    }
  ];

  return (
    <Fade in={true} timeout={800}>
      <Box
        sx={{
          width: "100%",
          minHeight: "60vh",
          p: { xs: 2, md: 4 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background gradient effect */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isDarkMode
              ? `radial-gradient(circle at 50% 50%, ${color.teal950}, ${color.gray900})`
              : `radial-gradient(circle at 50% 50%, ${color.teal50}, ${color.gray50})`,
            opacity: 0.3,
            zIndex: 0,
          }}
        />

        {/* Floating elements for visual appeal */}
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            left: "10%",
            animation: `${floating} 4s ease-in-out infinite`,
            zIndex: 0,
            opacity: 0.1,
          }}
        >
          <Trophy sx={{ fontSize: 120, color: color.teal500 }} />
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: "20%",
            right: "10%",
            animation: `${floating} 4s ease-in-out infinite 2s`,
            zIndex: 0,
            opacity: 0.1,
          }}
        >
          <Star sx={{ fontSize: 100, color: color.emerald500 }} />
        </Box>

        {/* Main content */}
        <Box position="relative" zIndex={1}>
          <Paper
            elevation={12}
            sx={{
              p: { xs: 3, md: 5 },
              textAlign: "center",
              borderRadius: "2rem",
              background: isDarkMode
                ? `linear-gradient(145deg, ${color.gray800}, ${color.gray900})`
                : `linear-gradient(145deg, ${color.white}, ${color.gray100})`,
              boxShadow: isDarkMode
                ? `0 20px 40px rgba(0,0,0,0.5)`
                : `0 20px 40px rgba(0,0,0,0.1)`,
              backdropFilter: "blur(10px)",
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
              maxWidth: 1000,
              mx: "auto",
              mb: 4,
            }}
          >
            {/* Header with animation */}
            <Slide direction="down" in={true} timeout={600}>
              <Box>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mx: "auto",
                    mb: 3,
                    backgroundColor: isDarkMode ? color.teal400 : color.teal600,
                    animation: `${pulse} 2s ease-in-out infinite`,
                  }}
                >
                  <CheckCircle sx={{ fontSize: 60 }} />
                </Avatar>

                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    background: isDarkMode
                      ? `linear-gradient(45deg, ${color.teal400}, ${color.emerald400})`
                      : `linear-gradient(45deg, ${color.teal600}, ${color.emerald600})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 2,
                  }}
                >
                  Test Completed Successfully!
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    color: isDarkMode ? color.gray300 : color.gray700,
                    fontWeight: 500,
                  }}
                >
                  Now waiting for other participants to finish
                </Typography>
              </Box>
            </Slide>

            {/* Progress bar */}
            <Box sx={{ mb: 5 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Competition Progress
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(progress)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: isDarkMode ? color.gray700 : color.gray200,
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: isDarkMode ? color.teal400 : color.teal600,
                    borderRadius: 6,
                    background: isDarkMode
                      ? `linear-gradient(90deg, ${color.teal400}, ${color.emerald400})`
                      : `linear-gradient(90deg, ${color.teal600}, ${color.emerald600})`,
                  },
                }}
              />
            </Box>

            {/* Review button */}
            <Button
              variant="contained"
              size="large"
              onClick={handleReviewClick}
              startIcon={<FileText />}
              sx={{
                px: 5,
                py: 2,
                borderRadius: "50px",
                fontSize: "1.1rem",
                fontWeight: 600,
                background: isDarkMode
                  ? `linear-gradient(45deg, ${color.teal400}, ${color.emerald400})`
                  : `linear-gradient(45deg, ${color.teal600}, ${color.emerald600})`,
                boxShadow: isDarkMode
                  ? `0 4px 20px rgba(45, 212, 191, 0.4)`
                  : `0 4px 20px rgba(20, 184, 166, 0.3)`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: isDarkMode
                    ? `0 6px 30px rgba(45, 212, 191, 0.6)`
                    : `0 6px 30px rgba(20, 184, 166, 0.4)`,
                },
              }}
            >
              Review Your Test
            </Button>
          </Paper>

          {/* Statistics cards */}
          <Grid container spacing={3}>
            {statisticsCards.map((card, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Slide direction="up" in={true} timeout={800 + index * 200}>
                  <Card
                    elevation={8}
                    sx={{
                      height: "100%",
                      borderRadius: "1.5rem",
                      background: isDarkMode
                        ? `linear-gradient(145deg, ${color.gray800}, ${color.gray900})`
                        : `linear-gradient(145deg, ${color.white}, ${color.gray100})`,
                      border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: isDarkMode
                          ? `0 15px 30px rgba(0,0,0,0.5)`
                          : `0 15px 30px rgba(0,0,0,0.15)`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3, textAlign: "center" }}>
                      <IconButton
                        sx={{
                          backgroundColor: `${card.color}15`,
                          mb: 2,
                          animation: index === 1 ? `${rotate} 8s linear infinite` : "none",
                        }}
                      >
                        {React.cloneElement(card.icon, { sx: { color: card.color } })}
                      </IconButton>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          color: isDarkMode ? color.gray100 : color.gray900,
                        }}
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: card.color,
                          mb: 1,
                        }}
                      >
                        {card.value}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isDarkMode ? color.gray400 : color.gray600,
                        }}
                      >
                        {card.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>

          {/* Additional information */}
          <Box
            sx={{
              mt: 4,
              p: 3,
              textAlign: "center",
              borderRadius: "1rem",
              backgroundColor: isDarkMode
                ? `${color.teal900}20`
                : `${color.teal50}50`,
              border: `1px solid ${isDarkMode ? color.teal700 : color.teal200}`,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: isDarkMode ? color.teal300 : color.teal700,
                fontWeight: 500,
              }}
            >
              Results will be available once all participants complete their tests
              or when the competition time ends.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}