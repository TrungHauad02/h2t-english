import React from 'react';
import { Box, Divider } from '@mui/material';
import { Question } from 'interfaces';
import QuestionItem from './QuestionItem';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface QuestionsListProps {
  questions: number[];
  questionData?: Question[];
  isEditMode: boolean;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDelete: (id: number) => void;
  onUpdateQuestion?: (updatedQuestion: Question) => void;
}

export default function QuestionsList({
  questions,
  questionData,
  isEditMode,
  onMoveUp,
  onMoveDown,
  onDelete,
  onUpdateQuestion
}: QuestionsListProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  // Use questionData if provided, otherwise use questions as fallback
  const data = questionData || questions.map(id => ({ id, content: '', status: true } as Question));
  
  return (
    <Box>
      {data.map((question, index) => (
        <React.Fragment key={question.id}>
          {index > 0 && (
            <Divider 
              sx={{ 
                borderColor: isDarkMode ? color.gray700 : color.gray200
              }} 
            />
          )}
          <QuestionItem
            question={question}
            index={index}
            isEditMode={isEditMode}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            onDelete={onDelete}
            totalQuestions={data.length}
            onUpdateQuestion={onUpdateQuestion}
          />
        </React.Fragment>
      ))}
    </Box>
  );
}