import React, { useState } from 'react';
import { Box, Typography, Stack, IconButton, Tooltip } from '@mui/material';
import { Question } from 'interfaces';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import QuestionEditForm from './QuestionEditForm';
import { WEConfirmDelete } from 'components/display';

interface QuestionItemProps {
  question: Question;
  index: number;
  isEditMode: boolean;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDelete: (id: number) => void;
  totalQuestions: number;
  onUpdateQuestion?: (updatedQuestion: Question) => void;
}

export default function QuestionItem({
  question,
  index,
  isEditMode,
  onMoveUp,
  onMoveDown,
  onDelete,
  totalQuestions,
  onUpdateQuestion
}: QuestionItemProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleEditClick = () => {
    setIsEditing(true);
  };
  
  const handleSaveEdit = (updatedQuestion: Question) => {
    if (onUpdateQuestion) {
      onUpdateQuestion(updatedQuestion);
    }
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  
  const handleDeleteConfirm = () => {
    setIsDeleting(true);
    try {
      onDelete(question.id);
    } finally {
      setIsDeleting(false);
      handleCloseDeleteDialog();
    }
  };
  
  if (isEditing) {
    return (
      <QuestionEditForm 
        question={question} 
        onSave={handleSaveEdit} 
        onCancel={handleCancelEdit} 
      />
    );
  }
  
  return (
    <>
      <Box
        sx={{
          p: 3,
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          position: 'relative',
          transition: 'background-color 0.2s ease',
          '&:hover': {
            backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(249, 250, 251, 0.5)'
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1, pr: isEditMode ? 4 : 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  color: isDarkMode ? color.teal200 : color.teal700,
                  fontWeight: 600,
                  mr: 2
                }}
              >
                Question {index + 1}
              </Typography>
              
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '1rem',
                  backgroundColor: question.status 
                    ? (isDarkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)')
                    : (isDarkMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)'),
                  color: question.status
                    ? (isDarkMode ? color.teal300 : color.teal600)
                    : (isDarkMode ? color.red300 : color.red600),
                  fontSize: '0.75rem',
                  fontWeight: 500
                }}
              >
                {question.status ? 'Active' : 'Inactive'}
              </Box>
            </Box>
            
            <Typography
              variant="body1"
              sx={{
                color: isDarkMode ? color.white : color.gray900,
                mb: 2,
                whiteSpace: 'pre-wrap'
              }}
            >
              {question.content}
            </Typography>
            
            {question.explanation && (
              <Box
                sx={{
                  p: 2,
                  backgroundColor: isDarkMode ? color.gray700 : color.gray100,
                  borderRadius: '0.75rem',
                  borderLeft: `3px solid ${isDarkMode ? color.teal600 : color.teal400}`
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    color: isDarkMode ? color.teal300 : color.teal700,
                    fontWeight: 600,
                    mb: 0.5
                  }}
                >
                  Explanation:
                </Typography>
                
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? color.gray300 : color.gray700,
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {question.explanation}
                </Typography>
              </Box>
            )}
          </Box>
          
          {isEditMode && (
            <Stack spacing={1} sx={{ position: 'absolute', right: 16, top: 16 }}>
              <Tooltip title="Move up">
                <IconButton
                  size="small"
                  onClick={() => onMoveUp(index)}
                  disabled={index === 0}
                  sx={{
                    backgroundColor: isDarkMode ? color.gray700 : color.gray200,
                    color: isDarkMode ? color.gray300 : color.gray600,
                    '&:hover': {
                      backgroundColor: isDarkMode ? color.gray600 : color.gray300,
                    },
                    '&.Mui-disabled': {
                      color: isDarkMode ? color.gray600 : color.gray400,
                      backgroundColor: isDarkMode ? color.gray800 : color.gray100,
                    },
                    width: 30,
                    height: 30
                  }}
                >
                  <KeyboardArrowUpIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Move down">
                <IconButton
                  size="small"
                  onClick={() => onMoveDown(index)}
                  disabled={index === totalQuestions - 1}
                  sx={{
                    backgroundColor: isDarkMode ? color.gray700 : color.gray200,
                    color: isDarkMode ? color.gray300 : color.gray600,
                    '&:hover': {
                      backgroundColor: isDarkMode ? color.gray600 : color.gray300,
                    },
                    '&.Mui-disabled': {
                      color: isDarkMode ? color.gray600 : color.gray400,
                      backgroundColor: isDarkMode ? color.gray800 : color.gray100,
                    },
                    width: 30,
                    height: 30
                  }}
                >
                  <KeyboardArrowDownIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Edit question">
                <IconButton
                  size="small"
                  onClick={handleEditClick}
                  sx={{
                    backgroundColor: isDarkMode ? color.teal800 : color.teal100,
                    color: isDarkMode ? color.teal300 : color.teal600,
                    '&:hover': {
                      backgroundColor: isDarkMode ? color.teal700 : color.teal200,
                    },
                    width: 30,
                    height: 30
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Delete question">
                <IconButton
                  size="small"
                  onClick={handleOpenDeleteDialog}
                  sx={{
                    backgroundColor: isDarkMode ? color.red900 : color.red100,
                    color: isDarkMode ? color.red400 : color.red600,
                    '&:hover': {
                      backgroundColor: isDarkMode ? color.red800 : color.red200,
                    },
                    width: 30,
                    height: 30
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          )}
        </Box>
      </Box>
      
      <WEConfirmDelete
        open={openDeleteDialog}
        onCancel={handleCloseDeleteDialog}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        resourceName={`Question ${index + 1}`}
      />
    </>
  );
}