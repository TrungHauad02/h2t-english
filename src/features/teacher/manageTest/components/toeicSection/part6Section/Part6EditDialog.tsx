import { Box, Button, Typography } from '@mui/material';
import { ToeicPart6, ToeicQuestion } from 'interfaces';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import AddIcon from '@mui/icons-material/Add';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {
  ToeicEditDialogBase,
  EditTabs,
  QuestionTabPanel,
  QuestionTab,
  DeleteQuestionDialog,
  DocumentTab
} from '../dialogEdit';
import { useQuestionEditState } from 'features/teacher/manageTest/hooks/useToeicDetailsPage/useQuestionEditState';

interface Part6EditDialogProps {
  open: boolean;
  question: ToeicPart6 & { questionData?: ToeicQuestion[] };
  onClose: () => void;
  onSave: (updatedQuestion: ToeicPart6 & {
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

export default function Part6EditDialog({
  open,
  question,
  onClose,
  onSave,
  toeicQuestions = {},
  mode = 'edit'
}: Part6EditDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const {
    editedQuestion,
    activeTab,
    subQuestions,
    error,
    success,
    isDeleteDialogOpen,
    handleTabChange,
    handleChange,
    handleQuestionChange,
    handleAnswerChange,
    handleCorrectAnswerChange,
    handleAddQuestion,
    handleSave,
    handleOpenDeleteDialog,
    handleDeleteSubQuestion,
    setIsDeleteDialogOpen
  } = useQuestionEditState<ToeicPart6>({
    open,
    question,
    toeicQuestions,
    mode,
    onSave,
    maxQuestions: 4
  });

  const tabs = [
    {
      label: "Document",
      id: "document",
      icon: <ListAltIcon fontSize="small" />
    },
    ...subQuestions.map((q, index) => ({
      label: `Question ${index + 1}${q.id < 0 ? '' : ''}`,
      id: `question-${index + 1}`,
      icon: <QuestionAnswerIcon fontSize="small" />
    }))
  ];

  const dialogTitle = mode === 'edit'
    ? "Edit Part 6: Reading Comprehension"
    : "Add Part 6: Reading Comprehension";

  return (
    <>
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
        
        <Box sx={{ mb: 3 }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <EditTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                baseId="part6-edit"
              />
            </Box>
            
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddQuestion}
              disabled={subQuestions.length >= 4}
              sx={{
                backgroundColor: subQuestions.length >= 4
                  ? (isDarkMode ? color.gray600 : color.gray400)
                  : (isDarkMode ? color.emerald700 : color.emerald600),
                color: subQuestions.length >= 4
                  ? (isDarkMode ? color.gray400 : color.gray600)
                  : color.white,
                '&:hover': {
                  backgroundColor: subQuestions.length >= 4
                    ? (isDarkMode ? color.gray600 : color.gray400)
                    : (isDarkMode ? color.emerald600 : color.emerald500)
                },
                borderRadius: '0.75rem',
                px: 3,
                py: 1,
                fontWeight: 'medium',
                flexShrink: 0,
                '&.Mui-disabled': {
                  backgroundColor: isDarkMode ? color.gray600 : color.gray400,
                  color: isDarkMode ? color.gray400 : color.gray600
                }
              }}
            >
              Add Question {subQuestions.length >= 4 ? '(Max 4)' : ''}
            </Button>
          </Box>
        </Box>

        <QuestionTabPanel value={activeTab} index={0} id="part6-edit">
          <DocumentTab
            editedQuestion={editedQuestion}
            onStatusChange={(value) => handleChange('status', value)}
            onFileChange={(fileValue) => handleChange("file", fileValue)}
          />
        </QuestionTabPanel>

        {subQuestions.map((subQuestion, index) => (
          <QuestionTabPanel
            key={index}
            value={activeTab}
            index={index + 1}
            id="part6-edit"
          >
            <QuestionTab
              question={subQuestion}
              index={index}
              canDelete={index > 0 || subQuestions.length > 1}
              onDelete={() => handleOpenDeleteDialog(subQuestion.id)}
              onChange={(field, value) => handleQuestionChange(index, field, value)}
              onAnswerChange={(answerIndex, value) => handleAnswerChange(index, answerIndex, value)}
              onCorrectAnswerChange={(answerIndex) => handleCorrectAnswerChange(index, answerIndex)}
            />
          </QuestionTabPanel>
        ))}
      </ToeicEditDialogBase>

      <DeleteQuestionDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteSubQuestion}
      />
    </>
  );
}