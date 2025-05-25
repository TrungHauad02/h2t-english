import { Box, IconButton, Tooltip, Typography, Divider } from '@mui/material';
import { ToeicQuestion } from 'interfaces';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { QuestionEditor } from '../dialogEdit';

interface QuestionTabProps {
  question: ToeicQuestion;
  index: number;
  canDelete: boolean;
  onDelete: () => void;
  onChange: (field: keyof ToeicQuestion, value: any) => void;
  onAnswerChange: (answerIndex: number, value: string) => void;
  onCorrectAnswerChange: (answerIndex: number) => void;
}

export default function QuestionTab({
  question,
  index,
  canDelete,
  onDelete,
  onChange,
  onAnswerChange,
  onCorrectAnswerChange
}: QuestionTabProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography
          variant="h6"
          sx={{
            color: isDarkMode ? color.teal300 : color.teal700,
            fontWeight: 600
          }}
        >
          Question {index + 1} {question.id < 0 ? '' : ''}
        </Typography>
        
        {canDelete && (
          <Tooltip title="Delete this question">
            <IconButton
              color="error"
              onClick={onDelete}
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
        )}
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      <QuestionEditor 
        question={question}
        onChange={onChange}
        onAnswerChange={onAnswerChange}
        onCorrectAnswerChange={onCorrectAnswerChange}
      />
    </>
  );
}