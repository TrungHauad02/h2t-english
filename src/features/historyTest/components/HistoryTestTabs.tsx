import { Tabs, Tab } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

interface HistoryTestTabsProps {
  hooks: {
    activeTab: number;
    handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  };
  color: any;
  isDarkMode: boolean;
}

export default function HistoryTestTabs({ hooks, color, isDarkMode }: HistoryTestTabsProps) {
  return (
    <Tabs
      value={hooks.activeTab}
      onChange={hooks.handleTabChange}
      variant="fullWidth"
      textColor="primary"
      indicatorColor="primary"
      sx={{
        borderBottom: 1,
        borderColor: isDarkMode ? color.gray600 : color.gray300,
        bgcolor: isDarkMode ? color.gray700 : color.gray100,
        "& .MuiTab-root": {
          fontWeight: 600,
          transition: "all 0.2s ease",
          color: isDarkMode ? color.gray400 : color.gray600,
          py: 1.5,
          "&.Mui-selected": {
            color: isDarkMode ? color.teal400 : color.teal600,
          },
        },
      }}
    >
      <Tab label="All Tests" icon={<FilterListIcon />} iconPosition="start" />
      <Tab label="Regular Tests" icon={<AssignmentIcon />} iconPosition="start" />
      <Tab label="TOEIC Tests" icon={<SchoolIcon />} iconPosition="start" />
      <Tab label="Competitions" icon={<EmojiEventsIcon />} iconPosition="start" />
    </Tabs>
  );
}
