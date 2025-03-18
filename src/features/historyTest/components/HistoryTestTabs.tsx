import { Tabs, Tab } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useTheme, useMediaQuery } from "@mui/material";

interface HistoryTestTabsProps {
    hooks: {
        activeTab: number;
        handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
    };
    color: any;
    isDarkMode: boolean;
}

export default function HistoryTestTabs({ hooks, color, isDarkMode }: HistoryTestTabsProps) {
    const theme = useTheme();
    const isXsDown = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Tabs
            value={hooks.activeTab}
            onChange={hooks.handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
            sx={{
                borderBottom: 1,
                borderColor: isDarkMode ? color.gray600 : color.gray300,
                bgcolor: isDarkMode ? color.gray700 : color.gray100,
                overflowX: "auto",
                whiteSpace: "nowrap",
                display: "flex",
                justifyContent: "center", 
                "& .MuiTabs-flexContainer": {
                    justifyContent: "center", 
                },
                "& .MuiTab-root": {
                    fontWeight: 600,
                    transition: "all 0.2s ease",
                    color: isDarkMode ? color.gray400 : color.gray600,
                    py: { xs: 1, sm: 1.5 },
                    fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                    minWidth: "auto",
                    flexShrink: 0,
                    "&.Mui-selected": {
                        color: isDarkMode ? color.teal400 : color.teal600,
                    },
                },
            }}
        >
            <Tab label="All" icon={isXsDown ? undefined : <FilterListIcon />} iconPosition="start" />
            <Tab label="Regular" icon={isXsDown ? undefined : <AssignmentIcon />} iconPosition="start" />
            <Tab label="TOEIC" icon={isXsDown ? undefined : <SchoolIcon />} iconPosition="start" />
            <Tab label="Competitions" icon={isXsDown ? undefined : <EmojiEventsIcon />} iconPosition="start" />
        </Tabs>
    );
}