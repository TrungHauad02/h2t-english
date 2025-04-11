import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

interface QuestionTabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
  id?: string;
}

export default function QuestionTabPanel(props: QuestionTabPanelProps) {
  const { children, value, index, id = 'edit-tab', ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${id}-tabpanel-${index}`}
      aria-labelledby={`${id}-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}