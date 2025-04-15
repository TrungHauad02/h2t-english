import React, { ReactNode } from 'react';
import {   
  Paper,   
  Card,   
  CardContent,   
  Button,
  Box,
  Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
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
  onAddQuestion
}: PartContainerProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Paper        
      elevation={3}
      sx={{
        p: 3,
        borderRadius: '1rem',
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        transition: 'all 0.3s ease'
      }}
      id={id}
    >
      <SectionHeader 
        title={title}
        subtitle={subtitle}
        currentIndex={currentIndex}
        totalItems={totalItems}
      />
      
      {showNavigation && (
        <QuestionNavigation 
          total={totalItems} 
          current={currentIndex} 
          onSelect={onSelectQuestion} 
        />
      )}
      
      {showNavigation && (
        <NavigationButtons 
          onPrevious={onPrevious}
          onNext={onNext}
          isPreviousDisabled={currentIndex === 0}
          isNextDisabled={currentIndex === totalItems - 1}
        />
      )}
      
      <Card 
        elevation={2}
        sx={{
          borderRadius: '1rem',
          overflow: 'hidden',
          mb: 3,
          position: 'relative',
          backgroundColor: isDarkMode ? color.gray700 : color.gray50,
          border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {(onEditQuestion || onAddQuestion) && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Stack direction="row" spacing={2}>
                {onAddQuestion && (
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
                      borderRadius: '0.75rem'
                    }}
                  >
                    Add Question
                  </Button>
                )}
                
                {onEditQuestion && (
                  <Button
                    startIcon={<EditIcon />}
                    onClick={onEditQuestion}
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: isDarkMode ? color.emerald400 : color.emerald600,
                      color: isDarkMode ? color.emerald400 : color.emerald600,
                      '&:hover': {
                        backgroundColor: isDarkMode 
                          ? color.emerald900 + '33' 
                          : color.emerald100
                      },
                      borderRadius: '0.75rem'
                    }}
                  >
                    Edit Question
                  </Button>
                )}
              </Stack>
            </Box>
          )}
          
          {children}
        </CardContent>
      </Card>
    </Paper>
  );
}