import React, { useState, useEffect } from 'react';
import { Grid, Box, Button, Typography } from '@mui/material';
import { ToeicPart3_4, ToeicQuestion, ToeicAnswer } from 'interfaces';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { base64ToBlobUrl } from 'utils/convert';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
  QuestionTabPanel,
  QuestionEditor
} from '../dialogEdit';

interface Part3_4EditDialogProps {
  open: boolean;
  question: ToeicPart3_4;
  partNumber: 3 | 4;
  onClose: () => void;
  onSave: (updatedQuestion: ToeicPart3_4 & {
    _changes?: {
      toAdd: ToeicQuestion[];
      toUpdate: ToeicQuestion[];
      toDelete: number[];
    },
    subQuestions?: ToeicQuestion[]
  }) => void;
  toeicQuestions?: { [partId: number]: ToeicQuestion[] };
  mode?: 'edit' | 'add';
}

export default function Part3_4EditDialog({
  open,
  question,
  partNumber,
  onClose,
  onSave,
  toeicQuestions = {},
  mode = 'edit'
}: Part3_4EditDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const [editedQuestion, setEditedQuestion] = useState<ToeicPart3_4>({ ...question });
  const [activeTab, setActiveTab] = useState(0);
  const [subQuestions, setSubQuestions] = useState<ToeicQuestion[]>([]);
  
  // Theo dõi các thay đổi
  const [questionsToAdd, setQuestionsToAdd] = useState<ToeicQuestion[]>([]);
  const [questionsToUpdate, setQuestionsToUpdate] = useState<ToeicQuestion[]>([]);
  const [questionsToDelete, setQuestionsToDelete] = useState<number[]>([]);
  const [originalQuestionData, setOriginalQuestionData] = useState<ToeicQuestion[]>([]);
  
  // UI States
  const [subQuestionToDelete, setSubQuestionToDelete] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setEditedQuestion({ ...question });
      setActiveTab(0);
      setError(null);
      setSuccess(null);
      
      // Reset tracking states
      setQuestionsToAdd([]);
      setQuestionsToUpdate([]);
      setQuestionsToDelete([]);

      const questions = toeicQuestions[question.id] || [];
      setSubQuestions(questions);
      setOriginalQuestionData([...questions]);

      if (mode === 'add' && questions.length === 0) {
        handleAddQuestion();
      }
    }
  }, [open, question, toeicQuestions, mode]);

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
    onSave({
      ...editedQuestion,
      _changes: {
        toAdd: questionsToAdd,
        toUpdate: questionsToUpdate,
        toDelete: questionsToDelete
      },
      subQuestions: mode === 'add' ? subQuestions : undefined
    });
  };

  const handleQuestionChange = (index: number, field: keyof ToeicQuestion, value: any) => {
    const updatedQuestions = [...subQuestions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value
    };
    setSubQuestions(updatedQuestions);
    
    // Theo dõi cập nhật câu hỏi
    const questionToUpdate = updatedQuestions[index];
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
    const updatedQuestions = [...subQuestions];
    const updatedAnswers = [...updatedQuestions[questionIndex].toeicAnswers];
    
    updatedAnswers[answerIndex] = {
      ...updatedAnswers[answerIndex],
      content: value
    };
    
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      toeicAnswers: updatedAnswers
    };
    
    setSubQuestions(updatedQuestions);
    
    // Theo dõi cập nhật câu hỏi
    const questionToUpdate = updatedQuestions[questionIndex];
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
    const updatedQuestions = [...subQuestions];
    const updatedAnswers = updatedQuestions[questionIndex].toeicAnswers.map((answer, idx) => ({
      ...answer,
      correct: idx === answerIndex
    }));
    
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      toeicAnswers: updatedAnswers
    };
    
    setSubQuestions(updatedQuestions);
    
    // Theo dõi cập nhật câu hỏi
    const questionToUpdate = updatedQuestions[questionIndex];
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
    if (subQuestions.length >= 3) {
      setError("Maximum of 3 questions allowed per passage");
      return;
    }

    const emptyAnswers: ToeicAnswer[] = Array.from({ length: 4 }, (_, index) => ({
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

    // Add to questions list
    const updatedQuestions = [...subQuestions, newQuestion];
    setSubQuestions(updatedQuestions);
    
    // Add question ID to part
    const updatedPart = {
      ...editedQuestion,
      questions: [...(editedQuestion.questions ?? []), 0]  
    };
    setEditedQuestion(updatedPart);
    
    setEditedQuestion(updatedPart);
    
    // Set active tab to the new question
    setActiveTab(updatedQuestions.length);
    setSuccess("New question added. Remember to save your changes.");
    
    // Đánh dấu câu hỏi mới
    setQuestionsToAdd([...questionsToAdd, newQuestion]);
  };

  const handleOpenDeleteDialog = (questionId: number) => {
    setSubQuestionToDelete(questionId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteSubQuestion = () => {
    if (subQuestionToDelete === null) {
      setIsDeleteDialogOpen(false);
      return;
    }

    const indexToDelete = subQuestions.findIndex(q => q.id === subQuestionToDelete);
    if (indexToDelete !== -1) {
      const questionToDelete = subQuestions[indexToDelete];
      
      // Remove from UI
      const newQuestions = [...subQuestions];
      newQuestions.splice(indexToDelete, 1);
      setSubQuestions(newQuestions);
      
      // Update active tab if needed
      if (activeTab > 1 && activeTab - 1 > indexToDelete) {
        setActiveTab(activeTab - 1);
      } else if (activeTab - 1 === indexToDelete) {
        setActiveTab(Math.max(1, activeTab - 1));
      }
      
      // Theo dõi câu hỏi bị xóa
      if (questionToDelete.id > 0) {
        setQuestionsToDelete([...questionsToDelete, questionToDelete.id]);
        
        // Loại bỏ khỏi danh sách cập nhật nếu đang có
        setQuestionsToUpdate(
          questionsToUpdate.filter(q => q.id !== questionToDelete.id)
        );
      } else {
        // Nếu là câu hỏi mới, loại bỏ khỏi danh sách thêm mới
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

  // Generate tabs dynamically based on questions
  const tabs = [
    { 
      label: "Basic Information", 
      id: "basic-info",
      icon: <ListAltIcon fontSize="small" />
    },
    ...subQuestions.map((q, index) => ({
      label: `Question ${index + 1}${q.id === 0 ? ' (New)' : ''}`,
      id: `question-${index + 1}`,
      icon: <QuestionAnswerIcon fontSize="small" />
    }))
  ];

  const partTitle = partNumber === 3 ? "Conversations" : "Talks";
  const dialogTitle = mode === 'edit' 
    ? `Edit Part ${partNumber}: ${partTitle}` 
    : `Add Part ${partNumber}: ${partTitle}`;
  const partIcon = partNumber === 3 
    ? <RecordVoiceOverIcon sx={{ color: isDarkMode ? color.teal300 : color.teal600 }} /> 
    : <CampaignIcon sx={{ color: isDarkMode ? color.teal300 : color.teal600 }} />;

  return (
    <ToeicEditDialogBase
      open={open}
      onClose={onClose}
      onSave={handleSave}
      title={dialogTitle}
      maxWidth="lg"
    >
      {error && (
        <Box sx={{ mb: 2 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}
      
      {success && (
        <Box sx={{ mb: 2 }}>
          <Typography color="success.main">{success}</Typography>
        </Box>
      )}
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <EditTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          baseId="part3-4-edit"
        />
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddQuestion}
          disabled={subQuestions.length >= 3}
          sx={{
            ml: 2,
            backgroundColor: subQuestions.length >= 3 
              ? (isDarkMode ? color.gray600 : color.gray400)
              : (isDarkMode ? color.emerald700 : color.emerald600),
            color: subQuestions.length >= 3
              ? (isDarkMode ? color.gray400 : color.gray600)
              : color.white,
            '&:hover': {
              backgroundColor: subQuestions.length >= 3
                ? (isDarkMode ? color.gray600 : color.gray400)
                : (isDarkMode ? color.emerald600 : color.emerald500)
            },
            borderRadius: '0.75rem',
            px: 2,
            height: '36px'
          }}
        >
          Add Question {subQuestions.length >= 3 ? '(Max 3)' : ''}
        </Button>
      </Box>

      <QuestionTabPanel value={activeTab} index={0} id="part3-4-edit">
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
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  mb: 1,
                  color: isDarkMode ? color.teal300 : color.teal600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                {partIcon}
                {partNumber === 3 ? "Conversation Transcript" : "Talk Transcript"}
              </Typography>
              
              <textarea
                value={editedQuestion.transcript}
                onChange={(e) => handleChange("transcript", e.target.value)}
                rows={6}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '16px',
                  backgroundColor: isDarkMode ? color.gray900 : color.white,
                  color: isDarkMode ? color.gray100 : color.gray900,
                  border: `1px solid ${isDarkMode ? color.gray600 : color.gray400}`,
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  fontSize: '1rem',
                }}
              />
            </FormSectionCard>
          </Grid>
        </Grid>
      </QuestionTabPanel>

      {subQuestions.map((subQuestion, index) => (
        <QuestionTabPanel 
          key={index} 
          value={activeTab} 
          index={index + 1}
          id="part3-4-edit"
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: isDarkMode ? color.teal300 : color.teal700 }}>
              Question {index + 1} {subQuestion.id === 0 ? '(New)' : ''}
            </Typography>
            
            {index > 0 || subQuestions.length > 1 ? (
              <Button
                color="error"
                variant="outlined"
                size="small"
                startIcon={<DeleteOutlineIcon />}
                onClick={() => handleOpenDeleteDialog(subQuestion.id)}
                sx={{
                  borderColor: isDarkMode ? color.red400 : color.red600,
                  color: isDarkMode ? color.red400 : color.red600,
                  '&:hover': {
                    backgroundColor: isDarkMode ? `${color.red900}33` : color.red50,
                    borderColor: isDarkMode ? color.red300 : color.red500
                  }
                }}
              >
                Delete
              </Button>
            ) : null}
          </Box>
          
          <QuestionEditor
            question={subQuestion}
            onChange={(field, value) => handleQuestionChange(index, field, value)}
            onAnswerChange={(answerIndex, value) => handleAnswerChange(index, answerIndex, value)}
            onCorrectAnswerChange={(answerIndex) => handleCorrectAnswerChange(index, answerIndex)}
          />
        </QuestionTabPanel>
      ))}
    </ToeicEditDialogBase>
  );
}