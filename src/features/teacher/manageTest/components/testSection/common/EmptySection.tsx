import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button,
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface EmptySectionProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptySection: React.FC<EmptySectionProps> = ({
  icon,
  title,
  description = 'No content available yet.',
  action
}) => {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  
  const bgColor = isDarkMode ? color.gray800 : color.gray50;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;
  const textColor = isDarkMode ? color.gray300 : color.gray600;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        backgroundColor: bgColor,
        borderRadius: '0.75rem',
        border: `1px dashed ${borderColor}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '250px',
        textAlign: 'center',
        transition: theme.transitions.create(['border', 'background-color'], {
          duration: theme.transitions.duration.standard,
        }),
        '&:hover': {
          borderColor: isDarkMode ? color.gray600 : color.gray300,
        }
      }}
    >
      <Box sx={{ 
        color: accentColor, 
        mb: 2,
        transform: 'scale(1.5)',
        '& svg': {
          fontSize: '2.5rem'
        }
      }}>
        {icon}
      </Box>
      
      <Typography 
        variant="h6" 
        sx={{ 
          color: isDarkMode ? color.gray100 : color.gray900,
          fontWeight: 'medium',
          mb: 1
        }}
      >
        {title}
      </Typography>
      
      <Typography 
        variant="body2" 
        sx={{ 
          color: textColor,
          maxWidth: '80%',
          mb: action ? 3 : 0
        }}
      >
        {description}
      </Typography>
      
      {action && (
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={action.onClick}
          sx={{
            mt: 2,
            color: accentColor,
            borderColor: accentColor,
            '&:hover': {
              borderColor: accentColor,
              backgroundColor: isDarkMode ? `${color.teal900}40` : `${color.teal50}80`,
            }
          }}
        >
          {action.label}
        </Button>
      )}
    </Paper>
  );
};

export default EmptySection;