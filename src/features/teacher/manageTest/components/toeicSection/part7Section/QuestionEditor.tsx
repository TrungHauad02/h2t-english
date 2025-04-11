import React from 'react';
import { Grid } from '@mui/material';
import { ToeicPart7Question } from 'interfaces';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { WETextField } from 'components/input';
import { FormSectionCard, AnswerOptionsEditor } from '../dialogEdit';

interface QuestionEditorProps {
  question: ToeicPart7Question;
  onChange: (field: keyof ToeicPart7Question, value: any) => void;
}

export default function QuestionEditor({
  question,
  onChange
}: QuestionEditorProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const handleAnswerChange = (index: number, value: string) => {
    const answerField = `answer${index + 1}` as keyof ToeicPart7Question;
    onChange(answerField, value);
  };

  const answerOptions = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormSectionCard title="Question Content">
          <WETextField
            label="Question Content"
            type="text"
            value={question.content}
            onChange={(e) => onChange("content", e.target.value)}
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
        <FormSectionCard title="Answer Options">
          <AnswerOptionsEditor
            answers={[
              question.answer1,
              question.answer2,
              question.answer3,
              question.answer4
            ]}
            correctAnswer={question.correctAnswer}
            onAnswerChange={handleAnswerChange}
            onCorrectAnswerChange={(value) => onChange("correctAnswer", value)}
            answerOptions={answerOptions}
          />
        </FormSectionCard>
      </Grid>

      <Grid item xs={12}>
        <FormSectionCard title="Explanation">
          <WETextField
            label="Explanation"
            type="text"
            value={question.explanation}
            onChange={(e) => onChange("explanation", e.target.value)}
            multiline
            rows={4}
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
    </Grid>
  );
}