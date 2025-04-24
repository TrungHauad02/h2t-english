import { 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  Button 
} from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface DialogConfirmProps {
  open: boolean;
  title: string;
  content: string;
  confirmButtonText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DialogConfirm({
  open,
  title,
  content,
  confirmButtonText = 'Delete',
  onClose,
  onConfirm,
}: DialogConfirmProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
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
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}