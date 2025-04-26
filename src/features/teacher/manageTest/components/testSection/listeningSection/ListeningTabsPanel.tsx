import React from 'react';
import { Box, Typography, Stack, Paper } from '@mui/material';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { TestListening } from 'interfaces';
import ListeningTabPanel from './ListeningTabPanel';

interface ListeningTabsPanelProps {
  listenings: TestListening[];
  selectedListeningId: number | null;
  handleSelectListening: (id: number) => void;
  isEditMode: boolean;
  onMoveLeft: (index: number) => void;
  onMoveRight: (index: number) => void;
  questionsRanges: Record<number, string>;
  onToggleStatus?: (id: number) => void;
  hasChanges?: boolean;
}

export default function ListeningTabsPanel({
  listenings,
  selectedListeningId,
  handleSelectListening,
  isEditMode,
  onMoveLeft,
  onMoveRight,
  questionsRanges,
  onToggleStatus,
  hasChanges
}: ListeningTabsPanelProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;
  const secondaryBgColor = isDarkMode ? color.gray900 : color.gray100;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        boxShadow: isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.5)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: isDarkMode ? `1px solid ${color.gray700}` : 'none',
        display: 'flex',
        flexDirection: 'column',
        height: '100%', // Make sure we fill the parent height
        position: 'relative'
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2 
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            color: isDarkMode ? color.teal300 : color.teal600,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexShrink: 0,
          }}
        >
          <HeadphonesIcon fontSize="small" /> Listening Passages
        </Typography>

      </Box>
      
      <Box
        sx={{
          overflowY: 'auto',
          overflowX: 'hidden',
          flex: 1,
          pr: 1,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: isDarkMode ? color.gray900 : color.gray100,
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: isDarkMode ? color.gray600 : color.gray300,
            borderRadius: '3px',
            '&:hover': {
              backgroundColor: isDarkMode ? color.gray500 : color.gray400,
            },
          },
        }}
      >
        {listenings.length > 0 ? (
          <Stack spacing={1.5}>
            {listenings.map((listening, index) => (
              <ListeningTabPanel
                key={listening.id}
                listening={listening}
                index={index}
                isSelected={listening.id === selectedListeningId}
                onClick={() => handleSelectListening(listening.id)}
                isEditMode={isEditMode}
                onMoveLeft={onMoveLeft}
                onMoveRight={onMoveRight}
                questionsRange={questionsRanges[listening.id]}
                totalListenings={listenings.length}
                onToggleStatus={onToggleStatus}
              />
            ))}
          </Stack>
        ) : (
          <Box
            sx={{
              p: 3,
              backgroundColor: secondaryBgColor,
              borderRadius: "0.75rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "150px",
            }}
          >
            <AudiotrackIcon
              sx={{
                fontSize: 40,
                color: secondaryTextColor,
                mb: 2,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: secondaryTextColor,
                fontWeight: "medium",
                mb: 1,
              }}
            >
              No Listening Passages
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: isDarkMode ? color.gray500 : color.gray500 }}
            >
              Add listening passages to test comprehension skills.
            </Typography>
          </Box>
        )}
      </Box>
      
      {isEditMode && listenings.length > 0 && (
        <Box
          sx={{
            p: 2,
            backgroundColor: isDarkMode ? color.gray700 : color.gray100,
            borderTop: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
            textAlign: 'center',
            fontSize: '0.75rem',
            color: isDarkMode ? color.gray400 : color.gray600
          }}
        >
          {hasChanges 
            ? "Click Save to apply your changes"
            : "Drag or use arrows to reorder passages"}
        </Box>
      )}
    </Paper>
  );
}