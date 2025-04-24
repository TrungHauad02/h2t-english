import { Grid } from '@mui/material';
import { ToeicQuestion } from 'interfaces';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { WETextField } from 'components/input';
import { FormSectionCard } from '../dialogEdit';
import EnhanceAnswerOptionsEditor from './EnhanceAnswerOptionsEditor';

interface QuestionEditorProps {
  question: ToeicQuestion;
  onChange: (field: keyof ToeicQuestion, value: any) => void;
  onAnswerChange?: (answerIndex: number, value: string) => void;
  onCorrectAnswerChange?: (answerIndex: number) => void;
}

export default function QuestionEditor({
  question,
  onChange,
  onAnswerChange,
  onCorrectAnswerChange
}: QuestionEditorProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const handleAnswerChange = (index: number, value: string) => {
    if (onAnswerChange) {
      onAnswerChange(index, value);
    } else {
      const updatedAnswers = [...question.answers];
      updatedAnswers[index] = {
        ...updatedAnswers[index],
        content: value
      };
      onChange('answers', updatedAnswers);
    }
  };

  const handleCorrectAnswerChange = (index: number) => {
    if (onCorrectAnswerChange) {
      // Sử dụng index nhất quán từ component cha
      onCorrectAnswerChange(index);
    } else {
      // Sử dụng index để cập nhật trạng thái đúng/sai
      const updatedAnswers = question.answers.map((answer, idx) => ({
        ...answer,
        correct: idx === index
      }));
      onChange('answers', updatedAnswers);
    }
  };

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
          <EnhanceAnswerOptionsEditor 
            answers={question.answers}
            onAnswerChange={handleAnswerChange}
            onCorrectAnswerChange={handleCorrectAnswerChange}
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