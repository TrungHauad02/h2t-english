import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Slide,
  CircularProgress,
  Alert
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import WarningIcon from '@mui/icons-material/Warning';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ConfirmSubmitDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalQuestions: number;
  answeredQuestions: number;
  isSubmitting?: boolean;
}

const ConfirmSubmitDialog: React.FC<ConfirmSubmitDialogProps> = ({
  open,
  onClose,
  onConfirm,
  totalQuestions,
  answeredQuestions,
  isSubmitting = false
}) => {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const percentage = totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;
  const unansweredQuestions = totalQuestions - answeredQuestions;

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={isSubmitting ? undefined : onClose}
      maxWidth="sm"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '16px',
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          overflow: 'hidden',
        }
      }}
    >
      <DialogTitle sx={{ 
        p: 3, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1.5,
        bgcolor: isDarkMode ? color.gray700 : color.teal50,
        borderBottom: '1px solid',
        borderColor: isDarkMode ? color.gray600 : color.teal100,
      }}>
        <HelpOutlineIcon sx={{ color: isDarkMode ? color.teal300 : color.teal600 }} />
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            color: isDarkMode ? color.gray100 : color.gray900
          }}
        >
          Submit Test Confirmation
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 3, mt: 1 }}>
        {isSubmitting ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            py: 4
          }}>
            <CircularProgress 
              size={48} 
              thickness={4} 
              sx={{ 
                color: isDarkMode ? color.teal400 : color.teal500,
                mb: 2
              }} 
            />
            <Typography sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}>
              Submitting your test...
            </Typography>
          </Box>
        ) : (
          <>
            <Typography 
              sx={{ 
                mb: 2,
                color: isDarkMode ? color.gray300 : color.gray700
              }}
            >
              You're about to submit your test for grading. Once submitted, you won't be able to make changes.
            </Typography>

            <Box 
              sx={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mb: 3,
                mt: 3
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 2,
                  bgcolor: isDarkMode ? color.gray700 : color.gray50,
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: isDarkMode ? color.gray600 : color.gray200,
                }}
              >
                <Typography sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}>
                  Total questions:
                </Typography>
                <Typography 
                  sx={{ 
                    fontWeight: 600,
                    color: isDarkMode ? color.gray200 : color.gray800
                  }}
                >
                  {totalQuestions}
                </Typography>
              </Box>

              <Box 
                sx={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 2,
                  bgcolor: isDarkMode ? 'rgba(20, 184, 166, 0.1)' : 'rgba(20, 184, 166, 0.05)',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: isDarkMode ? 'rgba(20, 184, 166, 0.2)' : 'rgba(20, 184, 166, 0.1)',
                }}
              >
                <Typography sx={{ color: isDarkMode ? color.teal200 : color.teal700 }}>
                  Answered questions:
                </Typography>
                <Typography 
                  sx={{ 
                    fontWeight: 600,
                    color: isDarkMode ? color.teal300 : color.teal600
                  }}
                >
                  {answeredQuestions} ({percentage}%)
                </Typography>
              </Box>

              {unansweredQuestions > 0 && (
                <Box 
                  sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 2,
                    bgcolor: isDarkMode ? 'rgba(251, 191, 36, 0.1)' : 'rgba(251, 191, 36, 0.05)',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: isDarkMode ? 'rgba(251, 191, 36, 0.2)' : 'rgba(251, 191, 36, 0.1)',
                  }}
                >
                  <Typography sx={{ color: isDarkMode ? color.warning : color.warning }}>
                    Unanswered questions:
                  </Typography>
                  <Typography 
                    sx={{ 
                      fontWeight: 600,
                      color: isDarkMode ? color.warning : color.warning
                    }}
                  >
                    {unansweredQuestions}
                  </Typography>
                </Box>
              )}
            </Box>

            {unansweredQuestions > 0 && (
              <Alert 
                severity="warning" 
                icon={<WarningIcon />}
                sx={{ 
                  mt: 1, 
                  borderRadius: '8px',
                  bgcolor: isDarkMode ? 'rgba(251, 191, 36, 0.1)' : 'rgba(251, 191, 36, 0.05)',
                  color: isDarkMode ? color.gray200 : color.gray800,
                  '.MuiAlert-icon': {
                    color: isDarkMode ? color.warning : color.warning
                  }
                }}
              >
                You have {unansweredQuestions} unanswered questions. Are you sure you want to submit?
              </Alert>
            )}
          </>
        )}
      </DialogContent>

      {!isSubmitting && (
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={isSubmitting}
            sx={{
              py: 1,
              px: 3,
              borderRadius: '8px',
              borderColor: isDarkMode ? color.gray600 : color.gray300,
              color: isDarkMode ? color.gray300 : color.gray700,
              '&:hover': {
                borderColor: isDarkMode ? color.gray500 : color.gray400,
                backgroundColor: 'transparent',
              },
            }}
          >
            Continue Test
          </Button>
          <Button
            variant="contained"
            onClick={onConfirm}
            disabled={isSubmitting}
            sx={{
              py: 1,
              px: 3,
              ml: 1,
              borderRadius: '8px',
              backgroundColor: isDarkMode ? color.teal700 : color.teal500,
              color: 'white',
              '&:hover': {
                backgroundColor: isDarkMode ? color.teal600 : color.teal600,
              },
            }}
          >
            Submit Test
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ConfirmSubmitDialog;