import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface TabItem {
  label: string;
  id: string;
}

interface EditTabsProps {
  tabs: TabItem[];
  activeTab: number;
  onTabChange: (newValue: number) => void;
  baseId?: string;
}

export default function EditTabs({
  tabs,
  activeTab,
  onTabChange,
  baseId = 'edit-tab'
}: EditTabsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const borderColor = isDarkMode ? color.gray700 : color.gray200;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const backgroundColor = isDarkMode ? color.gray800 : color.teal50;
  const textColor = isDarkMode ? color.gray400 : color.gray500;
  const selectedTextColor = accentColor;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  return (
    <Box sx={{ borderBottom: `1px solid ${borderColor}` }}>
      <Tabs 
        value={activeTab} 
        onChange={handleChange}
        sx={{
          px: { xs: 2, sm: 4 },
          backgroundColor: backgroundColor,
          '& .MuiTabs-indicator': {
            backgroundColor: accentColor,
            height: 3
          },
          '& .MuiTab-root': {
            fontWeight: 'bold',
            color: textColor,
            '&.Mui-selected': {
              color: selectedTextColor
            },
            py: 2
          }
        }}
      >
        {tabs.map((tab, index) => (
          <Tab 
            key={tab.id} 
            label={tab.label} 
            id={`${baseId}-tab-${index}`}
            aria-controls={`${baseId}-tabpanel-${index}`}
          />
        ))}
      </Tabs>
    </Box>
  );
}