import React from 'react';
import { Grid, Typography, Stack, Chip } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { WETextField } from 'components/input';
import { ToeicPart3_4, ToeicQuestion } from 'interfaces';
import { FormSectionCard, AnswerOptionsEditor } from '../../dialogEdit';

interface QuestionContentEditorProps {
  questionIndex: number;
  questionId: number;
  subQuestion?: ToeicQuestion;
  editedQuestion: ToeicPart3_4;
  handleChange: (field: keyof ToeicPart3_4, value: any) => void;
  answerOptions: { label: string; value: string }[];
  getAnswersForQuestion: (questionIndex: number) => string[];
  handleAnswerChange: (questionIndex: number, answerIndex: number, value: string) => void;
  getCorrectAnswerField: (questionIndex: number) => string;
  isDarkMode: boolean;
  color: any;
}

export function QuestionContentEditor({
  questionIndex,
  questionId,
  subQuestion,
  editedQuestion,
  handleChange,
  answerOptions,
  getAnswersForQuestion,
  handleAnswerChange,
  getCorrectAnswerField,
  isDarkMode,
  color
}: QuestionContentEditorProps) {
  const borderColor = isDarkMode ? color.gray700 : color.gray300;
  const answers = getAnswersForQuestion(questionIndex);
  const correctAnswer = getCorrectAnswerField(questionIndex);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormSectionCard 
          title="Question"
          sx={{
            backgroundColor: isDarkMode ? color.gray800 : color.white,
            borderRadius: '1rem',
            border: `1px solid ${borderColor}`,
            p: 2,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: '0 8px 16px 0 rgba(0,0,0,0.1)'
            }
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <QuestionAnswerIcon sx={{ color: isDarkMode ? color.teal300 : color.teal600 }} />
            <Typography variant="h6" fontWeight="bold">
              Question {questionIndex + 1}
            </Typography>
            {subQuestion && (
              <Chip 
                label={`ID: ${questionId}`} 
                size="small" 
                variant="outlined"
                sx={{ ml: 1 }}
              />
            )}
          </Stack>
          <WETextField
            label={`Question Content`}
            type="text"
            value={subQuestion?.content || ""}
            onChange={(e) => {
              // In a real implementation, would update the subQuestion
              console.log(`Update question ${questionIndex + 1} content: ${e.target.value}`);
            }}
            multiline
            rows={3}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "1rem",
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
        </FormSectionCard>
      </Grid>

      <Grid item xs={12}>
        <FormSectionCard 
          title="Answer Options"
          sx={{
            backgroundColor: isDarkMode ? color.gray800 : color.white,
            borderRadius: '1rem',
            border: `1px solid ${borderColor}`,
            p: 2,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: '0 8px 16px 0 rgba(0,0,0,0.1)'
            }
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <ListAltIcon sx={{ color: isDarkMode ? color.teal300 : color.teal600 }} />
            <Typography variant="h6" fontWeight="bold">
              Answer Options
            </Typography>
          </Stack>
          
          <AnswerOptionsEditor
            answers={answers}
            correctAnswer={correctAnswer}
            onAnswerChange={(index, value) => 
              handleAnswerChange(questionIndex, index, value)
            }
            onCorrectAnswerChange={(value) => {
              // In a real implementation, would update the correct answer
              console.log(`Update correct answer for question ${questionIndex + 1}: ${value}`);
            }}
            answerOptions={answerOptions}
          />
        </FormSectionCard>
      </Grid>

      {subQuestion?.explanation && (
        <Grid item xs={12}>
          <FormSectionCard 
            title="Explanation"
            sx={{
              backgroundColor: isDarkMode ? color.gray800 : color.white,
              borderRadius: '1rem',
              border: `1px solid ${borderColor}`,
              p: 2,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                boxShadow: '0 8px 16px 0 rgba(0,0,0,0.1)'
              }
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <TextSnippetIcon sx={{ color: isDarkMode ? color.teal300 : color.teal600 }} />
              <Typography variant="h6" fontWeight="bold">
                Explanation
              </Typography>
            </Stack>
            
            <WETextField
              label="Explanation"
              type="text"
              value={subQuestion.explanation}
              onChange={(e) => {
                // In a real implementation, would update the explanation
                console.log(`Update explanation for question ${questionIndex + 1}: ${e.target.value}`);
              }}
              multiline
              rows={3}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "1rem",
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
          </FormSectionCard>
        </Grid>
      )}
    </Grid>
  );
}