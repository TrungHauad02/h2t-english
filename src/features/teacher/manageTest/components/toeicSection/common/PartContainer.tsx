import React, { ReactNode } from 'react';
import {   
  Paper,   
  Card,   
  CardContent,   
  Button,
  Box,
  Stack,
  Collapse,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import SectionHeader from './SectionHeader';
import QuestionNavigation from '../detailsView/QuestionNavigation';
import NavigationButtons from './NavigationButtons';

interface PartContainerProps {
  id: string;
  title: string;
  subtitle?: string;
  currentIndex: number;
  totalItems: number;
  onSelectQuestion: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  children: ReactNode;
  showNavigation?: boolean;
  onEditQuestion?: () => void;
  onAddQuestion?: () => void;
  onDeleteQuestion?: () => void;
}

export default function PartContainer({
  id,
  title,
  subtitle,
  currentIndex,
  totalItems,
  onSelectQuestion,
  onPrevious,
  onNext,
  children,
  showNavigation = true,
  onEditQuestion,
  onAddQuestion,
  onDeleteQuestion
}: PartContainerProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const borderColor = isDarkMode ? color.gray600 : color.gray200;

  return (
    <Paper        
      elevation={3}
      sx={{
        p: 3,
        borderRadius: '1rem',
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        transition: 'all 0.3s ease',
        border: `1px solid ${borderColor}`,
        position: 'relative',
        overflow: 'hidden'
      }}
      id={id}
    >
      <SectionHeader 
        title={title}
        subtitle={subtitle}
        currentIndex={currentIndex}
        totalItems={totalItems}
      />
      
      {/* Action Buttons - Always visible */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3, mt: 1 }}>
        <Stack direction="row" spacing={2}>
          {onAddQuestion && (
            <Tooltip title="Add a new question">
              <Button
                startIcon={<AddIcon />}
                onClick={onAddQuestion}
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: isDarkMode ? color.emerald700 : color.emerald600,
                  color: color.white,
                  '&:hover': {
                    backgroundColor: isDarkMode ? color.emerald600 : color.emerald500
                  },
                  borderRadius: '0.75rem',
                  boxShadow: isDarkMode ? '0 4px 12px rgba(10, 10, 10, 0.2)' : '0 4px 12px rgba(16, 185, 129, 0.2)',
                  fontWeight: 500,
                  px: 2
                }}
              >
                Add Question
              </Button>
            </Tooltip>
          )}
          
          {onEditQuestion && totalItems > 0 && (
            <Tooltip title="Edit current question">
              <Button
                startIcon={<EditIcon />}
                onClick={onEditQuestion}
                variant="outlined"
                size="small"
                sx={{
                  borderColor: isDarkMode ? color.teal400 : color.teal600,
                  color: isDarkMode ? color.teal400 : color.teal600,
                  '&:hover': {
                    backgroundColor: isDarkMode 
                      ? `${color.teal900}33` 
                      : color.teal50,
                    borderColor: isDarkMode ? color.teal300 : color.teal500
                  },
                  borderRadius: '0.75rem',
                  fontWeight: 500,
                  px: 2
                }}
              >
                Edit Question
              </Button>
            </Tooltip>
          )}
          
          {onDeleteQuestion && totalItems > 0 && (
            <Tooltip title="Delete current question">
              <Button
                startIcon={<DeleteIcon />}
                onClick={onDeleteQuestion}
                variant="outlined"
                size="small"
                sx={{
                  borderColor: isDarkMode ? color.red400 : color.red600,
                  color: isDarkMode ? color.red400 : color.red600,
                  '&:hover': {
                    backgroundColor: isDarkMode 
                      ? `${color.red900}33` 
                      : color.red50,
                    borderColor: isDarkMode ? color.red300 : color.red500
                  },
                  borderRadius: '0.75rem',
                  fontWeight: 500,
                  px: 2
                }}
              >
                Delete Question
              </Button>
            </Tooltip>
          )}
        </Stack>
      </Box>
      
      {/* Navigation components with Collapse animation */}
      <Collapse in={showNavigation && totalItems > 0}>
        <Box>
          <QuestionNavigation 
            total={totalItems} 
            current={currentIndex} 
            onSelect={onSelectQuestion} 
          />
          
          <NavigationButtons 
            onPrevious={onPrevious}
            onNext={onNext}
            isPreviousDisabled={currentIndex === 0}
            isNextDisabled={currentIndex === totalItems - 1}
          />
        </Box>
      </Collapse>
      
      {/* Content Card */}
      <Card 
        elevation={2}
        sx={{
          borderRadius: '1rem',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: isDarkMode ? color.gray700 : color.gray50,
          border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
          boxShadow: isDarkMode 
            ? '0 4px 20px rgba(0, 0, 0, 0.2)' 
            : '0 4px 20px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease'
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {children}
        </CardContent>
      </Card>
    </Paper>
  );
}