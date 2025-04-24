import React, { ReactNode } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface TabItem {
  label: string;
  id: string;
  icon?: ReactNode;
}

interface EditTabsProps {
  tabs: TabItem[];
  activeTab: number;
  onTabChange: (newValue: number) => void;
  baseId: string;
}

export default function EditTabs({
  tabs,
  activeTab,
  onTabChange,
  baseId
}: EditTabsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  return (
    <Box sx={{ 
      borderBottom: 1, 
      borderColor: isDarkMode ? color.gray700 : color.gray300,
      width: '100%'
    }}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="edit-tabs"
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: isDarkMode ? color.teal300 : color.teal600,
            height: 3
          },
          '& .MuiTab-root': {
            color: isDarkMode ? color.gray400 : color.gray600,
            py: 1.5,
            transition: 'all 0.2s ease-in-out',
            '&.Mui-selected': {
              color: isDarkMode ? color.teal300 : color.teal600,
              fontWeight: 'bold'
            },
            '&:hover': {
              color: isDarkMode ? color.teal200 : color.teal500,
              backgroundColor: isDarkMode ? color.gray700 : color.gray100,
            }
          }
        }}
      >
        {tabs.map((tab, index) => (
          <Tab 
            key={`${baseId}-tab-${index}`}
            label={tab.label}
            iconPosition="start"
            id={`${baseId}-tab-${index}`}
            aria-controls={`${baseId}-tabpanel-${index}`}
          />
        ))}
      </Tabs>
    </Box>
  );
}