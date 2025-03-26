import { Box, Button, Card, CardContent, Chip, Divider, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { CompetitionTest } from "interfaces";
import useColor from "theme/useColor";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import useCompetitionCard from "./useCompetitionCard";

interface CompetitionCardProps {
    competition: CompetitionTest;
}

export default function CompetitionCard({ competition }: CompetitionCardProps) {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();
    const hooks = useCompetitionCard(competition);

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: isDarkMode ? colors.gray800 : colors.white,
                color: isDarkMode ? colors.gray100 : colors.gray900,
                borderRadius: 2,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 4,
                },
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Chip
                        label={hooks.isActive ? "Active" : hooks.isUpcoming ? "Upcoming" : "Completed"}
                        size="small"
                        sx={{
                            backgroundColor: hooks.isActive
                                ? colors.success
                                : hooks.isUpcoming
                                    ? colors.warning
                                    : colors.gray500,
                            color: "white",
                        }}
                    />
                </Box>

                <Typography
                    variant="h6"
                    component="h3"
                    fontWeight="bold"
                    sx={{ mb: 2 }}
                >
                    {competition.title}
                </Typography>

                <Divider
                    sx={{
                        my: 2,
                        borderColor: isDarkMode ? colors.gray700 : colors.gray200,
                    }}
                />

                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <EventIcon
                            fontSize="small"
                            sx={{
                                color: isDarkMode ? colors.gray400 : colors.gray500,
                                mr: 1,
                            }}
                        />
                        <Typography
                            variant="body2"
                            color={isDarkMode ? colors.gray400 : colors.gray500}
                        >
                            {hooks.formatDate(competition.startTime)} •{" "}
                            {hooks.formatTime(competition.startTime)} -{" "}
                            {hooks.formatTime(competition.endTime)}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <AccessTimeIcon
                            fontSize="small"
                            sx={{
                                color: isDarkMode ? colors.gray400 : colors.gray500,
                                mr: 1,
                            }}
                        />
                        <Typography
                            variant="body2"
                            color={isDarkMode ? colors.gray400 : colors.gray500}
                        >
                            {competition.duration} minutes
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <HelpOutlineIcon
                            fontSize="small"
                            sx={{
                                color: isDarkMode ? colors.gray400 : colors.gray500,
                                mr: 1,
                            }}
                        />
                        <Typography
                            variant="body2"
                            color={isDarkMode ? colors.gray400 : colors.gray500}
                        >
                            {competition.totalQuestions} questions
                        </Typography>
                    </Box>
                </Box>

                <Button
                    variant="contained"
                    fullWidth
                    disabled={!hooks.isActive}
                    sx={{
                        mt: "auto",
                        backgroundColor: hooks.isActive
                            ? colors.teal600
                            : hooks.isUpcoming
                                ? colors.gray600
                                : colors.gray500,
                        "&:hover": {
                            backgroundColor: hooks.isActive
                                ? colors.teal700
                                : hooks.isUpcoming
                                    ? colors.gray700
                                    : colors.gray600,
                        },
                    }}
                >
                    {hooks.isActive ? "Join Now" : hooks.isUpcoming ? "Register" : "View Results"}
                </Button>
            </CardContent>
        </Card>
    );
}