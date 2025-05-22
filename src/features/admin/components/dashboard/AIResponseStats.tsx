import { Box, Paper, Typography, LinearProgress, Chip, Tooltip, IconButton, Divider } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import { useNavigate } from "react-router-dom";

interface AIResponseStatsProps {
    data: {
        total: number;
        evaluatedCount: number;
        notEvaluatedCount: number;
    };
    isLoading: boolean;
}

export default function AIResponseStats({ data, isLoading }: AIResponseStatsProps) {
    const color = useColor();
    const { isDarkMode } = useDarkMode();
    const navigate = useNavigate();

    const evaluatedPercentage = data.total > 0 ? (data.evaluatedCount / data.total) * 100 : 0;
    const notEvaluatedPercentage = data.total > 0 ? (data.notEvaluatedCount / data.total) * 100 : 0;

    if (isLoading) {
        return (
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    borderRadius: "1rem",
                    backgroundColor: isDarkMode ? color.gray800 : color.white,
                    border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
                    height: 320,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <SmartToyIcon sx={{ color: isDarkMode ? color.teal400 : color.teal600, mr: 1 }} />
                    <Typography variant="h6" fontWeight="bold" sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}>
                        AI Response Statistics
                    </Typography>
                </Box>
                <LinearProgress sx={{ borderRadius: 1, height: 6 }} />
            </Paper>
        );
    }

    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: "1rem",
                backgroundColor: isDarkMode ? color.gray800 : color.white,
                border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
                height: 320,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <SmartToyIcon sx={{ color: isDarkMode ? color.teal400 : color.teal600, mr: 1 }} />
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}
                    >
                        Recent AI Responses
                    </Typography>
                </Box>
                <Tooltip title="View All AI Responses">
                    <IconButton
                        size="small"
                        onClick={() => navigate("/admin/ai-response")}
                        sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
                    >
                        <VisibilityIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <Divider sx={{
                mb: 2,
                backgroundColor: isDarkMode ? color.gray700 : color.gray200
            }} />

            <Box sx={{ mb: 3 }}>
                <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{ color: isDarkMode ? color.teal300 : color.teal600, mb: 1 }}
                >
                    {data.total.toLocaleString()}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
                >
                    Total AI Responses
                </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
                {/* Evaluated Progress */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CheckCircleIcon
                            sx={{
                                color: isDarkMode ? color.emerald400 : color.emerald600,
                                mr: 1,
                                fontSize: 18
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
                        >
                            Evaluated
                        </Typography>
                    </Box>
                    <Chip
                        label={`${data.evaluatedCount} (${evaluatedPercentage.toFixed(1)}%)`}
                        size="small"
                        sx={{
                            backgroundColor: isDarkMode ? color.emerald800 : color.emerald100,
                            color: isDarkMode ? color.emerald300 : color.emerald800,
                            fontWeight: 600,
                        }}
                    />
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={evaluatedPercentage}
                    sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: isDarkMode ? color.gray700 : color.gray200,
                        "& .MuiLinearProgress-bar": {
                            backgroundColor: isDarkMode ? color.emerald500 : color.emerald600,
                            borderRadius: 4,
                        },
                    }}
                />
            </Box>

            <Box>
                {/* Not Evaluated Progress */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PendingIcon
                            sx={{
                                color: isDarkMode ? color.red200 : color.red800,
                                mr: 1,
                                fontSize: 18
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
                        >
                            Not Evaluated
                        </Typography>
                    </Box>
                    <Chip
                        label={`${data.notEvaluatedCount} (${notEvaluatedPercentage.toFixed(1)}%)`}
                        size="small"
                        sx={{
                            backgroundColor: isDarkMode ? color.red800 : color.red100,
                            color: isDarkMode ? color.red200 : color.red800,
                            fontWeight: 600,
                        }}
                    />
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={notEvaluatedPercentage}
                    sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: isDarkMode ? color.gray700 : color.gray200,
                        "& .MuiLinearProgress-bar": {
                            backgroundColor: isDarkMode ? color.red200 : color.red800,
                            borderRadius: 4,
                        },
                    }}
                />
            </Box>
        </Paper>
    );
}