import React from 'react';
import { Box, Typography, Stack, Paper } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { TestWriting } from 'interfaces';
import WritingTabPanel from './WritingTabPanel';

interface WritingTabsPanelProps {
  writings: TestWriting[];
  selectedWritingId: number | null;
  handleSelectWriting: (id: number) => void;
  isEditMode: boolean;
  onMoveLeft: (index: number) => void;
  onMoveRight: (index: number) => void;
  onToggleStatus?: (id: number) => void;
  hasChanges?: boolean;
}

export default function WritingTabsPanel({
  writings,
  selectedWritingId,
  handleSelectWriting,
  isEditMode,
  onMoveLeft,
  onMoveRight,
  onToggleStatus,
  hasChanges,
}: WritingTabsPanelProps) {
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
        height: '100%',
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
          <EditNoteIcon fontSize="small" /> Writing Tasks
        </Typography>

      </Box>
      
      {hasChanges && (
        <Box
          sx={{
            py: 1,
            px: 2,
            mb: 2,
            backgroundColor: isDarkMode ? color.teal800 : color.teal50,
            borderRadius: '0.75rem',
            border: `1px solid ${isDarkMode ? color.teal700 : color.teal200}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography variant="caption" sx={{ color: isDarkMode ? color.teal200 : color.teal800, fontWeight: 500 }}>
            Unsaved Changes
          </Typography>
        </Box>
      )}
      
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
        {writings.length > 0 ? (
          <Stack spacing={1.5}>
            {writings.map((writing, index) => (
              <WritingTabPanel
                key={writing.id}
                writing={writing}
                index={index}
                isSelected={writing.id === selectedWritingId}
                onClick={() => handleSelectWriting(writing.id)}
                isEditMode={isEditMode}
                onMoveLeft={onMoveLeft}
                onMoveRight={onMoveRight}
                totalWritings={writings.length}
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
            <EditNoteIcon
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
              No Writing Tasks
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: isDarkMode ? color.gray500 : color.gray500 }}
            >
              Add writing tasks to test writing skills.
            </Typography>
          
          </Box>
        )}
      </Box>
      
      {isEditMode && writings.length > 0 && (
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
            : "Drag or use arrows to reorder tasks"}
        </Box>
      )}
    </Paper>
  );
}