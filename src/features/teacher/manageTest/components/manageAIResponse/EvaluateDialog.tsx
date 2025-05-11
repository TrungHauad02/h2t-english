import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Box, 
  Typography, 
  TextField,
  Slide,
  Paper,
  Chip,
  IconButton,
  CircularProgress,
  useTheme,
  Alert,
  Tooltip,
  Fade
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import CloseIcon from '@mui/icons-material/Close';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import SaveIcon from '@mui/icons-material/Save';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import { AIResponse } from "interfaces";
import { TransitionProps } from '@mui/material/transitions';
import React from "react";

interface EvaluateDialogProps {
  open: boolean;
  response: AIResponse;
  onClose: () => void;
  onSave: (evaluate: string) => Promise<void>;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EvaluateDialog({ 
  open, 
  response, 
  onClose, 
  onSave 
}: EvaluateDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  
  const [evaluate, setEvaluate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  
  // Initialize evaluate with current value and track if edited
  useEffect(() => {
    if (response) {
      setEvaluate(response.evaluate || "");
      setIsEdited(false);
    }
  }, [response]);

  // Handle text change
  const handleEvaluateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvaluate(e.target.value);
    setIsEdited(true);
  };
  
  // Handle save button click
  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      await onSave(evaluate);
      setIsEdited(false);
    } catch (error) {
      console.error("Error saving evaluation:", error);
      setError("Failed to save evaluation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(response.response);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Handle clear evaluation
  const handleClear = () => {
    setEvaluate("");
    setIsEdited(true);
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
          <AssignmentTurnedInIcon 
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
            Evaluate AI Response
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
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3,
              backgroundColor: isDarkMode ? `${color.red900}40` : `${color.red100}`,
              color: isDarkMode ? color.red200 : color.red800,
            }}
          >
            {error}
          </Alert>
        )}

        <Box 
          component={Paper} 
          elevation={0}
          sx={{ 
            p: 2, 
            mb: 3, 
            position: 'relative',
            backgroundColor: isDarkMode ? color.gray900 : color.gray100,
            borderRadius: '0.75rem',
            border: `1px solid ${isDarkMode ? color.gray700 : color.gray300}`
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: isDarkMode ? color.gray300 : color.gray700,
              mb: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Student Request:</span>
            <Chip 
              label={`ID: ${response.id}`}
              size="small"
              sx={{
                backgroundColor: isDarkMode ? `${color.gray800}80` : `${color.gray200}80`,
                color: isDarkMode ? color.gray300 : color.gray700,
                fontWeight: 500,
                height: '1.25rem',
                fontSize: '0.7rem',
              }}
            />
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray200 : color.gray800,
              whiteSpace: 'pre-wrap',
            }}
          >
            {response.request}
          </Typography>
        </Box>
        
        <Box 
          component={Paper} 
          elevation={0}
          sx={{ 
            p: 2, 
            mb: 3, 
            backgroundColor: isDarkMode ? color.gray900 : color.gray100,
            borderRadius: '0.75rem',
            border: `1px solid ${isDarkMode ? color.gray700 : color.gray300}`,
            position: 'relative'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: isDarkMode ? color.gray300 : color.gray700,
              }}
            >
              AI Response:
            </Typography>
            <Tooltip 
              title={copySuccess ? "Copied!" : "Copy to clipboard"} 
              placement="top"
              arrow
            >
              <IconButton 
                size="small" 
                onClick={handleCopy}
                sx={{
                  color: copySuccess 
                    ? (isDarkMode ? color.teal400 : color.teal600)
                    : (isDarkMode ? color.gray400 : color.gray600),
                  '&:hover': {
                    backgroundColor: isDarkMode ? `${color.gray800}60` : `${color.gray200}60`,
                  }
                }}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray200 : color.gray800,
              whiteSpace: 'pre-wrap',
              fontSize: '0.875rem',
              fontFamily: 'monospace',
              lineHeight: 1.6,
              p: 1.5,
              backgroundColor: isDarkMode ? `${color.gray800}60` : `${color.gray200}30`,
              borderRadius: '0.5rem',
              border: `1px solid ${isDarkMode ? color.gray700 : color.gray300}`
            }}
          >
            {response.response}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: isDarkMode ? color.teal300 : color.teal700,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Your Evaluation:
              <Fade in={isEdited}>
                <Box 
                  component="span" 
                  sx={{ 
                    ml: 1.5,
                    color: isDarkMode ? color.teal300 : color.teal600,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    opacity: isEdited ? 1 : 0,
                    fontStyle: 'italic'
                  }}
                >
                  (Unsaved changes)
                </Box>
              </Fade>
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Tooltip title="Clear evaluation" placement="top" arrow>
                <IconButton 
                  size="small" 
                  onClick={handleClear}
                  disabled={!evaluate}
                  sx={{
                    color: isDarkMode ? color.gray400 : color.gray600,
                    '&:hover': {
                      backgroundColor: isDarkMode ? `${color.gray700}60` : `${color.gray200}60`,
                    }
                  }}
                >
                  <FormatClearIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Chip
                label={response.status ? "Evaluated" : "Not Evaluated Yet"}
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
          </Box>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={evaluate}
            onChange={handleEvaluateChange}
            placeholder="Provide your evaluation of the AI response here..."
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: isDarkMode ? color.gray700 : color.white,
                color: isDarkMode ? color.gray200 : color.gray800,
                '& fieldset': {
                  borderColor: isDarkMode ? color.gray600 : color.gray300,
                },
                '&:hover fieldset': {
                  borderColor: isDarkMode ? color.teal600 : color.teal400,
                },
                '&.Mui-focused fieldset': {
                  borderColor: isDarkMode ? color.teal500 : color.teal500,
                },
              },
            }}
          />
        </Box>
        
        <Typography
          variant="caption"
          sx={{
            color: isDarkMode ? color.gray400 : color.gray600,
            fontStyle: 'italic',
          }}
        >
          * Submitting your evaluation will mark this response as "Evaluated" and change its status.
        </Typography>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            borderColor: isDarkMode ? color.gray500 : color.gray400,
            color: isDarkMode ? color.gray300 : color.gray700,
            '&:hover': {
              borderColor: isDarkMode ? color.gray400 : color.gray600,
              backgroundColor: isDarkMode ? `${color.gray700}30` : `${color.gray100}`,
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={loading || !isEdited}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
          sx={{
            backgroundColor: isDarkMode ? color.teal700 : color.teal500,
            color: isDarkMode ? color.white : color.white,
            '&:hover': {
              backgroundColor: isDarkMode ? color.teal600 : color.teal600,
            },
            '&.Mui-disabled': {
              backgroundColor: isDarkMode ? `${color.teal800}80` : `${color.teal300}80`,
              color: isDarkMode ? `${color.gray300}80` : `${color.white}80`,
            },
          }}
        >
          {loading ? "Saving..." : "Save Evaluation"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}