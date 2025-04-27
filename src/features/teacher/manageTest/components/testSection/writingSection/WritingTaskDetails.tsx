import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Stack, 
  Chip,
  InputAdornment,
  Alert
} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import DescriptionIcon from '@mui/icons-material/Description';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface WritingTaskDetailsProps {
  topic: string;
  minWords: number;
  maxWords: number;
  isEditMode: boolean;
  onSave: (topic: string, minWords: number, maxWords: number) => void;
}

export default function WritingTaskDetails({
  topic,
  minWords,
  maxWords,
  isEditMode,
  onSave
}: WritingTaskDetailsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [editedTopic, setEditedTopic] = useState(topic);
  const [editedMinWords, setEditedMinWords] = useState(minWords);
  const [editedMaxWords, setEditedMaxWords] = useState(maxWords);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode) {
      setIsEditing(false);
    }
  }, [isEditMode]);

  useEffect(() => {
    setEditedTopic(topic);
    setEditedMinWords(minWords);
    setEditedMaxWords(maxWords);
  }, [topic, minWords, maxWords]);

  const handleSave = () => {
    if (!editedTopic.trim()) {
      setError('Topic cannot be empty');
      return;
    }
    
    if (editedMinWords >= editedMaxWords) {
      setError('Minimum words must be less than maximum words');
      return;
    }
    
    onSave(editedTopic, editedMinWords, editedMaxWords);
    setIsEditing(false);
    setError(null);
  };

  const handleCancel = () => {
    setEditedTopic(topic);
    setEditedMinWords(minWords);
    setEditedMaxWords(maxWords);
    setIsEditing(false);
    setError(null);
  };

  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '0.75rem',
      backgroundColor: isDarkMode ? color.gray900 : color.gray50,
      '& fieldset': {
        borderColor: isDarkMode ? color.gray600 : color.gray300,
      },
      '&:hover fieldset': {
        borderColor: isDarkMode ? color.teal600 : color.teal400,
      },
      '&.Mui-focused fieldset': {
        borderColor: isDarkMode ? color.teal500 : color.teal400,
        borderWidth: 2,
      },
    },
    '& .MuiInputBase-input': {
      color: isDarkMode ? color.white : color.gray900,
    },
    '& .MuiInputLabel-root': {
      color: isDarkMode ? color.gray400 : color.gray600,
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: isDarkMode ? color.teal400 : color.teal600,
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: '1rem',
        overflow: 'hidden',
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        border: isDarkMode ? `1px solid ${color.gray700}` : 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: isDarkMode 
            ? '0 8px 24px rgba(0, 0, 0, 0.25)' 
            : '0 8px 24px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      {/* Header gradient */}
      <Box
        sx={{
          height: 6,
          background: `linear-gradient(90deg, ${isDarkMode ? color.teal700 : color.teal400} 0%, ${isDarkMode ? color.emerald700 : color.emerald400} 100%)`
        }}
      />
      
      {/* Content */}
      <Box sx={{ p: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 3 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EditNoteIcon 
              sx={{ 
                color: isDarkMode ? color.teal300 : color.teal600,
                mr: 1.5,
                fontSize: 28
              }} 
            />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: isDarkMode ? color.teal300 : color.teal600 
              }}
            >
              Writing Task Details
            </Typography>
          </Box>
          
          {isEditMode && !isEditing && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<EditNoteIcon />}
              onClick={() => setIsEditing(true)}
              sx={{
                borderColor: isDarkMode ? color.teal600 : color.teal400,
                color: isDarkMode ? color.teal300 : color.teal600,
                '&:hover': {
                  borderColor: isDarkMode ? color.teal500 : color.teal500,
                  backgroundColor: isDarkMode ? 'rgba(20, 184, 166, 0.1)' : 'rgba(20, 184, 166, 0.05)',
                },
                borderRadius: '0.75rem',
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Edit Details
            </Button>
          )}
        </Box>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 2, 
              borderRadius: '0.75rem',
              '& .MuiAlert-icon': {
                color: isDarkMode ? color.red400 : color.red600
              }
            }}
            icon={<WarningAmberIcon />}
          >
            {error}
          </Alert>
        )}

        {isEditMode && isEditing ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <DescriptionIcon sx={{ color: isDarkMode ? color.teal400 : color.teal600, fontSize: 20 }} />
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: 600, 
                  color: isDarkMode ? color.teal300 : color.teal700 
                }}>
                  Writing Topic
                </Typography>
              </Box>
              <TextField
                fullWidth
                value={editedTopic}
                onChange={(e) => setEditedTopic(e.target.value)}
                variant="outlined"
                multiline
                rows={4}
                placeholder="Enter the writing task description or topic"
                sx={inputStyle}
                InputProps={{
                  sx: {
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 4,
                      borderRadius: '4px 0 0 4px',
                      backgroundColor: editedTopic.trim() 
                        ? (isDarkMode ? color.teal700 : color.teal400)
                        : (isDarkMode ? color.gray700 : color.gray300),
                      transition: 'background-color 0.2s ease'
                    }
                  }
                }}
              />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <FormatSizeIcon sx={{ color: isDarkMode ? color.teal400 : color.teal600, fontSize: 20 }} />
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: 600, 
                  color: isDarkMode ? color.teal300 : color.teal700 
                }}>
                  Word Count Requirements
                </Typography>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' }
              }}>
                <TextField
                  type="number"
                  label="Minimum Words"
                  value={editedMinWords}
                  onChange={(e) => setEditedMinWords(Number(e.target.value))}
                  variant="outlined"
                  fullWidth
                  InputProps={{ 
                    inputProps: { min: 50, max: 500 },
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography variant="body2" color={isDarkMode ? color.gray400 : color.gray600}>
                          words
                        </Typography>
                      </InputAdornment>
                    )
                  }}
                  sx={inputStyle}
                />
                <TextField
                  type="number"
                  label="Maximum Words"
                  value={editedMaxWords}
                  onChange={(e) => setEditedMaxWords(Number(e.target.value))}
                  variant="outlined"
                  fullWidth
                  InputProps={{ 
                    inputProps: { min: 100, max: 1000 },
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography variant="body2" color={isDarkMode ? color.gray400 : color.gray600}>
                          words
                        </Typography>
                      </InputAdornment>
                    )
                  }}
                  sx={inputStyle}
                />
              </Box>
              
              {editedMinWords >= editedMaxWords && (
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: isDarkMode ? color.red400 : color.red600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    mt: 1
                  }}
                >
                  <WarningAmberIcon sx={{ fontSize: 16 }} />
                  Minimum words must be less than maximum words
                </Typography>
              )}
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, mt: 1, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
                sx={{
                  borderColor: isDarkMode ? color.gray600 : color.gray300,
                  color: isDarkMode ? color.gray300 : color.gray700,
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
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={!editedTopic.trim() || editedMinWords >= editedMaxWords}
                sx={{
                  bgcolor: isDarkMode ? color.teal700 : color.teal600,
                  color: color.white,
                  '&:hover': {
                    bgcolor: isDarkMode ? color.teal600 : color.teal500,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(20, 184, 166, 0.25)',
                    transition: 'all 0.2s ease',
                  },
                  '&.Mui-disabled': {
                    bgcolor: isDarkMode ? 'rgba(45, 212, 191, 0.12)' : 'rgba(20, 184, 166, 0.12)',
                    color: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.26)',
                  },
                  borderRadius: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        ) : (
          <Stack spacing={3}>
            <Box>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  color: isDarkMode ? color.gray400 : color.gray600,
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <DescriptionIcon sx={{ fontSize: 18 }} />
                TOPIC
              </Typography>
              
              <Box
                sx={{
                  backgroundColor: isDarkMode ? color.gray900 : color.gray50,
                  p: 2.5,
                  borderRadius: '0.75rem',
                  border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    borderRadius: '4px 0 0 4px',
                    backgroundColor: isDarkMode ? color.teal700 : color.teal400
                  }
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: isDarkMode ? color.white : color.gray900,
                    whiteSpace: 'pre-wrap',
                    lineHeight: 1.6
                  }}
                >
                  {topic}
                </Typography>
              </Box>
            </Box>
            
            <Box>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  color: isDarkMode ? color.gray400 : color.gray600,
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <FormatSizeIcon sx={{ fontSize: 18 }} />
                WORD COUNT REQUIREMENTS
              </Typography>
              
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Chip
                  label={`Min: ${minWords} words`}
                  sx={{
                    backgroundColor: isDarkMode ? color.teal900 : color.teal50,
                    color: isDarkMode ? color.teal200 : color.teal800,
                    fontWeight: 600,
                    borderRadius: '0.5rem',
                    height: 32
                  }}
                />
                <Box sx={{ color: isDarkMode ? color.gray500 : color.gray400 }}>—</Box>
                <Chip
                  label={`Max: ${maxWords} words`}
                  sx={{
                    backgroundColor: isDarkMode ? color.teal800 : color.teal100,
                    color: isDarkMode ? color.teal100 : color.teal900,
                    fontWeight: 600,
                    borderRadius: '0.5rem',
                    height: 32
                  }}
                />
              </Box>
            </Box>
          </Stack>
        )}
      </Box>
    </Paper>
  );
}