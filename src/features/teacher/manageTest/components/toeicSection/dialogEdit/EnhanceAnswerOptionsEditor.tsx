import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  Paper, 
  IconButton,
  Tooltip
} from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { ToeicAnswer } from 'interfaces';
import { WETextField } from 'components/input';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface AnswerOptionsEditorProps {
  answers: ToeicAnswer[];
  onAnswerChange: (index: number, value: string) => void;
  onCorrectAnswerChange: (value: string) => void;
}

export default function AnswerOptionsEditor({
  answers,
  onAnswerChange,
  onCorrectAnswerChange
}: AnswerOptionsEditorProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const answerLabels = ['A', 'B', 'C', 'D'];
  const correctAnswer = answers.find(answer => answer.correct)?.content || '';

  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant="subtitle1"
        sx={{
          color: isDarkMode ? color.gray300 : color.gray700,
          fontWeight: 'bold',
          mb: 2
        }}
      >
        Answer Options:
      </Typography>

      <RadioGroup
        value={correctAnswer}
        onChange={(e) => onCorrectAnswerChange(e.target.value)}
      >
        <Grid container spacing={2}>
          {answers.map((answer, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  borderRadius: '1rem',
                  border: `2px solid ${answer.correct 
                    ? (isDarkMode ? color.emerald400 : color.emerald500)
                    : 'transparent'
                  }`,
                  backgroundColor: isDarkMode 
                    ? color.gray800 
                    : color.white,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      mr: 1.5
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: isDarkMode ? color.teal300 : color.teal700,
                        fontWeight: 'bold',
                        mb: 1
                      }}
                    >
                      {answerLabels[index]}
                    </Typography>
                    
                    <FormControlLabel
                      value={answer.content}
                      control={
                        <Radio 
                          sx={{
                            color: isDarkMode ? color.emerald300 : color.emerald600,
                            '&.Mui-checked': {
                              color: isDarkMode ? color.emerald400 : color.emerald500,
                            }
                          }}
                        />
                      }
                      label=""
                      sx={{ m: 0 }}
                    />
                  </Box>
                  
                  <Box sx={{ flexGrow: 1 }}>
                    <WETextField
                      label={`Option ${answerLabels[index]}`}
                      value={answer.content}
                      type='text'
                      onChange={(e) => onAnswerChange(index, e.target.value)}
                      multiline
                      rows={2}
                      sx={{
                        width: '100%',
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "0.75rem",
                          width: "100%",
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: `1px solid ${isDarkMode ? color.gray600 : color.gray400}`,
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: `2px solid ${
                              isDarkMode ? color.emerald400 : color.emerald500
                            }`,
                          },
                          backgroundColor: isDarkMode ? color.gray900 : color.white,
                        },
                        "& .MuiInputLabel-root": {
                          color: isDarkMode ? color.gray300 : color.gray700,
                          "&.Mui-focused": {
                            color: isDarkMode ? color.emerald400 : color.emerald600
                          }
                        }
                      }}
                    />
                  </Box>
                  
                  {answer.correct && (
                    <Tooltip title="Correct Answer">
                      <IconButton 
                        size="small"
                        sx={{ 
                          color: isDarkMode ? color.emerald400 : color.emerald500,
                          ml: 1
                        }}
                      >
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </Box>
  );
}