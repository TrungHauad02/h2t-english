import React, { useState } from 'react';
import {  Box, Tabs, Tab } from '@mui/material';
import { TestPart } from 'interfaces';
import QuestionsSection from '../testSection/questionsSection/QuestionsSection';

interface GrammarSectionProps {
  parts: TestPart[];
  isEditMode: boolean;
}

export const GrammarSection: React.FC<GrammarSectionProps> = ({ parts, isEditMode }) => {
  const [selectedPartIndex, setSelectedPartIndex] = useState(0);
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedPartIndex(newValue);
  };
  
  if (parts.length === 0) return null;
  
  return (
    <>
      {parts.length > 1 && (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs 
            value={selectedPartIndex} 
            onChange={handleChange}
            aria-label="grammar parts tabs"
          >
            {parts.map((part, index) => (
              <Tab 
                key={part.id} 
                label={`Grammar Part ${index + 1}`} 
                id={`grammar-tab-${index}`}
                aria-controls={`grammar-tabpanel-${index}`}
              />
            ))}
          </Tabs>
        </Box>
      )}
      
      <QuestionsSection questions={parts[selectedPartIndex]?.questions || []} />
    </>
  );
};