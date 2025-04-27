import { Box, Button, Typography } from '@mui/material';
import { ToeicPart3_4, ToeicQuestion } from 'interfaces';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import AddIcon from '@mui/icons-material/Add';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ListAltIcon from '@mui/icons-material/ListAlt';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import CampaignIcon from '@mui/icons-material/Campaign';
import {
  ToeicEditDialogBase,
  EditTabs,
  QuestionTabPanel,
  QuestionTab,
  DeleteQuestionDialog
} from '../dialogEdit';
import { useQuestionEditState } from 'features/teacher/manageTest/hooks/useToeicDetailsPage/useQuestionEditState';

import BasicInfoTab from './components/BasicInfoTab';

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
  } = useQuestionEditState<ToeicPart3_4>({
    open,
    question,
    toeicQuestions,
    mode,
    onSave,
    maxQuestions: 3
  });

  const tabs = [
    {
      label: "Basic Information",
      id: "basic-info",
      icon: <ListAltIcon fontSize="small" />
    },
    ...subQuestions.map((q, index) => ({
      label: `Question ${index + 1}${q.id < 0 ? ' (New)' : ''}`,
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
          <BasicInfoTab
            editedQuestion={editedQuestion}
            onStatusChange={(value) => handleChange('status', value)}
            onAudioChange={(base64) => handleChange("audio", base64)}
            onImageChange={(base64) => handleChange("image", base64)}
            onTranscriptChange={(value) => handleChange("transcript", value)}
            partNumber={partNumber}
            partIcon={partIcon}
          />
        </QuestionTabPanel>

        {subQuestions.map((subQuestion, index) => (
          <QuestionTabPanel
            key={index}
            value={activeTab}
            index={index + 1}
            id="part3-4-edit"
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