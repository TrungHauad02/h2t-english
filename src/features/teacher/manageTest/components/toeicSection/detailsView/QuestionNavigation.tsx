import React from 'react';
import { 
  Box, 
  Button 
} from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface QuestionNavigationProps { 
  total: number, 
  current: number,
  onSelect: (index: number) => void 
}

export default function QuestionNavigation({ 
  total, 
  current, 
  onSelect 
}: QuestionNavigationProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box sx={{ overflowX: 'auto', py: 2 }}>
      <Box sx={{ display: 'flex', minWidth: total * 40 }}>
        {Array.from({ length: total }).map((_, index) => (
          <Button
            key={index}
            variant={current === index ? "contained" : "outlined"}
            size="small"
            onClick={() => onSelect(index)}
            sx={{ 
              minWidth: 32, 
              mx: 0.5, 
              borderRadius: '50%',
              height: 32,
              p: 0,
              backgroundColor: current === index 
                ? (isDarkMode ? color.teal700 : color.teal500)
                : 'transparent'
            }}
          >
            {index + 1}
          </Button>
        ))}
      </Box>
    </Box>
  );
}