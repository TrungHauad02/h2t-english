import users from "features/auth/services/mockData";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Avatar, Box, Chip, TableCell, TableRow, Typography } from "@mui/material";

interface LeaderboardItemProps {
    rank: number;
    userId: number;
    score: number;
}

export default function LeaderboardItem({ rank, userId, score }: LeaderboardItemProps) {
    const { isDarkMode } = useDarkMode();
    const colors = useColor();

    // Find user from userId
    const user = users.find((u) => u.id === userId);

    if (!user) return null;

    // Medal colors for top 3
    const getMedalColor = () => {
        switch (rank) {
            case 1:
                return "#FFD700"; // Gold
            case 2:
                return "#C0C0C0"; // Silver
            case 3:
                return "#CD7F32"; // Bronze
            default:
                return "transparent";
        }
    };

    return (
        <TableRow
            sx={{
                "&:hover": {
                    backgroundColor: isDarkMode ? colors.gray700 : colors.gray100,
                },
                transition: "background-color 0.2s",
            }}
        >
            <TableCell
                component="th"
                scope="row"
                align="center"
                sx={{
                    py: 2,
                    borderBottom: `1px solid ${isDarkMode ? colors.gray700 : colors.gray200
                        }`,
                    position: "relative",
                }}
            >
                {rank <= 3 ? (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <EmojiEventsIcon
                            sx={{
                                color: getMedalColor(),
                                fontSize: rank === 1 ? 28 : 24,
                            }}
                        />
                    </Box>
                ) : (
                    <Typography
                        variant="body1"
                        fontWeight="medium"
                        sx={{ color: isDarkMode ? colors.gray400 : colors.gray600 }}
                    >
                        {rank}
                    </Typography>
                )}
            </TableCell>

            <TableCell
                sx={{
                    py: 2,
                    borderBottom: `1px solid ${isDarkMode ? colors.gray700 : colors.gray200
                        }`,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                        src={user.avatar}
                        alt={user.name}
                        sx={{
                            width: 40,
                            height: 40,
                            mr: 2,
                            border: rank <= 3 ? `2px solid ${getMedalColor()}` : "none",
                        }}
                    />
                    <Box>
                        <Typography variant="body1" fontWeight="medium">
                            {user.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: isDarkMode ? colors.gray400 : colors.gray600 }}
                        >
                            {user.email}
                        </Typography>
                    </Box>
                </Box>
            </TableCell>

            <TableCell
                align="center"
                sx={{
                    py: 2,
                    borderBottom: `1px solid ${isDarkMode ? colors.gray700 : colors.gray200
                        }`,
                }}
            >
                <Chip
                    label={`${score} points`}
                    sx={{
                        fontWeight: "bold",
                        backgroundColor:
                            rank === 1
                                ? isDarkMode
                                    ? colors.teal900
                                    : colors.teal100
                                : isDarkMode
                                    ? colors.gray800
                                    : colors.gray100,
                        color:
                            rank === 1
                                ? isDarkMode
                                    ? colors.teal300
                                    : colors.teal700
                                : isDarkMode
                                    ? colors.gray300
                                    : colors.gray700,
                        border:
                            rank === 1
                                ? `1px solid ${isDarkMode ? colors.teal700 : colors.teal400}`
                                : "none",
                    }}
                />
            </TableCell>
        </TableRow>
    );
}