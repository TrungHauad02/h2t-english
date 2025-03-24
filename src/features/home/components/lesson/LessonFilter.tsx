import { Tabs, Tab } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface LessonFilterProps {
    animate: boolean;
    filter: string;
    handleFilterChange: (event: React.SyntheticEvent, newValue: string) => void;
}

export default function LessonFilter({ animate, filter, handleFilterChange }: LessonFilterProps) {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();
    return (
        <Tabs
            value={filter}
            onChange={handleFilterChange}
            textColor="inherit"
            sx={{
                mb: 3,
                "& .MuiTabs-indicator": {
                    backgroundColor: isDarkMode ? colors.teal400 : colors.teal600,
                    height: 3,
                    borderRadius: "3px 3px 0 0",
                },
                "& .MuiTab-root": {
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: isDarkMode ? colors.gray400 : colors.gray600,
                    minWidth: 0,
                    px: 3,
                    "&.Mui-selected": {
                        color: isDarkMode ? colors.teal300 : colors.teal700,
                    },
                },
            }}
        >
            <Tab label="Most Popular" value="popular" />
            <Tab label="Newest" value="newest" />
        </Tabs>
    );
};
