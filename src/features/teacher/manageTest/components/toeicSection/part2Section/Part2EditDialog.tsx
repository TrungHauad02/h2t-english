import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { ToeicPart2 } from 'interfaces';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { WETextField } from 'components/input';
import { base64ToBlobUrl } from 'utils/convert';
import { 
  ToeicEditDialogBase, 
  StatusSwitch,
  FormSectionCard,
  MediaFileSelector,
  AnswerOptionsEditor
} from '../dialogEdit';

interface Part2EditDialogProps {
  open: boolean;
  question: ToeicPart2;
  onClose: () => void;
  onSave: (updatedQuestion: ToeicPart2) => void;
}

export default function Part2EditDialog({ 
  open, 
  question, 
  onClose, 
  onSave 
}: Part2EditDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const [editedQuestion, setEditedQuestion] = useState<ToeicPart2>({ ...question });

  useEffect(() => {
    if (open) {
      setEditedQuestion({ ...question });
    }
  }, [open, question]);

  const handleChange = (field: keyof ToeicPart2, value: any) => {
    if (field === "audio") {
      setEditedQuestion({
        ...editedQuestion,
        [field]: base64ToBlobUrl(value, "audio/mpeg"),
      });
      return;
    }
    setEditedQuestion({ ...editedQuestion, [field]: value });
  };

  const handleSave = () => {
    onSave(editedQuestion);
  };

  const answerOptions = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
  ];

  return (
    <ToeicEditDialogBase
      open={open}
      onClose={onClose}
      onSave={handleSave}
      title="Edit Part 2 Question"
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StatusSwitch 
            status={editedQuestion.status}
            onChange={(value) => handleChange('status', value)}
          />
        </Grid>

        <Grid item xs={12}>
          <FormSectionCard title="Audio File">
            <MediaFileSelector
              audioValue={editedQuestion.audio}
              onAudioChange={(base64) => handleChange("audio", base64)}
              showImageSelector={false}
            />
          </FormSectionCard>
        </Grid>

        <Grid item xs={12}>
          <FormSectionCard title="Question Details">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <WETextField
                  label="Transcript"
                  type="text"
                  value={editedQuestion.transcript}
                  onChange={(e) => handleChange("transcript", e.target.value)}
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
                    },
                    mb: 3
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <AnswerOptionsEditor
                  answers={[]}
                  correctAnswer={editedQuestion.correctAnswer}
                  onAnswerChange={() => {}}
                  onCorrectAnswerChange={(value) => handleChange("correctAnswer", value)}
                  answerOptions={answerOptions}
                  optionLabels={['A', 'B', 'C']}
                />
              </Grid>
            </Grid>
          </FormSectionCard>
        </Grid>
      </Grid>
    </ToeicEditDialogBase>
  );
}