import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { TestPartTypeEnum } from "interfaces";

const tabs = Object.values(TestPartTypeEnum).map((type) => ({
  id: type.toLowerCase(),
  label: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(),
}));

interface TestTabsProps {
  activeTab: string;
  onTabChange: (newTab: string) => void;
}

export default function TestTabs({ activeTab, onTabChange }: TestTabsProps) {
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    onTabChange(newValue);
  };

  return (
    <Box sx={{ bgcolor: "#E6F4F1", p: 1, borderRadius: "8px" }}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant="fullWidth"
        sx={{
          "& .MuiTabs-indicator": { display: "none" },
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: "bold",
            bgcolor: "#E6F4F1",
            borderRadius: "8px",
            mx: 0.5,
            "&:hover": { bgcolor: "#D9ECE8" },
            "&.Mui-selected": { bgcolor: "#2F6D62", color: "white" },
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
