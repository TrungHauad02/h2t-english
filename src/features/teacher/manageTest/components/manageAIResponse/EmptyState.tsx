import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InboxIcon from '@mui/icons-material/Inbox';
import RefreshIcon from '@mui/icons-material/Refresh';

interface EmptyStateProps {
  type: 'loading' | 'empty' | 'error';
  message?: string;
  onRefresh?: () => void;
}

export default function EmptyState({ type, message, onRefresh }: EmptyStateProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const renderContent = () => {
    switch (type) {
      case 'loading':
        return (
          <>
            <CircularProgress 
              size={48} 
              sx={{ 
                color: isDarkMode ? color.teal400 : color.teal600,
                mb: 3
              }} 
            />
            <Typography 
              variant="h6" 
              sx={{ 
                color: isDarkMode ? color.gray300 : color.gray700,
                fontWeight: 500 
              }}
            >
              {message || 'Loading data...'}
            </Typography>
          </>
        );
      
      case 'empty':
        return (
          <>
            <InboxIcon 
              sx={{ 
                fontSize: 60, 
                color: isDarkMode ? color.gray500 : color.gray400,
                mb: 2
              }} 
            />
            <Typography 
              variant="h6" 
              sx={{ 
                color: isDarkMode ? color.gray300 : color.gray700,
                fontWeight: 500,
                mb: 1
              }}
            >
              {message || 'No data found'}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: isDarkMode ? color.gray400 : color.gray600,
                mb: 3
              }}
            >
              Try adjusting your search filters
            </Typography>
            {onRefresh && (
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={onRefresh}
                sx={{
                  borderColor: isDarkMode ? color.teal700 : color.teal500,
                  color: isDarkMode ? color.teal300 : color.teal600,
                  '&:hover': {
                    borderColor: isDarkMode ? color.teal600 : color.teal600,
                    backgroundColor: isDarkMode ? `${color.teal900}30` : `${color.teal50}80`,
                  },
                }}
              >
                Refresh
              </Button>
            )}
          </>
        );
      
      case 'error':
        return (
          <>
            <ErrorOutlineIcon 
              sx={{ 
                fontSize: 60, 
                color: isDarkMode ? color.red400 : color.red500,
                mb: 2
              }} 
            />
            <Typography 
              variant="h6" 
              sx={{ 
                color: isDarkMode ? color.gray300 : color.gray700,
                fontWeight: 500,
                mb: 1
              }}
            >
              {message || 'An error occurred'}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: isDarkMode ? color.gray400 : color.gray600,
                mb: 3
              }}
            >
              Please try again later
            </Typography>
            {onRefresh && (
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={onRefresh}
                sx={{
                  backgroundColor: isDarkMode ? color.teal700 : color.teal500,
                  color: isDarkMode ? color.white : color.white,
                  '&:hover': {
                    backgroundColor: isDarkMode ? color.teal600 : color.teal600,
                  },
                }}
              >
                Try Again
              </Button>
            )}
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        px: 3,
        textAlign: 'center',
        backgroundColor: isDarkMode ? `${color.gray900}60` : `${color.gray50}60`,
        borderRadius: '0.75rem',
        border: `1px dashed ${isDarkMode ? color.gray700 : color.gray300}`,
      }}
    >
      {renderContent()}
    </Box>
  );
}