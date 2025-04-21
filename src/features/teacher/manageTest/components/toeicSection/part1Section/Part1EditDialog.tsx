import React, { useState, useEffect } from 'react';
import { Grid, Typography, Stack, Box } from '@mui/material';
import { ToeicPart1 } from 'interfaces';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { WETextField } from 'components/input';
import { base64ToBlobUrl } from 'utils/convert';
import ImageIcon from '@mui/icons-material/Image';
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

interface Part1EditDialogProps {
  open: boolean;
  question: ToeicPart1;
  onClose: () => void;
  onSave: (updatedQuestion: ToeicPart1) => void;
  mode?: 'edit' | 'add';
}

export default function Part1EditDialog({ 
  open, 
  question, 
  onClose, 
  onSave,
  mode = 'edit'
}: Part1EditDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const [editedQuestion, setEditedQuestion] = useState<ToeicPart1>({ ...question });

  useEffect(() => {
    if (open) {
      setEditedQuestion({ ...question });
    }
  }, [open, question]);

  const handleChange = (field: keyof ToeicPart1, value: any) => {
    if (field === "image" || field === "audio") {
      setEditedQuestion({
        ...editedQuestion,
        [field]: base64ToBlobUrl(value, field === "image" ? "image/png" : "audio/mpeg"),
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
    { label: 'D', value: 'D' },
  ];


  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  return (
    <ToeicEditDialogBase
      open={open}
      onClose={onClose}
      onSave={handleSave}
      title={mode === 'edit' ? "Edit Part 1 Question" : "Add Part 1 Question"}
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
          <FormSectionCard title="Media Files">
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <ImageIcon sx={{ color: accentColor }} />
                <Typography fontWeight="medium" color={isDarkMode ? color.gray300 : color.gray700}>
                  Image File (Required)
                </Typography>
              </Stack>
              
              <Stack direction="row" spacing={1} alignItems="center">
                <HeadphonesIcon sx={{ color: accentColor }} />
                <Typography fontWeight="medium" color={isDarkMode ? color.gray300 : color.gray700}>
                  Audio File
                </Typography>
              </Stack>
              
              <MediaFileSelector
                audioValue={editedQuestion.audio}
                imageValue={editedQuestion.image}
                onAudioChange={(base64) => handleChange("audio", base64)}
                onImageChange={(base64) => handleChange("image", base64)}
                showImageSelector={true}
                imageRequired={true}
              />
            </Stack>
          </FormSectionCard>
        </Grid>

        <Grid item xs={12} md={8}>
          <FormSectionCard title="Transcript">
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <TextSnippetIcon sx={{ color: accentColor }} />
              <Typography fontWeight="medium" color={isDarkMode ? color.gray300 : color.gray700}>
                Audio Transcript
              </Typography>
            </Stack>
            
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
                }
              }}
            />
          </FormSectionCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormSectionCard title="Correct Answer">
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <QuestionAnswerIcon sx={{ color: accentColor }} />
              <Typography fontWeight="medium" color={isDarkMode ? color.gray300 : color.gray700}>
                Select Correct Option
              </Typography>
            </Stack>
            
            <Box>
              <AnswerOptionsEditor
                answers={[]}
                correctAnswer={editedQuestion.correctAnswer}
                onAnswerChange={() => {}}
                onCorrectAnswerChange={(value) => handleChange("correctAnswer", value)}
                answerOptions={answerOptions}
              />
            </Box>
          </FormSectionCard>
        </Grid>
      </Grid>
    </ToeicEditDialogBase>
  );
}