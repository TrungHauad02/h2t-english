import { Box, Typography, Paper, CircularProgress, Divider, Chip } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

interface TestScoreSectionProps {
  score: number | undefined;
  maxScore?: number;
}

export default function TestScoreSection({ score, maxScore = 10 }: TestScoreSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  if (score === undefined) return null;

  // Calculate percentage for the circular progress
  const percentage = (score / maxScore) * 100;
  
  // Determine color based on score
  const getScoreColor = () => {
    if (percentage >= 80) return isDarkMode ? color.emerald400 : color.emerald600;
    if (percentage >= 60) return isDarkMode ? color.teal400 : color.teal600;
    if (percentage >= 40) return isDarkMode ? color.yellow : color.warning;
    return isDarkMode ? color.red400 : color.red600;
  };

  const scoreColor = getScoreColor();
  
  // Determine message based on score
  const getMessage = () => {
    if (percentage >= 90) return "Excellent!";
    if (percentage >= 80) return "Great job!";
    if (percentage >= 70) return "Good work!";
    if (percentage >= 60) return "Satisfactory";
    if (percentage >= 50) return "Almost there";
    return "Needs improvement";
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        borderLeft: `6px solid ${scoreColor}`,
        mb: 4,
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <EmojiEventsIcon sx={{ 
          color: isDarkMode ? color.teal300 : color.teal600,
          fontSize: 28,
          mr: 1.5
        }} />
        <Typography 
          variant="h6" 
          sx={{ 
            color: isDarkMode ? color.teal200 : color.teal700,
            fontWeight: 600,
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: -4,
              left: 0,
              width: "40px",
              height: "3px",
              backgroundColor: isDarkMode ? color.teal400 : color.teal500,
              borderRadius: "2px"
            }
          }}
        >
          Your Result
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 3, backgroundColor: isDarkMode ? color.gray600 : color.gray200 }} />
      
      <Box sx={{ 
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap"
      }}>
        <Box sx={{ 
          position: "relative", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          width: 120,
          height: 120
        }}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={120}
            thickness={4}
            sx={{
              color: isDarkMode ? color.gray700 : color.gray200,
              position: "absolute",
            }}
          />
          <CircularProgress
            variant="determinate"
            value={percentage}
            size={120}
            thickness={6}
            sx={{
              color: scoreColor,
              position: "absolute",
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: scoreColor,
                mb: -0.5
              }}
            >
              {score}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode ? color.gray400 : color.gray600,
                fontWeight: 500
              }}
            >
              / {maxScore}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ 
          display: "flex", 
          flexDirection: "column",
          flex: 1,
          ml: 2,
          alignItems: { xs: "center", sm: "flex-start" },
          mt: { xs: 2, sm: 0 }
        }}>
          <Chip 
            label={getMessage()}
            sx={{
              backgroundColor: `${scoreColor}20`,
              color: scoreColor,
              fontWeight: 600,
              fontSize: "0.9rem",
              mb: 1.5,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          />
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: isDarkMode ? color.gray300 : color.gray700,
              fontWeight: 500
            }}
          >
            Your score indicates {
              percentage >= 80 ? "an excellent understanding of the material." :
              percentage >= 60 ? "a good grasp of most concepts." :
              percentage >= 40 ? "some understanding, with room for improvement." :
              "areas that need significant improvement."
            }
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}