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
  Tab,
  Tabs
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import DescriptionIcon from '@mui/icons-material/Description';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { WEAudioInput } from 'components/input';
import { toast } from 'react-toastify';
import { useErrors } from 'hooks/useErrors';
import { extractErrorMessages } from 'utils/extractErrorMessages';
import { testListeningService, testPartService } from 'services';

interface AddListeningDialogProps {
  open: boolean;
  onClose: () => void;
  partId: number;
  fetchListenings: () => void;
  testItemIds: number[];
  setListTestIds: React.Dispatch<React.SetStateAction<number[]>>;

}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`listening-tabpanel-${index}`}
      aria-labelledby={`listening-tab-${index}`}
      {...other}
      style={{ paddingTop: 16 }}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function AddListeningDialog({
  open,
  onClose,
  partId,
  fetchListenings,
  testItemIds,
  setListTestIds,
}: AddListeningDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { showError } = useErrors();

  const [activeTab, setActiveTab] = useState(0);
  const [audioContent, setAudioContent] = useState<string>('');
  const [transcript, setTranscript] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleClose = () => {
    setAudioContent('');
    setTranscript('');
    setActiveTab(0);
    onClose();
  };

  const handleAudioChange = (base64: string) => {
    setAudioContent(base64);
  };

  const handleTranscriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTranscript(e.target.value);
  };

  const handleSubmit = async () => {
    if (!audioContent) {
      toast.error('Please upload an audio file');
      return;
    }

    setIsSubmitting(true);

    try {
      const resData = await testListeningService.create({
        id: Date.now(),
        audio: audioContent,
        transcript: transcript || '',
        questions: [],
        status: false,
      });
      
      const newTestItemIds = [...testItemIds, resData.data.id];
   
      
      await testPartService.patch(partId, {
        questions: newTestItemIds,
      });
      setListTestIds(newTestItemIds)
      fetchListenings()
      toast.success('Listening audio added successfully');
      handleClose();
    } catch (error) {
      showError({
        message: 'Error adding listening audio',
        severity: 'error',
        details: extractErrorMessages(error)
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isReadyToSubmit = audioContent !== '';

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
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: isDarkMode ? color.teal800 : color.teal100,
        color: isDarkMode ? color.white : color.teal900,
        px: 3,
        py: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <HeadphonesIcon />
          <Typography variant="h6" component="h2" fontWeight={600}>
            Add New Listening Audio
          </Typography>
        </Box>
        <IconButton 
          aria-label="close" 
          onClick={handleClose}
          sx={{ 
            color: isDarkMode ? color.gray300 : color.gray700,
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <Box sx={{ borderBottom: 1, borderColor: isDarkMode ? color.gray700 : color.gray200 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ 
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.95rem',
              py: 1.5,
              color: isDarkMode ? color.gray400 : color.gray600,
              '&.Mui-selected': {
                color: isDarkMode ? color.teal300 : color.teal600,
                fontWeight: 600
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: isDarkMode ? color.teal400 : color.teal500,
              height: 3,
              borderRadius: '3px 3px 0 0'
            }
          }}
        >
          <Tab 
            icon={<MusicNoteIcon fontSize="small" />}
            iconPosition="start" 
            label="Upload Audio" 
            id="listening-tab-0"
            aria-controls="listening-tabpanel-0" 
          />
          <Tab 
            icon={<TextSnippetIcon fontSize="small" />} 
            iconPosition="start"
            label="Add Transcript" 
            id="listening-tab-1"
            aria-controls="listening-tabpanel-1" 
          />
        </Tabs>
      </Box>
      
      <DialogContent sx={{ px: 3, py: 3 }}>
        <TabPanel value={activeTab} index={0}>
          <Stack spacing={3}>
            <Typography variant="body1" sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}>
              Upload an audio file (MP3, WAV, OGG) for the listening exercise. You can add a transcript in the next tab.
            </Typography>
            
            <Box sx={{ 
              border: `1px dashed ${isDarkMode ? color.gray600 : color.gray300}`,
              borderRadius: '0.75rem',
              backgroundColor: isDarkMode ? color.gray900 : color.gray50,
              p: 2
            }}>
              <WEAudioInput
                value={audioContent}
                onChange={handleAudioChange}
                label="Listening Audio"
                errorMessage="Cannot load audio. Please try a different file."
              />
            </Box>
            
            {!audioContent && (
              <Box 
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  p: 4,
                  backgroundColor: isDarkMode ? color.gray900 : color.gray50,
                  borderRadius: '0.75rem',
                  border: `1px dashed ${isDarkMode ? color.gray600 : color.gray300}`
                }}
              >
                <MusicNoteIcon 
                  sx={{ 
                    fontSize: 48, 
                    color: isDarkMode ? color.teal600 : color.teal500,
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': { opacity: 0.7 },
                      '50%': { opacity: 1 },
                      '100%': { opacity: 0.7 }
                    }
                  }} 
                />
                <Typography 
                  variant="body1"
                  sx={{ 
                    color: isDarkMode ? color.gray300 : color.gray600,
                    textAlign: 'center' 
                  }}
                >
                  Drag & drop your audio file here or click to browse files
                </Typography>
                <Typography 
                  variant="caption"
                  sx={{ 
                    color: isDarkMode ? color.gray400 : color.gray500,
                    textAlign: 'center' 
                  }}
                >
                  Supported formats: MP3, WAV, OGG
                </Typography>
              </Box>
            )}
            
            {audioContent && (
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="text"
                  endIcon={<TextSnippetIcon />}
                  onClick={() => setActiveTab(1)}
                  sx={{
                    color: isDarkMode ? color.teal300 : color.teal600,
                    textTransform: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: isDarkMode ? 'rgba(20, 184, 166, 0.1)' : 'rgba(20, 184, 166, 0.05)',
                    }
                  }}
                >
                  Continue to add transcript
                </Button>
              </Box>
            )}
          </Stack>
        </TabPanel>
        
        <TabPanel value={activeTab} index={1}>
          <Stack spacing={3}>
            <Typography variant="body1" sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}>
              Add a transcript for this listening passage (optional). This helps students follow along with the audio.
            </Typography>
            
            <Box sx={{ position: 'relative' }}>
              <TextField
                fullWidth
                multiline
                rows={8}
                placeholder="Enter transcript text here..."
                value={transcript}
                onChange={handleTranscriptChange}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isDarkMode ? color.gray900 : color.gray50,
                    borderRadius: '0.75rem',
                    '& fieldset': {
                      borderColor: isDarkMode ? color.gray700 : color.gray300,
                    },
                    '&:hover fieldset': {
                      borderColor: isDarkMode ? color.teal700 : color.teal300,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: isDarkMode ? color.teal600 : color.teal500,
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: isDarkMode ? color.gray200 : color.gray800,
                  }
                }}
              />
              <DescriptionIcon 
                sx={{ 
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  color: isDarkMode ? color.gray600 : color.gray400,
                  opacity: 0.6
                }}
              />
            </Box>
            
            <Typography variant="caption" sx={{ color: isDarkMode ? color.gray500 : color.gray600 }}>
              Tip: Adding a transcript allows students to see the text while listening, which can help with comprehension.
            </Typography>
          </Stack>
        </TabPanel>
      </DialogContent>
      
      <DialogActions sx={{ 
        px: 3, 
        py: 2, 
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
              backgroundColor: 'transparent'
            },
            borderRadius: '0.75rem',
            px: 3,
            py: 1,
            textTransform: 'none'
          }}
        >
          Cancel
        </Button>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          {activeTab === 1 && (
            <Button
              onClick={() => setActiveTab(0)}
              variant="outlined"
              sx={{
                borderColor: isDarkMode ? color.teal700 : color.teal400,
                color: isDarkMode ? color.teal300 : color.teal600,
                '&:hover': {
                  borderColor: isDarkMode ? color.teal600 : color.teal500,
                  backgroundColor: isDarkMode ? 'rgba(20, 184, 166, 0.05)' : 'rgba(20, 184, 166, 0.05)'
                },
                borderRadius: '0.75rem',
                px: 3, 
                py: 1,
                textTransform: 'none'
              }}
            >
              Back to Audio
            </Button>
          )}
          
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!isReadyToSubmit || isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
            sx={{
              bgcolor: isDarkMode ? color.teal700 : color.teal600,
              color: color.white,
              '&:hover': {
                bgcolor: isDarkMode ? color.teal600 : color.teal500,
              },
              '&.Mui-disabled': {
                bgcolor: isDarkMode ? color.gray700 : color.gray300,
                color: isDarkMode ? color.gray500 : color.gray500,
              },
              borderRadius: '0.75rem',
              fontWeight: 600,
              px: 3,
              py: 1,
              textTransform: 'none',
            }}
          >
            {isSubmitting ? 'Adding...' : 'Add Listening'}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}