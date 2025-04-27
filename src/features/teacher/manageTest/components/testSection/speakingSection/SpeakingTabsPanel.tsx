import React, { useState, useEffect } from 'react';
import { Box, Paper, List } from '@mui/material';
import { TestSpeaking } from 'interfaces';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import SpeakingTabPanel from './SpeakingTabPanel';

interface SpeakingTabsPanelProps {
  speakings: TestSpeaking[];
  selectedSpeakingId: number | null;
  handleSelectSpeaking: (id: number) => void;
  isEditMode: boolean;
  onMoveLeft: (index: number) => void;
  onMoveRight: (index: number) => void;
  questionsRanges: Record<number, string>;
  onToggleStatus?: (id: number) => void;
  hasChanges?: boolean;
}

export default function SpeakingTabsPanel({
  speakings,
  selectedSpeakingId,
  handleSelectSpeaking,
  isEditMode,
  onMoveLeft,
  onMoveRight,
  questionsRanges,
  onToggleStatus,
  hasChanges
}: SpeakingTabsPanelProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  // State to track the current speakings
  const [currentSpeakings, setCurrentSpeakings] = useState<TestSpeaking[]>(speakings);

  // Effect to update currentSpeakings when speakings prop changes
  useEffect(() => {
    setCurrentSpeakings(speakings);
  }, [speakings]);
  
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: '1rem',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        border: isDarkMode ? `1px solid ${color.gray700}` : 'none',
      }}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: isDarkMode ? color.gray700 : color.gray100,
          borderBottom: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            fontWeight: 'bold',
            color: isDarkMode ? color.teal300 : color.teal600,
            fontSize: '1.1rem',
          }}
        >
          Speaking Topics
        </Box>
      </Box>
      
      <List
        sx={{
          p: 0,
          overflow: 'auto',
          flex: 1,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: isDarkMode ? color.gray800 : color.gray100,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: isDarkMode ? color.gray600 : color.gray300,
            borderRadius: '4px',
          },
        }}
      >
        {currentSpeakings.map((speaking, index) => (
          <SpeakingTabPanel
            key={speaking.id}
            speaking={speaking}
            isSelected={selectedSpeakingId === speaking.id}
            onClick={() => handleSelectSpeaking(speaking.id)}
            index={index}
            isEditMode={isEditMode}
            onMoveLeft={onMoveLeft}
            onMoveRight={onMoveRight}
            totalSpeakings={currentSpeakings.length}
            questionsRange={questionsRanges[speaking.id]}
            onToggleStatus={onToggleStatus}
          />
        ))}
      </List>
      
      {isEditMode && currentSpeakings.length > 0 && (
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
            : "Drag or use arrows to reorder topics"}
        </Box>
      )}
    </Paper>
  );
}