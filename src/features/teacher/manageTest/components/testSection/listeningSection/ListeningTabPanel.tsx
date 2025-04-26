import React from 'react';
import { Box, Typography, Paper, Tooltip } from '@mui/material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import { TestListening } from 'interfaces';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { StatusBadge } from '../common/StatusBadge';

interface ListeningTabPanelProps {
  listening: TestListening;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  isEditMode: boolean;
  onMoveLeft: (index: number) => void;
  onMoveRight: (index: number) => void;
  questionsRange?: string;
  totalListenings: number;
  onToggleStatus?: (id: number) => void;
}

export default function ListeningTabPanel({
  listening,
  index,
  isSelected,
  onClick,
  isEditMode,
  onMoveLeft,
  onMoveRight,
  questionsRange,
  totalListenings,
  onToggleStatus
}: ListeningTabPanelProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  return (
    <Paper
      elevation={isSelected ? 3 : 1}
      onClick={onClick}
      sx={{
        p: 2,
        pt: 2.5, // Increased top padding to make room for the status badge
        borderRadius: "1rem",
        cursor: "pointer",
        backgroundColor: isSelected 
          ? isDarkMode ? color.teal700 : color.teal100
          : isDarkMode ? color.gray700 : color.white,
        borderLeft: isSelected 
          ? `4px solid ${isDarkMode ? color.teal300 : color.teal600}`
          : 'none',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: isSelected 
            ? isDarkMode ? color.teal700 : color.teal100
            : isDarkMode ? color.gray600 : color.gray100,
          transform: 'translateY(-2px)',
          boxShadow: isDarkMode 
            ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
            : '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Status Badge - Now positioned at the top left corner */}
      <Box 
        sx={{
          position: 'absolute',
          top: 8,
          left: 8,
          zIndex: 2
        }}
      >
        <StatusBadge isActive={!!listening.status} size="small" />
      </Box>

      {isSelected && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 40,
            height: 3,
            backgroundColor: isDarkMode ? color.teal400 : color.teal500,
            borderRadius: '0 0 0 4px'
          }}
        />
      )}
      
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {listening.audio ? (
            <GraphicEqIcon 
              sx={{ 
                color: isSelected 
                  ? isDarkMode ? color.teal300 : color.teal700
                  : isDarkMode ? color.gray300 : color.gray600,
                animation: isSelected ? 'pulse 1.5s infinite' : 'none',
                '@keyframes pulse': {
                  '0%': { opacity: 0.7 },
                  '50%': { opacity: 1 },
                  '100%': { opacity: 0.7 }
                }
              }} 
            />
          ) : (
            <AudiotrackIcon 
              sx={{ 
                color: isSelected 
                  ? isDarkMode ? color.teal300 : color.teal700
                  : isDarkMode ? color.gray300 : color.gray600 
              }} 
            />
          )}
          
          <Box>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: isSelected ? 600 : 400,
                color: isSelected 
                  ? isDarkMode ? color.white : color.teal800
                  : isDarkMode ? color.gray200 : color.gray800,
                mb: 0.5,
                mt: 1 // Added top margin to prevent overlap with status badge
              }}
            >
              {`Listening ${index + 1}`}
            </Typography>
            
            {questionsRange && (
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'block',
                  color: isSelected 
                    ? isDarkMode ? color.teal100 : color.teal900
                    : isDarkMode ? color.gray400 : color.gray500,
                }}
              >
                Questions: {questionsRange}
              </Typography>
            )}
          </Box>
        </Box>
        
        {isEditMode && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 0.5 }}>
            <Tooltip title="Move up">
              <Box
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveLeft(index);
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.05)',
                  color: isDarkMode ? color.gray300 : color.gray600,
                  opacity: index === 0 ? 0.5 : 1,
                  pointerEvents: index === 0 ? 'none' : 'auto',
                  cursor: index === 0 ? 'default' : 'pointer',
                  '&:hover': index !== 0 ? {
                    backgroundColor: isDarkMode 
                      ? 'rgba(255, 255, 255, 0.2)' 
                      : 'rgba(0, 0, 0, 0.1)',
                    transform: 'scale(1.1)',
                  } : {},
                  transition: 'all 0.2s ease',
                }}
              >
                <ArrowUpwardIcon fontSize="small" />
              </Box>
            </Tooltip>
            
            <Tooltip title={listening.status ? "Set inactive" : "Set active"}>
              <Box
                onClick={(e) => {
                  e.stopPropagation();
                  if (onToggleStatus) {
                    onToggleStatus(listening.id);
                  }
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: listening.status 
                    ? (isDarkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)')
                    : (isDarkMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)'),
                  color: listening.status
                    ? (isDarkMode ? color.teal300 : color.teal600)
                    : (isDarkMode ? color.red300 : color.red600),
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: listening.status
                      ? (isDarkMode ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.2)')
                      : (isDarkMode ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.2)'),
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                {listening.status ? (
                  <ToggleOnIcon fontSize="small" />
                ) : (
                  <ToggleOffIcon fontSize="small" />
                )}
              </Box>
            </Tooltip>
            
            <Tooltip title="Move down">
              <Box
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveRight(index);
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.05)',
                  color: isDarkMode ? color.gray300 : color.gray600,
                  opacity: index === totalListenings - 1 ? 0.5 : 1,
                  pointerEvents: index === totalListenings - 1 ? 'none' : 'auto',
                  cursor: index === totalListenings - 1 ? 'default' : 'pointer',
                  '&:hover': index !== totalListenings - 1 ? {
                    backgroundColor: isDarkMode 
                      ? 'rgba(255, 255, 255, 0.2)' 
                      : 'rgba(0, 0, 0, 0.1)',
                    transform: 'scale(1.1)',
                  } : {},
                  transition: 'all 0.2s ease',
                }}
              >
                <ArrowDownwardIcon fontSize="small" />
              </Box>
            </Tooltip>
          </Box>
        )}
      </Box>
    </Paper>
  );
}