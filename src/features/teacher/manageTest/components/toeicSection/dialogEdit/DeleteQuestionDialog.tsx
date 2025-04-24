import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface DeleteQuestionDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteQuestionDialog({
  open,
  onClose,
  onConfirm
}: DeleteQuestionDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
    >
      <DialogContent>
        <Typography variant="h6" id="delete-dialog-title" gutterBottom>
          Delete Question
        </Typography>
        <Typography>
          Are you sure you want to delete this question? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="inherit"
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          sx={{
            backgroundColor: color.delete,
            '&:hover': {
              backgroundColor: isDarkMode ? color.red700 : color.red600
            }
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}