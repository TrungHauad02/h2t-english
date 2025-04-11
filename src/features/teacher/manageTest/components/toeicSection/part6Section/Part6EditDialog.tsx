import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { ToeicPart6,  } from 'interfaces';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { WETextField, WEDocumentInput } from 'components/input';
import { base64ToBlobUrl } from 'utils/convert';
import { 
  ToeicEditDialogBase, 
  StatusSwitch,
  FormSectionCard,
  AnswerOptionsEditor,
  EditTabs,
  QuestionTabPanel
} from '../dialogEdit';

interface Part6EditDialogProps {
  open: boolean;
  question: ToeicPart6;
  onClose: () => void;
  onSave: (updatedQuestion: ToeicPart6) => void;
}

export default function Part6EditDialog({ 
  open, 
  question, 
  onClose, 
  onSave 
}: Part6EditDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const [editedQuestion, setEditedQuestion] = useState<ToeicPart6>({ ...question });
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (open) {
      setEditedQuestion({ ...question });
      setActiveTab(0);
    }
  }, [open, question]);

  const handleChange = (field: keyof ToeicPart6, value: any) => {
    if (field === "file") {
      setEditedQuestion({
        ...editedQuestion,
        [field]: base64ToBlobUrl(value, "application/pdf"),
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

  // Helper function to get the appropriate field names for a question
  const getQuestionFields = (questionIndex: number) => {
    return {
      content: `contentQuestion${questionIndex}` as keyof ToeicPart6,
      explanation: `explanationQuestion${questionIndex}` as keyof ToeicPart6,
      correctAnswer: `correctAnswer${questionIndex}` as keyof ToeicPart6,
      answers: [
        `answer1Q${questionIndex}` as keyof ToeicPart6,
        `answer2Q${questionIndex}` as keyof ToeicPart6,
        `answer3Q${questionIndex}` as keyof ToeicPart6,
        `answer4Q${questionIndex}` as keyof ToeicPart6
      ]
    };
  };

  // Helper function to get answer values for a question
  const getAnswerValues = (questionIndex: number) => {
    const fields = getQuestionFields(questionIndex);
    return fields.answers.map(field => editedQuestion[field] as string);
  };

  // Helper function to update an answer value
  const handleAnswerChange = (questionIndex: number, answerIndex: number, value: string) => {
    const fields = getQuestionFields(questionIndex);
    const field = fields.answers[answerIndex];
    handleChange(field, value);
  };

  const answerOptions = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
  ];

  const tabs = [
    { label: "Document", id: "document-tab" },
    { label: "Question 1", id: "question-1-tab" },
    { label: "Question 2", id: "question-2-tab" },
    { label: "Question 3", id: "question-3-tab" },
    { label: "Question 4", id: "question-4-tab" }
  ];

  return (
    <ToeicEditDialogBase
      open={open}
      onClose={onClose}
      onSave={handleSave}
      title="Edit Part 6 Question"
      maxWidth="lg"
    >
      <EditTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        baseId="part6-edit"
      />

      <QuestionTabPanel value={activeTab} index={0} id="part6-edit">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StatusSwitch 
              status={editedQuestion.status}
              onChange={(value) => handleChange('status', value)}
            />
          </Grid>

          <Grid item xs={12}>
            <FormSectionCard title="Document File">
              <WEDocumentInput
                label="PDF Document"
                value={editedQuestion.file}
                onChange={(base64) => handleChange("file", base64)}
                required
              />
            </FormSectionCard>
          </Grid>
        </Grid>
      </QuestionTabPanel>

      {[1, 2, 3, 4].map((questionIndex) => (
        <QuestionTabPanel 
          key={questionIndex} 
          value={activeTab} 
          index={questionIndex}
          id="part6-edit"
        >
          <QuestionEditPanel
            questionIndex={questionIndex}
            editedQuestion={editedQuestion}
            handleChange={handleChange}
            handleAnswerChange={handleAnswerChange}
            getAnswerValues={getAnswerValues}
            getQuestionFields={getQuestionFields}
            answerOptions={answerOptions}
            color={color}
            isDarkMode={isDarkMode}
          />
        </QuestionTabPanel>
      ))}
    </ToeicEditDialogBase>
  );
}

// Sub-component for question editing
interface QuestionEditPanelProps {
  questionIndex: number;
  editedQuestion: ToeicPart6;
  handleChange: (field: keyof ToeicPart6, value: any) => void;
  handleAnswerChange: (questionIndex: number, answerIndex: number, value: string) => void;
  getAnswerValues: (questionIndex: number) => string[];
  getQuestionFields: (questionIndex: number) => {
    content: keyof ToeicPart6;
    explanation: keyof ToeicPart6;
    correctAnswer: keyof ToeicPart6;
    answers: (keyof ToeicPart6)[];
  };
  answerOptions: { label: string; value: string }[];
  color: ReturnType<typeof useColor>;
  isDarkMode: boolean;
}

function QuestionEditPanel({
  questionIndex,
  editedQuestion,
  handleChange,
  handleAnswerChange,
  getAnswerValues,
  getQuestionFields,
  answerOptions,
  color,
  isDarkMode
}: QuestionEditPanelProps) {
  const fields = getQuestionFields(questionIndex);
  const answerValues = getAnswerValues(questionIndex);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormSectionCard title={`Question ${questionIndex} Content`}>
          <WETextField
            label={`Question ${questionIndex} Content`}
            type="text"
            value={editedQuestion[fields.content] as string}
            onChange={(e) => handleChange(fields.content, e.target.value)}
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
            answers={answerValues}
            correctAnswer={editedQuestion[fields.correctAnswer] as string}
            onAnswerChange={(answerIndex, value) => 
              handleAnswerChange(questionIndex, answerIndex, value)
            }
            onCorrectAnswerChange={(value) => 
              handleChange(fields.correctAnswer, value)
            }
            answerOptions={answerOptions}
          />
        </FormSectionCard>
      </Grid>

      <Grid item xs={12}>
        <FormSectionCard title="Explanation">
          <WETextField
            label={`Explanation for Question ${questionIndex}`}
            type="text"
            value={editedQuestion[fields.explanation] as string}
            onChange={(e) => handleChange(fields.explanation, e.target.value)}
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