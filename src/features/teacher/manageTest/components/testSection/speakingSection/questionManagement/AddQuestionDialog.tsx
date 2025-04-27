import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { questionService ,testPartQuestionServiceFactory} from 'services';
import { extractErrorMessages } from "utils/extractErrorMessages";
import { toast } from "react-toastify";
import { useErrors } from "hooks/useErrors";
interface AddQuestionDialogProps {
  open: boolean;
  onClose: () => void;
  speakingId: number;
  fetchSpeakings: () => void;
  questions: number[]
}

export default function AddQuestionDialog({
  open,
  onClose,
  speakingId,
  questions,
  fetchSpeakings
}: AddQuestionDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { showError } = useErrors();
  const [content, setContent] = useState('');
  const [explanation, setExplanation] = useState('');
  const [status, setStatus] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const questionServiceUpdate = testPartQuestionServiceFactory("test-speakings");


  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  const resetForm = () => {
    setContent('');
    setExplanation('');
    setStatus(true);
    setIsSubmitting(false);
  };
  
  const handleAddQuestion = async () => {

      try {

      const newQuestion = {
        id: Date.now(),
        content: content.trim(),
        explanation: explanation.trim(),
        status,
        answers: [],
      }
        const resData = await questionService.create(newQuestion);


        const newQuestions = [...questions, resData.data.id];
        await questionServiceUpdate.updateQuestions(speakingId, newQuestions);
  
        //  Display success
        toast.success("Question updated successfully");
      } catch (error) {
        // Display error using our error component
        showError({
          message: "Error creating question",
          severity: "error",
          details: extractErrorMessages(error),
        });
        console.error("Error creating question:", error);
      }
      fetchSpeakings();
      resetForm();
      onClose();
    };
  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '1rem',
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          backgroundImage: 'none'
        }
      }}
    >
      <DialogTitle sx={{ 
        p: 3, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`
      }}>
        <Typography variant="h6" sx={{ 
          color: isDarkMode ? color.white : color.gray900,
          fontWeight: 'bold'
        }}>
          Add New Question
        </Typography>
        
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            backgroundColor: isDarkMode ? color.gray700 : color.gray200,
            color: isDarkMode ? color.gray300 : color.gray600,
            '&:hover': {
              backgroundColor: isDarkMode ? color.gray600 : color.gray300,
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ 
            color: isDarkMode ? color.teal300 : color.teal700,
            mb: 1,
            fontWeight: 600
          }}>
            Question Content*
          </Typography>
          
          <TextField
            autoFocus
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter the question text..."
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '0.75rem',
                backgroundColor: isDarkMode ? color.gray700 : color.white,
                '& fieldset': {
                  borderColor: isDarkMode ? color.gray600 : color.gray300,
                },
                '&:hover fieldset': {
                  borderColor: isDarkMode ? color.teal600 : color.teal400,
                },
                '&.Mui-focused fieldset': {
                  borderColor: isDarkMode ? color.teal500 : color.teal400,
                },
              },
              '& .MuiInputBase-input': {
                color: isDarkMode ? color.white : color.gray900,
              }
            }}
          />
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ 
            color: isDarkMode ? color.teal300 : color.teal700,
            mb: 1,
            fontWeight: 600
          }}>
            Explanation*
          </Typography>
          
          <TextField
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="Provide context or notes about this question..."
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '0.75rem',
                backgroundColor: isDarkMode ? color.gray700 : color.white,
                '& fieldset': {
                  borderColor: isDarkMode ? color.gray600 : color.gray300,
                },
                '&:hover fieldset': {
                  borderColor: isDarkMode ? color.teal600 : color.teal400,
                },
                '&.Mui-focused fieldset': {
                  borderColor: isDarkMode ? color.teal500 : color.teal400,
                },
              },
              '& .MuiInputBase-input': {
                color: isDarkMode ? color.white : color.gray900,
              }
            }}
          />
        </Box>
        
        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
                sx={{
                  '& .MuiSwitch-track': {
                    backgroundColor: isDarkMode 
                      ? (status ? color.teal700 : color.gray600) 
                      : (status ? color.teal200 : color.gray300)
                  },
                  '& .MuiSwitch-thumb': {
                    backgroundColor: status 
                      ? (isDarkMode ? color.teal400 : color.teal500) 
                      : (isDarkMode ? color.gray400 : color.gray500)
                  }
                }}
              />
            }
            label={
              <Typography 
                variant="body2" 
                sx={{ 
                  color: status 
                    ? (isDarkMode ? color.teal300 : color.teal600) 
                    : (isDarkMode ? color.gray300 : color.gray600)
                }}
              >
                Active
              </Typography>
            }
          />
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ 
        p: 3, 
        pt: 2,
        borderTop: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`
      }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderColor: isDarkMode ? color.gray600 : color.gray300,
            color: isDarkMode ? color.gray300 : color.gray600,
            '&:hover': {
              borderColor: isDarkMode ? color.gray500 : color.gray400,
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
            },
            borderRadius: '0.75rem',
            textTransform: 'none'
          }}
        >
          Cancel
        </Button>
        
        <Button
          onClick={handleAddQuestion}
          variant="contained"
          disabled={!content.trim() || isSubmitting}
          sx={{
            backgroundColor: isDarkMode ? color.teal700 : color.teal600,
            color: color.white,
            '&:hover': {
              backgroundColor: isDarkMode ? color.teal600 : color.teal500,
            },
            '&.Mui-disabled': {
              backgroundColor: isDarkMode ? 'rgba(20, 184, 166, 0.3)' : 'rgba(20, 184, 166, 0.2)',
              color: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.7)',
            },
            borderRadius: '0.75rem',
            textTransform: 'none',
            boxShadow: 'none',
            fontWeight: 600
          }}
        >
          {isSubmitting ? 'Adding...' : 'Add Question'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}