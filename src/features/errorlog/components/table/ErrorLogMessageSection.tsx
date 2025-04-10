import { alpha, Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { ErrorLog } from "interfaces";
import useColor from "theme/useColor";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface ErrorMessageSectionProps {
    log: ErrorLog;
    copied: boolean;
    handleCopyErrorMessage: () => void;
}

export default function ErrorMessageSection({
    log,
    copied,
    handleCopyErrorMessage
}: ErrorMessageSectionProps) {
    const color = useColor();
    const { isDarkMode } = useDarkMode();
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                mb: 3,
                borderRadius: "0.75rem",
                backgroundColor: isDarkMode
                    ? alpha(color.gray800, 0.7)
                    : alpha(color.gray50, 0.7),
                border: `1px solid ${isDarkMode ? color.gray700 : color.gray200
                    }`,
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="subtitle2"
                    sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
                >
                    Error Message
                </Typography>
                <Tooltip title={copied ? "Copied!" : "Copy Message"}>
                    <IconButton
                        size="small"
                        onClick={handleCopyErrorMessage}
                        sx={{
                            color: isDarkMode ? color.gray500 : color.gray500,
                            padding: "2px",
                        }}
                    >
                        {copied ? (
                            <CheckCircleOutlineIcon
                                fontSize="small"
                                sx={{
                                    color: isDarkMode ? color.green400 : color.green500,
                                }}
                            />
                        ) : (
                            <ContentCopyIcon fontSize="small" />
                        )}
                    </IconButton>
                </Tooltip>
            </Box>
            <Box
                sx={{
                    backgroundColor: isDarkMode ? color.gray900 : color.white,
                    borderRadius: "0.5rem",
                    p: 1.5,
                    border: `1px solid ${isDarkMode ? color.gray700 : color.gray200
                        }`,
                    maxHeight: "150px",
                    overflow: "auto",
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "monospace",
                        fontSize: "0.85rem",
                        whiteSpace: "pre-wrap",
                        color: isDarkMode ? color.gray200 : color.gray800,
                        lineHeight: 1.6,
                    }}
                >
                    {log.message}
                </Typography>
            </Box>
        </Paper>
    )
}