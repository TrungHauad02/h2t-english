import React, { useState, useEffect } from 'react';
import { Grid, Box, Stack, Typography } from '@mui/material';
import { ToeicPart3_4, ToeicQuestion } from 'interfaces';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { WETextField } from 'components/input';
import { base64ToBlobUrl } from 'utils/convert';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ListAltIcon from '@mui/icons-material/ListAlt';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import CampaignIcon from '@mui/icons-material/Campaign';
import { 
  ToeicEditDialogBase, 
  StatusSwitch,
  FormSectionCard,
  MediaFileSelector,
  EditTabs,
  QuestionTabPanel
} from '../../dialogEdit';
import { QuestionContentEditor } from './QuestionContentEditor';

interface Part3_4EditDialogProps {
  open: boolean;
  question: ToeicPart3_4;
  partNumber: 3 | 4;
  onClose: () => void;
  onSave: (updatedQuestion: ToeicPart3_4) => void;
  toeicQuestions?: { [partId: number]: ToeicQuestion[] };
}

export default function Part3_4EditDialog({
  open,
  question,
  partNumber,
  onClose,
  onSave,
  toeicQuestions = {}
}: Part3_4EditDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const [editedQuestion, setEditedQuestion] = useState<ToeicPart3_4>({ ...question });
  const [activeTab, setActiveTab] = useState(0);
  const [subQuestions, setSubQuestions] = useState<ToeicQuestion[]>([]);

  useEffect(() => {
    if (open) {
      setEditedQuestion({ ...question });
      setActiveTab(0);

      // Load sub-questions if available
      const questions = toeicQuestions[question.id] || [];
      setSubQuestions(questions);
    }
  }, [open, question, toeicQuestions]);

  const handleChange = (field: keyof ToeicPart3_4, value: any) => {
    if (field === "audio") {
      setEditedQuestion({
        ...editedQuestion,
        [field]: base64ToBlobUrl(value, "audio/mpeg"),
      });
      return;
    }
    
    if (field === "image") {
      setEditedQuestion({
        ...editedQuestion,
        [field]: base64ToBlobUrl(value, "image/png"),
      });
      return;
    }
    
    setEditedQuestion({ ...editedQuestion, [field]: value });
  };

  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
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

  // Generate tabs dynamically based on questions
  const tabs = [
    { 
      label: "Basic Information", 
      id: "basic-info",
      icon: <ListAltIcon fontSize="small" />
    }
  ];

  // Add tabs for each question
  editedQuestion.questions.forEach((_, index) => {
    tabs.push({
      label: `Question ${index + 1}`,
      id: `question-${index + 1}`,
      icon: <QuestionAnswerIcon fontSize="small" />
    });
  });

  const partTitle = partNumber === 3 ? "Conversations" : "Talks";
  const dialogTitle = `Edit Part ${partNumber}: ${partTitle}`;
  const partIcon = partNumber === 3 
    ? <RecordVoiceOverIcon sx={{ color: isDarkMode ? color.teal300 : color.teal600 }} /> 
    : <CampaignIcon sx={{ color: isDarkMode ? color.teal300 : color.teal600 }} />;
  const borderColor = isDarkMode ? color.gray700 : color.gray300;

  // Helper function to get the appropriate answers array for each question
  const getAnswersForQuestion = (questionIndex: number) => {
    const question = subQuestions[questionIndex];
    if (question && question.toeicAnswers) {
      return question.toeicAnswers.map(answer => answer.content);
    }
    return ["", "", "", ""];
  };

  // Helper function to update an answer
  const handleAnswerChange = (questionIndex: number, answerIndex: number, value: string) => {
    // In a real implementation, would update the subQuestions state
    console.log(`Update answer ${answerIndex + 1} for question ${questionIndex + 1}: ${value}`);
  };

  // Helper function to get correct answer field
  const getCorrectAnswerField = (questionIndex: number) => {
    const question = subQuestions[questionIndex];
    if (question && question.toeicAnswers) {
      const correctAnswerIndex = question.toeicAnswers.findIndex(answer => answer.correct);
      return correctAnswerIndex >= 0 ? String.fromCharCode(65 + correctAnswerIndex) : 'A';
    }
    return 'A';
  };

  return (
    <ToeicEditDialogBase
      open={open}
      onClose={onClose}
      onSave={handleSave}
      title={dialogTitle}
      maxWidth="lg"
    >
      <Box sx={{ mb: 3 }}>
        <EditTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          baseId="part3-4-edit"
        />
      </Box>

      <QuestionTabPanel value={activeTab} index={0} id="part3-4-edit">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormSectionCard 
              title="Status"
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
              <StatusSwitch 
                status={editedQuestion.status}
                onChange={(value) => handleChange('status', value)}
              />
            </FormSectionCard>
          </Grid>

          <Grid item xs={12}>
            <FormSectionCard 
              title="Media Files"
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
              <MediaFileSelector
                audioValue={editedQuestion.audio}
                imageValue={editedQuestion.image || ''}
                onAudioChange={(base64) => handleChange("audio", base64)}
                onImageChange={(base64) => handleChange("image", base64)}
                showImageSelector={true}
                imageRequired={false}
              />
            </FormSectionCard>
          </Grid>

          <Grid item xs={12}>
            <FormSectionCard 
              title="Transcript"
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
              <WETextField
                label="Transcript"
                type="text"
                value={editedQuestion.transcript}
                onChange={(e) => handleChange("transcript", e.target.value)}
                multiline
                rows={5}
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
      </QuestionTabPanel>

      {editedQuestion.questions.map((questionId, index) => (
        <QuestionTabPanel 
          key={questionId} 
          value={activeTab} 
          index={index + 1}
          id="part3-4-edit"
        >
          <QuestionContentEditor
            questionIndex={index}
            questionId={questionId}
            subQuestion={subQuestions[index]}
            editedQuestion={editedQuestion}
            handleChange={handleChange}
            answerOptions={answerOptions}
            getAnswersForQuestion={getAnswersForQuestion}
            handleAnswerChange={handleAnswerChange}
            getCorrectAnswerField={getCorrectAnswerField}
            isDarkMode={isDarkMode}
            color={color}
          />
        </QuestionTabPanel>
      ))}
    </ToeicEditDialogBase>
  );
}