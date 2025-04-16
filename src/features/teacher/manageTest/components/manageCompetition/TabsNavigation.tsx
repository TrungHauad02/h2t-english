import React from "react";
import { Box, Tabs, Tab, Slide, Badge } from "@mui/material";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import HistoryIcon from "@mui/icons-material/History";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { CompetitionTest } from "interfaces";

interface TabsNavigationProps {
  tabValue: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  competitions: CompetitionTest[];
  activeCompetitions: CompetitionTest[];
  upcomingCompetitions: CompetitionTest[];
  pastCompetitions: CompetitionTest[];
}

export default function TabsNavigation({
  tabValue,
  handleTabChange,
  competitions,
  activeCompetitions,
  upcomingCompetitions,
  pastCompetitions,
}: TabsNavigationProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  interface StyledTabProps {
    label: string;
    icon: React.ReactElement;
    count: number;
  }

  const tabItems: StyledTabProps[] = [
    {
      label: "All",
      icon: <AllInclusiveIcon />,
      count: competitions.length,
    },
    {
      label: "Active",
      icon: <PlayArrowIcon />,
      count: activeCompetitions.length,
    },
    {
      label: "Upcoming",
      icon: <UpcomingIcon />,
      count: upcomingCompetitions.length,
    },
    {
      label: "Past",
      icon: <HistoryIcon />,
      count: pastCompetitions.length,
    },
  ];

  return (
    <Slide direction="down" in={true} mountOnEnter unmountOnExit timeout={300}>
      <Box
        sx={{
          mb: 4,
          borderRadius: "8px",
          backgroundColor: isDarkMode ? color.gray700 : color.gray100,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          TabIndicatorProps={{
            style: {
              backgroundColor: isDarkMode ? color.teal400 : color.teal600,
              height: 3,
            },
          }}
          sx={{
            "& .MuiTabs-flexContainer": {
              borderBottom: `1px solid ${
                isDarkMode ? color.gray600 : color.gray200
              }`,
            },
            "& .MuiTab-root": {
              textTransform: "none",
              minHeight: 56,
              fontSize: "0.95rem",
              fontWeight: 500,
              color: isDarkMode ? color.gray300 : color.gray600,
              transition: "all 0.2s ease",
              "&:hover": {
                color: isDarkMode ? color.teal300 : color.teal700,
                backgroundColor: isDarkMode
                  ? "rgba(94, 234, 212, 0.05)"
                  : "rgba(20, 184, 166, 0.05)",
              },
              "&.Mui-selected": {
                color: isDarkMode ? color.teal300 : color.teal700,
                fontWeight: 600,
              },
            },
          }}
        >
          {tabItems.map((item, index) => (
            <Tab
              key={index}
              icon={item.icon}
              iconPosition="start"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {item.label}
                  <Badge
                    badgeContent={item.count}
                    color={
                      index === 0
                        ? "primary"
                        : index === 1
                        ? "success"
                        : index === 2
                        ? "info"
                        : "warning"
                    }
                    sx={{
                      "& .MuiBadge-badge": {
                        right: -18,
                        top: -8,
                        padding: "0 6px",
                        height: 20,
                        minWidth: 20,
                        fontWeight: "bold",
                        fontSize: "0.7rem",
                      },
                    }}
                  />
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>
    </Slide>
  );
}