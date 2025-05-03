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
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DescriptionIcon from '@mui/icons-material/Description';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { WEDocumentInput } from 'components/input';
import { toast } from 'react-toastify';
import { useErrors } from 'hooks/useErrors';
import { extractErrorMessages } from 'utils/extractErrorMessages';
import { testReadingService, testPartService } from 'services';

interface AddReadingDialogProps {
  open: boolean;
  onClose: () => void;
  partId: number;
  fetchReadings: () => void;
  testItemIds: number[];
  setListTestIds: (newTestIds: number[]) => void;
}

export default function AddReadingDialog({
  open,
  onClose,
  partId,
  fetchReadings,
  testItemIds,
  setListTestIds,
}: AddReadingDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { showError } = useErrors();

  const [fileContent, setFileContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setFileContent('');
    onClose();
  };

  const handleDocumentChange = (base64: string) => {
    setFileContent(base64);
  };

  const handleSubmit = async () => {
    if (!fileContent) {
      toast.error('Please upload a document file');
      return;
    }

    setIsSubmitting(true);

    try {
      const resData = await testReadingService.create({
        id: Date.now(),
        file: fileContent,
        questions: [],
        status: false,
      });
      const newTestItemIds = [...testItemIds, resData.data.id];
   
      await testPartService.patch(partId, {
        questions: newTestItemIds,
      });
      setListTestIds(newTestItemIds);

      toast.success('Reading added successfully');
      handleClose();
    } catch (error) {
      showError({
        message: 'Error adding reading',
        severity: 'error',
        details: extractErrorMessages(error)
      });
    } finally {
      setIsSubmitting(false);
      fetchReadings()
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
          backgroundColor: isDarkMode ? color.gray800 : color.white
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
          <DescriptionIcon />
          <Typography variant="h6" component="h2" fontWeight={600}>
            Add New Reading
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
      
      <DialogContent sx={{ px: 3, py: 3 }}>
        <Stack spacing={3}>
          <Typography variant="body1" sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}>
            Upload a document file (DOCX, PDF, etc.) for the reading passage. Questions can be added after creating the reading.
          </Typography>
          
          <Box sx={{ 
            border: `1px dashed ${isDarkMode ? color.gray600 : color.gray300}`,
            borderRadius: '0.75rem',
            backgroundColor: isDarkMode ? color.gray900 : color.gray50,
            p: 2
          }}>
            <WEDocumentInput
              value={fileContent}
              onChange={handleDocumentChange}
              label="Reading Document"
              maxHeight="400px"
              padding="16px"
              errorMessage="Cannot load document. Please try a different file."
              returnType="base64"
            />
          </Box>
          
          {!fileContent && (
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
              <CloudUploadIcon 
                sx={{ 
                  fontSize: 48, 
                  color: isDarkMode ? color.teal600 : color.teal500 
                }} 
              />
              <Typography 
                variant="body1"
                sx={{ 
                  color: isDarkMode ? color.gray300 : color.gray600,
                  textAlign: 'center' 
                }}
              >
                Drag & drop your document file here or click to browse files
              </Typography>
              <Typography 
                variant="caption"
                sx={{ 
                  color: isDarkMode ? color.gray400 : color.gray500,
                  textAlign: 'center' 
                }}
              >
                Supported formats: DOCX, PDF, TXT
              </Typography>
            </Box>
          )}
        </Stack>
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
        
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!fileContent || isSubmitting}
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
          {isSubmitting ? 'Adding...' : 'Add Reading'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}