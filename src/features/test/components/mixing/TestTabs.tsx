import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { TestPartTypeEnum } from "interfaces";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

const tabs = Object.values(TestPartTypeEnum).map((type) => ({
  id: type.toLowerCase(),
  label: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(),
}));

interface TestTabsProps {
  activeTab: string;
  onTabChange: (newTab: string) => void;
}

export default function TestTabs({ activeTab, onTabChange }: TestTabsProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    onTabChange(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: isDarkMode ? color.gray800 : "#E6F4F1",
        p: 1,
        borderRadius: "8px",
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          "& .MuiTabs-indicator": { display: "none" },
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: "bold",
            bgcolor: isDarkMode ? color.gray800 : "#E6F4F1",
            borderRadius: "8px",
            mx: { xs: 0.2, sm: 0.5 },
            fontSize: { xs: "0.75rem", sm: "0.9rem" },
            minWidth: { xs: "auto", sm: 120 },
            "&:hover": {
              bgcolor: isDarkMode ? color.gray700 : "#D9ECE8",
            },
            "&.Mui-selected": {
              bgcolor: isDarkMode ? color.teal700 : "#2F6D62",
              color: "white",
            },
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab key={tab.id} label={tab.label} value={tab.id} />
        ))}
      </Tabs>
    </Box>
  );
}
