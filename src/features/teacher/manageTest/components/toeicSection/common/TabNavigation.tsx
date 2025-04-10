import React from 'react';
import { Tabs, Tab } from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface TabNavigationProps {
  tabs: string[];
  activeTab: number;
  onChange: (newValue: number) => void;
  variant?: 'standard' | 'fullWidth' | 'scrollable';
}

export default function TabNavigation({
  tabs,
  activeTab,
  onChange,
  variant = 'standard'
}: TabNavigationProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onChange(newValue);
  };

  return (
    <Tabs 
      value={activeTab} 
      onChange={handleChange}
      variant={variant}
      sx={{
        mb: 3,
        '& .MuiTabs-indicator': {
          backgroundColor: isDarkMode ? color.teal500 : color.teal600,
        },
        '& .MuiTab-root': {
          color: isDarkMode ? color.gray400 : color.gray500,
          '&.Mui-selected': {
            color: isDarkMode ? color.teal300 : color.teal700,
          },
        },
      }}
    >
      {tabs.map((label, index) => (
        <Tab key={index} label={label} />
      ))}
    </Tabs>
  );
}