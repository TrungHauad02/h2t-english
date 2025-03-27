import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { CompetitionTest } from "interfaces";

interface LeaderboardTitleProps {
    mostRecentCompetition: CompetitionTest; 
}

export default function LeaderboardTitle({mostRecentCompetition}:LeaderboardTitleProps) {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 4,
                flexWrap: { xs: "wrap", sm: "nowrap" },
            }}
        >
            <Box sx={{ mb: { xs: 2, sm: 0 } }}>
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        fontWeight: "bold",
                        color: isDarkMode ? colors.teal300 : colors.teal700,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <StarIcon fontSize="large" /> Leaderboard
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: isDarkMode ? colors.gray300 : colors.gray700,
                    }}
                >
                    Top performers from our most recent competition:{" "}
                    <span style={{ fontWeight: "bold" }}>
                        {mostRecentCompetition.title}
                    </span>
                </Typography>
            </Box>
        </Box>
    );
}