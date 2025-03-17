import { Typography, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StatCard from "./historyTest/StatCard";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { calculateAverageScore, calculateHighestScore } from "./historyTest/utils";
import useListHistoryTest from "../hooks/useListHistoryTest";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function HIstoryTestDashboard() {
    const color = useColor();
    const { isDarkMode } = useDarkMode();
    const hooks = useListHistoryTest();

    const textColor = isDarkMode ? color.gray100 : color.gray800;
    const paperBgColor = isDarkMode ? color.gray800 : color.white;

    return (
        <Box>
            <Typography
                variant="h4"
                component="h1"
                sx={{
                    mb: 3,
                    color: textColor,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontWeight: 600,
                }}
            >
                <TrendingUpIcon
                    sx={{
                        mr: 1,
                        color: isDarkMode ? color.teal400 : color.teal600,
                        fontSize: 32,
                    }}
                />
                Test History Dashboard
            </Typography>

            {/* Stats Summary at top for better visibility */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                    gap: 2,
                    mb: 3,
                }}
            >
                <StatCard
                    title="Average Score"
                    value={calculateAverageScore(hooks.filteredHistory)}
                    icon={<TrendingUpIcon />}
                    color={isDarkMode ? color.teal400 : color.teal600}
                    isDarkMode={isDarkMode}
                    paperBgColor={paperBgColor}
                />
                <StatCard
                    title="Tests Taken"
                    value={hooks.filteredHistory.length.toString()}
                    icon={<AssignmentIcon />}
                    color={isDarkMode ? color.emerald400 : color.emerald600}
                    isDarkMode={isDarkMode}
                    paperBgColor={paperBgColor}
                />
                <StatCard
                    title="High Score"
                    value={calculateHighestScore(hooks.filteredHistory)}
                    icon={<EmojiEventsIcon />}
                    color={isDarkMode ? color.green400 : color.green600}
                    isDarkMode={isDarkMode}
                    paperBgColor={paperBgColor}
                />
            </Box>
        </Box>
    )
}