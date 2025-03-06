import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import QuizIcon from "@mui/icons-material/Quiz";
import AddIcon from "@mui/icons-material/Add";

interface QuestionsSectionProps {
  questions: number[];
}

export default function QuestionsSection({ questions }: QuestionsSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Common styles
  const cardBgColor = isDarkMode ? color.gray700 : color.white;
  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <QuizIcon
            sx={{
              mr: 1.5,
              color: accentColor,
              fontSize: 28,
            }}
          />
          <Typography variant="h5" fontWeight="medium">
            Questions ({questions.length})
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: isDarkMode ? color.emerald400 : color.emerald600,
            color: "white",
            "&:hover": {
              bgcolor: isDarkMode ? color.emerald500 : color.emerald700,
            },
          }}
        >
          Add Question
        </Button>
      </Box>

      {questions.length > 0 ? (
        <Grid container spacing={2.5}>
          {questions.map((questionId, index) => (
            <Grid item xs={12} sm={6} md={4} key={questionId}>
              <Paper
                elevation={isDarkMode ? 3 : 1}
                sx={{
                  p: 2.5,
                  bgcolor: cardBgColor,
                  color: textColor,
                  border: `1px solid ${borderColor}`,
                  borderLeft: `4px solid ${accentColor}`,
                  borderRadius: 2,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: isDarkMode
                      ? "0 6px 12px rgba(0,0,0,0.3)"
                      : "0 4px 8px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  gutterBottom
                >
                  Question {index + 1}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: secondaryTextColor, mb: 2 }}
                >
                  ID: {questionId}
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    mt: 1,
                    bgcolor: isDarkMode ? color.teal700 : color.teal500,
                    color: "white",
                    "&:hover": {
                      bgcolor: isDarkMode ? color.teal600 : color.teal600,
                    },
                    width: "100%",
                  }}
                >
                  View Question
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            bgcolor: isDarkMode ? color.gray700 : color.teal50,
            color: secondaryTextColor,
            borderRadius: 3,
            border: `1px dashed ${isDarkMode ? color.gray600 : color.teal300}`,
          }}
        >
          <QuizIcon
            sx={{
              fontSize: 40,
              color: isDarkMode ? color.gray500 : color.teal300,
              mb: 1,
            }}
          />
          <Typography variant="body1">No questions added yet.</Typography>
        </Paper>
      )}
    </Box>
  );
}
