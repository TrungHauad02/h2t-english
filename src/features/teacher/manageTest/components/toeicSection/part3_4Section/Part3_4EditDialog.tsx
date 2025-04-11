import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { ToeicPart3_4 } from 'interfaces';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { WETextField } from 'components/input';
import { base64ToBlobUrl } from 'utils/convert';
import { 
  ToeicEditDialogBase, 
  StatusSwitch,
  FormSectionCard,
  MediaFileSelector,
  AnswerOptionsEditor,
  EditTabs,
  QuestionTabPanel
} from '../dialogEdit';

interface Part3_4EditDialogProps {
  open: boolean;
  question: ToeicPart3_4;
  partNumber: 3 | 4;
  onClose: () => void;
  onSave: (updatedQuestion: ToeicPart3_4) => void;
}

export default function Part3_4EditDialog({
  open,
  question,
  partNumber,
  onClose,
  onSave
}: Part3_4EditDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const [editedQuestion, setEditedQuestion] = useState<ToeicPart3_4>({ ...question });
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (open) {
      setEditedQuestion({ ...question });
      setActiveTab(0);
    }
  }, [open, question]);

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

  const tabs = [
    { label: "Basic Information", id: "basic-info" },
    { label: "Question 1", id: "question-1" },
    { label: "Question 2", id: "question-2" },
    { label: "Question 3", id: "question-3" },
  ];

  const partTitle = partNumber === 3 ? "Conversations" : "Talks";
  const dialogTitle = `Edit Part ${partNumber}: ${partTitle}`;

  // Helper function to get the appropriate answers array for each question
  const getAnswersForQuestion = (questionIndex: number) => {
    switch (questionIndex) {
      case 1:
        return [
          editedQuestion.answer1Q1,
          editedQuestion.answer2Q1,
          editedQuestion.answer3Q1,
          editedQuestion.answer4Q1
        ];
      case 2:
        return [
          editedQuestion.answer1Q2,
          editedQuestion.answer2Q2,
          editedQuestion.answer3Q2,
          editedQuestion.answer4Q2
        ];
      case 3:
        return [
          editedQuestion.answer1Q3,
          editedQuestion.answer2Q3,
          editedQuestion.answer3Q3,
          editedQuestion.answer4Q3
        ];
      default:
        return ["", "", "", ""];
    }
  };

  // Helper function to update an answer
  const handleAnswerChange = (questionIndex: number, answerIndex: number, value: string) => {
    const answerField = `answer${answerIndex + 1}Q${questionIndex}` as keyof ToeicPart3_4;
    handleChange(answerField, value);
  };

  // Helper function to get correct answer field
  const getCorrectAnswerField = (questionIndex: number) => {
    return `correctAnswer${questionIndex}` as keyof ToeicPart3_4;
  };

  return (
    <ToeicEditDialogBase
      open={open}
      onClose={onClose}
      onSave={handleSave}
      title={dialogTitle}
      maxWidth="lg"
    >
      <EditTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        baseId="part3-4-edit"
      />

      <QuestionTabPanel value={activeTab} index={0} id="part3-4-edit">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StatusSwitch 
              status={editedQuestion.status}
              onChange={(value) => handleChange('status', value)}
            />
          </Grid>

          <Grid item xs={12}>
            <FormSectionCard title="Media Files">
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
            <FormSectionCard title="Transcript">
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

      {[1, 2, 3].map((questionIndex) => (
        <QuestionTabPanel 
          key={questionIndex} 
          value={activeTab} 
          index={questionIndex}
          id="part3-4-edit"
        >
          <QuestionContentEditor
            questionIndex={questionIndex}
            editedQuestion={editedQuestion}
            handleChange={handleChange}
            answerOptions={answerOptions}
            getAnswersForQuestion={getAnswersForQuestion}
            handleAnswerChange={handleAnswerChange}
            getCorrectAnswerField={getCorrectAnswerField}
          />
        </QuestionTabPanel>
      ))}
    </ToeicEditDialogBase>
  );
}

// Sub-component for question content editing
interface QuestionContentEditorProps {
  questionIndex: number;
  editedQuestion: ToeicPart3_4;
  handleChange: (field: keyof ToeicPart3_4, value: any) => void;
  answerOptions: { label: string; value: string }[];
  getAnswersForQuestion: (questionIndex: number) => string[];
  handleAnswerChange: (questionIndex: number, answerIndex: number, value: string) => void;
  getCorrectAnswerField: (questionIndex: number) => keyof ToeicPart3_4;
}

function QuestionContentEditor({
  questionIndex,
  editedQuestion,
  handleChange,
  answerOptions,
  getAnswersForQuestion,
  handleAnswerChange,
  getCorrectAnswerField
}: QuestionContentEditorProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const contentField = `contentQuestion${questionIndex}` as keyof ToeicPart3_4;
  const correctAnswerField = getCorrectAnswerField(questionIndex);
  const answers = getAnswersForQuestion(questionIndex);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormSectionCard title={`Question ${questionIndex}`}>
          <WETextField
            label={`Question ${questionIndex} Content`}
            type="text"
            value={editedQuestion[contentField] as string}
            onChange={(e) => handleChange(contentField, e.target.value)}
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
            answers={answers}
            correctAnswer={editedQuestion[correctAnswerField] as string}
            onAnswerChange={(index, value) => 
              handleAnswerChange(questionIndex, index, value)
            }
            onCorrectAnswerChange={(value) => 
              handleChange(correctAnswerField, value)
            }
            answerOptions={answerOptions}
          />
        </FormSectionCard>
      </Grid>
    </Grid>
  );
}