import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Stack,
  CircularProgress,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Tooltip,
  InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SaveIcon from '@mui/icons-material/Save';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import NotesIcon from '@mui/icons-material/Notes';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { toast } from 'react-toastify';
import { useErrors } from 'hooks/useErrors';
import { extractErrorMessages } from 'utils/extractErrorMessages';
import { testWritingService, testPartService } from 'services';

interface AddWritingDialogProps {
  open: boolean;
  onClose: () => void;
  partId: number;
  fetchWritings: () => void;
  testItemIds: number[];
  setListTestIds: (newTestIds: number[]) => void;
}

export default function AddWritingDialog({
  open,
  onClose,
  partId,
  fetchWritings,
  testItemIds,
  setListTestIds,
}: AddWritingDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { showError } = useErrors();

  const [topic, setTopic] = useState<string>('');
  const [minWords, setMinWords] = useState<number>(100);
  const [maxWords, setMaxWords] = useState<number>(300);
  const [status, setStatus] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setTopic('');
    setMinWords(100);
    setMaxWords(300);
    setStatus(false);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a writing topic');
      return;
    }

    if (minWords >= maxWords) {
      toast.error('Minimum words must be less than maximum words');
      return;
    }

    setIsSubmitting(true);

    try {
      const resData = await testWritingService.create({
        id: Date.now(),
        topic: topic.trim(),
        minWords,
        maxWords,
        status,
      });
      
      const newTestItemIds = [...testItemIds, resData.data.id];
      
      await testPartService.patch(partId, {
        questions: newTestItemIds,
      });
      setListTestIds(newTestItemIds)

      toast.success('Writing task added successfully');
      handleClose();
    } catch (error) {
      showError({
        message: 'Error adding writing task',
        severity: 'error',
        details: extractErrorMessages(error)
      });
    } finally {
      setIsSubmitting(false);
      fetchWritings()
    }
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
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '1rem',
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.4)' : '0 8px 32px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: isDarkMode ? color.teal800 : color.teal100,
        backgroundImage: `linear-gradient(135deg, ${isDarkMode ? color.teal800 : color.teal100} 0%, ${isDarkMode ? color.emerald800 : color.emerald100} 100%)`,
        color: isDarkMode ? color.white : color.teal900,
        px: 3,
        py: 2.5,
        borderBottom: `1px solid ${isDarkMode ? color.teal700 : color.teal200}`
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <EditNoteIcon sx={{ fontSize: 28 }} />
          <Typography variant="h6" component="h2" fontWeight={600}>
            Add New Writing Task
          </Typography>
        </Box>
        <IconButton 
          aria-label="close" 
          onClick={handleClose}
          sx={{ 
            color: isDarkMode ? color.gray300 : color.gray700,
            backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ px: 3, py: 3 }}>
        <Stack spacing={3}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <NotesIcon sx={{ color: isDarkMode ? color.teal400 : color.teal600, fontSize: 20 }} />
              <Typography variant="subtitle1" sx={{ 
                fontWeight: 600, 
                color: isDarkMode ? color.teal300 : color.teal700 
              }}>
                Writing Topic
              </Typography>
            </Box>
            <TextField
              fullWidth
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
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
                    backgroundColor: topic.trim() 
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
                value={minWords}
                onChange={(e) => setMinWords(Number(e.target.value))}
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
                value={maxWords}
                onChange={(e) => setMaxWords(Number(e.target.value))}
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
            
            {minWords >= maxWords && (
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
                <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                Minimum words must be less than maximum words
              </Typography>
            )}
          </Box>

          <Box>
            <Divider sx={{ 
              my: 1, 
              borderColor: isDarkMode ? color.gray700 : color.gray200 
            }} />
            
            <FormControlLabel
              control={
                <Switch
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
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
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography 
                    variant="body2"
                    sx={{ 
                      color: status
                        ? (isDarkMode ? color.teal300 : color.teal600)
                        : (isDarkMode ? color.gray400 : color.gray600),
                      fontWeight: status ? 600 : 400
                    }}
                  >
                    Active Status
                  </Typography>
                  <Tooltip title="Active tasks will be visible to students">
                    <InfoOutlinedIcon 
                      sx={{ 
                        ml: 1, 
                        fontSize: 16, 
                        color: isDarkMode ? color.gray500 : color.gray400,
                        cursor: 'help'
                      }} 
                    />
                  </Tooltip>
                </Box>
              }
              sx={{
                color: isDarkMode ? color.gray300 : color.gray700,
              }}
            />
          </Box>
        </Stack>
      </DialogContent>
      
      <DialogActions sx={{ 
        px: 3, 
        py: 2.5, 
        borderTop: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderColor: isDarkMode ? color.gray600 : color.gray300,
            color: isDarkMode ? color.gray300 : color.gray700,
            '&:hover': {
              borderColor: isDarkMode ? color.gray500 : color.gray400,
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
            },
            borderRadius: '0.75rem',
            px: 3,
            py: 1,
            textTransform: 'none'
          }}
        >
          Cancel
        </Button>
        
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!topic.trim() || isSubmitting || minWords >= maxWords}
          startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
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
            px: 3,
            py: 1,
            textTransform: 'none',
            transition: 'all 0.2s ease',
          }}
        >
          {isSubmitting ? 'Creating...' : 'Create Writing Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}