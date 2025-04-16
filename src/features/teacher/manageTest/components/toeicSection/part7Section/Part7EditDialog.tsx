import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Button, 
  Box, 
  Typography, 
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip
} from '@mui/material';
import { ToeicPart7, ToeicQuestion, ToeicAnswer } from 'interfaces';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { WEDocumentInput } from 'components/input';
import { base64ToBlobUrl } from 'utils/convert';
import { 
  ToeicEditDialogBase, 
  StatusSwitch,
  FormSectionCard,
  QuestionEditor
} from '../dialogEdit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface Part7EditDialogProps {
  open: boolean;
  passage: ToeicPart7;
  questions: ToeicQuestion[];
  onClose: () => void;
  onSave: (updatedPassage: ToeicPart7, updatedQuestions: ToeicQuestion[]) => void;
  mode?: 'edit' | 'add';
}

export default function Part7EditDialog({ 
  open, 
  passage, 
  questions,
  onClose, 
  onSave,
  mode = 'edit'
}: Part7EditDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const [editedPassage, setEditedPassage] = useState<ToeicPart7>({ ...passage });
  const [editedQuestions, setEditedQuestions] = useState<ToeicQuestion[]>([...questions]);
  const [expandedQuestion, setExpandedQuestion] = useState<number | false>(false);

  useEffect(() => {
    if (open) {
      setEditedPassage({ ...passage });
      setEditedQuestions([...questions]);
      setExpandedQuestion(questions.length > 0 ? 0 : false);
    }
  }, [open, passage, questions]);

  const handlePassageChange = (field: keyof ToeicPart7, value: any) => {
    if (field === "file") {
      setEditedPassage({
        ...editedPassage,
        [field]: base64ToBlobUrl(value, "application/pdf"),
      });
      return;
    }
    setEditedPassage({ ...editedPassage, [field]: value });
  };

  const handleQuestionChange = (index: number, field: keyof ToeicQuestion, value: any) => {
    const updatedQuestions = [...editedQuestions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value
    };
    setEditedQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    if (editedQuestions.length >= 4) {
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

    const updatedQuestions = [...editedQuestions, newQuestion];
    setEditedQuestions(updatedQuestions);
    setExpandedQuestion(updatedQuestions.length - 1);
  };

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = [...editedQuestions];
    updatedQuestions.splice(index, 1);
    setEditedQuestions(updatedQuestions);
    
    if (expandedQuestion === index) {
      setExpandedQuestion(index > 0 ? index - 1 : (updatedQuestions.length > 0 ? 0 : false));
    } else if (expandedQuestion !== false && expandedQuestion > index) {
      setExpandedQuestion(expandedQuestion - 1);
    }
  };

  const handleMoveQuestion = (fromIndex: number, toIndex: number) => {
    if (
      fromIndex < 0 || 
      fromIndex >= editedQuestions.length || 
      toIndex < 0 || 
      toIndex >= editedQuestions.length ||
      fromIndex === toIndex
    ) {
      return;
    }

    const updatedQuestions = [...editedQuestions];
    const [movedQuestion] = updatedQuestions.splice(fromIndex, 1);
    updatedQuestions.splice(toIndex, 0, movedQuestion);
    
    setEditedQuestions(updatedQuestions);
    
    if (expandedQuestion === fromIndex) {
      setExpandedQuestion(toIndex);
    } else if (
      expandedQuestion !== false && 
      ((fromIndex < expandedQuestion && toIndex >= expandedQuestion) || 
       (fromIndex > expandedQuestion && toIndex <= expandedQuestion))
    ) {
      const adjustment = fromIndex < expandedQuestion ? -1 : 1;
      setExpandedQuestion(expandedQuestion + adjustment);
    }
  };

  const handleMoveUp = (index: number) => {
    handleMoveQuestion(index, index - 1);
  };

  const handleMoveDown = (index: number) => {
    handleMoveQuestion(index, index + 1);
  };

  const handleSave = () => {
    const updatedPassage = {
      ...editedPassage,
      questions: editedQuestions.map(q => q.id)
    };
    
    onSave(updatedPassage, editedQuestions);
  };

  const handleAccordionChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedQuestion(isExpanded ? panel : false);
  };

  // If it's add mode and no questions exist yet, add one automatically on first render
  useEffect(() => {
    if (mode === 'add' && open && editedQuestions.length === 0) {
      handleAddQuestion();
    }
  }, [mode, open, editedQuestions.length]);

  const bgColor = isDarkMode ? color.gray800 : color.gray50;
  const textPrimaryColor = isDarkMode ? color.gray100 : color.gray900;
  const textSecondaryColor = isDarkMode ? color.gray300 : color.gray600;
  const borderColor = isDarkMode ? color.gray700 : color.gray300;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  return (
    <ToeicEditDialogBase
      open={open}
      onClose={onClose}
      onSave={handleSave}
      title={mode === 'edit' ? "Edit Part 7 Reading Passage" : "Add Part 7 Reading Passage"}
      maxWidth="lg"
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StatusSwitch 
            status={editedPassage.status}
            onChange={(value) => handlePassageChange('status', value)}
          />
        </Grid>

        <Grid item xs={12}>
          <FormSectionCard title="Reading Passage">
            <WEDocumentInput
              label="PDF Document"
              value={editedPassage.file}
              onChange={(base64) => handlePassageChange("file", base64)}
              required
            />
          </FormSectionCard>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}>
            <Typography variant="h6" color={accentColor} fontWeight="bold">
              Questions ({editedQuestions.length})
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddQuestion}
              disabled={editedQuestions.length >= 4}
              sx={{
                backgroundColor: editedQuestions.length >= 4 
                  ? (isDarkMode ? color.gray600 : color.gray400)
                  : (isDarkMode ? color.emerald700 : color.emerald600),
                color: editedQuestions.length >= 4
                  ? (isDarkMode ? color.gray400 : color.gray600)
                  : color.white,
                '&:hover': {
                  backgroundColor: editedQuestions.length >= 4
                    ? (isDarkMode ? color.gray600 : color.gray400)
                    : (isDarkMode ? color.emerald600 : color.emerald500)
                },
                borderRadius: '0.75rem',
                px: 2
              }}
            >
              Add Question {editedQuestions.length >= 4 ? '(Max 4)' : ''}
            </Button>
          </Box>

          {editedQuestions.map((question, index) => (
            <Accordion
              key={index}
              expanded={expandedQuestion === index}
              onChange={handleAccordionChange(index)}
              sx={{
                mb: 2,
                backgroundColor: bgColor,
                borderRadius: '0.75rem !important',
                border: `1px solid ${borderColor}`,
                boxShadow: 'none',
                overflow: 'hidden',
                '&:before': {
                  display: 'none'
                },
                '&.Mui-expanded': {
                  margin: '0 0 16px 0'
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: accentColor }} />}
                sx={{
                  backgroundColor: bgColor,
                  borderBottom: expandedQuestion === index ? `1px solid ${borderColor}` : 'none',
                  '& .MuiAccordionSummary-content': {
                    display: 'flex',
                    alignItems: 'center'
                  }
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  width: '100%'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mr: 2, 
                      color: textSecondaryColor 
                    }}>
                      <DragIndicatorIcon />
                    </Box>
                    <Typography fontWeight="medium" color={textPrimaryColor}>
                      Question {index + 1}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title="Move up" arrow>
                      <span>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveUp(index);
                          }}
                          disabled={index === 0}
                          size="small"
                          sx={{
                            color: index === 0 ? textSecondaryColor : accentColor,
                            mr: 1,
                            opacity: index === 0 ? 0.5 : 1
                          }}
                        >
                          <ArrowUpwardIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                    
                    <Tooltip title="Move down" arrow>
                      <span>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveDown(index);
                          }}
                          disabled={index === editedQuestions.length - 1}
                          size="small"
                          sx={{
                            color: index === editedQuestions.length - 1 ? textSecondaryColor : accentColor,
                            mr: 1,
                            opacity: index === editedQuestions.length - 1 ? 0.5 : 1
                          }}
                        >
                          <ArrowDownwardIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                    
                    <Tooltip title="Delete question" arrow>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteQuestion(index);
                        }}
                        size="small"
                        sx={{
                          color: isDarkMode ? color.red400 : color.red500,
                          '&:hover': {
                            backgroundColor: isDarkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.08)'
                          }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 3 }}>
                <QuestionEditor
                  question={question}
                  onChange={(field, value) => handleQuestionChange(index, field, value)}
                />
              </AccordionDetails>
            </Accordion>
          ))}

          {editedQuestions.length === 0 && (
            <Box
              sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: bgColor,
                borderRadius: '0.75rem',
                border: `1px dashed ${borderColor}`,
              }}
            >
              <Typography color={textSecondaryColor} mb={2}>
                No questions added yet
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddQuestion}
                sx={{
                  color: accentColor,
                  borderColor: accentColor,
                  '&:hover': {
                    borderColor: accentColor,
                    backgroundColor: isDarkMode ? 'rgba(94, 234, 212, 0.08)' : 'rgba(20, 184, 166, 0.08)'
                  },
                  borderRadius: '0.75rem'
                }}
              >
                Add First Question
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </ToeicEditDialogBase>
  );
}