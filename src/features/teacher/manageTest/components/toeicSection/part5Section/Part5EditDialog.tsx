import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { ToeicPart5 } from 'interfaces';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { WETextField } from 'components/input';
import { 
  ToeicEditDialogBase, 
  StatusSwitch,
  FormSectionCard,
  AnswerOptionsEditor
} from '../dialogEdit';

interface Part5EditDialogProps {
  open: boolean;
  question: ToeicPart5;
  onClose: () => void;
  onSave: (updatedQuestion: ToeicPart5) => void;
}

export default function Part5EditDialog({ 
  open, 
  question, 
  onClose, 
  onSave 
}: Part5EditDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const [editedQuestion, setEditedQuestion] = useState<ToeicPart5>({ ...question });

  useEffect(() => {
    if (open) {
      setEditedQuestion({ ...question });
    }
  }, [open, question]);

  const handleChange = (field: keyof ToeicPart5, value: any) => {
    setEditedQuestion({ ...editedQuestion, [field]: value });
  };

  const handleSave = () => {
    onSave(editedQuestion);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const answerField = `answer${index + 1}` as keyof ToeicPart5;
    handleChange(answerField, value);
  };

  const answerOptions = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
  ];

  return (
    <ToeicEditDialogBase
      open={open}
      onClose={onClose}
      onSave={handleSave}
      title="Edit Part 5 Question"
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StatusSwitch 
            status={editedQuestion.status}
            onChange={(value) => handleChange('status', value)}
          />
        </Grid>

        <Grid item xs={12}>
          <FormSectionCard title="Question Content">
            <WETextField
              label="Question Content"
              type="text"
              value={editedQuestion.content}
              onChange={(e) => handleChange("content", e.target.value)}
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
                },
                mb: 3
              }}
            />
          </FormSectionCard>
        </Grid>

        <Grid item xs={12}>
          <FormSectionCard title="Answer Options">
            <AnswerOptionsEditor
              answers={[
                editedQuestion.answer1,
                editedQuestion.answer2,
                editedQuestion.answer3,
                editedQuestion.answer4
              ]}
              correctAnswer={editedQuestion.correctAnswer}
              onAnswerChange={handleAnswerChange}
              onCorrectAnswerChange={(value) => handleChange("correctAnswer", value)}
              answerOptions={answerOptions}
            />
          </FormSectionCard>
        </Grid>

        <Grid item xs={12}>
          <FormSectionCard title="Explanation">
            <WETextField
              label="Explanation"
              type="text"
              value={editedQuestion.explanation}
              onChange={(e) => handleChange("explanation", e.target.value)}
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
    </ToeicEditDialogBase>
  );
}