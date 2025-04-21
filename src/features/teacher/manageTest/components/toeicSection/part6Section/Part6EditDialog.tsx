import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Button, 
  Box, 
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Alert,
  Divider
} from '@mui/material';
import { ToeicPart6, ToeicQuestion, ToeicAnswer,  } from 'interfaces';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import {  WEDocumentInput } from 'components/input';
import { base64ToBlobUrl } from 'utils/convert';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { 
  ToeicEditDialogBase, 
  StatusSwitch,
  FormSectionCard,
  EditTabs,
  QuestionTabPanel,
  QuestionEditor
} from '../dialogEdit';

// Đây chỉ là các field mở rộng cho UI, không phải một phần của model
type ExtendedFields = {
  questionData: ToeicQuestion[];
};

interface Part6EditDialogProps {
  open: boolean;
  question: ToeicPart6 & ExtendedFields;
  onClose: () => void;
  onSave: (updatedQuestion: ToeicPart6 & { 
    _changes?: {
      toAdd: ToeicQuestion[];
      toUpdate: ToeicQuestion[];
      toDelete: number[];
    }
  }) => void;
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
  
  const [editedQuestion, setEditedQuestion] = useState<ToeicPart6 & ExtendedFields>({ ...question });
  const [activeTab, setActiveTab] = useState(0);
  
  const [subQuestionToDelete, setSubQuestionToDelete] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [questionsToAdd, setQuestionsToAdd] = useState<ToeicQuestion[]>([]);
  const [questionsToUpdate, setQuestionsToUpdate] = useState<ToeicQuestion[]>([]);
  const [questionsToDelete, setQuestionsToDelete] = useState<number[]>([]);
  const [originalQuestionData, setOriginalQuestionData] = useState<ToeicQuestion[]>([]);

  useEffect(() => {
    if (open) {
      setEditedQuestion({ ...question });
      setActiveTab(0);
      setError(null);
      setSuccess(null);
      setQuestionsToAdd([]);
      setQuestionsToUpdate([]);
      setQuestionsToDelete([]);
      
      if (question.questionData) {
        setOriginalQuestionData([...question.questionData]);
      }
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
    
    onSave({
      ...saveData,
      _changes: {
        toAdd: questionsToAdd,
        toUpdate: questionsToUpdate,
        toDelete: questionsToDelete
      }
    });
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
    
    const questionToUpdate = updatedQuestionData[questionIndex];
    if (questionToUpdate.id > 0) {
      const isAlreadyInUpdateList = questionsToUpdate.some(q => q.id === questionToUpdate.id);
      
      if (!isAlreadyInUpdateList) {
        setQuestionsToUpdate([...questionsToUpdate, questionToUpdate]);
      } else {
        const updatedList = questionsToUpdate.map(q => 
          q.id === questionToUpdate.id ? questionToUpdate : q
        );
        setQuestionsToUpdate(updatedList);
      }
    }
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number, value: string) => {
    const updatedQuestionData = [...editedQuestion.questionData];
    const updatedAnswers = [...updatedQuestionData[questionIndex].toeicAnswers];
    
    updatedAnswers[answerIndex] = {
      ...updatedAnswers[answerIndex],
      content: value
    };
    
    updatedQuestionData[questionIndex] = {
      ...updatedQuestionData[questionIndex],
      toeicAnswers: updatedAnswers
    };
    
    setEditedQuestion({
      ...editedQuestion,
      questionData: updatedQuestionData
    });
    
    const questionToUpdate = updatedQuestionData[questionIndex];
    if (questionToUpdate.id > 0) {
      const isAlreadyInUpdateList = questionsToUpdate.some(q => q.id === questionToUpdate.id);
      
      if (!isAlreadyInUpdateList) {
        setQuestionsToUpdate([...questionsToUpdate, questionToUpdate]);
      } else {
        const updatedList = questionsToUpdate.map(q => 
          q.id === questionToUpdate.id ? questionToUpdate : q
        );
        setQuestionsToUpdate(updatedList);
      }
    }
  };

  const handleCorrectAnswerChange = (questionIndex: number, answerIndex: number) => {
    const updatedQuestionData = [...editedQuestion.questionData];
    const updatedAnswers = updatedQuestionData[questionIndex].toeicAnswers.map((answer, idx) => ({
      ...answer,
      correct: idx === answerIndex
    }));
    
    updatedQuestionData[questionIndex] = {
      ...updatedQuestionData[questionIndex],
      toeicAnswers: updatedAnswers
    };
    
    setEditedQuestion({
      ...editedQuestion,
      questionData: updatedQuestionData
    });
    
    const questionToUpdate = updatedQuestionData[questionIndex];
    if (questionToUpdate.id > 0) {
      const isAlreadyInUpdateList = questionsToUpdate.some(q => q.id === questionToUpdate.id);
      
      if (!isAlreadyInUpdateList) {
        setQuestionsToUpdate([...questionsToUpdate, questionToUpdate]);
      } else {
        const updatedList = questionsToUpdate.map(q => 
          q.id === questionToUpdate.id ? questionToUpdate : q
        );
        setQuestionsToUpdate(updatedList);
      }
    }
  };

  const handleAddQuestion = () => {
    if (editedQuestion.questionData.length >= 4) {
      setError("Maximum of 4 questions allowed per passage");
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

    setEditedQuestion({
      ...editedQuestion,
      questionData: [...editedQuestion.questionData, newQuestion]
    });
    
    setActiveTab(editedQuestion.questionData.length + 1);
    setSuccess("New question added. Remember to save your changes.");
    
    setQuestionsToAdd([...questionsToAdd, newQuestion]);
  };

  const handleDeleteSubQuestion = () => {
    if (subQuestionToDelete === null) {
      setIsDeleteDialogOpen(false);
      return;
    }

    const indexToDelete = editedQuestion.questionData.findIndex(q => q.id === subQuestionToDelete);
    if (indexToDelete !== -1) {
      const newQuestionData = [...editedQuestion.questionData];
      const questionToDelete = newQuestionData[indexToDelete];
      newQuestionData.splice(indexToDelete, 1);
      
      setEditedQuestion({
        ...editedQuestion,
        questionData: newQuestionData
      });
      
      if (activeTab > 1 && activeTab - 1 > indexToDelete) {
        setActiveTab(activeTab - 1);
      } else if (activeTab - 1 === indexToDelete) {
        setActiveTab(Math.max(1, activeTab - 1));
      }
      
      if (questionToDelete.id > 0) {
        setQuestionsToDelete([...questionsToDelete, questionToDelete.id]);
        
        setQuestionsToUpdate(
          questionsToUpdate.filter(q => q.id !== questionToDelete.id)
        );
      } else {
        setQuestionsToAdd(
          questionsToAdd.filter(q => {
            const isMatch = q.content === questionToDelete.content && 
                          q.explanation === questionToDelete.explanation;
            return !isMatch;
          })
        );
      }
      
      setSuccess("Question removed");
    }
    
    setIsDeleteDialogOpen(false);
    setSubQuestionToDelete(null);
  };

  const handleOpenDeleteDialog = (questionId: number) => {
    setSubQuestionToDelete(questionId);
    setIsDeleteDialogOpen(true);
  };

  const tabs = [
    { label: "Document", id: "document-tab" },
    ...editedQuestion.questionData.map((q, i) => ({
      label: `Question ${i + 1}${q.id === 0 ? ' (New)' : ''}`, 
      id: `question-${i + 1}-tab`
    }))
  ];

  useEffect(() => {
    if (mode === 'add' && open && editedQuestion.questionData.length === 0) {
      handleAddQuestion();
    }
  }, [mode, open, editedQuestion.questionData.length]);

  return (
    <>
      <ToeicEditDialogBase
        open={open}
        onClose={onClose}
        onSave={handleSave}
        title={mode === 'edit' ? "Edit Part 6 Question" : "Add Part 6 Question"}
        maxWidth="lg"
      >
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 2 }}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert 
            severity="success" 
            sx={{ mb: 2 }}
            onClose={() => setSuccess(null)}
          >
            {success}
          </Alert>
        )}
        
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ color: isDarkMode ? color.teal300 : color.teal700 }}>
                Question {index + 1} {questionData.id === 0 ? '(New)' : ''}
              </Typography>
              
              {index > 0 || editedQuestion.questionData.length > 1 ? (
                <Tooltip title="Delete this question">
                  <IconButton
                    color="error"
                    onClick={() => handleOpenDeleteDialog(questionData.id)}
                    sx={{
                      color: isDarkMode ? color.red400 : color.red600,
                      '&:hover': {
                        backgroundColor: isDarkMode ? `${color.red900}33` : color.red50,
                      }
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              ) : null}
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <QuestionEditor 
              question={questionData}
              onChange={(field, value) => handleQuestionChange(index, field, value)}
            />
          </QuestionTabPanel>
        ))}
      </ToeicEditDialogBase>
      
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogContent>
          <Typography variant="h6" id="delete-dialog-title" gutterBottom>
            Delete Question
          </Typography>
          <Typography>
            Are you sure you want to delete this question? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setIsDeleteDialogOpen(false)} 
            color="inherit"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteSubQuestion} 
            color="error" 
            variant="contained"
            sx={{
              backgroundColor: color.delete,
              '&:hover': {
                backgroundColor: isDarkMode ? color.red700 : color.red600
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}