import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Button, 
  Box, 
  Typography
} from '@mui/material';
import { ToeicPart6, ToeicQuestion, ToeicAnswer } from 'interfaces';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { WETextField, WEDocumentInput } from 'components/input';
import { base64ToBlobUrl } from 'utils/convert';
import AddIcon from '@mui/icons-material/Add';
import { 
  ToeicEditDialogBase, 
  StatusSwitch,
  FormSectionCard,
  EditTabs,
  QuestionTabPanel,
  QuestionEditor
} from '../dialogEdit';

interface Part6EditDialogProps {
  open: boolean;
  question: ToeicPart6 & { questionData: ToeicQuestion[] };
  onClose: () => void;
  onSave: (updatedQuestion: ToeicPart6) => void;
  mode?: 'edit' | 'add';
}

export default function Part6EditDialog({ 
  open, 
  question, 
  onClose, 
  onSave,
  mode = 'edit'
}: Part6EditDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const [editedQuestion, setEditedQuestion] = useState<ToeicPart6 & { questionData: ToeicQuestion[] }>({ ...question });
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
    const { questionData, ...saveData } = editedQuestion;
    onSave(saveData);
  };

  const handleQuestionChange = (questionIndex: number, field: keyof ToeicQuestion, value: any) => {
    const updatedQuestionData = [...editedQuestion.questionData];
    updatedQuestionData[questionIndex] = {
      ...updatedQuestionData[questionIndex],
      [field]: value
    };
    setEditedQuestion({
      ...editedQuestion,
      questionData: updatedQuestionData
    });

    if (field === 'content') {
      handleChange(`contentQuestion${questionIndex + 1}` as keyof ToeicPart6, value);
    } else if (field === 'explanation') {
      handleChange(`explanationQuestion${questionIndex + 1}` as keyof ToeicPart6, value);
    }
  };

  const handleAddQuestion = () => {
    if (editedQuestion.questionData.length >= 4) {
      return;
    }
    
    const emptyAnswers: ToeicAnswer[] = Array(4).fill(null).map((_, index) => ({
      id: 0,
      content: '',
      correct: index === 0,
      questionId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: true,
    }));

    const newQuestion: ToeicQuestion = {
      id: 0,
      content: '',
      explanation: '',
      toeicAnswers: emptyAnswers,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: true
    };

    const questionIndex = editedQuestion.questionData.length + 1;
    const updatedQuestion = {
      ...editedQuestion,
      [`contentQuestion${questionIndex}`]: '',
      [`explanationQuestion${questionIndex}`]: '',
      [`correctAnswer${questionIndex}`]: 'A',
      [`answer1Q${questionIndex}`]: '',
      [`answer2Q${questionIndex}`]: '',
      [`answer3Q${questionIndex}`]: '',
      [`answer4Q${questionIndex}`]: '',
      questionData: [...editedQuestion.questionData, newQuestion]
    };

    setEditedQuestion(updatedQuestion);
    setActiveTab(questionIndex);
  };

  const tabs = [
    { label: "Document", id: "document-tab" },
    ...editedQuestion.questionData.map((_, index) => ({
      label: `Question ${index + 1}`, 
      id: `question-${index + 1}-tab`
    }))
  ];

  // If it's add mode and no questions exist yet, add one automatically on first render
  useEffect(() => {
    if (mode === 'add' && open && editedQuestion.questionData.length === 0) {
      handleAddQuestion();
    }
  }, [mode, open, editedQuestion.questionData.length]);

  return (
    <ToeicEditDialogBase
      open={open}
      onClose={onClose}
      onSave={handleSave}
      title={mode === 'edit' ? "Edit Part 6 Question" : "Add Part 6 Question"}
      maxWidth="lg"
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <EditTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          baseId="part6-edit"
        />
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddQuestion}
          disabled={editedQuestion.questionData.length >= 4}
          sx={{
            ml: 2,
            backgroundColor: editedQuestion.questionData.length >= 4 
              ? (isDarkMode ? color.gray600 : color.gray400)
              : (isDarkMode ? color.emerald700 : color.emerald600),
            color: editedQuestion.questionData.length >= 4
              ? (isDarkMode ? color.gray400 : color.gray600)
              : color.white,
            '&:hover': {
              backgroundColor: editedQuestion.questionData.length >= 4
                ? (isDarkMode ? color.gray600 : color.gray400)
                : (isDarkMode ? color.emerald600 : color.emerald500)
            },
            borderRadius: '0.75rem',
            px: 2,
            height: '36px'
          }}
        >
          Add Question {editedQuestion.questionData.length >= 4 ? '(Max 4)' : ''}
        </Button>
      </Box>

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

      {editedQuestion.questionData.map((questionData, index) => (
        <QuestionTabPanel 
          key={index} 
          value={activeTab} 
          index={index + 1}
          id="part6-edit"
        >
          <QuestionEditor 
            question={questionData}
            onChange={(field, value) => handleQuestionChange(index, field, value)}
          />
        </QuestionTabPanel>
      ))}
    </ToeicEditDialogBase>
  );
}