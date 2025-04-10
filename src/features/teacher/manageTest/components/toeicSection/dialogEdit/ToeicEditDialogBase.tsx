import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface ToeicEditDialogBaseProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disableSave?: boolean;
  saveButtonText?: string;
}

export default function ToeicEditDialogBase({
  open,
  onClose,
  onSave,
  title,
  children,
  maxWidth = 'md',
  disableSave = false,
  saveButtonText = 'Save Changes'
}: ToeicEditDialogBaseProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  const backgroundColor = isDarkMode ? color.gray900 : color.white;
  const headerBgColor = isDarkMode ? color.gray800 : color.teal50;
  const textPrimaryColor = isDarkMode ? color.gray100 : color.gray900;
  const textSecondaryColor = isDarkMode ? color.gray300 : color.gray600;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      fullScreen={fullScreen}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: backgroundColor,
          color: textPrimaryColor,
          borderRadius: { xs: 0, sm: '1.5rem' },
          overflow: 'hidden',
          boxShadow: isDarkMode 
            ? '0 10px 40px rgba(0, 0, 0, 0.5)' 
            : '0 10px 40px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, sm: 4 },
          py: 3,
          borderBottom: `1px solid ${borderColor}`,
          backgroundColor: headerBgColor
        }}
      >
        <Typography variant="h5" fontWeight="bold" color={accentColor}>
          {title}
        </Typography>
        <IconButton 
          edge="end" 
          color="inherit" 
          onClick={onClose}
          sx={{ 
            color: textSecondaryColor,
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: { xs: 2, sm: 4 } }}>
        {children}
      </DialogContent>
      
      <DialogActions 
        sx={{ 
          p: 3, 
          borderTop: `1px solid ${borderColor}`,
          backgroundColor: headerBgColor
        }}
      >
        <Button 
          onClick={onClose} 
          sx={{
            color: textSecondaryColor,
            borderRadius: '0.75rem',
            px: 3,
            py: 1.2,
            mr: 1,
            border: `1px solid ${isDarkMode ? color.gray600 : color.gray300}`,
            '&:hover': {
              backgroundColor: isDarkMode ? color.gray700 : color.gray100
            },
            fontWeight: 'medium'
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onSave} 
          variant="contained"
          disabled={disableSave}
          sx={{
            backgroundColor: isDarkMode ? color.emerald700 : color.emerald600,
            borderRadius: '0.75rem',
            px: 4,
            py: 1.2,
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: isDarkMode ? color.emerald600 : color.emerald500
            },
            '&.Mui-disabled': {
              backgroundColor: isDarkMode ? color.gray600 : color.gray300,
              color: isDarkMode ? color.gray400 : color.gray500
            }
          }}
        >
          {saveButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}