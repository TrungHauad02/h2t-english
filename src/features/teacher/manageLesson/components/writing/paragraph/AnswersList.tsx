import {
  Box,
  Button,
  List,
  ListItem,
  Divider,
  IconButton,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { WritingAnswer } from "interfaces";

interface AnswersListProps {
  answers: WritingAnswer[];
  handleAddAnswer: () => void;
  handleAnswerChange: (
    index: number,
    field: keyof WritingAnswer,
    value: any
  ) => void;
  handleDeleteAnswer: (id: number) => void;
}

export function AnswersList({
  answers,
  handleAddAnswer,
  handleAnswerChange,
  handleDeleteAnswer,
}: AnswersListProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;
  const secondaryBgColor = isDarkMode ? color.gray700 : color.gray200;

  return (
    <Box>
      <Typography variant="subtitle1" color={textColor} sx={{ mb: 1.5 }}>
        Answers
      </Typography>
      <Button
        startIcon={<AddIcon />}
        onClick={handleAddAnswer}
        variant="outlined"
        sx={{
          color: accentColor,
          borderColor: accentColor,
          "&:hover": {
            bgcolor: isDarkMode ? color.teal800 : color.teal100,
          },
          mb: 2,
        }}
      >
        Add Answer
      </Button>

      <List
        sx={{
          bgcolor: secondaryBgColor,
          borderRadius: 2,
          border: `1px solid ${borderColor}`,
          p: 2,
        }}
      >
        {answers.map((answer, index) => (
          <Box key={answer.id}>
            {index > 0 && <Divider sx={{ my: 2, borderColor: borderColor }} />}
            <ListItem
              sx={{
                p: 1.5,
                borderRadius: 1,
                "&:hover": {
                  bgcolor: isDarkMode ? color.gray600 : color.gray100,
                },
                transition: "background-color 0.2s",
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Position"
                    type="number"
                    value={answer.missingIndex}
                    onChange={(e) =>
                      handleAnswerChange(
                        index,
                        "missingIndex",
                        parseInt(e.target.value)
                      )
                    }
                    fullWidth
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                        bgcolor: isDarkMode ? color.gray800 : color.white,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Correct Answer"
                    value={answer.correctAnswer}
                    onChange={(e) =>
                      handleAnswerChange(index, "correctAnswer", e.target.value)
                    }
                    fullWidth
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1,
                        bgcolor: isDarkMode ? color.gray800 : color.white,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2} sx={{ textAlign: "right" }}>
                  <IconButton
                    onClick={() => handleDeleteAnswer(answer.id)}
                    sx={{
                      color: color.red500,
                      "&:hover": {
                        bgcolor: isDarkMode ? color.red900 : color.red100,
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          </Box>
        ))}
      </List>
    </Box>
  );
}
