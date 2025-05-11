import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Box, 
  Typography, 
  Slide,
  Paper,
  Chip,
  IconButton,
  useTheme
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import { AIResponse } from "interfaces";
import { TransitionProps } from '@mui/material/transitions';
import React, { useState } from "react";
import JsonViewer from "./JsonViewer";
import { isValidJson } from "utils/jsonFormatter";
import { format } from 'date-fns';

interface DetailDialogProps {
  open: boolean;
  response: AIResponse;
  onClose: () => void;
  onEvaluate: (response: AIResponse) => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailDialog({ 
  open, 
  response, 
  onClose,
  onEvaluate
}: DetailDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  
  // State for copy operations
  const [copyRequestSuccess, setCopyRequestSuccess] = useState<boolean>(false);
  const [copyResponseSuccess, setCopyResponseSuccess] = useState<boolean>(false);
  
  // Check if response or request is JSON
  const isRequestJson = isValidJson(response?.request || "");
  const isResponseJson = isValidJson(response?.response || "");
  
  // Format date
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return format(new Date(date), 'MMM dd, yyyy HH:mm');
  };
  
  // Handle copy to clipboard
  const handleCopyRequest = () => {
    navigator.clipboard.writeText(response.request);
    setCopyRequestSuccess(true);
    setTimeout(() => setCopyRequestSuccess(false), 2000);
  };
  
  const handleCopyResponse = () => {
    navigator.clipboard.writeText(response.response);
    setCopyResponseSuccess(true);
    setTimeout(() => setCopyResponseSuccess(false), 2000);
  };
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          borderRadius: "1rem",
          backgroundImage: isDarkMode 
            ? `linear-gradient(to bottom, ${color.gray900} 150px, ${color.gray800} 150px)`
            : `linear-gradient(to bottom, ${color.teal50} 150px, ${color.white} 150px)`,
        }
      }}
    >
      <DialogTitle
        sx={{
          pt: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <VisibilityIcon 
            sx={{ 
              mr: 1.5, 
              color: isDarkMode ? color.teal300 : color.teal600,
              fontSize: 28
            }} 
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: isDarkMode ? color.gray100 : color.gray900,
            }}
          >
            Response Details
          </Typography>
        </Box>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            color: isDarkMode ? color.gray400 : color.gray600,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3, pb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2
          }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: isDarkMode ? color.teal300 : color.teal700,
              }}
            >
              Metadata
            </Typography>
            <Chip 
              label={response.status ? "Evaluated" : "Not Evaluated"}
              size="small"
              sx={{
                  backgroundColor: response.evaluate
                    ? isDarkMode ? color.green800 : color.green100
                    : isDarkMode ? color.red800 : color.red100,
                  color: response.evaluate
                    ? isDarkMode ? color.green200 : color.green800
                    : isDarkMode ? color.red200 : color.red800,
                }}
            />
          </Box>
          
          <Box 
            component={Paper} 
            elevation={0}
            sx={{ 
              p: 2,
              backgroundColor: isDarkMode ? color.gray900 : color.gray50,
              borderRadius: '0.75rem',
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`
            }}
          >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: {xs: 2, md: 4} }}>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: isDarkMode ? color.gray400 : color.gray600,
                    fontWeight: 500,
                  }}
                >
                  ID
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? color.gray200 : color.gray800,
                    fontWeight: 500,
                  }}
                >
                  {response.id}
                </Typography>
              </Box>
              
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: isDarkMode ? color.gray400 : color.gray600,
                    fontWeight: 500,
                  }}
                >
                  Created At
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? color.gray200 : color.gray800,
                    fontWeight: 500,
                  }}
                >
                  {formatDate(response.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2
          }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: isDarkMode ? color.teal300 : color.teal700,
              }}
            >
              Request
            </Typography>
            <IconButton 
              size="small" 
              onClick={handleCopyRequest}
              sx={{
                color: copyRequestSuccess 
                  ? (isDarkMode ? color.teal400 : color.teal600)
                  : (isDarkMode ? color.gray400 : color.gray600),
                '&:hover': {
                  backgroundColor: isDarkMode ? `${color.gray800}60` : `${color.gray200}60`,
                }
              }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
          
          <Box 
            component={Paper} 
            elevation={0}
            sx={{ 
              backgroundColor: isDarkMode ? color.gray900 : color.gray50,
              borderRadius: '0.75rem',
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
              overflow: 'hidden'
            }}
          >
            {isRequestJson ? (
              <JsonViewer
                data={response.request}
                showCopyButton={false}
                showExpandButton={true}
                initiallyExpanded={true}
                maxHeight="300px"
              />
            ) : (
              <Typography
                variant="body2"
                sx={{
                  p: 2,
                  color: isDarkMode ? color.gray200 : color.gray800,
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                }}
              >
                {response.request}
              </Typography>
            )}
          </Box>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2
          }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: isDarkMode ? color.teal300 : color.teal700,
              }}
            >
              Response
            </Typography>
            <IconButton 
              size="small" 
              onClick={handleCopyResponse}
              sx={{
                color: copyResponseSuccess 
                  ? (isDarkMode ? color.teal400 : color.teal600)
                  : (isDarkMode ? color.gray400 : color.gray600),
                '&:hover': {
                  backgroundColor: isDarkMode ? `${color.gray800}60` : `${color.gray200}60`,
                }
              }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
          
          <Box 
            component={Paper} 
            elevation={0}
            sx={{ 
              backgroundColor: isDarkMode ? color.gray900 : color.gray50,
              borderRadius: '0.75rem',
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
              overflow: 'hidden'
            }}
          >
            {isResponseJson ? (
              <JsonViewer
                data={response.response}
                showCopyButton={false}
                showExpandButton={true}
                initiallyExpanded={true}
                maxHeight="350px"
              />
            ) : (
              <Typography
                variant="body2"
                sx={{
                  p: 2,
                  color: isDarkMode ? color.gray200 : color.gray800,
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                }}
              >
                {response.response}
              </Typography>
            )}
          </Box>
        </Box>
        
        <Box>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2
          }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: isDarkMode ? color.teal300 : color.teal700,
              }}
            >
              Evaluation
            </Typography>
          </Box>
          
          {response.evaluate ? (
            <Box 
              component={Paper} 
              elevation={0}
              sx={{ 
                p: 2,
                backgroundColor: isDarkMode ? color.gray900 : color.gray50,
                borderRadius: '0.75rem',
                border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? color.gray200 : color.gray800,
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.6,
                }}
              >
                {response.evaluate}
              </Typography>
            </Box>
          ) : (
            <Box 
              component={Paper} 
              elevation={0}
              sx={{ 
                p: 3,
                backgroundColor: isDarkMode ? `${color.gray900}80` : `${color.gray50}80`,
                borderRadius: '0.75rem',
                border: `1px dashed ${isDarkMode ? color.gray700 : color.gray300}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? color.gray400 : color.gray500,
                  fontStyle: 'italic',
                  mb: 2,
                  textAlign: 'center'
                }}
              >
                No evaluation has been provided for this response.
              </Typography>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => onEvaluate(response)}
                sx={{
                  borderColor: isDarkMode ? color.teal700 : color.teal500,
                  color: isDarkMode ? color.teal300 : color.teal600,
                  '&:hover': {
                    borderColor: isDarkMode ? color.teal600 : color.teal600,
                    backgroundColor: isDarkMode ? `${color.teal900}30` : `${color.teal50}80`,
                  },
                }}
              >
                Add Evaluation
              </Button>
            </Box>
          )}
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3 }}>
        {response.evaluate ? (
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => onEvaluate(response)}
            sx={{
              mr: 'auto',
              borderColor: isDarkMode ? color.emerald700 : color.emerald500,
              color: isDarkMode ? color.emerald300 : color.emerald600,
              '&:hover': {
                borderColor: isDarkMode ? color.emerald600 : color.emerald600,
                backgroundColor: isDarkMode ? `${color.emerald900}30` : `${color.emerald50}80`,
              },
            }}
          >
            Edit Evaluation
          </Button>
        ) : null}
        
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            backgroundColor: isDarkMode ? color.teal700 : color.teal500,
            color: isDarkMode ? color.white : color.white,
            '&:hover': {
              backgroundColor: isDarkMode ? color.teal600 : color.teal600,
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}