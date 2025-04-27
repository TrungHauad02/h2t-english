import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Paper, 
  Switch, 
  Button, 
  Stack,
  FormControlLabel
} from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { Question } from 'interfaces';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

interface QuestionEditFormProps {
  question: Question;
  onSave: (updatedQuestion: Question) => void;
  onCancel: () => void;
}

export default function QuestionEditForm({ 
  question, 
  onSave, 
  onCancel 
}: QuestionEditFormProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const [formData, setFormData] = useState<Question>({
    ...question
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      status: e.target.checked
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Box 
      component={Paper} 
      elevation={3}
      sx={{
        p: 3,
        borderRadius: '1rem',
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        mb: 3
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          color: isDarkMode ? color.teal300 : color.teal600,
          mb: 3,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        Question Details
        <FormControlLabel
          control={
            <Switch
              checked={formData.status}
              onChange={handleStatusChange}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: color.teal500,
                  '&:hover': {
                    backgroundColor: isDarkMode 
                      ? 'rgba(94, 234, 212, 0.08)'
                      : 'rgba(20, 184, 166, 0.08)',
                  },
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: isDarkMode ? color.teal400 : color.teal500,
                },
              }}
            />
          }
          label={
            <Typography 
              variant="body2"
              sx={{ 
                color: formData.status
                  ? (isDarkMode ? color.teal300 : color.teal600)
                  : (isDarkMode ? color.gray400 : color.gray600)
              }}
            >
              Active
            </Typography>
          }
          sx={{ ml: 2 }}
        />
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography 
          sx={{ 
            mb: 1, 
            color: isDarkMode ? color.gray300 : color.gray700,
            fontWeight: 500,
            fontSize: '0.875rem',
          }}
        >
          Question Content
        </Typography>
        <TextField
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: isDarkMode ? color.gray900 : color.white,
              borderRadius: '0.5rem',
              '& fieldset': {
                borderColor: isDarkMode ? color.gray700 : color.gray300,
              },
              '&:hover fieldset': {
                borderColor: isDarkMode ? color.teal600 : color.teal400,
              },
              '&.Mui-focused fieldset': {
                borderColor: color.teal500,
              },
            },
            '& .MuiInputBase-input': {
              color: isDarkMode ? color.white : color.gray900,
            },
          }}
        />
      </Box>
      
      <Box sx={{ mb: 4 }}>
        <Typography 
          sx={{ 
            mb: 1, 
            color: isDarkMode ? color.gray300 : color.gray700,
            fontWeight: 500,
            fontSize: '0.875rem',
          }}
        >
          Explanation
        </Typography>
        <TextField
          name="explanation"
          value={formData.explanation || ''}
          onChange={handleInputChange}
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: isDarkMode ? color.gray900 : color.white,
              borderRadius: '0.5rem',
              '& fieldset': {
                borderColor: isDarkMode ? color.gray700 : color.gray300,
              },
              '&:hover fieldset': {
                borderColor: isDarkMode ? color.teal600 : color.teal400,
              },
              '&.Mui-focused fieldset': {
                borderColor: color.teal500,
              },
            },
            '& .MuiInputBase-input': {
              color: isDarkMode ? color.white : color.gray900,
            },
          }}
        />
      </Box>
      
      <Stack direction="row" spacing={2} justifyContent="flex-start">
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{
            backgroundColor: isDarkMode ? color.teal700 : color.teal600,
            color: color.white,
            '&:hover': {
              backgroundColor: isDarkMode ? color.teal600 : color.teal500,
              boxShadow: '0 4px 10px rgba(20, 184, 166, 0.3)',
            },
            borderRadius: '0.5rem',
            px: 3,
            py: 1,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Save Changes
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<CancelIcon />}
          onClick={onCancel}
          sx={{
            borderColor: isDarkMode ? color.gray600 : color.gray400,
            color: isDarkMode ? color.gray300 : color.gray600,
            '&:hover': {
              borderColor: isDarkMode ? color.gray500 : color.gray500,
              backgroundColor: isDarkMode ? 'rgba(75, 85, 99, 0.1)' : 'rgba(107, 114, 128, 0.1)',
            },
            borderRadius: '0.5rem',
            px: 3,
            py: 1,
            textTransform: 'none',
          }}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
}