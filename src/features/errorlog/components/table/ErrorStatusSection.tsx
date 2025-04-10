import { alpha, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { ErrorLog } from "interfaces";
import useColor from "theme/useColor";
import ScheduleIcon from "@mui/icons-material/Schedule";
import UpdateIcon from "@mui/icons-material/Update";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface ErrorStatusSectionProps {
    log: ErrorLog;
    formatDate: (date?: Date | string) => string;
}

export default function ErrorStatusSection({
    log,
    formatDate
}: ErrorStatusSectionProps) {
    const color = useColor();
    const { isDarkMode } = useDarkMode();
    return (
        <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 2,
                        height: "100%",
                        borderRadius: "0.75rem",
                        backgroundColor: isDarkMode
                            ? alpha(color.gray800, 0.7)
                            : alpha(color.gray50, 0.7),
                        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200
                            }`,
                    }}
                >
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: isDarkMode ? color.gray300 : color.gray700,
                            mb: 2,
                        }}
                    >
                        Timestamps
                    </Typography>

                    <Stack spacing={2}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: isDarkMode
                                        ? alpha(color.gray700, 0.5)
                                        : alpha(color.gray200, 0.5),
                                    borderRadius: "50%",
                                    width: 28,
                                    height: 28,
                                }}
                            >
                                <ScheduleIcon
                                    sx={{
                                        fontSize: 16,
                                        color: isDarkMode ? color.gray300 : color.gray600,
                                    }}
                                />
                            </Box>
                            <Box>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: isDarkMode ? color.gray400 : color.gray600,
                                        display: "block",
                                    }}
                                >
                                    Created At
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: isDarkMode ? color.gray200 : color.gray800,
                                        fontFamily: "monospace",
                                    }}
                                >
                                    {formatDate(log.createdAt)}
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: isDarkMode
                                        ? alpha(color.gray700, 0.5)
                                        : alpha(color.gray200, 0.5),
                                    borderRadius: "50%",
                                    width: 28,
                                    height: 28,
                                }}
                            >
                                <UpdateIcon
                                    sx={{
                                        fontSize: 16,
                                        color: isDarkMode ? color.gray300 : color.gray600,
                                    }}
                                />
                            </Box>
                            <Box>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: isDarkMode ? color.gray400 : color.gray600,
                                        display: "block",
                                    }}
                                >
                                    Updated At
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: isDarkMode ? color.gray200 : color.gray800,
                                        fontFamily: "monospace",
                                    }}
                                >
                                    {formatDate(log.updatedAt)}
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>
                </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 2,
                        height: "100%",
                        borderRadius: "0.75rem",
                        backgroundColor: isDarkMode
                            ? alpha(
                                log.status ? color.teal900 : color.gray800,
                                log.status ? 0.2 : 0.7
                            )
                            : alpha(
                                log.status ? color.teal50 : color.gray50,
                                log.status ? 0.7 : 0.7
                            ),
                        border: `1px solid ${isDarkMode
                            ? log.status
                                ? color.teal800
                                : color.gray700
                            : log.status
                                ? color.teal200
                                : color.gray200
                            }`,
                    }}
                >
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: isDarkMode ? color.gray300 : color.gray700,
                            mb: 2,
                        }}
                    >
                        Status
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            py: 1,
                        }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                                width: 60,
                                height: 60,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: isDarkMode
                                    ? alpha(
                                        log.status ? color.teal700 : color.gray700,
                                        0.3
                                    )
                                    : alpha(
                                        log.status ? color.teal100 : color.gray200,
                                        0.5
                                    ),
                                border: `1px solid ${isDarkMode
                                    ? log.status
                                        ? color.teal600
                                        : color.gray600
                                    : log.status
                                        ? color.teal300
                                        : color.gray300
                                    }`,
                                mb: 2,
                            }}
                        >
                            {log.status ? (
                                <ErrorOutlineIcon
                                    sx={{
                                        fontSize: 30,
                                        color: isDarkMode
                                            ? color.teal300
                                            : color.teal700,
                                    }}
                                />
                            ) : (
                                <CheckCircleOutlineIcon
                                    sx={{
                                        fontSize: 30,
                                        color: isDarkMode
                                            ? color.gray300
                                            : color.gray700,
                                    }}
                                />
                            )}
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: -3,
                                    right: -3,
                                    width: 16,
                                    height: 16,
                                    borderRadius: "50%",
                                    backgroundColor: log.status
                                        ? isDarkMode
                                            ? color.green400
                                            : color.green500
                                        : isDarkMode
                                            ? color.gray500
                                            : color.gray400,
                                    border: `2px solid ${isDarkMode ? color.gray900 : color.white
                                        }`,
                                    boxShadow: log.status
                                        ? `0 0 8px ${isDarkMode ? color.green400 : color.green500
                                        }`
                                        : "none",
                                }}
                            />
                        </Box>

                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 600,
                                color: log.status
                                    ? isDarkMode
                                        ? color.teal200
                                        : color.teal800
                                    : isDarkMode
                                        ? color.gray300
                                        : color.gray700,
                                textAlign: "center",
                            }}
                        >
                            {log.status ? "Active" : "Resolved"}
                        </Typography>

                        <Typography
                            variant="caption"
                            sx={{
                                color: isDarkMode ? color.gray400 : color.gray600,
                                textAlign: "center",
                                mt: 0.5,
                            }}
                        >
                            {log.status
                                ? "This error is currently active and needs attention"
                                : "This error has been resolved successfully"}
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}