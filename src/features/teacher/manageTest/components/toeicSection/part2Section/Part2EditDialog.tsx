import React, { useState, useEffect } from 'react';
import { Grid, Typography, Stack, Box } from '@mui/material';
import { ToeicPart2 } from 'interfaces';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { WETextField } from 'components/input';
import { base64ToBlobUrl } from 'utils/convert';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
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
  mode?: 'edit' | 'add';
}

export default function Part2EditDialog({ 
  open, 
  question, 
  onClose, 
  onSave,
  mode = 'edit'
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

  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  return (
    <ToeicEditDialogBase
      open={open}
      onClose={onClose}
      onSave={handleSave}
      title={mode === 'edit' ? "Edit Part 2 Question" : "Add Part 2 Question"}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormSectionCard title="Status">
            <StatusSwitch 
              status={editedQuestion.status}
              onChange={(value) => handleChange('status', value)}
            />
          </FormSectionCard>
        </Grid>

        <Grid item xs={12}>
          <FormSectionCard title="Audio File">
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <HeadphonesIcon sx={{ color: accentColor }} />
              <Typography variant="h6" fontWeight="bold">Audio File</Typography>
            </Stack>
            
            <MediaFileSelector
              audioValue={editedQuestion.audio}
              onAudioChange={(base64) => handleChange("audio", base64)}
              showImageSelector={false}
            />
          </FormSectionCard>
        </Grid>

        <Grid item xs={12} md={8}>
          <FormSectionCard title="Transcript">
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <TextSnippetIcon sx={{ color: accentColor }} />
              <Typography variant="h6" fontWeight="bold">Transcript</Typography>
            </Stack>
            
            <WETextField
              label="Question Transcript"
              type="text"
              value={editedQuestion.transcript}
              onChange={(e) => handleChange("transcript", e.target.value)}
              multiline
              rows={6}
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

        <Grid item xs={12} md={4}>
          <FormSectionCard title="Correct Answer">
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <QuestionAnswerIcon sx={{ color: accentColor }} />
              <Typography variant="h6" fontWeight="bold">Correct Answer</Typography>
            </Stack>
            
            <Box sx={{ pt: 2 }}>
              <AnswerOptionsEditor
                answers={[]}
                correctAnswer={editedQuestion.correctAnswer}
                onAnswerChange={() => {}}
                onCorrectAnswerChange={(value) => handleChange("correctAnswer", value)}
                answerOptions={answerOptions}
                optionLabels={['A', 'B', 'C']}
              />
            </Box>
          </FormSectionCard>
        </Grid>
      </Grid>
    </ToeicEditDialogBase>
  );
}