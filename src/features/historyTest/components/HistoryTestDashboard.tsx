import {  Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StatCard from "./historyTest/StatCard";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AssignmentIcon from "@mui/icons-material/Assignment";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
export interface HistoryStats {
    averageScore: number;      
    totalTestsTaken: number;   
    highestScore: number;      
  }
interface HistoryTestDashboardProps {
    testStats: HistoryStats;
}

export default function HistoryTestDashboard({
    testStats,
}: HistoryTestDashboardProps) {
    const color = useColor();
    const { isDarkMode } = useDarkMode();
    const paperBgColor = isDarkMode ? color.gray800 : color.white;

    return (
        <Box>
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
                    value={testStats?.averageScore?.toString() ?? "0"}
                    icon={<TrendingUpIcon />}
                    color={isDarkMode ? color.teal400 : color.teal600}
                    isDarkMode={isDarkMode}
                    paperBgColor={paperBgColor}
                />
                <StatCard
                    title="Tests Taken"
                    value={testStats?.totalTestsTaken.toString()  ?? "0" }
                    icon={<AssignmentIcon />}
                    color={isDarkMode ? color.emerald400 : color.emerald600}
                    isDarkMode={isDarkMode}
                    paperBgColor={paperBgColor}
                />
                <StatCard
                    title="High Score"
                    value={testStats?.highestScore.toString()  ?? "0"}
                    icon={<EmojiEventsIcon />}
                    color={isDarkMode ? color.green400 : color.green600}
                    isDarkMode={isDarkMode}
                    paperBgColor={paperBgColor}
                />
            </Box>
        </Box>
    );
}
